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
				searchBy:'=',
				searchWord:'=',
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
					$scope.activeItem = item;
				});
				$scope.setActiveItem = function(item){
					$scope.activeItem  = item;
					var item  = angular.copy(item);
					$scope.onRowClick()(item);
				}
				$scope.$watch('searchWord',function(){
					$scope.searchFilter={};
					for(var i in  $scope.searchBy){
						var field = $scope.searchBy[i];
						$scope.searchFilter[field]=$scope.searchWord;
					}
				});
				$scope.UIItems = [];
				$scope.searchLocal = function(item){
					var isMatched = !$scope.searchWord;
					if($scope.searchWord){
						var SWORD = $scope.searchWord.toUpperCase();
						for(var i in  $scope.searchBy){
							var field = $scope.searchBy[i];
							if(item[field])
								isMatched = isMatched || item[field].toUpperCase().includes(SWORD);
						}
					}
					return isMatched;
				}
			}
		}
	}]);
});