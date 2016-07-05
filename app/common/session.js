/**
 * Created by ryancui on 2016/7/1.
 */
app.factory('sessionService', function($http, $cookies, $rootScope) {
  var sessionService = {};

  var session = null;

  /** 登录 */
  sessionService.login = function(userName, userPassword) {
    return $http.post('/api/login', {
      userName: userName,
      userPassword: userPassword
    });
  };

  /** 登出 */
  sessionService.logout = function() {
    return $http.post('/api/logout', {
      token: session.token
    });
  };

  /** 获取当前登录用户 */
  sessionService.profile = function() {
    var token = $cookies.get('TOKEN');
    return $http.get('/api/profile?token=' + token);
  };

  /** 获取 session 信息 */
  sessionService.getSession = function() {
    return session;
  };

  /** 设置session */
  sessionService.setSession = function(data) {
    session = {
      userName: data.userName,
      userId: data.userId,
      departmentName: data.departmentName,
      token: data.token
    };

    $cookies.put('TOKEN', data.token);

    $rootScope.$broadcast('LOGIN');
  };

  /** 清除session信息 */
  sessionService.removeSession = function() {
    session = null;
    $cookies.put('TOKEN', '');

    $rootScope.$broadcast('LOGOUT');
  };

  return sessionService;
});
