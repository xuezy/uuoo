(function() {
	'use strict';

	angular.module('zhyyt.swipingCard', [])
		.controller('swipingCardCtrl', ['$scope', '$interval', '$rootScope', '$state', function($scope, $interval, $rootScope, $state) {

			$rootScope.headerTitle = '刷卡支付'; //头部显示名字

			$scope.timer = 120;
			var timeout = $interval(function(){
              $scope.timer--;
              if($scope.time === 0){
              	$interval.cancel(timeout);
				$state.go('zhyyt.timeout');
				return;
              }
			}, 1000, 120)

			//取消支付
			$scope.payCancel = function() {
				$interval.cancel(timeout);
				$state.go('zhyyt.chargeFail');
			};

			//其他支付方式
			$scope.otherPay = function() {
				$interval.cancel(timeout);
				$state.go('zhyyt.payMian');
			};


		}]);
})();