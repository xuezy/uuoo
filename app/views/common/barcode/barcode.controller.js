(function() {
	'use strict';

	angular.module('zhyyt.barcode', [])
		.controller('barcodeController', function($scope, $rootScope, $state, $interval, $timeout, commonService, barcodeService, rechargeService) {
			var orderInfo = commonService.getState();
			$rootScope.headerTitle = '扫码支付'; //头部显示名字
			$scope.open = false;
			$scope.payState = '';
			$scope.AuthCode = '';

			//拿到18位条形码发送请求
			$scope.payShow = false;
			$scope.pay = function() {
				clearTimeout(timeOut);
				$scope.payState = 'underway'; //开启进行支付遮罩层
				$scope.payShow = false;
				// orderInfo.BusiCode = '02';
				if (orderInfo.BusiCode === '01') {
					var param = {
						OrderNo: orderInfo.OrderNo, //32位订单号
						Payment: Number(orderInfo.Payment)*100 + '', //用户到第三方支付系统实际支付的金额。
						ProductName: orderInfo.ProductName, //产品名称
						AuthCode: $scope.AuthCode //使用扫描设备读取用户支付宝、微信、银联云闪付中的条码或者二维码信息
					};
					barcodeService.pay(param, function(res) {
						if (res.STATUS === 'SUCCESS') { //订单成功
							query();
						} else if (res.STATUS === 'FAIL') { //订单发生错误
							$state.go('zhyyt.fail');
						}
					});
				} else if (orderInfo.BusiCode === '02') {
					var param = {
						OrderNo: orderInfo.OrderNo, //32位订单号
						Payment: Number(orderInfo.Payment)*100 + '', //用户到第三方支付系统实际支付的金额
						ChargeMoney: Number(orderInfo.ChargeMoney)*100 + '', //需要给用户充值的金额
						IDValue: orderInfo.IDValue + '', //用户手机号
						ProductName: orderInfo.ProductName, //产品名称
						AuthCode: $scope.AuthCode, //使用扫描设备读取用户支付宝、微信、银联云闪付中的条码或者二维码信息，纯赠送时无需填写
						OrderMoney: Number(orderInfo.Payment)*100 + '', //订单金额
                        PaymentType: 'NATIVE'
					};
					barcodeService.paycharge(param, function(res) {
						// alert(JSON.stringify(param)+ '返回：' +JSON.stringify(res));
						if (res.STATUS === 'SUCCESS') { //订单成功

							query();
						} else if (res.STATUS === 'FAIL') { //订单发生错误
							$state.go('zhyyt.chargeFail');
						}
					});
				}
			};
			//持续查询订单支付状态
			function query() {
				var params = {
					BusiCode: orderInfo.BusiCode,
					OrderNo: orderInfo.OrderNo,
					OrderDate: orderInfo.OrderNo.substr(4, 8)
				};
				if(orderInfo.BusiCode === '01'){
					params.OrderDate = undefined;
				}
				barcodeService.query(params, function(res) {
					// alert(JSON.stringify(params)+ '返回：' +JSON.stringify(res));
					if (res.STATUS === 'SUCCESS') { //订单成功
						if (orderInfo.BusiCode === '02') {
						  $scope.payState = '';
						  $state.go('zhyyt.chargeSuccess');
						} else {
						  $scope.payState = 'success';  
							// $interval(function() {
								$scope.payState = '';
								// $state.go('zhyyt.rcOrderAccepted');
								window.location.href = orderInfo.NextUrl;
							// }, 1000);
						}
					} else if (res.STATUS === 'FAIL') { //订单发生错误
						$scope.payState = '';
						if (orderInfo.BusiCode === '02') {
						$state.go('zhyyt.chargeFail');
						} else {
							$state.go('zhyyt.fail');
						}
					} else if (res.STATUS === 'WAITING') { //订单发生错误
						$interval(function() {
							query(params);
						}, 1000);
					}
				});
			}


			//倒计时
			$scope.timer = 120;
			var timeOut;
			countDown();

			function countDown() {
				if ($scope.timer <= 0) {
					clearTimeout(timeOut);
					$state.go('zhyyt.timeout');
					return;
				}
				$scope.timer--;
				$interval($scope.timer);
				timeOut = setTimeout(function() {
					countDown();
				}, 1000);

			}

			//取消支付
			$scope.payCancel = function() {
				clearTimeout(timeOut);
				//跳转到首页
				$state.go('home');
			};

			//其他支付方式
			$scope.otherPay = function() {
				clearTimeout(timeOut);
				$state.go('zhyyt.payMian');
			};
			
			//获取二维码QR
			$scope.getQR = function(){
				window.resultFun = function(res){
					var temp = JSON.parse(res)
					if(temp.retCode === '200'){
						$scope.AuthCode = temp.data;
					}else{
						alert(temp.msg);
					}
				}
				rechargeService.openQR();
			}
			$timeout(function(){
				$scope.getQR();
			},1000);
			
			

		});
})();