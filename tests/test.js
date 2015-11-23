"use strict";
define(['model'],function($model){
	return new $model(
			{
				meta:{
					title: 'Test title',
				},
				data:[
					{id:1,title:'Sample',description:'Sample description'},
					{id:2,title:'Sample 2',description:'Sample  second description'},
					{id:3,title:'Sample 3',description:'Sample  third description'},
					{id:4,title:'Sample 4',description:'Sample  fourth description'},
					{id:5,title:'Sample 5',description:'Sample  fifth description'},
					{id:6,title:'Sample 6',description:'Sample  sixth description'},
					{id:7,title:'Sample 7',description:'Sample  seventh description'},
					{id:8,title:'Sample 8',description:'Sample  eighth description'},
					{id:9,title:'Sample 9',description:'Sample  eighth description'},
					{id:10,title:'Sample 10',description:'Sample  eighth description'},
					{id:11,title:'Sample 11',description:'Sample  eighth description'},
					{id:12,title:'Sample 12',description:'Sample  eighth description'},
				]
			}
		);
		//test.setMeta({title:'Test'});
		//test.setData([{title:'Sample','description':'dasd'}]);
		/*
		test.GET = function(){
			return {success:test.list()};
		}
		test.POST = function(data){
			return {success:test.save(data)};
		}
		*/
});