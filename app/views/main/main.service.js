(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name zhyyt.service:MainService
   * @description
   * # MainService 公用核心服务
   * Service of the zhyyt
   */
  angular.module('zhyyt.service', [
    'zhyyt.openAccountServices'//开户入网
    // 'zhyyt.openAccountServices',//充值缴费
    // 'zhyyt.openAccountServices',//登录
    // 'zhyyt.openAccountServices',//补换卡
  ])
    /**
     * PROJECTINFO:项目信息
     * {
     *   APPINFO: object, //应用信息
     *   FLOWINFO: object, //流水信息
     *   FLOWID: string //流水id
     * }
     */
    .value('CORE_VALUE', {
      USERINFO: {},
      PROJECTINFO: {
        APPINFO: { appName: '全部', id: '0', operType: '' },//初始化应用的信息
        FLOWINFO: {},
        FLOWID: '',
        flowRecordId: ''//流水记录id
      },
      // svnUrlPrefix: '/paas/cicd/',//备用
      pageUrlPrefix: '',//页面前缀 
    })
    // .factory('CORE_FN', CORE_FN);

  // function CORE_FN($location, toastr, CORE_VALUE, $http) {
  //   return {
  //     resMessage: resMessage
  //   };

    
    // function resMessage(resultCode, resultMessage) {
    //   var tempCode = resultCode + '';
    //   if (tempCode === '200') {
    //     toastr.success(resultMessage);
    //   } else if (tempCode.slice(0, 7) === 'PAAS-00') {

    //   } else if (tempCode) {//错误信息多展示5秒
    //     if (resultMessage === undefined) {
    //       toastr.warning(tempCode);
    //     } else {
    //       toastr.error(resultCode + ' ' + resultMessage, {
    //         closeButton: true,
    //         progressBar: true,
    //         timeOut: 5000,
    //         extendedTimeOut: 8000
    //       });
    //     }
    //   } else if (resultCode === undefined && resultMessage === undefined) {
    //     toastr.error('系统异常');
    //   }
    // }

  // }

})();
