/**
 * Created by milos on 2/4/16.
 */

var mainApp = angular.module("mainApp", ['ngRoute']);

mainApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.

    when('/addProduct', {
        templateUrl: 'addProduct.htm',
        controller: 'addProductController'
    }).

    when('/listProducts', {
        templateUrl: 'listProducts.htm',
        controller: 'listProductsController'
    }).

    when('/viewProduct/:id', {
        templateUrl: 'viewProduct.htm',
        controller: 'viewProductController'
    }).

    otherwise({
        redirectTo: '/listProducts'
    });
}]);
