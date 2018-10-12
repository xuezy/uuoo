(function () {
  
  'use strict';
  angular.module('zhyyt')
    .run(function (CORE_VALUE, $rootScope, $state) {
      //二维码qrCode 银行卡data:{}
      window.resultFun = undefined;//JSBridge回调
      // CORE_VALUE.USERINFO = angular.fromJson(window.localStorage.user);//用户信息
      // CORE_VALUE.isAdmin = angular.fromJson(window.localStorage.isAdmin);//管理员信息
      // CORE_VALUE.PROJECTINFO = angular.fromJson(window.localStorage.projectInfo);//项目信息
      // CORE_VALUE.BOARDINFO = angular.fromJson(window.localStorage.boardInfo);//看板信息
      // $rootScope.$on('$stateChangeStart', function(event, state, params) {
      //  console.log('这里是rootScope的stateChangestart')
      //   if((!angular.fromJson(window.localStorage.user)) && state.url !== "/login") {
      //     event.preventDefault();
      //     $state.go('login');
      //   }
      // });
    });

})();
