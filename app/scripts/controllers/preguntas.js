'use strict';

/**
 * @ngdoc function
 * @name larryFrontApp.controller:PreguntasCtrl
 * @description
 * # PreguntasCtrl
 * Controller of the larryFrontApp
 */
angular.module('larryFrontApp')
  .controller('PreguntasCtrl', function ($scope, $http, $location, $routeParams) {
    $scope.term =Number($routeParams.id);
    $http.get('http://localhost:8080/Preguntas/'+$scope.term).success(function(data) {
        $scope.pregunta = data;
        $scope.pregunta.resps=0;
        $scope.respuestas=[];
        $scope.pregunta.fecha= $scope.pregunta.fecha.slice(0,10);
        $http.get('http://localhost:8080/Respuestas').success(function(data) {
            $scope.respuestas1 = data;
            angular.forEach($scope.respuestas1, function(resp){
              if($scope.pregunta.id===resp.idPreg){
                resp.votado=0;
                $scope.respuestas.push(resp);
                if(resp.res===true){
                  $scope.pregunta.status=true;
                }
                if(resp.res===false && $scope.pregunta.status!==true){
                  $scope.pregunta.status=false;
                }
                $scope.pregunta.resps++;
              }
            });
            $http.get('http://localhost:8080/Users').success(function(data) {
                $scope.users = data;
                angular.forEach($scope.respuestas, function(resp){
                  angular.forEach($scope.users, function(user){
                    if(resp.username===user.username){
                      resp.user=user;
                    }
                  });
                });

            }).error(function(data){
              console.log("Error en get de json");
            });
            if($scope.pregunta.resps===0){
              $scope.pregunta.status=false;
              $scope.pregunta.check="pregunta";
            }

        }).error(function(data){
          console.log("Error en get de json");
        });
        $http.get('http://localhost:8080/Users/'+$scope.pregunta.idUser).success(function(data) {
            $scope.user = data;
            $scope.pregunta.campus=$scope.user.campus;
            $scope.pregunta.username=$scope.user.username;

        }).error(function(data){
          console.log("Error en get de json");
        });
        $http.get('http://localhost:8080/Categorias/'+$scope.pregunta.idCat).success(function(data) {
            $scope.categoria = data;
        }).error(function(data){
          console.log("Error en get de json");
        });


    }).error(function(data){
      console.log("Error en get de json");
    });
    $scope.votar = function(resp, valor){
      resp.score=(resp.score+valor);
      $http.put('http://localhost:8080/Respuestas/'+resp.id,{
        score:resp.score
      }).then(function(){
        console.log(resp.score);
      });
    };
    $scope.nuevaRespuesta = function(resp){
      console.log(resp + $scope.term);
    };
  });
