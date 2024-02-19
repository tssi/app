"use strict";
define(['app'],function(app){
	app.register.factory("AtomicPath",[function(){
		return {
			url:function(file){
				let cacheBreak="?";
				if(window.location.hostname=="localhost")
					cacheBreak='?rand='+Math.random();
				var path =require.config().toUrl("vendors/atomic_design"+file+cacheBreak);
				var parent = require.config().toUrl("").split("/");
				if(parent.length>1)
					path  =  parent[0]+'/'+path;
				return path;
			}
		};
	}]);
});