"use strict";
// Use the atomic/bomb inside define to use the atomic_design library
// Use the api to request data
define(['app','atomic/bomb','api'],function(app){
	// Controller definition stays the same
	// Add the aModal provider to use the modal 
	app.register.controller("ExampleController",['$scope','$rootScope','api','aModal',
		function($scope,$rootScope, api,aModal){
			//Important declaration
			//DO NOT skip this line as this maps the EXC correctly in the view
			const $selfScope =  $scope;
			$scope =  this;

			$scope.init=function(){
				$scope.Headers = ['ID','Year Level','Section',];
				//Props are the properties of your data
				$scope.Props = ['id','year_level','description'];
				$scope.ActiveSection = null;
				var TestStatuses = [{id:'ACT',name:'Active'},{id:'INA',name:'Inactive'}];
				$scope.TestHeaders = ['ID','Name','Status'];
				$scope.TestProps = ['id','name','status'];
				$scope.TestData  = [];
				$scope.TestInputs = [{field:'id',placeholder:'(Auto No.)', disabled:true},{field:'name'},{field:'status',options:TestStatuses}];
				loadSections(1);
			}
			function loadSections(page){
				var filter =  {limit:10,page:page};
				var success =  function(response){
					$scope.Meta = response.meta;
					$scope.Data =  response.data;
					$scope.CurrentPage =  $scope.Meta.page;
				}
				api.GET("sections",filter,success);
			}
			// Handle the on-navigate event to update your data
			$scope.gotoPage = function(page){
				loadSections(page);
			}
			//Open modal handler
			$scope.openModal = function(section){
				aModal.open("ExampleModal");
				$scope.ActiveSection = section;
				if(!section)
					$scope.Mode = 'Add';
				else
					$scope.Mode= 'Edit';
			}

			$scope.closeModal = function(){
				aModal.close("ExampleModal");	
			}
			$scope.confirmModal = function(){
				var data =  $scope.ActiveSection;
				var success = function(response){
					aModal.close("ExampleModal");
					console.log($scope.Meta,data);
					if($scope.Mode =='Add')
						$scope.CurrentPage =  $scope.Meta.last;
					loadSections($scope.CurrentPage);
				}
				api.POST("sections",data,success);
			}

			$scope.sortMode = function(items){
				$scope.Mode ='SortItems';
				$scope.TestData = items;
			}
			$scope.editMode = function(items){
				$scope.Mode ='EditItems';
				$scope.TestData = items;
			}
			$scope.updateItems =function(items){
				$scope.TestData = items;
				
			}
		}]);

});