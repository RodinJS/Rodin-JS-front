/**
 * Created by xgharibyan on 11/9/16.
 */
function OnlyNum(){
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            elem.bind('keypress', function (evt) {
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                    return false;
                }
                return true;
            });
        }
    }
}

export default OnlyNum;
