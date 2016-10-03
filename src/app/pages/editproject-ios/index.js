import angular from 'angular/index';

// Create the module where our functionality can attach to
let editprojectIosModule = angular.module('app.editporjectIos', []);

// Include our UI-Router config settings
import EditProjectIosConfig from './editproject-ios.config';
editprojectIosModule.config(EditProjectIosConfig);


// Controllers
import EditProjectIosCtrl from './editproject-ios.controller';
editprojectIosModule.controller('EditProjectIosCtrl', EditProjectIosCtrl);


export default editprojectIosModule;
