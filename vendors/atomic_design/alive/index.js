"use strict";
define(['app','vendors/bower_components/jquery/dist/jquery','atomic/alive/api',
		'atomic/alive/path',
		'atomic/atom/aButton',
		'atomic/atom/aFab',
		'atomic/atom/aGlyph',
		'atomic/atom/aTextbox',
		'atomic/atom/aLabel',
		'atomic/atom/aSelect',
		'atomic/atom/aNavpill',
		'atomic/atom/aContainer',
		'atomic/atom/aHeader',
		'atomic/atom/aCanvas',
		'atomic/atom/aContent',
		'atomic/atom/aRow',
		'atomic/atom/aCol',
		'atomic/atom/aModule',
		'atomic/atom/aModal',
		'atomic/atom/aTable',
		'atomic/atom/aPager',
		'atomic/atom/aSearchbox',
		'atomic/molecule/mNavpillDept',
		'atomic/molecule/mBtnGroupPeriod',
		'atomic/molecule/mFormgroup',
		'atomic/molecule/mTableTick',
		'atomic/molecule/mTableSort',
		'atomic/molecule/mTableEdit',
		'atomic/molecule/mSearchStudent',
		'atomic/organism/oDropdownFilter'
	], function (app) {
	app.register.factory('Atomic',['AtomicAPI','$rootScope',function(aapi,$scope){
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