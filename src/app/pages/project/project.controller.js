import {gitHub} from '../../components/localTemplates.js';
class ProjectCtrl {
    constructor(AppConstants, Project, ProjectTemplate, $state, $scope, User, VCS, Notification, $timeout) {
        'ngInject';

        this._$timeout = $timeout;
        this._$scope = $scope;
        this.githubUrlFocused = false;
        this.Notification = Notification;
        this.appName = AppConstants.appName;
        this.editorUrl = AppConstants.EDITOR;
        this.previewUrl = AppConstants.PREVIEW;
        this.Project = Project;
        this.VCS = VCS;
        this.ProjectTemplate = ProjectTemplate;
        this.$state = $state;
        this.User = User;
        this.currentUser = this.User.current;
        this.formErrors = AppConstants.FORMERRORS.project;
        if (this.currentUser.projects.total >= this.currentUser.allowProjectsCount) {
            this.Notification.error(`Maximum projects count exceeded, allowed project count ${this.currentUser.allowProjectsCount}`);
            return this.$state.go('app.dashboard');
        }
        this.githubPattern = /(?:git|ssh|https?|git@[\w\.]+):(?:\/\/)?[\w\.@:\/~_-]+\.git(?:\/?|\#[\d\w\.\-_]+?)$/;

        this.project = {
            name: '',
            templateOf: 'empty',
            tags: [],
        };

        this.showLoader = false;

        this.wysiwygOptions = [
            [],
        ];

        this.template = 0;

        this.projectTemplates = {
            selected: null,
            projects: [],
        };
        this.isGithubTemplate = false;
        $scope.projectDescription = '';
        $scope.projectDescription = '';

        this.getTemplates();
        this.createFinalize = this.createFinalize.bind(this);

    }

    save(isValid) {
        if (!isValid) return;
        this.showLoader = true;
        this.projectExist = false;
        let projectInfo = {
            name: this.project.name,
            displayName: this.project.displayName,
            templateOf: this.project.templateOf
        };
        if(this.projectTemplates.selected.name === 'Pull From GitHub') {
            projectInfo.githubUrl = this.project.githubUrl;
        }
        if (this.projectTemplates.selected)
            projectInfo.templateId = this.projectTemplates.selected._id;

        projectInfo.tags = this.project.tags.map(i => i.text);

        projectInfo.description = this._$scope.projectDescription;

        projectInfo.defaultThumbnail = this.projectTemplates.selected.thumbnail;

        this.Project.create(projectInfo).then(
            data => {
                this.Project.transpile(data._id)
                    .then(response => this.VCS.create(data._id, {
                        root: data.root,
                        name: data.name,
                    }), this.createFinalize)
                    .then(this.createFinalize, this.createFinalize);
            },

            err => {
                _.each(err, (val, key) => {
                    this.Notification.error(val.fieldName);
                });
                if (err[0].code && err[0].code === 309)
                    this.projectExist = true;
                this.showLoader = false;
            }
        );
    }

    getTemplates() {
        this.showLoader = true;
        this.ProjectTemplate.getList().then(
            data => {
                data.push(gitHub);
                this.projectTemplates = {
                    projects: _.chunk(data, 4),
                    selected: data[0],
                };
                this._$timeout(() => {
                    this.inputPadding = (angular.element('.project-path-label').width() + 10);
                    let placeholderPad = angular.element('.main-placeholder').innerWidth() + 22;
                    angular.element('#project-url').css({'padding-left': placeholderPad});
                    this.showLoader = false;
                }, 500);
            },

            err => {
                _.each(err, (val, key) => {
                    this.Notification.error(val.fieldName);
                });
            }
        );
    }

    setActiveTemplate(project) {
        this.projectTemplates.selected = project;
        this.isGithubTemplate = project.name === 'Pull From GitHub';
    }

    validateGithubUrl() {
        this.githubUrlValid = this.githubPattern.test(this.project.githubUrl);
    }

    createFinalize(err) {
        if (_.isArray(err)) {
            _.each(err, (val, key) => {
                this.Notification.warning(val.fieldName);
            });
        }

        this.Notification.success('Project created');
        this.User.current.projects.total += 1;
        this.$state.go('app.dashboard');
        this.showLoader = false;
    }
}

export default ProjectCtrl;
