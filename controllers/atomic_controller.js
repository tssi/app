"use strict";
define(['app','api','atomic/index'], function (app) {
    app.register.controller('AtomicBasicController',['$scope','$rootScope','api', 'Atomic','aModal',
    	function ($scope,$rootScope,api,atomic,aModal) {
			const $selfScope =  $scope;
			$scope =  this;
			$rootScope.__MODULE_NAME =  "Atomic Basic Controls";
			$scope.Text = "Text";

			$scope.Headers  = [{label:'A',class:'col-md-1'},'B','C'];
			$scope.Props = ['a','b','d'];
			$scope.Data = [{a:"a",b:"b",c:"c",d:"d"},{a:2,b:2,c:2},{a:3,b:3,c:3}];
			
			$scope.openModal = function(){
				aModal.open('TestModal');
			}
			$scope.closeModal = function(){
				aModal.close('TestModal');
			}

			$scope.getRecord = function(item){
				$scope.ModalItem =  item;
				aModal.open("TestModal");
			}

			$scope.clearModal = function(){
				$scope.Text =  null;
				$scope.ModalItem =  null;
			}
    }]);

    app.register.controller('AtomicDataController',['$scope','$rootScope','api', 'Atomic',
    	function ($scope,$rootScope,api,atomic) {
			const $selfScope =  $scope;
			$scope =  this;
			$rootScope.__MODULE_NAME =  "Atomic Basic Controls";
			$scope.Input ="Hello";
			$scope.clear = function(){
				$scope.Input = null;
			}
			atomic.ready(function(){
				console.log(atomic);
			});
    }]);
});
