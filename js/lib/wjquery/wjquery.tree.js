/*
 * wjquery.tree 0.1.1
 * by composite (wonchu.net@gmail.com)
 * http://www.wonchu.net
 * This project licensed under a MIT License.

 0.1.0 : 최초작성
 0.1.1 : 소스정리
*/

(function ($) {
    var WTREE_SV = {
        ns: "wtree",
        type: {
            node: "N",
            leaf: "L"
        },
        dataType: {
            all: "A",
            item: "I"
        },
        icon: {
            plus: "plus",
            minus: "minus",
            empty: "empty",
            closed: "closed",
            opened: "opened",
            leaf: "leaf"
        }
    };

    $.fn.wtree = function (method) {
        let result, _arguments = arguments;
        this.each(function (i, element) {
            let $element = $(element),
                plugin = $element.data(WTREE_SV.ns);

            if (plugin && typeof method === 'string') {
                if (plugin[method]) {
                    result = plugin[method].apply(this, Array.prototype.slice.call(_arguments, 1));
                } else {
                    alert('Method ' + method + ' does not exist on jQuery.wtree');
                }
            } else if (!plugin && (typeof method === 'object' || !method)) {
                let wtree = new WTREE();
                $element.data(WTREE_SV.ns, wtree);
                wtree.init($element, $.extend({}, $.fn.wtree.defaultSettings, method || {}));
            }
        });
        return result ? result : $(this);
    };

    $.fn.wtree.defaultSettings = {
        rootNodeId: "",
        rootTitle: "",
        subNodeClose: true,
        notSelectTreeNode: true
    };

    function WTREE(_element, _options) {
        let $element, options;

        function init(_element, _options) {
            $element = _element;
            options = _options;
            _WTREE.init($element, options);
        }

        function draw(nodeId, data) {
            _WTREE.draw($element, options, nodeId, data);
        }

        function select(t, useSelected) {
            _WTREE.select($element, t, options, useSelected);
        }

        function selected(t) {
            _WTREE.selected($element, t, options);
        }

        function openAll() {
            _WTREE.openAll($element, options);
        }

        function closeAll() {
            _WTREE.closeAll($element, options);
        }

        return {
            init: init,
            draw: draw,
            select: select,
            selected: selected,
            openAll: openAll,
            closeAll: closeAll
        };
    }

    var _WTREE = {
        init: function ($element, options) {
            $element.html("<ul><li data-type=\"" + WTREE_SV.type.node + "\" data-id=\"" + options.rootNodeId + "\" class=\"root\">" + options.rootTitle + "<li></ul>");
            if (options.fnc) {
                options.dataType = WTREE_SV.dataType.item;
                doFunction(options.fnc, options.rootNodeId);
            } else if (options.data) {
                options.dataType = WTREE_SV.dataType.all;
                _WTREE.draw($element, options, options.rootNodeId, options.data[options.rootNodeId]);
            }
        },
        draw: function ($element, options, nodeId, data) {
            let $c = $element.find("[data-type='" + WTREE_SV.type.node + "'][data-id='" + nodeId + "']");
            if ($c.children("ul").isObject()) {
                //skip
            } else {
                if (typeof data !== 'object') return;

                let nodes = data.nodes || [],
                    leaves = data.leaves || [],
                    callNodes = [],
                    $ul = $("<ul/>");
                sb = new stringBuffer();

                $.each(nodes, function () {
                    if (options.dataType == WTREE_SV.dataType.all && this.hasChildren) {
                        callNodes.push(this.id);
                    }
                    sb.append("<li data-type=\"" + WTREE_SV.type.node + "\" data-id=\"" + this.id + "\"><a href=\"javascript:void(0);\" class=\"item\" title=\"" + (this.title || "") + "\"><i class=\"" + (this.hasChildren ? WTREE_SV.icon.plus : WTREE_SV.icon.empty) + "\"></i><i class=\"" + WTREE_SV.icon.closed + "\"></i><span>" + $.nvl(this.name, this.id) + "</span></a></li>");
                });

                $.each(leaves, function () {
                    sb.append("<li data-type=\"" + WTREE_SV.type.leaf + "\" data-id=\"" + this.id + "\" data-data=\"" + $.replace($.getString($.nvl(this.data, "")), "\"", "_@_") + "\"><a href=\"javascript:void(0);\" class=\"item\" title=\"" + (this.title || "") + "\"><i class=\"" + WTREE_SV.icon.empty + "\"></i><i class=\"" + WTREE_SV.icon.leaf + "\"></i><span>" + $.nvl(this.name, this.id) + "</span></a></li>");
                });

                if (sb.size() > 0) {
                    $ul.append(sb.toString());
                    $ul.find("a.item").click(function (e, b) {
                        $element.wtree("select", this, b);
                    });
                }

                if (options.dataType == WTREE_SV.dataType.all && options.rootNodeId != nodeId) {
                    $ul.hide();
                }

                $c.append($ul);

                if (callNodes.length > 0) {
                    callNodes.forEach(function (nodeId) {
                        _WTREE.draw($element, options, nodeId, options.data[nodeId]);
                    });
                }
            }
        },
        select: function ($element, t, options, useSelected) {
            let $t = $(t),
                $p = $t.parent(),
                type = $p.attr("data-type"),
                id = $p.attr("data-id");

            if (!$.isFalse(useSelected)) {
                this.selected($element, $t, options);
            }

            if (type == WTREE_SV.type.node) {
                if ($t.find("i." + WTREE_SV.icon.plus).length == 1) {
                    if ($p.children("ul").length == 0) {
                        doFunction(options.fnc, id);
                    } else {
                        $t.next().show();
                    }
                    $t.find("i." + WTREE_SV.icon.plus).changeClass(WTREE_SV.icon.plus, WTREE_SV.icon.minus);
                    $t.find("i." + WTREE_SV.icon.closed).changeClass(WTREE_SV.icon.closed, WTREE_SV.icon.opened);
                } else if ($t.find("i." + WTREE_SV.icon.minus).length == 1) {
                    if (options.subNodeClose) {
                        //하위포함
                        $p.find("i." + WTREE_SV.icon.minus).each(function () {
                            $(this).changeClass(WTREE_SV.icon.minus, WTREE_SV.icon.plus);
                            $(this).siblings("i." + WTREE_SV.icon.opened).changeClass(WTREE_SV.icon.opened, WTREE_SV.icon.closed);
                            $(this).parent().next().hide();
                        });
                    } else {
                        //현재레벨 
                        $t.find("i." + WTREE_SV.icon.minus).changeClass(WTREE_SV.icon.minus, WTREE_SV.icon.plus);
                        $t.find("i." + WTREE_SV.icon.opened).changeClass(WTREE_SV.icon.opened, WTREE_SV.icon.closed);
                        $t.next().hide();
                    }
                }
            } else if (type == WTREE_SV.type.leaf) {
                if (options.leafNodeCallback && $.hasValue($p.attr("data-data"))) {
                    doFunction(options.leafNodeCallback, $.replace($p.attr("data-data"), "_@_", "\""));
                } else {
                    //console.log("leafId : " + id);
                }
            }
        },
        selected: function ($element, t, options) {
            let $t = typeof t === 'string' ? $element.find("li[data-id=" + t + "]>a") : t;
            if ($.hasValue($t.parent().attr("data-type")) && !(options.notSelectTreeNode && $t.parent().attr("data-type") == WTREE_SV.type.node)) {
                $element.find("a.item.selected").removeClass("selected");
                $t.addClass("selected");
            }
        },
        openAll: function ($element, options) {
            $element.find("a.item>i." + WTREE_SV.icon.plus).each(function () {
                $(this).parent().trigger("click", false);
            });
        },
        closeAll: function ($element, options) {
            if (options.subNodeClose) {
                $element.find(">ul>li>ul>li>a.item>i." + WTREE_SV.icon.minus).trigger("click", false);
            } else {
                $element.find("a.item>i." + WTREE_SV.icon.minus).each(function () {
                    $(this).parent().trigger("click", false);
                });
            }
        }
    }
})(jQuery);