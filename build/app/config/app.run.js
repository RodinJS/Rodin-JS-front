"use strict";

System.register([], function (_export, _context) {
	"use strict";

	/**
  * Created by kh.levon98 on 13-Sep-16.
  */
	function AppRun(AppConstants, $rootScope, Restangular, JWT, $state) {
		'ngInject';

		Restangular.addFullRequestInterceptor(function (element, operation, route, url, headers, params, httpConfig) {
			headers["x-access-token"] = JWT.get();
			return {
				headers: headers
			};
		});

		Restangular.setErrorInterceptor(function (response, deferred, responseHandler) {
			if (response.status === 401) {
				JWT.destroy();
				$state.go("landing.login");
				return false; // error handled
			}

			return true; // error not handled
		});

		// change page title based on state
		$rootScope.$on('$stateChangeSuccess', function (event, toState) {
			$rootScope.setPageTitle(toState.title);
		});

		$rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
			if (toState.redirectToWhenAuthenticated && JWT.get()) {
				// User isn’t authenticated
				$state.go(toState.redirectToWhenAuthenticated);
				event.preventDefault();
			}
		});

		// Helper method for setting the page's title
		$rootScope.setPageTitle = function (title) {
			$rootScope.pageTitle = '';
			if (title) {
				$rootScope.pageTitle += title;
				$rootScope.pageTitle += " — ";
			}
			$rootScope.pageTitle += AppConstants.appName;
		};
	}

	return {
		setters: [],
		execute: function () {
			AppRun.$inject = ["AppConstants", "$rootScope", "Restangular", "JWT", "$state"];

			_export("default", AppRun);
		}
	};
});