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
        this.queryString = '';
        this.timerToSearch = null;

        this.newPassword = {
            password: '',
            confirm: '',
        };

        this.currentModalProject = null;
        this.modals = {
            share: false,
            remove: false,
        };

        if (this.user.projects.total >= this.user.allowProjectsCount) {
            this.cantCreateProject = true;
        }
        this.copyUrl = this.copyUrl.bind(this);
    }

    createProject() {
        if (this.cantCreateProject) {
            return this.Notification.error(`Maximum projects count exceeded, allowed project count ${this.user.allowProjectsCount}`);
        }

        this.$state.go('app.project');
    }

    getProjects() {
        this.showLoader = true;
        this.Project.getList({ _queryString: this.queryString }).then(
         data => {
            this.showLoader = false;
            this.projects = data;
        },

         err => {
                    this.showLoader = false;
                }
        );
    }

    search($event) {
        if (this.queryString === '') {
	        if($event) {
		        $event.preventDefault();
            }
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
        this.$state.go('app.editproject', { projectId: this.currentModalProject._id });
    }

    goToProject($event, projectURL) {
        if ($event.target.className !== 'item-description') return;
        location.href = projectURL;
    }

    deleteProject() {
        this.showLoader = true;

        let projectIndex = _.findIndex(this.projects, (project)=> {
            return project._id === this.currentModalProject._id;
        });

        this.Project.remove(this.currentModalProject).then(
            data => {
                this.modals.remove = false;
                this.Notification.success(`Project ${this.currentModalProject.name} deleted`);
                this.showLoader = false;
                this.projects.splice(projectIndex, 1);

                if (this.user.projects.total > 0) {
                    this.user.projects.total--;
                }

                if (this.user.projects.total < this.user.allowProjectsCount) {
                    this.cantCreateProject = false;
                }
            },

            err => {
                _.each(err, (val, key)=> {
                    this.Notification.error(val.fieldName);
                });
                this.showLoader = false;
            }
        );
    }

    copyUrl() {
        var $temp = $('<input>');
        $('body').append($temp);
        $temp.val($('#projectUrl').val()).select();
        document.execCommand('copy');
        document.getElementById('projectUrl').style['transition'] = 'all .5s ease';
        document.getElementById('projectUrl').style['box-shadow'] = '0 0 5px 5px #222';
        $temp.remove();
        const t = setTimeout(() => {
            document.getElementById('projectUrl').style['box-shadow'] = 'none';
            clearTimeout(t);
        }, 1000);
	    this.modals.share = false;
	    this.Notification.success('Copied Url')
    }
}

export default DashboardCtrl;
