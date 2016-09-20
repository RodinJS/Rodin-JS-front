'use strict';

System.register(['angular/index', './dashboard.config', './dashboard.controller'], function (_export, _context) {
  "use strict";

  var angular, DashboardConfig, DashboardCtrl, dashboardModule;
  return {
    setters: [function (_angularIndex) {
      angular = _angularIndex.default;
    }, function (_dashboardConfig) {
      DashboardConfig = _dashboardConfig.default;
    }, function (_dashboardController) {
      DashboardCtrl = _dashboardController.default;
    }],
    execute: function () {
      dashboardModule = angular.module('app.dashboard', []);

      dashboardModule.config(DashboardConfig);

      // Controllers

      dashboardModule.controller('DashboardCtrl', DashboardCtrl);

      _export('default', dashboardModule);
    }
  };
});