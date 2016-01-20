/*
* wonchu Editor v1.0
* 공식배포처 : http://www.wonchu.net
* 제작자 이메일 : wonchu.net@gmail.com
*
* 사용상의 문제나 건의사항은 공식 배포사이트의 게시판을 이용해주시거나 메일로 보내 주시기 바랍니다.
*/

(function($){
    $.fn.wEditor = function(method){
        if(!(this.length==1 && this.prop("tagName").toLowerCase() == "textarea")){
            return;
        }
        
        var result;
	    var args = Array.prototype.slice.call(arguments, 1);
	    if(typeof method === "string") {
			if(wEditor[method]){
				result = wEditor[method].apply(this, args);
			}else{
				alert("Method " + method + " does not exist on jQuery.wEditor");
			}
		}else{
			wEditor.initialize(this, method||{});
		}
		
		return result;
	};
	
    $.fn.wEditor.defaultSettings = {
        root                    : "/project/wEditor/",
        width                   : "100%",
    	height                  : "350px",
    	toolbar                 : "default",
    	minResizHeight          : "100px",
    	fontFamily              : "돋움, dotum",
    	fontSize                : "9pt",
    	miniMode                : false,
    	conversionMode          : ["editor", "html", "text"],
    	defaultConversionMode   : "editor",
    	resize                  : false,
    	exceptButtons           : [] // toolbar 구성에서 제외할 button
    };

    var wEditor = new(function() {
        var mode = "init",
            setting,
            object,
            attr;
        
        var config = {    
            data : {
                align         : "justifyleft;justifycenter;justifyright;justifyfull",
                ffCheck	      : "bold;italic;underline;strikethrough",
                keycode       : "8;37;38;39;40",
                initTag       : "<p><br></p>",
                layout        : "<div id=\"editerDiv\"><div id=\"toolBarBgDiv\"></div><div id=\"toolBarDiv\"><ul><li class=\"starter\"></li></ul></div><div id=\"editDiv\"><div id=\"resizeDiv\"></div><iframe id=\"editIframe\" src=\"\" width=\"100%\" height=\"100%\" border=\"0\" frameborder=\"0\" /><textarea id=\"editTextarea\"></textarea></div><div id=\"modeDiv\"><div></div><ul></ul></div></div>",
                dom           : "<!DOCTYPE HTML><html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" /></head><style type=\"text/css\">body{background-color:#ffffff;word-wrap:break-word;ime-mode:active;margin:10px;padding:0;font-family:@;font-size:@;} P {margin:0;padding:0;line-height:1.5;}</style></head><body>@</body></html>",
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
            
            fontFamily : { 
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
         
        function  initialize(target, options){
            setting = $.extend({}, $.fn.wEditor.defaultSettings, options);
            target.hide();
            
            $(config.data.layout).insertBefore(target);
            if(setting.width!=$.fn.wEditor.defaultSettings.width){
                $("#editerDiv, #editTextarea").css("width", setting.width);
            }
            
    		if(setting.height!=$.fn.wEditor.defaultSettings.height){
    		    $("#editerDiv, #editTextarea").css("height", setting.height);
    	    }
    	    
    	    // object
    	    obj = {
    	        target : target,
                editer : $("#editerDiv"),
                textEdit : $("#editTextarea"),
		        edit : $("#editIframe"),
		        editCw : $("#editIframe")[0].contentWindow,
		        editDoc	: $("#editIframe")[0].contentWindow.document
		    };
            
            // attribute
    		attr = {
    		    resizeY : 0,
    		    imageRoot : setting.root + "img/",
    		    htmlRoot : setting.root + "html/",
    		    affectedFontStyle : "",
    		    preview : null,
    		    savedRange : null,
    		    isES : typeof(obj.editDoc.selection)=="object",
                isIE : (navigator.appName == "Microsoft Internet Explorer"),
                rowIndex : -1,
                cellIndex : -1
            }
            
    		obj.editDoc.open();
    		obj.editDoc.write(_setParamValue(config.data.dom, [setting.fontFamily, setting.fontSize, config.data.initTag]));
    		obj.editDoc.close();
    		
    		// edit mode
    		if(obj.isIE) {
    			obj.editDoc.body.contentEditable = "true";
    		}else{
    			obj.editDoc.designMode = "on";
    		}
    		
    		// make button
    		var id="", 
    		    left="", 
    		    except=false;
    		    toolbar = typeof(setting.toolbar)=="string"?config.toolbar[setting.toolbar]:setting.toolbar;
    		
    		for (var i=0; i<toolbar.length; i++){
                for(var j=0; j<toolbar[i].length; j++){
                	id = toolbar[i][j];
                	
                	// toolbar 제외될 button
                	if(hasKeyInObject(setting.exceptButtons, id)){
                	    continue;
                	}
                	
                    if(id=="fontname"){
                        $("#toolBarDiv > ul").append("<li id=\"" + id + "Li\" title=\"" + config.button[id].title + "\"><a href='#' id='fontnameA'><span id='fontnameSpan'>" + getFirstArrayData(setting.fontFamily) + "</span></a></li>");
                    }else if(id=="fontsize"){
                        $("#toolBarDiv > ul").append("<li id=\"" + id + "Li\" title=\"" + config.button[id].title + "\"><a href='#' id='fontsizeA' unselectable='on'>" + setting.fontSize + "</a></li>");
                    }else{
                        $("#toolBarDiv > ul").append("<li id=\"" + id + "Li\" title=\"" + config.button[id].title + "\"><img src='" + attr.imageRoot + id + ".gif' unselectable='on'></li>");
                    }
                    
    				
                }
                
                if(toolbar.length!=(i+1)) $("#toolBarDiv > ul").append(config.data.separator);   
    		}
        }
        
        function _hasValue(v) {
            return (typeof(v) == "undefined")?false:true;
        }
        
        function getFirstArrayData(s, p){
            if(!_hasValue(p)) p = ",";
            var a = s.split(p);
            return $.trim(a[0]);
        }
        
        function hasKeyInObject(a, k){
    		for (var _k in a) {
    			if(($.isArray(a)?a[_k]:_k)==k){
                    return true;
                }
		    }
            return false;
        }
        
	    function _setParamValue(m, p) {
            var i = 0, n = 0;
            if(!_hasValue(p))return m;
            while( (i = m.indexOf("@", i)) != -1) {
           		if(p[n] == null) p[n] = "";
                m = m.substr(0, i) + String(p[n]) + m.substring(i + 1);
                i = i + String(p[n++]).length;
          	}
            return m;
        }
        
        return {
    		initialize : initialize
    	};
    });
    
})(jQuery);





var wEditord = {
    
    /*###############################################################################
    ## Define
    ###############################################################################*/
    
    /* data */
    
   
    /*###############################################################################
    ## editor initialize
    ###############################################################################*/
    
    /* editor 초기화 */
    initialize : function(target, config){
        
        // extend lang config
        $.each(wEditorLang.baseConfig, function(key){
            wEditorBaseConfig[key] = this;
        });
        
        $.each(wEditorLang.buttonTitle, function(key){
            wEditor.button[key].title = this;
        });
        
        // extend user config
        wEditor.config= $.extend(wEditorBaseConfig, config);
        target.hide();
        // create edit div
        $(this.template.init).insertBefore(target);
        
        if(this.config.width!="100%"){
            $("#editTextarea").css("width", this.config.width);
            $("#editerDiv").css("width", this.config.width);
        }
        
		if(this.config.height!="350px"){
		    $("#editTextarea").css("height", this.config.height);
		    $("#editDiv").css("height", this.config.height);
	    }
	    
        // object
        this.mode       = "init";
        this.target     = target;
        this.editer 	= $("#editerDiv");
        this.textEdit   = $("#editTextarea");
		this.edit 	    = $("#editIframe");
		this.editCw	    = this.edit[0].contentWindow;
		this.editDoc	= this.editCw.document;
		
		// attribute
		this.resizeY	        = 0;
		this.imageRoot          = this.config.root + "img/";
		this.htmlRoot           = this.config.root + "html/";
		this.affectedFontStyle  = "";
		this.preview            = null;
		this.savedRange	        = null;
		this.isES               = typeof(this.editDoc.selection)=="object";
        this.isIE 	   	        = (navigator.appName == "Microsoft Internet Explorer");
        this.rowIndex           = -1;
        this.cellIndex          = -1;
        
		this.editDoc.open();
		this.editDoc.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\"><html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/><style>body{background-color:#ffffff;word-wrap:break-word;ime-mode:active;margin:10px;padding:0;font-family:" + this.config.fontFamily + ";font-size:" + this.config.fontSize + ";} P {margin:0;padding:0;line-height:1.5;}</style></head><body>" + this.data["initTag"] + "</body></html>");
		this.editDoc.close();
		
		// edit mode
		if(this.isIE) {
			this.editDoc.body.contentEditable = "true";
		} else {
			this.editDoc.designMode = "on";
		}
        
		// edit event
		$(this.editDoc)
		.bind("keydown", function(event) {
			wEditor.checkKeyDown(event);
		})
		.bind("keyup", function(event) {
			wEditor.checkKeyUp(event);
		})
		.bind("mouseup", function(event) {
			wEditor.checkMouseUp(event);
		});
		
		// make button
		var id="", left="", except=false;
		for (var i=0; i<this.config.toolbar.length; i++){
            for(var j=0; j<this.config.toolbar[i].length; j++){
            	id = this.config.toolbar[i][j];
            	
            	// toolbar 제외될 button
            	except = false;
            	for(var k=0;k<this.config.exceptButtons.length;k++){
            	    if(this.config.exceptButtons[k]==id) {
            	        except = true;
            	        break;
            	    }
            	}
            	if(except) continue;
            	
                if(id=="fontname"){
                    $("#toolBarDiv > ul").append("<li id=\"" + id + "Li\" title=\"" + this.button[id].title + "\"><a href='#' id='fontnameA'><span id='fontnameSpan'>" + wEditorLib.getFirstArrayData(this.config.fontFamily) + "</span></a></li>");
                }else if(this.config.toolbar[i][j]=="fontsize"){
                    $("#toolBarDiv > ul").append("<li id=\"" + id + "Li\" title=\"" + this.button[id].title + "\"><a href='#' id='fontsizeA' unselectable='on'>" + this.config.fontSize + "</a></li>");
                }else{
                    $("#toolBarDiv > ul").append("<li id=\"" + id + "Li\" title=\"" + this.button[id].title + "\"><img src='" + this.imageRoot + id + ".gif' unselectable='on'></li>");
                }
                
                /* 레이어 생성 */
				if(this.button[id].isIfrm=='Y') { 
            		this.editer.append("<iframe id=\"" + id + "Frame\" src=\"" + this.htmlRoot + id  + ".html\" border=\"0\" frameborder=\"0\" scrolling=\"no\" class=\"buttonIframe\" />");
            		this.setIfrmLeft(id);
			    }
			    
			    if(id=="table"){
			        this.editer.append("<iframe id=\"tableConfigFrame\" src=\""+ this.htmlRoot + "tableConfig.html\" border=\"0\" frameborder=\"0\" scrolling=\"no\" class=\"buttonIframe\" />");
			    }
            }
            
            if(this.config.toolbar.length!=(i+1)) $("#toolBarDiv > ul").append(this.template.separator);
		}
        
        // button event
        $("#toolBarDiv > ul > li:not('.starter,.separator')")
		.bind("mouseover", function(event) {
			wEditor.changeButton($(this), "over");
		})
		.bind("mouseout", function(event) {
			wEditor.changeButton($(this), "out");
		})
		.bind("mousedown", function(event) {
			wEditor.changeButton($(this), "down");
		})
		.bind("mouseup", function(event) {
		    if(wEditor.button[$(this).attr("id").replace("Li", "")].mouseUp=="Y"){
			    wEditor.changeButton($(this), "up");
		    }
		})
		.bind("click", function(event) {
		    var s = $(this).attr("id").replace("Li", "");
			eval("wEditor." + wEditor.button[s].functionNm + "('" + s + "')");
		});

        if($(this.target).val()!=""){
        	this.setContent($(this.target).val());
        }
        
        // conversion mode
        if(this.config.conversionMode.length==0){
            if(!this.config.resize) $("#modeDiv").hide();
        }else {
            // show mode
            this.config.conversionMode.reverse();
            $.each(this.config.conversionMode, function(){
                $("#modeDiv > ul").append(wEditorLib.setParamValue(wEditor.template.conversionLi, [this]));
            });
            
           $("#modeDiv > ul li").each(function(){
                if($(this).css("display")!="none"){
                    $(this).css("width", "60px");
                    return false;
                }
            });
            
            // conversion mode click event
            $("#modeDiv > ul li").click(function() {
                
                var mode = "";
                var skip = false;
                var id   = this.id;
                switch (id) {
                    case "editorModeLi":
                        if($("#editorModeLi").hasClass("off")){
                            $(wEditor.textEdit).hide();
                            $(wEditor.edit).show();
                            $("#toolBarBgDiv").hide();
                            if(wEditor.mode=="html"){
                                $(wEditor.editDoc.body).html($(wEditor.editDoc.body).text());
                            }else if(wEditor.mode=="text"){
                                $(wEditor.editDoc.body).text($(wEditor.textEdit).val());
                            }
                            mode = "editor";
                        }
                        break;
                    case "htmlModeLi":
                        if($("#htmlModeLi").hasClass("off")){
                            $(wEditor.textEdit).hide();
                            $(wEditor.edit).show();
                            $("#toolBarBgDiv").show();
                            if(wEditor.mode=="editor"){
                                $(wEditor.editDoc.body).text($(wEditor.editDoc.body).html());
                            }else if(wEditor.mode=="text"){
                                $(wEditor.editDoc.body).text($(wEditor.textEdit).val());
                            }
                            mode = "html";
                        }
                        break;
                    case "textModeLi":
                        if($("#textModeLi").hasClass("off")){
                            if(wEditor.mode!="init"){
                                if(!confirm(wEditorLib.getMessage("confirmChangeTextMode")))  skip = true;
                            }    
                            
                            if(!skip){     
                                $(wEditor.textEdit).show();
                                $(wEditor.edit).hide();
                                $("#toolBarBgDiv").show();
                                if(wEditor.mode=="editor"){
                                    $(wEditor.textEdit).val($(wEditor.editDoc.body).text());
                                }else if(wEditor.mode=="html"){
                                    $(wEditor.editDoc.body).html($(wEditor.editDoc.body).text());
                                    $(wEditor.textEdit).val($(wEditor.editDoc.body).text());
                                }
                                mode = "text";
                            }
                        }
      
                        break;
                    default:
                        break;
                }            
                
                if(!skip && mode!=""){
                    wEditor.mode = mode;
                    $("#modeDiv > ul li").each(function(){
                        if($(this).css("display")!="none"){
                            if(this.id==id){
                                $(this).removeClass("off");
                                $(this).addClass("on");
                            }else{
                                $(this).removeClass("on");
                                $(this).addClass("off");
                            }
                        }
                    });
                }
                
            });
                              
            $("#" + this.config.defaultConversionMode + "ModeLi").click();
        }
        
        if(this.config.resize){
            $("#modeDiv > div").addClass("resize");
            
            $("#modeDiv > div").bind("mousedown", function(event) {
    			wEditor.resizeStart(event);
    		});
        }
        
        // lang resize
        $.each(wEditorLang.iframeResize, function(key){
            if(wEditor.config.miniMode && wEditorLang.iframeMiniResize[key]){
                // mini mode 유지
            }else{
                $("#" + key+"Frame").css({"width":this.width, "height":this.height});
            }
        });
    },
    
    /*###############################################################################
    ## editor control
    ###############################################################################*/
    
    /* html 추가 */
    setHtml : function (s, o){
        this.restoreRange();
		if (this.isES) {
            this.savedRange.pasteHTML(s);
		} else {
		    this.editDoc.execCommand("inserthtml", false, s);
		}
		
		if(typeof(o)!="undefined"){
		    $("#" + o+"Frame").hide();
    	    wEditor.changeButton(o, "up");
		}
	},
	
    /* 내용 조회 */
	getContent : function(skip) {
	    if(typeof(skip)=="undefined") skip = false;
	    var str = "";
	    if(this.mode=="editor" || this.mode=="init"){
	        str = $(wEditor.editDoc).find("body").html();
	    }else if(this.mode=="html"){
	        str = $(wEditor.editDoc).find("body").text();
	    }else if(this.mode=="text"){
	        str = $(wEditor.textEdit).val();
	    }
	     
	    if(this.mode!="text" && !skip && str==this.data["initTag"]) str="";
		return str;
	},
	
	/* 내용 설정 */
	setContent : function(s) {
		if(this.mode=="init"){
		    if(this.config.defaultConversionMode=="text"){
		        $(wEditor.textEdit).val(s);
		    }else if(this.config.defaultConversionMode=="html"){
		        $(wEditor.editDoc.body).text(s);
		    }else if(this.config.defaultConversionMode=="editor"){
		        $(wEditor.editDoc.body).html(s);
		    }
		}else{
		    $(wEditor.editDoc.body).html(s);
		}
	},
	
	/* 작성된 내용이 있는지 여부 */
	hasContent : function() {
		return this.getContent(false)!="";
	},
	
	/* 내용 저장 */
	saveContent : function(skip) {
		$(this.target).val(this.getContent(skip));
	},
	
	/* Selection */
	getSel : function() {
	    this.editCw.focus();
	    return this.isES ? this.editDoc.selection : this.editCw.getSelection();
	},
	
	/* Range 생성 */
	getRange : function() {
	    this.editCw.focus();
	    return this.isES ? this.editDoc.selection.createRange() : this.editCw.getSelection().getRangeAt(0);
	},
	
	/* 영역, 선택 저장 */
	saveRange : function() {
		this.savedRange = this.getRange();
	},
	
	/* 선택된 영역 선택 실행 */
	restoreRange : function() {
		if(this.isES)   this.savedRange.select();
		else            this.editCw.focus();
	},

	/* 선택된 영역 텍스트 */
	getSelectedText : function() {
	    this.editCw.focus();
        return this.isES ? this.savedRange.text : this.savedRange.toString();
	},
	
	/* 선택된 영역 HTML */
	getSelectedHtml : function() {
	    this.editCw.focus();
	    if(this.isES){
	    	return this.savedRange.htmlText;
	    }else{
		    if(this.savedRange.rangeCount < 1 )  // 선택된 영역이 없다면...
		        return null;
		    
		    var d = document.createElement("p");
		    d.appendChild(this.savedRange.cloneContents());
		    return d.innerHTML;
	    }
	},
	
	/* 선택된 영역 체크 */
	checkRange : function(){
		return this.getSelectedText()==""?false:true;
	    
	},
	
	/* keyup 이벤트 */
	checkKeyUp : function (e) {
        if(this.mode != "editor") return false;
        if(wEditorLib.hasDataInKey("keycode", e.keyCode)) wEditor.checkNode(e);
	},
	
	/* keydown 이벤트 */
	checkKeyDown : function (e) {
        // tab
        if(this.isIE && e.keyCode==9) {
			var o = e.srcElement;
			o.focus();
			o.selection = document.selection.createRange();
			o.selection.text = "    ";
			e.preventDefault();
			e.returnValue = false;
		} 
	},
	
	/* mouseUp 이벤트 */
	checkMouseUp : function (e){
	    if(this.mode != "editor") return false;
	    wEditor.closeLayers();
	    wEditor.checkNode(e);
	    wEditor.initLayerButonStyle();
	},
	
	/* Node 체크 */
	checkNode : function(e){
	    var o, p = this.getRange();
	    this.initExecuteButonStyle();
	    
	    o = p.commonAncestorContainer || p.parentElement();
        
		for(var i=0;i<10;i++){
		    if(!(o.nodeName.toUpperCase() == "BODY" || o.nodeName.toUpperCase() == "HTML")){
		        this.changeButtonMode(o, e);
		        if(o.parentNode) o = o.parentNode;
		        else break;
		    }else{
		       break;
		    }   
		}
		
		if(this.affectedFontStyle != "") this.affectedFontStyle = "";
		
		//- align defalut check
        var a = wEditorLib.getArrayData("align");
	    var b = true;
	    for(var i=0;i<a.length;i++){
	        if($("#" + a[i] + "Li").length>0){
	            if($("#" + a[i] + "Li").hasClass("down")){
	                b = false;
	                break;
	            }
	        }      
	    }

	    if(b && $("#justifyleftLi").length>0) this.changeButton("justifyleft", "down");
	   
	},
	
	/* button iframe x좌표 고정 */
	fixIfrmLeft : function(s){
	    
	    /*!!! 한두개 수정시는 wEditor.button.forecolr.ifrmLeft="28px"로 아래처럼 선언하지 말고 직접 변경을 권장함 */
	    var pos = {
	        "approval.form" :    {"forecolor" : "28px", "backcolor" : "56px", "character" : "78px", "link" : "80px"},
	        "approval.textbox" : {"fontsize" : "4px", "forecolor" : "20px", "backcolor" : "44px", "character" : "158px", "link" : "143px", "urlimage" : "178px"}
	    };
	    
	    $.each(pos[s], function(key){
            wEditor.button[key].ifrmLeft = this;
        });
	},
	
    /*###############################################################################
    ## button action
    ###############################################################################*/
    
    /* execCommand 실행 */
	execute : function(cmd, opt) {
        if(!wEditorLib.hasValue(opt)) opt = null;
        this.editCw.focus();
        
		this.editDoc.execCommand(cmd, false, opt);
		this.closeLayers();
		
        if(wEditorLib.hasDataInKey("align", cmd)){
	        var a = wEditorLib.getArrayData("align");
	        for(var i=0;i<a.length;i++){this.changeButton(a[i], "up");}
	        this.changeButton(cmd, "down");
	    }
	},
    
    /* 레이어 열기 */
	openLayer : function (s){
		var $o = $("#" + s + "Frame");
		
        if($o.css("display")!="none") {
            $o.hide();
            return;
        }
        
        this.saveRange();
		this.closeLayers();
	    this.initLayerButonStyle(s);

	    $o.show();	
	    
		if(s=="link"){
			$o[0].contentWindow.init();
		}
	},
	
	/* 레이어 닫기 */
	closeLayers : function(){
	    $("#editerDiv iframe.buttonIframe").hide();
	},
	
	/* 이미지 업로드 */
	uploadImage : function(){
	    this.saveRange();
	    this.closeLayers();
	    this.initLayerButonStyle();

	    iKEP.showDialog({
    	    title : "image upload",
    	    url : iKEP.getContextRoot() + "/support/fileupload/uploadFormForEditor.do?targetId=wEditor&" + $("#editorFileUploadParameter").serialize(),
    	    modal : true,
    	    resizable: false, 
    	    width : 600,
    	    height : 185,
    	    callback : function(result) {	//fileId, fileName, targetId
    	    	var fileId = result.fileId, targetId = result.targetId;
    	    	wEditor.setHtml("<img name='editorImage' id='"+ fileId +"' src='" + iKEP.getWebAppPath() + "/support/fileupload/downloadFile.do?fileId=" + fileId + "'/>", "image");
    	    },
    	    scroll : "no" 
    	}); 
	},
	
	/* 새글 작성 */
	newpage : function() {
		this.closeLayers();

		if(this.getContent()!=""){
		    if(!confirm(wEditorLib.getMessage("newpage"))) return;
	    }
		this.setContent(this.data["initTag"]);
		//this.editCw.focus();
	},
	
	/* 미리보기 */
	previewer : function() {
		this.closeLayers();

		if(this.preview != null) this.preview.close();
		this.preview = window.open("about:blank", "preview", "resizable=yes,scrollbars=yes,left=50,top=50,width=900,height=" + this.config.height);
	
		var s="<title>PREVIEW</title>\r\n";
		s=s+"<link rel=\"stylesheet\" type=\"text/css\" media=\"screen\" href=\"/include/css/import.css\" media=\"screen\" />\r\n";
		s=s+"<style>P {white-space:pre;margin-top:3px;margin-bottom:3px;margin-left:3;margin-right:3;word-break:break-all;}</style>\r\n";
		s=s+"<table border=0 cellspacing=0 cellpadding=0 width=100% height=100% style=\"cursor:pointer\" onClick=\"window.close()\"><tr><td align=center valign=top style='border:1px solid #aaa'>\r\n";
		s=s+"<table border=0 cellspacing=0 cellpadding=0 width=95% height=95%><tr><td valign=top><br>\r\n";
		s=s+this.getContent();
		s=s+"</td></tr></table></td></tr></table>\r\n";
	
		this.preview.document.open();
		this.preview.document.write(s);
		this.preview.document.close();
	},
	
	/* 프린트 */
	print : function(){
		this.closeLayers();
		this.edit.focus();
		window.print();
	},	
	
	/*###############################################################################
    ## miscellaneous action
    ###############################################################################*/
    
	/* button iframe left */
	setIfrmLeft : function(s){
	    
	    if(this.config.miniMode && wEditorLang.iframeMiniResize[s]){
            $("#" + s+"Frame").css({"width":wEditorLang.iframeMiniResize[s].width, "height":wEditorLang.iframeMiniResize[s].height});
	    }

        // left 값지정 - hidden 페이지에 만들어진 에디터는 position().left 값을 구할수 없어 절대 위치값을 주어야함(ex : approval의 폼항목 선택)
        if(parseInt(this.button[s].ifrmLeft)!=0){
            $("#" + s + "Frame").css("left", parseInt(this.button[s].ifrmLeft) + "px");
            return;
        }

        var ewidth = $("#editDiv").width();
		var sleft  = $("#" + s + "Li").position().left;
		var swidth = parseInt($("#" + s + "Frame").css("width"));
		var sfloor = Math.floor(parseInt($("#" + s + "Frame").css("width"))/2);
		
		if(ewidth<sleft+swidth){
		    if(ewidth>sleft+sfloor){
		        sleft = sleft-sfloor;
		    }else{
		        sleft = sleft-swidth+23;
		    }
		}else if(sleft>sfloor){
		    sleft -= sfloor;    
		}

		$("#" + s + "Frame").css("left", sleft + "px");
		
	},
	
    /* 버튼 효과(mouse) */
	changeButton : function(t, m, p){
	    if(typeof(t) =="string") t = $("#" + t + "Li");
		var c = t.attr("class");
		if(m=="down" && c=="down" && typeof(p)=="undefined"){
		    if(c="up") t.attr("class", "up");
		} else if((m=="up" && c=="down") || c!="down") {
		    if(c!=m) t.attr("class",  m);
        }
	},
	
	/* 버튼 효과(key) */
	changeButtonMode : function(o, e){
	    var s = o.nodeName.toUpperCase();
        
	    if(s=="STRONG" || s=="B"){
	        this.changeButton("bold", "down", "Y");
	    }else if(s=="EM" || s=="I"){
	        this.changeButton("italic", "down", "Y");
	    }else if(s=="STRIKE"){
	        this.changeButton("strikethrough", "down", "Y");
	    }else if(s=="U"){
	        this.changeButton("underline", "down", "Y");
	    }else if((s=="FONT" && o.style) || (s=="SPAN" && o.style)){
	        if(o.style.color!="" && !this.isAffectedFontStyle("forecolor")){
	            $("#forecolorLi").css("background-color", o.style.color);
	        }else if(o.style.backgroundColor!="" && !this.isAffectedFontStyle("backcolor")){
	            $("#backcolorLi").css("background-color", o.style.backgroundColor);
	        }else if(o.style.fontFamily!="" && !this.isAffectedFontStyle("fontname")){
	            $("#backcolorLi").css("background-color", o.style.backgroundColor);
	            $("#fontnameSpan").html(wEditorLib.getFirstArrayData(o.style.fontFamily).replaceAll("'", ""));
	        }else if(o.style.fontSize!="" && !this.isAffectedFontStyle("fontsize")){
	            $("#fontsizeA").html(o.style.fontSize);
	        }
	    }else if(s=="P"){
	    	if(o.align){
	    		this.changeButton("justify" + o.align, "down", "Y");
	    	}else if(o.style.textAlign){
	    		this.changeButton("justify" + o.style.textAlign, "down", "Y");
	    	}
	    }else if(s=="LI"){
	        if(o.parentNode.nodeName.toUpperCase()=="OL") this.changeButton("insertorderedlist", "down", "Y");
	        else this.changeButton("insertunorderedlist", "down", "Y");
	    }else if(s=="TABLE" && o.className && o.className=="WCETable" && e.button && e.button==2){
	        /*
	        if(o.oncontextmenu==null){
	            o.oncontextmenu = new Function("return false");
	        }
	        
	        wEditor.rowIndex = -1;
	        wEditor.cellIndex = -1;
	        
	        $(o).find("tr").one("mousemove", function(event) {
	            if(wEditor.rowIndex==-1){
	                wEditor.rowIndex = this.rowIndex;
	                //console.log(this.rowIndex);
	            }
	        });
	        
	        $(o).find("td").one("mousemove", function(event) {
	            if(wEditor.cellIndex==-1){
	                wEditor.cellIndex = this.cellIndex;
	                //console.log(this.cellIndex);
	            }
	        });
	        
	        $("#tableConfigFrame").css({"left" : e.clientX + "px", "top" : e.clientY + "px"});
	        $("#tableConfigFrame").show();
	        */
	    }

	},
	
	/* 레이어 버튼 모드 초기화 */
	initLayerButonStyle : function(s){
	    if(!wEditorLib.hasValue(s)) s == "";
	    for (var i=0; i<this.config.toolbar.length; i++){
            for(var j=0; j<this.config.toolbar[i].length; j++){
                id = this.config.toolbar[i][j];
                if(this.button[id].functionNm=="openLayer" && s!=id) this.changeButton(id, "up");
            }
        }
	},
    
    /* 실행 버튼 모드 초기화 */
	initExecuteButonStyle : function(){
	    for (var i=0; i<this.config.toolbar.length; i++){
            for(var j=0; j<this.config.toolbar[i].length; j++){
                id = this.config.toolbar[i][j];
                
                if(wEditor.button[id].mouseUp=="O") {
        	        if(id == "forecolor"){
        	            if(!($("#" + id + "Li").css("background-color")=="" || $("#" + id + "Li").css("background-color")=="#000000")) {
        	                $("#" + id + "Li").css("background-color", "#000000");
        	            }
        	        }else if(id == "backcolor"){
        	            if(!($("#" + id + "Li").css("background-color")=="" || $("#" + id + "Li").css("background-color")=="#ffffff")) {
        	               $("#" + id + "Li").css("background-color", "#ffffff");
        	            }
        	        }else if(id == "fontname"){
        	            if(!($("#fontnameSpan").html()=="" || $("#" + id + "Li").html()==wEditorLib.getFirstArrayData(this.config.fontFamily))) {
        	                $("#fontnameSpan").html(wEditorLib.getFirstArrayData(this.config.fontFamily));
        	            }
        	        }else if(id == "fontsize"){
        	            if(!($("#fontsizeA").html()=="" || $("#fontsizeA").html()==this.config.fontSize)) {
        	                $("#fontsizeA").html(String(this.config.fontSize));
        	            }
        	        }else {
        	            this.changeButton(id, "up");
        	        }
        	    }
            }
        }
	},
	
	/* 기 적용된 폰트 스타일 여부*/
	isAffectedFontStyle : function(s){
        if(this.affectedFontStyle.indexOf(s)==-1){
            this.affectedFontStyle += s;
            return false;
        }
        return true;            
    },
    
	/* 폰트 */
	setFont : function (m, o){
		this.restoreRange();
	    if(this.checkRange()){
	    	if(m=="fontname") {
                this.execute(m, o);
                this.changeFontAttr("face", "font-family", o.replaceAll("'", ""));
            }else if(m=="fontsize"){
                this.execute(m, 1);
	            this.changeFontAttr("size", "font-size", o);
            }else if(m=="forecolor"){
                this.execute(m, o);
	            this.changeFontAttr("color", "color", o);
            }else if(m=="backcolor"){
                this.execute(this.isIE?"backcolor":"hilitecolor", o);
            }
        }else{
        	this.closeLayers();
        	this.editCw.focus();
        	var p = this.getRange();
	        var js2css = {"fontname":"font-family", "fontsize":"font-size", "forecolor":"color", "backcolor":"background-color"};
	        if(p.pasteHTML){
    	        p.pasteHTML("<font style=\""+ js2css[m] + ":" + o + "\"><span id='wEditorRange1'></span>&nbsp;<span id='wEditorRange2'></span></font>");
    	        var tmp1 = this.editDoc.getElementById("wEditorRange1");
    		    var tmp2 = this.editDoc.getElementById("wEditorRange2");
    		    p.moveToElementText(tmp1);
    	
    		    var tmpRange = this.editDoc.body.createTextRange();
    		    tmpRange.moveToElementText(tmp2);
    
    		    p.setEndPoint("EndToEnd", tmpRange);
    		    p.select();
    		   
    		    tmp1.parentNode.removeChild(tmp1);
    		    tmp2.parentNode.removeChild(tmp2);
	        }else{
	            this.execute("inserthtml", "<span style=\""+ js2css[m] + ":" + o + "\">&nbsp;</span>");
	            //- execommand check
	            var a = wEditorLib.getArrayData("ffCheck");
	    	    for(var i=0;i<a.length;i++){
	    	        if($("#" + a[i] + "Li").length>0){
	    	            if($("#" + a[i] + "Li").hasClass("down")){
	    	            	this.execute(a[i]);
	    	            }
	    	        }      
	    	    }
	    	    
	        }
        }
	    
	    if(m=="fontname") {
            $("#fontnameSpan").html(wEditorLib.getFirstArrayData(o).replaceAll("'", ""));
        }else if(m=="fontsize"){
            $("#fontsizeA").html(o);
        }else if(m=="forecolor"){
            $("#forecolorLi").css("background-color", o);
        }else if(m=="backcolor"){
            $("#backcolorLi").css("background-color", o);
        }
        
        this.changeButton(m, "up");
	},
	
	/* change font */
	changeFontAttr : function(t, s, v) {
		$(wEditor.editDoc).find("body font[" + t + "]").each(function(){
			if(this[t]==v || (t=="size" && this[t]=="1")){
				$(this).removeAttr(t).css(s, v);
				$(this).find("font[style*='" + s + "']").css(s, v);
		    }
			
        });
    },
	
    /* 팔레트 */
	printColorPlate : function (m, b){
	    if(typeof(b)=="undefined") b = false;
		var colortone = new Array(10);
			colortone[0] = new Array('#ffffff','#e5e4e4','#d9d8d8','#c0bdbd','#a7a4a4','#8e8a8b','#827e7f','#767173','#5c585a','#000000');
			colortone[1] = new Array('#fefcdf','#fef4c4','#feed9b','#fee573','#ffed43','#f6cc0b','#e0b800','#c9a601','#ad8e00','#8c7301');
			colortone[2] = new Array('#ffded3','#ffc4b0','#ff9d7d','#ff7a4e','#ff6600','#e95d00','#d15502','#ba4b01','#a44201','#8d3901');
			colortone[3] = new Array('#ffd2d0','#ffbab7','#fe9a95','#ff7a73','#ff483f','#fe2419','#f10b00','#d40a00','#940000','#6d201b');
			colortone[4] = new Array('#ffdaed','#ffb7dc','#ffa1d1','#ff84c3','#ff57ac','#fd1289','#ec0078','#d6006d','#bb005f','#9b014f');
			colortone[5] = new Array('#fcd6fe','#fbbcff','#f9a1fe','#f784fe','#f564fe','#f546ff','#f328ff','#d801e5','#c001cb','#8f0197');
			colortone[6] = new Array('#e2f0fe','#c7e2fe','#add5fe','#92c7fe','#6eb5ff','#48a2ff','#2690fe','#0162f4','#013add','#0021b0');
			colortone[7] = new Array('#d3fdff','#acfafd','#7cfaff','#4af7fe','#1de6fe','#01deff','#00cdec','#01b6de','#00a0c2','#0084a0');
			colortone[8] = new Array('#edffcf','#dffeaa','#d1fd88','#befa5a','#a8f32a','#8fd80a','#79c101','#3fa701','#307f00','#156200');
			colortone[9] = new Array('#d4c89f','#daad88','#c49578','#c2877e','#ac8295','#c0a5c4','#969ac2','#92b7d7','#80adaf','#9ca53b');
		var str = "";
		
		var w = b?14:22;
		var h = b?10:12;
               
		str += "<table cellpadding='0' cellspacing='0' border=0 style='border:solid 1px #bbcecc;margin-left:1px;' bgcolor='#ffffff'>";
	    if(m=='table') str += "<tr height='10' bgcolor='#333333' style='color:white;font-size:9px;'><td colspan='2' align=center>plate</td><td colspan='8' align='right'><span style='cursor:pointer;font-weight:bold' onclick='closePlate();'>x</span>&nbsp;</td></tr>";
		for (var i=0; i<10; i++){
			str += "<tr>";
			for(var j=9; j>=0; j--){
				str += "<td>";
				str += "<table cellpadding='0' cellspacing='0' border='0' style='border-spacing:0px;'><tr>";
				str += "<td width='" + w + "' height='" + (h+2) + "' bgcolor='" + colortone[j][i] + "' style='border:1px solid #ffffff' onmouseover=\"this.style.borderColor='#888888';checkColor('" + colortone[j][i] + "')\" onmouseout=\"this.style.borderColor='#ffffff'\"><a href='#' onclick=\"";
				if(m=="hr")      str	+= "setHr('" + colortone[j][i] + "');return false;\">";
			    else if(m=="table") str	+= "setTableColor('" + colortone[j][i] + "');return false;\">";
				else            str	+= "parent.wEditor.setFont('" + m + "', '" + colortone[j][i] + "');return false;\">";
				str += "<img src='" + this.imageRoot + "blank.gif' border='0' width='" + (w-2) + "' height='" + h + "' align='absmiddle'></a>";
				str += "</td></tr></table></td>";
			}   
			str += "</tr>";
		}       
		
		return (str+"</table>");
	},
	
	/* 리사이즈 */
	resizeStart : function(e){
    	if(wEditor.resizeY==0) wEditor.resizeY=e.clientY+$(document).scrollTop();
    	$(document)
        .bind("mousemove", function(event) {
            if(wEditor.mode!="text"){
                $("#editIframe").hide();
                $("#resizeDiv").show();
            }
            wEditor.resizeMove(event);
        })
        .bind("mouseup", function(event) {
            wEditor.resizeStop();
            if(wEditor.mode!="text"){
                $("#editIframe").show();
                $("#resizeDiv").hide();
            }
        });
    	
	},
	
	resizeMove : function(e){
        var _h = e.clientY + $(document).scrollTop() - wEditor.resizeY + parseInt(wEditor.config.height);
		if(_h<parseInt(parseInt(wEditor.config.minResizHeight))) return;
		$("#editDiv").css("height", _h + "px");
	},
	
	resizeStop : function (){
		$(document).unbind("mousemove").unbind("mouseup");
	}
};   


var wEditorLib = {
    
    /* get message */
    getMessage : function(s){
        return wEditorLang.message[s];
    },
    
	/* 매핑 */
	setParamValue : function (m, p) {
        var i = 0, n = 0;
        if(!this.hasValue(p))return m;
        
        while( (i = m.indexOf("@", i)) != -1) {
       		if(p[n] == null) p[n] = "";
            m = m.substr(0, i) + String(p[n]) + m.substring(i + 1);
            i = i + String(p[n++]).length;
      	}
        return m;
    },
    
    /* 문자추출 */
    getLastValue : function(s, p){
        return s.indexOf(p)!=-1?s.substring(s.lastIndexOf(p)+1):"";
    },
    
    /* 배열의 첫번째 데이터 */
    getFirstArrayData : function(s, p){
        if(!this.hasValue(p)) p = ",";
        var a = s.split(p);
        return $.trim(a[0]);
    },
    
    /* Data 추출 */
    getArrayData : function(){
        return (wEditor.data[arguments[0]]).split(";");
    },
    
    /* 키 포함여부 */
    hasDataInKey : function(s, k){
        var a = wEditorLib.getArrayData(s);
        for (var i = 0; i < a.length; i++) {if (String(k)==a[i]) return true;}
        return false;
    },
    
    /* 파라메터 체크 */
	hasValue : function(v) {
        return (typeof(v) == "undefined")?false:true;
    },
  
    /* up,down */
    updown : function(o, p, v){
        var maxLen = {'col' : 20, 'row' : 20, 'border' : 10, 'hrheight' : 10};
        var m = maxLen[o];
        var r = 0;
        v = parseInt(v);
        if(v==1 && p=='+')
            r = v+1;
        else if(v==m && p=='-')
            r = v-1;
        else if(v>1 && v<m) 
            r = p=='+'?v+1:v-1; 
        else
            r = v;
            
        return r;
    },
    
    resizeIfrm : function(o){
        var obj = document.getElementById(o);
        var objDocument = obj.contentWindow.document; 
        if(objDocument.height){
            obj.style.height = objDocument.height + "px";
        } else {
            obj.style.height = objDocument.body.scrollHeight + "px";
        }
    },
    
    /* 파일확장자 체크 */
    existExt : function(t, p) {
  	    var fileExt = {	"IMAGE"  : "gif,jpg,jpeg,png", 
  	    				"EXCEPT" : "java,jsp,do,cgi,js" 
  	    			  };
  	    			  
  	    var s   = fileExt[p];
  	    var e	= this.getLastValue(t, ".").toLowerCase();

		var a   = s.split(",");
        for(var i=0; i <= a.length ;i++) if(e==a[i]) return true;        	
  	    return false;
    }
};