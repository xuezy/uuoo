(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name zhyyt.service:fillInEmailService
   * @description
   * # fillInEmailService 填写邮箱service
   * Service of the zhyyt
   */
  angular.module('zhyyt.fillInEmail')
    .factory('fillInEmailService', fillInEmailService);

  function fillInEmailService(Restangular, $http) {
    return {
      confirm: confirm,
      sendEmail: sendEmail,
      openAccountEmail: openAccountEmail,
      pacEmail:pacEmail//业务办理
    };

    function openAccountEmail(email,params, callback) {
      Restangular.all('/aibizhall/userAccess/sendMail/'+email).post(params).then(callback);
    }
    function confirm(params, callback) {
      Restangular.all('/AIBizHall/rest/repair/confirm').post(params).then(callback);
    }

    function sendEmail(params, callback) {
      Restangular.all('/aibizhall/recharge/sendEmail').post(params).then(callback);
    }

    function pacEmail(params, callback) {
      Restangular.all('/AIBizHall/rest/bizs/sendEmail').post(params).then(callback);
    }

  }

})();
