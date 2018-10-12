/**
 * 选择号码controller 申佳
 */
(function() {
  'use strict';

  angular.module('zhyyt.openAccountControllers')
    .controller('choiceNumCtrl', function($scope, $rootScope, $state, $timeout, choiceNumServicer, openAccountService) {
      $rootScope.headerTitle = '选择号码'; //头部显示名字
      var initNumberList = [];//所有的电话号码
      $scope.allNumberList = [];
      $scope.phoneNumber = '';//用户输入的电话号码
      $scope.selectNumberFare = '';//选择的号码的费用
      $scope.selectNumber = '';//用户选择的电话号码
      $scope.numberList;//电话号码数据
      $scope.onePageStateBefore = false;
      $scope.onePageStateAfter = false;
      $scope.page = {
        pageNo: 1,
        pageSize: 20,
        allPage: 0
      };//分页数据
      $scope.feeIntroduceList = {
        introduce: {},//资费介绍
        details: {},//套餐详情
        tips: {}//温馨提示
      };//资费介绍
      $scope.showSearch = true;//显示哪一种页面
      $scope.isCheck = false;//是否发起预占
      $scope.isSuccess = false;//预占号码是成功还是失败
      $scope.focusNumber = '';//聚焦的号码盘

      //获取号码展示信息
      $scope.getNumberList = function(){
        choiceNumServicer.getNumberList({id:1, phoneNumber: '1'}, function(res){
          if(res.retCode === '200'){
            initNumberList = res.data.avaibleNumList;
            $scope.allNumberList = res.data.avaibleNumList;
            $scope.page.allPage = Math.ceil($scope.allNumberList.length/$scope.page.pageSize);
            $scope.numberList = $scope.goPage($scope.page.pageNo, $scope.page.pageSize);//设置数据
            // $scope.numberList = $scope.allNumberList;
            $scope.selectNum($scope.numberList[0]);
          }else{
            alert(res.msg);
          }
        });
      };
      $scope.getNumberList();

      //根据用户输入的号码进行查询
      $scope.$watch('phoneNumber',function(nv, ov){
        if(nv !== ov){
          $scope.findNumber(nv);
        }
      });

      $scope.findNumber = function(newNum){
        $scope.allNumberList = [];
        angular.forEach(initNumberList, function(value, index, array){
          if(value.phoneNum.indexOf(newNum) !== -1){
            $scope.allNumberList.push(value);
          }
        });
        $scope.page.allPage = Math.ceil($scope.allNumberList.length/$scope.page.pageSize);
        $scope.numberList = $scope.goPage($scope.page.pageNo, $scope.page.pageSize);//设置数据
      };
      

      //号码预占
      $scope.phoneNumCop = function(){//业务id，电话号码phone
        $scope.isCheck = false;//是否发起预占
        choiceNumServicer.phoneNumCop({id:1, phone: $scope.selectNumber}, function(res){
          $scope.isCheck = true;//是否发起预占
          if(res.retCode === '200'){
            $scope.isSuccess = true;
            $timeout(function(){
              $('#isOK').modal('hide');
              $state.go('zhyyt.readIDCard');
            },1000);
          }else{
            $scope.isSuccess = false;
            alert(res.msg);
          }
        });
      };

      //用户点击号码
      $scope.setNumber = function(keyboard){
        if($scope.phoneNumber.length >10 && keyboard !== 'backspace' && keyboard !== '清空'){
          return;
        }
        $scope.focusNumber = keyboard;
        if(keyboard === 'backspace'){
          $scope.phoneNumber = $scope.phoneNumber.slice(0, -1);
        }else if(keyboard === '清空'){
          $scope.phoneNumber = '';
        }else{
          $scope.phoneNumber += keyboard
        }
      };

      //用户选择号码
      $scope.selectNum = function(numberInfo){
        $scope.selectNumber = numberInfo.phoneNum;//选择的号码
        $scope.selectNumberFare = numberInfo.fare;//选择的号码的费用
        openAccountService.openAccountInfo.number = numberInfo.phoneNum;//选择的号码存入service
        openAccountService.openAccountInfo.numberFare = numberInfo.fare;//选择的号码的开户入网费用存入service
      }

      //上一页号码
      $scope.beforePage = function(){
        if($scope.page.pageNo>1){
          $scope.onePageStateBefore = true;
          $scope.onePageStateAfter = false;
          $scope.page.pageNo--;
          $scope.numberList = $scope.goPage($scope.page.pageNo, $scope.page.pageSize);
        }
        if($scope.page.pageNo === 1){
          $scope.onePageStateBefore = false;
          $scope.onePageStateAfter = true;
        }
      };
      //下一页号码
      $scope.nextPage = function(){
        if($scope.page.pageNo < $scope.page.allPage){
          $scope.onePageStateBefore = false;
          $scope.onePageStateAfter = true;
          $scope.page.pageNo++;
          $scope.numberList = $scope.goPage($scope.page.pageNo, $scope.page.pageSize);
        }
        if($scope.page.pageNo === $scope.page.allPage){
          $scope.onePageStateBefore = true;
          $scope.onePageStateAfter = false;
        }
      };
      //跳转到哪一页
      $scope.goPage = function(pageNo, pageSize){
        return $scope.allNumberList.slice((pageNo-1)*pageSize, pageNo*pageSize);
      };

      //弹出模态框
      $scope.alertInfo = function(){
        $('#isOK').modal('show');
      };
      //关闭提示重置显示
      $('#isOK').on('hide.bs.modal', function (e) {
        $scope.isCheck = false;//是否发起预占
        $scope.isSuccess = false;//预占号码是成功还是失败
      })

      //上一步
      $scope.forwardStep = function(){
        $state.go('zhyyt.choicePackage');
      };
      //下一步
      $scope.nextStep = function(){
        $scope.phoneNumCop();//号码预占
      };
      //查找号码
      $scope.searchNum = function(){
        $scope.showSearch = false;
        $scope.page.pageNo = 1;
        $scope.page.pageSize = 9;
        $scope.phoneNumber = '';
        $scope.findNumber('');
      };
      //取消查找
      $scope.cancelSearch = function(){
        $scope.showSearch = true;
        $scope.page.pageNo = 1;
        $scope.page.pageSize = 20;
        $scope.getNumberList();
      };

      //退出办理
      $scope.exitDo = function(){
        $state.go('home');
      };

    });
})();