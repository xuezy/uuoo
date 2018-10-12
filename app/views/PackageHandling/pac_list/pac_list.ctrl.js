(function () {
	'use strict';

	angular.module('zhyyt.pachandinglist', [])
		.controller('listCtrl', ['$scope', '$interval', '$rootScope', 'pachandinglistService', '$state', 'commonService', function ($scope, $interval, $rootScope, pachandinglistService, $state, commonService) {

			$rootScope.headerTitle = '套餐办理'; //头部显示名字
			$scope.packageIndex = 0;//选择的第几个套餐
			$scope.feeIndex = 0;//选择的第几个费用

			var userIDCard = commonService.getIDCardInfo();
			
			//$scope.phoneNumber = angular.fromJson(localStorage.getItem("phone"));
			//套餐列表
			function queryList() {
				var params = {
					'phone': '123',
					'bizName': '123',
					'bizCode': '123'
				};
				pachandinglistService.productslist(params, function (res) {
					if (res.retCode == '200') {
						$scope.alreadyPlan = res.data.alreadyPlanList[0];//初始套餐
						$scope.productslist = res.data.bizInfoList;//可选套餐列表
						$scope.product = res.data.bizInfoList[0].productName;//默认套餐
						$scope.productFee = res.data.bizInfoList[0].minCharges;//默认资费
						$scope.productDec = res.data.bizInfoList[0].productInfo;//默认套餐可选资费列表
					}
				})
			};
			queryList();

			//点击套餐
			$scope.sendone = function (index, es) {
				$scope.packageIndex = index;
				$scope.product = es.productName;//默认套餐
				$scope.productDec = es.productInfo;//默认套餐可选资费列表
				$scope.productFee = es.minCharges;//默认资费
				$scope.feeIndex = 0;//默认费用归零
			}
			//点击资费
			$scope.sendtwo = function (index, es) {
				$scope.feeIndex = index;//选择的第几个费用
				$scope.productFee = es.bizFee;
			};

			//立即办理
			//判断是否降档
			$scope.payment = function () {
				if (Number($scope.alreadyPlan.bizFee) > Number($scope.productFee)) {
					$scope.downshift = true;
				} else {
					$scope.changTC = true;
				}
			}

			//确认办理
			$scope.paymentSure = function () {
				$scope.userInfo = {
					name: userIDCard.name,
					idNumber: userIDCard.id,
					idType: '身份证',
					productName:$scope.product,
					phone: angular.fromJson(localStorage.getItem("phone"))
				};
	
				localStorage.setItem("userInfo", angular.toJson($scope.userInfo));
				var params = {
					'phone': $scope.userInfo.phone,
					'bizName': '123',
					'bizCode': '123',
					'name': userIDCard.name,
					'idNumber': userIDCard.id,
					'idType': '身份证',
					'productName':$scope.product
				};
				pachandinglistService.handlePlan(params, function (res) {
					if (res.retCode == '200') {
						$scope.product = res.data;
						localStorage.setItem("data", angular.toJson($scope.product));
						$state.go('zhyyt.pacAccepted');
					}
				});
			}
		}]);
})();