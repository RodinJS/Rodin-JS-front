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
			AppHeaderCtrl = function AppHeaderCtrl(AppConstants, User, $scope) {
				'ngInject';

				var _arguments = arguments,
				    _this = this;

				_classCallCheck(this, AppHeaderCtrl);

				this.appName = AppConstants.appName;
				this.currentUser = User.current;
				this.logout = function () {
					User.logout.apply(User, _arguments);
				};

				$scope.$watch('User.current', function (newUser) {
					_this.currentUser = newUser;
				});
			};

			AppHeaderCtrl.$inject = ['AppConstants', 'User', '$scope'];
			AppHeader = {
				controller: AppHeaderCtrl,
				templateUrl: 'layout/main/header.html'
			};

			_export('default', AppHeader);
		}
	};
});