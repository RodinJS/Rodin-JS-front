/**
 * Created by Reinchard on 7/26/2017.
 */
import angular from 'angular/index';

// Create the module where our functionality can attach to
let singleFeatureModule = angular.module('landing.single-feature', []);

// Include our UI-Router config settings
import SingleFeatureConfig from './single-feature';
singleFeatureModule.config(SingleFeatureConfig);


// Controllers
import SingleFeatureCtrl from './single-feature.controller';
singleFeatureModule.controller('SingleFeatureCtrl', SingleFeatureCtrl);


export default singleFeatureModule;
