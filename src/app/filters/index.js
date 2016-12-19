const FiltersModule = angular.module('app.filters', []);

import bytesFilter from './bytes/index';
FiltersModule.filter('bytes', bytesFilter);

import objLimitTo from './objLimitTo/index';
FiltersModule.filter('objLimitTo', objLimitTo);

export default FiltersModule;