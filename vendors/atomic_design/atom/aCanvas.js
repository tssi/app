"use strict";
define(['app'], function (app) {
	app.register.directive('aCanvas',['AtomicPath',function (aPath) {
		return {
			restrict: 'E',
			replace:true,
			transclude:true,
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aCol.html');
			},
			link: function($scope,elem, attrs) {
				
			},
			controller:function($scope){
			}
		}
	}]);
});