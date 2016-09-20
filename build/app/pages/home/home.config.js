'use strict';

System.register([], function (_export, _context) {
	"use strict";

	function HomeConfig($stateProvider) {
		'ngInject';

		$stateProvider.state('app.home', {
			url: '/',
			controller: 'HomeCtrl',
			controllerAs: '$ctrl',
			templateUrl: 'pages/home/home.html',
			title: 'Home',
			redirectToWhenAuthenticated: "app.dashboard"
		});
	}

	return {
		setters: [],
		execute: function () {
			HomeConfig.$inject = ['$stateProvider'];

			_export('default', HomeConfig);
		}
	};
});