"use strict";

System.register([], function (_export, _context) {
	"use strict";

	var _createClass, JWT;

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

			JWT = function () {
				JWT.$inject = ["AppConstants", "store", "$state", "$q", "Restangular"];

				function JWT(AppConstants, store, $state, $q, Restangular) {
					'ngInject';

					_classCallCheck(this, JWT);

					this._AppConstants = AppConstants;
					this._store = store;
					this._$state = $state;
					this._$q = $q;
					this._Auth = Restangular.all("auth");
					this._token = null;
				}

				_createClass(JWT, [{
					key: "save",
					value: function save(token) {
						this._store.set(this._AppConstants.jwtKey, token);
						this._update();
					}
				}, {
					key: "get",
					value: function get() {
						if (!this._token) {
							this._update();
						}
						return this._token;
					}
				}, {
					key: "_update",
					value: function _update() {
						this._token = this._store.get(this._AppConstants.jwtKey) || null;
					}
				}, {
					key: "destroy",
					value: function destroy() {
						this._store.remove(this._AppConstants.jwtKey);
						this._update();
					}
				}, {
					key: "verify",
					value: function verify() {
						var _this = this;

						var deferred = this._$q.defer();

						if (this.get()) {
							return this._Auth.one("verify").get().then(function (res) {
								return res;
							}, function (err) {
								_this.destroy();
								_this._$state.go("app.login");
								return err;
							});
						}
						deferred.resolve(true);
						return deferred.promise;
					}
				}]);

				return JWT;
			}();

			_export("default", JWT);
		}
	};
});