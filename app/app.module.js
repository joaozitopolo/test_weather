define(function(require, exports, module) {

    var angular = require('angular');

    require('angular-route');

    module.app = angular.module('app', [ 'ngRoute' ]);

    require('app.routes.config');

    return 'app';

});