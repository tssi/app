"use strict";
define(['app'], function (app) {
	app.register.directive('aLabel',['AtomicPath',function (aPath) {
		const DEFAULTS = {prefix:''};

		return {
			restrict: 'E',
			scope:{
				aLabelFor:'=aFor',
				
			},
			transclude: true,
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aLabel.html');
			},
			link: function($scope, elem, attrs,ngModel) {
				
			},
			controller:function($scope){
			}
		}
	}]);
});