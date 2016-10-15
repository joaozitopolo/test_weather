define(function() {

    return function($q) {
        var self = this;
        self.locatePromise = function() { return locatePromise($q); };
        self.locate = function(data) { locate(data, $q); };
    }

    /** retrieve the global coordinates for the user 
     * the resolve will be called with the coordinates { latitude, longitude }
     * the reject will be called with the error cause { error }
    */
    function locatePromise($q) {
        return $q(function(resolve, reject) {
            if(navigator.geolocation) {
                var options = {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                };
                navigator.geolocation.getCurrentPosition(function(position) {
                    resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude });
                }, function(error) {
                    reject({ error: 'not allowed (' + (error && error['message']) + ')' });
                }, options);
            } else {
                reject({ error: 'incompatible browser' });
            }
        });
    }

    /** execute the locatePromise and store the data retrieved 
     * the data will be updated with { status: 'LOCATE' | 'DENIED'} or { status: 'LOCATED', latitude, longitude }
    */
    function locate(data, $q) {
        angular.extend(data, { status: 'LOCATE', latitude: undefined, longitude: undefined });
        locatePromise($q).then(function(coords) {
            angular.extend(data, coords, { status: 'LOCATED' });
        }, function(errorCause) {
            angular.extend(data, errorCause, { status: 'DENIED' });
        });
    }

});
