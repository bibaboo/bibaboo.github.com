/*
 * wjquery.autocomplete 0.1.0
 * by composite (wonchu.net@gmail.com)
 * http://www.wonchu.net
 * This project licensed under a MIT License.

 0.1.0 : 최초작성
*/

(function ($) {
    var _searchName = "",
        wkey = {
            enter: 13,
            spance: 32,
            left: 37,
            up: 38,
            right: 39,
            down: 40
        }

    $.fn.wautocompleteEnter = function (callback, settings) {
        this.keypress(function (event) {
            if ((event.keyCode || event.which) == wkey.enter) {
                WAUTOCOMPLETE.trigger(event, $.extend({}, $.fn.wautocompleteDefaultSettings, settings || {}), callback);
            }
        });
    };

    $.fn.wautocompleteKeyup = function (callback, settings) {
        this.keyup(function (event) {
            var _settings = $.extend({}, $.fn.wautocompleteDefaultSettings, settings || {});
            if (!hasValueInArray(_settings.skipKeyCodes, (event.keyCode || event.which))) {
                _settings.mode = "keyup";
                WAUTOCOMPLETE.trigger(event, _settings, callback);
            }
        });
    };

    $.fn.wautocompleteDefaultSettings = {
        prefix: "wautocomplete-",
        minLength: 2,
        mode: "enter",
        url: "../../js/test/wautocomplete.js",
        tmplLi: "<li>" +
            "   <a href=\"javascript:void(0);\">" +
            "       <span>\${userName} \${jobTitleName}</span> " +
            "       <span>\${teamName}</span>" +
            "   </a>" +
            "</li>",
        skipKeyCodes: [wkey.spance, wkey.left, wkey.up, wkey.right, wkey.down]
    };

    var WAUTOCOMPLETE = {
        trigger: function (event, settings, callback) {
            var $el = $(event.target),
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

            if (name == _searchName) return;

            if (name.length < settings.minLength) {
                if (settings.mode == "enter") {
                    alert(settings.minLength + "이상 입력해주세요.");
                    return false;
                } else {
                    $(_id).hide();
                    _searchName = "";
                    return false;
                }
            }

            $.ajax({
                url: settings.url,
                data: {
                    searchWord: name
                },
                type: "get",
                dataType: "json",
                success: function (result) {
                    if (result.length == 0) {
                        return;
                    } else if (result.length == 1) {
                        callback(result[0]);
                        $(_id).hide();
                        _searchName = "";
                    } else {
                        if ($(_id).length == 0) {
                            $el.after("<div id=\"" + settings.prefix + id + "\" class=\"wautocomplete\"><ul style=\"position:relative;\"></ul></div>");

                            var _css = {
                                "top": settings.top || $el.position().top + $el.outerHeight(),
                                "left": settings.left || $el.position().left,
                                "min-width": settings.minWidht || $el.outerWidth()
                            };

                            $c = $(_id).css(_css);
                            $(document).mouseup(function (e) {
                                if (!$c.is(e.target) && $c.has(e.target).length === 0) {
                                    $c.fadeOut();
                                    $c.find("ul").empty();
                                    _searchName = "";
                                }
                            });

                            $el.keyup(function (event) {
                                var key = event.keyCode || event.which;
                                if ($c.is(":visible") && (key == wkey.up || key == wkey.down)) {
                                    var _index = -1;
                                    _n = $c.find("a").length;

                                    if ($c.find("a.current").length > 0) {
                                        _index = $c.find("a").index($c.find("a.current"));
                                    }

                                    $c.find("a.current").removeClass("current");
                                    if (key == wkey.down) {
                                        if (_index == -1) {
                                            _index = 0;
                                        } else if (_index == _n - 1) {
                                            _index = 0;
                                        } else {
                                            _index++;
                                        }
                                    } else if (key == wkey.up) {
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

                        var $ul = $c.find("ul").empty();
                        $.each(result, function () {
                            var $li = $.tmpl(settings.tmplLi, this).data("data", this);
                            $li.appendTo($ul);
                        });

                        $c.find("li>a").off("click").on("click", function (event) {
                            _searchName = "";
                            callback($(this).parent().data("data"));
                            $c.fadeOut();
                        });
                        $c.show();
                        _searchName = name;
                    }
                },
                error: function (event, request, settings) {
                    alert("사용자를 조회 할수 없습니다.");
                }
            });

        },
        checkLastWord: function (text) {
            var last = text.substring(text.length - 1);
            var check = ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ",
                "ㄲ", "ㄸ", "ㅃ", "ㅆ", "ㅉ",
                "ㅏ", "ㅑ", "ㅓ", "ㅕ", "ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ", "ㅣ", "ㅐ", "ㅒ", "ㅔ", "ㅖ"
            ];

            for (var i = check.length - 1; i >= 0; i--) {
                if (last == check[i])
                    return false;
            }
            return true;
        }
    };

})(jQuery);