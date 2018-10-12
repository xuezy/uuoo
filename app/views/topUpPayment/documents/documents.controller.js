(function() {
	'use strict';
	//充值单据
	angular.module('zhyyt.documents', [])
		.controller('documentsController', ["$scope", "$rootScope", "$state", "$interval", "commonService", "deviceServicer","openAccountService", function($scope, $rootScope, $state, $interval, commonService, deviceServicer,openAccountService) {
			var userIDCard = commonService.getIDCardInfo();

			$scope.basicInfo = {
				phone: openAccountService.openAccountInfo.number,
				name: userIDCard.name,
				id: userIDCard.id,
			};
			var orderInfo = commonService.getState();
			$rootScope.headerTitle = '充值单据'; //头部显示名字
			$scope.param = {
				"payDate": orderInfo.HandleTime,
				"payWebsite": "福田区分公司国通智慧营业厅",
				"orderId": orderInfo.OrderNo,
				"payPhone": orderInfo.IDValue,
				"price": orderInfo.OrderMoney,
				"realPrice": orderInfo.OrderMoney,
				"payNum": orderInfo.Payment,
				"payType": orderInfo.payType
			};
			$scope.payState = '';
			//点击打印
			$scope.print = function() {
				$scope.payState = 'underway';
				//打印
				deviceServicer.devPrintInvoice($scope.param , function(res) {
					var temp = JSON.parse(res);
					if (temp.retCode === '200') {
						$scope.payState = 'success';
						countDown();

					}
				});
			};

			//倒计时
			$scope.timer = 10;
			var timeOut;

			function countDown() {
				if ($scope.timer <= 0) {
					clearTimeout(timeOut);
					$state.go('home');
					return;
				}
				$scope.timer--;
				$interval($scope.timer);
				timeOut = setTimeout(function() {
					countDown();
				}, 1000);

			}
		}]);
})();