"use strict";
define(['app'], function (app) {
	app.register.directive('oEspFilter',['$rootScope','Atomic','AtomicPath',function ($rootScope,atomic,aPath) {
		return{
			restrict: 'E',
			require:"ngModel",
			scope:{
				SelectedESP:'=ngModel',
				liveUpdate:'=?'
			},
			transclude:false,
			templateUrl:function(elem,attr){
				return aPath.url('/view/organism/oEspFilter.html');
			},
			link: function($scope,elem, attrs) {

				function bindData(){
					$scope._APP =  $rootScope._APP;
					var active = {
									dept:atomic.ActiveDept,
									sy:atomic.ActiveSY,
									sem:atomic.SelectedSem,
									period:atomic.SelectedPeriod
								};
					
					if(active.period){
						if(active.period.id>4)
							active.period.id = active.period.id/10;
						active.esp =  parseFloat(active.sy+'.'+active.period.id);
					}
					
					$scope.SelectedESP =  active.esp;
					$scope.SelectedSY =active.sy;
					$scope.SelectedPeriod =active.period;
				}

				

				atomic.ready(function(){
					bindData();
					var periods = atomic.Periods;
					$scope.$watch('SelectedESP',function(esp){
						var espArr = (esp+'').split('.');
						var sy =  parseInt(espArr[0]);
						var period =  parseInt(espArr[1]);
						var periodObj;
						$scope.SelectedSY =  sy;
						periods.map(function(pObj){
							if(pObj.id==period){
								$scope.SelectedPeriod =  pObj;
								periodObj =  pObj;
							}
						});
						$scope.liveUpdate.sy =  sy;
						$scope.liveUpdate.period = periodObj;
						$scope.liveUpdate.esp =  esp;
						
					});
					$scope.$watchGroup(['SelectedSY','SelectedPeriod'],function(){
						var sy =  $scope.SelectedSY;
						var period =  $scope.SelectedPeriod.id;
						var esp =  sy+'.'+period;
						$scope.SelectedESP = esp;
					});
				});
				
			},
			controller:function($scope){

				
			}

		}
	}]);
});