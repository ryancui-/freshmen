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
    });

    $scope.$on('LOGIN', function(e) {
      $scope.isLogin = true;
      $scope.userName = sessionService.getSession().userName;
    });

    $scope.$on('LOGOUT', function(e) {
      $scope.isLogin = false;
    });

    /** 登出 */
    $scope.logout = function() {
      sessionService.logout().success(function(ret) {
        sessionService.removeSession();
        $state.go('login');
      });
    }
  })
  .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
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

    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
      /**
       * The workhorse; converts an object to x-www-form-urlencoded serialization.
       * @param {Object} obj
       * @return {String}
       */
      var param = function(obj) {
        var query = '';
        var name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
          value = obj[name];

          if (value instanceof Array) {
            for (i = 0; i < value.length; ++i) {
              subValue = value[i];
              fullSubName = name + '[' + i + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          } else if (value instanceof Object) {
            for (subName in value) {
              subValue = value[subName];
              fullSubName = name + '[' + subName + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          } else if (value !== undefined && value !== null) {
            query += encodeURIComponent(name) + '='
              + encodeURIComponent(value) + '&';
          }
        }

        return query.length ? query.substr(0, query.length - 1) : query;
      };

      return angular.isObject(data) && String(data) !== '[object File]'
        ? param(data)
        : data;
    }];
  })
  .run(function($rootScope, $state, sessionService, $cookies) {

    // 绑定路由改变事件
    $rootScope.$on('$stateChangeStart', function(event, next) {
      console.log('路由改变');

      var session = sessionService.getSession();
      if (!session) {
        if (!$cookies.get('TOKEN')) {
          if (next.url == '/login') {
            $rootScope.$broadcast('routeChange', next.name);
          } else {
            event.preventDefault();
            $state.go('login');
          }
        } else {
          sessionService.profile().success(function(ret) {
            if (ret.success) {
              // 已登录
              sessionService.setSession(ret.data);
              $rootScope.$broadcast('routeChange', next.name);
            } else {
              // 未登录
              if (next.url != '/login') {
                event.preventDefault();
                $state.go('login');
              } else {
                $rootScope.$broadcast('routeChange', next.name);
              }
            }
          });
        }
      } else {
        $rootScope.$broadcast('routeChange', next.name);
      }
    });

  });
