'use strict';

/**
 * @ngdoc function
 * @name larryFrontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the larryFrontApp
 */
angular.module('larryFrontApp')
  .controller('MainCtrl', function ($scope, $http, $base64, $location, $window) {
    $scope.test=null;
    $scope.user={};
    $scope.datos=$window.sessionStorage;
    $http.get('http://localhost:8080/Categorias').success(function(data) {
        $scope.categorias = data;
    }).error(function(data){
      console.log("Error en get de json");
    });
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

    $scope.nuevaCategoria = function(newCat){
      $http.post('http://localhost:8080/Categorias', {
            nombre:newCat.nombre,
            imagen:newCat.imagen.base64
        }).success(function (response) {
            console.log(response);
        }).error(function(data){
          console.log(data);
          alert("Solo admins pueden agregar categorías");
        });
    };

    $scope.navegar = function(id){
      $location.path( '/categorias/'+id );
    };

  });
