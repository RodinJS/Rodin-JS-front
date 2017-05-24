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

import NotificationsStore from './notifications.store';
storeModules.factory('NotificationsStore', NotificationsStore);

import ModulesStore from './modules.store';
storeModules.factory('ModulesStore', ModulesStore);

import PagesStore from './pages.store';
storeModules.factory('PagesStore', PagesStore);


export default storeModules;
