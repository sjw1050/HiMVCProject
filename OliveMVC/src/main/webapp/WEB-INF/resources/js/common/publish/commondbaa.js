if (!Array.prototype.indexOf)
{
    Array.prototype.indexOf = function(elt /*, from*/)
    {
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0)
            ? Math.ceil(from)
            : Math.floor(from);
        if (from < 0)
            from += len;

        for (; from < len; from++)
        {
            if (from in this &&
                this[from] === elt)
                return from;
        }
        return -1;
    };
}

//stg checked
if(location.href.indexOf('stg.oliveyoung.co.kr') > 0){
    $('body').append('<div class="stg_flag"><span>STG</span></div>')
}

(function($){

    //레이어 오픈 함수
    $.fn.layerOpen = function(options){
        return this.each(function(){
            var _this = $(this);
            var _layer = $('#'+ _this.attr('data-target') || null);
            var _marLeft = _layer.width()/2;
            _this.click(function(e){
                e.preventDefault();
                
                var _layer_pos;
                _marLeft = _layer.width()/2;
                
                if(_layer.height() > $(window).height()){
                    _layer_pos = $(window).scrollTop();
                    console.log( $(this).width());
                }else{
                    _layer_pos = $(window).scrollTop() + ($(window).height() - _layer.height())/2;
                    console.log( _layer.width());
                }
                _layer.css('margin-left','-'+ _marLeft +'px');
                _layer.attr('tabindex', 0).addClass('show').css({'top': _layer_pos +'px'}).focus();
                
                if(_layer.find('.prd_option_box').length > 0){          //셀렉트 옵션이 있는 경우
                    option_reSet(_layer);
                }
                
                $('body').append('<div class="dimm"></div>');
                _layer.find('.layer_close').one('click', function(){    //닫기버튼 클릭 시
                    $('.dimm').remove();
                    _layer.removeClass('show');
                    $('body').removeAttr('style');
                    _this.focus();
                });
                
                _layer.find('.btn_layer_confirm').one('click', function(){    //확인버튼 클릭 시
                    $('.dimm').remove();
                    _layer.removeClass('show');
                    _this.focus();
                });
                
                $('.dimm').one('click', function(){                     //레이어 외 영역 클릭 시
                    $('.dimm').remove();
                    _layer.removeClass('show');
                    _this.focus();
                });
            });
        });
    };
    
    $.fn.kioskLayerOpen = function(options){
        return this.each(function(){
            var _this = $(this);
            var _layer = $('#'+ _this.attr('data-target') || null);
            var _marLeft = _layer.width()/2;
            _this.click(function(e){
                e.preventDefault();
                
                var _layer_pos;
                
                $('#kioskBody').addClass('fixing');
                $('body').addClass('fixing');
                
                if(_layer.height() > $(window).height()){
                    _layer_pos = $(window).scrollTop();
                }else{
                    _layer_pos = $(window).scrollTop() + ($(window).height() - _layer.height())/2;
                }
                $('body').addClass('fixing');
                _layer.css('margin-left','-'+ _marLeft +'px');
                _layer.attr('tabindex', 0).addClass('show').css({'top': _layer_pos +'px'}).focus();
                
                if(_layer.find('.prd_option_box').length > 0){          //셀렉트 옵션이 있는 경우
                    option_reSet(_layer);
                }
                
                $('body').append('<div class="dimm"></div>');
                
                _layer.find('.layer_close').one('click', function(){    //닫기버튼 클릭 시
                    $('.dimm').remove();
                    $('#kioskBody').removeClass('fixing');
                    $('body').removeClass('fixing');
                    _layer.removeClass('show');
                    _this.focus();
                });
                $('.dimm').one('click', function(){                     //레이어 외 영역 클릭 시
                    $('.dimm').remove();
                    $('#kioskBody').removeClass('fixing');
                    $('body').removeClass('fixing');
                    _layer.removeClass('show');
                    _this.focus();
                });
            });
        });
    };
    
    
    //탭 토글 함수
    $.fn.tabToggle = function(options){
        var defaults = {
            cont_nm : '.tabConts',          //기본 탭 컨텐츠 클래스
            init_no : 0                     //탭 오픈 idx
        }
        options = $.extend(defaults, options);

        return this.each(function(){
            var _idx = options.init_no;
            var _this = $(this);
            
            _this.children('li:eq('+ _idx +')').addClass('on').siblings('li').removeClass();
            $(options.cont_nm).eq(_idx).addClass('show').siblings(options.cont_nm).removeClass('show');

            _this.find('a').click(function(e){
                e.preventDefault();
                _idx = $(this).parent().index();
                
                _this.children('li:eq('+ _idx +')').addClass('on').siblings('li').removeClass();
                $(options.cont_nm).eq(_idx).addClass('show').siblings(options.cont_nm).removeClass('show');
            });
            
        });       
    }
    
    
    $.fn.mainMenu = function(){
        
    }
    
    
    function option_reSet(obj){
        obj.find('.sel_option').html('상품을 선택해주세요');
    }
    
})(jQuery);

var setTimeLayer;

jQuery(function($){
    var oyoGnb = {
        init : function(){
            gnbMenu = $('#gnbWrap');
            myMenu = $('.mymenu_area');
            myMenu_li = myMenu.children('li');
           
            this.addEvent();
        },
        addEvent : function(){
            
            myMenu_li.on('mouseenter', function(){
                var _this = $(this);
                //3310501 (Action Item) 중복호출 제거 - pc최근본 상품 중복호출 제거
			    /* 임시로 클릭이벤트로 변경 예정(recent class를 가지고 있지 않는 li에 대해서만 작동하도록 임시 변경)
			     * 브세 이후에 Storage를 이용한 고도화 예정 */
                if(!_this.hasClass('recent')){
                	if(_this.hasClass('open')){
                		return;
                	}else{                   
                		setTimeLayer = setTimeout(function(){
                			_this.addClass('open');
                		}, 200);
                	}                	
                }
            })
            .on('mouseleave', function(){
                clearTimeout(setTimeLayer);
                $(this).removeClass('open');
            })
            .on('focusin', function(e){
                e.preventDefault();
                $(this).addClass('open').siblings().removeClass('open');
                
            });
 
            
            //GNB 카테고리 레이어 열기/닫기 
            $('#btnGnbOpen').click(function(e){
                e.preventDefault();
                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                    $('.layer_all_menu').removeClass('active');
                }else{
                    $(this).addClass('active');
                    $('.layer_all_menu').addClass('active');
                }
            });
            $('#btnGnbClose').click(function(e){
                e.preventDefault();
                $(this).removeClass('active');
                $('.layer_all_menu').removeClass('active');
            });
        }
    };
    oyoGnb.init();
    
    
    
    //placeholder 처리(IE9 이하 지원)
    $('.inp_placeholder').each(function(){
        var tx_placeholder = $(this).attr('data-placeholder');
        var tx_placeholder_id = $(this).attr('id');
        if(tx_placeholder != null && tx_placeholder != '' && tx_placeholder_id != null && tx_placeholder_id != ''){
            if($(this).hasClass('inp_mid')){
                $(this).wrap('<div class="placeholder_area middle"></div>');
            }else if($(this).hasClass('inp_small')){
                $(this).wrap('<div class="placeholder_area small"></div>');
            }else{
                $(this).wrap('<div class="placeholder_area"></div>');
            }            
            $(this).before('<label for="'+ $(this).attr('id') +'">'+ tx_placeholder +'</label>');
        }
        if($(this).val() != ''&& $(this).val() != null){
            $(this).parent().find('label').addClass('hide');
        }
    });
    
    $('.inp_placeholder').on({
       'focus' : function(){
           $(this).parent().find('label').addClass('hide');
       },
       'blur' : function(){
           if($(this).val() !='' && $(this).val() != null){
               $(this).parent().find('label').addClass('hide');
           }else{
               $(this).parent().find('label').removeClass('hide');
           }
       }
    });   


    
    var header_search = {
        init : function(){
            
            search_input = $('.search_box input');      
            search_tab = $('.search_tab');
            
            this.addEvent();
        }, 
        addEvent : function(){
            
            search_input.focusin(function(e){
                var key_val = e.which;

                $(this).parents('.search_box').addClass('active');
            });            
            search_tab.click(function(e){
               e.preventDefault();
               $(this).addClass('on').siblings('.search_tab').removeClass('on');
            });
        }        
    };
    
    $('.search_box').length && header_search.init();
    
    
    //클릭 시 활성화되어 있는 영역 닫기
    $(document).on({        
        'click' : function(e){
            //헤더 검색 레이어
            if(!$('.search_box.active').is(e.target) && $('.search_box.active').has(e.target).length === 0){
                $('.search_box').removeClass('active');
            }
            
            //전체 카테고리 레이어
            if($('.layer_all_menu.active').has(e.target).length === 0 && e.target.id !== 'btnGnbOpen'){
                $('#btnGnbOpen').removeClass('active');
                $('.layer_all_menu').removeClass('active');
            }
            
            //푸터 계열사 바로가기
            if($('.sel_family_group').has(e.target).length === 0){
                $('.sel_family_group .sel_option_list').addClass('hide');
            }
        },
        'focusin' : function(e){
            if($('.search_box.active').has(e.target).length === 0){
                $('.search_box').removeClass('active');
            }
            if($('.layer_all_menu.active').has(e.target).length === 0){
                $('#btnGnbOpen').removeClass('active');
                $('.layer_all_menu').removeClass('active');
            }
            if($('.main_cate_wrap.active').has(e.target).length === 0){
                $('.main_cate_wrap').removeClass('active');
            }
            if($('.mymenu_area .store.open').has(e.target).length === 0){
                $('.mymenu_area .store.open').removeClass('open');
            }
            if($('.mymenu_area .recent.open').has(e.target).length === 0){
                $('.mymenu_area .recent.open').removeClass('open');
            }
        }
    });

    // [3550713] (큐레이션) PC 메인>매장추천 매장이미지 개선 요청의 건 - 매장 이미지 크롭
    var divs = document.querySelectorAll('.newOpenStoreType2 > .slideItem');
    for (var i = 0; i < divs.length; ++i) {
        var div = divs[i
        ];
        var divAspect = div.offsetHeight / div.offsetWidth;
        div.style.overflow = 'hidden';
        
        var img = div.querySelector('img');
        var imgAspect = img.height / img.width;

        if (imgAspect <= divAspect) {
        // 이미지가 div보다 작을 경우 세로를 div에 맞추고 가로는 자름
        var imgWidthActual = div.offsetHeight / imgAspect;
        var imgWidthToBe = div.offsetHeight / divAspect;
        var marginLeft = -Math.round((imgWidthActual - imgWidthToBe) / 2)
        img.style.cssText = 'width: auto; height: 100%; margin-left: '
                        + marginLeft + 'px;'
        } else {
        // 이미지가 div보다 길 경우 가로를 div에 맞추고 세로를 자름
        img.style.cssText = 'width: 100%; height: auto;'
        var imgHeight = (img.height-div.offsetHeight)/2;
        //console.log(imgHeight);
        img.style.cssText = 'width: 100%; height: auto; margin-left: 0;margin-top:-'+imgHeight+'px';
        }
    };
  
    
    //로케이션 레이어 세팅 & 띄우기
    var history_loc = {
        init : function(){
            $('.history_cate_box').each(function(){
                $(this).css('width', ($(this).find('ul').length * 120) + 2+ 'px'); 
            });
            
            this.addEvent();
        },
        addEvent : function(){
            
            $('.page_location .loc_history').find('li').on({
                'mouseover' : function(e){
                    if($(this).find('a').hasClass('cate_y')){
                        $(this).addClass('active');
                    }
                },
                'mouseout' : function(e){
                    $(this).removeClass('active');
                }
            });
            
            //페이지 로케이션 클릭/포커스 이벤트 추가(접근성 관련)
            $('.page_location .loc_history').find('.cate_y').on({
                'focusin' : function(e){
                    $('.page_location .loc_history li').removeClass('active');
                    $(this).parent().addClass('active');
                }
            });           
            
            var last_idx = null;
            var cur_idx = 0;
            $('.page_location .loc_history .history_cate_box').find('a').on({
                'focusin' : function(){
                    if(last_idx == null){
                        last_idx = $(this).parents('.history_cate_box').find('ul > li').length - 1;
                    }
                },
                'focusout' : function(){
                    cur_idx = ($(this).parent().parent().index() * 10) + $(this).parent().index();
                    
                    if(cur_idx == last_idx){
                        $(this).parents('li').removeClass('active');
                        last_idx = null;
                    }
                }
            });
                        
        }
    };
    
    $('.history_cate_box').length && history_loc.init();
    
    //2017-02-08 찜하기 스크립트 추가
    /*$('.tbl_prd_list').find('.btnSmall.zzim').click(function(){
       $(this).toggleClass('on'); 
    });*/
    
    
    //2017-02-20 추가 (메인 플로팅배너)
    var floatBanner = {
        init : function(){
            float_banner_pos = parseInt($('.main_floating_banner').css('top'), 10);
            this.addEvent(float_banner_pos);
        },
        addEvent : function(pos){
            $(window).scroll(function(){
                var scroll_pos = $(window).scrollTop();
                if(scroll_pos > pos){
                    $('.main_floating_banner').stop().animate({'top' : scroll_pos +'px'});
                }else{
                    $('.main_floating_banner').stop().animate({'top' : pos +'px'});
                }
            });
        
        }
    }
    $('.main_floating_banner').length && floatBanner.init();
    
    //top 버튼 액션 추가
    
    
    var fnBtnAction = {
        init : function(){
            var scroll_pos = $(window).scrollTop();
            if(scroll_pos > $(window).height() / 2){
                $('#directTop').fadeIn(500);
            }
            
            this.addEvent();
        },
        addEvent : function(){
            $(window).scroll(function(){
                var scroll_pos = $(window).scrollTop();
                
                if(scroll_pos > $(window).height() / 2){
                    $('#directTop').fadeIn(500);
                }else if(scroll_pos == 0){
                    $('#directTop').fadeOut(500);
                }                
            });
            $('#directTop button').click(function(){
                $(window).scrollTop(0);
            });
        }
    }
    $('#directTop').length && fnBtnAction.init();

    
    
    
    //2021-02-09 : ie scroll bug 수정 (레이어 팝업 스크롤)
    $('.layer_pop_wrap').on('scroll mousewheel touchmove', '.layer_scroll_box2', function(e){
        if(e.originalEvent.wheelDelta){
            if(e.originalEvent.wheelDelta >= 120){
                this.scrollTop -= 50;
            }else if(e.originalEvent.wheelDelta <= -120){
                this.scrollTop += 50;
            }
            return false;
        }
    });
    $('.layer_pop_wrap').on('scroll mousewheel touchmove', '.layer_scroll_box', function(e){
        if(e.originalEvent.wheelDelta){
            if(e.originalEvent.wheelDelta >= 120){
                this.scrollTop -= 50;
            }else if(e.originalEvent.wheelDelta <= -120){
                this.scrollTop += 50;
            }
            return false;
        }
    });
        
    
    // 2017-03-02 수정 : 주문/결제 스크립트 이동(페이지내 => common.js로)
    var ordBoxSet = {
        init : function(){
            this.addEvent();
        },
        addEvent : function(){
            
            var oBox = $('.order_payment_box');                                  //결제정보 영역            
            var oBox_h = 0, oBox_pos = 0, rBox_h = 0, oBox_e_pos = 0, scl_pos = 0;                            //결제정보 변수 값 초기화                                     
            
            $(window).scroll(function(){
                
                init_val();
                                
                if(oBox_h > rBox_h){                                                  //주문정보가 최종결제정보 높이보다 작으면(스크롤이 되야함)
                    scl_pos = $(window).scrollTop();                                   //현재 스크롤 위치
               
                    if(scl_pos >= oBox_e_pos - rBox_h){
                        oBox.removeClass('fixArea').addClass('relArea');
                    }else if(oBox_pos <= scl_pos && oBox_e_pos > scl_pos){
                        oBox.addClass('fixArea').removeClass('relArea');
                    }else{
                        oBox.removeClass('fixArea').removeClass('relArea').removeClass('areaCless');
                    }
                }
            });
            
            //약관보기 버튼 클릭 시
            $('.btnDetailAgree').click(function(){
                
                var _elem = $('.agree_payment_box');
                
                if(_elem.hasClass('open')){
                    _elem.removeClass('open');
                }else{
                    _elem.addClass('open');
                }             
                init_val();
                
                scl_pos = $(window).scrollTop();
                
                if(rBox_h > oBox_h){    //오른쪽 영역이 전체영역보다 클 경우는 영역 전체가 늘어나야하므로 fixArea/relArea 클래스 삭제
                    oBox.removeClass('fixArea').removeClass('relArea');
                }else{
                    if(oBox.hasClass('fixArea')){
                        if(oBox_e_pos - scl_pos < rBox_h){
                            oBox.addClass('relArea').removeClass('fixArea');
                        }                        
                    }else if(oBox.hasClass('relArea')){
                        if(oBox_e_pos - scl_pos > rBox_h){
                            oBox.removeClass('relArea').addClass('fixArea');
                        }
                    }
                }
            });
            
            $('.payment_info_form').children('li:first-child').find('input[type="radio"]').click(function(){                
                
                setTimeout(function(){                  //동시 발생하는 이벤트에서 늦게 실행시키기 위해 사용
                    init_val();
               
                    scl_pos = $(window).scrollTop();
                    
                    if(rBox_h > oBox_h){    //오른쪽 영역이 전체영역보다 클 경우는 영역 전체가 늘어나야하므로 fixArea/relArea 클래스 삭제
                        oBox.removeClass('fixArea').removeClass('relArea');
                    }else{
                        if(oBox.hasClass('fixArea')){
                            if(oBox_e_pos - scl_pos < rBox_h){
                                oBox.addClass('relArea').removeClass('fixArea');
                            }                        
                        }else if(oBox.hasClass('relArea')){
                            if(oBox_e_pos - scl_pos > rBox_h){
                                oBox.removeClass('relArea').addClass('fixArea');
                            }
                        }
                    }
                }, 10);
                
            });
            
            
            var init_val = function(){
                oBox_h = parseInt(oBox.height(), 10);
                oBox_pos = parseInt(oBox.offset().top, 10);
                oBox_e_pos = parseInt(oBox.offset().top, 10) + oBox_h;
                rBox_h = oBox.find('.right_area').height();
                
                return;
            }
        }
    };

    $('.order_payment_box').length && ordBoxSet.init();
    
    
    $('.plan-menu > li').click(function(){
        $(this).addClass('on').siblings().removeClass('on');
    });

// 2017-03-20 추가 여기부터
    $('#cjonePnt_btn').click(function(){
        $('.order_payment_box').addClass('fixArea').removeClass('fixArea');
    });
// 2017-03-20 추가 여기까지

    //open event fixed menu
    
    var $win = $(window);
    var top = $(window).scrollTop(); // 스크롤바의 위치값
 
    /*사용자 설정 값 시작*/
    var speed          = 500;     // 따라다닐 속도 : "slow", "normal", or "fast" or numeric(단위:msec)
    var easing         = 'linear'; // 따라다니는 방법 기본 두가지 linear, swing
    var $layer         = $('.fix_lnb'); // 레이어 셀렉팅
    var layerTopOffset = 100;   // 레이어 높이 상한선, 단위:px
    $layer.css('position', 'fixed').css('z-index', '1');
    /*사용자 설정 값 끝*/
 
    // 스크롤 바를 내린 상태에서 리프레시 했을 경우를 위해
    if (top > 0 )
        $win.scrollTop(layerTopOffset+top);
    else
        $win.scrollTop(0);
 
    //스크롤이벤트가 발생하면
    $(window).scroll(function(){
        yPosition = 0; //이부분을 조정해서 화면에 보이도록 맞추세요
        if (yPosition < 0)
        {
            yPosition = 0;
        }
        $layer.animate({"top":yPosition }, {duration:speed, easing:easing, queue:false});
    });
});