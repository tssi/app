"use strict";
define(['app'], function (app) {
	app.register.directive('aHeader',['AtomicPath',function (aPath) {
		return {
			restrict: 'E',
			scope:{
				isMain:'=',
			},
			replace:true,
			transclude:true,
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aHeader.html');
			},
			link: function($scope,elem, attrs) {
				
			},
			controller:function($scope){
			}
		}
	}]);
});