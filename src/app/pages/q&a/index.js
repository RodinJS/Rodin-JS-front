/**
 * Created by Reinchard on 7/25/2017.
 */
import angular from 'angular/index';

// Create the module where our functionality can attach to
let questionModule = angular.module('app.qa', []);

// Include our UI-Router config settings
import QuestionConfig from './question.config';
questionModule.config(QuestionConfig);


// Controllers
import QuestionCtrl from './question.controller';
questionModule.controller('ProjectCtrl', QuestionCtrl);


export default questionModule;
