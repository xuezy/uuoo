'use strict';

/**
 * @ngdoc overview
 * @name zhyyt
 * @description
 * # zhyyt
 * Main module of the application.
 */
angular
  .module('zhyyt', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'restangular',
    'ngRoute',
    // 'angularTips',
    'zhyyt.controllers',
    'zhyyt.service',
    // 'zhyyt.directive'
  ])
  .config(function ($stateProvider, $urlRouterProvider, RestangularProvider, $compileProvider) {
    // RestangularProvider.setBaseUrl('http://192.168.253.127:8080');
    RestangularProvider.setBaseUrl('http://192.168.121.16:39825');
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data):/);
    $urlRouterProvider.otherwise('/home');
    $stateProvider
      //主页面
      .state('zhyyt', {
        url: '/zhyyt',
        templateUrl: 'views/main/main.html',
        controller: 'mainController'
      })
      .state('zhyyt.login', {
        url: '/login',
        templateUrl: 'views/login/login.html',
        controller: 'loginController'
      })
      //home
      .state('home', {
        url: '/home',
        templateUrl: 'views/home/home.html',
        controller: 'homeCtrl'
      })
      //  充值缴费模块 ============== start
      //充值
      .state('zhyyt.recharge', {
        url: '/recharge',
        templateUrl: 'views/topUpPayment/recharge/recharge.html',
        controller: 'rechargeController'
      })
      //充值单据
      .state('zhyyt.documents', {
        url: '/documents',
        templateUrl: 'views/topUpPayment/documents/documents.html',
        controller: 'documentsController'
      })
      //充值单据
      .state('zhyyt.invoiceShow', {
        url: '/invoiceShow',
        templateUrl: 'views/topUpPayment/invoiceShow/invoiceShow.html',
        controller: 'invoiceShowController'
      })
      
      //  充值缴费模块 ============== end

      //  用户入网 ============== start
      .state('zhyyt.choicePackage', {//选择套餐
        url: '/choicePackage',
        templateUrl: 'views/openAccount/choicePackage/choicePackage.html',
        controller: 'choicePackageCtrl'
      })
      .state('zhyyt.choiceNum', {//选择号码
        url: '/choiceNum',
        templateUrl: 'views/openAccount/choiceNum/choiceNum.html',
        controller: 'choiceNumCtrl'
      })
      .state('zhyyt.setServicePwd', {//设置服务密码
        url: '/setServicePwd',
        templateUrl: 'views/openAccount/setServicePwd/setServicePwd.html',
        controller: 'setServicePwdCtrl'
      })
      .state('zhyyt.readConfirm', {//信息确认+协议阅读
        url: '/readConfirm',
        templateUrl: 'views/openAccount/readConfirm/readConfirm.html',
        controller: 'readConfirmCtrl'
      })
      .state('zhyyt.openAccountOrderAccepted', {//业务受理单
        url: '/openAccountOrderAccepted',
        templateUrl: 'views/openAccount/orderAccepted/orderAccepted.html',
        controller: 'orderAcceptedCtrl'
      })
      // .state('zhyyt.sendEmail', {//
      //   url: '/sendEmail',
      //   templateUrl: 'views/openAccount/sendEmail/sendEmail.html',
      //   controller: 'sendEmailCtrl'
      // })
      //  用户入网 ============== end

      //  补换卡 ============== start
      //取卡
      .state('zhyyt.selectCardBusi', {
        url: '/selectCardBusi',
        templateUrl: 'views/replaceCard/selectCardBusi/selectCardBusi.html',
        controller: 'selectCardBusiCtrl'
      })
       .state('zhyyt.takeCard', {
        url: '/takeCard',
        templateUrl: 'views/replaceCard/takeCard/takeCard.html',
        controller: 'takeCardController'
      })
       
       .state('zhyyt.rcOrderAccepted', {//业务受理单
        url: '/rcOrderAccepted',
        templateUrl: 'views/replaceCard/orderAccepted/orderAccepted.html',
        controller: 'rcOrderAcceptedCtrl'
      })
       .state('zhyyt.changeCard', {//换卡
        url: '/changeCard',
        templateUrl: 'views/replaceCard/changeCard/changeCard.html',
        controller: 'changeCardCtrl'
      })
       .state('zhyyt.authorize', {//授权
        url: '/authorize',
        templateUrl: 'views/replaceCard/authorize/authorize.html',
        controller: 'authorizeCtrl'
      })
       .state('zhyyt.verification', {//验证方式
        url: '/verification',
        templateUrl: 'views/replaceCard/verification/verification.html',
        controller: 'verificationCtrl'
      })
      .state('zhyyt.servicePass', {//服务密码
        url: '/servicePass',
        templateUrl: 'views/replaceCard/servicePass/servicePass.html',
        controller: 'servicePassCtrl'
      })
       .state('zhyyt.costConfirm', {
        url: '/costConfirm',
        templateUrl: 'views/replaceCard/costConfirm/costConfirm.html',
        controller: 'costConfirmCtrl'
      })
      .state('zhyyt.callRecord', {
        url: '/callRecord',
        templateUrl: 'views/replaceCard/callRecord/callRecord.html',
        controller: 'callRecordCtrl'
      })
      //  补换卡 ============== end

      //  套餐办理 ============== start
      .state('zhyyt.pachanding', {
        url: '/pachanding',
        templateUrl: 'views/PackageHandling/pac_selectbus/pac_selectbus.html',
        controller: 'selectbusCtrl'
      })

      // 套餐列表
      .state('zhyyt.pachandinglist', {
        url: '/pachandinglist',
        templateUrl: 'views/PackageHandling/pac_list/pac_list.html',
        controller: 'listCtrl'
      })

      .state('zhyyt.pacAccepted', {//业务受理单
        url: '/pacAccepted',
        templateUrl: 'views/PackageHandling/pacAccepted/pacAccepted.html',
        controller: 'pacAcceptedCtrl'
      })

      .state('zhyyt.pacResultSucc', {//结果页-成功
        url: '/pacResultSucc',
        templateUrl: 'views/PackageHandling/pacResult/pacResultSucc.html',
        controller: 'pacResultController'
      })

      .state('zhyyt.pacResultFail', {//结果页-失败
        url: '/pacResultFail',
        templateUrl: 'views/PackageHandling/pacResult/pacResultFail.html',
        controller: 'pacResultController'
      })

      .state('zhyyt.pacEmail', {
        url: '/pacEmail',
        templateUrl: 'views/PackageHandling/pacEmail/pacEmail.html',
        controller: 'pacEmailController'
      })
      //  套餐办理 ============== end

      //  公共页面 ============== start
      .state('zhyyt.readFace', {//人脸扫描
        url: '/readFace',
        templateUrl: 'views/common/readFace/readFace.html',
        controller: 'readFaceCtrl'
      })
      .state('zhyyt.payMian', {//支付方式
        url: '/payMian',
        templateUrl: 'views/common/payMian/pay_mian.html',
        controller: 'payMianController'
      })
      // .state('zhyyt.barcode', {//扫码支付
      //   url: '/barcode',
      //   templateUrl: 'views/common/barcode/pay_barcode.html',
      //   controller: 'barcodeController'
      // })
      .state('zhyyt.alipay', {//支付宝支付
        url: '/alipay',
        templateUrl: 'views/common/payment/payWay/alipay/alipay.html',
        controller: 'alipayController'
      })
      .state('zhyyt.cmpay', {//和包支付
        url: '/cmpay',
        templateUrl: 'views/common/payment/payWay/cmpay/cmpay.html',
        controller: 'cmpayController'
      })
      .state('zhyyt.unionpay', {//云闪付
        url: '/unionpay',
        templateUrl: 'views/common/payment/payWay/unionpay/unionpay.html',
        controller: 'unionpayController'
      })
      .state('zhyyt.weixin', {//微信支付
        url: '/weixin',
        templateUrl: 'views/common/payment/payWay/weixin/weixin.html',
        controller: 'weixinController'
      })
      .state('zhyyt.timeout', {//支付超时
        url: '/timeout',
        templateUrl: 'views/common/payment/payResult/timeout/pay_timeout.html',
        controller: 'timeoutController'
      })
      .state('zhyyt.fail', { //支付失败
        url: '/fail',
        templateUrl: 'views/common/fail/pay_fail.html',
        controller: 'failController'
      })
      .state('zhyyt.chargeSuccess', { //支付成功
        url: '/chargeSuccess',
        templateUrl: 'views/common/payment/payResult/chargeSuccess/pay_charge_success.html',
        controller: 'chargeSuccessController'
      })
      .state('zhyyt.chargeFail', { //支付失败
        url: '/chargeFail',
        templateUrl: 'views/common/payment/payResult/chargeFail/pay_charge_fail.html',
        controller: 'chargeFailController'
      })
      .state('zhyyt.payCash', {   //现金支付
        url: '/payCash',
        params: {
          orderId: null,//订单号
          phoneNumber: null,//手机号码
          totalAmount: null//总金额
        },
        templateUrl: 'views/common/payment/payWay/cash/pay_cash.html',
        controller: 'payCashCtrl'
      })
      .state('zhyyt.swipingCard', { //刷卡支付
        url: '/swipingCard',
        templateUrl: 'views/common/payment/payWay/swipingCard/pay_swipingCard.html',
        controller: 'swipingCardCtrl'
      })
      .state('zhyyt.fillInEmail', {  //邮件发送
        url: '/fillInEmail',
        templateUrl: 'views/common/fillInEmail/fillInEmail.html',
        controller: 'fillInEmailController'
      })
      .state('zhyyt.result', {   //邮件发送结果
        url: '/result',
        templateUrl: 'views/common/result/result.html',
        controller: 'resultController'
      })
      .state('zhyyt.makingCard', {//正在制卡sim
        url: '/makingCard',
        templateUrl: 'views/common/makingCard/makingCard.html',
        controller: 'makingCardCtrl'
      })
      .state('zhyyt.readIDCard', {//读取身份证
        url: '/readIDCard',
        templateUrl: 'views/common/readIDCard/readIDCard.html',
        controller: 'readIDCardCtrl'
      })
    //  公共页面 ============== end

  });
