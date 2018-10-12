(function () {
  'use strict';

  angular.module('home', [

  ])
    .controller('homeCtrl', function ($scope, $state, commonService) {
      var busiTypes = [,'入网开户','查询服务','充值缴费','业务办理','停/开机','补/换卡','密码服务','电子发票'];
       $scope.go = function(route, type){
        commonService.setState({
          BusiIndex: type,
          BusiType: busiTypes[Number(type)]
        })//取出来的state{BusiIndex: '01', BusiType: '入网开户'}
         $state.go(route);
         //  console.log($scope.master)
         if(type !== '01' && type !== '03' && type !== '06'){
            $state.go('zhyyt.login')
         }
       }
      
    });
})();
