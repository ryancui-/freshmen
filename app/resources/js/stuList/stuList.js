/**
 * Created by ryancui on 2016/7/6.
 */
app.controller('stuListCtrl', function($scope, $state, $stateParams) {

  console.log($stateParams.kh);

  // TODO HTTP查询后台，若返回多条数据，直接绑定到model；若返回一条数据，传学号到stuDetail状态

  $scope.stuList = [
    {xh: 11346019, xm: '崔兆威'},
    {xh: 11346738, xm: '吴彦祖'}
  ];

});