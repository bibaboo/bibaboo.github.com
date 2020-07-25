/*
 * wjquery.select 0.1.0
 * by composite (wonchu.net@gmail.com)
 * http://www.wonchu.net
 * This project licensed under a MIT License.

 0.1.0 : 최초작성
*/

(function ($) {
    $.fn.wselect = function (method) {
        this.each(function (i, element) {
            let $element = $(element);
            if (typeof method === "string") {
                WSELECT[method]($element);
            } else if (typeof method === "object" || !method) {
                WSELECT.init($element);
            }
        });

        WSELECT.bind();
        return $(this);
    };

    var WSELECT = {
        init: function ($element) {
            $element.hide();
            let $dropdown = $("<div></div>"),
                $options = $element.find("option"),
                $selected = $element.find("option:selected");

            $dropdown.addClass("wselect-wrap").html('<span class="current"></span><ul class="list"></ul>');
            if ($element.prop("disabled")) $dropdown.addClass("disabled");
            $element.after($dropdown);

            $dropdown
                .attr("data-value", $selected.val())
                .attr("data-text", $selected.text())
                .find(".current")
                .html($selected.text());

            $options.each(function (i) {
                let $option = $(this);
                $dropdown.find("ul").append($("<li></li>")
                    .attr("data-value", $option.val())
                    .attr("data-text", $option.text())
                    .addClass("option"+
                    ($option.is(":selected") ? " selected" : "") +
                    ($option.is(":disabled") ? " disabled" : ""))
                    .html($option.text())
                );
            });

            $dropdown.click(function () {
                let $c = $(this);
                if ($c.hasClass("disabled")) return;
                $(".wselect-wrap").not($c).removeClass("open");
                $c.toggleClass("open");
                if ($c.hasClass("open")) {
                    $c.find(".option");
                    $c.find(".focus").removeClass("focus");
                    $c.find(".selected").addClass("focus");
                } else {
                    $c.focus();
                }
            });

            $dropdown.find(".option:not(.disabled)").click(function (event) {
                let $t = $(this),
                    $c = $t.parent().parent(),
                    v1 = $t.attr("data-value") || "",
                    v2 = $c.attr("data-value") || "";

                if (v1 != v2) {
                    $t.addClass("selected").siblings(".selected").removeClass("selected");

                    $c
                        .attr("data-text", $t.attr("data-text"))
                        .attr("data-value", v1)
                        .find(".current")
                        .html($t.attr("data-text"))
                        .end()
                        .prev("select").val(v1).trigger("change");
                }
            });
        },
        bind: function () {
            $(document).on("click.wselect", function (event) {
                if ($(event.target).closest(".wselect-wrap").length === 0) {
                    $(".wselect-wrap").removeClass("open").find(".option");
                }
            });
        },
        destroy: function ($element) {
            $element.show();
            $element.next(".wselect-wrap").remove();
        }
    }
})(jQuery);