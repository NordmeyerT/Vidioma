app.directive('tile',function(WordService, AudioService, LanguageService) {
    return {
        restrict:'A',
        scope:{
        	item :'='
        },
        templateUrl: "js/directives/tile.html",
        link: function (scope, element, attrs) {
        	scope.showEn = !LanguageService.isEn();
            scope.play = function(item) {
        		AudioService.play(item.sound);
            };
            scope.playEn = function(item) {
        		AudioService.play(item.soundEn);
            };
            scope.down = function(item) {
    			WordService.down(item);
            };
//            scope.word = 'Word-ID:'+scope.id;
        }
    };
});