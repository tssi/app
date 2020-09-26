"use strict";
define(['app'], function (app) {
	app.register.directive('aCanvas',['AtomicPath',function (aPath) {
		return {
			restrict: 'E',
			scope:{
				OptClass:'@?optClass'
			},
			replace:true,
			transclude:true,
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aCanvas.html');
			},
			link: function($scope,elem, attrs) {
				
			},
			controller:function($scope){
			}
		}
	}]);
});