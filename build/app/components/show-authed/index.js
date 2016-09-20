'use strict';

System.register([], function (_export, _context) {
	"use strict";

	/**
  * Created by kh.levon98 on 15-Sep-16.
  */
	function ShowAuthed(User) {
		'ngInject';

		return {
			restrict: 'A',
			link: function link(scope, element, attrs) {
				scope.User = User;

				scope.$watch('User.current', function (val) {
					// If user detected
					if (val) {
						if (attrs.showAuthed === 'true') {
							element.css({ display: 'inherit' });
						} else {
							element.css({ display: 'none' });
						}

						// no user detected
					} else {
						if (attrs.showAuthed === 'true') {
							element.css({ display: 'none' });
						} else {
							element.css({ display: 'inherit' });
						}
					}
				});
			}
		};
	}

	return {
		setters: [],
		execute: function () {
			ShowAuthed.$inject = ['User'];

			_export('default', ShowAuthed);
		}
	};
});