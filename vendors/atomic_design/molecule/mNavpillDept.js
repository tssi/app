"use strict";
define(['app'], function (app) {
	const mNavpillDept = ['$rootScope','Atomic','AtomicPath',function ($rootScope,atomic,aPath) {
		
		return{
			restrict: 'E',
			require:"ngModel",
			scope:{
				Department:'=ngModel',
			},
			transclude:false,
			templateUrl:function(elem,attr){
				return aPath.url('/view/molecule/mNavPillDept.html');
			},
			link: function($scope,elem, attrs) {
				atomic.ready(function(){
					$scope.Departments = atomic.Departments;
				});
			}
		}
	}];
	app.register.directive('mNavpillDept',mNavpillDept);
	app.register.directive('mDeptNavPill',[function () {
		return {
			restrict: 'E',
			replace:true,
			template:'<div>ERROR<!-- Use <m-navpill-dept> instead --></div>',
		}
	}]);
});