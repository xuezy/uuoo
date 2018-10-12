(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name zhyyt.service:swipingCardService
   * @description
   * # swipingCardService 充值service
   * Service of the zhyyt
   */
  angular.module('zhyyt.swipingCard')
    .factory('swipingCardService', swipingCardService);

  function swipingCardService(Restangular, $http) {
    return {
      getSomething: getSomething
    };

    function getSomething(params, callback) {
      Restangular.all('/recharge/checkCations').post(params).then(function (res) {

      });
    }

  }

})();
