/**
 * Created by Reinchard on 7/26/2017.
 */
import angular from 'angular/index';

// Create the module where our functionality can attach to
let featureModule = angular.module('landing.feature', []);

// Include our UI-Router config settings
import FeatureConfig from './feature';
featureModule.config(FeatureConfig);


// Controllers
import FeatureCtrl from './feature.controller';
featureModule.controller('FeatureCtrl', FeatureCtrl);


export default featureModule;
