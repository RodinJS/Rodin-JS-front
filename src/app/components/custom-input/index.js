/**
 * Created by kh.levon98 on 15-Sep-16.
 */
function CustomInput($timeout) {
    'ngInject';

    return {
        restrict: 'A',
        link: function (scope, element, attrs, ngModel) {
            let dirty = false;
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

            $i.on('click', () => dirty ? $input.blur() : $input.focus());

            scope.$watch(() => $input.val(), (newValue, oldValue) => {
                if(newValue !== '' && !dirty) {
                    $elem.addClass('is-dirty');
                }
            });
        }
    };
}

export default CustomInput;
