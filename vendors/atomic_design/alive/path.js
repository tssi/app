"use strict";
define(['app'],function(app){
	app.register.factory("AtomicPath",[function(){
		return {
			url:function(file){
				var filePath = "vendors/atomic_design"+file+'?';
					if(window.location.hostname=="localhost")	
						filePath += 'rand='+Math.random();
				var path =require.config().toUrl(filePath);
				var parent = require.config().toUrl("").split("/");
				if(parent.length>1)
					path  =  parent[0]+'/'+path;
				return path;
			}
		};
	}]);
});