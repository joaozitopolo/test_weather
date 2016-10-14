define(function() {

    /** controls for weather page */
    return function($window, $scope, Weather) {
        var self = this;
        self.data = { };
        self.data.type = 'C'; // temp scale: 'C'elsius | 'F'ahrenheit
        self.switchType = function() { switchType(self.data); };
        self.changeLocal = function() { Weather.data.status = 'LOCAL'; }

        // test for page refresh
        if(!Weather.active())  {
            $window.location = '#/';
        }

        $scope.$watch(function() { return Weather.data['status']; }, function(status) { observe(status, self.data, Weather.data, $window); });

        self.views = [
            ['hasSun', 'sun.jpg', 'Sun'],
            ['hasCloud', 'cloud.jpg', 'Clouds'],
            ['hasRain', 'rain.jpg', 'Rain'],
            ['hasThunder', 'thunder.jpg', 'Storm'],
            ['hasCold', 'cold.jpg', 'Cold'],
            ['hasWarm', 'warm.jpg', 'Warm']
        ];

    };

    function observe(status, data, weatherData, $window) {
        switch(status) {
            case 'OK':
                // merges the weather data, and decodes the weather information
                angular.extend(data, weatherData);
                decode(data);
                break;
            case 'LOCAL': 
                $window.location = '#/local';
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