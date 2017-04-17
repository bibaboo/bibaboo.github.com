(function($){
    $(document).ready(function () {
    	$(window).scroll(function () {
            var b = $("body").hasClass("sub-fixed");
            if($(this).scrollTop()>=274){
                console.log("low => " + $(this).scrollTop());
                if(!b) $("body").addClass("sub-fixed");
            }else{
                console.log("high => " + $(this).scrollTop());
                if(b) $("body").removeClass("sub-fixed");
            }
        });
    });
})(jQuery);