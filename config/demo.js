define(function() {
	return {
		run:function (settings,method,endpoint,data,success,error,$rootScope,$http,$timeout){
				if(settings.DEMO_MODE){
					$timeout(function(){
						require([settings.TEST_DIRECTORY+'/'+endpoint],function(response){
							$rootScope.$apply(function(){
								var resp = response[method](data);
								if(success&& settings.TEST_SUCCESS) {
									success(resp.success);
								}
								if(error && settings.TEST_ERROR) {
									error(resp.error);
								}
							});
						});
					},settings.TEST_DELAY);
					return this;
				}else{
					var url = settings.API_URL + endpoint + '.' + settings.API_EXT;
					var request ={
						  method: method,
						  url: url,
						  dataType: settings.API_EXT,
						  headers: {
						   'X-Requested-With': 'XMLHttpRequest',
						   'Content-Type': 'application'+settings.API_EXT,
						   'Accepts': 'application/'+settings.API_EXT
							}
						};
					
					if(method=='GET') {
						for(var key in data){
							if(typeof data[key] == "object")
								data[key] = data[key].join(',');
						}
						request.params = data;
					}
					else request.data = data;

					$http(request).success(success).error(error);
				}
			}
		};
});