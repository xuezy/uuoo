(function() {
	'use strict';

	angular.module('zhyyt.timeout', [])
		.controller('timeoutController', function($scope, $rootScope, $state, commonService) {
			var orderInfo = commonService.getState();
			$rootScope.headerTitle = ''; //头部显示名字

			//退出办理
			$scope.exit = function() {
				//跳转首页
				$state.go('home');
			};

			//重新选号
			$scope.payAgain = function() {
				//跳转选号页面
				$state.go(orderInfo.AgainUrl);
			};

		});
})();