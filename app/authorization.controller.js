define(function() {

    /** basic controls for authorization page */
    return function(Weather) {

        var self = this;

        self.allow = Weather.allow;

        self.deny = Weather.deny;

        self.Weather = Weather;

    };

});