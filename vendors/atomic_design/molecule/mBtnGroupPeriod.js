"use strict";
define(['app'], function (app) {
	app.register.directive('mBtngroupPeriod',['$rootScope','$filter','Atomic','AtomicPath',function ($rootScope,$filter,atomic,aPath) {
		return{
			restrict: 'E',
			require:"ngModel",
			scope:{
				SelectedPeriod:'=ngModel',
				activePeriods:'=?',
				showFinal:'=?',
				showSem:'=?',
			},
			transclude:false,
			templateUrl:function(elem,attr){
				return aPath.url('/view/molecule/mBtnGroupPeriod.html');
			},
			link: function($scope,elem, attrs) {

				function bindData(){
					$scope.Periods =  atomic.Periods;
					$scope.$watch('activePeriods',function(periods){
						var showPeriods = atomic.Periods;
						if($scope.showFinal)
							periods.push(5);
						if($scope.showSem){
							showPeriods = showPeriods.concat(atomic.Semesters);
							showPeriods[5].alias.desc = 'SEM';
							showPeriods[6].alias.desc = 'SEM';
							var final = showPeriods.splice(4,1)[0];
							showPeriods.push(final);
							if(periods[0]<3) periods.push(25);
							if(periods[0]>2) periods.push(45);
						}

						var PFltr = $filter('filter')(showPeriods,
							function(item){
								return periods.indexOf(item.id)!==-1;
							});
						$scope.Periods = PFltr;
					});
				}
				if(atomic.ready(bindData).fuse())
					$rootScope.$on('$routeChangeSuccess',bindData);
			},
			controller:function($scope){

				$scope.setSelectedPeriod = function(period){
					$scope.SelectedPeriod =  period;
				}
				
			}

		}
	}]);
	app.register.directive('mBtngroupSy',['$rootScope','Atomic','AtomicPath',function ($rootScope,atomic,aPath) {
		return{
			restrict: 'E',
			require:"ngModel",
			scope:{
				SelectedSY:'=ngModel',
			},
			transclude:false,
			templateUrl:function(elem,attr){
				return aPath.url('/view/molecule/mBtnGroupSY.html');
			},
			link: function($scope,elem, attrs) {
				function bindData (){
					$scope.SchoolYears = atomic.SchoolYears;
				};
				if(atomic.ready(bindData).fuse())
					$rootScope.$on('$routeChangeSuccess',bindData);
			},
			controller:function($scope){

				$scope.setSelectedSY = function(sy){
					$scope.SelectedSY =  sy;
				}
			}

		}
	}]);
	app.register.directive('mPeriodBtnGroup',[function () {
		return {
			restrict: 'E',
			replace:true,
			template:'<div>ERROR<!-- Use <m-btngroup-period> instead --></div>',
		}
	}]);
});