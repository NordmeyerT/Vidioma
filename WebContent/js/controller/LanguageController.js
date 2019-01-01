app.controller('LanguageController', function ($scope, LanguageService, WordService, $log) {
    var ctrl = this;
    var defaultLang = 'de';

    ctrl.getLanguageList = function() {
    	$log.debug("called");
    	return LanguageService.getLanguageList();
    }

    ctrl.getLanguage = function() {
    	return LanguageService.getLanguage();
    }

    ctrl.selectLanguage = function(langP) {
    	LanguageService.selectLanguage(langP);
//    	WordService.update();
    }

    return $scope.LanguageController = this;
});
