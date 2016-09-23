'use strict';

System.register(['angular/index', './config/app.constants', './config/app.config', './config/app.run', 'angular-ui-router/release/angular-ui-router.min', 'a0-angular-storage/dist/angular-storage.min', 'lodash/dist/lodash.min', 'restangular/dist/restangular.min', 'angular-bootstrap/ui-bootstrap.min', './config/app.templates', './services/index', './components/index', './layout/index', './pages/index'], function (_export, _context) {
	"use strict";

	var angular, constants, appConfig, appRun, requires, app;
	return {
		setters: [function (_angularIndex) {
			angular = _angularIndex.default;
		}, function (_configAppConstants) {
			constants = _configAppConstants.default;
		}, function (_configAppConfig) {
			appConfig = _configAppConfig.default;
		}, function (_configAppRun) {
			appRun = _configAppRun.default;
		}, function (_angularUiRouterReleaseAngularUiRouterMin) {}, function (_a0AngularStorageDistAngularStorageMin) {}, function (_lodashDistLodashMin) {}, function (_restangularDistRestangularMin) {}, function (_angularBootstrapUiBootstrapMin) {}, function (_configAppTemplates) {}, function (_servicesIndex) {}, function (_componentsIndex) {}, function (_layoutIndex) {}, function (_pagesIndex) {}],
		execute: function () {
			requires = ['ui.router', 'angular-storage', 'restangular', 'templates', 'ui.bootstrap', 'app.services', 'app.components', 'app.layout', 'app.pages'];
			app = angular.module('app', requires);


			angular.module('app').constant('AppConstants', constants);

			angular.module('app').config(appConfig);

			angular.module('app').run(appRun);

			angular.bootstrap(document, ['app'], {
				strictDi: true
			});
		}
	};
});