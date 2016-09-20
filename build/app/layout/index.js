'use strict';

System.register(['angular/index', './main/header.component', './main/footer.component'], function (_export, _context) {
  "use strict";

  var angular, AppHeader, AppFooter, layoutModule;
  return {
    setters: [function (_angularIndex) {
      angular = _angularIndex.default;
    }, function (_mainHeaderComponent) {
      AppHeader = _mainHeaderComponent.default;
    }, function (_mainFooterComponent) {
      AppFooter = _mainFooterComponent.default;
    }],
    execute: function () {
      layoutModule = angular.module('app.layout', []);

      layoutModule.component('appHeader', AppHeader);

      layoutModule.component('appFooter', AppFooter);

      _export('default', layoutModule);
    }
  };
});