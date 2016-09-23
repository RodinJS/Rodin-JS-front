class AppHeaderCtrl {
	constructor(AppConstants, $scope) {
		'ngInject';

		this.appName = AppConstants.appName;
	}
}

let AppHeader = {
	controller: AppHeaderCtrl,
	templateUrl: 'layout/landing/header.html'
};

export default AppHeader;
