"use strict";
define(['app',
		'atomic/index',
		'atomic/molecule/mDeptNavpill',
		'atomic/molecule/mPeriodBtnGroup',
	], function (app) {
	app.register.directive('mFilterDropdown',['$rootScope','AtomicPath',function ($rootScope,aPath) {
		return {
			restrict: 'E',
			scope:{
				Active:'=ngModel',
				showSem:'=?',
				update:'&'
			},
			transclude:false,
			templateUrl:function(elem,attr){
				return aPath.url('/view/molecule/mFilterDropdown.html');
			},
			link: function($scope,elem, attrs) {

			},
			bindToController:true,
			controllerAs:'mFilterDropdownCtrl',
			controller:function($scope){
				$scope.$watch("mFilterDropdownCtrl.Active",function(val){
					if(val && !$scope._APP){
						$scope._APP =  $rootScope._APP;
					}
					console.log(val);
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
				$scope.toggleOtherSY = function(){
					$scope.toggleDropdown = true;
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
					console.log($scope._APP);
					$scope.openDropdown = false;
				}

			}
		}
	}]);
});