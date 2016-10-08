define(function(require) {

    return appRoutesConfig;

    function appRoutesConfig($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'app/templates/askAuthorization.html',
            controller: 'Authorization as $ctrl'
        })
        .when('/local', {
            templateUrl: 'app/templates/askLocalization.html',
            controller: 'Localization as $ctrl'
        })
        .when('/weather', {
            templateUrl: 'app/templates/weather.html',
            controller: 'Weather as $ctrl'
        })
        .otherwise('/');
    }

});