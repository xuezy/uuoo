/**
 * 头
 */
(function () {
  'use strict';

  /**
   * @description
   * # Header页面
   */
  angular.module('zhyyt').controller('LayoutHeaderCtrl', function ($rootScope, $scope, layoutHeaderService) {
    // $scope.svnUrlPrefix = CORE_VALUE.svnUrlPrefix;
    // $rootScope.headerTitle = '123';

    // $rootScope.$on('update', function (event, navName) {
    //   $timeout(function(){
    //     $scope.navNameData.navName = navName;
    //   },100);
    // });
    
    // $scope.init = function() {
    //   $scope.changeHeaderApp($scope.app);
    // }
 
    //退出当前用户账号，返回登录界面
    $scope.backToLoginPage = function () {
      
    }
    

  });

  angular.module('zhyyt').service('layoutHeaderService', function ($http, $rootScope) {
    //对接后台获取数据
    return {
      queryUserRoleAndOperType: queryUserRoleAndOperType,
    }
    
    //取正在登陆的用户信息
    function queryUserRoleAndOperType(params, successCallback, failCallback) {
      $http({
        url: '/paas/permission/queryUserRoleAndOperType.action',
        method: 'GET',
        data: params
      }).success(successCallback).error(failCallback);
    }
    

  });

  angular.module('zhyyt').directive('layoutHeader', function (CORE_VALUE) {
    return {
      restrict: 'EA',
      scope: {
        headerTitle: "="
      },
      templateUrl: CORE_VALUE.pageUrlPrefix + 'views/layout/_header.html',
      controller: 'LayoutHeaderCtrl'
    };
  });

})();
