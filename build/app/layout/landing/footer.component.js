'use strict';

System.register([], function (_export, _context) {
	"use strict";

	var AppFooterCtrl, AppFooter;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [],
		execute: function () {
			AppFooterCtrl = function AppFooterCtrl(AppConstants) {
				'ngInject';

				_classCallCheck(this, AppFooterCtrl);

				this.appName = AppConstants.appName;

				// Get today's date to generate the year
				this.date = new Date();
			};

			AppFooterCtrl.$inject = ['AppConstants'];
			AppFooter = {
				controller: AppFooterCtrl,
				templateUrl: 'layout/landing/footer.html'
			};

			_export('default', AppFooter);
		}
	};
});