class ProjectCtrl {
    constructor(AppConstants, Project, ProjectTemplate, $state, $scope, User) {
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
            templateOf: "empty",
            tags: []
        };

        this.showLoader = false;

        this.wysiwygOptions =  [
            ['bold', 'italic', 'underline', 'ordered-list', 'unordered-list', 'font-size', 'link']
        ];

        this.template = 0;

        this.projectTemplates = {
            selected: null,
            projects: []
        };

        this.getTemplates();

        this.inputPadding = (angular.element('.project-path-label').width() - 20);
    }

    save() {
        this.showLoader = true;
        this.projectExist = false;
        let projectInfo = {};
        angular.extend(projectInfo, this.project);
        projectInfo.templateId = this.projectTemplates.selected._id;
        projectInfo.tags = projectInfo.tags.map(i => i.text);

        this.Project.create(projectInfo).then(
            data => {
                this.showLoader = false;
                this.$state.go('app.dashboard');
            },
            err => {
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

            }
        )
    }
}

export default ProjectCtrl;
