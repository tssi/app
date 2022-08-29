"use strict";
define(['app'], function (app) {
	app.register.directive('oEspFilter',['$rootScope','Atomic','AtomicPath',function ($rootScope,atomic,aPath) {
		const  DEFAULTS = {showFinal:true,showSem:true,activePeriods:[1,2,3,4],};
		return{
			restrict: 'E',
			require:"ngModel",
			scope:{
				Active:'=ngModel',
				showFinal:'=?',
				showSem:'=?',
				activePeriods:'=?',
				liveUpdate:'=?'
			},
			transclude:false,
			templateUrl:function(elem,attr){
				return aPath.url('/view/organism/oEspFilter.html');
			},
			link: function($scope,elem, attrs) {
				 // Setup defaults
				$scope.UIFinal =  $scope.showFinal   && DEFAULTS.showFinal;
				$scope.UISem =  $scope.showSem   && DEFAULTS.showSem;
				$scope.UIPeriods = $scope.activePeriods ||  DEFAULTS.activePeriods;

				
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
					$scope.Active = active;
					$scope.SelectedESP =  active.esp;

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
						$scope.Active.sy =  sy;
						$scope.Active.period = periodObj;
						$scope.Active.esp =  esp;
						
					});
					$scope.$watchGroup(['SelectedSY','SelectedPeriod'],function(){
						var sy =  $scope.SelectedSY;
						var period =  $scope.SelectedPeriod.id;
						var esp =  sy+'.'+period;
						$scope.SelectedESP = esp;
					});
				}
				if(atomic.ready(bindData).fuse())
					$rootScope.$on('$routeChangeSuccess',bindData);

				$scope.$watch('activePeriods',function(periods){
					if(periods){
						$scope.UIPeriods = periods;
						$scope.UIFinal =  $scope.showFinal;
						$scope.UISem =  $scope.showSem;
					}
				});
				
			},
			controller:function($scope){

				
			}

		}
	}]);
});