/**
 * 制卡页面controller
 */
(function() {
  'use strict';

  angular.module('zhyyt')
    .controller('makingCardCtrl', function($scope, $rootScope, $state, makingCardServicer, deviceServicer, $timeout, choiceNumServicer, openAccountService) {
      $rootScope.headerTitle = '业务受理单'; //头部显示名字


      //客户资料 手机号，身份证信息

      //业务受理内容 受理日期，受理网点，订单号，产品类型，业务类型，
      //优惠费用，实收费用，支付方式，鉴权方式，付费模式，sim卡，4G主资费套餐，套餐说明

      $scope.makeC = function(){
        deviceServicer.devMakeCard({}, function(res){
          // alert('调用制卡');
          var temp = JSON.parse(res)
					if(temp.retCode === '200'){
            $scope.getSimData();
					}else{
						alert(temp.msg);
					}
				});
      }
      setTimeout(function() {
        $scope.makeC();
      }, 1000);
      

      //获取sim卡写卡数据
      $scope.getSimData = function(){
        makingCardServicer.getSimData({
          billId: '123',
          sn: '7617829031sn',
          operCode: 'oc8888888'
        },function(res){
          console.log(res);
          if(res.retCode === '200'){
            $scope.activeSim(res.data);
          }
        });
      };

      //激活sim卡
      $scope.activeSim = function(){
        makingCardServicer.activeSim({
          billId: '123',
          sn: '7617829031sn',
          operCode: 'oc8888888'
        },function(res){
          console.log('激活sim',res);
          $timeout(function(){$state.go('zhyyt.takeCard');},3000);
        });
      }

    });
})();