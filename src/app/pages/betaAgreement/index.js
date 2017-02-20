import angular from 'angular/index';

// Create the module where our functionality can attach to
let betaModule = angular.module('landing.betaAgreement', []);

// Include our UI-Router config settings
import BetaConfig from './beta.config';
betaModule.config(BetaConfig);


// Include controllers
import BetaCtrl from './beta.controller';
betaModule.controller('BetaCtrl', BetaCtrl);


export default betaModule;
