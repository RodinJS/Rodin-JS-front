import angular from 'angular/index';

// Create the module where our functionality can attach to
let editprojectPublishModule = angular.module('app.editporjectPublish', []);

// Include our UI-Router config settings
import EditProjectPublishConfig from './editproject-publish.config';
editprojectPublishModule.config(EditProjectPublishConfig);


// Controllers
import EditProjectPublishCtrl from './editproject-publish.controller';
editprojectPublishModule.controller('EditProjectPublishCtrl', EditProjectPublishCtrl);


export default editprojectPublishModule;
