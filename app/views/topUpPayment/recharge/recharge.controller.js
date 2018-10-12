(function () {
  'use strict';

  angular.module('zhyyt.recharge', [])
    .controller('rechargeController', ["$scope", "$rootScope", "$state", "rechargeService", "commonService", function ($scope, $rootScope, $state, rechargeService, commonService) {
      var stage = {};
      var salemoney = '';
      $scope.typeInMoney = '';
      $scope.mobile1 = '';//第一次手机号码
      $scope.mobile2 = '';//第二次手机号码
      $scope.errorMsg = {};
      $rootScope.headerTitle = '充值中心';//头部显示名字

      //查询归属地
      function getAttr(model) {
        rechargeService.getAttribution({ cellNumber: $scope[model].replace(/\s/g, '') }, function (res) {
          if (res.retCode === '200') {
            $scope.errorMsg[model] = res.data;
            if(model === 'mobile1'){
              $scope.focusMobile2 = true;
              $scope.focusMobile1 = false;
              $scope.isAudio2 = $scope.isAudio1;
              $scope.isAudio1 = false;
            }
          } else {
            $scope.errorMsg[model] = '获取归属地错误。' + res.msg;
          }
        });
      }

      //获取充值金额
      $scope.chargeMoneyList = [];
      function getMoney() {
        rechargeService.getMoney(function (res) {
          if (res.retCode === '200') {
            $scope.chargeMoneyList = res.data;
            $scope.noGift = false;
          } else {
            $scope.noGift = true;
            alert(res.msg);
          }
        });
      }
      getMoney();

      //watch手机号码
      $scope.$watch('mobile1', function (nv, ov) {
        isOKPhone('mobile1');
      });
      $scope.$watch('mobile2', function (nv, ov) {
        isOKPhone('mobile2');
      });
      //判断手机号码是否正确
      function isOKPhone(model){
        var whichError = model === 'mobile1' ? 'typeError1' : 'typeError2';
        $scope.typeError1 = false;
        $scope.typeError2 = false;
        $scope.notEqual = false;
        $scope.equal = false;//显示绿色勾勾
        if($scope[model].length === 11){
          rechargeService.checkPhone({ serviceNumber: $scope[model].replace(/\s/g, '') }, function (res) {
            if (res.retCode === '200') {
              getAttr(model);
            } else {
              $scope[whichError] = true;
              $scope.errorMsg[model] = res.msg;
              stage[model] = {
                phone: $scope[model].replace(/\s/g, ''),
                msg: res.msg
              };

            }
          });
        }
        if ($scope.mobile1.length === 11 && $scope.mobile2.length === 11){
          if($scope.mobile1 !== $scope.mobile2)  {
            $scope.typeError1 = true;
            $scope.notEqual = true;
            $scope.equal = false;//显示绿色勾勾
          }else{
            $scope.equal = true;//显示绿色勾勾
            var phone = stage[model] && stage[model].phone;
            $scope.errorMsg.mobile1 = phone === $scope[model] ? stage[model].msg : $scope.errorMsg.mobile1;
          }
        }
      }

      //设置支付金额
      $scope.setPayValue = function (item) {
        $scope.chargeMoney = item.chargeMoney;
        $scope.paymentMoney = item.salemoney;
        $scope.typeInMoney = '';
        $scope.focusMoney = false;
        $scope.typeInMoneyError = false;
      };

      //立即充值
      $scope.goPayment = function () {
        //临时调用手动输入赋值
        if ($scope.mobile1.length < 11 || $scope.mobile2.length < 11 || $scope.mobile1 !== $scope.mobile2 
          || (!$scope.chargeMoney && !$scope.typeInMoney) || $scope.typeError1) {
          return;
        }
        $scope.chargeMoney = $scope.typeInMoney ? $scope.typeInMoney : $scope.chargeMoney;
        $scope.paymentMoney = $scope.typeInMoney ? $scope.typeInMoney : $scope.paymentMoney;
        $scope.confirm = true;
      };

      //确认充值
      $scope.payConfirm = function () {
        commonService.setState({
          Payment: $scope.paymentMoney,
          ChargeMoney: $scope.chargeMoney,
          OrderMoney: $scope.chargeMoney,
          // Payment: '0.01',
          // ChargeMoney: '0.01',
          // OrderMoney: '0.01',
          IDValue: $scope.mobile1.replace(/\s/g, ''),
          BusiCode: '02',
          ProductName: '缴费充值'
        });
        $state.go('zhyyt.payMian');
      }

      //点击键盘输入
      $scope.typeIn = function (value) {
        var model;
        if ($scope.focusMobile1) {
          model = 'mobile1'
        } else if ($scope.focusMobile2) {
          model = 'mobile2'
        } else if ($scope.focusMoney) {
          model = 'typeInMoney'
          $scope.chargeMoney = '';
        } else {
          return;
        }
        if (value === 'clear') {
          $scope[model] = ''
          return;
        }
        if (value === 'backspace') {
          $scope[model] = $scope[model].substr(0, $scope[model].length - 1)
          if (model === 'typeInMoney') {
            $scope.chargeMoney = Number($scope[model]);
            $scope.typeInMoneyError = (Number($scope.typeInMoney) > 5000 || Number($scope.typeInMoney) < 10) && $scope.typeInMoney !== '';
          }
          return;
        }
        if (model === 'mobile1' && $scope.mobile1.length < 11) {
          $scope[model] += '' + value;
          return;
        }
        if (model === 'mobile2' && $scope.mobile2.length < 11) {
          $scope[model] += '' + value;
          return;
        }
        if (model === 'typeInMoney' && $scope.typeInMoney.length < 4) {
          $scope[model] += '' + value;
          $scope.chargeMoney = Number($scope[model]);
          $scope.typeInMoneyError = (Number($scope.typeInMoney) > 5000 || Number($scope.typeInMoney) < 10) && $scope.typeInMoney !== '';
        }
      };

      //语音测试FN
      function voiceResultFun(res) {
        var resJson = JSON.parse(res);
        if (resJson.retCode == "200") {
          //充值
          if (resJson.data.main == "107") {
            if (resJson.data.sub == "0") {
              //播报第一条欢迎进入充值页面，请输入手机号后的逻辑操作  resJson.data 为返回结果  将结果值给电话框框回显
              //参考语句：
            } else if (resJson.data.sub == "1") {
              document.getElementById("phone").value = resJson.data.speak;
              //document.getElementById("phone2").value=resJson.data.speak;
            } else if (resJson.data.sub == "2") {
              alert(resJson.data.speak);
            } else if (resJson.data.sub == "3") {
              alert(resJson.data.speak);
            }
          }
        }
      }

    }]);
})();
