'use strict';

angular.module('darkroomchatApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/',
        resolve: { socket : 'socket'}
      });

    $locationProvider.html5Mode(true);
  })
  .factory('socket', function() {
    return io.connect('http://localhost:9000');
  });