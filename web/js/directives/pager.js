/**
 * Created by milos on 2/11/16.
 */

angular.module("productApp").directive('pager', function($location, $routeParams) {
    return {
        scope: {
            count: '=',
            currentPage: '=',
        },
        templateUrl: '/js/templates/pager.htm',
        link: function(scope, element, attrs, ctrl) {

            scope.$watch('count', function() {

                scope.number_pages = parseInt(scope.count / 10) + 1;

                var range = [];
                for(var i=1; i <= scope.number_pages; i++) {
                    range.push(i);
                }

                scope.range = range;

                if (scope.currentPage > 1) {
                    scope.prev = scope.currentPage - 1;
                }

                if (scope.currentPage < scope.number_pages) {
                    scope.next = parseInt(scope.currentPage) + 1;
                }
                
            });
        },
    };
});
