/**
 * Created by Reinchard on 9/14/2017.
 */
import angular from 'angular/index';

// Create the module where our functionality can attach to
let upgradePlansModule = angular.module('app.upgrade-plans', []);

// Include our UI-Router config settings
import UpgradePlansConfig from './upgrade-plans.config';
upgradePlansModule.config(UpgradePlansConfig);


// Controllers
import UpgradePlansCtrl from './upgrade-plans.controller';
upgradePlansModule.controller('UpgradePlansCtrl', UpgradePlansCtrl);


export default upgradePlansModule;
