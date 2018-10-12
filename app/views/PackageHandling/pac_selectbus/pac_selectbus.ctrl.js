(function () {
	'use strict';

	angular.module('zhyyt.pachanding', ['zhyyt.pachandinglist', 'zhyyt.pacAccepted', 'zhyyt.pacResult','zhyyt.pacEmail'])
		.controller('selectbusCtrl', ['$scope', '$interval', '$rootScope', "$state", 'pachandingService', function ($scope, $interval, $rootScope, $state, pachandingService) {

			$rootScope.headerTitle = '套餐办理'; //头部显示名字
			//语音指令
			$scope.messageAll = ['我要改套餐', '我要买流量', '国际漫游', '......'];
			var slide = document.getElementById("slide");
			var slide2 = document.getElementById("slide2");
			var slide1 = document.getElementById("slide1");
			slide2.innerHTML = slide1.innerHTML
			$scope.Marquee = function () {
				if (slide2.offsetTop - slide.scrollTop <= 0)
					slide.scrollTop -= slide1.offsetHeight
				else {
					slide.scrollTop++
				}
			};
			setInterval($scope.Marquee, 100);
			//获取业务列表
			function queryList() {
				pachandingService.getPachanding(function (res) {
					if (res.retCode === '200') {
						$scope.serviceList = res.data;
					};
				})
			};
			queryList();

			$scope.serveName = function (es) {
				$state.go('zhyyt.pachandinglist');
				// if (es.bizCode == '001') {
				// 	//判断业务类型
					
				// }
			};

		}]);
})();