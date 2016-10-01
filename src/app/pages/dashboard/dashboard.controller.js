class DashboardCtrl {
	constructor(AppConstants, Project, User) {
		'ngInject';
		this.user = User.current;
		this.appName = AppConstants.appName;
		this.domain = AppConstants.domain;
		this.protocol = location.protocol;
		this.Project = Project;

		this.getProjects();
		this.projects = [];
		this.showLoader = true;
		this.queryString = "";
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
