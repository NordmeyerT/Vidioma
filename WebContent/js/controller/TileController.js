app.controller('TileController', function ($scope, WordService,$routeParams ) {
    var ctrl = this;
    ctrl.isRandom = undefined;

    ctrl.getItemList = function() {
    	return WordService.getItemList();
    };

    ctrl.up = function() {
		WordService.up();
    };

    ctrl.random = function() {
		WordService.random();
    };

    ctrl.down = function(item) {
		WordService.down(item);
    };

    ctrl.isAtRoot = function() {
    	return WordService.isAtRoot();
    };

    ctrl.init = function() {
        ctrl.isRandom = $routeParams.random;
        if(ctrl.isRandom) {
        	WordService.random();
        } else {
        	WordService.subset();
        }
    };

    ctrl.populate = function() {
    	WordService.random();
    };

    return $scope.TileController = this;
});
