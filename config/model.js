"use strict";
define(['settings'],function(settings){
	function model(value,registry){
		const DEFAULT_PAGE = 1;
		const DEFAULT_ITEM = 5;
		const RANDNAME = (function(){
				do{
					name = (Math.floor(Math.random()*Math.pow(32,4))>>>0).toString(32).toUpperCase();
				}while(DEMO_REGISTRY.__CTR[name]!=undefined);
				return name;
			})();
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
		
		DEMO_REGISTRY.__CTR[RANDNAME] = 0;
		
		function list(){			
			var config = arguments[0]||{};
			var page = config.page||DEFAULT_PAGE;
			var limit =config.limit|| __meta.limit||DEFAULT_ITEM;
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
			meta.range = {};
			meta.range.from = (meta.page-1)*meta.limit+1; 
			meta.range.to = meta.range.from+(meta.limit-1);
			if(meta.range.to>meta.count){
				meta.range.to = meta.count;
			}
			return angular.copy({meta:meta,data:data});
		};
		function error(){
			return angular.copy({meta:__meta});
		};
		function save(data){
			var saved = false;
			var lastId = DEMO_REGISTRY.__CTR[RANDNAME];
			if(!data.hasOwnProperty('id')){
				data.id = lastId+1;
				lastId = data.id;
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
			DEMO_REGISTRY.__CTR[RANDNAME] = lastId;
			var indeces = [];
			for(var i in __data){
				indeces.push(__data[i].id);
			}
			var index=  indeces.indexOf(data.id);
			var p =  (Math.floor(index/__meta.limit))+1;
			list({page:p});
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
				if(registered)
					DEMO_REGISTRY[registry.name]=__data;
				return;
			}
			var lastId = DEMO_REGISTRY.__CTR[RANDNAME];
			for(var i in data){
				var datum = data[i];
				if( typeof datum=='object'){
					if(!datum.hasOwnProperty('id'))
						datum.id= lastId+1;
					__data.push(datum);
				}else{
					__data[i] =  datum;
				}
				lastId=datum.id;
			}
			if(isNaN(parseInt(lastId)))
				lastId =  data.length-1;
			DEMO_REGISTRY.__CTR[RANDNAME] = lastId;
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
		object.list = list;
		object.save = save;
		object.remove = remove;
		if(value.hasOwnProperty('meta'))setMeta(value.meta);
		if(value.hasOwnProperty('data'))setData(value.data);
			
		
		return object;
	}
	return model;
});