define(function() {

    /** basic controls for authorization page */
    return function($window, $scope, Geolocation, Weather) {
        var self = this;
        self.data = {};
        Geolocation.locate(self.data);
        $scope.$watch(function() { return self.data['status'] }, function(status) { observe(status, self.data, $window, Weather); });
    };

    /** update current route for current status */
    function observe(status, data, $window, Weather) {
        switch(status) {
            case 'LOCATED':
                Weather.setLocation(data.latitude, data.longitude);
                $window.location = '#/weather';
                break;
            case 'DENIED':
                Weather.data.status = 'LOCAL';
                $window.location = '#/local';
                break;
        }
    }

});