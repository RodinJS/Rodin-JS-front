import angular from 'angular/index';

// Create the module where our functionality can attach to
let faqModule = angular.module('landing.faq', []);

// Include our UI-Router config settings
import FaqConfig from './faq.config';
faqModule.config(FaqConfig);


// Include controllers
import FaqCtrl from './faq.controller';
faqModule.controller('FaqCtrl', FaqCtrl);


export default faqModule;
