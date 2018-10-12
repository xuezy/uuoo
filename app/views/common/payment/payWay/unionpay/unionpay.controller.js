(function() {
	'use strict';
	//云闪付
	angular.module('zhyyt.unionpay', [])
		.controller('unionpayController', function($scope, $rootScope, $state, $interval, $timeout, commonService, barcodeService, rechargeService, payMianService) {
			var orderInfo = commonService.getState();
			var chargeOrderNo; //支付充值专用订单号
			$rootScope.headerTitle = '云闪付'; //头部显示名字
			$scope.open = false;
			$scope.payState = '';
			$scope.AuthCode = '';
			$scope.nORb = true;
			$scope.$watch('nORb', function(nv, ov) {
				if (nv === ov) {
					return;
				}
				if (timeOut1) {
					clearTimeout(timeOut1);
				}
				$scope.timer = 120;
				queryNum = 0;
				if ($scope.nORb) {
					$scope.getQR();
				} else {
					$scope.native();
				}
			});
			//生成二维码
			var nativeNum = 0;
			$scope.native = function() {
				if (orderInfo.BusiCode === '01') {
					var param = {
						OrderNo: orderInfo.OrderNo, //32位订单号
						Payment: Number(orderInfo.Payment) * 100 + '', //用户到第三方支付系统实际支付的金额。
						ProductName: orderInfo.ProductName, //产品名称
						PaymentType: 'UNIONPAY-NATIVE'
					};
					barcodeService.pay(param, function(res) {
						if (res.STATUS === 'SUCCESS') { //生成二维码成功
							$('#codeUrl').qrcode(res.code_url);
							$timeout(function() {
								queryTimeOut(orderInfo.OrderNo);
							}, 6000);
						} else if (res.STATUS === 'FAIL') { //生成二维码发生错误

						}
					});
				} else if (orderInfo.BusiCode === '02') {
					if (nativeNum > 0) {
						$timeout(function() {
							queryTimeOut(chargeOrderNo);
						}, 6000);
						return;
					}
					//支付充值每次生成二维码 生成新订单号 并通知新订单
					chargeOrderNo =  commonService.getOrderNo();
					payMianService.newGenPay(chargeOrderNo);
					var param = {
						OrderNo: orderInfo.OrderNo, //32位订单号
						Payment: Number(orderInfo.Payment) * 100 + '', //用户到第三方支付系统实际支付的金额
						ChargeMoney: Number(orderInfo.ChargeMoney) * 100 + '', //需要给用户充值的金额
						IDValue: orderInfo.IDValue + '', //用户手机号
						ProductName: orderInfo.ProductName, //产品名称
						OrderMoney: Number(orderInfo.Payment) * 100 + '', //订单金额
						PaymentType: 'UNIONPAY-NATIVE'
					};
					barcodeService.paycharge(param, function(res) {
						if (res.STATUS === 'SUCCESS') { //生成二维码成功
							$('#codeUrl').qrcode(res.CODEURL);
							$timeout(function() {
								queryTimeOut(orderInfo.OrderNo);
							}, 6000);
							nativeNum++;
						} else if (res.STATUS === 'FAIL') { //生成二维码发生错误


						}
					});
				}
			};

			//拿到18位条形码发送请求
			$scope.pay = function() {
				clearTimeout(timeOut);
				$scope.payState = 'underway'; //开启进行支付遮罩层
				// orderInfo.BusiCode = '02';
				if (orderInfo.BusiCode === '01') {
					var param = {
						OrderNo: orderInfo.OrderNo, //32位订单号
						Payment: Number(orderInfo.Payment) * 100 + '', //用户到第三方支付系统实际支付的金额。
						ProductName: orderInfo.ProductName, //产品名称
						AuthCode: $scope.AuthCode //使用扫描设备读取用户支付宝、微信、银联云闪付中的条码或者二维码信息
					};
					barcodeService.pay(param, function(res) {
						if (res.STATUS === 'SUCCESS') { //订单成功
							$timeout(function() {
								queryTimeOut(orderInfo.OrderNo);
							}, 4000);
						} else if (res.STATUS === 'FAIL') { //订单发生错误
							$state.go('zhyyt.fail');
						}
					});
				} else if (orderInfo.BusiCode === '02') {
					var param = {
						OrderNo: chargeOrderNo, //32位订单号
						Payment: Number(orderInfo.Payment) * 100 + '', //用户到第三方支付系统实际支付的金额
						ChargeMoney: Number(orderInfo.ChargeMoney) * 100 + '', //需要给用户充值的金额
						IDValue: orderInfo.IDValue + '', //用户手机号
						ProductName: orderInfo.ProductName, //产品名称
						AuthCode: $scope.AuthCode, //使用扫描设备读取用户支付宝、微信、银联云闪付中的条码或者二维码信息，纯赠送时无需填写
						OrderMoney: Number(orderInfo.Payment) * 100 + '', //订单金额
						PaymentType: 'BARCODE'
					};
					barcodeService.paycharge(param, function(res) {
						if (res.STATUS === 'SUCCESS') { //订单成功

							$timeout(function() {
								queryTimeOut(chargeOrderNo);
							}, 4000);
						} else if (res.STATUS === 'FAIL') { //订单发生错误
							$state.go('zhyyt.chargeFail');
						}
					});
				}
			};
			//持续查询订单支付状态
			var queryNum = 0;
			var isDestory = false;
			function query(orderNumber) {
				//如果查询了10次，直接跳转失败
				queryNum++;
				console.log(queryNum);
				if(isDestory){
					return;
				}
				//默认十次查询跳转失败
                if(queryNum > 10){
                	$scope.payState = '';
					if (orderInfo.BusiCode === '02') {
						$state.go('zhyyt.chargeFail');
					} else {
						$state.go('zhyyt.fail');
					}
                	return;
                }
				var params = {
					BusiCode: orderInfo.BusiCode,
					OrderNo: orderInfo.OrderNo,
					OrderDate: orderInfo.OrderNo.substr(4, 8)
				};
				if (orderInfo.BusiCode === '01') {
					params.OrderDate = undefined;
				}
				var privateNum = queryNum;
				barcodeService.query(params, function(res) {
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
					}

					if (res.STATUS === 'WAITTING') { //订单状态如果不是waiting就关闭定时器
						$timeout(function(){
							query(orderNumber);
						},4000)
					}
				});
			}


			//倒计时
			$scope.timer = 120;
			var timeOut;
			countDown();
			function countDown() {
				
				timeOut = $interval(function() {
					$scope.timer--;
					if ($scope.timer === 0) {
						$interval.cancel(timeOut);
						$state.go('zhyyt.timeout');
						return;
					}
				}, 1000);

			}
			var timeOut1;

			function queryTimeOut(orderNumber) {
				console.log(queryNum, 'timeout');
				commonService.setState({
					OrderNo: orderNumber
				});
				if (queryNum >= 10) {
					if (timeOut) {

						$interval.cancel(timeOut);
					}
					if (timeOut1) {

						clearTimeout(timeOut1);
					}
					if (orderInfo.BusiCode === '02') {
						$state.go('zhyyt.chargeFail');
					} else {
						$state.go('zhyyt.fail');
					}
					return;
				}
				queryNum = 0;
				query(orderNumber);
			}

			//取消支付
			$scope.payCancel = function() {
				if (timeOut) {

					$interval.cancel(timeOut);
				}
				if (timeOut1) {

					clearTimeout(timeOut1);
				}
				//跳转到首页
				$state.go('home');
			};

			//其他支付方式
			$scope.otherPay = function() {
				if (timeOut) {

					$interval.cancel(timeOut);
				}
				if (timeOut1) {

					clearTimeout(timeOut1);
				}
				$state.go('zhyyt.payMian');
			};

			//获取二维码QR
			$scope.getQR = function() {
				window.resultFun = function(res) {
					var temp = JSON.parse(res)
					if (temp.retCode === '200') {
						$scope.AuthCode = temp.data;
						if ($scope.AuthCode !== '') {
							$scope.pay();
						}
					} else {
						alert(temp.msg);
					}
				};
				rechargeService.openQR();
				//手动输入条码
				// $timeout(function(){
				// 	if(orderInfo.BusiCode === '02'){
    //                     $scope.AuthCode = window.prompt('输入十八位付款码');
    //                     $scope.pay();
				// 	}
				// },0);
			};
			$timeout(function() {
				$scope.getQR();
			}, 1000);

            $scope.$on('$destory', function(){
            	clearTimeout(timeOut1);
            	$interval.cancel(timeOut);
            	isDestory = true;
            })


		});
})();