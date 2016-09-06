
var wEditorLang = {
    
    data : { 
        "align"     : "justifyleft;justifycenter;justifyright;justifyfull",
        "ffCheck"	: "bold;italic;underline;strikethrough",
        "keycode"   : "8;37;38;39;40"
    },

    template : {
        initTag       : "<p><br></p>",
        init          : "<div id=\"editerDiv\"><div id=\"toolBarBgDiv\"></div><div id=\"toolBarDiv\"><ul><li class=\"starter\"></li></ul></div><div id=\"editDiv\"><div id=\"resizeDiv\"></div><iframe id=\"editIframe\" src=\"\" width=\"100%\" height=\"100%\" border=\"0\" frameborder=\"0\" /><textarea id=\"editTextarea\"></textarea></div><div id=\"modeDiv\"><div></div><ul></ul></div></div>",
        separator     : "<li class=\"separator\"></li>",
        conversionLi  : "<li id=\"@ModeLi\" class=\"off\"></li>"
    },
    
    toolbar : { 
        min : [
	        ["newpage"],
	        ["forecolor","backcolor"],
	        ["bold","italic","strikethrough","underline"],
	        ["character", "link"]
	   	],
	    "default" : [
	        ["fontname","fontsize"],
	        ["newpage","previewer", "print"],
	        ["forecolor","backcolor"],
	        ["bold","italic","strikethrough","underline"],
	        ["justifyleft","justifycenter","justifyright","justifyfull"],
	        ["character","link", "image"]
	    ],
	    max : [
            ["fontname","fontsize"],
            ["undo", "redo", "copy","cut","paste"],
            ["newpage","previewer", "print"],
            ["forecolor","backcolor"],
            ["bold","italic","strikethrough","underline"],
            ["fieldset","hr"],
            ["justifyleft","justifycenter","justifyright","justifyfull"],
            ["insertorderedlist","insertunorderedlist"],
            ["character","link","urlimage", "image"]
        ]
    },
    
    button : {
    	fontname 			  : {hasLayer : true,  ifrmLeft : "0", "mouseUp" : "2", action : "openLayer",   title : "글꼴"},
    	fontsize              : {hasLayer : true,  ifrmLeft : "0", "mouseUp" : "2", action : "openLayer",   title : "글자크기"},
    	redo                  : {hasLayer : false, ifrmLeft : "0", "mouseUp" : "1", action : "execute",     title : "다시실행"},
    	undo                  : {hasLayer : false, ifrmLeft : "0", "mouseUp" : "1", action : "execute",     title : "되돌리기"},
    	copy                  : {hasLayer : false, ifrmLeft : "0", "mouseUp" : "1", action : "execute",     title : "복사하기"},
    	cut                   : {hasLayer : false, ifrmLeft : "0", "mouseUp" : "1", action : "execute",     title : "잘라내기"},
    	paste                 : {hasLayer : false, ifrmLeft : "0", "mouseUp" : "1", action : "execute",     title : "붙여넣기"},
    	newpage               : {hasLayer : false, ifrmLeft : "0", "mouseUp" : "1", action : "newpage",     title : "새로열기"},
    	previewer             : {hasLayer : false, ifrmLeft : "0", "mouseUp" : "1", action : "previewer",   title : "미리보기"},
    	print                 : {hasLayer : false, ifrmLeft : "0", "mouseUp" : "1", action : "print",       title : "인쇄하기"},
    	forecolor             : {hasLayer : true,  ifrmLeft : "0", "mouseUp" : "2", action : "openLayer",   title : "글자색상"},
    	backcolor             : {hasLayer : true,  ifrmLeft : "0", "mouseUp" : "2", action : "openLayer",   title : "배경색상"},
    	bold                  : {hasLayer : false, ifrmLeft : "0", "mouseUp" : "2", action : "execute",     title : "굵게(Crtl+B}"},
    	italic                : {hasLayer : false, ifrmLeft : "0", "mouseUp" : "2", action : "execute",     title : "기울림꼴(Crtl+I}"},
    	underline             : {hasLayer : false, ifrmLeft : "0", "mouseUp" : "2", action : "execute",     title : "글자밑줄(Crtl+U}"},
    	strikethrough         : {hasLayer : false, ifrmLeft : "0", "mouseUp" : "2", action : "execute",     title : "취소선"},
    	table                 : {hasLayer : true,  ifrmLeft : "0", "mouseUp" : "0", action : "openLayer",   title : "테이블"},
    	fieldset              : {hasLayer : true,  ifrmLeft : "0", "mouseUp" : "0", action : "openLayer",   title : "필드셋"},
    	hr                    : {hasLayer : true,  ifrmLeft : "0", "mouseUp" : "0", action : "openLayer",   title : "밑줄"},
    	justifyleft       	  : {hasLayer : false, ifrmLeft : "0", "mouseUp" : "2", action : "execute",     title : "왼쪽맞춤"},
    	justifycenter         : {hasLayer : false, ifrmLeft : "0", "mouseUp" : "2", action : "execute",     title : "가운데맞춤"},
    	justifyright          : {hasLayer : false, ifrmLeft : "0", "mouseUp" : "2", action : "execute",     title : "오른쪽맞츰"},
    	justifyfull           : {hasLayer : false, ifrmLeft : "0", "mouseUp" : "2", action : "execute",     title : "전체맞춤"},
    	insertorderedlist     : {hasLayer : false, ifrmLeft : "0", "mouseUp" : "2", action : "execute",     title : "번호매기기"},
    	insertunorderedlist   : {hasLayer : false, ifrmLeft : "0", "mouseUp" : "2", action : "execute",     title : "글머리기호"},
    	indent                : {hasLayer : false, ifrmLeft : "0", "mouseUp" : "1", action : "execute",     title : "들여쓰기"},
    	outdent               : {hasLayer : false, ifrmLeft : "0", "mouseUp" : "1", action : "execute",     title : "내어쓰기"},
    	emoticon              : {hasLayer : true,  ifrmLeft : "0", "mouseUp" : "0", action : "openLayer",   title : "이모티콘"},
    	character             : {hasLayer : true,  ifrmLeft : "0", "mouseUp" : "0", action : "openLayer",   title : "특수문자"},
    	link                  : {hasLayer : true,  ifrmLeft : "0", "mouseUp" : "0", action : "openLayer",   title : "링크만들기"},
    	urlimage              : {hasLayer : true,  ifrmLeft : "0", "mouseUp" : "0", action : "openLayer",   title : "이미지링크"},
    	image                 : {hasLayer : true,  ifrmLeft : "0", "mouseUp" : "2", action : "uploadImage", title : "이미지"}
    },

    message : { 
    	confirmChangeTextMode : "텍스트 모드로 전환하면 작성된 내용은 유지되나,\n\n글꼴 등의 편집효과와 이미지 등의 첨부내용이 모두 사라지게 됩니다.\n\n전환하시겠습니까?",
    	newpage : "새로 작성 하시겠습니까?",
    	invalidUrl : "URL정보가 올바르지 않습니다",
    	selectImage : "이미지를 선택해주세요",
    	tableRowSpan : "테이블 행",
    	tableColSpan : "테이블 열",
    	tableBorderSpan : "테두리 두께",
    	tableBorderColorSpan : "테두리 색",
    	tableBgcolorSpan : "표 배경색",
    	applyButton : "적용",
    	newWindowSpan : "새창",
    	height : "높이",
    	align : "정렬",
    	left : "왼쪽",
    	center : "가운데",
    	right : "오른쪽"
    },
    
    font : { 
    	name: [ 
    	    {value : "돋움, dotum",       text : "돋움 <span>(가나다라)</span>"},
    	    {value : "돋움체, dotumche",  text : "돋움체 <span>(가나다라)</span>"},
    	    {value : "굴림, gulim",       text : "굴림 <span>(가나다라)</span>"},
    	    {value : "굴림체, gulimche",  text : "굴림체 <span>(가나다라)</span>"},
            {value : "바탕, batang",      text : "바탕 <span>(가나다라)</span>"},
            {value : "바탕체, batangche", text : "바탕체 <span>(가나다라)</span>"},
            {value : "궁서, gungsuh",     text : "궁서 <span>(가나다라)</span>"},
            {value : "arial",             text : "Arial <span>(abcde)</span>"},
            {value : "tahoma",            text : "Tahoma <span>(abcde)</span>"},
            {value : "times new roman",   text : "Times New Roman <span>(abcde)</span>"},
            {value : "verdana",           text : "verdana <span>(abcde)</span>"}
         ],
        size : [ 
            {value : "7pt",   text : "가나다라마(7pt)"},
            {value : "8pt",   text : "가나다라마(8pt)"},
            {value : "9pt",   text : "가나다라마(9pt)"},
            {value : "10pt",  text : "가나다라마(10pt)"},
            {value : "11pt",  text : "가나다라마(11pt)"},
            {value : "12pt",  text : "가나다라마(12pt)"},
            {value : "14pt",  text : "가나다라마(14pt)"},
            {value : "18pt",  text : "가나다라마(18pt)"},
            {value : "24pt",  text : "가나다라(24pt)"},
            {value : "36pt",  text : "가나다(36pt)"}
        ],
        color : { 
            text : "가나다라마바",
            value : ["#000000", "#ff3300", "#ff0099", "#ff6600", "#cc00ff", "#cc9900", "#0000ff", "#33cc00", "#0099ff", "#009999"]
        },
    },
    
    charcter : { 
        base : { 
            apply : ["0", "1", "2", "3", "4", "5"],
            char  : ["일반기호", "숫자와 단위", "원,괄호", "한글", "그리스,라틴어", "일본어"]
        },
        mini : { 
            apply : ["0", "1", "2", "3", "4"],
            char  : ["기호1", "기호2", "기호3", "원", "괄호"]
        }
    },
    
    tableConfig : ["윗쪽에 행삽입", "아래쪽에 행삽입", "왼쪽에 열삽입", "오른쪽에 열삽입", "현재행 삭제", "현재열 삭제", "오른쪽셀과 병합", "아래쪽셀과 병합", "셀 병합 취소"]
};
 
    
