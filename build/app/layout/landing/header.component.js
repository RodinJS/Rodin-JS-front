'use strict';

System.register([], function (_export, _context) {
	"use strict";

	var AppHeaderCtrl, AppHeader;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [],
		execute: function () {
			AppHeaderCtrl = function AppHeaderCtrl(AppConstants, $scope) {
				'ngInject';

				_classCallCheck(this, AppHeaderCtrl);

				this.appName = AppConstants.appName;
			};

			AppHeaderCtrl.$inject = ['AppConstants', '$scope'];
			AppHeader = {
				controller: AppHeaderCtrl,
				templateUrl: 'layout/landing/header.html'
			};

			_export('default', AppHeader);
		}
	};
});