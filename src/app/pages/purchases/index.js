import angular from 'angular/index';

// Create the module where our functionality can attach to
let profileModule = angular.module('app.purchases', []);

// Include our UI-Router config settings
import PurchasesConfig from './purchases.config';
profileModule.config(PurchasesConfig);


// Controllers
import PurchasesCtrl from './purchases.controller';
profileModule.controller('PurchasesCtrl', PurchasesCtrl);


export default profileModule;
