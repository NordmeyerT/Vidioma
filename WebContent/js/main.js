'use strict';
require.config({
	baseUrl: 'js',
	paths: {
		angular: 'lib/angular',
		angularRoute: 'lib/angular-route',
		bootstrap: 'lib/ui-bootstrap-0.6.0.min'
		},
	shim : {
		'angular' : {
			'exports' : 'angular'
		},
		'angularRoute' : [ 'angular' ]
	},
	priority : [ "angular" ]
});
// http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";
require([
          'angular',
          'angularRoute',
          'bootstrap',
          'app',
          'services/LanguageService',
          'services/WordService',
          'services/AudioService',
          'services/CsvService',
          'controller/HomeController',
          'controller/LanguageController',
          'controller/TileController',
          'controller/HomeController',
          'directives/tile',
          'directives/menu'
], function(angular, app, routes) {
	var $html = angular.element(document.getElementsByTagName('html')[0]);
	angular.element().ready(function() {
		angular.resumeBootstrap([ app['name'] ]);
	});
});