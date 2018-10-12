(function() {
	'use strict';

angular.module('zhyyt.recharge')
.directive('audioAnimation', function () {
      var template = '<div class="animationDiv">'+
             '<span class="line1"></span>'+
             '<span class="line2"></span>'+
             '<span class="line3"></span>'+
             '<span class="line4"></span>'+
             '<span class="line5"></span>'+
             '<span class="line4"></span>'+
             '<span class="line3"></span>'+
             '<span class="line2"></span>'+
             '<span class="line1"></span>'+
             '<span class="line2"></span>'+
             '<span class="line3"></span>'+
             '<span class="line4"></span>'+
             '<span class="line5"></span>'+
             '<span class="line4"></span>'+
             '<span class="line3"></span>'+
             '<span class="line2"></span>'+
             '<span class="line1"></span>'+
             '<span class="line2"></span>'+
             '<span class="line3"></span>'+
             '<span class="line4"></span>'+
             '<span class="line5"></span>'+
             '<span class="line4"></span>'+
             '<span class="line3"></span>'+
             '<span class="line2"></span>'+
             '<span class="line1"></span>'+
             '</div>';
	return {
		restrict: 'E',
		template: template,
		replace: true
	};
})

})();