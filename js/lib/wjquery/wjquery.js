/**
 * wjquery 0.9.5
 * by composite (wonchu.net@gmail.com)
 * http://www.wonchu.net
 * This project licensed under a MIT License.
 * V 0.9.6
 * - ES6 최적화
 **/

;
const WCODE = {
    //type defined
    "boolean": "boolean",
    "string": "stirng",
    "object": "object",
    "function": "function",
    "undefined": "undefined",
    "null": "null",
    "empty": "",
    //value
    "yes": "Y",
    "no": "N",
    "zero": "0",
    "one": "1",
    "two": "2",
    "three": "3",
    "px": "px;",
    "bype": "Byte;",
    "kb": "KB;",
    "mb": "MB;",
    "amp": "&amp;",
    "lg": "&lt;",
    "gt": "&gt;",
    "nbsp": "&nbsp;",
    "quot": "&quot;",
    "squot": "&#39;",
    //tag
    "br": "<br/>",
    //mark
    "sharp": "#",
    "pipe": "|",
    "comma": ",",
    "dot": ".",
    "dash": "-",
    "equal": "=",
    "at": "@",
    "ampersand": "&",
    "percent": "%",
    "question": "?",
    "underline": "_",
    "slash": "/"
};

(function ($) {
    $.extend({
        /**
         * value에 findString이 있는지 여부
         * @name $.hasString(value, findString)
         * @param value 문자열 or 배열
         * @param target 찾는 문자열
         * @return Boolean
         **/
        hasString(value, findString) {
            if ($.isArray(value)) {
                for (let i = 0; value.length > i; i++) {
                    if (findString.indexOf(value[i]) > -1) {
                        return true;
                    }
                }
                return false;
            } else {
                return !!~value.indexOf(findString);
                //return value.indexOf(findString)>-1;
            }
        },

        /**
         * 문자열 반환
         * @name $.getString(value)
         * @param value 문자열
         * @return String
         **/
        getString(value) {
            if ($.isString()) {
                return value;
            } else if ($.isPlainObject(value)) {
                return JSON.stringify(value);
            } else {
                return value;
            }
        },

        /**
         * value에 값이 있는지 비교
         * @name $.hasValue(value)
         * @param value 문자열
         * @return Boolean
         **/
        hasValue(value) {
            try {
                switch (typeof (value)) {
                    case WCODE.undefined:
                    case WCODE.null:
                        return false;
                }
                if ($.trim(value) == WCODE.empty) {
                    return false;
                }
                return true;
            } catch (e) {
                return false;
            }
        },

        /**
         * mobile 여부
         * @name $.isMobile([type])
         * @param value 비교값
         * @return Boolean
         **/
        isMobile(type) {
            let agent = navigator.userAgent,
                devices = {
                    android: agent.match(/Android/i) != null,
                    iOS: agent.match(/iPhone|iPad|iPod/i) != null
                }

            if (type) {
                if (devices[type]) {
                    return devices[type];
                } else {
                    return false;
                }
            } else {
                for (let o in devices) {
                    if ($.isTrue(devices[o])) return true;
                }
                return false;
            }
        },

        /**
         * true 여부
         * @name $.isTrue(value)
         * @param value 비교값
         * @return Boolean
         **/
        isTrue(value) {
            return !$.isUndefined(value) && value === true;
        },

        /**
         * false 여부
         * @name $.isFalse(value)
         * @param value 비교값
         * @return Boolean
         **/
        isFalse(value) {
            return !$.isUndefined(value) && value === false;
        },

        /**
         * 객체 여부
         * @name $().isObject(value)
         * @param value 비교값
         * @return Boolean
         **/
        isObject(value) {
            return typeof (value) === WCODE.object;
        },

        /**
         * 스트링 여부
         * @name $().isString(value)
         * @param value 비교값
         * @return Boolean
         **/
        isString(value) {
            return typeof (value) === WCODE.string;
        },

        /**
         * undefined 여부
         * @name $().isUndefined(value)
         * @param value 비교값
         * @return Boolean
         **/
        isUndefined(value) {
            return typeof (value) === WCODE.undefined;
        },

        /**
         * boolean 여부
         * @name $().isUndefined(value)
         * @param value 비교값
         * @return Boolean
         **/
        isBoolean(value) {
            return typeof (value) === WCODE.boolean;
        },

        /**
         * value에 값이 없을시 replaceString로 대체
         * @name $.nvl(value [, replaceString])
         * @param value 문자열
         * @param replaceString 대체 문자
         * @return String
         **/
        nvl(value, replaceString = WCODE.empty) {
            return $.hasValue(value) ? value : replaceString;
        },

        /**
         * 문자열 채우기
         * @name $.pad(value, len [, addStr, isLeft])
         * @param value 문자열
         * @param len 길이
         * @param addStr 채울 문자
         * @param isLeft 왼쪽 채우기여부
         * @return String
         */
        pad(value, len, addStr, isLeft) {
            if ($.isBoolean(addStr)) {
                isLeft = addStr;
                addStr = WCODE.zero;
            }
            if ($.isFalse(isLeft)) {
                while (len > value.length) {
                    value += (addStr || WCODE.zero);
                }
            } else {
                while (len > value.length) {
                    value = (addStr || WCODE.zero) + value;
                }
            }
            return value;
        },

        /**
         * 문자열 바꾸기
         * @name $.replace(value, findString, replaceString [, flag])
         * @param value 원본 문자열
         * @param findString 대상 문자열
         * @param replaceString 대체 문자열
         * @param option gi
         * @return String
         */
        replace(value, findString, replaceString, flag) {
            return value.replace(new RegExp(findString, (flag || "g")), replaceString);
        },

        /**
         * 로그 출력
         * @name $.wLog(value [, tag])
         * @param value 로그
         * @param tag 태그
         **/
        wLog(value, tag = "log") {
            if (window.console) {
                console.log(`\n=====${tag}=====\n${($.isPlainObject(value) || $.isArray(value) ? JSON.stringify(value) : value)}\n====================`);
            } else {
                alert(`=====${tag}=====\n${($.isPlainObject(value) || $.isArray(value) ? JSON.stringify(value) : value)}`);
            }
        },

        /**
         * toast
         * @name $.toast([value, delay])
         * @param value 메시지
         * @param delay 지연 밀리세컨드
         */
        toast(value = WCODE.empty, callback, delay = 1000) {
            if ($("#wjquery-toast").isObject()) $("#wjquery-toast").stop().clearQueue().remove();

            $("body").append(`<div id="wjquery-toast">${value}</div>`);
            const w = parseInt($("#wjquery-toast").width()) + 60,
                sw = $("body").width(),
                lp = Math.floor((sw - w) / 2);

            $("#wjquery-toast").css("left", lp + WCODE.px).animate({
                "opacity": WCODE.one
            }, 800, function () {
                const timeout = window.setTimeout($.proxy(function () {
                    $(this).animate({
                        "opacity": WCODE.zero
                    }, 800, function () {
                        window.clearTimeout(timeout);
                        $(this).remove();
                        if (callback) {
                            callback();
                        }
                    });
                }, this), delay);
            });
        },

        /**
         * alert
         * @name $.alert(message [, options])
         * @param message 메시지
         * @param options 옵션
         */
        alert(message, options) {
            const _option = $.extend({
                title: "알림",
                buttonText: "닫기",
                modal: true
            }, options || {});

            if ($("#dialog-message").isObject(true)) {
                $("#dialog-message>p").empty().html(String(message));

                if ($("#dialog-message").dialog("instance")) {
                    $("#dialog-message").dialog("destroy").removeAttr("button-index");
                }

                $("#dialog-message").dialog({
                    modal: _option.modal,
                    title: _option.title,
                    close: function (event, ui) {
                        if (_option.callback) {
                            if ($("#dialog-message").attr("button-index")) {
                                _option.callback($("#dialog-message").attr("button-index"));
                            } else {
                                _option.callback(WCODE.zero);
                            }

                        }
                    },
                    buttons: [{
                        text: _option.buttonText,
                        click: function () {
                            if (_option.callback) {
                                $("#dialog-message").attr("button-index", WCODE.one);
                            }
                            $("#dialog-message").dialog("close");
                        }
                    }]
                });
            }
        },

        /**
         * confirm
         * @name $.confirm(message [, options])
         * @param message 메시지
         * @param options 옵션
         */
        confirm(message, options) {
            const _option = $.extend({
                title: "확인",
                buttonText: ["확인", "취소"],
                modal: true
            }, options || {});

            if ($("#dialog-message").isObject(true)) {
                $("#dialog-message>p").empty().html(String(message));

                if ($("#dialog-message").dialog("instance")) {
                    $("#dialog-message").dialog("destroy").removeAttr("button-index");
                }

                $("#dialog-message").dialog({
                    modal: _option.modal,
                    title: _option.title,
                    close: function (event, ui) {
                        if (_option.callback) {
                            if ($("#dialog-message").attr("button-index")) {
                                _option.callback($("#dialog-message").attr("button-index"));
                            } else {
                                _option.callback(WCODE.zero);
                            }

                        }
                    },
                    buttons: [{
                            text: _option.buttonText[0],
                            click: function () {
                                if (_option.callback) {
                                    $("#dialog-message").attr("button-index", WCODE.one);
                                }
                                $("#dialog-message").dialog("close");
                            }
                        },
                        {
                            text: _option.buttonText[1],
                            click: function () {
                                if (_option.callback) {
                                    $("#dialog-message").attr("button-index", WCODE.two);
                                }
                                $("#dialog-message").dialog("close");
                            }
                        }
                    ]
                });
            }
        }
    });
    $.fn.extend({

        /**
         * 개체 존재여부
         * @name $().isObject([state])
         * @param state 개체의 길이지가 한개일 경우 여부
         * @return Boolean
         **/
        isObject(state) {
            return $.isFalse(state) ? this.length == 1 : this.length > 0;
        },

        /**
         * 클래스 변경
         * @name $().changeClass(className1, className2 [, state])
         * @param className1 클래스1
         * @param className2 클래스2
         * @param state class1 삭제/추가 클래스가 될지 여부(default:true)
         * @return this
         **/
        changeClass(className1, className2, state) {
            if ($.isBoolean(state)) {
                if (state) {
                    this.removeClass(className1).addClass(className2);
                } else {
                    this.removeClass(className2).addClass(className1);
                }
            } else {
                if (this.hasClass(className1)) {
                    this.removeClass(className1).addClass(className2);
                } else if (this.hasClass(className2)) {
                    this.removeClass(className2).addClass(className1);
                }
            }
            return this;
        },

        /**
         * 스크롤 이동
         * @name $().scrollIntoView([container, duration])
         * @param container 부분스크롤시 컨테이너
         * @param duration 애니메이션 사용시 밀리세컨드
         * @return this
         **/
        scrollIntoView(container, duration) {
            //this.get(0).scrollIntoView(false);
            if (container.isObject()) {
                container.animate({
                    scrollTop: container.scrollTop() + this.offset().top - container.offset().top
                }, duration || 500);
            } else {
                $("html,body").animate({
                    scrollTop: this.offset().top
                }, container || 500);
            }
            return this;
        },

        /**
         * 맨위로 이동
         * @name $().wScrollTop(target [, options])
         * @param target 탑 버튼
         * @param duration 설정 데이터
         * @return this
         **/
        wScrollTop(target, options) {
            const _option = $.extend({
                offset: 100,
                duration: 500
            }, options || {});
            this.scroll(function () {
                const scrollTop = $(this).scrollTop();
                if (scrollTop > _option.offset) {
                    target.fadeIn();
                } else {
                    target.fadeOut();
                }

                if (_option.progressId) {
                    const height = $(this).prop('scrollHeight') - $(this).outerHeight(),
                        scrolled = (scrollTop / height) * 100;
                    $(WCODE.sharp + _option.progressId).width(isNaN(scrolled) ? WCODE.zero + WCODE.percent : scrolled + WCODE.percent);
                }

                if (_option.callback) {
                    _option.callback(scrollTop);
                }
            });

            target.on("click", $.proxy(function (event) {
                event.preventDefault();
                if ($.isWindow(this[0])) {
                    $("html, body").animate({
                        scrollTop: WCODE.zero
                    }, _option.duration);
                } else {
                    this.animate({
                        scrollTop: WCODE.zero
                    }, _option.duration);
                }
            }, this));
            return this;
        },

        /**
         * textarea 자동 높이 조절
         * @name $().autoGrowTextarea()
         */
        autoGrowTextarea() {
            return this.each(function () {
                const $t = $(this),
                    $m = $("<div class=\"autogrow-textarea-mirror\"></div>");
                if ($t.prop("tagName").toLowerCase() == "textarea") {
                    $m.css({
                        "display": "none",
                        "word-wrap": "break-word",
                        "white-space": "normal",
                        "padding": $(this).css('padding'),
                        "width": $(this).css('width'),
                        "line-height": $(this).css('line-height')
                    });

                    $t.css("overflow", "hidden").after($m).on("keyup", function () {
                        $m.html(String($t.val()).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br />') + '.<br/>.');
                        if ($t.height() != $m.height()) {
                            $t.height($m.height());
                        }
                    }).trigger("keyup");
                }
            });
        },

        /**
         * outerhtml
         * @name $().outerhtml()
         * @return html 문자열
         */
        outerHtml() {
            return $("<div/>").append($(this).clone()).html();
        },

        /**
         * xssVal
         * @name $().xssVal()
         * @return html 문자열
         */
        xssVal() {
            return replaceString("htmlEscape", $(this).val());
        },

        /**
         * 본문의 링크처리, 클릭처리를 막는다
         * @name $().stripHref([isNew])
         * @param isNew
         * @return this
         **/
        stripHref(isNew) {
            if ($.isTrue(isNew)) {
                $("a[href], area[href]", this).removeAttr("onclick").click(function (e) {
                    e.preventDefault();
                    const _url = $(this).attr("href");
                    if (isPattern("url", _url)) {
                        window.open(_url);
                    }
                });
            } else {
                $("a[href], area[href]", this).removeAttr("href").removeAttr("onclick").click(function (e) {
                    e.preventDefault();
                });
            }
            return this;
        },

        /**
         * 본문의 링크처리, 클릭처리를 막는다
         * @name $().keyBind()
         * @param callback
         * @param b 엔터키
         * @return this
         **/
        enterKey(callback) {
            $(this).keypress(function (e) {
                if ((e.keyCode || e.which) == 13 && callback) {
                    callback(e);
                }
            });
        },

        /**
         * dataDraw
         * @name $().wDraw()
         * @param JSON
         * @return this
         **/
        dataDraw(data) {
            $(this).find("[data-text-bind],[data-textbr-bind],[data-html-bind]").each(function () {
                if ($(this).attr("data-text-bind")) {
                    $(this).text(data ? data[$(this).attr("data-text-bind")] || WCODE.empty : WCODE.empty);
                } else if ($(this).attr("data-textbr-bind")) {
                    $(this).html(replaceString("lf2br", removeHtmlTag(data ? data[$(this).attr("data-textbr-bind")] || WCODE.empty : WCODE.empty)));
                } else if ($(this).attr("data-html-bind")) {
                    $(this).html(data ? data[$(this).attr("data-html-bind")] || WCODE.empty : WCODE.empty);
                }
            });

            return this;
        },

        /**
         * wform
         **/
        wform(method) {
            return WFORM[method].apply(this, Array.prototype.slice.call(arguments, 1));
        },

        /**
         * ajaxLoadStart
         **/
        ajaxLoadStart(type) {
            const $target = this;
            let $loading;

            if ($target[0].tagName.toLowerCase() == "body") {
                $loading = $('<div/>').appendTo($target)
                    .addClass("ajax-body-loading");
            } else {
                $loading = null;
                switch ($target.css("position")) {
                    case "relative":
                    case "absolute":
                        $loading = $('<div/>').appendTo($target);
                        break;
                    default:
                        switch ($target.parent().css("position")) {
                            case "relative":
                            case "absolute":
                                break;
                            default:
                                $target.parent().css("position", "relative");

                        }
                        const position = $target.position();
                        $loading = $('<div/>').appendTo($target.parent())
                            .css({
                                left: position.left,
                                top: position.top
                            });
                }
                $loading.css({
                        width: $target.innerWidth(),
                        height: $target.innerHeight()
                    })
                    .addClass(type == "button" ? "ajax-button-loading" : "ajax-container-loading");
            }
        },

        /**
         * ajaxLoadComplete
         **/
        ajaxLoadComplete: function (isComplete) {
            $("div.ajax-body-loading, div.ajax-container-loading, div.ajax-button-loading", this).remove();
            if (!isComplete) this.siblings("div.ajax-container-loading, div.ajax-button-loading").remove();
        }
    });

    const WFORM = new(function () {
        function get(p1) {
            const $t = $(this);
            if ($t.is("input:radio")) {
                return $t.filter(":checked").val() || WCODE.empty;
            } else if ($t.is("input:checkbox")) {
                return $t.filter(":checked").map(function () {
                    return this.value;
                }).get();
            } else if ($t.is("select")) {
                return $(this).val();
            } else {
                if (!$.isFalse(p1)) {
                    $(this).val($.trim($(this).val()));
                }
                return $(this).val();
            }
        }

        function set(v, b) {
            const $t = $(this);
            if ($t.is("input:radio")) {
                $t.filter("[value='" + v + "']").prop("checked", true);
            } else if ($t.is("input:checkbox")) {
                const _v = $.isArray(v) ? v : [v];
                if (b) $t.filter(":checked").prop("checked", false);
                $.each(_v, function () {
                    $t.filter("[value='" + this + "']").prop("checked", true)
                });
            } else {
                $(this).val(v);
            }
        }

        function trim() {
            const $t = $(this);
            if ($t.is("input:text, textarea")) {
                $t.val($.trim($t.val()));
            } else if ($t.is("form")) {
                $t.find("input:text, textarea").each(function () {
                    $(this).val($.trim($(this).val()));
                });
            }
        }

        function isAllCheckBoxChecked() {
            const $t = $(this);
            if ($t.is("input:checkbox")) {
                return $t.length == $t.filter(":checked").length;
            } else {
                return false;
            }
        }

        function toString(m) {
            return WFORM[m].toString();
        }

        return {
            get: get,
            set: set,
            trim: trim,
            isAllCheckBoxChecked: isAllCheckBoxChecked,
            toString: toString
        };
    });

})(jQuery);


var WJ = new(function () {})();
WJ.popup = {
    pool: [],
    open(url, options = {}, windowName) {
        const features = $.extend({
            "channelmode": "no",
            "directories": "no",
            "fullscreen": "no",
            "menubar": "no",
            "scrollbars": "no",
            "status": "no",
            "titlebar": "no",
            "resizable": "no",
            "width": 300,
            "height": 300
        }, options);

        if (!features.top) {
            features.top = (window.innerHeight - features.height) / 2 + screenY;
            features.left = (window.innerWidth - features.width) / 2 + screenX;
        }

        if (options.argument || options.callback) {
            url += (url.indexOf(WCODE.question) == -1 ? WCODE.question : WCODE.ampersand) + "pcodes=" + randomCode(30).join("") + WCODE.ampersand + "poolIndex=" + WJ.popup.getLastPoolIndex();
            WJ.popup.setPool({
                argument: options.argument || {},
                callback: options.callback || function () {}
            });
        }

        return window.open(url, windowName || "windowName" + getTime(), wJson.toString(features, "=", ","));
    },
    close() {
        window.close() || top.window.close();
    },
    getArgument(index) {
        let result = null;
        const openerWindow = opener || top.opener;
        if (!index) {
            index = getUrlArguments("poolIndex");
        }

        if (index != undefined && index > -1 && openerWindow) {
            return openerWindow.WJ.popup.pool[index].argument
        }

        return result;
    },
    call(result = {}) {
        const openerWindow = opener || top.opener,
            index = getUrlArguments("poolIndex");

        if (index != undefined && index > -1 && openerWindow) {
            const o = openerWindow.WJ.popup.pool[index];
            o.callback && o.callback(result);
        }
        setTimeout(function () {
            WJ.popup.close();
        }, 100);
    },
    getPool(index) {
        return index ? WJ.popup.pool[index] : WJ.popup.pool;
    },
    setPool(item) {
        WJ.popup.pool.push(item);
        return WJ.popup.getLastPoolIndex();
    },
    getLastPoolIndex() {
        return WJ.popup.pool.length;
    }
};

WJ.showDialog = function (options) {
    if (window != top) {
        return top.WJ.dialog.show(options);
    }
    const offset = {
        width: -10,
        height: -10
    };
    const viewSize = {
        width: $(document).width() + offset.width,
        height: $(document).height() + offset.height
    };
    if (options["width"] && options.width > viewSize.width) options.width = viewSize.width;
    if (options["height"] && options.height > viewSize.height) options.height = viewSize.height;
    if (options["isDestroy"] != true) options.isDestroy = true;
    return new WJ.Dialog(options);
}

WJ.Dialog = function (options) {
    let dialog = this;
    this.container = $("<div/>").appendTo(document.body);
    this.destroy = false;
    this.fnCallback = null;
    this._options = $.extend({
        title: "Dialog Window",
        maxHeight: 600,
        maxWidth: 980,
        width: 300,
        modal: false,
        isDestroy: true,
        params: null,
        callback: null,
        scroll: "auto"
    }, options);

    if (this._options.url) {
        this._options.create = function () {
            setTimeout(function () {
                dialog.container.ajaxLoadStart();
            }, 1);
            let ifrm = $('<iframe style="width:100%; height:98%; border-width:0;" scrolling="' + dialog._options.scroll + '" frameborder="0" src="' + dialog._options.url + '"/>').appendTo(dialog.container);
            ifrm.bind("load", function () {
                const frmBody = ifrm[0].contentWindow || ifrm[0].contentDocument;
                
                setTimeout(function () {
                    if (frmBody.fnCaller) {
                        frmBody.fnCaller(dialog._options.params, dialog);
                    }

                    $("body", frmBody.document).css("height", "auto");
                    dialog.container.ajaxLoadComplete();
                }, 200);

                if (dialog._options.scroll.toLowerCase() == "no") {
                    setTimeout(function () { // dialog resize
                        var offsetHeight = 40;
                        var frmHeight = $(frmBody.document).height();

                        if (dialog.container.dialog("option", "height") - offsetHeight < frmHeight) {
                            if (dialog.container.dialog("option", "maxHeight") - offsetHeight - 11 > frmHeight) {
                                dialog.container.dialog("option", "height", frmHeight + offsetHeight + 11);
                            } else {
                                ifrm.attr("scroll", "auto");
                            }
                        }
                    }, 100);
                }
            });
        };
    }

    if (this._options.isDestroy == true) {
        this._options.defineClose = this._options.close;
        this._options.close = function () {
            if (dialog.destroy == false) {
                dialog._options.defineClose && dialog._options.defineClose();
                dialog.close();
            }
        };
    }

    this.fnCallback = this._options.callback;
    this.container.dialog(this._options);
};

WJ.Dialog.prototype.callback = function (res) {
    if (this.fnCallback) this.fnCallback(res);
};
WJ.Dialog.prototype.open = function () {
    this.container.dialog("open");
};
WJ.Dialog.prototype.close = function () {
    const dialog = this;
    if (dialog.container.dialog("isOpen")) {
        dialog.container.dialog("close");
    }

    setTimeout(function () {
        if (dialog._options.isDestroy == true && dialog.destroy != true) {
            $.each(dialog.container.find("iframe"), function () {
                $(this).contents().find("object").remove();
                $(this).remove();
            });
            dialog.destroy = true;
            dialog.container.dialog("destroy");
            dialog.container.remove();
        }
    }, 10);
};


//--------------------------------------------------------------------
// lang
//--------------------------------------------------------------------
/**
 * 구분자 이전 문자열을 리턴
 * @param value 문자열
 * @param delim 구분자
 * @return String
 */
function getFirstValue(value, delim=WCODE.dot) {
    return value.indexOf(delim) != -1 ? value.substring(0, value.indexOf(delim)) : WCODE.empty;
}

/**
 * 구분자 이후 문자열을 리턴
 * @param value 문자열
 * @param delim 구분값
 * @return String
 */
function getLastValue(value,  delim=WCODE.dot) {
    return value.indexOf(delim) != -1 ? value.substring(value.lastIndexOf(delim) + 1) : WCODE.empty;
}

/**
 * 문자열 자르기
 * @param value 문자열
 * @param len 길이
 * @param delim 구분자
 * @return String
 */
function cutString(value, len, delim = "..") {
    if (value.length > len) {
        return value.substring(0, len) + delim;
    } else {
        return value;
    }
}

/**
 * 3자리마다 콤마추가
 * @param value 문자열
 * @return String
 */
function addComma(value) {
    let rst = String(),
        v = $.trim(value);
    for (let i = 0, stop = v.length; i < stop; i++) rst = ((i % 3) == 0) && i != 0 ? v.charAt((stop - i) - 1) + WCODE.comma + rst : v.charAt((stop - i) - 1) + rst;
    return rst;
}

/**
 * 랜덤 문자열생성
 * @param len 길이
 * @param state 중복허용여부
 * @return String
 */
function randomCode(len, state) {
    const arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    let codes = [];

    for (let i = 0; i < len; i++) {
        let code = arr[Math.floor(Math.random() * arr.length)];
        //중복허용여부
        if (!$.isTrue(state) && hasValueInArray(codes, code)) {
            i--;
        } else {
            codes.push(code);
        }
    }
    return codes;
}

/**
 * get makeCode_01
 */
function makeCode_01() {
    const arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const _d = moment();
    return "S" + arr[parseInt(_d.format("YY")) - 15] + arr[parseInt(_d.format("M"))] + arr[parseInt(_d.format("D"))] + arr[parseInt(_d.format("H"))] + _d.format("mm") + _d.format("ss");
}

/**
 * get Time
 */
function getTime() {
    return new Date().getTime();
}

/**
 * 문자열 매핑
 * @param value 문자열
 * @param arr 매핑 배열
 * @return String
 */
function mappingValue(value, arr) {
    let i = 0,
        n = 0;
    if (!$.hasValue(arr)) {
        return value;
    }
    const _arr = $.isString(arr) ? [arr] : arr;
    while ((i = value.indexOf(WCODE.at, i)) != -1) {
        if (_arr[n] == null) _arr[n] = WCODE.empty;
        value = value.substr(0, i) + String(_arr[n]) + value.substring(i + 1);
        i = i + String(_arr[n++]).length;
    }
    return value;
}

/**
 * html 태그 제거
 * @param value html 문자열 or Jquery
 * @return String
 */
function removeHtmlTag(value) {
    return $("<div/>").html($.isObject(value) ? value.html() : value).text();
}

/**
 * 배열속에 value값 존재여부
 * @param arr array
 * @param value 값
 * @param key 키
 * @param isBoolean default(true) boolean값 반환여부
 * @return boolean or String or PlainObject
 */
function hasValueInArray(arr, value, key, isBoolean) {
    if ($.isUndefined(isBoolean)) isBoolean = true;
    for (let i in arr) {
        if ((key ? arr[i][key] : arr[i]) == value) {
            return isBoolean ? true : arr[i];
        }
    }
    return isBoolean ? false : undefined;
}

/**
 * 첫문자를 대문자로변환
 * @param value 값
 * @return String
 */
function initCap(value) {
    return value.length > 1 ? value.substring(0, 1).toUpperCase() + value.substring(1, value.length).toLowerCase() : value;
}

/**
 * 파일사이즈 표시
 * @param fileSize 파일사이즈
 * @return String
 */
function formatFileSize(fileSize) {
    if (fileSize < 1024) {
        return fileSize + WCODE.byte;
    } else if (fileSize < 1048576) {
        return new Number(fileSize / 1024).toFixed(2) + WCODE.kb;
    } else {
        return new Number(fileSize / 1048576).toFixed(2) + WCODE.mb;
    }
}

/**
 * 파일아이콘
 * @param fileName 파일명
 * @return String
 */
function getFileIcon(fileName) {
    const exts = ["bmp", "jpg", "gif", "png", "doc", "docx", "ppt", "pptx", "xls", "xlsx", "txt", "hwp", "zip"];
    const ext = getLastValue(fileName, ".").toLowerCase();
    return (hasValueInArray(exts, ext) ? ext : "etc") + ".png";
}

/**
 * setTmpl
 * @param a Array
 */
function setTmpl(a) {
    $.each(a, function (key, value) {
        $.template(key, value);
    });
}

/**
 * setTmpl
 * @param a Array
 */
function drawTmplList(c, t, a, f) {
    if (!$.isArray(a)) return;
    if ($.isString(c)) c = $(c);
    $.tmpl(t, $.map(a, f)).appendTo(c);
}

/**
 * getUrlArguments
 * @param name String
 */
function getUrlArguments(name) {
    let result = undefined,
        paramSplit,
        url = location.href;

    if ((paramSplit = url.indexOf(WCODE.question)) > -1) {
        const bookmarkPosition = url.indexOf(WCODE.sharp),
            paramString = url.substring(paramSplit + 1, bookmarkPosition > -1 ? bookmarkPosition : url.length),
            params = paramString.split(WCODE.ampersand);

        result = name ? undefined : {};
        for (let i = 0; i < params.length; i++) {
            const param = params[i].split(WCODE.equal);
            if (name) {
                if (name == param[0]) {
                    result = isNaN(param[1]) ? param[1] : parseInt(param[1], 10);
                    break;
                }
            } else {
                result[param[0]] = isNaN(param[1]) ? param[1] : parseInt(param[1], 10);
            }
        }
    }

    return result;
}

/**
 * getBrowser
 */
function getBrowser() {
    let agent = navigator.userAgent.toLowerCase(),
        browser;
    if (agent.indexOf('msie') > -1) {
        browser = 'ie' + agent.match(/msie (\d+)/)[1]
    } else if (agent.indexOf('trident') > -1) {
        browser = 'ie11'
    } else if (agent.indexOf('edge') > -1) {
        browser = 'edge'
    } else if (agent.indexOf('firefox') > -1) {
        browser = 'firefox'
    } else if (agent.indexOf('opr') > -1) {
        browser = 'opera'
    } else if (agent.indexOf('chrome') > -1) {
        browser = 'chrome'
    } else if (agent.indexOf('safari') > -1) {
        browser = 'safari'
    } else {
        browser = 'other'
    }
    return browser;
}

//--------------------------------------------------------------------
// date
//--------------------------------------------------------------------
/**
 * 날자 포멧팅
 * @param delim
 * @return String
 */
function getFormatDate(dt, delim = WCODE.empty) {
    return dt.getFullYear() + delim + $.pad(String(dt.getMonth() + 1), 2, WCODE.zero) + delim + $.pad(String(dt.getDate()), 2, WCODE.zero);
}

/**
 * 오늘 일자를 구한다
 * @param delim
 * @return String
 */
function getToday(delim) {
    return getFormatDate(new Date(), delim);
}

/**
 * 원하는 만큼 일자를 증감해서 리턴
 * @param dt Date or String
 * @param mode Y or M or D
 * @param len 길이
 * @param delim
 * @return String
 */
function getTargetDate(dt, mode, len, delim) {
    if ($.isString(dt)) {
        const s = getPatternString("number", dt);
        dt = new Date(parseInt(s.substring(0, 4), 10), parseInt(s.substring(4, 6), 10) - 1, parseInt(s.substring(6, 8), 10));
    }

    if (mode == "Y") {
        dt.setFullYear(dt.getFullYear() + len);
    } else if (mode == "M") {
        dt.setMonth(dt.getMonth() + len);
    } else if (mode == "D") {
        dt.setDate(dt.getDate() + len);
    } else {
        return;
    }

    return getFormatDate(dt, delim);
}

//--------------------------------------------------------------------
// regexp
//--------------------------------------------------------------------
/**
 * 패턴 매치되는 여부
 * @param patternName 패턴
 * @param value 문자열
 * @return Boolean
 */
function isPattern(patternName, value) {
    const pattern = {
        number: /^[0-9]+$/,
        alphabat: /^[a-zA-Z]+$/,
        alphaNum: /^[0-9a-zA-Z]+$/,
        id: /^[A-za-z0-9]{5,15}$/,
        password: /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/, //특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호 정규식
        password2: /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/, //숫자, 특문 각 1회 이상, 영문은 2개 이상 사용하여 8자리 이상 입력
        hangul: /^[가-힣]+$/,
        email: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        email2: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
        url: /^(http|https|ftp|mailto):(?:\/\/)?((\w|-)+(?:[\.:@](\w|-))+)(?:\/|@)?([^"\?]*?)(?:\?([^\?"]*?))?$/,
        url2: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w_\.-]*)*\/?$/,
        phone: /^\d{2,3}-\d{3,4}-\d{3,4}$/,
        ip: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        date: /[0-9]{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/,
        hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/
    };

    if (pattern[patternName]) return (pattern[patternName]).test(value);
    else return (patternName).test(value);
}

/**
 * 패턴에 매치되는 문자열
 * @param patternName 패턴
 * @param value 문자열
 * @param addPatternString 패턴에 추가될 문자
 * @return String
 */
function getPatternString(patternName, value, addPatternString = WCODE.empty) {
    const pattern = {
        number: "[^0-9" + addPatternString + "]",
        alphabat: "[^a-zA-Z" + addPatternString + "]",
        alphaNum: "[^0-9a-zA-Z" + addPatternString + "]",
        hangul: "[^가-힣" + addPatternString + "]"
    };

    if (!pattern[patternName]) return WCODE.empty;
    return value.replace(new RegExp(pattern[patternName], "g"), WCODE.empty);
}

/**
 * 패턴에 맞는 문자열 추출
 * @param patternName 패턴
 * @param value 문자열
 * @return Array
 */
function getPatternArray(patternName, value) {
    const pattern = {
        p1: {
            regexp: /#[0-9a-zA-Z]+#/g,
            replace: WCODE.sharp
        }
    };
    let result = [];

    while ((match = pattern[patternName].regexp.exec(value)) !== null) {
        result.push(pattern[patternName].replace ? $.replace(match.toString(), pattern[patternName].replace, WCODE.empty) : match.toString());
    }
    return result;
}

/**
 * 자주 사용하는 문자열 변환
 * @param targetName 구분문자열
 * @param value 문자열
 * @return String
 */
function replaceString(targetName, value) {
    if (targetName == "htmlEscape") {
        return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    } else if (targetName == "htmlUnEscape") {
        return value.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    } else if (targetName == "lf2br") {
        return $.replace($.replace(value, "\r\n", "<br/>"), "\n", "<br/>");
    } else if (targetName == "br2lf") {
        return $.replace($.replace(value, "<br>", "\n", "gi"), "<br/>", "\n", "gi");
    } else if (targetName == "script") {
        return value.replace(/<script[^>]*>((\n|\r|.)*?)<\/script>/img, "");
    } else if (targetName == "telLink") {
        return value.replace(/\d{2,3}[-|\)]\d{3,4}-\d{3,4}/g, '<a tel="$&" class="tel-link">$&</a>');
    } else if (targetName == "underline2camel") {
        return value.toLowerCase().replace(/(\_[a-z])/g, function (arg) {
            return arg.toUpperCase().replace('_', '');
        });
    } else if (targetName == "camel2underline") {
        return value.replace(/([A-Z])/g, function (arg) {
            return "_" + arg.toLowerCase();
        }).toUpperCase();
    }
    return value;
}

/**
 * replaceRegExpContentImgUrl
 */
function replaceRegExpContentImgUrl(s) {
    const mobileApi = "https://m.wonchu.com/rest/common/file/downloadFileForImage?path=",
        targets = [
            "http://www.wonchu.com/support/fileupload/downloadFile.do",
            "http://www.wonchu.com/base/images/common"
        ];

    const re = /<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/g,
        re2 = /src="|'/g;
    return s.replace(re, function (match) {
        let b = false;
        for (let i = 0; targets.length > i; i++) {
            if (match.indexOf(targets[i]) > -1) {
                b = true;
                break;
            }
        }

        return b ? match.replace(/\?/g, "_Q_").replace(/\&amp;/g, "_A_").replace(/\&/g, "_A_").replace(re2, '$&' + mobileApi).replace("https", "http") : match;
    });
}

//--------------------------------------------------------------------
// ui
//--------------------------------------------------------------------
/**
 * dropDown
 */
function dropDown($1, $2, options) {
    try {
        let _timeout;
        _options = $.extend({
            show: "slow",
            hide: "fast",
            delay: 500
        }, options || {});

        $(WCODE.sharp + $1.attr("id") + WCODE.comma + WCODE.sharp + $2.attr("id")).hover(
            function () {
                if (!$.isUndefined(_timeout)) {
                    window.clearTimeout(_timeout);
                }
                $2.show(_options.show);
            },
            function () {
                if ($2.is(":visible")) {
                    _timeout = window.setTimeout(function () {
                        $2.hide(_options.hide);
                    }, _options.delay);
                }
            }
        );
    } catch (e) {}
}

//--------------------------------------------------------------------
// form
//--------------------------------------------------------------------

//--------------------------------------------------------------------
// event
//--------------------------------------------------------------------
/**
 * 함수 실행
 * @param functionName 함수명
 * @param arguments 인자값들
 * @return Boolean
 */
function doFunction(s) {
    if (typeof (window[s]) == WCODE.function) {
        window[s].apply(null, Array.prototype.slice.call(arguments, 1));
        return true;
    } else {
        return false;
    }
}

/**
 * 함수 실행 시간 지연
 * @param functionName 함수명
 * @param wait 지연MM
 * @param arguments 인자값들
 */
function delayFunction(functionName, wait) {
    if (typeof functionName == WCODE.function) {
        return setTimeout(functionName, wait);
    } else {
        const args = Array.prototype.slice.call(arguments, 2);
        return setTimeout(function () {
            return window[functionName].apply(null, args);
        }, wait || 0);
    }
}

/**
 * 외부 스크립트 로드
 * @param url 소스 경로
 */
function loadScripts(url, callback) {
    const _url = $.isString(url) ? [url] : url;
    _url.forEach(function (value, index, array) {
        const _script = document.createElement('script');
        _script.charset = "utf-8";
        _script.type = 'text/javascript';
        _script.async = false;
        _script.src = value;
        if (callback && _url.length == index + 1) {
            // IE에서는 onreadystatechange를 사용
            _script.onload = function () {
                callback();
            };
        }
        document.getElementsByTagName('head')[0].appendChild(_script);
    });
}

/**
 * 외부 스타일 로드
 * @param url 소스 경로
 */
function loadStyles(url) {
    const _url = $.isString(url) ? [url] : url;
    _url.forEach(function (value, index, array) {
        const _link = document.createElement("link");
        _link.type = "text/css";
        _link.rel = "stylesheet";
        _link.href = value;
        document.getElementsByTagName('head')[0].appendChild(_link);
    });
}

//--------------------------------------------------------------------
// object
//--------------------------------------------------------------------
/**
 * base62로 변환
 * @param value 값
 * @return String
 */
const base62 = new(function () {
    const table = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    function decode(str) {
        let decodedNum, i, len;
        for (decodedNum = 0, i = len = str.length; i--;) {
            decodedNum += table.indexOf(str[i]) * Math.pow(62, len - i - 1);
        }
        return decodedNum;
    }

    function encode(num) {
        let encodedStr = WCODE.empty;
        while (num > 0) {
            encodedStr = table.charAt(num % 62) + encodedStr;
            num = Math.floor(num / 62);
        }
        return encodedStr;
    }

    return {
        decode: decode,
        encode: encode
    };
});

/***
 * 실행시간 구하기
 * @param mode
 */
function stopWatch(_title) {
    this.title = null;
    this.startTime = null;
    this.start = function (_title) {
        this.title = _title || "stopWatch";
        this.startTime = (new Date()).getTime();
    };
    this.stop = function (mode) {
        const endTime = (new Date()).getTime();
        if (!$.hasValue(this.startTime)) this.startTime = endTime;

        const duration = (endTime - this.startTime) / 1000;
        if (mode == "alert") {
            $.alert(this.title + "\nduaration : " + duration + " seconds");
        } else if (mode == "return") {
            return endTime - this.startTime;
        } else {
            $.wLog(" duaration : " + duration + " seconds", this.title);
        }
    };
}

/***
 * JSON Util
 * @param mode
 */
const wJson = new(function () {
    function init(json, isClone) {
        let result = isClone ? $.extend({}, json) : json;
        $.each(result, function (key) {
            if ($.hasValue(result[key])) {
                if ($.isArray(result[key])) {
                    result[key] = [];
                } else if ($.isObject(result[key])) {
                    result[key] = {};
                } else if ($.isNumeric(result[key])) {
                    result[key] = 0;
                } else {
                    result[key] = WCODE.empty;
                }
            }
        });
        return result;
    }

    function keys(json) {
        let result = [];
        if ($.isObject(json)) {
            for (let key in json) result.push(key);
        }
        return result;
    }

    function values(json) {
        let result = [];
        if ($.isObject(json)) {
            for (let key in json) result.push(json[key]);
        }
        return result;
    }

    function clone(json1, json2) {
        return $.extend({}, json1, json2 || {});
    }

    function sort(data, key, type) {
        if (!type) type = "asc";
        return data.sort(function (a, b) {
            const x = a[key];
            const y = b[key];
            if (type == "desc") {
                return x > y ? -1 : x < y ? 1 : 0;
            } else if (type == "asc") {
                return x < y ? -1 : x > y ? 1 : 0;
            }
        });
    }

    function toString(json, delm = WCODE.equal, delm2 = WCODE.empty) {
        let sb = new stringBuffer();
        for (let key in json) {
            sb.append(key + delm + json[key]);
        }
        return sb.toString(delm2);
    }

    return {
        init: init,
        keys: keys,
        values: values,
        clone: clone,
        sort: sort,
        toString: toString
    };
});

/**
 * localStorage
 */
const lStorage = {
    surport: function () {
        return $.isObject(window.localStorage);
    },
    exist: function (key) {
        const b = window.localStorage && window.localStorage[key] ? true : false;
        $.wLog(key + " : " + b, "lStorage.exist");
        return b;
    },
    get: function (key, toJson, isDel) {
        let result;
        try {
            if (!$.hasValue(toJson)) toJson = true;
            if (!$.hasValue(isDel)) isDel = false;

            if (window.localStorage[key]) {
                result = toJson ? $.parseJSON(window.localStorage.getItem(key)) : window.localStorage.getItem(key);
            } else {
                result = toJson ? {} : WCODE.empty;
            }

            if (isDel) {
                window.localStorage.removeItem(key);
            }

            $.wLog(key, "lStorage.exist");
        } catch (e) {
            $.wLog("error : " + e.message, "lStorage.get");
        }
        return result;
    },
    set: function (key, value, toString) {
        try {
            if (!$.hasValue(toString)) toString = true;
            window.localStorage[key] = toString ? JSON.stringify(value) : value;
            $.wLog(key, "lStorage.set");
        } catch (e) {
            $.wLog("error : " + e.message, "lStorage.set");
        }
    },
    remove: function (key) {
        try {
            if (window.localStorage[key]) {
                window.localStorage.removeItem(key);
                $.wLog(key, "lStorage.remove");
            }
        } catch (e) {
            $.wLog("error : " + e.message, "lStorage.remove");
        }
    },
    removeList: function (keys) {
        try {
            $.each(keys, function () {
                if (window.localStorage[this]) {
                    window.localStorage.removeItem(this);
                    $.wLog(this, "lStorage.remove");
                }
            });
        } catch (e) {
            $.wLog("error : " + e.message, "sStorage.remove");
        }
    },
    clear: function () {
        window.localStorage.clear();
    }
};

/**
 * sessionStorage
 */
const sStorage = {
    surport: function () {
        return $.isObject(window.sessionStorage);
    },
    exist: function (key) {
        const b = window.sessionStorage && window.sessionStorage[key] ? true : false;
        $.wLog(key + " : " + b, "sStorage.exist");
        return b;
    },
    get: function (key, toJson, isDel) {
        let result;
        try {
            if (!$.hasValue(toJson)) toJson = true;
            if (!$.hasValue(isDel)) isDel = false;

            if (window.sessionStorage[key]) {
                result = toJson ? $.parseJSON(window.sessionStorage.getItem(key)) : window.sessionStorage.getItem(key);
            } else {
                result = toJson ? {} : WCODE.empty;
            }

            if (isDel) {
                window.sessionStorage.removeItem(key);
            }

            $.wLog(key, "sStorage.get");
        } catch (e) {
            $.wLog("error : " + e.message, "sStorage.get");
        }
        return result;
    },
    set: function (key, value, toString) {
        try {
            if (!$.hasValue(toString)) toString = true;
            window.sessionStorage[key] = toString ? JSON.stringify(value) : value;
            $.wLog(key, "sStorage.set");
        } catch (e) {
            $.wLog("error : " + e.message, "sStorage.set");
        }
    },
    remove: function (key) {
        try {
            if (window.sessionStorage[key]) {
                window.sessionStorage.removeItem(key);
                $.wLog(key, "sStorage.remove");
            }
        } catch (e) {
            $.wLog("error : " + e.message, "sStorage.remove");
        }
    },
    removeList: function (keys) {
        try {
            $.each(keys, function () {
                if (window.sessionStorage[this]) {
                    window.sessionStorage.removeItem(this);
                    $.wLog(this, "sStorage.remove");
                }
            });
        } catch (e) {
            $.wLog("error : " + e.message, "sStorage.remove");
        }
    },
    clear: function () {
        window.sessionStorage.clear();
    }
};

/**
 * stringBuffer
 */
function stringBuffer() {
    let buffer = new Array();
    this.append = function (value) {
        buffer.push($.getString(value));
    }
    this.size = function () {
        return buffer.length;
    }
    this.toString = function (delm = WCODE.empty) {
        return buffer.join(delm);
    }
}