"use strict";
define(['app'], function (app) {
	app.register.directive('aPager',['AtomicPath',function (aPath) {
		return {
			restrict: 'E',
			scope:{
				meta:'=',
				onNavigate:'&'
			},
			replace:true,
			transclude:true,
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aPager.html');
			},
			link: function($scope,elem, attrs) {
				
			},
			controller:function($scope){
				
				$scope.$watch('meta',function(meta){
					if(!meta) return;
					
					$scope.NextPage = meta.next;
					$scope.PrevPage = meta.prev;
					$scope.TotalItems = meta.count;
					$scope.LastItem = meta.page * meta.limit;
					$scope.FirstItem = $scope.LastItem - (meta.limit - 1);
					$scope.LastPage = meta.last;
					if ($scope.LastItem > $scope.TotalItems){
						$scope.LastItem = $scope.TotalItems;
					};
				});
				$scope.navigatePage = function(page){
					$scope.onNavigate()(page);
				}
			}
		}
	}]);
});