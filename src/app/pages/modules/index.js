import angular from 'angular/index';

// Create the module where our functionality can attach to
let modulesModule = angular.module('modules', []);

// Include our UI-Router config settings
import ModulesConfig from './modules.config';
modulesModule.config(ModulesConfig);


// Include controllers
import ModulesCtrl from './modules.controller';
modulesModule.controller('ModulesCtrl', ModulesCtrl);


export default modulesModule;
