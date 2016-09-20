'use strict';

System.register([], function (_export, _context) {
	"use strict";

	function ErrorConfig($stateProvider) {
		'ngInject';

		$stateProvider.state('app.error', {
			url: '/error',
			controller: 'ErrorCtrl',
			controllerAs: '$ctrl',
			templateUrl: 'pages/error/error.html',
			title: 'Error'
		});
	}

	return {
		setters: [],
		execute: function () {
			ErrorConfig.$inject = ['$stateProvider'];

			_export('default', ErrorConfig);
		}
	};
});