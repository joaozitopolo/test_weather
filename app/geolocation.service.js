define(function() {

    return function($q) {
        var self = this;
        self.data = { };
        self.locatePromise = function() { return locatePromise($q); };
        self.locate = function() { locate($q, self.data); };
    }

    /** try to retrieve the global coordinates for the user */
    function locatePromise($q) {
        return $q(function(resolve, reject) {
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude });
                }, function(error) {
                    reject({ error: 'not allowed (' + error.message + ')' });
                })
            } else {
                reject({ error: 'incompatible browser' });
            }
        });
    }

    /** execute the locatePromise and store the data retrieved */
    function locate($q, data) {
        data.status = 'LOCATE';
        locatePromise($q).then(function(coords) {
            angular.extend(data, coords, { status: 'LOCATED' });
            console.log(data);
        }, function(errorCause) {
            angular.extend(data, errorCause, { status: 'DENIED' });
        });
    }

});
