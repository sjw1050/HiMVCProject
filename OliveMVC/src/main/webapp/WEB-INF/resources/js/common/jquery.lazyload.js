/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.3
 *
 */

(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : true,
            appear          : null,
            load            : null,
            placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=",
            add_bottom_scroll: 0,          //20150529 jwlim 상향 스크롤 시 셋팅한 픽셀 먼저 로딩
            sub_top_scroll	: 0			//20150529 jwlim 하향 스크롤 시 셋팅한 픽셀 먼저 로딩
        };

        function update() {
            var counter = 0;

            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                        /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                        /* if we found an image we'll load, reset the counter */
                        counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function() {
                return update();
            });
			
			this.each(function() {
				var self = this;
				var $self = $(self);

				self.loaded = false;

				/* If no src attribute given use data:uri. */
				if ($self.attr("src") === undefined || $self.attr("src") === false) {
					if ($self.is("img")) {
						$self.attr("src", settings.placeholder);
					}
				}

				/* When appear is triggered load original image. */
				$self.one("appear", function() {
					if (!this.loaded) {
						if (settings.appear) {
							var elements_left = elements.length;
							settings.appear.call(self, elements_left, settings);
						}
						$("<img />")
							.bind("load", function() {

								var original = $self.attr("data-" + settings.data_attribute);
								$self.hide();
								if ($self.is("img")) {
									$self.attr("src", original);
								} else {
									$self.css("background-image", "url('" + original + "')");
								}
								$self[settings.effect](settings.effect_speed);

								self.loaded = true;

								/* Remove image from array so it is not looped next time. */
								var temp = $.grep(elements, function(element) {                            	
									return !element.loaded;
								});
								elements = $(temp);

								if (settings.load) {
									var elements_left = elements.length;
									settings.load.call(self, elements_left, settings);
								}
							})
							.bind("error", function() {
								$self.error();
								
								self.loaded = true;
								
								/* Remove image from array so it is not looped next time. */
								var temp = $.grep(elements, function(element) {                            	
									return !element.loaded;
								});
								
								elements = $(temp);
							})
							.attr("src", $self.attr("data-" + settings.data_attribute));
					}
				});

				/* When wanted event is triggered load original image */
				/* by triggering appear.                              */
				if (0 !== settings.event.indexOf("scroll")) {
					$self.bind(settings.event, function() {
						if (!self.loaded) {
							$self.trigger("appear");
						}
					});
				}
			});

			/* Check if something appears when window is resized. */
			$window.bind("resize", function() {
				update();
			});

			/* With IOS5 force loading images when navigating with back button. */
			/* Non optimal workaround. */
			if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
				$window.bind("pageshow", function(event) {
					if (event.originalEvent && event.originalEvent.persisted) {
						elements.each(function() {
							$(this).trigger("appear");
						});
					}
				});
			}

			/* Force initial check if images should appear. */
			$(document).ready(function() {
				update();
			});

			return this;
        } else if (0 === settings.event.indexOf("sequential")) {
			
			var imgCnt = this.length;

			var self = this;
			var $self = $(self);

			$.loadRecursive = function(curImgIdx,imgCnt, list) {
			    if (curImgIdx == undefined || curImgIdx == null) {
                    curImgIdx = 0;
                }
			    
		        var targetImgCnt = imgCnt;
                
                if (targetImgCnt > curImgIdx) {
                    var dstImg = list.eq(curImgIdx);
                    var imgSrc = dstImg.attr("data-" + settings.data_attribute);
                    
                    if (dstImg.is("img")) {
                        dstImg.attr("src", imgSrc);
                    } else {
                        dstImg.css("background-image", "url('" + imgSrc + "')");
                    }
                    
//                    setTimeout(function() {
                        $.loadRecursive(++curImgIdx, targetImgCnt, list);
//                    }, 10);
                }
			}
			
			$.loadRecursive(0, imgCnt, $self);

//			$.loadsequential = function(curImgIdx, imgCnt, list) {
//				if (curImgIdx == undefined || curImgIdx == null) {
//					curImgIdx = 0;
//				}
//				
//				var targetImgCnt = imgCnt;
//				
//				if (targetImgCnt > curImgIdx) {
//					var dstImg = list.eq(curImgIdx);
//					
//					var tmpImg = new Image;
//					tmpImg.onload = function() {
//						dstImg.hide();
//						
//						setTimeout(function() {
//                            $.loadsequential(++curImgIdx, targetImgCnt, list);
//                        }, 10);
//
//						if (dstImg.is("img")) {
//							dstImg.attr("src", this.src);
//						} else {
//							dstImg.css("background-image", "url('" + this.src + "')");
//						}
//
//						dstImg[settings.effect](settings.effect_speed);
//						
//					}
//					tmpImg.onerror = function() {
//					    dstImg.attr("src", settings.placeholder);
//					    
//					    setTimeout(function() {
//                            $.loadsequential(++curImgIdx, targetImgCnt, list);
//                        }, 10);
//					}
//					
//					tmpImg.src = $(dstImg).attr("data-" + settings.data_attribute);
//				}
//			}
//			
//			$.loadsequential(0, imgCnt, $self);
		}


    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop() + settings.add_bottom_scroll;
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height() + settings.add_bottom_scroll;
        }
        
        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop() - settings.sub_top_scroll;
        } else {
            fold = $(settings.container).offset().top - settings.sub_top_scroll;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);
