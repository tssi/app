"use strict";
define(['app'], function (app) {
	app.register.directive('mTableSort',['AtomicPath','aTable','$filter',function (aPath,aTable,$filter) {
		const DEFAULTS = {optionLabel:'name',autoBind:true};
		return {
			restrict: 'E',
			scope:{
				headers:"=",
				props:"=",
				data:"=",
				onSortSave:"&?",
				allowEdit:'=?',
				onInitEdit:'&?',
				autoBind:'=?'
			},
			templateUrl:function(elem,attr){
				return aPath.url('/view/molecule/mTableSort.html');
			},
			link: function($scope,elem, attrs) {
				$scope.SortItems= [];
				if($scope.onInitEdit) $scope.allowEdit = true;
				$scope.isWindows =  navigator.platform.match("Win")!==null;
				$scope.autoBind = $scope.autoBind || DEFAULTS.autoBind;
				$scope.elem = elem;
			},
			controller:function($scope){
				$scope.$watchGroup(['headers','props','data','inputs'],function(){
					$scope.Headers =  aTable.colHeaders($scope.headers,$scope.props);
					$scope.Props = $scope.props;
					$scope.UIItems = undefined;
					$scope.Items = $scope.data;
					var firstRun = $scope.SortItems==undefined;
					
					$scope.SortItems =  angular.copy($scope.Items);

					if(firstRun){
						setTimeout(function(){
							aTable.scroll($scope.elem,'top');
						},300);
					}
				});
				$scope.$watch('SortItems',function(items){
					if($scope.autoBind){
						if(aTable.isArrayEqual($scope.Items,$scope.SortItems) && $scope.Items!=undefined){
							return false;
						}
						else if($scope.Items){
								$scope.confirmSort();
						}
					}
				},true);
				$scope.confirmSort = function(){
					var items  = angular.copy($scope.SortItems);
					 	$scope.Items =items;
					if($scope.onSortSave)
						$scope.onSortSave()(items);
				}
				$scope.initEdit = function(){
					var items  = angular.copy($scope.SortItems);
					if($scope.onInitEdit)
						$scope.onInitEdit()(items);

				}
			}
		}
	}]);
	app.register.filter('uniqueItem', function() {
	   return function(collection, keyname) {
	      var output = [], 
	          keys = [];

	      angular.forEach(collection, function(item) {
	          var key = item[keyname];
	          if(keys.indexOf(key) === -1) {
	              keys.push(key);
	              output.push(item);
	          }
	      });

	      return output;
	   };
	});
});