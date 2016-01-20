/*
 * wjquery wlayer 0.1.1
 * by composite (wonchu.net@gmail.com)
 * http://www.wonchu.net
 * This project licensed under a MIT License.
*/
 
var WLAYER_DROPDOWN_TIMEOUT;

;(function($){
	$.fn.wlayer = function(method) {
		var arg = arguments;
    	this.each(function() {
    		result = WLAYER[method].apply(this, Array.prototype.slice.call(arg, 1));
		});
    	return this;
    };
    
    var WLAYER = new(function() {
    	/**
         * dropDown
         */
    	function dropDown($2, options){
        	try{
        		var $1 = $(this);
        		var _options = $.extend({
        			show:"fast", 
        			hide:"fast", 
        			delay:500},options||{}
        		);
        		$($1,$2).hover(
                    function(){
                        window.clearTimeout(WLAYER_DROPDOWN_TIMEOUT);
                        $2.show(_options.show);
                    },
                    function(){
                        if($2.is(":visible")){
                        	WLAYER_DROPDOWN_TIMEOUT = window.setTimeout(function () {
                            	$2.hide(_options.hide);
                            }, _options.delay);
                        }
                    }
                );
        	}catch(e){}
        }
    	
    	return {
    		dropDown:dropDown
    	};
    });
    
})(jQuery); 