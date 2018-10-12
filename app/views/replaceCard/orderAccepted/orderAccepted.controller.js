/**
 * 业务受理单controller 花桐
 */
(function() {
  'use strict';

  angular.module('zhyyt.rcOrderAccepted', [])
    .controller('rcOrderAcceptedCtrl', function($scope, $rootScope, $state, rcOrderAcceptedServicer, commonService, choiceNumServicer, openAccountService, deviceServicer) {
      $rootScope.headerTitle = '业务受理单'; //头部显示名字
      var userIDCard = commonService.getIDCardInfo();
      $scope.orderInfo = commonService.getState();
      $scope.basicInfo = {
        phone: openAccountService.openAccountInfo.number,
        name: userIDCard.name,
        id: userIDCard.id,
      };
      var state = commonService.getState();
      //页面初始化查询数据
      $scope.init = function() {
        rcOrderAcceptedServicer.confirm({
          phone: state.IDValue,
          bizCode: 'abc',//业务编码
          identityType: '0',//身份验证类型
          identityNum: userIDCard.id||'231232131231233231',//验证号码
          orderId: state.orderNo||'12121212121212121212121'//订单号
        }, function(res) {
          if (res.retCode === '200') {
            $scope.repairOrder = res.data.repairOrder;
            $scope.user = res.data.user;
          }
        });
      };

      //客户资料 手机号，身份证信息

      //业务受理内容 受理日期，受理网点，订单号，产品类型，业务类型，
      //优惠费用，实收费用，支付方式，鉴权方式，付费模式，sim卡，4G主资费套餐，套餐说明
      $scope.showWrite = false;
      $scope.pngPath = '';

      //确认签名
      $scope.finishOrder = function () {
        // $state.go('zhyyt.invoiceShow');
        $scope.showWrite = true;
        //计算弹框位置
        var browserX = $(document).width();
        var browserY = $(document).height();
        var params = {
          startX : browserX/2 - 250,
          endX   : browserX/2 + 250,
          startY : browserY/2 - 160 + 82,
          endY   : browserY/2 + 160 - 108
        }

        $scope.shouxie(params);
      };

      //提交
      $scope.signSub = function() {
        rcOrderAcceptedServicer.signSub({
          netAccessProtocol: '入网协议1111',
          responsibilityLetter: '告知书22222',
          orderMessage: 'order8888888',
          userSignPicturePath: $scope.pngPath
        }, function(res) {
          deviceServicer.devCancelWriteBoard(function (res) {});
          $state.go('zhyyt.makingCard');
        });
      }

      //获取sim卡写卡数据
      $scope.getSimData = function() {
        rcOrderAcceptedServicer.getSimData({
          billId: '123',
          sn: '7617829031sn',
          operCode: 'oc8888888'
        }, function(res) {
          console.log(res);
        });
      };
      // $scope.getSimData();
      $scope.reWrite = function () {
        deviceServicer.devClearWriteBoard({}, function (res) {
          var temp = JSON.parse(res);
          if(temp.retCode !== '200'){
            alert(temp.data);
          }
        });
      };
      //关闭手写板
      $scope.cancelWrite = function () {
        deviceServicer.devCancelWriteBoard(function (res) {});
        $scope.showWrite = false;
      };
      //手写
      $scope.shouxie = function(params) {
        deviceServicer.devWriteBoard(params,function (res) {
          
        });
      };

    });
})();