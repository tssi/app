"use strict";
define(['settings','demo'], function(settings,demo){
	var RootController =  function ($scope, $rootScope,$timeout,$cookies,$http,$q,$location) {
		$rootScope.__toggleSideBar = function(){
			$rootScope.__SIDEBAR_OPEN = !$rootScope.__SIDEBAR_OPEN;
		}
		$rootScope.$on('$routeChangeStart', function (scope, next, current) {
			$rootScope.__APP_READY = false;
			$rootScope.__FAB_READY = false;
		});
		$rootScope.$on('$routeChangeSuccess', function (scope, current, next) {
			if(!$rootScope.__LOGGEDIN){
				$rootScope.__MODULE_NAME ='';
				try{
					$rootScope.__USER =  $cookies.get('__USER');
					$rootScope.__LOGGEDIN = $rootScope.__USER!=undefined;
				}catch(e){
					$rootScope.__USER = null;
					$rootScope.__LOGGEDIN = false;
				}
			}
			
			
			if(!$rootScope.__USER&&current.originalPath!='/login'){
				$location.path('/login');
			}
			$timeout(function(){
				$rootScope.__APP_READY = true;
				$timeout(function(){
					$rootScope.__FAB_READY = true;
				},settings.FAB_TRANSITION_DELAY);
			},settings.APP_TRANSITION_DELAY);
			
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
	RootController.$inject = ['$scope', '$rootScope','$timeout','$cookieStore','$http','$q','$location'];
	return RootController;
});