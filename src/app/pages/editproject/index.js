import angular from 'angular/index';

// Create the module where our functionality can attach to
let editprojectModule = angular.module('app.editproject', []);

// Include our UI-Router config settings
import EditProjectConfig from './editproject.config';
editprojectModule.config(EditProjectConfig);


// Controllers
import EditProjectCtrl from './editproject.controller';
editprojectModule.controller('EditProjectCtrl', EditProjectCtrl);


export default editprojectModule;
