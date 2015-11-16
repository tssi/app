"use strict";
define([],function(){
	function model(value){
		var __meta = {},__data = [],object = {meta:__meta,data:__data};
		
		function list(){
			return angular.copy({meta:__meta,data:__data});
		};
		function error(){
			return angular.copy({meta:__meta});
		};
		function save(data){
			if(!data.hasOwnProperty('id')){
				data.id = __data.length;
				__data.push(data);
			}else{
				for(var i in __data){
					var datum = __data[i];
					if(datum.id==data.id){
						__data[i] = data;
						break;
					}
				}
			}
			return angular.copy({meta:__meta,data:data});
		}
		function setMeta(meta){
			__meta = meta;
		}
		function setData(data){
			for(var i in data){
				var datum = data[i];
				if(!datum.hasOwnProperty('id'))
					datum.id= __data.length;
				__data.push(datum);
			}
		}
		object.GET = function(){
			return {success:list(),error:error()};
		}
		object.POST = function(data){
			return {success:save(data),error:error()};
		}
		
		if(value.hasOwnProperty('meta'))setMeta(value.meta);
		if(value.hasOwnProperty('data'))setData(value.data);
		
		return object;
	}
	return model;
});