function PlansConfig($stateProvider) {
	'ngInject';

	$stateProvider
		.state('landing.plans', {
			url: '/plans',
			controller: 'PlansCtrl',
			controllerAs: '$ctrl',
			templateUrl: 'pages/plans/plans.html',
			title: 'Profile',
			showFooter: true,
            slug: 'landing.plans',
            resolve: {
				auth: function (User) {
					// return User.ensureAuthIs(true);
				}
			}
		})
}

export default PlansConfig;
