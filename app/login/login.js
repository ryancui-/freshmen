/**
 * Created by ryancui on 2016/7/1.
 */
angular.module('myApp.login', [])
  .controller('loginController', function($scope, $state, $stateParams, sessionService) {

    console.log('调用 loginController');

    $scope.isLogin = sessionService.getSession() ? true : false;
    $scope.showAlert = false;

    $scope.$on('LOGIN', function() {
      $scope.isLogin = true;
    });

    $scope.$on('LOGOUT', function() {
      $scope.isLogin = false;
    });

    /** 登录提交 */
    $scope.submit = function() {

      if (!$scope.user || !$scope.user.name || !$scope.user.password) {
        $scope.alertMsg = '用户名密码为空';
        $scope.alertType = 'warning';
        $scope.showAlert = true;
        return;
      }

      sessionService.login($scope.user.name, $scope.user.password).success(function(ret) {
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
      $scope.user = null;
    };
  });