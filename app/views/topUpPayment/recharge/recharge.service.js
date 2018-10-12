(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name zhyyt.service:rechargeService
   * @description
   * # rechargeService 充值service
   * Service of the zhyyt
   */
  angular.module('zhyyt.recharge')
    .factory('rechargeService', rechargeService);

  function rechargeService(Restangular, $http) {
    return {
      checkPhone: checkPhone,
      getMoney: getMoney,
      getAttribution: getAttribution,
      createOrder: createOrder,
      openQR: openQR,
      openCash: openCash
    };

    //{"retCode":"0","data":{"bizCode":"1","bizDesc":"认证通过"},"msg":"SUCCESS"}
    function checkPhone(params, callback) {
      return Restangular.all('/aibizhall/recharge/checkCations').post(params).then(callback);
    }
    //{"retCode":"0","data":[{"chargeMoney":30,"salemoney":29.8},{"chargeMoney":50,"salemoney":49.8},{"chargeMoney":100,"salemoney":99.8},{"chargeMoney":500,"salemoney":499.8}],"msg":"SUCCESS"}
    function getMoney(callback) {
      return Restangular.one('/aibizhall/recharge/showRecharMoney').get().then(callback);
    }
    function getAttribution(params, callback) {
      return Restangular.one('/aibizhall/recharge/attribution/'+params.cellNumber).get().then(callback);
    }
    function createOrder(params, callback) {
      return Restangular.all('/recharge/paycharge/order').post(params).then(callback);
    }
    function openQR(){
      //1004 启动二维码扫码
      console.log('打开二维码扫描');
      JSBridge.NativeCall('RQCODE','delQRCodeWork',{},function(res){
          //alert(res);
      });
    }
    function openCash(params){
      console.log('打开现金接口', params);
      JSBridge.NativeCall('CashPayment','cashPayment',{
        orderId: params.orderId,//订单号
        phoneNumber: params.phoneNumber,//手机号码
        totalAmount: params.totalAmount//总金额
      },function(res){
          //返回totalAmount，payAmount，unpaidAmount
      });
    }

  }

})();
