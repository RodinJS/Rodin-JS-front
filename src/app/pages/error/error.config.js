function ErrorConfig($stateProvider) {
	'ngInject';

	$stateProvider
		.state('landing.error', {
			url: '/error',
			controller: 'ErrorCtrl',
			controllerAs: '$ctrl',
			templateUrl: 'pages/error/error.html',
			title: 'Error'
		});

}

export default ErrorConfig;
