const FiltersModule = angular.module('app.filters', []);

import Filters from './filters';

FiltersModule.filter('bytes', Filters.bytesFilter);

FiltersModule.filter('objLimitTo', Filters.objLimitTo);

FiltersModule.filter('formatDate', ['moment', Filters.formatDate]);

FiltersModule.filter('htmlize', ['$sce', Filters.htmlize]);

FiltersModule.filter('formValidator', ['$sce', Filters.formValidator]);
FiltersModule.filter('PFValidator', ['$sce', Filters.projectFormsValidator]);
FiltersModule.filter('supportFormsValidator', ['$sce', Filters.supportFormsValidator]);

export default FiltersModule;