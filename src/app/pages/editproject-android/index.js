import angular from 'angular/index';

// Create the module where our functionality can attach to
let editprojectAndroidModule = angular.module('app.editprojectAndroid', []);

// Include our UI-Router config settings
import EditProjectAndroidConfig from './editproject-android.config';
editprojectAndroidModule.config(EditProjectAndroidConfig);


// Controllers
import EditProjectAndroidCtrl from './editproject-android.controller';
editprojectAndroidModule.controller('EditProjectAndroidCtrl', EditProjectAndroidCtrl);


export default editprojectAndroidModule;
