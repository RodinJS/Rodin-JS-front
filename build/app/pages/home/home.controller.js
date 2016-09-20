'use strict';

System.register([], function (_export, _context) {
	"use strict";

	var HomeCtrl;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [],
		execute: function () {
			HomeCtrl = function HomeCtrl(AppConstants) {
				'ngInject';

				_classCallCheck(this, HomeCtrl);

				this.appName = AppConstants.appName;
			};

			HomeCtrl.$inject = ['AppConstants'];

			_export('default', HomeCtrl);
		}
	};
});