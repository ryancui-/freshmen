/**
 * Created by ryancui on 2016/7/1.
 */
app.controller('loginCtrl', function($scope, $state, $stateParams, sessionService) {

  console.log('>> 调用loginCtrl');

  $scope.showAlert = false;

  /** 登录提交 */
  $scope.submit = function(isValid) {

    if (!isValid) {
      $scope.alertMsg = '用户名密码为空';
      $scope.alertType = 'warning';
      $scope.showAlert = true;
      return;
    }

    sessionService.login($scope.user).success(function(ret) {
      if (ret.success) {
        sessionService.setSession(ret.data);

        $state.go('main');
      } else {
        $scope.alertMsg = '用户名密码错误';
        $scope.alertType = 'danger';
        $scope.showAlert = true;
      }
    });
  };

  $scope.reset = function() {
    $scope.showAlert = false;
    $scope.user = null;
  };
});