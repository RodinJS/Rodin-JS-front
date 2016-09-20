'use strict';

System.register([], function (_export, _context) {
	"use strict";

	/**
  * Created by kh.levon98 on 13-Sep-16.
  */
	function authInterceptor(JWT, AppConstants, $window, $q) {
		'ngInject';

		return {
			// automatically attach Authorization header
			request: function request(config) {
				if (config.url.indexOf(AppConstants.api) === 0 && JWT.get()) {
					config.headers.Authorization = 'Token ' + JWT.get();
				}
				return config;
			},

			// Handle 401
			responseError: function responseError(rejection) {
				if (rejection.status === 401) {
					// clear any JWT token being stored
					JWT.destroy();
					// do a hard page refresh
					$window.location.reload();
				}
				return $q.reject(rejection);
			}

		};
	}

	return {
		setters: [],
		execute: function () {
			authInterceptor.$inject = ['JWT', 'AppConstants', '$window', '$q'];

			_export('default', authInterceptor);
		}
	};
});