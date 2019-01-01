var app = angular.module("app", [ 'ui.bootstrap', 'ngRoute' ]);

/**
 * http://code.google.com/p/jquery-csv/
 */
app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/tiles', {
		templateUrl : 'view/tilePanel.html',
		controller : 'TileController'
	}).when('/home', {
		templateUrl : 'view/homePanel.html',
		controller : 'HomeController'
	}).when('/language', {
		templateUrl : 'view/language.html',
		controller : 'LanguageController'
	}).otherwise({
		redirectTo : '/home'
	});

} ]);

