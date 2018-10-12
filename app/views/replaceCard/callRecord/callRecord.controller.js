(function() {
  'use strict';

  angular.module('zhyyt.callRecord', [])
    .controller('callRecordCtrl', function($scope, $rootScope, $state, commonService, deviceServicer, faceAndCardCheckServer, repairCard) {
      var state = commonService.getState();
    //点击键盘输入
      $scope.typeIn = function (value) {
        var model;
        if(!$scope.inputFocus){
          return;
        }
        model = $scope.inputFocus;
        if (value === 'clear') {
          $scope[model] = ''
          return;
        }
        if (value === 'backspace') {
          $scope[model] = $scope[model].substr(0, $scope[model].length - 1)
          return;
        }
        if (!$scope[model]){
           $scope[model] = ''+value;
           return;
        } 
        if($scope[model].length < 13) {
          $scope[model] += '' + value;
          return;
        }
        console.log(model, $scope[model]);
      };

      $scope.goBack = function(){
        $state.go('zhyyt.authorize');
      }

      $scope.goNext = function(){
        $scope.checkResult = 'underway';
        repairCard.checkCallRecord({
          phone: state.IDValue,
          callRecord: $scope.phone1+'|'+$scope.phone2+'|'+$scope.phone3+'|'+$scope.phone4+'|'+$scope.phone5
        }, function(res){
          if(res.retCode === '200'){
            faceAndCardCheckServer.bizcheck({
              ServiceType: '01', 
              ServiceNumber: state.IDValue,
              CheckType: '1',
              CheckID: undefined
            }, function(res){
              if(res.retCode === '200'){
                $scope.checkResult = 'success';
                commonService.setState({
                  Payment: res.data.money || '2', //补换卡费用
                  Frequency: res.data.Frequency || '1' //办理次数
                });
                $state.go('zhyyt.costConfirm');
              }
              if(res.retCode === '201'){
                $scope.checkResult = 'fail';
              }
            });
          }
        });
        
      }

    });
})();