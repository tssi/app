"use strict";
define(['app'], function (app) {
	app.register.directive('aTextbox',['AtomicPath',function (aPath) {
		const DEFAULTS = {prefix:'',type:'text',size:''};

		return {
			require:'ngModel',
			restrict: 'E',
			scope:{
				aTextboxModel:'=ngModel',
				isDisabled:'=?ngDisabled',
				aPlaceholder:'=?placeholder'
			},
			transclude: false,
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aTextbox.html');
			},
			link: function($scope, elem, attrs,ngModel) {
				
			},
			controller:function($scope){
			}
		}
	}]);
});