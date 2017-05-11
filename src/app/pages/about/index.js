import angular from 'angular/index';

// Create the module where our functionality can attach to
let aboutModule = angular.module('landing.about', []);

// Include our UI-Router config settings
import AboutConfig from './about.config';
aboutModule.config(AboutConfig);


// Include controllers
import AboutCtrl from './about.controller';
aboutModule.controller('AboutCtrl', AboutCtrl);


export default aboutModule;
