(function () {
    'use strict';
  

    angular.module('zhyyt.pachandinglist')
      .factory('pachandinglistService', pachandinglistService);
  
    function pachandinglistService(Restangular, $http) {
      return {
        productslist: productslist,
        handlePlan:handlePlan
      };
      //可办业务详情
      function productslist(params, callback) {
        Restangular.all('/AIBizHall/rest/bizs/queryProducts').post(params).then(callback);
      }
      //套餐办理
      function handlePlan(params, callback) {
        Restangular.all('/AIBizHall/rest/bizs/handlePlan').post(params).then(callback);
      }
    }
  
  })();
  