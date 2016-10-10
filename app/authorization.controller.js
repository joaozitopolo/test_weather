define(function() {

    /** basic controls for authorization page */
    return function($window, Geolocation) {
        var self = this;
        self.Geolocation = Geolocation;
        Geolocation.locate();
    };

    function allow($window, Geolocation) {
        Geolocation.allow;
    }

});