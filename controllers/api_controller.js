"use strict";
define(['app','demo'], function(app,demo){
	 app.register.factory('api',function($http,$timeout,$rootScope){
		return{
			POST:function(){
				return this.HTTP('POST',arguments);
			},
			GET:function(){
				return this.HTTP('GET',arguments);
			},
			DELETE:function(){
				return this.HTTP('DELETE',arguments);
			},
			PUT:function(){
				return this.HTTP('PUT',arguments);
			},
			HTTP:function(method,__args){
				var self = this;
				var endpoint,data,success,error;
				if(__args.length){
					if(typeof __args[0] =='string') endpoint = __args[0];
					if(typeof __args[1] =='object') data = __args[1];
					if(typeof __args[1] =='function') success = __args[1];
					else if(typeof __args[2] =='function') success = __args[2];
					if(__args.length>3||!data) error = __args[__args.length-1];
					else error = function(){};
				}else{
					throw new Error("Incomplete arguments");
				}
				return demo.run(app.settings,method,endpoint,data,success,error,$rootScope,$http,$timeout);
			}
		}
	});
	
});