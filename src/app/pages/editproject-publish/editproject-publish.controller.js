class EditProjectPublishCtrl {
    constructor(AppConstants, Project, $state, $stateParams, $q, $scope, User, JWT) {
        'ngInject';

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
        this.getProject();

        this.user = User.current;

        this.modals =  {
            updateVersion: false,
            unpublish: false
        }
    }

    getProject() {
        this.showLoader = true;
        this.Project.get(this.projectId).then(
            project => {
                this.showLoader = false;
                this.project = project;
                this.project.publishedUrl = `${this.domain}publish/${this.user.username}/${this.project.name}`;
            },
            err => {
                this.showLoader = false;
            }
        );
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

    unpublish() {
        this.modals.unpublish = false;
    }
}

export default EditProjectPublishCtrl;
