import angular from 'angular/index';

// Create the module where our functionality can attach to
let storeModule = angular.module('landing.store', []);

// Include our UI-Router config settings
import StoreConfig from './store.config';
storeModule.config(StoreConfig);


// Include controllers
import StoreCtrl from './store.controller';
storeModule.controller('StoreCtrl', StoreCtrl);


export default storeModule;
