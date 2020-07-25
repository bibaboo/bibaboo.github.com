/*
 * WjQuery Swipe 0.1.6
 * by composite (wonchu.net@gmail.com)
 * http://www.wonchu.net
 * This project licensed under a MIT License.

 0.1.1 : 최초작성
 0.1.2 : duration 수정 추가 및 lg폰 대응
 0.1.3 : 소스 최적화
 0.1.4 : weightY y좌표 가중치 포함
 0.1.5 : 로직 수정
 0.1.6 : 소스 최적화
 0.1.7 : pos 리턴 추가
*/

(function($){

	var HAS_TOUCH	= "ontouchstart" in window,
		CONST_VAL	= {"name":"wswipe",  "left":"left", "right":"right", "up":"up", "down":"down"};
	$.extend(CONST_VAL, HAS_TOUCH?{"start":"touchstart", "move":"touchmove", "end":"touchend", "cancel":"touchCancel"}:{"start":"mousedown", "move":"mousemove", "end":"mouseup", "cancel":"touchCancel"});

	$.fn.wswipe = function(method){
		this.each(function(i, element) {
			var $element = $(element),
				plugin = $element.data(CONST_VAL.name);
			if (plugin && typeof method === 'string') {
				if (plugin[method]) {
					plugin[method].apply(this, Array.prototype.slice.call(arguments, 1));
				} else {
					console.log('Method ' + method + ' does not exist on jQuery.swipe');
				}
			} else if (!plugin && (typeof method === 'object' || !method)) {
		    	$element.data(CONST_VAL.name, new WSWIPE($element, $.extend({}, $.fn.wswipe.defaultSettings, method || {})));
			}
		});
		return $(this);
	};

	$.fn.wswipe.defaultSettings = {
		swipeLeft:null,
		swipeRight:null,
		maxTimeThreshold:1000,
		threshold:70,
		weightY:1, // 가중치
		skipElements:"button, input, select, textarea, .noSwipe",
		targetLeftElements:".targetLeft",
		targetRightElements:".targetRight"
	};

	function WSWIPE($element, options) {
		let startTime = 0, endTime = 0, pos =0, targetRight = false, targetLeft = false;

		//touch properties
		let distance = 0, direction = null,duration = 0;
		try {
			$element.bind(CONST_VAL.start, 	touchStart);
		}
		catch (e) {
			console.log('events not supported ' + CONST_VAL.start + ' on jQuery.swipe');
		}

		function touchStart(jqEvent){
			if( $(jqEvent.target).closest( options.skipElements, $element).length>0) return;

			let event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent,
				evt = HAS_TOUCH ? event.touches[0] : event;
			pos = {start:{x:0,y:0}, end:{x:0,y:0}};
			pos.start.x = pos.end.x = evt.pageX;
			pos.start.y = pos.end.y = evt.pageY;
			startTime = getTimeStamp();

			$element.unbind(CONST_VAL.end).bind(CONST_VAL.end, 		touchEnd);
			$element.unbind(CONST_VAL.move).bind(CONST_VAL.move, 	touchMove);
		}

		function touchMove(jqEvent) {
			let event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent,
				evt = HAS_TOUCH ? event.touches[0] : event;
			pos.end.x = evt.pageX;
			pos.end.y = evt.pageY;
		}

		function touchEnd(jqEvent) {
			let event = jqEvent.originalEvent;
			endTime = getTimeStamp();
			duration = calculateDuration();
			direction = calculateDirection(pos.start, pos.end);
			distance = calculateDistance(pos.start, pos.end);

			$element.unbind(CONST_VAL.end, 	touchEnd);
			$element.unbind(CONST_VAL.move, touchMove);

			if(distance >= options.threshold && duration <= options.maxTimeThreshold){
				if(typeof(options.print)==="object"){
					options.print.prepend("<div>" + "direction : " + direction + ", distance : " + distance + ", duration : " + duration + "</div>");
				}

				switch (direction) {
					case CONST_VAL.left:
						if (options.swipeLeft) {
							let targetLeft = undefined;
							if($(jqEvent.target).closest( options.targetLeftElements, $element).length==1){
								targetLeft = $(jqEvent.target).closest( options.targetLeftElements, $element);
							}
							options.swipeLeft.call($element, event, direction, distance, duration, "1", targetLeft, pos);
						}
						break;

					case CONST_VAL.right:
						if (options.swipeRight) {
							let targetRight = undefined;
							if($(jqEvent.target).closest( options.targetRightElements, $element).length==1){
								targetRight = $(jqEvent.target).closest( options.targetRightElements, $element);
							}
							options.swipeRight.call($element, event, direction, distance, duration, "1", targetRight, pos);
						}
						break;
				}
			}
		}

		function caluculateAngle(startPoint, endPoint) {
			let x = startPoint.x - endPoint.x,
			 	y = endPoint.y - startPoint.y
			 	r = Math.atan2(y, x), //radians
				angle = Math.round(r * 180 / Math.PI); //degrees

			//ensure value is positive
			if (angle < 0) {
				angle = 360 - Math.abs(angle);
			}

			return angle;
		}

		function calculateDirection(startPoint, endPoint ) {
			let angle = caluculateAngle(startPoint, endPoint);

			if ((angle <= 45) && (angle >= 0)) {
				return CONST_VAL.left;
			} else if ((angle <= 360) && (angle >= 315)) {
				return CONST_VAL.left;
			} else if ((angle >= 135) && (angle <= 225)) {
				return CONST_VAL.right;
			} else if ((angle > 45) && (angle < 135)) {
				return CONST_VAL.down;
			} else {
				return CONST_VAL.up;
			}
		}

		function calculateDistance(startPoint, endPoint) {
			return Math.round(Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)));
		}

		function getTimeStamp() {
			return new Date().getTime();
		}

		function calculateDuration() {
			return endTime - startTime;
		}

		function removeListeners() {
			$element.unbind(CONST_VAL.start, 	touchStart);
			$element.unbind(CONST_VAL.move, 	touchMove);
			$element.unbind(CONST_VAL.end, 		touchEnd);
		}

		this.enable = function () {
			$element.bind(CONST_VAL.start, touchStart);
			return $element;
		};

		this.disable = function () {
			removeListeners();
			return $element;
		};

		this.destroy = function () {
			removeListeners();
			$element.data(CONST_VAL.name, null);
			return $element;
		};
	}
})(jQuery);









































