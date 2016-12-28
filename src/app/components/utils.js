/**
 * Created by kh.levon98 on 15-Sep-16.
 */
function Compile($compile) {
    'ngInject';

    return function (scope, element, attrs) {
        scope.$watch((scope) => {
                return scope.$eval(attrs.compile);
            }, (value) => {
                element.html(value);
                $compile(element.contents())(scope);
            }
        )
    }
}

function limitTo() {
    return {
        restrict: "A",
        require: 'ngModel',

        link: (scope, elem, attrs) => {
            let limit = parseInt(attrs.limitTo);

            elem.bind('paste',  (e) => {

                let pastedData = e.originalEvent.clipboardData.getData('text');
                let totalSymbolsLength = elem[0].value.length+pastedData.length;

                if(totalSymbolsLength >= limit){
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
        }
    }
}

function CheckForUnique() {
    'ngInject';

    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attrs) {


        }
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
                        element.css({display: 'inherit'})
                    } else {
                        element.css({display: 'none'})
                    }

                    // no user detected
                } else {
                    if (attrs.showAuthed === 'true') {
                        element.css({display: 'none'})
                    } else {
                        element.css({display: 'inherit'})
                    }
                }
            });

        }
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
                if(newValue !== '' && !dirty) {
                    $elem.addClass('is-dirty');
                }
            });
        }
    };
}

function CloseModal(){
    'ngInject';

    return {
        restrict: 'A',
        link: function (scope, element, attrs, ngModel) {
            let $elem = element;
            $elem.on('click', (e)=>{
                const hasClassModal = angular.element(e.target).hasClass('modal');
                if(!hasClassModal) return;
                scope.$ctrl.modals[attrs.closeModal] = false;
                scope.$apply();
            })

        }
    };
}


export default {limitTo, Compile, CheckForUnique, ShowAuthed, CustomInput, CloseModal};
