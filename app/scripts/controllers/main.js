'use strict';

/**
 * @ngdoc function
 * @name larryFrontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the larryFrontApp
 */
angular.module('larryFrontApp')
  .controller('MainCtrl', function ($scope, $http, $base64, $location) {
    $scope.test=null;
    $http.get('http://localhost:8080/Categorias').success(function(data) {
        $scope.categorias = data;
    }).error(function(data){
      console.log("Error en get de json");
    });

    $scope.navegar = function(id){
      $location.path( '/categorias/'+id );
    };

  });
