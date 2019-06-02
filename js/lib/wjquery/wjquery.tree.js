/*
 * wjquery.tree 0.1.0
 * by composite (wonchu.net@gmail.com)
 * http://www.wonchu.net
 * This project licensed under a MIT License.

 0.1.0 : 최초작성
*/

(function($){
    var WTREE_DATA_NS = "wtree",
        WTREE_CODE = {
            type : {
                node : "N",
                leaf : "L"
            },
            icon : {
                plus : "plus",
                minus : "minus",
                empty : "empty",
                node : "node",
                leaf : "leaf"
            }
        };
	$.fn.wtree = function(method){
		var result, _arguments = arguments;
		this.each(function(i, element) {
            var $element = $(element), plugin = $element.data(WTREE_DATA_NS);
            
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
		return result?result:$(this);
	};

	$.fn.wtree.defaultSettings = {
        rootNodeId : "",
        rootTitle : "root"
	};

	function WTREE(_element, _options) {
        var $element, options;
		function init(_element, _options){
			$element = _element;
            options = _options;

            $element.html("<ul><li data-type=\"" + WTREE_CODE.type.node + "\" data-id=\"" + _options.rootNodeId + "\" class=\"root\">" + _options.rootTitle + "<li></ul>");
            doFunction(_options.fnc, _options.rootNodeId);
        }

		function draw(nodeId, data){
			_WTREE.draw($element, options, nodeId, data);
        }
        
        function select(t){
            var $t = $(t),
                $p = $t.parent(),
                type = $p.attr("data-type");
                id = $p.attr("data-id");

            if(type==WTREE_CODE.type.node){
                if($t.find("i." + WTREE_CODE.icon.plus).length==1){
                    if($p.children("ul").length==0){
                        doFunction(options.fnc, id);
                    }else{
                        $t.next().show();
                    }
                    $t.find("i." + WTREE_CODE.icon.plus).changeClass(WTREE_CODE.icon.plus, WTREE_CODE.icon.minus);
                }else if($t.find("i.minus").length==1){
                    /* 현재레벨 
                    $t.find("i.minus").changeClass("minus", "plus");
                    $t.next().hide();
                    */

                    //* 하위포함
                    $p.find("i." + WTREE_CODE.icon.minus).each(function(){
                        $(this).changeClass(WTREE_CODE.icon.minus, WTREE_CODE.icon.plus);
                        $(this).parent().next().hide();
                    });
                    //*/
                }
            }else if(type==WTREE_CODE.type.leaf){
                $.alert(id);
            }
		}
		
		return {
            init:init,
            draw:draw,
            select:select
		};
	}

	var  _WTREE = {
		draw : function($element, options, nodeId, data){
            var $c = $element.find("[data-type='" + WTREE_CODE.type.node + "'][data-id='" + nodeId + "']");
            if($c.children("ul").isObject()){
            }else{
                var nodes = data.nodes||[],
                    leaves = data.leaves||[];
                    $ul = $("<ul/>");

                var sb = new stringBuffer();
                $.each(nodes, function(){
                    sb.append("<li data-type=\"" + WTREE_CODE.type.node + "\" data-id=\"" + this.nodeId + "\"><a href=\"javascript:void(0);\" class=\"item\"><i class=\"" + (this.hasChildren?WTREE_CODE.icon.plus:WTREE_CODE.icon.empty) + "\"></i><i class=\"" + WTREE_CODE.icon.node + "\"></i><span>" + this.nodeId +  "</span></a></li>");
                });

                $.each(leaves, function(){
                    sb.append("<li data-type=\"" + WTREE_CODE.type.leaf + "\" data-id=\"" + this.leafId + "\"><a href=\"javascript:void(0);\" class=\"item\"><i class=\"" + WTREE_CODE.icon.empty + "\"></i><i class=\"" + WTREE_CODE.icon.leaf + "\"></i><span>" + this.leafId +  "</span></a></li>");
                });

                if(sb.size()>0){
                    $ul.append(sb.toString());
                    $ul.find("a.item").click(function(){
                        $element.wtree("select", this);
                    });
                    $c.append($ul);
                }
            }
        },
        select : function(t, fnc){
            alert(fnc)
        }
	}
	
})(jQuery);








































