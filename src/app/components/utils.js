/**
 * Created by kh.levon98 on 15-Sep-16.
 */
// import '../pages/home/scripts/plugins/jquery.slimscroll';

function Compile($compile) {
    'ngInject';

    return function (scope, element, attrs) {
        scope.$watch((scope) => {
                return scope.$eval(attrs.compile);
            }, (value) => {
                element.html(value);
                $compile(element.contents())(scope);
            }
        );
    };
}

function limitTo() {
    return {
        restrict: 'A',
        require: 'ngModel',

        link: (scope, elem, attrs) => {
            let limit = parseInt(attrs.limitTo);

            elem.bind('paste', (e) => {

                let pastedData = e.originalEvent.clipboardData.getData('text');
                let totalSymbolsLength = elem[0].value.length + pastedData.length;

                if (totalSymbolsLength >= limit) {
                    e.preventDefault();
                    return false;
                }
            });
            elem.bind('keypress', (e) => {
                if (e.keyCode != 8 && elem[0].value.length >= limit) {
                    e.preventDefault();
                    return false;
                }
            });
        },
    };
}

function CheckForUnique() {
    'ngInject';

    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attrs) {

        },
    };
}

function ShowAuthed(User) {
    'ngInject';

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.User = User;

            scope.$watch('User.current', function (val) {
                // If user detected
                if (val) {
                    if (attrs.showAuthed === 'true') {
                        element.css({display: 'inherit'});
                    } else {
                        element.css({display: 'none'});
                    }

                    // no user detected
                } else {
                    if (attrs.showAuthed === 'true') {
                        element.css({display: 'none'});
                    } else {
                        element.css({display: 'inherit'});
                    }
                }
            });

        },
    };
}

function CustomInput($timeout) {
    'ngInject';

    return {
        restrict: 'A',
        link: function (scope, element, attrs, ngModel) {
            let dirty = false;
            let searcDirty = false;
            const $elem = $(element);
            const $i = $elem.find('i.search');
            const $input = $elem.find('input');

            if ($input.val() !== '') {
                $elem.addClass('is-dirty');
            }

            $input.on('focus', () => {
                if (!dirty) {
                    $elem.addClass('is-dirty');
                }

                dirty = true;
            }).on('blur', () => {
                $input.val($input.val().trim());
                if ($input.val() === '') {
                    dirty = false;
                    $elem.removeClass('is-dirty');
                }
            });

            $i.on('click', () => {
                searcDirty ? $input.blur() : $input.focus();
                searcDirty = !searcDirty;
            });

            scope.$watch(() => $input.val(), (newValue, oldValue) => {
                if (newValue !== '' && !dirty) {
                    $elem.addClass('is-dirty');
                }
            });
        },
    };
}

function CloseModal() {
    'ngInject';

    return {
        restrict: 'A',
        link: function (scope, element, attrs, ngModel) {
            let $elem = element;
            $elem.on('click', (e) => {
                const hasClassModal = angular.element(e.target).hasClass('modal');
                if (!hasClassModal) return;
                scope.$ctrl.modals[attrs.closeModal] = false;
                scope.$apply();
            });

        },
    };
}

function Codify($timeout) {
    'ngInject';

    return {
        restrict: 'A',
        link: function (scope, element) {
            let $elem = element;
            $timeout(() => {
                $elem.find('.code').each(function (i, block) {
                    hljs.highlightBlock(block);
                });
            }, 500);
        },
    };
}

function NgAutocomplete() {
    'ngInject';
    return {
        require: 'ngModel',
        scope: {
            ngModel: '=',
            options: '=?',
            details: '=?',
        },

        link: function (scope, element, attrs, controller) {

            //options for autocomplete
            var opts;
            var watchEnter = false;
            //convert options provided to opts
            var initOpts = function () {

                opts = {};
                if (scope.options) {

                    if (scope.options.watchEnter !== true) {
                        watchEnter = false;
                    } else {
                        watchEnter = true;
                    }

                    if (scope.options.types) {
                        opts.types = [];
                        opts.types.push(scope.options.types);
                        scope.gPlace.setTypes(opts.types);
                    } else {
                        scope.gPlace.setTypes([]);
                    }

                    if (scope.options.bounds) {
                        opts.bounds = scope.options.bounds;
                        scope.gPlace.setBounds(opts.bounds);
                    } else {
                        scope.gPlace.setBounds(null);
                    }

                    if (scope.options.country) {
                        opts.componentRestrictions = {
                            country: scope.options.country,
                        };
                        scope.gPlace.setComponentRestrictions(opts.componentRestrictions);
                    } else {
                        scope.gPlace.setComponentRestrictions(null);
                    }
                }
            };

            if (scope.gPlace == undefined) {
                scope.gPlace = new google.maps.places.Autocomplete(element[0], {});
            }

            google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
                var result = scope.gPlace.getPlace();
                if (result !== undefined) {
                    if (result.address_components !== undefined) {

                        scope.$apply(function () {

                            scope.details = result;

                            controller.$setViewValue(element.val());
                        });
                    } else {
                        if (watchEnter) {
                            getPlace(result);
                        }
                    }
                }
            });

            //function to get retrieve the autocompletes first result using the AutocompleteService
            var getPlace = function (result) {
                var autocompleteService = new google.maps.places.AutocompleteService();
                if (result.name.length > 0) {
                    autocompleteService.getPlacePredictions(
                        {
                            input: result.name,
                            offset: result.name.length,
                        },
                        function listentoresult(list, status) {
                            if (list == null || list.length == 0) {

                                scope.$apply(function () {
                                    scope.details = null;
                                });

                            } else {
                                var placesService = new google.maps.places.PlacesService(element[0]);
                                placesService.getDetails(
                                    {reference: list[0].reference},
                                    function detailsresult(detailsResult, placesServiceStatus) {

                                        if (placesServiceStatus == google.maps.GeocoderStatus.OK) {
                                            scope.$apply(function () {

                                                controller.$setViewValue(detailsResult.formatted_address);
                                                element.val(detailsResult.formatted_address);

                                                scope.details = detailsResult;

                                                //on focusout the value reverts, need to set it again.
                                                var watchFocusOut = element.on('focusout', function (event) {
                                                    element.val(detailsResult.formatted_address);
                                                    element.unbind('focusout');
                                                });

                                            });
                                        }
                                    }
                                );
                            }
                        });
                }
            };

            controller.$render = function () {
                var location = controller.$viewValue;
                element.val(location);
            };

            //watch options provided to directive
            scope.watchOptions = function () {
                return scope.options;
            };

            scope.$watch(scope.watchOptions, function () {
                initOpts();
            }, true);

        },
    };
}

function ConfirmPassword() {
    'ngInject';

    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            compareTo: '=',
        },
        link: function link(scope, elem, attrs, ctrl) {
            let validator = function (value) {
                ctrl.$setValidity('confirmed', value === scope.compareTo);
                return value;
            };

            ctrl.$parsers.unshift(validator);
            ctrl.$formatters.push(validator);

            scope.$watch('compareTo', function (newval, oldval) {
                validator(ctrl.$viewValue);
            });

        },
    };
}

function RdScroll($timeout) {
    'ngInject';

    return {
        restrict: 'A',
        scope: {
            rdScroll: '=',
        },
        link: function link(scope, elem, attrs, ctrl) {
            $timeout(() => {
                let notificationHeight = 0;
                for (let i = 0; i < elem[0].children.length; i++) {
                    console.log(elem[0].children[i])
                    notificationHeight += elem[0].children[i].height;
                }

                console.log(notificationHeight)
                const height = notificationHeight >= 350     ? 350 : notificationHeight;
                $(elem).slimScroll({
                    height: `${height}px`,
                    color: '#AAAAAA',
                    alwaysVisible: true
                })
            }, 0)
        },
    };
}

export default {
    limitTo,
    Compile,
    CheckForUnique,
    ShowAuthed,
    CustomInput,
    CloseModal,
    NgAutocomplete,
    Codify,
    ConfirmPassword,
    RdScroll,
};
