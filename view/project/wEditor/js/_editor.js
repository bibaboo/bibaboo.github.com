/*
* wonchu Editor v1.0
* 공식배포처 : http://www.wonchu.net
* 제작자 이메일 : wonchu.net@gmail.com
*
* 사용상의 문제나 건의사항은 공식 배포사이트의 게시판을 이용해주시거나 메일로 보내 주시기 바랍니다.
*/

(function($){
    $.fn.wceditor = function(config) {
        var $target = this;
		if($target[0].tagName.toLowerCase() == "textarea") {
		    if(typeof(config)=="undefined") config = wceditorBaseToolbar;
		    WCEditor.initialize($target, config);
		}else{
		    alert("Textarea does not exist."); return;
		}
    };
})(jQuery);


var wceditorBaseConfig = {
        "root"                    : iKEP.getContextRoot() + "/base/js/wceditor/",
        "width"                   : "100%",
    	"height"                  : "350px",
    	"minResizHeight"          : "100px",
    	"fontFamily"              : "돋움, dotum",
    	"fontSize"                : "9pt",
    	"miniMode"                : false,
    	//"conversionMode"        : ["editor", "html", "text"],
    	"conversionMode"          : ["editor", "html"],
    	"defaultConversionMode"   : "editor",
    	"resize"                  : false,
    	"exceptButtons"           : [] // toolbar 구성에서 제외할 button
};

var wceditorMiniToolbar = {
	    toolbar : [
	        ["newpage"],
	        ["forecolor","backcolor"],
	        ["bold","italic","strikethrough","underline"],
	        ["character", "link"]
	   	]
};

var wceditorMiniNoteToolbar = {
	    toolbar : [
	        ["forecolor","backcolor"],
	        ["bold","italic","underline"],
	        ["insertorderedlist","insertunorderedlist"],
	        ["character", "link","image"]
	   	]
};

var wceditorSimpleToolbar = {
	    toolbar : [
	        ["newpage"],
	        ["fontname","fontsize"],
	        ["forecolor","backcolor"],
	        ["bold","italic","strikethrough","underline"],
	        ["justifyleft","justifycenter","justifyright","justifyfull"],
	        ["insertorderedlist","insertunorderedlist"],
	        ["character","link","image"]
	    ]
};

var wceditorBaseToolbar = {
	    toolbar : [
	        ["fontname","fontsize"],
	        ["newpage","previewer", "print"],
	        ["forecolor","backcolor"],
	        ["bold","italic","strikethrough","underline"],
	        ["justifyleft","justifycenter","justifyright","justifyfull"],
	        ["character","link", "image"]
	    ]
};
 
var wceditorMaxToolbar = {
    toolbar : [
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
};


var WCEditor = {
    
    /*###############################################################################
    ## Define
    ###############################################################################*/
    
    /* data */
    data : { 
             "initTag"      : "<p><br></p>",
             "align"        : "justifyleft;justifycenter;justifyright;justifyfull",
             "ffCheck"		: "bold;italic;underline;strikethrough",
             "keycode"      : "8;37;38;39;40"
           },
    
    /* tempate */
    template : {
        "init"          : "<div id=\"editerDiv\"><div id=\"toolBarBgDiv\"></div><div id=\"toolBarDiv\"><ul><li class=\"starter\"></li></ul></div><div id=\"editDiv\"><div id=\"resizeDiv\"></div><iframe id=\"editIframe\" src=\"\" width=\"100%\" height=\"100%\" border=\"0\" frameborder=\"0\" /><textarea id=\"editTextarea\"></textarea></div><div id=\"modeDiv\"><div></div><ul></ul></div></div>",
        "separator"     : "<li class=\"separator\"></li>",
        "conversionLi"  : "<li id=\"@ModeLi\" class=\"off\"></li>"
    },
    
    /* button */
    button : {
                "fontname"              : {"isIfrm" : "Y", "ifrmLeft" : "0",   "mouseUp" : "O",  "functionNm" : "openLayer"},
                "fontsize"              : {"isIfrm" : "Y", "ifrmLeft" : "0",   "mouseUp" : "O",  "functionNm" : "openLayer"},
                "redo"                  : {"isIfrm" : "N", "ifrmLeft" : "0",   "mouseUp" : "Y",  "functionNm" : "execute"},
                "undo"                  : {"isIfrm" : "N", "ifrmLeft" : "0",   "mouseUp" : "Y",  "functionNm" : "execute"},
                "copy"                  : {"isIfrm" : "N", "ifrmLeft" : "0",   "mouseUp" : "Y",  "functionNm" : "execute"},
                "cut"                   : {"isIfrm" : "N", "ifrmLeft" : "0",   "mouseUp" : "Y",  "functionNm" : "execute"},
                "paste"                 : {"isIfrm" : "N", "ifrmLeft" : "0",   "mouseUp" : "Y",  "functionNm" : "execute"},
                "newpage"               : {"isIfrm" : "N", "ifrmLeft" : "0",   "mouseUp" : "Y",  "functionNm" : "newpage"},
                "previewer"             : {"isIfrm" : "N", "ifrmLeft" : "0",   "mouseUp" : "Y",  "functionNm" : "previewer"},
                "print"                 : {"isIfrm" : "N", "ifrmLeft" : "0",   "mouseUp" : "Y",  "functionNm" : "print"},
                "forecolor"             : {"isIfrm" : "Y", "ifrmLeft" : "0",   "mouseUp" : "O",  "functionNm" : "openLayer"},
                "backcolor"             : {"isIfrm" : "Y", "ifrmLeft" : "0",   "mouseUp" : "O",  "functionNm" : "openLayer"},
                "bold"                  : {"isIfrm" : "N", "ifrmLeft" : "0",   "mouseUp" : "O",  "functionNm" : "execute"},
                "italic"                : {"isIfrm" : "N", "ifrmLeft" : "0",   "mouseUp" : "O",  "functionNm" : "execute"},
                "underline"             : {"isIfrm" : "N", "ifrmLeft" : "0",   "mouseUp" : "O",  "functionNm" : "execute"},
                "strikethrough"         : {"isIfrm" : "N", "ifrmLeft" : "0",   "mouseUp" : "O",  "functionNm" : "execute"},
                "table"                 : {"isIfrm" : "Y", "ifrmLeft" : "0",   "mouseUp" : "",   "functionNm" : "openLayer"},
                "fieldset"              : {"isIfrm" : "Y", "ifrmLeft" : "0",   "mouseUp" : "",   "functionNm" : "openLayer"},
                "hr"                    : {"isIfrm" : "Y", "ifrmLeft" : "0",   "mouseUp" : "",   "functionNm" : "openLayer"},
                "justifyleft"       	: {"isIfrm" : "N", "ifrmLeft" : "0",   "mouseUp" : "O",  "functionNm" : "execute"},
                "justifycenter"         : {"isIfrm" : "N", "ifrmLeft" : "0",   "mouseUp" : "O",  "functionNm" : "execute"},
                "justifyright"          : {"isIfrm" : "N", "ifrmLeft" : "0",   "mouseUp" : "O",  "functionNm" : "execute"},
                "justifyfull"           : {"isIfrm" : "N", "ifrmLeft" : "0",   "mouseUp" : "O",  "functionNm" : "execute"},
                "insertorderedlist"     : {"isIfrm" : "N", "ifrmLeft" : "0",   "mouseUp" : "O",  "functionNm" : "execute"},
                "insertunorderedlist"   : {"isIfrm" : "N", "ifrmLeft" : "0",   "mouseUp" : "O",  "functionNm" : "execute"},
                "indent"                : {"isIfrm" : "N", "ifrmLeft" : "0",   "mouseUp" : "Y",  "functionNm" : "execute"},
                "outdent"               : {"isIfrm" : "N", "ifrmLeft" : "0",   "mouseUp" : "Y",  "functionNm" : "execute"},
                "emoticon"              : {"isIfrm" : "Y", "ifrmLeft" : "0",   "mouseUp" : "",   "functionNm" : "openLayer"},
                "character"             : {"isIfrm" : "Y", "ifrmLeft" : "0",   "mouseUp" : "",   "functionNm" : "openLayer"},
                "link"                  : {"isIfrm" : "Y", "ifrmLeft" : "0",   "mouseUp" : "",   "functionNm" : "openLayer"},
                "urlimage"              : {"isIfrm" : "Y", "ifrmLeft" : "0",   "mouseUp" : "",   "functionNm" : "openLayer"},
                "image"                 : {"isIfrm" : "Y", "ifrmLeft" : "0",   "mouseUp" : "O",  "functionNm" : "uploadImage"}
    },
    
    /*###############################################################################
    ## editor initialize
    ###############################################################################*/
    
    /* editor 초기화 */
    initialize : function(target, config){
        
        // extend lang config
        $jq.each(WCEditorLang.baseConfig, function(key){
            wceditorBaseConfig[key] = this;
        });
        
        $jq.each(WCEditorLang.buttonTitle, function(key){
            WCEditor.button[key].title = this;
        });
        
        // extend user config
        WCEditor.config= $jq.extend(wceditorBaseConfig, config);
        target.hide();
        // create edit div
        $jq(this.template.init).insertBefore(target);
        
        if(this.config.width!="100%"){
            $jq("#editTextarea").css("width", this.config.width);
            $jq("#editerDiv").css("width", this.config.width);
        }
        
		if(this.config.height!="350px"){
		    $jq("#editTextarea").css("height", this.config.height);
		    $jq("#editDiv").css("height", this.config.height);
	    }
	    
        // object
        this.mode       = "init";
        this.target     = target;
        this.editer 	= $jq("#editerDiv");
        this.textEdit   = $jq("#editTextarea");
		this.edit 	    = $jq("#editIframe");
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
		$jq(this.editDoc)
		.bind("keydown", function(event) {
			WCEditor.checkKeyDown(event);
		})
		.bind("keyup", function(event) {
			WCEditor.checkKeyUp(event);
		})
		.bind("mouseup", function(event) {
			WCEditor.checkMouseUp(event);
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
                    $jq("#toolBarDiv > ul").append("<li id=\"" + id + "Li\" title=\"" + this.button[id].title + "\"><a href='#' id='fontnameA'><span id='fontnameSpan'>" + WCEditorLib.getFirsArrayData(this.config.fontFamily) + "</span></a></li>");
                }else if(this.config.toolbar[i][j]=="fontsize"){
                    $jq("#toolBarDiv > ul").append("<li id=\"" + id + "Li\" title=\"" + this.button[id].title + "\"><a href='#' id='fontsizeA' unselectable='on'>" + this.config.fontSize + "</a></li>");
                }else{
                    $jq("#toolBarDiv > ul").append("<li id=\"" + id + "Li\" title=\"" + this.button[id].title + "\"><img src='" + this.imageRoot + id + ".gif' unselectable='on'></li>");
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
            
            if(this.config.toolbar.length!=(i+1)) $jq("#toolBarDiv > ul").append(this.template.separator);
		}
        
        // button event
        $jq("#toolBarDiv > ul > li:not('.starter,.separator')")
		.bind("mouseover", function(event) {
			WCEditor.changeButton($jq(this), "over");
		})
		.bind("mouseout", function(event) {
			WCEditor.changeButton($jq(this), "out");
		})
		.bind("mousedown", function(event) {
			WCEditor.changeButton($jq(this), "down");
		})
		.bind("mouseup", function(event) {
		    if(WCEditor.button[$jq(this).attr("id").replace("Li", "")].mouseUp=="Y"){
			    WCEditor.changeButton($jq(this), "up");
		    }
		})
		.bind("click", function(event) {
		    var s = $jq(this).attr("id").replace("Li", "");
			eval("WCEditor." + WCEditor.button[s].functionNm + "('" + s + "')");
		});

        if($jq(this.target).val()!=""){
        	this.setContent($jq(this.target).val());
        }
        
        // conversion mode
        if(this.config.conversionMode.length==0){
            if(!this.config.resize) $jq("#modeDiv").hide();
        }else {
            // show mode
            this.config.conversionMode.reverse();
            $jq.each(this.config.conversionMode, function(){
                $jq("#modeDiv > ul").append(WCEditorLib.setParamValue(WCEditor.template.conversionLi, [this]));
            });
            
           $jq("#modeDiv > ul li").each(function(){
                if($jq(this).css("display")!="none"){
                    $jq(this).css("width", "60px");
                    return false;
                }
            });
            
            // conversion mode click event
            $jq("#modeDiv > ul li").click(function() {
                
                var mode = "";
                var skip = false;
                var id   = this.id;
                switch (id) {
                    case "editorModeLi":
                        if($jq("#editorModeLi").hasClass("off")){
                            $jq(WCEditor.textEdit).hide();
                            $jq(WCEditor.edit).show();
                            $jq("#toolBarBgDiv").hide();
                            if(WCEditor.mode=="html"){
                                $jq(WCEditor.editDoc.body).html($jq(WCEditor.editDoc.body).text());
                            }else if(WCEditor.mode=="text"){
                                $jq(WCEditor.editDoc.body).text($jq(WCEditor.textEdit).val());
                            }
                            mode = "editor";
                        }
                        break;
                    case "htmlModeLi":
                        if($jq("#htmlModeLi").hasClass("off")){
                            $jq(WCEditor.textEdit).hide();
                            $jq(WCEditor.edit).show();
                            $jq("#toolBarBgDiv").show();
                            if(WCEditor.mode=="editor"){
                                $jq(WCEditor.editDoc.body).text($jq(WCEditor.editDoc.body).html());
                            }else if(WCEditor.mode=="text"){
                                $jq(WCEditor.editDoc.body).text($jq(WCEditor.textEdit).val());
                            }
                            mode = "html";
                        }
                        break;
                    case "textModeLi":
                        if($jq("#textModeLi").hasClass("off")){
                            if(WCEditor.mode!="init"){
                                if(!confirm(WCEditorLib.getMessage("confirmChangeTextMode")))  skip = true;
                            }    
                            
                            if(!skip){     
                                $jq(WCEditor.textEdit).show();
                                $jq(WCEditor.edit).hide();
                                $jq("#toolBarBgDiv").show();
                                if(WCEditor.mode=="editor"){
                                    $jq(WCEditor.textEdit).val($jq(WCEditor.editDoc.body).text());
                                }else if(WCEditor.mode=="html"){
                                    $jq(WCEditor.editDoc.body).html($jq(WCEditor.editDoc.body).text());
                                    $jq(WCEditor.textEdit).val($jq(WCEditor.editDoc.body).text());
                                }
                                mode = "text";
                            }
                        }
      
                        break;
                    default:
                        break;
                }            
                
                if(!skip && mode!=""){
                    WCEditor.mode = mode;
                    $jq("#modeDiv > ul li").each(function(){
                        if($jq(this).css("display")!="none"){
                            if(this.id==id){
                                $jq(this).removeClass("off");
                                $jq(this).addClass("on");
                            }else{
                                $jq(this).removeClass("on");
                                $jq(this).addClass("off");
                            }
                        }
                    });
                }
                
            });
                              
            $jq("#" + this.config.defaultConversionMode + "ModeLi").click();
        }
        
        if(this.config.resize){
            $jq("#modeDiv > div").addClass("resize");
            
            $jq("#modeDiv > div").bind("mousedown", function(event) {
    			WCEditor.resizeStart(event);
    		});
        }
        
        // lang resize
        $jq.each(WCEditorLang.iframeResize, function(key){
            if(WCEditor.config.miniMode && WCEditorLang.iframeMiniResize[key]){
                // mini mode 유지
            }else{
                $jq("#" + key+"Frame").css({"width":this.width, "height":this.height});
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
		    $jq("#" + o+"Frame").hide();
    	    WCEditor.changeButton(o, "up");
		}
	},
	
    /* 내용 조회 */
	getContent : function(skip) {
	    if(typeof(skip)=="undefined") skip = false;
	    var str = "";
	    if(this.mode=="editor" || this.mode=="init"){
	        str = $jq(WCEditor.editDoc).find("body").html();
	    }else if(this.mode=="html"){
	        str = $jq(WCEditor.editDoc).find("body").text();
	    }else if(this.mode=="text"){
	        str = $jq(WCEditor.textEdit).val();
	    }
	     
	    if(this.mode!="text" && !skip && str==this.data["initTag"]) str="";
		return str;
	},
	
	/* 내용 설정 */
	setContent : function(s) {
		if(this.mode=="init"){
		    if(this.config.defaultConversionMode=="text"){
		        $jq(WCEditor.textEdit).val(s);
		    }else if(this.config.defaultConversionMode=="html"){
		        $jq(WCEditor.editDoc.body).text(s);
		    }else if(this.config.defaultConversionMode=="editor"){
		        $jq(WCEditor.editDoc.body).html(s);
		    }
		}else{
		    $jq(WCEditor.editDoc.body).html(s);
		}
	},
	
	/* 작성된 내용이 있는지 여부 */
	hasContent : function() {
		return this.getContent(false)!="";
	},
	
	/* 내용 저장 */
	saveContent : function(skip) {
		$jq(this.target).val(this.getContent(skip));
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
        if(WCEditorLib.hasDataInKey("keycode", e.keyCode)) WCEditor.checkNode(e);
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
	    WCEditor.closeLayers();
	    WCEditor.checkNode(e);
	    WCEditor.initLayerButonStyle();
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
        var a = WCEditorLib.getArrayData("align");
	    var b = true;
	    for(var i=0;i<a.length;i++){
	        if($jq("#" + a[i] + "Li").length>0){
	            if($jq("#" + a[i] + "Li").hasClass("down")){
	                b = false;
	                break;
	            }
	        }      
	    }

	    if(b && $jq("#justifyleftLi").length>0) this.changeButton("justifyleft", "down");
	   
	},
	
	/* button iframe x좌표 고정 */
	fixIfrmLeft : function(s){
	    
	    /*!!! 한두개 수정시는 WCEditor.button.forecolr.ifrmLeft="28px"로 아래처럼 선언하지 말고 직접 변경을 권장함 */
	    var pos = {
	        "approval.form" :    {"forecolor" : "28px", "backcolor" : "56px", "character" : "78px", "link" : "80px"},
	        "approval.textbox" : {"fontsize" : "4px", "forecolor" : "20px", "backcolor" : "44px", "character" : "158px", "link" : "143px", "urlimage" : "178px"}
	    };
	    
	    $jq.each(pos[s], function(key){
            WCEditor.button[key].ifrmLeft = this;
        });
	},
	
    /*###############################################################################
    ## button action
    ###############################################################################*/
    
    /* execCommand 실행 */
	execute : function(cmd, opt) {
        if(!WCEditorLib.hasValue(opt)) opt = null;
        this.editCw.focus();
        
		this.editDoc.execCommand(cmd, false, opt);
		this.closeLayers();
		
        if(WCEditorLib.hasDataInKey("align", cmd)){
	        var a = WCEditorLib.getArrayData("align");
	        for(var i=0;i<a.length;i++){this.changeButton(a[i], "up");}
	        this.changeButton(cmd, "down");
	    }
	},
    
    /* 레이어 열기 */
	openLayer : function (s){
		var $o = $jq("#" + s + "Frame");
		
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
	    $jq("#editerDiv iframe.buttonIframe").hide();
	},
	
	/* 이미지 업로드 */
	uploadImage : function(){
	    this.saveRange();
	    this.closeLayers();
	    this.initLayerButonStyle();

	    iKEP.showDialog({
    	    title : "image upload",
    	    url : iKEP.getContextRoot() + "/support/fileupload/uploadFormForEditor.do?targetId=wceditor&" + $jq("#editorFileUploadParameter").serialize(),
    	    modal : true,
    	    resizable: false, 
    	    width : 600,
    	    height : 185,
    	    callback : function(result) {	//fileId, fileName, targetId
    	    	var fileId = result.fileId, targetId = result.targetId;
    	    	WCEditor.setHtml("<img name='editorImage' id='"+ fileId +"' src='" + iKEP.getWebAppPath() + "/support/fileupload/downloadFile.do?fileId=" + fileId + "'/>", "image");
    	    },
    	    scroll : "no" 
    	}); 
	},
	
	/* 새글 작성 */
	newpage : function() {
		this.closeLayers();

		if(this.getContent()!=""){
		    if(!confirm(WCEditorLib.getMessage("newpage"))) return;
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
	    
	    if(this.config.miniMode && WCEditorLang.iframeMiniResize[s]){
            $jq("#" + s+"Frame").css({"width":WCEditorLang.iframeMiniResize[s].width, "height":WCEditorLang.iframeMiniResize[s].height});
	    }

        // left 값지정 - hidden 페이지에 만들어진 에디터는 position().left 값을 구할수 없어 절대 위치값을 주어야함(ex : approval의 폼항목 선택)
        if(parseInt(this.button[s].ifrmLeft)!=0){
            $jq("#" + s + "Frame").css("left", parseInt(this.button[s].ifrmLeft) + "px");
            return;
        }

        var ewidth = $jq("#editDiv").width();
		var sleft  = $jq("#" + s + "Li").position().left;
		var swidth = parseInt($jq("#" + s + "Frame").css("width"));
		var sfloor = Math.floor(parseInt($jq("#" + s + "Frame").css("width"))/2);
		
		if(ewidth<sleft+swidth){
		    if(ewidth>sleft+sfloor){
		        sleft = sleft-sfloor;
		    }else{
		        sleft = sleft-swidth+23;
		    }
		}else if(sleft>sfloor){
		    sleft -= sfloor;    
		}

		$jq("#" + s + "Frame").css("left", sleft + "px");
		
	},
	
    /* 버튼 효과(mouse) */
	changeButton : function(t, m, p){
	    if(typeof(t) =="string") t = $jq("#" + t + "Li");
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
	            $jq("#forecolorLi").css("background-color", o.style.color);
	        }else if(o.style.backgroundColor!="" && !this.isAffectedFontStyle("backcolor")){
	            $jq("#backcolorLi").css("background-color", o.style.backgroundColor);
	        }else if(o.style.fontFamily!="" && !this.isAffectedFontStyle("fontname")){
	            $jq("#backcolorLi").css("background-color", o.style.backgroundColor);
	            $jq("#fontnameSpan").html(WCEditorLib.getFirsArrayData(o.style.fontFamily).replaceAll("'", ""));
	        }else if(o.style.fontSize!="" && !this.isAffectedFontStyle("fontsize")){
	            $jq("#fontsizeA").html(o.style.fontSize);
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
	        
	        WCEditor.rowIndex = -1;
	        WCEditor.cellIndex = -1;
	        
	        $jq(o).find("tr").one("mousemove", function(event) {
	            if(WCEditor.rowIndex==-1){
	                WCEditor.rowIndex = this.rowIndex;
	                //console.log(this.rowIndex);
	            }
	        });
	        
	        $jq(o).find("td").one("mousemove", function(event) {
	            if(WCEditor.cellIndex==-1){
	                WCEditor.cellIndex = this.cellIndex;
	                //console.log(this.cellIndex);
	            }
	        });
	        
	        $jq("#tableConfigFrame").css({"left" : e.clientX + "px", "top" : e.clientY + "px"});
	        $jq("#tableConfigFrame").show();
	        */
	    }

	},
	
	/* 레이어 버튼 모드 초기화 */
	initLayerButonStyle : function(s){
	    if(!WCEditorLib.hasValue(s)) s == "";
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
                
                if(WCEditor.button[id].mouseUp=="O") {
        	        if(id == "forecolor"){
        	            if(!($jq("#" + id + "Li").css("background-color")=="" || $jq("#" + id + "Li").css("background-color")=="#000000")) {
        	                $jq("#" + id + "Li").css("background-color", "#000000");
        	            }
        	        }else if(id == "backcolor"){
        	            if(!($jq("#" + id + "Li").css("background-color")=="" || $jq("#" + id + "Li").css("background-color")=="#ffffff")) {
        	               $jq("#" + id + "Li").css("background-color", "#ffffff");
        	            }
        	        }else if(id == "fontname"){
        	            if(!($jq("#fontnameSpan").html()=="" || $jq("#" + id + "Li").html()==WCEditorLib.getFirsArrayData(this.config.fontFamily))) {
        	                $jq("#fontnameSpan").html(WCEditorLib.getFirsArrayData(this.config.fontFamily));
        	            }
        	        }else if(id == "fontsize"){
        	            if(!($jq("#fontsizeA").html()=="" || $jq("#fontsizeA").html()==this.config.fontSize)) {
        	                $jq("#fontsizeA").html(String(this.config.fontSize));
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
    	        p.pasteHTML("<font style=\""+ js2css[m] + ":" + o + "\"><span id='WCEditorRange1'></span>&nbsp;<span id='WCEditorRange2'></span></font>");
    	        var tmp1 = this.editDoc.getElementById("WCEditorRange1");
    		    var tmp2 = this.editDoc.getElementById("WCEditorRange2");
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
	            var a = WCEditorLib.getArrayData("ffCheck");
	    	    for(var i=0;i<a.length;i++){
	    	        if($jq("#" + a[i] + "Li").length>0){
	    	            if($jq("#" + a[i] + "Li").hasClass("down")){
	    	            	this.execute(a[i]);
	    	            }
	    	        }      
	    	    }
	    	    
	        }
        }
	    
	    if(m=="fontname") {
            $jq("#fontnameSpan").html(WCEditorLib.getFirsArrayData(o).replaceAll("'", ""));
        }else if(m=="fontsize"){
            $jq("#fontsizeA").html(o);
        }else if(m=="forecolor"){
            $jq("#forecolorLi").css("background-color", o);
        }else if(m=="backcolor"){
            $jq("#backcolorLi").css("background-color", o);
        }
        
        this.changeButton(m, "up");
	},
	
	/* change font */
	changeFontAttr : function(t, s, v) {
		$jq(WCEditor.editDoc).find("body font[" + t + "]").each(function(){
			if(this[t]==v || (t=="size" && this[t]=="1")){
				$jq(this).removeAttr(t).css(s, v);
				$jq(this).find("font[style*='" + s + "']").css(s, v);
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
				else            str	+= "parent.WCEditor.setFont('" + m + "', '" + colortone[j][i] + "');return false;\">";
				str += "<img src='" + this.imageRoot + "blank.gif' border='0' width='" + (w-2) + "' height='" + h + "' align='absmiddle'></a>";
				str += "</td></tr></table></td>";
			}   
			str += "</tr>";
		}       
		
		return (str+"</table>");
	},
	
	/* 리사이즈 */
	resizeStart : function(e){
    	if(WCEditor.resizeY==0) WCEditor.resizeY=e.clientY+$jq(document).scrollTop();
    	$jq(document)
        .bind("mousemove", function(event) {
            if(WCEditor.mode!="text"){
                $jq("#editIframe").hide();
                $jq("#resizeDiv").show();
            }
            WCEditor.resizeMove(event);
        })
        .bind("mouseup", function(event) {
            WCEditor.resizeStop();
            if(WCEditor.mode!="text"){
                $jq("#editIframe").show();
                $jq("#resizeDiv").hide();
            }
        });
    	
	},
	
	resizeMove : function(e){
        var _h = e.clientY + $jq(document).scrollTop() - WCEditor.resizeY + parseInt(WCEditor.config.height);
		if(_h<parseInt(parseInt(WCEditor.config.minResizHeight))) return;
		$jq("#editDiv").css("height", _h + "px");
	},
	
	resizeStop : function (){
		$jq(document).unbind("mousemove").unbind("mouseup");
	}
};   


var WCEditorLib = {
    
    /* get message */
    getMessage : function(s){
        return WCEditorLang.message[s];
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
    getFirsArrayData : function(s, p){
        if(!this.hasValue(p)) p = ",";
        var a = s.split(p);
        return $jq.trim(a[0]);
    },
    
    /* Data 추출 */
    getArrayData : function(){
        return (WCEditor.data[arguments[0]]).split(";");
    },
    
    /* 키 포함여부 */
    hasDataInKey : function(s, k){
        var a = WCEditorLib.getArrayData(s);
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