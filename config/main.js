require.config({
    "baseUrl":"",
	"urlArgs" :"",
	"waitSeconds": 60,
    "paths": {     
        'app': 'config/app',
        'demo': 'config/demo',
        'settings': 'config/settings',
        'routes': 'config/routes',
        'model': 'config/model',
        'angular': 'vendors/bower_components/angular/angular.min',
        'angularAMD': 'vendors/bower_components/angularAMD/angularAMD.min',
		'angular-route': 'vendors/bower_components/angular-route/angular-route.min',
        'angular-cookies': 'vendors/bower_components/angular-cookies/angular-cookies.min',
        'angular-local-storage': 'vendors/bower_components/angular-local-storage/dist/angular-local-storage.min',
		'ui-bootstrap' : 'vendors/bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        'ui.tree': 'vendors/bower_components/angular-ui-tree/dist/angular-ui-tree', 
        'ngload': 'vendors/bower_components/angularAMD/ngload.min', 
		'root': 'controllers/root_controller',
		'directives': 'directives/bootstrap_directive',
		'api': 'controllers/api_controller',
		'moment':'vendors/node_modules/moment/moment',
		'chart':'vendors/node_modules/chart.js/dist/Chart.min',
        'angular-chart':'vendors/node_modules/angular-chart.js/dist/angular-chart',
        'custom-window':'vendors/custom_window',
		'atomic':'vendors/atomic_design',
        'exceljs':'../vendors/node_modules/exceljs/dist/exceljs',
		
    },
    // Add angular modules that does not support AMD out of the box, put it in a shim
    "shim": {
		'angular' : {exports : 'angular'},
        'angular-route': ['angular'],
		'angular-cookies': ['angular'],         
		'angular-local-storage': ['angular'],         
		'angularAMD': ['angular'],
        'ui-bootstrap': ['angular'],
        'ui.tree': ['angular'],
        'angular-chart': ['angular','chart'],
        'custom-window': ['angular'],
    },
    // kick start application
    deps: ['app']
});