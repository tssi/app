"use strict";
define(['app','api'], function (app) {
    
	app.register.controller('RegisterController',['$scope','$rootScope','$window','$cookies','api', function ($scope,$rootScope,$window,$cookies,api) {
		$scope.Register = {};
		$scope.toggleRegister = function(){
			$rootScope.__SHOW_REG = true;
		}
		$scope.cancel = function(){
			$scope.Register = {};
			$rootScope.__SHOW_REG = false;
		}
		$scope.register = function(){
			var data =  $scope.Register;
				data.action = 'register';
				$scope.Registering = true;
			api.POST('users',data,function(response){
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
			$rootScope.__LOGGEDIN=false;
			$cookies.remove('__USER');
			$window.location.href="#/";
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
				data.action='login';
			$scope.LoggingIn = true;
			$scope.loginMessage =null;
			api.POST('users',data,function(response){
				$scope.LoggingIn = false;
				if(response.data.user){
					$cookies.put('__USER',JSON.stringify(response.data.user));
					$window.location.href="#/";
				}else{
					$scope.loginMessage = response.message;
				}
			});
		}
	}]);
});
