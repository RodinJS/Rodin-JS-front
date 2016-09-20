'use strict';

System.register(['angular/index', './home.config', './home.controller'], function (_export, _context) {
  "use strict";

  var angular, HomeConfig, HomeCtrl, homeModule;
  return {
    setters: [function (_angularIndex) {
      angular = _angularIndex.default;
    }, function (_homeConfig) {
      HomeConfig = _homeConfig.default;
    }, function (_homeController) {
      HomeCtrl = _homeController.default;
    }],
    execute: function () {
      homeModule = angular.module('app.home', []);

      homeModule.config(HomeConfig);

      // Controllers

      homeModule.controller('HomeCtrl', HomeCtrl);

      _export('default', homeModule);
    }
  };
});