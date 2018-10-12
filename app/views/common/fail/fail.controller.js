(function() {
	'use strict';

	angular.module('zhyyt.fail', [])
		.controller('failController', function($scope, $rootScope, $state, failService,$interval,commonService) {
			var orderInfo = commonService.getState();
			$rootScope.headerTitle = ''; //头部显示名字
			$scope.failText = '支付失败，请检查后重试。'; //头部显示名字
			$scope.havePayShow = true;
			$scope.payState = '';
			//退出办理
			$scope.exit = function() {
				//跳转首页
				$state.go('home');
			};
			//我已支付
			$scope.havePay = function() {
				var params = {
					BusiCode: orderInfo.BusiCode,
					OrderNo: orderInfo.OrderNo,
					OrderDate: orderInfo.OrderNo.substr(4, 8)
				};
				failService.query(params, function(res) {
					if (res.STATUS === 'SUCCESS') { //订单成功
						$scope.payState = 'success';
						$interval(function() {
							// $state.go('zhyyt.rcOrderAccepted');
							window.location.href = orderInfo.NextUrl;
						}, 1000);
					} else { //订单发生错误
						$scope.failText = '支付未成功，请检查后再试'; //头部显示名字
						$scope.havePayShow = false;
					}
				});
			};

			//重新支付
			$scope.payAgain = function() {
				//跳转选择支付方式页
				$state.go(orderInfo.AgainUrl);
			};

		});
})();