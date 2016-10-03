import angular from 'angular/index';

// Create the module where our functionality can attach to
let demoModule = angular.module('landing.demo', []);

// Include our UI-Router config settings
import DemoConfig from './demo.config';
demoModule.config(DemoConfig);


// Include controllers
import DemoCtrl from './demo.controller';
demoModule.controller('DemoCtrl', DemoCtrl);


export default demoModule;
