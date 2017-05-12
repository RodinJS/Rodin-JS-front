function ErrorConfig($stateProvider) {
	'ngInject';

	$stateProvider
		.state('landing.error', {
			url: '/error',
			controller: 'ErrorCtrl',
			controllerAs: '$ctrl',
			templateUrl: 'pages/error/error.html',
			title: 'Error',
			pageClass: 'page-404',
		});

}

export default ErrorConfig;
