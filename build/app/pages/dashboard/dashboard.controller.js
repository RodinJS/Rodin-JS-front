'use strict';

System.register([], function (_export, _context) {
	"use strict";

	var DashboardCtrl;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [],
		execute: function () {
			DashboardCtrl = function DashboardCtrl(AppConstants) {
				'ngInject';

				_classCallCheck(this, DashboardCtrl);

				this.appName = AppConstants.appName;
			};

			DashboardCtrl.$inject = ['AppConstants'];

			_export('default', DashboardCtrl);
		}
	};
});