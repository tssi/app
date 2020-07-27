"use strict";
define(['app'], function (app) {
	app.register.directive('aTable',['AtomicPath','aTable',function (aPath,aTable) {
		return {
			require:'ngModel',
			restrict: 'E',
			scope:{
				headers:"=",
				props:"=",
				data:"=",
				searchBy:'=',
				searchWord:'=',
				activeItem:'=ngModel',
				onRowClick:'&?'
			},
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aTable.html');
			},
			link: function($scope,elem, attrs) {
				
			},
			controller:function($scope){
				$scope.$watchGroup(['headers','props','data'],function(){
					$scope.Headers =  $scope.headers;
					$scope.Props = $scope.props;
					$scope.Items = $scope.data;
					$scope.activeItem = {};
				});
				$scope.$watch('activeItem',function(item){
					$scope.activeItem = item;
				});
				$scope.setActiveItem = function(item){
					$scope.activeItem  = item;
					var item  = angular.copy(item);
					$scope.onRowClick()(item);
				}
				$scope.$watch('searchWord',function(){
					$scope.searchFilter={};
					for(var i in  $scope.searchBy){
						var field = $scope.searchBy[i];
						$scope.searchFilter[field]=$scope.searchWord;
					}
				});
				$scope.UIItems = [];
				$scope.searchLocal = function(item){
					var isMatched = !$scope.searchWord;
					if($scope.searchWord){
						var SWORD = $scope.searchWord.toUpperCase();
						for(var i in  $scope.searchBy){
							var field = $scope.searchBy[i];
							if(item[field]){
								var value =  item[field];
								if( typeof value == "string")
									isMatched = isMatched || value.toUpperCase().includes(SWORD);
								else if( typeof value == "number")
									isMatched = isMatched || (value+"").indexOf(SWORD) == 0;
							}
						}
					}
					return isMatched;
				}
			}
		}
	}]);
	app.register.factory("aTable",[function(){
		var aTable = {
			colHeaders:function(headers,props){
				var colClass ="";
				if(typeof headers=="string"){
					var propsLen = props.length;
					if(propsLen<5){
						var size= (12/propsLen)
						colClass = ' col-md-'+size+' col-sm-'+size;
					}
				}

				angular.forEach(headers, function(hdr,i){
					if(typeof hdr == 'string'){
						hdr = {label:hdr,class:colClass};
					}
					
					headers[i] = hdr;
				});
				return headers;
			}
			isEqual:function(a,b){
					// Create arrays of property names
				    var aProps = Object.getOwnPropertyNames(a);
				    var bProps = Object.getOwnPropertyNames(b);

				    // If number of properties is different,
				    // objects are not equivalent
				    if (aProps.length != bProps.length) {
				        return false;
				    }

				    for (var i = 0; i < aProps.length; i++) {
				        var propName = aProps[i];

				        // If values of same property are not equal,
				        // objects are not equivalent
				        if (a[propName] !== b[propName]) {
				            return false;
				        }
				    }

			    
			    // If we made it this far, objects
			    // are considered equivalent
			    return true;
			},
			isArrayEqual:function(A,B){
				var isEqual = false;
				for(var i in A){
					var a =  A[i];
					var b =  B[i];
					isEqual = isEqual && aTable.isEqual(a,b);
				}
				for(var i in B){
					var a =  A[i];
					var b =  B[i];
					isEqual = isEqual && aTable.isEqual(a,b);
				}
				return isEqual;
			}

		};
		return aTable;
	}]);
});