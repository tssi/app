"use strict";
define(['app','atomic/index'], function (app) {
	app.register.directive('mPeriodBtnGroup',['$rootScope','Atomic','AtomicPath',function ($rootScope,atomic,aPath) {
		return{
			restrict: 'E',
			require:"ngModel",
			scope:{
				SelectedPeriod:'=ngModel',
			},
			transclude:false,
			templateUrl:function(elem,attr){
				return aPath.url('/view/molecule/mPeriodBtnGroup.html');
			},
			link: function($scope,elem, attrs) {
				atomic.ready(function(){
					$scope.Periods = atomic.Periods;
					console.log( atomic.Periods);
				});
				console.log($scope.SelectedPeriod);
			},
			controller:function($scope){

				$scope.setSelectedPeriod = function(period){
					$scope.SelectedPeriod =  period;
				}
			}

		}
	}]);
});