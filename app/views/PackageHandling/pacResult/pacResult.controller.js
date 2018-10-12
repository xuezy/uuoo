(function() {
	'use strict';

	angular.module('zhyyt.pacResult', [])
		.controller('pacResultController', ['$scope', '$state','$interval','pacResultService','$rootScope',function($scope, $state,$interval,pacResultService,$rootScope) {
			$rootScope.headerTitle = '办理结果'; //头部显示名字
			// $scope.sendMail = function(){
		// 	pacResultService.sendmail(params,function(res){

		// 	});
		// 	$state.go('zhyyt.fillInEmail');
		// }

		

		}]);
})();