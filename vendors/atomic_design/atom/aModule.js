"use strict";
define(['app'], function (app) {
	app.register.directive('aModule',['AtomicPath',function (aPath) {
		return {
			restrict: 'E',
			replace:true,
			transclude:true,
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aModule.html');
			},
			controller:false
		}
	}]);
});