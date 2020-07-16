"use strict";
define(['app'], function (app) {
	app.register.directive('aNavpill',['AtomicPath',function (aPath) {
		const DEFAULTS = {prefix:'',type:'text',size:''};

		return {
			require:'ngModel',
			restrict: 'E',
			scope:{
				ActiveItem:'=ngModel',
				Options:'=options',
				confirm:'&'
			},
			transclude:false,
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aNavpill.html');
			},
			link: function($scope,elem, attrs,ngModel) {
			
			},
			
			controller:function($scope){

				$scope.setActiveItem = function(item){
					$scope.ActiveItem = item;
				}
			}
		}
	}]);
});