(function () {
	'use strict';

	angular.module('zhyyt.payCash', [])
		.controller('payCashCtrl', ['$scope', '$interval', '$rootScope', '$state', '$stateParams', 'commonService', 'payCashService', 'rechargeService', function ($scope, $interval, $rootScope, $state, $stateParams, commonService, payCashService, rechargeService) {
			var orderInfo = commonService.getState();
			$rootScope.headerTitle = '现金支付'; //头部显示名字

			console.log($stateParams);
			$scope.timer = 120;
			$scope.param = {
				Payment: Number(orderInfo.Payment),
				setMoney: 0,
				needMoney: Number(orderInfo.Payment)
			}
			var timeout = $interval(function () {
				$scope.timer--;
				if ($scope.time === 0) {
					$interval.cancel(timeout);
					$state.go('zhyyt.timeout');
					return;
				}
				if ($scope.param.needMoney === 0) {
					$interval.cancel(timeout);
					$scope.payState = '';
					if (orderInfo.BusiCode === '02') {
						$scope.payState = 'underway';
						payCashService.sendCashCharge({
							OrderNo: orderInfo.OrderNo,
							Payment: '0',
							ChargeMoney: Number(orderInfo.ChargeMoney)*100 + '',
							IDValue: orderInfo.IDValue,
							ProductName: '缴费充值',
							OrderMoney: Number(orderInfo.OrderMoney)*100 + '',
							PaymentType: 'CASH',
						}, function (res) {
							$state.go('zhyyt.chargeSuccess');
						})
					} else {
						$scope.payState = 'success';
						payCashService.sendCashResult({
							OrderNo: orderInfo.OrderNo,
							OrderDate: orderInfo.OrderNo.substr(4, 8)
						}, function (res) {
							// if you need some callback operation
						});
						$interval(function () {
							$scope.payState = '';
							// $state.go('zhyyt.rcOrderAccepted');
							window.location.href = orderInfo.NextUrl;
						}, 1000);
					}
				}

				// simulate();
			}, 1000, 120);

			//取消支付
			$scope.payCancel = function () {
				$interval.cancel(timeout);
				$state.go('zhyyt.fail');
			};

			//其他支付方式
			$scope.otherPay = function () {
				$interval.cancel(timeout);
				$state.go('zhyyt.payMian');
			};

			//模拟
			// function simulate() {
			// 	if ($scope.param.Payment > $scope.param.setMoney + 50) {
			// 		$scope.param.setMoney += 50;
			// 		$scope.param.needMoney -= 50;
			// 	} else {
			// 		$scope.param.setMoney = $scope.param.Payment;
			// 		$scope.param.needMoney = 0;
			// 	}
			// }
			$scope.openCash = function () {
				window.resultFun = function (res) {
					var temp = JSON.parse(res)
					if(temp.retCode === '200'){
						$scope.param.Payment = temp.data.totalAmount;
						$scope.param.setMoney = temp.data.payAmount;
						$scope.param.needMoney = temp.data.unpaidAmount;
					}else{
						// alert(temp.msg);
					}
				}
				rechargeService.openCash($stateParams);
			};
			$scope.openCash();

		}]);
})();