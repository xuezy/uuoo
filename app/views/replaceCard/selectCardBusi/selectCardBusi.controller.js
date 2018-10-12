(function() {
  'use strict';

  angular.module('zhyyt.selectCardBusi', [])
    .controller('selectCardBusiCtrl', function($scope, $rootScope, $state, commonService, $timeout, rechargeService) {
      $rootScope.headerTitle = '登录'; //头部显示名字
      $scope.phone = '';
      $scope.goNext = function(){
        if (!$scope.phone || $scope.phone.length < 11 || !$scope.cardBusi) {
        	return;
        }
        commonService.setState({
        	IDValue: $scope.phone
        })
        $scope.cardBusi === '01' && $state.go('zhyyt.readIDCard');
        $scope.cardBusi === '02' && $state.go('zhyyt.changeCard');
      }
      $scope.$watch('phone', function (nv, ov) {
        if (nv === ov) {
          return;
        }
        console.log(nv);
        $scope.typeError = false;
        if($scope.phone.length === 11){
          rechargeService.checkPhone({ serviceNumber: $scope.phone.replace(/\s/g, '') }, function (res) {
            if (res.retCode === '200') {
              rechargeService.getAttribution({ cellNumber: $scope.phone.replace(/\s/g, '') }, function (res) {
                if (res.retCode === '200') {
                  $scope.errorMsg = res.data;
                } else {
                  $scope.typeError = true;
                  $scope.errorMsg = '获取归属地错误。' + res.msg;
                }
              });
            } else {
              $scope.typeError = true;
              $scope.errorMsg = res.msg;
            }
          });
        }
      });

       $scope.goBack = function(){
       	  $state.go('home');
       }

       $scope.typeIn = function (value) {
        var model = 'phone';
  
        if (value === 'clear') {
          $scope[model] = ''
          return;
        }
        if (value === 'backspace') {
          $scope[model] = $scope[model].substr(0, $scope[model].length - 1)
          return;
        }
        if ($scope.phone.length < 11) {
          $scope[model] += '' + value;
          return;
        }
      };
    });
})();