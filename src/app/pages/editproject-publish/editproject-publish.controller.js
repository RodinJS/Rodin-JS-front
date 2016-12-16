class EditProjectPublishCtrl {
    constructor(AppConstants, Project, $state, $stateParams, $q, $scope, User, JWT, EventBus, ProjectStore, moment) {
        'ngInject';

        this._moment = moment;
        this.appName = AppConstants.appName;
        this.domain = AppConstants.SITE;
        this._AppConstants = AppConstants;
        this._JWT = JWT;
        this.Project = Project;
        this.$state = $state;
        this.$q = $q;
        this._$scope = $scope;

        this.projectId = $stateParams.projectId;
        this.project = {};
        this.showLoader = true;

        this.user = User.current;

        this.modals =  {
            updateVersion: false,
            rollBack:false,
            unpublish: false
        };

        this.eventBus = EventBus;
        ProjectStore.subscribeAndInit($scope, () => {
            this.project = ProjectStore.getProject();
            if(!this.project){
                this.getProject();
            }
            else {
                this.finaliseRequest();
            }
        });
    }

    getProject() {
        this.showLoader = true;
        this.Project.get(this.projectId).then(
            project => {
                this.eventBus.emit(this.eventBus.project.SET, project);
                this.finaliseRequest();
            },
            err => {
                this.showLoader = false;
            }
        );
    }

    getRollBackData(){
        this.Project.getPublishedHistory(this.projectId).then(
            data => {
                this.rollbackDates = _.map(data, (date)=>{
                    return {formated:this._moment.unix(parseInt(date)/1000).format('YYYY-MM-DD HH:mm:ss'), origin:date}
                });
                this.modals.rollBack = true;
            },
            err => {
                this.showLoader = false;
            }
        )
    }

    rollback(){
        if(!this.rollBackDate) return;
        this.Project.rollBack(this.projectId, {date:this.rollBackDate}).then(
            data => {
                this.modals.rollBack = false;
            },
            err => {

            }
        )
    }

    finaliseRequest() {
        this.project.publishedUrl = `${this._AppConstants.PUBLISH}/${this.user.username}/${this.project.name}`;
        this.showLoader = false;
    }

    publish() {
        this.modals.updateVersion = false;
        this.showLoader = true;
        this.Project.publish(this.projectId).then(
            data => {
                this.getProject();
            },
            err => {
                this.showLoader = false;
            }
        )
    }


    update() {
        this.modals.updateVersion = false;
        this.showLoader = true;
        this.Project.updatePublish(this.projectId).then(
            data => {
                this.getProject();
            },
            err => {
                this.showLoader = false;
            }
        )
    }

    unpublish() {
        this.Project.unPublish(this.projectId).then(
            data => {
                this.getProject();
            },
            err => {
                this.showLoader = false;
            }
        );
        this.modals.unpublish = false;

    }
}

export default EditProjectPublishCtrl;
