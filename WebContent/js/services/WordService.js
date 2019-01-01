/**
 * Service loading data from server and providing access
 */
app.factory('WordService', function ($http, $rootScope, $log, CsvService) {
    var service = this;

    var words = {};
    var itemList = [];
    var itemHash = [];

    var itemSubset =[];
    var node = {};

	$rootScope.$on("languageChanged", function(event, data) {
		updateWords(data.lang);
	});

    var init = function() {
    	$http.get("data/structure.csv").success(function(response) {
    		var structure = CsvService.toObjects(response);
    		for(var i=0; i<structure.length; i++) {
    			var item = {};
    			item.parent = structure[i][0];
    			item.id = structure[i][1];
    			if(item.id) {
        			item.word = item.id;
	    			item.pic = structure[i][2] ? structure[i][2] : "data/pictures/"+item.id+".png";
	    			if(item.parent) {
		    			var parent = itemHash[item.parent];
		    			if(parent) {
		    				parent.hasChildren = true;
		    			}
	    			} else {
	    				item.isRoot = true;
	    				item.parent=undefined;
	    			}
	    			itemList.push(item);
	    			itemHash[item.id] = item;
    			}
    		}
            $http.get("data/lang/en/_words.csv").success(function(response) {
        		var words = CsvService.toObjects(response);
        		for(var i=0; i<words.length; i++) {
        			var id = words[i][0];
        			var item = itemHash[id];
        			if(item) {
    	    			item.wordEn = words[i][1];
    	    			item.soundEn =validateSound(words[i][2]);
    	    		} else {
    	    			$log.warn("No item found for "+id);
    	    		}
        		}
                $log.debug("Updated words EN");
            });
        });
    };

    var updateWords = function(languageId) {
        $http.get("data/lang/"+ languageId + "/_words.csv").success(function(response) {
    		var words = CsvService.toObjects(response);
    		for(var i=0; i<words.length; i++) {
    			var id = words[i][0];
    			var item = itemHash[id];
    			if(item) {
	    			item.word = words[i][1];
	    			item.sound = validateSound(words[i][2]); // "data/lang/"+ languageId + "/"+item.id+".mp3";
	    		} else {
	    			$log.warn("No item found for "+id);
	    		}
    		}
            $log.debug("Updated words");
        });
    };

    var validateSound = function(sound) {
    	return sound;
//    	if(sound) {
//    		delete $http.defaults.headers.common['X-Requested-With'];
//	        $http.get(sound).success(function(response) {
//	        	return sound;
//	        });
//    	}
    }

    service.getItemList = function() {
    	return itemSubset;
    };

    service.subset = function() {
		// LEVEL
		itemSubset = [];
		for(var i=1; i<itemList.length; i++) {
			var item = itemList[i];
			if(item.parent === node.id) {
				itemSubset.push(item);
			}
		}
    };

    service.random =function() {
    	var resultList = {};
		// RANDOM
		for(var i=1; Object.keys(resultList).length<10; i++) {
			var index = Math.floor((Math.random() * (itemList.length-1)))+1;
			var item = itemList[index];

			// add, if not yet in list
			resultList[item.id] = item;
		}
		itemSubset = [];
		var keyList = Object.keys(resultList);
		for (var i=0; i<keyList.length; i++) {
			itemSubset.push(resultList[keyList[i]]);
		}
    };

    service.down = function(item) {
    	node = item;
    	service.subset();
    }

    service.up = function() {
    	node = itemHash[node.parent];
    	if(!node) node = {};
    	service.subset();
    }

    init();

    return service;
});