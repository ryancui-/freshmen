/**
 * Created by ryancui on 2016/7/1.
 */
app.controller('sidebarCtrl', function($scope, $http, $state) {
  $scope.stuQuery = null;

  $scope.queryStudent = function() {
    //$http.post('/api/test', {}).success(function(ret) {
    //  console.log(ret);
    //});
    $state.go('main.stuList');
  };

  $scope.reset = function() {
    $scope.stuQuery = null;
  }

});