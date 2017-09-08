/**
 * Created by kh.levon98 on 13-Sep-16.
 */
import './helpers';

import angular from 'angular/index';
import 'jquery/dist/jquery.min';
import './assists/jquery.form';
import moment from 'moment/min/moment.min.js';
import './components/bootstrapMarkdown/js/bootstrap-markdown';
// Import our app config files
import constants  from './config/app.constants';
import appConfig  from './config/app.config';
import appRun     from './config/app.run';

// Import our dependencies
import 'angular-animate/angular-animate.min';
import 'angular-touch/angular-touch.min';
import 'angular-cookies/angular-cookies.min';

import 'angular-ui-router/release/angular-ui-router.min';
import 'angular-storage/dist/angular-storage.min';
import 'lodash/lodash.min';
import 'restangular/dist/restangular.min';
import 'angular-ui-bootstrap/dist/ui-bootstrap-tpls';
import 'angular-ui-switch/angular-ui-switch.min';
import 'angular-ui-notification/dist/angular-ui-notification';
import 'ng-tags-input/build/ng-tags-input.min';
import 'angular-img-cropper/dist/angular-img-cropper.min';
import 'ui-select/dist/select';
import 'angular-sanitize/angular-sanitize';
import 'angular-highlightjs/src/angular-highlightjs';
import 'angular-markdown-editor/src/angular-markdown-editor';
import 'angular-marked/dist/angular-marked.min';

// Import our app functionaity
import './config/app.templates';
import './services/index';
import './store/index';
import './components/index';
import './layout/index';
import './pages/index';
import './filters/index';
import HelpDescComponent from './components/help-desc/index';
import SingleDescComponent from "./components/help-desc/single-desc/index";

// Create and bootstrap application
const requires = [
    'ngAnimate',
    'ngTouch',
    'ngCookies',
    'ui.router',
    'angular-storage',
    'restangular',
    'templates',
    'ui.bootstrap',
    'app.services',
    'app.store',
    'app.components',
    'app.layout',
    'app.pages',
    'app.filters',
    'uiSwitch',
    'ngTagsInput',
    'ui-notification',
    'angular-img-cropper',
    'ui.select',
    'ngSanitize',
    'hc.marked',
    'angular-markdown-editor',
    'hljs'
];

// Mount on window for testing
const app = angular.module('app', requires);

angular.module('app').constant('AppConstants', constants);

app.constant("moment", moment);

angular.module('app').config(appConfig);

angular.module('app').run(appRun);

app.component('helpDesc', HelpDescComponent);
app.component('singleDesc', SingleDescComponent);

angular.bootstrap(document, ['app'], {
    strictDi: true
});

