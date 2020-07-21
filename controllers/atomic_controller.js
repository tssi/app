"use strict";
define(['app','api','atomic/bomb'], function (app) {
    app.register.controller('AtomicBasicController',['$scope','$rootScope','api','aModal',
    	function ($scope,$rootScope,api,aModal) {
			const $selfScope =  $scope;
			$scope =  this;
			$scope.init = function(){
				$rootScope.__MODULE_NAME =  "Atomic Basic Controls";
				$scope.Text = "Text";
				$scope.Headers = ['ID','Title','Description'];
				$scope.Props = ['id','title','description'];
				$scope.Options = [{id:1, name:"Option 1",alias:'O1', group:"Odd"},
									{id:2, name:"Option 2",alias:'O2',group:"Even"},
									{id:2, name:"Option 3",alias:'O3',group:"Odd"}];
				loadTests(1);
			}
			
			function loadTests(page){
				var filter = {'limit':5,'page':page};
				var success = function(response){
					$scope.Meta =  response.meta;
					$scope.Data = response.data;
				}
				api.GET('test',filter,success);
			}

			$scope.goToPage = function(page){
				loadTests(page);
			}
			$scope.openModal = function(){
				aModal.open('TestModal');
			}
			$scope.closeModal = function(){
				aModal.close('TestModal');
				$scope.ActiveItem = null;
			}
			$scope.confirmModal = function(){
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
			
			$scope.search = function(){
				console.log($scope.SearchBox);
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
				
			});
    }]);
});
