import angular from 'angular/index';

// Create the module where our functionality can attach to
let resetPasswordModule = angular.module('landing.resetpassword', []);

// Include our UI-Router config settings
import ResetPasswordConfig from './resetPassword.config';
resetPasswordModule.config(ResetPasswordConfig);


// Controllers
import ResetPasswordCtrl from './resetPassword.controller';
resetPasswordModule.controller('ResetPasswordCtrl', ResetPasswordCtrl);


export default resetPasswordModule;
