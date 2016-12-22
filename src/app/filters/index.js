const FiltersModule = angular.module('app.filters', []);

import Filters from './filters';

FiltersModule.filter('bytes', Filters.bytesFilter);

FiltersModule.filter('objLimitTo', Filters.objLimitTo);

FiltersModule.filter('formatDate', ['moment', Filters.formatDate]);

export default FiltersModule;