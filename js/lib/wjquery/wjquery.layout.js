/*
 * wjquery.layout 0.1.0
 * by composite (wonchu.net@gmail.com)
 * http://www.wonchu.net
 * This project licensed under a MIT License.

 0.1.0 : 최초작성 작업중...
*/

(function ($) {
    "use strict";
    if ($.wlayout) {
        return;
    }

    $.wlayout = {
        $t: null,
        $left: null,
        $right: null,
        $resizer: null,
        $toggler: null,
        resizerWidth: "8px",
        lastPos: null,
        defaultOptions: {
            nowrapClass: null,
            useResizeToggle : true,
            minLeftWidth : null,
            leftWidth : "50%",
            exceptHeight : null,
            resizeCallback: null,
            resizeToggleCallback: null
        },
        tmpl: {
            resizer : "<div class=\"wlayout-resizer\" title=\"resize\"><div class=\"wlayout-resize-toggler\"><a href=\"javascript:;\" class=\"ui-icon\"></a></div></div>"
        }
    };
    
    $.wlayout.init = function ($target, options) {
        if($.wlayout.$t != null){
            if($.wlayout.$t.hasClass("wlayout-wrap")){
                return;
            }

            if($.wlayout.options.nowrapClass != null){
                $.wlayout.$t.removeClass($.wlayout.options.nowrapClass);
            }

            $.wlayout.$t.addClass("wlayout-wrap");
            $.wlayout.resizeLayout($.wlayout.lastPos);
            return;
        }

        $.wlayout.options = $.extend(true, {}, $.wlayout.defaultOptions, options);
        $.wlayout.$t = $target;

        if($.wlayout.options.nowrapClass != null){
            $.wlayout.$t.removeClass($.wlayout.options.nowrapClass);
        }

        $.wlayout.$t.addClass("wlayout-wrap").append($.wlayout.tmpl.resizer);
        $.wlayout.$left = $(">.wlayout-left", $.wlayout.$t);
        $.wlayout.$right = $(">.wlayout-right", $.wlayout.$t);
        $.wlayout.$resizer = $(">.wlayout-resizer", $.wlayout.$t);
        
        if($.wlayout.options.useResizeToggle){
            $.wlayout.$toggler = $(".wlayout-resize-toggler", $.wlayout.$t);
            $.wlayout.$toggler.click(function(){
                if($(this).hasClass("fold")){
                    $.wlayout.resizeLayout($.wlayout.options.leftWidth, true);
                }else{
                    $.wlayout.resizeLayout("0px", true);
                }

                if($.wlayout.options.resizeToggleCallback!=null){
                    $.wlayout.options.resizeToggleCallback();
                }
            });

            $.wlayout.$resizer.dblclick(function(){
                $.wlayout.$toggler.trigger("click");
            });
        }else{
            $(".wlayout-resize-toggler", $.wlayout.$t).hide();
        }

        if($.wlayout.options.exceptHeight != null){
            $.wlayout.$t.css("height", $(window).height() - parseInt($.wlayout.options.exceptHeight));
        }

        if($.wlayout.options.leftWidth != "50%"){
            $.wlayout.resizeLayout($.wlayout.options.leftWidth);
        }

        //resizer
        $.wlayout.$resizer.draggable({
            axis: "x",
            containment: ".wlayout-wrap",
            opacity: 0.5,
            scroll: false,
            stop: function () {
                $.wlayout.resizeLayout($.wlayout.$resizer.css("left"));
            }
        });
    };

    $.wlayout.resizeLayout = (pos, fouce) => {
        var b = $.hasString(pos, "%");
        if(!fouce && !b && $.wlayout.options.minLeftWidth!=null){
            if(parseInt(pos) < parseInt($.wlayout.options.minLeftWidth)){
                pos = $.wlayout.options.leftWidth;
            }
        }

        $.wlayout.$left.css("width", pos);
        $.wlayout.$resizer.css("left", pos);
        $.wlayout.$right.css("width", "calc((100% - " + pos + ") - " + $.wlayout.resizerWidth);
        $.wlayout.lastPos = pos;

        if($.wlayout.options.useResizeToggle && parseInt($.wlayout.$left.width())>0 && $.wlayout.$toggler.hasClass("fold")){
            $.wlayout.$toggler.removeClass("fold");
        }else if($.wlayout.options.useResizeToggle && parseInt($.wlayout.$left.width())==0 && !$.wlayout.$toggler.hasClass("fold")){
            $.wlayout.$toggler.addClass("fold");
        }

        if($.wlayout.options.resizeCallback!=null){
            $.wlayout.options.resizeCallback($.wlayout.$resizer.css("left"));
        }
    };

    $.wlayout.destory = () => {
        if($.wlayout.$t != null){
            $.wlayout.$t.removeClass("wlayout-wrap").removeAttr("style");
            $.wlayout.$left.removeAttr("style");
            if($.wlayout.options.nowrapClass != null){
                $.wlayout.$t.addClass($.wlayout.options.nowrapClass);
            }
        }
    };
   
    $.fn.wlayout = function (arg) {
        const args = Array.prototype.slice.call(arguments, 1),
            isMethod = (typeof arg === 'string');
        let result = null;

        if (!(this.length == 1 && this.prop("tagName").toLowerCase() == "div")) {
            return;
        }

        if (isMethod) {
            if ($.wlayout[arg]) {
                result = $.wlayout[arg].apply(this, args);
            } else {
                $.alert("Method " + arg + " does not exist");
            }
        } else {
            $.wlayout.init(this, arg || {});
        }
        return result !== null && result !== undefined ? result : this;
    };

})(jQuery);