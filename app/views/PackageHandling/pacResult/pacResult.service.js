(function () {
    'use strict';
  

    angular.module('zhyyt.pacResult')
      .factory('pacResultService', pacResultService);
  
    function pacResultService(Restangular, $http) {
      return {
        sendmail: sendmail
      };
  
      function sendmail(params,callback) {
        Restangular.all('/AIBizHall/rest/bizs/sendEmail').post(params).then(callback);
      }
    }
  
  })();
  