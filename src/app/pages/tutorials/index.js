import angular from 'angular/index';

// Create the module where our functionality can attach to
let tutorialsModule = angular.module('landing.tutorials', []);

// Include our UI-Router config settings
import TutorialsConfig from './tutorials.config';
tutorialsModule.config(TutorialsConfig);


// Include controllers
import TutorialsCtrl from './tutorials.controller';
tutorialsModule.controller('TutorialsCtrl', TutorialsCtrl);


export default tutorialsModule;
