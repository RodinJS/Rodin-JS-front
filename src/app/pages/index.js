/**
 * Created by kh.levon98 on 14-Sep-16.
 */
import angular from 'angular/index';

import './auth/index';

import './home/index';

import './dashboard/index';

import './error/index';


// Create the module where our functionality can attach to
let pagesModule = angular.module('app.pages', [
	'landing.auth',
	'landing.home',
	'app.dashboard',
	'landing.error',
]);


export default pagesModule;
