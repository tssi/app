"use strict";
define(['app'], function (app) {
	app.register.directive('aTable',['AtomicPath',function (aPath) {
		return {
			require:'ngModel',
			restrict: 'E',
			scope:{
				headers:"=",
				props:"=",
				data:"=",
				activeItem:'=ngModel',
				onRowClick:'&?'
			},
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aTable.html');
			},
			link: function($scope,elem, attrs) {
				
			},
			controller:function($scope){
				$scope.$watchGroup(['headers','props','data'],function(){
					$scope.Headers =  $scope.headers;
					$scope.Props = $scope.props;
					$scope.Items = $scope.data;
					$scope.activeItem = {};
				});
				$scope.$watch('activeItem',function(item){
					console.log(item);
				});
				$scope.setActiveItem = function(item){
					$scope.activeItem  = item;
					var item  = angular.copy(item);
					$scope.onRowClick()(item);
				}
			}
		}
	}]);
});