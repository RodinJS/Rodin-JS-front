'use strict';

System.register([], function (_export, _context) {
	"use strict";

	var ErrorCtrl;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [],
		execute: function () {
			ErrorCtrl = function ErrorCtrl(AppConstants) {
				'ngInject';

				_classCallCheck(this, ErrorCtrl);

				this.appName = AppConstants.appName;
			};

			ErrorCtrl.$inject = ['AppConstants'];

			_export('default', ErrorCtrl);
		}
	};
});