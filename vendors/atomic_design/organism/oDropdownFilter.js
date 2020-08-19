"use strict";
define(['app'], function (app) {
	app.register.directive('oDropdownFilter',['$rootScope','AtomicPath','Atomic',function ($rootScope,aPath,atomic) {
		const  DEFAULTS = {entryLimit:10,showPeriod:true,showSectionUI:'search'};
		return {
			restrict: 'E',
			scope:{
				Active:'=ngModel',
				showSem:'=?',
				showPeriod:'=?',
				showYearLevel:'=?',
				showSection:'=?',
				showSectionUI:'@?',
				dropdownPreview:'@?',
				liveUpdate:'=?',

			},
			replace:true,
			transclude:true,
			templateUrl:function(elem,attr){
				return aPath.url('/view/organism/oDropdownFilter.html');
			},
			link: function($scope,elem, attrs,ctrl,transclude) {
				transclude(function(clone){
					$scope.isOverloaded = clone.length>1;
				});
			},
			bindToController:true,
			controllerAs:'oFilterDropdownCtrl',
			controller:function($scope){
				$scope.oFilterDropdownCtrl.showSectionUI = $scope.showSectionUI || DEFAULTS.showSectionUI;
				$scope.oFilterDropdownCtrl.showPeriod = $scope.showPeriod || DEFAULTS.showPeriod;
				$scope.SectSearchObj = ['id','name','alias','department_id','program_id','year_level'];
				function bindData(){
					$scope._APP =  $rootScope._APP;
					$scope._APP.Departments =  atomic.Departments;
					$scope._APP.Sections =  atomic.Sections;
					
					$scope._APP.YearLevels =  atomic.YearLevels;
					var active = {
									dept:atomic.ActiveDept,
									sy:atomic.ActiveSY,
									sem:atomic.SelectedSem,
									period:atomic.SelectedPeriod
								};
					if(!$scope.oFilterDropdownCtrl.showPeriod)
						delete active.period;
					
					if(active.period){
						if(active.period.id>4)
							active.period.id = active.period.id/10;
						active.esp =  parseFloat(active.sy+'.'+active.period.id);
					}
					$scope.oFilterDropdownCtrl.Active = active;
				}

				if(atomic.ready(bindData).fuse())
					$rootScope.$on('$routeChangeSuccess',bindData);

				$scope.$watch("oFilterDropdownCtrl.Active",buildActive);

				function buildActive(val){
					var active =  val||{dept:null,sy:null,sem:null,period:null,esp:null};
						$scope.ActiveDept =  active.dept;
						$scope.ActiveSY =  active.sy;
						$scope.ActiveESP =  active.esp;
						if($scope.oFilterDropdownCtrl.showPeriod)
							$scope.SelectedPeriod =  active.period;
						$scope.SelectedSemester =  active.sem;
					$scope.currentPage = 1;
					renderPreview(active);
				}
				$scope.toggleText='More';
				
				$scope.setActiveSY = function(sy){
					$scope.ActiveSY =  sy;
				}
				$scope.setSelectedSemester = function(sem){
					$scope.SelectedSemester =  sem;
					//Fix selected period when switching between semester
					var flag =  sem.id==25?-2:2;
					var index = ($scope.SelectedPeriod.id-1)+flag;
					$scope.setSelectedPeriod(atomic.Periods[index])

				}
				$scope.setSelectedPeriod = function(period){
					$scope.SelectedPeriod = period;
				}
				$scope.setActiveDept = function(dept){
					$scope.ActiveDept = dept;
				}

				$scope.setActiveYearLevel = function(level){
					if($scope.ActiveYearLevel == level) level = null;
					$scope.ActiveYearLevel =  level;
					$scope.currentPage = 1;
					$scope.sanaAll = false;
					var entryLimit = $scope.entryLimit = DEFAULTS.entryLimit;
					var sections = $scope._APP.Sections;
					var yearlevel = $scope.ActiveYearLevel;
					var activeSections = [];
					for(var i in sections){
						var section = sections[i];
						if(section.year_level_id==yearlevel.id){
							activeSections.push(section);
						}
					}
					$scope.ActiveSections = activeSections;
					$scope.ActiveSection = null;
					$scope.lastPage =  Math.ceil(activeSections.length/entryLimit);
				}
				$scope.toggleAll = function(){
					$scope.sanaAll = !$scope.sanaAll;
					$scope.entryLimit = $scope.sanaAll?null: DEFAULTS.entryLimit;
					$scope.currentPage=1;
					
				}
				$scope.setCurrentPage = function(change){
					$scope.currentPage += change;
				}
				$scope.$watch('oFilterDropdownCtrl.SearchSection',function(section){
					if(section){
						$scope.setActiveSection(section);	
					} 
				});
				$scope.setActiveSection = function(sect){
					
					if($scope.ActiveSection ==sect) sect = null;
					if(sect=='all'){

						var sections = $scope.ActiveSections;
						var ids = [];
						for(var i in sections){
							var section =  sections[i];
							ids.push(section.id);
						}
						var allSections = angular.copy(sections[0]);
						allSections.id = 'all';
						allSections.ids = ids;
						allSections.program_id = null;
						allSections.name = "All "+allSections.year_level;
						allSections.alias = allSections.name;
						allSections.description = allSections.name;

						if($scope.ActiveSection)
							if($scope.ActiveSection.id=='all')
								return $scope.ActiveSection=null;
						$scope.ActiveSection = allSections;
					}else{
						$scope.ActiveSection =  sect;
					}
				}
				$scope.toggleOtherSY = function(){
					$scope.toggleDropdown = !$scope.toggleDropdown;
					$scope.toggleText = $scope.toggleText == 'More'?'Less':'More';
				}

				$scope.closeFilter = function(){
					$scope.openDropdown = false;
				}
				$scope.confirmFilter = function(){
					var active = mutateActive();
					$scope.oFilterDropdownCtrl.Active = active;
					$scope.openDropdown = false;
					renderPreview(active);
				}
				$scope.$watchGroup(['ActiveDept','ActiveSY',
									'SelectedSemester','SelectedPeriod',
									'ActiveSection','ActiveYearLevel'],function(){
							 $scope.oFilterDropdownCtrl.liveUpdate =  mutateActive();
				});
				function mutateActive(){
					var active =  {dept:$scope.ActiveDept,
									sy:$scope.ActiveSY,
									sem:$scope.SelectedSemester,
									period:$scope.SelectedPeriod
									
								};
					if(!$scope.oFilterDropdownCtrl.showPeriod)
						delete active.period;
					if(active.period){
						if(active.period.id>4)
							active.period.id = active.period.id/10;
						active.esp =  parseFloat(active.sy+'.'+active.period.id);
					}
					if($scope.oFilterDropdownCtrl.showSection){
						active.section =  $scope.ActiveSection;
					}
					if($scope.oFilterDropdownCtrl.showYearLevel){
						active.year_level =  $scope.ActiveYearLevel;
					}
					return active;
				}
				function renderPreview(active){
					
					if($scope.oFilterDropdownCtrl.dropdownPreview) return;
					var preview = [];
					if(active.sy)
						preview .push("SY "+ active.sy + " - "+ (active.sy+1));
					if(active.sem)
						preview.push(active.sem.alias.full);
					if(active.period)
						if(active.period.alias.full!=preview[1])
							preview.push(active.period.alias.full);
					
					active.section =  active.section ||{};
					if( active.year_level)
						preview.push(active.year_level.description);	
					if(active.section.id=='all')
						preview.pop();
							
					if(active.section.id)
							preview.push(active.section.alias);
					$scope.oFilterDropdownCtrl.preview = preview.join(" | ");

				}
				$scope.$watch('oFilterDropdownCtrl.dropdownPreview',function(value){
					$scope.oFilterDropdownCtrl.preview = value;
				});
				$scope.$watch('oFilterDropdownCtrl.preview',function(value){
					var active = $scope.oFilterDropdownCtrl.Active;
					if(value==undefined && active){
						renderPreview(active);
					}
				});
					
			}
		}
	}]);
	app.register.filter('startFrom', function () {
		return function (input, start) {
			if (input) {
				start = +start;
				return input.slice(start);
			}
			return [];
		};
	});
	app.register.directive('oFilterDropdown',[function () {
		return {
			restrict: 'E',
			replace:true,
			template:'<div>ERROR<!-- Use <o-dropdown-filter> instead --></div>',
		}
	}]);
});