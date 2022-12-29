$.namespace("main.main");
main.main = {
    recoBellUseYn : 'N', /* 레코벨 사용 여부 */
    recoBellViewYn : 'N', /* 장바구니 부하를 줄이기 위한 레코벨 show 여부 */
    rankRecoBellViewYn : 'N',
        
    init : function(){
        main.main.setSwipe();
        main.main.bindEvent();
        common.setLazyLoad();
        oyoMain.init();
        common.wish.init();
        
        // 레코벨 사용 여부에 따라 레코벨 관련 스크립트 활성화
        if(main.main.recoBellUseYn == 'Y' && main.main.recoBellViewYn == 'Y'){
            main.main.callRecobell();
            main.main.getStoreRecommInfoAjax();
        }
        
        if(main.main.rankRecoBellViewYn == 'Y') {
        	main.main.getHomeTimeRankInfo();
        	// main.main.getHomeLiveTimeRankInfo();
        }

        
        if (main.main.isOpenCommNoticePop()) {
            $(".main_layer_pop").show();
            $('.main_layer_pop').css("z-index", "99");
            $('.main_layer_pop').length && main.main.initNoticePop();
        }
        main.main.initFloatTrans();
        
        //--------------------------------------------------
        // 신규회원 가입혜택 POP
        //--------------------------------------------------
        // 간편가입 - 신규회원 인지
        //main.main.easyJoinInfoSend();

        
        // 신규회원 가입혜택 POP
        main.main.newJoinEvtPop();

        //오특 플래그
        common.gnb.todaySpecial.setTodaySpecialFlag('.a_detail .newOyflag');
    },

    // 신규회원 가입혜택 POP
    newJoinEvtPop : function() {

        var sResult = sessionStorage.getItem("sResult");

        if((sResult == "00000") || (sResult == "00110")){
    	    var trackingUrl = _baseUrl + "customer/popup/getNewJoinEvtPop.do";
    		
    	    $('#newJoinEvt').html('');
    	    $('#newJoinEvt').load(trackingUrl, function() {
    	        fnLayerSet('newJoinEvt','open');
    	        $('#newJoinEvt').css('top','30%');
    	        $('#newJoinEvt').css('margin-top',$(document).scrollTop());
    	    });

    		sessionStorage.removeItem("sResult");
        }
    },
    
    // 간편가입 - 신규회원인지
    easyJoinInfoSend : function() {
        
        var url = _baseUrl + "login/getEasyJoinInfoJson.do"
        var data = {};
        common.Ajax.sendRequest("POST", url, data, main.main._callBackEasyJoinInfoSend);
    },
    
    _callBackEasyJoinInfoSend : function (data){
    	
    	console.log("_callBackEasyJoinInfoSend");
    	
        if (data) {
        	// 신규가입 (성공)
            if (data.result == "Y") {
            	// 신규가입 혜택 POP
            	alert("신규가입 혜택 POP.  result:" + data.result);
                main.main.newJoinEvtPop();
                
            } else {
                alert("실패하였습니다.  result:" + data.result);
                return false;
            }
        } else {
            alert("fail : _callBackEasyJoinInfoSend()");
            return false;
        }
    },
    
    setSwipe : function() {
      //랜덤 숫자 가져오는 함수
        var fnRandomNum = function(max){            //랜덤 숫자 가져오는 함수(0~max사이의 값)
            return Math.floor(Math.random() * max);
        }

        var mainSlider_len = $('#mainFullSlider').children('div').length;       //메인 슬라이더 갯수
        var mainSlider_init_no = fnRandomNum(mainSlider_len);                   //메인 슬라이더 초기번호

        if (mainSlider_len > 1) {
            //메인 슬라이더 (FULL AREA))
            $('#mainFullSlider').on('init', function(){

                //2017-02-23 수정 : 배너 1개일 경우 추가
                if(mainSlider_len == 1){
                    $(this).append('<button class="slick-arrow slick-prev">이전배너</button><p class="slick-paging"><span class="cur_no">'+ (mainSlider_init_no + 1) +'</span>/'+ mainSlider_len +'</p><button class="slick-arrow slick-next">다음배너</button>');
                }else{
                    $(this).append('<button id="mainSliderBtn">멈춤</button>');              //2017-02-16 추가
//                    $(this).append('<p class="slick-paging"><span class="cur_no">'+ (mainSlider_init_no + 1) +'</span>/'+ mainSlider_len +'</p>');
                    $(this).append('<p class="slick-paging"><span class="cur_no">1</span>/'+ mainSlider_len +'</p>');
                    $(this).find('.slick-prev').html( '이전 슬라이드');
    			    $(this).find('.slick-next').html( '다음 슬라이드');
                }

            }).slick({
                dots: false,
                arrows: true,
                infinite: true,
                fade: true,
                slidesToShow: 1,
                slidesToScroll: 1,
//                initialSlide : mainSlider_init_no,
//                initialSlide : 1,
                autoplay: true,
                autoplaySpeed: 5000
            }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
                $(this).find('.slick-paging > .cur_no').text(nextSlide + 1);
            });
        } 
        //2017-02-16 추가(오토플레이 멈춤/시작)
        $('#mainSliderBtn').on({
            'click' : function(){
                if(!$(this).hasClass('pause')){
                    $("#mainFullSlider").slick('slickPause');
                    $(this).addClass('pause').html('자동재생');;
                }else{
                    $("#mainFullSlider").slick('slickPlay');
                    $(this).removeClass('pause').html('멈춤');
                }
            } 
        });

        [].forEach.call($('.hLifeSlide .slideItem .img img'),function(img){ img.setAttribute('src',img.getAttribute('data-src'));
            img.onload = function(){ img.removeAttribute('data-src'); };});

        // [s] HEALTHY LIFE : 2021.03.19 add
        $('.hLifeSlide').slick({
            arrows: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1
        });
        var $hLifeSLeng = $('.hLifeSlide .slideItem').length;
        if($hLifeSLeng == 2){
            $('.hLifeSlide').addClass('length2');
        }
        // [e] HEALTHY LIFE : 2021.03.19 add


        //메인 기획전 슬라이더
        $('#mainPlanSlider').slick({ 
        	dots: true, 
            infinite: true, 
            slidesToShow: 2, 
            slidesToScroll: 2, 
            prevArrow: $('#plan_prev'), 
            nextArrow: $('#plan_next'), 
            dots: true, 
            appendDots : $('.banner_paging'), 
        });
        
        //온리원 슬라이더
        $('#OnlyoneSlider').slick({
            dots: true,
            arrows: false,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3       //하단 custumPaging 삭제(2017-02-16)
        });
        
        //온라인몰 추천상품 슬라이더
        $('#mainReComSlider').slick({
            dots: true,
            arrows: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1       //하단 custumPaging 삭제(2017-02-16)
        });
        
        $('.spaciality_box .speciality_list').length && setMain();
        
        function setMain(){
            var li_len = $('.spaciality_box .speciality_list').find('li').length;
            var li_wid = $('.spaciality_box .speciality_list').find('li').innerWidth();
            var total_wid = li_wid * li_len;
            var wrapper_wid = $('.spaciality_box .speciality_list').width();
            
            $('.spaciality_box .speciality_list').find('ul').css({'width' :  total_wid +'px', 'left': - ((total_wid - wrapper_wid)/2)+'px'});
        }

        /* 마우스 무브 슬라이더 */
        var in_pos = '';
        $('.speciality_list').mouseenter(function(e){
            in_pos = e.pageX;
        });

        $('.speciality_list').mousemove(function(e) {
            //Get mouse-point position
            var mouse_pos = e.pageX;
            //$('.speciality_list > ul').addClass('translate1');
            //$('.speciality_list > ul').css({'transition':'.2s linear', 'transform':'translate(-200px)'});
            if((in_pos - 115 > mouse_pos || in_pos + 115 < mouse_pos) && in_pos != ''){
                var center_pos = $(window).width() > $('.speciality_list').width() ? $(window).width() / 2 : $('.speciality_list').width() / 2;
                var margin_val = ($('.speciality_list > ul').width() - $('.speciality_list').width()) / 2;
                var percent = parseInt((center_pos - mouse_pos) * 2 / $('.speciality_list').width() * 100, 10);
                
                if(percent > 100) percent = 100;
                else if(percent < -100) percent = -100;
                    
                var offset = parseInt((margin_val * percent)/100, 10);
                //$('.speciality_list > ul').clearQueue('fx').animate({'margin-left' : offset + 'px'}, 100, 'linear');
                //$('.speciality_list > ul').css({'transform':'translate('+ offset +'px)'});
                $('.speciality_list > ul').css({'margin-left' : offset + 'px'});
            }
        });
        
        //인기브랜드 슬라이드        
        $('.main_brand_wrap').length && fn_brand_slide();
        function fn_brand_slide(){
            $('.main_brand_wrap .brand_paging > a').on({
               'click' : function(e){
                   e.preventDefault();
                   var _this = $(this);
                   if(!$('.main_brand_wrap').find('.inner_unit').is(':animated')){
                       $('.main_brand_wrap').find('.inner_unit').stop().animate({'margin-left' : - $(this).index() * 1020 +'px'}, function(){
                          
                       });
                       _this.addClass('on').siblings().removeClass('on');
                   }
               } 
            });
        }
         
        $('#tabList').length && $('#tabList').tabToggle({
            init_no : fnRandomNum($('#tabList').children('li').length),
            cont_nm : '.main_brand_tab'
        });
        $('#tabList2').length && $('#tabList2').tabToggle({
            init_no : fnRandomNum($('#tabList2').children('li').length),
            cont_nm : '.main_brand_tab2'
        });
    },
    
    bindEvent : function() {
        $(".main_cate_list").find("a[data-ref-dispCatNo]").bind("click", function() {
        	if(!$(this).hasClass("main_menu") && !$(this).hasClass("theme-link")){
        		common.link.moveCategory($(this).attr("data-ref-dispCatNo"));
        	}
        });
        
        //$(".main_plan_banner").find(".plan_banner a").bind("click", function() {
        	// [3389141] (영역별 매출분석) 오특, 검색, 베스트, 메인 추가(CHY)
        	//common.link.movePlanShop($(this).attr("data-ref-dispCatNo"), $(this).attr("data-tracking-cd"));
        //});
        
        $(".layer_cate_wrap li a").each(function() {
            $(this).bind("click", function() {
                var dispCatNo = $(this).attr("data-ref-dispCatNo");
                common.link.moveCategory(dispCatNo);
            });
        });
        
        $(".third_cate_list").each(function() {
            if ($(this).find("ul").length > 1) {
                $(this).addClass("type2");
            }
        })
        
        //전문관 카테고리 클릭이벤트
        $(".main_special_wrap").find("li").bind('click', function(){
            var dispCatNo = $(this).attr("data-ref-dispCatNo");
            common.link.moveSpcShop(dispCatNo);
        });
        
        $("#mktAgrBtn").bind('click', function(){
            //[3331722] OY자사몰 큐레이션) 큐레이션 영역 마케팅 활용 동의 수집 내용 변경 -by jp1020 | 2020.06.29
            //main.main.mktRcvSend();
            $("#curation_agreed").css('z-index', '999');
            fnLayerSet("curation_agreed", "open");
        });
        
        // 신규가입 혜택 창닫기
        $(".layer_close").find(".ButtonClose").each(function(idx) {
            $(this).bind("click", function() {
            	popLayerClose();            
            })
        });
        
        setTimeout(function() {
            //링크 처리
            common.bindGoodsListLink();
            
        }, 100);
        
        setTimeout(function() {
            //웹로그 바인딩
            main.main.bindWebLog();
            main.main.bindGoodsGtmInfoForMain("#mainPlanSlider .cate_prd_list .prd_info .goodsList","홈_인기행사만 모았어요");
            main.main.bindGoodsGtmInfoForMain("#mainReComSlider .cate_prd_list .prd_info .goodsList","홈_이상품어때요");
            main.main.bindGoodsGtmInfoForMain(".main_brand_wrap .main_brand_tab .prd_info .goodsList","홈_주목브랜드");
        },700);
    },

    bindGoodsGtmInfoForMain : function(filterSelectorStr, _gtm) {
        $(filterSelectorStr).on("click", function(e) {
            e.preventDefault();
            var _data_attr = $(this).attr("data-attr").split('^');
            if(_data_attr.length >= 4){
                gtm.goods.callGoodsGtmInfo($(this).attr("data-ref-goodsNo"), null, 'ee-productClick', _gtm, _data_attr[3]);
            }else{
                gtm.goods.callGoodsGtmInfo($(this).attr("data-ref-goodsNo"), null, 'ee-productClick', _gtm);
            }
        });
    },

    initNoticePop : function() {
        totCnt = $('.content_html').length;
        initNo = 1;
        currentNo = initNo;
        
        $('.main_layer_pop .pg_area').find('.current').text(currentNo);
        $('.main_layer_pop .pg_area').find('.total').text(totCnt);
        
        main.main.noticePopEvent();
    },
    
    noticePopEvent : function(){
        $('.main_layer_pop .pg_area').find('a').click(function(e){
            e.preventDefault();
            if($(this).hasClass('prev')){
                currentNo--;
                if(currentNo < 1){
                    currentNo = totCnt;
                }
            }else{
                currentNo++;
                if(currentNo > totCnt){
                    currentNo = 1;
                }
            }
            $('.main_layer_pop').find('.content_html').css('display','none');
            $('.main_layer_pop').find('.content_html').eq(currentNo-1).css('display','block');
            $('.main_layer_pop .pg_area').find('.current').text(currentNo);
        });
        
        $('.main_layer_pop').find('.layer_close').click(function(e){
            e.preventDefault();
            
            sessionStorage.setItem("commonNoticePop", "Y");
            
            if ($("#chkNoShow").is(":checked")) {
                common.bann.setPopInfo("commonNoticePop", $("#mainNoticeLayer").attr("data-ref-compareKey"));
            }
            
            $('.main_layer_pop').css({'display':'none'});
        });
    },
    
    isOpenCommNoticePop : function() {
        if (sessionStorage.getItem("commonNoticePop") != undefined && sessionStorage.getItem("commonNoticePop") == "Y") {
            return false;
        }
        var bannInfo = common.bann.getPopInfo("commonNoticePop");
        if (bannInfo == null) {
            return true;
        }
        //이미지 정보가 다를 경우
        if (bannInfo.compareKey != $("#mainNoticeLayer").attr("data-ref-compareKey")) {
            return true;
        }
        //1일 경과 후
        if (new Date() - bannInfo.regDtime >= (1000 * 60 * 60 * 24)) {
            return true;
        }
        return false;
    },
    
    initFloatTrans : function() {
        if ($(".main_floating_banner").length > 0 && $('.main_floating_big_banner').length > 0) {
            $(".main_floating_banner").show();
            $('.main_floating_big_banner').css("z-index", "9999");
            $('.main_floating_banner').on('click', function(){
                
                $('.main_floating_big_banner').addClass('show');
                $('body').append('<div class="dimm" style="z-index:9998;"></div>');
                common.bann.setPopInfo("commonFloatTrans", $(".main_floating_big_banner").find("img").attr("src"));
            });
            
            $('.main_floating_big_banner').find('.big_banner_close').click(function(e){
                e.preventDefault()
                $('.main_floating_big_banner').removeClass('show');
                $('body').find('.dimm').remove();
            });
            
            $('body').on('click','.dimm', function(e){
                if($('.main_floating_big_banner').hasClass('show')){
                    $('.main_floating_big_banner').find('.big_banner_close').click();
                }
                $(this).remove();
            });
            
            if (main.main.isOpenCommFloatTrans()) {
                $('.main_floating_banner').click();
            }
        }
    },
    
    isOpenCommFloatTrans : function() {
        var bannInfo = common.bann.getPopInfo("commonFloatTrans");
        if (bannInfo == null) {
            return true;
        }

        //이미지 정보가 다를 경우
        if (bannInfo.compareKey != $(".main_floating_big_banner").find("img").attr("src")) {
            return true;
        }
        return false;
    },
    
    //웹로그 바인딩
    bindWebLog : function() {
        //카테고리
        $(".lDispCatNo, .mDispCatNo, .sDispCatNo").bind("click", function() {
           common.wlog("home_category_" + $(this).attr("data-ref-dispCatNo"));
        });
        //카테고리테마샵 - 카테고리관 추가 (2020.07)
        // (2020.07.29) 카테고리관 대카테고리, 전시구좌만 사용 
//        $(".theme-link").bind("click", function() {
//        	common.wlog("home_category_" + $(this).attr("data-ref-dispCatNo") + "_categoryshop");
//        });
        //메인배너
        $(".main_full_banner .slick-list .slick-track .slick-slide").each(function(idx) {
            $(this).find(".banner_link").bind("click", function() {
                common.wlog("home_banner_main_" + (parseInt($(this).parent().attr("data-slick-index")) + 1));
            });
        });
        //상단띠배너
        $(".main_mid_banner.home_banner_top").bind("click", function() {
            common.wlog("home_banner_top");
        });
        //상단띠배너(두개로 나눠진 버전)
        $(".home_banner_top_split").bind("click", function() {
            common.wlog($(this).attr("data-ref-bannerId"));
        });
        //중단띠배너
        $(".main_mid_banner.home_banner_middle").bind("click", function() {
            common.wlog("home_banner_middle");
        });
        //모바일앱안내
        $(".app_down_link").bind("click", function() {
            common.wlog("home_banner_mobile");
        });

        //추천기획전
        $(".main_plan_banner .recomm_plan_list li a").each(function(planshopIdx) {
            var tmpIdx = planshopIdx + 1;
            
            $(this).bind("click", function() {
                common.wlog("home_planshop_banner_recom_" + tmpIdx);
            });
        });
        
        //인기기획전
        $(".main_plan_banner .slick-slide:not(.slick-cloned) .plan_banner").each(function(planshopIdx) {
            var tmpIdx = planshopIdx + 1;
            
            $(this).bind("click", function() {
                common.wlog("home_planshop_banner_" + tmpIdx);
            });
            
            $(this).parent().parent().find("ul li .prd_info").each(function(goodsIdx) {
                $(this).find("a, button").bind("click", function() {
                    common.wlog("home_planshop_banner_" + tmpIdx + "_" + (goodsIdx + 1));
                });
            });
        });
        //온리원
        $("#OnlyoneSlider .slick-slide:not(.slick-cloned)").find(".onlyone_box").each(function(idx) {
            $(this).bind("click", function() {
                common.wlog("home_onlyone_" + (idx + 1));
            })
        });
        //추천상품
        $("#mainReComSlider").find(".slick-slide:not(.slick-cloned)").find("div.prd_info").each(function(goodsIdx) {
            $(this).find("a, button").bind("click", function() {
                common.wlog("home_recommend_" + (goodsIdx + 1));
            });
        });
        //전문관배너
        $(".main_special_wrap li").each(function(idx) {
            $(this).bind("click", function() {
                common.wlog("home_special_" + (idx + 1));
            });
        });
        //인기브랜드 탭
        $(".brand_wrapper .sixSet li").each(function(idx) {
            $(this).bind("click", function() {
                common.wlog("home_brand_tab_" + (idx + 1));
            });
        });
        //인기브랜드 더보기
        $(".brand_wrapper .brndList .brand_more").each(function(idx) {
            $(this).bind("click", function() {
                common.wlog("home_brand_more_" + (idx + 1));
            });
        });
        //브랜드 상품 
        $(".brand_wrapper .brndList").each(function(brndIdx) {
            var tmpIdx = brndIdx + 1;
            
            $(this).find(".cate_prd_list .prd_info").each(function(goodsIdx) {
                
               $(this).find("a, button").bind("click", function() {
                   common.wlog("home_brand_tab_" + tmpIdx + "_" + (goodsIdx + 1));
               });
           });
        });
        //1:1 문의
        $(".online_info .btnInquiry").bind("click", function() {
            common.wlog("home_customer_1to1");
        });
        //FAQ
        $(".online_info .btnFaqTop").bind("click", function() {
            common.wlog("home_customer_faq");
        });
        //공지사항팝업
        $(".main_layer_pop .contEditor").each(function(idx) {
            $(this).find("a, button").click(function() {
                common.wlog("home_popup_" + (idx + 1));
            })
        });
        //플로팅 확장
        $(".main_floating_big_banner").find("a").bind("click", function() {
            common.wlog("home_floating_large");
        });
        //플로팅 소형
        $(".main_floating_banner").bind("click", function() {
            common.wlog("home_floating_small");
        });
        //마케팅 동희
        $("#mktAgrBtn").bind("click", function() {
            common.wlog("home_curation_mktagr");
        });
        
    },
    
    bindRecommendWeblog : function(idx) {
        common.wlog("home_cat_banner_"+idx);
    },
    
    callRecobell : function() {
    	
    	// 레코벨 스크립트에서 호출하도록 변경
    	// 파라미터 생성
		var recType = common.isLogin() ? "p202" : "p002";
		var param = {
			recType : recType,
			size : 40,
			cps : true,
			cpt : "t001",
    		cpcids : "",
			excids : "1000003000200100001,1000003000200100002,1000003000200100005,1000003000200100006,1000003000200100007"
                +",1000003000200100009,1000003000200090001,1000003000200090002,1000003000200090003,1000002000200070001"
                +",1000002000200070009,1000002000200090005,1000002000200090002,1000003000400020001,1000003000400020002"
                +",1000003000400030001,1000003000400030002,1000003000400030003,1000003000400030004,1000003000400040002"
                +",1000003000400040003,1000003000400040004",
		}
		
		curation.callCuration(recType, param, function(result) {
    		if(result != undefined && result.results != undefined && result.results != null && result.results.length > 0) {
    			var url = _baseUrl + "main/getRecoBellContsInfoAjax.do";
                var obj = {
                    callBackFunc :  main.main._callBackGetRecoBellContsInfo,
                };
                
                var setObj = jQuery.extend(result, obj);
                curation.getCurationCallBack(setObj, url);

                // CJOYGNB-1352 [PC] 홈 > 큐레이션 영역 중복 상품 노출 개선 건
                // 좌측에 조회된 상품 Id 들을 우측의 화면에서 중복되지 않도록 exiids 파라미터로 추가
                var exiids = ""
                for (let i = 0; i < setObj.results.length; i++) {
                    if (i === setObj.results.length - 1) {
                        exiids += setObj.results[i].itemId
                    } else {
                        exiids += setObj.results[i].itemId + ","
                    }
                }
                localStorage.setItem("exiids", exiids)

                main.main.getRecentCuration(exiids)
            } else {

                // 좌측 큐레이션이 있다가 사라질경우를 대비하여, 최근본 상품의 메인화면 & 팝업창의 갯수가 다를것을 대비하여 저장해둔 exiids 제거
                localStorage.removeItem("exiids")

                // 제외상품을 포함하지 않음
                main.main.getRecentCuration("")
            }
        });

        /*if(common.isLogin() && $("#mktAgrYn").val()=="N") {
            setTimeout(function() {
                common.wlog("home_curation_nonview");
            }, 1000);
    	} else {
    		var url = _baseUrl + "main/getRecoBellContsInfoAjax.do";
            var data = {};
            common.Ajax.sendRequest("POST",url,data,main.main._callBackGetRecoBellContsInfo);
            setTimeout(function() {
                common.wlog("home_curation_logout1");
            }, 1000);
        }
        */

        // 큐레이션 : 로그인 후 팝업 reload를 위해 스크립트 추가
        // curation.reloadEvent();
    },
    getHomeTimeRankInfo : function() {
    	var requestParam = {
	    	type : "view",
	    	size : 40
	    };
	    
	    curation.rts.callRtsCuration("stats", requestParam, function(data) {
	    	var result = data.items;
	   	   	result.type = "view";
	   		curation.rts.getCurationJsonCallBack(result, main.main.setHomeTimeRankInfo);
	    });
    },

    // getHomeLiveTimeRankInfo : function() {
    //     var rtsApiRequestParameter = {
    //         rtsType : "stats",
    //         type : "view",
    //         size : 40
    //     }
    //
    //     curation.rts.getRtsCurationGoodsData(rtsApiRequestParameter, function(data) {
    //         if(data.size != 0) {
    //             main.main.setHomeTimeRankInfo(data);
    //         }
    //     });
    // },

    setHomeTimeRankInfo : function(res) {
    	// var resList = res.recobellGoodsList;
    	var resList = res.data;
    	var len = resList != undefined ? resList.length : 0;
    	var prodList = [];
    	len = len > 10 ? 10 : len;
    	
    	for(var i=0; i<len; i++) {
    		var obj = resList[i];
			
			obj.bestNewYn = "Y";
			obj.viewcnt = !common.isEmpty(obj.viewcnt) ? (obj.viewcnt).numberFormat() : "0";
			obj = setPrdPriceInfo(obj);
			
			if(i > 4) {
				obj.display = "hidde";
			} else {
				obj.display = "";
			}

            //오특 플래그
            if(new Date().getHours() >= 18){
                obj.todaySpecialFlagTimer = "Y";
            } else {
                obj.todaySpecialFlagTimer = "N";
            }


			prodList.push(obj);
    	}
    	
    	var prod = {
			rankList : prodList
		};
    	
    	if(len > 0) {
    		$("#liveRankArea").append($('#rankViewTmpl').tmpl(prod));

            //오특 플래그
            common.gnb.todaySpecial.setTodaySpecialFlag('.newOyflag');

    		setTimeout(function() {
				$('.viewRk_single').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					fade: true,
					autoplay: true,
					adaptiveHeight: true,
					infinite: false,
					useTransform: true,
					speed: 100
				});
				
				setTimeout(function() {
					$(".viewRk_single li").show();
					$(".viewRk_nav li").show();
					
					if($(".viewRk_single li").length > 0) {
						$(".viewRk").show();
					} else {
						$(".viewRk").hide();
					}
				}, 100);
				
				var slide_len = $(".viewRk_nav li").length;
				
				$('.viewRk_single').on('beforeChange', function(event, slick, currentSlide) {
					if(currentSlide+1 != slide_len) {
						$('.viewRk_nav li.act').removeClass('act');
						$('.viewRk_nav li').eq(currentSlide+1).addClass('act');
					}

					//  3503020 : PC 실시간 view 랭킹 페이징 결함 개선 요청
                    /*
					if(currentSlide == 4) {
						$(".viewRk_tab li").eq(1).click();
					}
                    */
				});
				
				$('.viewRk_single').on("afterChange",function(event, slick, currentSlide) {
                    //  3503020 : PC 실시간 view 랭킹 페이징 결함 개선 요청
                    if(currentSlide == 5) {
                        $(".viewRk_tab li").eq(1).click();
                    }

					if(currentSlide == (slide_len - 1)) {
						$('.viewRk_single').slick('slickPause');
						setTimeout(function() {
							$('.viewRk_single').slick('unslick');
							$("#liveRankArea").html("");
							$(".viewRk_tab li").eq(0).click();
							main.main.getHomeTimeRankInfo();
							// main.main.getHomeLiveTimeRankInfo();
						}, 4000);
					}
				});
				
				$('.viewRk_nav li').unbind("click").click(function(event) {
					event.preventDefault();
					
					var idx = $(".viewRk_nav li").index($(this));
					$('.viewRk_single').slick('slickGoTo', idx);
					
					$('.viewRk_single').slick('slickPause');
					
					setTimeout(function() {
						$('.viewRk_single').slick('slickPlay');
					}, 1000);
				
					$(".viewRk_nav li").removeClass("act");
					$(this).addClass("act");
				});
				
				var rccode = common.isLogin() ? "pc_main_04_a" : "pc_main_04_c";
				curation.prodDetailScript({viewArea : "home_real_time_rank", rccode: rccode, parentArea : "#liveRankArea", trackingCd : "Home_Live_Rank"});
    		}, 300);
    		
    		$(".viewRk_nav").find("li:eq(0)").addClass("act");
			
			$('.viewRk_tab li').each(function (i) { this.i = i }).click(function () {
				var idx = $(this).index();
				var start = 5 * idx;
				var end = start + 5;
				
				$(".viewRk_tab li").removeClass("act");
				$(this).addClass("act");
				
				$(".li_rank_txt").addClass("hidde");
				
				for(var i=start; i<end; i++) {
					$(".li_rank_txt").eq(i).removeClass("hidde");
				}
				
				$('.viewRk_single').slick('slickGoTo', start);
				$(".viewRk_nav li").removeClass("act");
				$(".viewRk_nav li").eq(start).addClass("act");
			});
			
			$(".refreshBtn").unbind("click").click(function(event) {
				event.preventDefault();
				$("#liveRankArea").empty();
				$(".viewRk_tab li").removeClass("act");
				$(".viewRk_tab li").eq(0).addClass("act");
				main.main.getHomeTimeRankInfo();
				// main.main.getHomeLiveTimeRankInfo();
			});

			gtm.goods.initProductImpression();
    	}
    },
    getStoreRecommInfoAjax : function() {
    	curation.callCuration("p039", {}, function(data) {

    		// 관심매장+매장추천 UI 변경으로 매장추천 정보가 없는 경우에도 호출하도록 수정함.
        	var strNo = "";
        	if(data != undefined && data.results != undefined && data.results != null && data.results.length > 0) {
    			var strInfo = data.results[0].itemId.split("|");
	        	if(strInfo.length > 0) {
	        		strNo = strInfo[0];
	        	}
        	}

			var url = _baseUrl + "main/getStoreRecommInfoAjax.do";
	    	var data = {strNo : strNo};
	    	common.Ajax.sendRequest("POST", url, data, main.main._callBackGetStoreRecommInfo);
    	});
    },
    getRecentCuration : function (exiids) {

        var goodsList = common.recentGoods.getGoodsList();

        if(goodsList == null || goodsList == "") {
            //클릭베스트
            // 레코벨 스크립트에서 호출하도록 변경
            // 파라미터 생성
            var recTypeClickBest = "m002";
            var paramClickBest = {
                recType : recTypeClickBest,
                size : 30,
                cps : true,
                cpt : "",
                cpcids : "",
                excids : "",
            }

            curation.callCuration(recTypeClickBest, paramClickBest, function(result) {
                if(result != undefined && result.results != undefined && result.results != null && result.results.length > 0) {
                    var url = _baseUrl + "main/getRecoBellClickBestInfoAjax.do";
                    var obj = {
                        callBackFunc :  main.main._callBackgetRecoBellClickBestInfo,
                    };

                    var setObj = jQuery.extend(result, obj);
                    curation.getCurationCallBack(setObj, url);
                }
            });
        } else {
            //최근본상품 연관상품추천
            // 레코벨 스크립트에서 호출하도록 변경
            // 파라미터 생성

            var recTypeRecentGoods = common.isLogin() ? "p201" : "p001";
            var paramRecentGoods = {
                recType : recTypeRecentGoods,
                size : 30,
                cps : true,
                cpt : "m002",
                cpcids : "",
                excids : "",
                exiids : exiids,
            }

            curation.callCuration(recTypeRecentGoods, paramRecentGoods, function(result) {
                if(result != undefined && result.results != undefined && result.results != null && result.results.length > 0) {
                    var url = _baseUrl + "main/getRecoBellRecentInfoAjax.do";
                    var obj = {
                        callBackFunc :  main.main._callBackgetRecoBellRecentInfo,
                    };
                    var setObj = jQuery.extend(result, obj);
                    curation.getCurationCallBack(setObj, url);
                }
            });
        }
    },
    _callBackGetStoreRecommInfo : function(res) {

    	console.log("_callBackGetStoreRecommInfo");

    	$(".newOpenStoreType2").html("");
    	$(".newOpenStoreType2").html(res).show();
    },
    mktRcvSend : function() {
        
        var url = _baseUrl + "mypage/setMktReceiptInfoJson.do"
        var data = {agrYn : "Y"};
        //마케팅수신동의
        common.Ajax.sendRequest("POST", url, data, main.main._callBackMktRcvSend);
    },
    
    _callBackMktRcvSend : function (data){
        if (data.result) {
            if (data.CODE == "S0000000A") { // 정상
                //[3331722] OY자사몰 큐레이션) 큐레이션 영역 마케팅 활용 동의 수집 내용 변경 으로 주석 -by jp1020 | 2020.06.29
                //$("#curation_agreed").css('z-index', '999');
                //fnLayerSet("curation_agreed", "open");
                //마케팅 동의 성공 처리 후 팝업 닫기
                fnLayerSet("curation_agreed", "close");
                location.href = _baseUrl + "main/main.do";
            } else {
                alert("실패하였습니다. \nMESSAGE:" + data.MESSAGE + "\nCODE:" + data.CODE);
                return false;
            }
        } else {
            alert("서비스가 원활하지 않아 수신정보 변경에 실패하였습니다.");
            return false;
        }
    },
    
    _callBackGetRecoBellContsInfo : function(obj, data) {
    	$("#recobell_area1").html("");
    	$("#recobell_area1").html(data);

        if($("#recobell_area1").find("li").length == 0) {
            $("#recobell_area1").parent().remove();
            $("#recobell_area2").parent().addClass("type_full");
            $(".type_full").css("width","100%");

            // param.viewSize = 4;

            var recType = common.isLogin() ? "p201" : "p001";
            var param = {
                recType : recType,
                size : 30,
                cps : true,
                cpt : "m002",
                cpcids : "",
                excids : "",
                viewSize : 4
            }
            curation.callCuration(recType, param, function(result) {
                if(result != undefined && result.results != undefined && result.results != null && result.results.length > 0) {
                    var url = _baseUrl + "main/getRecoBellRecentInfoAjax.do";
                    var obj = {
                        callBackFunc :  main.main._callBackgetRecoBellRecentInfo,
                    };

                    var setObj = jQuery.extend(result, obj);
                    curation.getCurationCallBack(setObj, url);
                }
            });
        }
    },
    _callBackgetRecoBellRecentInfo : function(obj, data) {

        // var recTypeTitle = obj.recType=='m002' ? "좋아하실만한 <br/>베스트 상품 추천해드려요" : "<strong>최근 본 상품</strong>과<br/> 연관 상품 추천해드려요";

        $("#recobell_area2").html("");
        $("#recobell_area2").html(data);
        
        // $("#rectypeTitle").html(recTypeTitle);

        if($("#recobell_area1").find("li").length == 0) {
            var fullAreaType03 = $("#recobell_area2 .tit_type03");
            var fullAreaSlide = $("#recobell_area2 .curation_slide");
            fullAreaType03.css({'height': 'auto', 'font-size': '26px', 'text-align': 'center'});
            fullAreaType03.find('br').css('display', 'none');
            fullAreaSlide.css('margin-top', '20px');
        }
    },

    _callBackgetRecoBellClickBestInfo : function(obj, data) {
        $("#recobell_area2").html("");
        $("#recobell_area2").html(data);

        // $("#rectypeTitle").html("좋아하실만한 <br/>베스트 상품 추천해드려요");
    },
 
    agreedClose : function() {
        fnLayerSet("curation_agreed", "close");
        location.href = _baseUrl + "main/main.do";
    }
};

var oyoMain = {
		init : function(){
		    layerMenu = $('.main_cate_list');
		    mainMenu = layerMenu.children('li');
		    mainOneMenu = layerMenu.children('li.type2');
		    mainTwoMenu = layerMenu.children('li.type1');
			subMenu = mainTwoMenu.find('.sub_cate_list > li');
		    subMenuOn = layerMenu.find('.sub_cate_list > .on');
		    thirdMenu = layerMenu.find('.third_cate_list');
			Banner = layerMenu.find('.lnb_ban_box');
		    this.menuEvent();

            common.gnb.todaySpecial.setTodaySpecialFlag('.a_detail .newOyflag');
		},

		menuEvent : function(){

		    layerMenu.on({
		        'mouseover' : function(){
		            $(this).parent().addClass('active');
		        },
		        'mouseleave' : function(){
		            $(this).parent().removeClass('active');
		        },
		        'focusin' : function(){
		            $(this).parent().addClass('active');
		        }
		    });

		    mainMenu.on({
		        'mouseover' : function(){
		            $(this).addClass('on').siblings().removeClass('on');
		        },
		        'mouseleave' : function(){
		            $(this).removeClass('on');
		        },
		        'focusin' : function(){
		            $(this).addClass('on').siblings().removeClass('on');
		        }

		    });

			mainOneMenu.on({
		        'mouseover' : function(){
					var firstMenu = $(this).find('.lnb_ban_box');
					var twoWidth = $(this).children('div').width() - 39;

					$(this).addClass('on').siblings().removeClass('on');
		            if(!$(this).hasClass('none-over')) {
						firstMenu.addClass('on').css({'left': twoWidth + 'px'}).siblings().removeClass('on');
					}
		        },
		        'mouseleave' : function(){
					Banner.removeClass('on');
		        },
		        'focusin' : function(){
					var firstMenu = $(this).find('.lnb_ban_box');
					var twoWidth = $(this).children('div').width() - 39;

					$(this).addClass('on').siblings().removeClass('on');
		            firstMenu.addClass('on').css({'left' : twoWidth + 'px'}).siblings().removeClass('on');
		        }

		    });

		    subMenu.on({
		        'mouseover' : function(){
		        	/*
		            var lnbBanner = $(this).parent().parent().find('.lnb_ban_box');
		            var thirdWidth = $(this).children('div').width() + 339;

		            $(this).addClass('on').siblings().removeClass('on');
		            if(!$(this).hasClass('none-over')) {
						lnbBanner.addClass('on').css({'left': thirdWidth + 'px'}).siblings().removeClass('on');
					}
					*/
                	var ref_dispCatNo 				= $(this).children('a').attr("data-ref-dispCatNo");

                	var lnbBanner	= $(this).parent().parent().find('.' + ref_dispCatNo);
                	//var lnbBanner	= $(this).parent().parent().find('.lnb_ban_box' + ref_dispCatNo);
                	var thirdWidth 	= $(this).children('div').width() + 339;

                	var ref_dispCatNo_lnb_ban_box 	= lnbBanner.attr("data-ref-dispCatNo-lnb_ban_box");
                	//console.log("subMenu.on > mouseover - data-ref-dispCatNo             : " + ref_dispCatNo			);
                	//console.log("subMenu.on > mouseover - data-ref-dispCatNo-lnb_ban_box : " + ref_dispCatNo_lnb_ban_box);

                	$(this).addClass('on').siblings().removeClass('on');

                	if(ref_dispCatNo_lnb_ban_box != undefined){
                		//console.log("!= undefined");
                        lnbBanner.addClass('on').css({'left' : thirdWidth + 'px'}).siblings().removeClass('on');
                	}else{
                		//console.log("undefined");
                	}
		        },
		        'mouseleave' : function(){
		            Banner.removeClass('on');
		            subMenu.siblings().removeClass('on');
		        },
		        'focusin' : function(){
		        	var lnbBanner = $(this).parent().parent().find('.lnb_ban_box');
		            var thirdWidth = $(this).children('div').width() + 339;

		            $(this).addClass('on').siblings().removeClass('on');
		            lnbBanner.addClass('on').css({'left' : thirdWidth + 'px'}).siblings().removeClass('on');
		        }
		    });
		    Banner.on({
		        'mouseover' : function(){
		            $(this).addClass('on').siblings().removeClass('on');
		        },
		        'mouseleave' : function(){
		            $(this).removeClass('on');
		        },
		        'focusin' : function(){
		            $(this).addClass('on').siblings().removeClass('on');
		        }
		    });
		}
	};



