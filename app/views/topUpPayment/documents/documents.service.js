(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name zhyyt.service:documentsService
   * @description
   * # documentsService 充值单据service
   * Service of the zhyyt
   */
  angular.module('zhyyt.documents')
    .factory('documentsService', documentsService);

  function documentsService(Restangular, $http) {
    return {
      print: print
    };

    function print(params, callback) {
      Restangular.all('/AIBizHall/rest/repair/confirm').post(params).then(function (res) {

      });
    }

  }

})();
