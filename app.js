var myApp = angular.module('myApp', ['ngRoute', 'ngResource']);

myApp.config(function ($routeProvider) {

    $routeProvider

        .when('/', {
        templateUrl: 'pages/city.html',
        controller: 'cityController'
    })
    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
     .when('/forecast/:days', {
         templateUrl: 'pages/forecast.html',
         controller: 'forecastController'
     })
});
myApp.service('cityService', function () {
    this.city = "New York, NY";
   
})
myApp.controller('cityController', ['$scope', 'cityService', function ($scope, cityService) {
    $scope.city = cityService.city;
    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    })

}]);
myApp.controller('forecastController', ['$scope', 'cityService', '$resource', '$routeParams', function ($scope, cityService, $resource, $routeParams) {
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || '7';
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?q=London&&cnt=2/APPID=278b30a4edae77c0093cdd234aba9e68",
      { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" } });
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
    $scope.convertCelsius = function (degK) {
        return Math.round(degK - 273.15);
    }
    $scope.convertDate = function (dt) {
        return new Date(dt * 1000);
    }
    
    
}]);
