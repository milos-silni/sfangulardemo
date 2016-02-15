/**
 * Created by milos on 2/5/16.
 */

angular.module('productApp').
    factory('productStorage', function($http) {
        return {
            getProducts: function(page, callback) {
                $http.get("/products/" + page)
                .success( function(response) {
                    callback(response);
                });
            },
            
            insertProduct: function(product, success, error) {
                $http.post(
                    "/products",
                    {'name': product.name, 'price': product.price, 'description': product.description, 'image': product.image}
                ).success( function(response) {
                    success(response);
                }).error(function(response) {
                    error(response);
                });
            }
        };
    }
);

