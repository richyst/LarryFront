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
      .when('/categorias/:id', {
        templateUrl: 'views/categorias.html',
        controller: 'CategoriasCtrl',
        controllerAs: 'categorias'
      })
      .when('/preguntas', {
        templateUrl: 'views/preguntas.html',
        controller: 'PreguntasCtrl',
        controllerAs: 'preguntas'
      })
      .when('/preguntas/:id', {
        templateUrl: 'views/preguntas.html',
        controller: 'PreguntasCtrl',
        controllerAs: 'preguntas'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
