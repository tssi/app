"use strict";
define(['app'], function (app) {
	app.register.directive('mTableEdit',['AtomicPath',function (aPath) {
		const DEFAULTS = {optionLabel:'name'};
		return {
			restrict: 'E',
			scope:{
				headers:"=",
				props:"=",
				inputs:'=',
				data:"=",
				onEditSave:'&?',
				allowSort:'=?'
				
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
			},
			controller:function($scope){
				$scope.$watchGroup(['headers','props','data'],function(){
					$scope.Headers =  $scope.headers;
					$scope.Props = $scope.props;
					$scope.TickList = [];
					var colClass ="";
					if(typeof $scope.Headers[0]=="string"){
						var propsLen = $scope.props.length;
						if(propsLen<5){
							var size= (12/propsLen)
							colClass = ' col-md-'+size+' col-sm-'+size;
						}
					}

					angular.forEach($scope.Headers, function(hdr,i){
						if(typeof hdr == 'string'){
							hdr = {label:hdr,class:colClass};
						}
						
						$scope.Headers[i] = hdr;
					});

					$scope.Items = $scope.data;
					$scope.EditItems =  angular.copy($scope.data);
				});
				$scope.addItem = function(item){
					$scope.EditItems.push(item);
					$scope.NewItem = {};
				}
				$scope.deleteItem = function(index){
					$scope.EditItems.splice(index,1);
				}
				$scope.confirmEdit = function(){
					var items  = angular.copy($scope.EditItems);
					if($scope.onEditSave)
						$scope.onEditSave()(items);
				}
			}
		}
	}]);
});