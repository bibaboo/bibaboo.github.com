/*
 * wjquery.paing 0.1.0
 * by composite (wonchu.net@gmail.com)
 * http://www.wonchu.net
 * This project licensed under a MIT License.

 0.1.0 : 최초작성
*/

(function($){
	var DATA_NS = "wpaging";
	$.fn.wpaging = function(method){
		var result, _arguments = arguments;
		this.each(function(i, element) {
			var $element = $(element), plugin = $element.data(DATA_NS);
			if (plugin && typeof method === 'string') {
				if (plugin[method]) {
					result = plugin[method].apply(this, Array.prototype.slice.call(_arguments, 1));
				} else {
					alert('Method ' + method + ' does not exist on jQuery.wpaging');
				}
			} else if (typeof method === 'object' || !method) {
				var options = $.extend({}, $.fn.wpaging.defaultSettings, method || {});
				if(plugin) {
					plugin["distory"]();
					$element.removeData(DATA_NS);
				}
				if(options.totalCount>0){
					var _WPAGING = new WPAGING();
					$element.data(DATA_NS, _WPAGING.init($element, options));
				}
			}
		});
		return result?result:$(this);
	};

	$.fn.wpaging.defaultSettings = {
		currentPage : 1, 	//현재 페이지
		listSize : 20,		//리스트에 나타낼 데이터 수
		totalCount : 1,	//총 데이터 수
		pageCount : 10		//화면에 나타낼 페이지 수
	};

	function WPAGING() {
		var $element, options;
		function init(_element, _options){
			$element = _element;
			options = _options;
			_WPAGING.calcurate(options);
			_WPAGING.draw($element, options);
			setNum();

			$element.find("a.link-page").click(function(){
				var _data = {type:"", page:0};
				if($(this).hasClass("current-link-num")){
					return false;
				} else if($(this).hasClass("link-prev")){
					_data.type = "prev";
					_data.page = options.startPage - options.pageCount;
				} else if($(this).hasClass("link-next")){
					_data.type = "next";
					_data.page = options.endPage + 1;
				} else if($(this).hasClass("link-num")){
					_data.type = "page";
					_data.page = $(this).attr("data-page");
				}

				if(options.callback){
					options.callback(_data);
				}else{
					console.log(_data);
				}
			});
		}

		function redraw(_options){
			if(_options.currentPage) options.currentPage=_options.currentPage;
			if(_options.totalCount) options.totalCount=_options.totalCount;
			_WPAGING.calcurate(options);
			_WPAGING.redraw($element, options);
			setNum(_options.currentPage);
		}

		function setNum(page){
			$element.find(".wpaging-paging a[data-page='" + (page||options.currentPage) + "']").addClass("current-link-num").siblings().removeClass("current-link-num");
			if(page) options.currentPage = page;
		}
		
		function distory(){
			$element.empty();
		}

		return {
			init:init,
			distory:distory,
			redraw:redraw,
			setNum:setNum
		};
	}

	var  _WPAGING = {
		draw : function($element, options){
			//make wapper
			$element.html("<div class=\"wpaging-wrap\"><div class=\"wpaging-area\"><span class=\"wpaging-paging\"></span></div></div>");

			var _html = [];
			_html.push("<a href=\"javascript:;\" class=\"link-prev link-page" + (options.startPage==1?" wpaging-none":"") + "\"><</a>");
			for(var i=options.startPage; i<=options.pageCount;i++){
				_html.push("<a href=\"javascript:;\" class=\"link-num link-page" + (i<=options.endPage?"":" wpaging-none") + "\" data-page=\"" + i + "\">" + i + "</a>");
			}
			_html.push("<a href=\"javascript:;\" class=\"link-next link-page" + (options.totalPage==options.endPage?" wpaging-none":"") + "\">></a>");
			$element.find(".wpaging-paging").html(_html.join(""));
		},
		redraw : function($element, options){
			$element.find(".link-prev").toggleClass("wpaging-none", options.startPage==1);
			$element.find(".link-next").toggleClass("wpaging-none", options.totalPage==options.endPage);
			
			var _page = options.startPage;
			for(var i=0; i<=options.pageCount-1;i++){
				$element.find(".link-num:eq(" + i + ")").attr("data-page", _page).html(_page).toggleClass("wpaging-none", _page>options.totalPage);
				_page++;
			}
		},
		calcurate : function(options){
			options.totalPage = Math.ceil(options.totalCount/options.listSize);    	// 총 페이지 수
			options.pageGroup = Math.ceil(options.currentPage/options.pageCount);  	// 페이지 그룹
			options.endPage = options.pageGroup * options.pageCount;    			// 화면에 보여질 마지막 페이지 번호
			options.startPage = options.endPage - (options.pageCount-1);   			// 화면에 보여질 첫번째 페이지 번호
			if(options.endPage > options.totalPage) options.endPage = options.totalPage;
			return options;
		}
	}
})(jQuery);









































