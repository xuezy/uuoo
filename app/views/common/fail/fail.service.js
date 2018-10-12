(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name zhyyt.service:failService
   * @description
   * # failService 充值缴费 支付成功service
   * Service of the zhyyt
   */
  angular.module('zhyyt.fail')
    .factory('failService', failService);

  function failService(Restangular, $http) {
    return {
      query: query
    };

    //查询支付状态
    function query(params, callback) {
      Restangular.all('upay/query').post(params).then(callback);
    }

  }

})();