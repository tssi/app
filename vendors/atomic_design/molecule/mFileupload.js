"use strict";
define(['app'], function (app) {
	app.register.directive('mFileupload',['$rootScope','$http','Atomic','AtomicPath',function ($rootScope,$http,atomic,aPath) {
		return{
			restrict: 'E',
			require:"ngModel",
			scope:{
				FileModel:'=ngModel',
				FileUploadUrl:'@uploadUrl',
			},
			transclude:false,
			templateUrl:function(elem,attr){
				return aPath.url('/view/molecule/mFileupload.html');
			},
			link: function($scope,elem, attrs) {
				var fileInput = angular.element(elem[0].querySelector('input[type="file"]'));
				fileInput.bind('change', function(changeEvent) {
					$scope.$apply(function() {
						$scope.FileModel =  fileInput[0].files[0];
					});
					
					//Preview file
					var reader = new FileReader();
					reader.onload = function (loadEvent) {
						$scope.$apply(function () {
							elem[0].querySelector('img.FilePreview').src = loadEvent.target.result;
						});
					}
					reader.readAsDataURL(changeEvent.target.files[0]);
				});

				
			},
			controller:function($scope){

				$scope.$on('FileUploadStart',function(evt,args){
					var fd = new FormData();
						fd.append('file', $scope.FileModel);
						fd.append('meta',JSON.stringify(args));
					var hdr = {
						  transformRequest: angular.identity,
						  headers: {'Content-Type': undefined}
						};
					$http.post($scope.FileUploadUrl, fd, hdr)
					.success(function() {
					
					}).error(function() {
					

					});
				});
			}

		}
	}]);
});