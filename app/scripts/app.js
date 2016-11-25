'use strict';

/**
 * @ngdoc overview
 * @name larryFrontApp
 * @description
 * # larryFrontApp
 *
 * Main module of the application.
 */
angular
  .module('larryFrontApp', [
    'ngAnimate',
    'base64',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'naif.base64',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/categorias', {
        templateUrl: 'views/categorias.html',
        controller: 'CategoriasCtrl',
        controllerAs: 'categorias'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
