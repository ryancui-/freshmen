/**
 * Created by ryancui on 2016/7/6.
 */
app.controller('sideBarCtrl', function($scope, $http, $state, promptService) {
  $scope.stuQuery = null;

  /** 查询新生信息 */
  $scope.queryStudent = function(isValid) {
    // 将查询条件传到stuList状态
    $state.go('main.stuList', $scope.stuQuery);
  };

  /** reset新生查询 */
  $scope.reset = function() {
    $scope.stuQuery = null;
  }

});