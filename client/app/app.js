'use strict';

angular.module('darkroomchatApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'luegg.directives'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl : 'app/main/main.html',
        controller : 'MainCtrl',
        resolve : {sharedProperties : 'sharedProperties'}
      })
      .when('/chat', {
        templateUrl: 'app/main/chat.html',
        controller: 'ChatCtrl',
        resolve: { socket : 'socket', sharedProperties : 'sharedProperties'}
      });

    $locationProvider.html5Mode(true);
  })
  .factory('socket', function() {  
    return io.connect();
  })
  .factory('sharedProperties', function(){
     var property = '';
     var gender = '';
     return {
      getProperty : function() {
        return property;
      },
      setProperty : function(value) {
        property = value;
      },
      getGender : function() {
        return gender;
      },
      setGender : function(value) {
        gender = value;
      }

     };  
  });