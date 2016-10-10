define(function() {

    /** basic controls for authorization page */
    return function($window, $scope, Weather) {
        var self = this;
        self.data = {};
        self.Weather = Weather;

        // merges the Weather.data in data field
        $scope.$watch(function() { return Weather.data; }, function(data) { angular.extend(self.data, data); });
    };

});