/**
 * Created by kh.levon98 on 14-Sep-16.
 */
import angular from 'angular/index';

import './auth/index';

import './home/index';

import './error/index';

import './dashboard/index';

import './profile/index';


// Create the module where our functionality can attach to
let pagesModule = angular.module('app.pages', [
	'landing.auth',
	'landing.home',
	'landing.error',

	'app.dashboard',
	'app.profile',
]);


export default pagesModule;
