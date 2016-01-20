/**
 * Created by chrissu on 11/24/15.
 */
app.directive('card', function() {
        return {
            restrict: 'E',
            scope: {
                price: '='
            },
            link: function ($scope, element, attrs){
                $scope.wineName = attrs.wineName;
                $scope.region = attrs.region;
                $scope.varietal = attrs.varietal;
                $scope.imgSrc = attrs.imgSrc;
                $scope.rating = attrs.rating;
                $scope.actionLink = attrs.actionLink;
                $scope.price ={
                    min : price.min,
                    max : price.max,
                    retail : price.retail};

            },
            controller: function ($scope, $window) {
                $scope.goToWinePage = function () {
                    $window.open($scope.actionLink);
                };
            },
            templateUrl: './js/directives/card.html'
        }
    });