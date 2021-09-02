/*
 * wjquery.wautocompleteKeyup 0.1.1
 * by composite (wonchu.net@gmail.com)
 * http://www.wonchu.net
 * This project licensed under a MIT License.

 0.1.0 : 최초작성
 0.1.1 : 소스정리
*/

(function ($) {
    "use strict";
    if ($.wautocompleteKeyup) {
        return;
    }

    $.wautocomplete = {
        keys: {
            enter: 13,
            space: 32,
            left: 37,
            up: 38,
            right: 39,
            down: 40
        },
        defaults: {
            type: "post",
            contentType: "application/json; charset=UTF-8",
            count: 10,
            minLength: 2,
            url: "../../js/test/wautocomplete.js",
            tmplLi: "<li>" +
                "       <a href=\"javascript:void(0);\">" +
                "       <span>\${userName} \${jobTitleName}</span> " +
                "       <span>\${teamName}</span>" +
                "   </a>" +
                "</li>"
        }
    };

    //----------------------------------------------------------------------------------------------------------------------------------------------------
    // wautocompleteKeyup
    //----------------------------------------------------------------------------------------------------------------------------------------------------
    $.wautocompleteKeyup = {
        defaults: {
            id: "wautocompleteKeyup",
            waitMM : 200,
            skipKeyCodes: [$.wautocomplete.keys.space, $.wautocomplete.keys.left, $.wautocomplete.keys.up, $.wautocomplete.keys.right, $.wautocomplete.keys.down]
        },
        searchName: "",
        names: []
    };

    $.wautocompleteKeyup.init = function ($target, options) {
        this.options = $.extend(true, {}, $.wautocomplete.defaults, this.defaults, options);
        this.$t = $target;
        $.wautocomplete.draw(this);

        this.$t.keyup(function (event) {
            const keyCode = event.keyCode || event.which;
            if (!hasValueInArray($.wautocompleteKeyup.options.skipKeyCodes, keyCode)) {
                $.wautocompleteKeyup.trigger(keyCode);
            }
        });
    };

    $.wautocompleteKeyup.trigger = function(keyCode){
        if ($.wautocompleteKeyup.$c.is(":visible") && $.wautocompleteKeyup.$c.find("a.current").length > 0) {
            $.wautocompleteKeyup.$c.find("a.current").trigger("click");
            return false;
        }

        const name = $.wautocompleteKeyup.$t.val();
        if (name == $.wautocompleteKeyup.searchName) return;
        if (name.length < $.wautocompleteKeyup.options.minLength || !$.wautocomplete.checkLastWord(name)) {
            $.wautocomplete.hide( $.wautocompleteKeyup);
            return false;
        }

        $.wautocompleteKeyup.names.push(name);
        (function(len, _name) {
            setTimeout(function(){
                if($.wautocompleteKeyup.names.length>len){
                    return;
                }
                $.wautocomplete.get($.wautocompleteKeyup, _name);
            }, $.wautocompleteKeyup.defaults.waitMM);
        })($.wautocompleteKeyup.names.length, name);
    }

    $.fn.wautocompleteKeyup = function (settings) {
        $.wautocompleteKeyup.init(this, settings || {});
    };

    //----------------------------------------------------------------------------------------------------------------------------------------------------
    // wautocompleteEnter
    //----------------------------------------------------------------------------------------------------------------------------------------------------
    $.wautocompleteEnter = {
        defaults: {
            id: "wautocompleteEnter"
        },
        searchName: ""
    };

    $.wautocompleteEnter.init = function ($target, options) {
        this.options = $.extend(true, {}, $.wautocomplete.defaults, this.defaults, options);
        this.$t = $target;
        $.wautocomplete.draw(this);

        this.$t.keypress(function (event) {
            const keyCode = event.keyCode || event.which;
            if ($.wautocomplete.keys.enter == keyCode) {
                $.wautocompleteEnter.trigger();
            }
        });
    };

    $.wautocompleteEnter.trigger = function(){
        if ($.wautocompleteEnter.$c.is(":visible") && $.wautocompleteEnter.$c.find("a.current").length > 0) {
            $.wautocompleteEnter.$c.find("a.current").trigger("click");
            return false;
        }

        const name = $.wautocompleteEnter.$t.val();
        if (name == $.wautocompleteEnter.searchName) return;
        if (name.length < $.wautocompleteEnter.options.minLength || !$.wautocomplete.checkLastWord(name)) {
            alert($.wautocompleteEnter.options.minLength + "이상 입력해주세요.");
            $.wautocomplete.hide( $.wautocompleteEnter);
            return false;
        }

        $.wautocomplete.get($.wautocompleteEnter, name);    
    }

    $.fn.wautocompleteEnter = function (settings) {
        $.wautocompleteEnter.init(this, settings || {});
    };

    //----------------------------------------------------------------------------------------------------------------------------------------------------
    // wautocomplete
    //----------------------------------------------------------------------------------------------------------------------------------------------------
    $.wautocomplete.checkLastWord = function(text){
        const last = text.substring(text.length - 1),
            check = ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ",
            "ㄲ", "ㄸ", "ㅃ", "ㅆ", "ㅉ",
            "ㅏ", "ㅑ", "ㅓ", "ㅕ", "ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ", "ㅣ", "ㅐ", "ㅒ", "ㅔ", "ㅖ"
        ];

        for (let i = check.length - 1; i >= 0; i--) {
            if (last == check[i]) return false;
        }
        return true;
    };

    $.wautocomplete.hide = function($o){
        $o.$c.hide().find("ul").empty();
        $o.searchName = "";
    };

    $.wautocomplete.draw = function($o){
        const cid = $o.options.id + "-" + ($o.$t.attr("id") || $o.$t.attr("name"));
        $o.$t.after("<div id=\"" + cid + "\" class=\"wautocomplete\"><ul style=\"position:relative;\"></ul></div>");

        $o.$c = $("#" + cid).css({
            "top": $o.options.top || $o.$t.position().top + $o.$t.outerHeight(),
            "left": ($o.options.left || $o.$t.position().left)-3,
            "min-width": ($o.options.minWidht || $o.$t.outerWidth())-1
        });
        
        $(document).on("click." + $o.options.id, function (e) {
            if (!$o.$c.is(e.target) && $o.$c.has(e.target).length === 0) {
                $.wautocomplete.hide($o);
            }
        });

        $o.$t.keyup(function (event) {
            let key = event.keyCode || event.which;
            if ($o.$c.is(":visible") && (key == $.wautocomplete.keys.up || key == $.wautocomplete.keys.down)) {
                let _index = -1,
                    _n = $o.$c.find("a").length;

                if ($o.$c.find("a.current").length > 0) {
                    _index = $o.$c.find("a").index($o.$c.find("a.current"));
                }

                $o.$c.find("a.current").removeClass("current");
                if (key == $.wautocomplete.keys.down) {
                    if (_index == -1) {
                        _index = 0;
                    } else if (_index == _n - 1) {
                        _index = 0;
                    } else {
                        _index++;
                    }
                } else if (key == $.wautocomplete.keys.up) {
                    if (_index == -1) {
                        _index = 0;
                    } else if (_index == 0) {
                        _index = _n - 1;
                    } else {
                        _index--;
                    }
                }
                $o.$c.find("a:eq(" + _index + ")").addClass("current");
                $o.$c.scrollTop($o.$c.find("a:eq(" + _index + ")").position().top);
            }
        });

        $("ul", $o.$c).on("click", "li>a", function (event) {
            $o.searchName = "";
            $o.options.callback($(this).parent().data("data"));
            $.wautocomplete.hide($o);
        });
    };

    $.wautocomplete.get = function($o, v){
        $.ajax({
            url: $o.options.url,
            data: JSON.stringify({
                searchWord: v,
                count: $o.options.count + 1
            }),
            contentType: $o.options.contentType,
            type: $o.options.type,
            dataType: "json",
            success: function (result) {
                const n = result.length;
                if (n == 0) {
                    $.wautocomplete.hide($o);
                    return;
                } else if (n == 1) {
                    $o.options.callback(result[0]);
                    $.wautocomplete.hide($o);
                } else {
                    if(result.length>$o.options.count){
                        if($o.options.tooManyCallback){
                            $o.options.tooManyCallback();
                            $.wautocomplete.hide($o);
                            return;
                        }
                    }

                    let $ul = $o.$c.find("ul").empty();
                    $.each(result, function (index) {
                        if($o.options.count<index+1) return false;
                        $.tmpl($o.options.tmplLi, this).data("data", this).appendTo($ul);
                    });

                    $o.$c.show();
                    $.wautocompleteKeyup.searchName = v;
                }
            },
            error: function (request,status,error) {
                console.error("code = "+ request.status + " message = " + request.responseText + " error = " + error);
                if($.wautocompleteKeyup.options.errorCallback){
                    $.wautocompleteKeyup.options.errorCallback(event, request);
                }
            }
        });
    };

})(jQuery);