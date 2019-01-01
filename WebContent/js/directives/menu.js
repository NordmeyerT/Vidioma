app.directive('menu',function(WordService, AudioService, $log) {
    return {
        restrict:'A',
        scope: {
	       	 url: '@',
	    	 img: '@'
	    	},
        templateUrl: "js/directives/menu.html"
    };
});