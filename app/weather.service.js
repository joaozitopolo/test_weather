define(function(require) {

    return function($http) {
        var self = this;
        var data = {};
        self.setLocation = function(latitude, longitude) { setLocation(latitude, longitude, $http, self.data); };
    }

    /** sets the current location and update the weather */
    function setLocation(latitude, longitude, $http, data) {
        angular.extend(data, { latitude: latitude, longitude: longitude, status: 'PREPARED' });
        loadWeatherByCoordinates(data, $http); 
    }

    /** loads the weather for the coordinates  */
    function loadWeatherByCoordinates(data, $http) {
        $http({ method: 'GET',  
            url: 'api.openweathermap.org/data/2.5/weather',
            data: { lat: data.latitude, lon: data.longitude, APPID: 'b2cc0479a61b2a6e145fddca11691478' }
        }).then(function(response) {
            angular.extend(data, response.data, { status: 'OK' });
        }, function(response) {
            angular.extend(data, { status: 'ERR', statusText: response.statusText })
        });
    }

});
