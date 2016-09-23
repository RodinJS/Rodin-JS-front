"use strict";

System.register([], function (_export, _context) {
	"use strict";

	/**
  * Created by kh.levon98 on 13-Sep-16.
  */

	function AppConfig(RestangularProvider, $stateProvider, $locationProvider, $urlRouterProvider, AppConstants) {
		'ngInject';

		RestangularProvider.setBaseUrl(AppConstants[AppConstants.env + "API"]);

		// In this case we are mapping the id of each element to the _id field.
		RestangularProvider.setRestangularFields({
			id: "_id"
		});

		// $locationProvider.html5Mode(true);

		$stateProvider.state('app', {
			abstract: true,
			templateUrl: 'layout/main/app-view.html',
			resolve: {
				auth: ["User", function auth(User) {
					return User.verifyAuth(true);
				}]
			}
		}).state('landing', {
			abstract: true,
			templateUrl: 'layout/landing/landing-view.html',
			resolve: {
				auth: ["User", function auth(User) {
					return User.verifyAuth(false);
				}]
			}
		});

		$urlRouterProvider.otherwise('/error');
	}

	return {
		setters: [],
		execute: function () {
			AppConfig.$inject = ["RestangularProvider", "$stateProvider", "$locationProvider", "$urlRouterProvider", "AppConstants"];

			_export("default", AppConfig);
		}
	};
});