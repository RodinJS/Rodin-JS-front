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
        this.User = User;
        this.currentUser = this.User.current;


        if(this.currentUser.projects.total >= this.currentUser.allowProjectsCount){
           this.Notification.error(`Maximum projects count exceeded, allowend project count ${this.currentUser.allowProjectsCount}`);
           return this.$state.go('app.dashboard');
        }

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
        this.createFinalize = this.createFinalize.bind(this);
        //this.createFinalizeError = this.createFinalizeError.bind(this);

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
                this.Project.transpile(data._id);
                this.VCS.create(data._id, {
                    root: data.root,
                    name: data.name
                }).then(this.createFinalize, this.createFinalize);
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


    createFinalize(err){
        if(_.isArray(err)){
            _.each(err, (val, key) => {
                this.Notification.warning(val.fieldName);
            });
        }
        this.Notification.success("Project created");
        this.User.current.projects.total +=1;
        this.$state.go('app.dashboard');
        this.showLoader = false;
    }
}

export default ProjectCtrl;
