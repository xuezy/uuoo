(function() {
  var replaceCard = angular.module('zhyyt.replaceCardModule', [
    'zhyyt.selectCardBusi',
    'zhyyt.costConfirm',
    'zhyyt.callRecord'
  ]);
  replaceCard.factory('costConfirmServer', costConfirm)
    .factory('repairCard', repairCard)
    .factory('rcOrderAcceptedServicer', rcOrderAcceptedServicer)//业务受理单
    .factory('changeCardServer', changeCardServer); //补换卡
  function costConfirm(Restangular) {
    return {
      bizcheck: bizcheck//查询业务受理单
    }

    function bizcheck(param, callback) {
      return Restangular.all('aibizhall/repair/bizcheck').post(param).then(callback);
    }
  }

  function repairCard(Restangular){
    return{
      checkServiceCode: checkServiceCode,
      checkCallRecord: checkCallRecord
    }

    function checkServiceCode(param, callback){
      return Restangular.one('aibizhall/repair/checkServiceCode').get(param).then(callback);
    }

    function checkCallRecord(param, callback){
      return Restangular.one('aibizhall/repair/checkCallRecord').get(param).then(callback);
    }
  }

  function rcOrderAcceptedServicer(Restangular) {
    return {
      signSub: signSub, //签名提交
      getSimData: getSimData, //获取sim卡写卡数据 
      confirm:confirm, //查询业务受理单 
    };

    function signSub(params, callback) {
      Restangular.all('/aibizhall/userAccess/signatureSub').post(params).then(callback);
    }

    function getSimData(params, callback) {
      Restangular.all('/aibizhall/userAccess/getSimData').post(params).then(callback);
    }

    function confirm(params, callback){              
      Restangular.one('/aibizhall/repair/order/confirm').get(params).then(callback);
    }
  }

  
  function changeCardServer(Restangular) {
    return {
      checkMsgCode: checkMsgCode, //短信验证
      sendMsgCode: sendMsgCode, //发送短信验证码
    };

    function checkMsgCode(params, callback) {
      Restangular.one('/aibizhall/repair/checkMsgCode').get(params).then(callback);
    }

    function sendMsgCode(params, callback) {
      Restangular.one('/aibizhall/repair/sendMsgCode').get(params).then(callback);
    }
  }
})();