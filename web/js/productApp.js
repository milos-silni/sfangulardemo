/**
 * Created by milos on 2/4/16.
 */


angular.module("productApp", ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
    
        when('/addProduct', {
            templateUrl: '/js/templates/addProduct.htm',
            controller: 'addProductController'
        }).

        when('/listProducts/:page?', {
            templateUrl: '/js/templates/listProducts.htm',
            controller: 'listProductsController'
        }).
    
        when('/viewProduct/:id', {
            templateUrl: '/js/templates/viewProduct.htm',
            controller: 'viewProductController'
        }).
    
        otherwise({
            redirectTo: '/listProducts'
        });
}]);
