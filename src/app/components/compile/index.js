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

export default Compile;
