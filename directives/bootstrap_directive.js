"use strict";
define([], function(){
	var FocusDirective =  function ($timeout,$parse) {
			return{
				link : function(scope, element,attrs) {
					
					scope.$watch($parse(attrs.focus), function(value) {
						
						if (value === true)
							 $timeout(function() {
								 element[0].focus();
							 });
					});
				}
			}
        };
	FocusDirective.$inject = ['$timeout','$parse'];
	return {
		focus: FocusDirective
	};
});