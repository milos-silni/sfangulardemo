/**
 * Created by milos on 2/5/16.
 */

angular.module('productApp').
    factory('productStorage', function($http) {
        return {
            getProducts: function(callback) {
                $http.get("/products")
                    .success( function(response) {
                        callback(response);
                    });
            },
            
            insertProduct: function(product, success, error) {
                $http.post(
                    "/products",
                    {'name': product.name, 'price': product.price, 'description': product.description}
                ).success( function(response) {
                    success(response);
                }).error(function(response) {
                    error(response);
                });
            }
        };
    }
);

