'use strict';

System.register([], function (_export, _context) {
	"use strict";

	function AuthConfig($stateProvider) {
		'ngInject';

		$stateProvider.state('app.login', {
			url: '/login',
			controller: 'AuthCtrl as $ctrl',
			templateUrl: 'pages/auth/auth.html',
			title: 'Sign in',
			resolve: {
				auth: ['User', function auth(User) {
					return User.ensureAuthIs(false);
				}]
			}
		}).state('app.register', {
			url: '/register',
			controller: 'AuthCtrl as $ctrl',
			templateUrl: 'pages/auth/auth.html',
			title: 'Sign up',
			resolve: {
				auth: ['User', function auth(User) {
					return User.ensureAuthIs(false);
				}]
			}
		}).state('app.forgot', {
			url: '/forgot',
			controller: 'AuthCtrl as $ctrl',
			templateUrl: 'pages/auth/auth.html',
			title: 'Forgot Password',
			resolve: {
				auth: ['User', function auth(User) {
					return User.ensureAuthIs(false);
				}]
			}
		});
	}return {
		setters: [],
		execute: function () {
			AuthConfig.$inject = ['$stateProvider'];
			;

			_export('default', AuthConfig);
		}
	};
});