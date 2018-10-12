(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name zhyyt.service:barcodeService
   * @description
   * # barcodeService 扫码支付service
   * Service of the zhyyt
   */
  angular.module('zhyyt.barcode')
    .factory('barcodeService', barcodeService);

  function barcodeService(Restangular, $http) {
    return {
      pay: pay,
      query:query,
      paycharge:paycharge
    };
    //支付前端到SDK[条码]
    function pay(params, callback) {
      Restangular.all('upay/pay').post(params).then(callback);
    }
    //支付充值前端到SDK[条码、纯赠送]
    function paycharge(params, callback) {
      Restangular.all('upay/paycharge').post(params).then(callback);
    }
    //查询支付状态
    function query(params, callback) {
      Restangular.all('upay/query').post(params).then(callback);
    }

  }

})();
