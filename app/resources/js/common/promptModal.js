/**
 * Created by ryancui on 2016/7/7.
 */
/** 弹出提示框服务 */
serviceModule.factory('promptService', function($uibModal) {

  var promptService = {};

  /** 提示框 */
  promptService.prompt = function(msg, size) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: '../../../views/common/promptModal.html',
      size: size,
      controller: function($scope, $uibModalInstance) {
        $scope.msg = msg;
        $scope.ok = function() {
          $uibModalInstance.close();
        };
        $scope.cancel = function() {
          $uibModalInstance.dismiss();
        }
      },
    });

    return modalInstance.result;
  };

  return promptService;
});