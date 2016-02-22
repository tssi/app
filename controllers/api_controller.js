"use strict";
define(['app'], function(app){
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
				if(app.settings.DEMO_MODE){
					$timeout(function(){
						require([app.settings.TEST_DIRECTORY+'/'+endpoint],function(response){
							$rootScope.$apply(function(){
								var resp = response[method](data);
								if(success&& app.settings.TEST_SUCCESS) {
									success(resp.success);
								}
								if(error && app.settings.TEST_ERROR) {
									error(resp.error);
								}
							});
						});
					},app.settings.TEST_DELAY);
					return this;
				}else{
					var url = app.settings.API_URL + endpoint + '.' + app.settings.API_EXT;
					var request ={
						  method: method,
						  url: url,
						  dataType: app.settings.API_EXT,
						  headers: {
						   'X-Requested-With': 'XMLHttpRequest',
						   'Content-Type': 'application'+app.settings.API_EXT,
						   'Accepts': 'application/'+app.settings.API_EXT
							}
						};
					for(var key in data){
						if(typeof data[key] == "object")
							data[key] = data[key].join(',');
					}
					if(method=='GET') request.params = data;
					else request.data = data;

					$http(request).success(success).error(error);
				}
			}
		}
	});
	
});