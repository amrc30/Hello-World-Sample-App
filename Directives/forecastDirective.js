myApp.directive('forecastDirective', function () {
    return {
        restrict: 'E',
        templateUrl: 'directives/forecastDirective.html',
        scope: {
            info: '=',
            convertStandardFunc: '&',
            covertDate: '&',
            dateformat: '@'

        }
    }
});