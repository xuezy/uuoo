(function () {
  'use strict';

  angular.module('zhyyt.readFace', [])
    .controller('readFaceCtrl', function ($scope, $rootScope, $state, $interval, commonService, deviceServicer, faceAndCardCheckServer) {
      var state = commonService.getState();
      var idCard = commonService.getIDCardInfo();
      $scope.leftSource = idCard.imageBase64;//身份证头像路径
      // alert($scope.leftSource);
      $scope.rightSource = '';//摄像头识别图像路径
      $scope.compareValue = 0;//对比相似度

      setTimeout(function () {
        // commonService.setState({
        //   faceBase64: faceBase64
        // });
        // var obj = commonService.getState();
        deviceServicer.devReadFace({ phone: '15013669204', idCardPicPath: idCard.head }, function (res) {
          // alert(JSON.stringify(res));
          var temp = JSON.parse(res);
          if (temp.retCode === '200') {
            if (temp.data.retCode === '0') {
              faceCompare(temp.data.data.imageBase64, temp.data.data.value);
            }
          }
        });
        //人证校验请求,可能需要修改
        // faceAndCardCheckServer.humConsensus({
        // 	idenPic: obj.faceBase64,
        // 	picNameR: obj.idCardBase64
        // }, function(res){
        //    if(res.data.isSame === '是'){
        //       //BusiIndex在homeCtrl定义
        //    	  orderInfo.BusiIndex === '01' && netAccess(res.data);
        //       orderInfo.BusiIndex === '06' && checkCations(res.data);
        //    }else{
        //    	 $state.go('zhyyt.readIDCard');
        //    }
        // });

      }, 1000)

      //识别成功后的跳转
      function goState() {
        console.log(state);
        switch (state.BusiIndex) {
          case '01': $state.go('zhyyt.setServicePwd'); break;
          case '06': checkCations(); break;
        }
      }
      /*补换卡业务办理资格校验*/
      function checkCations(data) {
        faceAndCardCheckServer.bizcheck({
          ServiceType: '01',
          ServiceNumber: '手机号码',
          CheckType: '1',
          CheckID: undefined
        }, function (res) {
          if (res.retCode === '200') {
            $scope.checkResult = 'success';
            commonService.setState({
              Payment: res.data.money || '2', //补换卡费用
              Frequency: res.data.Frequency || '1' //办理次数
            });
            $state.go('zhyyt.authorize')
          }
          if (res.retCode === '201') {
            $scope.checkResult = 'fail';
          }
        });
      }

      //人脸对比：
      function faceCompare(faceUrl, value) {
        var trueValue = value;
        if(value == 0){trueValue = 70;}
        $('#isOK').modal('show');
        $scope.rightSource = faceUrl;
        var tempI = $interval(function () {
          $scope.compareValue = $scope.compareValue + 1;
          if($scope.compareValue == trueValue){
            $interval.cancel(tempI);
          }
        }, 100);
      }
      // $('#isOK').modal('show');
      //关闭模态框
      $('#isOK').on('hidden.bs.modal', function (e) {
        // do something...
        goState();
      });


    });

  /*入网资格校验*/
  function netAccess(data) {
    var idNumber = "证件号码";
    var idType = "证件类型";
    faceAndCardCheckServer.netAccess({
      idType: idType,
      idNumber: idNumber
    }, function (res) {
      if (res.retCode === "200") {
        /*根据入口业务跳转对应页面*/
        /*01 开户入网 -> 套餐选择*/
        $state.go('zhyyt.choicePackage');
      }
    });
  }



})();