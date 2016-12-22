class EditProjectWebCtrl {
    constructor(AppConstants, Project, $state, $stateParams, $q, $scope, User, JWT, EventBus, ProjectStore, Notification) {
        'ngInject';

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
            p12: false
        };

        this.files = {
            profile: {
                name: ""
            },
            cert: {
                name: ""
            },
            icon: {
                name: "",
                src: ""
            }
        };

        this.modals = {
            password: false
        };

        this.submiting = false;
        this.openEvent = null;

        this.eventBus = EventBus;
        ProjectStore.subscribeAndInit($scope, ()=> {
            this.project = ProjectStore.getProject();
            if(!this.project)
                this.getProject();
            //else
                //this.finalizeRequest();
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
                _.each(err, (val, key)=>{
                    this.Notification.error(val.fieldName);
                });
                this.$state.go('landing.error');
            }
        )
    }

    addDomain(){
        this.Project.setDomain({id:this.projectId, domain:this.domainName}).then(
            response =>{
                this.Notification.success(response.message);
            },
            err=>{
                _.each(err, (val, key)=>{
                    this.Notification.error(val.fieldName);
                });
                console.log(err);
            }
        )
    }
}

export default EditProjectWebCtrl;
