import angular from 'angular/index';

// Create the module where our functionality can attach to
let layoutModule = angular.module('app.layout', []);


// Main Layout
import AppHeader from './main/header.component';
layoutModule.component('appHeader', AppHeader);

/*
**
 */
import AppHeaderNew from './header/header.component';
layoutModule.component('appHeaderNew', AppHeaderNew);
/*
**
 */
import AppFooter from './main/footer.component';
layoutModule.component('appFooter', AppFooter);


// Landing Layout
import LandingHeader from './landing/header.component';
layoutModule.component('landingHeader', LandingHeader);

import LandingFooter from './landing/footer.component';
layoutModule.component('landingFooter', LandingFooter);


export default layoutModule;
