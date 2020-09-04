"use strict";
define(['app','vendors/bootstrap'], function (app) {
	app.register.directive('aModal',['AtomicPath',function (aPath) {
		return {
			restrict: 'E',
			scope:{
				id:'@',
				title:'@',
				isLarge:'=?',
			},
			replace:true,
			transclude:true,
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aModal.html');
			},
			link: function($scope,elem, attrs) {
				$scope.ResolveData = $scope.data;
				$scope.aModalId = $scope.id;
				$scope.aModalTitle = $scope.title;
				if($scope.isLarge){
					$scope.OptClass = 'modal-lg';
				}
				$scope.$watch('title',function(val){
					$scope.aModalTitle = val;
				});
			},
		}
	}]);
	app.register.directive('aModalHeader',['AtomicPath',function (aPath) {
		return {
			restrict: 'E',
			scope:{
				title:'=',
			},
			replace:true,
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aModalHeader.html');
			}
		}
	}]);
	app.register.directive('aModalBody',['AtomicPath',function (aPath) {
		return {
			restrict: 'E',
			scope:{
				title:'=',
			},
			replace:true,
			transclude:true,
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aModalBody.html');
			}
		}
	}]);
	app.register.directive('aModalFooter',['AtomicPath',function (aPath) {
		return {
			restrict: 'E',
			scope:{
				title:'=',
			},
			replace:true,
			transclude:true,
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aModalFooter.html');
			}
		}
	}]);
	app.register.factory("aModal",[function(){
		return {
			open:function(id){
				return $('.modal[data-modal-id="'+id+'"]').modal({backdrop:'static'});
			},
			close:function(id){
				return $('.modal[data-modal-id="'+id+'"]').modal('hide');
			},

		};
	}]);

});