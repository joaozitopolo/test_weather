define(function() {

    /** basic controls for authorization page */
    return function($window, $scope, Weather) {
        var self = this;
        self.data = { type: 'C' };
        self.switchType = function() { switchType(self.data); };

        $scope.$watch(function() { return Weather.data['status']; }, function(status) { observe(status, self.data, Weather.data); });

        self.views = [
            ['hasSun', 'sun.jpg', 'Sun'],
            ['hasCloud', 'cloud.jpg', 'Clouds'],
            ['hasRain', 'rain.jpg', 'Rain'],
            ['hasThunder', 'thunder.jpg', 'Storm'],
            ['hasCold', 'cold.jpg', 'Cold'],
            ['hasWarm', 'warm.jpg', 'Warm']
        ];

        // TODO: remove after test
        self.data = {type: 'C', "latitude":-29.7549941,"longitude":-51.150283,"status":"OK","coord":{"lon":-51.15,"lat":-29.76},
        "weather":[
                {"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}
            ],
        "base":"stations","main":{"temp":293.263,"pressure":1024.1,"humidity":47,"temp_min":293.263,"temp_max":293.263,"sea_level":1032.94,"grnd_level":1024.1},"wind":{"speed":7.03,"deg":102.001},"clouds":{"all":56},"dt":1476129599,"sys":{"message":0.0157,"country":"BR","sunrise":1476089453,"sunset":1476135121},"id":3448622,"name":"Sao Leopoldo","cod":200};
        decode(self.data);
    };

    function observe(status, data, weatherData) {
        switch(status) {
            case 'OK':
                // merges the weather data, and decodes the weather information
                angular.extend(data, weatherData);
                decode(data);
                break;
        }
    }

    /** switch the temperature type and updates the data */
    function switchType(data) {
        data.type = data.type == 'F' ? 'C' : 'F';
        decode(data);
    }

    /** decodes the current weather conditions */
    function decode(data) {
        var tempMin = convert(data.main.temp_min, data.type);
        var tempMax = convert(data.main.temp_max, data.type);
        angular.extend(data, {
            hasCloud: data.clouds && data.clouds.all > 20,
            hasThunder: false,
            hasRain: data.rain && data.rain['3h'] > 0,
            hasWarm: convert(data.main.temp_max) > 25,
            hasCold: convert(data.main.temp_min) < 10,
            hasSun: !data.clouds || data.clouds.all < 90,
            tempMin: tempMin + " °" + data.type,
            tempMax: tempMax + " °" + data.type
        });
        angular.forEach(data.weather, function(w) {
            data.hasThunder |= (w.main == 'Extreme'); 
        });
    }

    /** converts from kelvin to fahrenheit or celsius */
    function convert(value, dest) {
        var out = value - 273.15;
        if(dest == 'F') {
            out = (value - 273.15) * 1.8 + 32;
        }
        return Math.round(out * 10) / 10.0; 
    }

});