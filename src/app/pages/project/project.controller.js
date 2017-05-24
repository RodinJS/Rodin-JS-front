class ProjectCtrl {
    constructor(AppConstants, Project, ProjectTemplate, $state, $scope, User, VCS, Notification, $timeout) {
        'ngInject';

        this._$timeout = $timeout;
        this._$scope = $scope;
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

        this.githubUrlValid = false;
        $scope.projectDescription = '';
        $scope.projectDescription = '';

        this.getTemplates();
        this.createFinalize = this.createFinalize.bind(this);

    }

    save(isValid) {
        this.showLoader = true;
        this.projectExist = false;
        let projectInfo = {};
        angular.extend(projectInfo, this.project);
        if (this.projectTemplates.selected)
            projectInfo.templateId = this.projectTemplates.selected._id;
        projectInfo.tags = projectInfo.tags.map(i => i.text);
        projectInfo.description = this._$scope.projectDescription;
        console.log(isValid)
        if (projectInfo && isValid) {
            this.Project.create(projectInfo).then(
                data => {
                    this.Project.transpile(data._id);
                    this.VCS.create(data._id, {
                        root: data.root,
                        name: data.name,
                    }).then(this.createFinalize, this.createFinalize);
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

    }

    getTemplates() {
        this.showLoader = true;
        this.ProjectTemplate.getList().then(
            data => {
                this.projectTemplates = {
                    projects: _.chunk(data, 4),
                    selected: data[0],
                };
                this._$timeout(() => {
                    // this.inputPadding = (angular.element('#project-url').width() - 20);
                    // angular.element('#project-url').css({'padding-left': 232})
                    // let placeholderPad = angular.element('.main-placeholder').innerWidth() + 22;
                    // angular.element('#project-url-label').css({ 'padding-left': placeholderPad - 12 });
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

    validateGithubUrl() {
        this.githubUrlValid = this.githubPattern.test(this.project.githubUrl);
        if (this.githubUrlValid) {
            angular.element('input[type=radio]').prop('checked', false);
            this.projectTemplates.selected = null;
        }
        // console.log('VALID GITHUB', this.githubUrlValid);
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