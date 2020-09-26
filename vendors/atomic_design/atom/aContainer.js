"use strict";
define(['app'], function (app) {
	app.register.directive('aContainer',['AtomicPath',function (aPath) {
		return {
			restrict: 'E',
			replace:true,
			transclude:true,
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aContainer.html');
			},
			link: function($scope,elem, attrs) {
				
			},
			controller:function($scope){
			}
		}
	}]);
});