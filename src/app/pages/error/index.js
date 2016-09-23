import angular from 'angular/index';

// Create the module where our functionality can attach to
let errorModule = angular.module('landing.error', []);

// Include our UI-Router config settings
import ErrorConfig from './error.config';
errorModule.config(ErrorConfig);


// Controllers
import ErrorCtrl from './error.controller';
errorModule.controller('ErrorCtrl', ErrorCtrl);


export default errorModule;
