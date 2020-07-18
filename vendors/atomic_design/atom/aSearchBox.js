"use strict";
define(['app'], function (app) {
	app.register.directive('aSearchbox',['AtomicPath',function (aPath) {
		const DEFAULTS = {placeholder:['Search','Search...']};

		return {
			require:'ngModel',
			restrict: 'E',
			scope:{
				ObjModel:'=ngModel',
			},
			replace:true,
			transclude: false,
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aSearchbox.html');
			},
			link: function($scope, elem, attrs,ngModel) {
				$scope.Placeholder = $scope.Placeholder|| DEFAULTS.placeholder;
			},
			controller:function($scope){
				$scope.clear = function(){
					$scope.ObjModel=null;
					$scope.ShowBtn =null;
				}
			}
		}
	}]);
});