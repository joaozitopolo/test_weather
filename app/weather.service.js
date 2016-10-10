define(function(require) {

    return function($window, Geolocation) {

        var self = this;
        self.data = {};
        self.allow = function() { return allow($window, Geolocation, self.data); };
        self.deny = function() { return deny($window); };

    }

    /** try to capture the current location. If localized, shows the weather. Else, will ask for localization */
    function allow($window, Geolocation, data) {
        data.loading = true;
        Geolocation.getLocation().then(function(coords) {
            angular.extend(data, coords, { loading: false });
            $window.location = '#/weather';
        }, function(errorCause) {
            angular.extend(data, errorCause, { loading: false });
        });
    }

    /** ask for localization */
    function deny($window) {
        $window.location = '#/local'
    }

});
