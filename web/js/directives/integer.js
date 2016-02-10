/**
 * Created by milos on 2/5/16.
 */

angular.module("productApp").directive('integer', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.integer = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty models to be valid
                    return true;
                }

                if (/^\-?\d+$/.test(viewValue)) {
                    // it is valid
                    return true;
                }

                return false;
            }
        }
    };
});

angular.module("productApp").directive('pager', function() {
    return {
        templateUrl: '/js/templates/pager.htm',
        /*link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.integer = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty models to be valid
                    return true;
                }

                if (/^\-?\d+$/.test(viewValue)) {
                    // it is valid
                    return true;
                }

                return false;
            }
        }*/
    };
});

