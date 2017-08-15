/**
 * Created by Reinchard on 7/26/2017.
 */
import angular from 'angular/index';

// Create the module where our functionality can attach to
let singleQuestionModule = angular.module('landing.single-question', []);

// Include our UI-Router config settings
import SingleQuestionConfig from './single-question';
singleQuestionModule.config(SingleQuestionConfig);


// Controllers
import SingleQuestionCtrl from './single-question.controller';
singleQuestionModule.controller('SingleQuestionCtrl', SingleQuestionCtrl);


export default singleQuestionModule;
