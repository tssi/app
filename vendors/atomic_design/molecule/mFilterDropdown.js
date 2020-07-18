"use strict";
define(['app',
		'atomic/molecule/mDeptNavpill',
		'atomic/molecule/mPeriodBtnGroup',
	], function (app) {
	app.register.directive('mFilterDropdown',['$rootScope','AtomicPath','Atomic',function ($rootScope,aPath,atomic) {
		return {
			restrict: 'E',
			scope:{
				Active:'=ngModel',
				showSem:'=?',
				update:'&'
			},
			replace:true,
			transclude:true,
			templateUrl:function(elem,attr){
				return aPath.url('/view/molecule/mFilterDropdown.html');
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
					$scope.mFilterDropdownCtrl.Active ={
									dept:atomic.ActiveDept,
									sy:atomic.ActiveSY,
									sem:atomic.SelectedSem,
									period:atomic.SelectedPeriod
								};
					console.log("API..",$scope._APP);
				});

			},
			bindToController:true,
			controllerAs:'mFilterDropdownCtrl',
			controller:function($scope){
				$scope.$watch("mFilterDropdownCtrl.Active",function(val){
					
					var active =  val||{dept:null,sy:null,sem:null,period:null};
						$scope.ActiveDept =  active.dept;
						$scope.ActiveSY =  active.sy;
						$scope.SelectedPeriod =  active.period;
						$scope.SelectedSemester =  active.sem;
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
					$scope.mFilterDropdownCtrl.Active = active;
					$scope.openDropdown = false;
				}

			}
		}
	}]);
});