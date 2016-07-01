/**
 * Created by ryancui on 2016/7/1.
 */
angular.module('myApp.service', []).factory('sessionService', function($http, $cookies) {
  var sessionService = {};

  var session = null;

  /** 设置session */
  sessionService.setSession = function(data) {
    session = {
      userName: data.userName,
      userId: data.userId,
      departmentName: data.departmentName,
      token: data.token
    };

    // 将token放到cookies中
    $cookies.put('TOKEN', data.token);
  };

  /** 是否已登录 */
  sessionService.isLogin = function() {
    var isLogin = true;

    // 首先检查前端session是否为空
    if (session == null) {
      // session为空，则用cookie中的token请求后台是否在后台已登录
      var token = $cookies.get('TOKEN');
      if (!token) {
        isLogin = false;
      } else {
        $http.get('/api/profile', {
          token: token
        }).success(function(ret) {
          if (ret.success) {
            sessionService.setSession(ret.data);
          } else {
            isLogin = false;
          }
        });
      }
    }

    return isLogin;
  };

  /** 登录 */
  sessionService.login = function(userName, userPassword) {
    var success = true;

    $http.post('/api/login', {
      userName: userName,
      userPassword: userPassword
    }).success(function(ret) {
      if (ret.success) {
        sessionService.setSession(ret.data);
      } else {
        success = false;
      }
    });

    return success;
  };

  return sessionService;
});
