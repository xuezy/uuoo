(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name zhyyt.service:payMianService
   * @description
   * # payMianService 支付方式service
   * Service of the zhyyt
   */
  angular.module('zhyyt.payMian')
    .factory('payMianService', payMianService);

  function payMianService(Restangular, $http, commonService) {
    return {
      genpaycharge: genpaycharge,
      newGenPay: newGenPay
    };

    function genpaycharge(params, callback) {
      Restangular.all('upay/genpaycharge').post(params).then(callback);
    }
    
    //支付充值页面每次生成新二维码 通知智慧营业厅新订单信息
    function newGenPay(OrderNo){
      var state = commonService.getState();
      Restangular.all('upay/genpaycharge').post({
        BusiCode: state.BusiCode,
        BusiType: state.BusiType,
        OrderMoney: Number(state.OrderMoney)*100,
        Payment: Number(state.Payment)*100,
        ChargeMoney: Number(state.ChargeMoney)*100,
        PayGift: Number(state.PayGift)*100,
        IDValue: state.IDValue,
        OrderNo: OrderNo,
        ProductName: state.ProductName,
        AccountMoney: Number(state.AccountMoney)*100,
        ChargeGift: Number(state.ChargeGift)*100,
        PhoneNum: state.PhoneNum,
        HandleTime: OrderNo.substr(4,8),
        NextUrl : state.NextUrl,
        AgainUrl : state.AgainUrl
      }).then(function(res){
        console.log(res, 'payMianServiceResponse')
      });
    }
  }

})();
