"use strict";
define(['app'], function (app) {
	app.register.directive('aSearchbox',['AtomicPath',function (aPath) {
		const DEFAULTS = {prefix:'',type:'text',size:''};

		return {
			require:'ngModel',
			restrict: 'E',
			scope:{
				aTextboxModel:'=ngModel',
			},
			transclude: false,
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aSearchbox.html');
			},
			link: function($scope, elem, attrs,ngModel) {
				
			},
			controller:function($scope){
			}
		}
	}]);
});