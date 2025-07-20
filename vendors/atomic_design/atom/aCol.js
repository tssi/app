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
				pull:'@?'
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
				$scope.hAlign="";
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
				switch($scope.pull){
					case 'left':
						$scope.hAlign+=' pull-left';
					break;
					case 'right':
						$scope.hAlign+=' pull-right';
					break;
					
				}
			}
		}
	}]);
});