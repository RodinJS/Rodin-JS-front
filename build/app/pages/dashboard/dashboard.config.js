'use strict';

System.register([], function (_export, _context) {
	"use strict";

	function DashboardConfig($stateProvider) {
		'ngInject';

		$stateProvider.state('app.dashboard', {
			url: '/dashboard',
			controller: 'DashboardCtrl',
			controllerAs: '$ctrl',
			templateUrl: 'pages/dashboard/dashboard.html',
			title: 'Dashboard',
			resolve: {
				auth: ['User', function auth(User) {
					return User.ensureAuthIs(true);
				}]
			}
		});
	}

	return {
		setters: [],
		execute: function () {
			DashboardConfig.$inject = ['$stateProvider'];

			_export('default', DashboardConfig);
		}
	};
});