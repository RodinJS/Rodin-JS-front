'use strict';

System.register(['angular/index', './auth/index', './home/index', './dashboard/index', './error/index'], function (_export, _context) {
	"use strict";

	var angular, pagesModule;
	return {
		setters: [function (_angularIndex) {
			angular = _angularIndex.default;
		}, function (_authIndex) {}, function (_homeIndex) {}, function (_dashboardIndex) {}, function (_errorIndex) {}],
		execute: function () {
			pagesModule = angular.module('app.pages', ['app.auth', 'app.home', 'app.dashboard', 'app.error']);

			_export('default', pagesModule);
		}
	};
});