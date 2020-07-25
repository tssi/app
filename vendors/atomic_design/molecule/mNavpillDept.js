"use strict";
define(['app'], function (app) {
	var mNavpillDept = ['$rootScope','Atomic','AtomicPath',function ($rootScope,atomic,aPath) {
		
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
	app.register.directive('mDeptNavPill',mNavpillDept);
	app.register.directive('mNavpillDept',mNavpillDept);
});