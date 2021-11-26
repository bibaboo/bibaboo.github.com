/*
 * wjquery.calendar 0.1.1
 * by composite (wonchu.net@gmail.com)
 * http://www.wonchu.net
 * This project licensed under a MIT License.

 0.1.0 : 최초작성
 0.1.1 : 소스정리
*/

(function ($) {
    const WCALENDAR_SV = {
        ns: "wcalendar",
        dateFormat: "YYYYMMDD",
        lang: {
            ko: {
                week: ["일", "월", "화", "수", "목", "금", "토"]
            }
        }
    };

    $.fn.wcalendar = function (method) {
        let result, _arguments = arguments;
        this.each(function (i, element) {
            const $element = $(element);
            let $container,
                _option = {};
            if ($element.prop("tagName").toLowerCase() == "input") {
                if ($element.attr("data-wrap-id")) {
                    $container = $("#" + $element.attr("data-wrap-id"));
                } else {
                    const _id = "wcalendar_" + new Date().getTime();
                    $element.after("<div id=\"" + _id + "\" />");
                    _option.element = $element;
                    $element.attr("data-wrap-id", _id);
                    $container = $("#" + _id);
                }
            } else {
                $container = $element;
            }

            const plugin = $container.data(WCALENDAR_SV.ns);

            if (plugin && typeof method === 'string') {
                if (plugin[method]) {
                    result = plugin[method].apply(this, Array.prototype.slice.call(_arguments, 1));
                } else {
                    alert('Method ' + method + ' does not exist on jQuery.wcalendar');
                }
            } else if (!plugin && (typeof method === 'object' || !method)) {
                let wcalendar = new WCALENDAR();
                $container.data(WCALENDAR_SV.ns, wcalendar);
                wcalendar.init($container, $.extend(_option, $.fn.wcalendar.defaultSettings, method || {}));
            }
        });
        return result ? result : $(this);
    };

    $.fn.wcalendar.defaultSettings = {
        width: "200px",
        locale: "ko",
        dateFormat: "YYYY.MM.DD",
        showPrevNextDays: true,
        dateIconClass: "wcalendar-dateicon",
        mdHoliday: {
            "0101": {
                ko: "신정"
            },
            "0505": {
                ko: "어린이날"
            }
        },
        holiday: {
            "20210519": {
                ko: "부처님오신날"
            }
        }
    };

    function WCALENDAR() {
        let $container, options;

        function init(_container, _options) {
            $container = _container;
            options = _options;

            if (options.selectDate) {
                options.selectDate = moment(options.selectDate, options.dateFormat);
            } else {
                if (options.element && options.element.val() != "") {
                    options.selectDate = moment(options.element.val(), options.dateFormat);
                } else {
                    options.selectDate = moment();
                }
            }

            options.targetDate = options.selectDate.clone();
            _WCALENDAR.init($container, options);
        }

        function draw() {
            _WCALENDAR.draw($container, options);
        }

        function prev() {
            options.targetDate = options.targetDate.add(-1, "months");
            _WCALENDAR.draw($container, options);
        }

        function next() {
            options.targetDate = options.targetDate.add(1, "months");
            _WCALENDAR.draw($container, options);
        }

        function set(dt) {
            options.targetDate = moment(dt, options.dateFormat);
            _WCALENDAR.draw($container, options);
        }

        function select() {
            options.targetDate = moment($(".wcalendar-month .title-year", $container).val() + $.pad($(".wcalendar-month .title-month", $container).val(), 2) + "01", "YYYYMMDD");
            _WCALENDAR.draw($container, options);
        }

        function click() {
            const _index = $(".wcalendar-undock").index($container);
            $(".wcalendar-undock").each(function () {
                if ($(".wcalendar-undock").index(this) != _index && $(this).is(":visible")) {
                    $(this).hide();
                }
            });

            if ($container.is(":visible")) {
                $container.hide();
            } else {
                if (options.element && options.element.val() != "") {
                    options.selectDate = moment(options.element.val(), options.dateFormat);
                    options.hasVal = "Y";
                } else {
                    options.selectDate = moment();
                    options.hasVal = "N";
                }
                options.targetDate = options.selectDate.clone();
                _WCALENDAR.draw($container, options);
                $container.show();
            }
        }

        function destory() {
            if (options.element) {
                options.element.removeClass("wcalendar-input");
                if (options.element.next("." + options.dateIconClass)) {
                    options.element.next("." + options.dateIconClass).remove();
                }
            }
            $container.remove();
        }

        return {
            init: init,
            draw: draw,
            prev: prev,
            next: next,
            set: set,
            select: select,
            click: click,
            destory: destory
        };
    }

    var _WCALENDAR = {
        init: function ($container, options) {
            if (options.element) {
                options.element.addClass("wcalendar-input");
                $container.addClass("wcalendar-undock").css({
                    "top": options.element.position().top + options.element.outerHeight(),
                    "left": options.element.position().left,
                    "width": options.width
                });

                const $icon = $("<span class=\"" + options.dateIconClass + "\" />");
                options.element.after($icon);
                $icon.click(function () {
                    $container.wcalendar("click");
                });

                options.element.click(function () {
                    $container.wcalendar("click");
                });

                $(document).on("click.wcalendar-undock", function (event) {
                    if ($(event.target).closest(".wcalendar-wrap, .wcalendar-input, ." + options.dateIconClass).length === 0) {
                        $container.hide();
                    }
                });
            }

            $container.html(
                "<div class=\"wcalendar-wrap\">" +
                "    <div class=\"wcalendar-month\">" +
                "      <ul>" +
                "        <li class=\"prev\"><a href=\"javascript:;\"><span>&#10094;</span></a></li>" +
                "        <li class=\"next\"><a href=\"javascript:;\"><span>&#10095;</span></a></li>" +
                "        <li><select class=\"title-year\"></select> <select class=\"title-month\"></select></li>" +
                "      </ul>" +
                "    </div>" +
                "    <ul class=\"wcalendar-weekdays\"></ul>" +
                "    <ul class=\"wcalendar-days\"></ul>" +
                "</div>"
            );

            this.draw($container, options);

            $(".wcalendar-month li>a", $container).click(function () {
                $container.wcalendar($(this).parent().attr("class"));
            });

            $container.find(".wcalendar-days").on("click", "a", function () {
                var $t = $(this);
                $t.parent().siblings().find("a.active").removeClass("active");
                $t.addClass("active");

                if (options.callback) {
                    options.callback($(this).attr("data-val"));
                } else if (options.element) {
                    options.element.val($(this).attr("data-val"));
                    $container.hide();
                }
            });
        },
        draw: function ($container, options) {
            const curentDate = moment(),
                selectDate = options.selectDate,
                targetDate = options.targetDate,
                firstDate = targetDate.clone().startOf("month"),
                lastDate = targetDate.clone().endOf("month");
            let _prevDate, _targetDate, _nextDate;

            this.makeSelectOption($(".wcalendar-month .title-year", $container), targetDate.year() - 10, targetDate.year() + 10, targetDate.year());
            this.makeSelectOption($(".wcalendar-month .title-month", $container), 1, 12, options.targetDate.month() + 1);

            $(".wcalendar-month .title-month, .wcalendar-month .title-year", $container).off("change").on("change", function () {
                $container.wcalendar("select");
            });

            let _weekdays = [];
            for (let n = 0; n < 7; n++) {
                _weekdays.push("<li>" + WCALENDAR_SV.lang[options.locale].week[n] + "</li>");
            }
            $container.find(".wcalendar-weekdays").empty().append(_weekdays.join(""));

            let _days = [];
            for (let i = firstDate.day(); i > 0; i--) {
                if (options.showPrevNextDays) {
                    _prevDate = firstDate.clone().add(-i, "days");
                    _days.push(this.makeItem(options, "prev", _prevDate, curentDate, selectDate));
                } else {
                    _days.push("<li>&nbsp;</li>");
                }
            }

            for (let j = 0; j < lastDate.date(); j++) {
                _targetDate = firstDate.clone().add(j, "days");
                _days.push(this.makeItem(options, "target", _targetDate, curentDate, selectDate));
            }

            for (let k = 1; k <= (6 - lastDate.day()); k++) {
                if (options.showPrevNextDays) {
                    _nextDate = lastDate.clone().add(k, "days");
                    _days.push(this.makeItem(options, "next", _nextDate, curentDate, selectDate));
                } else {
                    _days.push("<li>&nbsp;</li>");
                }
            }

            $container.find(".wcalendar-days").empty().append(_days.join(""));
        },
        makeItem: function (options, mode, dt, dt2, dt3) {
            let classNames = [],
                titles = [],
                _classNames = "",
                _titles = "";

            const dtf = dt.format(WCALENDAR_SV.dateFormat),
                dtfmd = dt.format("MMDD"),
                dtf2 = dt2.format(WCALENDAR_SV.dateFormat),
                dtf3 = dt3.format(WCALENDAR_SV.dateFormat);

            classNames.push(mode);

            if (dtf2 == dtf) {
                classNames.push("today");
            }
            
            if (dtf3 == dtf ) {
                if(options.hasVal && options.hasVal=="N"){
                    //nothing
                }else{
                    classNames.push("active");
                }
            }

            if (options.mdHoliday && options.mdHoliday[dtfmd]) {
                classNames.push("md-holiday");
                titles.push(options.mdHoliday[dtfmd][options.locale]);
            }
            
            if (options.holiday && options.holiday[dtf]) {
                classNames.push("holiday");
                titles.push(options.holiday[dtf][options.locale]);
            }

            if (classNames.length > 0) {
                _classNames = " class=\"" + (classNames.join(" ")) + "\"";
            }

            if (titles.length > 0) {
                _titles = " title=\"" + (titles.join(" ")) + "\"";
            }

            return "<li>" +
                "   <a href=\"javascript:;\" data-val=\"" + dt.format(options.dateFormat) + "\"" + _titles + _classNames + ">" + dt.date() + "</a>" +
                "</li>";
        },
        makeSelectOption: function ($t, start, end, v) {
            let _options = [];
            for (let i = start; i <= end; i++) {
                _options.push("<option value=\"" + i + "\"" + (i == v ? " selected=\"selected\"" : "") + ">" + i + "</option>");
            }
            $t.empty().append(_options.join(""));
        }
    }
})(jQuery);