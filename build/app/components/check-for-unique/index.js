'use strict';

System.register([], function (_export, _context) {
	"use strict";

	/**
  * Created by kh.levon98 on 15-Sep-16.
  */
	function CheckForUnique() {
		'ngInject';

		return {
			require: 'ngModel',
			restrict: 'A',
			link: function link(scope, element, attrs) {}
		};
	}

	return {
		setters: [],
		execute: function () {
			_export('default', CheckForUnique);
		}
	};
});