"use strict";
define([],function(){
	function model(value){
		var DEFAULT_PAGE = 1;
		var DEFAULT_ITEM = 5;
		var __meta = {},__data = [],object = {meta:__meta,data:__data};
		
		function list(){
			var config = arguments[0]||{};
			var page = config.page||DEFAULT_PAGE;
			var limit = config.limit||DEFAULT_ITEM;
			var index = ((page - 1) * limit);
			var data = __data.slice(index,index+limit);
			var meta = __meta;
			meta.page = page;
			meta.count = __data.length;
			meta.last = Math.ceil(meta.count/limit);
			meta.next =  page<meta.last?page+1:null;
			meta.prev =  page>1?page-1:null;
			return angular.copy({meta:meta,data:data});
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
		object.GET = function(data){
			return {success:list(data),error:error()};
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