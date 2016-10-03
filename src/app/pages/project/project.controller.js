class ProjectCtrl {
	constructor(AppConstants, Project, $state, $scope, User) {
		'ngInject';

		this.appName = AppConstants.appName;
		this.Project = Project;
		this.$state = $state;
		this.currentUser = User.current;

		$scope.projectDescription = "Project description.";

		this.project = {
			name: "",
			description: $scope.projectDescription
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
	}

	save() {
		this.showLoader = true;

		let projectInfo = {};
		angular.extend(projectInfo, this.project);
		projectInfo.tags = projectInfo.tags.split(",");

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
}

export default ProjectCtrl;
