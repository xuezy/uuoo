(function() {
  'use strict';
  //充值单据
  angular.module('zhyyt.servicePass', [])

    .controller('servicePassCtrl', ["$scope", "$state", "commonService", "$rootScope", "repairCard", function($scope, $state, commonService, $rootScope, repairCard, faceAndCardCheckServer) {
      var state = commonService.getState();
      $rootScope.headerTitle = '服务密码'; //头部显示名字
      $scope.servicePassword = '';
      $scope.payState = ''; //显示等待
      $scope.servicePasswordArr = [];
      $scope.servicePasswordBool = false;
      //上一步
      $scope.back = function() {
        $state.go('zhyyt.verification');
      };
      //确认
      $scope.goPayment = function() {
        //跳转授权页面
        repairCard.checkServiceCode({
          phone: state.IDValue,
          serviceCode: $scope.servicePassword
        }, function(res) {
          if (res.retCode === '200') {
            $state.go('zhyyt.costConfirm');
            $scope.servicePasswordBool = false;
          }else{
            $scope.servicePasswordBool = true;
          }
        });
      };

      //点击键盘输入
      $scope.typeIn = function(value) {
        var model;
        model = 'servicePassword';
        if (value === 'clear') {
          $scope[model] = '';
          $scope.servicePasswordArr = [];
          return;
        }
        if (value === 'backspace') {
          $scope[model] = $scope[model].substr(0, $scope[model].length - 1);
          $scope.servicePasswordArr.pop();
          return;
        }
        if (model === 'servicePassword' && $scope.servicePassword.length < 6) {
          $scope.servicePasswordArr.push('*');
          $scope[model] += '' + value;
          return;
        }

      };

    }]);
})();