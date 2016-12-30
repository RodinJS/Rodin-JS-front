import angular from 'angular/index';

// Create the module where our functionality can attach to
let docsModule = angular.module('landing.docs', []);

// Include our UI-Router config settings
import DocsConfig from './docs.config';
docsModule.config(DocsConfig);


// Include controllers
import DocsCtrl from './docs.controller';
docsModule.controller('DocsCtrl', DocsCtrl);


export default docsModule;
