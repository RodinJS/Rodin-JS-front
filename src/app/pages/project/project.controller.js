class ProjectCtrl {
	constructor(AppConstants, Project, $state) {
		'ngInject';

		this.appName = AppConstants.appName;
		this.Project = Project;
		this.$state = $state;

		this.project = {
			name: "",
			description: ""
		};

		this.showLoader = false;
	}

	save() {
		this.showLoader = true;
		this.Project.create(this.project).then(
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
