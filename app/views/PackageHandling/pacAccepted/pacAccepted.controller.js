/**
 * 选择号码controller 
 */
(function() {
  'use strict';

  angular.module('zhyyt.pacAccepted',[])
    .controller('pacAcceptedCtrl', function($scope, $rootScope, $state, deviceServicer, commonService, pacAcceptedService) {
      $rootScope.headerTitle = '业务受理单'; //头部显示名字

       $scope.product = angular.fromJson(localStorage.getItem("data"))[0];
       $scope.userInfo = angular.fromJson(localStorage.getItem("userInfo"));

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

       //手写
       $scope.shouxie = function (params) {
        console.log('shouxie');
        deviceServicer.devWriteBoard(params,function (res) {
          
        });
      };

      //重签名
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
      //完成
      $scope.finishWrite = function () {
        deviceServicer.devFinishWriteBoard(function (res) {
          var temp = JSON.parse(res);
         // alert(temp.retCode);
          if(temp.retCode === '200'){
            $scope.pngPath = temp.data.pngPath;
            $scope.pngBase64 = temp.data.pngBase64;
            $scope.signName();
          };
        });
       //$scope.signName();
      };

      $scope.signName = function(){
        // pacAcceptedService.startSign();//掉安卓接口
        var params = {
         netAccessProtocol: '入网协议1111',
         responsibilityLetter: '告知书22222',
         orderMessage: 'order8888888',
        // userSignPicturePath: $scope.pngPath
         pngPath:$scope.pngPath,
         pngBase64:$scope.pngBase64
       };
         pacAcceptedService.signNameBF(params,function(res){  //后台接口
           if(res.retCode=='200'){
             $state.go('zhyyt.pacResultSucc');
           }else{
             $state.go('zhyyt.pacResultFail');
           }
         });
       };

      //获取设备返回结果
      // window.resultFun = function (str) {
      //   alert(str);
      //   var json = eval('(' + str + ')');
      //   document.getElementById("sign_div").innerHTML='< img src=data:image/png;base64,'+json.pngBase64+' height="100" width="100" /><br/>'+'<p>'+json.txtString+'</p >';
      //  var params = {
      //   'retCode':str.retCode,
      //   'pngPath':str.pngPath,
      //   'txtPath':str.txtPath,
      //   'txtString':str.txtString
      //  };
      //   pacAcceptedService.signNameBF(params,function(res){  //后台接口
      //     if(res.retCode=='200'){
      //       $state.go('zhyyt.pacResultSucc');
      //     }else{
      //       $state.go('zhyyt.pacResultFail');
      //     }
      //   });
      // }

      //客户资料 手机号，身份证信息

      //业务受理内容 受理日期，受理网点，订单号，产品类型，业务类型，
      //优惠费用，实收费用，支付方式，鉴权方式，付费模式，sim卡，4G主资费套餐，套餐说明

    });
})();