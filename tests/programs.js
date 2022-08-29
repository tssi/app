"use strict";
define(['model'],function($model){
	return new $model(
			{
				"meta": {
				"message": "List of Programs",
				"limit": 10,
				"next": null,
				"prev": null,
				"last": 1,
				"count": 4,
				"page": 1,
				"pages": 1,
				"epoch": 1594889642,
				"code": 200
				},
				"data": [
				{
				"id": "BSC",
				"name": "Basic Education",
				"description": "Basic Education",
				"alias": "HS",
				"esp": 2017,
				"order": 1
				},
				{
				"id": "STEM",
				"name": "STEM",
				"description": "Science Technology, Engineering & Math",
				"alias": "SH",
				"esp": 2017,
				"order": 2
				},
				]
				}
		);
});