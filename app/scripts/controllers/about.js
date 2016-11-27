'use strict';

/**
 * @ngdoc function
 * @name larryFrontApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the larryFrontApp
 */
angular.module('larryFrontApp')
  .controller('AboutCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.encodeImagen = function(imagen){
      console.log(imagen.base64);
      $scope.test=imagen.base64;
    };

  });
