/**
 * Created by xgharibyan on 11/1/16.
 */


import angular from 'angular/index';

// Create the module where our functionality can attach to
let storeModules = angular.module('app.store', []);


import BaseStore from './base.store';
storeModules.factory('BaseStore', BaseStore);

import EventBus from './event.bus';
storeModules.factory('EventBus', EventBus);

import ProjectStore from './project.store';
storeModules.factory('ProjectStore', ProjectStore);


export default storeModules;
