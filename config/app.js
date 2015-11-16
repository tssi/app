"use strict";
define(['root','settings','angularAMD','angular-route', 'angular-cookies', 'ui-bootstrap'], 
function (root,settings,angularAMD) {
    var app = angular.module("mainModule", 
        ['ngRoute', 'ngCookies', 'ui.bootstrap']);
          
    app.config(['$routeProvider', function ($routeProvider) {
   
    $routeProvider

    .when("/", angularAMD.route({
        templateUrl: function (rp) {
			return settings.VIEWS_DIRECTORY+'/pages/home.html';
		},
		controllerUrl: "controllers/page_controller"            
    }))
	
	.when("/pages/:page",angularAMD.route({
		templateUrl: function (rp) {
			return settings.VIEWS_DIRECTORY+'/pages/'+rp.page+'.'+settings.VIEW_EXTENSION;
		},
		controllerUrl: "controllers/page_controller"      
	}))
	
	.when("/:controller/:action", angularAMD.route({
        templateUrl: function (rp) { 
			if(!rp.action)  rp.action ='index';
			return settings.VIEWS_DIRECTORY+'/' + rp.controller + '/' + rp.action +'.'+settings.VIEW_EXTENSION;
		},
        resolve: {
        load: ['$q', '$rootScope', '$location', 
            function ($q, $rootScope, $location) {
                var path = $location.path();
                var parsePath = path.split("/");
				var controllerName = parsePath[1];
                var loadController = "controllers/"  + 
                                      controllerName + "_controller";
                var deferred = $q.defer();
                require([loadController], function () {
                    $rootScope.$apply(function () {
                        deferred.resolve();
                        });
            });
            return deferred.promise;
            }]
            }
        }))
        .otherwise({ redirectTo: '/' }) 
    }]);                
	
	//Bootstrap RootController
	app.controller('RootController', root);
    // Bootstrap Angular when DOM is ready
    angularAMD.bootstrap(app);
	
	app.settings =  settings;
  
    return app;
});