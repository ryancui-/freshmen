/**
 * Created by ryancui on 2016/7/1.
 */
angular.module('myApp.login', [])
  .controller('loginController', function($scope, $state, $stateParams, sessionService) {
    $scope.submit = function() {
      if (!$scope.user.userName || !$scope.user.userPassword) {
        $state.go('login', {
          msg: '用户名密码为空'
        });
      }

      if (sessionService.login($scope.user.userName, $scope.user.userPassword)) {
        $state.go('main');
      } else {
        $state.go('login', {
          msg: '用户名密码错误'
        });
      }
    };

    $scope.reset = function() {
      $scope.user = null;
    };
  });