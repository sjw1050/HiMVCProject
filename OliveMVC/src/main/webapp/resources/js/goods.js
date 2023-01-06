$.namespace("goods.detail");
/** 상품 상세 페이지 */
goods.detail = {

        //오늘드림 고도화 2019-11-14 추가
        //-- 기본 배송지 매장정보, 배송지 순번 기억하기 위한 변수
        baseStrNo : '999',
        baseMbrDlvpSeq : '999',
        ModifySeq : '', /* 배송지 수정 시 사용*/
        beforeSeq : '', /* 이전 배송지 */
        
        //오늘드림 고도화 2019-11-13 추가
        //-- 구매하기, 장바구니 버튼 클릭시 가능여부 체크
        validation : 'Y',
        
        goodsNo : $("#goodsNo").val(),
        dispCatNo : $("#dispCatNo").val(), 
        finalPrc : $("#finalPrc").val(),
        retUrl : _baseUrl + "goods/getGoodsDetail.do?goodsNo=",
        recoBellUseYn : 'N', /* 레코벨 사용 여부 */
        recoBellViewYn : 'N', /* 레코벨 노출 여부 */
        isProcessing: false,
        favorObj : null,
        interval : null,
        
        init : function(){
//            goods.detail.setLoGoodsDetailHtml();
//            goods.detail.setGoodsDetailHtml();
            
            // 하단 레코벨 추천 상품 조회(일시품절 상품 없는 경우)
            if(goods.detail.recoBellUseYn == 'Y' && goods.detail.recoBellViewYn == 'Y'){

                // 레코벨 상품 장바구니 담기 클릭
                $(document).on('click', '.cartBtnRecoBell', function(e){
                    e.preventDefault();
                    if (common.loginChk()) {
                        
                        // 클릭지표, 시나리오 분석 웹로그 추가
                        var wlogType = $(this).closest("li").attr("data-wlog_type");
                        common.wlog("detail_curation_addcart_"+wlogType);
                        n_click_logging(_baseUrl + "common/getCartOptionSelectAjax.do?clickarea=detail_curation_addcart_" + wlogType);

                        // 상품카드 장바구니버튼 트래킹코드
                        common.cart.trackingInfo.setTrackingCd($(this));
                        
                        //  옵션선택이 있거나, 없거나 일단 화면 진입
                        var url = _baseUrl + "common/getCartOptionSelectAjax.do";
                        var rccode = $(this).data("rccode");
                        var data = {goodsNo : $(this).attr("data-ref-goodsNo"), itemNo : $(this).attr("data-ref-itemNo"), itemCnt : $(this).attr("data-ref-cnt"), prstyn : $(this).attr("data-ref-prstyn"), recoRcCode : rccode };
                        common.Ajax.sendRequest("POST",url,data,common._callCartOptionSelect);                    
                    }
                });
                
                //큐레이션 썸네일 이미지 오버
                $(document).on('mouseover','.curation_basket .thum',function(){
                    var _this = $(this);           
                    _this.find('.my').show();          
                });
                
                $(document).on('mouseout','.curation_basket .thum',function(){
                    var _this = $(this);           
                    _this.find('.my').hide();       
                });
                
                $(document).on('click','.curation_basket .thum .btn_zzim',function(){
                    // 클릭지표 웹 로그 추가
                    var wlogType = $(this).closest("li").attr("data-wlog_type");

                    // 찜 했을 때 로그 남김
                    if($(this).hasClass("on") == true){
                        common.wlog("detail_curation_addzzim_"+wlogType);
                    }
                });
                
                // 하단 레코벨 추천 상품 조회
                // 스크롤 내려서 하단 레코벨 추천상품 영역에 닿았을때 호출
                // 이때 해당 영역이 display:none 상태이면 안됨..
                $(window).scroll(function() {
                    var wH = $(window).height(),
                        wS = $(this).scrollTop();
                
                    if(window['isCurationArea002Called'] != 'Y' && $('.curation_area_a002_lead').is(":visible")){                        
                        var offsetTop = $('.curation_area_a002_lead').offset().top;
                        if(wS >  ( offsetTop-wH )){                        
                            // 하단 레코벨 추천상품 호출한적 없는 경우에만 호출한다.
                            goods.detail.callRecobell("a002"); // 상단
                            window['isCurationArea002Called'] = 'Y';
                        }                        
                    }
                    
                    if(window['isCurationArea029Called'] != 'Y' && $('.curation_area_a029_lead').is(":visible")){
                        var offsetBtm = $('.curation_area_a029_lead').offset().top;                    
                        if(wS > ( offsetBtm-wH )) {                            
                            // 하단 레코벨 추천상품 호출한적 없는 경우에만 호출한다.
                            goods.detail.callRecobell("a029"); // 하단
                            window['isCurationArea029Called'] = 'Y';
                        }                        
                    }
                    
//                    if(window['isCurationArea003Called'] != 'Y' && $('.curation_area_a003_lead').is(":visible")){
//                    	var offsetBtm = $('.curation_area_a003_lead').offset().top;                    
//                    	if(wS > ( offsetBtm-wH )) {                            
//                    		// 하단 레코벨 추천상품 호출한적 없는 경우에만 호출한다.
//                    		goods.detail.callRecobell("a003"); // 하단
//                    		window['isCurationArea003Called'] = 'Y';
//                    	}                        
//                    }
                    
                    if(window['isCurationRelatedPlanCalled'] != 'Y' && $('.related_plan').is(":visible")){
                        var offsetPln = $('.related_plan').offset().top;
                        if(wS > ( offsetPln-wH )) {                            
                            // 하단 레코벨 추천상품 호출한적 없는 경우에만 호출한다.
                            goods.detail.relPlanShopAjax(); // 연관된 기획전
                            window['isCurationRelatedPlanCalled'] = 'Y';
                        }                            
                    }
                 });
               
            } else if(goods.detail.recoBellUseYn == 'N') { // 카테고리 베스트 조회
                goods.detail.recommGoodsList();
            }
            
            //  버튼 Bind
            setTimeout(function(){
                goods.detail.bindButtonInit();    
            }, 500)
            
            //  상품 정보 LocalStorage 저장 
            goods.detail.initGoodsHistory();
            
            //  SNS init
            goods.detail.sns.init();
            
            //  초기 총 가격과 총 개수 Init
            goods.detail.cart.init();
            
            /*var dt = new Date();
            var hour = dt.getHours();
            
            // 오늘드림 기간 제한 ( json data가 잘못입력될수도있으니 try 처리 ) : 오늘드림 고도화로 제외 처리.
            var _o2oBlockInfo = "";
            try{
                _o2oBlockInfo = $.parseJSON($("#o2oBlockInfo").val());
                if(_o2oBlockInfo.o2oBlockYn == "Y"){
                    $("#deliveDay").prop("checked",false);
                    $("#deliveNm").prop("checked",true);
                }
            }catch(e){console.log(e);}*/
                                                                                                                                                                          
            /*
            if(hour < $("#quickOrdTimeFrom").val() || hour >=$("#quickOrdTimeTo").val() ){
                $("#deliveDay").prop("checked",false);
                $("#deliveNm").prop("checked",true);

            }*/
            //오늘드림 고도화로 제외 처리.

            
            //클릭 이벤트시 조회로 변경
            //  상품평 금지 카테고리에 따른 분기 처리
            /*if ( $("#gdasPrhbCatCnt").val() ==  undefined || $("#gdasPrhbCatCnt").val() == "" || $("#gdasPrhbCatCnt").val() == "0"  ){
                //  상품평 탭 비동기 처리
                goods.detail.preGdasAsnc();
                goods.detail.simGdasAsnc();                
            }else{
                goods.detail.prhbGdasAsnc();
            }*/
            
            //클릭 이벤트시 조회로 변경
            //  상품QNA 탭 비동기 처리
            //goods.detail.qnaTabInit();
            
            //  추천 상품 조회
            //goods.detail.recommGoodsList();

            //클릭 이벤트시 조회로 변경
            //  고시항목, KC안전인증검사 비동기 조회
            //goods.detail.artcKcListAjax($("#artcGoodsNo").val(), $("#artcItemNo").val(), $("#pkgGoodsYn").val(), $("#previewInfo").val());
            
            //  옵션이 없을 경우 구매하는 수량(INPUT BOX)체크 바인드
            if ( dupItemYn != 'Y'){
                var optionKey = $("#goodsNo").val() + $("#itemNo").val();
                var qtyAddUnit = $("#qtyAddUnit").val();
                var invQty = 0;
                // 오늘드림 고도화 2019-12-20 변경 $(":input:checkbox[name=qDelive]").prop("checked")
                if($(":input:radio[name=qDelive]:checked").val() == 'Y' || $(":input:checkbox[name=qDelive]").prop("checked") == true){ //당일배송 상품인 경우 재고변경
                    invQty = $("#quickAvalInvQty").val();
                } else {
                    invQty = $("#avalInvQty").val();
                }
                goods.detail.cart.cartCntBind(optionKey, qtyAddUnit, invQty, salePrc);
            }
            
            //  찜 init
            common.wish.init();
            
            //  마이페이지에서 상품평 클릭 시 상품상세로 왔을 경우
            goods.detail.paramMoveTab(sessionStorage.getItem("moveTab"));
            
            //  EP 쿠폰 여부
            if ( $("#epCpnYn").val() == 'Y' ){
                var cookieName = "goodsDetailEpCoupon_" + $("input[name='goodsNo']:hidden").val() + "_" + $("input[name='chlNo']:hidden").val();
                var bannInfo = common.bann.getPopInfo(cookieName);
                //오늘그만 보기 없는경우 && 24시 경과 후
                if (bannInfo == null || (new Date() - bannInfo.regDtime >= (1000 * 60 * 60 * 24))){
                    common.epCouponOpen();
                }
            }
            
            //상품번호/referrer/ idx 3 탭 저장
            var savedGoodsTabInfo = sessionStorage.getItem("saved_goodsTab"); //, mgoods.detail.goodsNo + "|" + matchKey + "|3");
            
            sessionStorage.removeItem("saved_goodsTab"); 
            
            if (savedGoodsTabInfo != undefined && savedGoodsTabInfo != null && savedGoodsTabInfo != "") {
                var tmpSavedInfos = savedGoodsTabInfo.split("|");
                if (tmpSavedInfos.length >= 3 
                        && goods.detail.goodsNo == tmpSavedInfos[0]
                        && mKey == tmpSavedInfos[1]) {
                    
                    setTimeout(function() {
                        $(".prd_detail_tab li").eq(tmpSavedInfos[2]).find("a").click();
                        var tabPos = $("#tabList").position();
                        window.scroll(0, tabPos.top);
                    }, 500);
                }
            }
            
            //상품평
            var savedGdasSession = sessionStorage.getItem("gdasSession");
            sessionStorage.removeItem("gdasSession");
            if(savedGdasSession != undefined && savedGdasSession != null && savedGdasSession != ""){
                if(savedGdasSession && (savedGdasSession == goods.detail.goodsNo)){
                    setTimeout(function() {
                        $('.goods_reputation').click();
                        var tabPos = $("#tabList").position();
                        window.scroll(0, tabPos.top);
                    },1000);
                }
            }
          
            
            setTimeout(function() {
                //웹로그 바인딩
                goods.detail.bindWebLog();
            },700);
            /* EP쿠폰 오늘그만 보기 */
            $("button[id='goodsDetailEpCoupon']").click(function() {
                common.bann.setPopInfo("goodsDetailEpCoupon_" + $(this).attr("goodsNo"), $(".fulsizePop").attr("data-ref-compareKey"));
                setTimeout(function() {
                    $("body").css("overflow", "visible");
                }, 100);

                $(document).scrollTop(0);
                fnLayerSet('layer_pop_wrap', 'close');
            });
            
            $('.btn_todayDV').click(function(e){
                e.preventDefault();
                
                if($(".prd_option_box").hasClass("open")) {
                    $(".prd_option_box").removeClass("open");
                    $(".sel_option_list").html("");
                }
                
                if(!$(e.target).hasClass("span_adrModify")) {
                    $(this).toggleClass("on");
                    if ($(this).hasClass("on")) {
                        $(".todayDV_list").stop().slideDown('fast');
                    } else{
                        $(".todayDV_list").stop().slideUp('fast');
                    }
                }
            });
            
            if($("#quickYn").val() == "Y") {
            	window.onpageshow = function(event) {
            		if ( event.persisted || (window.performance && window.performance.navigation.type == 2)) {
            			$(".o2oDeliveDay").prop("checked", false);
            			goods.detail.todayDeliveryChkEvt();
            		} else {
            			goods.detail.todayDeliveryChkEvt();
            		}
            	}
            	
            	            
            	// 오늘드림 빠름 평균 배송시간
            	goods.detail.todayDelivery.quickBaseAddrInfo();
            }
            
            // 큐레이션 : 로그인 후 팝업 reload를 위해 스크립트 추가
	   		// curation.reloadEvent();
	   		
	   		$(".btnSoldout").unbind("click").click(function(event) {
	   			event.preventDefault();
	   			var mbrNm = _mbrNm == "" ? "고객" : _mbrNm;

	   			var param = {
	               	size : 40, //큐레이션 api 호출용
	               	cps : true, //큐레이션 api 호출용
	               	cpt : "c001",
	               	cpcids : $("#recoBellDispCatNo").val(),
	               	viewType : 'VertPop', // 가로형
	               	popupYn : "Y",
	               	titlRp : $("#eigeneSmlDispName").val() + ";" + mbrNm, // 타이틀 replace 텍스트
	               	viewArea : 'goods_soldout_popup_prod',
	               	recType : "n002", // 큐레이션 url 정보
	               	rccode : "pc_detail_soldout_ac",
                    trackingCd: 'Soldout_Curation'
	            };
	               
	           curation.popLoadEvent(param);
	   		});
	   		
	   		if(goods.detail.recoBellUseYn == 'Y' && goods.detail.recoBellViewYn == 'Y') {
	   			goods.detail.getViewRtsCount();
	   			
	   			setInterval(function() {
	   				goods.detail.getViewRtsCount();
	   			}, 10000);
	   		}
        },
        getViewRtsCount : function() {
        	var rtsParam = {
   				itemid : $("#lgcGoodsNo").val(),
   				type : "view"
   			};
   				
   			curation.rts.callRtsCuration("stat", rtsParam, function(data) {
   				if(data.item != null && data.item != undefined) {
   					var count = data.item.count;
   					count = Number(count) == 0 ? 1 : count.numberFormat();
   					$("#goodsViewNum").text(count);
   					$("#div_goodsViewNumArea").show();
   				}
   			});
        },
        todayDeliveryChkEvt : function() {
        	//오늘드림 고도화 오늘드림 체크박스 쿠키
            if(getCookie_search("O2O_CHK") == "Y"){
                $(".btnGift").hide();
                $(".prd_btn_area.new-style.type1").addClass("today");
                var qk_today = new Date();
                var qk_stday = new Date(2020, 8, 16, 23, 59);
                var qk_etday = new Date(2020, 8, 23, 23, 59);
                if(qk_today > qk_stday && qk_today < qk_etday) {
                    // 오늘드림 체크박스 차단
                } else {
                    
                    if(common.isLogin() == true) {
                        
                        //  장바구니 개수 체크
                        if($("#dupItemYn").val() != "Y") { // 옵션 상품일 경우 주소지 먼저 체크.
                            if ( goods.detail.cart.checkCartCnt() ){// get상품 선택 여부 체크
                                if(!goods.detail.cart.checkGetItemSelect()){
                                    return false;
                                }
                            }else{
                                return false;
                            }
                        }
                        
                        $(".o2oDeliveDay").prop("checked", true);
                        
                        var _o2oBlockInfo = "";
                        try{
                            _o2oBlockInfo = $.parseJSON($("#o2oBlockInfo").val());
                            if(_o2oBlockInfo.o2oBlockYn == "Y"){
                                $(".o2oDeliveDay").prop("checked",false);
                                return;
                            }
                        }catch(e){console.log(e);}
                        
                        var soldOutYn = $("#soldOutYn").val();
                        
                        if(soldOutYn == "Y" && $("#dupItemYn").val() != "Y") {
                            goods.detail.todayDelivery.soldOutControl("Y");
                        } else if(soldOutYn == "Y" && $("#dupItemYn").val() == "Y") {
                        	$(".btnSoldout").hide();
                        	$(".btnReStock").hide();
                        	$(".btnBuy").show();
                        	$(".btnBasket").show();
                        }
                        
                        $(".today_dvArea").stop().slideDown('fast');
                        goods.detail.todayDelivery.todayDeliveryListOnPage();
                    } else {
                    	$(".o2oDeliveDay").prop("checked",false);
                    }
                }
            }
            
            goods.detail.giftBannerChk();
            
        	// 오늘드림 넛지
        	if(!$(".o2oDeliveDay").is(":checked")) {
        		goods.detail.todayDelivery.quickNudge();
        	}
        },
        giftBannerChk : function() {
        	if($(".o2oDeliveDay").is(":checked")) {
        		$(".onlineGift").hide();
        		$(".onlineGiftCont").hide();
        		$(".todayGift").show();
        		$(".todayGiftCont").show();
        		
        		$("#giftInfo").find(".todayGift:first").removeClass("mgT40");
        		$("#giftInfo").find(".onlineGift").not(":eq(0)").removeClass("mgT40");
        	} else {
        		$(".onlineGift").show();
        		$(".onlineGiftCont").show();
        		$(".todayGift").hide();
        		$(".todayGiftCont").hide();
        		$("#giftInfo").find(".onlineGift").not(":eq(0)").addClass("mgT40");
        	}
        },
        /** 상품 상세 진입 시 최근 본 상품을 위한 LocalStorage에 저장 */
        initGoodsHistory : function(){
            
            var cookie = new Cookie(30);
            var info = {};
            
            var sHistory = cookie.get('productHistory') || '',
                oHistory = sHistory == '' ? [] : $.parseJSON(sHistory),
                oResult  = [{
                    goodsNo  : goods.detail.goodsNo, 
                    viewCount: 1
                }];
            if (oHistory instanceof Array) {
                var maxLen = oHistory.length;
                if(maxLen>32) {
                    // PC에서는 최대 32개 까지만 History 기록 
                    maxLen = 32;
                }
                for (var i=0; i<maxLen; i++) {
                    var item = oHistory[i];
                    // 어디서 새는지.. sHistory에 null 데이터가 들어갈 때가 있음.
                    if(item != null) {
                        if (item.goodsNo == goods.detail.goodsNo) {
                            oResult[0].viewCount += item.viewCount;
                        }
                        else {
                            oResult[oResult.length] = item;
                        }    
                    }
                }
            }
            cookie.set('productHistory', JSON.stringify(oResult));
        },
        
        bindButtonInit : function(){
            var frstTabIdx2="N";
            var frstTabIdx3="N";
            var frstTabIdx4="N";
            
            /** 상품 옵션 선택 클릭 Bind **/
            $('.select_box .select_opt').click(function(e){
                e.preventDefault();

                if($('.select_box').hasClass('open')){
                    e.preventDefault();
                    $(this).parent('.select_box').removeClass('open').find('ul').hide();
                    $('.opt_choice_area').css({'overflow-y':'scroll'})
                    $('.total_price').show();
                    $('.buy_button_area').show();
                }else{
                    $(this).parent('.select_box').addClass('open').find('ul').show();
                    $('.opt_choice_area').css({'overflow-y':'visible'})
                    $('.total_price').hide();
                    $('.buy_button_area').hide();
                }
            });
            
            /** 로케이션 클릭 Bind **/
            $(".history_cate_box li").click(function(){
                var dispCatNo = $(this).attr("data-ref-dispCatNo");
                var uprDispCatNo = $(this).attr("data-ref-uprDispCatNo");
                var param = "";

                param = "?dispCatNo="+dispCatNo;

                location.href = _baseUrl + "display/getMCategoryList.do"+param;
            });
            
            /** 공통 레이어 탭 토글 **/
            $('#layerTabList').length && $('#layerTabList').tabToggle({
                cont_nm:'.layer_tab_cont'
            });
            
            /** 상세정보, 구매정보, 상품평, Q&A 탭 토글 **/
            $('#tabList').length && $('#tabList').tabToggle();
            
            /** 프리미엄상품평, 한줄상품평 탭 토글  **/
            $('#reviewTab').length && $('#reviewTab').tabToggle({
                cont_nm:'.review_tab_cont'
            });

            /** 상품 메인이미지 전환 Bind **/
            $('.prd_thumb_list').find('a').click(function(e){
                e.preventDefault();
                $('.prd_img > img').attr('src', $(this).attr('data-img'));
                $(this).parent().addClass('sel').siblings().removeClass('sel');
                
            });
            
            /** 옵션이 있는 상품의 옵션 클릭 Bind **/
            $('#buyOpt, #artcOpt').click(function(e){
               e.preventDefault();
               if($("#quickYn").val() == "Y" && $(".o2oDeliveDay").is(":checked") ) {
                   if(goods.detail.validation != "N") {
                       $(".todayDV_list").hide();
                   } else {
                       if($(".btn_noDv").css("display") != "none") {
                           alert("상품을 받을 수 있는 주소를 추가해주세요!");
                           return false;
                       } else {
                           if (!$("input[name='pickupDirectYn']").is(":checked")) {
	       	                	alert("선택하신 배송지로는 주문이 어렵습니다.\n배송지를 변경해 주세요.");
	       		                return false;
	       	                }
                       }
                   }
               }
               
               if($(this).parent().hasClass('open')){
                   $(this).parent().removeClass('open');
                   
                   if(quickAddrYn == "Y" && $("#deliveNudge").hasClass("nudge_show")) { // 오늘드림 넛지 있을 경우 넛지 노출
                	   $("#deliveNudge").removeClass("nudge_hide").fadeIn();
                   }
               }else{
                   if($("#option_list").find("li").length <= 0){
                       goods.detail.optInfoList($("#previewInfo").val());
                   }
                   
                   if(quickAddrYn == "Y" && $("#deliveNudge").hasClass("nudge_show")) { // 오늘드림 넛지 있을 경우 넛지 노출
                  		$("#deliveNudge").addClass("nudge_hide").hide();
                   }
                   
                   $(this).parent().addClass('open');
               }
            });
            
            /** 상품고시정보 옵션 클릭 Bind **/
            $('#artcSelOpt').find('a').click(function(e){
                $(this).parents('.prd_option_box').find('.sel_option').html($(this).html());
                $(this).parents('.prd_option_box').removeClass('open');
                
            });
            
            /** 브랜드관 이동 Bind */
            $("#moveBrandShop").click(function(){
                var onlBrndCd = $("#onlBrndCd").val();
                window.location.href = _baseUrl + 'display/getBrandShopDetail.do?onlBrndCd=' + onlBrndCd;
            });
            
            
            /** 브랜드관 이동(좋아요쪽) Bind */
            $("#moveBrandShop_like").click(function(){
            	common.wlog("goods_brandlike");//wlogMjh
                var onlBrndCd = $("#onlBrndCd").val();
                window.location.href = _baseUrl + 'display/getBrandShopDetail.do?onlBrndCd=' + onlBrndCd;
            });
            
            
            /** 재입고 알림 레이어 열기 Bind */ 
            $("#stockAlim").click(function(){
                $("#stockAlimLayer").show();
            });
            
            /** 알림 유형 선택 Bind */
            $('input[name="alimTpCd"]').change(function(){
                if($(this).val() == "01")
                    $("#emailForm").show();
                else
                    $("#emailForm").hide();
            });
            
            /** 옵션 레이어 열기 Bind **/
            $('.btn_oepn_layer').click(function(){
                $('.prd_option_layer').show();
                if($('.prd_option_layer').show()){
                    $('.btn_layer').hide();
                }
            });
            
            /** 브랜드 찜 클릭 Bind **/
            $('#brnd_wish').click(function(){
                //  로그인 체크
                if(common.loginChk()){
                    var param = {
                            onlBrndCd : $(this).attr("data-ref-onlBrndCd")
                    };
            
                    if($(this).hasClass("on")){
                        //  off                    	                    	
                        var resultData = common.wish.delBrndWishLst(param,$(this));
//                        console.log("resultData",resultData.resultCd);
//                        var result = resultData.resultCd.trim();
                        if ( resultData.resultCd == '000' ){
                            $(this).removeClass("on");    
                            $(this).html('좋아요 해제됨');
                        } 
                    }else{                                            	
                        var resultData = common.wish.regBrndWishLst(param,$(this));
                        var result = resultData.resultCd.trim();
                        if ( result == '000' ){
                            $(this).addClass("on");
                            $(this).html('좋아요 선택됨');
                        }
                    }
                }
            });
            
            /** 찜 클릭 Bind **/
            $('.btnZzim.goods_wish').click(function(){
                //  로그인 체크
                if(common.loginChk()){
                    var param = {
                            goodsNo : $(this).attr("data-ref-goodsNo")
                    };
            
                    if($(this).hasClass("zzimOn")){
                        //  off
                    	if($(this)[0].tagName == "BUTTON"){
                    		$(this).text("찜하기전");
                    	}                    	
                        var resultData = common.wish.delWishLst(param);
                        var result = resultData.trim();
                        if ( result == '000' ){
                            $(this).removeClass("zzimOn");    
                        } 
                    }else{
                        //on                    	
                    	if($(this)[0].tagName == "BUTTON"){
                    		$(this).text("찜하기후");
                    	}                    	
                        var resultData = common.wish.regWishLst(param);
                        var result = resultData.trim();
                        if ( result == '000' ){
                            $(this).addClass("zzimOn");    
                        }
                    }
                }
            });
            
            /** 고객만족도 클릭시 상품평 탭 이동 Bind **/
            $("#repReview").click(function(){
                var tabPos = $("#tabList").position();
                window.scroll(0, tabPos.top);
                $("#reviewInfo > a").click();
            });
            
            /** 전체 재입고 알림 버튼 클릭 Bind **/
            $(".btnReStock").click(function(){
                //오늘드림 고도화 2019-12-22 변경
                if($("#deliveDay").prop("checked") == true){
                    //오프라인 매장 재고 입고 알림
                    var strNo = $(".dt_dlvp").data("strno");
                    var isAvailbleStore = true;	//매장취급여부
                    var lgcGoodsNo = $("#lgcGoodsNo").val();
                    
                    if(strNo == undefined || strNo == "" || strNo == null || strNo == "NM") {
                        alert("매장 재입고 신청이 불가능한 배송지입니다. 다른 배송지를 선택해 주세요.");
                        return;
                    }
                    
                    //[3354738] 상품 상세 재입고 알람 신청시  매장취급여부 판단 |2020.09.15 | by jp1020
                    if(lgcGoodsNo != undefined || lgcGoodsNo != "" || lgcGoodsNo != null) {
                    	isAvailbleStore = goods.detail.offstore.getAvailableStore(strNo, lgcGoodsNo);
                    	console.log("isAvailbleStore Result : " + isAvailbleStore);
                    }
                    
                    if(!isAvailbleStore){
                    	alert("해당 상품 미운영 매장입니다.");
                    	return;
                    }
                    
                    common.openStockOffStoreAlimPop(goods.detail.goodsNo,'', strNo);     
                }else{
                    //온라인 입고알림
                    common.openStockAlimPop(goods.detail.goodsNo,'');     
                }
            });
            
            /** 오프라인 매장 재고현황 초기 Init Bind **/
            $(".btn_off_store").click(function(){

                if( $("#pkgGoodsYn").val() == 'N' && $("#goodsSctCd").val() == '20' ){
                    alert("세트로 구성된 상품은 매장 재고 조회를 하실 수 없습니다.");
                }else{
                    // cjone 점검 체크
                    common.Ajax.sendRequest("POST",_baseUrl + "goods/getCjoneAvailableJson.do","",function(data){
                        var res =(typeof data !== 'object') ? $.parseJSON(data) : data;
                        if(res != null && res.result){
                            localStorage.setItem('existStoreListRequest',"N")
                            goods.detail.offlineBurialLink();
                            goods.detail.offstore.storeSearchYn = 'N';
                            //fnLayerSet("store_handlePop", "open");
                            
                            //$('#store_handlePop').css('top','1%');
                            //$('#store_handlePop').css('margin-top',$(document).scrollTop());
                        }else{
                            alert("죄송합니다. 시스템 점검으로 이용이 불가합니다.");
                        }
                    });
                }
            });
            
            // dim 영역 클릭시
            $(".dimm").live("click", function(){
            	if($("#viewControl").val() == 'Y'){
             		$('#colorChip, .dimm').removeAttr('style');
             		
             		$('#colorChip').removeClass('show');
             		$('.dimm').remove();
             		
            		ColorChipsLayer.resetItems();
            		
            		$("#viewControl").val('N');
            		
            		return;
                }else{
                	// 카드할인혜택 팝업이 열려있다면 닫기
                    if($("#layer_pop_wrap").is(":visible")){
                        fnLayerSet('layer_pop_wrap', 'close');
                    }
                } 
            	
                
                
                
            });
            
            $("#qnaInfo").bind("click", function(){
                if(frstTabIdx4 =="N"){
                    goods.detail.qnaTabInit();
                    frstTabIdx4="Y";
                }
            });
            
            $("#buyInfo").bind("click", function(){
                if(frstTabIdx2 =="N"){
                    //고시항목, KC안전인증검사 비동기 조회
                    goods.detail.artcKcListAjax($("#artcGoodsNo").val(), $("#artcItemNo").val(), $("#pkgGoodsYn").val(), $("#previewInfo").val());
                    frstTabIdx2="Y";
                }
            });
            
            // 오늘드림 고도화 2019-11-18 추가
            /** NEW 구매하기 버튼 **/
            $(".o2oDeliveDay").click(function(e) {
                goods.detail.beforeSeq = ''; // 옵션상품의 경우 이전 배송지 초기화.
                
                if(common.isLogin() == false) {
                    if(!confirm("회원 전용 서비스입니다. 로그인하시겠습니까?")) {
                        return false;
                    }else {
                        common.link.moveLoginPage();
                        return false;
                    }
                }else {

                	//MJH
                	if($("input[name=qDelive]:checked").val() == 'Y'){
                        $("#qDeliveCheck").val('Y');
                    }
                	else{
                		$("#qDeliveCheck").val('N');
                	}

                    $(".btnSoldout").hide();    //일시품절 버튼
                    $(".btnReStock").hide();    //재입고 알림신청 버튼
                    $(".btnBasket").show();    //장바구니 버튼
                    $(".btnBuy").show();    //구매하기 버튼
                    
                    if($(this).is(":checked")) {
                        $(".btnGift").hide();
                        //오늘드림 체크박스
                        // document.cookie = "O2O_CHK=Y";
                        common.setSessionCookie("O2O_CHK","Y");
                        sessionStorage.setItem('O2O_CHK', 'Y');
                        //3440969_PM작업시 오늘드림 레이어 팝업 노출 요청 건
                        common.popLayer.todayDelivery.openTodayDeliveryNotice(null);

                        //  장바구니 개수 체크
                        if($("#dupItemYn").val() != "Y") { //옵션상품일 경우 제외 처리. 
                            // 옵션 상품은 배송지 주소에 따라 매장재고 체크하여 옵션 목록 새로 불러오도록 변경.
                            if ( goods.detail.cart.checkCartCnt() ){
                                // get상품 선택 여부 체크
                                if(!goods.detail.cart.checkGetItemSelect()){
                                    alert("추가상품을 선택해주세요.");
                                    return false;
                                }
                            }else{
                                alert("상품을 선택해주세요.");
                                return false;
                            }
                            
                            var soldOutYn = $("#soldOutYn").val();
                            
                            if(soldOutYn == "Y") {
                                goods.detail.todayDelivery.soldOutControl("Y");
                            }
//                            $(".prd_cnt_box").find("input").val("1");
                            goods.detail.cart.init();
                            
                            var goodsNo = $("#goodsNo").val();
                            var itemNo = $("#itemNo").val();
                            var optionKey = goodsNo + itemNo;
                            var prom = $("div.prd_cnt_box.item_" + optionKey).attr("promNo"); 
                            goods.detail.cart.changeMsg(optionKey, prom, "Y") ;
                            
                        } else {
                            $("#option_list").html("");  //옵션상품의 경우 주소지 변경 시 선택 옵션 초기화
                            $(".prd_cnt_box").remove();
                            $(".prd_gift_box").remove();
                            $("#totalCnt").val("0");
                            $("#totalPrcTxt").text("0");
                        }
                        
                        // 오늘드림 여부 선택된 경우 check, 옵션상품인 경우에만 체크해야함
                        // [START 오늘드림 옵션상품 개선:jwkim]
                        if(goods.detail.checkQuick() && $("#dupItemYn").val() == 'Y'){
                            alert("선택하신 옵션 중 오늘드림 서비스가 제공되지 않는 상품이 있습니다.");
                            return false;
                        }
                        
                        $(".today_dvArea").stop().slideDown('fast');
                        
                        goods.detail.todayDelivery.todayDeliveryListOnPage();
                        
                        if($("#deliveNudge").length > 0) {
                        	$("#deliveNudge").remove();
                        	clearInterval(goods.detail.interval);
                        }
                    } else {
                        $(".btnGift").show();
                        //오늘드림 체크박스
                        // document.cookie = "O2O_CHK=N";
                        common.setSessionCookie("O2O_CHK","N");
                        sessionStorage.setItem('O2O_CHK', 'N');
                        
                        //온라인 재고가 없을경우
                        if($("#deliveDay").hasClass("soldout") === true ) {
                            $(".btnSoldout").show();    //일시품절 버튼
                            $(".btnReStock").show();    //재입고 알림신청 버튼
                            $(".btnReStock").attr('data-attr', "상품상세^재입고알림신청^"+$("#goodsNm").val()+"_클릭");
                            $(".btnBasket").hide();    //장바구니 버튼
                            $(".btnBuy").hide();    //구매하기 버튼

                            if( $("#goodsCnt").val() < 1){
                                $(".tit_h4").hide();
                                $(".temprecobell").hide();
                                $(".tempSoldout").show();
                            } else {
                                $(".temprecobell").show();
                                $(".tempSoldout").hide();
                            }
                        }
                        
                        $(".today_dvArea").stop().slideUp('fast');
                        $(".btn_todayDV").removeClass("on");
                        $(".todayDV_list").stop().slideUp('fast');
                        
                        goods.detail.validation = 'Y';
                        goods.detail.todayDelivery.init();
                        
                        if($("#dupItemYn").val() == 'Y') {
                            $("#option_list").html("");  //옵션상품의 경우 주소지 변경 시 선택 옵션 초기화
                            $(".prd_cnt_box").remove();
                            $(".prd_gift_box").remove();
                            $("#totalCnt").val("0");
                            $("#totalPrcTxt").text("0");
                        } else {
                        	var soldOutYn = $("#soldOutYn").val();
                            
                            var goodsNo = $("#goodsNo").val();
                            var itemNo = $("#itemNo").val();
                            var optionKey = goodsNo + itemNo;                                                  	
                            
                            if(soldOutYn == "Y") {
                                goods.detail.todayDelivery.soldOutControl("N");
                            } else {  // 오늘 드림 선택 해제시 gift 상품 초기화 처리 추가 
                                var prom = $("div.prd_cnt_box.item_" + optionKey).attr("promNo"); 
                                if(prom != undefined){
                                	goods.detail.cart.init();
                                	goods.detail.cart.changeMsg(optionKey, prom, "Y") ;  
                                }
                            }
                        }
                        
                      //컬러칩 품절표시
                        var colrSoldoutCnt = $("#colrSoldoutCnt").val();
                        
                        for(var i=0;i<colrSoldoutCnt;i++){
                        	
                        		$("#colrChipItem_"+i).attr('class',"");
                        		$("#colrParet_"+i).attr('class',"");
                        	
                    		if($("input[name=colrSoldOut_"+i+"]").val() == 'Y'){
      
                    			$("#colrChipItem_"+i).attr('class','soldout');
                    			$("#colrParet_"+i).attr('class','soldout');
                        		
                        	}
                        	
                        
                        }
                        
                        //퀵배송지를 초기화 및 선택된 배송지 업데이트 quickYn = 'Y', strNo(매장번호)
                        goods.detail.todayDelivery.registQuickMbrDlvpInfo(goods.detail.baseStrNo, goods.detail.baseMbrDlvpSeq);
                        
                        // 픽업바로가기 숨김
                        $("#pikcupOnlyYn").hide();
                        $("#pickupDirectYn").prop('checked', false);
                    }
                    
                    goods.detail.todayDelivery.quickBaseAddrInfo();
                }
                
                goods.detail.giftBannerChk();
            });

            $(".dt_quickPop").click(function() {
                goods.detail.todayDelivery.openQuickPop('question');
            });
        },
        
        // 기존 구매하기 버튼 이벤트
        /** 구매하기 버튼 **/
        bindBtnBuy : function(){
            var loginCheck = common.loginChk();
            
            if ( loginCheck ) {
                //  수량 입력, 옵션 창이 열려 있다면
                var goodsOptInfo = "";
                
                //  옵션이 있는 상품이라면 
                if ( $("#dupItemYn").val() == 'Y' ){
                    goodsOptInfo = "multi";
                }else{
                    goodsOptInfo = "single";
                }
                
                //  장바구니 개수 체크
                if ( goods.detail.cart.checkCartCnt() ){
                    // get상품 선택 여부 체크
                    if(!goods.detail.cart.checkGetItemSelect()){
                        alert("추가상품을 선택해주세요.");
                        return;
                    }
                }else{
                    alert("상품을 선택해주세요.");
                    return;
                }
                
                // 오늘드림 여부 선택된 경우 check, 옵션상품인 경우에만 체크해야함
                // [START 오늘드림 옵션상품 개선:jwkim]
                if(goods.detail.checkQuick() && $("#dupItemYn").val() == 'Y'){
                    alert("선택하신 옵션 중 오늘드림 서비스가 제공되지 않는 상품이 있습니다.");
                    return false;
                }
                // [END 오늘드림 옵션상품 개선:jwkim]
                
                //당일배송인 경우 배송지 선택 레이어 오픈
                // 오늘드림 고도화 2019-12-20 변경 $(":input:checkbox[name=qDelive]").prop("checked")
                if($("input[name=qDelive]").is(":checked")){
                    var goodsNo = $("#goodsNo").val();
                    var itemNo = $("#itemNo").val();
                    var optionKey = goodsNo + itemNo;
                    var cartCnt = Number($("#cartCnt_" + optionKey).val());
                    var quickMax = parseInt( $("#quickOrdMaxQty").val() );
                    
                    var dupItemYn = $("#dupItemYn").val();      // 옵션 여부
                    var getGoods = "";
                    
                    if(dupItemYn == "Y"){
                        // TODO 옵션상품
                        // [START 오늘드림 옵션상품 개선:jwkim]
                        cartCnt = parseInt( $("input#cartCnt_" + optionKey).val() );
                        getGoods = $("div.prd_gift_box");
                        // [END 오늘드림 옵션상품 개선:jwkim]
                    } else {
                        cartCnt = parseInt( $("input#cartCnt_" + optionKey).val() );
                        getGoods = $("div.prd_gift_box");
                    }
                    
                    var buyCondStrtQtyAmt = parseInt( getGoods.attr("buyCondStrtQtyAmt") );
                    var promKndCd = getGoods.attr("promKndCd");
                    var canGetItemCnt = parseInt(cartCnt / buyCondStrtQtyAmt);
                    if(canGetItemCnt==undefined || isNaN(canGetItemCnt)){
                        canGetItemCnt = 0;
                    }
                    
                    if((cartCnt + canGetItemCnt) > quickMax){
                        alert("오늘드림 서비스의 1회 최대 구매 수량은 총 "+quickMax+"개 입니다.");
                        
                        // 가능 주문 수량 계산
                        var tempQuickMax = cartCnt + canGetItemCnt;
                        var tempCartCnt = cartCnt;
                        var tempCanGetItemCnt = parseInt(tempCartCnt / buyCondStrtQtyAmt);
                        
                        if(canGetItemCnt != 0){
                            while (tempQuickMax > quickMax) {
                                tempCartCnt = tempCartCnt - 1;
                                tempCanGetItemCnt = parseInt(tempCartCnt / buyCondStrtQtyAmt);
                                tempQuickMax = tempCartCnt + tempCanGetItemCnt;
                            }
                            quickMax = tempCartCnt;
                        }
                        
                        $("#cartCnt_" + optionKey).val(quickMax);

                        //  전체 가격 = 전체 가격 - 이전값의 가격 + ( 바뀐 개수 * 가격 )
                        var totalPrc = (Number(quickMax) * Number(salePrc));
                        
                        //  전체 개수, 금액 세팅
                        $("#totalCnt").val(quickMax);
                        $("#totalPrc").val(totalPrc);
                        $("#totalPrcTxt").text($.number(totalPrc));
                        goods.detail.cart.changeMsg(optionKey);
                        
                        return;
                    }
                    
                    var dt = new Date();
                    var hour = dt.getHours();
                    
                    // 오늘드림 기간 제한 ( json data가 잘못입력될수도있으니 try 처리 ) 
                    var _o2oBlockInfo = "";
                    try{
                        _o2oBlockInfo = $.parseJSON($("#o2oBlockInfo").val());
                        if(_o2oBlockInfo.o2oBlockYn == "Y"){
                            alert(_o2oBlockInfo.o2oBlockMsg);
                            return;
                        }
                    }catch(e){console.log(e);}
                    
                    /*if(hour < $("#quickOrdTimeFrom").val() || hour >=$("#quickOrdTimeTo").val() ){
                        alert("오늘드림 주문 가능시간은 오전 10시 ~ 오후 8시 입니다.");
                        return;
                    }*/
                    
                    goods.detail.todayDelivery.todayDeliveryList();
                    return;
                }
                
                //  장바구니 개수 체크
                if ( goods.detail.cart.checkCartCnt() ){
                    // get상품 선택 여부 체크
                    if(goods.detail.cart.checkGetItemSelect()){
                        goods.detail.cart.regCart(goodsOptInfo,"Y","NEW");
                    } else {
                        alert("추가상품을 선택해주세요.");
                    }
                }else{
                    alert("상품을 선택해주세요.");
                }
                
            }
        },

        /** 선물하기 버튼 **/
        bindBtnGift : function(){
            var loginCheck = common.loginChk();

            if ( loginCheck ) {

                // 예약상품 여부 check
                var rsvGoodsYn = $("#rsvSaleYn").val();
                var rsvLmtSctCd = $("#rsvLmtSctCd").val();
                if(rsvGoodsYn == "Y" && rsvLmtSctCd == "20"){
                    alert("예약상품은 선물하실 수 없습니다. 일반 주문을 이용해주시거나 다른 상품을 선택해주세요.");
                    return false;
                }

                // 선물하기 여부(소스 수정을 최소화하려고 전역변수로 처리함)
                window['presentYn'] = 'Y';
                common.wlog("goods_detail_present_btn"); // 영역분석용
                n_click_logging( _baseUrl + "?clickarea=goodsDetailPresentOrder"); // DS 시나리오 분석용 로그 남기기

                //  수량 입력, 옵션 창이 열려 있다면
                var goodsOptInfo = "";

                //  옵션이 있는 상품이라면
                if ( $("#dupItemYn").val() == 'Y' ){
                    goodsOptInfo = "multi";
                }else{
                    goodsOptInfo = "single";
                }

                //  장바구니 개수 체크
                if ( goods.detail.cart.checkCartCnt() ){
                    // get상품 선택 여부 체크
                    if(!goods.detail.cart.checkGetItemSelect()){
                        alert("추가상품을 선택해주세요.");
                        return;
                    }
                }else{
                    alert("상품을 선택해주세요.");
                    return;
                }

                //  장바구니 개수 체크
                if ( goods.detail.cart.checkCartCnt() ){
                    // get상품 선택 여부 체크
                    if(goods.detail.cart.checkGetItemSelect()){
                        goods.detail.cart.regCart(goodsOptInfo,"Y","NEW");
                    } else {
                        alert("추가상품을 선택해주세요.");
                    }
                }else{
                    alert("상품을 선택해주세요.");
                }
            }
        },
        
        // 오늘드림 고도화 2019-11-26 추가
        // 신규 구매하기 버튼 이벤트
        /** 구매하기 버튼 **/
        bindBtnBuy2 : function(){
            var loginCheck = common.loginChk();
            
            if ( loginCheck ) {
                
                //  수량 입력, 옵션 창이 열려 있다면
                var goodsOptInfo = "";
                
                //  옵션이 있는 상품이라면 
                if ( $("#dupItemYn").val() == 'Y' ){
                    goodsOptInfo = "multi";
                }else{
                    goodsOptInfo = "single";
                }
                
                //  장바구니 개수 체크
                if ( goods.detail.cart.checkCartCnt() ){
                    // get상품 선택 여부 체크
                    if(!goods.detail.cart.checkGetItemSelect()){
                        alert("추가상품을 선택해주세요.");
                        return;
                    }
                }else{
                    alert("상품을 선택해주세요.");
                    return;
                }

                // 오늘드림 여부 선택된 경우 check, 옵션상품인 경우에만 체크해야함
                // [START 오늘드림 옵션상품 개선:jwkim]
                if(goods.detail.checkQuick() && $("#dupItemYn").val() == 'Y'){
                    alert("선택하신 옵션 중 오늘드림 서비스가 제공되지 않는 상품이 있습니다.");
                    return false;
                }
                // [END 오늘드림 옵션상품 개선:jwkim]

                // 2019-11-08
                // (신규) 오늘드림 선택시 선택 팝업 없이 페이지 상에서 진행
                // 오늘드림 고도화 2019-12-20 변경 $(":input:checkbox[name=qDelive]").prop("checked")
                if($("input[name=qDelive]").is(":checked")) {
                    var goodsNo = $("#goodsNo").val();
                    var itemNo = $("#itemNo").val();
                    var optionKey = goodsNo + itemNo;
                    var cartCnt = Number($("#cartCnt_" + optionKey).val());
                    var quickMax = parseInt( $("#quickOrdMaxQty").val() );

                    var dupItemYn = $("#dupItemYn").val();      // 옵션 여부
                    var getGoods = "";

                    if(goods.detail.validation == 'N') {
                    	if($(".btn_noDv").css("display") != "none") {
                            alert("상품을 받을 수 있는 주소를 추가해주세요!");
                            return false;
                        } else {
                        	if (!$("input[name='pickupDirectYn']").is(":checked")) {
                                alert("선택하신 배송지로는 주문이 어렵습니다.\n배송지를 변경해 주세요.");
                                return false;
                            }
                        }
                    }

                    if(dupItemYn == "Y"){
                        // TODO 옵션상품
                        // [START 오늘드림 옵션상품 개선:jwkim]
                        cartCnt = parseInt( $("input#cartCnt_" + optionKey).val() );
                        getGoods = $("div.prd_gift_box");
                        // [END 오늘드림 옵션상품 개선:jwkim]
                    } else {
                        cartCnt = parseInt( $("input#cartCnt_" + optionKey).val() );
                        getGoods = $("div.prd_gift_box");
                    }

                    var buyCondStrtQtyAmt = parseInt( getGoods.attr("buyCondStrtQtyAmt") );
                    var promKndCd = getGoods.attr("promKndCd");
                    var canGetItemCnt = parseInt(cartCnt / buyCondStrtQtyAmt);
                    if(canGetItemCnt==undefined || isNaN(canGetItemCnt)){
                        canGetItemCnt = 0;
                    }

                    if((cartCnt + canGetItemCnt) > quickMax){
                        alert("오늘드림 서비스의 1회 최대 구매 수량은 총 "+quickMax+"개 입니다.");

                        // 가능 주문 수량 계산
                        var tempQuickMax = cartCnt + canGetItemCnt;
                        var tempCartCnt = cartCnt;
                        var tempCanGetItemCnt = parseInt(tempCartCnt / buyCondStrtQtyAmt);

                        if(canGetItemCnt != 0){
                            while (tempQuickMax > quickMax) {
                                tempCartCnt = tempCartCnt - 1;
                                tempCanGetItemCnt = parseInt(tempCartCnt / buyCondStrtQtyAmt);
                                tempQuickMax = tempCartCnt + tempCanGetItemCnt;
                            }
                            quickMax = tempCartCnt;
                        }

                        $("#cartCnt_" + optionKey).val(quickMax);

                        //  전체 가격 = 전체 가격 - 이전값의 가격 + ( 바뀐 개수 * 가격 )
                        var totalPrc = (Number(quickMax) * Number(salePrc));

                        //  전체 개수, 금액 세팅
                        $("#totalCnt").val(quickMax);
                        $("#totalPrc").val(totalPrc);
                        $("#totalPrcTxt").text($.number(totalPrc));
                        goods.detail.cart.changeMsg(optionKey);

                        return;
                    }

                    var dt = new Date();
                    var hour = dt.getHours();

                    // 2019 추석 연휴 9/12 20:00 ~ 9/14 20:00 오늘드림 제한
                    var fromQuickDiableDate = new Date("2019", "09"-1, "11", "20", "00", "00");
                    var toQuickDiableDate =   new Date("2019", "09"-1, "14", "20", "00", "00");

                    if(dt > fromQuickDiableDate && dt < toQuickDiableDate){
                        alert("[추석 연휴 오늘드림 서비스 운영 중지 안내]\n추석 연휴 기간 오늘드림 서비스 이용이 제한되며,\n9월 14일(토) 오후 8시부터 오늘드림 주문이 가능합니다.");
                        return;
                    }

                 // 오늘드림 기간 제한 ( json data가 잘못입력될수도있으니 try 처리 )
                    var _o2oBlockInfo = "";
                    try{
                        _o2oBlockInfo = $.parseJSON($("#o2oBlockInfo").val());
                        if(_o2oBlockInfo.o2oBlockYn == "Y"){
                            alert(_o2oBlockInfo.o2oBlockMsg);
                            return;
                        }
                    }catch(e){console.log(e);}


                    /*if(hour < $("#quickOrdTimeFrom").val() || hour >=$("#quickOrdTimeTo").val() ){
                        alert("오늘드림 주문 가능시간은 오전 10시 ~ 오후 8시 입니다.");
                        return;
                    }*/

                    /*goods.detail.todayDelivery.todayDeliveryList();
                    return;*/
                }


                //  장바구니 개수 체크
                if ( goods.detail.cart.checkCartCnt() ){
                    // get상품 선택 여부 체크
                    if(goods.detail.cart.checkGetItemSelect()){
                        goods.detail.cart.regCart(goodsOptInfo,"Y","NEW");
                    } else {
                        alert("추가상품을 선택해주세요.");
                    }
                }else{
                    alert("상품을 선택해주세요.");
                }
                
            }
        },
        
        /** 장바구니 버튼 **/
        bindBtnBasket : function(){
            
            var loginCheck = common.loginChk();
            
            if ( loginCheck ) {
                //  수량 입력, 옵션 창이 열려 있다면
                var goodsOptInfo = "";
                
                //  옵션이 있는 상품이라면 
                if ( $("#dupItemYn").val() == 'Y' ){
                    goodsOptInfo = "multi";
                }else{
                    goodsOptInfo = "single";
                }
                
                // 오늘드림 여부 선택된 경우 check
                // [START 오늘드림 옵션상품 개선:jwkim]
                if(goods.detail.checkQuick() && $("#dupItemYn").val() == 'Y'){
                    alert("선택하신 옵션 중 오늘드림 서비스가 제공되지 않는 상품이 있습니다.");
                    return false;
                }
                // [END 오늘드림 옵션상품 개선:jwkim]
                
                //  장바구니 개수 체크
                if ( goods.detail.cart.checkCartCnt()){
                    // get상품 선택 여부 체크
                    if(goods.detail.cart.checkGetItemSelect()){
//                            goods.detail.cart.regCart(goodsOptInfo,"N");
                        // 오늘드림 고도화 2019-11-14 변경
                        if(goods.detail.validation == 'N') {
                        	if($(".btn_noDv").css("display") != "none") {
                                alert("상품을 받을 수 있는 주소를 추가해주세요!");
                                return false;
                            } else {
                                if (!$("input[name='pickupDirectYn']").is(":checked")) {
                                    alert("선택하신 배송지로는 주문이 어렵습니다.\n배송지를 변경해 주세요.");
                                    return false;
                                }
                            }
                        }
                        
                        goods.detail.cart.regCart(goodsOptInfo,"N");

                    } else {
                        alert("추가상품을 선택해주세요.");
                    }
                }else{
                    alert("상품을 선택해주세요.");
                }
            }
        },
        
        /** 고시항목 변경 함수 **/
        changeGoodsArtc : function(goodsNo, itemNo){
            var url = _baseUrl + "goods/getGoodsArtcAjax.do";
            var data = {goodsNo : goodsNo, itemNo : itemNo}
            common.Ajax.sendRequest("POST",url,data,goods.detail._callBackArtcList);
            $("#artc_option_box").removeClass("open");
        },
        
        /** 쿠폰 자세히 보기 레이어 팝업 열기 **/
//        openCouponLayerPop : function(){
//            $("#layer_pop_wrap").html($("#couponDownload").html());
//            fnLayerSet("layer_pop_wrap", "open");
//        },
        
        /** 쿠폰 자세히 보기 레이어 팝업 열기 **/
        openCouponLayerPop : function(){
            $("#coupon_layer_pop_wrap").html($("#couponDownload").html());
            fnLayerSet("coupon_layer_pop_wrap", "open");
        },
        
        /** 증정품 레이어 팝업 열기 20200615 YCH 850으로 수정**/
        openGiftLayerPop : function(){
            $("#layerWrap850").html($("#giftInfo2").html());
            fnLayerSet("layerWrap850", "open");
        },
        
        /** 카드혜택가 자세히 보기 레이어 팝업 열기 **/
        openCardFullPop : function(){
            $("#layer_pop_wrap").html($("#cardBenefitInfo").html());
            fnLayerSet("layer_pop_wrap", "open");
        },

        /** (도서산간) 배송비 정책 레이어 팝업 열기 **/
        openDlexFullPop : function(dlvShpCd, dlexPolcNo){
            if($("#dlexAmtCont").attr("data-set")=="false"){
                var url = _baseUrl + "goods/getDlexAmtPopAjax.do";
                var data = {
                    dlvShpCd: dlvShpCd,
                    dlexPolcNo: dlexPolcNo
                };
                common.Ajax.sendRequest("POST", url, data, goods.detail._callBackDlexInfo,false);
            }
            $("#layer_pop_wrap").html($("#dlexAmtPopup").html());
            fnLayerSet("layer_pop_wrap", "open");
        },

        /** (도서산간) 배송비 정책 팝업 콜백 **/
        _callBackDlexInfo : function(res){
            if($("#dlexAmtCont").attr("data-dlv-cd")!="20"){
                $("#dlvShpStr").text("업체");
            }
            $("#dlexAmt").text(res.dlexAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            $("#ferryRgnDlexAmt").text(res.ferryRgnDlexAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            $("#jejuDlexAmt").text(res.jejuDlexAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            $("#jejuFerryRgnDlexAmt").text(res.jejuFerryRgnDlexAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            $("#dlexAmtCont").attr("data-set","true")
        },

        /** 컬러칩 레이어 팝업 열기 **/
//        openColorchipPop : function(){
//            $("#layer_pop_wrap").html($("#colorChip").html());
//            fnLayerSet("layer_pop_wrap", "open");
//        },
//        

        /** 오프라인 재고보유 현황 페이지 Ajax **/
        offlineBurialLink : function(){
            var url = _baseUrl + "goods/getStockStoreListAjax.do";
            var data = {myStoreYn : 'Y', goodsNo : goods.detail.goodsNo};
            common.Ajax.sendRequest("POST",url,data,goods.detail.offstore._callBackOfflineForm);
        },
        
        
        /** 상품문의 탭 Bind */
        qnaTabInit : function(){
            var url = _baseUrl + "goods/getQnaListAjax.do";
            var data ={goodsNo:goods.detail.goodsNo, gdasSctCd : '20'};
            common.Ajax.sendRequest("POST",url,data,goods.detail.qna._callBackQnaListAjax);
        },
        
        /** 추천상품 조회 */
        recommGoodsList : function(){
            var url = _baseUrl + "goods/getRecommGoodsListAjax.do";
            var data ={goodsNo:goods.detail.goodsNo, fltDispCatNo:$("#assocDispCatNo").val()};
            common.Ajax.sendRequest("POST",url, data, goods.detail._callBackRecommGoodsList);
        },
        
        /** 콜백 추천상품 조회 **/
        _callBackRecommGoodsList : function(res) {
            
            //  데이터가 없을 경우
            if(res.trim() == "") {
                $(".mlist2v-goods.mgT10").hide();
                
                return;
            }
            
            //  추천 상품 조회
            $("#recommGoodsList").html(res);
            $(".dispCatBest").css("display","block");
            
            setTimeout(function() {
                //  링크 처리
                common.bindGoodsListLink();
                
                //  찜 버튼 Bind
                $(".cate_prd_list").find(".btn_zzim").unbind("click");
                
                $(".cate_prd_list").find(".btn_zzim").click(function(){
                    //  로그인 체크
                    if(common.loginChk()){
                        var param = {
                                goodsNo : $(this).attr("data-ref-goodsNo")
                        };
                
                        if($(this).hasClass("on")){
                            //  off
                            var resultData = common.wish.delWishLst(param);
                            var result = resultData.trim();
                            if ( result == '000' ){
                                $(this).removeClass("on");    
                            } 
                        }else{
                            //on
                            var resultData = common.wish.regWishLst(param);
                            var result = resultData.trim();
                            if ( result == '000' ){
                                $(this).addClass("on");    
                            }
                        }
                    }
                });
                
                $(".goodsList").addClass("goods_catebest");
                
                //레이지로드 셋
                common.setLazyLoad();
                
                setTimeout(function() {
                    $(document).resize();
    
                }, 100);
                
            }, 300);
        },
        
        callRecobell : function(recType) {
            var url = _baseUrl + "goods/getRecoBellGoodsDetailAjax.do";
            var param = {
                    recType : recType,
                    repLgcGoodsNo : $("#lgcGoodsNo").val(),
                    goodsNo : $("#goodsNo").val(),
                    recoBellDispCatNo : $("#recoBellDispCatNo").val(),
                    smlDispName : $("#eigeneSmlDispName").val()
            };
            
            var _callBackGetRecoBellContsInfo = function(data) {
                
                if(recType == "a003" || recType == "a029"){
                    $("#recobell_area_" + recType).html("");
                    $("#recobell_area_" + recType).html(data);
                    
                    
                    var curation_basket = $('.curation_basket');
                    var txtSpan;

                    // 슬라이드 기능
                    $('#goods_curation_' + recType).slick({ 
                        arrows: true,
                        infinite: true,
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        dots : true,
                    });

                    $('#goods_curation_' + recType).find('.slick-arrow').on('mouseenter focus',function(e) {
                        var _this = $(this);
                        _thisDots = _this.parents('.curation_basket').find('.slick-dots'), _thisDotsLen = _thisDots
                                .find('li').length, _thisDot = _thisDots.find('li.slick-active button').text();

                        txtSpan = _thisDot + '/' + _thisDotsLen;
                        _this.html(txtSpan);
                        _this.addClass('snum');
                    });
                    $('#goods_curation_' + recType).find('.slick-arrow').on('mouseleave blur', function() {
                        var _this = $(this);
                        _this.removeClass('snum');
                    });
                    $('#goods_curation_' + recType).on('afterChange', function(event, slick, currentSlide) {
                        var _this = $(this), _thisDots = _this.find('.slick-dots'), _thisDotsLen = _thisDots
                                .find('li').length, _thisDot = _thisDots.find('li.slick-active button').text();
                        _arrow = _this.find('.slick-arrow');

                        txtSpan = _thisDot + '/' + _thisDotsLen;
                        _arrow.html(txtSpan);
                    });
                    
                    
                    $('#tabList li:first-child a').on('click', function(){
                        $('#goods_curation_' + recType).get(0).slick.setPosition();    
                    });
                } else if (recType == "a002") {
                    setTimeout(function() { // 간헐적으로 <li>가 세로로 보이는 현상 때문에 시간차를 둠. 
                        var curation_basket = $('.curation_basket');
                        var txtSpan;
                        
                        $("#recobell_area_a002").html("");
                        $("#recobell_area_a002").html(data);
                        
                        // 슬라이드 기능
                        $('#goods_curation_a002').slick({
                            arrows: true,
                            infinite: true,
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            dots : true,
                        });
                        
                        $('#goods_curation_a002').find('.slick-arrow').on('mouseenter focus',function(e) {
                            var _this = $(this);
                            _thisDots = _this.parents('.curation_basket').find('.slick-dots'), _thisDotsLen = _thisDots
                                    .find('li').length, _thisDot = _thisDots.find('li.slick-active button').text();

                            txtSpan = _thisDot + '/' + _thisDotsLen;
                            _this.html(txtSpan);
                            _this.addClass('snum');
                        });
                        $('#goods_curation_a002').find('.slick-arrow').on('mouseleave blur', function() {
                            var _this = $(this);
                            _this.removeClass('snum');
                        });
                        $('#goods_curation_a002').on('afterChange', function(event, slick, currentSlide) {
                            var _this = $(this), _thisDots = _this.find('.slick-dots'), _thisDotsLen = _thisDots
                                    .find('li').length, _thisDot = _thisDots.find('li.slick-active button').text();
                            _arrow = _this.find('.slick-arrow');

                            txtSpan = _thisDot + '/' + _thisDotsLen;
                            _arrow.html(txtSpan);
                        });
                        
                    }, 1000);
                }
                
                setTimeout(function() {
                    if( $("#goodsCnt").val() < 1){
                        $(".tit_h4").hide();
                        $(".temprecobell").hide();
                        if($("#deliveDay").prop("checked") == true) {
                        } else {
                            $(".tempSoldout").show();
                        }
                    }
                    else {
                        $(".temprecobell").show();
                        $(".tempSoldout").hide();
                    }
                    //찜 처리 초기화
                    common.wish.init();
                }, 1000);
               
            };
            
            common.Ajax.sendRequest("POST",url,param,_callBackGetRecoBellContsInfo);
        },

        /** 연관된 기획전 조회 **/
        relPlanShopAjax : function(){
            var url = _baseUrl + "goods/getRelPlanShopAjax.do";
            var data = { goodsNo : goods.detail.goodsNo};
            common.Ajax.sendRequest("POST", url, data, goods.detail._callBackRelPlanShopAjax)
        },
        
        /** 연관된 기획전 조회 콜백 **/
        _callBackRelPlanShopAjax : function(res){
            var cDiv = $(res.trim());
            $("#relPlanShop_area").html(cDiv);
            $("#relPlanShop_area").css("display","block"); // 연관된 기획전
            $(".dispCatBest").css("display","none");
            $("#relPlanShop_area").addClass("rel_planshop");
        },  
        
        /** 고시항목 옵션 변경 콜백 **/
        _callBackArtcList : function(res){
            var cDiv = $(res.trim());
            $("#artcInfo").html(cDiv.find("#artcAjaxInfo").html());
            if ( cDiv.find("#kcAjaxInfo").html().trim() == "" ){
                $("#kcInfo").hide();
            }else{
                $("#kcInfo").html(cDiv.find("#kcAjaxInfo").html());
                $("#kcInfo").show();
            }
        },
        
        /** 화면 초기 진입 고시항목, KC안전인증검사 Ajax **/
        artcKcListAjax : function(artcGoodsNo, artcItemNo, pkgGoodsYn, previewInfo){
            var url = _baseUrl + "goods/getGoodsArtcAjax.do";
            
            if ( previewInfo != undefined && previewInfo != ""){
                var data = {goodsNo : artcGoodsNo, itemNo : artcItemNo, pkgGoodsYn : pkgGoodsYn, viewMode : previewInfo} 
            }else{
                var data = {goodsNo : artcGoodsNo, itemNo : artcItemNo, pkgGoodsYn : pkgGoodsYn}
            }
            common.Ajax.sendRequest("POST",url,data,goods.detail._callBackArtcList);
        },
        
        /** 상품평 삭제 **/
        moveGoodsGdasDel : function(gdasSeq, pntPayYn){
            var matchKey = (new Date()).getTime();
            //상품번호/referrer/ idx 3 탭 저장
            sessionStorage.setItem("saved_goodsTab", goods.detail.goodsNo + "|" + matchKey + "|2");
            
            var retUrl = _baseUrl + "goods/getGoodsDetail.do?mKey=" + matchKey + "&goodsNo="+goods.detail.goodsNo;
            common.gdas.moveGoodsGdasDel(gdasSeq, goods.detail.goodsNo, pntPayYn, retUrl);
        },
        
        /** 옵션 리스트 조회 */
        optInfoList : function(previewInfo){
            var url = _baseUrl + "goods/getOptInfoListAjax.do";
            
            if ( previewInfo != undefined && previewInfo != ""){
                var data ={goodsNo:goods.detail.goodsNo, viewMode : previewInfo};
            } else {
                // 상품 상세에서 오늘드림이 체크되어 있는 경우 오늘드림 옵션 리스트조회
                // [START 오늘드림 옵션상품 개선:jwkim]
                var quickYn = "N";
                var strNo = "999";
                var mbrDlvpSeq = "";
                var quickGiftYn = "";
                var quickAeEvtNo = "";
                
                if($("#deliveDay").prop("checked")==true){
                    quickYn = "Y";
                    mbrDlvpSeq = $("input[name=mbrDlvpSeq]", $("#outItem")).val();
                    quickGiftYn = "Y";
                    quickAeEvtNo = $(".prd_gift_infoVer2").data("evtno");
                }
                
                var data ={goodsNo:goods.detail.goodsNo
                			, quickYn:quickYn
                			, mbrDlvpSeq:mbrDlvpSeq
                			, quickGiftYn : quickGiftYn
                			, quickAeEvtNo : quickAeEvtNo};
                // [END 오늘드림 옵션상품 개선:jwkim]
                //var data ={goodsNo:goods.detail.goodsNo}; // as-is 로직
            }
            common.Ajax.sendRequest("POST",url, data, goods.detail._callBackOptInfoList);
        },
        restockMorePop : function(lgcGoodsNo) {
        	
        	var rccode = common.isLogin() ? "pc_detail_opt_a" : "pc_detail_opt_c";

        	var param = {
        		size : 20,
        		viewType : 'VertPop',
        		loginArea : 'N',
        		styleNo : 25,
        		popupYn : 'Y',
        		viewArea : 'goods_option_soldout_popup_prod',
        		recType : 'a014',
        		iids : lgcGoodsNo,
        		cpcids : $("#recoBellDispCatNo").val(),
        		cps : true, //큐레이션 api 호출용
        		cpt : "c001",
        		rccode : rccode,
                trackingCd: 'Option_Soldout_Curation'
        	};
        	
        	curation.popLoadEvent(param);
        },
		/** CJ ONE 포인트 예상 적립 레이어 팝업 열기 **/
        openCjonepntPop : function(){
        	$("#layerWrap534").html($("#cjonePntInfo").html());
        	fnLayerSet("layerWrap534", "open");
            $('#layerWrap534').addClass('ly_cjone_point').addClass('show').removeClass('w534');
            $(".dimm").bind("click", function(){
                fnLayerSet("layerWrap534", "close");
            });
        },
        
        /** 컬러칩 옵션 리스트 조회 */
        optInfoListColrChip : function(previewInfo){
            var url = _baseUrl + "goods/getQuickStockQty.do";
            if ( previewInfo != undefined && previewInfo != ""){
                var data ={goodsNo:goods.detail.goodsNo, viewMode : previewInfo};
            } else {
                // 상품 상세에서 오늘드림이 체크되어 있는 경우 오늘드림 옵션 리스트조회
                var quickYn = "N"; 
                var mbrDlvpSeq = "";
                var quickGiftYn = "";
                var quickAeEvtNo = "";
                // qDelive checked 값이 Y이면 오늘드림 라디오 선택, N이면 일반배송 라디오 선택이다...
                // 오늘드림 고도화 2019-12-20 변경 $(":input:checkbox[name=qDelive]").prop("checked") == true
                if($("input[name=qDelive]:checked").val() == 'Y'){
                    quickYn = "Y";
                    mbrDlvpSeq = $("input[name=mbrDlvpSeqColrChip]").val();
                    quickGiftYn = "Y";
                    quickAeEvtNo = $("a.todayGift").data("evtno");
                }
                
                var data ={goodsNo:goods.detail.goodsNo
                		, quickYn:quickYn
                		, mbrDlvpSeq:mbrDlvpSeq
                		, quickGiftYn : quickGiftYn
            			, quickAeEvtNo : quickAeEvtNo};
                //var data ={goodsNo:mgoods.detail.goodsNo}; // as-is 로직
            }
            
            common.Ajax.sendRequest("POST",url, data, goods.detail._callBackOptInfoListColrChip);
        },
        
        /** 옵션 리스트 조회 **/
        _callBackOptInfoList : function(res) {
        	//  옵션 리스트 조회
            $("#option_list").html(res);
            
            if($("#quickYn").val() == "Y" && $(".o2oDeliveDay").is(":checked")) {
            	var optOrderStrNo = $("#optOrderStrNo").val();
            	$("#orderStrNo").val(optOrderStrNo);
            	
            	goods.detail.todayDelivery.quickGiftStockInfo(optGiftStockList);
            	
            	if(o2oDeliveryYn != undefined && o2oDeliveryYn != null && o2oDeliveryYn == "N") {
            		if(!$(".btn_todayDV").hasClass("error")) {
            			$(".btn_todayDV").addClass("error");
                        $(".btn_todayDV > dl").append('    <dd>선택하신 배송지는 일반 배송지역이에요.</dd>');
	        		}
                    
                    goods.detail.validation = 'N';
                    
                    if($("#buyOpt").parent().hasClass('open')){
                        $("#buyOpt").parent().removeClass('open');
                    }
                    
                    goods.detail.todayDelivery.pikcupOnlyShow();
	                
	                if (!$("input[name='pickupDirectYn']").is(":checked")) {
	                	alert("선택하신 배송지로는 주문이 어렵습니다.\n배송지를 변경해 주세요.");
		                return;
	                }
	                
            	} else if((o2oMeshYn != undefined && o2oMeshYn != null && o2oMeshYn == "N") || 
            			(o2oHldyYn != undefined && o2oHldyYn != null && o2oHldyYn == "Y")) {
            		
            		if(!$(".btn_todayDV").hasClass("error")) {
            			$(".btn_todayDV").addClass("error");
                        $(".btn_todayDV > dl").append('    <dd>오늘드림 배송지역 (서비스 일시 제한)</dd>');
	        		}
                    
                    goods.detail.validation = 'N';
                    
                    if($("#buyOpt").parent().hasClass('open')){
                        $("#buyOpt").parent().removeClass('open');
                    }
                    
                    goods.detail.todayDelivery.pikcupOnlyShow();
	        		if (!$("input[name='pickupDirectYn']").is(":checked")) {
	        			alert("선택하신 배송지로는 주문이 어렵습니다.\n배송지를 변경해 주세요.");
	        			return;
	        		}
            	}
            }
        },
        
        /** 컬러칩 옵션 리스트 조회 * */
        _callBackOptInfoListColrChip : function(data) {
        	
        	var cnt = $("#colrSoldoutCnt").val();
        	
        	for(var i=0; i <cnt;i++){
        		
        		$("#colrChipItem_"+i).attr('class','soldout');
    			$("#colrParet_"+i).attr('class','soldout');
        	
        		for(var j=0; j < data.todayStockList.length; j++){
            		
            		var itemNo = goods.detail.itemNoFormatter(data.todayStockList[j].itemNo,3);
            		
        			
            		if($("input[name=itemNo_"+i+"]").val() == itemNo){
        				$("input[name=colrQuiekInvQtyView_"+i+"]").val(data.todayStockList[j].stkQty);
        				
        				if(data.todayStockList[j].stkQty == 0){
        					$("#colrChipItem_"+i).attr('class','soldout');
                			$("#colrParet_"+i).attr('class','soldout');
        				}else{
        					$("#colrChipItem_"+i).attr('class','');
        	    			$("#colrParet_"+i).attr('class','');
        				}
        				
        			}
        		
        		}
        		
        		
//        		$("input[name=colrQuiekInvQtyView_"+i+"]").val(data.todayStockList[i].stkQty);
//        		$("#colrChipItem_"+i).attr('class','');
//    			$("#colrParet_"+i).attr('class','');
//        		
//    			if(data.todayStockList[i].stkQty == 0){
//        			$("#colrChipItem_"+i).attr('class','soldout');
//        			$("#colrParet_"+i).attr('class','soldout');
//        		}
        	}

        },
        
        itemNoFormatter : function(n, width) {
        	  n = n + '';
        	  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
        	},
        
        
        // -----------------------------------------------------------------
        /**
         * 2017-02-18 txs 추가
         * 
         * 상품상세 HTML 재가공
         * 단말에서 일부 이미지 등의 Object가 Layout을 벗어나는 문제 수정을 위해 추가 함
         * 
         * 상품상세 페이지 로드 후에 호출 할것.
         * 
         * 
         */
        // start mgoods.detail.tagHandler //
        tagHandler : {
            removeAttrs : function(jqObj, attrs) {
                var strArray = attrs.split(",");
                var strLen = strArray.length;
                
                for(var i=0; i<strLen; i++){
                    jqObj.removeAttr(strArray[i]);
                }
//                
//                $.each(, function(idx) {
//                    jqObj.removeAttr(this);
//                });
            },
            inittGoodsDetailObjects : function() {
                // 상품상세 Layout Containner
                goods.detail.tagHandler.convertMobileHtml($("#tempHtml"));
            },
            /**
             * 
             * 모바일 html 재가공
             * 단말에서 일부 이미지 등의 Object가 Layout을 벗어나는 문제 수정을 위해 추가 함
             * 
             * @param jqContainner
             *              검사 할 영역의 최 상위 JQuery Object
             * 
             */
            convertMobileHtml: function (jqContainer) {

                //html이 깨져있을 수 있어 html을 조회한 후 해당 값을 대입시켜주는 방식
                var tmpHtml = jqContainer.html();
                jqContainer.html(tmpHtml);

            // var checkNum = 0;
            // var removeAttrList = "style,width,height";
            //                
            // jqContainer.children().each(function (n) {
            // checkNum++;
            // if (checkNum < 2) {
            // return;
            // }
            // goods.detail.tagHandler.removeAttrs($(this), removeAttrList);
            // });
            // jqContainer.find("tr, col, td, th").each(function (n) {
            // goods.detail.tagHandler.removeAttrs($(this), removeAttrList);
            // });
            // jqContainer.find("ul, li").each(function (n) {
            // goods.detail.tagHandler.removeAttrs($(this), removeAttrList);
            // });
            // jqContainer.find("table, iframe").each(function (n) {
            // goods.detail.tagHandler.removeAttrs($(this), removeAttrList);
            // $(this).attr("width", "100%");
            // });
            //                
            // var imgCnt = jqContainer.find("img").length;
            // var loadedImgCnt = 0;
            // jqContainer.find("img").each(function (n) {
            // var _this = $(this);
            // goods.detail.tagHandler.removeAttrs(_this, removeAttrList);
            //
            // var img = new Image();
            // img.onload = function () {
            // loadedImgCnt++;
            // //해당 이미지가 300픽셀보다 작으면 패스
            // console.log("img : " + this.width);
            // if (this.width > 300) {
            // _this.attr("width", "100%");
            // }
            // }
            // img.onerror = function() {
            // loadedImgCnt++;
            // }
            //                    
            // img.src = _this.attr("src");
            // });
            //                
            //                var intervalCnt = 0;
            //                tmpIntervalVal = setInterval(function() {
            //                    intervalCnt++;
            //                    if (imgCnt == loadedImgCnt) {
            //                        $(".detail_area").find(".contEditor").append(jqContainer.html());
            //                        clearInterval(tmpIntervalVal);
            //                    }
            //                    if ( intervalCnt == 100 ){
            //                        clearInterval(tmpIntervalVal);
            //                    }
            //                }, 100);
                
                $(".detail_area").find(".contEditor").append(jqContainer.html());

                // 상품기술서 내 배너 trackingCd 적용
                var contEditor = $(".detail_area a");

                $('.detail_area a').each(function() {
                    var baseUrl = $(this).attr("href")
                        /* [PC] 3595395 일부 상품 한정 최근 본 상품 목록 노출되지 않는 오류
                        .replaceAll(/[&|\?]trackingCd=([^&]+){1,}&?/g, "")
                        */
                        .replace   (/[&|\?]trackingCd=([^&]+){1,}&?/g, "")
                        .split("#");
                    var conjunction = baseUrl[0].indexOf('?') > -1 ? "&" : "?";

                    if (!baseUrl[1])
                        $(this).attr('href', baseUrl[0].concat(conjunction, "trackingCd=Banner"));
                    else
                        $(this).attr('href', baseUrl[0].concat(conjunction, "trackingCd=Banner").concat("#", baseUrl[1]));
                });
            }
            
        }, // eof goods.detail.tagHandler //
        // -----------------------------------------------------------------
        
        /** 초기 진입시 탭 이동 **/
        paramMoveTab : function(tab){
            if ( tab != undefined && tab != "" && tab == "2" ){
                setTimeout(function(){
                    var tabPos = $("#tabList").position();
                    window.scroll(0, tabPos.top);
                    $("#reviewInfo > a").click();    
                }, 500);
            }else if ( tab != undefined && tab != "" && tab == "3" ){
                setTimeout(function(){
                    var tabPos = $("#tabList").position();
                    window.scroll(0, tabPos.top);
                    $("#qnaInfo > a").click();    
                }, 500);
            }else if ( tab != undefined && tab != "" && tab == "1" ){
                setTimeout(function(){
                    var tabPos = $("#tabList").position();
                    window.scroll(0, tabPos.top);
                    $("#buyInfo > a").click();    
                }, 500);
            }else if ( tab != undefined && tab != "" && tab == "0" ){
                setTimeout(function(){
                    var tabPos = $("#tabList").position();
                    window.scroll(0, tabPos.top);
                    $("#productInfo > a").click();    
                }, 500);
            }
            
            sessionStorage.removeItem("moveTab");
        },
        
        //  웹로그 바인딩
        bindWebLog : function(){
            //  대카테고리
            $(".goods_category1").bind("click", function(){
                common.wlog("goods_category1");
            });
            //  중카테고리
            $(".goods_category2").bind("click", function(){
                common.wlog("goods_category2");
            });
            //  소카테고리
            $(".goods_category3").bind("click", function(){
                common.wlog("goods_category3");
            });
            //  브랜드상품 전체보기
            $(".goods_brandall").bind("click", function(){
                common.wlog("goods_brandall");
            });
            //  브랜드관
            $(".goods_brand").bind("click", function(){
                common.wlog("goods_brand");
            });
            //  장바구니
            $(".goods_cart").bind("click", function(){
                common.wlog("goods_cart");
            });
            //  구매하기
            $(".goods_buy").bind("click", function(){
                common.wlog("goods_buy");
            });
            //  찜
            $(".goods_wish").bind("click", function(){
                common.wlog("goods_wish");
            });
            //  공유하기 - 카카오스토리
            $(".goods_share_kakao").bind("click", function(){
                common.wlog("goods_share_kakao");
            });
            //  공유하기 - 페이스북
            $(".goods_share_facebook").bind("click", function(){
                common.wlog("goods_share_facebook");
            });
            //  공유하기 - URL
            $(".goods_share_url").bind("click", function(){
                common.wlog("goods_share_url");
            });
            //  오프라인 매장재고 확인
            $(".goods_offline").bind("click", function(){
                common.wlog("goods_offline");
            });
            //  증정품 안내 배너
            $(".goods_giftinfo").bind("click", function(){
                common.wlog("goods_giftinfo");
            });
            //  N+1 행사 안내 배너
            $(".goods_nplus1").bind("click", function(){
                common.wlog("goods_nplus1");
            });
            //  상세정보탭
            $(".goods_detailinfo").bind("click", function(){
                common.wlog("goods_detailinfo");
            });
            //  구매정보탭
            $(".goods_buyinfo").bind("click", function(){
                common.wlog("goods_buyinfo");
            });
            //  카테고리베스트상품
            $(".goods_catebest").bind("click", function(){
                common.wlog("goods_catebest");
            });
            //  연관된 기획전
            $(".rel_planshop").bind("click", function(){
                common.wlog("rel_planshop");
            });
            //  상품평탭
            $(".goods_reputation").bind("click", function(){
                common.wlog("goods_reputation");
            });
            //  상품편개편 시 주석 처리 - line 1095 ~ 1102 (2019.04.11)
            /*
            //  상품평 - 프리미엄탭
            $(".goods_reputation_premium").bind("click", function(){
                common.wlog("goods_reputation_premium");
            });
            //  상품평 - 한줄탭
            $(".goods_reputation_oneline").bind("click", function(){
                common.wlog("goods_reputation_oneline");
            });
            */
            //  Q&A탭
            $(".goods_qna").bind("click", function(){
                common.wlog("goods_qna");
            });
            //  Q&A - 상품문의
            $(".goods_qna_inquiry").bind("click", function(){
                common.wlog("goods_qna_inquiry");
            });
            
           
            
            
          //하단 체크
            var scrollFlag="N";
            $(window).on('scroll', function(){
               var _docuHeight = $(document).height(),
                    _scrollHeight = $(window).height() + $(window).scrollTop();
               
               //console.log('_docuHeight : ' + _docuHeight);
               //console.log('_scrollHeight : ' + _scrollHeight);
               
               if((_docuHeight - _scrollHeight)/_docuHeight === 0){
                   if(scrollFlag=="N"){
                       common.wlog("goods_scroll_end");
                       scrollFlag="Y";
                   }
               }           
            });
        },
        
        // 배송이 오늘드림인경우 일반상품과 오늘드림 옵션상품이 같이 있는지 여부를 판단 jwkim
        checkQuick : function(){
            
            var chkQuick = false;
            var optionKey = "";
            var goodsNo = $("input[name=sGoodsNo]").val()
            var quickYn = "";
            
            if($("#deliveDay").prop("checked")==true){
                $(".option_add_area  input[name=itemNo]").each(function(){
                    
                    optionKey = goodsNo+$(this).val();
                    quickYn = $("#quickYn_"+optionKey).val();
                    
                    if(quickYn == "N"){
                        chkQuick = true;
                    }
                    
                });
            } else {
                chkQuick = false;
            }
            
            return chkQuick;
        },
        
        /** 상품기술상세서 콜백 **/
        _callBackSetLoGoodsDetailHtml : function(data){
            if( data.trim() == ''){
            }else{
                var goodsHtml = $(data).find('.contEditor');
                $('.detail_area').append(goodsHtml);
            }

        },
        /** 상품기술상세서 콜백 **/
        _callBackSetGoodsDetailHtml : function(data){
            
            if( data.trim() == ''){
                setLoGoodsDetailHtml();
            }else{
//                var goodsHtml = $(data).find('.contEditor');
//                $('.detail_area').append(goodsHtml);
                $('.detail_area').append(data);
//                
//                resizeYoutube();
//                $(window).resize(function(){resizeYoutube();});
//                $(function(){resizeYoutube();});
//                function resizeYoutube(){ $("iframe").each(function(){ if( /^https?:\/\/www.youtube.com\/embed\//g.test($(this).attr("src")) ){ $(this).css("width","100%"); $(this).css("height",Math.ceil( parseInt($(this).css("width")) * 480 / 854 ) + "px");} }); }
            }
            
        },
        
        /** 로컬 상품기술상세서 셋팅 **/
        setLoGoodsDetailHtml : function(){
            var url = _baseUrl + "goods/getGoodsDesc.do";
            var goodsNo = $("#goodsNo").val();
            var dispCatNo = $("#dispCatNo").val();
            var data = {goodsNo : goodsNo, dispCatNo : dispCatNo};
            common.Ajax.sendRequest("POST",url,data,goods.detail._callBackSetLoGoodsDetailHtml); 
        },

        /** CDN 상품기술상세서 셋팅 **/
        setGoodsDetailHtml : function(){
            var url = _baseUrl + "goods/getCdnGoodsDesc.do";
            var requestUrl = "http://ca.oliveyoung.co.kr/Acceleration/Cached";
            var cVer = $("#sysModDtime").val().replaceAll('-', '').substr(0,8); 
            var tu = _baseUrl + "goods/getGoodsDesc.do?goodsNo="+goods.detail.goodsNo+"&dispCatNo="+goods.detail.dispCatNo;
//            var tu = "http://qa.oliveyoung.co.kr/store/goods/getGoodsDesc.do?goodsNo="+goods.detail.goodsNo+"&dispCatNo="+goods.detail.dispCatNo; // for test
            var data = {
                              pid  : goods.detail.goodsNo
                            , cVer : cVer
                            , dv   : "PC"    
                            , charset : "utf-8"
                            , eVer : "2.0.0"
                            , inc_css : "N"
                            , inc_js : "N"                                
                            , tu   : tu
                            , requestUrl   : requestUrl
                            , v : "190524" // css, js version 정보
                            , cssUrl : "http://ca.oliveyoung.co.kr/Cont/Css/s-style_v2.min.css"
                            , jsUrl  : "http://ca.oliveyoung.co.kr/Cont/Js/slazy_v2.min.js"
                        };
            
            $.ajax({
                type   : "POST"
               ,url    : url
               ,data   : data
               ,async  : true
               ,success: function(response){
                   common.Ajax.proceed(response, goods.detail._callBackSetGoodsDetailHtml);
                }
               ,error  : function (jqXHR,error, errorThrown){
                   // error 발생시 로컬 상품기술상세서 셋팅
                   goods.detail.setLoGoodsDetailHtml();
                }
              });
            
        } // end, setGoodsDetailHtml
        
        
        
};


/** 상품 Q&A */
$.namespace("goods.detail.qna");
goods.detail.qna = {
        
        qnaPageIdx : 1,
        
        /** 상품Q&A INIT **/
        init : function(){
            //  BUTTON INIT
            goods.detail.qna.bindButtonInit();
        },
        
        /** Q&A 콜백 */
        _callBackQnaListAjax : function(data){
            $("#qnaContentsArea").html("");
            $("#qnaContentsArea").html(data);
        },
        
        /** 상품평 내용 펼치기/접기 Bind */
        bindButtonInit : function(){
            
            $(".readyBind").click(function(e){
                e.preventDefault();
                if($(this).parents('li').hasClass('show')){
                    $(this).parents('li').removeClass('show');
                }else{
                    $(this).parents('li').addClass('show').siblings().removeClass('show');
                }
            });
            
            $(".readyBind").addClass("completeBind");
            $(".completeBind").removeClass("readyBind");
            
            // 페이징 선택
            $("#qnaContentsArea").find(".pageing").find('a').click(function(){
                var pageIdx = $(this).data('pageNo');
                
                if(typeof pageIdx == 'undefined' || pageIdx == '') return;
                
                goods.detail.qna.goPage($(this).data('pageNo'));
            });
            
        },
        
        /** 페이징 Ajax **/
        goPage : function(pageIdx){
            var url = _baseUrl + "goods/getQnaListAjax.do";
            var data ={goodsNo:goods.detail.goodsNo, gdasSctCd : '20', pageIdx : pageIdx};
            common.Ajax.sendRequest("POST",url,data,goods.detail.qna._callBackQnaListAjax);            
        },
        
        /** 상품 Q&A 등록 페이지로 이동 **/
        moveGoodsQnaRegPage : function(goodsNo){
            //  상품 qna 등록 오픈 레이어
            var url = goods.detail.retUrl + goods.detail.goodsNo;
            common.qna.openQnaRegPop(goods.detail.goodsNo, '', url);
        },
        
        /** 상품 Q&A 수정 페이지로 이동 **/
        moveGoodsQnaModPage : function(gdasSeq, goodsNo){
            //  상품 qna 수정 오픈 레이어
            var url = goods.detail.retUrl + goods.detail.goodsNo;
            common.qna.openQnaRegPop(goods.detail.goodsNo, gdasSeq, url);
        },
        
        /** 상품 Q&A 삭제 **/
        moveGoodsQnaDel : function(gdasSeq){
            
            if ( confirm("상품 Q&A를 삭제하시겠습니까?") ){
                var loginCheck = common.loginChk();
                
                if ( loginCheck ){
                    
                    var data = {gdasSeq : gdasSeq};
                    //jsTemplet
                    _ajax.sendRequest("POST"
                        , _baseUrl + "mypage/delQnaJson.do?gdasSeq="+gdasSeq
                        , data
                        , goods.detail.qna.delGoodsQnaSuccess
                    );
                }    
                
            }else{
                return;
            }
            
        },
        
        /** 상품 Q&A 삭제 콜백 **/
        delGoodsQnaSuccess : function(data){
            
            if(data == "000"){
                alert("성공적으로 삭제하였습니다.");
                $("#qnaList").html("");
                location.href = _baseUrl + "goods/getGoodsDetail.do?goodsNo=" + $("#goodsNo").val();
            }else{
                alert("삭제가 실패하였습니다.");
            }
        },
        
        /** 상품 등록 콜백 **/
        _callBackRegQnaForm : function(res){
            $("#pop_cont").html(res);
            $('body').append('<div class="dimm"></div>');
            $("#pop_cont").show();
        } 
        
}

/** 쿠폰 **/
$.namespace("goods.detail.coupon");
goods.detail.coupon = {

        /** 쿠폰 다운로드 콜백 **/
        _callBackCouponDownload : function(data){
            if( data && data.ret == '-1'){
                common.link.moveLoginPage();
            } else {
                alert(data.message);
//                fnLayerSet("layer_pop_wrap", "close");
                fnLayerSet("coupon_layer_pop_wrap", "close");
                
                //20200609 YCH 상품상세 쿠폰다운로드시 확인용 추가
              	 if(data.ret=="0"){

              		 var vCpnNo=$('#hidden'+'_cpno').val();

   	            	 try {
   	            		
   	            		 var vCpnNo=$('#hidden'+'_cpno').val();
   	            		
   	            		 $('#spn_cpno_'+vCpnNo).html("발급완료");
   	            		 $('#btn_cpno_'+vCpnNo).parent().attr('class','prd_coupon disabled');
   	            		 $('#btn_cpno_'+vCpnNo).attr("disabled", true);
   	            	 }catch(e){}
              	 }
            }
        },

        /** 쿠폰 다운로드 클릭 **/
        couponDownload : function(cpnNo){
            var url = _baseUrl + "main/downCouponJson.do";
            var data = {cpnNo : cpnNo};
            common.Ajax.sendRequest("POST",url,data,goods.detail.coupon._callBackCouponDownload); 
        },
        
        /** 쿠폰 다운로드 콜백 클릭 상품상세용 YCH 20200610 * */
        couponDownloadForDetail : function(cpnNo,decpnNo){
            var url = _baseUrl + "main/downCouponJson.do";
            var data = {cpnNo : cpnNo};
            
            //20200609 YCH 상품상세 쿠폰다운로드시 확인용 추가
            try {
            	$('#hidden_cpno').val(decpnNo);
            }catch(e){}
            
            common.Ajax.sendRequest("POST",url,data,goods.detail.coupon._callBackCouponDownloadForDetail); 
        }   
        ,

        _callBackCouponDownloadForDetail : function(data){

            if( data.ret == '-1'){
                common.link.moveLoginPage();                
            } else {
            	//20200609 YCH 상품상세 쿠폰다운로드시 확인용 추가
            	alert(data.message);
                fnLayerSet("coupon_layer_pop_wrap", "close");
            	
            	if(data.ret=="0"){

            		var vCpnNo=$('#hidden'+'_cpno').val();

            		try {
	            		
            			var vCpnNo=$('#hidden'+'_cpno').val();
	            		
            			$('#spn_cpno_'+vCpnNo).html("발급완료");
            			$('#btn_cpno_'+vCpnNo).parent().attr('class','prd_coupon disabled');
            			$('#btn_cpno_'+vCpnNo).attr("disabled", true);
            		}catch(e){}
            	}
            }
        }
        , isCouponDowloadCheck : function(frm){
        	var self = $(frm);
//      	if(self.parent().parent().children('.btn_coupon').is(":disabled")){
//      		
//      		return false;
//      		
//      	}else{
      		goods.detail.openCouponLayerPop();
//        }
      	
      	
      		
      }
        /** 쿠폰 다운로드 클릭 상품상세용 YCH 20200610 * */
},


/** 재입고 알림 페이지 */
$.namespace("goods.detail.alertstock");
goods.detail.alertstock = {
        
        /** 재입고알림 Init **/
        init : function(){
        },
        
        /** 재입고 알림 콜백 **/
        _callBackAleartStockForm : function(data){
            $("#stockAlimLayer").html("");
            $("#stockAlimLayer").html(data);
        },
        
        /** 버튼 INIT **/
        bindButtonInit : function(){
            /** 재입고 알림 레이어 닫기 Bind */
            $("#stockAlimClose").click(function(){
                $("#stockAlimLayer").hide();
            });
        }
};

/** 재고보유 현황 **/
$.namespace("goods.detail.offstore");
goods.detail.offstore = {
        
        isProcessing : false,
        
        scrollbarFlag : 'N',
        offstorePageIdx : 1,
        myStoreYn : 'N',
        nearStoreYn : 'N',
        storeSearchYn : 'N',
        lgcGoodsNo : $('#lgcGoodsNo').val(),
        searchYn : 'N',
        geoFlag : 'Y',
        
        // 201912
        usrLat : "",
        usrLng : "",
        
        buttonStarClickCnt : 0, //관심매장 등록 클릭 수
        buttonStarClickPreStoreNo : "", //관심매장 등록 이전 클릭 매장번호
        
        favorCount :  0,
        
        logincheck : function(strNo){

            if(common.isLogin() == false){

                if(!confirm(_messageLoginCheck)){
                    return false;
                }else{
                    common.link.moveLoginPage();
                    return false;
                }
            }

            return true;

        },
        
        /** 재고보유현황 INIT **/
        init : function(){
            
            $("#totCont").show();
            
            if($("#noLoginInfo").length > 0){
            	$(".reShop_msg", $("#favorCont")).hide();
            }
            
            // 옵션 상품의 경우, 옵션 셀렉트 박스 첫번째 값으로 초기진입 리스트를 가져온다.
            if ( $("#dupItemYn").val() == 'Y' ){
                goods.detail.offstore.lgcGoodsNo = $("#stockPrdList").find("li").eq(0).find("span").attr("value").split('|')[0];
            }
            
            goods.detail.offstore.getSearchStoreList(goods.detail.offstore.storeSearchYn); 
        },
        
        /** 검색 처리 **/
        /** 201912 키워드 검색이 아닌, 셀렉트 박스 검색으로 대체하여 주석처리 함. **/
        /*searchWords : function(tabYn){
            var sWords =  $("#offlineStock").find("#searchWords").val();
            sWords = sWords.trim();
            sWords = sWords.replace(/\s+/g, '');
            $("#searchWords").val(sWords);
            //검색어 있는 경우에만 검색
            if( 0 < sWords.trim().length ){
                if (0 < sWords.trim().length && sWords.trim().length < 2 ){
                    //  검색어 2글자 이상으로 입력하라는 alert 팝업
                    alert("검색어는 2글자 이상 입력해주세요.");
                    return;
                }
                
                var url = _baseUrl + "goods/getStockStoreListJson.do";
                var data = {myStoreYn : 'N', searchWords : sWords, btnYn : 'Y', lgcGoodsNo:goods.detail.offstore.lgcGoodsNo};
                
                if ( goods.detail.offstore.searchYn == 'N' ){
                    goods.detail.offstore.searchYn = 'Y';
                    
                     // cjone 점검 체크
                    common.Ajax.sendRequest("POST",_baseUrl + "goods/getCjoneAvailableJson.do","",function(json){
                        var res =(typeof json !== 'object') ? $.parseJSON(json) : json;
                        if(res != null && res.result){
                            common.Ajax.sendRequest("POST",url,data,goods.detail.offstore._callBackGetSearchStoreList);
                        }else{
                            goods.detail.offstore.searchYn = 'N';
                            alert("죄송합니다. 시스템 점검으로 이용이 불가합니다.");
                        }
                    });
                    
                }else{
                    alert("현재 매장 검색 중입니다. 잠시만 기다려주시기 바랍니다.");
                }
                
            }else{
                if ( tabYn != 'Y' ){
                    alert("검색어는 2글자 이상 입력해주세요.");    
                }
            }
        },*/
        
        /** 버튼 INIT **/
        bindButtonInit : function(){
            
        	//  검색 버튼 클릭 Bind
            // 매장 조회
            $("#totCont .btn_sch").on("click", function () {
                if ($("#searchWords").val() != '') {
                    goods.detail.offstore.getSearchStoreList('Y');
                } else {
                    goods.detail.offstore.getSearchStoreList('N');
                }
            });
            
            // 검색어 삭제
            $("#totCont .btn_sch_del").on("click", function(){
            	$("#searchWords").val("");
            	$(this).removeClass("on");
            });
         
            // 검색어 삭제
            $("#searchWords").keyup(function(e){
            	if(e.keyCode == 13){
            		$("#totCont .btn_sch").click();
            	}
            	
            	var keywords = $(this).val();
            	if(keywords != ""){
            		$("#totCont .btn_sch_del").addClass("on");
            	} else {
            		$("#totCont .btn_sch_del").removeClass("on");
            	}
            });
            
            //  엔터키 입력 시 focus, 검색 Bind
            /*$(".layer_tab_cont #searchWords").keypress(function(e){
                if(e.keyCode === 13){
                    $(".layer_tab_cont #searchWords").focus();
                    e.preventDefault();
                    goods.detail.offstore.searchWords();
                }
            });*/
            
            //  재고 보유 옵션 변경 Bind
            /*$("#offlineStock").find('#stockOpt').click(function(e){*/
            $("#store_handlePop").find('#stockOpt').click(function(e){
                e.preventDefault();
                if($(this).parent().hasClass('open')){
                    $(this).parent().removeClass('open');
                }else{
                    $(this).parent().addClass('open');
                }
             });
            
            //  옵션 선택 클릭 Bind
            $('#stockPrdList').find('a').bind('click', function(){
                // 선택 옵션 세팅
                $(this).parents('.prd_option_box').find('.sel_option').html($(this).html());
                $("#selectLgcGoodsNo").val($(this).find("span").attr("value").split('|')[0]);
                $("#selectItemNo").val($(this).find("span").attr("value").split('|')[1]);
                $(this).parents('.prd_option_box').removeClass('open');
                
                goods.detail.offstore.lgcGoodsNo = $("#selectLgcGoodsNo").val();
                
                //  아이템 번호 세팅
                
                if($("#layerTabList").find("li").eq(0).hasClass("on")) {
                	if($("#searchWords").val() != '') {
                        goods.detail.offstore.getSearchStoreList('Y');
                    }else {
                        goods.detail.offstore.getSearchStoreList('N');
                    }
                }else {
                    /*var url = _baseUrl + "goods/getStockFavorStoreListJson.do";
                    var data = {myStoreYn : 'Y', lgcGoodsNo:goods.detail.offstore.lgcGoodsNo, usrLat:$("#usrLat").val(), usrLng:$()};
                    //관심매장 검색
                    common.Ajax.sendRequest("POST",url,data,goods.detail.offstore._callBackGetMyStoreList);*/
                    goods.detail.offstore.getMyStoreList();
                }
                
                
                //전체매장 검색
                /*goods.detail.offstore.searchWords('Y');*/
                /*goods.detail.offstore.searchArea('Y');*/
            });

            //  관심매장, 전체매장 탭 토글 전환
            /*$('#layerTabList').length && $('#layerTabList').tabToggle({
                cont_nm:'.layer_tab_cont'
            });*/

            //  가까운 매장 검색 탭 클릭 Bind
            $("#totStore").bind('click', function(){
                
                $(this).parent().addClass("on").siblings().removeClass("on");
                
                if(goods.detail.offstore.storeSearchYn == 'N'){
                    $("#mainAreaList").find("option:eq(0)").prop("selected",true);
                    $("#subAreaList").find("option:eq(0)").prop("selected",true);
                }
                
                $("#favorCont").hide();
                $("#totCont").show();
                
                $("#searchWords").focus();
                
                /*$(".layer_full_area").show();*/
                /*var totCnt = $("#searchStockList").find("#totCnt").val();*/

                /*if($("#searchWords").val() == null && $("#searchWords").val() == '' && totCnt > 0){*/
                /*if($("#mainAreaList option:selected").val() == "none" && totCnt > 0){
                    $(".tx_search_result").hide();
                    $(".store_result").hide();
                }*/
//                $("#searchStockList .mlist-reStore").html('');
                
                goods.detail.offstore.getSearchStoreList(goods.detail.offstore.storeSearchYn);
            });
            
            //  관심매장 탭 클릭 Bind
            $("#favorStore").bind('click', function(){
                
                $(this).parent().addClass("on").siblings().removeClass("on");
                
                $("#totCont").hide();
                $("#favorCont").show();
                /*if("N" == _loginYn){
                    $(".layer_full_area").hide();
                }*/
                goods.detail.offstore.getMyStoreList();
            });
            
            //  레이어 닫기 버튼 클릭 Bind
            /*$("#offlineStock").find(".layer_close").bind('click', function(){*/
            $("#store_handlePop").find(".layer_close").bind('click', function(){
                fnLayerSet('store_handlePop', 'close');
            });
            
        },
        
        getSubAreaListAjax : function() {
            var rgn1 = $("#mainAreaList option:selected").val();

            if (rgn1 != 'none'){
                $("#mainAreaList").addClass("act");
                common.Ajax.sendJSONRequest(
                        "POST"
                        , _baseUrl + "store/getStoreSubAreaListJson.do"
                        , "rgn1="+ rgn1
                        , this._callback_getSubAreaListAjax);
            }else {
                $("#mainAreaList").removeClass("act");
                $("#subAreaList").find("option:eq(0)").prop("selected", true);
                $("#subAreaList").find("option:eq(0)").siblings().remove();
            }
            $("#subAreaList").removeClass("act");
        },
        
        _callback_getSubAreaListAjax : function(retData) {

            $('#subAreaList').attr('disabled', false);
            if(retData == ''){
                $('#subAreaList').attr('disabled', true);
            }
            goods.detail.offstore.makeSelectboxList($("#subAreaList"),_optionRgn2,retData);
        },
        
        makeSelectboxList :  function(area, title, list){
            var dispArea = area;
            var dispList = list;
            var rgn2Selected = area.attr("data-rgn2");

            dispArea.find("option:gt(0)").remove();

            $.each(dispList, function(index, element){
                $option = $("<option>");

                $option.val(element).text(element);
                if(!common.isEmpty(rgn2Selected)){
                    if(rgn2Selected == element){
                        $option.prop("selected",true);
                    }
                }

                dispArea.append($option);
            });
        },
        
        // 페이징 방식이 아닌 스크롤 방식으로 하기 때문에 해당 함수 주석처리
        /** 페이징 클릭 함수 **/
        /*goPage : function(){
            //페이징버튼 클릭이벤트
            $('#searchStockList .pageing').find('a').bind('click', function(){
                goods.detail.offstore.offstorePageIdx = $(this).attr("data-page-no");
                
                if ( goods.detail.offstore.searchYn == 'N' ){
                    goods.detail.offstore.searchYn = 'Y';
                    goods.detail.offstore.getSearchStoreList();    
                }else{
                    alert("현재 매장 검색 중입니다. 잠시만 기다려주시기 바랍니다.");
                }
                
            });
            
            $(".layer_scroll_box2").scrollTop(0);
        },*/
        
        /** 관심매장 조회 함수 **/
        getMyStoreList : function() {
            
            // 브라우저 위치기능 사용할 것인지 알럿 창 띄움
            localStorage.setItem("askLoc","Y");
            
            // 브라우저 위치기능 사용여부
            localStorage.setItem("useLoc", "Y");
            
            if("N" == _loginYn){
                $(".store_info_nologin").css('border-top', '0px');
                $(".store_info_nologin").css('border-bottom', '0px');
                /*$(".layer_full_area").hide();*/
            }
            
            var useLoc = localStorage.getItem("useLoc") == 'Y' ? true : false;

            goods.detail.offstore.myStoreYn = 'Y';
            /*goods.detail.offstore.nearStoreYn = 'N';*/
            
            if(useLoc){//위치정보 허용
                if (navigator.geolocation) {
//                    console.log("=====navigator.geolocation 지원가능 브라우져=========");
                    navigator.geolocation.getCurrentPosition(onSuccessGeolocation2, onErrorGeolocation2, {timeout: 10000});
                } else {
                    /*document.getElementById("map").innerHTML = "<p>사용자의 브라우저는 지오로케이션을 지원하지 않습니다.</p>";*/
                }
            }else {
                
                goods.detail.offstore.geoFlag = 'N';
                
                var param = {
                        pageIdx : 1,
                        nearStoreYn : goods.detail.offstore.nearStoreYn,
                        lgcGoodsNo : goods.detail.offstore.lgcGoodsNo,
                        usrLat : $("#usrLat").val(),
                        usrLng : $("#usrLng").val()
                    };
                    
                    //jsTemplet
                    _ajax.sendRequest("POST"
                        , _ajaxUrl + "goods/getStockFavorStoreListJson.do"
                        , param
                        , goods.detail.offstore._callBackGetMyStoreList
                    );
            }
            
        },
        
        // 201912
        /** 전체매장 >> 가까운 매장 검색 변경 **/
        /**  가까운 매장 검색 함수 **/
        // flag : 팝업 초기 진입과 검색시 분기해줄 변수
        // N : 초기진입
        // Y : 지역 검색 버튼 눌렀을 경우
        getSearchStoreList : function(flag) {
            
            // 브라우저 위치기능 사용할 것인지 알럿 창 띄움
            localStorage.setItem("askLoc","Y");
            
            // 브라우저 위치기능 사용여부
            localStorage.setItem("useLoc", "Y");
            
            goods.detail.offstore.myStoreYn = 'N';
            /*goods.detail.offstore.nearStoreYn = 'Y';*/
            
            if(flag == 'Y'){
                goods.detail.offstore.storeSearchYn = 'Y';
//                return;
            }
            
            var useLoc = localStorage.getItem("useLoc") == 'Y' ? true : false;
            
//            if(flag == 'Y'){
//                var rgn1 = $("#mainAreaList option:selected").val();
//                if(rgn1 == 'none'){
//                    alert(_messageSelect);
//                    return;
//                }
//                
//                var rgn2 = $("#subAreaList option:selected").val();
//                                
//            }
            
            $("#searchStockList .mlist-reStore").html('');
            
            PagingCaller.destroy();

            if(useLoc){//위치정보 허용
                if (navigator.geolocation) {
//                    console.log("=====navigator.geolocation 지원가능 브라우져=========");
                    navigator.geolocation.getCurrentPosition(onSuccessGeolocation2, onErrorGeolocation2, {timeout: 10000});
                } else {
                    /*document.getElementById("map").innerHTML = "<p>사용자의 브라우저는 지오로케이션을 지원하지 않습니다.</p>";*/
                }
            }else {
                
                goods.detail.offstore.geoFlag = 'N';
                
                PagingCaller.init({
                    startPageIdx : 1
                    ,subBottomScroll : 700
                });
                
                var param = {
                    pageIdx : PagingCaller.getCurPageIdx(),
                    nearStoreYn : goods.detail.offstore.nearStoreYn,
                    lgcGoodsNo : goods.detail.offstore.lgcGoodsNo,
                    usrLat : $("#usrLat_default").val(),
                    usrLng : $("#usrLng_default").val(),
                    searchWords : $("#searchWords").val()
                };
                //jsTemplet
                if (localStorage.getItem('existStoreListRequest') != "Y") {  // 중복요청방지
                    _ajax.sendRequest(
                        "POST"
                        , _ajaxUrl + "goods/getStockStoreListJson.do"
                        , param
                        , goods.detail.offstore._callBackGetSearchStoreList
                    );
                    localStorage.setItem('existStoreListRequest',"Y") // 중복요청방지
                }
            }
        },
        
        /** 관심매장 콜백 **/  
        _callBackGetMyStoreList : function(res){
            PagingCaller.curPageIdx+=1
            $("#myStoreStockList .mlist-reStore").html("");
            $("#myStoreStockList .mlist-reStore").append(res);
            goods.detail.offstore.isProcessing = false;
        },
        
        /** 전체매장 콜백 **/
        _callBackGetSearchStoreList : function(res){
            PagingCaller.curPageIdx+=1
            $("#searchStockList .mlist-reStore").append(res);
            goods.detail.offstore.storeSearchYn = 'Y';
            goods.detail.offstore.isProcessing = false;
            localStorage.setItem('existStoreListRequest', "N");
        },
        
        /** 오프라인 재고보유현황 레이어 화면 콜백 **/
        _callBackOfflineForm : function(res){
            var cDiv = $(res.trim());
            /*$("#offlineStock").html(cDiv);*/
            $("#store_handlePop").html(cDiv);
            fnLayerSet("store_handlePop", "open");
            
            var windowHeight = $(window).height();
            var popupMinHeight = $("#store_handlePop").css("min-height").replace("px", "");
            
            if(windowHeight <= Number(popupMinHeight)) {
            	$('#store_handlePop').css('top','1%');
            	$('#store_handlePop').css('margin-top',$(document).scrollTop());
            } else {
            	$('#store_handlePop').css('margin-top',"0");
            }
            
            $("#searchWords").focus();
            
            goods.detail.offstore.bindButtonInit();
        },
        
     // 201912 관심 등록 함수
        setStarEvent : function(obj){
            
            /*var activeFlag = obj.hasClass('active');*/
            var activeFlag = obj.hasClass('on');
            /*var strNo = obj.parent().find("input[name*='storeNo']" ).val();*/
            /*var strNo = obj.parent().next().val();*/
            var strNo = obj.nextAll("input[name*='strNo']").val();
            
            if (activeFlag == true){
                /*if($('#tabType').val() != 'favorTab') {
                    obj.removeClass("on").addClass("active");
                }*/
                
                this.delFavorStoreAjax(strNo , obj);
            }else{
                /*if($('#tabType').val() != 'favorTab') {
                    obj.removeClass("active").addClass("on");
                }*/
                this.regFavorStoreAjax(strNo , obj);
            }
        },
        
        // 관심 해제 Ajax
        delFavorStoreAjax : function(strNo , obj) {
            
            /*if(!confirm(_messageCheckDelete)){
               return;
            }*/

            if(!this.logincheck(strNo)){
                return;
            }
            
            if(goods.detail.isProcessing){
                goods.detail.isProcessing = true;
                return false;
            }

            goods.detail.favorObj = $(obj);

            common.Ajax.sendJSONRequest(
                    "POST"
                    , _baseUrl + "store/delFavorStoreJson.do"
                    , "strNo="+ strNo
                    , this._callback_delFavorStoreAjax);

        },
        
        // 관심 해제 Ajax Callback
        _callback_delFavorStoreAjax : function(strData) {
            
            /*var viewMode = store.common.viewMode;*/
            
            /*console.log("tabType : "+$('#tabType').val());*/

            if(strData.ret == "0"){
                /*alert(strData.message);*/
                /*$("#"+strData.strNo+"li").find("button").removeClass("on").addClass("active");*/
                
                var onFlag = goods.detail.favorObj.hasClass("on");
                if(onFlag) {
                    goods.detail.favorObj.removeClass("on");
                    goods.detail.favorObj.addClass("active");
                }
                
                goods.detail.isProcessing = false;
                /*if($('#layerTabList').find("li").eq(0).hasClass("on")){
                    console.log("가까운 매장 탭인 경우");
                    $("#"+strData.strNo+"li").find("button").removeClass("on").addClass("active");
                    
                    var onFlag = goods.detail.favorObj.hasClass("on");
                    if(onFlag) {
                        goods.detail.favorObj.removeClass("on");
                        goods.detail.favorObj.addClass("active");
                    }
                }else {
                    console.log("관심매장 탭인 경우");
                    goods.detail.offstore.getMyStoreList();
                }*/
            }else{
                common.loginChk();
            }

        },
        
        // 관심 등록 Ajax
        regFavorStoreAjax : function(strNo , obj) {
            
            this.buttonStarClickPreStoreNo = strNo;
            // 클릭한 매장번호가 이전 매장번호하고 같은면 연속클릭 판단
            /*if(this.buttonStarClickPreStoreNo == strNo){
                this.buttonStarClickCnt++;
            }*/
            // 더블클릭 방지
            /*if(store.common.buttonStarClickCnt > 1){
                return false;
            }*/
            
            if(!this.logincheck(strNo)){
                this.buttonStarClickCnt = 0;
                this.buttonStarClickPreStoreNo = "";
                return;
            }
            
            if(goods.detail.isProcessing){
                goods.detail.isProcessing = true;
                return false;
            }

            if(this.favorCount  >= 3){
                alert(_messageLimit);
                this.buttonStarClickCnt = 0;
                this.buttonStarClickPreStoreNo = "";
                return;
            }
            
            
            this.buttonStarClickPreStoreNo = strNo;
            // 클릭한 매장번호가 이전 매장번호하고 같은면 연속클릭 판단
            /*if(this.buttonStarClickPreStoreNo == strNo){
                this.buttonStarClickCnt++;
            }*/
            
            goods.detail.favorObj = $(obj);
            
            common.Ajax.sendJSONRequest(
                    "POST"
                    , _baseUrl + "store/regFavorStoreJson.do"
                    , "strNo="+ strNo
                    , this._callback_regFavorStoreAjax);
        },
        
        _callback_regFavorStoreAjax : function(strData) {
            
            if(strData.ret == "0" || strData.ret == "20" || strData.ret == "30"){
                alert(strData.message);
                $("#"+strData.strNo+"li").find("button").removeClass("active").addClass("on");
                /*if($('#layerTabList').find("li").eq(0).hasClass("on")){
                    console.log("가까운 매장 탭인 경우");
                }else {
                    console.log("관심매장 탭인 경우");
                    goods.detail.offstore.getMyStoreList();
                }*/
                
                /*common.gnb.callSlideMenuAjax();*/
                /*location.reload();*/
            } else if(strData.ret == "10") {
                var onFlag = goods.detail.favorObj.hasClass("active");
                if(onFlag) {
                    goods.detail.favorObj.removeClass("active");
                    goods.detail.favorObj.addClass("on");
                }
                common.push.pushMsgAgrPopupOpen(); // 관심매장 등록 성공 시 앱푸시수신동의팝업 노출
                
            } else{
                common.loginChk();
            }


        },
        // 20.01.22 :: 구매 가능 매장 확인에서 매장 위치 지도에서 확인하기 
        storeMapInit : function(lat, lng, strNo, obj) {
            try {
                if (obj.hasClass("on")) {
                    $("#"+strNo + "map").parent().hide();
                }
                else {
                    if($("#"+strNo + "map").hasClass("load")) {
                        $(".mapOp").removeClass("on");
                        $(".store_wayP").parent().hide();
                        $("#"+strNo + "map").parent().show();
                    }
                    else {
                        if(!common.isEmpty(lat) && !common.isEmpty(lng)) {
                            $(".mapOp").removeClass("on");
                            $(".store_wayP").parent().hide();
                            $("#"+strNo + "map").parent().show();
                            var mapContainer = document.getElementById(strNo+'map') // 지도 영역
                            var mapOption = {
                                center: new daum.maps.LatLng(lat, lng), // 지도 중심좌표(위도,경도)
                                level: 2 // 지도 확대 레벨
                            };
                            var map = new daum.maps.Map(mapContainer, mapOption); // 지도 생성
                            var markerImage = new daum.maps.MarkerImage(_imgUrl + 'store/point_way.png' , new daum.maps.Size(17, 24)); // 마커 이미지 생성
                            
                            var markerPosition = new daum.maps.LatLng(lat, lng); // 마커 위치
                            var marker = new daum.maps.Marker({
                                map: map, // 마커를 표시할 지도
                                position: markerPosition,
                                image : markerImage // 마커 이미지
                            }); // 마커 생성
                            marker.setMap(map); // 마커 표시
                            $("#"+strNo + "map").addClass("load");
                        }
                    }
                }
                obj.toggleClass("on");
            }
            catch(e) {
                console.log(e);
                $(".mapOp").removeClass("on");
                $(".store_wayP").parent().hide();
            }
        },
        
        favoriteStoreMapInit : function(lat, lng, strNo, obj) {
            try {
                if (obj.hasClass("on")) {
                    $("#"+strNo + "map_fav").parent().hide();
                }
                else {
                    if($("#"+strNo + "map_fav").hasClass("load")) {
                        $(".mapOp").removeClass("on");
                        $(".store_wayP").parent().hide();
                        $("#"+strNo + "map_fav").parent().show();
                    }
                    else {
                        if(!common.isEmpty(lat) && !common.isEmpty(lng)){
                            $(".mapOp").removeClass("on");
                            $(".store_wayP").parent().hide();
                            $("#"+strNo + "map_fav").parent().show();
                            var mapContainer = document.getElementById(strNo+'map_fav') // 지도 영역
                            var mapOption = {
                                center: new daum.maps.LatLng(lat, lng), // 지도 중심좌표(위도,경도)
                                level: 2 // 지도 확대 레벨
                            };
                            var map = new daum.maps.Map(mapContainer, mapOption); // 지도 생성
                            var markerImage = new daum.maps.MarkerImage(_imgUrl + 'store/point_way.png' , new daum.maps.Size(17, 24)); // 마커 이미지 생성
                            
                            var markerPosition = new daum.maps.LatLng(lat, lng); // 마커 위치
                            var marker = new daum.maps.Marker({
                                map: map, // 마커를 표시할 지도
                                position: markerPosition,
                                image : markerImage // 마커 이미지
                            }); // 마커 생성
                            marker.setMap(map); // 마커 표시
                            $("#"+strNo + "map_fav").addClass("load");
                        }
                    }
                }
                obj.toggleClass("on");
            }
            catch(e) {
                console.log(e);
                $(".mapOp").removeClass("on");
                $(".store_wayP").parent().hide();
            }
        },
        
        // 재입고신청 버튼 이벤트 (추후 사용 예정)
        regAlimStock : function(strNo) {
        	if($("#selectItemNo").val() == null || $("#selectItemNo").val() == ""){
        		alert("죄송합니다. 시스템 오류로 재입고 알림이 등록되지 않았습니다.");
        		return;
        	}else{
        		common.openStockOffStoreAlimPop(__goodsNo,$("#selectItemNo").val(), strNo);
        	}
        },
        
        //[3354738] 오늘드림 매장 취급여부 조회 | 2020.09.16 | by jp1020
        getAvailableStore : function(strNo, lgcGoodsNo) {
        	var rst = true;
        	var params = {
        			strNo       : strNo
                  , lgcGoodsNo	: lgcGoodsNo
            }
        	
        	_ajax.sendRequest('POST'
        			, _baseUrl + 'goods/getAvailableStoreJsonAjax.do'
                    , params
                    , function(res){
        				
        				if(!res.succeeded){
        					rst = false; // I/F 실패일 경우 미취급으로  판단
                        } else {
                        	var data = (typeof res.data !== 'object') ? $.parseJSON(res.data) : res.data;
                        	console.log("isAvailableStore Ajax Response : " + JSON.stringify(data)); 
                        	//console.log("isAvailableStore Ajax Response invCd : " + data[0].invCd); 
                        	
                        	//미취급
                        	$.each(data, function(i, e){
                        		if(data[i].invCd == '03'){
                        			rst = false;
                            		return false;	
                        		}
                        	});
                        }
                        
                    }
                    , false
        	);
        	return rst;
        }
}

/** 장바구니 **/
$.namespace("goods.detail.cart");
goods.detail.cart = {
        
        init : function(){
            
            var ordPsbMinQty =$("#ordPsbMinQty").val();
            var qtyAddUnit = $("#qtyAddUnit").val();
            
            //  최소구매수량 초기값 세팅
            var initCartCnt = ordPsbMinQty;
            
            $("#totalCnt").val("");
            
            //  옵션 상품일 경우 
            if ( $("#dupItemYn").val() == 'Y' ){
                //  최초 다른 옵션 선택 시 ( 옵션 상품일 경우에는 0으로 세팅)
                initCartCnt = 0;    
            }else{
                cartCnt = initCartCnt;
                var goodsNo = $("#goodsNo").val();
                var itemNo = $("#itemNo").val();
                $("#cartCnt_"+goodsNo+itemNo).val(cartCnt);
            }
            
            //  전체 개수, 전체 총합 계산
            $("#totalCnt").val(initCartCnt);
            var totalPrc = salePrc * Number(initCartCnt);
            $("#totalPrcTxt").text($.number(totalPrc));
            $("#totalPrc").val(totalPrc);
        },
        
        /** 옵션 선택 함수 **/
        // 옵션상품 선택시 오늘드림 옵션인경우 제어를위한 오늘드림 여부추가 jwkim
        selectItem : function(itemNo, itemNm, selectGoodsNo, promCond, promKndCd, buyCnt, itemPrsntYn, promNo, invQty, itemSoldOutYn, itemSalePrc, qtyAddUnit, ordPsbMinQty, ordPsbMaxQty, getItemAutoAddYn, getItemGoodsNo, getItemItemNo, getItemGoodsNm, getItemItemNm, getItemStockQty, lgcGoodsNo, getQuickYn, dispStrtDtime, dispEndDtime){
        	
        	if($("#quickYn").val() == "Y" && $("#deliveDay").is(":checked") && goods.detail.validation == "N" && !$("input[name='pickupDirectYn']").is(":checked")) {
        		alert("선택하신 배송지로는 주문이 어렵습니다.\n배송지를 변경해 주세요.");
                return false;
            }
            
            //  화면에 노출되어 있는 옵션 하위상품 개수
            var goodsSize = $(".prd_cnt_box").length;
            //  선택된 옵션 하위상품 아이템 번호
            var selectVal = itemNo;
            //  선택된 옵션 하위상품의 상품번호
            var sGoodsNo = selectGoodsNo;
            //  키값
            var optionKey = sGoodsNo + itemNo;
            //  선택된 옵션 하위상품명
            var selectText = itemNm;
            //  현재 화면에 옵션 하위상품이 존재하는지에 대한 여부
            var existOptYn = 'N';
            //  현재 화면에 같은 프로모션이 존재하는지에 대한 여부
            var existPromYn = 'N';
            //  현재 화면에 같은 프로모션이 존재할 경우 해당 키값
            var promOptionKey;
            //  현재 화면에 같은 프로모션이 존재할 경우 기 선택된 옵션상품들의 수량
            var promItemCnt = 0;
            //  옵션상품 HTML
            var optGoodsHtml = '';
            //  옵션상품의 행사안내 HTML
            var promotionHtml = '';
            //  상품구매단위 안내 HTML
            var caseCntBoxHtml = '';
            var pkgGoodsYn = $("#pkgGoodsYn").val();    // 패키지 여부
            var giftItemNm = (getItemGoodsNm + " " + getItemItemNm).trim();
            
            //  선택한 상품이 품절이면 선택 금지 
            if ( itemSoldOutYn == 'Y' ){
                return;
            }
            
            //  화면에 노출되어 있는 옵션 하위상품이 존재할 경우
            if ( goodsSize > 0 ){
                //  화면에 노출되어 있는 하위상품들과 현재 선택한 상품이 있는지 체크하는 로직 
                //  존재하면 existOptYn 값 Y로 세팅
                var classNm = "item_" + optionKey;
                
                if ( $(".prd_cnt_box").hasClass(classNm) )
                    existOptYn = "Y";
                
                $(".prd_gift_box").each(function(){
                    var curPromCheck = $(this).attr("promNo");
                    
                    if(curPromCheck == promNo){
                        existPromYn = "Y";
                        promOptionKey = $(this).attr("goodsNo") + $(this).attr("itemNo");
                    }
                });
                
                if(promOptionKey != ""){
                    // 일반배송과 오늘드림 배송의 선택한경우 gift 증정품 데이터 초기화
                    //if ( promKndCd =='P203' ) {
                        //  선택한 옵션상품의 get상품 정보를 상품을 선택할때마다 초기화시킴
                        // [START 오늘드림 옵션상품 개선:jwkim]
                        $(".prd_gift_box.item_"+promOptionKey).attr("getitemautoaddyn", getItemAutoAddYn);
                        $(".prd_gift_box.item_"+promOptionKey).attr("getitemgoodsno", getItemGoodsNo);
                        $(".prd_gift_box.item_"+promOptionKey).attr("getitemitemno", getItemItemNo);
                        $(".prd_gift_box.item_"+promOptionKey).attr("getitemgoodsnm", getItemGoodsNm);
                        $(".prd_gift_box.item_"+promOptionKey).attr("getitemitemnm", getItemItemNm);
                        $(".prd_gift_box.item_"+promOptionKey).attr("getitemstockqty", getItemStockQty);
                        // [END 오늘드림 옵션상품 개선:jwkim]
                    //}
                    
                    $(".prd_cnt_box.item_" + promOptionKey + " input#cartCnt_" + promOptionKey).each(function(){
                        promItemCnt += parseInt( $(this).val() );
                    });
                }
            }
            
            //  옵션 하위상품이 화면에 노출되었을 경우
            if ( existOptYn == 'Y' ){
                //  클릭 시 개수 증가 
                var cartCnt = $("#cartCnt_" + optionKey).val();
                $("#cartCnt_" + optionKey).val(Number(cartCnt) + Number(qtyAddUnit));
                
                // buyCnt 증가, 프로모션 혜택 문구 변경
                goods.detail.cart.changeMsg(promOptionKey);
            }else{
                //  옵션 하위상품이 화면에 노출되지 않았을 경우
                
                //  최소 구매수량으로 초기값 세팅으로 바뀜
                var initCartCnt = parseInt( ordPsbMinQty );
                
                //  상품구매단위 안내 HTML
                if ( qtyAddUnit > 1 || ordPsbMinQty > 1 ) {
                    caseCntBoxHtml = '         <div class="case_cnt_box">';
                    if ( qtyAddUnit > 1 ) {
                        caseCntBoxHtml += '             <p class="case"><span>해당 상품은 <strong>' + qtyAddUnit + '</strong>개 단위로 구매가 가능한 상품입니다.</span></p>';
                    }
                    
                    if ( ordPsbMinQty > 1 ) {
                        caseCntBoxHtml += '             <p class="case"><span>해당 상품은 <strong>' + ordPsbMinQty + '</strong>개 이상 부터 구매가 가능한 상품입니다.</span></p>';
                    }
                    caseCntBoxHtml += '         </div>';
                }

                //  옵션상품 HTML
                optGoodsHtml = '<div class="prd_cnt_box item_' + optionKey + ' ' + (promNo == "" ? "no_prom" : "") + '" promNo="' + promNo + '">'
                            + '     <input type="hidden" id="itemInv_' + optionKey + '" value="' + invQty + '" />'
                            + '     <input type="hidden" id="quickItemInv_' + optionKey + '" value="' + invQty + '" />'
                            + '     <input type="hidden" id="itemQty_' + optionKey + '" value="' + qtyAddUnit + '" />'
                            + '     <input type="hidden" id="itemMinQty_' + optionKey + '" value="' + ordPsbMinQty + '" />'
                            + '     <input type="hidden" id="itemMaxQty_' + optionKey + '" value="' + ordPsbMaxQty + '" />'
                            + '     <input type="hidden" name="itemNo" value="' + selectVal + '" />'
                            + '     <input type="hidden" name="sGoodsNo" value="' + sGoodsNo + '" />'
                            + '     <input type="hidden" name="itemPrsntYn" value="' + itemPrsntYn + '" />'
                            + '     <input type="hidden" id="itemLgcGoodsNo_' + lgcGoodsNo + '" name="itemLgcGoodsNo" value="' + lgcGoodsNo + '" />'
                            + '     <input type="hidden" id="quickYn_' + optionKey + '" value="' + getQuickYn + '" />'
                            + '     <input type="hidden" id="itemSalePrc_' + optionKey + '" value="' + itemSalePrc + '" />' // 오늘드림 제어를위해 사용
                            + '     <div class="tit_area">'
                            + '         <span>'+ selectText;
                            // [START 오늘드림 옵션상품 개선:jwkim 오늘드림 옵션상품인 경우 딱지추가]
                            if(getQuickYn == "Y"){
                                optGoodsHtml += '         <span class="icon_flag delivery">오늘드림</span>'
                            }
                            // [END 오늘드림 옵션상품 개선:jwkim]
                optGoodsHtml+='</span>' 
                            + '         <span class="option_cnt_box">'
                            + '             <button class="btnCalc minus" onClick="goods.detail.cart.prevVal(\'' + optionKey + '\',\'' + itemSalePrc + '\',\'' + qtyAddUnit + '\');">수량 1감소</button>'
                            + '             <input type="text" id="cartCnt_' + optionKey + '" name="" value="' + initCartCnt + '" class="tx_num" title="구매수량" />'
                            + '             <button class="btnCalc plus" onClick="goods.detail.cart.nextVal(\'' + optionKey + '\',\'' + itemSalePrc + '\',\'' + qtyAddUnit + '\');">수량 1증가</button>'
                            + '         </span>'
                            + caseCntBoxHtml
                            + '     </div>' 
                            + '     <div class="cont_area">'
                            + '         <span class="option_price"><span class="tx_num">'+ $.number(itemSalePrc) +'</span>원</span>'
                            + '         <a href="javascript:goods.detail.cart.deleteItem(\'' + optionKey + '\',\'' + itemSalePrc + '\');" class="btn_opt_del">선택한 옵션 삭제</a>'
                            + '     </div>'
                            + '</div>';
                
                //  행사안내 팝업 HTML
                if ( existPromYn != 'Y' ){
                    if ( promKndCd =='P201' ){      // 동일
                        
                        promotionHtml =   '<div class="prd_gift_box item_' + optionKey + '" promNo="' + promNo + '" promKndCd="' + promKndCd + '" goodsNo="' + sGoodsNo + '" itemNo="' + selectVal + '" buyCondStrtQtyAmt="' + buyCnt + '" getItemAutoAddYn="' + getItemAutoAddYn + '" getItemGoodsNo="' + getItemGoodsNo + '" getItemItemNo="' + getItemItemNo + '" getItemGoodsNm="' + getItemGoodsNm + '" getItemItemNm="' + getItemItemNm + '" getItemStockQty="' + getItemStockQty + '" getOriItemAutoAddYn="' + getItemAutoAddYn + '">';
                        if(buyCnt <= ordPsbMinQty){
                            promotionHtml += '       <p class="tit"><strong>' + promCond + ' 적용</strong>되어 구매됩니다. <font name="period" style="font-weight:100; color:#333; font-size:14px">('+ dispStrtDtime + "~" + dispEndDtime +')</font></p>' ;
                            promotionHtml += '       <p class="txt nobtn">' + itemNm + ' 총 ' + (initCartCnt + parseInt(initCartCnt / buyCnt) ) + '개가 배송됩니다.</p>';
                        } else {
                            promotionHtml += '       <p class="tit"><strong>' + promCond + ' 행사</strong>상품입니다. <font name="period" style="font-weight:100; color:#333; font-size:14px">('+ dispStrtDtime + "~" + dispEndDtime +')</font></p>' ;
                            promotionHtml += '       <p class="txt"><strong>' + (buyCnt - ordPsbMinQty) + '개</strong> 더 구매하시면 <strong>' + buyCnt + '+1 혜택</strong>을 받으실 수 있어요</p>';
                            promotionHtml += '       <a href=javascript:common.openEvtInfoPop("' + promNo  + '","' + promKndCd + '","' + promCond + '","' + sGoodsNo + '","' + selectVal + '"); class="btnSmall wGray" data-rel="layer" data-target="layer_pop_wrap" id="evtPopup">자세히 보기</a></p>';       
                        }
                        promotionHtml += '   </div>';
                        
                    }else if ( promKndCd =='P202' ) {       // 교차
                        
                        promotionHtml =  '<div class="prd_gift_box item_' + optionKey + ' goods_nplus1" promNo="' + promNo + '" promKndCd="' + promKndCd + '" goodsNo="' + sGoodsNo + '" itemNo="' + selectVal + '" buyCondStrtQtyAmt="' + buyCnt + '" getItemAutoAddYn="' + getItemAutoAddYn + '" getItemGoodsNo="' + getItemGoodsNo + '" getItemItemNo="' + getItemItemNo + '" getItemGoodsNm="' + getItemGoodsNm + '" getItemItemNm="' + getItemItemNm + '" getItemStockQty="' + getItemStockQty + '" getOriItemAutoAddYn="' + getItemAutoAddYn + '">';
                        if(buyCnt <= ordPsbMinQty){
                            promotionHtml += '       <p class="tit"><strong>' + promCond + ' 적용</strong>되어 구매됩니다. <font name="period" style="font-weight:100; color:#333; font-size:14px">('+ dispStrtDtime + "~" + dispEndDtime +')</font></p>' ;
                            promotionHtml += '       <p class="txt">' + buyCnt + '+1 상품을 선택해주세요.';
                            promotionHtml += '       <a href=javascript:common.popLayer.promGift.openPromGiftPop("' + sGoodsNo  + '","' + selectVal + '","' + promNo + '"); class="btnSmall wOrange">선택</a></p>';
                        } else {
                            promotionHtml += '       <p class="tit"><strong>' + promCond + ' 행사</strong>상품입니다. <font name="period" style="font-weight:100; color:#333; font-size:14px">('+ dispStrtDtime + "~" + dispEndDtime +')</font></p>' ;
                            promotionHtml += '       <p class="txt">' + (buyCnt - initCartCnt) + '개 더 구매하시면 ' + buyCnt + '+1 혜택을 받으실 수 있어요';
                            promotionHtml += '       <a href=javascript:common.openEvtInfoPop("' + promNo  + '","' + promKndCd + '","' + promCond + '","' + sGoodsNo + '","' + selectVal + '"); class="btnSmall wGray" data-rel="layer" data-target="layer_pop_wrap" id="evtPopup">자세히 보기</a></p>';
                        }
                        promotionHtml += '   </div>';
                        
                    }else if ( promKndCd =='P203' ) {       // A+B
                        
                        promotionHtml   = '<div class="prd_gift_box item_' + optionKey + ' goods_nplus1" promNo="' + promNo + '" promKndCd="' + promKndCd + '" goodsNo="' + sGoodsNo + '" itemNo="' + selectVal + '" buyCondStrtQtyAmt="' + buyCnt + '" getItemAutoAddYn="' + getItemAutoAddYn + '" getItemGoodsNo="' + getItemGoodsNo + '" getItemItemNo="' + getItemItemNo +'" getItemGoodsNm="' + getItemGoodsNm + '" getItemItemNm="' + getItemItemNm + '" getItemStockQty="' + getItemStockQty + '" getOriItemAutoAddYn="' + getItemAutoAddYn + '">';
                        if(getItemAutoAddYn == "Y"){
                            promotionHtml += '       <p class="tit"><strong>GIFT 행사적용</strong>되어 구매됩니다. <font name="period" style="font-weight:100; color:#333; font-size:14px">('+ dispStrtDtime + "~" + dispEndDtime +')</font></p>' ;
                            promotionHtml += '       <p class="txt">' + giftItemNm + ' ' + initCartCnt + '개가 함께 배송됩니다.';
                            promotionHtml += '       <a href=javascript:common.openEvtInfoPop("' + promNo  + '","' + promKndCd + '","' + promCond + '","' + sGoodsNo + '","' + selectVal + '"); class="btnSmall wGray" data-rel="layer" data-target="layer_pop_wrap" id="evtPopup">자세히 보기</a></p>';
                        } else {
                            promotionHtml += '       <p class="tit"><strong>GIFT 행사</strong>상품입니다. <font name="period" style="font-weight:100; color:#333; font-size:14px">('+ dispStrtDtime + "~" + dispEndDtime +')</font></p>' ;
                            promotionHtml += '       <p class="txt">GIFT 상품을 선택해주세요.';
                            promotionHtml += '       <a href=javascript:common.popLayer.promGift.openPromGiftPop("' + sGoodsNo  + '","' + selectVal + '","' + promNo + '"); class="btnSmall wOrange">선택</a></p>';
                        }
                        promotionHtml += '   </div>';
                        
                    } 
                }
                
                //  HTML APPEND
                if($(".option_add_area .prd_cnt_box").length > 0){     // 선택된 옵션이 있으면
                    if(promNo != ""){                                       // 프로모션이 있으면
                        if($(".option_add_area .prd_cnt_box[promNo=" + promNo + "]").length > 0){       // 해당 프로모션이 이미 존재하면
                            $(".option_add_area .prd_cnt_box[promNo=" + promNo + "]:first").before(optGoodsHtml + promotionHtml);
                        } else {                                                                        // 해당 프로모션이 없으면
                            if($(".option_add_area .prd_cnt_box.no_prom").length > 0){      // 프로모션 없는 옵션이 이미 있으면
                                $(".option_add_area .prd_cnt_box.no_prom:last").after(optGoodsHtml + promotionHtml);
                            } else {                                                                    // 프로모션 없는 옵션이 없으면
                                $(".option_add_area").prepend(optGoodsHtml + promotionHtml);
                            }
                        }
                    } else {                                                    // 프로모션이 없으면
                        $(".option_add_area").prepend(optGoodsHtml + promotionHtml);
                    }
                } else {                                                        // 선택된 옵션이 없으면
                    $(".option_add_area").prepend(optGoodsHtml + promotionHtml);
                }
            
                //  수량 조정 바인드
                goods.detail.cart.cartCntBind(optionKey, qtyAddUnit, invQty, itemSalePrc);
                
                if ( existPromYn == 'Y' ){
                    // buyCnt 증가, 프로모션 혜택 문구 변경
                    goods.detail.cart.changeMsg(promOptionKey);
                }
                
                setTimeout(function() {
                    //웹로그 바인딩
                    goods.detail.cart.bindWebLog();
                },100);
            }
                
            //  옵션 닫기
            $(".prd_option_box").removeClass('open');
            
            if(quickAddrYn == "Y" && $("#deliveNudge").hasClass("nudge_show")) { // 오늘드림 넛지 있을 경우 넛지 노출
         	   $("#deliveNudge").removeClass("nudge_hide").fadeIn();
            }
            
            //  총합, 총개수 계산
            var cartCnt = $("#cartCnt_" + optionKey).val();
            var totalCnt = $("#totalCnt").val();
            
            //  초기 옵션 선택시 ( 총합이 0이었을 경우 ) 총합 계산                 
            if ( totalCnt == "0" || totalCnt == "" ){
                $("#totalCnt").val(cartCnt);
                var totalPrc = Number(itemSalePrc) * Number(cartCnt);
                $("#totalPrcTxt").text($.number(totalPrc));
                $("#totalPrc").val(totalPrc);
                
                
            }else{
                if( existOptYn == 'Y' ){
                    // 장바구니 구매수량(수량 1개 증가된)
                    var curCartCnt = Number($("#cartCnt_" + optionKey).val());
                    
                    // 장바구니 구매수량 관련 Validation
                    var check = goods.detail.cart.cartCheck(curCartCnt, optionKey);
                    
                    // 정상적으로 체크가 되었을 경우 
                    if ( check == 'Y'){
                        // 초기 옵션 선택 후 다른 옵션 선택 시 ( ex) A옵션 선택후 바로 B옵션 선택 ) 총합 계산
                        totalCnt = Number(totalCnt) + Number(qtyAddUnit);
                        $("#totalCnt").val(totalCnt);
                    
                        var totalPrc = Number($("#totalPrc").val()) + (Number(itemSalePrc) * Number(qtyAddUnit));
                        $("#totalPrcTxt").text($.number(totalPrc));    
                        $("#totalPrc").val(totalPrc);
                    }else{
                        //추가된 수량 만큼 차감 처리
                        $("#cartCnt_" + optionKey).val(Number(curCartCnt) - Number(qtyAddUnit));
                        goods.detail.cart.changeMsg(promOptionKey);
                        return;
                    }
                }else{
                    //  초기 옵션 선택 후 다른 옵션 선택 시 ( ex) A옵션 선택후 바로 B옵션 선택 ) 총합 계산
                    totalCnt = Number(totalCnt) + Number(cartCnt);
                    $("#totalCnt").val(totalCnt);
                
                    var totalPrc = Number($("#totalPrc").val()) + (Number(itemSalePrc) * Number(cartCnt));
                    $("#totalPrcTxt").text($.number(totalPrc));    
                    $("#totalPrc").val(totalPrc);
                }
            }
            
            goods.detail.todayDelivery.deliveryCharge();  // 배송비 계산
        },
        
        /** 선택 옵션 삭제 **/
        deleteItem : function(optionKey, itemSalePrc){
            var totalPrc = Number($("#totalPrc").val());
            var totalCnt = $("#totalCnt").val();
            
            var deleteItemCnt = $("#cartCnt_"+optionKey).val();
            totalCnt = Number(totalCnt) - Number(deleteItemCnt);
            
            // 뺀 가격 계산
            var deletePrc = Number(itemSalePrc) * Number(deleteItemCnt);
            totalPrc = Number(totalPrc) - Number(deletePrc); 
            
            $("#totalCnt").val(totalCnt);
            $("#totalPrcTxt").text($.number(totalPrc));
            $("#totalPrc").val(Number(totalPrc));
            
            goods.detail.todayDelivery.deliveryCharge(); // 배송비 계산
            
            var selObj = $("div.prd_cnt_box.item_" + optionKey);
            var promNo = selObj.attr("promNo");
            
            if($("div.prd_cnt_box[promNo="+promNo + "]").length == 1)
                $("div.prd_gift_box[promNo="+promNo + "]").remove();
            
            $("div.prd_cnt_box.item_"+optionKey).remove();
            
            //옵션 삭제 시 기프트 행사 item 재매핑 처리
            //$("div.prd_gift_box").removeClass("item_"+optionKey);
            
            // 선택한 옵션이 없는경우 substring에서 문제가 발생하기때문에 0 보다 큰경우에만 처리함 jwkim
            if($("div.prd_cnt_box[promNo="+promNo + "]").length > 0){
                $("div.prd_gift_box").addClass($("div.prd_cnt_box").attr('class').substring($("div.prd_cnt_box").attr('class').indexOf('item_')+21,$("div.prd_cnt_box").attr('class').indexOf('item_')));
                
                goods.detail.cart.changeMsg(optionKey, promNo);
            }
        },
        
        /** 수량 증가 함수 **/
        nextVal : function(optionKey, itemSalePrc, qtyAddUnit){
            // [START 오늘드림 옵션상품 개선:jwkim]
            var promKnCd = $(".prd_gift_box.item_"+optionKey).attr("promkndcd"); 
            var getItemAutoAddYn = $(".prd_gift_box.item_"+optionKey).attr("getitemautoaddyn"); 
            
            // 증정 상품의 경우 레이어에서 상품 선택시 오토를 N으로 하기 때문에 수량변경시 Y로 바꿔줘야 
            // 기존로직그대로 탄다
            if(promKnCd == "P203" && getItemAutoAddYn == "N"){
                var oriItemAutoAddYn = $(".prd_gift_box.item_"+optionKey).attr("getoriitemautoaddyn");
                
                $(".prd_gift_box.item_"+optionKey).attr("getitemautoaddyn", oriItemAutoAddYn);
            }
            // [END 오늘드림 옵션상품 개선:jwkim]
            
            //  장바구니 구매수량
            var cartCnt = Number($("#cartCnt_" + optionKey).val());
            
            //  구매 개수 적용
            cartCnt = cartCnt + Number(qtyAddUnit);
            
            //  장바구니 구매수량 관련 Validation
            var check = goods.detail.cart.cartCheck(cartCnt, optionKey);
            
            //  정상적으로 체크가 되었을 경우 
            if ( check == 'Y'){
                
                //  증가된 값 세팅
                $("#cartCnt_" + optionKey).val(cartCnt);
                
                //  화면에 노출된 옵션 하위상품의 개수가 1개 이상일 경우
                //  여러개중에 선택한 값만 증가되고, 총 개수만 증가됨
                var totalCnt = Number($("#totalCnt").val()) + Number(qtyAddUnit);
                
                var totalPrc = Number($("#totalPrc").val()) + (Number(itemSalePrc) * Number(qtyAddUnit));
                $("#totalPrc").val(totalPrc);
                
                $("#totalCnt").val(totalCnt);
                $("#totalPrcTxt").text($.number(totalPrc));
                goods.detail.todayDelivery.deliveryCharge(); // 배송비 계산
                
                // 선택된 프로모션 상품이 없는경우특정 프로모션 상품 개수 증가X
                // [START 오늘드림 옵션상품 개선:jwkim]
                if($("div.prd_gift_box.item_" + optionKey).hasClass("giftInit")){
                
                } else {
                    
                    // N+1 프로모션 안내 멘트 추가
                    goods.detail.cart.changeMsg(optionKey);
                }
                //goods.detail.cart.changeMsg(optionKey); // as-is 로직
                // [END 오늘드림 옵션상품 개선:jwkim]
                
            }else{
                //  비정상적으로 체크되었을 경우 아무동작하지 않도록 return 
                return;
            }
        },
        
        /** 수량 감소 함수 **/
        prevVal : function(optionKey, itemSalePrc, qtyAddUnit){
            
            // [START 오늘드림 옵션상품 개선:jwkim]
        	var promKnCd = $(".prd_gift_box.item_"+optionKey).attr("promkndcd"); 
            var getItemAutoAddYn = $(".prd_gift_box.item_"+optionKey).attr("getitemautoaddyn"); 
            
            // 증정 상품의 경우 레이어에서 상품 선택시 오토를 N으로 하기 때문에 수량변경시 Y로 바꿔줘야 
            // 기존로직그대로 탄다
            if(promKnCd == "P203" && getItemAutoAddYn == "N"){
                var oriItemAutoAddYn = $(".prd_gift_box.item_"+optionKey).attr("getoriitemautoaddyn");
                
                $(".prd_gift_box.item_"+optionKey).attr("getitemautoaddyn", oriItemAutoAddYn);
            }
            // [END 오늘드림 옵션상품 개선:jwkim]
            
            //  장바구니 구매수량
            var cartCnt = Number($("#cartCnt_" + optionKey).val());
            
            //  구매 개수 적용
            cartCnt = cartCnt - Number(qtyAddUnit);
            
            //  장바구니 구매수량 관련 Validation
            var check = goods.detail.cart.cartCheck(cartCnt, optionKey);
            
            //  정상적으로 체크가 되었을 경우
            if ( check == 'Y'){
                
                //  감소된 값 세팅
                $("#cartCnt_" + optionKey).val(cartCnt);
                
                //  화면에 노출된 옵션 하위상품의 개수가 1개 이상일 경우
                //  여러개중에 선택한 값만 증가되고, 총 개수만 증가됨
                var totalCnt = Number($("#totalCnt").val()) - Number(qtyAddUnit);
                
                var totalPrc = Number($("#totalPrc").val()) - (Number(itemSalePrc) * Number(qtyAddUnit));
                $("#totalPrc").val(totalPrc);
                
                $("#totalCnt").val(totalCnt);
                $("#totalPrcTxt").text($.number(totalPrc));   
                goods.detail.todayDelivery.deliveryCharge(); // 배송비 계산
                
                // 선택된 프로모션 상품이 없는경우특정 프로모션 상품 개수 증가X
                // [START 오늘드림 옵션상품 개선:jwkim]
                if($("div.prd_gift_box.item_" + optionKey).hasClass("giftInit")){
                    
                } else {
                    // N+1 프로모션 안내 멘트 추가
                    goods.detail.cart.changeMsg(optionKey);
                }
                //goods.detail.cart.changeMsg(optionKey);
                // [END 오늘드림 옵션상품 개선:jwkim]
            }else{
                //  비정상적으로 체크되었을 경우 아무동작하지 않도록 return
                return;
            }
        },
        
        /** N+1 프로모션 안내 멘트 추가 **/
        changeMsg : function(optionKey, promNo, init){
            var dupItemYn = $("#dupItemYn").val();      // 옵션 여부
            var pkgGoodsYn = $("#pkgGoodsYn").val();    // 패키지 여부
            var getGoods = "";
            var goodsNm = "";
            var cartCnt = 0;
            var prom = $("div.prd_cnt_box.item_" + optionKey).attr("promNo");
            var period = $("div.prd_gift_box[promno="+prom+"] font[name=period]").text();
        	if(period==undefined || period==""){
        		prom = promNo;
        		period = $("div.prd_gift_box[promno="+prom+"] font[name=period]").text();
        	}
            if(dupItemYn == "Y"){
                var selObj = $("div.prd_cnt_box.item_" + optionKey);
                var promNo = (promNo != undefined) ? promNo : selObj.attr("promNo");
                var promObj = $("div.prd_cnt_box[promNo=" + promNo + "]");
                
                $(promObj).each(function(){
                    cartCnt += parseInt( $(this).find("span.option_cnt_box input").val() ); 
                });
                
                getGoods = $("div.prd_gift_box[promNo=" + promNo + "]");
                goodsNm = selObj.find("div.tit_area span:eq(0)").text();
            } else {
                cartCnt = parseInt( $("input#cartCnt_" + optionKey).val() );
                getGoods = $("div.prd_gift_box");
                goodsNm = $("p.prd_name").text();
            }
            
            var getItemAutoAddYn = getGoods.attr("getItemAutoAddYn");      // Get상품 자동증가 여부
            var buyCondStrtQtyAmt = parseInt( getGoods.attr("buyCondStrtQtyAmt") );
            var getOrdQty = parseInt( cartCnt / buyCondStrtQtyAmt );
            var promNo = (promNo == undefined) ? getGoods.attr("promNo") : promNo;
            var promKndCd = getGoods.attr("promKndCd");
            var promCond = (promKndCd == "P203" ? "GIFT" : buyCondStrtQtyAmt + "+1");
            var giftItemNm = (getGoods.attr("getItemGoodsNm") + " " + getGoods.attr("getItemItemNm")).trim();
            var goodsMsg = "";

            console.log("promKndCd========>" + promKndCd);
            console.log("init========>" + init);
            
            if(promKndCd == "P201"){        // 동일 
                if(init == 'Y') { //초기화 처리
                	
                	// 1 + 1 인경우 초기화
                	if(buyCondStrtQtyAmt == 1){
                		goodsMsg += "<p class='tit'><strong>" + promCond + " 적용</strong>되어 구매됩니다. <font name='period' style='font-weight:100; color:#333; font-size:14px'>" + period + "</font></p>" ;
                        goodsMsg += "<p class='txt nobtn'>";
                        goodsMsg += goodsNm + " 총 " + (cartCnt + getOrdQty) + "개가 배송됩니다.";
                        goodsMsg += "</p>";
                	} else {
                		goodsMsg += "<p class='tit'><strong>" + promCond + " 행사</strong>상품입니다. <font name='period' style='font-weight:100; color:#333; font-size:14px'>" + period + "</font></p>" ;
                        goodsMsg += "<p class='txt'><strong>";
                        goodsMsg += buyCondStrtQtyAmt - (cartCnt % buyCondStrtQtyAmt) + "개</strong> 더 구매하시면 <strong>" + buyCondStrtQtyAmt + "+1 혜택</strong>을 받으실 수 있어요.";
                        goodsMsg += '<a href=javascript:common.openEvtInfoPop("' + promNo  + '","' + promKndCd + '","' + promCond + '","' + getGoods.attr("goodsNo") + '","' + getGoods.attr("itemNo") + '"); class="btnSmall wGray" data-rel="layer" data-target="layer_pop_wrap" id="evtPopup">자세히 보기</a>';
                        goodsMsg += "</p>";
                	}
                    
                } else if(buyCondStrtQtyAmt <= cartCnt){
                    goodsMsg += "<p class='tit'><strong>" + promCond + " 적용</strong>되어 구매됩니다. <font name='period' style='font-weight:100; color:#333; font-size:14px'>" + period + "</font></p>" ;
                    goodsMsg += "<p class='txt nobtn'>";
                    goodsMsg += goodsNm + " 총 " + (cartCnt + getOrdQty) + "개가 배송됩니다.";
                    goodsMsg += "</p>";
                }  else {
                    goodsMsg += "<p class='tit'><strong>" + promCond + " 행사</strong>상품입니다. <font name='period' style='font-weight:100; color:#333; font-size:14px'>" + period + "</font></p>" ;
                    goodsMsg += "<p class='txt'><strong>";
                    goodsMsg += buyCondStrtQtyAmt - (cartCnt % buyCondStrtQtyAmt) + "개</strong> 더 구매하시면 <strong>" + buyCondStrtQtyAmt + "+1 혜택</strong>을 받으실 수 있어요.";
                    goodsMsg += '<a href=javascript:common.openEvtInfoPop("' + promNo  + '","' + promKndCd + '","' + promCond + '","' + getGoods.attr("goodsNo") + '","' + getGoods.attr("itemNo") + '"); class="btnSmall wGray" data-rel="layer" data-target="layer_pop_wrap" id="evtPopup">자세히 보기</a>';
                    goodsMsg += "</p>";
                }
            } else if(promKndCd == "P202") {        // 교차
                if(init == 'Y') { //초기화 처리

                	// 1 + 1 인경우 초기화
                	if( buyCondStrtQtyAmt == 1 ){
                		goodsMsg += "<p class='tit'><strong>" + promCond + " 행사</strong>상품입니다. <font name='period' style='font-weight:100; color:#333; font-size:14px'>" + period + "</font></p>" ;
                        goodsMsg += "<p class='txt'>";
                        goodsMsg += buyCondStrtQtyAmt + "+1 상품을 선택해주세요.";
                        goodsMsg += '<a href=javascript:common.popLayer.promGift.openPromGiftPop("' + getGoods.attr("goodsNo") + '","' + getGoods.attr("itemNo") + '","' + promNo + '"); class="btnSmall wOrange" data-rel="layer" data-target="layer_pop_wrap" id="evtPopup">선택</a>';
                	} else {
                        goodsMsg += "<p class='tit'><strong>" + promCond + " 행사</strong>상품입니다. <font name='period' style='font-weight:100; color:#333; font-size:14px'>" + period + "</font></p>" ;
                        goodsMsg += "<p class='txt'><strong>";
                        goodsMsg += buyCondStrtQtyAmt - (cartCnt % buyCondStrtQtyAmt) + "개</strong> 더 구매하시면 <strong>" + buyCondStrtQtyAmt + "+1 혜택</strong>을 받으실 수 있어요.";
                        goodsMsg += '<a href=javascript:common.openEvtInfoPop("' + promNo  + '","' + promKndCd + '","' + promCond + '","' + getGoods.attr("goodsNo") + '","' + getGoods.attr("itemNo") + '"); class="btnSmall wGray" data-rel="layer" data-target="layer_pop_wrap" id="evtPopup">자세히 보기</a>';
                        goodsMsg += "</p>";
                	}
                    
                } else if(buyCondStrtQtyAmt <= cartCnt){
                    var selectGetCnt = getGoods.find("span.opt span.prd").length;
                    
                    if(selectGetCnt == 0){
                        goodsMsg += "<p class='tit'><strong>" + promCond + " 행사</strong>상품입니다. <font name='period' style='font-weight:100; color:#333; font-size:14px'>" + period + "</font></p>" ;
                        goodsMsg += "<p class='txt'>";
                        goodsMsg += buyCondStrtQtyAmt + "+1 상품을 선택해주세요.";
                        goodsMsg += '<a href=javascript:common.popLayer.promGift.openPromGiftPop("' + getGoods.attr("goodsNo") + '","' + getGoods.attr("itemNo") + '","' + promNo + '"); class="btnSmall wOrange" data-rel="layer" data-target="layer_pop_wrap" id="evtPopup">선택</a>';
                    } else {
                        goodsMsg += "<p class='tit'><strong>" + promCond + " 적용</strong>되어 구매됩니다. <font name='period' style='font-weight:100; color:#333; font-size:14px'>" + period + "</font></p>" ;
                        goodsMsg += "<p class='txt'>";
                        
                        // 기 선택된 수량과 선택가능 수량을 비교하여 버튼 변경
                        var selGetItemCnt = 0;
                        var canGetItemCnt = parseInt(cartCnt / buyCondStrtQtyAmt);
                        
                        getGoods.find("span.opt").each(function(){
                            selGetItemCnt += parseInt( $(this).attr("ordQty") );
                        });
                        
                        if(selGetItemCnt < canGetItemCnt)
                            getGoods.find("a").text("선택").removeClass("wGray").addClass("wOrange");
                        else if(selGetItemCnt > canGetItemCnt)
                            getGoods.find("a").text("선택").removeClass("wGray").addClass("wOrange");
                        else
                            getGoods.find("a").text("다시선택").removeClass("wOrange").addClass("wGray");
                        
                        return false;
                    }
                    goodsMsg += "</p>";
                } else {
                    goodsMsg += "<p class='tit'><strong>" + promCond + " 행사</strong>상품입니다. <font name='period' style='font-weight:100; color:#333; font-size:14px'>" + period + "</font></p>" ;
                    goodsMsg += "<p class='txt'><strong>";
                    goodsMsg += buyCondStrtQtyAmt - (cartCnt % buyCondStrtQtyAmt) + "개</strong> 더 구매하시면 <strong>" + buyCondStrtQtyAmt + "+1 혜택</strong>을 받으실 수 있어요.";
                    goodsMsg += '<a href=javascript:common.openEvtInfoPop("' + promNo  + '","' + promKndCd + '","' + promCond + '","' + getGoods.attr("goodsNo") + '","' + getGoods.attr("itemNo") + '"); class="btnSmall wGray" data-rel="layer" data-target="layer_pop_wrap" id="evtPopup">자세히 보기</a>';
                    goodsMsg += "</p>";
                }
            } else if(promKndCd == "P203") {        // 교차
                if(init == 'Y') { //초기화 처리
                    // 일반배송, 오늘드림 라디오 이동시마다 선택상품 초기화처리를 위해서 사용 jwkim
                    $("div.prd_gift_box.item_" + optionKey).addClass("giftInit");
                    
                    goodsMsg += "<p class='tit'><strong>" + promCond + " 행사</strong>상품입니다. <font name='period' style='font-weight:100; color:#333; font-size:14px'>" + period + "</font></p>" ;
                    goodsMsg += "<p class='txt'>GIFT 상품을 선택해주세요.";
                    goodsMsg += '<a href=javascript:common.popLayer.promGift.openPromGiftPop("' + getGoods.attr("goodsNo") + '","' + getGoods.attr("itemNo") + '","' + promNo + '"); class="btnSmall wOrange" data-rel="layer" data-target="layer_pop_wrap" id="evtPopup">선택</a>';
                    goodsMsg += "</p>";
                } else if(getItemAutoAddYn == "Y"){    // 자동증가 Y
                    // 일반배송, 오늘드림 라디오 이동시마다 선택상품 초기화처리를 위해서 사용 jwkim
                    $("div.prd_gift_box.item_" + optionKey).removeClass("giftInit");
                    
                    goodsMsg += "<p class='tit'><strong>" + promCond + " 행사적용</strong>되어 구매됩니다. <font name='period' style='font-weight:100; color:#333; font-size:14px'>" + period + "</font></p>" ;
                    goodsMsg += "<p class='txt'>";
                    goodsMsg += giftItemNm + " " + cartCnt + "개가 함께 배송됩니다.";
                    goodsMsg += '<a href=javascript:common.openEvtInfoPop("' + promNo  + '","' + promKndCd + '","' + promCond + '","' + getGoods.attr("goodsNo") + '","' + getGoods.attr("itemNo") + '"); class="btnSmall wGray" data-rel="layer" data-target="layer_pop_wrap" id="evtPopup">자세히 보기</a>';
                    goodsMsg += "</p>";
                } else {
                    // 일반배송, 오늘드림 라디오 이동시마다 선택상품 초기화처리를 위해서 사용 jwkim
                    $("div.prd_gift_box.item_" + optionKey).removeClass("giftInit");
                    
                    if(getGoods.find("span.opt").length == 0){
                        goodsMsg += "<p class='tit'><strong>" + promCond + " 행사</strong>상품입니다. <font name='period' style='font-weight:100; color:#333; font-size:14px'>" + period + "</font></p>" ;
                        goodsMsg += "<p class='txt'>GIFT 상품을 선택해주세요.";
                        goodsMsg += '<a href=javascript:common.popLayer.promGift.openPromGiftPop("' + getGoods.attr("goodsNo") + '","' + getGoods.attr("itemNo") + '","' + promNo + '"); class="btnSmall wOrange" data-rel="layer" data-target="layer_pop_wrap" id="evtPopup">선택</a>';
                        goodsMsg += "</p>";
                    } else {
                        // 기 선택된 수량과 선택가능 수량을 비교하여 버튼 변경
                        var selGetItemCnt = 0;
                        var canGetItemCnt = parseInt(cartCnt / buyCondStrtQtyAmt);
                        
                        getGoods.find("span.opt").each(function(){
                            selGetItemCnt += parseInt( $(this).attr("ordQty") );
                        });
                        
                        if(selGetItemCnt < canGetItemCnt)
                            getGoods.find("a").text("선택").removeClass("wGray").addClass("wOrange");
                        else if(selGetItemCnt > canGetItemCnt)
                            getGoods.find("a").text("선택").removeClass("wGray").addClass("wOrange");
                        else
                            getGoods.find("a").text("다시선택").removeClass("wOrange").addClass("wGray");
                        
                        return false;
                    }
                }
            }
            
            getGoods.html(goodsMsg);
        },
        
        /** 카트 Validation 체크 **/
        cartCheck : function(cartCnt, optionKey, cartYn, colorchipYn, qty){ // 컬러칩 장바구니 등록 전 유효성 체크 추가 CBLIM 20200403
            cartCnt = parseInt(cartCnt);
            
            // 프로모션 정보
            var getGoods = $("div.prd_gift_box");
            var buyCondStrtQtyAmt = parseInt( getGoods.attr("buyCondStrtQtyAmt") );
            var getOrdQty = isNaN(buyCondStrtQtyAmt) ? 0 : parseInt(cartCnt / buyCondStrtQtyAmt);
            var promKndCd = getGoods.attr("promKndCd");
            var getItemStockQty = parseInt( getGoods.attr("getItemStockQty") );
            
            var invQty = 0; 
            // 오늘드림 고도화 2019-12-20 변경 $(":input:checkbox[name=qDelive]").prop("checked")
            if($(":input:radio[name=qDelive]:checked").val() == 'Y' || $(":input:checkbox[name=qDelive]").prop("checked") == true){ //당일배송 상품인 경우 재고변경
                invQty = $("#quickAvalInvQty").val();
                if(!isNaN(getItemStockQty)){
                    getItemStockQty = 999; // 당일배송일경우 get상품 qty 재고 999
                }
            } else {
                invQty = $("#avalInvQty").val();
            }
            
            var qtyAddUnit = parseInt( $("#qtyAddUnit").val() );
            var ordPsbMinQty = parseInt( $("#ordPsbMinQty").val() );
            
            var ordPsbMaxQty = 0;
            // 오늘드림 고도화 2019-12-20 변경 $(":input:checkbox[name=qDelive]").prop("checked")
            if($(":input:radio[name=qDelive]:checked").val() == 'Y' || $(":input:checkbox[name=qDelive]").prop("checked") == true){ //당일배송 상품인 경우 최대구매수량 변경
                ordPsbMaxQty = parseInt( $("#quickOrdMaxQty").val() );
            } else {
                ordPsbMaxQty = parseInt( $("#ordPsbMaxQty").val() );
            }
            
            var dupItemYn = $("#dupItemYn").val();
            
            //  옵션이 있는 상품과 없는 상품의 재고 및 수량조건 세팅
            // 오늘드림이면서 옵션상품인 경우에는 웹재고로 재고를 계산하지 않게 하기위해서 조건문 추가..옵션상품이면서 일반배송인 경우에만 아래 조건을 탄다 jwkim
            // 오늘드림 옵션상품 개편시 $(":input:radio[name=qDelive]:checked").val() != 'Y' 해당 조건 if문에 추가해야함 as-is는 해당조건 삭제
            // 오늘드림 고도화 2019-12-20 변경 $(":input:checkbox[name=qDelive]").prop("checked")
            if ( dupItemYn == 'Y' && ($(":input:radio[name=qDelive]:checked").val() != 'Y' || $(":input:checkbox[name=qDelive]").prop("checked") != true)){
                //  옵션이 있는 상품(패키지상품, 일반옵션상품)일 경우에 값 추출하기 위한 ID 세팅
                var itemInvClass;
                var minQtyClass = "#itemMinQty_" + optionKey;
                var maxQtyClass = "#itemMaxQty_" + optionKey;
                var itemQtyClass= "#itemQty_" + optionKey;
                
                qtyAddUnit = parseInt( $(itemQtyClass).val() );
                ordPsbMinQty = parseInt( $(minQtyClass).val() );
                // 오늘드림 고도화 2019-12-20 변경 $(":input:checkbox[name=qDelive]").prop("checked")
                if($(":input:radio[name=qDelive]:checked").val() == 'Y' || $(":input:checkbox[name=qDelive]").prop("checked") == true){ //당일배송 상품인 경우 최대구매수량 변경
                    ordPsbMaxQty = parseInt( $("#quickOrdMaxQty").val() );
                    ordPsbMaxQty = parseInt( $(maxQtyClass).val() );
                    itemInvClass = "#quickItemInv_" + optionKey;
                } else {
                    ordPsbMaxQty = parseInt( $(maxQtyClass).val() );
                    itemInvClass = "#itemInv_" + optionKey;
                }
                
                invQty = parseInt( $(itemInvClass).val() );
                var titlArea = $(itemInvClass).parent().find('.tit_area span:eq(0)').clone(false);
                titlArea.find(".icon_flag").remove();
                var itemNm = titlArea.html();  
            }
            
            if ( cartCnt < ordPsbMinQty ) {
                alert( ordPsbMinQty + "개 이상부터 구매할 수 있는 상품입니다.");
                return "N";
            }
            
			//컬러칩에서 장바구니 클릭시 재고갯수 값 새로 세팅 CBLIM 20200403
//            if(colorChipIndex != undefined && colorChipIndex != ""){     	
//            	invQty = parseInt($("input[name='colrAcalInvQtyView_"+colorChipIndex+"']:hidden").val());
//            	getItemStockQty = parseInt( getGoods.attr("getItemStockQty") );
//            	ordPsbMinQty = parseInt($("input[name='colrOrdPsbMinQtyView_"+colorChipIndex+"']:hidden").val());
//            	ordPsbMaxQty = parseInt($("input[name='colrOrdPsbMaxQtyView_"+colorChipIndex+"']:hidden").val());
//            	qtyAddUnit = parseInt($("input[name='colrQtyAddUnitView_"+colorChipIndex+"']:hidden").val());
//            }         
            //컬러칩에서 장바구니 클릭시 재고갯수 값 새로 세팅 CBLIM 20200403
            
            // 주문 단위수량 및 1+1동일 증정 상품 고려한 주문 가능 수량
            var ordPsbQty = 0;
            if(promKndCd == "P201"){
                ordPsbQty = parseInt( invQty - (invQty / (buyCondStrtQtyAmt + 1)) );
                
                if(buyCondStrtQtyAmt > 1){
                    var modQty = parseInt( invQty % (buyCondStrtQtyAmt + 1) );
                    
                    if(modQty < buyCondStrtQtyAmt)
                        ordPsbQty += modQty;
                }
            } else if(promKndCd == "P203"){
                if(!isNaN(getItemStockQty) && getItemStockQty > 0){
                    if(invQty >getItemStockQty)
                        ordPsbQty = getItemStockQty;
                    else
                        ordPsbQty = invQty;
                } else {
                    ordPsbQty = invQty;
                }
            } else {
                ordPsbQty = parseInt( invQty - (invQty % qtyAddUnit) );
            }
            // 오늘드림 고도화 2019-12-20 변경 $(":input:checkbox[name=qDelive]").prop("checked")
            if ( ($(":input:radio[name=qDelive]:checked").val() == 'Y' || $(":input:checkbox[name=qDelive]").prop("checked") == true) && cartCnt > 999 ){
                //  최대주문가능수량 제한 Alert 노출
                if($(":input:radio[name=qDelive]:checked").val() == 'Y' || $(":input:checkbox[name=qDelive]").prop("checked") == true){   
                    alert("999개 이상은 선택하실 수 없습니다.");
                }
                return "N";
            }
            
            // [3604959] 오늘드림 체크 시 최대구매가능수량 초과 선택 오류 수정 요청 件
            // 오늘드림만 체크한 경우 재고부족/매장이 운영불가인 경우 구분하여 알림 처리 되도록 수정
            if($("#quickYn").val() == "Y" && $("#deliveDay").is(":checked") && goods.detail.validation == "N" && !$("input[name='pickupDirectYn']").is(":checked")) {
        		
            	var isSoldOut = $(".btn_todayDV").hasClass("soldout"); 
            	if(isSoldOut){
            		 $("#outItem").css('z-index', '999');
                     fnLayerSet("outItem", "open");
        		} else {
        			alert("선택하신 배송지로는 주문이 어렵습니다.\n배송지를 변경해 주세요.");
        		}
            	
                return "N";
            }
            
            //  구매입력이 최대주문가능수량을 넘어 섰을 때
            if ( cartCnt > ordPsbMaxQty ){
                //  상품재고가 최대주문수량보다 클 경우
                if ( invQty > ordPsbMaxQty ){
                    //  최대주문가능수량 제한 Alert 노출
                 // 오늘드림 고도화 2019-12-20 변경 $(":input:checkbox[name=qDelive]").prop("checked")
                    if($(":input:radio[name=qDelive]:checked").val() == 'Y' || $(":input:checkbox[name=qDelive]").prop("checked") == true){   
                        alert("오늘드림 서비스의 1회 최대 구매 수량은 총 "+ordPsbMaxQty+"개 입니다.");
                    } else {
                        alert("총 " + ordPsbMaxQty + "개까지만 구매할 수 있습니다.");
                    }
                    return "N";
                } else {
                    //  장바구니 클릭 시 regCart 자체 얼럿으로 얼럿 노출 안함.
                    if ( cartYn == 'Y'){
                        return "Y";
                     // 오늘드림 고도화 2019-12-20 변경 $(":input:checkbox[name=qDelive]").prop("checked")
                    } else if($(":input:radio[name=qDelive]:checked").val() == 'Y' || $(":input:checkbox[name=qDelive]").prop("checked") == true){
                    	
                        // 상점 매칭이 안된 경우
                    	// 매칭이 안된 경우는 재고 체크를 하지 않는다.
                        if($("input[name='pickupDirectYn']").is(":checked") && !isDeliveryStrMatch()){
                        	alert("오늘드림 서비스의 1회 최대 구매 수량은 총 "+ordPsbMaxQty+"개 입니다.");
                        	return "N";
                        } else {
                    		
                    		if(ordPsbQty == 0){
                        		if ( dupItemYn == 'Y' ){
                                    alert('['+itemNm+'] 옵션 재고가 부족합니다. 재선택 바랍니다.');
                                    return "N"; 
                                } else {
                                    $("#outItem").css('z-index', '999');
                                    fnLayerSet("outItem", "open");
                                    return "N"; 
                                }
                            } else {
                                if ( dupItemYn == 'Y' ){
                                    //  재고부족 제한 Alert 노출
                                    alert("["+itemNm+"] 옵션 재고가 " + ordPsbQty + " 개 남았습니다. 구매를 서둘러 주세요!");
                                    return "N"; 
                                } else {
                                    if(goods.detail.todayDelivery.buyClickYn == 'Y'){
                                        goods.detail.todayDelivery.openOrderQty(ordPsbQty);
                                    } else {
                                        alert("재고가 " + ordPsbQty + " 개 남았습니다. 구매를 서둘러 주세요!");
                                    }
                                    return "N";
                                }
                            }
                    	}
                        
                    } else {
                        //  재고부족 제한 Alert 노출
                        alert("재고가 " + ordPsbQty + " 개 남았습니다. 구매를 서둘러 주세요!");
                        return "N"; 
                    }   
                    
                }
            } else {
            	//  상품 재고가 구매수량보다 작을 경우
                if ( ordPsbQty < cartCnt ){
                    
                    //  장바구니 클릭 시 regCart 자체 얼럿으로 얼럿 노출 안함.
                    if ( cartYn == 'Y'){
                        return "Y";
                        
                     // 오늘드림 고도화 2019-12-20 변경 $(":input:checkbox[name=qDelive]").prop("checked")
                    } else if($(":input:radio[name=qDelive]:checked").val() == 'Y' || $(":input:checkbox[name=qDelive]").prop("checked") == true){
                        	
                    	// 픽업서비스가 아니거나, 픽업서비스이고 상점 매칭이 된 경우
                    	// 매칭이 안된 경우는 재고 체크를 하지 않는다.
                        if(!$("input[name='pickupDirectYn']").is(":checked") || ( $("input[name='pickupDirectYn']").is(":checked") && isDeliveryStrMatch() )){
                        	if(ordPsbQty == 0){
                                if ( dupItemYn == 'Y' ){
                                    alert('['+itemNm+'] 옵션 재고가 부족합니다. 재선택 바랍니다.');
                                    return "N"; 
                                } else {
                                    $("#outItem").css('z-index', '999');
                                    fnLayerSet("outItem", "open");
                                    return "N"; 
                                }
                            } else {
                                if ( dupItemYn == 'Y' ){
                                    //  재고부족 제한 Alert 노출
                                    alert("["+itemNm+"] 옵션 재고가 " + ordPsbQty + " 개 남았습니다. 구매를 서둘러 주세요!");
                                    return "N"; 
                                } else {
                                    if(goods.detail.todayDelivery.buyClickYn == 'Y'){
                                        goods.detail.todayDelivery.openOrderQty(ordPsbQty);
                                    } else {
                                        alert("재고가 " + ordPsbQty + " 개 남았습니다. 구매를 서둘러 주세요!");
                                    }
                                    return "N";
                                }
                            }
                        }
                        
                    } else {
                        //  재고부족 제한 Alert 노출
                        alert("재고가 " + ordPsbQty + " 개 남았습니다. 구매를 서둘러 주세요!");
                        return "N"; 
                    }   
                }
            } 
            
            //  정상시 Return 
            return "Y";
        },
        
        /** 옵션 수량 텍스트에서 바꿀 시 **/
        cartCntBind : function(optionKey, qtyAddUnit, invQty, salePrc){
            
            var promKnCd = $(".prd_gift_box.item_"+optionKey).attr("promkndcd"); 
            var getItemAutoAddYn = $(".prd_gift_box.item_"+optionKey).attr("getitemautoaddyn"); 
            
            // 증정 상품의 경우 레이어에서 상품 선택시 오토를 N으로 하기 때문에 수량변경시 Y로 바꿔줘야 
            // 기존로직그대로 탄다
            if(promKnCd == "P203" && getItemAutoAddYn == "N"){
                var oriItemAutoAddYn = $(".prd_gift_box.item_"+optionKey).attr("getoriitemautoaddyn");
                
                $(".prd_gift_box.item_"+optionKey).attr("getitemautoaddyn", oriItemAutoAddYn);
            }
            
            //  텍스트 바뀌는 onChange 이벤트 ( 전체 품절이 아닐 경우에 BIND) 
            if ( $("#soldOutYn").val() != 'Y' ){
                $("#cartCnt_"+optionKey).bind("focusout", function(){
                    //  이전 값
                    var prev = $(this).data('old');
                    
                    $(this).val($(this).val().replace(/[^0-9]/gi,""));

                    //  구매수량을 제대로 입력하지 않을 경우
                    if ( Number($(this).val()) > 0 && $(this).val() != '' ){
                        
                        //  구매수량 단위가 적절하지 않을때
                        if ( $("#dupItemYn").val() == 'Y' || $("#pkgGoodsYn").val() == 'Y'){
                            var minQtyClass = "#itemMinQty_" + optionKey;
                            var minQty = $(minQtyClass).val();
                        }else{
                            var minQty  = $("#ordPsbMinQty").val();
                        }
                        
                        //  구매단위가 1개 이상일 경우에만 체크, 1개일 경우에는 의미가 없음.
                        if ( Number(qtyAddUnit) > 1){
                            if ( Number(minQty) == Number(qtyAddUnit)){
                                var modInv = Number($(this).val()) % Number(qtyAddUnit);
                            }else{
                                var modInv = (Number($(this).val()) % Number(qtyAddUnit)) - Number(minQty);
                            }
                        }else{
                            var modInv = 0;
                        }
                        
                        if ( Number(modInv) != 0){
                            var psbInv = parseInt(invQty/qtyAddUnit) * Number(qtyAddUnit);
                            alert(qtyAddUnit + "개 단위로 구매 가능한 상품입니다. 수량을 다시 선택해주세요.");
                            $(this).val(prev);
                        }else{
                            //  구매수량이 적절하다고 판단되면 재고수량 체크등으로 이동
                            if ( goods.detail.cart.cartCheck($(this).val(), optionKey) == 'Y' ){
                                //  재고수량까지 완벽하다면 바뀐 구매수량으로 전체가격 수정
                                //  이전 값의 가격  
                                var deletePrc = Number(prev) * Number(salePrc);
                                //  이전 값의 개수
                                var deleteCnt = Number(prev);
                                //  전체 가격
                                var totalPrc = Number($("#totalPrc").val());
                                //  전체 개수
                                var totalCnt = Number($("#totalCnt").val());
                                
                                //  전체 개수 = 전체 개수 - 이전값의 개수 + 바뀐 개수
                                var totalCnt = totalCnt - deleteCnt + Number($(this).val());
                                //  전체 가격 = 전체 가격 - 이전값의 가격 + ( 바뀐 개수 * 가격 )
                                var totalPrc = totalPrc - deletePrc + (Number($(this).val()) * Number(salePrc));
                                
                                //  전체 개수, 금액 세팅
                                $("#totalCnt").val(totalCnt);
                                $("#totalPrc").val(totalPrc);
                                $("#totalPrcTxt").text($.number(totalPrc));
                                
                                goods.detail.todayDelivery.deliveryCharge();  // 배송비 계산
                            }else{
                                $(this).val(prev);
                            }
                        }
                    }else{
                        alert(qtyAddUnit + "개 단위로 구매 가능한 상품입니다. 수량을 다시 선택해주세요.");
                        $(this).val(prev);
                    }
                    
                    // [START 오늘드림 옵션상품 개선:jwkim]
                    if($("div.prd_gift_box.item_" + optionKey).hasClass("giftInit")){
                        // 일반배송, 오늘드림 선택이 변경되어 gift상품이 초기화된 경우 수량을 변경해도 아무런 액션을 하지 않게 하기 위함
                        
                    } else {
                        // N+1 프로모션 안내 멘트 추가
                        goods.detail.cart.changeMsg(optionKey);
                    }
                    // goods.detail.cart.changeMsg(optionKey); / as-is 로직
                    // [END 오늘드림 옵션상품 개선:jwkim]
                });
                
                //  이전값을 저장해주는 focusin 이벤트
                $("#cartCnt_"+optionKey).on('focusin', function(){
                    $(this).data('old', $(this).val());
                });
            }

        },
		/** 장바구니 등록 전 유효성 체크 컬러칩 CBLIM 20200401 **/
        checkRegCartColorchip : function(directYn, saveTp, itemNo, qty){
        	
            var loginCheck = common.loginChk();
            
            if ( loginCheck ) {
            	
            	common.wlog("goods_cmpr_wish");//wlogMjh
      
                // 수량 입력, 옵션 창이 열려 있다면
                var goodsOptInfo = "single";
                var colorchipYn = itemNo;
                //1222
//                if(goods.detail.cart.checkCartCnt()){
                // get상품 선택 여부 체크
                if(goods.detail.cart.checkGetItemSelect()){
					//goods.detail.cart.regCart(goodsOptInfo,"N");
                    // 오늘드림 고도화 2019-11-14 변경
                    if(goods.detail.validation == 'N') {
                        alert("선택하신 배송지로는 주문이 어렵습니다.\n배송지를 변경하거나 다른 상품을 구매해주세요.");
                        return false;
                    }else {
                        goods.detail.cart.colorChipRegCart(goodsOptInfo, directYn, saveTp, colorchipYn, qty);
                    }
                } else {
                    alert("추가상품을 선택해주세요.");
                }
//                }

            }
        },
        
        /** 장바구니 등록 **/
        regCart : function(goodsOption, directYn, saveTp){
            
            var resultData = new Array();
            
         // 오늘드림 고도화 2019-12-20 변경 $(":input:checkbox[name=qDelive]").prop("checked")
//            var quickYn = $(":input:radio[name=qDelive]:checked").val();
            var quickYn = "N";
            if($(":input:radio[name=qDelive]:checked").length > 0){
                quickYn = $(":input:radio[name=qDelive]:checked").val();
            }else{
                quickYn = $(":input:checkbox[name=qDelive]").prop("checked") == true ? "Y" : "N";
            }
            
            // 픽업바로가기
            var pickupDirectYn = $(":input:checkbox[name=pickupDirectYn]").prop("checked") == true ? "Y" : "N";
            
            //  옵션이 없는 상품을 구매했을 때 
            if ( goodsOption == 'single'){
                var goodsNo = $("#goodsNo").val();
                var itemNo = $("#itemNo").val();
                var optionKey = goodsNo + itemNo;
                var ordQty = parseInt( $("#cartCnt_"+optionKey).val() );
                var rsvGoodsYn = $("#rsvSaleYn").val();
                var dispCatNo = $("#dispCatNo").val();
                var drtPurYn = directYn;
                var prsntYn = "N"; // 고정값
                
                //  재고 여부 체크 ( 실제 장바구니버튼 클릭 시 재고 체크 안함  )
                if ( saveTp == "NEW"){
                    var cartCheck = goods.detail.cart.cartCheck(ordQty, optionKey);    
                }else{
                    var cartCheck = goods.detail.cart.cartCheck(ordQty, optionKey,'Y');
                }
                
                var getGoods = $("div.prd_gift_box");
                var buyCondStrtQtyAmt = parseInt( getGoods.attr("buyCondStrtQtyAmt") );
                var promKndCd = getGoods.attr("promKndCd");
                
                if ( cartCheck == 'Y' ){
                    var data = {
                            goodsNo : goodsNo,
                            itemNo : itemNo,
                            ordQty : ordQty,
                            rsvGoodsYn : rsvGoodsYn,
                            dispCatNo : dispCatNo,
                            drtPurYn : drtPurYn,
                            prsntYn : prsntYn,
                            promKndCd : promKndCd,
                            buyCondStrtQtyAmt : buyCondStrtQtyAmt,
                            quickYn : quickYn
                    };
                }else{
                    return;
                }
                
                resultData.push(data);
                
                // N+1 동일(P201), A+B(P203) 일 경우 장바구니에 자동 추가  
                var buyGoodsNo = goodsNo;
                var buyItemNo = itemNo;
                var buyOrdQty = ordQty;
                
                var getGoods = $("div.prd_gift_box");
                var buyCondStrtQtyAmt = parseInt( getGoods.attr("buyCondStrtQtyAmt") );
                var promNo = getGoods.attr("promNo");
                var promKndCd = getGoods.attr("promKndCd");
                var getItemAutoAddYn = getGoods.attr("getItemAutoAddYn");
                
                var getGoodsNo = (promKndCd == "P201") ? getGoods.attr("goodsNo") : getGoods.attr("getItemGoodsNo");
                var getItemNo = (promKndCd == "P201") ? getGoods.attr("itemNo") : getGoods.attr("getItemItemNo");
                var getOrdQty = parseInt( buyOrdQty / buyCondStrtQtyAmt );
                if(promKndCd == "P203")
                    getOrdQty = ordQty;
                
                var samePrdSumOrdQty = 0;
                if(buyGoodsNo == getGoodsNo && buyItemNo == getItemNo)
                    samePrdSumOrdQty = buyOrdQty;
                
                var getItemAutoAddYn = getGoods.attr("getItemAutoAddYn");
                
                if(getOrdQty > 0){
                    if(promNo != undefined && promNo != ""){
                        if(promKndCd == "P201" || 
                          (promKndCd == "P203" && getItemAutoAddYn == "Y" && 
                          getGoodsNo != undefined && getGoodsNo != '' && 
                          getItemNo != undefined && getItemNo != '')){
                            var getGoodsData = {
                                    goodsNo : getGoodsNo,
                                    itemNo : getItemNo,
                                    ordQty : getOrdQty,
                                    rsvGoodsYn : "N", // 예약상품여부
                                    dispCatNo : "",  // 전시카테고리 번호
                                    drtPurYn : directYn,            //바로구매여부
                                    promKndCd : promKndCd,     //프로모션구분
                                    crssPrstNo : promNo,        //프로모션번호
                                    prstGoodsNo : buyGoodsNo,  //타겟buy군의 상품번호
                                    prstItemNo : buyItemNo,    //타겟buy군의 아이템번호
                                    buyCondStrtQtyAmt : buyCondStrtQtyAmt,
                                    samePrdSumOrdQty : samePrdSumOrdQty,     //상품번호 아이템번호가 같은상품의 수량을 합한값
                                    getItemAutoAddYn : getItemAutoAddYn,     // get상품 자동증가 여부
                                    quickYn : quickYn
                            };
                                                           
                            resultData.push(getGoodsData);
                        }
                    }
                }
            }else{
                // 패키지 상품 정보
                var pkgGoodsYn = $("#pkgGoodsYn").val();       // 패키지 상품 여부
                var pkgGoodsNo = (pkgGoodsYn == "Y") ? $("#goodsNo").val() : "";        // 패키지 상품 번호
                
                //  선택된 단품 개수
                var itemLen = $(".prd_cnt_box").length;
                
                //  선택된 단품 개수마다 세팅
                for(var i=0; i<itemLen; i++){
                    var goodsNo = $(".prd_cnt_box").eq(i).find('input[name=sGoodsNo]').val();
                    var itemNo = $(".prd_cnt_box").eq(i).find('input[name=itemNo]').val();
                    var optionKey = goodsNo + itemNo;
                    var ordQty = parseInt( $(".prd_cnt_box").eq(i).find('.tx_num').val() );
                    var rsvGoodsYn = $("#rsvSaleYn").val();
                    var dispCatNo = $("#dispCatNo").val();
                    var drtPurYn = directYn;
                    
                    //  재고 여부 체크 ( 실제 장바구니버튼 클릭 시 재고 체크 안함  )
                    if ( saveTp == "NEW"){
                        var cartCheck = goods.detail.cart.cartCheck(ordQty, optionKey);    
                    }else{
                        var cartCheck = goods.detail.cart.cartCheck(ordQty, optionKey,'Y');
                    }
                    
                    var getGoods = $("div.prd_gift_box.item_" + goodsNo + itemNo);
                    var buyCondStrtQtyAmt = parseInt( getGoods.attr("buyCondStrtQtyAmt") );
                    var promKndCd = getGoods.attr("promKndCd");
                    
                    if ( cartCheck == 'Y' ){
                        var itemData = {
                                goodsNo : goodsNo,
                                itemNo : itemNo,
                                ordQty : ordQty,
                                rsvGoodsYn : rsvGoodsYn,
                                dispCatNo : dispCatNo,
                                drtPurYn : drtPurYn,
                                prsntYn : prsntYn,
                                pkgGoodsNo : pkgGoodsNo,
                                promKndCd : promKndCd,
                                buyCondStrtQtyAmt : buyCondStrtQtyAmt,
                                quickYn : quickYn
                        };
                        
                        resultData.push(itemData);
                    }else{
                        // jwkim 일반배송으로 주문시 문제 발상하게 되면 초기화 시켜야함
                        var selectDlvYn = $("input[name=selectDlvYn]", $("#outItem")).val();
                        
                        // jwkim 일반배송으로 주문시 문제 발상하게 되면 초기화 시켜야함
                        if(selectDlvYn == "Y"){
                            $("input[name=selectDlvYn]", $("#outItem")).val("N");
                        }
                        
                        return false;
                    }
                    
                    // N+1 동일(P201), A+B(P203) 일 경우 장바구니에 자동 추가 <시작>
                    var getGoods = $("div.prd_gift_box.item_" + goodsNo + itemNo);
                    var buyCondStrtQtyAmt = parseInt( getGoods.attr("buyCondStrtQtyAmt") );
                    
                    var promNo = getGoods.attr("promNo");
                    var promKndCd = getGoods.attr("promKndCd");
                    var getItemAutoAddYn = getGoods.attr("getItemAutoAddYn");
                    
                    var getGoodsNo = (promKndCd == "P201") ? getGoods.attr("goodsNo") : getGoods.attr("getItemGoodsNo");
                    var getItemNo = (promKndCd == "P201") ? getGoods.attr("itemNo") : getGoods.attr("getItemItemNo");
                    var samePrdSumOrdQty = 0;
                    if(goodsNo == getGoodsNo && itemNo == getItemNo)
                        samePrdSumOrdQty = ordQty;
                    
                    // 같은 프로모션의 buy군 상품 총 갯수
                    ordQty = 0;
                    $("div.prd_cnt_box[promNo=" + promNo + "]").each(function(){
                        ordQty += parseInt( $(this).find("span.option_cnt_box input").val() );
                    });
                    
                    var getOrdQty = parseInt( ordQty / buyCondStrtQtyAmt );
                    if(promKndCd == "P203")
                        getOrdQty = ordQty;
                    
                    if(getOrdQty == 0)
                        continue;
                    
                    var getItemAutoAddYn = getGoods.attr("getItemAutoAddYn");
                    
                    if(promNo != undefined && promNo != ""){
                        if(promKndCd == "P201" || 
                          (promKndCd == "P203" && getItemAutoAddYn == "Y" && 
                          getGoodsNo != undefined && getGoodsNo != '' && 
                          getItemNo != undefined && getItemNo != '')){
                            var getGoodsData = {
                                    goodsNo : getGoodsNo,
                                    itemNo : getItemNo,
                                    ordQty : getOrdQty,
                                    rsvGoodsYn : "N", // 예약상품여부
                                    dispCatNo : "",  // 전시카테고리 번호
                                    drtPurYn : drtPurYn,            //바로구매여부
                                    promKndCd : promKndCd,     //프로모션구분
                                    crssPrstNo : promNo,        //프로모션번호
                                    prstGoodsNo : goodsNo,  //타겟buy군의 상품번호
                                    prstItemNo : itemNo,    //타겟buy군의 아이템번호
                                    buyCondStrtQtyAmt : buyCondStrtQtyAmt,
                                    samePrdSumOrdQty : samePrdSumOrdQty,     //상품번호 아이템번호가 같은상품의 수량을 합한값
                                    getItemAutoAddYn : getItemAutoAddYn,     // get상품 자동증가 여부
                                    quickYn : quickYn
                            };
                                                           
                            resultData.push(getGoodsData);
                        }
                    }
                    // N+1 동일(P201), A+B(P203) 일 경우 장바구니에 자동 추가 <끝>
                }
            }
            
            // 선택된 get상품 추가 <시작>
            $("div.prd_gift_box").each(function(){
                var promNo = $(this).attr("promNo");
                var buyCondStrtQtyAmt = parseInt( $(this).attr("buyCondStrtQtyAmt") );
                var promKndCd = $(this).attr("promKndCd");
                
                $(this).find("span.opt").each(function(){
                    var getGoods = $(this);
                    var getGoodsNo = getGoods.attr("goodsNo");
                    var getItemNo = getGoods.attr("itemNo");
                    var getOrdQty = parseInt( getGoods.attr("ordQty") );
                    var samePrdSumOrdQty = 0;
                    
                    // 옵션이 없을 경우
                    if ( goodsOption == 'single'){
                        var buyGoodsNo = $("#goodsNo").val();
                        var buyItemNo = $("#itemNo").val();
                        var optionKey = goodsNo + itemNo;
                        var ordQty = parseInt( $("#cartCnt_"+optionKey).val() );
                        
                        if(getGoodsNo == buyGoodsNo && getItemNo == buyItemNo)
                            samePrdSumOrdQty += ordQty;
                    } else {
                        // 옵션이 있을 경우
                        $("div.prd_cnt_box").each(function(){
                            var buyGoodsNo = $(this).find("input[name=sGoodsNo]").val();
                            var buyItemNo = $(this).find("input[name=itemNo]").val();
                            var ordQty = parseInt( $(this).find("input.tx_num").val() );
                            
                            if(getGoodsNo == buyGoodsNo && getItemNo == buyItemNo)
                                samePrdSumOrdQty += ordQty;
                        });
                    }
                    
                    var getGoodsData = {
                            goodsNo : getGoodsNo,
                            itemNo : getItemNo,
                            ordQty : getOrdQty,
                            rsvGoodsYn : "N", // 예약상품여부
                            dispCatNo : "",  // 전시카테고리 번호
                            drtPurYn : drtPurYn,            //바로구매여부
                            promKndCd : promKndCd,     //프로모션구분
                            crssPrstNo : promNo,        //프로모션번호
                            prstGoodsNo : goodsNo,  //타겟buy군의 상품번호
                            prstItemNo : itemNo,    //타겟buy군의 아이템번호
                            buyCondStrtQtyAmt : buyCondStrtQtyAmt,
                            samePrdSumOrdQty : samePrdSumOrdQty,     //상품번호 아이템번호가 같은상품의 수량을 합한값
                            quickYn : quickYn
                    };
                    
                    resultData.push(getGoodsData);
                });
            });
            // 선택된 get상품 추가 <끝>
            
            // jwkim 일반으로배송 로직
            var mbrDlvpSeq ="";
            mbrDlvpSeq = $("input[name=mbrDlvpSeq]", $("#outItem")).val();
            
            
            if($("#quickYn").val() == "Y") {
            	var orderStrNo = $("#orderStrNo").val();
            	resultData.strNo = orderStrNo;
            }
            
            resultData.prodView = "Y";
            resultData.goodsCartYn = "Y";
            common.cart.recoSelGoodsNo = $("#goodsNo").val();
            //  장바구니 등록
            var regCartCheck = common.cart.regCart(resultData, directYn, saveTp, "", "", "N", mbrDlvpSeq, pickupDirectYn);
            
            // 오늘드림 구매하기시에 장바구니 에러 발생시 매장재고가 아닌 999개로 초기화시킴
            if(regCartCheck.result == false && quickYn == "Y"){
                $("#goodsForm #quickAvalInvQty").val("999");
            } else if(regCartCheck.result == false && quickYn == "N"){
                $("input[name=selectDlvYn]", $("#outItem")).val("N");
            }
            
            //common.cart.regCart(resultData, directYn, saveTp); // as-is 소스
        },
        
        
        /** 컬러칩 장바구니 등록 **/
        colorChipRegCart : function(goodsOption, directYn, saveTp, colorchipYn, qty){/** 컬러칩 colorchipYn 추가 MJH* */
            
            var resultData = new Array();
            
         // 오늘드림 고도화 2019-12-20 변경 $(":input:checkbox[name=qDelive]").prop("checked")
//            var quickYn = $(":input:radio[name=qDelive]:checked").val();
            var quickYn = "N";
            if($(":input:radio[name=qDelive]:checked").length > 0){
                quickYn = $(":input:radio[name=qDelive]:checked").val();
            }else{
                quickYn = $(":input:checkbox[name=qDelive]").prop("checked") == true ? "Y" : "N";
            }
            
													
			
			
            //  옵션이 없는 상품을 구매했을 때 
            if ( goodsOption == 'single'){
                var goodsNo = $("#goodsNo").val();
				/** 컬러칩 colorChipIndex 추가 CBLIM 2200401 **/
                if(colorchipYn == undefined || colorchipYn == ""){
                	//console.log("컬러칩 아님");
                	var itemNo = $("#itemNo").val();
                }else{
                	//console.log("컬러칩");
                	var itemNo = colorchipYn;
                }
                /** 컬러칩 colorChipIndex 추가 CBLIM 2200401 **/
                var optionKey = goodsNo + itemNo;
                /** 컬러칩 colorChipIndex 추가 CBLIM 2200401 **/
                if(colorchipYn == undefined && colorchipYn == ""){
                	var ordQty = parseInt( $("#cartCnt_"+optionKey).val() );
                }else{
                	//var ordPsbMinQty = parseInt( $("#ordPsbMinQty").val() );
//                	console.log(parseInt( $("#ordPsbMinQty").val()));
                	
                	var ordQty = parseInt( $("#ordPsbMinQty").val());
                	if($("#ordPsbMinQty").val() == undefined ){
                		ordQty = 1;
                	}
                }
                //ㅇㅇㅇㅇ
                /** 컬러칩 colorChipIndex 추가 CBLIM 2200401 **/													 
                var rsvGoodsYn = $("#rsvSaleYn").val();
                var dispCatNo = $("#dispCatNo").val();
                var drtPurYn = directYn;
                var prsntYn = "N"; // 고정값
                
                //  재고 여부 체크 ( 실제 장바구니버튼 클릭 시 재고 체크 안함  )
                if ( saveTp == "NEW"){
                    var cartCheck = goods.detail.cart.cartCheck(ordQty, optionKey,'Y',colorchipYn, qty);    
                }else{
                    var cartCheck = goods.detail.cart.cartCheck(ordQty, optionKey,'Y',colorchipYn, qty); // 컬러칩 장바구니 등록 전 유효성 체크 추가 CBLIM 20200403
                }
                
                var getGoods = $("div.prd_gift_box");
                var buyCondStrtQtyAmt = parseInt( getGoods.attr("buyCondStrtQtyAmt") );
                var promKndCd = getGoods.attr("promKndCd");
                
                if ( cartCheck == 'Y' ){
					/** 발색비교 팝업에서 장바구니 추가 시 일반배송으로 CBLIM 2200401 **/
//                    if(colorChipIndex != undefined && colorChipIndex != ""){
//                    	quickYn = "N";
//                    }
                	/** 발색비교 팝업에서 장바구니 추가 시 일반배송으로 CBLIM 2200401 **/																					   
					var data = {
                            goodsNo : goodsNo,
                            itemNo : itemNo,
                            ordQty : ordQty,
                            rsvGoodsYn : rsvGoodsYn,
                            dispCatNo : dispCatNo,
                            drtPurYn : drtPurYn,
                            prsntYn : prsntYn,
                            promKndCd : promKndCd,
                            buyCondStrtQtyAmt : buyCondStrtQtyAmt,
                            quickYn : quickYn
                    };
                }else{
                    return;
                }
                
                resultData.push(data);
                
                // N+1 동일(P201), A+B(P203) 일 경우 장바구니에 자동 추가  
                var buyGoodsNo = goodsNo;
                var buyItemNo = itemNo;
                var buyOrdQty = ordQty;
                
                var getGoods = $("div.prd_gift_box");
                var buyCondStrtQtyAmt = parseInt( getGoods.attr("buyCondStrtQtyAmt") );
                var promNo = getGoods.attr("promNo");
                var promKndCd = getGoods.attr("promKndCd");
                var getItemAutoAddYn = getGoods.attr("getItemAutoAddYn");
                
                var getGoodsNo = (promKndCd == "P201") ? getGoods.attr("goodsNo") : getGoods.attr("getItemGoodsNo");
                var getItemNo = (promKndCd == "P201") ? getGoods.attr("itemNo") : getGoods.attr("getItemItemNo");
                var getOrdQty = parseInt( buyOrdQty / buyCondStrtQtyAmt );
                if(promKndCd == "P203")
                    getOrdQty = ordQty;
                
                var samePrdSumOrdQty = 0;
                if(buyGoodsNo == getGoodsNo && buyItemNo == getItemNo)
                    samePrdSumOrdQty = buyOrdQty;
                
                var getItemAutoAddYn = getGoods.attr("getItemAutoAddYn");
                
                if(getOrdQty > 0){
                    if(promNo != undefined && promNo != ""){
                        if(promKndCd == "P201" || 
                          (promKndCd == "P203" && getItemAutoAddYn == "Y" && 
                          getGoodsNo != undefined && getGoodsNo != '' && 
                          getItemNo != undefined && getItemNo != '')){
						 
							/** 발색비교 팝업에서 장바구니 추가 시 일반배송으로 CBLIM 2200401 **/
//                            if(colorChipIndex != undefined && colorChipIndex != ""){
//                            	quickYn = "N";
//                            }
                        	/** 발색비교 팝업에서 장바구니 추가 시 일반배송으로 CBLIM 2200401 **/																					   
							
							var getGoodsData = {
                                    goodsNo : getGoodsNo,
                                    itemNo : getItemNo,
                                    ordQty : getOrdQty,
                                    rsvGoodsYn : "N", // 예약상품여부
                                    dispCatNo : "",  // 전시카테고리 번호
                                    drtPurYn : directYn,            //바로구매여부
                                    promKndCd : promKndCd,     //프로모션구분
                                    crssPrstNo : promNo,        //프로모션번호
                                    prstGoodsNo : buyGoodsNo,  //타겟buy군의 상품번호
                                    prstItemNo : buyItemNo,    //타겟buy군의 아이템번호
                                    buyCondStrtQtyAmt : buyCondStrtQtyAmt,
                                    samePrdSumOrdQty : samePrdSumOrdQty,     //상품번호 아이템번호가 같은상품의 수량을 합한값
                                    getItemAutoAddYn : getItemAutoAddYn,     // get상품 자동증가 여부
                                    quickYn : quickYn
                            };
                                                           
                            resultData.push(getGoodsData);
                        }
                    }
                }
            }else{
                // 패키지 상품 정보
                var pkgGoodsYn = $("#pkgGoodsYn").val();       // 패키지 상품 여부
                var pkgGoodsNo = (pkgGoodsYn == "Y") ? $("#goodsNo").val() : "";        // 패키지 상품 번호
                
                //  선택된 단품 개수
                var itemLen = $(".prd_cnt_box").length;
                
                //  선택된 단품 개수마다 세팅
                for(var i=0; i<itemLen; i++){
                    var goodsNo = $(".prd_cnt_box").eq(i).find('input[name=sGoodsNo]').val();
                    var itemNo = $(".prd_cnt_box").eq(i).find('input[name=itemNo]').val();
                    var optionKey = goodsNo + itemNo;
                    var ordQty = parseInt( $(".prd_cnt_box").eq(i).find('.tx_num').val() );
                    var rsvGoodsYn = $("#rsvSaleYn").val();
                    var dispCatNo = $("#dispCatNo").val();
                    var drtPurYn = directYn;
                    
                    //  재고 여부 체크 ( 실제 장바구니버튼 클릭 시 재고 체크 안함  )
                    if ( saveTp == "NEW"){
                        var cartCheck = goods.detail.cart.cartCheck(ordQty, optionKey);    
                    }else{
                        var cartCheck = goods.detail.cart.cartCheck(ordQty, optionKey,'Y');
                    }
                    
                    var getGoods = $("div.prd_gift_box.item_" + goodsNo + itemNo);
                    var buyCondStrtQtyAmt = parseInt( getGoods.attr("buyCondStrtQtyAmt") );
                    var promKndCd = getGoods.attr("promKndCd");
                    
                    if ( cartCheck == 'Y' ){
                        var itemData = {
                                goodsNo : goodsNo,
                                itemNo : itemNo,
                                ordQty : ordQty,
                                rsvGoodsYn : rsvGoodsYn,
                                dispCatNo : dispCatNo,
                                drtPurYn : drtPurYn,
                                prsntYn : prsntYn,
                                pkgGoodsNo : pkgGoodsNo,
                                promKndCd : promKndCd,
                                buyCondStrtQtyAmt : buyCondStrtQtyAmt,
                                quickYn : quickYn
                        };
                        
                        resultData.push(itemData);
                    }else{
                        // jwkim 일반배송으로 주문시 문제 발상하게 되면 초기화 시켜야함
                        var selectDlvYn = $("input[name=selectDlvYn]", $("#outItem")).val();
                        
                        // jwkim 일반배송으로 주문시 문제 발상하게 되면 초기화 시켜야함
                        if(selectDlvYn == "Y"){
                            $("input[name=selectDlvYn]", $("#outItem")).val("N");
                        }
                        
                        return false;
                    }
                    
                    // N+1 동일(P201), A+B(P203) 일 경우 장바구니에 자동 추가 <시작>
                    var getGoods = $("div.prd_gift_box.item_" + goodsNo + itemNo);
                    var buyCondStrtQtyAmt = parseInt( getGoods.attr("buyCondStrtQtyAmt") );
                    
                    var promNo = getGoods.attr("promNo");
                    var promKndCd = getGoods.attr("promKndCd");
                    var getItemAutoAddYn = getGoods.attr("getItemAutoAddYn");
                    
                    var getGoodsNo = (promKndCd == "P201") ? getGoods.attr("goodsNo") : getGoods.attr("getItemGoodsNo");
                    var getItemNo = (promKndCd == "P201") ? getGoods.attr("itemNo") : getGoods.attr("getItemItemNo");
                    var samePrdSumOrdQty = 0;
                    if(goodsNo == getGoodsNo && itemNo == getItemNo)
                        samePrdSumOrdQty = ordQty;
                    
                    // 같은 프로모션의 buy군 상품 총 갯수
                    ordQty = 0;
                    $("div.prd_cnt_box[promNo=" + promNo + "]").each(function(){
                        ordQty += parseInt( $(this).find("span.option_cnt_box input").val() );
                    });
                    
                    var getOrdQty = parseInt( ordQty / buyCondStrtQtyAmt );
                    if(promKndCd == "P203")
                        getOrdQty = ordQty;
                    
                    if(getOrdQty == 0)
                        continue;
                    
                    var getItemAutoAddYn = getGoods.attr("getItemAutoAddYn");
                    
                    if(promNo != undefined && promNo != ""){
                        if(promKndCd == "P201" || 
                          (promKndCd == "P203" && getItemAutoAddYn == "Y" && 
                          getGoodsNo != undefined && getGoodsNo != '' && 
                          getItemNo != undefined && getItemNo != '')){
                            var getGoodsData = {
                                    goodsNo : getGoodsNo,
                                    itemNo : getItemNo,
                                    ordQty : getOrdQty,
                                    rsvGoodsYn : "N", // 예약상품여부
                                    dispCatNo : "",  // 전시카테고리 번호
                                    drtPurYn : drtPurYn,            //바로구매여부
                                    promKndCd : promKndCd,     //프로모션구분
                                    crssPrstNo : promNo,        //프로모션번호
                                    prstGoodsNo : goodsNo,  //타겟buy군의 상품번호
                                    prstItemNo : itemNo,    //타겟buy군의 아이템번호
                                    buyCondStrtQtyAmt : buyCondStrtQtyAmt,
                                    samePrdSumOrdQty : samePrdSumOrdQty,     //상품번호 아이템번호가 같은상품의 수량을 합한값
                                    getItemAutoAddYn : getItemAutoAddYn,     // get상품 자동증가 여부
                                    quickYn : quickYn
                            };
                                                           
                            resultData.push(getGoodsData);
                        }
                    }
                    // N+1 동일(P201), A+B(P203) 일 경우 장바구니에 자동 추가 <끝>
                }
            }
            
            // 선택된 get상품 추가 <시작>
            $("div.prd_gift_box").each(function(){
                var promNo = $(this).attr("promNo");
                var buyCondStrtQtyAmt = parseInt( $(this).attr("buyCondStrtQtyAmt") );
                var promKndCd = $(this).attr("promKndCd");
                
                $(this).find("span.opt").each(function(){
                    var getGoods = $(this);
                    var getGoodsNo = getGoods.attr("goodsNo");
                    var getItemNo = getGoods.attr("itemNo");
                    var getOrdQty = parseInt( getGoods.attr("ordQty") );
                    var samePrdSumOrdQty = 0;
                    
                    // 옵션이 없을 경우
                    if ( goodsOption == 'single'){
                        var buyGoodsNo = $("#goodsNo").val();
                        var buyItemNo = $("#itemNo").val();
                        var optionKey = goodsNo + itemNo;
                        var ordQty = parseInt( $("#cartCnt_"+optionKey).val() );
                        
                        if(getGoodsNo == buyGoodsNo && getItemNo == buyItemNo)
                            samePrdSumOrdQty += ordQty;
                    } else {
                        // 옵션이 있을 경우
                        $("div.prd_cnt_box").each(function(){
                            var buyGoodsNo = $(this).find("input[name=sGoodsNo]").val();
                            var buyItemNo = $(this).find("input[name=itemNo]").val();
                            var ordQty = parseInt( $(this).find("input.tx_num").val() );
                            
                            if(getGoodsNo == buyGoodsNo && getItemNo == buyItemNo)
                                samePrdSumOrdQty += ordQty;
                        });
                    }
                    
                    var getGoodsData = {
                            goodsNo : getGoodsNo,
                            itemNo : getItemNo,
                            ordQty : getOrdQty,
                            rsvGoodsYn : "N", // 예약상품여부
                            dispCatNo : "",  // 전시카테고리 번호
                            drtPurYn : drtPurYn,            //바로구매여부
                            promKndCd : promKndCd,     //프로모션구분
                            crssPrstNo : promNo,        //프로모션번호
                            prstGoodsNo : goodsNo,  //타겟buy군의 상품번호
                            prstItemNo : itemNo,    //타겟buy군의 아이템번호
                            buyCondStrtQtyAmt : buyCondStrtQtyAmt,
                            samePrdSumOrdQty : samePrdSumOrdQty,     //상품번호 아이템번호가 같은상품의 수량을 합한값
                            quickYn : quickYn
                    };
                    
                    resultData.push(getGoodsData);
                });
            });
            // 선택된 get상품 추가 <끝>
            
            // jwkim 일반으로배송 로직
            var mbrDlvpSeq ="";
            mbrDlvpSeq = $("input[name=mbrDlvpSeq]", $("#outItem")).val();
            
            
            if($("#quickYn").val() == "Y") {
            	var orderStrNo = $("#orderStrNo").val();
            	resultData.strNo = orderStrNo;
            }
            
            resultData.prodView = "Y";
            //  장바구니 등록
            var regCartCheck = common.cart.regCart(resultData, directYn, saveTp, "Y", "", "N", mbrDlvpSeq);
            
            // 오늘드림 구매하기시에 장바구니 에러 발생시 매장재고가 아닌 999개로 초기화시킴
            if(regCartCheck.result == false && quickYn == "Y"){
                $("#goodsForm #quickAvalInvQty").val("999");
            } else if(regCartCheck.result == false && quickYn == "N"){
                $("input[name=selectDlvYn]", $("#outItem")).val("N");
            }
            
            //common.cart.regCart(resultData, directYn, saveTp); // as-is 소스
        },
        
        //  장바구니 개수 조회
        checkCartCnt : function(){
            var totalCnt = Number($("#totalCnt").val());
            if( totalCnt != undefined && totalCnt != 0 && totalCnt != ""){
                if ( common.isLogin() ){
                    return true;
                }else{
                    common.link.moveLoginPage();
                }
            }else{
                return false;
            }
        },
        
        // get상품 선택 여부 체크
        checkGetItemSelect : function(){
            var checkFlag = true;
            $("div.prd_gift_box p.txt a").each(function(){
                if( $(this).text() == "선택" || $(this).hasClass("wOrange") )
                    checkFlag = false;
            });
            
            return checkFlag;
        },

        //  웹로그 바인딩
        bindWebLog : function(){
            //  N+1 행사 안내 배너 - 옵션 선택 후
            $(".option_add_area").find(".goods_nplus1").bind("click", function(){
                common.wlog("goods_nplus1");
            });
        },
        
};

/** SNS 공유 **/
$.namespace("goods.detail.sns");
goods.detail.sns = {
        
        title : $("#goodsNm").val(),
        snsUrl : _baseUrl + 'G.do?goodsNo=' + goods.detail.goodsNo,
        snsImg : $("#snsImgUrl").val(),
        
        /** SNS 공유 Init **/
        init : function(){

            //  SNS 데이터 초기 Init
            if ( goods.detail.sns.snsImg != undefined && goods.detail.sns.snsImg != "" ){
                common.sns.init( goods.detail.sns.snsImg, goods.detail.sns.title, goods.detail.sns.snsUrl );                
            }else{
                common.sns.init( '', goods.detail.sns.title, goods.detail.sns.snsUrl);                
            }
        },
        
        /** 팝업 레이어 오픈 **/
        popLayerOpen : function(){   
            common.popLayerOpen("LAYERPOP01");
            $("#LAYERPOP01").html($("#snsPopUp").html());
            $("#snsPopUp").html("");
            
            /** SNS 공유 버튼 Bind */
            $("#LAYERPOP01").find(".snsShareDo").click(function(){
                var type = $(this).attr("snsType");
                common.sns.doShare(type);
            });
        },
        
        /** 팝업 레이어 닫기 **/
        popLayerClose : function(layerId){
            $("#snsPopUp").html($("#"+layerId).html());
            common.popFullClose();
            $("#LAYERPOP01").html("");
            $(".dim").hide();
        }
};

// 행사사은품선택팝업띄우기
$.namespace('mcart.popLayer.promGift');
mcart.popLayer.promGift = {
    /**
     * 초기화 함수 화면 로드가 끝나면 자동으로 실행 된다.
     */
    init : function() {
        var selTargetPromNo = goodsNo + itemNo;
        var totalCnt = 0;
        
        // 기 선택한 get 상품 표시
        $("div.prd_gift_box.item_" + selTargetPromNo + " p.txt span.opt").each(function(){
            var goodsNo = $(this).attr("goodsNo");
            var itemNo = $(this).attr("itemNo");
            var promNo = $(this).attr("promNo");
            var ordQty = parseInt( $(this).attr("ordQty") );
            
            if(goodsNo != undefined && itemNo != undefined && promNo != undefined && ordQty != NaN){
                $("li[name=selPopInfo][goodsNo=" + goodsNo + "][itemNo=" + itemNo + "]").addClass("on").find("input[name=promGiftAmount]").val(ordQty);
                totalCnt += ordQty;
            }
        });
        
        $("p.layer_desc2 span.tx:eq(1) i").text(totalCnt);      // 기 선택한 추가상품 수량
        
        // 수량 수정(0 -> 1 개로 선택시 상품리스트에 하이라이트 효과적용)
        $('p.prd_cnt_box input[name=promGiftAmount]').focusin(function(){
            $(this).val($(this).val().replace(/[^0-9]/gi,""));
            $(this).data('old', $(this).val());
        }).focusout(function() {
            var prev = $(this).data('old') == undefined ? 0 : $(this).data('old');
            $(this).val($(this).val().replace(/[^0-9]/gi,""));
            var curVal = $(this).val();
            var totSelAmount = 0;
            
            // 구매수량을 제대로 입력하지 않을 경우
            if ( !(Number(curVal) >= 0 && curVal != '') || isNaN(curVal) ){
                alert('수량이 올바르지 않습니다.');
                $(this).val(prev);
                return false;
            }
            
            $('p.prd_cnt_box input[name=promGiftAmount]').each(function(){
                totSelAmount += parseInt($(this).val());
            });
            
            prev = parseInt(prev);
            curVal = parseInt(curVal);
            
            // 최대 선택 가능 수량
            if(totSelAmount > getItemCnt && prev < curVal){
                alert('선택하실 수 있는 추가 상품은 최대 '+getItemCnt+'개 입니다.');
                $(this).val(prev);
                return false;
                
                totSelAmount = 0;
                $('p.prd_cnt_box input[name=promGiftAmount]').each(function(){
                    totSelAmount += parseInt($(this).val());
                });
            }
            
            // 재고 체크
            var getItemStockQty = parseInt( $(this).parents("li[name=selPopInfo]").attr("stockQty") );
            if(getItemStockQty < curVal){
                alert("재고가 " + getItemStockQty + "개 남았습니다. 구매를 서둘러 주세요!");
                $(this).val(prev);
                return false;
            }
            
            if(this.value >= 1){
                $(this).parents("li").addClass("on");
            } else {
                $(this).parents("li").removeClass("on");
            }
            
            $("p.layer_desc2 span.tx:eq(1) i").text(totSelAmount);      // 기 선택한 추가상품 수량
        });
        
        // 취소 버튼 클릭 이벤트
        $("button[name=btnCancel]").click(function() {
            fnLayerSet('cart_layer_pop_wrap','close');
            $('#cart_layer_pop_wrap').css('top','');
            $('#cart_layer_pop_wrap').css('margin-left','');
            $('#cart_layer_pop_wrap').css('margin-top','');
            return false;
        });
        
        // GET상품 레이어 선택완료 버튼 클릭 이벤트
        $("button[name=btnComplete]").click(function() {
            var cartSelGetInfoList = new Array();
            var sumSelGift = 0; //GET상품 선택 레이어 내에서의 선택한 상품의 총수량
           
           if(getItemCnt > 0){
               $('p.prd_cnt_box input[name=promGiftAmount]').each(function(){
                   sumSelGift += parseInt(this.value);
               });
               
               if(sumSelGift > getItemCnt){
                   alert('선택하실 수 있는 추가 상품은 최대 '+getItemCnt+'개 입니다.');
                   return false;
               } else if(sumSelGift < getItemCnt) {
                   alert('추가 상품을 '+(getItemCnt - sumSelGift)+'개 더 선택해주시거나, 본 상품의 수량을 변경해주세요.');
                   return false;
               } else {
                   var thisObj = $("div.prd_gift_box.item_" + selTargetPromNo);
                   var promKndCd = thisObj.attr("promKndCd");                           // 프로모션 종류(P201,P202,P203) 
                   var buyCondStrtQtyAmt = parseInt( thisObj.attr("buyCondStrtQtyAmt") ); // n+1의 n
                   var newSelGetHtml = "";           //각각의 GET군 상품군 html변수
                   
                   var validSuc = false;            //화면이 정상적으로 만들어 졌는지 체크
                   var itemCnt = 0;                  //GET상품 레이어의 선택된 상품의 수량
                   
                   //GET군 저장시 프로모션에 해당하는 BUY군 상품정보를 리스트의 마지막 상품군으로 저장.
                   var prstGoodsNo = thisObj.parents('tr').eq(thisObj.parents('tr').length-1).attr('goodsNo'); 
                   var prstItemNo = thisObj.parents('tr').eq(thisObj.parents('tr').length-1).attr('itemNo'); 
                   
                   var prom = $("div.prd_cnt_box.item_" + selTargetPromNo).attr("promNo");
                   var period = $("div.prd_gift_box[promno="+prom+"] font[name=period]").text();
                   //----------- #####################3  화면 html make 시작 ###############################
                   //GET군 레이어의 상품 영역
                   $('li[name="selPopInfo"]').each(function(x,y){
                       var getObj = $(this);
                       //선택된 상품
                       if($(this).attr('class') == "on"){
                           //프로모션상품인지 체크
                           if(promKndCd == "P201" || promKndCd == "P202" || promKndCd == "P203"){
                               itemCnt = parseInt( $(this).find('p.prd_cnt_box input[name=promGiftAmount]').val() );
                               
                               //장바구니 화면내의 GET군 영역의 상품정보 셋팅
                               newSelGetHtml += "<span class='opt' id='" + ($(this).attr('goodsNo') + $(this).attr('itemNo')) + "' dispcatno='" + $(this).attr('itemNo') + "' goodsno='" + $(this).attr('goodsNo') + "' itemno='" + $(this).attr('itemNo') + "' promno='" + $(this).attr('oriPromNo') + "' ordqty='" + itemCnt + "' rsvsaleyn='' stockqty='" + $(this).attr('stockQty') + "'><span class='prd'>"; 
                               newSelGetHtml +=  $(this).attr('goodsNm') + " " + $(this).attr('itemNm') + " </span><i>" + itemCnt + "</i>개";
                               newSelGetHtml += "</span>";
                               
                               validSuc = true;
                               
                               // 상품상세에서 일반배송,오늘드림 라디오 선택시 gift상품 제어를위해서 사용 jwkim
                               if(promKndCd == "P203"){
                                   $(".prd_gift_box.item_"+selTargetPromNo).attr("getItemAutoAddYn", "N");
                                   $(".prd_gift_box.item_"+selTargetPromNo).attr("getitemgoodsno", $(this).attr('goodsNo'));
                                   $(".prd_gift_box.item_"+selTargetPromNo).attr("getitemitemno", $(this).attr('itemNo'));
                                   $(".prd_gift_box.item_"+selTargetPromNo).attr("getitemgoodsnm", $(this).attr('goodsNm'));
                                   $(".prd_gift_box.item_"+selTargetPromNo).attr("getitemitemnm", $(this).attr('itemNm'));
                                   $(".prd_gift_box.item_"+selTargetPromNo).attr("getitemstockqty", $(this).attr('stockQty'));
                               }
                           }
                       }
                   });
                   
                   newSelGetHtml += "   <a href=javascript:common.popLayer.promGift.openPromGiftPop('" + goodsNo + "','" + itemNo + "','" + promNo + "'); class='btnSmall wGray' data-rel='layer' data-target='layer_pop_wrap' id='evtPopup'>다시선택</a>";
                   //----------- #####################3  화면 html make 끝 ###############################
                   
                   if(validSuc){
                       //성공하면 아래처리
                       var titTextStr = "";
                       
                       if(promKndCd == "P201" || promKndCd == "P202"){
                           titTextStr = "<strong>" + buyCondStrtQtyAmt + "+1 적용</strong>되어 구매됩니다. <font name='period' style='font-weight:100; color:#333; font-size:14px'>" + period + "</font>";
                           $("div.prd_gift_box.item_" + selTargetPromNo + " p.tit").html(titTextStr);
                       } else if(promKndCd == "P203"){
                           titTextStr = "<strong>GIFT 행사적용</strong>되어 구매됩니다.<br><font name='period' style='font-weight:100; color:#333; font-size:14px'>" + period + "</font>";
                           $("div.prd_gift_box.item_" + selTargetPromNo + " p.tit").html(titTextStr);
                       }
                      
                       $("div.prd_gift_box.item_" + selTargetPromNo + " p.txt").html(newSelGetHtml);
                       // 옵션상품 선택시 초기화 제어를 위한 클래스명 제거 jwkim
                       $("div.prd_gift_box.item_" + selTargetPromNo).removeClass("giftInit");
                       
                   } else {
                      //정상적으로 화면 html make 되지 않았을때 처리.
                       alert("죄송합니다.\n처리중 오류가 발생하였습니다.\n고객센터(1522-0882)로 문의 바랍니다.");
                       return false;
                   }
                   
                   //닫기
                   fnLayerSet('cart_layer_pop_wrap','close');
               }
           }
        });
    },
    
    /** 행사상품 팝업 레이어 오픈 **/
    popLayerOpen : function(goodsNo,itemNo,promNo){
        mcart.popLayer.promGift.http.openPromGiftPop.submit(goodsNo,itemNo,promNo);
    },
};

/** 당일배송 */
$.namespace("goods.detail.todayDelivery");
goods.detail.todayDelivery = {
        
        jsonParam : undefined,
        
        buyClickYn : 'N',
 
        /** 당일배송 INIT **/
        init : function(){
            
            if($("#deliveDay").prop("checked")==true){
                $(".liNormalDeli").addClass("todayOff");
                $(".liQuickDeli").removeClass("todayOff");
                
                //mjh추가
                $("#quickGiftInfo").show();
                
                goods.detail.todayDelivery.deliveryCharge();  // 배송비 계산
            }else{
                $(".liNormalDeli").removeClass("todayOff");
                $(".liQuickDeli").addClass("todayOff");
                
                //mjh추가
                $("#quickGiftInfo").hide();

            }
            
            //  버튼 Bind
            setTimeout(function(){
                goods.detail.todayDelivery.bindButtonInit();
            }, 500)
        },
        
        bindButtonInit : function(){

        },
        
        /** 당일배송 서비스 안내 **/
        openQuickPop : function(str){
            if(str == 'question'){
                //$("#layer_pop_wrap").html($("#infoTodayDeliveryQuestion").html());
                $("#infoTodayDeliveryQuestion").css('z-index', '999');
                fnLayerSet("infoTodayDeliveryQuestion", "open");
            }else if(str == 'order'){
                // 주문서 안내팝업
                var bannInfo = common.bann.getPopInfo("infoTodayDeliveryOrder");
                if (bannInfo != null) {
                    if (new Date() - bannInfo.regDtime >= (1000 * 60 * 60 * 24)) {;
                        fnLayerSet("infoTodayDeliveryOrder", "open");
                    }else{
                        $("#quickInfoYn").val("Y");
                        $("button[name=btnPay]").click();
                    }
                } else {
                    fnLayerSet("infoTodayDeliveryOrder", "open");
                }
                
            }else {
                var dt = new Date();
                var hour = dt.getHours();
                
                // 오늘드림 기간 제한 ( json data가 잘못입력될수도있으니 try 처리 ) 
                var _o2oBlockInfo = "";
                try{
                    _o2oBlockInfo = $.parseJSON($("#o2oBlockInfo").val());
                    if(_o2oBlockInfo.o2oBlockYn == "Y"){
                        //alert(_o2oBlockInfo.o2oBlockMsg);
                        $("#deliveDay").prop("checked",false);
                        $("#deliveNm").prop("checked",true);
                        //return;
                    }
                }catch(e){console.log(e);}
                
                /*if(hour < $("#quickOrdTimeFrom").val() || hour >=$("#quickOrdTimeTo").val() ){
                    alert("오늘드림 주문 가능시간은 오전 10시 ~ 오후 8시 입니다.");
                    $("#deliveDay").prop("checked",false);
                    $("#deliveNm").prop("checked",true);
                    return;
                }*/
                
                var bannInfo = common.bann.getPopInfo("infoTodayDelivery");
                if (bannInfo != null) {
                    if (new Date() - bannInfo.regDtime >= (1000 * 60 * 60 * 24)) {;
                        fnLayerSet("infoTodayDelivery", "open");
                    }
                } else {
                    fnLayerSet("infoTodayDelivery", "open");
                }
            }
            
        },
        /**20200615 상단에서 열리는 레이어 하단으로 이동 당일배송 서비스 안내 **/
        openQuickPopMidle : function(str){
            if(str == 'question'){
                //$("#layer_pop_wrap").html($("#infoTodayDeliveryQuestion").html());
                $("#infoTodayDeliveryQuestion").css('z-index', '999');
                fnLayerSetMidle("infoTodayDeliveryQuestion", "open");
            }else if(str == 'order'){
                // 주문서 안내팝업
                var bannInfo = common.bann.getPopInfo("infoTodayDeliveryOrder");
                if (bannInfo != null) {
                    if (new Date() - bannInfo.regDtime >= (1000 * 60 * 60 * 24)) {;
                    	fnLayerSetMidle("infoTodayDeliveryOrder", "open");
                    }else{
                        $("#quickInfoYn").val("Y");
                        $("button[name=btnPay]").click();
                    }
                } else {
                    fnLayerSetMidle("infoTodayDeliveryOrder", "open");
                }
                
            } else if(str == 'pickup'){
            	$("#storePickPop").css('z-index', '999');
                fnLayerSetMidle("storePickPop", "open");
            } else {
                var dt = new Date();
                var hour = dt.getHours();
                
                // 오늘드림 기간 제한 ( json data가 잘못입력될수도있으니 try 처리 ) 
                var _o2oBlockInfo = "";
                try{
                    _o2oBlockInfo = $.parseJSON($("#o2oBlockInfo").val());
                    if(_o2oBlockInfo.o2oBlockYn == "Y"){
                        //alert(_o2oBlockInfo.o2oBlockMsg);
                        $("#deliveDay").prop("checked",false);
                        $("#deliveNm").prop("checked",true);
                        //return;
                    }
                }catch(e){console.log(e);}
                
                /*if(hour < $("#quickOrdTimeFrom").val() || hour >=$("#quickOrdTimeTo").val() ){
                    alert("오늘드림 주문 가능시간은 오전 10시 ~ 오후 8시 입니다.");
                    $("#deliveDay").prop("checked",false);
                    $("#deliveNm").prop("checked",true);
                    return;
                }*/
                
                var bannInfo = common.bann.getPopInfo("infoTodayDelivery");
                if (bannInfo != null) {
                    if (new Date() - bannInfo.regDtime >= (1000 * 60 * 60 * 24)) {;
                    fnLayerSetMidle("infoTodayDelivery", "open");
                    }
                } else {
                	fnLayerSetMidle("infoTodayDelivery", "open");
                }
            }
            
        },        
        /** 오늘드림 빠름 배송시간 팝업**/
        openQuickDeliAI : function() {
        	fnLayerSet("quickAI", "open");
        },
        /** 당일배송 서비스 안내 **/
        dlvLayerOpen : function(){
            
            var checkFlag = true;
            
            var selectDlvYn = $("input[name=selectDlvYn]", $("#outItem")).val();
            
            if($("#deliveDay").prop("checked")==true){
                
                if($(".liNormalDeli").hasClass("todayOff")){
                    checkFlag = false;
                }
                
                $(".liNormalDeli").addClass("todayOff");
                $(".liQuickDeli").removeClass("todayOff");
            }else{
                
                if(!$(".liNormalDeli").hasClass("todayOff")){
                    checkFlag = false;
                }
                
                $(".liNormalDeli").removeClass("todayOff");
                $(".liQuickDeli").addClass("todayOff");
            }
            
            // selectDlvYn 이 값은 오늘드림 배송에서 배송지 선택 레이어 팝업에서 특정 주소지를 선택후 재고가0인경우
            // 일반으로배송 주문 레이어 팝업에서 일반으로배송 선택시 Y값으로 바꿈
            // Y인 경우 옵션을 초기화 시키지 않게 하기 위함
            if(checkFlag && selectDlvYn != "Y"){
                // 오늘드림에서 사용자가 특정 배송지 선택후 라디오버튼을 일반배송으로 변경한경우에 주문하는경우 선택한 배송지코드 초기화
                // 초기화 시켜주지 않으면 구매하기시에 오늘드림에서 선택한 배송지로 자동셋팅됨
                $("input[name=mbrDlvpSeq]", $("#outItem")).val("");
                
                // 일반배송, 오늘드림 라디오 선택시 행사 상품이 있는경우 n+1 상품 초기화
                // [START 오늘드림 옵션상품 개선:jwkim]
                var promNo = "";
                var optionKey = "";
                var goodsNo = $("#goodsNo").val();
                
                $("div.prd_gift_box").each(function(){
                    // 옵션 교차 n+1 / gift 상품인경우 일반배송 및 오늘드림 여부가 변경될때마다 프로모션상품 초기화
                    if($(this).attr("promkndcd") == "P202"){ // n+1인경우
                        
                        var cartCnt = 0;
                        var nCnt = 0;
                        
                        optionKey = $(this).attr("goodsno") +$(this).attr("itemno");
                        promNo = $(this).attr("promno");
                        
                        // 상품수량
                        cartCnt = $("#cartCnt_"+optionKey).val();
                        // buy의 N개의 상품 수량
                        nCnt = Number($(this).attr("buyCondStrtQtyAmt"));
                        
                        /*if(typeof cartCnt == "undefined"){
                            goods.detail.cart.changeMsg(optionKey, promNo, "Y");
                        } else if(cartCnt >= nCnt){
                            // N개 선택보다 선택한 상품수가 적은경우 초기화하지 않음
                            goods.detail.cart.changeMsg(optionKey, promNo, "Y");
                        }*/
                        
                        goods.detail.cart.changeMsg(optionKey, promNo, "Y");
                        
                        goods.detail.cart.changeMsg(optionKey, promNo);
                        
                    } else if($(this).attr("promkndcd") == "P203"){ // gift인경우
                        
                        optionKey = $(this).attr("goodsno") +$(this).attr("itemno");
                        promNo = $(this).attr("promno");
                        
                        goods.detail.cart.changeMsg(optionKey, promNo, "Y");
                        
                        //goods.detail.cart.changeMsg(optionKey, promNo);
                    }
                });
                
                
                // 일반배송, 오늘드림 라디오 선택시 행사 상품이 있는경우 OptionList 초기화
                if($('#buyOpt, #artcOpt').parent().hasClass('open')){
                    
                    $('#buyOpt, #artcOpt').parent().removeClass('open');
                    
                }
                
                // 라디오 선택시 옵션이 존재하는경우 초기화...새로 옵션을 선택하면 옵션list새로 불러옴
                if($("#option_list > li").size() > 0){
                    $("#option_list").html("");
                }
                // [END 오늘드림 옵션상품 개선:jwkim]
            }
            
            // as-is 로직
            /*if($("#deliveDay").prop("checked")==true){
                $(".liNormalDeli").addClass("todayOff");
                $(".liQuickDeli").removeClass("todayOff");
            }else{
                $(".liNormalDeli").removeClass("todayOff");
                $(".liQuickDeli").addClass("todayOff");
            }*/
            
            $("input[name=selectDlvYn]", $("#outItem")).val("N");
        },
        
        /** 당일배송 서비스 안내 닫기 **/
        layerClose : function(str){  
            //$('#quickAvalInvQty').val(999); //오늘드림 재고 초기화
            goods.detail.todayDelivery.buyClickYn = 'N';
            
            if(str=="order"){
                $("#quickInfoYn").val("Y");
                $("button[name=btnPay]").click();
            } else {
                //$('#quickAvalInvQty').val(0); //오늘드림 재고 초기화
            }
            
            $(".layer_pop_wrap").hide();
            $('.dimm').remove();
        },
        /** 당일배송 오늘 하루 안보기 **/
        openQuickPopToday : function(str){
            if(str=="order"){
                common.bann.setPopInfo("infoTodayDeliveryOrder", $("#infoTodayDeliveryOrder").attr("data-ref-compareKey"));
                $("#quickInfoYn").val("Y");
                $("button[name=btnPay]").click();
            }else{
                common.bann.setPopInfo("infoTodayDelivery", $("#infoTodayDelivery").attr("data-ref-compareKey"));
            }
            $(".layer_pop_wrap").hide();
            $('.dimm').remove();
        },
        
        /** 당일 배송지 목록 **/
        todayDeliveryList : function(){
            var url = _baseUrl + "goods/getTodayDeliveryListAjax.do";
            var data ={};
            common.Ajax.sendRequest("POST",url,data,goods.detail.todayDelivery._callBackTodayDeliveryList);
        },
        
        // 오늘드림 고도화 2019.11.08 추가
        /** 당일 배송지 목록(페이지 상에 불러오기) **/
        todayDeliveryListOnPage : function(){
            var url = _baseUrl + "goods/getTodayDeliveryListAjaxOnlyData.do";
            var data = {};
            common.Ajax.sendRequest("POST",url,data,goods.detail.todayDelivery._callBackTodayDeliveryListOnPage);
        },
        
        /** 배송지 등록 후 당일 배송지 선택 **/
        registTodayDeliverySelect : function(){
            var url = _baseUrl + "goods/getTodayDeliveryAjax.do";
            var data ={maxDlvpSeq : 'Y'};
            common.Ajax.sendRequest("POST",url,data,goods.detail.todayDelivery._callBackRegistTodayDeliverySelect);
        },
        
        // 오늘드림 고도화 2019-11-19  추가
        /** 배송지 등록 후 당일 배송지 선택(기존 로직과 다름) **/
        registTodayDeliverySelect2 : function(){
            var dlvpSeq = goods.detail.modifySeq;
            var url = _baseUrl + "goods/getTodayO2ODeliveryAjax.do";
            
            var maxDlvpSeq = dlvpSeq == "" || dlvpSeq == undefined ? "Y" : "";
            
            var data = {};
            if(maxDlvpSeq == "Y") {
                data ={maxDlvpSeq : maxDlvpSeq};
            } else {
                data ={dlvpSeq : dlvpSeq};
            }

            goods.detail.modifySeq = "";
            common.Ajax.sendRequest("POST",url,data,goods.detail.todayDelivery._callBackRegistTodayDeliverySelect2);
        },
        
        /** 당일 배송지 닫기 **/
        todayDeliveryClose : function(){
            fnLayerSet("todayDelivery", "close");
            common.zipcodequick.pop.deliveryRegistForm();
        },
        
        /** 당일 배송지 선택 **/
        registTodayDelivery : function(strNo, mbrDlvpSeq){
            fnLayerSet("todayDelivery", "close");
            
            //퀵배송지를 초기화 및 선택된 배송지 업데이트 quickYn = 'Y', strNo(매장번호)
            goods.detail.todayDelivery.registQuickMbrDlvpInfo(strNo, mbrDlvpSeq);
            
            var resultData = new Array();
            
            //  옵션이 있는 상품이라면 
            if ( $("#dupItemYn").val() == 'Y' ){
                
                //  선택된 단품 개수
                var itemLen = $(".prd_cnt_box").length;
                
                //  선택된 단품 개수마다 세팅
                for(var i=0; i<itemLen; i++){   
                    var goodsNo = $(".prd_cnt_box").eq(i).find('input[name=sGoodsNo]').val();
                    var itemNo = $(".prd_cnt_box").eq(i).find('input[name=itemNo]').val();
                    
                    var itemData = {
                            goodsNo : goodsNo,
                            itemNo : itemNo,
                            strNo : strNo,
                            buyGetSctCd : 'B' // buy, get군 구분코드 jwkim
                    };
                    
                    resultData.push(itemData);
                }
            }else{
                var goodsNo = $("#goodsNo").val();
                var itemNo = $("#itemNo").val();
                
                var data = {
                        goodsNo : goodsNo,
                        itemNo : itemNo,
                        strNo : strNo,
                        buyGetSctCd : 'B' // buy, get군 구분코드 jwkim
                };
                
                resultData.push(data);
            }

            // 선택된 get상품 추가 <시작>
            $("div.prd_gift_box").each(function(){
                var promNo = $(this).attr("promNo");

                var promKndCd = $(this).attr("promKndCd");
                
                $(this).find("span.opt").each(function(){
                    var getGoods = $(this);
                    var getGoodsNo = $(this).attr("goodsNo");
                    var getItemNo = $(this).attr("itemNo");
                    
                    var giftData = {
                            goodsNo : getGoodsNo,
                            itemNo : getItemNo,
                            strNo : strNo,
                            crssPrstNo : promNo,
                            buyGetSctCd : 'G'  // buy, get군 구분코드 jwkim
                    };
                    
                    resultData.push(giftData);
                });
            })

            if(resultData == null) {
                alert("죄송합니다. 고객센터에 문의해 주세요.");
            } else {
                this.jsonParam =   {
                        opCartBaseList : resultData
                    };
                
            }
            
            // jwkim 일반배송으로 주문시에 선택한 주소지 정보로 주문서에 셋팅하게끔 하기위해서 해당값사용 
            $("input[name=mbrDlvpSeq]", $("#outItem")).val(mbrDlvpSeq);
            
            data,goods.detail.todayDelivery.deliveryStrStock();
        },
        
        // 오늘드림 고도화 2019-11-12 추가
        // 오늘드림 체크박스 체크시 배송유무 메세지 뿌리기 메소드
        displayTodayDeliveryYnMessage : function(mbrDlvpSeq, strNo){
            /*fnLayerSet("todayDelivery", "close");*/
            
            //퀵배송지를 초기화 및 선택된 배송지 업데이트 quickYn = 'Y', strNo(매장번호)
            goods.detail.todayDelivery.registQuickMbrDlvpInfo(strNo, mbrDlvpSeq);
            
            var resultData = new Array();
            
            //  옵션이 있는 상품이라면 
            if ( $("#dupItemYn").val() == 'Y' ){
                
                //  선택된 단품 개수
                var itemLen = $(".prd_cnt_box").length;
                
                //  선택된 단품 개수마다 세팅
                for(var i=0; i<itemLen; i++){   
                    var goodsNo = $(".prd_cnt_box").eq(i).find('input[name=sGoodsNo]').val();
                    var itemNo = $(".prd_cnt_box").eq(i).find('input[name=itemNo]').val();
                    
                    var itemData = {
                            goodsNo : goodsNo,
                            itemNo : itemNo,
                            buyGetSctCd : 'B' // buy, get군 구분코드 jwkim
                    };
                    
                    resultData.push(itemData);
                }
            }else{
                var goodsNo = $("#goodsNo").val();
                var itemNo = $("#itemNo").val();
                
                var data = {
                        goodsNo : goodsNo,
                        itemNo : itemNo,
                        buyGetSctCd : 'B' // buy, get군 구분코드 jwkim
                };
                
                resultData.push(data);
            }
            
            // 배송지상태선체크
            var strStatusData = new Array();
            strStatusData.push({goodsNo : $("#goodsNo").val(), itemNo : $("#itemNo").val(), buyGetSctCd : 'B'});

            // 선택된 get상품 추가 <시작>
            $("div.prd_gift_box").each(function(){
                var promNo = $(this).attr("promNo");

                var promKndCd = $(this).attr("promKndCd");
                
                $(this).find("span.opt").each(function(){
                    var getGoods = $(this);
                    var getGoodsNo = $(this).attr("goodsNo");
                    var getItemNo = $(this).attr("itemNo");
                    
                    var giftData = {
                            goodsNo : getGoodsNo,
                            itemNo : getItemNo,
                            crssPrstNo : promNo,
                            buyGetSctCd : 'G'  // buy, get군 구분코드 jwkim
                    };
                    
                    resultData.push(giftData);
                    strStatusData.push(giftData);
                });
            })

            if(resultData == null) {
                if($("#dupItemYn").val() == "Y" && $("#quickYn").val() == "Y") { // 옵션 상품이고 오늘드림일 경우 주소 선택 시 재고 체크 X : LJS
                    return;
                } else {
                    alert("죄송합니다. 고객센터에 문의해 주세요.");
                }
            } else {
                this.jsonParam =   {
                        opCartBaseList : resultData
                    };
            }
            
            // jwkim 일반배송으로 주문시에 선택한 주소지 정보로 주문서에 셋팅하게끔 하기위해서 해당값사용 
            $("input[name=mbrDlvpSeq]", $("#outItem")).val(mbrDlvpSeq);
            
            if($(".prd_gift_infoVer2").length > 0) {
            	this.jsonParam.quickGiftYn = "Y";
            	this.jsonParam.quickAeEvtNo = $(".prd_gift_infoVer2").data("evtno");
            }
            
            var strStatusParam =   {
            		mbrDlvpSeq : mbrDlvpSeq,
            		dupItemYn : $("#dupItemYn").val(),
            		opCartBaseList : strStatusData
            }
            goods.detail.todayDelivery.deliveryStrStatusOnPage(strStatusParam);
            
            if($("#dupItemYn").val() != "Y") {
            	this.jsonParam.mbrDlvpSeq = mbrDlvpSeq;
                goods.detail.todayDelivery.deliveryStrStockOnPage();
            } else {
                goods.detail.beforeSeq = mbrDlvpSeq; // 이전 선택 배송지 적재.
            }
            
        },
        
        deliveryStrStatusOnPage : function(strStatusParam){
            var url = _baseUrl + "goods/getStrStatusInfoAjax.do";
            
            $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(strStatusParam),
                contentType: "application/json;charset=UTF-8",
                dataType : 'json',
                async: false,
                cache: false,
                success: goods.detail.todayDelivery._callBackDeliveryStrStatusOnPage,
                error : function(e) {
                    console.log(e);
                    alert("죄송합니다. 고객센터에 문의해 주세요.");
                }
            });
        },
        _callBackDeliveryStrStatusOnPage : function(res){
            var data = (typeof res !== 'object') ? $.parseJSON(res) : res;
            
        	var o2oMeshYn = "";
        	var o2oHldyYn = "";
        	var o2oOnlYn = ""; // oy 중단 사유 코드 O2O_ONL_YN
        	var o2oStopReasonCd = ""; // oy 중단 사유 코드
        	var o2oStopReason = "";   // oy 중단 사유
        	
        	var oldAddrValidYn = data.oldAddrValidYn; // 구주소 체크
        	
        	var deliveryInfoMap = data.o2oQuickValidationMap;
        	
        	if(deliveryInfoMap != undefined && deliveryInfoMap != null) {
        		o2oMeshYn = deliveryInfoMap.O2O_MESH_YN;
        		o2oHldyYn = deliveryInfoMap.HLDY_YN;
        		o2oOnlYn = deliveryInfoMap.O2O_ONL_YN;
        		o2oStopReasonCd = deliveryInfoMap.STOP_REASON_CD;
        		o2oStopReason = deliveryInfoMap.STOP_REASON;
        	}
        	
        	if(oldAddrValidYn != undefined && oldAddrValidYn != null && oldAddrValidYn == "N") {
        		$(".btn_todayDV").addClass("error");
        		$(".btn_todayDV > dl").append('    <dd>해당 주소는 재검색이 필요해요. <span class=\'span_adr_modify span_adrModify\' data-seq=\''+$("input[name='mbrDlvpSeq']").val()+'\'>주소를 수정</span>해주세요.</dd>');
        		goods.detail.todayDelivery.adrModfyEvnt();
        		goods.detail.validation = 'N';
        		goods.detail.todayDelivery.pikcupOnlyShow();
        		
        	} else if(o2oOnlYn != undefined && o2oOnlYn != null && o2oOnlYn == "N") {
        		$(".btn_todayDV").addClass("error");
        		if(o2oStopReason != ""){
        			$(".btn_todayDV > dl").append('    <dd>' + o2oStopReason + '</dd>');
        		}else{
        			// 코드 잘못넣었을경우 방어코드
        			$(".btn_todayDV > dl").append('    <dd>' + '현재 일시적으로 서비스가 불가능해요' + '</dd>');
        		}
        		$("#quickAvalInvQty").val("999");
        		goods.detail.validation = 'N';
        		goods.detail.todayDelivery.pikcupOnlyShow();
        		
        	} else if((o2oMeshYn != undefined && o2oMeshYn != null && o2oMeshYn == "N") || 
            			(o2oHldyYn != undefined && o2oHldyYn != null && o2oHldyYn == "Y")) {
        		$(".btn_todayDV").addClass("error");
        		$(".btn_todayDV > dl").append('    <dd>현재 일시적으로 서비스가 불가능해요</dd>');
        		$("#quickAvalInvQty").val("999");
        		goods.detail.validation = 'N';
        		goods.detail.todayDelivery.pikcupOnlyShow();
        		
        	} else {
            	// 픽업바로가기 숨김
            	$("#pikcupOnlyYn").hide();
            	$("#pickupDirectYn").prop('checked', false);
            	$(".btn_todayDV").removeClass("error");
            	goods.detail.validation = 'Y';
            }
        },
        
        /** 퀵배송지 초기화 및 등록 **/
        registQuickMbrDlvpInfo : function(strNo, mbrDlvpSeq){
            var url = _baseUrl + "goods/registQuickMbrDlvpInfoAjax.do";
            var data ={strNo : strNo, mbrDlvpSeq : mbrDlvpSeq};
            common.Ajax.sendRequest("POST",url,data,goods.detail.todayDelivery._callBackRegistQuickMbrDlvpInfo);
        },
        
        // 오늘드림 고도화 2019-11-14 추가
        /** 퀵배송지 초기화 및 등록 (팝업 아닌 현재 페이지에서 진행)**/
        registQuickMbrDlvpInfoOnPage : function(mbrDlvpSeq, strNo){
            //배송지 목록 닫기
            $(".btn_todayDV").removeClass("on");
            $(".btn_todayDV").removeClass("soldout");	// 매장재고없음 클래스 삭제
            $(".todayDV_list").stop().slideUp('fast');
            
            if($("#dupItemYn").val() == "Y") {
                if(goods.detail.beforeSeq == mbrDlvpSeq) {
                    return;
                } else {
                    $("#option_list").html(""); //옵션상품의 경우 주소지 변경 시 선택 옵션 초기화
                    $(".prd_cnt_box").remove();
                    $(".prd_gift_box").remove();
                    $("#totalCnt").val("0");
                    $("#totalPrcTxt").text("0");
                }
                
                goods.detail.beforeSeq = mbrDlvpSeq; // 이전 선택 배송지 적재.
            }
            
            //  장바구니 개수 체크
            if ( !goods.detail.cart.checkCartCnt() && $("#dupItemYn").val() != "Y"){ //옵션 상품일 경우 체크 제외
                alert("상품을 선택해주세요.");
                return;
            }

            $(".btnSoldout").hide();    //일시품절 버튼
            $(".btnReStock").hide();    //재입고 알림신청 버튼
            $(".btnBasket").show();    //장바구니 버튼
            $(".btnBuy").show();    //구매하기 버튼
            
            var url = _baseUrl + "goods/registQuickMbrDlvpInfoAjax.do";
            var data ={strNo : strNo, mbrDlvpSeq : mbrDlvpSeq};
            common.Ajax.sendRequest("POST",url,data,goods.detail.todayDelivery._callBackRegistQuickMbrDlvpInfoOnPage);
        },
        
        /** 당일배송 매장 재고 확인 **/
        deliveryStrStock : function(){
            var url = _baseUrl + "goods/getTodayDeliveryStrStockAjax.do";
            
            $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(this.jsonParam),
                contentType: "application/json;charset=UTF-8",
                dataType : 'json',
                async: false,
                cache: false,
                success: goods.detail.todayDelivery._callBackDeliveryStrStock,
                error : function(e) {
                    console.log(e);
                    alert("죄송합니다. 고객센터에 문의해 주세요.");
                }
            });
        },
        
        // 오늘드림 고도화 2019-11-12 추가
        /** 당일배송 매장 재고 확인 **/
        // [START 재고 확인 후 팝업X, 현 페이지에서 메시지 노출 : utwon]
        deliveryStrStockOnPage : function(){
            var url = _baseUrl + "goods/getTodayDeliveryStrStockAjax.do";
            
            $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(this.jsonParam),
                contentType: "application/json;charset=UTF-8",
                dataType : 'json',
                async: false,
                cache: false,
                success: goods.detail.todayDelivery._callBackDeliveryStrStockOnPage,
                error : function(e) {
                    console.log(e);
                    alert("죄송합니다. 고객센터에 문의해 주세요.");
                }
            });
        },
        // [END 재고 확인 후 팝업X, 현 페이지에서 메시지 노출 : utwon]
        
        /** 재고부족 안내 닫기 **/
        outItemClose : function(){
            goods.detail.todayDelivery.layerClose();
            goods.detail.todayDelivery.todayDeliveryList();
        },
        
        
        /** 주문 가능 수량 안내 **/
        openOrderQty : function(ordPsbQty){
            $("#orderQty").find('.layer_desc2 span').html(ordPsbQty);
            $("#orderQty").css('z-index', '999');
            fnLayerSet("orderQty", "open");
        },
        
        /** 주문 가능 수량 변경 **/
        updatrOrderQty : function(){
            //  단품인 경우에면 가능수량 변경 가능..(옵션은 대상 제외..)
            if ( $("#dupItemYn").val() != 'Y' ){
                
                goods.detail.todayDelivery.layerClose();

                var goodsNo = $("#goodsNo").val();
                var itemNo = $("#itemNo").val();
                var optionKey = goodsNo + itemNo;
                var selObj = $("div.prd_cnt_box.item_" + optionKey);
                var promNo = selObj.attr("promNo");
                goods.detail.cart.changeMsg(optionKey,promNo,'Y'); //프로모션은 재선택이 필요함..초기화 처리

                //$("#cartCnt_"+optionKey).val($("#orderQty").find('.layer_desc2 span').html()); //수량변경
                
                /**************************************** 수량변경 로직 변경 ****************************************************/
                //  장바구니 구매수량 관련 Validation
                var cartCnt = $("#orderQty").find('.layer_desc2 span').html();
                var check = goods.detail.cart.cartCheck(cartCnt, optionKey);
                
                //  정상적으로 체크가 되었을 경우
                if ( check == 'Y'){
                    
                    //  감소된 값 세팅
                    $("#cartCnt_" + optionKey).val(cartCnt);
                    
                    //  화면에 노출된 옵션 하위상품의 개수가 1개 이상일 경우
                    //  여러개중에 선택한 값만 증가되고, 총 개수만 증가됨
                    var totalCnt = Number(cartCnt);
                    
                    //var totalPrc = Number($("#totalPrc").val()) - (Number(itemSalePrc) * Number(qtyAddUnit));
                    //$("#totalPrc").val(totalPrc);
                    
                    $("#totalCnt").val(totalCnt);
                    //$("#totalPrcTxt").text($.number(totalPrc));   
                    
                    // N+1 프로모션 안내 멘트 추가
                    goods.detail.cart.changeMsg(optionKey);
                }else{
                    //  비정상적으로 체크되었을 경우 아무동작하지 않도록 return
                    return;
                }
                /**************************************** 수량변경 로직 변경 끝 ****************************************************/
                
                //  수량 입력, 옵션 창이 열려 있다면
                var goodsOptInfo = "";
                
                //  옵션이 있는 상품이라면 
                if ( $("#dupItemYn").val() == 'Y' ){
                    goodsOptInfo = "multi";
                }else{
                    goodsOptInfo = "single";
                }
                
                //  장바구니 개수 체크
                if ( goods.detail.cart.checkCartCnt() ){
                    // get상품 선택 여부 체크
                    if(goods.detail.cart.checkGetItemSelect()){
                        goods.detail.cart.regCart(goodsOptInfo,"Y","NEW");
                    } else {
                        alert("추가상품을 선택해주세요.");
                    }
                }else{
                    alert("상품을 선택해주세요.");
                }
            } 
        },
        
        /* 일반배송으로 주문 함수 jwkim */
        deliveryOrderReg : function(){
            
            $("#deliveDay").attr("checked", false);
            $("#deliveNm").attr("checked", true);
            
            $(".liNormalDeli").removeClass("todayOff");
            $(".liQuickDeli").addClass("todayOff");
            
            $("input[name=selectDlvYn]", $("#outItem")).val("Y");
            // 일반배송, 오늘드림 여부에 따른 화면제어
            goods.detail.todayDelivery.dlvLayerOpen();
            
            // 재고부족 레이어팝업 닫음
            goods.detail.todayDelivery.layerClose();
            
            // 일반주문으로 배송함
            setTimeout(function(){
                goods.detail.bindBtnBuy();
            }, 500);
            
        },
//        // 오늘드림 고도화 2019-11-14 추가
//        openDeliveryList : function() {
//            $("#dlvr_list").show();
//            return false;
//        },
//        // 오늘드림 고도화 2019-11-14 추가   
//        closeDeliveryList : function() {
//            $("#dlvr_list").hide();
//            return false;
//        },
        
        /** 배송지 초기화 및 등록 **/
        _callBackRegistQuickMbrDlvpInfo : function(res){
            if(res != 'Y'){
                alert("죄송합니다. 고객센터에 문의해 주세요.");
            }
        },
        
        // 오늘드림 고도화 2019-11-14 추가
        /** 배송지 초기화 및 등록 (팝업 아닌 현재 페이지에서 진행, 배송지 등록 성공시 리스트 동기화) **/
        _callBackRegistQuickMbrDlvpInfoOnPage : function(res){
            if(res != 'Y'){
                alert("죄송합니다. 고객센터에 문의해 주세요.");
                return false;
            }else {
                goods.detail.todayDelivery.todayDeliveryListOnPage();
                fnLayerSet("todayRegDelivery", "close");
                return false;
            }
        },
        
        /** 당일 배송지 목록 콜백 **/
        _callBackTodayDeliveryList : function(res){
            var cDiv = $(res.trim());
            $("#todayDelivery").html(cDiv);
            goods.detail.todayDelivery.init();
            fnLayerSet("todayDelivery", "open");
        },
        
        /** 오늘드림 고도화 2019.11.08 배송지 목록 불러오기 콜백(페이지 상에 불러오기) 추가**/
        _callBackTodayDeliveryListOnPage : function(res) {
            var data = (typeof res !== 'object') ? $.parseJSON(res) : res;
            var addrHtml = "";
            var addrHtmlList = "";
            
            goods.detail.todayDelivery.init();
            
            $(".btn_todayDV > dl").empty();
            $(".todayDV_list > ul").empty();
            
            $("#quickAvalInvQty").val("0");
            
            if(data.todayDeliveryList.length > 0) {
                $(".btn_noDv").hide();
                $(".btn_todayDV").show();
                
                $.each(data.todayDeliveryList, function(index, item) {
                    if(item.baseDlvpYn != null && item.baseDlvpYn.indexOf('Y') > -1) {
                        goods.detail.baseStrNo = item.strNo;
                        goods.detail.baseMbrDlvpSeq = item.mbrDlvpSeq;
                    }
                    
                    var rmitPostNo = item.rmitPostNo != undefined && item.rmitPostNo != null ? item.rmitPostNo : "";
                    var emdNm = item.emdNm != undefined && item.emdNm != null ? item.emdNm : "";
                    var admrNm = item.admrNm != undefined && item.admrNm != null ? item.admrNm : "";
                    var postLen = rmitPostNo != undefined && rmitPostNo != null ? rmitPostNo.length : 0;
                    var todayDeliFlag = emdNm != "" && admrNm != "" && (postLen == 5) ? "Y" : "N";
                    if(item.quickYn != null && item.quickYn.indexOf('Y') > -1) {
                        $(".btn_todayDV > dl").append('    <dt class="dt_dlvp" data-strno="'+item.strNo+'"><span>' + item.dlvpNm + (item.baseDlvpYn != null && item.baseDlvpYn.indexOf('Y') > -1 ? '(기본)' : ' ') + '</span> ' + item.stnmRmitPostAddr + " "+ item.stnmRmitDtlAddr +'</dt>');
                        
                        if(item.strNo == null || item.strNo == 'NM' || todayDeliFlag == "N") {
                            $(".btn_todayDV").addClass("error");
                            $(".btn_todayDV > dl").append('    <dd>선택하신 배송지는 일반 배송지역이에요.</dd>');

                            goods.detail.validation = 'N';
                            goods.detail.todayDelivery.pikcupOnlyShow();
                            $("#orderStrNo").val("");
                            
                        } else {
                        	
                        	//mjhmmm
                        	//MJH
                        	$("input[name=mbrDlvpSeqColrChip]").val(item.mbrDlvpSeq);
							  
							goods.detail.optInfoListColrChip($("#previewInfo").val());
							goods.detail.todayDelivery.displayTodayDeliveryYnMessage(item.mbrDlvpSeq, item.strNo);
							  
							// 빠름 평균배송시간
							var dlvtmList = data.dlvtmList;
							var dlvtmLen = dlvtmList == undefined ? 0 : dlvtmList.length;
							  
							if(dlvtmLen > 0) {
								for(var i=0; i<dlvtmLen; i++) {
							  		var dlvtmObj = dlvtmList[i];
							  		var idx = i+1;
							  		
							  		if(dlvtmObj.rateRank == 1) {
							  			$(".quickUsrAddr").text(item.stnmRmitPostAddr);
							  			$(".span_maxDeliPer").text(dlvtmObj.avgOrdRate + "%");
							  			$(".span_dlvTitlNm").text(dlvtmObj.dlvTitlNm + " 내");
							  			$("#span_popDlvTitlNm").text(dlvtmObj.dlvDtlNm + " 내 도착");
							  	
							  			$(".divPer").removeClass("imp");
							  			$("#divPer" + idx).addClass("imp");
							  		}
							
							  		$("#dtlNm" + idx).text(dlvtmObj.dlvDtlNm);
							  		$("#divPer" + idx).html(dlvtmObj.avgOrdRate + "%");
								}
								$(".liQuickAI").show();
							}
                        }
                    }
                    
                    //리스트
                    if(item.strNo == null || item.strNo == 'NM' || todayDeliFlag == "N") {
                        addrHtmlList += '<li class="base">';
                    }else{
                        addrHtmlList += '<li>';
                    }
                    addrHtmlList += '    <a href="javascript:goods.detail.todayDelivery.registQuickMbrDlvpInfoOnPage(\''+item.mbrDlvpSeq+'\', \''+item.strNo+'\');">';
                    addrHtmlList += '        <dl>';
                    addrHtmlList += '            <dt><span>' + item.dlvpNm + '</span> ' + item.stnmRmitPostAddr + " " + item.stnmRmitDtlAddr + '</dt>';
                    if(item.strNo == null || item.strNo == 'NM' || todayDeliFlag == "N") {
                        addrHtmlList += '            <dd>일반 배송지역</dd>';
                    }else{
                        addrHtmlList += '            <dd>오늘드림 배송 가능 지역</dd>';
                    }
                    addrHtmlList += '        </dl>';
                    addrHtmlList += '    </a>';
                    addrHtmlList += '</li>';

                    
                });
                addrHtmlList += '<li class="btn_addDV"><a href="javascript:common.zipcodequick.pop.deliveryRegistFormOnlyRegist();">+ 배송지 추가</a></li>';
                $(".todayDV_list > ul").html(addrHtmlList);
                
            }else {
                $(".btn_noDv").show();
                $(".btn_todayDV").hide();
                
                goods.detail.validation = 'N';
            }
        },
        
        /** 배송지 등록 후 당일 배송지 선택 콜백 **/
        _callBackRegistTodayDeliverySelect : function(res){
            var data = (typeof res !== 'object') ? $.parseJSON(res) : res;
            if(data.todayDelivery.strNo == null || data.todayDelivery.strNo == ''){
                setTimeout(function() {
                    alert('오늘드림 서비스 지역이 아닙니다.');
                    return;
                }, 500);
            } else if(data.todayDelivery.hldyYn != null && data.todayDelivery.hldyYn == 'Y'){
                setTimeout(function() {
                    alert('오늘은 서비스가 불가능한 지역입니다.');
                    return;
                }, 500);
            } else {
                goods.detail.todayDelivery.registTodayDelivery(data.todayDelivery.strNo,data.todayDelivery.mbrDlvpSeq);
            }
        },
        // 오늘드림 고도화 2019-11-19 추가
        /** 배송지 등록 후 당일 배송지 선택 콜백 **/
        _callBackRegistTodayDeliverySelect2 : function(res){
            var data = (typeof res !== 'object') ? $.parseJSON(res) : res;
            goods.detail.todayDelivery.registQuickMbrDlvpInfoOnPage(data.todayDelivery.mbrDlvpSeq, data.todayDelivery.strNo);
        },
        
        /** 당일배송 매장 재고 확인 **/
        _callBackDeliveryStrStock : function(res){
            var data = (typeof res !== 'object') ? $.parseJSON(res) : res;
            var totalStkQty = 0;
            
            var tdsReturn = false; 
            
            var stockReturn = false;
            
            // 선택한 옵션상품 카운트 jwkim
            var goodsCnt = data.todayDeliveryStrStock.length;
            // 재고가 0인 모든 상품을  체크하기위한 카운트 jwkim
            var chkGoodsAllCnt = 0;
            // 본품 재고 채크 카운트 jwkim
            var chkGoodsCnt = 0;
            // 선택한 본품 수
            var goodsLng = 0;
            goodsLng = $(".prd_cnt_box").length;
            
            // [START 오늘드림 옵션상품 개선:jwkim]
            $.each(data.todayDeliveryStrStock, function (index, value) {
                var opKey = value.goodsNo + value.itemNo;
                
                if(value.stkQty == 0 && value.buyGetSctCd == "B"){
                    chkGoodsCnt++;
                }
                
                if(value.stkQty == 0){
                    chkGoodsAllCnt++;
                }
            });
            
            // 선택한 Get상품은 재고가 있으나 본품이 재고가 없는경우 일반배송 로직 jwkim 
            if(goodsLng == chkGoodsCnt && !$("input[name='pickupDirectYn']").is(":checked")){
                $("#outItem").css('z-index', '999');
                fnLayerSet("outItem", "open");
                
                return false;
            // 본품 및 선택한  모든 Get상품의 재고가 없는경우 일반배송 로직
            } else if(goodsCnt == chkGoodsAllCnt && !$("input[name='pickupDirectYn']").is(":checked")){
                $("#outItem").css('z-index', '999');
                fnLayerSet("outItem", "open");
                
                return false;
            } else {
                
                $.each(data.todayDeliveryStrStock, function (index, value) {
                    
                    var cartCnt = $("#cartCnt_"+value.goodsNo+value.itemNo).val();
                    
                    if(value.crssPrstNo != null && value.crssPrstNo != '' && chkGoodsCnt < 1){
                        var ordqty = $("div.prd_gift_box").find("#"+value.goodsNo+value.itemNo).attr('ordqty');
                        
                        if(ordqty > value.stkQty){
                            var goodsNm = $("div.prd_gift_box").find("#"+value.goodsNo+value.itemNo+" span").html();
                            
                            if(!tdsReturn){
                                alert('['+goodsNm+'] 상품 재고가 '+value.stkQty+'개 남았습니다. 재선택 바랍니다.');
                                stockReturn = true;
                            }
                             
                            return false;
                            
                        }
                        
                    } else {
                        //  옵션이 있는 상품이라면
                        
                        if ( $("#dupItemYn").val() == 'Y' && value.buyGetSctCd == "B"){
                            $('#itemLgcGoodsNo_'+value.lgcGoodsNo).parent().find("input[id^='quickItemInv_']").val(value.stkQty);
                                                        
                            // 20190312 추가 요건 오늘드림 옵션 상품이 존재하는 경우 
                            // ####### 부분주문이 가능한경우 상품 수량 셋팅 #######
                            // 매장 재고가 선택한 재고보다 작은경우 매장재고를 선택제고에 셋팅하는 로직 추가
                            // [START 오늘드림 옵션상품 개선:jwkim]
                            var optionKey = value.goodsNo+value.itemNo;
                            var prdWrap = $(".prd_cnt_box.item_"+optionKey);
                            var price = Number($("#itemSalePrc_"+optionKey).val().replace(/\,/g,''));
                            var totalCnt = $("#totalCnt").val();
                            
                            // 매장재고 0인경우
                            if(value.stkQty == 0){
                                
                                goods.detail.cart.deleteItem(optionKey, price);
                                
                                tdsReturn = true; 
                            // 선택한 수량보다 매장재고가 적은경우
                            } else if(cartCnt > value.stkQty){
                                var minuCnt = cartCnt - value.stkQty
                                
                                goods.detail.cart.prevVal(optionKey, price , minuCnt);
                                
                                tdsReturn = true; 
                            }
                            // [END 오늘드림 옵션상품 개선:jwkim]
                        } else if(value.buyGetSctCd != "G") {
                            $("#quickAvalInvQty").val(value.stkQty);
                        }
                        totalStkQty = totalStkQty+value.stkQty;
                    }
                    
                });
            }
            
            // 부분주문이 가능한경우 상품 수량 셋팅
            if(tdsReturn && !stockReturn){
                //alert("선택된 옵션의 재고가 충분하지 않아\n부분적으로 주문이 가능합니다.\n주문 가능한 수량을 자동 세팅하여\n이전 단계로 이동합니다");
                alert("선택한 상품의 재고가 충분하지 않아\n일부 수량만 주문이 가능합니다.\n주문 가능 수량으로 자동 설정됩니다.");
                
                // 옵션 경우 초기화할 옵션 정보 세로 셋팅
                $("div.prd_gift_box").each(function(){
                    var optionKey = $(this).attr("goodsNo") + $(this).attr("itemNo");
                    var promNo = $(this).attr("promNo");
                    var promKndCd = $(this).attr("promKndCd");
                    
                    goods.detail.cart.changeMsg(optionKey, promNo, "Y");
                    
                    if(promKndCd != "P203"){
                        goods.detail.cart.changeMsg(optionKey, promNo);
                    }
                    
                });
                
                return;
            } else if(stockReturn){
                return;
            }
            // [END 오늘드림 옵션상품 개선:jwkim]
            // as-is 로직 START
            /*$.each(data.todayDeliveryStrStock, function (index, value) {
                
                if(value.crssPrstNo != null && value.crssPrstNo != ''){
                    var ordqty = $("div.prd_gift_box").find("#"+value.goodsNo+value.itemNo).attr('ordqty');
                    
                    if(ordqty > value.stkQty){
                        var goodsNm = $("div.prd_gift_box").find("#"+value.goodsNo+value.itemNo+" span").html();
                        alert('['+goodsNm+'] 상품 재고가 '+value.stkQty+'개 남았습니다. 재선택 바랍니다.');
                        tdsReturn = true; 
                        return false;
                        
                    }
                    
                } else {
                    //  옵션이 있는 상품이라면 
                    if ( $("#dupItemYn").val() == 'Y' ){
                        $('#itemLgcGoodsNo_'+value.lgcGoodsNo).parent().find("input[id^='quickItemInv_']").val(value.stkQty);
                    } else {
                        $("#quickAvalInvQty").val(value.stkQty);
                    }
                    totalStkQty = totalStkQty+value.stkQty;
                }
                
            });
            
            if(tdsReturn){
                return;
            }
            
            if(totalStkQty == 0){
                $("#outItem").css('z-index', '999');
                fnLayerSet("outItem", "open");
                return;
            }*/
            // as-is 로직 END
            
            //  수량 입력, 옵션 창이 열려 있다면
            var goodsOptInfo = "";
            
            //  옵션이 있는 상품이라면 
            if ( $("#dupItemYn").val() == 'Y' ){
                goodsOptInfo = "multi";
            }else{
                goodsOptInfo = "single";
            }
            
            goods.detail.todayDelivery.buyClickYn = 'Y';
            
            //  장바구니 개수 체크
            if ( goods.detail.cart.checkCartCnt() ){
                // get상품 선택 여부 체크
                if(goods.detail.cart.checkGetItemSelect()){
                    goods.detail.cart.regCart(goodsOptInfo,"Y","NEW");
                } else {
                    alert("추가상품을 선택해주세요.");
                }
            }else{
                alert("상품을 선택해주세요.");
            }
            
        },
        
        // 오늘드림 고도화 2019-11-12 추가
        /** 당일배송 매장 재고 확인 **/
        // [START 재고 확인 후 팝업X, 현 페이지에서 메시지 노출 : utwon]
        _callBackDeliveryStrStockOnPage : function(res){
            var data = (typeof res !== 'object') ? $.parseJSON(res) : res;
            var totalStkQty = 0;
            
            var tdsReturn = false; 
            
            var stockReturn = false;
            
            // 선택한 옵션상품 카운트 jwkim
            var goodsCnt = data.todayDeliveryStrStock.length;
            // 재고가 0인 모든 상품을  체크하기위한 카운트 jwkim
            var chkGoodsAllCnt = 0;
            // 본품 재고 채크 카운트 jwkim
            var chkGoodsCnt = 0;
            // 선택한 본품 수
            var goodsLng = 0;
            goodsLng = $(".prd_cnt_box").length;
            
            // [START 오늘드림 옵션상품 개선:jwkim]
            $.each(data.todayDeliveryStrStock, function (index, value) {
                var opKey = value.goodsNo + value.itemNo;
                
                if(value.stkQty == 0 && value.buyGetSctCd == "B"){
                    chkGoodsCnt++;
                }
                
                if(value.stkQty == 0){
                    chkGoodsAllCnt++;
                }
            });
            
            var orderStrNo = data.orderStrNo != undefined && data.orderStrNo != null ? data.orderStrNo.strNo : "";
            $("#orderStrNo").val(orderStrNo);
            
            if(orderStrNo != "") {
            	var giftStockList = data.giftStockList;
            	goods.detail.todayDelivery.quickGiftStockInfo(giftStockList);
            }
            
            // 선택한 Get상품은 재고가 있으나 본품이 재고가 없는경우 일반배송 로직 jwkim 
            if(goodsLng == chkGoodsCnt){
                /*$("#outItem").css('z-index', '999');
                fnLayerSet("outItem", "open");*/
                
                // 2019-11-12
                /*$message.html("현재 오늘 드림으로 받으실 수 있는 상품 재고가 매장에 부족합니다.");
                $message.show();*/
                
                // 2019-11-12
//                $("#delivery_list > div#message").append('<span>현재 오늘 드림으로 받으실 수 있는 상품 재고가 매장에 부족합니다.</span>');
                
                $(".btn_todayDV > dl > dd").remove();
                $(".btn_todayDV").addClass("error");
                $(".btn_todayDV").addClass("soldout");
                $(".btn_todayDV > dl").append('    <dd>현재 매장에 오늘드림 상품 재고가 부족해요</dd>');
                
                $(".btnSoldout").show();    //일시품절 버튼
                $(".btnReStock").show();    //재입고 알림신청 버튼
                $(".btnReStock").attr('data-attr', "상품상세^오늘드림재입고알림신청^"+$("#goodsNm").val()+"_클릭");
                $(".btnBasket").hide();    //장바구니 버튼
                $(".btnBuy").hide();    //구매하기 버튼
                $("#pikcupOnlyYn").hide();    //픽업바로가기 숨김
                
                goods.detail.validation = 'N';
                
                return false;
            // 본품 및 선택한  모든 Get상품의 재고가 없는경우 일반배송 로직
            } else if(goodsCnt == chkGoodsAllCnt){
                /*$("#outItem").css('z-index', '999');
                fnLayerSet("outItem", "open");*/
                
                // 2019-11-12
                /*$message.html("현재 오늘 드림으로 받으실 수 있는 상품 재고가 매장에 부족합니다.");
                $message.show();*/
                
                // 2019-11-12
//                $("#delivery_list > div#message").append('<span>현재 오늘 드림으로 받으실 수 있는 상품 재고가 매장에 부족합니다.</span>');
                
                $(".btn_todayDV > dl > dd").remove();
                $(".btn_todayDV").addClass("error");
                $(".btn_todayDV").addClass("soldout");
                $(".btn_todayDV > dl").append('    <dd>현재 매장에 오늘드림 상품 재고가 부족해요</dd>');
                
                $(".btnSoldout").show();    //일시품절 버튼
                $(".btnReStock").show();    //재입고 알림신청 버튼
                $(".btnReStock").attr('data-attr', "상품상세^오늘드림재입고알림신청^"+$("#goodsNm").val()+"_클릭");
                $(".btnBasket").hide();    //장바구니 버튼
                $(".btnBuy").hide();    //구매하기 버튼
                $("#pikcupOnlyYn").hide();    //픽업바로가기 숨김

                goods.detail.validation = 'N';
                
                return false;
            } else {
                
                $.each(data.todayDeliveryStrStock, function (index, value) {
                    
                    var cartCnt = $("#cartCnt_"+value.goodsNo+value.itemNo).val();
                    
                    if(value.crssPrstNo != null && value.crssPrstNo != '' && chkGoodsCnt < 1){
                        var ordqty = $("div.prd_gift_box").find("#"+value.goodsNo+value.itemNo).attr('ordqty');
                        
                        if(ordqty > value.stkQty){
                            var goodsNm = $("div.prd_gift_box").find("#"+value.goodsNo+value.itemNo+" span").html();
                            
                            if(!tdsReturn){
                                alert('['+goodsNm+'] 상품 재고가 '+value.stkQty+'개 남았습니다. 재선택 바랍니다.');
                                var optionKey = value.goodsNo+value.itemNo;
                                goods.detail.cart.changeMsg(optionKey, promNo, "Y");
                                //stockReturn = true;
                            }
                            
                            // 2019-11-12
//                            $("#delivery_list > div#message").append('<span>현재 오늘 드림으로 받으실 수 있는 상품 재고가 매장에 부족합니다.</span>');
                            //$(".btn_todayDV > dl > dd").remove();
                            //$(".btn_todayDV").addClass("error");
                            //$(".btn_todayDV > dl").append('    <dd>현재 매장에 오늘드림 상품 재고가 부족해요</dd>');
                            
                            //$(".btnSoldout").show();    //일시품절 버튼
                            //$(".btnReStock").show();    //재입고 알림신청 버튼
                            //$(".btnBasket").hide();    //장바구니 버튼
                            //$(".btnBuy").hide();    //구매하기 버튼

                            //goods.detail.validation = 'N';
                            /*$("#delivery_list > div#message").append('<span>정상적으로 이용 가능하십니다.</span>');*/
                             
                            return false;
                            
                        } 
                        
                        $("#quickAvalInvQty").val(value.stkQty);
                    } else {
                        //  옵션이 있는 상품이라면
                        
                        if ( $("#dupItemYn").val() == 'Y' && value.buyGetSctCd == "B"){
                            $('#itemLgcGoodsNo_'+value.lgcGoodsNo).parent().find("input[id^='quickItemInv_']").val(value.stkQty);
                                                        
                            // 20190312 추가 요건 오늘드림 옵션 상품이 존재하는 경우 
                            // ####### 부분주문이 가능한경우 상품 수량 셋팅 #######
                            // 매장 재고가 선택한 재고보다 작은경우 매장재고를 선택제고에 셋팅하는 로직 추가
                            // [START 오늘드림 옵션상품 개선:jwkim]
                            var optionKey = value.goodsNo+value.itemNo;
                            var prdWrap = $(".prd_cnt_box.item_"+optionKey);
                            var price = Number($("#itemSalePrc_"+optionKey).val().replace(/\,/g,''));
                            var totalCnt = $("#totalCnt").val();
                            
                            // 매장재고 0인경우
                            if(value.stkQty == 0){
                                goods.detail.cart.deleteItem(optionKey, price);
                                
                                tdsReturn = true; 
                                
                            // 선택한 수량보다 매장재고가 적은경우
                            } else if(cartCnt > value.stkQty){
                                var minuCnt = cartCnt - value.stkQty
                                
                                goods.detail.cart.prevVal(optionKey, price , minuCnt);
                                
                                tdsReturn = true; 
                                
                            }
                            // [END 오늘드림 옵션상품 개선:jwkim]
                        } else if(value.buyGetSctCd != "G") {
                            $("#quickAvalInvQty").val(value.stkQty);
                        }
                        totalStkQty = totalStkQty+value.stkQty;
                    }
                    
                });
            }
            
            // 부분주문이 가능한경우 상품 수량 셋팅
            if(tdsReturn && !stockReturn){
                //alert("선택된 옵션의 재고가 충분하지 않아\n부분적으로 주문이 가능합니다.\n주문 가능한 수량을 자동 세팅하여\n이전 단계로 이동합니다");
                alert("선택한 상품의 재고가 충분하지 않아\n일부 수량만 주문이 가능합니다.\n주문 가능 수량으로 자동 설정됩니다.");
                
                // 옵션 경우 초기화할 옵션 정보 세로 셋팅
                $("div.prd_gift_box").each(function(){
                    var optionKey = $(this).attr("goodsNo") + $(this).attr("itemNo");
                    var promNo = $(this).attr("promNo");
                    var promKndCd = $(this).attr("promKndCd");
                    
                    goods.detail.cart.changeMsg(optionKey, promNo, "Y");
                    
                    if(promKndCd != "P203"){
                        goods.detail.cart.changeMsg(optionKey, promNo);
                    }
                    
                });
                
                // 2019-11-12
//                $("#delivery_list > div#message").append('<span>정상적으로 이용 가능하십니다.</span>');
                goods.detail.validation = 'Y';
                
                return;
            } else if(stockReturn){
                
                // 2019-11-12
//                $("#delivery_list > div#message").append('<span>현재 오늘 드림으로 받으실 수 있는 상품 재고가 매장에 부족합니다.</span>');
                $(".btn_todayDV > dl > dd").remove();
                $(".btn_todayDV").addClass("error");
                $(".btn_todayDV").addClass("soldout");
                $(".btn_todayDV > dl").append('    <dd>현재 매장에 오늘드림 상품 재고가 부족해요</dd>');
                
                $(".btnSoldout").show();    //일시품절 버튼
                $(".btnReStock").show();    //재입고 알림신청 버튼
                $(".btnReStock").attr('data-attr', "상품상세^오늘드림재입고알림신청^"+$("#goodsNm").val()+"_클릭");
                $(".btnBasket").hide();    //장바구니 버튼
                $(".btnBuy").hide();    //구매하기 버튼
                $("#pikcupOnlyYn").hide();    //픽업바로가기 숨김
                
                goods.detail.validation = 'N';
                /*$("#delivery_list > div#message").append('<span>정상적으로 이용 가능하십니다.</span>');*/
                
                return;
            } else {
                if($("#soldOutYn").val() == 'Y') {
                    $(".btnSoldout").hide();    //일시품절 버튼
                    $(".btnReStock").hide();    //재입고 알림신청 버튼
                    $(".btnBasket").show();    //장바구니 버튼
                    $(".btnBuy").show();    //구매하기 버튼
                }
            }
            
            // [END 오늘드림 옵션상품 개선:jwkim]
            // as-is 로직 START
            /*$.each(data.todayDeliveryStrStock, function (index, value) {
                
                if(value.crssPrstNo != null && value.crssPrstNo != ''){
                    var ordqty = $("div.prd_gift_box").find("#"+value.goodsNo+value.itemNo).attr('ordqty');
                    
                    if(ordqty > value.stkQty){
                        var goodsNm = $("div.prd_gift_box").find("#"+value.goodsNo+value.itemNo+" span").html();
                        alert('['+goodsNm+'] 상품 재고가 '+value.stkQty+'개 남았습니다. 재선택 바랍니다.');
                        tdsReturn = true; 
                        return false;
                        
                    }
                    
                } else {
                    //  옵션이 있는 상품이라면 
                    if ( $("#dupItemYn").val() == 'Y' ){
                        $('#itemLgcGoodsNo_'+value.lgcGoodsNo).parent().find("input[id^='quickItemInv_']").val(value.stkQty);
                    } else {
                        $("#quickAvalInvQty").val(value.stkQty);
                    }
                    totalStkQty = totalStkQty+value.stkQty;
                }
                
            });
            
            if(tdsReturn){
                return;
            }
            
            if(totalStkQty == 0){
                $("#outItem").css('z-index', '999');
                fnLayerSet("outItem", "open");
                return;
            }*/
            // as-is 로직 END
            
            //  수량 입력, 옵션 창이 열려 있다면
            var goodsOptInfo = "";
            
            //  옵션이 있는 상품이라면 
            if ( $("#dupItemYn").val() == 'Y' ){
                goodsOptInfo = "multi";
            }else{
                goodsOptInfo = "single";
            }
            
            /*goods.detail.todayDelivery.buyClickYn = 'Y';*/
            
            //  장바구니 개수 체크
            if ( goods.detail.cart.checkCartCnt() ){
                // get상품 선택 여부 체크
                if(goods.detail.cart.checkGetItemSelect()){
                    /*goods.detail.cart.regCart(goodsOptInfo,"Y","NEW");*/
                    
                    // 2019-11-12
//                    $("#delivery_list > div#message").append('<span>정상적으로 이용 가능하십니다.</span>');
                    //goods.detail.validation = 'Y';
                    return false;
                    
                } else {
                    alert("추가상품을 선택해주세요.");
                }
            }else{
                alert("상품을 선택해주세요.");
            }
            
            
            
        },
        // [END 재고 확인 후 팝업X, 현 페이지에서 메시지 노출 : utwon]
        /** 2020.01.10 :: JSLEE 오늘드림 상품 상세 수정 **/
        /** 오늘드림 주소지 수정 호출**/
        adrModfyEvnt : function() {
            $(".span_adrModify").click(function(event) {
               event.preventDefault();
               
               goods.detail.beforeSeq = '';
               
               if($(".btn_todayDV").hasClass("on")) {
                   $(".btn_todayDV").removeClass("on");
                   $(".todayDV_list").hide();
               }
               
               goods.detail.todayDelivery.deliveryModifyListPop();
            });
        },
        /** 오늘드림 주소지 목록 팝업 호출**/
        deliveryModifyListPop : function() {
           if (!common.loginChk()) {
               return ;
           }
           
           var url = _baseUrl + "goods/getTodayDeliveryListMdfyPop.do";
           common.Ajax.sendRequest("POST",url, null, goods.detail.todayDelivery._callBackDeliveryModifyPage)
        },
        /** 오늘드림 주소지 팝업 콜백 **/
        _callBackDeliveryModifyPage : function(data) {
            $("#layerWrap850").html(data);
            setLayerHeight('layerWrap850');
            if($('.dimm').length > 1){
                $('.dimm:nth(1)').remove();
            }
        },
        /** 오늘드림 주소지 목록 팝업 : 수정 페이지 이동 **/
        deliveryModifyPop : function(obj) {
            var mbrDlvpSeq = $(obj).parents("td:eq(0)").data("mbrDlvpSeq");
            goods.detail.modifySeq = mbrDlvpSeq;
            
            fnLayerSet('layerWrap850', 'close');
            common.zipcodequick.pop.deliveryModifyFormOnlyRegist(mbrDlvpSeq);
        },
        /** 오늘드림 주소지 목록 팝업 : 선택 버튼 클릭 이벤트 **/
        deliverySelectPop : function(obj) {
            var mbrDlvpSeq = $(obj).parents("td:eq(0)").data("mbrDlvpSeq");
            goods.detail.modifySeq = mbrDlvpSeq;
            
            fnLayerSet('layerWrap850', 'close');
            goods.detail.todayDelivery.registTodayDeliverySelect2();
        },
        /** 오늘드림 주소지 목록 팝업 : 기본 배송지 설정 **/
        registBaseDelivery : function(obj) {
            if (!common.loginChk()) {
                return;
            }
            
            var data = $(obj).parents("td:eq(0)").data();
            var mbrDlvpSeq = $(obj).parents("td:eq(0)").data("mbrDlvpSeq");
            goods.detail.modifySeq = mbrDlvpSeq;
            
            _ajax.sendJSONRequest('GET'
                    ,_baseUrl + 'mypage/registBaseDeliveryJSON.do'
                    ,data
                    ,goods.detail.todayDelivery.registBaseDeliveryCallback
                    ,false
            );
        },
        /** 오늘드림 주소지 목록 팝업 : 기본 배송지 설정 콜백 **/
        registBaseDeliveryCallback : function(res) {
            var data = (typeof res !== 'object') ? $.parseJSON(res) : res;
            data.succeeded && alert(data.message);
            
            fnLayerSet('layerWrap850', 'close');
            goods.detail.todayDelivery.registTodayDeliverySelect2();
        },
        openTodayDeliveryStockAlarmPop : function(goodsNo, itemNo, lgcGoodsNo) {
            var deliveryStrNo = $(".dt_dlvp").data("strno");
            var isAvailbleStore = true;	//매장취급여부
            
            if(deliveryStrNo == undefined || deliveryStrNo == "" || deliveryStrNo == null || deliveryStrNo == "NM") {
                alert("매장 재입고 신청이 불가능한 배송지입니다. 다른 배송지를 선택해 주세요.");
                return;
            }
            
            //[3354738] 상품 상세 재입고 알람 신청시  매장취급여부 판단 |2020.09.15 | by jp1020
            if(lgcGoodsNo != undefined || lgcGoodsNo != "" || lgcGoodsNo != null) {
            	isAvailbleStore = goods.detail.offstore.getAvailableStore(deliveryStrNo, lgcGoodsNo);
            	console.log("isAvailbleStore Result : " + isAvailbleStore);
            }
            
            if(!isAvailbleStore){
            	alert("해당 상품 미운영 매장입니다.");
            	return;
            }
            
            //오프라인 매장 재고 입고 알림
            common.openStockOffStoreAlimPop(goodsNo,itemNo, deliveryStrNo);
        },
        todayDeliveryChange : function() {
            goods.detail.todayDelivery.layerClose();
            $('.btn_todayDV').click();
        },
        soldOutControl : function(quickYn) {
            var btnArea = $(".option_cnt_box");
            var plus = btnArea.find(".plus");
            var minus = btnArea.find(".minus");
            var cnt = btnArea.find(".tx_num");
            
            var key = btnArea.data("key");
            var dupNPrc = btnArea.data("dupnprc");
            var qtyAddUnit = btnArea.data("qty");
            
            if(quickYn == "Y") {
                plus.attr("onClick", "javascript:goods.detail.cart.nextVal('"+key+"', '"+dupNPrc+"', '"+qtyAddUnit+"');");
                minus.attr("onClick", "javascript:goods.detail.cart.prevVal('"+key+"', '"+dupNPrc+"', '"+qtyAddUnit+"');");
                cnt.attr("disabled", false);
                $(".prd_cnt_box").removeClass("disabled");
            } else {
                plus.attr("onClick", "javascript:;");
                minus.attr("onClick", "javascript:;");
                cnt.attr("disabled", true).val("1");   
                $(".prd_cnt_box").addClass("disabled");
            }
        },
        deliveryCharge : function() {
           var totalPrcTxt = Number($("#totalPrcTxt").text().replace(/,/g, ""));
           
           if(totalPrcTxt >= Number(dlexFvrStdAmt)) {
               $("#span_deliCharge").text("무료배송");
           } else {
               var html = '<a href=\'javascript:goods.detail.todayDelivery.openQuickPop("question");\' data-rel=\'layer\' data-target=\'infoTodayDeliveryQuestion\'>배송옵션</a>에 따라 '
                        + quickDlexTxt;
               $("#span_deliCharge").html(html);
           }
        },
        /** 오늘드림 빠름 배송시간**/
        quickBaseAddrInfo : function() {
        	var baseAddrInfo = $(".span_baseAddrInfo");
            if(baseAddrInfo.length > 0) {
            	var titlAvgOrdRate = baseAddrInfo.eq(0).find(".span_baseAvgOrdRate").text();
            	
            	if(titlAvgOrdRate != undefined && titlAvgOrdRate != null && titlAvgOrdRate != "") {
            		for(var i=0; i<baseAddrInfo.length; i++) {
            			var dlvtmObj = baseAddrInfo.eq(i);
            			var stnmRmitPostAddr = dlvtmObj.find(".span_baseStnmRmitPostAddr").text();
            			var avgOrdRate = dlvtmObj.find(".span_baseAvgOrdRate").text();
            			var dlvTitlNm = dlvtmObj.find(".span_baseDlvTitlNm").text();
            			var dlvDtlNm = dlvtmObj.find(".span_baseDlvDtlNm").text();
            			var rateRank = dlvtmObj.find(".span_baseRateRank").text();
            			var idx = i+1;
            			
            			if(rateRank == "1") {
            				$(".quickUsrAddr").text(stnmRmitPostAddr);
            				$(".span_maxDeliPer").text(avgOrdRate + "%");
            				$(".span_dlvTitlNm").text(dlvTitlNm + " 내");
            				$("#span_popDlvTitlNm").text(dlvDtlNm + " 내 도착");
            				
                			$(".divPer").removeClass("imp");
                			$("#divPer" + idx).addClass("imp");
            			}
            			
            			$("#dtlNm" + idx).text(dlvDtlNm);
            			$("#divPer" + idx).html(avgOrdRate + "%");
            		}
            		
            		$(".liQuickAI").show();
            	} else {
            		$(".liQuickAI").hide();
            	}
            } else {
            	$(".liQuickAI").hide();
            }
        },
        /** 오늘드림 넛지 **/
        quickNudge : function() {

            // 특정 시간 대 넛지 비표시 설정
        	var dt = new Date();
            var fromQuickDiableDate = new Date("2022", "09"-1, "8", "20", "00", "00");
            var toQuickDiableDate =   new Date("2022", "09"-1, "11", "20", "00", "00");
            
            if(dt > fromQuickDiableDate && dt < toQuickDiableDate){
                return;
            }
            
        	if(quickAddrYn == "Y") {
        		goods.detail.interval = setInterval(function() {
        			var cookie = new Cookie();
        			var hideCookie = cookie.get("todayNudgeHideFO");
        			
        			if(hideCookie == "Y") {
        				clearInterval(goods.detail.interval);
        				return;
        			}
        			
        			var sysDate = new Date();
	        		var to_hours = sysDate.getHours() + "";
	        		var to_minutes = sysDate.getMinutes() + "";
	        		var to_seconds = sysDate.getSeconds() + "";
	        		
	        		if(to_minutes < 10) {
	        			to_minutes = "0" + to_minutes;
	        		}
	        		
	        		if(to_seconds < 10) {
	        			to_seconds = "0" + to_seconds;
	        		}
	        		
	        		var to_time = Number(to_hours + to_minutes + to_seconds);
	        		
	        		var sectLen = timeSectList == null || timeSectList == undefined ? 0 : timeSectList.length;
	        		
	        		if(sectLen > 0) {
	        			var showFlag = false;
	        			for(var i=0; i<sectLen; i++) {
	        				var obj = timeSectList[i];
	        				var timeSect = obj.mrkNm;
	        				var fromTime = Number(timeSect.split("/")[0]);
	        				var toTime = Number(timeSect.split("/")[1]);
	        				var timeMsg = obj.timeMsg;
	        				var countHour = obj.countHour;
	        				
	        				if(to_time >= fromTime && to_time <= toTime) {
	        					showFlag = true;
	        					if(countHour != "") {
	        						goods.detail.todayDelivery.setTime(sysDate, countHour, timeMsg);
	        					} else {
	        						if(timeMsg != "") {
	        							$("#quickNudge").html(timeMsg);
	        						} else {
	        							showFlag = false;
	        						}
	        					}
	        				}
	        			}
	        			
        				if(showFlag) {
        					setTimeout(function() {
        						if(!$(".prd_option_box").hasClass("open")) {
        							//$("#deliveNudge:not(.nudge_hide)").animate({top:"-38px"}, "fast").addClass("nudge_show").show();
        							$("#deliveNudge:not(.nudge_hide)").animate("fast").addClass("nudge_show").show();
        						}
        					}, 2000);
        					
        					setTimeout(function() {
        						$("#deliveNudge").fadeOut(400, function() {
        							$("#deliveNudge").remove();
        							clearInterval(goods.detail.interval);
        						});
        					}, 5000);
        				} else {
        					$("#deliveNudge").removeClass("nudge_show").fadeOut();
        				}
	        		}
        		}, 1000);
        		
        		$("#btn_nudgeHide").click(function(event) {
        			event.preventDefault();
        			
        			var nudgeCookie = new Cookie(1);
        			nudgeCookie.set("todayNudgeHideFO", "Y");
        			
        			$("#deliveNudge").fadeOut(400, function() {
						$("#deliveNudge").remove();
						clearInterval(goods.detail.interval);
					});
        			
        		});
        	}
        },
        setTime : function(sysDate, countHour, timeMsg) {
			var year = sysDate.getFullYear();
    		var month = sysDate.getMonth() + 1;
    		
    		if(month < 10) {
    			month = "0" + month;
    		}
    		
    		var day = sysDate.getDate();
    		
    		var _second = 1000;
    		var _minute = _second * 60;
    		var _hour = _minute * 60;
    		var _day = _hour * 24;
    		
        	var countDate = new Date(year + "/" + month + "/" +day + " " + countHour +":00:00");
    		var distance = countDate - sysDate;
    		
    		var minutes = Math.floor((distance % _hour) / _minute);
    		var seconds = Math.floor((distance % _minute) / _second);
    		
    		var hourmsg = "<strong class=\"impY\">";
    		if(minutes > 0) {
				hourmsg += "<span>" + minutes + "</span>" + "분 ";
			}
    		
    		hourmsg += "<span>" + seconds + "</span>" + "초</strong>";
    		
    		timeMsg = timeMsg.replace("*", hourmsg);
    		
    		$("#quickNudge").html(timeMsg);
        },
        quickGiftStockInfo : function(giftStockList) {
        	var giftStockLen = giftStockList != undefined && giftStockList != null ? giftStockList.length : 0;
        	var vQuickMoreCnt = Number($("#h_quickGift_count").val()); //오늗드림 더보기 카운트
        	var vH_first_quickGift= $("#h_first_quickGift").val();        	
        	if(giftStockLen > 0) {
        		for(var i=0; i<giftStockLen; i++) {
        			var obj = giftStockList[i];
       			
        			
    				if(Number(obj.stockQty) <= 0) {        					
    					$("#quickgift_1_" + obj.gftCd).addClass("soldout");
    					$("#quickgift_2_" + obj.gftCd).text("[오늘드림/소진 완료]");
    					$("#quickgift_3_" + obj.gftCd).addClass("soldout");
    					$("#quickgift_4_" + obj.gftCd).text("[오늘드림/소진 완료]");
    					$("#quickgift_5_" + obj.gftCd).addClass("soldout");
        				
        				vQuickMoreCnt = vQuickMoreCnt -1;
    				} else {        					
    					$("#quickgift_1_" + obj.gftCd).removeClass("soldout");
    					$("#quickgift_2_" + obj.gftCd).text("[오늘드림]");
    					$("#quickgift_3_" + obj.gftCd).removeClass("soldout");
    					$("#quickgift_4_" + obj.gftCd).text("[오늘드림]");
    					$("#quickgift_5_" + obj.gftCd).removeClass("soldout");    
    				}
        			
        		}
        	}
        	
        	if(vQuickMoreCnt -1 >= 1){ 
        		$("#quickGift_more").text("+"+(vQuickMoreCnt-1)+"개 더보기");
        	}else{
        		$("#quickGift_more").text("더보기");
        	}
        },
        
        pikcupOnlyShow : function() {
        	// 2021 추석 연휴 9/19 20:00 ~ 9/22 20:00 오늘드림 제한
            var deliveryStopDate = common.popLayer.todayDelivery.deliveryStopDate;
            var dt = new Date();
            var fromQuickDiableDate = new Date(deliveryStopDate.startYear, deliveryStopDate.startMonth,
                deliveryStopDate.startDate, deliveryStopDate.startHours, deliveryStopDate.startMinutes); //추후 제한 조건을 설정할 부분(날짜)
            var toQuickDiableDate = new Date(deliveryStopDate.endYear, deliveryStopDate.endMonth,
                deliveryStopDate.endDate, deliveryStopDate.endHours, deliveryStopDate.endMinutes); //추후 제한 조건을 설정할 부분(날짜)

            if(dt > fromQuickDiableDate && dt < toQuickDiableDate){
                return;
            }
            $("#pikcupOnlyYn").show();

        	setTimeout(function() {
        		$("#storePickNudge").show();
			}, 5000);
			
			setTimeout(function() {
				$("#storePickNudge").hide();
			}, 8000);
        }
        
        
};


//레이어 팝업 공통(열기, 닫기) 퍼블리싱 YCH 20200615 추가 상단에서 열리는 레이어 낮게 조정
var fnLayerSetMidle = function(layer, status){ //layer : 레이어 아이디 , status : open/close
    var _obj = $('#'+ layer);
    if(status == 'open'){
           
        _obj.show();
        
        var popPos = 0;
        var popWid = parseInt(_obj.width(), 10)/2;
        var popHgt = parseInt(_obj.height(), 10);
        
        
        if(popHgt == 0 && _obj.find('.popup-contents').length > 0){
            popHgt = _obj.find('.popup-contents').height();
        }
                
        popPos = parseInt($(window).scrollTop(), 10) + ((parseInt($(window).height(), 10) - popHgt)/2) ;
        
        if(popHgt > $(window).height()){
            popPos = parseInt($(window).scrollTop(), 10);
        }
       
        if(layer=='passwdLayer'||layer=='lockLayer'){
            popPos2 = _obj.height()/2;
            //_obj.css({'left':'50%' , 'margin-left':-(popWid) , 'top':'50%' , 'margin-top':-(popPos)}).show()
            _obj.css({'left':'50%' , 'margin-left':-(popWid) +'px' , 'top':'50%', 'margin-top':-(popPos2) +'px'});
            $('body').append('<div id="dim"></div>');
        }else{
            var popHgt = _obj.height();
            //_obj.removeClass('hide').css({'margin-top': -_obj.height()/2 +'px'});
            _obj.removeClass('hide');
            popHgt = parseInt(_obj.height(), 10);
            popWid = parseInt(_obj.width(), 10)/2;
            popPos = parseInt($(window).scrollTop(), 10) + ((parseInt($(window).height(), 10) - popHgt)/2) ;
            if(popPos<0){
            	popPos=10;
            }
             
            _obj.css({'left':'50%' , 'margin-left':-(popWid) +'px' , 'top': (popPos) +'px'});
            $('body').append('<div class="dimm" style="\z-index:990;\"></div>');
            console.log(popPos, popHgt);
        }
        
    }else if(status == 'close'){
        if(common.zipcodequick.pop.quickYn == 'Y'){
            _obj.hide();
            _obj.addClass('hide');
            _obj.html("");
            if(layer=='passwdLayer'||layer=='lockLayer'){
                $('#dim').remove();
                $('#layer_pop_wrap').css('top','');
                $('#layer_pop_wrap').css('margin-left','');
                $('#layer_pop_wrap').css('margin-top','');
                $('body').append('<div class="dimm" style="\z-index:990;\"></div>');
            }else{
                $('.dimm').remove();
                $('#layer_pop_wrap').css('top','');
                $('#layer_pop_wrap').css('margin-left','');
                $('#layer_pop_wrap').css('margin-top','');
                $('body').append('<div class="dimm" style="\z-index:990;\"></div>');
            }
        } else {
            _obj.hide();
            _obj.addClass('hide');
            _obj.html("");
            if(layer=='passwdLayer'||layer=='lockLayer'){ 
                $('#dim').remove();
                $('#layer_pop_wrap').css('top','');
                $('#layer_pop_wrap').css('margin-left','');
                $('#layer_pop_wrap').css('margin-top','');
            }else{
                $('.dimm').remove();
                $('#layer_pop_wrap').css('top','');
                $('#layer_pop_wrap').css('margin-left','');
                $('#layer_pop_wrap').css('margin-top','');
            }
        }
        // 레코벨 추천상품을 장바구니에서 담든 안담든 레이어 닫을때 N 값으로 초기화
        common.cart.regCartRecoBellGoodsInCartYn = 'N';
    }else if(status == 'closeRecoBellGoodsInCart'){
        location.reload();
    }
};

// 오늘드림 매장 매칭 여부
var isDeliveryStrMatch = function(){
	
	var isDeliveryStrMatch = true;
	var deliveryStrNo = $(".dt_dlvp").data("strno");
    if(deliveryStrNo == undefined || deliveryStrNo == "" || deliveryStrNo == null || deliveryStrNo == "NM") {
    	isDeliveryStrMatch = false;
    }
    
    return isDeliveryStrMatch;
};