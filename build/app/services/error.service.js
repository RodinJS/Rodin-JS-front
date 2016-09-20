'use strict';

System.register([], function (_export, _context) {
	"use strict";

	var _createClass, Error;

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

			Error = function () {
				Error.$inject = ['$log'];

				function Error($log) {
					'ngInject';

					_classCallCheck(this, Error);

					this._$log = $log;
				}

				_createClass(Error, [{
					key: 'showErrors',
					value: function showErrors(errors, form, formScope) {
						if (!_.isArray(errors)) {
							return this._$log.error("assigned parameter does not array");
						}

						var showedFields = [];
						var error = void 0;

						var length = errors.length;
						for (var i = 0; i < length; ++i) {
							error = errors[i];
							if (showedFields.indexOf(error.fieldName)) {
								(function () {
									var field = void 0;
									if (_.isArray(error.fieldName)) {
										for (var _i = 0; _i < error.fieldName.length; _i++) {
											field = form[error.fieldName[_i]];
											if (_.isObject(field)) {
												break;
											}
										}
									} else {
										field = form[error.fieldName];
									}

									if (!field) {
										formScope.errorMessage = error.error;
									} else {
										(function () {
											field.$setValidity('server', false);
											field.serverErrorMsg = error.error;
											var counter = 0;
											var watcherDestroyer = formScope.$watch(function () {
												return field.$modelValue;
											}, function () {
												if (++counter > 1) {
													field.$setValidity('server', true);
													field.serverErrorMsg = "";
													watcherDestroyer();
												}
											});
										})();
									}

									showedFields.push(error.fieldName);
								})();
							}
						}
					}
				}, {
					key: 'hideErrors',
					value: function hideErrors(errors, form, formScope) {
						if (!_.isArray(errors)) {
							return this._$log.error("assigned parameter does not array");
						}

						var error = void 0;

						var length = errors.length;
						for (var i = 0; i < length; ++i) {
							error = errors[i];
							var field = void 0;
							if (_.isArray(error.fieldName)) {
								for (var _i = 0; _i < error.fieldName.length; _i++) {
									field = form[error.fieldName[_i]];
									if (_.isObject(field)) {
										break;
									}
								}
							} else {
								field = form[error.fieldName];
							}

							if (field) {
								field.$setValidity('server', true);
								field.serverErrorMsg = "";
							}

							formScope.errorMessage = "";
						}
					}
				}]);

				return Error;
			}();

			_export('default', Error);
		}
	};
});