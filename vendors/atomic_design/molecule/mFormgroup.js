"use strict";
define(['app'], function (app) {
	app.register.directive('mFormgroup',['$rootScope','Atomic','AtomicPath',function ($rootScope,atomic,aPath) {
		const DEFAULTS = {optionLabel:'name'};
		return{
			restrict: 'E',
			require:"ngModel",
			scope:{
				ObjModel:'=ngModel',
				ObjDisabled:'=?ngDisabled',
				ObjLabel:'@label',
				ObjType:'=?type',
				ObjSize:'=?size',
				ObjOptions:'=?options',
				ObjOptionLabel:'@?optionLabel',
				ObjOptionGroup:'@?optionGroup',
				ObjHideLabel:'=?hideLabel'
			},
			replace:true,
			transclude:false,
			bindToController:true,
			controllerAs:'mFormgroupCtrl',
			templateUrl:function(elem,attr){
				return aPath.url('/view/molecule/mFormgroup.html');
			},
			link: function($scope,elem, attrs) {
				$scope.ObjOptionLabel = $scope.mFormgroupCtrl.ObjOptionLabel|| DEFAULTS.optionLabel
				if($scope.mFormgroupCtrl.ObjType=='yesno'){
					$scope.mFormgroupCtrl.ObjOptions = [{id:'Y',name:'Yes'},{id:'N',name:'No'}];
				}
			},
			controller:function($scope){
				$scope.$watch('mFormgroupCtrl.ObjModel',function(value){

					$scope.ObjModel = value;

				});
			}
		}
	}]);
});