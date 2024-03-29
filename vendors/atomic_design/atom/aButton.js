"use strict";
define(['app'], function (app) {
	app.register.directive('aButton',['AtomicPath',function (aPath) {
		const DEFAULTS = {prefix:'btn-',type:'default',size:''};

		return {
			restrict: 'E',
			scope:{
				type:'@?',
				isActive:'=?',
				size:'@?',
				optClass:'@?',
				urlLink:'@?link'

			},
			replace:true,
			transclude: true,
			templateUrl:function(elem,attr){
				let templateUrl = '/view/atom/aButton.html';
				if(attr.link)
					templateUrl = '/view/atom/aButtonLink.html';
				return aPath.url(templateUrl);
			},
			link: function($scope, elem, attrs) {
				$scope.type = DEFAULTS.type;
				$scope.size = DEFAULTS.size;
			},
			controller:function($scope){
				function updateUI(){
				var type = $scope.type||DEFAULTS.type;
				var size =  DEFAULTS.size;

				switch($scope.size){
					case 'large': case 'lg':
						size = 'lg';
					break;
					case 'medium': case 'md':
						size = 'md';
					break;
					case 'small': case 'sm':
						size = 'sm';
					break;
					case 'extra-small': case 'xs':
						size = 'xs';
					break;
				}
				if(type == 'primary-block')
					type = 'primary btn-block';
				if(type == 'default-block')
					type = 'default btn-block';
				if(type)
					$scope.aType =  DEFAULTS.prefix+type;
				if(size)
					$scope.aSize =  DEFAULTS.prefix+size;
				
				$scope.aClass = $scope.optClass;
				}
				updateUI();
				$scope.$watch('type',updateUI);

			}
		}
	}]);
});