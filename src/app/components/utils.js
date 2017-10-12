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

                if (totalSymbolsLength > limit) {
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

function RdScroll() {
    return {
        restrict: 'A',
        scope: {
            rdScroll: '=',
        },
        link: function link(scope, elem, attrs, ctrl) {
            let elHeight = 0;
            scope.$watch(() => {
                for (let i = 0; i < elem[0].children.length; i++) {
                    elHeight += elem[0].children[i].clientHeight;
                }

                setElementHeight(elHeight);
            });
            let setElementHeight = height => {
                $(elem).slimScroll({
                    height: `${height >= 350 ? 350 : height}px`,
                    color: '#AAAAAA',
                    alwaysVisible: true
                });
                elHeight = 0;
            };
        },
    };
}


function AutoGrow() {
    return function (scope, element, attr) {
        let update = function () {
            element.css("height", "auto");
            element.css("height", element[0].scrollHeight + "px");
        };
        scope.$watch(attr.ngModel, function () {
            update();
        });
        attr.$set("ngTrim", "false");
    }
}

function CreditCard() {
    return {
        require: 'ngModel',

        link: function link(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (value) {
                scope.upgrade.type =
                    (/^5[1-5]/.test(value)) ? "master_card"
                        : (/^4/.test(value)) ? "visa"
                        : (/^3[47]/.test(value)) ? 'american_express'
                            : (/^6011|65|64[4-9]|622(1(2[6-9]|[3-9]\d)|[2-8]\d{2}|9([01]\d|2[0-5]))/.test(value)) ? 'discover'
                                : (/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/).test(value) ? 'diners_club'
                                    : (/^(?:2131|1800|35\d{3})\d{11}$/).test(value) ? 'jcb'
                                        : undefined;
                ctrl.$setValidity('invalid', !!scope.upgrade.type);
                return value
            })
        },
    };
}

function CardSecurityCode() {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs, ctrl) {
            scope.$watch('upgrade.type', (o, n) => {
                attrs.$set('placeholder', o == 'american_express' ? 'XXXX' : 'XXX');
                attrs.$set('ngMinlength', o == 'american_express' ? 4 : 3);
                scope.upgrade.securityCodeMessage = `The ${o == 'american_express' ? 4 : 3} digits on the back of your credit card`
            })
        }
    }
}

function CreditCardExpiration() {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            let currentYear = new Date().getFullYear();
            let currentMonth = new Date().getMonth() + 1;
            scope.$watch('upgrade.expireDate.$viewValue', function (value) {
                ctrl.$setValidity('invalid', true);
                if (value && value.length === 5 && value.includes('/')) {
                    let year = Number('20' + value.split('/')[1]),
                        month = value.split('/')[0];
                    if (month <= 0 || month > 12 || year > currentYear + 10) {
                        return ctrl.$setValidity('invalid', false)
                    }
                    if (year < currentYear) {
                        return ctrl.$setValidity('invalid', false)
                    }
                    if (year === currentYear && month <= currentMonth) {
                        return ctrl.$setValidity('invalid', false)
                    }
                    return true;
                } else {
                    ctrl.$setValidity('invalid', false)
                }

                return value
            }, true)
        },
    };
}

function markdownValidation() {
    return {
        restrict: 'A',
        scope: {
            markdownForm: '=markdownForm',
            markdownInput: '@'
        },
        link: function (scope, elm, attrs, ctrl) {
            scope.$parent.$markdownEditorObject.$options.onChange = change;

            function change(e) {
                if (scope.markdownForm[scope.markdownInput].$invalid) {
                    scope.$parent.$markdownEditorObject.$editor.addClass('editor-has-error')
                } else {
                    scope.$parent.$markdownEditorObject.$editor.removeClass('editor-has-error')
                }
                if (scope.markdownForm[scope.markdownInput].$valid) {
                    scope.$parent.$markdownEditorObject.$editor.addClass('editor-has-success')
                } else {
                    scope.$parent.$markdownEditorObject.$editor.removeClass('editor-has-success')
                }
            }
        },
    }

}

function AnalyticsTrack() {
    let events = ['signup', 'tutorials', 'getting-started', 'home', 'android', 'ios', 'oculus', 'vive', 'register'];
    return {
        scope: {
            trackName: '='
        },
        restrict: 'A',
        link: function (scope, elm, attrs, ctrl) {
            elm.bind('click', (e) => {
                if (events.some(i => i === scope.trackName.toLowerCase())) {
                    ga('send', 'event', {
                        eventCategory: scope.trackName.toLowerCase(),
                        eventAction: 'click',
                        eventLabel: `Click on ${scope.trackName.toLowerCase()}`
                    })
                }

            })
        }
    }
}

export default {
    limitTo,
    Compile,
    CheckForUnique,
    ShowAuthed,
    CustomInput,
    CloseModal,
    Codify,
    ConfirmPassword,
    RdScroll,
    AutoGrow,
    CreditCard,
    CreditCardExpiration,
    markdownValidation,
    AnalyticsTrack,
    CardSecurityCode
};
