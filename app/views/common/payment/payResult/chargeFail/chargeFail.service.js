(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name zhyyt.service:chargeFailService
   * @description
   * # chargeFailService 充值缴费 支付失败service
   * Service of the zhyyt
   */
  angular.module('zhyyt.chargeFail')
    .factory('chargeFailService', chargeFailService);

  function chargeFailService(Restangular, $http) {
    return {
      query: query
    };
    //查询支付状态
    function query(params, callback) {
      Restangular.all('upay/query').post(params).then(callback);
    }
  }

})();
