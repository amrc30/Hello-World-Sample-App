var myApp = angular.module('myApp', ['ui.router', 'ngResource']);

myApp.config(function ($stateProvider, $urlRouterProvider) {

$urlRouterProvider.otherwise('/home');
    
    $stateProvider

    .state('home', {
        url:'/home',
        templateUrl: 'pages/city.html',
        controller: 'cityController'
    })
    .state('forecast', {
        url:'/forecast/:days',
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
    .state('about',{
        url:'/about',
        templateUrl: 'pages/about.html',
        controller: 'aboutCtrl'
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
myApp.controller('forecastController', ['$scope', 'cityService', '$resource', '$stateParams', function ($scope, cityService, $resource, $stateParams) {
    $scope.city = cityService.city;
    $scope.days = $stateParams.days || '7';
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

myApp.controller('aboutCtrl', function($scope){
    $scope.app = 'Plug. Give. Get.';
    $scope.info = 'Talk about what matters to you and create your pickboxx today.'
})