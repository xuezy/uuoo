(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name zhyyt.service:chargeSuccessService
   * @description
   * # chargeSuccessService 充值缴费 支付成功service
   * Service of the zhyyt
   */
  angular.module('zhyyt.chargeSuccess')
    .factory('chargeSuccessService', chargeSuccessService);

  function chargeSuccessService(Restangular, $http) {
    return {
      ticket: ticket
    };

    function ticket(params, callback) {
      Restangular.all('/aibizhall/recharge/ticket').post(params).then(callback);
    }

  }

})();
