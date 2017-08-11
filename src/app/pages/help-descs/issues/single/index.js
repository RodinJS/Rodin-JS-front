/**
 * Created by Reinchard on 7/26/2017.
 */
import angular from 'angular/index';

// Create the module where our functionality can attach to
let singleIssueModule = angular.module('landing.single-issue', []);

// Include our UI-Router config settings
import SingleIssueConfig from './single-issue';
singleIssueModule.config(SingleIssueConfig);


// Controllers
import SingleIssueCtrl from './single-issue.controller';
singleIssueModule.controller('SingleIssueCtrl', SingleIssueCtrl);


export default singleIssueModule;
