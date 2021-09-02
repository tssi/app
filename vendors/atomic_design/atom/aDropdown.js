"use strict";
define(['app'], function (app) {
	app.register.filter('groupBy', function() {
		var uniqueItems = function (data, key) {
			if(typeof data !='object') return [];
		    var result = [];
		    for (var i = 0; i < data.length; i++) {
		        var value = data[i][key];
		        if (result.indexOf(value) == -1) {
		            result.push(value);
		        }
		    }
		    return result;
		};
	    return function (collection, key) {
             if (collection === null) return;
             return uniqueItems(collection, key);
        }
	});
	app.register.directive('aDropdown',['AtomicPath','Atomic',function (aPath) {
		const DEFAULTS = {prefix:'btn-',position:'top right',icon:'plus'};

		return {
			restrict: 'E',
			scope:{
				DropdownItem:'=ngModel',
				DropdownLabel:'@?label',
				DropdownOptions:'=options',
				ActiveOptGrp:'=?'

			},
			replace:true,
			transclude: true,
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aDropdown.html');
			},
			link: function($scope, elem, attrs) {
				$scope.ActiveOptGrp = null;
			},
			controller:function($scope){
				$scope.setActiveOptGrp = function(grp){
					$scope.ActiveOptGrp =$scope.ActiveOptGrp==grp?null: grp;
				}
				$scope.setDropdownItem = function(item){
					$scope.DropdownItem = item;
					$scope.openDropdown = false;
				}

			}
		}
	}]);
});