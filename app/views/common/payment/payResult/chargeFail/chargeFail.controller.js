(function() {
	'use strict';

	angular.module('zhyyt.chargeFail', [])
		.controller('chargeFailController', function($scope, $rootScope, $state, $interval, chargeFailService, commonService) {
			var orderInfo = commonService.getState();
			$rootScope.headerTitle = ''; //头部显示名字
			$scope.havePayShow = true;
			$scope.failText  ='请稍候重试，或联系工作人员，谢谢。';
			$scope.open = false;
			$scope.payState = '';

			//退出办理
			$scope.exit = function() {
				//跳转回首页
				$state.go('home');
				
			};



			//我已支付
			$scope.havePay = function(){
				var params = {
					BusiCode: orderInfo.BusiCode,
					OrderNo: orderInfo.OrderNo,
					OrderDate: orderInfo.OrderNo.substr(4, 8)
				};
				chargeFailService.query(params, function(res) {
					if (res.STATUS === 'SUCCESS') { //订单成功
						$state.go('zhyyt.chargeSuccess');
					} else { //订单发生错误
						$scope.havePayShow = false;
						$scope.failText  ='支付未成功，请检查后再试。';
					} 
				});
			};

			//重新支付
			$scope.payAgain = function() {
				//返回选择支付方式页
				$state.go('zhyyt.payMian');
			};


		});
})();