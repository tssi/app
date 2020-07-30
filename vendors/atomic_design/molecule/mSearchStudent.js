"use strict";
define(['app'], function (app) {
	app.register.directive('mSearchStudent',['$rootScope','AtomicPath','AtomicAPI','Atomic','api',
		function ($rootScope,aPath,aApi,atomic) {
			const  DEFAULT = {
								elemID:1000,
								endpoint:'students',
								display:'full_name',
								objFields:['sno','lrn','gender','year_level','section','department_id','section_id'],
								searchFields:['full_name', 'middle_name'],
								placeholder:['Student','Search student...'],};
			var $elem,div,input;
			return{
					required:'ngModel',
					restrict: 'E',
					replace:true,
					scope:{
						ObjModel:'=ngModel',
						Filter:'=?filter',
					},
					templateUrl:function(elem,attr){
						return aPath.url('/view/molecule/mSearchStudent.html');
					},
					link:function($scope, elem){
						$elem = angular.element(elem[0]);
						div = $elem.find('div')[0];
						input = $elem.find('input')[0];
						
						
						$scope.Endpoint = DEFAULT.endpoint;
						$scope.Display = DEFAULT.display;
						$scope.Placeholder = DEFAULT.placeholder;
						$scope.Fields = DEFAULT.searchFields;
						$scope.ObjectFields = DEFAULT.objFields;
						$scope.ELEM_ID = DEFAULT.elemID++;

					},
					controller:function($scope){
						$scope.$watch('ObjModel',function(value){
							if(!value) return;
							if(value.id){
								$scope.ShowBtn=true;
							}else{
								$scope.ShowBtn=false;
							}
						});
						$scope.$watch('ShowBtn',function(value){
							console.log(value);
						});
						$scope.updateShowBtn = function(model){
							console.log(model);
							$scope.ShowBtn=model.id?true:false
						}
						$scope.clearSearch  = function(){
							$scope.ObjModel = {id:null,name:null};
							$scope.ShowBtn=false;
						}
						$scope.getResults = function(value,filter){
							filter = filter || {}
							var fields =  $scope.Fields;
							var objFields =  $scope.ObjectFields||null;
							var data = {keyword:value,fields:fields};
							for(var field in filter){
								data[field] = filter[field];
							}
							var dropdown = $elem.find('ul')[0];
								dropdown.style['min-width']='100%';
								console.log(dropdown,'SK');
							return aApi.http.GET($scope.Endpoint,data,function(response){
							
							}).then(function(response){
								if(!app.settings.DEMO_MODE)
									response =  response.data;
								input.nextSibling.style.width = div.offsetWidth+'px';
								var display = $scope.Display||{};
								var tokens = display.length?display.split(' '):display;
								var source = response.data.map(function(item){
									var id =  item.id;
									var name = [];
									if(tokens.length){
										for(var i in tokens){
											var token = tokens[i];
											if(item.hasOwnProperty(token)){
												name.push(item[token]);
											}
										}
										name = name.join(' ');
									}else{
										name =  item.name;
									}
									//Minimum object fields
									var obj = {
										name:name,
										id:id
									}
									
									//Additional fields for the object
									for(var i in objFields){
										var key=objFields[i];
										obj[key]=item[key];
									}
									return obj;
								  });
								return source;
							});
						}
					}
				};
	}]);
});