import angular from 'angular/index';

// Create the module where our functionality can attach to
let editprojectOculusModule = angular.module('app.editporjectOculus', []);

// Include our UI-Router config settings
import EditProjectOculusConfig from './editproject-oculus.config';
editprojectOculusModule.config(EditProjectOculusConfig);


// Controllers
import EditProjectOculusCtrl from './editproject-oculus.controller';
editprojectOculusModule.controller('EditProjectOculusCtrl', EditProjectOculusCtrl);


export default editprojectOculusModule;
