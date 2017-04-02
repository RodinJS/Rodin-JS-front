import angular from 'angular/index';

// Create the module where our functionality can attach to
let pagesModule = angular.module('landing.pages', []);

// Include our UI-Router config settings
import pagesConfig from './pages.config';
pagesModule.config(pagesConfig);


// Include controllers
import PagesCtrl from './pages.controller';
pagesModule.controller('PagesCtrl', PagesCtrl);

export default pagesModule;
