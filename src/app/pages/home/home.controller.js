class HomeCtrl {
	constructor(AppConstants, $state) {
		'ngInject';

		this.appName = AppConstants.appName;
		$state.go("landing.login");
	}

}

export default HomeCtrl;
