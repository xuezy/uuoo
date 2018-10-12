/**
 * 选择套餐controller 申佳
 */
(function() {
  'use strict';

  angular.module('zhyyt.openAccountControllers')
    .controller('choicePackageCtrl', function($scope, $rootScope, $state, $timeout, openAccountService, choicePackageServicer) {
      $rootScope.headerTitle = '套餐选择'; //头部显示名字

      $scope.packageIndex = 0;//选择的第几个套餐
      $scope.packageList;//主套餐数据
      $scope.feeIndex = 0;//选择的第几个费用
      $scope.feeList;//用户选择的套餐资费数据
      $scope.feeIntroduceList = {
        introduce: {},//资费介绍
        details: {},//套餐详情
        tips: {}//温馨提示
      };//用户选择的资费介绍
      $scope.feeIntroduceIndex = 0;//选择的第几个费用介绍
      $scope.do2Show = false;//是否显示生效时间
      $scope.activeType = 1;

      //获取套餐信息
      $scope.getPackage = function(){
        choicePackageServicer.getPackageList({id:1}, function(res){
          console.log(res);
          if(res.retCode === '200'){
            $scope.packageList = res.data.netPackageList;//packageType,packageDesc,postageDesc
            $scope.packageIndex = 0;
            $scope.setPackage($scope.packageIndex);
          }else{
            alert(res.msg);
          }
        });
      };
      $scope.getPackage();

      //用户选择套餐
      $scope.setPackage = function(index){
        $scope.packageIndex = index;
        openAccountService.openAccountInfo.packageType = $scope.packageList[$scope.packageIndex].packageType;
        openAccountService.openAccountInfo.packageDesc = $scope.packageList[$scope.packageIndex].packageDesc;
        openAccountService.openAccountInfo.postageDesc = $scope.packageList[$scope.packageIndex].postageDesc;
        $scope.setFee(0);
      };

      //用户选择资费
      $scope.setFee = function(index){
        $scope.feeIndex = index;
        $scope.feeIntroduceIndex = 0;
        openAccountService.openAccountInfo.oneRank = $scope.packageList[$scope.packageIndex].postageRankList[$scope.feeIndex];
      };

      //下一步
      $scope.nextStep = function(){
        $('#isOK1').modal('show');
      };
      //确认套餐信息
      $scope.do1 = function(){
        $scope.do2Show = true;
      }
      //确认生效信息
      $scope.do2 = function(){
        $('#isOK1').modal('hide');
        $state.go('zhyyt.choiceNum');
      }
      //确认生效方式
      $scope.setActive = function(activeNum){
        $scope.activeType = activeNum;
      }
      //关闭提示重置显示
      $('#isOK1').on('hide.bs.modal', function (e) {
        $scope.do2Show = false;
        $scope.activeType = 1;
      })

      //退出办理
      $scope.exitDo = function(){
        $state.go('home');
      };





    });
})();