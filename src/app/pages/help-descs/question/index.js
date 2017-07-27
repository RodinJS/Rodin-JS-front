/**
 * Created by Reinchard on 7/25/2017.
 */
import angular from 'angular/index';

// Create the module where our functionality can attach to
let questionModule = angular.module('landing.question', []);

// Include our UI-Router config settings
import QuestionConfig from './question';
questionModule.config(QuestionConfig);


// Controllers
import QuestionCtrl from './question.controller';
questionModule.controller('QuestionCtrl', QuestionCtrl);


export default questionModule;
