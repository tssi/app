"use strict";
define(['model'],function($model){
	return new $model(
			{
				"meta": {
				"message": "List of Departments",
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
				"id": "HS",
				"name": "H.School",
				"description": "High School",
				"alias": "HS",
				"esp": 2017,
				"order": 1
				},
				{
				"id": "SH",
				"name": "S.High",
				"description": "Senior HS",
				"alias": "SH",
				"esp": 2017,
				"order": 2
				},
				{
				"id": "PS",
				"name": "P.School",
				"description": "Pre School",
				"alias": "PS",
				"esp": 2017,
				"order": 3
				},
				{
				"id": "GS",
				"name": "G.School",
				"description": "Grade School",
				"alias": "GS",
				"esp": 2017,
				"order": 4
				}
				]
				}
		);
});