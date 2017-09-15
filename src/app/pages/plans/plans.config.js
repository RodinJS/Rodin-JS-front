function PlansConfig($stateProvider) {
	'ngInject';

	$stateProvider
		.state('app.plans', {
			url: '/profile/plans',
			controller: 'PlansCtrl',
			controllerAs: '$ctrl',
			templateUrl: 'pages/plans/plans.html',
			title: 'Profile',
			showFooter: true,
			resolve: {
				auth: function (User) {
					return User.ensureAuthIs(true);
				}
			}
		})
}

export default PlansConfig;
