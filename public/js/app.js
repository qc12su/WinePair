/**
 * Created by chrissu on 11/24/15.
 */
var app = angular.module('WinePair', []);


app.controller('controller', function($scope, $http, $location) {

        $scope.wines = [];

        $scope.search = function () {
            console.log("Search working");
            $scope.wines = [];
            var data = $('form').serializeArray();
            console.log(data);

            $http({
                method: 'GET',
                url: "/v1/wine_search/",
                params: data
            }).then(function successCallback(res) {
                console.log(res.data.Products.List);
                res.data.Products.List.forEach(function (item) {
                    $scope.wines.push({
                        name: item.Name,
                        region: item.Appellation.Region.Name,
                        varietal: item.Varietal.Name,
                        imgSrc: item.Labels[0].Url,
                        rating: item.Ratings.HighestScore,
                        price: {
                            max: item.PriceMax,
                            min: item.PriceMin,
                            retail: item.PriceRetail
                        },
                        actionLink: item.Url
                    });
                });

            }, function errorCallback(error) {
                console.error("Unable to retrieve wine.");
            });
        };
    })

