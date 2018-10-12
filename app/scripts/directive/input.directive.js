(function() {
  'use strict';
  angular
    .module('zhyyt')
    .directive('input', input);

  /** @ngInject */
  function input() {
    var directive = {
      link: linkFunc
    };
    return directive;
    function linkFunc(scope, el, attr, vm) {
      el[0].onfocus = function(){
        document.activeElement.blur();
      };
    }

  }

})();
