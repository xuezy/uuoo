(function() {
  'use strict';
  /**
   * 使用方法：
   * 注入模块 angular.module('angularTips', [])
   * 注入服务：tipService
   * JS code: tipService.setTip('success','修改成功'); info,success,warning
   */
  angular
    .module('angularTips', [])
    .service('tipService', tipService)
    .directive('comTips', comTips);

  /** @ngInject */
  function tipService() {
    var _that = this;
    _that.tipsObj = {tipContent:'',tipType:''}
    _that.setTip = function(tipType, tipContent) {
      _that.tipsObj.tipContent = tipContent || '';
      _that.tipsObj.tipType = tipType || '';
    }
  }

  /** @ngInject */
  function comTips($timeout, tipService) {
    var directive = {
      restrict: 'E',
      replace: true,
      scope: {},
      template: templateFn,
      link: linkFunc
    };

    return directive;

    function linkFunc(scope, el, attr, vm) {
      var watcher;
      var noticeMsgTimer;
      scope.tipsObj = tipService.tipsObj;
      //监听改变
      watcher = scope.$watch('tipsObj', function() {
        if (scope.tipsObj.tipType !== '') {
          if(noticeMsgTimer){
            $timeout.cancel(noticeMsgTimer);
          }
          noticeMsgTimer = $timeout(function () {
            scope.tipsObj.tipType = '';
            scope.tipsObj.tipContent = '';
          }, 2000);
        }
      }, true);
      scope.$on('$destroy', function () {
        watcher();
      });

    }
    
    function templateFn() {
      return '<div class="btn text-overflow" '
      + 'ng-class="{\'btn-info\': tipsObj.tipType==\'info\', \'btn-success\': tipsObj.tipType==\'success\', \'btn-warning\': tipsObj.tipType==\'warning\'}" '
      + 'style="width:20%;top:0;left:40%;position:fixed;z-index:10000;" ng-show="tipsObj.tipType !== undefined && tipType !== \'\'">{{tipsObj.tipContent}}</div>';
    }

  }

})();
