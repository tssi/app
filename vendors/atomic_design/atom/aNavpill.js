"use strict";
define(['app'], function (app) {
	app.register.directive('aNavpill',['AtomicPath',function (aPath) {
		const DEFAULTS = {prefix:'',type:'text',size:'',label:'name'};

		return {
			require:'ngModel',
			restrict: 'E',
			scope:{
				ActiveItem:'=ngModel',
				Options:'=options',
				label:'=?',
				confirm:'&',
				type:'@?'
			},
			replace:true,
			transclude:false,
			templateUrl:function(elem,attr){
				var url = aPath.url('/view/atom/aNavpill.html');
				if(attr.type=='button')
					 url = aPath.url('/view/atom/aButtonGroup.html');
				return url;
			},
			link: function($scope,elem, attrs,ngModel) {

				$scope.aNavLabel = $scope.label||DEFAULTS.label;
				$scope.justified=attrs.align=='justified';
			},
			
			controller:function($scope){

				$scope.setActiveItem = function(item){
					if(!item.disable)
						$scope.ActiveItem = item.id;
				}
			}
		}
	}]);
	app.register.directive('aNavtab',['AtomicPath',function (aPath) {
		const DEFAULTS = {prefix:'',type:'text',size:'',label:'name'};

		return {
			require:'ngModel',
			restrict: 'E',
			scope:{
				ActiveItem:'=ngModel',
				Options:'=options',
				label:'=?',
				confirm:'&'
			},
			replace:true,
			transclude:false,
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aNavtab.html');
			},
			link: function($scope,elem, attrs,ngModel) {

				$scope.aNavLabel = $scope.label||DEFAULTS.label;

			},
			
			controller:function($scope){

				$scope.setActiveItem = function(item){
					$scope.ActiveItem = item.id;
				}
			}
		}
	}]);
});