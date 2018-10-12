(function () {
  'use strict';

  angular.module('zhyyt.controllers', [
    'zhyyt.recharge',
    'zhyyt.payMian',
    // 'zhyyt.barcode',
    'zhyyt.alipay',
    'zhyyt.cmpay',
    'zhyyt.unionpay',
    'zhyyt.weixin',
    'zhyyt.fail',
    'zhyyt.timeout',
    'zhyyt.chargeFail',
    'zhyyt.chargeSuccess',
    'zhyyt.payCash',
    'zhyyt.swipingCard',
    'zhyyt.pachanding',
    'zhyyt.invoiceShow',
    'zhyyt.fillInEmail',
    'zhyyt.rcOrderAccepted',
    'zhyyt.changeCard',
    'zhyyt.authorize',
    'zhyyt.verification',
    'zhyyt.servicePass',
    'zhyyt.takeCard',
    'zhyyt.result',
    'zhyyt.documents',
    'zhyyt.openAccountControllers',
    'zhyyt.replaceCardModule',
    'home',
    'zhyyt.login'
  ])
    .controller('mainController', function ($scope, $state) {

      
      $scope.modalMessage = '提示';//用户提示信息

      //数据
      $scope.user = {
        email: '',
        password: '',
        imageValue: ''
      };
      
      

      
    });
})();
