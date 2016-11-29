'use strict';

/**
 * @ngdoc function
 * @name larryFrontApp.controller:PreguntasCtrl
 * @description
 * # PreguntasCtrl
 * Controller of the larryFrontApp
 */
angular.module('larryFrontApp')
  .controller('PreguntasCtrl', function ($scope, $http, $location, $routeParams, $window) {
    $scope.term =Number($routeParams.id);
    $scope.infoTotal=function(){
      $http.get('http://localhost:8080/Preguntas/'+$scope.term).success(function(data) {
          $scope.pregunta = data;
          $scope.pregunta.resps=0;
          $scope.respuestas=[];
          $scope.datos=$window.sessionStorage;
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
    };
    $scope.infoTotal();

    $scope.login=function(){
      $http.post('http://localhost:8080/api/login', {
            username: $scope.userReg.username,
            password: $scope.userReg.password
        }).then(function (response) {
            $window.sessionStorage.authenticated = true;
            $window.sessionStorage.token = response.data.access_token;
            $window.sessionStorage.userReg=$scope.userReg.username;
            $scope.obtenerDatosUser();
        });
    };
    $scope.logout=function(){
      $window.sessionStorage.clear();
      $scope.datos=$window.sessionStorage;
    };

    $scope.obtenerDatosUser= function(){
      $http.get('http://localhost:8080/Users').success(function(data) {
          $scope.users = data;
          angular.forEach($scope.users, function(user){
            if($window.sessionStorage.userReg===user.username){
              $window.sessionStorage.userId=user.id;
            }
          });
      }).error(function(data){
        console.log("Error en get de json");
      });
      $scope.datos=$window.sessionStorage;
    };

    $scope.votar = function(resp, valor){
      resp.score=(resp.score+valor);
      $http.put('http://localhost:8080/Respuestas/'+resp.id,{
        score:resp.score
      }).then(function(response){
        console.log(response);
      });
    };
    $scope.nuevaRespuesta = function(resp){
      $http.post('http://localhost:8080/Respuestas', {
            idPreg: $scope.pregunta.id,
            res:false,
            score:0,
            texto:resp,
            username:$scope.datos.userReg
        }).then(function (response) {
          console.log(response);
          $scope.infoTotal();
        });
    };
  });
