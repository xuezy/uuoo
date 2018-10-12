(function() {
  'use strict';
  //验证方式
  angular.module('zhyyt.verification', [])
    .controller('verificationCtrl', ["$scope", "$state", "$rootScope", function($scope, $state, $rootScope) {
      $rootScope.headerTitle = '验证方式'; //头部显示名字
      $scope.type=1;

      //下一步
      $scope.ok=function(){
        if($scope.type===1){
          //服务密码验证
          $state.go('zhyyt.servicePass');
        }else if($scope.type===2){
          //近期通话号码验证
          $state.go('zhyyt.callRecord');
        }
      };
    
    }]);
})();