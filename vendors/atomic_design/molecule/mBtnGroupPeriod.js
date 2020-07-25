"use strict";
define(['app'], function (app) {
	var mBtnGroupPeriod = ['$rootScope','Atomic','AtomicPath',function ($rootScope,atomic,aPath) {
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
	}];
	app.register.directive('mPeriodBtnGroup',mBtnGroupPeriod);
	app.register.directive('mBtngroupPeriod',mBtnGroupPeriod);
});