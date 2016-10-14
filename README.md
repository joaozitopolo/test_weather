# test_weather

Access to OpenWeather service with Angular1.x

**[try the functional test](https://joaozitopolo.github.io/test_weather/)**

The project was created with three pages. The try to obtain the location by the navigator, the input of address and the results page.

I used a simple Flux pattern, observing the status on each controller, and updating actions as need.
For example:

    $scope.$watch(function() { return Weather.data['status']; },function(status) { 
        observe(status, self.data, Weather.data); 
    });

will monitor the Weather service, asking for updates after perform queries, and acting for the new status:

    function observe(status, data, weatherData) {
        switch(status) {
            case 'OK':
                // merges the weather data, and decodes the weather information
                angular.extend(data, weatherData);
                decode(data);
                break;
        }
    }



