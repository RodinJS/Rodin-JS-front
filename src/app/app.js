/**
 * Created by kh.levon98 on 13-Sep-16.
 */
import angular from 'angular/index';

// Import our app config files
import constants  from './config/app.constants';
import appConfig  from './config/app.config';
import appRun     from './config/app.run';

// Import our dependencies
import 'angular-ui-router/release/angular-ui-router.min';
import 'a0-angular-storage/dist/angular-storage.min';
import 'lodash/dist/lodash.min';
import 'restangular/dist/restangular.min';
import 'angular-bootstrap/ui-bootstrap.min';

// Import our templates file (generated by Gulp)
import './config/app.templates';
// Import our app functionaity
import './services/index';
import './components/index';
import './layout/index';
import './pages/index';

// Create and bootstrap application
const requires = [
	'ui.router',
	'angular-storage',
	'restangular',
	'templates',
	'ui.bootstrap',
	'app.services',
	'app.components',
	'app.layout',
	'app.pages'
];

// Mount on window for testing
const app = angular.module('app', requires);

angular.module('app').constant('AppConstants', constants);

angular.module('app').config(appConfig);

angular.module('app').run(appRun);

angular.bootstrap(document, ['app'], {
	strictDi: true
});
