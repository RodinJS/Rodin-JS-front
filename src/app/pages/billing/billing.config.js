function BillingConfig($stateProvider) {
	'ngInject';

	$stateProvider
		.state('app.billing', {
			url: '/profile/billing',
			controller: 'BillingCtrl',
			controllerAs: '$ctrl',
			templateUrl: 'pages/billing/billing.html',
			title: 'Profile',
			resolve: {
				auth: function (User) {
					return User.ensureAuthIs(true);
				}
			}
		});

}

export default BillingConfig;
