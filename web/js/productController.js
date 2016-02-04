/**
 * Created by milos on 2/4/16.
 */

mainApp.controller("listProductsController", function($scope, $http) {
    $http.get("/products").success( function(response) {
        $scope.products = response;
    });
});

mainApp.controller("addProductController", function($scope, $http, $location) {
    $scope.product = {
        name: '',
        price: 0,
        description: '',
        
        add: function() {
            $http.post(
                "/products",
                {'name': $scope.product.name, 'price': $scope.product.price, 'description':$scope.product.description}
            ).success( function(response) {
                $location.path('/listProducts')
            });
        }
    };
});

mainApp.controller("viewProductController", function($scope, $http, $routeParams) {
    $http.get("/products/" + $routeParams.id).success( function(response) {
        $scope.product = response;
    });
});