/**
 * Created by ryancui on 2016/7/1.
 */
app.factory('sessionService', function($http, $cookies) {
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

    $cookies.put('TOKEN', data.token);
  };

  /** 清除session信息 */
  sessionService.removeSession = function() {
    session = null;

    $cookies.put('TOKEN', '');
  };

  /** 判断是否已登录 */
  sessionService.isLogin = function() {
    var isLogin = true;

    // session为null则
    if (session == null) {
      // session为空，若有cookie则向后台请求相应的登陆用户信息
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

  /** 登出 */
  sessionService.logout = function() {
    var success = true;

    $http.post('/api/logout', {
      token: session.token
    }).success(function(ret) {
      if (ret.success) {
        sessionService.removeSession();
      } else {
        success = false;
      }
    })
  };

  /** 获取 session 信息 */
  sessionService.getSession = function() {
    return session;
  };

  return sessionService;
});
