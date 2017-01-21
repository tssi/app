"use strict";
define(['app','api'], function (app) {
    
	app.register.controller('RegisterController',['$scope','$rootScope','$window','$cookies','api', function ($scope,$rootScope,$window,$cookies,api) {
		$scope.Register = {};
		
		$scope.cancel = function(){
			$scope.Register = {};
		}
		$scope.register = function(){
			var data =  $scope.Register;
				$scope.Registering = true;
			api.POST('register',data,function(response){
				$scope.Registering = false;
				if(response.data){
					$cookies.put('__USER',JSON.stringify(response.data));
					$window.location.href="#/";
				}
			});
		}
		
	}]);
	
	
	app.register.controller('LoginController',['$scope','$rootScope','$window','$cookies','api', function ($scope,$rootScope,$window,$cookies,api) {
		$rootScope.__SHOW_REG = false;
		if($window.location.hash=='#/logout'){
			$rootScope.__SIDEBAR_OPEN = false;
			$rootScope.__USER=null;
			$cookies.remove('__USER');
			$cookies.remove('__MENUS');
			api.POST('logout',function success(response){
					$window.location.href="#/login";
			});
		}
		if($rootScope.__USER){
			$window.location.href="#/";
		}
		$scope.cancel = function(){
			$scope.loginMessage = null;
			$scope.User = {};
		}
		$scope.cancel();
		$scope.login = function(){
			var data = $scope.User;
			$scope.LoggingIn = true;
			$scope.loginMessage =null;
			api.POST('login',data,function(response){
				$scope.LoggingIn = false;
				if(response.data){
					$cookies.put('__USER',JSON.stringify(response.data));
					$window.location.href="#/";
				}else{
					$scope.loginMessage = response.message;
				}
			});
		}
	}]);
});
