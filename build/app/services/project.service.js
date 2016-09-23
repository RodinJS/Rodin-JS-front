'use strict';

System.register([], function (_export, _context) {
	"use strict";

	var _createClass, Project;

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

			Project = function () {
				Project.$inject = ['JWT', 'AppConstants', 'Restangular', 'Validator', '$state', '$q'];

				function Project(JWT, AppConstants, Restangular, Validator, $state, $q) {
					'ngInject';

					_classCallCheck(this, Project);

					this._JWT = JWT;
					this._AppConstants = AppConstants;

					this._Projects = Restangular.all('projects');
					this._$state = $state;
					this._$q = $q;
					this._Validator = new Validator();
				}

				_createClass(Project, [{
					key: 'get',
					value: function get() {
						var _this = this;

						var projectId = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
						var fields = arguments[1];

						var deferred = this._$q.defer();
						this._Projects.one(projectId).get(fields).then(function (result) {
							_this._Validator.validateHTTP(result);
							if (_this._Validator.isValidHTTP()) {
								var response = _this._Validator.getDataHTTP();
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
					key: 'getList',
					value: function getList() {
						var _this2 = this;

						var fields = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

						var deferred = this._$q.defer();
						this._Projects.getList(fields).then(function (result) {
							_this2._Validator.validateHTTP(result);
							if (_this2._Validator.isValidHTTP()) {
								var response = _this2._Validator.getDataHTTP();

								deferred.resolve(response);
							} else {
								deferred.reject(_this2._Validator.getErrorsHTTP());
							}
						}, function (result) {
							_this2._Validator.validateHTTP(result.data);

							deferred.reject(_this2._Validator.getErrorsHTTP());
						});

						return deferred.promise;
					}
				}, {
					key: 'update',
					value: function update() {
						var _this3 = this;

						var projectId = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
						var fields = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

						var deferred = this._$q.defer();

						this._Projects.one(projectId).put(fields).then(function (result) {
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

						this._Projects.post(fields).then(function (result) {
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
					key: 'remove',
					value: function remove() {
						var _this5 = this;

						var projectId = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
						var fields = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

						var deferred = this._$q.defer();

						this._Projects.one(projectId).remove(fields).then(function (result) {
							_this5._Validator.validateHTTP(result);
							if (_this5._Validator.isValidHTTP()) {
								var response = _this5._Validator.getDataHTTP();
								deferred.resolve(response);
							} else {
								deferred.reject(_this5._Validator.getErrorsHTTP());
							}
						}, function (result) {
							_this5._Validator.validateHTTP(result.data);

							deferred.reject(_this5._Validator.getErrorsHTTP());
						});

						return deferred.promise;
					}
				}]);

				return Project;
			}();

			_export('default', Project);
		}
	};
});