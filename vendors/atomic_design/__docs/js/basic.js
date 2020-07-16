"use strict";
define(['app','api','atomic/index'], function (app) {
    app.register.controller('AtomicBasicController',['$scope','$rootScope','api', 'Atomic',
    	function ($scope,$rootScope,api,atomic) {
			const $selfScope =  $scope;
			$scope =  this;
			$rootScope.__MODULE_NAME =  "Atomic Basic Controls";
    }]);
});
