'use strict';

/**
 * @ngdoc function
 * @name larryFrontApp.controller:CategoriasCtrl
 * @description
 * # CategoriasCtrl
 * Controller of the larryFrontApp
 */
angular.module('larryFrontApp')
  .controller('CategoriasCtrl', function ($scope, $routeParams, $http, $location,$window) {
    $scope.term =Number($routeParams.id);
    $scope.preguntas=[];
    $scope.datos=$window.sessionStorage;
    $scope.editPreg=null;
    $scope.infoTotal = function (){
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

    $scope.crearPregunta = function(newPreg){
      $http.post('http://localhost:8080/Preguntas', {
            idCat:$scope.categoria.id,
            texto:newPreg.texto,
            titulo:newPreg.titulo,
            idUser:$scope.datos.userId
        }).then(function () {
            $scope.infoTotal();
        });
    };
    $scope.borrarPregunta = function(preg){
      $http.delete('http://localhost:8080/Preguntas/'+preg.id, {

        }).then(function () {
            $scope.infoTotal();
        });
    };
    $scope.editarPregunta = function(preg){
      $http.put('http://localhost:8080/Preguntas/'+preg.id, {
            idCat:$scope.categoria.id,
            texto:preg.texto,
            titulo:preg.titulo
        }).then(function () {
            $scope.infoTotal();
        });
    };
    $scope.selPregunta = function(preg){
      $scope.editPreg=preg;
    };

    $scope.navegar = function(id){
      $location.path( '/preguntas/'+id );
      console.log(id);
    };

  });
