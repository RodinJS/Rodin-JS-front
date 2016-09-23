'use strict';

System.register([], function (_export, _context) {
	"use strict";

	var _createClass, AuthCtrl;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [],
		execute: function () {
			_createClass = function () {
				function defineProperties(target, props) {
					for (var i = 0; i < props.length; i++) {
						var descriptor = props[i];
						descriptor.enumerable = descriptor.enumerable || false;
						descriptor.configurable = true;
						if ("value" in descriptor) descriptor.writable = true;
						Object.defineProperty(target, descriptor.key, descriptor);
					}
				}

				return function (Constructor, protoProps, staticProps) {
					if (protoProps) defineProperties(Constructor.prototype, protoProps);
					if (staticProps) defineProperties(Constructor, staticProps);
					return Constructor;
				};
			}();

			AuthCtrl = function () {
				AuthCtrl.$inject = ['User', '$state'];

				function AuthCtrl(User, $state) {
					'ngInject';

					_classCallCheck(this, AuthCtrl);

					this._User = User;
					this._$state = $state;

					this.title = $state.current.title;
					this.authType = $state.current.name.replace('landing.', '');
				}

				_createClass(AuthCtrl, [{
					key: 'submitForm',
					value: function submitForm() {
						var _this = this;

						this.isSubmitting = true;

						if (this.authType === "login") {
							this._User.login(this.formData).then(function (res) {
								_this._$state.go('app.dashboard');
							}, function (err) {
								_this.isSubmitting = false;
								_this.errors = err;
							});
						} else if (this.authType === "register") {
							this._User.signUp(this.formData).then(function (res) {
								_this._$state.go('app.dashboard');
							}, function (err) {
								_this.isSubmitting = false;
								_this.errors = err;
							});
						} else if (this.authType === "forgot") {
							console.log("forgot");
						} else {
							this.isSubmitting = false;
						}
					}
				}]);

				return AuthCtrl;
			}();

			_export('default', AuthCtrl);
		}
	};
});