/**
 * 选择号码controller 申佳
 */
(function () {
  'use strict';

  angular.module('zhyyt.openAccountControllers')
    .controller('orderAcceptedCtrl', function ($scope, $rootScope, $state, $filter, orderAcceptedServicer, deviceServicer, commonService, openAccountService) {
      $rootScope.headerTitle = '业务受理单'; //头部显示名字

      var userIDCard = commonService.getIDCardInfo();

      $scope.basicInfo = {
        phone: openAccountService.openAccountInfo.number,
        name: userIDCard.name,
        id: userIDCard.id,
      };

      //客户资料 手机号，身份证信息

      //业务受理内容 受理日期，受理网点，订单号，产品类型，业务类型，
      $scope.orderInfo = {
        orderDate: $filter('date')(new Date(),'yyyy年MM月dd日'),//受理日期
        packageType: openAccountService.openAccountInfo.packageType,
        oneRank: openAccountService.openAccountInfo.oneRank,
        numberFare: openAccountService.openAccountInfo.numberFare
      };
      //优惠费用，实收费用，支付方式，鉴权方式，付费模式，sim卡，4G主资费套餐，套餐说明
      $scope.showWrite = false;
      $scope.pngPath = '';

      //确认签名
      $scope.finishOrder = function () {
        // $state.go('zhyyt.invoiceShow');
        $scope.showWrite = true;
        $scope.shouxie();
      };

      //提交
      $scope.signSub = function () {
        $scope.showWrite = false;
        orderAcceptedServicer.signSub({
          netAccessProtocol: '入网协议1111',
          responsibilityLetter: '告知书22222',
          orderMessage: 'order8888888',
          userSignPicturePath: $scope.pngPath
        }, function (res) {
          // alert(res);
          $state.go('zhyyt.makingCard');
        });
      }

      //获取sim卡写卡数据
      $scope.getSimData = function () {
        orderAcceptedServicer.getSimData({
          billId: '123',
          sn: '7617829031sn',
          operCode: 'oc8888888'
        }, function (res) {
          console.log(res);
        });
      };
      // $scope.getSimData();

      //手写
      $scope.shouxie = function () {
        console.log('shouxie');
        deviceServicer.devWriteBoard(function (res) {
          
        });
      };

      //重签名
      $scope.reWrite = function () {
        deviceServicer.devClearWriteBoard({}, function (res) {
          var temp = JSON.parse(res);
          if(temp.retCode !== '200'){
            
          }
        });
      };
      //关闭手写板
      $scope.cancelWrite = function () {
        deviceServicer.devCancelWriteBoard(function (res) {});
        $scope.showWrite = false;
      };
      //完成
      $scope.finishWrite = function () {
        // alert('点击完成手写板，应返回签名图片路径');
        deviceServicer.devFinishWriteBoard(function (res) {
          var temp = JSON.parse(res);
          if(temp.retCode === '200'){
            // alert(temp.data.pngPath);
            $scope.pngPath = temp.data.pngPath;
            $scope.signSub();
          }
        });
      };

    });
}) ();