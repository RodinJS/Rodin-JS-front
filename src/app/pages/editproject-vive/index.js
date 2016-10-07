import angular from 'angular/index';

// Create the module where our functionality can attach to
let editprojectViveModule = angular.module('app.editporjectVive', []);

// Include our UI-Router config settings
import EditProjectViveConfig from './editproject-vive.config';
editprojectViveModule.config(EditProjectViveConfig);


// Controllers
import EditProjectViveCtrl from './editproject-vive.controller';
editprojectViveModule.controller('EditProjectViveCtrl', EditProjectViveCtrl);


export default editprojectViveModule;
