define(function() {
	var requestCount=0;
	return {
		requestCount:0,
		run:function (settings,method,endpoint,data,success,error,$rootScope,$http,$timeout,$q){
				if(settings.DEMO_MODE){
					requestCount++;
					window.DEMO_REGISTRY=window.DEMO_REGISTRY||{};
					window.DEMO_REGISTRY.__CTR=window.DEMO_REGISTRY.__CTR||{};
					var deferred = $q.defer();
					var promise = deferred.promise;
					promise.then(function(response){
						success(response);
					},function(response){
						error(response);
					});
					if(endpoint=='register' ||endpoint=='login'||endpoint=='logout'){
						if(endpoint=='logout')
							data = {action:endpoint};
						else
							data.action =  endpoint;
						endpoint = 'users';
					}
					$timeout(function(){
						require([settings.TEST_DIRECTORY+'/'+endpoint],function(response){
							$rootScope.$apply(function(){
								var resp = response[method](data);
								if(success&& settings.TEST_SUCCESS) {
								deferred.resolve(resp.success);
								}
								if(error && settings.TEST_ERROR) {
									deferred.reject(resp.error);
								}
							});
							requestCount--;
						});
					},settings.TEST_DELAY*requestCount);
					return promise;
				}else{
					var url = settings.API_HOST+settings.API_URL + endpoint + '.' + settings.API_EXT;
					var request ={
						  method: method,
						  url: url,
						  dataType: settings.API_EXT,
						  headers: {
						   'X-Requested-With': 'XMLHttpRequest',
						   'Content-Type': 'application/'+settings.API_EXT,
						   'Accepts': 'application/'+settings.API_EXT
							}
						};
					if(typeof data =='object' && data){
						console.log(data);
						if(data.hasOwnProperty('token')){
							
							request.headers['Authorization']= `Bearer ${data.token}`;
							delete data.token;
						}
					}
					
					if(method=='GET') {
						for(var key in data){
							if(typeof data[key] == "object")
								data[key] = data[key].join(',');
						}
						request.params = data;
					}
					else request.data = data;

					return $http(request).success(success).error(error);
				}
			}
		};
});