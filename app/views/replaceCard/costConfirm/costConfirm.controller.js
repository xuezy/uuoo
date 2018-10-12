(function() {
	'use strict';
	//充值单据
	angular.module('zhyyt.costConfirm', [])
		.controller('costConfirmCtrl', ["$scope", "$state","commonService","$rootScope", function($scope, $state, commonService,$rootScope) {
	    var state = commonService.getState();  
        var orderNo = commonService.getOrderNo();
        $rootScope.headerTitle = '费用确认'; //头部显示名字
        $scope.isFirst = Number(state.Frequency) == 0;
        $scope.param = {
            'BusiCode': '01',
            'BusiType': state.BusiType,
            'OrderMoney': state.Payment,
            'Payment': state.Payment,
            'PayGift': '0',
            'OrderNo': orderNo,
            'OrderDate': orderNo.substr(4, 8),
            'IDValue': state.IDValue,
            'NextUrl': location.origin+commonService.urlFix+ '/#/zhyyt/rcOrderAccepted'
        };

        $scope.ok = function(){
            commonService.setState($scope.param);
            $state.go('zhyyt.payMian');
        }

        $scope.cancel = function(){
           $state.go('home');
        }
	}]);
})();