import angular from 'angular/index';

// Create the module where our functionality can attach to
let privacyModule = angular.module('landing.privacy', []);

// Include our UI-Router config settings
import PrivacyConfig from './privacy.config';
privacyModule.config(PrivacyConfig);


// Include controllers
import PrivacyCtrl from './privacy.controller';
privacyModule.controller('PrivacyCtrl', PrivacyCtrl);


export default privacyModule;
