"use strict";

define(['app','atomic/index','vendors/node_modules/@microfocus/ng-prism/dist/ng-prism'], function (app) {
	app.register.directive('aDocs',['AtomicPath','$templateRequest','$sce',function (aPath,$templateRequest,$sce) {
		const DEFAULTS = {prefix:'',type:'text',size:''};

		return {
			restrict: 'E',
			scope:{
				src:'@',
				lang:'@',
			},
			bindToController:true,
			controllerAs:"aDocsCtrl",
			templateUrl:aPath.url("__docs/aDocs.html"),
			link: function($scope,elem, attrs) {
				var src = $scope.aDocsCtrl.src.split(".");
				var folder = src[1];
				var	file =  folder+'/'+$scope.aDocsCtrl.src;
				switch($scope.aDocsCtrl.lang){
					case 'html': $scope.aDocsCtrl.language = "language-html";break;
					case 'js': $scope.aDocsCtrl.language = "language-javascript";break;
				}
				var url  =aPath.url("__docs/"+file);
				var trustedUrl = $sce.getTrustedResourceUrl(url);
				$templateRequest(trustedUrl).then(function(template) {
					
					var html = escapeHtml(template);
					$scope.aDocsCtrl.Content = template;
				});

				var entityMap = {
				  '&': '&amp;',
				  '<': '&lt;',
				  '>': '&gt;',
				  '"': '&quot;',
				  "'": '&#39;',
				  '/': '&#x2F;',
				  '`': '&#x60;',
				  '=': '&#x3D;'
				};

				function escapeHtml (string) {
				  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
				    return entityMap[s];
				  });
				}
			},
			controller:function($scope){
			}
		}
	}]);
});