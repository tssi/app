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
			$cookies.remove('__SIDEBAR_MENUS');
			api.POST('logout',function success(response){
					$rootScope.$emit('UserLoggedOut');
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
				if(response.data.user){
					$rootScope.__USER = response.data;
					$cookies.put('__USER',JSON.stringify(response.data));
					$rootScope.__LOGGEDIN  = true;
					$rootScope.$emit('UserLoggedIn');
					$window.location.href="#/";
				}else{
					$scope.loginMessage = response.message;
				}
			});
		}
		
		$rootScope.$on('UserLoggedIn',function(){
			requestModulesList();
			
		});
		
		$rootScope.$on('$routeChangeStart', function (scope, next, current) {
			if($rootScope.__LOGGEDIN)
				if(!$rootScope.__SIDEBAR_MENUS)
					readModuleListCache();
				else
					requestModulesList();
		});
		
		function requestModulesList(){
			api.GET('modules',{limit:'less'},function(response){
				var modules = response.data;
				var menus = [];
				var lastIndex=-1;
				for(var i in modules){
					var mod =  modules[i];
					var granted = $rootScope.__USER.user.access.indexOf(mod.id)!==-1;
					if(!mod.is_child){
						//Menu
						if(mod.is_parent)
							mod.children=[];
						if(granted) menus.push(mod);
						lastIndex++;
					}else{
						//Submenu
						if(granted) menus[lastIndex].children.push(mod);
					}
				}
				$cookies.put('__SIDEBAR_MENUS',JSON.stringify(menus));
				readModuleListCache();
			});
		}
		function readModuleListCache(){
			console.log($cookies.get('__SIDEBAR_MENUS'));
				var cache = JSON.parse($cookies.get('__SIDEBAR_MENUS'));
				$rootScope.__SIDEBAR_MENUS =  cache;
				
		}
	}]);
});
