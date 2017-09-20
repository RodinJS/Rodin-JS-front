import angular from 'angular/index';

// Create the module where our functionality can attach to
let profileModule = angular.module('landing.plans', []);

// Include our UI-Router config settings
import PlansConfig from './plans.config';
profileModule.config(PlansConfig);


// Controllers
import PlansCtrl from './plans.controller';
profileModule.controller('PlansCtrl', PlansCtrl);


export default profileModule;
