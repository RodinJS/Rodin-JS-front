function DashboardConfig($stateProvider) {
	'ngInject';

	$stateProvider
		.state('app.dashboard', {
			url: '/dashboard',
			controller: 'DashboardCtrl',
			controllerAs: '$ctrl',
			templateUrl: 'pages/dashboard/dashboard.html',
			title: 'Dashboard',
			resolve: {
				auth: function (User) {
					return User.ensureAuthIs(true);
				}
			}
		});

}

export default DashboardConfig;
