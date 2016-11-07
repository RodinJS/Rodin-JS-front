const FiltersModule = angular.module('app.filters', []);

import bytesFilter from './bytes/index';
FiltersModule.filter('bytes', bytesFilter);

export default FiltersModule;