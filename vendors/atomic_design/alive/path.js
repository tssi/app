"use strict";
define(['app'],function(app){
	app.register.factory("AtomicPath",[function(){
		return {
			url:function(file){
				var path =require.config().toUrl("vendors/atomic_design"+file+'?rand='+Math.random());
				var parent = require.config().toUrl("").split("/");
				if(parent.length>1)
					path  =  parent[0]+'/'+path;
				return path;
			}
		};
	}]);
});