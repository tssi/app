"use strict";
define(['app'], function (app) {
	app.register.directive('aTable',['AtomicPath',function (aPath) {
		return {
			restrict: 'E',
			scope:{
				headers:"=",
				props:"=",
				data:"=",
				onRowClick:'&?'
			},
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aTable.html');
			},
			link: function($scope,elem, attrs) {
				console.log($scope);
				$scope.Headers =  $scope.headers;
				$scope.Props = $scope.props;
				$scope.Items = $scope.data;
			},
			controller:function($scope){
				$scope.rowClicked = function(item){
					var item  = angular.copy(item);
					$scope.onRowClick()(item);
				}
			}
		}
	}]);
});