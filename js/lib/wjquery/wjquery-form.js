/*
 * wjquery wform 0.1.1
 * by composite (wonchu.net@gmail.com)
 * http://www.wonchu.net
 * This project licensed under a MIT License.
 */

;
(function ($) {
    $.fn.wform = function (method) {
        var noEach = ["get", "set"];
        var result;
        var args = Array.prototype.slice.call(arguments, 1);

        if (hasValueInArray(noEach, method)) {
            result = WFORM[method].apply(this, args);
        } else {
            this.each(function () {
                result = WFORM[method].apply(this, args);
            });
        }
        return typeof (result) == "undefined" ? $(this) : result;
    };

    var WFORM = new(function () {
        var tmpl = {
            option: "<option value='${value}'>${text}</option>",
            radio: "<label for=\"${id}\" style=\"margin-left:10px;\"><input type=\"radio\" class=\"${className}\" name=\"${name}\" id=\"${id}\" value=\"${value}\" /> ${text}</label>",
            checkbox: "<label for=\"${id}\" style=\"margin-left:10px;\"><input type=\"checkbox\" class=\"${className}\" name=\"${name}\" id=\"${id}\" value=\"${value}\" /> ${text}</label>"
        };

        var SET_OPTIONS = {
            base: {
                id: "",
                name: "",
                class: "",
                list: null,
                empty: true
            }
        };

        function get() {
            if ($(this).length == 0) return;
            var $t = $(this[0]);
            if ($t.is("input:radio")) {
                return $("input:radio[name='" + $t.attr("name") + "']:checked").val() || "";
            } else if ($t.is("input:checkbox")) {
                return $("input:checkbox[name='" + $t.attr("name") + "']:checked").map(function () {
                    return this.value;
                }).get();
            } else {
                return $(this).val();
            }
        }

        function set(v, b) {
            if ($(this).length == 0) return
            var $t = $(this[0]);
            if ($t.is("input:radio")) {
                $("input:radio[name='" + $t.attr("name") + "'][value='" + v + "']").attr("checked", true);
            } else if ($t.is("input:checkbox")) {
                var _v = $.isArray(v) ? v : [v];
                if (b) $("input:checkbox[name='" + $t.attr("name") + "']:checked").attr("checked", false);
                $.each(_v, function () {
                    $("input:checkbox[name='" + $t.attr("name") + "'][value='" + this + "']").attr("checked", true);
                });
            } else {
                $(this).val(v);
            }
        }

        function make(type, options) {
            var $t = $(this);
            var _options = $.extend({}, SET_OPTIONS.base, options || {});
            if (!$.hasValue(_options.id)) _options.id = type + (new Date().getTime());
            if (!$.hasValue(_options.name)) _options.name = _options.id;
            if (_options.empty) {
                $t.empty();
            }

            if (type == "select") {
                $t.append($("<select />").attr({
                    id: _options.id,
                    name: _options.name,
                    class: _options.class
                }));
                WFORM.makeSelectOption.call(document.getElementById(_options.id), _options);
            } else if (type == "radio") {
                if (_options.list == null) return;
                $.each(_options.list, function (i) {
                    this.id = "R" + _options.id + i;
                    this.className = _options.class;
                    this.name = _options.name;
                    $t.append($.tmpl(tmpl.radio, this));
                });

                if (_options.checked) {
                    $("input[name='" + _options.name + "'][value='" + _options.checked + "']").attr("checked", true);
                }
            } else if (type == "checkbox") {
                if (_options.list == null) return;
                $.each(_options.list, function (i) {
                    this.id = "C" + _options.id + i;
                    this.className = _options.class;
                    this.name = _options.name;
                    $t.append($.tmpl(tmpl.checkbox, this));
                });

                if (_options.checked) {
                    var a = _options.checked.split(",");
                    $.each(a, function (i) {
                        $("input[name='" + _options.name + "'][value='" + this + "']").attr("checked", true);
                    });
                }
            }
        }

        function makeSelectOption(options) {
            var $t = $(this);
            if ($t.prop("tagName").toLowerCase() != "select") return;

            var _options = $.extend({
                selected: null,
                firstOption: null,
                list: null,
                removeOptions: true
            }, options || {});

            if (_options.list == null) return;

            if ($.hasValue(_options.firstOption)) {
                _options.list.unshift(_options.firstOption);
            }

            if (_options.removeOptions) {
                $t.empty();
            }

            $.each(_options.list, function () {
                $t.append($.tmpl(tmpl.option, this));
            });

            if (_options.selected != null) {
                $t.val(_options.selected);
            }
        }

        return {
            make: make,
            get: get,
            set: set,
            makeSelectOption: makeSelectOption
        };
    });
})(jQuery);
