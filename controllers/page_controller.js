"use strict";
define(['app','api'], function (app) {
    app.register.controller('PageController',['$scope','$rootScope','api', function ($scope,$rootScope,api) {
       $scope.init = function (module_name) { 
			$rootScope.__MODULE_NAME = module_name || app.settings.DEFAULT_MODULE_NAME;
			$scope.step = 25;
			$scope.marginTop = -2;
			$scope.ActivePage = 1;
			$scope.NextPage = null;
			$scope.PrevPage = null;
			$scope.DataLoading = false;
			
			function getTestList(data){
				$scope.DataLoading = true;
				api.GET('test',data,function(response){
					$scope.List = response.data;
					$scope.NextPage = response.meta.next;
					$scope.PrevPage = response.meta.prev;
					$scope.DataLoading = false;
				});
			}
			getTestList({page:$scope.ActivePage});
			$scope.navigatePage = function(page){
				$scope.ActivePage = page;
				getTestList({page:$scope.ActivePage});
			}
			$scope.openListItem = function($index){
				$scope.ActiveListItem = $scope.List[$index];
			}
			$scope.closeListItem = function(){
				$scope.ActiveListItem = null;
			}
			$scope.deleteListItem = function(id){
				var data = {id:id};
				api.DELETE('test',data,function(response){
					$scope.closeListItem();
					getTestList({page:$scope.ActivePage});
				});
			}
			$scope.filterSearch = function(list){
				var searchBox = $scope.SearchBox;
				var keyword = new RegExp(searchBox, 'i');
				var test = keyword.test(list.title) || keyword.test(list.description);
				return !searchBox || test ; //Return NO FILTER or filter by patient_name
			}
			$scope.confirmSearch = function(){
				getTestList({page:$scope.ActivePage,keyword:$scope.SearchBox,fields:['title','description']});
			}
			$scope.cancelSearch = function(){
				$scope.SearchBox = null;
			}
			$scope.data = [{
				'id': 1,
				'title': 'node 1'
			  }, {
				'id': 2,
				'title': 'node 2'
			  }, {
				'id': 3,
				'title': 'node 3'
				}
				, {
				'id': 4,
				'title': 'node 4'
			}, {
				'id': 5,
				'title': 'node 5'
			}
			];
	   }
    }]);
});


