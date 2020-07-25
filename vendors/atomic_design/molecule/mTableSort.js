"use strict";
define(['app'], function (app) {
	app.register.directive('mTableSort',['AtomicPath','$filter',function (aPath,$filter) {
		return {
			restrict: 'E',
			scope:{
				headers:"=",
				props:"=",
				data:"=",
				onSortSave:"&?",
			},
			templateUrl:function(elem,attr){
				return aPath.url('/view/molecule/mTableSort.html');
			},
			link: function($scope,elem, attrs) {
				$scope.SortItems= [];
			},
			controller:function($scope){
				$scope.$watchGroup(['headers','props','data'],function(){
					$scope.Headers =  $scope.headers;
					$scope.Props = $scope.props;
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
					$scope.SortItems = angular.copy($scope.data);
				});
				$scope.confirmSort = function(){
					var items  = $filter("uniqueItem")($scope.SortItems,'id');
					 	$scope.Items =items;
					if($scope.onSortSave)
						$scope.onSortSave()(items);
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