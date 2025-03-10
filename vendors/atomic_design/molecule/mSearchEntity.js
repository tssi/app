"use strict";
define(['app'], function (app) {
	app.register.directive('mSearchEntity',['$rootScope','$timeout','AtomicPath','AtomicAPI','Atomic','api',
		function ($rootScope,$timeout,aPath,aApi,atomic) {
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
						CreatedId:'=?createdId'


					},
					templateUrl:function(elem,attr){
						return aPath.url('/view/molecule/mSearchEntity.html');
					},
					link:function($scope, elem){
						console.log(elem);
						$scope.UIelem = angular.element(elem[0]);
						$scope.UIdiv =	$scope.UIelem.find('div')[0];
						$scope.UIinput = $scope.UIelem.find('input')[0];

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
							console.log(value,$scope.AllowCreate);
							if(value.id || $scope.AllowCreate){
								$scope.ShowBtn=true;
							}else{
								$scope.ShowBtn=false;
							}
							console.log($scope.ShowBtn);
						});
						$scope.$watch('ShowBtn',function(value){
							console.log(value);
						});
						$scope.updateShowBtn = function(model){
							console.log(model,new Date());
							$scope.ShowBtn=model.id?true:false
						}
						$scope.handleClick  = function(){
							if($scope.uiClear){
								$scope.ObjModel = {id:null, name:null};
								$scope.ShowBtn=false;
							}
							$scope.ObjModelOptions={};
							if($scope.uiCreate){
								$scope.CreatedId = null;
								$scope.ObjModelOptions = {getterSetter:true};
								let name = $scope.ObjModel.name || $scope.ObjModel;
								let obj =angular.copy($scope.Filter);
									obj[$scope.DisplayField] = name;
								let success = function(response){
									obj.id = response.data.id;
									$scope.CreatedId = obj.id;
									$scope.loadingRecords = false;
								}; 
								let error = function(response){
									console.log(response);
									alert(response.message);
								}; 
								aApi.http.POST($scope.Endpoint,obj,success,error);
							}
						}
						$scope.$watchGroup(['loadingRecords','ObjModel','CreatedId'],function(values){
							let allowAdd = $scope.AllowCreate;
							let loadRec = values[0];
							let objMod = values[1];
							$scope.uiLoading =loadRec;
							$scope.uiSearch =!loadRec && !objMod; 
							$scope.uiClear = objMod.id || values[3]; 
							$scope.uiCreate = allowAdd  && !values[3] && (objMod || objMod.name!=null) && !objMod.id && !loadRec;

						});
						$scope.getResults = function(value,filter){
							filter = filter || {}
							var fields =  $scope.Fields;
							var objFields =  $scope.ObjectFields||null;
							var data = {keyword:value,fields:fields};
							for(var field in filter){
								data[field] = filter[field];
							}
							var dropdown = $scope.UIelem.find('ul')[0];
								dropdown.style['min-width']='100%';
								//console.log(dropdown,'SK');
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
									if (source.length === 1) {
						                $scope.ObjModel = source[0]; // Auto-assign the only result
						                 // **Hide dropdown by blurring input**
						                $timeout(function() {
						                	
						                	var dropdown = $scope.UIelem.find('ul')[0];
						                	console.log($scope.UI,dropdown);
									        if (dropdown) {
									            dropdown.style.display = 'none';
									        }
						                },200);
						            }
								}
								
								return source;
							});
						}
					}
				};
	}]);
});