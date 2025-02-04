"use strict";
define(['app','exceljs'], function (app,exceljs) {
	app.register.directive('mFileupload',['$rootScope','$http','Atomic','AtomicPath',function ($rootScope,$http,atomic,aPath) {
		const DEFAULT = {elemID:1000,accept:'any'};
		const _URL = window.URL || window.webkitURL;
		return{
			restrict: 'E',
			require:"ngModel",
			scope:{
				FileModel:'=ngModel',
				FileUploadUrl:'@?uploadUrl',
				FilePreview:'=?preview',
				FileAccept:'@?accept',
				FileValidations:'=?validate',
				FileInpuName:'@?name',
				FileRequired:'=?ngRequired'
			},
			transclude:false,
			templateUrl:function(elem,attr){
				return aPath.url('/view/molecule/mFileupload.html');
			},
			link: function($scope,elem, attrs) {
				var fileInput = angular.element(elem[0].querySelector('input[type="file"]'));
				var accept =  $scope.FileAccept || DEFAULT.accept;
					accept = accept.split(" ");
				var types = [];
				var captions = [];
				for(var i in accept){
					switch(accept[i]){
						case 'images': // Images jpg & png only
							types.push('image/jpeg');
							types.push('image/png');
							captions.push('image (.jpg/.png)');
							break;
						case 'pdf': // PDF File
							types.push('.pdf');
							types.push('application/pdf');
							captions.push('PDF (.pdf)');
							break;
						case 'csv': // CSV File
							types.push('.csv');
							captions.push('CSV (.csv)');
							break;
						case 'excel': // .xls Excel 97-2003
							types.push('.xlsx');
							types.push('application/vnd.ms-excel');
							types.push('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
							captions.push('Excel (.xls,.xlsx)');
							break;
						case 'any':
							types.push('*/*');
							captions = ['files'];
							break;
					}
				}

				
				$scope.FileTypes =  types.join(',');
				$scope.Caption  =  captions.join(',');

				function validateURL(url){
					var xhr = new XMLHttpRequest();
					xhr.onreadystatechange = function(){
						if(this.response){

						   	var type = this.response.type;
						   	var size = this.response.size;
						   	$scope.FileSize = size;
						   	//console.log(type, size,this.response);
						    switch(type){
						    	case 'image/*':
						    	case 'image/png':
						    	case 'image/jpeg':
							    	$scope.$apply(function(){
							    		$scope.FileType = 'image';
							    		$scope.FileModel = null;
							    		$scope.PreviewFile(url);
							    	});
						    	break;

						    }
						}
					}
					xhr.open('GET', url);
					xhr.responseType = 'blob';
					xhr.send();

				}
				function validateImage(file){
					var validations =  $scope.FileValidations;
					var img = new Image();
					var objectUrl = _URL.createObjectURL(file);
					var valid =  true;
					var errors = [];
					img.onload = function () {
						var W =  this.width;
						var H =  this.height;
						var S =  $scope.FileSize;
						_URL.revokeObjectURL(objectUrl);
						console.log(typeof validations);
						if( typeof validations == 'object'){
							var validate = Object.keys(validations);
							for(var i in validate){

								switch(validate[i]){
									case 'minWidth':
										var validW = validations.minWidth<W;
										valid = valid  && validW;
										if(!validW)
											errors.push('Min Width: '+validations.minWidth +'px');
									break;
									case 'minHeight':
										var validH = validations.minHeight<H;
										valid = valid  && validH;
										if(!validH)
											errors.push('Min Height: '+validations.minWidth +'px');
									break;
									case 'maxSize':
										var validS = validations.maxSize>S;
										valid = valid  && validS;
										if(!validS)
											errors.push(' Max File size:' + formatBytes(validations.maxSize,0));
									break;
								}
							}
							
						}
						
						if(valid){
							$scope.$apply(function(){
								$scope.FileModel = file;

								var reader = new FileReader();
								reader.onload = function (loadEvent) {
									$scope.$apply(function () {
										$scope.PreviewFile(loadEvent.target.result);
									});
								}
								reader.readAsDataURL(file);
							});
						}else{
							alert(errors.join('\n'));
						}
					};
					img.src = objectUrl;
				}
				function validateExcel(file){
					console.log(file, new Date());
					$scope.FileModel =null;
					const WB = {filename:file.name,activeSheet:1,worksheets:[],data:[]};
					function loadWorksheet(id){
						var worksheet = workbook.getWorksheet(id);
						var wsData = [];
						worksheet.eachRow(function(row, rowNumber) {
						  	wsData.push(row.values);
						});
						WB.data=wsData;
						$scope.FileModel= WB;
						
						
					}
					var success =  function(){
						workbook.eachSheet(function(worksheet, sheetId) {
						 	var ws = {id:sheetId, name:worksheet.name};
						 	WB.worksheets.push(ws);
						});
						$scope.$apply(function(){
							loadWorksheet(WB.activeSheet);	
						});
						
						$scope.$watch('FileModel.activeSheet',function(id){
							if(id)
								loadWorksheet(id);
						});
						
					}
					var error =  function(err){
						alert("Invalid Excel file. It should be .xlsx. Try again!");
					}

					const workbook = new exceljs.Workbook();
					
					workbook.xlsx.load(file).then(success,error);
					
					$scope.$on('LoadWorksheet',function(wsObj){
						loadWorksheet(wsObj.id);
					});

				}
				function validatePDF(file){
					$scope.FileSize = file.size;
					var S =  $scope.FileSize;
					var valid =true;
					var errors = [];
					var validations =  $scope.FileValidations;
					if( typeof validations == 'object'){
						var validate = Object.keys(validations);
						for(var i in validate){
							switch(validate[i]){
								
								case 'maxSize':
									var validS = validations.maxSize>S;
									valid = valid  && validS;
									if(!validS)
										errors.push(' Max File size:' + formatBytes(validations.maxSize,0));
								break;
							}
						}
						
					}
					if(valid){
						
						$scope.FileModel = file;
						$scope.FileModel.filename =  file.name;
						var reader = new FileReader();
						reader.onload = function (loadEvent) {
							$scope.$apply(function () {
								$scope.PreviewFile(loadEvent.target.result);
							});
						}
						reader.readAsDataURL(file);
						
					}else{
						alert(errors.join('\n'));
					}
				}
				function validateCSV(file){
					 if (file) {
				        const reader = new FileReader();
				        
				        reader.onload = function(e) {
				            const text = e.target.result;
				            const parsedData = parseCSV(text);
				            $scope.$apply(function () {
				            	$scope.PreviewFile(parsedData);
				        	});
				        };
				        
				        reader.readAsText(file);
				    }
				}
				function parseCSV(text) {
				    const lines = text.split('\n');
				    const headers = lines[0].split(',').map(header => header.trim());
				    const data = lines.slice(1).map(line => {
				        const values = line.split(',').map(value => value.trim());
				        const obj = {};
				        headers.forEach((header, index) => {
				            obj[header] = values[index];
				        });
				        return obj;
				    });
				    return data;
				}
				function readFile(file){
					$scope.FileModel= file;
					var reader = new FileReader();
						reader.onload = function (loadEvent) {
							$scope.$apply(function () {
								$scope.PreviewFile(loadEvent.target.result);
							});
						}
						reader.readAsDataURL(file);
				}
				function formatBytes(bytes, decimals = 2) {
				    if (bytes === 0) return '0 Bytes';

				    const k = 1024;
				    const dm = decimals < 0 ? 0 : decimals;
				    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

				    const i = Math.floor(Math.log(bytes) / Math.log(k));

				    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
				}

				fileInput.bind('change', function(changeEvent) {
					$scope.$apply(function() {
						if(fileInput[0].files){
							$scope.ReadingFile =true;
							var file = fileInput[0].files[0];
							$scope.FileSize= file.size;
							console.log(file);
							switch(file.type){
								case 'image/png':
								case 'image/jpeg':
									$scope.FileType = 'image';
									validateImage(file);
								break;
								case 'application/vnd.ms-excel':
								case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
									$scope.FileType = 'excel';
									validateExcel(file);
								break;
								case 'application/pdf':
									$scope.FileType = 'pdf';
									validatePDF(file);
								break;
								case 'text/csv':
									$scope.FileType = 'csv';
									validateCSV(file);
								break;
								default:
									console.log(file);
									$scope.FileType = file.type;
									readFile(file);
								break;
							}
							$scope.ReadingFile=false;
							
						}
					});
					
					//Preview file
					/*var reader = new FileReader();
					reader.onload = function (loadEvent) {
						$scope.$apply(function () {
							$scope.PreviewFile(loadEvent.target.result);
						});
					}
					reader.readAsDataURL(changeEvent.target.files[0]);*/
				});

				$scope.$watch('FilePreview',function(preview){
					$scope.FileSize = 0;
					if(!preview || typeof preview =='number')
						return $scope.FileType = null;
					validateURL(preview);
					
				});
				$scope.PreviewFile = function(preview){
					switch($scope.FileType){
						case 'image':
							elem[0].querySelector('img.FilePreview').src = preview;
						break;
						case 'csv':
							
							$scope.FileModel =  preview;
							console.log($scope.FileModel);
						break;
						default:
							console.log($scope.FileType,preview);
						break;
					}
				}
				$scope.ELEM_ID = DEFAULT.elemID++;
				
			},
			controller:function($scope){

				$scope.$on('FileUploadStart',function(evt,args){
					var fd = new FormData();
						fd.append('file', $scope.FileModel);
						fd.append('meta',JSON.stringify(args));
					var hdr = {
						  transformRequest: angular.identity,
						  headers: {'Content-Type': undefined}
						};
					$scope.FileUploadSucess = false;
					$scope.FileUploadError = false;
					$scope.FileUploadStarted = true;
					$http.post($scope.FileUploadUrl, fd, hdr)
					.success(function() {
						var fileInput = angular.element(document.getElementById('fileInput-'+$scope.ELEM_ID));
						fileInput.val(null);
						$scope.FileUploadStarted = false;
						$scope.FileUploadSucess = true;
						$scope.FileModel.success =true;
					}).error(function() {
						$scope.FileUploadStarted = false;
						$scope.FileUploadError = true;
						$scope.FileModel.success =false;

					});
				});
			}

		}
	}]);
});