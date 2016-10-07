
/* definitions for requirejs */
require.config({
    baseUrl: '/app',
    paths: {
        angular: '/public/angular1.5.8.min'
    },
    shim: {
        angular: {
            exports: 'angular'
        }
    }
});

/* loads default module and binds to DOM */
requirejs(['require', 'angular'], function(require, angular) {
    angular.module('app', []);
    angular.bootstrap(document, [ 'app' ])
});