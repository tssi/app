"use strict";
define([], function(){
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
	return {
		focus: FocusDirective,
		autoselect: AutoSelectDirective,
		monetary: MonetaryInputDirective
	};
});