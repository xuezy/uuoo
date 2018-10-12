(function() {
	'use strict';

	angular.module('zhyyt.chargeSuccess', [])
		.controller('chargeSuccessController', function($scope, $rootScope, $state, $interval, commonService,chargeSuccessService) {
			var orderInfo = commonService.getState();
			$scope.payState = '';
			$rootScope.headerTitle = ''; //头部显示名字
			$scope.open = false;
			$scope.param = {
				PhoneNum: orderInfo.IDValue,
				ChargeMoney: orderInfo.ChargeMoney
			};

			//打印凭证
			$scope.credentials = function() {
				$state.go('zhyyt.documents');
			};

			//开具发票
			$scope.invoice = function() {
				$scope.payState = 'underway';
				var params = {
					
				};
				chargeSuccessService.ticket(params, function(res) {
					$scope.payState = '';
					if (res.msg === 'SUCCESS') {
						$state.go('zhyyt.invoiceShow');
					}

				});


			};

			//无需票据，完成
			$scope.complete = function() {
				//跳转回首页
				$state.go('home');
			};

		});
})();