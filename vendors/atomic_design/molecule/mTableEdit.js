"use strict";
define(['app'], function (app) {
	app.register.directive('mTableEdit',['$filter','AtomicPath','aTable',function ($filter,aPath,aTable) {
		const DEFAULTS = {optionLabel:'name',autoBind:true,allowAdd:true,dateFormat:'yyyy-MM-dd',maxHeight:200};
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
				allowAdd:'=?',
				maxHeight:'@?'
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
				$scope.maxHeight = $scope.maxHeight || DEFAULTS.maxHeight;
				$scope.elem = elem;

			},
			controller:function($scope){
				$scope.$watchGroup(['headers','props','data','inputs'],function(){
					$scope.Headers =  aTable.colHeaders($scope.headers,$scope.props);
					$scope.Props = $scope.props;
					$scope.AllowAdd =  $scope.allowAdd || DEFAULTS.allowAdd;
					$scope.Items = $scope.data;

					//Convert data string to date
					angular.forEach($scope.inputs,function(field,i){
						if(field.type=='date'){
							angular.forEach($scope.Items,function(item,j){
								var ffld = field.field;
								$scope.Items[j][ffld] = new Date(item[ffld]);
							});
						}
					});
					var firstRun = $scope.EditItems==undefined;
					$scope.EditItems =  angular.copy($scope.Items);
					
					if(firstRun){
						setTimeout(function(){
							aTable.scroll($scope.elem,'top');
						},300);
					}

				});
				$scope.addItem = function(item){
					$scope.DisableLine = 'add';
					$scope.EditItems.push(item);
					$scope.NewItem = {};
					aTable.scroll($scope.elem,'bottom').then(function(){
						$scope.$apply(function(){
							$scope.DisableLine = null;
						});
					});
				}
				$scope.deleteItem = function(index){
					//return $scope.EditItems.splice(index,1);
					$scope.DisableLine = index;
					aTable.scroll($scope.elem,index).then(function(){
						$scope.$apply(function(){
							$scope.DisableLine = null;
							$scope.EditItems.splice(index,1);
						});
					});
					
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
						angular.forEach($scope.inputs,function(field,i){
							if(field.type=='date'){
								angular.forEach(items,function(item,j){
									var ffld = field.field;
									var date  =item[ffld];
									var format =  DEFAULTS.dateFormat;
									items[j][ffld] = $filter('date')(date,format);
								});
							}
						});
					console.log(items);
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