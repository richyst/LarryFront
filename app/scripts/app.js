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
    'vjs.video',
    'nvd3',
    'ngTouch'
  ])
  .factory('authInterceptor', function ($rootScope, $window) {
      return {
          request: function (config) {
              config.headers = config.headers || {};
              if ($window.sessionStorage.token) {
                  config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
              }
              return config;
          }
      };
  })
  .config(function ($httpProvider) {
      $httpProvider.interceptors.push('authInterceptor');
  })
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
      .when('/tutorial', {
        templateUrl: 'views/tutorial.html',
        controller: 'TutorialCtrl',
        controllerAs: 'tutorial'
      })
      .when('/graficas', {
        templateUrl: 'views/graficas.html',
        controller: 'GraficasCtrl',
        controllerAs: 'graficas'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
