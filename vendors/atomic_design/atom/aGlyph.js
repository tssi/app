"use strict";
define(['app'], function (app) {
	app.register.directive('aGlyph',['AtomicPath',function (aPath) {
		return {
			restrict: 'E',
			scope:{
				aIcon:'@?icon',

			},
			replace:true,
			transclude: true,
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aGlyph.html');
			},
			link: function($scope, elem, attrs) {
				
			},
		};
	}]);
});