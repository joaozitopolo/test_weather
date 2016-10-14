define(function(require) {

    /** service definitions */
    return function($http) {
        var self = this;
        self.data = {};
        self.setLocation = function(latitude, longitude) { setLocation(latitude, longitude, self.data, $http); };
        self.search = function(address, country) { search(address, country, self.data, $http); };
        self.active = function() { return !!self.data['status']; };
    }

    /** sets the current location and update the weather */
    function setLocation(latitude, longitude, data, $http) {
        angular.extend(data, { latitude: latitude, longitude: longitude, status: 'PREPARED' });
        loadWeatherByCoordinates(data, $http); 
    }

    /** search by location and country */
    function search(address, country, data, $http) {
        var args = "?q=" + encodeURIComponent(address) + "," + country + "&APPID=b2cc0479a61b2a6e145fddca11691478" + "&callback=JSON_CALLBACK";
        $http({
            method: 'JSONP',
            url: '//api.openweathermap.org/data/2.5/weather' + args,
        }).then(function(response) {
            console.log(response);
            angular.extend(data, response.data, { status: 'OK' });
        }, function(response) {
            console.log(response);
            angular.extend(data, { status: 'ERR', statusText: response.statusText })
        });
    }

    /** loads the weather for the coordinates  */
    function loadWeatherByCoordinates(data, $http) {
        var args = "?lat=" + data.latitude + "&lon=" + data.longitude + "&APPID=b2cc0479a61b2a6e145fddca11691478" + "&callback=JSON_CALLBACK";
        $http({
            method: 'JSONP',
            url: '//api.openweathermap.org/data/2.5/weather' + args,
        }).then(function(response) {
            console.log(response);
            angular.extend(data, response.data, { status: 'OK' });
        }, function(response) {
            console.log(response);
            angular.extend(data, { status: 'ERR', statusText: response.statusText })
        });
    }

});

