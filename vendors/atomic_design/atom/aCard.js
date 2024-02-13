"use strict";
define(['app'], function (app) {
	app.register.directive('aDeck',['AtomicPath',function (aPath) {
		
		return {
			restrict: 'E',
			scope:{
				
			},
			replace:true,
			transclude:true,
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aDeck.html');
			},
			link: function($scope,elem, attrs,ctrl,transclude) {
				//Add $scope vars here
				$scope.cardCount = elem.find('a-card').length;
				
			},
			controller:function($scope){
				// Add controller functions here
			}
		}
	}]);
	app.register.directive('aCard',['AtomicPath',function (aPath) {
		const DEFAULTS = {size:'6'};
		return {
			restrict: 'E',
			scope:{
				CardTitle:'@title',
				CardCounter:'=counter',
				CardIcon:'@?icon',
				CardSize:'@?size',
			},
			templateUrl:function(elem,attr){
				return aPath.url('/view/atom/aCard.html');
			},
			link: function($scope,elem, attrs) {
				//Add $scope vars here

				$scope.CardSize = $scope.CardSize || DEFAULTS.size; 
				
			},
			controller:function($scope){
				 // Compute the size of each card based on the total number of cards in the deck
				console.log($scope.$parent);
				$scope.$watch('$parent.$parent.cardCount',function(cardCount){
					console.log(cardCount);
					if (cardCount === 1) {
	                    $scope.CardSize = 12;
	                } else if (cardCount === 2) {
	                    $scope.CardSize = 6;
	                } else if (cardCount === 3) {
	                    $scope.CardSize = 4;
	                } else if (cardCount === 4) {
	                    $scope.CardSize = 3;
	                } else if (cardCount>= 5 && cardCount <= 8) {
	                    $scope.CardSize = 2;
	                } else {
	                    // Default size if card count is not within the specified range
	                    $scope.CardSize = DEFAULTS.size;
	                }
				});
                
			}
		}
	}]);
});