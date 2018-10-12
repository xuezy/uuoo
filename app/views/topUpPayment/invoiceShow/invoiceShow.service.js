(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name zhyyt.service:invoiceShowService
   * @description
   * # invoiceShowService 发票预览service
   * Service of the zhyyt
   */
  angular.module('zhyyt.invoiceShow')
    .factory('invoiceShowService', invoiceShowService);

  function invoiceShowService(Restangular, $http) {
    return {
      confirm: confirm
    };

    function confirm(params, callback) {
      Restangular.all('/AIBizHall/rest/repair/confirm').post(params).then(function (res) {

      });
    }

  }

})();
