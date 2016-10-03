function DemoConfig($stateProvider) {
	'ngInject';
	$stateProvider
		.state('landing.demo', {
			url: '/demo',
			controller: 'DemoCtrl as $ctrl',
			title: 'Demo Page',
			resolve: {
				auth: function (User) {
					return User.ensureAuthIs(false);
				}
			}
		})

}

export default DemoConfig;
