"use strict";
define(['app'], function (app) {
	app.register.directive('aCol',['AtomicPath',function (aPath) {
		const DEFAULTS = {prefix:'col-md-',size:'12'};
		return {
			restrict: 'E',
			scope:{
				size:'=?',
				offset:'=?',
				align:'@?',
			},
			replace:true,
			transclude:true,
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aCol.html');
			},
			link: function($scope,elem, attrs) {
				$scope.prefix= DEFAULTS.prefix;
				$scope.size = $scope.size || DEFAULTS.size; 
				
				
			},
			controller:function($scope){
				switch($scope.align){
					case 'left':
						$scope.hAlign='text-left';
					break;
					case 'right':
						$scope.hAlign='text-right';
					break;
					case 'center':
						$scope.hAlign='text-center';
					break;
				}
			}
		}
	}]);
});