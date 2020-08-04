"use strict";
define(['app'], function (app) {
	app.register.directive('aTable',['AtomicPath','aTable',function (aPath,aTable) {
		const DEFAULT =  {preload:true,allowAdd:true};
		return {
			require:'?ngModel',
			restrict: 'E',
			scope:{
				headers:"=",
				props:"=",
				data:"=",
				searchBy:'=',
				searchWord:'=',
				activeItem:'=?ngModel',
				onRowClick:'&?',
				isPreload:'=?',
				onColClick:'&?',
				allowAdd:'=?',
			},
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aTable.html');
			},
			link: function($scope,elem, attrs) {
				$scope.hasModel = attrs.ngModel!=undefined;
				$scope.isPreload =  $scope.isPreload || DEFAULT.preload;
				$scope.allowAdd =  $scope.allowAdd || DEFAULT.allowAdd;
			},
			controller:function($scope){
				$scope.$watchGroup(['headers','props','data'],function(){
					$scope.Headers =  $scope.headers;
					$scope.Props = $scope.props;
					$scope.Items = $scope.data;
					$scope.activeItem = {};
					var sortDir = $scope.sortDir=='asc'?'down':'up';
					var sortField  = $scope.sortBy;
					
					$scope.__SortDir = sortDir;
					$scope.__SortField =sortField;
					$scope.ShowSort = sortField;
					console.log(sortDir,sortField);
					if(sortField)
						$scope.sortItemsBy(sortField);
					
				});
				$scope.$watch('activeItem',function(item){
					$scope.activeItem = item;
				});
				$scope.setActiveItem = function(item){
					if(!$scope.hasModel) return;
					$scope.activeItem  = item;
					var item  = angular.copy(item);
					if($scope.onRowClick)
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
				$scope.sortItemsBy = function(field){
					
					if($scope.sortGlobal) {
						$scope.sortGlobal  =false;
						return;
					}
					var currDir = $scope.__SortDir;
					var newDir = currDir!='up'?'up':null;
					if($scope.__SortField!=field){
						newDir='up';
					}
					$scope.__SortField = field;
					$scope.__SortDir = newDir;
					if(!newDir)
						$scope.__SortField = null;
					$scope.orderLocal = newDir?'-'+field:null;
				}
				$scope.setShowSort = function(field){
					$scope.ShowSort = field;
				}
				$scope.setSortBy = function(field){
					

					var currDir = $scope.__SortDir;
					var newDir = currDir!='up'?'asc':'desc';
					if($scope.__SortField!=field){
						newDir='asc';
					}
					$scope.sortGlobal  =true;
					$scope.sortBy = field;
					$scope.sortDir = newDir;

					console.log("setSortBy",field,newDir);
					$scope.__SortField = field;
					
					$scope.__SortDir =  newDir=='asc'?'up':'down';
					if($scope.onColClick){
						$scope.onColClick()(field,newDir);
					}
						
				}
			}
		}
	}]);
	app.register.factory("aTable",[function(){
		var aTable = {
			colHeaders:function(headers,props){
				var colClass ="";
				if(typeof headers[0]=="string"){
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
			},
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
			},
			scroll:function(elem,dir){
				var child = angular.element(elem[0].querySelector('.table-entry-data'))[0];
				var goTo = child.scrollHeight;
				if(typeof dir == "number"){
					var nth =  dir+1;
					var row = angular.element(elem[0].querySelector('.table-entry-data tbody>tr:nth-child('+nth+')'))[0];
					var rH = row.clientHeight;
					var rO = row.offsetTop;
					var sT = child.scrollTop;
					var dy = (rO-sT)>rH?1:-1;

					goTo = sT + (rH*dy);

				}
					
				return new Promise(function(resolve,reject){
					(function scrollTo(element, to, duration) {
						
					    var start = element.scrollTop,
					        change = to - start,
					        currentTime = 0,
					        increment = 20;
					        
					    var animateScroll = function(){        
					        currentTime += increment;
					        var val = easeInOutQuad(currentTime, start, change, duration);
					        element.scrollTop = val;
					        if(currentTime < duration) {
					            setTimeout(animateScroll, increment);
					        }else{
					        	resolve();
					        }
					    };
					    animateScroll();
					    function easeInOutQuad(t, b, c, d) {
						  t /= d/2;
							if (t < 1) return c/2*t*t + b;
							t--;
							return -c/2 * (t*(t-2) - 1) + b;
						};
					})(child,goTo,300);
				});
				

				
			}

		};
		return aTable;
	}]);
	app.register.filter('typeof', function() {
	  return function(obj) {
	    return typeof obj
	  };
	});
});