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
					value: function login() {
						var _this = this;

						var fields = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

						var deferred = this._$q.defer();
						this._Auth.all("login").post(fields).then(function (result) {
							_this._Validator.validateHTTP(result);
							if (_this._Validator.isValidHTTP()) {
								var response = _this._Validator.getDataHTTP();
								/// set auth token
								_this._JWT.save(response.token);
								_this.current = response.user;

								deferred.resolve(response);
							} else {
								deferred.reject(_this._Validator.getErrorsHTTP());
							}
						}, function (result) {
							_this._Validator.validateHTTP(result.data);

							deferred.reject(_this._Validator.getErrorsHTTP());
						});

						return deferred.promise;
					}
				}, {
					key: 'signUp',
					value: function signUp() {
						var _this2 = this;

						var fields = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

						return this.create(fields).then(function (res) {
							_this2._JWT.save(res.token);
							_this2.current = res.user;

							return res;
						}, function (err) {
							return err;
						});
					}
				}, {
					key: 'update',
					value: function update() {
						var _this3 = this;

						var userId = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
						var fields = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

						var deferred = this._$q.defer();

						this._User.put(fields).then(function (result) {
							_this3._Validator.validateHTTP(result);
							if (_this3._Validator.isValidHTTP()) {
								var response = _this3._Validator.getDataHTTP();
								deferred.resolve(response);
							} else {
								deferred.reject(_this3._Validator.getErrorsHTTP());
							}
						}, function (result) {
							_this3._Validator.validateHTTP(result.data);

							deferred.reject(_this3._Validator.getErrorsHTTP());
						});

						return deferred.promise;
					}
				}, {
					key: 'create',
					value: function create() {
						var _this4 = this;

						var fields = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

						var deferred = this._$q.defer();

						this._User.post(fields).then(function (result) {
							_this4._Validator.validateHTTP(result);
							if (_this4._Validator.isValidHTTP()) {
								var response = _this4._Validator.getDataHTTP();
								deferred.resolve(response);
							} else {
								deferred.reject(_this4._Validator.getErrorsHTTP());
							}
						}, function (result) {
							_this4._Validator.validateHTTP(result.data);

							deferred.reject(_this4._Validator.getErrorsHTTP());
						});

						return deferred.promise;
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
						var _this5 = this;

						var deferred = this._$q.defer();
						// check for JWT token
						if (!this._JWT.get()) {
							deferred.resolve(false);
							return deferred.promise;
						}

						if (this.current) {
							deferred.resolve(true);
						} else {
							this._User.one("me").get().then(function (res) {
								_this5.current = res.data;
								deferred.resolve(true);
							}, function (err) {
								_this5._JWT.destroy();
								deferred.resolve(false);
							});
						}
						return deferred.promise;
					}
				}, {
					key: 'ensureAuthIs',
					value: function ensureAuthIs() {
						var _this6 = this;

						var bool = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

						var deferred = this._$q.defer();
						this.verifyAuth().then(function (authValid) {
							if (authValid !== bool) {
								_this6._$state.go('landing.login');
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