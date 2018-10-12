(function() {
	'use strict';

	angular.module('zhyyt.result', [])
		.controller('resultController', function($scope, $state, $interval, commonService, $timeout) {
			var orderInfo = commonService.getState();
			$scope.resultText  = orderInfo.BusiCode==='02'?'已为您登记，发票开具完成后将为您发送至邮箱，谢谢。':'已成功发送，请注意查收。';
			//倒计时
			$scope.timer = 10;
			var timeOut;
			countDown();
			function countDown() {
				if ($scope.timer <= 0) {
					clearTimeout(timeOut);
					$state.go('home');
					return;
				}
				$scope.timer--;
				timeOut = $timeout(function() {
					countDown();
				}, 1000);

			}

			$scope.finish = function(){
				$timeout.cancel(timeOut);
				$state.go('home');
			}


		});
})();