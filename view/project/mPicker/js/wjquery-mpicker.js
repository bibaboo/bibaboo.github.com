(function($){
	
	$.fn.mDatePicker = function(option){
        var $t = $(this);
        $t.click(function(){
        	mPicker.show("date", this);
        });
        
        mPicker.init("date", option || {});
    };
 
    var mPicker = new(function() {
        var option = {
        		startYear : 5,
        		endYear : 3
        	},
        	options = {},
        	settings = {
        		"date" : {
        			setting : [
        			    {title : "년", id : "mDatePickerYear"},
        			    {title : "월", id : "mDatePickerMonth"},
        			    {title : "일", id : "mDatePickerDay"},
        			]
        		}
        	};
         
        function init (mode, _option){
        	if($("#mDatePicker").length>0) return;
        	options[mode] = $.extend({}, option, _option);
        	make(mode);
        	
        	$("#mDatePicker").find(".scs_cover").click(function() {
        		mPicker.hide();
            });
        }
        
        function show (mode){
        	$("#mDatePicker").show();
        	$("#mDatePicker").find(".scs_dialog").slideDown(300);
        }
        
        function hide (mode){
        	$("#mDatePicker").find(".scs_dialog").slideUp(300, function(){
        		$("#mDatePicker").hide();
        	});
        }
         
        function make(mode){
        	var html = "";
        	
        	 html += '<div class="cascade_scroll_selects" id="mDatePicker"><div class="scs_container"><div class="scs_cover"></div><div class="scs_dialog"><div class="scs_selects">';
        	 settings[mode].setting.forEach(function(a) {
                 html += '<div class="scs_selects_group"><div class="scs_selects_group_title">' + a.title + '</div><div class="scs_selects_group_view"><div class="scs_items" data-height="240" id="' + a.id + '"></div></div></div>';
             });
             html += '</div><div class="scs_btns"><div class="scs_btn_span"></div><div class="scs_btn scs_btn_ok">확인</div><div class="scs_btn scs_btn_cancel">취소</div></div></div></div></div>';        	
             $("body").append(html);
             
             var _year = [],
             	_month = ["1","2","3","4","5","6","7","8","9","10","11","12"],
             	_day = [];
             
             var current = moment();
             for(var i=current.year()-options[mode].startYear; i<current.year()+options[mode].endYear;i++){
            	 _year.push(i);
             }
             for(var i=1; i<=current.daysInMonth();i++) _day.push(i);
             
             render("mDatePickerYear", _year);
        }
        
        function render(id, data){
	        var html = "",
	        	sIndex = 0,
	            currentTranslatedY = 80 - sIndex * 40;
	        $.each(data, function(index){
	        	if (sIndex != index)
                    html += '<div class="scs_item" data-val="' + this + '">' + this + '</div>';
                else {
                    html += '<div class="scs_item scs_selected" data-val="' + this + '">' + this + '</div>';
                }
	        });
	        alert(html)
	        $("#" + id).html(html)
	        .attr("data-height", data.length * 40)
	        .css('-webkit-transform', 'translate3d(0, ' + currentTranslatedY + 'px, 0)')
	        .css('transform', 'translate3d(0, ' + currentTranslatedY + 'px, 0)');
        }
        
        
        
        return {
            init:init,
            show : show,
            hide : hide
        }
         
    })();

})(jQuery);