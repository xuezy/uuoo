(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name zhyyt.service:pacEmailService
   * @description
   * # fillInEmailService 填写邮箱service
   * Service of the zhyyt
   */
  angular.module('zhyyt.pacEmail')
    .factory('pacEmailService', pacEmailService);

  function pacEmailService(Restangular, $http) {
    return {
    //  confirm: confirm,
      sendEmail: sendEmail,
     // openAccountEmail: openAccountEmail
    };

    // function openAccountEmail(email,params, callback) {
    //   Restangular.all('/aibizhall/userAccess/sendMail/'+email).post(params).then(callback);
    // }
    // function confirm(params, callback) {
    //   Restangular.all('/AIBizHall/rest/repair/confirm').post(params).then(callback);
    // }

    function sendEmail(params, callback) {
      Restangular.all('/AIBizHall/rest/bizs/sendEmail').post(params).then(callback);
    }

  }

})();
