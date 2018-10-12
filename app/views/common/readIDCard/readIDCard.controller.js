(function() {
  'use strict';

  angular.module('zhyyt.readIDCard', [])
    .controller('readIDCardCtrl', function($scope, $rootScope, $state, commonService, deviceServicer, $timeout, faceAndCardCheckServer) {
      var state = commonService.getState();
      //配置身份证读取状态,目前没用
      var status = {
        '200':'success', 
        '201':'fail', 
        '202':'overtime'
      };
      $rootScope.headerTitle = '身份校验'; //头部显示名字
        /*
         *  info 文字 
         *  head 头像
         *  retCode 返回码
         *  超时返回码 211003
         */

         //身份证返回参数
        /**
         * address: 住址
         * back: 身份证后面图片地址
         * birthday 生日
         * endData
         * fingerPrint
         * front
         * gender
         * head 头像
         * id 身份证号码
         * name 名字
         * nation 名族
         * office 签发机关
         * startDate
         */
        $timeout(function(){
          deviceServicer.devReadIDCard(function(res){
            var temp = JSON.parse(res);
            // $scope.resStatus = status[temp.retCode];
            if(temp.retCode === '200'){
              commonService.setIDCardInfo(temp.data);
              $timeout(function(){
                /*
                 * 这里根据home入口跳转对应页面
                 * 面部识别可用后直接跳转至面部识别
                 */
                state.BusiIndex === '01' && $state.go('zhyyt.readFace');
                state.BusiIndex === '06' && $state.go('zhyyt.readFace');
                // if(state.BusiIndex === '06'){
                //   faceAndCardCheckServer.bizcheck({
                //     ServiceType: '01', 
                //     ServiceNumber: '手机号码',
                //     CheckType: '1',
                //     CheckID: undefined
                //   }, function(res){
                //     if (res.retCode === '200') {
                //       $scope.checkResult = 'success';
                //       commonService.setState({
                //         Payment: res.data.money || '2', //补换卡费用
                //         Frequency: res.data.Frequency || '1' //办理次数
                //       });
                //       $state.go('zhyyt.authorize')
                //     }
                //     if (res.retCode === '201') {
                //       $scope.checkResult = 'fail';
                //     }
                //   });
                // }
                
              }, 1000)
            }else{
              alert(temp.msg);
            }
          });
          // if(state.BusiIndex === '06'){
          //   faceAndCardCheckServer.bizcheck({
          //     ServiceType: '01', 
          //     ServiceNumber: '手机号码',
          //     CheckType: '1',
          //     CheckID: undefined
          //   }, function(res){
          //     if (res.retCode === '200') {
          //       $scope.checkResult = 'success';
          //       commonService.setState({
          //         Payment: res.data.money || '2', //补换卡费用
          //         Frequency: res.data.Frequency || '1' //办理次数
          //       });
          //       $state.go('zhyyt.authorize')
          //     }
          //     if (res.retCode === '201') {
          //       $scope.checkResult = 'fail';
          //     }
          //   });
          // }
        }, 1000);

    });
})();