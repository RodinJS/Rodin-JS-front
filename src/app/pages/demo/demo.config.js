function DemoConfig($stateProvider) {
	'ngInject';
	$stateProvider
		.state('landing.demo', {
			url: '/demo',
			controller: 'DemoCtrl as $ctrl',
			title: 'Demo Page',
			redirectToWhenAuthenticated: "app.dashboard"
		})

}

export default DemoConfig;
