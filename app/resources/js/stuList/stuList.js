/**
 * Created by ryancui on 2016/7/6.
 */
app.controller('stuListCtrl', function($scope, $state, $stateParams, $http) {

  $scope.itemsOptions = [5,10,20];

  $scope.stuList = [];

  $scope.callServer = function(tableState) {

    $scope.tableState = tableState; //tableState对象中包含sort排序信息以及search搜索信息
    $scope.getData(1);
  }

  /** 根据页码获取数据 */
  $scope.getData = function(pageNo) {

    $scope.isLoading = true;

    var pagination = $scope.tableState.pagination;
    //console.log($scope.tableState);

    var start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
    var number = pagination.number || 10;  // Number of entries showed per page.

    pagination.currentPage = pagination.inputCurPage = pageNo;

    $http.post('/api/student/findPage?token=' + $scope.loginUser.token, {
      page: pageNo,
      rows: number,
      xm: $stateParams.xm,
      xh: $stateParams.xh
    }).success(function(ret) {
      $scope.stuList = ret.rows;

      pagination.numberOfPages = Math.ceil(ret.total/pagination.number);//set the number of pages so the pagination can update
      pagination.totalItemCount = ret.total;

      $scope.isLoading = false;
    });
  };

});