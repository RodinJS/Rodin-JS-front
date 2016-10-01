import angular from 'angular/index';

// Create the module where our functionality can attach to
let profileModule = angular.module('app.billing', []);

// Include our UI-Router config settings
import BillingConfig from './billing.config';
profileModule.config(BillingConfig);


// Controllers
import BillingCtrl from './billing.controller';
profileModule.controller('BillingCtrl', BillingCtrl);


export default profileModule;
