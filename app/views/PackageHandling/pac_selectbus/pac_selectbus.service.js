(function () {
    'use strict';
  

    angular.module('zhyyt.pachanding')
      .factory('pachandingService', pachandingService);
  
    function pachandingService(Restangular, $http) {
      return {
        getPachanding: getPachanding
      };
  
      function getPachanding(callback) {
        Restangular.all('/AIBizHall/rest/queryBizs').post().then(callback);
      }
  
    }
  
  })();
  