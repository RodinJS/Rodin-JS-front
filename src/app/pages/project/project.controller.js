class ProjectCtrl {
    constructor (AppConstants, Project, ProjectTemplate, $state, $scope, User) {
        'ngInject';

        this.appName = AppConstants.appName;
        this.editorUrl = AppConstants.EDITOR;
        this.previewUrl = AppConstants.PREVIEW;
        this.Project = Project;
        this.ProjectTemplate = ProjectTemplate;
        this.$state = $state;
        this.currentUser = User.current;

        $scope.projectDescription = "Project description.";

        this.project = {
            name: "",
            description: $scope.projectDescription,
            templateOf: "empty"
        };

        this.showLoader = false;

        this.tinymceOptions = {
            menubar: false,
            statusbar: false,
            toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist',
            inline: false,
            plugins: 'advlist autolink link image lists charmap print preview',
            theme: "modern"
        };

        this.template = 0;

        this.projectTemplates = {
            selected: null,
            projects: []
        };

        this.getTemplates();
    }

    save () {
        this.showLoader = true;

        let projectInfo = {};
        angular.extend(projectInfo, this.project);
        projectInfo.tags = (projectInfo.tags && projectInfo.tags.split(",")) || [];
        projectInfo.templateId = this.projectTemplates.selected._id;

        this.Project.create(projectInfo).then(
            data => {
                this.showLoader = false;
                this.$state.go('app.dashboard');
            },
            err => {
                this.showLoader = false;
            }
        )
    }

    getTemplates () {
        this.ProjectTemplate.getList().then(
            data => {
                this.projectTemplates = {
                    projects: data,
                    selected: data[0]
                };
            },
            err => {

            }
        )
    }
}

export default ProjectCtrl;
