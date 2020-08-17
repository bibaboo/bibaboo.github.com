/*
 * wjquery.paing 0.1.0
 * by composite (wonchu.net@gmail.com)
 * http://www.wonchu.net
 * This project licensed under a MIT License.

 0.1.0 : 최초작성
 0.1.1 : 소스정리
*/

var WPAGING_ACTION = {
	first : "first",
	prev : "prev",
	next : "next",
	page : "page",
	last : "last",
	hash : "hash"
};

(function ($) {
	"use strict";
	const WPAGEING_DATA_NS = "wpaging";
	$.fn.wpaging = function (method) {
		let result, _arguments = arguments;
		this.each(function (i, element) {
			let $element = $(element),
				plugin = $element.data(WPAGEING_DATA_NS);
			if (plugin && typeof method === 'string') {
				if (plugin[method]) {
					result = plugin[method].apply(this, Array.prototype.slice.call(_arguments, 1));
				} else {
					alert('Method ' + method + ' does not exist on jQuery.wpaging');
				}
			} else if (typeof method === 'object' || !method) {
				let options = $.extend({}, $.fn.wpaging.defaultSettings, method || {});
				if (plugin) {
					plugin["distory"]();
					$element.removeData(WPAGEING_DATA_NS);
				}
				if (options.totalCount > 0) {
					let wpaging = new WPAGING();
					wpaging.init($element, options);
					$element.data(WPAGEING_DATA_NS, wpaging);
				}
			}
		});
		return result ? result : $(this);
	};

	$.fn.wpaging.defaultSettings = {
		showSE: true,
		hash: false,
		hashFunc: null,
		currentPage: 1, //현재 페이지
		listSize: 20, //리스트에 나타낼 데이터 수
		totalCount: 1, //총 데이터 수
		pageCount: 10 //화면에 나타낼 페이지 수
	};

	function WPAGING() {
		let $element, options;

		function init(_element, _options) {
			$element = _element;
			options = _options;
			_WPAGING.calcurate(options);
			_WPAGING.draw($element, options);
			setNum();

			$element.find("a.link-page").click(function () {
				let _data = {
					type: "",
					page: 0
				};
				if ($(this).hasClass("current-link-num") || $(this).hasClass("link-disabled")) {
					return false;
				} else if ($(this).hasClass("link-first")) {
					_data.type = WPAGING_ACTION.first;
					_data.page = 1;
				} else if ($(this).hasClass("link-prev")) {
					_data.type = WPAGING_ACTION.prev;
					_data.page = options.startPage - options.pageCount;
				} else if ($(this).hasClass("link-next")) {
					_data.type = WPAGING_ACTION.next;
					_data.page = options.endPage + 1;
				} else if ($(this).hasClass("link-num")) {
					_data.type = WPAGING_ACTION.page;
					_data.page = $(this).attr("data-page");
				} else if ($(this).hasClass("link-last")) {
					_data.type = WPAGING_ACTION.last;
					_data.page = options.totalPage;
				}

				if (options.callback) {
					options.callback(_data);
				} else {
					console.log(_data);
				}
			});
		}

		function _setHash(page) {
			if (options.hash) {
				if (options.hashFunc == null) {
					document.location.hash = "#/" + page;
				} else {
					options.hashFunc(page);
				}
			}

		}

		function redraw(_options) {
			if (_options.currentPage) options.currentPage = _options.currentPage;
			if (_options.totalCount) options.totalCount = _options.totalCount;
			if (_options.listSize) options.listSize = _options.listSize;
			_WPAGING.calcurate(options);
			_WPAGING.redraw($element, options);
			setNum(_options.currentPage);
		}

		function setNum(page) {
			$element.find(".wpaging-paging a[data-page='" + (page || options.currentPage) + "']").addClass("current-link-num").siblings().removeClass("current-link-num");
			if (page) options.currentPage = page;
			_setHash(options.currentPage);
		}

		function checkNum(page) {
			if ($element.find(".wpaging-paging a[data-page='" + page + "']").length == 1) {
				setNum(page);
			} else {
				redraw({
					currentPage: page
				})
			}
		}

		function distory() {
			$element.empty();
		}

		return {
			init: init,
			distory: distory,
			redraw: redraw,
			setNum: setNum,
			checkNum: checkNum
		};
	}

	var _WPAGING = {
		draw: function ($element, options) {
			//make wapper
			$element.html("<div class=\"wpaging-wrap\"><div class=\"wpaging-area\"><span class=\"wpaging-paging\"></span></div></div>");

			let _html = [];

			if (options.showSE) {
				_html.push("<a href=\"javascript:;\" class=\"link-first link-page" + (options.startPage == 1 ? " link-disabled" : "") + "\"><<</a>");
			}

			_html.push("<a href=\"javascript:;\" class=\"link-prev link-page" + (options.startPage == 1 ? " link-disabled" : "") + "\"><</a>");
			for (let i = options.startPage; i <= options.pageCount; i++) {
				_html.push("<a href=\"javascript:;\" class=\"link-num link-page" + (i <= options.endPage ? "" : " link-none") + "\" data-page=\"" + i + "\">" + i + "</a>");
			}
			_html.push("<a href=\"javascript:;\" class=\"link-next link-page" + (options.totalPage == options.endPage ? " link-disabled" : "") + "\">></a>");
			
			if (options.showSE) {
				_html.push("<a href=\"javascript:;\" class=\"link-last link-page" + (options.totalPage == options.endPage ? " link-disabled" : "") + "\">>></a>");
			}

			$element.find(".wpaging-paging").html(_html.join(""));
		},
		redraw: function ($element, options) {
			if (options.showSE) {
				$element.find(".link-first").toggleClass("link-disabled", options.startPage == 1);
				$element.find(".link-last").toggleClass("link-disabled", options.totalPage == options.endPage);
			}
			$element.find(".link-prev").toggleClass("link-disabled", options.startPage == 1);
			$element.find(".link-next").toggleClass("link-disabled", options.totalPage == options.endPage);

			let _page = options.startPage;
			for (let i = 0; i <= options.pageCount - 1; i++) {
				$element.find(".link-num:eq(" + i + ")").attr("data-page", _page).html(_page).toggleClass("link-none", _page > options.totalPage);
				_page++;
			}
		},
		calcurate: function (options) {
			options.totalPage = Math.ceil(options.totalCount / options.listSize); // 총 페이지 수
			options.pageGroup = Math.ceil(options.currentPage / options.pageCount); // 페이지 그룹
			options.endPage = options.pageGroup * options.pageCount; // 화면에 보여질 마지막 페이지 번호
			options.startPage = options.endPage - (options.pageCount - 1); // 화면에 보여질 첫번째 페이지 번호
			if (options.endPage > options.totalPage) options.endPage = options.totalPage;
			return options;
		}
	}

})(jQuery);