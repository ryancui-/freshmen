'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'myApp.login',
  'myApp.main',
  'myApp.service',
  'ngCookies'
])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");

    $stateProvider
      .state('login', {
        url: "/login",
        templateUrl: "login/login.html"
      })
      .state('main', {
        url: '/main',
        templateUrl: 'main/main.html'
      });
  }])
  .run(function($rootScope, $state, sessionService) {

    // 路由每次改变检测权限
    $rootScope.$on('$stateChangeStart', function(event, next) {
      console.log('Route change');
      if (!sessionService.isLogin) {
        $state.go('login');
      }
    });
  });
