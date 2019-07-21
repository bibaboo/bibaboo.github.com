/***
===============================================================================================
* 기능 설명 : 레이아웃 관리
===============================================================================================
*/

/* 공통 설정 정보 */
var pageSetting = {
    //default layout
    resizeWidth: {
        sidebar: "15%",
        content: "85%"
    },
    //트리노드 액션 타입
    moduleDataType: {
        load: "load",
        blank: "blank",
        link: "link",
        iframe: "iframe"
    },
    //plugin
    plugin: {
        template: {
            loaded: false,
            css: [""],
            js: [""]
        },
        wjquery: {
            loaded: true,
            css: ["/js/lib/wjquery/wjquery.css"],
            js: ["/js/lib/wjquery/wjquery.js"]
        },
        barcode: {
            loaded: false,
            js: ["/js/lib/JsBarcode.all.min.js"]
        },
        qrcode: {
            loaded: false,
            js: ["/js/lib/jquery.qrcode.min.js"]
        },
        clipboard: {
            loaded: false,
            js: ["/js/lib/clipboard.min.js"]

        },
        naverMap: {
            loaded: false,
            js: ["https://openapi.map.naver.com/openapi/v3/maps.js?clientId=FEyy5fmQU1_i7I7Y4Yey&submodules=geocoder"]
        },
        wswipe: {
            loaded: false,
            js: ["/js/lib/wjquery/wjquery.swipe.js"]

        },
        wpaging: {
            loaded: false,
            css: ["/js/lib/wjquery/wjquery.paging.css"],
            js: ["/js/lib/wjquery/wjquery.paging.js"]

        },
        wtree: {
            loaded: false,
            css: ["/js/lib/wjquery/wjquery.tree.css"],
            js: ["/js/lib/wjquery/wjquery.tree.js"]

        },
        minicolors: {
            loaded: false,
            css: ["/js/lib/jquery-minicolors-master/jquery.minicolors.css"],
            js: ["/js/lib/jquery-minicolors-master/jquery.minicolors.min.js"]

        },
        jqplot: {
            loaded: false,
            css: ["/js/lib/jquery.jqplot.1.0.9/jquery.jqplot.min.css"],
            js: ["/js/lib/jquery.jqplot.1.0.9/jquery.jqplot.min.js", "/js/lib/jquery.jqplot.1.0.9/plugins/jqplot.barRenderer.js", "/js/lib/jquery.jqplot.1.0.9/plugins/jqplot.categoryAxisRenderer.js"]
        },
        fakeLoader: {
            loaded: false,
            css: ["/js/lib/fakeLoader.js-master/fakeLoader.css"],
            js: ["/js/lib/fakeLoader.js-master/fakeLoader.js"]
        }
    },
    //Miscellaneous
    isAccordion: false,
    autoData: [],
    resizerLeft: null,
    contentWidth: null
};

/* common object */
var $sidebar,
    $spacer,
    $content,
    $resizer,
    $entry,
    $menuTree;

/* 모듈 정보 */
var moduleData = [
    /*
    {
        text: "sample",                              // 트리 노드에 표시 될 텍스트
        used: false,                                 // 트리 노드에 표시 여부 default=true
        icon: "../images/tree-icon.png",             // 트리 노드에 표시 될 아이콘 default=false
        data: {
            folder: "/view/",
            type: pageSetting.moduleDataType.load,
            accordion: false
        },
        a_attr: {
            title: "wonchu~~"
        }
    }
    */
    {
        text: "home",
        icon: "../images/tree-icon.png",
        data: {
            folder: "/view/",
            type: pageSetting.moduleDataType.load,
            accordion: false
        },
        a_attr: {
            title: "wonchu~~"
        }
    },
    {
        text: "wjquery",
        data: {
            folder: "/view/wjquery/",
            type: pageSetting.moduleDataType.load
        },
        nodes: [{
                text: "$.extend",
                a_attr: {
                    title: "wjquery extend 함수"
                },
                data: {
                    folder: "/view/wjquery/extend/"
                },
                nodes: [{
                        text: "$.alert()",
                        a_attr: {
                            title: "custom alert"
                        }
                    },
                    {
                        text: "$.confirm()",
                        a_attr: {
                            title: "custom alert"
                        }
                    },
                    {
                        text: "$.toast()",
                        a_attr: {
                            title: "toast"
                        }
                    },
                    {
                        text: "$.hasString()",
                        a_attr: {
                            title: "value에 findStr이 있는지 비교"
                        }
                    },
                    {
                        text: "$.hasValue()",
                        a_attr: {
                            title: "value에 값이 있는지 여부"
                        }
                    },
                    {
                        text: "$.isFalse()",
                        a_attr: {
                            title: "false 여부"
                        }
                    },
                    {
                        text: "$.isTrue()",
                        a_attr: {
                            title: "true 여부"
                        }
                    },
                    {
                        text: "$.pad()",
                        a_attr: {
                            title: "채우기"
                        }
                    },
                    {
                        text: "$.nvl()",
                        a_attr: {
                            title: "value에 값이 없을시 replaceString로 대체"
                        }
                    },
                    {
                        text: "$.replace()",
                        a_attr: {
                            title: "문자열 바꾸기"
                        }
                    }
                ]
            },
            {
                text: "$.fn.extend",
                a_attr: {
                    title: "wjquery fn.extend 함수"
                },
                data: {
                    folder: "/view/wjquery/fn_extend/"
                },
                nodes: [{
                        text: ".changeClass()",
                        a_attr: {
                            title: "조건에 따른 클래스 변경"
                        }
                    },
                    {
                        text: ".isObject()",
                        a_attr: {
                            title: "개체 존재여부"
                        }
                    },
                    {
                        text: ".outerHtml()",
                        a_attr: {
                            title: "자기 자신을 포함한 HTML"
                        }
                    },
                    {
                        text: ".scrollIntoView()",
                        a_attr: {
                            title: "해당 개체로 스크롤 이동"
                        }
                    },
                    {
                        text: ".wScrollTop()",
                        a_attr: {
                            title: "상위로 이동"
                        }
                    },
                    {
                        text: ".autoGrowTextarea()",
                        a_attr: {
                            title: "textarea 자동 높이 조절"
                        }
                    },
                    {
                        text: ".stripHref()",
                        a_attr: {
                            title: "a, area 링크, 클릭 동작 제어"
                        }
                    },
                    {
                        text: ".wform()",
                        a_attr: {
                            title: "form 개체 컨트롤"
                        }
                    }
                ]
            },
            {
                text: "js.lang",
                a_attr: {
                    title: "문자 관련 공통함수"
                },
                data: {
                    folder: "/view/wjquery/js_lang/"
                },
                nodes: [{
                        text: "addComma()",
                        a_attr: {
                            title: "3자리마다 콤마추가"
                        }
                    },
                    {
                        text: "cutString()",
                        a_attr: {
                            title: "문자열 자르기"
                        }
                    },
                    {
                        text: "randomCode()",
                        a_attr: {
                            title: "랜덤 문자열생성"
                        }
                    },
                    {
                        text: "initCap()",
                        a_attr: {
                            title: "첫문자를 대문자로변환"
                        }
                    },
                    {
                        text: "getFirstValue()",
                        a_attr: {
                            title: "구분자 이전 문자열을 리턴"
                        }
                    },
                    {
                        text: "getLastValue()",
                        a_attr: {
                            title: "구분자 이후 문자열을 리턴"
                        }
                    },
                    {
                        text: "mappingValue()",
                        a_attr: {
                            title: "문자열 매핑"
                        }
                    }
                ]
            },
            {
                text: "js.date",
                a_attr: {
                    title: "날자 관련 공통함수"
                },
                data: {
                    folder: "/view/wjquery/js_date/"
                },
                nodes: [{
                        text: "getFormatDate()",
                        a_attr: {
                            title: "날자 포멧팅"
                        }
                    },
                    {
                        text: "getToday()",
                        a_attr: {
                            title: "오늘 일자를 구한다"
                        }
                    },
                    {
                        text: "getTargetDate()",
                        a_attr: {
                            title: "원하는 만큼 일자를 증감해서 리턴"
                        }
                    }
                ]
            },
            {
                text: "js.regexp",
                a_attr: {
                    title: "정규식 관련 공통함수"
                },
                data: {
                    folder: "/view/wjquery/js_regexp/"
                },
                nodes: [{
                        text: "getPattern()",
                        a_attr: {
                            title: "패턴에 매칭되는 값을 리턴"
                        }
                    },
                    {
                        text: "getPatternArray()",
                        a_attr: {
                            title: "패턴에 맞는 문자열만 추출"
                        }
                    },
                    {
                        text: "isPattern()",
                        a_attr: {
                            title: "패턴 여부"
                        }
                    },
                    {
                        text: "replaceString()",
                        a_attr: {
                            title: "문자열 변환"
                        }
                    }
                ]
            },
            {
                text: "js.ui",
                a_attr: {
                    title: "UI 관련 공통함수"
                },
                data: {
                    folder: "/view/wjquery/js_ui/"
                },
                nodes: [{
                    text: "dropDown()",
                    a_attr: {
                        title: "hover 메뉴"
                    }
                }]
            },
            {
                text: "js.form",
                a_attr: {
                    title: "폼 관련 공통함수"
                },
                data: {
                    folder: "/view/wjquery/js_form/"
                },
                nodes: []
            },
            {
                text: "js.event",
                a_attr: {
                    title: "이벤트 관련 공통함수"
                },
                data: {
                    folder: "/view/wjquery/js_event/"
                },
                nodes: [{
                        text: "delayFunction",
                        a_attr: {
                            title: "함수 실행 시간 지연"
                        }
                    },
                    {
                        text: "loadScripts",
                        a_attr: {
                            title: "외부 스크립트 로드"
                        }
                    },
                    {
                        text: "loadStyles",
                        a_attr: {
                            title: "외부 스타일 로드"
                        }
                    }
                ]
            },
            {
                text: "js.object",
                a_attr: {
                    title: "공통객체 관련 공통함수"
                },
                data: {
                    folder: "/view/wjquery/js_object/"
                },
                nodes: [{
                        text: "base62",
                        a_attr: {
                            title: "base62로 변환"
                        }
                    },
                    {
                        text: "stopWatch",
                        a_attr: {
                            title: "실행시간 구하기"
                        }
                    },
                    {
                        text: "wJson",
                        a_attr: {
                            title: "JSON util"
                        }
                    },
                    {
                        text: "lStorage",
                        a_attr: {
                            title: "localStorage 제어"
                        }
                    },
                    {
                        text: "sStorage",
                        a_attr: {
                            title: "sessionStorage 제어"
                        }
                    },
                    {
                        text: "stringBuffer",
                        a_attr: {
                            title: "stringBuffer"
                        }
                    }
                ]
            }
        ]
    },
    {
        text: "plugin",
        data: {
            folder: "/view/plugin/",
            type: pageSetting.moduleDataType.load
        },
        nodes: [{
                text: "jquery.ui",
                id: "jqueryUi",
                a_attr: {
                    title: "jquery.ui 정리"
                }
            },
            {
                text: "jquery.ui.datepicker",
                id: "datepicker",
                a_attr: {
                    title: "jquery.ui.datepicker 정리"
                }
            },
            {
                text: "jquery.tmpl",
                id: "tmpl",
                a_attr: {
                    title: "jquery.tmpl 정리"
                }
            },
            {
                text: "jquery.transit",
                id: "transit",
                a_attr: {
                    title: "transit 정리"
                }
            },
            {
                text: "jquery-minicolors",
                id: "minicolors",
                a_attr: {
                    title: "jquery-minicolors 정리",
                    plugin: "minicolors"
                }
            },
            {
                text: "moment",
                a_attr: {
                    title: "momnet 정리"
                }
            },
            {
                text: "qrcode",
                a_attr: {
                    title: "qrcode 정리",
                    plugin: "qrcode"
                }
            },
            {
                text: "clipboard",
                a_attr: {
                    title: "clipboard 정리",
                    plugin: "clipboard"
                }
            },
            {
                text: "barcode",
                a_attr: {
                    title: "barcode 정리",
                    plugin: "barcode"
                }
            },
            {
                text: "jqplot",
                a_attr: {
                    title: "jqplot 정리",
                    plugin: "jqplot"
                },
                data: {
                    type: pageSetting.moduleDataType.hash
                }
            },
            {
                text: "fakeLoader",
                a_attr: {
                    title: "fakeLoader demo",
                    plugin: "fakeLoader"
                }
            },
            {
                text: "slider",
                a_attr: {
                    title: "zoom slider"
                },
                data: {
                    type: pageSetting.moduleDataType.blank
                }
            },
            {
                text: "swipe",
                a_attr: {
                    title: "모바일용 swipe"
                },
                data: {
                    type: pageSetting.moduleDataType.blank,
                    mobile: true
                }
            },
            {
                text: "wswipe",
                a_attr: {
                    title: "웹/모바일용 swipe",
                    plugin: "wswipe"
                }
            },
            {
                text: "wpaging",
                a_attr: {
                    title: "page navigation",
                    plugin: "wpaging"
                }
            },
            {
                text: "wtree",
                a_attr: {
                    title: "tree view",
                    plugin: "wtree"
                }
            },
            {
                text: "naverMap",
                id: "naverMap",
                a_attr: {
                    title: "naverMap demo",
                    plugin: "naverMap"
                }
            },
            {
                text: "timeliner",
                id: "timeliner",
                a_attr: {
                    title: "timeliner demo"
                },
                data: {
                    type: pageSetting.moduleDataType.blank
                }
            }
        ]
    },
    {
        text: "note",
        data: {
            folder: "/view/note/",
            type: pageSetting.moduleDataType.load
        },
        nodes: [{
                text: "javascript",
                data: {
                    folder: "/view/note/javascript/"
                },
                nodes: [{
                        text: "C&P",
                        id: "jscNp",
                        a_attr: {
                            title: "Copy & Paste"
                        }
                    },
                    {
                        text: "배열 객체",
                        id: "array",
                        a_attr: {
                            title: "배열 정의, 함수 정리"
                        }
                    },
                    {
                        text: "Math 객체",
                        id: "math",
                        a_attr: {
                            title: "Math 함수"
                        }
                    },
                    {
                        text: "location 객체",
                        id: "location",
                        a_attr: {
                            title: "location 정리"
                        }
                    },
                    {
                        text: "함수 리터럴",
                        id: "functionLteral",
                        a_attr: {
                            title: "이름 없이 몸체만 있는 함수"
                        }
                    },
                    {
                        text: "객체 리터럴",
                        id: "objectLiteral",
                        a_attr: {
                            title: "아무 것도 없거나 하나 이상의 이름/값 쌍들을 둘러싸는 중괄호"
                        }
                    },
                    {
                        text: "정규식",
                        id: "regexp",
                        a_attr: {
                            title: "정규식 정리"
                        }
                    }
                ]
            },
            {
                text: "jquery",
                data: {
                    folder: "/view/note/jquery/"
                },
                nodes: [{
                        text: "플러그인 패턴",
                        id: "pluginPattern"
                    },
                    {
                        text: "개발 가이드",
                        id: "guide"
                    },
                    {
                        text: "form 객체",
                        id: "form"
                    }
                ]
            },
            {
                text: "style & html",
                data: {
                    folder: "/view/note/styleNhtml/"
                },
                nodes: [{
                        text: "C&P",
                        id: "stytlecNp"
                    },
                    {
                        text: "mediaquery",
                        id: "mediaquery"
                    },
                    {
                        text: "keyframes",
                        id: "keyframes"
                    },
                ]
            },
            {
                text: "java",
                data: {
                    folder: "/view/note/java/"
                },
                nodes: [{
                    text: "utils",
                    id: "utils"
                }]
            },
            {
                text: "tool",
                data: {
                    folder: "/view/note/tool/"
                },
                nodes: [{
                        text: "eclipse",
                        id: "eclpiseSetting"
                    },
                    {
                        text: "vi editor",
                        id: "viEditor"
                    },
                    {
                        text: "Visual Studio Code",
                        id: "vscode"
                    }
                ]
            },
            {
                text: "dbms",
                data: {
                    folder: "/view/note/dbms/"
                },
                nodes: [{
                        text: "mysql",
                        id: "mysql",
                        order: 1
                    },
                    {
                        text: "oracle",
                        id: "oracle",
                        order: 2
                    },
                    {
                        text: "msql",
                        id: "mssql",
                        order: 3
                    }
                ]
            },
            {
                text: "server",
                data: {
                    folder: "/view/note/server/"
                },
                nodes: [{
                        text: "tomcat",
                        id: "tomcatSetting"
                    },
                    {
                        text: "linux",
                        id: "linux"
                    }
                ]
            },
            {
                text: "etc",
                data: {
                    folder: "/view/note/ect/"
                },
                nodes: []
            }
        ]
    },
    {
        text: "snippet",
        data: {
            folder: "/view/snippet/",
            type: pageSetting.moduleDataType.load
        },
        nodes: [{
            text: "simple button",
            id: "simpleButton"
        }]
    },
    {
        text: "project",
        data: {
            folder: "/view/project/",
            type: pageSetting.moduleDataType.load
        },
        nodes: [{
                text: "wjquery.mpicker",
                id: "mpicker",
                a_attr: {
                    title: "모바일용"
                },
                data: {
                    type: pageSetting.moduleDataType.blank,
                    page: "mPicker/index.html",
                    mobile: true
                }
            },
            {
                text: "wjquery.editor",
                id: "editor",
                a_attr: {
                    title: "working"
                },
                data: {
                    type: pageSetting.moduleDataType.blank,
                    page: "weditor/index.html"
                }
            },
            //{text : "wceditor", id : "wceditor", a_attr : {title: "weditor"}, data : {type : pageSetting.moduleDataType.blank, page : "wceditor/sample01.html"}},
            {
                text: "mtmpl",
                id: "mtmpl",
                a_attr: {
                    title: "모바일 탬플릿"
                },
                data: {
                    type: pageSetting.moduleDataType.blank,
                    page: "mtmpl/index.html",
                    mobile: true
                }
            },
            {
                text: "logReader",
                id: "logReader",
                a_attr: {
                    title: "logReader"
                },
                data: {
                    type: pageSetting.moduleDataType.blank,
                    page: "logReader/index.html"
                }
            }
        ]
    },
    {
        text: "template",
        used: true,
        data: {
            folder: "/view/template/",
            type: pageSetting.moduleDataType.load
        },
        nodes: [{
            text: "type1",
            id: "type1"
        }]
    }
];

(function ($) {
    $(document).ready(function () {
        //템플릿 적용
        $("body").append($.tmpl(COMMON_TMPL.layout));
        //hash change
        $(window).bind('hashchange', function (event) {
            if (SERVICE_CONFIG.hash.M.skip) {
                SERVICE_CONFIG.hash.M.skip = false;
            } else if (SERVICE_CONFIG.hash.P.skip) {
                SERVICE_CONFIG.hash.P.skip = false;
            } else {
                checkHash();
            }
        });

        // common object
        $sidebar = $("#sidebar");
        $spacer = $("#spacer");
        $content = $("#content");
        $resizer = $("#resizer");
        $entry = $("#entry");
        $menuTree = $("#menuTree");

        $content.find("div.content-body>.setting").buttonset().find("input:radio").click(function () {
            toggleAccordian($(this));
        });

        $("#searchWord").focusin(function () {
            $(this).select();
        }).autocomplete({
            source: pageSetting.autoData,
            select: function (event, ui) {
                openNode(CODE_VALUE.sharp + ui.item.id);
                $("#searchWord").parent().hide();
            }
        });

        //리사이즈 이벤트
        resizeLayout(true);
        $(window).resize(function () {
            resizeLayout(false);
        });

        //iframe resize
        $('#content-iframe').on("load", function () {
            $(this).css("height", $(this).contents().find("body").height() + "px");
            resizeLayout(false);
        });

        //resizer
        $resizer.draggable({
            axis: "x",
            containment: "#wapper",
            opacity: 0.35,
            scroll: false,
            stop: function () {
                var before = parseInt(pageSetting.resizerLeft, 10),
                    after = parseInt($resizer.css("left"), 10);

                $(".sidebar-head .ui-widget").toggle(after > 120);
                $sidebar.width(after);
                $content.width($content.width() + (before - after));
                pageSetting.resizerLeft = $resizer.css("left");
            }
        });

        //맨위로 버튼
        $content.find("div.content-body").wScrollTop($("#btn-top"));

        //컨텐츠 헤더
        $content.find("div.content-header>ul").on("click", "a", function () {
            event.preventDefault();
            if(pageSetting.isAccordion){
                $entry.find("ul.entry-api").accordion({
                    active: $content.find("div.content-header>ul>li").index($(this).parent())
                });
            }else{
                $entry.find("ul.entry-api>li").eq($content.find("div.content-header>ul>li").index($(this).parent())).scrollIntoView($content.find("div.content-body"));
            }
        });

        $sidebar.find(".sidebar-head>a").click(
            function () {
                $sidebar.transition({
                    rotateY: '180deg'
                }).transition({
                    rotateY: '360deg'
                });
            }
        );

        $spacer.click(
            function () {
                $spacer.hide();
                $sidebar.show();
                $resizer.show();
                $content.width(pageSetting.contentWidth);
            }
        ).hover(function () {
            $(this).css("background-color", "#ddd");
        }, function () {
            $(this).css("background-color", "#eee");
        });

        $sidebar.find(".sidebar-head>ul>li").click(
            function () {
                var $span = $(this).find("span");
                if ($span.hasClass("ui-icon-search")) {
                    $(".sidebar-search").slideToggle("fast", function () {
                        if ($(this).is(":visible")) $(this).find("input").trigger("focusin");
                    });
                } else if ($span.hasClass("ui-icon-seek-first")) {
                    $sidebar.hide();
                    $resizer.hide();
                    pageSetting.contentWidth = $content.width();
                    $content.width("100%");
                    $spacer.show();
                } else if ($span.hasClass("ui-icon-plusthick")) {
                    $menuTree.jstree('open_all');
                } else if ($span.hasClass("ui-icon-minusthick")) {
                    $menuTree.jstree('close_all');
                }

            }
        ).hover(function () {
            $(this).addClass("ui-state-hover");
        }, function () {
            $(this).removeClass("ui-state-hover");
        });

        var _setData = function (node, module) {
            if ($.isFalse(node.used)) return false;
            if (!node.nodes) {
                node.children = false;
                if (!node.icon) node.icon = false;
            }
            if (!node.id) node.id = getPatternString("alphaNum", node.text);

            if (!node.a_attr) node.a_attr = {
                title: node.text
            }

            if (module && module.data && !node.data) {
                node.data = module.data;
            } else if (module && module.data && node.data) {
                node.data = $.extend({}, module.data, node.data);
            }

            pageSetting.autoData.push({
                label: node.text + " : " + node.a_attr.title,
                id: node.id
            });
            return true;
        };

        var _sort = function (node) {
            delete node.nodes;
            if (!$.isFalse(node.sort)) {
                node.children.sort(function (a, b) {
                    return (a.order || a.text) < (b.order || b.text) ? -1 : ((a.order || a.text) > (b.order || b.text)) ? 1 : 0;
                });
            }
        };

        //트리
        var data = $.map(moduleData, function (module) {
            if (_setData(module)) {
                if (module.nodes) {
                    module.children = $.map(module.nodes, function (node) {
                        if (_setData(node, module)) {
                            if (node.nodes) {
                                node.children = $.map(node.nodes, function (_node) {
                                    if (_setData(_node, node)) return _node;
                                });
                                _sort(node);
                            }
                            return node;
                        }
                    });
                    _sort(module);
                }
                return module;
            }
        });

        //console.log(data);

        $menuTree
            .jstree({
                "core": {
                    data: data,
                    multiple: false,
                }
                //,"plugins" : ["sort"]
            })
            .one("loaded.jstree", function (event, data) {
                checkHash();
            })
            .on("changed.jstree", function (e, data) {
                if (!data.node) return;
                LAYOUT_CONFIG.node = "";

                var node = data.node,
                    $tree = $menuTree.jstree(true)

                $content.find("div.content-body>.setting").addClass("none");
                if (!node.data) node.data = {};
                if ($tree.is_leaf(node) && (node.id == "home" || !node.icon)) {
                    var loadPage = function () {
                        var pnode = node.parent == CODE_VALUE.sharp ? {
                                data: node.data
                            } : $tree.get_node(node.parent),
                            url = node.data.page ? node.data.page : node.id + ".html",
                            type = node.data.type ? node.data.type : pnode.data.type,
                            accordion = $.isFalse(node.data.accordion) ? node.data.accordion : $.isFalse(pnode.data.accordion) ? pnode.data.accordion : true;

                        if ($.isTrue(node.data.mobile) && !$.isMobile()) {
                            if (!confirm("모바일 브라우져(android, iOS) 또는 크롬 모바일모드에서만 확인 할수 있습니다.")) return;
                        }

                        if (type != "iframe" && $("#content-iframe").is(":visible")) {
                            $("#content-iframe").hide().siblings().show();
                        }

                        if (!$.hasString(url, "http")) {
                            url = pnode.data.folder + url;
                        }

                        switch (type) {
                            case pageSetting.moduleDataType.blank:
                                window.open(url);
                                break;
                            case pageSetting.moduleDataType.link:
                                location.href = url;
                                break;
                            case pageSetting.moduleDataType.iframe:
                                if ($("#content-iframe").is(":visible")) {
                                    $("#content-iframe").attr("src", url);
                                } else {
                                    $entry.empty().prev().empty();
                                    $content.find("div.content-header>ul").empty();
                                    $("#content-iframe").attr("src", url).show().siblings().hide();
                                }
                                setHash(SERVICE_CONFIG.hash.M.key, node.id);
                                break;
                            case pageSetting.moduleDataType.load:
                                $("#btn-top").click();
                                if (!$.isFalse(pnode.data.loading)) $("#back-white").show();

                                $.get(url, function (html) {
                                        setHash(SERVICE_CONFIG.hash.M.key, node.id);
                                        $entry.html(html).prev().html(node.text);
                                        if (node.text != node.a_attr.title) $entry.find("div.entry-summary").prepend(node.a_attr.title);
                                        $("input[type=button]").button().addClass("mtb10");

                                        //make content-header
                                        var $ul = $content.find("div.content-header>ul").empty();
                                        var titles = $entry.find(".entry-api span.title").map(function () {
                                            return {
                                                text: $(this).text()
                                            };
                                        }).get();
                                        $ul.append($.tmpl(COMMON_TMPL.headerLi, titles));

                                        if (accordion && titles.length > 1) {
                                            $content.find(".content-body>.setting").removeClass("none");
                                            $("#accordian" + (pageSetting.isAccordion ? "2" : "1")).click();
                                        }

                                        $entry.find(".entry-source-content[data-wjquery]").each(function () {
                                            if (typeof ($[$(this).attr("data-wjquery")]) !== "undefined") {
                                                $(this).find("pre").html(replaceString("htmlEscape", $[$(this).attr("data-wjquery")].toString()));
                                            } else if (typeof ($.fn[$(this).attr("data-wjquery")]) !== "undefined") {
                                                $(this).find("pre").html(replaceString("htmlEscape", $.fn[$(this).attr("data-wjquery")].toString()));
                                            }
                                        });

                                        $entry.find(".entry-demo-content").each(function () {
                                            $(this).siblings(".entry-demo-source-content").find("pre").html(replaceString("htmlEscape", $(this).html()));
                                        });

                                        $entry.find(".entry-demo-textarea-content").each(function () {
                                            var _html = $(this).val();
                                            $(this).siblings(".entry-demo-source-content").find("pre").html(replaceString("htmlEscape", _html));
                                            $(this).siblings(".entry-demo-iframe").find("iframe").each(function () {
                                                var $iframe = $(this)[0].contentWindow.document;
                                                $iframe.open();
                                                $iframe.write(_html);
                                                $iframe.close();

                                                $(this).on("load", function () {
                                                    $(this).css("height", $(this).contents().find("body").height() + 20 + "px");
                                                    resizeLayout(false);
                                                });
                                            });
                                        });

                                        if ($entry.find(".entry-source-content[data-plugin]").isObject()) {
                                            var _pn = $entry.find(".entry-source-content[data-plugin]").length;
                                            $entry.find(".entry-source-content[data-plugin]").each(function (index) {
                                                var $t = $(this);
                                                $.get(pageSetting.plugin[$t.attr("data-plugin")][$t.attr("data-plugin-type")], function (html) {
                                                    $t.find("pre").html(replaceString("htmlEscape", html));
                                                    if (_pn == index + 1) {
                                                        SyntaxHighlighter.highlight();
                                                    }
                                                });
                                            });
                                        } else {
                                            if ($entry.find(".entry-source-content").isObject() || $entry.find(".entry-demo-source-content").isObject()) {
                                                SyntaxHighlighter.highlight();
                                            }
                                        }

                                        $("div.entry-source-title, div.entry-demo-title", $entry).find("a").click(function () {
                                            $(this).find("span").changeClass("ui-icon-circle-triangle-s", "ui-icon-circle-triangle-n").hasClass("ui-icon-circle-triangle-s");
                                            $(this).parent().next().slideToggle();
                                        });
                                    }, "html")
                                    .fail(function (response, status, xhr) {
                                        try {
                                            if (status == "error") {
                                                $entry.empty().prev().html(node.text);
                                                $content.find("div.content-header>ul").empty();
                                                $entry.html(COMMON_TMPL.pageNotFound);
                                                $.wLog(xhr);
                                            }
                                        } catch (e) {
                                            $.wLog(e);
                                        }
                                    })
                                    .always(function () {
                                        if (!$.isFalse(pnode.data.loading)) {
                                            setTimeout(function () {
                                                $("#back-white").hide();
                                            }, 100);
                                        }
                                    });
                                break;
                            default:
                                return;
                        }
                    };

                    if (node.a_attr.plugin && pageSetting.plugin[node.a_attr.plugin] && !pageSetting.plugin[node.a_attr.plugin].loaded) {
                        loadPlugin(node.a_attr.plugin).done(loadPage);
                    } else {
                        loadPage();
                    }
                } else {
                    $tree[$tree.is_open(node) ? "close_node" : "open_node"](node);
                    if (LAYOUT_CONFIG.node != node.id) drawLeafNode(node);
                }
            });
    });

    function loadPlugin(plugin) {
        var deferred = $.Deferred();
        if (pageSetting.plugin[plugin].css) {
            loadStyles(pageSetting.plugin[plugin].css);
        }

        if (pageSetting.plugin[plugin].js) {
            loadScripts(pageSetting.plugin[plugin].js, function () {
                pageSetting.plugin[plugin].loaded = true;
                deferred.resolve();
            });
        } else {
            deferred.resolve();
        }
        return deferred.promise();
    }
})(jQuery);

function resizeLayout(init) {
    if ($sidebar.is(":visible")) {
        $("#sidebar>div.sidebar-body, #content>div.content-body").height($(window).height() - LAYOUT_CONFIG.contentHeaderHeight);
        $sidebar.width(pageSetting.resizeWidth.sidebar);
        $content.width(pageSetting.resizeWidth.content);
        
        if(!init){
            $resizer.css("left", parseInt($sidebar.width(), 10));
        }
        pageSetting.resizerLeft = $resizer.css("left");
    }
}

function checkHash() {
    if (document.location.hash) {
        var _hashes = document.location.hash.split(CODE_VALUE.slash);
        if (_hashes.length && _hashes.length == 3) {
            if (_hashes[1] == SERVICE_CONFIG.hash.M.key) {
                openNode(_hashes[0] + _hashes[2]);
            } else if (_hashes[1] == SERVICE_CONFIG.hash.P.key) {
                doFunction("hashchangePagingHandler", _hashes[2]);
            }
        }
    } else {
        goHome();
    }
}

function setHash(menu, key, b) {
    console.log(menu)
    var _hash = CODE_VALUE.sharp + CODE_VALUE.slash + menu + CODE_VALUE.slash + key;
    if (_hash != document.location.hash) {
        if (!$.isFalse(b)) {
            SERVICE_CONFIG.hash[menu].skip = true;
        }
        document.location.hash = _hash;
    }
}

function drawLeafNode(node) {
    $entry.html(COMMON_TMPL.entryApi).prev().html(node.text);
    var $ul = $content.find("div.content-header>ul").empty(),
        arr = [];
    $.each($menuTree.jstree(true).get_children_dom(node), function () {
        var _node = $menuTree.jstree(true).get_node(this);
        arr.push({
            id: _node.id,
            text: _node.text,
            title: _node.a_attr.title || _node.text
        });
    });

    $entry.find(".entry-api").append($.tmpl(COMMON_TMPL.entryApiItem, arr));
    $ul.append($.tmpl(COMMON_TMPL.headerLi, arr));
    LAYOUT_CONFIG.node = node.id
}

function openNode(hash) {
    //$("#menuTree").jstree(true).close_all();
    $menuTree.jstree(true).deselect_all(true);
    $menuTree.jstree(true).select_node(hash);
}

function goHome() {
    openNode("#home");
}

function toggleAccordian($t) {
    var $c = $entry.find("ul.entry-api");
    if ($t.attr("id") == "accordian1") {
        if ($c.accordion("instance")) {
            $c.accordion("destroy");
        }
        pageSetting.isAccordion = false;
    } else if ($t.attr("id") == "accordian2") {
        $c.accordion({
            heightStyle: "content"
        });
        pageSetting.isAccordion = true;
    }
}