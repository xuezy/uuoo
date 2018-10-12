(function () {
  'use strict';

  angular.module('zhyyt.login', [])
    .controller('loginController', ["$scope", "$rootScope", "$state", "rechargeService", "loginService", "$interval", "commonService", "faceAndCardCheckServer", "focus", "deviceServicer", "$timeout", function ($scope, $rootScope, $state, rechargeService, loginService, $interval, commonService, faceAndCardCheckServer, focus, deviceServicer, $timeout) {

      $rootScope.headerTitle = '登录'; //头部显示名字
      $scope.pageMain = true; //整个页面隐藏
      $scope.phoLongin = true; //身份证登录隐藏
      $scope.mobile = ''; //手机号输入的值
      $scope.shortPwdmobile = ''; //短信密码
      $scope.payStateSuc = ''; //提示消息
      $scope.password = []; //服务密码
      $scope.placeName = ""; //地名
      $scope.input_error = ""; //输入显示错误
      $scope.pwder = true;
      var phonelimit = /\D+/; //输入数字正则
      var state = commonService.getState();
      focus('inputFocus'); //获取焦点

      //身份证登录
      $scope.idCardLogin = function () {
        $scope.loginName = '身份证登录';
        $scope.loginCode = '1'
      }
      $scope.idCardLogin();

      //服务密码
      $scope.serPwdLogin = function () {
        $scope.loginName = '登录';
        $scope.loginCode = '2';
      }

      //短信密码
      $scope.shortPwdLogin = function () {
        $scope.loginName = '登录';
        $scope.loginCode = '3';
      }

      //退出办理
      $scope.exiTing = function () {
        $state.go('home');
      }

      //重新登录
      $scope.agaLogin = function () {
        $state.reload('zhyyt.login');
      }

      //点击键盘输入
      $scope.typeIn = function (value) {
        var model;
        if ($scope.focusMobile) {
          model = 'mobile';
        } else if ($scope.focusVerCode) {
          model = 'shortPwdmobile';
        } else if ($scope.serPwd) {
          model = 'password';
        } else {
          return;
        }
        if (value === 'clear') {
          $scope[model] = '';
          $scope.password = [];
          $('#ppt input').removeClass("passwordGREEN");
          return;
        }
        if (value === 'backspace') {
          $scope.pwder = false;
          $scope.input_error = '';
          if (model === 'password') {
            $scope.password.pop();
            $('#ppt').find('input').eq($scope.password.length).removeClass("passwordGREEN");
          } else {
            $scope[model] = $scope[model].substr(0, $scope[model].length - 1);
          }
          return;
        }
        if (model === 'mobile' && $scope.mobile.length < 11) {
          $scope[model] += '' + value;
          return;
        }
        if (model === 'shortPwdmobile' && $scope.shortPwdmobile.length < 6) {
          $scope[model] += '' + value;
        }
        if (model === 'password' && $scope.password.length < 6) {
          $scope.password.push(value);
          for (var i = 0; i < $scope.password.length; i++) {
            $('#ppt').find('input').eq(i).addClass("passwordGREEN");
          }
        }

      };

      //登录
      $scope.userLogin = function (val) {
        localStorage.setItem("phone",angular.toJson($scope.mobile));
        if (val == '1') {
          $scope.idCard = true;
          $scope.pageMain = false;
          $timeout(function () {
            // phone: $scope.mobile,
            deviceServicer.devReadIDCard(function (res) {
              var temp = JSON.parse(res);
              if (temp.retCode === '200') {
                commonService.setIDCardInfo(temp.data);
                commonService.setState({
                  idCardlog: $scope.mobile,
                  //姓名 身份证号
                });
                $timeout(function () {
                  state.BusiIndex === '01' && $state.go('zhyyt.setServicePwd');
                  // state.BusiIndex === '04' && $state.go('zhyyt.pachanding');
                  state.BusiIndex === '04' && $state.go('zhyyt.pachandinglist');
                  state.BusiIndex === '06' && $state.go('zhyyt.costConfirm');
                  //localStorage.setItem("phone",angular.toJson($scope.mobile));
                  //后台存储当前登录身份证和手机号
                  // $scope.idCardarm = {
                  //   phone: $scope.mobile,
                  //   identityType: val,
                  //   identityNum: password
                  // }

                  // loginService.getidCard($scope.idCardarm, function (res) {
                  //   if (res.retCode == '200') {

                  //   } else{
                  //     alert(res.msg)
                  //   }
                  // });
                }, 1000)
              } else {
                $scope.payStateFail = true;
                $scope.pageMain = false;
                $scope.idCard = false;
                $scope.payStateName = '身份证与手机号码不匹配，请检查后再试。'
              }
            });
          }, 1000);
        } else if (val == '2') {
          var password = $scope.password.join('');
          if ($scope.mobile === '' || $scope.mobile.length < 11) {
            alert('请输入11位手机号');
          } else if ($scope.password === '' || $scope.password.length < 6) {
            alert('请输入验证码')
          } else {
            $scope.parm = {
              phone: $scope.mobile,
              identityType: val,
              identityNum: password
            }
            loginService.getidCard($scope.parm, function (res) {
              if (res.retCode == '200') {
                commonService.setState({
                  serPhone: $scope.mobile
                });
                $scope.payStateSuc = true;
                $scope.pageMain = false;
                $scope.payStateName = '登录成功!请稍后.....';
                $timeout(function () {
                  state.BusiIndex === '01' && $state.go('zhyyt.setServicePwd');
                  state.BusiIndex === '04' && $state.go('zhyyt.pachandinglist');
                  state.BusiIndex === '06' && $state.go('zhyyt.costConfirm');
                 // localStorage.setItem("phone",angular.toJson($scope.mobile));
                }, 1000)
              } else {
                serPwdName();
                // $scope.payStateFail = true;
                // $scope.pageMain = false;
                // $scope.payStateName = '系统繁忙，请稍候再试。'
              }
            });
          }
        } else {
          if ($scope.mobile === '' || $scope.mobile.length < 11) {
            alert('请输入11位手机号')
          } else if ($scope.shortPwdmobile === '' || $scope.shortPwdmobile.length < 6) {
            alert('输入验证码')
          } else {
            $scope.shortparm = {
              phone: $scope.mobile,
              identityType: val,
              identityNum: $scope.shortPwdmobile
            }
            loginService.getidCard($scope.shortparm, function (res) {
              if (res.retCode == '200') {
                commonService.setState({
                  shortPhone: $scope.mobile
                });
                $scope.payStateSuc = true;
                $scope.pageMain = false;
                $scope.payStateName = '登录成功!请稍后.....';
                $timeout(function () {
                  state.BusiIndex === '01' && $state.go('zhyyt.setServicePwd');
                  state.BusiIndex === '04' && $state.go('zhyyt.pachandinglist');
                  state.BusiIndex === '06' && $state.go('zhyyt.costConfirm');
                 // localStorage.setItem("phone",angular.toJson($scope.mobile));
                }, 1000)
              } else {
                $scope.payStateFail = true;
                $scope.pageMain = false;
                $scope.payStateName = '系统繁忙，请稍候再试。'
              }

            });
          }
        }
      }

      //发送验证码
      $scope.sendCode = function () {
        if ($scope.mobile === '' || $scope.mobile.length < 11) {
          alert('请输入11位手机号')
        } else {
          sendCodeName();
          loginService.getSendCode({
            phone: $scope.mobile
          }, function (res) {
            if (res.retCode == 200) {
              $scope.shortPwdmobile = res.data.smsCode
            } else {
              alert(res.msg);
            }
          });
        }
      }

      //登录按钮倒计时
      function serPwdName() {
        var btn;
        var inter;
        var time = 3;
        $scope.pwder = true;
        $scope.input_error = '密码不正确，请检查后重试';
        btn = $("#sms-send");
        btn.removeClass("LoginButtonGREEN");
        inter = setInterval(function () {
          btn.html('密码不正确，请检查后再试！' + '(' + --time + 's' + ')');
          if (time <= 0) {
            clearInterval(inter);
            btn.html("登录");
            btn.addClass("LoginButtonGREEN");
            time = 3;
            $scope.input_error = ''
          }
        }, 1000);
      }

      //发送验证码按钮倒计时
      function sendCodeName() {
        var btn;
        var inter;
        var time = 60;
        btn = $("#sedCode");
        btn.removeClass("SMS-cipherBLUE");
        btn.addClass("SMS-cipherGray");
        inter = setInterval(function () {
          btn.html('重新发送' + '(' + --time + 's' + ')');
          if (time <= 0) {
            clearInterval(inter);
            btn.html("重新发送");
            btn.removeClass("SMS-cipherGray");
            btn.addClass("SMS-cipherBLUE");
            $scope.shortPwdmobile = '';
            time = 60;
          }
        }, 1000);
      }

      //查询归属地
      $scope.getPlaceName = function () {
        rechargeService.getAttribution({
          cellNumber: $scope.mobile.replace(/\s/g, '')
        }, function (res) {
          if (res.retCode === '200') {
            $scope.placeName = res.data;
          } else {
            $scope.placeName = '获取归属地错误。' + res.msg;
          }
        });
      }

      //验证号码输入
      $scope.$watch('mobile', function (newValue, oldValue) {
        if (newValue != oldValue) {
          if (newValue.length < 11) {
            $scope.input_error = '格式不正确，请输入11位手机号码';
            $scope.pwder = true;
          } else if (newValue.length == 11) {
            $scope.input_error = "";
            $scope.getPlaceName();
            $scope.pwder = true;
          }
        }
      });

    }]);
})();
