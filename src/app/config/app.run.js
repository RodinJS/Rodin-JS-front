/**
 * Created by kh.levon98 on 13-Sep-16.
 */
function AppRun(AppConstants, $rootScope, Restangular, JWT, $state, User, $timeout) {
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
			$timeout(()=> {
				$state.go("landing.login");
			}, 100);
			return false; // error handled
		}

		return true; // error not handled
	});


	// change page title based on state
	$rootScope.$on('$stateChangeSuccess', (event, toState) => {
		$rootScope.setPageTitle(toState.title);
		$rootScope.setPageClass(toState.pageClass);
	});

	$rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
		if (toState.redirectToWhenAuthenticated && JWT.get()) {
			// User isn’t authenticated
			$state.go(toState.redirectToWhenAuthenticated);
			event.preventDefault();
		}
	});

	// Helper method for setting the page's title
	$rootScope.setPageTitle = (title) => {
		$rootScope.pageTitle = '';
		if (title) {
			$rootScope.pageTitle += title;
			$rootScope.pageTitle += ' \u2014 ';
		}
		$rootScope.pageTitle += AppConstants.appName;
	};

	$rootScope.pageClass = "";
	$rootScope.setPageClass = (pageClass = "") => {
		$rootScope.pageClass = pageClass;
	}

}

export default AppRun;
