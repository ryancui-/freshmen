/**
 * Created by ryancui on 2016/7/1.
 */
angular.module('myApp.main', [])
  .controller('sidebarCtrl', function($scope, $http) {
    $scope.stuQuery = null;

    $scope.queryStudent = function() {
      $http.post('/api/test', {}).success(function(ret) {
        console.log(ret);
      });
    };

    $scope.reset = function() {
      $scope.stuQuery = null;
    }

  });