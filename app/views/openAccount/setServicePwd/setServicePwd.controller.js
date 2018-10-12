/**
 * 设置服务密码controller 申佳
 */
(function() {
  'use strict';

  angular.module('zhyyt.openAccountControllers')
    .controller('setServicePwdCtrl', function($scope, $rootScope, $state, setServicePwdServicer, openAccountService) {
      $rootScope.headerTitle = '设置服务密码'; //头部显示名字

      $scope.number = '';
      $scope.password = [];// 密码与确认密码,总共12位长度
      $scope.errorInfo = false;//错误提示信息
      $scope.focusNumber = '';//聚焦的号码盘


      //用户点击键盘
      $scope.setNum = function(keyboard){
        $scope.focusNumber = keyboard;
        if(keyboard === 'backspace'){
          $scope.password.pop();
        }else if(keyboard === '清空'){
          $scope.password = [];
        }else if($scope.password.length > 11){
          return;
        }else{
          $scope.password.push(keyboard);
          $scope.password.length === 12 && ($scope.errorInfo = isEqual());
        }
      };

      //保存密码
      $scope.savePwd = function(number, pwd){
        setServicePwdServicer.setServicePwd({
          phoneNumber: number,
          userPassword: pwd,
        }, function(res){
          if(res.retCode === '200'){
            $state.go('zhyyt.readConfirm');
          }else{
            alert(res.resMsg);
          }
        });
      }

      //跳过
      $scope.goNextStep = function () {
        $state.go('zhyyt.readConfirm');
      };
      //上一步
      $scope.forwardStep = function(){
        $state.go('zhyyt.choiceNum');
      };
      //下一步
      $scope.nextStep = function(){
        if(isEqual()){
          var tempPwd = $scope.password.toString().replace(/\,/g,'').slice(0,6);
          $scope.savePwd(openAccountService.openAccountInfo.number,tempPwd);
        }
      };

      //判断两次服务密码是否相等
      function isEqual(){
        var tempPwd = $scope.password.toString().replace(/\,/g,'');
        return tempPwd.slice(0,6) === tempPwd.slice(6,12);
      }


    });
})();