import angular from 'angular/index';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);


import ValidatorService from './validator.service';
servicesModule.factory('Validator', ValidatorService);

import ErrorService from './error.service';
servicesModule.service('Error', ErrorService);

import JwtService from './jwt.service';
servicesModule.service('JWT', JwtService);

import UserService from './user.service';
servicesModule.service('User', UserService);

import ProjectService from './project.service';
servicesModule.service('Project', ProjectService);

import ProjectTemplate from './projectTemplate.service';
servicesModule.service('ProjectTemplate', ProjectTemplate);


export default servicesModule;
