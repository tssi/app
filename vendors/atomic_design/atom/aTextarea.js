"use strict";
define(['app'], function (app) {
	app.register.directive('aTextarea',['AtomicPath',function (aPath) {
		const DEFAULTS = {prefix:'',type:'text',size:''};

		return {
			require:'ngModel',
			restrict: 'E',
			scope:{
				aTextboxModel:'=ngModel',
				isDisabled:'=?ngDisabled',
				aPlaceholder:'=?placeholder',
				aSize:'=?size',
				aRequired:'=?required'
			},
			transclude: false,
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aTextarea.html');
			},
			link: function($scope, elem, attrs,ngModel) {
				
				
			},
			controller:function($scope){
			}
		}
	}]);
});