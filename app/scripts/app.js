'use strict';

/**
 * @ngdoc overview
 * @name whatsAppCloneApp
 * @description
 * # whatsAppCloneApp
 *
 * Main module of the application.
 */
angular
  .module('whatsAppCloneApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
