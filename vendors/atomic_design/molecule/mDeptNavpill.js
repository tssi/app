"use strict";
define(['app'], function (app) {
	app.register.directive('mDeptNavpill',['$rootScope','Atomic','AtomicPath',function ($rootScope,atomic,aPath) {
		
		return{
			restrict: 'E',
			require:"ngModel",
			scope:{
				Department:'=ngModel',
			},
			transclude:false,
			templateUrl:function(elem,attr){
				return aPath.url('/view/molecule/mDeptNavPill.html');
			},
			link: function($scope,elem, attrs) {
				atomic.ready(function(){
					$scope.Departments = atomic.Departments;
				});
			}
		}
	}]);
});