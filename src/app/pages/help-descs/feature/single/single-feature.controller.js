/**
 * Created by Reinchard on 7/26/2017.
 */
class SingleFeatureCtrl {
    constructor(AppConstants, Project, ProjectTemplate, $state, $scope, User, VCS, Notification, $timeout) {
        'ngInject';
        this.id = $state.params.id;
    }
}

export default SingleFeatureCtrl;