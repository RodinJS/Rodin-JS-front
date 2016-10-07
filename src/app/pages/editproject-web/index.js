import angular from 'angular/index';

// Create the module where our functionality can attach to
let editprojectWebModule = angular.module('app.editporjectWeb', []);

// Include our UI-Router config settings
import EditProjectWebConfig from './editproject-web.config';
editprojectWebModule.config(EditProjectWebConfig);


// Controllers
import EditProjectWebCtrl from './editproject-web.controller';
editprojectWebModule.controller('EditProjectWebCtrl', EditProjectWebCtrl);


export default editprojectWebModule;
