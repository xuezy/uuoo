(function() {
	'use strict';

	angular.module('zhyyt.invoiceShow', [])
		.controller('invoiceShowController', function($scope, $rootScope, $state, $interval, commonService, invoiceShowService) {
			var orderInfo = commonService.getState();
			$rootScope.headerTitle = ''; //头部显示名字
			$scope.payState = '';
			//返回
			$scope.return = function() {
				//返回支付成功
				$state.go('zhyyt.chargeSuccess');
			};

			//打印
			$scope.print = function() {
				$scope.payState = 'underway';
				invoiceShowService.confirm(param, function(res) {
					if (res.resMsg === 'Success!') {
						$scope.payState = 'underway';
						$interval(function() {
							$scope.payState = '';
						}, 3000);
					}
				});

			};

			//发送至邮箱
			$scope.goEmail = function() {
				$state.go('zhyyt.fillInEmail');
			};

		});
})();