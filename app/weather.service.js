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



/*

{
    "coord": {
        "lon": -51.15,
        "lat": -29.76
    },
    "weather": [
        {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 293.263,
        "pressure": 1024.1,
        "humidity": 47,
        "temp_min": 293.263,
        "temp_max": 293.263,
        "sea_level": 1032.94,
        "grnd_level": 1024.1
    },
    "wind": {
        "speed": 7.03,
        "deg": 102.001
    },
    "clouds": {
        "all": 56
    },
    "dt": 1476128439,
    "sys": {
        "message": 0.0029,
        "country": "BR",
        "sunrise": 1476089454,
        "sunset": 1476135120
    },
    "id": 3448622,
    "name": "Sao Leopoldo",
    "cod": 200
}

*/