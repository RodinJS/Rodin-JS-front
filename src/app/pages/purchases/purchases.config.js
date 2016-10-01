function PurchasesConfig($stateProvider) {
	'ngInject';

	$stateProvider
		.state('app.purchases', {
			url: '/profile/purchases',
			controller: 'PurchasesCtrl',
			controllerAs: '$ctrl',
			templateUrl: 'pages/purchases/purchases.html',
			title: 'Profile',
			resolve: {
				auth: function (User) {
					return User.ensureAuthIs(true);
				}
			}
		});

}

export default PurchasesConfig;
