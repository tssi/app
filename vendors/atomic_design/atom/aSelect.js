"use strict";
define(['app'], function (app) {
	app.register.directive('aSelect',[function () {
		const DEFAULTS = {prefix:'',type:'text',size:''};

		return {
			restrict: 'A',
			link: function($scope,elem, attrs) {
				elem.addClass("form-control");
			},
			controller:function($scope){
			}
		}
	}]);
});