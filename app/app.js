'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('app', [
  'ui.router',
  'ui.bootstrap',
  'smart-table',
  'ngCookies',
  'service'
]);

/** 应用配置 */
app.config(function($stateProvider, $urlRouterProvider, $httpProvider, stConfig) {

  stConfig.pagination.template = 'views/common/pagination.html';

  $urlRouterProvider.otherwise("/login");

  // 路由状态
  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "views/login/login.html",
    })
    .state('main', {
      url: '/main',
      templateUrl: 'views/main/main.html',
    })
    .state('analysis', {
      url: '/analysis',
      templateUrl: 'views/analysis/analysis.html',
    })
    .state('main.stuList', {
      url: '/stuList?kh&tzsh&sfzh&xh&xm',
      templateUrl: 'views/stuList/stuList.html',
    })
    .state('manage', {
      url: '/manage',
      templateUrl: 'views/manage/manage.html'
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
});

/** Run 方法 */
app.run(function($rootScope, $state, sessionService, $cookies) {

  console.log('>> 执行Run方法');

  // 刷新后需要从服务器从新获取登录信息
  if (!sessionService.getSession() && $cookies.get('TOKEN')) {
    sessionService.profile().success(function(ret) {
      if (ret.success) {
        sessionService.setSession(ret.data);
      }
    });
  }

  // 绑定路由改变事件
  $rootScope.$on('$stateChangeStart', function(event, next) {
    console.log('路由改变');

    $rootScope.$broadcast('routeChange', next.name);

    if (!sessionService.getSession() && next.url != '/login') {
      event.preventDefault();
      $state.go('login');
    }

  });

});
