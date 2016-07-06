/**
 * Created by ryancui on 2016/7/6.
 */
app.controller('sideBarCtrl', function($scope, $http, $state, promptService) {
  $scope.stuQuery = null;

  /** 查询新生信息 */
  $scope.queryStudent = function(isValid) {
    //$http.post('/api/test', {}).success(function(ret) {
    //  console.log(ret);
    //});

    if (!isValid) {
      // TODO Bootstrap的一些通用弹出框
    }

    // 将查询条件传到stuList状态
    $state.go('main.stuList', $scope.stuQuery);
  };

  /** reset新生查询 */
  $scope.reset = function() {
    $scope.stuQuery = null;
  }

});