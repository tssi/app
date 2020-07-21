"use strict";
define(['app'], function (app) {
	app.register.directive('mFormgroup',['$rootScope','Atomic','AtomicPath',function ($rootScope,atomic,aPath) {
		const DEFAULTS = {optionLabel:'name'};
		return{
			restrict: 'E',
			require:"ngModel",
			scope:{
				ObjModel:'=ngModel',
				ObjLabel:'@label',
				ObjOptions:'=?options',
				ObjOptionLabel:'@?optionLabel',
				ObjOptionGroup:'@?optionGroup'
			},
			replace:true,
			transclude:false,
			templateUrl:function(elem,attr){
				return aPath.url('/view/molecule/mFormgroup.html');
			},
			link: function($scope,elem, attrs) {
				$scope.ObjOptionLabel = $scope.ObjOptionLabel|| DEFAULTS.optionLabel;
			}
		}
	}]);
});