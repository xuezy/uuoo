(function() {
	'use strict';
	//充值单据
	angular.module('zhyyt.takeCard', [])
		.controller('takeCardController', ["$scope", "$rootScope", "$state", "$interval", "commonService", function($scope, $rootScope, $state, $interval, commonService) {

			//发送至邮箱
			$scope.goEmail = function() {
				//跳转填写邮箱页
				$state.go('zhyyt.fillInEmail');
			};


			//完成
			$scope.complete = function() {
				//跳转回首页
				$state.go('home');
			};

			// $scope.takeC = function() {
			// 	window.resultFun = function(res) {
			// 		var temp = JSON.parse(res);
			// 		$scope.test1 = temp;
			// 		if (temp.retCode === '200') {
			// 			$scope.test1 = temp.data;
			// 		} else {
			// 			alert(temp.msg);
			// 		}
			// 	}
			// 	JSBridge.NativeCall('SimCard', 'moveCardPlace', {}, function(res) {
			// 		//alert(res);
			// 	});
			// };
			// $scope.takeC();

		}]);
})();