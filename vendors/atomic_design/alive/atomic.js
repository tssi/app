"use strict";
define(['app','atomic/index/api'],function(app){
	app.register.factory('Atomic',['AtomicAPI','$scope',function(aapi,$scope){
		var atomic={};

		aapi.init(function(REGISTRY){
			// Loaded from SystemDefaults and API response
			atomic.SchoolYears =  REGISTRY.SCHOOL_YEARS;
			atomic.Semesters =  REGISTRY.SEMESTERS;
			atomic.Periods =  REGISTRY.PERIODS;
			atomic.Sections =  REGISTRY.Sections;
			atomic.Departments = REGISTRY.Departments;
			atomic.YearLevels = REGISTRY.YearLevels;
			
			//TODO: Load from system defaults
			atomic.ActiveSY =  REGISTRY.ACTIVE_SY;
			atomic.ActiveDept = REGISTRY.Departments[0];
			for(var i in atomic.Departments){
				var dept = atomic.Departments[i];
				var id =  dept.id;
				if(id==REGISTRY.__USER.user.department_id)
					atomic.ActiveDept = dept;
			}
			atomic.SelectedSem =  REGISTRY.DEFAULT_.SEMESTER;
			atomic.SelectedPeriod =  REGISTRY.DEFAULT_.PERIOD;

			$scope.$emit('atomicReady');
		});
		atomic.ready = function(callback){
			$scope.$on('atomicReady',callback);
			return atomic;
		}
		atomic.fuse = function(){
			var isReady = aapi.isReady();
			if(isReady)
				$scope.$emit('atomicReady');
			return isReady;
		}


		return atomic;
	}]);
});