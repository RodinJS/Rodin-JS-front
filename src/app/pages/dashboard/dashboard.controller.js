class DashboardCtrl {
	constructor(AppConstants, Project, User, $state, Notification) {
		'ngInject';
		this.user = User.current;
		this.appName = AppConstants.appName;
		this.editorUrl = AppConstants.EDITOR;
		this.PUBLIC = AppConstants.PUBLIC;
		this.Project = Project;
		this.$state = $state;
		this.Notification = Notification;

		this.getProjects();
		this.projects = [];
		this.showLoader = true;
		this.queryString = "";
		this.timerToSearch = null;

		this.newPassword = {
			password: "",
			confirm: ""
		};

		this.currentModalProject = null;
		this.modals = {
			share: false,
            remove:false,
		}
	}

	getProjects() {
		this.showLoader = true;
		this.Project.getList({_queryString: this.queryString}).then(
			data => {
				this.showLoader = false;
				this.projects = data;
                console.log(this.projects);
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

	open(project, remove) {
		this.currentModalProject = project;
		this.modals[remove ? 'remove' : 'share'] = true;
	}

	goToSettings() {
		this.$state.go('app.editproject', {projectId: this.currentModalProject._id});
	}

	goToProject($event, projectURL){
        if($event.target.className !== 'item-description') return;
        location.href = projectURL;
	}

    deleteProject() {
        this.showLoader = true;

        this.Project.remove(this.currentModalProject._id).then(
            data => {
                this.modals.remove = false;
                this.Notification.success(`Project ${this.currentModalProject.name} deleted`);
                this.showLoader = false;
            },
            err => {
                _.each(err, (val, key)=>{
                    this.Notification.error(val.fieldName);
                });
                this.showLoader = false;
            }
        );
    }

	copyUrl() {
		var $temp = $("<input>");
		$("body").append($temp);
		$temp.val($("#projectUrl").val()).select();
		document.execCommand("copy");
		document.getElementById('projectUrl').style['transition'] = 'all .5s ease';
		document.getElementById('projectUrl').style['box-shadow'] = '0 0 5px 5px #222';
		$temp.remove();
		const t = setTimeout(() => {
			document.getElementById('projectUrl').style['box-shadow'] = 'none';
			clearTimeout(t);
		}, 1000);
	}
}

export default DashboardCtrl;
