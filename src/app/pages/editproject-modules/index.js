import angular from 'angular/index';

// Create the module where our functionality can attach to
let editprojectModulesModules = angular.module('app.editporjectModules', []);

// Include our UI-Router config settings
import EditProjectWebConfig from './editproject-modules.config';
editprojectModulesModules.config(EditProjectWebConfig);

// Controllers
import EditProjectModulesCtrl from './editproject-modules.controller';
editprojectModulesModules.controller('EditProjectModulesCtrl', EditProjectModulesCtrl);

export default editprojectModulesModules;
