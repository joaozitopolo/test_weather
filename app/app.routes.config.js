define(function(require, exports, module) {

    module.app.config(appConfig);        
        
    function appConfig($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'app/templates/askAuthorization.html'
        })
        .otherwise('/');
    }

});