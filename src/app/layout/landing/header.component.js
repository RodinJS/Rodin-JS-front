class AppHeaderCtrl {
    constructor(AppConstants, $scope, $state, $stateParams, $location) {
        'ngInject';
        this._$state = $state;
        this._$stateParams = $stateParams;
        this._$location = $location;
        this.appName = AppConstants.appName;

    }

    gotToHome(){
        window.location.href = '/';
    }
}

let AppHeader = {
    controller: AppHeaderCtrl,
    templateUrl: 'layout/landing/header.html',
};

export default AppHeader;
