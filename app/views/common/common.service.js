/**
 * 公共service
 * 保存公共页面数据
 */
(function () {

  'use strict';
  angular.module('zhyyt')
    .factory('commonService', ['$filter', commonService])
    .factory('deviceServicer', deviceServicer)
    .factory('deviceVoiceServicer', deviceVoiceServicer)
    .factory('faceAndCardCheckServer', faceAndCardCheckServer)
    .factory('barcodeService', barcodeService);

  function commonService($filter) {
    var _state = {}; //支付订单信息
    var _idcardInfo = {}; //身份证信息

    return {
      getState: getState,
      setState: setState,
      getIDCardInfo: getIDCardInfo,
      setIDCardInfo: setIDCardInfo,
      getOrderNo: getOrderNo,
      urlFix: '/zhyyt_front' //服务器用  本地需要去掉 /zhyyt_front
    };

    function getState() {
      return _state;
    }

    function setState(info) {
      for (var o in info) {
        if (info.hasOwnProperty(o)) {
          _state[o] = info[o]
        }
      }
    }

    function getIDCardInfo() {
      return _idcardInfo;
    }

    function setIDCardInfo(info) {
      for (var o in info) {
        if (info.hasOwnProperty(o)) {
          _idcardInfo[o] = info[o]
        }
      }
    }

    function getOrderNo() {
      var random = '';
      var orderNoHead = '0089';
      var now = new Date();
      var milliseconds = now.getMilliseconds() + '';
      while (milliseconds.length < 3) {
        milliseconds = '0' + milliseconds;
      }
      for (var i = 0; i < 11; i++) {
        random += Math.floor(Math.random() * 10);
      }
      return orderNoHead + $filter('date')(now, 'yyyyMMddHHmmss') + milliseconds + random;
    }
  }

  function deviceServicer() {
    return {
      devScanQRcode: devScanQRcode, //扫用户手机支付码
      devCashPay: devCashPay, //现金支付接口
      //银行卡接口
      devReadIDCard: devReadIDCard,//身份证
      devReadFace: devReadFace,//人脸
      devWriteBoard: devWriteBoard,//手写板签名
      devCancelWriteBoard: devCancelWriteBoard,//取消签名
      devClearWriteBoard: devClearWriteBoard,//重签
      devFinishWriteBoard: devFinishWriteBoard,//签名完成
      devMakeCard: devMakeCard,//让机器制作SIM卡
      devPrintInvoice: devPrintInvoice,//打印
      //。。。
    };

    function devScanQRcode(params, callback) {
      var devParams = params || {};
      window.resultFun = callback; //设备回调
      //调用设备的全局对象    key       方法            传参
      JSBridge.NativeCall('RQCODE', 'delQRCodeWork', devParams, function (res) { });
    }

    function devCashPay(params, callback) {
      var devParams = params || {
        // orderId: '',//订单号
        // phoneNumber: '',//手机号码
        // totalAmount: ''//总金额
      }; //调用现金接口必传参数
      window.resultFun = callback; //设备回调 //返回参数: data:{totalAmount，payAmount，unpaidAmount}
      JSBridge.NativeCall('CashPayment', 'cashPayment', devParams, function (res) { });
    }

    function devReadIDCard(callback) {
      window.resultFun = callback; //设备回调
      JSBridge.NativeCall('IdCard', 'readIdCard', {}, function (res) { });
    }
    function devReadFace(params, callback) {
      window.resultFun = callback;//设备回调
      JSBridge.NativeCall('BCAMERA', 'getFaceDetectAndCompare', { 'phone': params.phone, 'idCardPicPath': params.idCardPicPath }, callback);
    }

    function devWriteBoard(params, callback) {//手写板签名
      var devParams = params || {};
      window.resultFun = callback;
      JSBridge.NativeCall('Signature', 'getSignature', {
        "Time": "30",
        // "startX": params.startX,
        // "endX": params.endX,
        // "startY": params.startY,
        // "endY": params.endY
        "startX": "380",
        "endX": "940",
        "startY": "280",
        "endY": "390"
      }, function (res) { });
    }

    function devCancelWriteBoard(callback) { //取消签名
      window.resultFun = callback;
      JSBridge.NativeCall('Signature', 'cancelSignature', {}, function (res) { });
    }

    function devClearWriteBoard(params, callback) { //重签
      var devParams = params || {};
      window.resultFun = callback;
      JSBridge.NativeCall('Signature', 'clearSign', {}, function (res) { });
    }

    function devFinishWriteBoard(callback) { //签名完成
      window.resultFun = callback;
      JSBridge.NativeCall('Signature', 'confirmSign', {}, function (res) { });
    }

    function devMakeCard(params, callback) {
      var devParams = params || {};
      window.resultFun = callback; //设备回调
      JSBridge.NativeCall('SimCard', 'moveCardPlace', devParams, function (res) { });
    }

    function devPrintInvoice(params, callback) {
      var devParams = params || {};
      window.resultFun = callback; //设备回调
      JSBridge.NativeCall('Print', 'PrintInvoice', devParams, function (res) { });
    }
  }

  function deviceVoiceServicer() {
    return {
      devVoiceRecharge: devVoiceRecharge
    }
    function devVoiceRecharge(params, callback) {//语音
      var devParams = params || {};
      window.voiceResultFun = callback;
      JSBridge.NativeCall('Voice', 'sendCmd', { main: 107, sub: 0, speak:'欢迎进入充值页面，请连续报出十一位手机号码'}, function (res) { });
      // JSBridge.NativeCall('Voice', 'testResults', { main: 107, sub: 0, phone: 15013669204, money: 100 }, function (res) { });
    }
  }

  function faceAndCardCheckServer(Restangular) {

    return {
      humConsensus: humConsensus,//认证一致，之前的url应该要改成设备接口
      netAccess: netAccess,//入网资格校验
      checkCations: checkCations,
      openIDCard: openIDCard,
      bizcheck: bizcheck
    };

    function humConsensus(params, callback) {
      var devParams = params || {};
      window.resultFun = callback; //设备回调
      JSBridge.NativeCall('BCAMERA', 'getFaceDetectAndCompare', devParams, function (res) { });
    }

    function netAccess(params, callback) {
      return Restangular.all('/aibizhall/userAccess/netAccess').post(params).then(callback);
    }

    function checkCations(params, callback) {
      return Restangular.all('/aibizhall/recharge/checkCations').post(params).then(callback);
    }

    function openIDCard(callback) {
      window.resultFun = callback; //设备回调
      JSBridge.NativeCall('IdCard', 'readIdCard', {}, callback);
    }

    function bizcheck(param, callback) {
      return Restangular.all('aibizhall/repair/bizcheck').post(param).then(callback);
    }
  }

  function barcodeService(Restangular, $http) {
    return {
      pay: pay,
      query: query,
      paycharge: paycharge
    };
    //支付前端到SDK[条码]
    function pay(params, callback) {
      Restangular.all('upay/pay').post(params).then(callback);
    }
    //支付充值前端到SDK[条码、纯赠送]
    function paycharge(params, callback) {
      Restangular.all('upay/paycharge').post(params).then(callback);
    }
    //查询支付状态
    function query(params, callback) {
      Restangular.all('upay/query').post(params).then(callback);
    }

  }

})();