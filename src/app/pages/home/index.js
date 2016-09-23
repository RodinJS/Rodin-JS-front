import angular from 'angular/index';

// Create the module where our functionality can attach to
let homeModule = angular.module('landing.home', []);

// Include our UI-Router config settings
import HomeConfig from './home.config';
homeModule.config(HomeConfig);


// Controllers
import HomeCtrl from './home.controller';
homeModule.controller('HomeCtrl', HomeCtrl);


export default homeModule;
