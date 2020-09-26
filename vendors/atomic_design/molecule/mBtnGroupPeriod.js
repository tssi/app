"use strict";
define(['app'], function (app) {
	app.register.directive('mBtngroupPeriod',['$rootScope','Atomic','AtomicPath',function ($rootScope,atomic,aPath) {
		return{
			restrict: 'E',
			require:"ngModel",
			scope:{
				SelectedPeriod:'=ngModel',
			},
			transclude:false,
			templateUrl:function(elem,attr){
				return aPath.url('/view/molecule/mBtnGroupPeriod.html');
			},
			link: function($scope,elem, attrs) {
				atomic.ready(function(){
					$scope.Periods = atomic.Periods;
					console.log( atomic.Periods);
				});
			},
			controller:function($scope){

				$scope.setSelectedPeriod = function(period){
					$scope.SelectedPeriod =  period;
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