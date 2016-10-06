/**
 * Created by kh.levon98 on 13-Sep-16.
 */
function authInterceptor(JWT, AppConstants, $window, $q, $timeout) {
	'ngInject'

	return {
		// automatically attach Authorization header
		request: function (config) {
			if (config.url.indexOf(AppConstants.api) === 0 && JWT.get()) {
				config.headers.Authorization = 'Token ' + JWT.get();
			}
			return config;
		},

		// Handle 401
		responseError: function (rejection) {
			if (rejection.status === 401) {
				// clear any JWT token being stored
				JWT.destroy();
				$timeout(()=> {
					// do a hard page refresh
					$window.location.reload();
				}, 100);
			}
			return $q.reject(rejection);
		}

	}
}

export default authInterceptor;
