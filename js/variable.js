﻿/**
 * jQuery wonchu variable 0.0.1
 * by composite (wonchu.net@gmail.com)
 * http://www.wonchu.net
 * This project licensed under a MIT License.
**/

/** service */
var SERVICE_CONFIG = {
	owner : "www.wonchu.net",
    fileExt : {	
    	image: ["gif","jpg","jpeg","png"]
    }
};

/** layout */
var LAYOUT_CONFIG = {
	contentHeaderHeight : 31,
	node : "",
	accordian : false
};

/** page default */
var LIST_VALUE = {
	listSize: 15,
	page: 1
};

/** code define */
var CODE_VALUE = {
	yes : "Y",
	no : "N",
	zero : "0",
	one : "1",
	two : "2",
	three : "3",
	sharp : "#",
	pipe : "|",
	comma : ",",
	dot : ".",
	dash : "-",
	underline : "_"
};

/** common template */
var COMMON_TMPL = {
	layout :
		"<div id=\"wapper\">"+
		"	<div id=\"sidebar\">"+
		"	    <div class=\"sidebar-head\"><a href=\"javascript:void(0);\">wjquery</a></div>"+
		"	    <div class=\"sidebar-body\"><div id=\"menuTree\"></div></div>"+
		"	</div>"+
		"   <div id=\"content\">"+
		"       <div class=\"content-header\">"+
		"           <ul></ul>"+
		"           <div class=\"home\"><a href=\"javascript:goHome();\"><span>Home</span></a></div>"+
		"       </div>"+
		"       <div class=\"content-body\">"+
		"  		   	<div class=\"setting none\">"+
		"		   	<form>"+
		"    			<input type=\"radio\" id=\"accordian1\" name=\"accordian\"><label for=\"accordian1\">base</label>"+
		"    			<input type=\"radio\" id=\"accordian2\" name=\"accordian\"><label for=\"accordian2\">accordian</label>"+
		"		   	</form>"+
		"  		   	</div>"+
		"          <h1 class=\"entry-title\"></h1>"+
		"          <div id=\"entry\"></div>"+
		"          <a href=\"javascript:void(0);\" id=\"btn-top\"></a>"+
		"   	   <iframe src=\"about:blank\" id=\"content-iframe\" frameborder=\"0\" style=\"padding:10px;width:100%;height:500px;display:none;\"></iframe>"+
		"       </div>"+
		"       <div id=\"back-white\"></div>"+
		"   </div>"+
		"	<div id=\"resizer\">&nbsp;</div>" +
		"</div>"+
		"<div id=\"dialog-message\" title=\"\"><p></p></div>",
	entryApi : "<ul class=\"entry-api\"></ul>",
	entryApiItem :"<li class=\"entry-api-item\">"+
				  "   <h2>"+
				  "       <span>${text}</span>"+
				  "   </h2>"+
				  "	  <div class=\"example\" onclick=\"openNode('${id}')\" style=\"cursor:pointer\">${title}</div>"+
				  "</li>",
	pageNotFound :
	    	"<div style=\"width:100%;margin-top:100px;text-align:center;\"><img src=\"images/404.jpg\" /></div>",
    menuLi :
    	"<li><a href=\"#a\">${name}</a></li>",
    plainDiv : "<div>${text}</div>",
    end : ""
};

