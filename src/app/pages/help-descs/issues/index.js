/**
 * Created by Reinchard on 7/26/2017.
 */
import angular from 'angular/index';

// Create the module where our functionality can attach to
let issuesModule = angular.module('landing.issue', []);

// Include our UI-Router config settings
import IssuesConfig from './issues';
issuesModule.config(IssuesConfig);


// Controllers
import IssuesCtrl from './issues.controller';
issuesModule.controller('IssuesCtrl', IssuesCtrl);


export default issuesModule;
