/**
 * Created by milos on 2/4/16.
 */

angular.module('productApp').controller("listProductsController", function($scope, $http, productStorage) {
    productStorage.getProducts(
        function (data) {
            $scope.products = data.products;
            $scope.total_products = data.count;
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
    $scope.image_uploading = false;
    $scope.image_url = '';

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
        var formData = new FormData();
        
        for (var i=0; i < files.length; i++) {
            formData.append('file',  files[i]);
        }

        $scope.image_uploading = true;

        $http.post('/upload', formData, {
                withCredentials: true,
                headers: {'Content-Type': undefined },
                transformRequest: angular.identity
            })
            .success( function(response){
                $scope.product.image = response.image_url;
                $scope.image_uploading = false;
            })
            .error( function(){
                $scope.image_uploading = false;
            });
    };
});

angular.module('productApp').controller("viewProductController", function($scope, $http, $routeParams) {
    $http.get("/products/" + $routeParams.id).success( function(response) {
        $scope.product = response;
    });
});