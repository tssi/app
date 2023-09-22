"use strict";
define(['settings','demo'], function(settings,demo){
	var RootController =  function ($scope, $rootScope,$timeout,$cookies,$http,$q,$window, $locstor,$interval) {
		const MAX_RECENT = 3;
		$rootScope.initRoot = function(){
			$rootScope.ShowSubMenu = [];
			$rootScope.$emit('LoadRecents');
			$rootScope.__SESS_START();

		}
		$rootScope.$on('LoadRecents',function(){
			var recent = [];
			try{
				recent =  JSON.parse($locstor.get('__RECENT_MENUS')) ||[];	
			}catch(e){
				
			}
			$rootScope.RecentModules =  recent;
			
			if(recent.length>1){
				$rootScope.ActiveMenu ="RECENT";
				$rootScope.ShowRecentModules=true;	
			}
		});
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
		$scope.__loadModule = function(Module,toggle){
			
			$scope.ShowRecentModules=true;
			if(!$rootScope.RecentModules)
				$rootScope.$emit('LoadRecents');

			if($rootScope.RecentModules.indexOf(Module)===-1)
				$rootScope.RecentModules.unshift(Module);
			
			if($rootScope.RecentModules.length>3)
				$rootScope.RecentModules.pop();
			if(toggle==undefined)
				$rootScope.__toggleSideBar();
			$locstor.set('__RECENT_MENUS',JSON.stringify($rootScope.RecentModules));

			
		}
		$rootScope.__SESS_START = function(){
			demo.run(settings,'GET','user_sessions',null,
						function success(response){
							$rootScope._SESS = response.data;
							$locstor.set('__LAST_ACTIVE', new Date());
						},function error(response){
							 $interval.cancel($rootScope.promise);
							console.log('ERROR:'+response.message);
						},$rootScope,$http,$timeout,$q);	
			}
		$rootScope.$on('$routeChangeStart', function (scope, next, current) {
			$rootScope.__APP_READY = false;
			$rootScope.__FAB_READY = false;
			
			if(!$rootScope.__USER){
				//Load user
				try{
					$rootScope.__USER =  JSON.parse($cookies.get('__USER'));
					$rootScope.__LOGGEDIN = $rootScope.__USER!=undefined;
				}catch(e){
					$rootScope.__USER = null;
					$rootScope.__LOGGEDIN = false;
				}
			}
			//Load menu
			if($rootScope.__USER && !$rootScope.__SIDEBAR_MENUS ){
				var menus = JSON.parse($locstor.get('__SIDEBAR_MENUS'));
				$rootScope.__SIDEBAR_MENUS =  menus;
				var allowedItems =['account'];
				menus.map(function(menu){
					menu.children.map(function(child){
						allowedItems.push(child.link);
					})
				});
				$rootScope.allowedItems =  allowedItems;
				
			}
			if($rootScope.allowedItems){
				if(!next.params.controller) return;
				var link =  next.params.controller;
					if(next.params.action)
						link+='/'+next.params.action;
					
				if($scope.allowedItems.indexOf(link)==-1){
					alert('Location '+link+' not allowed');
					$window.location.href='#/';
					
				}
			}

			var locStorActive = $locstor.get('__LAST_ACTIVE');
			var lastActive = new Date(locStorActive);
			var currTime =  new Date();
			var timeDiff = currTime - lastActive;
			var timeIdle = timeDiff;
			var maxIdle  =	settings.MAX_IDLE;
			
			if(timeIdle>=maxIdle && locStorActive && $rootScope.__USER){
				if(next.$$route.originalPath!=="/logout")
					alert("Session expired. Please login again.");
				$locstor.set('__LAST_ACTIVE', new Date());
				$window.location.href="#/logout";

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
	RootController.$inject = ['$scope', '$rootScope','$timeout','$cookies','$http','$q','$window','localStorageService','$interval'];
	return RootController;
});