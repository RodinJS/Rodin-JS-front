import angular from 'angular/index';

// Create the module where our functionality can attach to
let userConfirmModule = angular.module('landing.userconfirm', []);

// Include our UI-Router config settings
import UserConfirmConfig from './userConfirm.config';
userConfirmModule.config(UserConfirmConfig);


// Controllers
import UserConfirmCtrl from './userConfirm.controller';
userConfirmModule.controller('UserConfirmCtrl', UserConfirmCtrl);


export default userConfirmModule;
