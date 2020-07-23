"use strict";
define(['app'], function (app) {
	app.register.directive('aSearchbox',['AtomicPath',function (aPath) {
		const DEFAULTS = {placeholder:['Search','Search...']};

		return {
			require:'ngModel',
			restrict: 'E',
			scope:{
				ObjModel:'=ngModel',
				onSearch:'&?',
				onClear:'&?'
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
					$scope.searchActive = false;
					if($scope.onClear)
						$scope.onClear()();
				}
				$scope.search = function(){
					$scope.searchActive = true;
					var keyword = $scope.ObjModel;
					if($scope.onSearch)
						$scope.onSearch()(keyword);
				}
			}
		}
	}]);
});