(function() {
  'use strict';
  //充值单据
  angular.module('zhyyt.changeCard', [])
    .controller('changeCardCtrl', ["$scope", "rechargeService", "faceAndCardCheckServer", "$state", "changeCardServer", "commonService", "$rootScope", "$interval", function($scope, rechargeService, faceAndCardCheckServer, $state, changeCardServer, commonService, $rootScope, $interval) {
      var state = commonService.getState();
      $rootScope.headerTitle = '短信验证码'; //头部显示名字
      $scope.verCode = '';
      $scope.mobile = state.IDValue; //手机号码
      $scope.verCodeText = '获取验证码';
      $scope.confirmText = '确认';
      $scope.verCodebut = false;
      $scope.confirmbut = true;
      $scope.verCodebutErro = false;
      //查询归属地
      function getAttr() {
        rechargeService.getAttribution({
          cellNumber: $scope.mobile.replace(/\s/g, '')
        }, function(res) {
          if (res.retCode === '200') {
            $scope.Attr = res.data;
          } else {
            $scope.Attr = '获取归属地错误。' + res.msg;
          }
        });
      }
      $scope.mobile && getAttr();
      //获取验证码
      $scope.gainVerCode = function() {
        $scope.verCodebut = true;
        if ($scope.mobile === '' || $scope.mobile.length < 11) {
          return;
        }
        countDown();
        commonService.setState({
          IDValue: $scope.mobile
        });
        changeCardServer.sendMsgCode({
          phone: $scope.mobile
        }, function(res) {
          if (res.retCode === '200') {
            alert('验证码是：' + res.data);
          }
          // if (res.retCode === '201') {
          //   $scope.confirmText = '密码不正确，请检查后再试！';
          // }
        });
      };

      $scope.$watch('mobile', function(nv, ov) {
        if (!nv || nv === ov) {
          return;
        }
        if ($scope.mobile.length < 11) {
          $scope.verCodebut = true;
          $scope.confirmbut = true;

        } else {
          $scope.verCodebut = false;
          getAttr();

        }

      });

      $scope.$watch('verCode', function(nv, ov) {
        if (!nv || nv === ov) {
          return;
        }
        if ($scope.verCode.length === 6) {
          changeCardServer.checkMsgCode({
            phone: state.IDValue,
            msgCode: $scope.verCode
          }, function(res) {
            if (res.retCode === '200') {
              $scope.confirmbut = false;
              $scope.verCodebutErro = false;
            }else{
              $scope.confirmbut = true;
              $scope.verCodebutErro = true;
            }

          });
        } else {
          $scope.confirmbut = true;
        }
      });

      //倒计时
      $scope.timer = 60;
      var timeOut;

      function countDown() {
        $scope.verCodebut = true;
        $scope.verCodeText = '重新发送（' + $scope.timer + '）';
        if ($scope.timer <= 0) {
          clearTimeout(timeOut);
          $scope.verCodebut = false;
          $scope.verCodeText = '重新发送';
          return;
        }
        $scope.timer--;
        $interval($scope.verCodeText);
        timeOut = setTimeout(function() {
          countDown();
        }, 1000);

      }

      //确认
      $scope.goPayment = function() {
        clearTimeout(timeOut);
        if ($scope.verCode.length < 6) {
          return;
        }
        //跳转授权页面
        faceAndCardCheckServer.bizcheck({
          ServiceType: '01',
          ServiceNumber: state.IDValue,
          CheckType: '1',
          CheckID: undefined
        }, function(res) {
          if (res.retCode === '200') {
            $scope.checkResult = 'success';
            commonService.setState({
              Payment: res.data.money || '2', //补换卡费用
              Frequency: res.data.Frequency || '1' //办理次数
            });
            $state.go('zhyyt.costConfirm');
          }
          if (res.retCode === '201') {
            $scope.checkResult = 'fail';
          }
        });
      };

      //点击键盘输入
      $scope.typeIn = function(value) {
        var model;
        if ($scope.focusMobile) {
          model = 'mobile';
        } else if ($scope.focusVerCode) {
          model = 'verCode';
        } else {
          return;
        }
        if (value === 'clear') {
          $scope[model] = '';
          return;
        }
        if (value === 'backspace') {
          $scope[model] = $scope[model].substr(0, $scope[model].length - 1);
          return;
        }
        if (model === 'mobile' && $scope.mobile.length < 11) {
          $scope[model] += '' + value;
          return;
        }
        if (model === 'verCode' && $scope.verCode.length < 6) {
          $scope[model] += '' + value;
        }
      };

    }]);
})();