/**
 * Created by milos on 2/4/16.
 */

angular.module('productApp').controller("listProductsController", function($scope, $http, productStorage) {
    productStorage.getProducts(
        function (data) {
            $scope.products = data;
        }
    );
});

angular.module('productApp').controller("addProductController", function($scope, $http, $location, productStorage) {
    $scope.product = {
        name: '',
        price: 0,
        description: '',
        image: ''
    };

    $scope.submit = function() {

        if (!$scope.productForm.$valid) {
            return false;
        }

        productStorage.insertProduct($scope.product, function(){
            $location.path('/listProducts');
        }, function() {
            $scope.productForm.errors = angular.fromJson(response.errors);
        });
    };

    $scope.uploadFile = function(files) {
        console.log( files ); 
    };
});

angular.module('productApp').controller("viewProductController", function($scope, $http, $routeParams) {
    $http.get("/products/" + $routeParams.id).success( function(response) {
        $scope.product = response;
    });
});