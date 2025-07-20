"use strict";
define(['app'], function (app) {
	app.register.directive('aContent',['AtomicPath',function (aPath) {
		return {
			restrict: 'E',
			scope:{
				OptClass:'@?optClass'
			},
			replace:true,
			transclude:true,
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aContent.html');
			},
			link: function($scope,elem, attrs) {
				
			},
			controller:function($scope){
			}
		}
	}]);
});