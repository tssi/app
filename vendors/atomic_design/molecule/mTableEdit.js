"use strict";
define(['app'], function (app) {
	app.register.directive('mTableEdit',['AtomicPath','aTable',function (aPath,aTable) {
		const DEFAULTS = {optionLabel:'name',autoBind:true};
		return {
			restrict: 'E',
			scope:{
				headers:"=",
				props:"=",
				inputs:'=',
				data:"=",
				onEditSave:'&?',
				allowSort:'=?',
				onInitSort:'&?',
				autoBind:'=?',
			},
			templateUrl:function(elem,attr){
				return aPath.url('/view/molecule/mTableEdit.html');
			},
			link: function($scope,elem, attrs) {
				var inputs = $scope.inputs;
				for(var i in inputs){
					var input  =  inputs[i];
					if(input.options){
						input.optionLabel = inputs.optionLabel||DEFAULTS.optionLabel;
					}
					inputs[i]=input;
				}
				$scope.Inputs = inputs;
				$scope.NewItem = {};
				if($scope.onInitSort) $scope.allowSort = true;
				$scope.autoBind = $scope.autoBind || DEFAULTS.autoBind; 
			},
			controller:function($scope){
				$scope.$watchGroup(['headers','props','data'],function(){
					$scope.Headers =  aTable.colHeaders($scope.headers,$scope.props);
					$scope.Props = $scope.props;

					$scope.Items = $scope.data;
					$scope.EditItems =  angular.copy($scope.Items);
				});
				$scope.addItem = function(item){
					$scope.EditItems.push(item);
					$scope.NewItem = {};
				}
				$scope.deleteItem = function(index){
					$scope.EditItems.splice(index,1);
				}
				$scope.$watch('EditItems',function(items){
					if($scope.autoBind){
						if(aTable.isArrayEqual($scope.Items,$scope.EditItems) && $scope.Items!=undefined){
							return false;
						}
						else if($scope.Items){
								$scope.confirmEdit();
						}
					}
				},true);
				$scope.confirmEdit = function(){
					var items  = angular.copy($scope.EditItems);
						$scope.Items = items;
					if($scope.onEditSave)
						$scope.onEditSave()(items);
				}
				$scope.initSort = function(){
					var items  = angular.copy($scope.EditItems);
					if($scope.onInitSort)
						$scope.onInitSort()(items);

				}
			}
		}
	}]);
});