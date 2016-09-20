'use strict';

System.register([], function (_export, _context) {
	"use strict";

	var _createClass, User;

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

			User = function () {
				User.$inject = ['JWT', 'AppConstants', 'Restangular', 'Validator', '$state', '$q'];

				function User(JWT, AppConstants, Restangular, Validator, $state, $q) {
					'ngInject';

					_classCallCheck(this, User);

					console.log("JWT", JWT);
					this._JWT = JWT;
					this._AppConstants = AppConstants;

					this._User = Restangular.all('user');
					this._Auth = Restangular.all('auth');
					this._$state = $state;
					this._$q = $q;
					this._Validator = new Validator();

					this.current = null;
					this._inProgress = false;
				}

				_createClass(User, [{
					key: 'login',
					value: function login(fields) {
						var _this = this;

						var deferred = this._$q.defer();
						this._Auth.all("login").post(fields).then(function (result) {
							_this._Validator.validateHTTP(result);
							if (_this._Validator.isValidHTTP()) {
								var response = _this._Validator.getDataHTTP();
								/// set auth token
								setAuthToken(response.token);
								_this._JWT.save(res.token);
								_this.current = res.user;

								defer.resolve(response);
							} else {
								defer.reject(_this._Validator.getErrorsHTTP());
							}
						}, function (result) {
							_this._Validator.validateHTTP(result.data);

							defer.reject(_this._Validator.getErrorsHTTP());
						});

						return deferred.promise;
					}
				}, {
					key: 'signUp',
					value: function signUp(fields) {
						var _this2 = this;

						return this.create(fields).then(function (res) {
							_this2._JWT.save(res.token);
							_this2.current = res.user;

							return res;
						});
					}
				}, {
					key: 'update',
					value: function update(fields) {
						var _this3 = this;

						return this._User.put(fields).then(function (res) {
							_this3.current = res.user;
							return res.user;
						});
					}
				}, {
					key: 'create',
					value: function create(fields) {
						return this._User.post(fields).then(function (res) {
							return res;
						});
					}
				}, {
					key: 'logout',
					value: function logout() {
						this.current = null;
						this._JWT.destroy();
						this._$state.go(this._$state.$current, null, { reload: true });
					}
				}, {
					key: 'verifyAuth',
					value: function verifyAuth() {
						var _this4 = this;

						var deferred = this._$q.defer();
						// check for JWT token
						if (!this._JWT.get()) {
							deferred.resolve(false);
							return deferred.promise;
						}

						if (this.current) {
							deferred.resolve(true);
						} else if (!this._inProgress) {
							this._inProgress = true;
							this._User.one("").get().then(function (res) {
								_this4.current = res.data.user;
								deferred.resolve(true);
							}, function (err) {
								_this4._JWT.destroy();
								deferred.resolve(false);
							}, function () {
								_this4._inProgress = false;
								console.log("finally");
							});
						}
						return deferred.promise;
					}
				}, {
					key: 'ensureAuthIs',
					value: function ensureAuthIs(bool) {
						var _this5 = this;

						var deferred = this._$q.defer();
						this.verifyAuth().then(function (authValid) {
							if (authValid !== bool) {
								_this5._$state.go('app.login');
								deferred.resolve(false);
							} else {
								deferred.resolve(true);
							}
						});

						return deferred.promise;
					}
				}]);

				return User;
			}();

			_export('default', User);
		}
	};
});