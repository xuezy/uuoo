(function() {
	'use strict';

	angular.module('zhyyt.pacEmail', [])
		.controller('pacEmailController', function($scope, $rootScope, $state, $interval, commonService, pacEmailService) {
			var orderInfo = commonService.getState();
			$rootScope.headerTitle = ''; //头部显示名字
			$rootScope.corretEmail = true;
			$scope.left = true;
			$scope.right = false;
			$scope.emailLeft = '';
			$scope.emailRight = '';
			$scope.$watch('left', function(nv, ov) {
				if (nv === '') {
					corretEmails();
				}
				if ($scope.left) {
					$("#emailLeft").css("border", "2px solid #BFEFFF");
				} else {
					$("#emailLeft").css("border", "2px solid #F2F2F2");
				}
			});
			$scope.$watch('right', function(nv, ov) {
				if (nv === '') {
					corretEmails();
				}
				if ($scope.right) {
					$("#emailRight").css("border", "2px solid #BFEFFF");
				} else {
					$("#emailRight").css("border", "2px solid #F2F2F2");
				}
			});
			
			$scope.$watch('emailRight', function(nv, ov) {
				if (!nv || nv === ov) {
					return;
				}
				if ($scope.emailLeft !== '' && $scope.emailRight !== '') {
					corretEmails();
				}
			});
			//邮箱校验
			var corretEmails = function() {
				var reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
				$rootScope.corretEmail = $scope.emailLeft !== '' && reg.test($scope.emailLeft + '@' + $scope.emailRight);
				if ($rootScope.corretEmail) {
					$("#emailRight").css("border", "2px solid #F2F2F2");
				} else {
					$("#emailRight").css("border", "2px solid red");
				}
			};

			//返回
			$scope.return = function() {
				//返回业务受理单页
				$state.go('zhyyt.pacAccepted');
			};

			//完成
			$scope.complete = function() {
				if (!$rootScope.corretEmail) {
					return;
				}
				var param = {
					"email": $scope.emailLeft + '@' + $scope.emailRight,
					// phone: orderInfo.user.phone,
					// poductCode: orderInfo.orderId
					//phone:'13123232132',
					//poductCode:'DDBH2018091300001'
				};

				pacEmailService.sendEmail(param, function(res) {
					if (res.retCode === '200') {
						$state.go('zhyyt.result');
					}
				});
			};

			$scope.typeIn = function(value) {
				var model;
				if ($scope.left) {
					model = 'emailLeft';
				} else if ($scope.right) {
					model = 'emailRight';
				} else {
					return;
				}
				if (value === 'clear') {
					$scope[model] = '';
					return;
				}
				if (value === 'backspace') {
					$scope[model] = $scope[model].substr(0, $scope[model].length - 1);
					return;
				}
				if (model === 'emailLeft') {
					$scope[model] += '' + value;
					return;
				}
				if (model === 'emailRight') {
					$scope[model] += '' + value;
				}
			};

		});
})();