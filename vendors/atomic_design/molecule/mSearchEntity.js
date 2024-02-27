"use strict";
define(['app'], function (app) {
	app.register.directive('mSearchEntity',['$rootScope','AtomicPath','AtomicAPI','Atomic','api',
		function ($rootScope,aPath,aApi,atomic) {
			const  DEFAULT = {
								elemID:1000,
								allowCreate:false,
								endpoint:'students',
								display:'full_name',
								objFields:['id','first_name','middle_name','last_name'],
								searchFields:['first_name','middle_name','last_name'],
								placeholder:['Search','Search by'],};
			var $elem,div,input,elemIDCtr;
			elemIDCtr = DEFAULT.elemID;
			return{
					required:'ngModel',
					restrict: 'E',
					replace:true,
					scope:{
						ObjModel:'=ngModel',
						Filter:'=?filter',
						Endpoint:'=?endpoint',
						SearchFields:'=?searchFields',
						ObjectFields:'=?objFields',
						DisplayField:'=?displayField',
						AllowCreate:'=?allowCreate',
						IsLarge:'=?isLarge',
						PlaceholderText:'@?placeholder',

					},
					templateUrl:function(elem,attr){
						return aPath.url('/view/molecule/mSearchEntity.html');
					},
					link:function($scope, elem){
						console.log(elem);
						$elem = angular.element(elem[0]);
						$scope.UIdiv = $elem.find('div')[0];
						$scope.UIinput = $elem.find('input')[0];

						$scope.Endpoint = $scope.Endpoint||DEFAULT.endpoint;
						$scope.Display = $scope.DisplayField||DEFAULT.display;
						$scope.Placeholder = angular.copy(DEFAULT.placeholder);
						
						// By pass placholder text
						if($scope.PlaceholderText){
							$scope.Placeholder[0] = $scope.PlaceholderText;
						}
						$scope.Fields = $scope.SearchFields||DEFAULT.searchFields;
						// Add placeholder helper
						$scope.Placeholder[1] += ' '+$scope.Fields.join(', ');
						$scope.ObjectFields =$scope.ObjectFields|| DEFAULT.objFields;
						$scope.AllowCreate =$scope.AllowCreate|| DEFAULT.allowCreate;
						$scope.ELEM_ID = elemIDCtr++;
						$scope.ElementId = 'searchEntity-'+elemIDCtr;
						console.log(elemIDCtr);

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
								$scope.UIinput.nextSibling.style.width = $scope.UIdiv.offsetWidth+'px';
								var display = $scope.Display||{};
								var tokens = display.length?display.split(' '):display;
								var source;
								if(response.data){
									source = response.data.map(function(item){
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
								}
								
								return source;
							});
						}
					}
				};
	}]);
});