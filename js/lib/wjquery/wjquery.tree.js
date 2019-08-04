/*
 * wjquery.tree 0.1.0
 * by composite (wonchu.net@gmail.com)
 * http://www.wonchu.net
 * This project licensed under a MIT License.

 0.1.0 : 최초작성
*/

(function ($) {
    var WTREE_DATA_NS = "wtree",
        WTREE_CODE = {
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
        var result, _arguments = arguments;
        this.each(function (i, element) {
            var $element = $(element),
                plugin = $element.data(WTREE_DATA_NS);

            if (plugin && typeof method === 'string') {
                if (plugin[method]) {
                    result = plugin[method].apply(this, Array.prototype.slice.call(_arguments, 1));
                } else {
                    alert('Method ' + method + ' does not exist on jQuery.wtree');
                }
            } else if (!plugin && (typeof method === 'object' || !method)) {
                var _WTREE = new WTREE();
                $element.data(WTREE_DATA_NS, _WTREE);
                _WTREE.init($element, $.extend({}, $.fn.wtree.defaultSettings, method || {}));
            }
        });
        return result ? result : $(this);
    };

    $.fn.wtree.defaultSettings = {
        rootNodeId: "",
        rootTitle: "",
        subNodeClose: true
    };

    function WTREE(_element, _options) {
        var $element, options;
        function init(_element, _options) {
            $element = _element;
            options = _options;
            _WTREE.init($element, options);
        }

        function draw(nodeId, data) {
            _WTREE.draw($element, options, nodeId, data);
        }

        function select(t, useSelected) {
            _WTREE.select(t, $element, options, useSelected);
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
            openAll: openAll,
            closeAll: closeAll
        };
    }

    var _WTREE = {
        init: function($element, options){
            $element.html("<ul><li data-type=\"" + WTREE_CODE.type.node + "\" data-id=\"" + options.rootNodeId + "\" class=\"root\">" + options.rootTitle + "<li></ul>");
            if(options.fnc){
                options.dataType = WTREE_CODE.dataType.item;
                doFunction(options.fnc, options.rootNodeId);
            }else if(options.data){
                options.dataType = WTREE_CODE.dataType.all;
                _WTREE.draw($element, options, options.rootNodeId, options.data[options.rootNodeId]);
            }
        },
        draw: function ($element, options, nodeId, data) {
            var $c = $element.find("[data-type='" + WTREE_CODE.type.node + "'][data-id='" + nodeId + "']");
            if ($c.children("ul").isObject()) {
                //skip
            } else {
                if(typeof data !== 'object') return;

                var nodes = data.nodes || [],
                    leaves = data.leaves || [],
                    callNodes = [],
                    $ul = $("<ul/>");
                    sb = new stringBuffer();

                $.each(nodes, function () {
                    if(options.dataType == WTREE_CODE.dataType.all && this.hasChildren){
                        callNodes.push(this.id);
                    }
                    sb.append("<li data-type=\"" + WTREE_CODE.type.node + "\" data-id=\"" + this.id + "\"><a href=\"javascript:void(0);\" class=\"item\"><i class=\"" + (this.hasChildren ? WTREE_CODE.icon.plus : WTREE_CODE.icon.empty) + "\"></i><i class=\"" + WTREE_CODE.icon.closed + "\"></i><span>" + $.nvl(this.name, this.id) + "</span></a></li>");
                });

                $.each(leaves, function () {
                    sb.append("<li data-type=\"" + WTREE_CODE.type.leaf + "\" data-id=\"" + this.id + "\" data-data=\"" + $.replace($.getString($.nvl(this.data, "")), "\"", "\'") + "\"><a href=\"javascript:void(0);\" class=\"item\"><i class=\"" + WTREE_CODE.icon.empty + "\"></i><i class=\"" + WTREE_CODE.icon.leaf + "\"></i><span>" + $.nvl(this.name, this.id) + "</span></a></li>");
                });

                if (sb.size() > 0) {
                    $ul.append(sb.toString());
                    $ul.find("a.item").click(function(e, b) {
                        $element.wtree("select", this, b);
                    });
                }

                if(options.dataType == WTREE_CODE.dataType.all && options.rootNodeId != nodeId){
                    $ul.hide();
                }

                $c.append($ul);

                if(callNodes.length>0){
                    callNodes.forEach(function(nodeId){
                        _WTREE.draw($element, options, nodeId, options.data[nodeId]);
                    });
                }
            }
        },
        select: function (t, $element, options, useSelected) {
            var $t = $(t),
                $p = $t.parent(),
                type = $p.attr("data-type"),
                id = $p.attr("data-id");
            
            if(!$.isFalse(useSelected)){
                $element.find("a.item.selected").removeClass("selected");
                $t.addClass("selected");
            }
            
            if (type == WTREE_CODE.type.node) {
                if ($t.find("i." + WTREE_CODE.icon.plus).length == 1) {
                    if ($p.children("ul").length == 0) {
                        doFunction(options.fnc, id);
                    } else {
                        $t.next().show();
                    }
                    $t.find("i." + WTREE_CODE.icon.plus).changeClass(WTREE_CODE.icon.plus, WTREE_CODE.icon.minus);
                    $t.find("i." + WTREE_CODE.icon.closed).changeClass(WTREE_CODE.icon.closed, WTREE_CODE.icon.opened);
                } else if ($t.find("i." + WTREE_CODE.icon.minus).length == 1) {
                    if(options.subNodeClose){
                        //하위포함
                        $p.find("i." + WTREE_CODE.icon.minus).each(function () {
                            $(this).changeClass(WTREE_CODE.icon.minus, WTREE_CODE.icon.plus);
                            $(this).siblings("i." + WTREE_CODE.icon.opened).changeClass(WTREE_CODE.icon.opened, WTREE_CODE.icon.closed);
                            $(this).parent().next().hide();
                        });
                    }else{
                        //현재레벨 
                        $t.find("i." + WTREE_CODE.icon.minus).changeClass(WTREE_CODE.icon.minus, WTREE_CODE.icon.plus);
                        $t.find("i." + WTREE_CODE.icon.opened).changeClass(WTREE_CODE.icon.opened, WTREE_CODE.icon.closed);
                        $t.next().hide();
                    }
                }
            } else if (type == WTREE_CODE.type.leaf) {
                if(options.leafNodeCallback && $.hasValue($p.attr("data-data"))){
                    doFunction(options.leafNodeCallback, $p.attr("data-data"));
                }else{
                    //console.log("leafId : " + id);
                }
            }
        },
        openAll: function($element, options){
            $element.find("a.item>i." + WTREE_CODE.icon.plus).each(function(){
                $(this).parent().trigger("click", false);
            });
        },
        closeAll: function($element, options){
            if(options.subNodeClose){
                $element.find(">ul>li>ul>li>a.item>i." + WTREE_CODE.icon.minus).trigger("click", false);
            }else{
                $element.find("a.item>i." + WTREE_CODE.icon.minus).each(function(){
                    $(this).parent().trigger("click", false);
                });
            }
        }
    }
})(jQuery);