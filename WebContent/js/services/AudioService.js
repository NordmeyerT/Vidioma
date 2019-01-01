/**
 *
 */
app.factory('AudioService', ['$document', function() {
	var service = this;
 	var audioElement = angular.element(document.querySelector('#audio'));
    service.play = function(soundUrl) {
         audioElement.attr('src', soundUrl);
         audioElement.attr('autoplay', 'autoplay');
    }
    return service;
}]);
