"use strict";
define(['app','api'], function (app,api) {
	app.register.factory('AtomicAPI',function ($rootScope,api) {
		const REGISRTY = {ready:false};
		const data = {limit:'less'};

		function requestSections(){
			return api.GET("sections",data,function(response){
			 	REGISRTY['Sections'] =  response.data;
			});
		}
		function requestDepartments(){
			return api.GET("departments",data,function(response){
			 	REGISRTY['Departments'] =  response.data;
			});
		}
		function requestPrograms(){
			return api.GET("programs",data,function(response){
			 	REGISRTY['Programs'] =  response.data;
			});
		}
		function requestYearLevels(){
			return api.GET("year_levels",data,function(response){
			 	REGISRTY['YearLevels'] =  response.data;
			});
		}
		function registerRegistry(){
			angular.forEach($rootScope._APP,function(value,key){
				REGISRTY[key]= angular.copy(value);
			});
		}
		
		return {
			init:function(callback){
				requestDepartments().then(function(){
					requestPrograms().then(function(){
						requestYearLevels().then(function(){
							requestSections().then( function(){
								registerRegistry();
								REGISRTY.__USER = $rootScope.__USER;
								REGISRTY.ready = true;
								callback(REGISRTY);
							});
						});
					});
				});
			},
			isReady:function(){
				return REGISRTY.ready;
			},
			http:api
		}
	});
});