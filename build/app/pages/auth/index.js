'use strict';

System.register(['angular/index', './auth.config', './auth.controller'], function (_export, _context) {
  "use strict";

  var angular, AuthConfig, AuthCtrl, authModule;
  return {
    setters: [function (_angularIndex) {
      angular = _angularIndex.default;
    }, function (_authConfig) {
      AuthConfig = _authConfig.default;
    }, function (_authController) {
      AuthCtrl = _authController.default;
    }],
    execute: function () {
      authModule = angular.module('app.auth', []);

      authModule.config(AuthConfig);

      // Include controllers

      authModule.controller('AuthCtrl', AuthCtrl);

      _export('default', authModule);
    }
  };
});