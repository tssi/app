"use strict";
/* 
* Include `atomic/index` in your `define` dependencies
*/
define(['app','api','atomic/index'], function (app) {
	/*
	*	Include `Atomic` provider in your `controller` dependencies
	*/
    app.register.controller('AtomicBasicController',['$scope','$rootScope','api', 'Atomic',
    	function ($scope,$rootScope,api,atomic) {
    		/** 
    		* Pass $scope in $selfScope
    		* The assign `this` in $scope
			*/
			const $selfScope =  $scope;
			$scope =  this;
			$rootScope.__MODULE_NAME =  "Atomic Basic Controls";
			$scope.TextBox = "Hello";
    }]);
});
