function HomeConfig($stateProvider) {
	'ngInject';

	$stateProvider
		.state('app.home', {
			url: '/',
			controller: 'HomeCtrl',
			controllerAs: '$ctrl',
			templateUrl: 'pages/home/home.html',
			title: 'Home',
			redirectToWhenAuthenticated: "app.dashboard"
		});

}

export default HomeConfig;
