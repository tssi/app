"use strict";
define([], function(){
	var FocusDirective =  function ($parse) {
			return{
				link : function(scope, element,attrs) {
					scope.$watch($parse(attrs.focus), function(value) {
						if (value === true)
							element[0].focus();
					});
				}
			}
        };
	FocusDirective.$inject = ['$parse'];
	return {
		focus: FocusDirective
	};
});