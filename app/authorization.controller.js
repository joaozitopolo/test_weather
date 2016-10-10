define(function() {

    /** basic controls for authorization page */
    return function($window, $scope, Geolocation, Weather) {
        var self = this;
        self.data = {};
        Geolocation.locate(self.data);
        $scope.$watch(function() { return self.data }, function(data) { observe($window, data); });
    };

    /** update current route for current status */
    function observe($window, data) {
        console.log(data['status']);
        switch(data['status']) {
            case 'LOCATED':
                Weather.setLocation(data.latitude, data.longitude);
                $window.location = '#/weather';
                break;
            case 'DENIED':
                $window.location = '#/local';
                break;
        }
    }

});