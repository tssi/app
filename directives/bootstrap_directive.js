"use strict";
define(['demo','settings'], function(demo,settings){
	var FocusDirective =  function ($timeout,$parse) {
			return{
				link : function(scope, element,attrs) {
					scope.$watch($parse(attrs.focus), function(value) {
						if (value === true)
							$timeout(function(){element[0].focus();});
					});
				}
			}
        };
	FocusDirective.$inject = ['$timeout','$parse'];
	var AutoSelectDirective =  function ($window) {
		return {
			restrict: 'A',
			link: function (scope, element) {
				var focusedElement;
				element.on('click', function () {
					if (focusedElement != this) {
						this.select();
						focusedElement = this;
					}
				});
				element.on('focus', function () {
					if (focusedElement != this) {
						this.select();
						focusedElement = this;
					}
				});
				element.on('blur', function () {
					focusedElement = null;
				});
			}
		};
        };
	AutoSelectDirective.$inject = ['$window'];
	var MonetaryInputDirective = function ($filter) {
			var decimalCases = 2,
				whatToSet = function (str) {
				  /**
				   * TODO:
				   * don't allow any non digits character, except decimal seperator character
				   */
				  return str ? Number(str) : '';
				},
				whatToShow = function (num) {
					
				  return $filter('number')(num, decimalCases);
				};

			return {
			  restrict: 'A',
			  require: 'ngModel',
			  link: function (scope, element, attr, ngModel) {
				ngModel.$parsers.push(whatToSet);
				ngModel.$formatters.push(whatToShow);
				element.on('blur', function() {
				  element.val(whatToShow(ngModel.$modelValue));
				});
				element.on('focus', function () {
				  element.val(ngModel.$modelValue);
				});
				var keyCode = [8, 9, 37, 39, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 109, 110, 189];
				element.bind("keydown", function(event) {
					if (keyCode.indexOf(event.which) === -1) {
						scope.$apply(function() {
							scope.$eval(attr.monetary);
							event.preventDefault();
						});
						event.preventDefault();
					}

				});
			  }
			};
		}
		MonetaryInputDirective.$inject = ['$filter'];
		var SimpleSearchboxDirective =  function($rootScope, $http,$timeout,$q){

			return {
				restrict:'E',
				scope:{
						endpoint:'=',
						fields:'=',
						filters:'=',
						onSuccess:'&',
						onError:'&',
						onClear:'=',
					},
				templateUrl:'app/views/templates/simple-searchbox.html?'+Math.random(),
				link: function($scope,element,attr){
					function requestAPI(){
						var data =  {keyword:$scope.SearchKeyword,fields:$scope.fields};
						if($scope.filters){
							var filters =  $scope.filters;
							for(var key in filters){
								data[key]=filters[key];
							}
						}
						$scope.Loading =true;
						demo.run(settings,'GET',$scope.endpoint,data,
												function(response){
													$scope.Loading =false;
													if(typeof $scope.onSuccess() =='function')
														$scope.onSuccess()(response);
														
												},function(response){
													if(typeof $scope.onError() =='function')
														$scope.onError()(response);
												},
												$rootScope,$http,$timeout,$q);
						$scope.HasSearched = true;
					}
					function clearSearch(){
						$scope.SearchKeyword =null;
						$scope.HasSearched = false;
						if(typeof $scope.onClear =='function') $scope.onClear();
					}
					$scope.fetchSearch =  requestAPI;
					$scope.clearSearch =  clearSearch;
				}
			}
		};
		SimpleSearchboxDirective.$inject = ['$rootScope','$http','$timeout','$q'];
	return {
		focus: FocusDirective,
		autoselect: AutoSelectDirective,
		monetary: MonetaryInputDirective,
		simpleSearchbox: SimpleSearchboxDirective,
	};
});