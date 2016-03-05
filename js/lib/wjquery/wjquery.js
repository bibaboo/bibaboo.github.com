﻿/**
 * wjquery 0.0.3
 * by composite (wonchu.net@gmail.com)
 * http://www.wonchu.net
 * This project licensed under a MIT License.
**/

var dropDownTimeout;

;(function($){
    $.extend({
    	/**
         * value에 findString이 있는지 여부
         * @param value 문자열
         * @param target 찾는 문자열
         * @return Boolean
         **/
        hasString : function(value, findString){
        	return !!~value.indexOf(findString);
        },
        
        /**
         * value에 값이 있는지 비교
         * @param value 문자열
         * @return Boolean
         **/
        hasValue: function(value) {
        	try{
	        	switch (typeof(value)) {
	        	case "undefined" :
	        	case "null" :
	        		return false;
	            }
	            if($.trim(value) == "") {
	                return false;
	            }
	            return true;
        	}catch(e){
        		return false;
        	}
        },
        
        /**
         * true 여부
         * @param value 비교값
         * @return Boolean
         **/
        isTrue: function (value) {
            return typeof(value) !== "undefined" && value === true;
        },

        /**
         * false 여부
         * @param value 비교값
         * @return Boolean
         **/
        isFalse: function (value) {
            return typeof(value) !== "undefined" && value === false;
        },
        
        /**
         * value에 값이 없을시 replaceString로 대체
         * @param value 문자열
         * @param replaceString 대체 문자
         * @return String
         **/
        nvl : function(value, replaceString){
        	 return $.hasValue(value)?value:replaceString||"";
        },
        
        /**
         * 문자열 채우기
         * @param value 문자열
         * @param len 길이
         * @param addStr 채울 문자
         * @param isLeft 왼쪽 채우기여부
         * @return String
         */
        pad : function(value, len, addStr, isLeft){
        	if(typeof addStr === "boolean") {
        		isLeft = addStr;
        		addStr = "0";
        	}
        	if($.isFalse(isLeft)){
        		while(len > value.length) {value += (addStr||"0");}
        	}else{
        		while(len > value.length) {value = (addStr||"0") + value;}
        	}
            return value;
        },
        
        /**
         * 문자열 바꾸기
         * @param value 원본 문자열
         * @param findString 대상 문자열
         * @param replaceString 대체 문자열
         * @param option gi
         * @return String
         */
        replace : function(value, findString, replaceString, flag) {
            return value.replace(new RegExp(findString, (flag||"g")), replaceString);
        },
        
        /**
         * 로그 출력
         * @param v 대상값
         * @return boolean
         **/
        wLog: function (tag, value) {
        	if(!value){
        		value = tag;
        		tag = "log";
        	}
        	if(window.console){
        		console.log("\n=====" + tag + "=====\n" + ($.isPlainObject(value)||$.isArray(value)?JSON.stringify(value):value) + "\n====================");
        	}else{
        		alert("=====" + tag + "=====\n" + ($.isPlainObject(value)||$.isArray(value)?JSON.stringify(value):value));	
        	}
        },
        
        /**
         * alert
         * @param message 메시지
         * @param title 제목
         * @param modal 모달여부
         */
        alert : function(message, title, modal, buttonText){
        	var _title = "알림",
        		_buttonText = "닫기";
        		
        	if($("#dialog-message").isObject(true)){
        		if(typeof(title)==="boolean"){
        			modal = title;
        			title = _title;
        		}
        		
        		if(!$.hasValue(title)){
        			title = _title;
        		}
        		
        		if(!$.hasValue(buttonText)){
        			buttonText = _buttonText;
        		}
        		
        		if(typeof(modal)!=="boolean"){
        			modal = true;
        		}
        		
        		$("#dialog-message>p").empty().html(String(message));
        		$("#dialog-message").dialog({
    				modal: modal,
    				title : title,
    				buttons: [{
    					text : buttonText,
    					click : function() {
    						$(this).dialog( "close" );
    					}
    				}]
        	    });
        	}else{
        		alert(message);
        	}
        }
	});
    
    $.fn.extend({
    	
    	/**
         * 개체 존재여부
         * @param state 개체의 길이지가 한개일 경우 여부
         * @return Boolean
         **/
		isObject : function(state){
			return $.isFalse(state)?this.length==1:this.length>0;
        },
        
        /**
         * 클래스 변경
         * @param className1 클래스1
         * @param className2 클래스2
         * @param state class1 삭제/추가 클래스가 될지 여부(default:true)
         * @return this
         **/
        changeClass : function(className1, className2, state){
        	if(typeof(state)==="boolean"){
	        	if(state){
	        		this.removeClass(className1).addClass(className2);
	        	}else{
	        		this.removeClass(className2).addClass(className1);
	        	}
        	}else{
        		if(this.hasClass(className1)){
        			this.removeClass(className1).addClass(className2);
        		}else if(this.hasClass(className2)){
            		this.removeClass(className2).addClass(className1);
        		}
        	}
        	return this;
        },
        
        /**
         * 스크롤 이동
         * @param container 부분스크롤시 컨테이너
         * @param duration 애니메이션 사용시 밀리세컨드
         * @return this
         **/
		scrollIntoView : function(container, duration ){
			//this.get(0).scrollIntoView(false);
			if(typeof container === "object"){
				container.animate({scrollTop:container.scrollTop() + this.offset().top - container.offset().top}, duration||500);
			}else{
				$("html,body").animate({scrollTop:this.offset().top}, container||500);
			}
			return this;
        },
        
        /**
         * 맨위로 이동
         * @param target 탑 버튼
         * @param duration 설정 데이터
         * @return this
         **/
		wScrollTop : function(target, options){
			var _option = $.extend({offset : 100, duration : 500}, options||{});
			this.scroll(function() {  
		        if($(this).scrollTop() > _option.offset) {  
		        	target.fadeIn();  
		        } else {  
		        	target.fadeOut();  
		        }  
		    });
			
			target.on("click", $.proxy(function(event){
				event.preventDefault();
				if($.isWindow(this[0])){
					$("html, body").animate({ scrollTop: 0}, _option.duration);
				}else{
					this.animate({ scrollTop: 0}, _option.duration);
				}
			}, this));
			return this;
        },
        
        /**
         * textarea 자동 높이 조절
         */
        autoGrowTextarea : function() {
        	return this.each(function() {
        		var $t = $(this),
        			$m = $("<div class=\"autogrow-textarea-mirror\"></div>");
        		if($t.prop("tagName").toLowerCase() == "textarea"){
        			$m.css({
        				"display":"none",
        				"word-wrap":"break-word",
        				"white-space":"normal",
        				"padding":$(this).css('padding'),
        				"width":$(this).css('width'),
        				"line-height":$(this).css('line-height')
        			});
        			
            		$t.css("overflow", "hidden").after($m).on("keyup", function(){
            			$m.html(String($t.val()).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br />') + '.<br/>.');
            			if ($t.height() != $m.height()){
            				$t.height($m.height());
            			}
            		}).trigger("keyup");
        		}
        	});
        },
        
        /**
         * outerhtml
         * @return html 문자열
         */
        outerHtml : function(){
            return $("<div/>").append($(this).clone()).html();
        },
        
        /**
         * 본문의 링크처리, 클릭처리를 막는다
         * @param isNew
         * @return this
         **/
        stripHref : function(isNew) {
        	if($.isTrue(isNew)){
        		$("a[href], area[href]", this).removeAttr("onclick").click(function(e){
        			e.preventDefault();
        			var _url = $(this).attr("href");
        			if(isPattern("url", _url)){
        				window.open(_url);
        			}
    			});
        	}else{
        		$("a[href], area[href]", this).removeAttr("href").removeAttr("onclick").click(function(e){
    				e.preventDefault();
    			});
        	}
        	return this;
        }
	});
    
})(jQuery);  


//--------------------------------------------------------------------
// lang
//--------------------------------------------------------------------
/**
 * 구분자 이전 문자열을 리턴
 * @param value 문자열
 * @param delim 구분자
 * @return String
 */
function getFirstValue(value, delim){
    return value.indexOf(delim)!=-1?value.substring(0, value.indexOf(delim)):"";
}

/**
 * 구분자 이후 문자열을 리턴
 * @param value 문자열
 * @param delim 구분값
 * @return String
 */
function getLastValue(value, delim){
    return value.indexOf(delim)!=-1?value.substring(value.lastIndexOf(delim)+1):"";
}

/**
 * 문자열 자르기
 * @param value 문자열
 * @param len 길이
 * @param delim 구분자
 * @return String
 */
function cutString(value, len, delim){
    if(value.length>len){
    	return value.substring(0, len) + (delim||"..");
    }else{
    	return value;
    }
}

/**
 * 3자리마다 콤마추가
 * @param value 문자열
 * @return String
 */
function addComma(value){
    var rst, v = $.trim(value);
    for(var i = 0 , rst = String() , stop = v.length; i < stop ; i++) rst = ((i%3) == 0) && i != 0 ? v.charAt((stop - i) -1) + "," + rst : v.charAt((stop - i) -1) + rst;
    return rst;
}

 /**
  * 랜덤 문자열생성
  * @param len 길이
  * @param state 중복허용여부
  * @return String
  */
 function randomCode(len, state){
 	var arr = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
 		codes = [];

 	for(var i=0;i<len;i++){
 		var code = arr[Math.floor(Math.random()*arr.length)];
 		//중복허용여부
 		if(!$.isTrue(state) && hasValueInArray(codes, code)){
 			i--;
 		}else{
 			codes.push(code);
 		}
 	}
 	return codes;
}
 
/**
 * 문자열 매핑
 * @param value 문자열
 * @param arr 매핑 배열
 * @return String
 */
function mappingValue(value, arr) {
	var i = 0, n = 0;
	if(!$.hasValue(arr)){
		return value;
	}
	var _arr = typeof(arr) === "string" ? [arr] : arr;
	while((i = value.indexOf("@", i)) != -1) {
		if(_arr[n] == null) _arr[n] = "";
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
function removeHtmlTag(value){
	var _value = typeof value === "object" ? value.html() : value;
    return $("<div/>").html(_value).text();
}

/**
 * 배열속에 value값 존재여부
 * @param arr array
 * @param value 값
 * @param key 키
 * @param isBoolean default(true) boolean값 반환여부
 * @return boolean or String or PlainObject
 */
function hasValueInArray(arr, value, key, isBoolean){
	if(typeof(isBoolean) === "undefined") isBoolean = true;
	for (var i in arr) {
		if((key?arr[i][key]:arr[i])==value){
            return isBoolean?true:arr[i];
        }
    }
    return isBoolean?false:undefined;
}

/**
 * 첫문자를 대문자로변환
 * @param value 값
 * @return String
 */
function initCap(value) {
	return value.length>1?value.substring(0, 1).toUpperCase() + value.substring(1, value.length).toLowerCase():value;
}

//--------------------------------------------------------------------
// expr
//--------------------------------------------------------------------
/**
 * 패턴 매치되는 여부
 * @param patternName 패턴
 * @param value 문자열
 * @return Boolean
 */
function isPattern(patternName, value){
	var pattern = {
		number : /^[0-9]+$/,
		alphabat : /^[a-zA-Z]+$/,
		alphaNum : /^[0-9a-zA-Z]+$/,
		hangul : /^[가-힣]+$/,
		url : /^(http|https|ftp|mailto):(?:\/\/)?((\w|-)+(?:[\.:@](\w|-))+)(?:\/|@)?([^"\?]*?)(?:\?([^\?"]*?))?$/,
		phone : /^\d{2,3}-\d{3,4}-\d{3,4}$/
	};

	if(!pattern[patternName]) return false;
	else return (pattern[patternName]).test(value);
}

/**
 * 패턴에 매치되는 문자열
 * @param patternName 패턴
 * @param value 문자열
 * @param addPatternString 패턴에 추가될 문자
 * @return String
 */
function getPatternString(patternName, value, addPatternString) {
	var _addPatternString =  addPatternString||"";
	var pattern = {
		number : "[^0-9" + _addPatternString + "]",
		alphabat : "[^a-zA-Z" + _addPatternString + "]",
		alphaNum : "[^0-9a-zA-Z" + _addPatternString + "]",
		hangul : "[^가-힣" + _addPatternString + "]"
	};
	
	if(!pattern[patternName]) return "";
    return value.replace(new RegExp(pattern[patternName], "g"),"");
}

/**
 * 패턴에 맞는 문자열 추출
 * @param patternName 패턴
 * @param value 문자열
 * @return Array
 */
function getPatternArray(patternName, value){
	var pattern = {
		p1 : {regexp:/#[0-9a-zA-Z]+#/g, replace:"#"}
	},
	result = [];
	
    while ((match = pattern[patternName].regexp.exec(value)) !== null ) {
    	result.push(pattern[patternName].replace?$.replace(match.toString(), pattern[patternName].replace, ""):match.toString());
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
	if(targetName=="htmlEscape"){
		return value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}else if(targetName=="htmlUnEscape"){
		return value.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
	}else if(targetName=="lf2br"){
		return $.replace($.replace(value,"\r\n", "<br/>"),"\n", "<br/>");
	}else if(targetName=="br2lf"){
		return $.replace($.replace(value,"<br>", "\n", "gi"),"<br/>", "\n", "gi");
	}else if(targetName=="telLink"){
		return value.replace(/\d{2,3}[-|\)]\d{3,4}-\d{3,4}/g, '<a tel="$&" class="tel-link">$&</a>');
	}
	return value;
}

//--------------------------------------------------------------------
// ui
//--------------------------------------------------------------------
/**
 * dropDown
 */
function dropDown($1, $2, options){
	try{
		var _options = $.extend({
			show:"fast", 
			hide:"fast", 
			delay:500},options||{}
		);
		
		$('#' + $1.attr("id") + ',' + '#' + $2.attr("id")).hover(
            function(){
                window.clearTimeout(dropDownTimeout);
                $2.show(_options.show);
            },
            function(){
                if($2.is(":visible")){
                	dropDownTimeout = delayFunction(
                		function () {
                			$2.hide(_options.hide);
                		},
                		_options.delay
                	);
                }
            }
        );
	}catch(e){}
}

//--------------------------------------------------------------------
// form
//--------------------------------------------------------------------

//--------------------------------------------------------------------
// event
//--------------------------------------------------------------------
/**
 * 함수 실행 시간 지연
 * @param functionName 함수명
 * @param wait 지연MM
 * @param arguments 인자값들
 */
function delayFunction(functionName, wait) {
	if(typeof functionName == "function"){
		return setTimeout(functionName, wait);
	}else{
		var args = Array.prototype.slice.call(arguments, 2);
	    return setTimeout(function(){
	    	return window[functionName].apply(null, args);
	    }, wait||0);
	}
}

//--------------------------------------------------------------------
// object
//--------------------------------------------------------------------
/**
 * base62로 변환
 * @param value 값
 * @return String
 */
var base62 = new(function() {
	var table = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	function decode(str){
		var decodedNum, i, len;
		for (decodedNum = 0, i = len = str.length; i--;) {
			decodedNum += table.indexOf(str[i]) * Math.pow(62, len - i - 1);
		}
		return decodedNum;
	}
	
	function encode(num){
		var encodedStr = '';
	    while (num > 0) {
	      encodedStr = table.charAt(num % 62) + encodedStr;
	      num = Math.floor(num / 62);
	    }
	    return encodedStr;
	}
	
	return {
		decode : decode,
		encode : encode
	};
});

/***
 * 실행시간 구하기
 * @param mode
 */
function stopWatch(_title) {
	this.title = null;
	this.startTime = null;
	this.start = function(_title){
		this.title = _title||"stopWatch";
	    this.startTime = (new Date()).getTime();
	};
	this.stop = function(mode){ 
	    var endTime = (new Date()).getTime();
	    if(!$.hasValue(this.startTime)) this.startTime = endTime;
	    
	    var duration = (endTime - this.startTime) /1000;
	    if(mode=="alert"){
	    	$.alert(this.title + "\nduaration : " + duration + " seconds");
	    }else if(mode=="return"){
	    	return endTime - this.startTime;
	    }else{
	    	$.wLog(this.title, " duaration : " + duration + " seconds");
	    }
	};
}

/***
 * JSON Util
 * @param mode
 */
var wJson = new(function() {
	function init(json, isClone){
		var result = isClone?$.extend({}, json):json;
		$.each(result, function(key){
			if($.hasValue(result[key])){
				if($.isArray(result[key])){
					result[key] = [];
				}else if(typeof(result[key]) === "object"){
					result[key] = {};
				}else if($.isNumeric(result[key])){
					result[key] = 0;
				}else{
					result[key] = "";
				}
			}
		});
		return result;
	}
	
	function keys(json){
		var result = [];
		if(typeof(json) === "object"){
			for (var key in json) result.push(key);
		}
		return result;
	}
	
	function values(json){
		var result = [];
		if(typeof(json) === "object"){
			for (var key in json) result.push(json[key]);
		}
		return result;
	}
	
	function clone(json1, json2){
		return $.extend({}, json1, json2||{});
	}
	
	return {
		init : init,
		keys : keys,
		values : values,
		clone : clone
	};
});

/**
 * localStorage
 */
var lStorage = {
	surport : function(){
		return typeof(window.localStorage) === "object";
	},
	exist : function(key){
		var b = window.localStorage && window.localStorage[key]?true:false;
		$.wLog("lStorage.exist", key + " : " + b);
		return b;
	},
	get : function(key, toJson, isDel){
		var result;
		try{
			if(!$.hasValue(toJson)) toJson = true;
			if(!$.hasValue(isDel)) isDel = false;

			if(window.localStorage[key]){
				result = toJson?$.parseJSON(window.localStorage.getItem(key)):window.localStorage.getItem(key);
			}else{
				result = toJson?{}:"";
			}

			if(isDel){
				window.localStorage.removeItem(key);
			}

			$.wLog("lStorage.get", key);
		}catch(e){
			$.wLog("lStorage.get", "error : " + e.message);
		}
		return result;
	},
	set : function(key, value, toString){
		try{
			if(!$.hasValue(toString)) toString = true;
			window.localStorage[key] = toString?JSON.stringify(value):value;
			$.wLog(key, "lStorage.set");
		}catch(e){
			$.wLog("lStorage.set", "error : " + e.message);
		}
	},
	remove : function(key){
		try{
			if(window.localStorage[key]){
			    window.localStorage.removeItem(key);
			    $.wLog(key, "lStorage.remove");
			}
		}catch(e){
			$.wLog("lStorage.remove" ,"error : " + e.message);
		}
	},
	removeList : function(keys){
		try{
			$.each(keys, function(){
				if(window.localStorage[this]){
				    window.localStorage.removeItem(this);
				    $.wLog(this, "lStorage.remove");
				}
			});
		}catch(e){
			$.wLog("sStorage.remove", "error : " + e.message);
		}
	},
	clear : function(){
		window.localStorage.clear();
	}
};

/**
 * sessionStorage
 */
var sStorage = {
	surport : function(){
		return typeof(window.sessionStorage) === "object";
	},
	exist : function(key){
		var b = window.sessionStorage && window.sessionStorage[key]?true:false;
		$.wLog("sStorage.exist", key + " : " + b);
		return b;
	},
	get : function(key, toJson, isDel){
		var result;
		try{
			if(!$.hasValue(toJson)) toJson = true;
			if(!$.hasValue(isDel)) isDel = false;

			if(window.sessionStorage[key]){
				result = toJson?$.parseJSON(window.sessionStorage.getItem(key)):window.sessionStorage.getItem(key);
			}else{
				result = toJson?{}:"";
			}

			if(isDel){
				window.sessionStorage.removeItem(key);
			}

			$.wLog("sStorage.get", key);
		}catch(e){
			$.wLog("sStorage.get", "error : " + e.message);
		}
		return result;
	},
	set : function(key, value, toString){
		try{
			if(!$.hasValue(toString)) toString = true;
			window.sessionStorage[key] = toString?JSON.stringify(value):value;
			$.wLog(key, "sStorage.set");
		}catch(e){
			$.wLog("sStorage.set", "error : " + e.message);
		}
	},
	remove : function(key){
		try{
			if(window.sessionStorage[key]){
			    window.sessionStorage.removeItem(key);
			    $.wLog(key, "sStorage.remove");
			}
		}catch(e){
			$.wLog("sStorage.remove" ,"error : " + e.message);
		}
	},
	removeList : function(keys){
		try{
			$.each(keys, function(){
				if(window.sessionStorage[this]){
				    window.sessionStorage.removeItem(this);
				    $.wLog(this, "sStorage.remove");
				}
			});
		}catch(e){
			$.wLog("sStorage.remove", "error : " + e.message);
		}
	},
	clear : function(){
		window.sessionStorage.clear();
	}
};























