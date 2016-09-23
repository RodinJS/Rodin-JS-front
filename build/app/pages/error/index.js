'use strict';

System.register(['angular/index', './error.config', './error.controller'], function (_export, _context) {
  "use strict";

  var angular, ErrorConfig, ErrorCtrl, errorModule;
  return {
    setters: [function (_angularIndex) {
      angular = _angularIndex.default;
    }, function (_errorConfig) {
      ErrorConfig = _errorConfig.default;
    }, function (_errorController) {
      ErrorCtrl = _errorController.default;
    }],
    execute: function () {
      errorModule = angular.module('landing.error', []);

      errorModule.config(ErrorConfig);

      // Controllers

      errorModule.controller('ErrorCtrl', ErrorCtrl);

      _export('default', errorModule);
    }
  };
});