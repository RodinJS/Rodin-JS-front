import angular from 'angular/index';

// Create the module where our functionality can attach to
let samplesModule = angular.module('landing.samples', []);

// Include our UI-Router config settings
import SamplesConfig from './samples.config';
samplesModule.config(SamplesConfig);


// Controllers
import SamplesCtrl from './samples.controller';
samplesModule.controller('SamplesCtrl', SamplesCtrl);


export default samplesModule;
