define(function() {

    return function($window, $scope, Geolocation, Weather) {
        var self = this;
        self.data = {};
        self.countries = [ { value:'uk', label: 'United Kingdom' }, { value:'us', label: 'U.S.A.' }, { value:'it', label: 'Italy' } ];
        self.data.country = self.countries[0].value;
        self.search = function() { search(self.data, $window, Weather); };

        // test for page refresh
        if(!Weather.active())  {
            $window.location = '#/';
        }

        $scope.$watch(function() { return Weather.data['status']; }, function(status) { observe(status, $window); });
    };

    function search(data, $window, Weather) {
        if(!data.address) {
            $window.alert('ZipCode/City Name is required');
            return;
        }
        Weather.search(data.address, data.country);
    }

    function observe(status, $window) {
        switch(status) {
            case 'OK':
                $window.location = '#/weather';
                break;
        }
    }    

});
