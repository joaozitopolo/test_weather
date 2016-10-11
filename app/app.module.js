define(function(require) {

    require('angular-route');

    var app = require('angular').module('app', [ 'ngRoute' ]);
    app.config(require('app.routes.config'));
    app.service('Geolocation', require('geolocation.service'));
    app.service('Weather', require('weather.service'));
    app.controller('Authorization', require('authorization.controller'));
    app.controller('Weather', require('weather.controller'));
    app.component('appThumb', require('app-thumb.component'));

    return 'app';

});