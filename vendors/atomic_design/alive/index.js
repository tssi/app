"use strict";
define(['app','atomic/alive/api',
		'atomic/atom/aButton',
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
		'atomic/molecule/mDeptNavpill',
		'atomic/molecule/mPeriodBtnGroup',
		'atomic/molecule/mFilterDropdown',
	], function (app) {
	app.register.factory('Atomic',['AtomicAPI','$rootScope',function(aapi,$scope,$rootScope){
		var atomic={};
		aapi.init(function(REGISTRY){
			// Loaded from SystemDefaults and API response
			atomic.SchoolYears =  REGISTRY.SCHOOL_YEARS;
			atomic.Semesters =  REGISTRY.SEMESTERS;
			atomic.Periods =  REGISTRY.PERIODS;
			atomic.Sections =  REGISTRY.Sections;
			atomic.Departments = REGISTRY.Departments;

			//TODO: Load from system defaults
			atomic.ActiveSY =  REGISTRY.SCHOOL_YEARS[6].id;
			atomic.ActiveDept = REGISTRY.Departments[1];
			atomic.SelectedSem =  REGISTRY.SEMESTERS[0];
			atomic.SelectedPeriod =  REGISTRY.PERIODS[0];

			$scope.$emit('atomicReady');
		});
		atomic.ready = function(callback){
			$scope.$on('atomicReady',callback);
		}
		return atomic;
	}]);
	app.register.factory("AtomicPath",[function(){
		return {
			url:function(file){
				return require.toUrl("vendors/atomic_design/"+file);
			}
		};
	}]);
});