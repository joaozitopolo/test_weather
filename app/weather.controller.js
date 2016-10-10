define(function() {

    /** basic controls for authorization page */
    return function($window, $scope, Weather) {
        var self = this;
        //self.data = {};
        self.data = {"latitude":-29.7549941,"longitude":-51.150283,"status":"OK","coord":{"lon":-51.15,"lat":-29.76},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":293.263,"pressure":1024.1,"humidity":47,"temp_min":293.263,"temp_max":293.263,"sea_level":1032.94,"grnd_level":1024.1},"wind":{"speed":7.03,"deg":102.001},"clouds":{"all":56},"dt":1476129599,"sys":{"message":0.0157,"country":"BR","sunrise":1476089453,"sunset":1476135121},"id":3448622,"name":"Sao Leopoldo","cod":200};

        // merges the Weather.data in data field
        $scope.$watch(function() { return Weather.data['status']; }, function(status) { angular.extend(self.data, Weather.data); });
    };

});