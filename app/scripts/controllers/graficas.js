'use strict';

/**
 * @ngdoc function
 * @name larryFrontApp.controller:GraficasCtrl
 * @description
 * # GraficasCtrl
 * Controller of the larryFrontApp
 */
angular.module('larryFrontApp')
  .controller('GraficasCtrl', function ($scope, $http) {


    $http.get('http://localhost:8080/Users').success(function(data) {
        $scope.users = data;
        $http.get('http://localhost:8080/Respuestas').success(function(data) {
            $scope.respuestas = data;
            angular.forEach($scope.users, function(user){
              user.num=0;
              angular.forEach($scope.respuestas, function(resp){
                if(resp.username===user.username){
                  user.num++;
                }
              });
            });
            console.log($scope.users);
            $scope.options = {
              chart: {
                  type: 'discreteBarChart',
                  height: 450,
                  margin : {
                      top: 20,
                      right: 20,
                      bottom: 60,
                      left: 55
                  },
                  x: function(d){ return d.label; },
                  y: function(d){ return d.value; },
                  showValues: true,
                  valueFormat: function(d){
                      return d3.format(',.4f')(d);
                  },
                  transitionDuration: 500,
                  xAxis: {
                      axisLabel: 'X Axis'
                  },
                  yAxis: {
                      axisLabel: 'Y Axis',
                      axisLabelDistance: 30
                  }
              }
            };
            $scope.data = [{
                key: "Cumulative Return",
                values: [
                  { "label" : $scope.users[0].id , "value" : $scope.users[0].num },
                  { "label" : $scope.users[1].id , "value" : $scope.users[1].num }
                ]
            }];

        }).error(function(data){
          console.log("Error en get de json");
        });
    }).error(function(data){
      console.log("Error en get de json");
    });


  });
