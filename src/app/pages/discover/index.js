import angular from 'angular/index';

// Create the module where our functionality can attach to
let discoverModule = angular.module('landing.discover', []);

// Include our UI-Router config settings
import DiscoverConfig from './discover.config';
discoverModule.config(DiscoverConfig);


// Include controllers
import DiscoverCtrl from './discover.controller';
discoverModule.controller('DiscoverCtrl', DiscoverCtrl);


export default discoverModule;
