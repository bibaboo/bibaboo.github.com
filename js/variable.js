/**
 * jQuery wonchu variable 0.0.1
 * by composite (wonchu.net@gmail.com)
 * http://www.wonchu.net
 * This project licensed under a MIT License.
 **/

/** service */
var SERVICE_CONFIG = {
    owner: "www.wonchu.net",
    fileExt: {
        image: ["gif", "jpg", "jpeg", "png"]
    },
    hash: {
        M: {
            key: "M",
            skip: false

        },
        P: {
            key: "P",
            skip: false

        },
        skip: false,
        menus: {
            module: "M",
            paging: "P"
        }
    }
};

/** layout */
var LAYOUT_CONFIG = {
    resizerLeft: "140px",
    node: "",
    accordian: false
};

/** page default */
var LIST_VALUE = {
    listSize: 15,
    page: 1
};

/** code define */
var CODE_VALUE = {
    yes: "Y",
    no: "N",
    zero: "0",
    one: "1",
    two: "2",
    three: "3",
    sharp: "#",
    pipe: "|",
    comma: ",",
    dot: ".",
    dash: "-",
    underline: "_",
    slash: "/"
};

/** common template */
var COMMON_TMPL = {
    layout: "<div id=\"wapper\">" +
        "	<div id=\"sidebar\">" +
        "	    <div class=\"sidebar-head\">" +
        "			<a href=\"javascript:void(0);\">wjquery</a>" +
        "			<ul class=\"ui-widget ui-helper-clearfix\">" +
        "				<li class=\"ui-state-default ui-corner-all\" title=\".ui-icon-search\"><span class=\"ui-icon ui-icon-search\"></span></li>" +
        "				<li class=\"ui-state-default ui-corner-all\" title=\".ui-icon-close\"><span class=\"ui-icon ui-icon-seek-first\"></span></li>" +
        "				<li class=\"ui-state-default ui-corner-all\" title=\".ui-icon-plus\"><span class=\"ui-icon ui-icon-plusthick\"></span></li>" +
        "				<li class=\"ui-state-default ui-corner-all\" title=\".ui-icon-minus\"><span class=\"ui-icon ui-icon-minusthick\"></span></li>" +
        "			</ul>" +
        "		</div>" +
        "	    <div class=\"sidebar-body\"><div class=\"sidebar-search\"><input type=\"search\" id=\"searchWord\" results=\"0\" placeholder=\"Search\"></div><div id=\"menuTree\" style=\"margin-bottom:20px;\"></div></div>" +
        "	</div>" +
        "	<div id=\"spacer\">" +
        "		<span class=\"ui-icon ui-icon-seek-end\"></span>" +
        "	</div>" +
        "   <div id=\"content\">" +
        "       <div class=\"content-header\">" +
        "           <ul></ul>" +
        "           <div class=\"home\"><a href=\"javascript:goHome();\"><span>Home</span></a></div>" +
        "           <div class=\"progress-container\">" +
        "               <div class=\"progress-bar\" id=\"header-progress-bar\"></div>" +
        "           </div>" +
        "       </div>" +
        "       <div class=\"content-body\">" +
        "  		   	<div class=\"setting none\">" +
        "		   	<form>" +
        "    			<input type=\"radio\" id=\"accordian1\" name=\"accordian\"><label for=\"accordian1\">base</label>" +
        "    			<input type=\"radio\" id=\"accordian2\" name=\"accordian\"><label for=\"accordian2\">accordian</label>" +
        "		   	</form>" +
        "  		   	</div>" +
        "          <h1 class=\"entry-title\"></h1>" +
        "          <div id=\"entry\"></div>" +
        "          <a href=\"javascript:void(0);\" id=\"btn-top\"></a>" +
        "   	   <iframe src=\"about:blank\" id=\"content-iframe\" frameborder=\"0\" style=\"padding:10px;width:100%;height:500px;display:none;\"></iframe>" +
        "       </div>" +
        "       <div id=\"back-white\"></div>" +
        "   </div>" +
        "	<div id=\"resizer\"><div class=\"resize-toggler\"><a href=\"javascript:$sidebar.find('.sidebar-head>ul>li .ui-icon-seek-first').click();\" class=\"ui-icon\"></a></div></div>" +
        "</div>" +
        "<div class=\"fakeloader\"></div>" +
        "<div id=\"dialog-message\" title=\"\"><p></p></div>",
    entryApi: "<ul class=\"entry-api\"></ul>",
    entryApiItem: "<li class=\"entry-api-item\">" +
        "   <h2>" +
        "       <span>${text}</span>" +
        "   </h2>" +
        "	  <div class=\"example\" onclick=\"openNode('${id}')\" style=\"cursor:pointer\">${title}</div>" +
        "</li>",
    pageNotFound: "<div style=\"width:100%;margin-top:100px;text-align:center;\"><img src=\"images/404.jpg\" /></div>",
    menuLi: "<li><a href=\"javascript:void(0);\">${name}</a></li>",
    headerLi: "<li><a href=\"javascript:void(0);\"><span>${text}</span></a></li>",
    plainDiv: "<div>${text}</div>",
    end: ""
};