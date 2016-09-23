'use strict';

System.register(['angular/index', './validator.service', './error.service', './jwt.service', './user.service', './project.service'], function (_export, _context) {
  "use strict";

  var angular, ValidatorService, ErrorService, JwtService, UserService, ProjectService, servicesModule;
  return {
    setters: [function (_angularIndex) {
      angular = _angularIndex.default;
    }, function (_validatorService) {
      ValidatorService = _validatorService.default;
    }, function (_errorService) {
      ErrorService = _errorService.default;
    }, function (_jwtService) {
      JwtService = _jwtService.default;
    }, function (_userService) {
      UserService = _userService.default;
    }, function (_projectService) {
      ProjectService = _projectService.default;
    }],
    execute: function () {
      servicesModule = angular.module('app.services', []);

      servicesModule.factory('Validator', ValidatorService);

      servicesModule.service('Error', ErrorService);

      servicesModule.service('JWT', JwtService);

      servicesModule.service('User', UserService);

      servicesModule.service('Project', ProjectService);

      _export('default', servicesModule);
    }
  };
});