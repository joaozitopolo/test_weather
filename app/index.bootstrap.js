
/* definitions for requirejs */
require.config({
    baseUrl: '/app',
    paths: {
        angular: '/public/angular1.5.8.min',
        'angular-route': '/public/angular1.5.8-route.min'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        'angular-route': {
            deps: [ 'angular' ]
        }
    }
});

/* loads default module and binds to DOM */
define(function(require) {
    var angular = require('angular');
    angular.bootstrap(document, [ require('app.module') ]);
});
