class DashboardCtrl {
	constructor(AppConstants, Project, User) {
		'ngInject';
		this.user = User.current;
		this.appName = AppConstants.appName;
		this.domain = AppConstants.domain;
		this.editorUrl = AppConstants[AppConstants.env + "Editor"];
		this.Project = Project;

		this.getProjects();
		this.projects = [];
		this.showLoader = true;
		this.queryString = "";
		this.timerToSearch = null;

		this.newPassword = {
			password: "",
			confirm: ""
		}
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

	search() {
		if (this.queryString === "") {
			return this.getProjects();
		}

		if (this.queryString.length < 3) {
			return;
		}

		clearTimeout(this.timerToSearch);
		this.timerToSearch = setTimeout(() => {
			this.getProjects();
		}, 500);
	}
}

export default DashboardCtrl;
