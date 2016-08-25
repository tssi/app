require.config({
    baseUrl:'',
	urlArgs :(function(){for(var s = Math.random()+'',c = 0x123456,i=0;i<s.length;i++)c += (s.charCodeAt(i)*(i + 1));return c;}()),
	waitSeconds: 60,
    // Alias libraries paths
    paths: {     
        'app': 'config/app',
        'demo': 'config/demo',
        'settings': 'config/settings',
        'routes': 'config/routes',
        'model': 'config/model',
        'angular': 'vendors/bower_components/angular/angular.min',
        'angularAMD': 'vendors/bower_components/angularAMD/angularAMD.min',
		'angular-route': 'vendors/bower_components/angular-route/angular-route.min',
        'angular-cookies': 'vendors/bower_components/angular-cookies/angular-cookies.min',
		'ui-bootstrap' : 'vendors/bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        'ui.tree': 'vendors/bower_components/angular-ui-tree/dist/angular-ui-tree', 
        'ngload': 'vendors/bower_components/angularAMD/ngload.min', 
		'root': 'controllers/root_controller',
		'directives': 'directives/bootstrap_directive',
		'api': 'controllers/api_controller',
		'moment':'vendors/node_modules/moment/moment',
		'chart':'vendors/node_modules/chart.js/dist/Chart.min',
		'angular-chart':'vendors/node_modules/angular-chart.js/dist/angular-chart',
		
    },
    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
		'angular' : {exports : 'angular'},
        'angular-route': ['angular'],
		'angular-cookies': ['angular'],         
		'angularAMD': ['angular'],
        'ui-bootstrap': ['angular'],
        'ui.tree': ['angular'],
        'angular-chart': ['angular','chart'],
    },
    // kick start application
    deps: ['app']
});