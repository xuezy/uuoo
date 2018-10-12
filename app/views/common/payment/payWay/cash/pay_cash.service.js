(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name zhyyt.service:payCashService
   * @description
   * # payCashService 充值service
   * Service of the zhyyt
   */
  angular.module('zhyyt.payCash')
    .factory('payCashService', payCashService);

  function payCashService(Restangular, $http) {
    return {
      sendCashResult: sendCashResult,
      sendCashCharge: sendCashCharge
    };

    function sendCashResult(params, callback) {
      Restangular.all('upay/posandcash').post(params).then(callback);
    }

    function sendCashCharge(params, callback) {
      Restangular.all('upay/paycharge').post(params).then(callback);
    }

  }

})();
