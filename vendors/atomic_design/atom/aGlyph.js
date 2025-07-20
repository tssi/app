"use strict";
define(['app'], function (app) {
	app.register.directive('aGlyph',['AtomicPath',function (aPath) {
		return {
			restrict: 'E',
			scope:{
				aIcon:'@?icon',

			},
			transclude: true,
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aGlyph.html');
			},
			link: function($scope, elem, attrs) {
				
				$scope.$watch('aIcon',function(icon){
					$scope.iconType ='glyphicon';
					if(/^fa\-/.test(icon))
						$scope.iconType = 'font-awesome';
					
				});
			},
		};
	}]);
});