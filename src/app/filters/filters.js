/**
 * Created by xgharibyan on 12/22/16.
 */

function bytesFilter() {
    return function (bytes, currentUnit) {
        if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
        const units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];

        const index = units.indexOf(currentUnit);
        for (let i = 0; i < index; i++) {
            bytes = bytes * 1024;
        }

        const number = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, Math.floor(number))).toFixed(2) + ' ' + units[number];
    };
}

function objLimitTo() {
    return (obj, limit) => {
        const keys = Object.keys(obj);
        if (keys.length < 1) {
            return [];
        }

        let ret = new Object;
        let count = 0;
        angular.forEach(keys, function (key, arrayIndex) {
            if (count >= limit) {
                return false;
            }

            ret[key] = obj[key];
            count++;
        });

        return ret;
    };
}

function formatDate(moment) {
    return function (val, dateFormat) {
        if (val) {
            return moment(val).format(dateFormat ? dateFormat : 'MM/DD/YY');
        }
    };
}

function htmlize($sce) {
    return function (val) {
        if (val) {
            return $sce.trustAsHtml(val);
        }
    };
}

function formValidator() {
    return function (input, param) {
        if (input && param) {
            const invalid =
                input[param].$invalid &&
                input[param].$touched &&
                (input[param].$viewValue ? input[param].$viewValue.length > 0 : 0);
            const valid = input[param].$valid && input[param].focused;
            if (invalid) {
                return 'invalid';
            }
            if (valid) {
                return 'valid';
            }
            if(input.$submitted && input[param].$invalid) {
                return 'invalid';
            }
        }
    }
}

export default {objLimitTo, bytesFilter, formatDate, htmlize, formValidator};
