"use strict";
define(['app'], function (app) {
	app.register.directive('mTableTick',['AtomicPath','aTable',function (aPath,aTable) {
		const DEFAULTS = {optionLabel:'name',autoBind:true};
		return {
			restrict: 'E',
			scope:{
				headers:"=",
				props:"=",
				data:"=",
				onTickSave:'&?'
			},
			templateUrl:function(elem,attr){
				return aPath.url('/view/molecule/mTableTick.html');
			},
			link: function($scope,elem, attrs) {
				$scope.TickItems = [];
				$scope.ToggleAll  =false;
				$scope.autoBind = $scope.autoBind || DEFAULTS.autoBind; 
				
			},
			controller:function($scope){
				$scope.$watchGroup(['headers','props','data','inputs'],function(){
					$scope.Headers =  aTable.colHeaders($scope.headers,$scope.props);
					console.log($scope.Headers);
					$scope.Props = $scope.props;
					$scope.Items = $scope.data;
					
					var firstRun = $scope.TickItems==undefined;

					$scope.TickItems =  angular.copy($scope.data);
					
					if(firstRun){
						setTimeout(function(){
							aTable.scroll($scope.elem,'top');
							aTable.stickyHeader($scope.elem);
						},300);
					}
				});
				$scope.toggleTick = function(index){
					if(index=='all') {
						var state = $scope.ToggleAll = !$scope.ToggleAll;
						for(var i in $scope.TickItems){
							$scope.TickItems[i].__tagged =state; 
						}
					}else{
						var state = !$scope.TickItems[index].__tagged;
						$scope.TickItems[index].__tagged = state;
					}
					
				}
				$scope.$watch('TickItems',function(items){
					if($scope.autoBind){
						if(aTable.isArrayEqual($scope.Items,$scope.TickItems) && $scope.Items!=undefined){
							return false;
						}
						else if($scope.Items){
								$scope.confirmTick();
						}
					}
				},true);
				$scope.confirmTick = function(){
					var items  = angular.copy($scope.TickItems);
					if($scope.onTickSave)
						$scope.onTickSave()(items);
				}

			}
		}
	}]);
});