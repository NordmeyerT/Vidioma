/**
 * Service providing available languages and holging state of selected language
 */
app.factory('LanguageService', function($http, $rootScope, CsvService) {
	var service = this;
	var langId = undefined;
	var languageList = [];
	var languageHash = {};

	service.init = function() {
	   	$http.get("data/languages.csv").success(function(response) {
    		var csv = CsvService.toObjects(response);
    		for(var i=0; i<csv.length; i++) {
    			var item = {};
    			item.id = csv[i][0];
    			item.name = csv[i][1];
    			item.flagUrl = csv[i][2];
    			languageList.push(item);
    			languageHash[item.id] = item;
    		}
    		service.selectLanguage('de');
	   	});
	}

	service.getLanguageList = function() {
		return languageList;
	}

	service.getLanguage = function() {
		return languageHash[langId];
	}

	service.selectLanguage = function(pLangId) {
		var current = service.getLanguage();
		if(current) {
			current.selected = undefined;
		}
		langId = pLangId;
		current = service.getLanguage();
		if(current) {
			current.selected = true;
		}
		$rootScope.language = service.getLanguage();
		$rootScope.$broadcast("languageChanged", {lang: langId});
	}

	service.isEn = function() {
		return 'en'===langId;
	}

	service.init();

	return service;
});