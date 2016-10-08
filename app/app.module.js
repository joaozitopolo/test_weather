define(function(require) {

    require('angular-route');

    var app = require('angular').module('app', [ 'ngRoute' ]);
    app.config(require('app.routes.config'));
    app.service('Geolocation', require('geolocation.service'));
    app.service('Weather', require('weather.service'));
    app.controller('Authorization', require('authorization.controller'));

    return 'app';

});