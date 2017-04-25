/*
 * wjquery-editor v0.1
 * 공식배포처 : http://www.wonchu.net
 * 제작자 이메일 : wonchu.net@gmail.com
 *
 * 사용상의 문제나 건의사항은 공식 배포사이트의 게시판을 이용해주시거나 메일로 보내 주시기 바랍니다.
 */

;
(function ($) {
    "use strict";

    if ($.weditor) {
        return;
    }

    /**
     * holds all jstree related functions and variables, including the actual class and methods to create, access and manipulate instances.
     * @name $.jstree
     */
    $.weditor = {
        version: "0.0.1",
        mode: "",
        printLog: true,
        defaultOptions: {
            root: "/view/project/weditor/",
            width: "100%",
            height: "350px",
            toolbar: "max",
            minResizHeight: "100px",
            fontname: "돋움, dotum",
            fontsize: "9pt",
            conversion: ["editor", "html", "text"],
            defaultConversion: "editor",
            resize: true,
            exceptButtons: [] // header 구성에서 제외할 button
        },

        toolbar: {
            "min": [
    	        ["newpage"],
    	        ["forecolor", "backcolor"],
    	        ["bold", "italic", "strikethrough", "underline"],
    	        ["character", "link"]
    	   	],
            "default": [
    	        ["fontname", "fontsize"],
    	        ["newpage", "previewer", "print"],
    	        ["forecolor", "backcolor"],
    	        ["bold", "italic", "strikethrough", "underline"],
    	        ["justifyleft", "justifycenter", "justifyright", "justifyfull"],
    	        ["character", "link", "image"]
    	    ],
            "max": [
                ["fontname", "fontsize"],
                ["undo", "redo", "copy", "cut", "paste"],
                ["newpage", "previewer", "print"],
                ["forecolor", "backcolor"],
                ["bold", "italic", "strikethrough", "underline"],
                ["blockquote", "hr"],
                ["justifyleft", "justifycenter", "justifyright", "justifyfull"],
                ["insertorderedlist", "insertunorderedlist"],
                ["character", "link"]
                //["character", "table", "link", "urlimage", "image", "file"]
            ]
        },

        buttons: {
            fontname: {
                hasLayer: true,
                ifrmLeft: "0",
                action: "openLayer",
                title: "글꼴",
                data: [
                {
                    value: "돋움, dotum",
                    text: "돋움",
                    sample: "가나다라"
                },
                {
                    value: "돋움체, dotumche",
                    text: "돋움체",
                    sample: "가나다라"
                },
                {
                    value: "굴림, gulim",
                    text: "굴림",
                    sample: "가나다라"
                },
                {
                    value: "굴림체, gulimche",
                    text: "굴림체",
                    sample: "가나다라"
                },
                {
                    value: "바탕, batang",
                    text: "바탕",
                    sample: "가나다라"
                },
                {
                    value: "바탕체, batangche",
                    text: "바탕체",
                    sample: "가나다라"
                },
                {
                    value: "궁서, gungsuh",
                    text: "궁서",
                    sample: "가나다라"
                },
                {
                    value: "arial",
                    text: "Arial",
                    sample: "가나다라"
                },
                {
                    value: "tahoma",
                    text: "Tahoma",
                    sample: "abcd"
                },
                {
                    value: "times new roman",
                    text: "Times New Roman",
                    sample: "abcd"
                },
                {
                    value: "verdana",
                    text: "verdana",
                    sample: "abcd"
                }
	         ],
            },
            fontsize: {
                hasLayer: true,
                ifrmLeft: "0",
                action: "openLayer",
                title: "글자크기",
                data: [
                {
                    value: "7pt",
                    text: "가나다라마(7pt)"
                },
                {
                    value: "8pt",
                    text: "가나다라마(8pt)"
                },
                {
                    value: "9pt",
                    text: "가나다라마(9pt)"
                },
                {
                    value: "10pt",
                    text: "가나다라마(10pt)"
                },
                {
                    value: "11pt",
                    text: "가나다라마(11pt)"
                },
                {
                    value: "12pt",
                    text: "가나다라마(12pt)"
                },
                {
                    value: "14pt",
                    text: "가나다라마(14pt)"
                },
                {
                    value: "18pt",
                    text: "가나다라마(18pt)"
                },
                {
                    value: "24pt",
                    text: "가나다라(24pt)"
                },
                {
                    value: "36pt",
                    text: "가나다(36pt)"
                }
            ],
            },
            redo: {
                hasLayer: false,
                ifrmLeft: "0",
                action: "execute",
                title: "다시실행"
            },
            undo: {
                hasLayer: false,
                ifrmLeft: "0",
                action: "execute",
                title: "되돌리기"
            },
            copy: {
                hasLayer: false,
                ifrmLeft: "0",
                action: "execute",
                title: "복사하기"
            },
            cut: {
                hasLayer: false,
                ifrmLeft: "0",
                action: "execute",
                title: "잘라내기"
            },
            paste: {
                hasLayer: false,
                ifrmLeft: "0",
                action: "execute",
                title: "붙여넣기"
            },
            newpage: {
                hasLayer: false,
                ifrmLeft: "0",
                action: "newpage",
                title: "새로열기"
            },
            previewer: {
                hasLayer: false,
                ifrmLeft: "0",
                action: "previewer",
                title: "미리보기"
            },
            print: {
                hasLayer: false,
                ifrmLeft: "0",
                action: "print",
                title: "인쇄하기"
            },
            forecolor: {
                hasLayer: false,
                ifrmLeft: "0",
                action: "openLayer",
                title: "글자색상"
            },
            forecolormore: {
                hasLayer: true,
                ifrmLeft: "0",
                action: "openLayer",
                title: "더보기",
                data: {
                    text: "가나다라마바",
                    value: ["#000000", "#ff3300", "#ff0099", "#ff6600", "#cc00ff", "#cc9900", "#0000ff", "#33cc00", "#0099ff", "#009999"]
                },
            },
            backcolor: {
                hasLayer: false,
                ifrmLeft: "0",
                action: "openLayer",
                title: "배경색상"
                
            },
            backcolormore: {
                hasLayer: true,
                ifrmLeft: "0",
                action: "openLayer",
                title: "더보기",
                data: {
                    text: "가나다라마바",
                    value: ["#000000", "#ff3300", "#ff0099", "#ff6600", "#cc00ff", "#cc9900", "#0000ff", "#33cc00", "#0099ff", "#009999"]
                },
            },
            bold: {
                hasLayer: false,
                ifrmLeft: "0",
                action: "execute",
                title: "굵게(Crtl+B}"
            },
            italic: {
                hasLayer: false,
                ifrmLeft: "0",
                action: "execute",
                title: "기울림꼴(Crtl+I}"
            },
            underline: {
                hasLayer: false,
                ifrmLeft: "0",
                action: "execute",
                title: "글자밑줄(Crtl+U}"
            },
            strikethrough: {
                hasLayer: false,
                ifrmLeft: "0",
                action: "execute",
                title: "취소선"
            },
            table: {
                hasLayer: true,
                ifrmLeft: "0",
                action: "openLayer",
                title: "테이블"
            },
            blockquote: {
                hasLayer: true,
                ifrmLeft: "0",
                action: "openLayer",
                title: "필드셋",
                data: [
                    "background-color:#eeeeee;border:1px solid #999999;",
                    "background-color:#eeeeee;border:1px dotted #999999;",
                    "background-color:#eeeeee;border:none",
                    "background-color:#f5f7f8;border:1px solid #999999;",
                    "background-color:#f5f7f8;border:1px dotted #999999;",
                    "background-color:#f5f7f8;border:none",
                    "background-color:#ffffee;color:#660066;border:1px solid #999999;",
                    "background-color:#ffffee;color:#660066;border:1px dotted #999999;",
                    "background-color:#ffffee;color:#660066;border:none;",
                    "background-color:#aaaaaa;color:#ffffff;border:none;"
                ],
            },
            hr: {
                hasLayer: true,
                ifrmLeft: "0",
                action: "openLayer",
                title: "밑줄",
                data: {
                    text: "가나다라마바",
                    value: ["#000000", "#ff3300", "#ff0099", "#ff6600", "#cc00ff", "#cc9900", "#0000ff", "#33cc00", "#0099ff", "#009999"]
                },
            },
            justifyleft: {
                hasLayer: false,
                ifrmLeft: "0",
                action: "execute",
                title: "왼쪽맞춤"
            },
            justifycenter: {
                hasLayer: false,
                ifrmLeft: "0",
                action: "execute",
                title: "가운데맞춤"
            },
            justifyright: {
                hasLayer: false,
                ifrmLeft: "0",
                action: "execute",
                title: "오른쪽맞츰"
            },
            justifyfull: {
                hasLayer: false,
                ifrmLeft: "0",
                action: "execute",
                title: "전체맞춤"
            },
            insertorderedlist: {
                hasLayer: false,
                ifrmLeft: "0",
                action: "execute",
                title: "번호매기기"
            },
            insertunorderedlist: {
                hasLayer: false,
                ifrmLeft: "0",
                action: "execute",
                title: "글머리기호"
            },
            indent: {
                hasLayer: false,
                ifrmLeft: "0",
                action: "execute",
                title: "들여쓰기"
            },
            outdent: {
                hasLayer: false,
                ifrmLeft: "0",
                action: "execute",
                title: "내어쓰기"
            },
            emoticon: {
                hasLayer: true,
                ifrmLeft: "0",
                action: "openLayer",
                title: "이모티콘"
            },
            character: {
                hasLayer: true,
                ifrmLeft: "0",
                action: "openLayer",
                title: "특수문자",
                data: {
                    max: 171,
                    tab: ["일반기호", "숫자와 단위", "원,괄호", "한글", "그리스,라틴어", "일본어"],
                    value: [
                        "%uFF5B %uFF5D %u3014 %u3015 %u3008 %u3009 %u300A %u300B %u300C %u300D %u300E %u300F %u3010 %u3011 %u2018 %u2019 %u201C %u201D %u3001 %u3002 %B7 %u2025 %u2026 %A7 %u203B %u2606 %u2605 %u25CB %u25CF %u25CE %u25C7 %u25C6 %u25A1 %u25A0 %u25B3 %u25B2 %u25BD %u25BC %u25C1 %u25C0 %u25B7 %u25B6 %u2664 %u2660 %u2661 %u2665 %u2667 %u2663 %u2299 %u25C8 %u25A3 %u25D0 %u25D1 %u2592 %u25A4 %u25A5 %u25A8 %u25A7 %u25A6 %u25A9 %B1 %D7 %F7 %u2260 %u2264 %u2265 %u221E %u2234 %B0 %u2032 %u2033 %u2220 %u22A5 %u2312 %u2202 %u2261 %u2252 %u226A %u226B %u221A %u223D %u221D %u2235 %u222B %u222C %u2208 %u220B %u2286 %u2287 %u2282 %u2283 %u222A %u2229 %u2227 %u2228 %uFFE2 %u21D2 %u21D4 %u2200 %u2203 %B4 %uFF5E %u02C7 %u02D8 %u02DD %u02DA %u02D9 %B8 %u02DB %A1 %BF %u02D0 %u222E %u2211 %u220F %u266D %u2669 %u266A %u266C %u327F %u2192 %u2190 %u2191 %u2193 %u2194 %u2195 %u2197 %u2199 %u2196 %u2198 %u321C %u2116 %u33C7 %u2122 %u33C2 %u33D8 %u2121 %u2668 %u260F %u260E %u261C %u261E %B6 %u2020 %u2021 %AE %AA %BA %u2642 %u2640",
                        "%BD %u2153 %u2154 %BC %BE %u215B %u215C %u215D %u215E %B9 %B2 %B3 %u2074 %u207F %u2081 %u2082 %u2083 %u2084 %u2160 %u2161 %u2162 %u2163 %u2164 %u2165 %u2166 %u2167 %u2168 %u2169 %u2170 %u2171 %u2172 %u2173 %u2174 %u2175 %u2176 %u2177 %u2178 %u2179 %uFFE6 %24 %uFFE5 %uFFE1 %u20AC %u2103 %u212B %u2109 %uFFE0 %A4 %u2030 %u3395 %u3396 %u3397 %u2113 %u3398 %u33C4 %u33A3 %u33A4 %u33A5 %u33A6 %u3399 %u339A %u339B %u339C %u339D %u339E %u339F %u33A0 %u33A1 %u33A2 %u33CA %u338D %u338E %u338F %u33CF %u3388 %u3389 %u33C8 %u33A7 %u33A8 %u33B0 %u33B1 %u33B2 %u33B3 %u33B4 %u33B5 %u33B6 %u33B7 %u33B8 %u33B9 %u3380 %u3381 %u3382 %u3383 %u3384 %u33BA %u33BB %u33BC %u33BD %u33BE %u33BF %u3390 %u3391 %u3392 %u3393 %u3394 %u2126 %u33C0 %u33C1 %u338A %u338B %u338C %u33D6 %u33C5 %u33AD %u33AE %u33AF %u33DB %u33A9 %u33AA %u33AB %u33AC %u33DD %u33D0 %u33D3 %u33C3 %u33C9 %u33DC %u33C6",
                        "%u3260 %u3261 %u3262 %u3263 %u3264 %u3265 %u3266 %u3267 %u3268 %u3269 %u326A %u326B %u326C %u326D %u326E %u326F %u3270 %u3271 %u3272 %u3273 %u3274 %u3275 %u3276 %u3277 %u3278 %u3279 %u327A %u327B %u24D0 %u24D1 %u24D2 %u24D3 %u24D4 %u24D5 %u24D6 %u24D7 %u24D8 %u24D9 %u24DA %u24DB %u24DC %u24DD %u24DE %u24DF %u24E0 %u24E1 %u24E2 %u24E3 %u24E4 %u24E5 %u24E6 %u24E7 %u24E8 %u24E9 %u2460 %u2461 %u2462 %u2463 %u2464 %u2465 %u2466 %u2467 %u2468 %u2469 %u246A %u246B %u246C %u246D %u246E %u3200 %u3201 %u3202 %u3203 %u3204 %u3205 %u3206 %u3207 %u3208 %u3209 %u320A %u320B %u320C %u320D %u320E %u320F %u3210 %u3211 %u3212 %u3213 %u3214 %u3215 %u3216 %u3217 %u3218 %u3219 %u321A %u321B %u249C %u249D %u249E %u249F %u24A0 %u24A1 %u24A2 %u24A3 %u24A4 %u24A5 %u24A6 %u24A7 %u24A8 %u24A9 %u24AA %u24AB %u24AC %u24AD %u24AE %u24AF %u24B0 %u24B1 %u24B2 %u24B3 %u24B4 %u24B5 %u2474 %u2475 %u2476 %u2477 %u2478 %u2479 %u247A %u247B %u247C %u247D %u247E %u247F %u2480 %u2481 %u2482",
                        "%u3131 %u3132 %u3133 %u3134 %u3135 %u3136 %u3137 %u3138 %u3139 %u313A %u313B %u313C %u313D %u313E %u313F %u3140 %u3141 %u3142 %u3143 %u3144 %u3145 %u3146 %u3147 %u3148 %u3149 %u314A %u314B %u314C %u314D %u314E %u314F %u3150 %u3151 %u3152 %u3153 %u3154 %u3155 %u3156 %u3157 %u3158 %u3159 %u315A %u315B %u315C %u315D %u315E %u315F %u3160 %u3161 %u3162 %u3163 %u3165 %u3166 %u3167 %u3168 %u3169 %u316A %u316B %u316C %u316D %u316E %u316F %u3170 %u3171 %u3172 %u3173 %u3174 %u3175 %u3176 %u3177 %u3178 %u3179 %u317A %u317B %u317C %u317D %u317E %u317F %u3180 %u3181 %u3182 %u3183 %u3184 %u3185 %u3186 %u3187 %u3188 %u3189 %u318A %u318B %u318C %u318D %u318E",
                        "%u0391 %u0392 %u0393 %u0394 %u0395 %u0396 %u0397 %u0398 %u0399 %u039A %u039B %u039C %u039D %u039E %u039F %u03A0 %u03A1 %u03A3 %u03A4 %u03A5 %u03A6 %u03A7 %u03A8 %u03A9 %u03B1 %u03B2 %u03B3 %u03B4 %u03B5 %u03B6 %u03B7 %u03B8 %u03B9 %u03BA %u03BB %u03BC %u03BD %u03BE %u03BF %u03C0 %u03C1 %u03C3 %u03C4 %u03C5 %u03C6 %u03C7 %u03C8 %u03C9 %C6 %D0 %u0126 %u0132 %u013F %u0141 %D8 %u0152 %DE %u0166 %u014A %E6 %u0111 %F0 %u0127 I %u0133 %u0138 %u0140 %u0142 %u0142 %u0153 %DF %FE %u0167 %u014B %u0149 %u0411 %u0413 %u0414 %u0401 %u0416 %u0417 %u0418 %u0419 %u041B %u041F %u0426 %u0427 %u0428 %u0429 %u042A %u042B %u042C %u042D %u042E %u042F %u0431 %u0432 %u0433 %u0434 %u0451 %u0436 %u0437 %u0438 %u0439 %u043B %u043F %u0444 %u0446 %u0447 %u0448 %u0449 %u044A %u044B %u044C %u044D %u044E %u044F",
                        "%u3041 %u3042 %u3043 %u3044 %u3045 %u3046 %u3047 %u3048 %u3049 %u304A %u304B %u304C %u304D %u304E %u304F %u3050 %u3051 %u3052 %u3053 %u3054 %u3055 %u3056 %u3057 %u3058 %u3059 %u305A %u305B %u305C %u305D %u305E %u305F %u3060 %u3061 %u3062 %u3063 %u3064 %u3065 %u3066 %u3067 %u3068 %u3069 %u306A %u306B %u306C %u306D %u306E %u306F %u3070 %u3071 %u3072 %u3073 %u3074 %u3075 %u3076 %u3077 %u3078 %u3079 %u307A %u307B %u307C %u307D %u307E %u307F %u3080 %u3081 %u3082 %u3083 %u3084 %u3085 %u3086 %u3087 %u3088 %u3089 %u308A %u308B %u308C %u308D %u308E %u308F %u3090 %u3091 %u3092 %u3093 %u30A1 %u30A2 %u30A3 %u30A4 %u30A5 %u30A6 %u30A7 %u30A8 %u30A9 %u30AA %u30AB %u30AC %u30AD %u30AE %u30AF %u30B0 %u30B1 %u30B2 %u30B3 %u30B4 %u30B5 %u30B6 %u30B7 %u30B8 %u30B9 %u30BA %u30BB %u30BC %u30BD %u30BE %u30BF %u30C0 %u30C1 %u30C2 %u30C3 %u30C4 %u30C5 %u30C6 %u30C7 %u30C8 %u30C9 %u30CA %u30CB %u30CC %u30CD %u30CE %u30CF %u30D0 %u30D1 %u30D2 %u30D3 %u30D4 %u30D5 %u30D6 %u30D7 %u30D8 %u30D9 %u30DA %u30DB %u30DC %u30DD %u30DE %u30DF %u30E0 %u30E1 %u30E2 %u30E3 %u30E4 %u30E5 %u30E6 %u30E7 %u30E8 %u30E9 %u30EA %u30EB %u30EC %u30ED %u30EE %u30EF %u30F0 %u30F1 %u30F2 %u30F3 %u30F4 %u30F5 %u30F6",
                    ]
                }
            },
            link: {
                hasLayer: true,
                ifrmLeft: "0",
                action: "openLayer",
                title: "링크만들기"
            },
            urlimage: {
                hasLayer: true,
                ifrmLeft: "0",
                action: "openLayer",
                title: "이미지링크"
            },
            image: {
                hasLayer: true,
                ifrmLeft: "0",
                action: "uploadImage",
                title: "이미지"
            },
            file: {
                hasLayer: true,
                ifrmLeft: "0",
                action: "uploadImage",
                title: "파일"
            }
        },
        
        const : {
            buttons : {},
            conversion: {editor: "editor", html: "html", text: "text"},
            on: "on",
            off: "off",
            more: "more",
            down: "down",
            over: "over",
            up: "up",
            out: "out",
            empty: ""
        },
        
        /* data */
        data: {
            align: "justifyleft;justifycenter;justifyright;justifyfull",
            ffCheck: "bold;italic;underline;strikethrough",
            keycode: "8;37;38;39;40"
        },

        /* tempate */
        template: {
            docHtml: "<!DOCTYPE HTML><html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/><style>body{background-color:#ffffff;word-wrap:break-word;ime-mode:active;margin:10px;padding:0;font-family:@;font-size:@;} P {margin:0;padding:0;line-height:1.5;}</style></head><body>@</body></html>",
            initTag: "<p><br></p>",
            init: "<div class=\"weditor-wapper\"><div class=\"weditor-headerbg\"></div><div class=\"weditor-header\"><ul><li class=\"starter\"></li></ul></div><div class=\"weditor-section\"><div class=\"weditor-resizebg\"></div><iframe class=\"weditor-editor\" src=\"about:blank\" frameborder=\"0\" /><textarea class=\"weditor-textarea\"></textarea></div><div class=\"weditor-footer\"><div></div><ul><li class=\"text off none\"></li><li class=\"html off none\"></li><li class=\"editor off none\"></li></ul></div></div>",
            headerButton: "<li title=\"@\"><button class=\"@\">@</button></li>",
            separator: "<li class=\"separator\"></li>",
            actionLayer: "<div class=\"weditor-layer @\"><ul></ul></div>",
            resizemore : "<span class=\"resizemore off\"/>"
        },
        options: null,
        //element
        el: {}
    };

    $.weditor.create = function ($target, options) {
        $.weditor.util.log(options, "customed options");
        this.options = $.extend(true, {}, this.defaultOptions, options);
        $target.hide().before(this.template.init);
        $.weditor.util.log(this.options, "create options");

        var $wapper = $(".weditor-wapper");
        this.el = {
            $target: $target,
            $wapper: $wapper,
            $headerbg: $(".weditor-headerbg", $wapper),
            $header: $(".weditor-header", $wapper),
            $section: $(".weditor-section", $wapper),
            $resizebg: $(".weditor-resizebg", $wapper),
            $editor: $(".weditor-editor", $wapper),
            $editorCw: $(".weditor-editor", $wapper)[0].contentWindow,
            $editorDoc: $(".weditor-editor", $wapper)[0].contentWindow.document,
            $textEditor: $(".weditor-textarea", $wapper),
            $footer: $(".weditor-footer", $wapper)
        };

        this.el.$editorDoc.open();
        this.el.$editorDoc.write(mappingValue(this.template.docHtml, [this.options.fontName, this.options.fontSize, this.data.initTag]));
        this.el.$editorDoc.close();
        this.el.$editorDoc.designMode = $.weditor.const.on;

        if (options.width != this.defaultOptions.width) {
            this.el.$section.width(this.options.width);
        }

        if (options.height != this.defaultOptions.height) {
            this.el.$section.height(this.options.height);
        }

        // allow buttons
        $.each(this.toolbar.max, function () {
            $.each(this, function (){
                $.weditor.const.buttons[this] = this;
            });
        });
    
        var _li = [];
        $.each(this.toolbar[this.options.toolbar], function (index, unit) {
            if (index != 0) _li.push($.weditor.template.separator);
            $.each(unit, function (index2, buttonName) {
                if (buttonName == $.weditor.const.buttons.fontname || buttonName == $.weditor.const.buttons.fontsize) {
                    _li.push($.weditor.event.makeButton(buttonName, "<span>" + $.weditor.util.getFirsArrayData($.weditor.options[buttonName]) + "</span>"));
                } else {
                    if($.weditor.const.buttons[buttonName]){
                        _li.push($.weditor.event.makeButton(buttonName, $.weditor.const.empty));    
                    }
                }

                if (buttonName == $.weditor.const.buttons.forecolor || buttonName == $.weditor.const.buttons.backcolor) {
                    _li.push($.weditor.event.makeButton(buttonName + $.weditor.const.more, $.weditor.const.empty));
                }
            });
        });

        if (_li.length > 0) this.el.$header.find("ul").append(_li.join($.weditor.const.empty));
        this.el.$button = $("li>button", $.weditor.el.$header);

        // button event
        $("ul > li:not('.starter,.separator')", $.weditor.el.$header)
        .on("mouseover", function (event) {
            $.weditor.event.changeButton($(this), $.weditor.const.over);
        })
        .on("mouseout", function (event) {
            $.weditor.event.changeButton($(this), $.weditor.const.out);
        })
        .on("mousedown", function (event) {
            $.weditor.event.changeButton($(this), $.weditor.const.down);
        })
        .on("mouseup", function (event) {
            if (!$.weditor.buttons[$(this).find("button").attr("class")].hasLayer) {
                $.weditor.event.changeButton($(this), $.weditor.const.up);
            }
        })
        .on("click", function (event) {
            $.weditor.event.clickButton($(this).find("button").attr("class"));
        });

        this.setContent(this.el.$target.val());

        // conversion mode
        $.each(this.options.conversion, function () {
            $("ul li." + this, $.weditor.el.$footer).removeClass("none");
        });

        $("ul li", this.el.$footer).click(function () {
            var skip = false;
            if ($(this).hasClass($.weditor.const.conversion.editor) && $(this).hasClass($.weditor.const.off)) {
                $.weditor.el.$textEditor.hide();
                $.weditor.el.$editor.show();
                $.weditor.el.$headerbg.hide();
                if ($("ul li." + $.weditor.const.conversion.html, $.weditor.el.$footer).hasClass($.weditor.const.on)) {
                    $.weditor.setContent($.weditor.getContent("text"));
                } else if ($("ul li." + $.weditor.const.conversion.text, $.weditor.el.$footer).hasClass($.weditor.const.on)) {
                    $.weditor.setContent($.weditor.el.$textEditor.val(), "text");
                }
                $.weditor.mode = $.weditor.const.conversion.editor;
            } else if ($(this).hasClass($.weditor.const.conversion.html) && $(this).hasClass($.weditor.const.off)) {
                $.weditor.el.$textEditor.hide();
                $.weditor.el.$editor.show();
                $.weditor.el.$headerbg.show();
                if ($("ul li." + $.weditor.const.conversion.editor, $.weditor.el.$footer).hasClass($.weditor.const.on)) {
                    $.weditor.setContent($.weditor.getContent(), "text");
                } else if ($("ul li." + $.weditor.const.conversion.text, $.weditor.el.$footer).hasClass($.weditor.const.on)) {
                    $.weditor.setContent($.weditor.el.$textEditor.val(), "text");
                }
                $.weditor.mode = $.weditor.const.conversion.html;
            } else if ($(this).hasClass("text") && $(this).hasClass($.weditor.const.off)) {
                if ($.weditor.getContent("text")!=$.weditor.const.empty) {
                    if (!confirm("전환하시겠습니까?")) skip = true;
                }

                if (!skip) {
                    $.weditor.el.$textEditor.show();
                    $.weditor.el.$editor.hide();
                    $.weditor.el.$headerbg.show();
                    if ($("ul li." + $.weditor.const.conversion.html, $.weditor.el.$footer).hasClass($.weditor.const.on)) {
                        $.weditor.setContent($.weditor.getContent("text"));
                    }
                    $.weditor.el.$textEditor.val($.weditor.getContent("text"));
                    $.weditor.mode = $.weditor.const.conversion.text;
                }
            }

            if (!skip) {
                $(this).siblings().removeClass($.weditor.const.on).addClass($.weditor.const.off);
                $(this).removeClass($.weditor.const.off).addClass($.weditor.const.on);
                $.weditor.util.log($.weditor.mode, "footer mode");
            }
        });

        $("ul li." + this.options.defaultConversion, $.weditor.el.$footer).trigger("click");

        if (this.options.resize) {
            this
            .el.$footer.find("div")
            .addClass("resize")
            .bind("mousedown", function (event) {
                $.weditor.resize.start(event)
            }).html(this.template.resizemore);
        }
    };

    $.weditor.event = {
        makeButton: function (buttonName, addStr) {
            return mappingValue($.weditor.template.headerButton, [$.weditor.buttons[buttonName].title, buttonName, addStr]);
        },
        changeButton: function ($t, mode, p) {
            if (typeof ($t) == "string") $t = $($t, this.el.$button);
            var className = $t.attr("class");
            
            if (mode == $.weditor.const.down && className == $.weditor.const.down && typeof (p) == "undefined") {
                if (className = $.weditor.const.up) $t.attr("class", $.weditor.const.up);
            } else if ((mode == $.weditor.const.up && className == $.weditor.const.down) || className != $.weditor.const.down) {
                if (className != mode) $t.attr("class", mode);
            }
            
            $.weditor.util.log(mode, "changeButton " + $t.attr("title"));
        },
        clickButton: function (buttonName) {
            $.weditor.action[$.weditor.buttons[buttonName].action].apply(null, [buttonName]);
        }
    };

    $.weditor.action = {
        makeLayer: function (buttonName) {
            $.weditor.el.$wapper.append(mappingValue($.weditor.template.actionLayer, [buttonName]));
            var $t = $(".weditor-layer." + buttonName + ">ul", $.weditor.el.$wapper);
            switch (buttonName) {
                case "fontname":
                    $.each($.weditor.buttons[buttonName].data, function () {
                        $t.append("<li><button><span>" + this.text + " <span>(</span><em style=\"font-family:" + this.value + ";\">" + this.sample + "</em><span>)</span></span></button></li>");
                    });
                    break;
                case "fontsize":
                    $.each($.weditor.buttons[buttonName].data, function () {
                        $t.append("<li><span style=\"font-size:" + this.value + ";\">" + this.text + "</span></li>");
                    });
                    break;
                case "forecolormore":
                    $.each($.weditor.buttons[buttonName].data.value, function () {
                        $t.append("<li><span style=\"color:" + this + ";\">" + $.weditor.data.forecolor.text + "</span></li>");
                    });
                    break;
                case "backcolormore":
                    $.each($.weditor.buttons[buttonName].data.value, function () {
                        $t.append("<li><span style=\"background-color:" + this + ";\">" + $.weditor.data.forecolor.text + "</span></li>");
                    });
                    break;
                case "blockquote":
                    $.each($.weditor.buttons[buttonName].data, function () {
                        $t.append("<li><blockquote style=\"" + this + "\">&nbsp;</blockquote></li>");
                    });
                    break;
                case "hr":
                    $.each($.weditor.buttons[buttonName].data.value, function () {
                        $t.append("<li><hr size=\"1\" color=\"" + this + "\" /></li>");
                    });
                    break;
                case "link":
                    $t.append("<li><input type=\"text\" /> <button class=\"weditor-button\">적용</button> <button class=\"weditor-button\">취소</button></li>");
                    break;
                case "character":
                    $.each($.weditor.buttons[buttonName].data.tab, function (index) {
                        var $li = $("<li><button><span>" + this + "</span></button><div><ul></ul></div></li>");
                        var char = [];
                        $.each(unescape($.weditor.buttons[buttonName].data.value[index]).split(' '), function () {
                            char.push("<li class=\"has\"><button><span>" + this + "</span></button></li>");
                        });

                        var _n = $.weditor.buttons[buttonName].data.max - char.length;
                        for (var i = 0; i < _n; i++) {
                            char.push("<li class=\"empty\"><button><span></span></button></li>");
                        }

                        $li.find("ul").html(char.join(""));
                        $t.append($li);
                    });

                    $(">li>button", $t).click(function () {
                        var $p = $(this).parent();
                        if (!$p.hasClass("active")) {
                            $p.siblings("li").removeClass("active").children("div").hide();
                            $p.addClass("active").children("div").show();
                        }
                    });

                    $("div button", $t).click(function () {
                        $("input[name='selectedCharacter']", $t.parent()).val($("input[name='selectedCharacter']", $t.parent()).val() + $(this).find("span").html());
                    });

                    $t.parent().append("<p><span>선택한 기호</span> <input type=\"text\" name=\"selectedCharacter\" /> <button class=\"weditor-button\">적용</button> <button class=\"weditor-button\">취소</button></p>");

                    $(">li:eq(0)>button", $t).trigger("click");
                    break;
            };

            /*
            $(">li", $t)
            .hover(
            	function(){$(this).addClass("hover");}, 
            	function(){$(this).removeClass("hover");}
            );
            */

        },
        openLayer: function (buttonName) {
            var $o = $(".weditor-layer." + buttonName, $.weditor.el.$wapper);

            if ($o.length == 0) {
                $.weditor.action.closeLayer();
                $.weditor.action.makeLayer(buttonName);
            } else if ($o.is(":visible")) {
                $o.hide();
            } else {
                $.weditor.action.closeLayer();
                $o.show();
            }
        },
        closeLayer: function () {
            $(".weditor-layer", $.weditor.el.$wapper).hide();
        },
        execute: function (buttonName) {
            $.weditor.util.log(buttonName, "execute");
        },
        newpage: function () {
            $.weditor.util.log("newpage", "call");
        },
        print: function () {
            $.weditor.util.log("print", "call");
        },
        previewer: function () {
            $.weditor.util.log("previewer", "call");
        }


    };

    $.weditor.util = {
        hasValue: function (v) {
            return (typeof (v) == "undefined") ? false : true;
        },
        getFirsArrayData: function (s, p) {
            if (!this.hasValue(p)) p = ",";
            var a = s.split(p);
            return $.trim(a[0]);
        },
        log: function (value, tag) {
            if($.weditor.printLog && window.console){
                if (!tag) {
                    tag = "weditor";
                }
                console.log(tag + " ==> " + ($.isPlainObject(value) || $.isArray(value) ? JSON.stringify(value) : value));
            }
        }
    }

    $.weditor.setContent = function (str, mode) {
        $(this.el.$editorDoc.body)[mode || "html"](str);
    };

    $.weditor.getContent = function (mode) {
        return $(this.el.$editorDoc.body)[mode || "html"]();
    };

    /* 리사이즈 */
    $.weditor.resize = {
        y: 0,
        start: function (e) {
            if ($.weditor.resize.y == 0) $.weditor.resize.y = e.clientY + $(document).scrollTop();
            $(document)
                .on("mousemove", $.weditor.resize.move)
                .on("mouseup", $.weditor.resize.stop);
        },
        move: function (e) {
            if ($.weditor.mode != "text") {
                $.weditor.el.$editor.hide();
                $.weditor.el.$resizebg.show();
            }

            var _h = e.clientY + $(document).scrollTop() - $.weditor.resize.y + parseInt($.weditor.options.height);
            if (_h < parseInt(parseInt($.weditor.options.minResizHeight))) return;
            $.weditor.el.$section.height(_h + "px");
            $.weditor.el.$footer.find(".resizemore").removeClass($.weditor.const.off).addClass($.weditor.const.on);
        },
        stop: function () {
            $(document).off("mousemove", $.weditor.resize.move).off("mouseup", $.weditor.resize.stop);
            $.weditor.el.$footer.find(".resizemore").removeClass($.weditor.const.on).addClass($.weditor.const.off);

            if ($.weditor.mode != "text") {
                $.weditor.el.$editor.show();
                $.weditor.el.$resizebg.hide();
            }
        }
    }


    /**
     * Create an instance, get an instance or invoke a command on a instance.
     *
     * __Examples__
     *
     *	$('#tree1').jstree(); // creates an instance
     *	$('#tree2').jstree({ plugins : [] }); // create an instance with some options
     *	$('#tree1').jstree('open_node', '#branch_1'); // call a method on an existing instance, passing additional arguments
     *	$('#tree2').jstree(); // get an existing instance (or create an instance)
     *	$('#tree2').jstree(true); // get an existing instance (will not create new instance)
     *	$('#branch_1').jstree().select_node('#branch_1'); // get an instance (using a nested element and call a method)
     *
     * @name $().weditor([arg])
     * @param {String|Object} arg
     * @return {Mixed}
     */
    $.fn.weditor = function (arg) {
        $.weditor.util.log("start");
        var args = Array.prototype.slice.call(arguments, 1),
            isMethod = (typeof arg === 'string'),
            result = null;

        if (!(this.length == 1 && this.prop("tagName").toLowerCase() == "textarea")) {
            return;
        }

        if (isMethod) {
            if ($.weditor[arg]) {
                $.weditor.util.log(args, "call method");
                result = $.weditor[arg].apply(this, args);
            } else {
                $.alert("Method " + arg + " does not exist on jQuery.wEditor");
            }
        } else {
            $.weditor.create(this, arg || {});
        }
        return result !== null && result !== undefined ? result : this;
    };
})(jQuery);
