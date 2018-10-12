(function () {
    'use strict';
  

    angular.module('zhyyt.pacAccepted')
      .factory('pacAcceptedService', pacAcceptedService);
  
    function pacAcceptedService(Restangular, $http) {
      return {
        signNameBF: signNameBF,
        startSign:startSign
      };
  
      function signNameBF(params,callback) {
        Restangular.all('/AIBizHall/rest/bizs/subSign').post(params).then(callback);
      }

      //签名
		function startSign(){
			JSBridge.NativeCall('Signature','signAction',{"Time":"30","startX":"200","endX":"1000","startY":"200","endY":"800"},function(res){
        console.log(res);
        });
        }
  
    }
  
  })();
  