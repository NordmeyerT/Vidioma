app.controller('WindowController', function ($scope,$rootScope,$location) {
    var that = this;

    var name ="WindowController";

    this.window={width:0,height:0,contentHeight:0};
    /* automatically update width & height on resize */

    $rootScope.windowController=this;
    $scope.window = this.window;
    $scope.window.sizeChanged=0;
    $scope.window.pageWidth = $(window).width();
    $scope.window.pageHeight = $(window).height();
    $(window).resize(function(){
    	ang.apply($scope,function(){
            $scope.window.pageWidth = $(window).width();
            $scope.window.pageHeight = $(window).height();
    	});
    });
    $scope.window.forceResize=function(){
		ang.apply($scope,function(){
	    	$scope.window.sizeChanged++;
		});

    };

    function recalcPage(){
    	var newHeight=$scope.window.pageHeight;
    	var newWidth=$scope.window.pageWidth;

    	if(newWidth<960)
    		newWidth=960;
    	if($scope.window.pageWidth<960)
    		$scope.window.pageWidth=960;
        if(newHeight>0) {
        	var aspect = 16.0/16.0; // maximal komplett gleicher aspect ratio. (vor allem geht es hier um die mobiles !)

        	// max height
	        if($scope.window.pageWidth/newHeight<aspect){
	        	newHeight = $scope.window.pageWidth / aspect;
	        }
	        // min height
	        aspect = 16.0/7.6;
	        if($scope.window.pageWidth/newHeight>aspect){
	        	newHeight = $scope.window.pageWidth / aspect;
	        }
        }
        if(newHeight<620)
        	newHeight = 620;

        // calc heights
        that.window.height = newHeight;
        that.window.bottomHeight = 22;
        that.window.contentHeight = that.window.height -82 - that.window.bottomHeight-2;   //-94 topline size
        that.window.headerHeight = 0;
        that.window.tabHeight= 24;
        that.window.rightHeaderHeight=43;
        that.window.tabHeightRight=that.window.tabHeight+10;
        that.window.contentInnerHeight = that.window.contentHeight -58;


        that.window.bottomInfoHeight = that.window.contentInnerHeight*0.25;
        if(that.window.bottomInfoHeight<150)
        	that.window.bottomInfoHeight = 150;

        // calc widths
        that.window.contentWidth = $rootScope.window.getPageWidth();
        that.window.width = newWidth;
        that.window.detailsWidth = 400;
        if(that.window.displayRight){
            that.window.contentRightWidth = that.window.contentWidth/2;
            if(that.window.contentRightWidth<375 * 2 + 10)
                that.window.contentRightWidth = 375 * 2 + 10;

            that.window.contentLeftWidth = that.window.contentWidth-that.window.contentRightWidth;

           if(that.window.contentLeftWidth<200){ // linke seite hat auch ein minimum!
                that.window.contentLeftWidth =200;
                that.window.contentRightWidth = that.window.contentWidth-that.window.contentLeftWidth;
            }
        }else{
            that.window.contentLeftWidth = that.window.contentWidth;
            that.window.contentRightWidth = 0;
        }
    	$rootScope.$broadcast("windowResize");
    }


    // watch on window changes and display right changes
    $scope.$watch("window.pageWidth+ window.displayRight*10000 + window.pageHeight*2341123", function(newValue, oldValue) {
        recalcPage();
    });


    $rootScope.window = this.window;
    $rootScope.window.$scope = $scope;
    $rootScope.window.displayRight=false;
    $rootScope.window.getPageWidth=function(){
        return $(".pageContentDiv").width();//-20; // todo: size of scrollbar?
    };

    window.onresize = function(){
        $scope.$apply();
    };

    return $scope.WindowController = this;
});
