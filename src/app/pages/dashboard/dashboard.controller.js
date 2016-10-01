class DashboardCtrl {
	constructor(AppConstants, Project) {
		'ngInject';
		this.appName = AppConstants.appName;
		this.Project = Project;

		this.getProjects();
		this.projects = [];
		this.showLoader = true;
		this.queryString = ""
	}

	getProjects() {
		this.showLoader = true;
		this.Project.getList({_queryString: this.queryString}).then(
			data => {
				this.showLoader = false;
				this.projects = data;
			},
			err => {
				this.showLoader = false;
			}
		)
	}
}

export default DashboardCtrl;
