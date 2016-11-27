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

    $http.get('http://localhost:8080/Preguntas').success(function(data) {
        $scope.preguntas1 = data;
        angular.forEach($scope.preguntas1, function(item){
          item.resps=0;
          item.fecha= item.fecha.slice(0,10);
          if(item.idCat===$scope.term){
            $scope.preguntas.push(item);
          }
        });
        $http.get('http://localhost:8080/Users').success(function(data) {
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
        $http.get('http://localhost:8080/Respuestas').success(function(data) {
            $scope.respuestas = data;
            angular.forEach($scope.preguntas, function(preg){
              angular.forEach($scope.respuestas, function(resp){
                if(preg.id===resp.idPreg){
                  if(resp.res===true){
                    preg.status=true;
                    preg.check="preguntaRes";
                  }
                  if(resp.res===false && preg.status!==true){
                    preg.status=false;
                    preg.check="pregunta";
                  }
                  preg.resps++;
                }
              });
              if(preg.resps===0){
                preg.status=false;
                preg.check="pregunta";
              }
            });
        }).error(function(data){
          console.log("Error en get de json");
        });
        $http.get('http://localhost:8080/Categorias/'+$scope.term).success(function(data) {
            $scope.categoria = data;
        }).error(function(data){
          console.log("Error en get de json");
        });


    }).error(function(data){
      console.log("Error en get de json");
    });

    $scope.navegar = function(id){
      $location.path( '/preguntas/'+id );
      console.log(id);
    };

  });
