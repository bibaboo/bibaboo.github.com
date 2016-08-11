/*
 * jQuery wjquery-mpicker 0.9.0
 * by composite (wonchu.net@gmail.com)
 * http://www.wonchu.net
 * This project licensed under a MIT License.
*/

(function($){
	$.fn.mPicker = function(option){
        var $t = $(this);
        var _option = option || {};
        if(!_option.mode) {
        	_option.mode=_option.setting?mPicker.seq():"Date";
        }

        $t.click(function(){
        	mPicker.show("m" + _option.mode + "Picker", this);
        });
        
        mPicker.init("m" + _option.mode + "Picker", option || _option);
    };
 
    var mPicker = new(function() {
    	var lang = {
    		ko : {
    			year : "년",
    			month : "월",
    			day : "일",
    			hour : "시",
    			minute : "분",
    			second : "초",
    			confirm : "확인",
    			cancel : "취소"
    		},
    		en : {
    			year : "Year",
    			month : "Month",
    			day : "Day",
    			hour : "Hour",
    			minute : "Minute",
    			second : "Second",
    			confirm : "Confirm",
    			cancel : "Cancel"
    		}
    	};
    	
        var settings = { 
        	//custom
        	defaultHeight : 80,
        	itemHeight : 40,
        	slideMM : 100,
        	lang : "ko",
        	
        	//system
        	t : null,
        	m : null,
        	seq : 0,
        	mTimePicker : {
        		type : "date",
     			option : {
     				format : "HH:mm",
     				minuteInterval : 30
 	        	},
 	        	
     			setting : [
     			    {lang : "hour", id : "Hour", format : "HH"},
    			    {lang : "minute", id : "Minute", format : "mm"}
     			]
     		},
            mDatePicker : {
            	type : "date",
    			option : {
    				format : "YYYY.MM.DD",
	        		startYear : 5,
	        		endYear : 3
	        	},
	        	
	        	setting : [
    			    {lang : "year", id : "Year", format : "YYYY"},
    			    {lang : "month", id : "Month", format : "MM"},
    			    {lang : "day", id : "Day", format : "DD"}
    			]
    		},
    		mDateTimePicker : {
    			type : "date",
    			option : {
    				format : "YYYY.MM.DD HH:mm",
	        		startYear : 5,
	        		endYear : 3,
	        		minuteInterval : 30
	        	},
	        	
	        	setting : [
    			    {lang : "year", id : "Year", format : "YYYY"},
    			    {lang : "month", id : "Month", format : "MM"},
    			    {lang : "day", id : "Day", format : "DD"},
    			    {lang : "hour", id : "Hour", format : "HH"},
    			    {lang : "minute", id : "Minute", format : "mm"}
    			]
    		}
    	};
         
        function init (mode, _option){
        	if($("#" + mode).length>0) return;
        	if(settings[mode]){
        		$.extend(settings[mode].option, _option);
        	}else{
        		settings[mode] =  _option;
        		settings[mode].type = "basic";
        		$.each(settings[mode].setting, function(index){
        			if(!this.id) this.id = "Sub" + index;
        		});
        	}
        	if(!settings[mode].lang) settings[mode].lang = settings.lang;
        	
        	var html = "";
        	html += '<div class="mPicker" id="' + mode + '"><div class="mpck-container"><div class="mpck-cover"></div><div class="mpck-dialog"><div class="mpck-selects">';
        	$.each(settings[mode].setting, function(){
                html += '<div class="mpck-selects_group"><div class="mpck-selects_group_title">' + (this.title||lang[settings[mode].lang][this.lang]) + '</div><div class="mpck-selects_group_view"><div class="mpck-items" data-height="240" id="' + mode + this.id + '"></div></div></div>';
            });
            html += '</div><div class="mpck-btns"><div class="mpck-btn_span"></div><div class="mpck-btn mpck-btn_ok">' + lang[settings[mode].lang].confirm + '</div><div class="mpck-btn mpck-btn_cancel">' + lang[settings[mode].lang].cancel + '</div></div></div></div></div>';        	
            $("body").append(html);
            
            $.each(settings[mode].setting, function(){
            	make(mode, this.id, this.data||"");
            });
            
            $("#" + mode).find(".mpck-btn_ok").click(function() {
        		get(mode);
            });
            
        	$("#" + mode).find(".mpck-cover, .mpck-btn_cancel").click(function() {
        		hide(mode);
            });
        }
        
        function show (m, t){
        	settings.t = $(t);
        	settings.m = m;
        	$("#" + settings.m).show().find(".mpck-dialog").transition({bottom: "0px"}, settings.slideMM, "easeOutCubic", set);
        }
        
        function set(){
        	var val = settings.t.attr("data-val")||settings.t.val();
        	if(settings[settings.m].type=="date"){
        		var dt = val==""?moment():moment(val, settings[settings.m].option.format);
	        	
	        	if(settings.m == "mDatePicker" || settings.m == "mDateTimePicker"){
	        		checkMonth(moment(dt, "YYYYMM"));
	    		}
	        	
	        	$.each(settings[settings.m].setting, function(){
	        		if($("#" + settings.m + this.id).find("div.mpck-item[data-val='" + moment(dt).format(this.format)  + "']").length==1){
	        			$("#" + settings.m + this.id).find("div.mpck-item[data-val='" + moment(dt).format(this.format)  + "']").trigger("move");
	        		}else{
	        			$("#" + settings.m + this.id).find("div.mpck-item:eq(0)").trigger("move");
	        		}
	        	});
        	}else{
        		var values = val==""?[]:val.split(","),
        			b = values.length==settings[settings.m].setting.length;
        		$.each(settings[settings.m].setting, function(index){
	        		if(b && $("#" + settings.m + this.id).find("div.mpck-item[data-val='" + values[index]  + "']").length==1){
	        			$("#" + settings.m + this.id).find("div.mpck-item[data-val='" + values[index]  + "']").trigger("move");
	        		}else{
	        			$("#" + settings.m + this.id).find("div.mpck-item:eq(0)").trigger("move");
	        		}
	        	});
        	}
        }
        
        function get(mode){
        	if(settings[mode].type=="date"){
        		if(settings[mode].callback){
            		settings[mode].callback(getDate());
            	}else{
            		settings.t.val(getDate().format(settings[mode].option.format));
            	}
        	}else{
        		var a = getBasic();
    			if(settings[mode].callback){
            		settings[mode].callback(a);
            	}else{
            		settings.t.val(a.text.join(","));
            		settings.t.attr("data-val", a.value.join(","));
            	}
        	}
        	
        	hide(mode);
        }
        
        function getBasic(){
        	var values = [],
        		texts = [];
        	$.each(settings[settings.m].setting, function(){
        		var $t = $("#" + settings.m + this.id).find("div.mpck-selected");
        		values.push($t.attr("data-val"));
        		texts.push($t.text());
            });
        	return {value:values, text:texts};
        }
        
        function getDate(arr){
        	var _t="",_f="";
        	settings[settings.m].setting.forEach(function(a) {
        		var b = true;
        		if($.isArray(arr)){
        			if(!hasKeyInArray(arr, a.id)){
        				b = false;
        			}
        		}
        		if(b){
        			_t += $("#" + settings.m + a.id).find("div.mpck-selected").attr("data-val");
                	_f += a.format;
        		}
            });
        	return moment(_t, _f);
        }
         
        function hide (mode){
        	settings.t = null;
        	settings.m = null;
        	$("#" + mode).find(".mpck-dialog").transition({bottom: "-300px"}, settings.slideMM, "easeOutCubic", function(){
        		$("#" + mode).hide();
        	});
        }
         
        function make(mode, id, data){
        	switch (id) {
			    case "Year":
			    	var _year = [];
		            for(var i=moment().year()-settings[mode].option.startYear; i<moment().year()+settings[mode].option.endYear;i++){
		            	_year.push(i);
		            }
		            render(mode, id, _year);
				    break;
			    case "Month":
			    	var _month = [];
			    	for(var i=1;i<=12;i++){
			    		_month.push(lPad(String(i), 2, "0"));
			        }
			    	render(mode, id, _month);
				    break;
			    case "Day":
			    	var _day = [];
			    	for(var i=1;i<=31;i++){
			    		_day.push(lPad(String(i), 2, "0"));
			        }
			    	render(mode, id, _day);
				    break;
			    case "Hour":
			    	var _hour = [];
			    	for(var i=0;i<=23;i++){
			    		_hour.push(lPad(String(i), 2, "0"));
			        }
			    	render(mode, id, _hour);
				    break;
			    case "Minute":
			    	var _minute = [];
			    	for(var i=0;i<60;i++){
			    		if(i%settings[mode].option.minuteInterval==0){
			    			_minute.push(lPad(String(i), 2, "0"));
			    		}
			        }
			    	render(mode, id, _minute);
				    break;
			    default:
			    	if($.isArray(data)){
			    		render(mode, id, data);
			    	}
			        break;
			}
        }
        
        function render(mode, id, data){
	        var html = "";
	        $.each(data, function(index, value){
	        	if(typeof(value)=="object"){
	        		html += '<div class="mpck-item" data-val="' + this.value + '">' + this.text + '</div>';
	        	}else{
	        		html += '<div class="mpck-item" data-val="' + this + '">' + this + '</div>';
	        	}
	        });
	        $("#" + mode + id).empty().html(html).attr("data-height", data.length * settings.itemHeight);
	        new scroller(mode, id);
        }
        
        function scroller(mode, id){
        	var $c = $("#" + mode + id),
        		self = this,
            	havedClicked = false,
            	startPosY = 0,
	            currentPosY = 0,
	            startTranslatedY = 0,
	            currentTranslatedY = startTranslatedY,
	            startTime = 0,
	            endTime = 0,
	            lastTime = (new Date()).getTime(),
	            lastPosY = 0,
	            lastV = 0;
        	
        	$c.on('touchstart', function(jqEvent) {
        		var e = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;
                currentPosY = startPosY = e.changedTouches[0].pageY;
                startTime = (new Date()).getTime();
                startTranslatedY = parseInt($c.css("webkitTransform").split(",").pop().replace(" ", "").replace(")", ""));
                lastV = 0;
             });

        	$c.on('touchmove', function(jqEvent) {
        		var e = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;
                e.preventDefault(); //prevent default scrolling event when touch moving
                lastV = (e.changedTouches[0].pageY - lastPosY) / ((new Date()).getTime() - lastTime);
                currentPosY = e.changedTouches[0].pageY;
                currentTranslatedY = startTranslatedY + currentPosY - startPosY;
                trans($c, 0, currentTranslatedY);
                lastPosY = currentPosY;
                lastTime = (new Date()).getTime();
        	});

        	$c.on('touchend', function(jqEvent) {
        		var e = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;
                 	endTime = (new Date()).getTime();
                if(Math.abs(currentPosY - startPosY) > 5 && endTime - startTime > 50) {
                	var v = lastV,
                        s = v > 0 ? 0.5 * v * v / 0.001 : -0.5 * v * v / 0.001,
                        t = Math.abs(v) / 0.001;
                    currentTranslatedY = parseInt($c.css("webkitTransform").split(",").pop().replace(" ", "").replace(")", ""));
                    currentTranslatedY += s;
                    var residue = currentTranslatedY % settings.itemHeight;
                    if (Math.abs(residue) >= 20) {
                    	if (residue < 0)
                            currentTranslatedY += ((settings.itemHeight + residue) * -1);
                        else {
                            currentTranslatedY += (settings.itemHeight - residue);
                        }
                    } else {
                        currentTranslatedY -= residue;
                    }
                    if (currentTranslatedY > settings.defaultHeight) {
                        currentTranslatedY = settings.defaultHeight;
                    } else if (currentTranslatedY < ($c.attr("data-height") - (settings.defaultHeight+settings.itemHeight)) * (-1)) {
                        currentTranslatedY = ($c.attr("data-height") - (settings.defaultHeight+settings.itemHeight)) * (-1);
                    }
                    
                    trans($c, t / 1000, currentTranslatedY);
                    self.selectedIndex = Math.abs((currentTranslatedY - settings.defaultHeight) / (-settings.itemHeight));
                    $c.find(".mpck-item").removeClass("mpck-selected").eq(self.selectedIndex).addClass("mpck-selected");
                    select(id, self.selectedIndex);
                    havedClicked = false;
                } else {
                	havedClicked = true;
                }
                
                startPosY = 0;
                currentPosY = 0;
                startTranslatedY = 0;
                currentTranslatedY = 0;
                startTime = endTime = 0;
                lastPosY = lastV = 0;
        	});
        	
        	$c.on("click", ".mpck-item", function(e) {
        		if (havedClicked) {
        			_click(this, "c");
                }
            }).on("move", ".mpck-item", function(e) {
        		_click(this, "m");
            });
        	
        	function _click(t, m){
        		var $t = $(t),
                itemPositionY = $t.position().top,
                currentTranslatedY = settings.defaultHeight - itemPositionY;
            
				trans($c, 0.3, currentTranslatedY);
	            $c.find(".mpck-item").removeClass("mpck-selected");
	            $t.addClass("mpck-selected");
	            self.selectedIndex = Math.abs((currentTranslatedY - settings.defaultHeight) / (-settings.itemHeight));
	            if(m=="c"){
	            	select(id);
	            }
	            
	            havedClick = false;
        	}
        }
        
        function trans($c, s, y){
        	$c.css({
        		'-webkit-transition': '-webkit-transform ' + s + 's ease-out',
                '-webkit-transform': 'translate3d(0, ' + y + 'px, 0)'
           });
        }
        
        function select(id){
        	if((id=="Year" || id=="Month") && $("#" + settings.m + "Day")){
        		dt = getDate(["Year", "Month"]);
        		checkMonth(dt);
        		if($("#" + settings.m + "Day div.mpck-selected").is(":hidden")){
        			$("#" + settings.m + "Day div.mpck-item:eq(0)").trigger("move");
        		}
        	}
        }
        
        function checkMonth(dt){
    		var $c = $("#" + settings.m + "Day"),
    			n1 = $c.find(".mpck-item:visible").length;
    			n2 = dt.daysInMonth();
        	if(n1!=n2){
        		$c.find(".mpck-item:hidden").show();
        		$c.find(".mpck-item:gt(" + (n2-1) + ")").hide();
        		$c.attr("data-height", n2 * settings.itemHeight);
        	}
        	
        	$c.find("div.mpck-sat").removeClass("mpck-sat");
        	$c.find("div.mpck-sun").removeClass("mpck-sun");
        	
        	//weekday
        	$.each($("#" + settings.m + "Day>div.mpck-item:visible"), function(){
        		dt.set("date", $(this).attr("data-val"));
        		switch (dt.weekday()){
        			case 0:
        				$(this).addClass("mpck-sun");
        				break;
        			case 6:
        				$(this).addClass("mpck-sat");
        				break;
        			default:
        				break;
        		}
        	});
        }
        
        function seq(){
        	return "mpckSeq" + settings.seq++;
        }
        
        function hasKeyInArray(a, k){
    		for (var _k in a) {
    			if(($.isArray(a)?a[_k]:_k)==k){
                    return true;
                }
		    }
            return false;
        }
        
        function lPad(v, n, p){
            while(n > v.length) { v = p + v; }
            return v;
        }
        
        return {
            init:init,
            show : show,
            hide : hide,
            seq : seq
        };
         
    })();

})(jQuery);