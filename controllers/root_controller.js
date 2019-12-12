"use strict";
define(['settings','demo'], function(settings,demo){
	var RootController =  function ($scope, $rootScope,$timeout,$cookies,$http,$q,$window, $locstor) {
		const MAX_RECENT = 3;
		$rootScope.initRoot = function(){

			$rootScope.ShowSubMenu = [];
			var recent = [];
			try{
				recent =  JSON.parse($locstor.get('__RECENT_MENUS')) ||[];	
			}catch{
				
			}
			$rootScope.RecentModules =  recent;
			
			if(recent.length>1){
				$rootScope.ActiveMenu ="RECENT";
				$rootScope.ShowRecentModules=true;	
			}
			
		}
		$rootScope.__toggleSideBar = function(){
			$rootScope.__SIDEBAR_OPEN = !$rootScope.__SIDEBAR_OPEN;
			if($rootScope.__SIDEBAR_OPEN)
				$rootScope.ActiveMenu = 'RECENT';
		}
		$rootScope.__toggleSubMenu =function(Menu){
			if($rootScope.ActiveMenu==Menu.id)
				$rootScope.ActiveMenu = null;
			else
				$rootScope.ActiveMenu = Menu.id;

		}
		$scope.__loadModule = function(Module){
			
			$scope.ShowRecentModules=true;
			if($rootScope.RecentModules.indexOf(Module)===-1)
				$rootScope.RecentModules.unshift(Module);
			
			if($rootScope.RecentModules.length>3)
				$rootScope.RecentModules.pop();
			$rootScope.__toggleSideBar();
			$locstor.set('__RECENT_MENUS',JSON.stringify($rootScope.RecentModules));

			
		}
		$rootScope.$on('$routeChangeStart', function (scope, next, current) {
			$rootScope.__APP_READY = false;
			$rootScope.__FAB_READY = false;
			var lastActive = new Date($locstor.get('__LAST_ACTIVE'));
			var currTime =  new Date();
			var timeDiff = currTime - lastActive;
			var timeIdle = timeDiff/1000/60;
			var maxIdle  =	2; //2 mins.
			
			if(timeIdle>maxIdle){
				alert("Session expired. Please login again.");
				$locstor.set('__LAST_ACTIVE', new Date());
				$window.location.href="#/logout";

			}
			if($rootScope.__USER) return;
			
			//Load user
			try{
				$rootScope.__USER =  JSON.parse($cookies.get('__USER'));
				$rootScope.__LOGGEDIN = $rootScope.__USER!=undefined;
			}catch(e){
				$rootScope.__USER = null;
				$rootScope.__LOGGEDIN = false;
			}
			//Load menu
			if($rootScope.__USER){
				var menus = JSON.parse($locstor.get('__SIDEBAR_MENUS'));
				$rootScope.__SIDEBAR_MENUS =  menus;
			}
		});
		$rootScope.$on('$routeChangeSuccess', function (scope, current, next) {
			$timeout(function(){
				$rootScope.__APP_READY = true;
				$timeout(function(){
					$rootScope.__FAB_READY = true;
				},settings.FAB_TRANSITION_DELAY);
			},settings.APP_TRANSITION_DELAY);

			if(!$rootScope.__USER&&current.originalPath!='/login'){
				$window.location.href="#/login";
			}
			
			
        });
		$rootScope.$on('$routeChangeError', function (scope,current) {
			var params = current.params;
			console.error('Invalid path: /#/'+params.controller+'/'+params.action);
			$location.path('/#/');
		});
		$rootScope.isEmpty =function(obj){
			 for(var key in obj) {
				if(obj.hasOwnProperty(key))
					return false;
			}
			return true;
		}
		demo.run(settings,'GET','system_defaults',null,
					function success(response){
						$rootScope._APP = response.data;
					},function error(response){
						console.log('ERROR:'+response.meta.message);
					},$rootScope,$http,$timeout,$q);
		
	};
	RootController.$inject = ['$scope', '$rootScope','$timeout','$cookies','$http','$q','$window','localStorageService'];
	return RootController;
});