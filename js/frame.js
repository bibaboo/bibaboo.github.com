/***
===============================================================================================
* 기능 설명 : 레이아웃 관리
===============================================================================================
*/

var resizerLeft,
	preventTriggerHashChange;

(function($){
	/* 공통 설정 정보 */
	var pageSetting = {
		resizeWidth : {
			sidebar : "15%",
			content : "85%"
		},
		autoData : [],
		//자식노드 기본정보
		leafData : {
			children : false, 
			icon : false
		},
		//트리노드 액션 타입
		moduleDataType :{
			load : "load",
			blank : "blank",
			link : "link",
			iframe : "iframe"
		}
    };
	
	/* 모듈 정보 */
	var moduleData = [
	    {
       	   	text : "home",
    		icon : "../images/tree-icon.png",
    		data : {
    			folder : "/view/",
        		type : pageSetting.moduleDataType.load
    		}
    	},
    	
    	{
       	   	text : "wjquery",
    		data : {
    			folder : "/view/wjquery/",
        		type : pageSetting.moduleDataType.load
    		},
    		nodes : [
				{
					text : "$.extend",
					a_attr:{title: "wjquery extend 함수"},
					data : {
		    			folder : "/view/wjquery/extend/"
		    		},
					nodes : [
					    {text : "$.hasString()", a_attr:{title: "value에 findStr이 있는지 비교"}},
					    {text : "$.hasValue()", a_attr:{title: "value에 값이 있는지 여부"}},
					    {text : "$.isFalse()", a_attr:{title: "false 여부"}},
					    {text : "$.isTrue()", a_attr:{title: "true 여부"}},
					    {text : "$.pad()", a_attr:{title: "채우기"}},
					    {text : "$.nvl()", a_attr:{title: "value에 값이 없을시 replaceString로 대체"}},
					    {text : "$.replace()", a_attr:{title: "문자열 바꾸기"}}
					]
				},
				{
					text : "$.fn.extend",
					a_attr:{title: "wjquery fn.extend 함수"},
					data : {
		    			folder : "/view/wjquery/fn_extend/"
		    		},
					nodes : [
					    {text : ".changeClass()", a_attr:{title: "조건에 따른 클래스 변경"}},
						{text : ".isObject()", a_attr:{title: "개체 존재여부"}},
						{text : ".outerHtml()", a_attr:{title: "자기 자신을 포함한 HTML"}},
						{text : ".scrollIntoView()", a_attr:{title: "해당 개체로 스크롤 이동"}},
						{text : ".wScrollTop()", a_attr:{title: "상위로 이동"}},
						{text : ".autoGrowTextarea()", a_attr:{title: "textarea 자동 높이 조절"}},
						{text : ".stripHref()", a_attr:{title: "a, area 링크, 클릭 동작 제어"}}
					]
				},
				{
					text : "js.lang",
					a_attr:{title: "문자 관련 공통함수"},
					data : {
		    			folder : "/view/wjquery/js_lang/"
		    		},
					nodes : [
					    {text : "addComma()", a_attr:{title: "3자리마다 콤마추가"}},
					    {text : "cutString()", a_attr:{title: "문자열 자르기"}},
					    {text : "randomCode()", a_attr:{title: "랜덤 문자열생성"}},
					    {text : "initCap()", a_attr:{title: "첫문자를 대문자로변환"}},
					    {text : "getFirstValue()", a_attr:{title: "구분자 이전 문자열을 리턴"}},
					    {text : "getLastValue()", a_attr:{title: "구분자 이후 문자열을 리턴"}},
					    {text : "mappingValue()", a_attr:{title: "문자열 매핑"}}
					]
				},
				{
					text : "js.date",
					a_attr:{title: "날자 관련 공통함수"},
					data : {
		    			folder : "/view/wjquery/js_lang/"
		    		},
					nodes : [
					]
				},
				{
					text : "js.expr",
					a_attr:{title: "정규식 관련 공통함수"},
					data : {
		    			folder : "/view/wjquery/js_expr/"
		    		},
					nodes : [
					    {text : "getPattern()", a_attr:{title: "패턴에 매칭되는 값을 리턴"}},
					    {text : "getPatternArray()", a_attr:{title: "패턴에 맞는 문자열만 추출"}},
					    {text : "isPattern()", a_attr:{title: "패턴 여부"}},
					    {text : "replaceString()", a_attr:{title: "문자열 변환"}}
					]
				},
				{
					text : "js.ui",
					a_attr:{title: "UI 관련 공통함수"},
					data : {
		    			folder : "/view/wjquery/js_ui/"
		    		},
					nodes : [
					    {text : "dropDown()", a_attr:{title: "hover 메뉴"}},
					]
				},
				{
					text : "js.form",
					a_attr:{title: "폼 관련 공통함수"},
					data : {
		    			folder : "/view/wjquery/js_form/"
		    		},
					nodes : [
					]
				},
				{
					text : "js.event",
					a_attr:{title: "이벤트 관련 공통함수"},
					data : {
		    			folder : "/view/wjquery/js_event/"
		    		},
					nodes : [
					    {text : "delayFunction", a_attr:{title: "함수 실행 시간 지연"}},
					]
				},
				{
					text : "js.object",
					a_attr:{title: "공통객체 관련 공통함수"},
					data : {
		    			folder : "/view/wjquery/js_object/"
		    		},
					nodes : [
					    {text : "base62", a_attr:{title: "base62로 변환"}},
					    {text : "stopWatch", a_attr:{title: "실행시간 구하기"}},
					    {text : "wJson", a_attr:{title: "JSON util"}},
					    {text : "lStorage", a_attr:{title: "localStorage 제어"}},
					    {text : "sStorage", a_attr:{title: "sessionStorage 제어"}}
					]
				}
	    	]
    	},
    	
    	{
    		text : "plugin", 
    		data : {
    			folder : "/view/plugin/",
        		type : pageSetting.moduleDataType.load
    		},
    		nodes : [
    		    {text : "jquery.ui", id : "jqueryUi", a_attr:{title: "jquery.ui 정리"}},
				{text : "jquery.ui.datepicker", id : "datepicker", a_attr:{title: "jquery.ui.datepicker 정리"}},
				{text : "jquery.tmpl", id : "tmpl", a_attr:{title: "jquery.tmpl 정리"}},
				{text : "moment", a_attr:{title: "momnet 정리"}},
				{text : "jquery.transit", id : "transit", a_attr:{title: "transit 정리"}},
				{text : "wjquery.layer", id : "wlayer", a_attr:{title: "wjquery.layer"}},
				{text : "wjquery.form", id : "wform", a_attr:{title: "wjquery.form"}}
    		]
    	},
    	
    	{
    		text : "note",
    		data : {
    			folder : "/view/note/",
        		type : pageSetting.moduleDataType.load
    		},
    		nodes : [
				{
					text : "javascript",
					data : {
		    			folder : "/view/note/javascript/"
		    		},
					nodes : [
					    {text : "배열 객체", id : "array", a_attr:{title: "배열 정의, 함수 정리"}},
					    {text : "Math 객체", id : "math", a_attr:{title: "Math 함수"}},
					    {text : "location 객체", id : "location", a_attr:{title: "location 정리"}},
					    {text : "함수 리터럴", id : "functionLteral", a_attr:{title: "이름 없이 몸체만 있는 함수"}},
					    {text : "객체 리터럴", id : "objectLiteral", a_attr:{title: "아무 것도 없거나 하나 이상의 이름/값 쌍들을 둘러싸는 중괄호"}}
					]
				},
				{
					text : "jquery",
					data : {
		    			folder : "/view/note/jquery/"
		    		},
					nodes : [
					   	{text : "플러그인 패턴", id : "pluginPattern"}
					]
				},
				{
					text : "style & html",
					data : {
		    			folder : "/view/jquery/styleNhtml/"
		    		},
					nodes : [
					]
				}
    		]
    	},
    	
    	{
    		text : "project", 
    		data : {
    			folder : "/view/project/",
        		type : pageSetting.moduleDataType.load
    		},
    		nodes : [
				{text : "wjquery.mpicker", id : "mpicker", a_attr:{title: "wjquery.mpicker"}, data : {type : pageSetting.moduleDataType.blank, page : "mPicker/index.html"}}
  	    	]
    	}
    ];

    $(document).ready(function () {
    	//템플릿 적용
    	$("body").append($.tmpl(COMMON_TMPL.layout));
    	//hash change
    	$(window).bind('hashchange', function(event) {
    		if(preventTriggerHashChange){
    			preventTriggerHashChange = false;
    		}else{
    			openNode(document.location.hash);
    		}
		});
    	
    	$("div.content-body>.setting").buttonset().find("input:radio").click(function(){
    		toggleAccordian($(this));
    	});
    	
    	$("#searchWord").autocomplete({
    		 source: pageSetting.autoData,
    		 select: function(event, ui ) {
    			 openNode("#" + ui.item.id);
    		 }
	    });
    	
    	//리사이즈 이벤트
    	resizeLayout();
    	setResizer();
    	$(window).resize(function() {
    		resizeLayout();
    	});
    	
    	//iframe resize
    	$('#content-iframe').load(function() {
    		$(this).css("height", $(this).contents().find("body").height() + "px");
    		resizeLayout();
    	});
    	
    	//resizer
    	$("#resizer").draggable({ axis: "x", containment: "#wapper", opacity:0.35,scroll: false, stop : function(){
    		var before = parseInt(resizerLeft, 10),
    			after = parseInt($("#resizer").css("left"), 10);
    		
    		$("#searchWord").toggle(after>180);
    		$("#sidebar").width(after);
    		$("#content").width($("#content").width()+(before-after));
    		resizerLeft = $("#resizer").css("left");
    	}});
    	
    	//맨위로 버튼
    	$("#content>div.content-body").wScrollTop($("#btn-top"));
    	
    	//컨텐츠 헤더
    	$("#content>div.content-header>ul").on("click", "a", function(){
    		event.preventDefault();
    		var index = $("#content>div.content-header>ul>li").index($(this).parent());
    		$("#entry>ul.entry-api>li").eq(index).scrollIntoView($("#content>div.content-body"));
    	});
    	
    	$("#sidebar>.sidebar-head>a").click(
			function(){
				$("#sidebar").transition({rotateY: '180deg'}).transition({rotateY: '360deg'});
			}
		);
    	
    	$("#spacer").click(
			function(){
				$("#spacer").hide();
				$("#sidebar,#resizer").show();
				$("#content").width("85%");
			}
		).hover(function(){$(this).css("background-color", "#ddd");}, function(){$(this).css("background-color", "#eee");});
    	
		$("#sidebar>.sidebar-head>ul>li").click(
			function(){
				if($(this).find("span").hasClass("ui-icon-seek-first")){
					$("#sidebar,#resizer").hide();
					$("#content").width("100%");
					$("#spacer").show();
				}else if($(this).find("span").hasClass("ui-icon-plusthick")){
					$("#menuTree").jstree('open_all');
				}else if($(this).find("span").hasClass("ui-icon-minusthick")){
					$("#menuTree").jstree('close_all');
				}
				
			}
		).hover(function(){$(this).addClass("ui-state-hover");}, function(){$(this).removeClass("ui-state-hover");});

	    //트리
    	var data = $.map(moduleData, function(module){
    		if(module.nodes){
    			module.children = $.map(module.nodes, function(node){
    				if(!node.id) node.id = getPatternString("alphaNum", node.text);
    				if(!node.a_attr) node.a_attr = {title:node.text};
    				pageSetting.autoData.push({label:node.text, id:node.id});
    				if(node.nodes){
    					if(!node.data && module.data){
    						node.data = module.data;
    					}else if(node.data && module.data){
    						node.data = $.extend({}, module.data, node.data);
    					}
    					node.children = $.map(node.nodes, function(_node){
    	    				if(!_node.id) _node.id = getPatternString("alphaNum", _node.text);
    	    				if(!_node.a_attr) _node.a_attr = {title:_node.text};
    	    				pageSetting.autoData.push({label:_node.text, id:_node.id});
    	    				return $.extend({}, pageSetting.leafData, _node);
    	        		});
    					node.children.sort(function(a, b){
    						return a.text<b.text?-1:(a.text>b.text)?1:0;});
    					return node;
    				}else{
    					return $.extend({}, pageSetting.leafData, node);
    				}
        		});
    			delete module.nodes;
    			module.children.sort(function(a, b){a.text<b.text?-1:(a.text>b.text)?1:0;});
    		}else{
    			module.children = false;
    		}
    		if(!module.id) module.id = getPatternString("alphaNum", module.text);
    		if(!module.a_attr) module.a_attr = {title: module.text};
    		pageSetting.autoData.push({label:module.text, id:module.id});
    		return module;
    	});
    	
    	$("#menuTree")
		.jstree({
			"core" : {
				data : data,
				multiple : false,
			}
			//,"plugins" : ["sort"]
		})
		.one("loaded.jstree", function (event, data) {
			if(document.location.hash && $("#menuTree").jstree(true).get_node(document.location.hash)){
				openNode(document.location.hash);
			}else{
				goHome();
			}
		})
		.on("changed.jstree", function (e, data) {
			if(!data.node) return;
			LAYOUT_CONFIG.node = "";
			
			$("div.content-body>.setting").addClass("none");
			
			var node = data.node,
				$tree = $("#menuTree").jstree(true);
			
			if($tree.is_leaf(node) && (node.id=="home" || !node.icon)){
				var pnode = node.parent=="#"?{data:node.data}:$tree.get_node(node.parent),
					url = node.data && node.data.page?node.data.page:node.id + ".html";
					type = node.data && node.data.type?node.data.type:pnode.data.type;
					accordion = node.data && node.data.accordion?node.data.accordion:pnode.data.accordion?pnode.data.accordion:true;
					
				if(type!="iframe" && $("#content-iframe").is(":visible")){
					$("#content-iframe").hide().siblings().show();
				}
				
				if(!$.hasString(url, "http")){
					url = pnode.data.folder + url;
				}
				
				if(accordion) $("#accordian1").click();
				
				switch (type){
					case pageSetting.moduleDataType.blank :
						window.open(url);
						break;
					case pageSetting.moduleDataType.link :  
						location.href = url;
						break;
					case pageSetting.moduleDataType.iframe :
						if($("#content-iframe").is(":visible")){
							$("#content-iframe").attr("src", url);
						}else{
							$("#entry").empty().prev().empty();
							$("#content>div.content-header>ul").empty();
							$("#content-iframe").attr("src", url).show().siblings().hide();
						}
						setHash(node.id, true);
						break;
					case pageSetting.moduleDataType.load :
						$("#btn-top").click();

						if(pnode.data.loading) $("#back-white").show();
						$.get(url, function(html) {
							$("#entry").html(html).prev().html(node.text);
							$("#entry>div.entry-summary").prepend(node.a_attr.title);
							$( "input[type=button]").button().addClass("mtb10");
							
							//make content-header
							var _n = 0;
							var $ul = $("#content>div.content-header>ul").empty();
							$("ul.entry-api>li>h2>span.title").each(function(){
								$ul.append($.tmpl(COMMON_TMPL.headerLi, {text:$(this).text()}));
								_n++;
							});
							
							if(accordion && _n>1){
								$("div.content-body>.setting").removeClass("none");
							}
							
							_n = 0;
							$("div.entry-demo-content").each(function(){
								$(this).siblings(".entry-demo-source-content").find("pre").html(replaceString("htmlEscape", $(this).html()));
								_n++;
							});
							
							setHash(node.id, true);
							if($("div.entry-source-content").isObject() || _n>0){
								SyntaxHighlighter.highlight();
							}
							
							$("div.entry-source-title, div.entry-demo-title").find("a").click(function(){
								$(this).find("span").changeClass("ui-icon-circle-triangle-s", "ui-icon-circle-triangle-n").hasClass("ui-icon-circle-triangle-s");
								$(this).parent().next().slideToggle();
							});
						}, "html")
						.fail(function(response, status, xhr){
    	                    try{
    	                    	if(status == "error") {
    	                    		$("#entry").empty().prev().html(node.text);
    								$("#content>div.content-header>ul").empty();
    								$("#entry").html(COMMON_TMPL.pageNotFound);
    	                    		$.wLog(xhr);
    	                    	}
    	                    }catch(e){
    	                    	$.wLog(e);
    	                    }
    	                })
    	                .always(function(){
    	                	if(pnode.data.loading) setTimeout(function(){$("#back-white").hide();}, 100);
    	                });
						break;
					default:
						return;
				}
			}else{
				$tree[$tree.is_open(node)?"close_node":"open_node"](node);
				if(LAYOUT_CONFIG.node != node.id){
					drawLeafNode(node);
				}
			}
		});
    });    
})(jQuery);

function resizeLayout(){
	if($("#sidebar").is(":visible")){
		$("#sidebar>div.sidebar-body, #content>div.content-body").height($(window).height()-LAYOUT_CONFIG.contentHeaderHeight);
		$("#sidebar").width("15%");
		$("#content").width("85%");
		setResizer();
	}
}

function setResizer(){
	$("#resizer").css("left", $("#sidebar").width());
	resizerLeft = $("#resizer").css("left");
}

function setHash(hash, b){
	hash = "#" + hash;
	if(hash != document.location.hash){
    	if(b){
    		preventTriggerHashChange = true;
    	}
    	document.location.hash = hash;
	}
}

function drawLeafNode(node){
	$("#entry").html(COMMON_TMPL.entryApi).prev().html(node.text);
	var $ul = $("#content>div.content-header>ul").empty();
	$.each($("#menuTree").jstree(true).get_children_dom(node), function(){
		var _node = $("#menuTree").jstree(true).get_node(this);
		$(".entry-api", "#entry").append($.tmpl(COMMON_TMPL.entryApiItem, {id:_node.id, text:_node.text, title:_node.a_attr.title||_node.text}));
		$ul.append($.tmpl(COMMON_TMPL.headerLi, {text:_node.text}));
		//console.log($("#menuTree").jstree(true).get_node(this));
	});
	
	LAYOUT_CONFIG.node = node.id;
}

function openNode(hash){
	//$("#menuTree").jstree(true).close_all();
	$("#menuTree").jstree(true).deselect_all(true);
	$("#menuTree").jstree(true).select_node(hash);
}

function goHome(){
	openNode("#home");
}

function toggleAccordian($t){
	var $c = $("ul.entry-api");
	if($t.attr("id")=="accordian1"){
		if($c.accordion( "instance")){
			$c.accordion("destroy");
		}
	}else if($t.attr("id")=="accordian2"){
		$c.accordion({heightStyle: "content"});
	}
}

