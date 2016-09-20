'use strict';

System.register(['angular/index', './show-authed/index', './check-for-unique/index'], function (_export, _context) {
  "use strict";

  var angular, ShowAuthed, CheckForUnique, componentsModule;
  return {
    setters: [function (_angularIndex) {
      angular = _angularIndex.default;
    }, function (_showAuthedIndex) {
      ShowAuthed = _showAuthedIndex.default;
    }, function (_checkForUniqueIndex) {
      CheckForUnique = _checkForUniqueIndex.default;
    }],
    execute: function () {
      componentsModule = angular.module('app.components', []);

      componentsModule.directive('showAuthed', ShowAuthed);

      componentsModule.directive('checkForUnique', CheckForUnique);

      _export('default', componentsModule);
    }
  };
});