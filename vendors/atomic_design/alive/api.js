"use strict";
define(['app','api'], function (app,api) {
	app.register.factory('AtomicAPI',function ($rootScope,api) {
		const REGISRTY = {};
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
		
		
		return {
			init:function(callback){
				requestDepartments().then(function(){
					requestSections().then( function(){
						angular.forEach($rootScope._APP,function(value,key){
							REGISRTY[key]=value;
						});
						callback(REGISRTY);
					});
				});
			}
		}
	});
});