(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name zhyyt.service:loginService
   * @description
   * # loginService 登录service
   * Service of the zhyyt
   */
  angular.module('zhyyt.login')
    .factory('loginService', loginService)
    //获取input焦点
    .factory('focus', function ($timeout, $window) {
      return function (id) {
        $timeout(function () {
          var element = $window.document.getElementById(id);
          if (element)
            element.focus();
        });
      };
    })
    //存储数据
    .factory('loginStor', ['$window', function ($window) {
      return { //存储单个属性
        set: function (key, value) {
          $window.localStorage[key] = value;
        }, //读取单个属性
        get: function (key, value) {
          return $window.localStorage[key] || value;
        }
      }
    }]);


  function loginService(Restangular) {
    return {
      getidCard: getidCard,
      getSendCode: getSendCode
    };

    //登录
    function getidCard(params, callback) {
      return Restangular.all('/aibizhall/login').post(params).then(callback);
    }

    // function getidCard(params, callback) {
    //   return Restangular.all('/zhyyt/aibizhall/login').post(params).then(callback);
    // }

    //短信密码-发送验证码
    function getSendCode(params, callback) {
      return Restangular.one('/aibizhall/getSmsCode').get(params).then(callback);
    }

    // function getSendCode(params, callback) {
    //   return Restangular.one('/zhyyt/aibizhall/getSmsCode').get(params).then(callback);
    // }


  }
})();
