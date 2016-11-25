'use strict';

/**
 * @ngdoc function
 * @name larryFrontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the larryFrontApp
 */
angular.module('larryFrontApp')
  .controller('MainCtrl', function ($scope, $http, $base64) {
    $scope.test=null;
    $http.get('../../categorias.json').success(function(data) {
        $scope.categorias = data;
        console.log(data);
        console.log($base64.encode('undefined'));
    }).error(function(data){
      console.log("Error en get de json");
    });

    $scope.encodeImagen = function(imagen){
      console.log(imagen.base64);
      $scope.test=imagen.base64;
    };

  });
