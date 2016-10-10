define(function(require) {

    return function($http) {
        var self = this;
        self.data = {};
        self.setLocation = function(latitude, longitude) { setLocation(latitude, longitude, self.data, $http); };
    }

    /** sets the current location and update the weather */
    function setLocation(latitude, longitude, data, $http) {
        angular.extend(data, { latitude: latitude, longitude: longitude, status: 'PREPARED' });
        loadWeatherByCoordinates(data, $http); 
    }

    /** loads the weather for the coordinates  */
    function loadWeatherByCoordinates(data, $http) {
        var args = "?lat=" + data.latitude + "&lon=" + data.longitude + "&APPID=b2cc0479a61b2a6e145fddca11691478" + "&callback=JSON_CALLBACK";
        $http({
            method: 'JSONP',
            url: 'http://api.openweathermap.org/data/2.5/weather' + args,
        }).then(function(response) {
            console.log(response);
            angular.extend(data, response.data, { status: 'OK' });
        }, function(response) {
            console.log(response);
            angular.extend(data, { status: 'ERR', statusText: response.statusText })
        });
    }

});

