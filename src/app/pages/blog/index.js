/**
 * Created by Reinchard on 6/26/2017.
 */
import angular from 'angular/index';

// Create the module where our functionality can attach to
let blogModule = angular.module('landing.blog', []);

// Include our UI-Router config settings
import BlogConfig from './blog.config';
blogModule.config(BlogConfig);


// Include controllers
import BlogCtrl from './blog.controller';
blogModule.controller('BlogCtrl', BlogCtrl);


export default blogModule;
