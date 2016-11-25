'use strict';

/**
 * @ngdoc function
 * @name larryFrontApp.controller:CategoriasCtrl
 * @description
 * # CategoriasCtrl
 * Controller of the larryFrontApp
 */
angular.module('larryFrontApp')
  .controller('CategoriasCtrl', function ($scope, $routeParams, $http, $location) {
    $scope.term =Number($routeParams.id);
    $scope.preguntas=[];
    $http.get('../../preguntas.json').success(function(data) {
        $scope.preguntas1 = data;
        console.log(data);
        angular.forEach($scope.preguntas1, function(item){
          if(item.idCat===$scope.term){
            $scope.preguntas.push(item);
          }
        });

    }).error(function(data){
      console.log("Error en get de json");
    });
    $http.get('../../users.json').success(function(data) {
        $scope.users = data;
        angular.forEach($scope.preguntas, function(preg){
          angular.forEach($scope.users, function(user){
            if(preg.idUser===user.id){
              preg.campus=user.campus;
              preg.username=user.username;
            }
          });
        });
    }).error(function(data){
      console.log("Error en get de json");
    });
    $http.get('../../categorias.json').success(function(data) {
        $scope.categorias = data;
        angular.forEach($scope.preguntas, function(preg){
          angular.forEach($scope.categorias, function(cat){
            if(preg.idCat===cat.id){
              preg.cat=cat.nombre;
            }
          });
        });
    }).error(function(data){
      console.log("Error en get de json");
    });

    $scope.navegar = function(id){
      $location.path( '/preguntas/'+id );
      console.log(id);
    };

  });
