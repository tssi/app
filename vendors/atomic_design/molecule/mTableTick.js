"use strict";
define(['app'], function (app) {
	app.register.directive('mTableTick',['AtomicPath',function (aPath) {
		return {
			restrict: 'E',
			scope:{
				headers:"=",
				props:"=",
				data:"=",
			},
			templateUrl:function(elem,attr){
				return aPath.url('/view/molecule/mTableTick.html');
			},
			link: function($scope,elem, attrs) {
				$scope.TickList= [];
				$scope.ToggleAll  =false;
				
			},
			controller:function($scope){
				$scope.$watchGroup(['headers','props','data'],function(){
					$scope.Headers =  $scope.headers;
					$scope.Props = $scope.props;
					$scope.TickList = [];
					var colClass ="";
					if(typeof $scope.Headers[0]=="string"){
						var propsLen = $scope.props.length;
						if(propsLen<5){
							var size= (12/propsLen)
							colClass = ' col-md-'+size+' col-sm-'+size;
						}
					}

					angular.forEach($scope.Headers, function(hdr,i){
						if(typeof hdr == 'string'){
							hdr = {label:hdr,class:colClass};
						}
						
						$scope.Headers[i] = hdr;
					});

					$scope.Items = $scope.data;
				});
				$scope.toggleTick = function(index){
					if(index=='all') {
						var state = $scope.ToggleAll = !$scope.ToggleAll;
						for(var i in $scope.Items){
							$scope.TickList[i]=state;
							$scope.Items[i].__tagged =state; 
						}
					}else{
						var state = !$scope.TickList[index];
						$scope.TickList[index] = state; 	
						$scope.Items[i].__tagged = state;
					}
					
					
				}

			}
		}
	}]);
});