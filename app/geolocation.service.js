define(function() {

    return function($q) {

        /** (promise) try to retrieve the global coordinates for the user */
        this.getLocation = function() {
            return $q(function(resolve, reject) {
                if(navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        resolve(position.coords);
                    }, function() {
                        reject({ error: 'not allowed' });
                    })
                } else {
                    reject({ error: 'old browser' });
                }
            });
        }

    }

});
