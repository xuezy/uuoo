(function() {
	'use strict';

	angular.module('zhyyt.payMian', [])
		.controller('payMianController', function($scope, $rootScope, $state, $interval,payMianService, commonService, $filter) {
            var orderInfo = commonService.getState();
            var orderNoHead = '0089';
            
			$rootScope.headerTitle = '支付'; //头部显示名字
			$scope.open = false;
			$scope.typeShow = '';
			$scope.param = {
				BusiCode: orderInfo.BusiCode || '01',
				BusiType: orderInfo.BusiType || '开网入户',
				OrderMoney: orderInfo.OrderMoney || 100,
				Payment: orderInfo.Payment || 100,
				ChargeMoney: orderInfo.ChargeMoney,
				PayGift: orderInfo.PayGift || 0,
				IDValue: orderInfo.IDValue,
				OrderNo: orderInfo.OrderNo,
				ProductName: orderInfo.ProductName || '纯支付',
				AccountMoney: 100,
				ChargeGift: 100,
				PhoneNum: 100,
				HandleTime: orderInfo.OrderDate,
				NextUrl :orderInfo.NextUrl || "http://192.168.127.111/next.html?session=HNJKDO93423JKLJSLDF8",
				AgainUrl :orderInfo.AgainUrl ||"http://192.168.127.111/main.html"
			};


			$scope.generatorOrderNo = function(){
		    	var random ='';
		    	var now = new Date();
		    	var milliseconds = now.getMilliseconds()+'';
		    	while(milliseconds.length < 3){
		    		milliseconds = '0' + milliseconds;
		    	}
		    	for(var i = 0; i < 11; i++){
		    		random += Math.floor(Math.random()*10);
		    	}
		    	return orderNoHead + $filter('date')(now, 'yyyyMMddHHmmss')+ milliseconds+ random;
		    }

			if($scope.param.BusiCode === '02'){
				$scope.param.OrderNo = $scope.generatorOrderNo();
				$scope.param.ProductName = '缴费充值';
				$scope.param.HandleTime = $scope.param.OrderNo.substr(4,8);
			}
			//取消支付
			$scope.payCancel = function() {
				clearTimeout(timeOut);
				
				//跳转首页
				$state.go('home');
			};

			//确认支付
			$scope.paySubmit = function() {
				
				commonService.setState($scope.param);
				clearTimeout(timeOut);
				if($scope.param.BusiCode === '02'){
				    /*将支付传到后端的金额放大100*/
					var param = {
					   BusiCode: $scope.param.BusiCode,
				       BusiType: $scope.param.BusiType,
				       OrderMoney: Number($scope.param.OrderMoney)*100,
				       Payment: Number($scope.param.Payment)*100,
				       ChargeMoney: Number($scope.param.ChargeMoney)*100,
				       PayGift: Number($scope.param.PayGift)*100,
				       IDValue: $scope.param.IDValue,
				       OrderNo: $scope.param.OrderNo,
				       ProductName: $scope.param.ProductName,
				       AccountMoney: Number($scope.param.AccountMoney)*100,
				       ChargeGift: Number($scope.param.ChargeGift)*100,
				       PhoneNum: $scope.param.PhoneNum,
				       HandleTime: $scope.param.HandleTime,
				       NextUrl : $scope.param.NextUrl,
				       AgainUrl : $scope.param.AgainUrl
				    }
				    commonService.setState($scope.param);
			        payMianService.genpaycharge(param,function(res){
			    	});
			    }
				if ($scope.typeShow === 'weixin') {
					commonService.setState({payType: '微信支付'});
					$state.go('zhyyt.weixin');
				} else if ($scope.typeShow === 'alipay') {
					commonService.setState({payType: '支付宝支付'});
					$state.go('zhyyt.alipay');
				}else if ($scope.typeShow === 'cmpay') {
					commonService.setState({payType: '和包支付'});
					$state.go('zhyyt.cmpay');
				}else if ($scope.typeShow === 'unionpay') {
					commonService.setState({payType: '云闪付'});
					$state.go('zhyyt.unionpay');
				}else if ($scope.typeShow === 'cash') {
					commonService.setState({payType: '现金支付'});
					$state.go('zhyyt.payCash',{
						orderId: $scope.param.OrderNo,//订单号
						phoneNumber: $scope.param.IDValue,//手机号码
						totalAmount: $scope.param.ChargeMoney//总金额
					});
				} else if ($scope.typeShow === 'swipingCard') {
					commonService.setState({payType: '刷卡'});
					$state.go('zhyyt.swipingCard');
				}
			};

			//选择支付方式
			$scope.setPayType = function(type) {
				$('.board-name').each(function() {
					$(this).removeClass("board-nameHover");
				});
				$('#' + type + '-bg').addClass("board-nameHover");
				$scope.typeShow = type;
				if($scope.param.BusiCode === '02'){
			    	$scope.param.OrderNo = $scope.generatorOrderNo()
				}
			};

			//倒计时
			$scope.timer = 120;
			var timeOut;
			countDown();

			function countDown() {
				if ($scope.timer <= 0) {
					clearTimeout(timeOut);
					$state.go('zhyyt.timeout');
					return;
				}
				$scope.timer--;
				$interval($scope.timer);
				timeOut = setTimeout(function() {
					countDown();
				}, 1000);

			}
		});
})();