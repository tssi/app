"use strict";
define(['app'], function (app) {
	app.register.directive('aSelect',[function () {
		const DEFAULTS = {prefix:'',type:'text',size:''};

		return {
			require:'ngModel',
			restrict: 'A',
			link: function($scope,elem, attrs,ngModel) {
				 ngModel.$validators.invalidDropdown = function (modelValue) {
			      return !!modelValue; // Invalid if value is empty
			    };
				
			},
			controller:function($scope){
				
			}
		}
	}]);
});