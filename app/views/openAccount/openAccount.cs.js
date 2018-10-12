(function () {
  'use strict';

  /**
   * 开户入网service controller
   */
  angular.module('zhyyt.openAccountControllers', [
    'zhyyt.readFace',
    'zhyyt.readIDCard'
  ]);
  angular.module('zhyyt.openAccountServices', [])
  .service('openAccountService', openAccountService)
  .factory('choicePackageServicer', choicePackageServicer)//选择套餐
  .factory('choiceNumServicer', choiceNumServicer)//选择号码
  .factory('setServicePwdServicer', setServicePwdServicer)//设置服务密码
  .factory('readConfirmServicer', readConfirmServicer)//阅读协议
  .factory('orderAcceptedServicer', orderAcceptedServicer)//业务受理单
  .factory('makingCardServicer', makingCardServicer);//写卡制卡

  function openAccountService() {
    this.openAccountInfo = {
      packageType: '',//套餐名
      packageDesc: '',//套餐描述
      postageDesc: '',//套餐最低起步价
      oneRank: '',//用户选择的套餐价
      bid: '',
      money: '',
      number: '',//选择的手机号码
      numberFare: ''//选号开户入网费用
    }//选择的套餐信息
  }
  
  function choicePackageServicer(Restangular) {
    return{
      getPackageList: getPackageList//入网套餐查询 /aibizhall/userAccess/netPackageQuery
    }
    function getPackageList(params, callback){
      Restangular.one('/aibizhall/userAccess/netPackageQuery/'+params.id).get().then(callback);
    }
  }

  function choiceNumServicer(Restangular) {
    return{
      getNumberList: getNumberList,//可选号码查询 /aibizhall/userAccess/avaibleNum
      phoneNumCop: phoneNumCop//号码预占 /aibizhall/userAccess/phoneNumCop
    }
    function getNumberList(params, callback){              //业务id    //查询关键字
      Restangular.one('/aibizhall/userAccess/avaibleNum/'+ params.id + '/' +params.phoneNumber).get().then(callback);
    }
    function phoneNumCop(params, callback){
      Restangular.one('/aibizhall/userAccess/phoneNumCop/'+params.id+'/'+params.phone).get(params).then(callback);
    }
  }

  function setServicePwdServicer(Restangular) {
    return{
      setServicePwd: setServicePwd,//设置服务密码 /aibizhall/userAccess/setPassword
    }
    function setServicePwd(params, callback){
      Restangular.all('/aibizhall/userAccess/setPassword').post(params).then(callback);
    }
  }

  function readConfirmServicer(Restangular) {
    return{
      sendOrder: sendOrder,//生成订单 /aibizhall/userAccess/orderDown
      getProtocol: getProtocol,//获取入网协议 /aibizhall/userAccess/netProtocol
      getNoteProtocol: getNoteProtocol,//获取告知书 /aibizhall/userAccess/noteProtocol
      preSub: preSub//预购单
    }
    function sendOrder(params, callback){
      Restangular.all('/aibizhall/orderDown').post(params).then(callback);
    }
    function getProtocol(callback){
      Restangular.one('/aibizhall/userAccess/netProtocol').get().then(callback);
    }
    function getNoteProtocol(callback){
      Restangular.one('/aibizhall/userAccess/noteProtocol').get().then(callback);
    }
    function preSub(params, callback){
      Restangular.all('/aibizhall/userAccess/preSub').post(params).then(callback);
    }
    
  }

  function orderAcceptedServicer(Restangular) {
    return{
      signSub: signSub//签名提交
    };
    function signSub(params, callback) {
      Restangular.all('/aibizhall/userAccess/signatureSub').post(params).then(callback);
    }
  }

  function makingCardServicer(Restangular) {
    return{
      getSimData: getSimData,//获取sim卡写卡数据 1
      activeSim: activeSim,//激活sim卡数据 2
    };
    function getSimData(params, callback) {
      Restangular.all('/aibizhall/userAccess/getSimData').post(params).then(callback);
    }
    function activeSim(params, callback) {
      Restangular.all('/aibizhall/userAccess/activationSim').post(params).then(callback);
    }
  }
 

})();
