/*
 * wjquery.autocomplete 0.1.1
 * by composite (wonchu.net@gmail.com)
 * http://www.wonchu.net
 * This project licensed under a MIT License.

 0.1.0 : 최초작성
 0.1.1 : 소스정리
*/

(function ($) {
    "use strict";
    let WAUTOCOMPLETE_SV = {
        searchName: "",
        mode: {
            enter: "enter",
            keyup: "keyup"
        },
        wkey: {
            enter: 13,
            spance: 32,
            left: 37,
            up: 38,
            right: 39,
            down: 40
        }
    };

    $.fn.wautocompleteEnter = function (callback, errorCallback, settings) {
        if(typeof(errorCallback)!="function" && typeof(settings)=="undefined"){
            settings = errorCallback;
            errorCallback = function(){};
        } 
        this.keypress(function (event) {
            if ((event.keyCode || event.which) == WAUTOCOMPLETE_SV.wkey.enter) {
                WAUTOCOMPLETE.trigger(event, $.extend({}, $.fn.wautocompleteDefaultSettings, settings || {}), callback, errorCallback);
            }
        });
    };

    $.fn.wautocompleteKeyup = function (callback, errorCallback, settings) {
        if(typeof(errorCallback)!="function" && typeof(settings)=="undefined"){
            settings = errorCallback;
            errorCallback = function(){};
        } 
        this.keyup(function (event) {
            let _settings = $.extend({}, $.fn.wautocompleteDefaultSettings, settings || {});
            if (!hasValueInArray(_settings.skipKeyCodes, (event.keyCode || event.which))) {
                _settings.mode = WAUTOCOMPLETE_SV.mode.keyup;
                WAUTOCOMPLETE.trigger(event, _settings, callback, errorCallback);
            }
        });
    };

    $.fn.wautocompleteDefaultSettings = {
        type: "post",
        contentType: "application/json; charset=UTF-8",
        prefix: "wautocomplete-",
        count: 10,
        minLength: 2,
        mode: WAUTOCOMPLETE_SV.mode.enter,
        url: "../../js/test/wautocomplete.js",
        tmplLi: "<li>" +
            "   <a href=\"javascript:void(0);\">" +
            "       <span>\${userName} \${jobTitleName}</span> " +
            "       <span>\${teamName}</span>" +
            "   </a>" +
            "</li>",
        waitMM : 500,
        skipKeyCodes: [WAUTOCOMPLETE_SV.wkey.spance, WAUTOCOMPLETE_SV.wkey.left, WAUTOCOMPLETE_SV.wkey.up, WAUTOCOMPLETE_SV.wkey.right, WAUTOCOMPLETE_SV.wkey.down]
    };

    var WAUTOCOMPLETE = {
        trigger: function (event, settings, callback, errorCallback) {
            let $el = $(event.target),
                id = $el.attr("id") || $el.attr("name"),
                _id = "#" + settings.prefix + id,
                name = $.trim($el.val()),
                $c;

            if ($(_id).length != 0) {
                $c = $(_id);
                if ($c.is(":visible") && $c.find("a.current").length > 0) {
                    $c.find("a.current").trigger("click");
                    return false;
                }
            }

            if (name == WAUTOCOMPLETE_SV.searchName) return;

            if (name.length < settings.minLength || !this.checkLastWord(name)) {
                if (settings.mode == WAUTOCOMPLETE_SV.mode.enter) {
                    alert(settings.minLength + "이상 입력해주세요.");
                    return false;
                } else {
                    $(_id).hide();
                    WAUTOCOMPLETE_SV.searchName = "";
                    return false;
                }
            }

            $.ajax({
                url: settings.url,
                data: JSON.stringify({
                    searchWord: name,
                    count: settings.count
                }),
                contentType: settings.contentType,
                type: settings.type,
                dataType: "json",
                success: function (result) {
                    if (result.length == 0) {
                        return;
                    } else if (result.length == 1) {
                        callback(result[0]);
                        $(_id).hide();
                        WAUTOCOMPLETE_SV.searchName = "";
                    } else {
                        if ($(_id).length == 0) {
                            $el.after("<div id=\"" + settings.prefix + id + "\" class=\"wautocomplete\"><ul style=\"position:relative;\"></ul></div>");

                            let _css = {
                                "top": settings.top || $el.position().top + $el.outerHeight(),
                                "left": settings.left || $el.position().left,
                                "min-width": settings.minWidht || $el.outerWidth()
                            };

                            $c = $(_id).css(_css);
                            $(document).mouseup(function (e) {
                                if (!$c.is(e.target) && $c.has(e.target).length === 0) {
                                    $c.fadeOut();
                                    $c.find("ul").empty();
                                    WAUTOCOMPLETE_SV.searchName = "";
                                }
                            });

                            $el.keyup(function (event) {
                                let key = event.keyCode || event.which;
                                if ($c.is(":visible") && (key == WAUTOCOMPLETE_SV.wkey.up || key == WAUTOCOMPLETE_SV.wkey.down)) {
                                    let _index = -1,
                                        _n = $c.find("a").length;

                                    if ($c.find("a.current").length > 0) {
                                        _index = $c.find("a").index($c.find("a.current"));
                                    }

                                    $c.find("a.current").removeClass("current");
                                    if (key == WAUTOCOMPLETE_SV.wkey.down) {
                                        if (_index == -1) {
                                            _index = 0;
                                        } else if (_index == _n - 1) {
                                            _index = 0;
                                        } else {
                                            _index++;
                                        }
                                    } else if (key == WAUTOCOMPLETE_SV.wkey.up) {
                                        if (_index == -1) {
                                            _index = 0;
                                        } else if (_index == 0) {
                                            _index = _n - 1;
                                        } else {
                                            _index--;
                                        }
                                    }
                                    $c.find("a:eq(" + _index + ")").addClass("current");
                                    $('#' + settings.prefix + id).scrollTop($c.find("a:eq(" + _index + ")").position().top);
                                }
                            });
                        }

                        let $ul = $c.find("ul").empty();
                        $.each(result, function () {
                            $.tmpl(settings.tmplLi, this).data("data", this).appendTo($ul);
                        });

                        $c.find("li>a").off("click").on("click", function (event) {
                            WAUTOCOMPLETE_SV.searchName = "";
                            callback($(this).parent().data("data"));
                            $c.fadeOut();
                        });

                        $c.show();
                        WAUTOCOMPLETE_SV.searchName = name;
                    }
                },
                error: function (event, request, settings) {
                    errorCallback(event, request);
                }
            });

        },
        checkLastWord: function (text) {
            let last = text.substring(text.length - 1);
            const check = ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ",
                "ㄲ", "ㄸ", "ㅃ", "ㅆ", "ㅉ",
                "ㅏ", "ㅑ", "ㅓ", "ㅕ", "ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ", "ㅣ", "ㅐ", "ㅒ", "ㅔ", "ㅖ"
            ];

            for (let i = check.length - 1; i >= 0; i--) {
                if (last == check[i]) return false;
            }
            return true;
        }
    };

})(jQuery);