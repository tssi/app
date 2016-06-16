"use strict";
define(['settings'],function(settings){
	function model(value,registry){
		var DEFAULT_PAGE = 1;
		var DEFAULT_ITEM = 5;
		var __meta = {},__data = [],__uses=[],object = {meta:__meta,data:__data};
		var registered = false;
		if(registry!=undefined){
			DEMO_REGISTRY[registry.name] = {};
			if(registry.uses){
				var models = registry.uses;
				for(var i in models){
					var endpoint =  models[i];
					require([settings.TEST_DIRECTORY+'/'+endpoint]);
				}
			}
			registered = true;
		}
		function list(){			
			var config = arguments[0]||{};
			var page = config.page||DEFAULT_PAGE;
			var limit = __meta.limit||DEFAULT_ITEM;
			var keyword = config.keyword;
			var fields = config.fields;
			var index = limit=='less'?null:((page - 1) * limit);
			var data = __data;
			var __class = __meta.class;
			if(keyword&&fields){
				var _d=[];
				var regex = new RegExp(keyword, 'i');
				for(var i in data){
					var d  =  data[i];
					var t = false;
					for(var ii in fields){
						var f =  fields[ii];
						t = t || regex.test(d[f]);
					}
					if(t){
						_d.push(d);
					}
				}
				data = _d;
			}

			var regEx =  new RegExp('page|limit|keyword|fields');
			for(var field in config){
				var match = config[field];
				if(!regEx.test(field)){
					var _d=[];
					for(var i in data){
						var d  =  data[i];
						var t = d[field]==match;
						if(!d.hasOwnProperty(field))
							t = t && true;
						if(t){
							_d.push(d);
						}
					}
					data = _d;
				}
			}
			var count =  data.length;
			if(index!=null&&__class!="SystemDefault")
				data = data.slice(index,index+limit);
			var meta = __meta;
			meta.page = page;
			meta.limit = limit;
			if(__class!="SystemDefault"){
				meta.count = count;
				meta.last = limit=='less'?1:Math.ceil(meta.count/limit);
				meta.next =  page<meta.last?page+1:null;
			}
			meta.prev =  page>1?page-1:null;
			return angular.copy({meta:meta,data:data});
		};
		function error(){
			return angular.copy({meta:__meta});
		};
		function save(data){
			var saved = false;
			if(!data.hasOwnProperty('id')){
				data.id = __data.length;
			}else{
				for(var i in __data){
					var datum = __data[i];
					if(datum.id==data.id){
						for(var ii in data){
							__data[i][ii] = data[ii];
						}
						saved=true;
						break;
					}
				}
			}
			if(!saved){
				__data.push(data);
			}
			if(registered)
				DEMO_REGISTRY[registry.name]=__data;
			return angular.copy({meta:__meta,data:data});
		}
		function remove(data){
			if(data.hasOwnProperty('id')){
				for(var i in __data){
					var datum = __data[i];
					if(datum.id==data.id){
						__data.splice(i,1);
						break;
					}
				}
			}
			if(registered)
				DEMO_REGISTRY[registry.name]=__data;
			return angular.copy({meta:__meta,data:data});
		}
		function setMeta(meta){
			__meta = meta;
		}
		function setData(data){
			var __class = __meta.class;
			if(__class=="SystemDefault"){
				__data = data;
				return;
			}
			for(var i in data){
				var datum = data[i];
				if( typeof datum=='object'){
					if(!datum.hasOwnProperty('id'))
						datum.id= __data.length;
					__data.push(datum);
				}else{
					__data[i] =  datum;
				}
				
			}
			if(registered)
				DEMO_REGISTRY[registry.name]=__data;
		}
		object.GET = function(data){
			return {success:list(data),error:error()};
		}
		object.POST = function(data){
			return {success:save(data),error:error()};
		}
		object.DELETE = function(data){
			return {success:remove(data),error:error()};
		}
		object.PUT = function(data){
			return {success:save(data),error:error()};
		}
		object.save = save;
		object.remove = remove;
		if(value.hasOwnProperty('meta'))setMeta(value.meta);
		if(value.hasOwnProperty('data'))setData(value.data);
			
		
		return object;
	}
	return model;
});