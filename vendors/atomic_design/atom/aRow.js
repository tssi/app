"use strict";
define(['app'], function (app) {
	app.register.directive('aRow',['AtomicPath',function (aPath) {
		return {
			restrict: 'E',
			scope:{
				isFluid:'='
			},
			replace:true,
			transclude:true,
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aRow.html');
			},
			link: function($scope,elem, attrs) {

			},
			controller:function($scope){
			}
		}
	}]);
});