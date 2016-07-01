/**
 * Created by ryancui on 2016/7/1.
 */
angular.module('myApp.service', []).factory('sessionService', function($http, $cookies) {
  var sessionService = {};

  var session = null;

  /** ����session */
  sessionService.setSession = function(data) {
    session = {
      userName: data.userName,
      userId: data.userId,
      departmentName: data.departmentName,
      token: data.token
    };

    // ��token�ŵ�cookies��
    $cookies.put('TOKEN', data.token);
  };

  /** �Ƿ��ѵ�¼ */
  sessionService.isLogin = function() {
    var isLogin = true;

    // ���ȼ��ǰ��session�Ƿ�Ϊ��
    if (session == null) {
      // sessionΪ�գ�����cookie�е�token�����̨�Ƿ��ں�̨�ѵ�¼
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

  /** ��¼ */
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
