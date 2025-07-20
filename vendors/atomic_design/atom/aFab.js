"use strict";
define(['app'], function (app) {
	app.register.directive('aFab',['AtomicPath',function (aPath) {
		const DEFAULTS = {prefix:'btn-',position:'top right',icon:'plus'};

		return {
			restrict: 'E',
			scope:{
				position:'@?',
				icon:'@?'
			},
			replace:true,
			transclude: true,
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aFab.html');
			},
			link: function($scope, elem, attrs) {
				$scope.position = DEFAULTS.position;
				$scope.icon = DEFAULTS.icon;
			},
			controller:function($scope){

				var position = $scope.position||DEFAULTS.position;
				var icon = $scope.icon||DEFAULTS.icon;
				$scope.aPosition = position;
				$scope.aIcon = icon;

			}
		}
	}]);
});