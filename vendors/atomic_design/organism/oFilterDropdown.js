"use strict";
define(['app',
		'atomic/molecule/mDeptNavpill',
		'atomic/molecule/mPeriodBtnGroup',
	], function (app) {
	app.register.directive('oFilterDropdown',['$rootScope','AtomicPath','Atomic',function ($rootScope,aPath,atomic) {
		const  DEFAULTS = {entryLimit:10};
		return {
			restrict: 'E',
			scope:{
				Active:'=ngModel',
				showSem:'=?',
				showYearLevel:'=?',
				showSection:'=?',
				update:'&',
				dropdownPreview:'@?'
			},
			replace:true,
			transclude:true,
			templateUrl:function(elem,attr){
				return aPath.url('/view/organism/oFilterDropdown.html');
			},
			link: function($scope,elem, attrs,ctrl,transclude) {
				transclude(function(clone){
					$scope.isOverloaded = clone.length>1;
				});


				atomic.ready(function(){

					$scope._APP =  $rootScope._APP;
					$scope._APP.Departments =  atomic.Departments;
					$scope._APP.Sections =  atomic.Sections;
					
					$scope._APP.YearLevels =  atomic.YearLevels;
					$scope.oFilterDropdownCtrl.Active ={
									dept:atomic.ActiveDept,
									sy:atomic.ActiveSY,
									sem:atomic.SelectedSem,
									period:atomic.SelectedPeriod
								};

				});

			},
			bindToController:true,
			controllerAs:'oFilterDropdownCtrl',
			controller:function($scope){
				$scope.$watch("oFilterDropdownCtrl.Active",function(val){
					var active =  val||{dept:null,sy:null,sem:null,period:null};
						$scope.ActiveDept =  active.dept;
						$scope.ActiveSY =  active.sy;
						$scope.SelectedPeriod =  active.period;
						$scope.SelectedSemester =  active.sem;
					$scope.currentPage = 1;
					renderPreview(active);
				});
				$scope.toggleText='More';
				
				$scope.setActiveSY = function(sy){
					$scope.ActiveSY =  sy;
				}
				$scope.setSelectedSemester = function(sem){
					$scope.SelectedSemester =  sem;

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

				$scope.setActiveSection = function(sect){
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
					var active =  {dept:$scope.ActiveDept,
									sy:$scope.ActiveSY,
									sem:$scope.SelectedSemester,
									period:$scope.SelectedPeriod
									
								};
					if($scope.oFilterDropdownCtrl.showSection){
						active.section =  $scope.ActiveSection;
					}
					if($scope.oFilterDropdownCtrl.showYearLevel){
						active.year_level =  $scope.ActiveYearLevel;
					}
					$scope.oFilterDropdownCtrl.Active = active;
					$scope.openDropdown = false;
					renderPreview(active);
				}
				function renderPreview(active){
					if($scope.oFilterDropdownCtrl.dropdownPreview) return;
					var preview = [];
					if(active.sy)
						preview .push("SY "+ active.sy + " - "+ active.sy);
					if(active.sem)
						preview.push(active.sem.alias.full);
					if(active.period)
						if(active.period.alias.full!=preview[1])
							preview.push(active.period.alias.full);
					if(active.section)
							preview.push(active.section.alias);
					$scope.dropdownPreview = preview.join(" | ");
				}
				$scope.$watch('oFilterDropdownCtrl.dropdownPreview',function(value){
					$scope.dropdownPreview = value;
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

});