/**
 * Created by ryancui on 2016/7/7.
 */
var serviceModule = angular.module('service', []);

app.controller('appCtrl', function($scope, $rootScope, $state, $stateParams, $location, sessionService) {
  console.log('>>全局控制器');

  $scope.loginUser = null;

  $scope.$on('LOGIN', function() {
    $scope.loginUser = sessionService.getSession();
  });

  $scope.$on('LOGOUT', function() {
    $scope.loginUser = null;
  });

});

/** 导航条控制器 */
app.controller('navBarCtrl', function($scope, $rootScope, $state, $stateParams, $location, sessionService) {
  console.log('>>导航条控制器');

  $scope.$on('routeChange', function(e, name) {
    // 更新tab的活动状态
    $scope.state = name.indexOf('.') == -1 ? name : name.substring(0, name.indexOf('.'));
  });

  /** 登出 */
  $scope.logout = function() {
    sessionService.logout().success(function(ret) {
      sessionService.removeSession();

      $state.go('login');
    });
  }
});