'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ui.router',
  'myApp.login',
  'myApp.main',
  'myApp.analysis',
  'ngCookies'
]);

app
  .controller('myAppCtrl', function($scope, $rootScope, $state, $stateParams, $location, sessionService) {
    console.log('执行myAppCtrl');

    $scope.$on('routeChange', function(e, name) {
      // 更新tab的活动状态
      $scope.state = name.indexOf('.') == -1 ? name : name.substring(0, name.indexOf('.'));

      // 更新是否登录
      if (sessionService.isLogin()) {
        $scope.isLogin = true;
        $scope.userName = sessionService.getSession().userName;
      } else {
        $scope.isLogin = false;
      }
    });

    /** 登出 */
    $scope.logout = function() {
      if (sessionService.logout()) {
        $state.go('login');
      } else {
        // TODO 提示用户登出失败
      }
    }
  })
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");

    // 路由状态
    $stateProvider
      .state('login', {
        url: "/login",
        templateUrl: "login/login.html"
      })
      .state('main', {
        url: '/main',
        templateUrl: 'main/main.html',
        controller: 'sidebarCtrl'
      })
      .state('analysis', {
        url: '/analysis',
        templateUrl: 'analysis/analysis.html',
        controller: 'analysisCtrl'
      })
      .state('main.stuList', {
        url: '/stuList',
        templateUrl: 'stuList/stuList.html'
      });

  })
  .run(function($rootScope, $state, sessionService) {

    // 绑定路由改变事件
    $rootScope.$on('$stateChangeStart', function(event, next) {
      console.log('Route change');
      if (!sessionService.isLogin() && next.url != '/login') {
        event.preventDefault();
        $state.go('login');
      } else {
        $rootScope.$broadcast('routeChange', next.name);
      }
    });

  });
