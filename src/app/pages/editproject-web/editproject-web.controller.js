class EditProjectWebCtrl {
    constructor(AppConstants, Project, $state, $stateParams, $q, $scope, User, JWT, EventBus, ProjectStore, Notification) {
        'ngInject';

        if (!$stateParams.projectId) return $state.go('landing.error');


        this.Notification = Notification;
        this.appName = AppConstants.appName;
        this._AppConstants = AppConstants;
        this._JWT = JWT;
        this.Project = Project;
        this.$state = $state;
        this.$q = $q;
        this._$scope = $scope;

        this.projectId = $stateParams.projectId;
        this.project = {};
        this.showLoader = true;
        this.getProject();

        this.user = User.current;

        this.fileChoosen = {
            profile: false,
            p12: false,
        };

        this.files = {
            profile: {
                name: '',
            },
            cert: {
                name: '',
            },
            icon: {
                name: '',
                src: '',
            },
        };

        this.modals = {
            notPublished: false,
        };

        this.submiting = false;
        this.recordIp = this._AppConstants.RECORDIP;
        console.log(this._AppConstants);
        this.openEvent = null;
        this.domainPattern = /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
        this.domain = '';
        this.eventBus = EventBus;
        ProjectStore.subscribeAndInit($scope, ()=> {
            this.project = ProjectStore.getProject();
            if (!this.project)
                this.getProject();
            else
                this.finalizeRequest();
        });
    }

    getProject() {
        this.showLoader = true;
        this.Project.get(this.projectId).then(
            project => {
                this.showLoader = false;
                this.eventBus.emit(this.eventBus.project.SET, project);
            },

            err => {
                _.each(err, (val, key)=> {
                    this.Notification.error(val.fieldName);
                });
                this.$state.go('landing.error');
            }
        );
    }

    gotToPublish() {
        this.$state.go('app.editprojectPublish',  { projectId: this.project._id });
    }

    addDomain() {
        this.domain = this.domain.replace(/.*?:\/\//g, '');
        this.Project.setDomain({ id: this.projectId, domain: this.domain }).then(
            response => {
                this.Notification.success(response.message);
                this.project.domain = this.domain;
            },

            err=> {
                _.each(err, (val, key)=> {
                    this.Notification.error(val.fieldName);
                });
                console.log(err);
            }
        );
    }

    deleteDomain() {
        this.Project.deleteDomain(this.projectId, this.project).then(
            response => {
                this.Notification.success(response.message);
            },

            err=> {
                _.each(err, (val, key)=> {
                    this.Notification.error(val.fieldName);
                });
                console.log(err);
            }
        );
    }

    switchDomainTrigger() {
        if (!this.project.publishedPublic) {
            this.modals.notPublished = true;
            this.customDomainTrigger = false;
        }
    }

    finalizeRequest() {
        this.project.editorUrl = `${this.EDITOR}${this.user.username}/${this.project.root}`;
        if (this.project.publishedPublic)
            this.project.publishedUrl = `${this._AppConstants.PUBLISH}/${this.user.username}/${this.project.name}`;
        if (this.project.description)
            this.project.description = $('<div/>').html(this.project.description).text();
        this.projectPublic = this.project.public === 'true';
        this.showLoader = false;
        this.customDomainTrigger = this.project.domain ? true : false;
        this.domain = this.project.domain;
    }
}

export default EditProjectWebCtrl;
