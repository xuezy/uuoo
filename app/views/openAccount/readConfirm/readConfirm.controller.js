/**
 * 信息确认+协议阅读controller 申佳
 */
(function() {
  'use strict';

  angular.module('zhyyt.openAccountControllers')
    .controller('readConfirmCtrl', function($scope, $rootScope, $state, $filter, commonService, openAccountService, readConfirmServicer) {
      $rootScope.headerTitle = '信息确认'; //头部显示名字

      $scope.isNote = false;
      $scope.protocol = '';//入网协议
      $scope.noteProtocol = '';//入网告知书
      $scope.isReadProtocol = false;//是否同意协议
      var userIDCard = commonService.getIDCardInfo();
      $scope.createParams = {
        bid: '12',//业务ID
        phoneNum: openAccountService.openAccountInfo.number,//手机号码
        name:  userIDCard.name, //姓名
        IDtype: '身份证', //证件类型
        IDnum: userIDCard.id,//证件号码
        packageType: openAccountService.openAccountInfo.packageType,//套餐类型
        postageRank: openAccountService.openAccountInfo.oneRank,//套餐资费等级
        effectWay: '立即生效',//生效方式
        payMoney: openAccountService.openAccountInfo.numberFare,//支付金额，选号码的费用
        // payMoney: '0.01',//支付金额，选号码的费用.testtesttesttesttesttest
        address: '深圳福田区',//受理网点
        date: '20180921'//受理日期
      };
      // $scope.createParams = {
      //   bID: '12',//业务ID
      //   phoneNum: 15013669204,//手机号码
      //   phoneNumFare: '100',//手机号码费用
      //   name: '申佳', //姓名
      //   idType: '身份证', //证件类型
      //   idNum: '420923199204030010',//证件号码
      //   packageType: '神州行',//套餐类型
      //   postageRank: '88',//套餐资费等级
      //   effectWay: '立即生效',//生效方式
      //   payMoney: '100',//支付金额，选号码的费用
      //   address: '深圳福田区',//受理网点
      //   date: '20180921'//受理日期
      // };

      //获取入网协议
      $scope.getProtocol = function(){
        readConfirmServicer.getProtocol(function(res){
          console.log(res);
          if(res.retCode === '200'){
            $scope.protocol = res.data.netProtocolInfo;
          }else{
            alert(res.msg);
          }
        });
      };
      $scope.getProtocol();

      //获取告知书
      $scope.getProtocol = function(){
        readConfirmServicer.getNoteProtocol(function(res){
          console.log(res);
          if(res.retCode === '200'){
            $scope.noteProtocol = res.data.noteProtocolInfo;
          }else{
            alert(res.msg);
          }
        });
      };
      $scope.getProtocol();
      
      //提交确认单,预购单
      $scope.sendOrder = function(){
        $('#isOK').modal('hide');
        readConfirmServicer.preSub($scope.createParams, function(res){
          if(res.retCode === '200'){
            if(openAccountService.openAccountInfo.numberFare !== '0'){
              $scope.payConfirm($scope.generatorOrderNo());
            }else{
              $state.go('zhyyt.openAccountOrderAccepted');
            }
            console.log(res.data.orderNum);
          }else{
            alert(res.msg);
          }
        });
      };
      $scope.generatorOrderNo = function(){
        var random ='';
        var now = new Date();
        var milliseconds = now.getMilliseconds()+'';
        while(milliseconds.length < 3){
          milliseconds = '0' + milliseconds;
        }
        for(var i = 0; i < 11; i++){
          random += Math.floor(Math.random()*10);
        }
        return '0089' + $filter('date')(now, 'yyyyMMddHHmmss')+ milliseconds+ random;
      }

      //跳转支付页面
      $scope.payConfirm = function(orderNum){
        commonService.setState({
          phoneNumber: openAccountService.openAccountInfo.number,//手机号码
          Payment: openAccountService.openAccountInfo.numberFare,
          ChargeMoney: openAccountService.openAccountInfo.numberFare,
          OrderMoney: openAccountService.openAccountInfo.numberFare,
          IDValue: openAccountService.openAccountInfo.number,
          BusiCode: '01',//传01
          ProductName: '开户入网',
          OrderNo: orderNum,//订单号
          NextUrl: location.origin+commonService.urlFix + '/#/zhyyt/openAccountOrderAccepted'
        });
        $state.go('zhyyt.payMian');
      }

      //上一步
      $scope.forwardStep = function(){
        $state.go('zhyyt.setServicePwd');
      };
      //弹出模态框
      $scope.alertInfo = function(){
        if($scope.isReadProtocol){
          $('#isOK').modal('show');
        }
      };


    });
})();