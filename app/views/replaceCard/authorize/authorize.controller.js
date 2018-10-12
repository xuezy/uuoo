(function() {
  'use strict';
  //充值单据
  angular.module('zhyyt.authorize', [])
    .controller('authorizeCtrl', ["$scope", "$state", "$rootScope","$timeout", function($scope, $state, $rootScope, $timeout) {
      $rootScope.headerTitle = '授权'; //头部显示名字
      
      
      $timeout(function(){
        $scope.payState = 'underway';//显示等待
        $timeout(function(){
          $scope.payState = 'success';
          $state.go('zhyyt.verification');
        },1000);
      },1000)


    }]);
})();