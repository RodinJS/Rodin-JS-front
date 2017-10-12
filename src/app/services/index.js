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

import SocketService from './socket.service';
servicesModule.factory('SocketService', SocketService);

import AnalyserService from './analyser.service';
servicesModule.factory('Analyser', AnalyserService);

import VCSService from './vcs.service';
servicesModule.service('VCS', VCSService);

import ModulesService from './modules.service';
servicesModule.service('ModulesService', ModulesService);

import PagesService from './pages.service';
servicesModule.service('PagesService', PagesService);

import HelpDescService from './help-desc.service';
servicesModule.service('HelpDescService', HelpDescService);

import MenusService from './menus.service';
servicesModule.service('MenusService', MenusService);

import PaymentService from './payment.service';
servicesModule.service('PaymentService', PaymentService);

export default servicesModule;
