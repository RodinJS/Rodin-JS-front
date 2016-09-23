'use strict';

System.register(['angular/index', './main/header.component', './main/footer.component', './landing/header.component', './landing/footer.component'], function (_export, _context) {
  "use strict";

  var angular, AppHeader, AppFooter, LandingHeader, LandingFooter, layoutModule;
  return {
    setters: [function (_angularIndex) {
      angular = _angularIndex.default;
    }, function (_mainHeaderComponent) {
      AppHeader = _mainHeaderComponent.default;
    }, function (_mainFooterComponent) {
      AppFooter = _mainFooterComponent.default;
    }, function (_landingHeaderComponent) {
      LandingHeader = _landingHeaderComponent.default;
    }, function (_landingFooterComponent) {
      LandingFooter = _landingFooterComponent.default;
    }],
    execute: function () {
      layoutModule = angular.module('app.layout', []);

      layoutModule.component('appHeader', AppHeader);

      layoutModule.component('appFooter', AppFooter);

      // Landing Layout

      layoutModule.component('landingHeader', LandingHeader);

      layoutModule.component('landingFooter', LandingFooter);

      _export('default', layoutModule);
    }
  };
});