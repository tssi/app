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
	return {
		focus: FocusDirective,
		autoselect: AutoSelectDirective
	};
});