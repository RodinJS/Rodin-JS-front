/**
 * Created by kh.levon98 on 14-Sep-16.
 */
import angular from 'angular/index';

import './demo/index';

import './auth/index';

import './home/index';

import './error/index';

import './userConfirm/index';

import './resetPassword/index';

import './dashboard/index';

import './profile/index';

import './project/index';

import './editproject/index';

import './plans/index';

import './billing/index';

import './purchases/index';

import './editproject-ios/index';

import './editproject-android/index';

import './editproject-oculus/index';

import './editproject-vive/index';

import './editproject-web/index';

import './editproject-publish/index';

import './editproject-modules/index';

import './discover/index';

import './tutorials/index';

import './docs/index';

import './store/index';

import './faq/index';

import './betaAgreement/index';

import './privacy/index';

import './contentPages/index';

// Create the module where our functionality can attach to
let pagesModule = angular.module('app.pages', [
    'landing.auth',
    'landing.home',
    'landing.demo',
    'landing.error',
    'landing.userconfirm',
    'landing.resetpassword',
    'landing.discover',
    'landing.tutorials',
    'landing.docs',
    'landing.store',
    'landing.faq',
    'landing.privacy',
    'landing.pages',
    'landing.betaAgreement',

    'app.dashboard',
    'app.profile',

    'app.project',
    'app.editproject',
    'app.editporjectIos',
    'app.editporjectModules',
    'app.editprojectAndroid',
    'app.editporjectOculus',
    'app.editporjectVive',
    'app.editporjectWeb',
    'app.editporjectPublish',

    'app.plans',
    'app.billing',
    'app.purchases',
]);

export default pagesModule;
