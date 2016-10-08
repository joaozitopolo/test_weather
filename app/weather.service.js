define(function(require) {

    return function($window, Geolocation) {

        var self = this;
        self.data = {};

        /** try to capture the current location. If localized, shows the weather. Else, will ask for localization */
        function allow() {
            Geolocation.getLocation().then(function(coords) {
                self.data = angular.extend({}, coords);
                $window.location = '#/weather';
            }, function(data) {
                self.data = angular.extend({}, data);
            });
        }

        /** ask for localization */
        function deny() {
            $window.location = '#/local'
        }

    }
});
