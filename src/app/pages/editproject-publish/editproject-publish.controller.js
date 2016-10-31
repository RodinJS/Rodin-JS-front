class EditProjectPublishCtrl {
    constructor(AppConstants, Project, $state, $stateParams, $q, $scope, User, JWT) {
        'ngInject';

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
    }

    getProject() {
        this.showLoader = true;
        this.Project.get(this.projectId).then(
            project => {
                this.showLoader = false;
                this.project = project;
            },
            err => {
                this.showLoader = false;
            }
        );
    }

    publish() {
        this.showLoader = true;
        this.Project.publish(this.projectId).then(
            data => {
                this.getProject();
            },
            err => {
                this.showLoader = false;
                console.log(err);
            }
        )
    }
}

export default EditProjectPublishCtrl;
