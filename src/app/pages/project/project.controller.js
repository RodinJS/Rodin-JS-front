class ProjectCtrl {
    constructor(AppConstants, Project, ProjectTemplate, $state, $scope, User, VCS, Notification, $timeout) {
        'ngInject';
        this._$scope = $scope;
        this.Notification = Notification;
        this.appName = AppConstants.appName;
        this.editorUrl = AppConstants.EDITOR;
        this.previewUrl = AppConstants.PREVIEW;
        this.Project = Project;
        this.VCS = VCS;
        this.ProjectTemplate = ProjectTemplate;
        this.$state = $state;
        this.currentUser = User.current;

        $scope.projectDescription = "";

        this.project = {
            name: "",
            templateOf: "empty",
            tags: []
        };

        this.showLoader = false;

        this.wysiwygOptions =  [
            []
        ];

        this.template = 0;

        this.projectTemplates = {
            selected: null,
            projects: []
        };

        this.getTemplates();

        $timeout(()=>{
            this.inputPadding = (angular.element('.project-path-label').width() + 10);
        }, 500);

    }

    save() {
        this.showLoader = true;
        this.projectExist = false;
        let projectInfo = {};
        angular.extend(projectInfo, this.project);
        projectInfo.templateId = this.projectTemplates.selected._id;
        projectInfo.tags = projectInfo.tags.map(i => i.text);
        projectInfo.description = this._$scope.projectDescription;
        this.Project.create(projectInfo).then(
            data => {
                this.VCS.create(data._id, {
                    root: data.root,
                    name: data.name
                }).then(()=>{
                    this.showLoader = false;
                    this.Notification.success("Project created");
                    this.$state.go('app.dashboard');
                }, err=>{
                    _.each(err, (val, key)=>{
                        this.Notification.warning(val.fieldName);
                    });
                    this.Notification.success("Project created");
                    this.$state.go('app.dashboard');
                    /// TODO: stex petqa cuc tal error vorovhetev github repo chi sarqve
                    this.showLoader = false;
                });
            },
            err => {
                _.each(err, (val, key)=>{
                    this.Notification.error(val.fieldName);
                });
                if (err[0].code && err[0].code === 309)
                    this.projectExist = true;
                this.showLoader = false;
            }
        )
    }

    getTemplates() {
        this.ProjectTemplate.getList().then(
            data => {
                this.projectTemplates = {
                    projects: data,
                    selected: data[0]
                };
            },
            err => {
                _.each(err, (val, key)=>{
                    this.Notification.error(val.fieldName);
                });
            }
        )
    }
}

export default ProjectCtrl;
