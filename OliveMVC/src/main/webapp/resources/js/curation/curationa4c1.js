/** 큐레이션 공통 스크립트 실행 순서
 * 1. curation.callCuration 실행으로 api 호출하여 jsonp 형식으로 결과를 리턴받는다.
 * 2. curation.getCurationCallBack 실행하여 서버에서 조회.
 * 3. curation.setCuration 을 통해 각 조건에 따라 html 셋팅.
 * 4. curation.viewScript를 통해 필요한 스크립트를 로드한다.
*/
var curation_title = {
	'a008' : '{0}', // [주문] 주문완료
	'a008_pop' : '함께 구매하면 좋은 추천 상품', 
	'a008_tip' : '{1}',
	'p201' : '<strong>최근 본 상품</strong>과 연관 추천 상품 ', // [홈] 최근 본 상품 연관 상품
	'p201_pop' : '최근 본 상품과 연관 추천 상품',
	'p201_tip' : '고객님의 소비 성향을 분석하여 <br/>최근 본 상품과 가장 연관성 높은 상품 추천해드려요',
	'p001' : '<strong>최근 본 상품</strong>과 연관 추천 상품', // [홈] 최근 본 상품 연관 상품
	'p001_pop' : '최근 본 상품과 연관 추천 상품',
	'p001_tip' : '고객님의 소비 성향을 분석하여 <br/>최근 본 상품과 가장 연관성 높은 상품 추천해드려요',
	'p303' : '취향 저격! 요즘 인기 상품',  // for you에서 사용
	'p303_pop' : '취향 저격! 요즘 인기 상품',
	'p303_tip' : '고객님과 취향이 유사한<br/>고객님의 구매, 클릭이 많은 상품을 추천해드려요',
	'p202_pop' : '{0}님에게 추천드리는 상품',
	'p202_tip' : 'AI 추천 알고리즘으로 분석하여 <br/>고객님의 성향에 맞게 추천드리는 상품이에요',
	'p002_pop' : '고객님에게 추천드리는 상품',
	'p002_tip' : 'AI 추천 알고리즘으로 분석하여 <br/>고객님의 성향에 맞게 추천드리는 상품이에요',
	'm002_pop' : '다른 고객님이 많이 구매한 상품',
	'm002_tip' : '고객님의 소비 성향을 분석하여<br/>최근 본 상품과 가장 연관성 높은 상품 추천해드려요',
	'a007' : '상품이 마음에 안 드셨나요?</br><strong>{0}</strong> 다른 상품이에요', // [주문] 주문취소
	'a007_pop' : '{0} 상품 추천',
	'a007_tip' : '주문 취소한 상품 대신 {1}님에게 어울리는<br/><strong>{0}</strong> 상품을 추천해드려요',
	'a002' : '이런 <strong>{0}</strong> 상품은 어떠세요?', // [상품상세] 함께 구매하면 좋은 상품
	'a002_pop' : '{0} 추천 상품', 
	'a002_tip' : '고객님과 비슷한 성향의 다른 고객님이 많이 구매한<br/><strong>{0}</strong> 상품이에요',
	'n002' : '<strong>{0}</strong> 상품 추천해드려요', // [상품상세] 일시품절 레이어
	'n002_pop' : '{1}님과 어울리는 <strong>{0}</strong>',
	'n002_tip' : '<strong>{0}</strong> 중에 <br/>고객님의 소비 성향과 어울리는 상품을 추천해드려요',
	'a003_pop' : '함께 보면 좋은 상품이에요', // [상품상세] 함께 보면 좋은 상품
	'a003_tip' : '고객님과 비슷한 성향의 다른 고객님이<br/>함께 많이 본 상품이에요',
	'a015_pop' : '함께 구매하면 좋은 추천 상품이에요', // [장바구니 하단] 함께 구매하면 좋은 상품
	'a015_tip' : '고객님과 비슷한 성향의 다른 고객님이<br/>함께 많이 구매한 상품이에요',
	's001_pop' : '{0}', // [검색] 검색 결과 3개 미만,
	's001_tip' : '{1}',
	'a014_pop' : '추천 상품',
	't001' : "이 시간 <strong>올리브영에서 인기 있는</strong> 상품이에요",
	't001_pop' : "{0}",
	't001_tip' : "AI 추천 알고리즘으로 분석하여<br/>고객님의 성향에 맞게 추천하는 상품이에요",
	'p038' : '지금 주목할 만한 세일 상품',
	'p038_pop' : '놓쳐서는 안 될 세일 상품',
	'p038_tip' : '고객님과 비슷한 성향의 다른 고객님이<br/>많이 구매한 세일 상품이에요',
	'a024_pop' : '배송비 무료 달성을 위한 추천 상품',
	'b004_pop' : '{0} 상품 더보기',
	'b004_tip' : '고객님과 취향이<br/>유사한 고객님의 좋아요, 구매가 많은 브랜드의 상품을 추천해드려요',
	'p044' : '이런 신상품은 어때요?',
	'p044_pop' : '이런 신상품은 어때요?',
	'p044_tip' : '고객님과 유사한 구매 성향의 고객들이<br/>많이 구매하는 신상품을 추천해드려요',
	'a029_pop' : '함께 보면 좋은 상품이에요', // [상품상세] 함께 보면 좋은 상품
	'a029_tip' : '고객님과 비슷한 성향의 다른 고객님이<br/>함께 많이 본 상품이에요'
};

$.namespace("curation");
curation = {
	callCuration : function(recType, p_param, callBackFunc) {
		p_param.cuid = recoCuid;
		p_param.pcid = getCookie_curation("RB_PCID");
		p_param.userid = hashedRecoSsoMbrNo;
		
		var sendParam = {};
		for(keys in p_param) {
			if(p_param[keys] != "" && p_param[keys] != undefined) {
				sendParam[keys] = p_param[keys];
			}
		}

		if(common.isEmpty(sendParam.size)) {
			sendParam.size = 20;
		}

		if(recType == "re108"){
			sendParam.size = 30;
		}
		
		try {
			$.ajaxPrefilter('json', function(options, orig, jqXHR) {
				if (options.crossDomain && !$.support.cors) return 'jsonp'
			});
			
			var url = 'https://rec.ai.oliveyoung.co.kr/rec/' + recType;
			var advType = "p045,p046,p047,p048,p049,p050,p051,p052,p053,p054,p055,p056,p057,p058,p043,re106,re102";

			if(advType.indexOf(recType) > -1) {
				console.log(url + "?" + $.param(sendParam));
			}

			$.ajax({
				url : url,
				data : sendParam,
				type : 'GET',
				crossDomain : true,
				dataType : 'json',
				success : function(data) {
					if(callBackFunc != undefined && callBackFunc != null && callBackFunc != '') {
						var callBackData = jQuery.extend(data, sendParam);
						callBackFunc(data);
					}
				},
				error : function(e) {
					if(p_param.load != "pop") {
						$("#curation_wrap_" + recType).hide();
					}
				}
			});
		} catch(e) {}
	},
	getCurationCallBack : function(data, url) {
		
		// 최근본상품의 큐레이션의 경우 데이터가 존재하지 않아도 레이어 팝업을 보여줘야 하기 때문에 분기 처리함 : jwkim
		if(data.viewType != "RecentPop" && (data.results == null || data.results == undefined)) {
			$("#curation_wrap_" + data.recType).hide();
			return;
		}
		
		// 최근본상품의 큐레이션의 경우 데이터가 존재하지 않아도 레이어 팝업을 보여줘야 하기 때문에 분기 처리함 : jwkim
		if(data.viewType != "RecentPop" &&  data.results.length == 0) {
			$("#curation_wrap_" + data.recType).hide();
			return;
		}
		
		if(url == undefined || url == "") {
			url = _baseUrl + "curation/getCurationCallBackAjax.do";
		}
		
		var requestParam = {
			recType : data.recType, // url 정보
			viewType : data.viewType, // 가로형, 세로형
			viewSize : data.viewSize, // 최대 노출 수
			viewArea : data.viewArea, // 큐레이션 영역
			styleNo : data.styleNo, // 상품 tag 템블릿 번호
			goodsNo : data.goodsNo || "",
			loginArea : data.loginArea || "Y", // 로그인, 프로필 영역 노출 여부
			extGoodsNo : data.extGoodsNo != "" && data.extGoodsNo != undefined ? data.extGoodsNo.join(",") : "",
			dispCatNo : data.dispCatNo || "",
			quickYn : data.quickYn || "",
			rccode : data.rccode,
			trackingCd: data.trackingCd || "", // trackingCd
			gtmDataAttr: data.gtmDataAttr || "",
		};
		
		var scriptParam = {
			popupYn : data.popupYn || "", // 팝업 여부
			advisorPopYn : data.advisorPopYn || "", // 어드바이저 팝업 여부
			popLayerYn : data.popLayerYn || "", // 레이어 여부 (상품상세 장바구니 담기, 일시품절)
			popLayerNm : data.popLayerNm || "", // 레이어명(id)
			titlRp : data.titlRp || "",
			appYn : data.appYn || "N",
			viewArea : data.viewArea || "", // 영역
			slideShow : data.slideShow || "", // slide 노출 갯수
			dotYn : data.dotYn || "",
			slide : data.slide || "",
			// 하위 더보기 팝업 이벤트 생성을 위한 큐레이션 파라미터 전송
			cps : data.cps,
			cpt : data.cpt,
			size : data.size,
			iids : data.iids,
			cpcids : data.cpcids,
			bids : data.bids || "",
			rccode : data.rccode || "",
			quickYn : data.quickYn || "",
			strNo : data.strNo || "" // 오늘드림 장바구니에 옵션 담기 위해
		};
		
		var goodsNo = "";
		var rank = "";
		var egcode = "";
		
		var results = data.results;
		
		for(var i=0; i<results.length; i++) {
			var tempGoodsNo = results[i].product.itemUrl;
			if(tempGoodsNo != "" && tempGoodsNo != undefined) {
				goodsNo += tempGoodsNo.replace("goodsNo=", "");
				rank += results[i].rank == undefined || results[i].rank == "" ? "" : results[i].rank;
				egcode += results[i].egcode == undefined || results[i].egcode == "" ? "" : results[i].egcode;
				
				if(i != (results.length - 1)) {
					goodsNo += ",";
					
					if(results[i].rank != "") {
						rank += ",";
					}
					
					if(results[i].egcode != "") {
						egcode += ",";
					}
				}
			}
		}
		
		requestParam.goodsNoStr = goodsNo;
		requestParam.rankStr = rank;
		requestParam.egcodeStr = egcode;

		if(!!data.viewSize){
			requestParam.viewSize = data.viewSize;
		}

		common.Ajax.sendRequest("POST",url, requestParam, function(html) {
			if($("#loadingBox_" + data.recType).length > 0) {
				$("#loadingBox_" + data.recType).hide();
			}
			
			var obj = jQuery.extend(requestParam, scriptParam);
			if(data.callBackFunc != undefined && data.callBackFunc != "") {
				data.callBackFunc(obj, html);
			} else {
				curation.setCuration(obj, html);
			}
		});
	},
	setCuration : function(setObj, html) {
		console.log(curation_title[setObj.recType]);
		var titlRp = setObj.titlRp;
		if(setObj.popupYn != "Y") {
			$("#goods_curation_" + setObj.recType).html("");
			$("#goods_curation_" + setObj.recType).html(html);
			var title = curation_title[setObj.recType];
			var arrReplace = titlRp.split(";");
			
			if(title != undefined) {
				for(var i=0; i<arrReplace.length; i++) {
					title = title.replace('{'+ i +'}', arrReplace[i]);
				}
				
				$("#recomm_title_"+setObj.recType).html(title);
			}
		} else {
			var title = curation_title[setObj.recType + "_pop"];
			var tooltip = curation_title[setObj.recType + "_tip"];
			var arrReplace = titlRp.split(";");
			
			for(var i=0; i<arrReplace.length; i++) {
	        	title = title.replace('{'+ i +'}', arrReplace[i]);
	        	
	        	if(tooltip != undefined && tooltip != "") {
	        		tooltip = tooltip.replace('{'+ i +'}', arrReplace[i]);
	        	}
	        }
			
			$("#crtPopWrap").find(".layer_cont4").html(html);
			$("#crtPopWrap").find("#popTitle").html(title);
			$("#crtPopWrap").find("#tooltipTxt").html(tooltip);
		}
		
		if($('#curation_ulList_' + setObj.recType).find("li").length > 0) {
			if(setObj.popupYn == "Y") { // 팝업
				curation.popOpen();
				curation.viewScript(setObj);
			} else {
				curation.viewScript(setObj);
				curation.btnMoreEvent(setObj);
			}
		}
		
		// 최근본상품 관련 추가 개발건인경우에 무조건 팝업노출함 : jwkim
		if(setObj.viewType == "RecentPop"){
			setObj.trackingCd = "Common_Recent_Curation";
			if(setObj.popupYn == "Y") { // 팝업
				curation.popOpen();
				curation.viewScript(setObj);
			}
		}
		
	},
	viewScript : function(options) {
		if(options.viewType == "Horz") {
			var slideShow = 3;
			
			if (options.slideShow != undefined && options.slideShow != "") {
				slideShow = options.slideShow;
			}
			
			if(slideShow == 3) {
				$('#curation_ulList_' + options.recType).slick({
	                arrows: true,
	                infinite: true,
	                slidesToShow: slideShow,
	                slidesToScroll: 3,           
	                dots : true
	            });
			} else {
				$('#curation_ulList_' + options.recType).slick({
	                arrows: true,
	                infinite: true,
	                slidesToShow: slideShow,
	                slidesToScroll: 2,           
	                dots : true,
	                variableWidth: true,
	            });
			}
			
            $('#curation_ulList_' + options.recType).find('.slick-arrow').on('mouseenter focus',function(e) {
                var _this = $(this);
                var _thisDots = _this.parents('.curation_basket').find('.slick-dots');
                var _thisDotsLen = _thisDots.find('li').length, _thisDot = _thisDots.find('li.slick-active button').text();

                txtSpan = _thisDot + '/' + _thisDotsLen;
                _this.html(txtSpan);
                _this.addClass('snum');
            });
            $('#curation_ulList_' + options.recType).find('.slick-arrow').on('mouseleave blur', function() {
                var _this = $(this);
                _this.removeClass('snum');
            });
            $('#curation_ulList_' + options.recType).on('afterChange', function(event, slick, currentSlide) {
                var _this = $(this), _thisDots = _this.find('.slick-dots'), _thisDotsLen = _thisDots
                        .find('li').length, _thisDot = _thisDots.find('li.slick-active button').text();
                _arrow = _this.find('.slick-arrow');

                txtSpan = _thisDot + '/' + _thisDotsLen;
                _arrow.html(txtSpan);
            });            
            
            // 레코벨 상품 장바구니 담기 클릭
            $(document).on('click', '.cartBtnRecoBell', function(e){
                e.preventDefault();
                if (common.loginChk()) {
                    
                    // 클릭지표, 시나리오 분석 웹로그 추가
                    var wlogType = $(this).closest("li").attr("data-wlog_type");
                    common.wlog("detail_curation_addcart_"+wlogType);
                    n_click_logging(_baseUrl + "common/getCartOptionSelectAjax.do?clickarea=detail_curation_addcart_" + wlogType);
                    
                    //  옵션선택이 있거나, 없거나 일단 화면 진입
                    var url = _baseUrl + "common/getCartOptionSelectAjax.do";
                    var data = {goodsNo : $(this).attr("data-ref-goodsNo"), itemNo : $(this).attr("data-ref-itemNo"), itemCnt : $(this).attr("data-ref-cnt"), prstyn : $(this).attr("data-ref-prstyn"), recoRcCode : options.rccode };
					// 상품카드 장바구니버튼 트래킹코드
					common.cart.trackingInfo.setTrackingCd($(this));
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
                // 웹로그 타입(일반추천/품절상품추천)
                var wlogType = $(this).closest("li").attr("data-wlog_type");
                // 찜했을때만 로그 남김
                if($(this).hasClass("on") == true){
                    common.wlog("cart_curation_addzzim_"+wlogType);
                }
            });            
            
		} else if(options.viewType == "VertOnlyPrd" || options.viewType == "ForYouPrd") {
			$("#goods_curation_" + options.recType).parent("div:eq(0)").show();
			
			var slideShow = 4;
			
			if (options.slideShow != undefined && options.slideShow != "") {
				slideShow = options.slideShow;
			}
			
			var dots = false;

			if(!common.isEmpty(options.dotYn) && options.dotYn == "Y") {
				dots = true;
			}

			setTimeout(function() {
				if(options.slide != "none") {
					$('#curation_ulList_' + options.recType).slick({
						slidesToShow: slideShow,
						slidesToScroll: slideShow,
						infinite:true,
						arrows: true,
						dots: dots,
						useTransform: true,
						speed: 400,
					});
				}
				
				$('#curation_ulList_' + options.recType).find("li").show();
			}, 100);
			
		} else if(options.viewType == "VertPop") {
			try {
				var src = (('https:'==document.location.protocol)?'https':'http')+'://logger.ai.oliveyoung.co.kr/js/logger.min.js';
			    var scriptLen = $("script").filter("[src='"+src+"']").length;
			    
			    if(scriptLen == 0) {
			    	(function(s,x){s=document.createElement('script');s.type='text/javascript';
				    s.async=true;s.defer=true;s.src=(('https:'==document.location.protocol)?'https':'http')+
				    '://logger.ai.oliveyoung.co.kr/js/logger.min.js';
				    x=document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);})();
			    }
			    
			    eglc.op('setVar', 'cuid', recoCuid);
			    eglc.op('setVar', 'userId', hashedRecoSsoMbrNo);
			    eglc.op('setVar', 'rcCode', options.rccode);
			    eglc.op('track', 'more');
			} catch(e) {
				console.log(e);
			} // 성과지표 - 더보기
		}
		
		options.parentArea = options.popupYn != "Y" ? '#curation_ulList_'+options.recType : '#crtPopWrap #curation_ulList_'+options.recType;
		curation.prodDetailScript(options);
	},
	btnMoreEvent : function(options) {
		$("#crt_more_"+options.recType+", #crt_more_last_"+options.recType).unbind("click").click(function(event) {
			if (options.viewArea == 'sale_curation_prod') common.wlog('sale_curation_more_btn');
			if (options.viewArea == 'search_list_curation_more_prod') common.wlog("search_list_curation_more_btn");
			if (options.viewArea == 'search_noresult_curation_more_prod') common.wlog("search_noresult_curation_more_btn");
			if (options.viewArea == 'Ordercan_Curation') common.wlog("ordercancel_curation_more_btn");
			if (options.viewArea == 'ordercompl_curation_prod') common.wlog("ordercompl_curation_more_btn");
			if (options.rccode == 'pc_cart_order_a') {
				options.viewArea = 'ordercompl_curation_more_prod';
				options.trackingCd = 'Ordercom_Curation_More';
			}

			event.preventDefault();

			// curation case 중 상품 더보기 시에 trackingCd 분기
			switch (options.trackingCd) {
				case 'ForU_Recommend':
					options.trackingCd = 'ForU_Recommend_More';
					break;
				case 'ForU_Brand':
					options.viewArea = 'foru_brand_more_prod';
					options.trackingCd = 'ForU_Brand_More';
					break;
				case 'ForU_New':
					options.viewArea = 'foru_new_more_prod';
					options.trackingCd = 'ForU_New_More';
					break;
				case 'Sale_Curation':
					options.viewArea = 'sale_curation_more_prod';
					options.trackingCd = 'Sale_Curation_More';
					break;
				case 'Result_Curation':
					options.viewArea = 'search_list_curation_more_prod';
					options.trackingCd = 'Result_Curation_More';
					break;
				case 'noResult_Curation':
					options.viewArea = 'search_noresult_curation_more_prod';
					options.trackingCd = 'noResult_Curation_More';
					break;
				case 'Ordercan_Curation':
					options.viewArea = 'ordercancel_curation_more_prod';
					options.trackingCd = 'Ordercan_Curation_More';
					break;
				default:
					break;
			}
			if(options.recType == 's001') {
				if (options.rccode == 'pc_search_01_a') options.trackingCd = 'Result_Curation_More';
				else options.trackingCd = 'noResult_Curation_More';
			}
			if(options.goodsNos != undefined && options.goodsNos != "") {
		   		var requestUrl = _baseUrl + "curation/getLgcGoodsNoListAjax.do"
		   		common.Ajax.sendRequest("POST", requestUrl, {goodsNos : options.goodsNos}, function(res) {
		   			options.iids = res.data;
		   			curation.popLoadEvent(options);
		   		});
		   	} else {
		   		curation.popLoadEvent(options);
		   	}
		});
	},
	popLoadEvent : function(options, replaceData) {
		if(options.loginArea != "N") {
			localStorage.setItem("curationPopInfo", JSON.stringify(options));
		}
		var recType = options.recType;
		
		var lastCallRecType = options.lastCallRecType;
		
		// a029의 경우 특정 조건에 만족하지 않는 경우 다른 recType을 호출 하기 때문에 마지막에 호출한 recType으로 조회되도록 한다. 
		if(recType == "a029"){
			recType = lastCallRecType != "" && lastCallRecType != null && lastCallRecType != undefined ? lastCallRecType : recType;
		}
		var exiids = ""
		if(options.trackingCd === "Home_Curation2_More"){
			exiids = localStorage.getItem("exiids")
		}

	   	var param = {
			size : options.size,
			cps : options.cps || "",
			cpt : options.cpt || "",
			cpcids : options.cpcids || "",
			iids : options.iids || "",
			st : options.st || "",
			goodsNo : options.goodsNo || "",
			bids : options.bids || "",
			load : "pop",
			trackingCd: options.trackingCd || "", // trackingCd
			exiids: exiids
		};
	   	
	   	var popViewType = "VertPop";
	   	// 팝업의경우 viewType이 하드코딩으로 VertPop 이값이 박혀있었다.
	   	// 최신본상품 관련해서는 팝업에 대한 내용이 다르기 때문에 구분자로 화면 구분이 필요하기 때문에 조건추가
	   	if(typeof options.viewType != "undefined" && options.viewType != "" &&  options.viewType == "RecentPop"){
	   		popViewType = options.viewType;
	   	}
	   	
	   	var obj = {
		   	viewType : popViewType,
		   	styleNo : 29,
		   	popupYn : "Y",
		   	titlRp : options.titlRp || "",
		   	viewSize : options.size,
		   	viewArea : options.viewArea,
		    extGoodsNo : options.extGoodsNo || [],
		    loginArea : options.loginArea || "Y",
		    dispCatNo : options.dispCatNo || "",
		    rccode : options.rccode || "",
		    quickYn : options.quickYn || "",
		    strNo : options.strNo || "", // 오늘드림 장바구니에 옵션 담기 위해
			gtmDataAttr: options.gtmDataAttr || "",
		};
	   	
	   	if(replaceData != undefined && replaceData != null) {
   			var data = {
   				results : replaceData,
   				recType : options.recType
   			};

   			url = _baseUrl + "curation/getCurationCallBackAjax.do";
   			var sendObj = jQuery.extend(data, obj);
   			curation.getCurationCallBack(sendObj, url);
   		} else {
   			curation.callCuration(recType, param, function(data) {
   				var sendObj = jQuery.extend(data, obj);
   				
	   			url = _baseUrl + "curation/getCurationCallBackAjax.do";
	   			curation.getCurationCallBack(sendObj, url);
	   		});
   		}
	},
	popLogin : function() {
		localStorage.setItem("curationReload", "Y");
		common.link.moveLoginPage();
	},
	regProfile : function() {
		localStorage.setItem("curationReload", "Y");
		var redirectUrl = document.location.href;
		var url = _baseUrl + "mypage/getMySkinCondition.do?curationRedirectUrl=" + redirectUrl;
		
		location.href = url;
	},
	popOpen : function(_objId) {
		if(common.isEmpty(_objId)) {
			_objId = 'crtPopWrap';
		} 
		
		var _obj = $('#' + _objId);
		_obj.show();
		
		var popPos = 0;
        var popWid = parseInt(_obj.width(), 10)/2;
        var popHgt = _obj.height();
        var windowHeight = $(window).height();
        
        //_obj.removeClass('hide').css({'margin-top': -_obj.height()/2 +'px'});
        popHgt = parseInt(_obj.height(), 10);
        popWid = parseInt(_obj.width(), 10)/2;
        
        //$("body").css("overflow", "hidden");
        if(windowHeight > 750) {
            _obj.css({'left':'50%' , 'margin-left':-(popWid) +'px' , 'top': "1%", 'margin-top' : $(document).scrollTop() + 10});
        } else {
        	var scroll = $(window).scrollTop() + 10;
            _obj.css({'left':'50%' , 'margin-left':-(popWid) +'px' , 'top': scroll + "px"});
        }
        
        
        $('body').append('<div class="prd_dim"></div>');
	},
	popClose : function(_objId) {
		if(common.isEmpty(_objId)) {
			_objId = 'crtPopWrap';
		} 
		
		var _obj = $('#' + _objId);
		_obj.hide();
		
		//$("body").css("overflow-y", "scroll");
		_obj.find(".layer_cont4").html("");

		if(_objId == "crtPopWrap") {
			localStorage.removeItem("curationPopInfo");
			localStorage.removeItem("curationReload");
		}
		
        $('.prd_dim').remove();
	},
	reloadEvent : function() {
		setTimeout(function() {
	   		var curationReload = localStorage.getItem("curationReload");
	
	   		if(curationReload == "Y" && _isLogin) {
	   			var curationPopInfo = $.parseJSON(localStorage.getItem("curationPopInfo"));
	   			
	   			if(curationPopInfo != undefined && curationPopInfo != "") {
	   				if(curationPopInfo.loginRecType != undefined && curationPopInfo.loginRecType != "") {
		   				curationPopInfo.recType = curationPopInfo.loginRecType;
		   			}
	   				
	   				curation.popLoadEvent(curationPopInfo);
	   				localStorage.removeItem("curationPopInfo");
	   				localStorage.removeItem("curationReload");
	   			}
	   		}
	   	}, 500);
	},
	prodDetailScript : function(options) {
		
		console.log("prodDetailScript options.parentArea==>" + options.parentArea);
		
		// 상품상세 페이지에서.. A태그 클릭 시 해당 상품으로 이동
		if(options.parentArea == undefined || options.parentArea == "") {
    		options.parentArea = "#curation_ulList_"+options.recType;
    	}
		trackingCd = options.trackingCd || '';
		if (options.viewArea == "rank_best" && !options.trackingCd) {
			$(options.parentArea).find('.btn_zzim.jeem').attr('onclick','common.wlog(' + "'" + 'best_live_category_tag_' + $('ul#ul_cateTag').find('li.on').attr('data-order-no') + '_like' + "'" + ');');
			options.viewArea = "best_live_category_tag_" + $('ul#ul_cateTag').find('li.on').attr('data-order-no') + "_prod";
			trackingCd = 'Best_Liverank_Cat' + $('ul#ul_cateTag').find('li.on').attr('data-order-no');
		}
		$(options.parentArea).find('.a_detail').each(function(i) {
		    var _item = $(this);
		    var _data_goodsno = _item.attr('data-ref-goodsno');
		    var _data_dispCatNo = _item.attr('data-ref-dispCatNo');
			var _data_attr = _item.attr('data-attr');
		    var _data_dsCode = _item.attr('data-dsCode');
		    var egcode = _item.attr("data-egcode");
		    var egrank = _item.attr("data-egrank");

			if (trackingCd =='ForU_TopPick') options.viewArea = 'foru_toppick_prod';
			if (trackingCd == 'ForU_Recommend') options.viewArea = 'foru_recommend_prod';
			if (trackingCd == 'ForU_Recommend_More') options.viewArea = 'foru_recommend_more_prod';

			var gtmDataAttr = options.gtmDataAttr;
			var gtmDataAttrFunc = "";
			if(gtmDataAttr != null && gtmDataAttr != "") {
				var gtmDataAttrArr = gtmDataAttr.split("^");
				var gtmDataAttrStr = gtmDataAttrArr[0] + "_" + gtmDataAttrArr[1];
				gtmDataAttrFunc = 'gtm.goods.callGoodsGtmInfo("'+_data_goodsno+'", "", "ee-productClick", "'+gtmDataAttrStr+'", "'+(i+1)+'");';

			/* [PC] 3623081 (큐레이션) 랭킹>실시간랭킹 추천영역 미노출 결함 수정
			} else if((options.viewArea == "best_live_view_prod" || options.viewArea == "best_live_buy_prod") && options.parentArea === '.liveSm_slList') {
				var gtmDataList = '랭킹_실시간랭킹_' + (_data_attr.includes('view') ? 'view' : '구매');
				gtmDataAttrFunc ='gtm.goods.callGoodsGtmInfo("'+_data_goodsno+'", '+null+',"'+'ee-productClick'+'","'+gtmDataList+'", "'+(i+1)+'");';
			} else if(options.viewArea != null && options.viewArea != "" && options.viewArea.includes('best_live_category_tag') && options.parentArea === '#div_cateRankList') {
				var gtmDataList = '랭킹_최근본카테고리실시간랭킹';
				gtmDataAttrFunc ='gtm.goods.callGoodsGtmInfo("'+_data_goodsno+'", '+null+',"'+'ee-productClick'+'","'+gtmDataList+'", "'+(i+1)+'");';
		    */
			} else if((options.viewArea == "best_live_view_prod" || options.viewArea == "best_live_buy_prod") && options.parentArea === '.liveSm_slList') {
				var gtmDataList = '랭킹_실시간랭킹_' + (_data_attr.indexOf('view') !=-1 ? 'view' : '구매');
				gtmDataAttrFunc ='gtm.goods.callGoodsGtmInfo("'+_data_goodsno+'", '+null+',"'+'ee-productClick'+'","'+gtmDataList+'", "'+(i+1)+'");';

			} else if(options.viewArea != null && options.viewArea != "" && options.viewArea.indexOf('best_live_category_tag')!=-1 && options.parentArea === '#div_cateRankList') {
				var gtmDataList = '랭킹_최근본카테고리실시간랭킹';
				gtmDataAttrFunc ='gtm.goods.callGoodsGtmInfo("'+_data_goodsno+'", '+null+',"'+'ee-productClick'+'","'+gtmDataList+'", "'+(i+1)+'");';
			} else if(options.viewArea == "home_real_time_rank" && options.parentArea === "#liveRankArea"){
				var gtmDataList = '홈_실시간VIEW랭킹';
				gtmDataAttrFunc = 'gtm.goods.callGoodsGtmInfo("'+_data_goodsno+'", '+null+',"'+'ee-productClick'+'","'+gtmDataList+'", "'+(i+1)+'");';
			}

			var goodsNm = $(this).find('.tx_name').text();
			if(trackingCd === 'Sale_Curation') {
				gtmDataAttrFunc = 'gtm.goods.callGoodsGtmInfo("'+_data_goodsno+'", "", "ee-productClick", "세일_주목할만한상품", "'+(i-2)+'");';
			} else if(trackingCd === 'ForU_TopPick') {
				_item.attr('data-attr', "추천관^TOPPICK^"+$(this).find('.pdTxt').text() + "^" + (i-2));
				_item.attr('data-trk', "<%= _gtmTrk %>");
				gtmDataAttrFunc = 'gtm.goods.callGoodsGtmInfo("'+_data_goodsno+'", "", "ee-productClick", "추천관_TOPPICK", "'+(i-2)+'");';
			} else if(trackingCd == 'ForU_Recommend') {
				_item.attr('data-attr', "추천관^맞춤추천상품^"+goodsNm + "^" + (i+1));
				_item.attr('data-trk', "<%= _gtmTrk %>");
				gtmDataAttrFunc = 'gtm.goods.callGoodsGtmInfo("'+_data_goodsno+'", "", "ee-productClick", "추천관_맞춤추천상품", "'+(i+1)+'");';
			} else if(trackingCd == 'ForU_Brand') {
				_item.attr('data-attr', "추천관^주목해야할브랜드^"+goodsNm + "^" + (i+1));
				_item.attr('data-trk', "<%= _gtmTrk %>");
				gtmDataAttrFunc = 'gtm.goods.callGoodsGtmInfo("'+_data_goodsno+'", "", "ee-productClick", "추천관_주목해야할브랜드", "'+(i+1)+'");';
			} else if(trackingCd == 'ForU_Keyword') {
				_item.attr('data-attr', "추천관^핫인기키워드^"+goodsNm + "^" + (i+1));
				_item.attr('data-trk', "<%= _gtmTrk %>");
				gtmDataAttrFunc = 'gtm.goods.callGoodsGtmInfo("'+_data_goodsno+'", "", "ee-productClick", "추천관_핫인기키워드", "'+(i+1)+'");';
			} else if(trackingCd == 'ForU_New') {
				_item.attr('data-attr', "추천관^신상품추천^"+goodsNm + "^" + (i+1));
				_item.attr('data-trk', "<%= _gtmTrk %>");
				gtmDataAttrFunc = 'gtm.goods.callGoodsGtmInfo("'+_data_goodsno+'", "", "ee-productClick", "추천관_신상품추천", "'+(i+1)+'");';
			} else if(trackingCd == 'Common_Recent_Curation'){
				gtmDataAttrFunc = 'gtm.goods.callGoodsGtmInfo("'+_data_goodsno+'", "", "ee-productClick", "공통_최근본상품_추천상품보기", "'+(i+1)+'");';
			}


			//[MC PC] 3632699 (OY큐레이션) 라이브스트림영역 트래킹코드
				if(options.parentArea === '#div_cateRankList'){	//#div_cateRankList				
				    //1개의 상품이 each문 2번씩 돌기에 (prd_info, prd_name) 상품Index는 아래처럼 구함.    Math.ceil() -> 소수점 올림, 정수 반환
					trackingCd = 'Best_Liverank_Cat_' + options.categoryId + '_' + Math.ceil( (i+1)/2 );
				}
				//console.log("DEBUG > curation.js - prodDetailScript > trackingCd:    " + _data_goodsno + " & " + trackingCd);
			//[MC PC] 3632699 (OY큐레이션) 라이브스트림영역 트래킹코드
			
			var href = 'javascript:'+gtmDataAttrFunc+'common.wlog("'+options.viewArea+'");common.wlog("' + _data_dsCode + '");common.link.moveGoodsDetailCuration("'+_data_goodsno+'", "'+_data_dispCatNo+'","'+options.viewArea+'" , "'+options.rccode+'","'+egcode+'" ,"'+egrank+'" ,"'+trackingCd+'"); return false;';

			_item.attr('onclick',href);
			_item.attr('name', trackingCd);


		});

		$("#storeBestProdArea li .box .item").on("click", function(e) {
			var _data_goodsno = $(this).attr("data-ref-goodsNo");
			gtm.goods.callGoodsGtmInfo(_data_goodsno, null, 'ee-productClick', "홈_매장큐레이션팝업_베스트상품", $(this).attr("idx"));
		});

		//이미지 클릭시에도 상품 상세로 이동하도록 수정 3489994
        $(document).on("click",".thum img", function(){
        	var _item = $(this).closest(".thum");
		    var _data_goodsno = _item.attr('data-ref-goodsno');
		    var _data_dispCatNo = _item.attr('data-ref-dispCatNo');
		    var _data_dsCode = _item.attr('data-dsCode');
		    var egcode = _item.attr("data-egcode");
		    var egrank = _item.attr("data-egrank");

		    javascript:common.wlog(options.viewArea);
		    common.wlog(_data_dsCode);
		    common.link.moveGoodsDetailCuration(_data_goodsno, _data_dispCatNo,options.viewArea,options.rccode,egcode,egrank,trackingCd);
		});

		$(options.parentArea).find(".btn_zzim.jeem").each(function() {
			$(this).attr("data-rccode", options.rccode);
		});

		$(options.parentArea).find(".btnbag2, .btnbag").each(function() {
			$(this).attr("data-rccode", options.rccode);
			
			if(options.quickYn == "Y") {
				$(this).attr("data-quick-yn", options.quickYn);
			}
			
			if(!common.isEmpty(options.strNo)) { // 오늘드림 장바구니에 옵션 담기 위해
				$(this).attr("data-strno", options.strNo);
			}
		});

		if(options.viewType == "VertOnlyPrd") {
			if(options.advisorPopYn == "Y") {
				$(options.parentArea).find(".btnbag").addClass("btnbag2").removeClass("btnbag");
			} else if(options.popupYn != "Y"){
				$(options.parentArea).find(".btnbag2").addClass("btnbag").removeClass("btnbag2");
			}
		}
	}
};

$.namespace("curation.rts");
curation.rts = {
	callRtsCuration : function(rtsType, p_param, callBackFunc) {
		p_param.cuid = recoCuid;
		
		$.ajaxPrefilter('json', function(options, orig, jqXHR) {
			if (options.crossDomain && !$.support.cors) return 'jsonp'
		});
		
		$.ajax({
			url : "https://rts.ai.oliveyoung.co.kr/api/" + rtsType,
			data : p_param,
			type : "GET",
			crossDomain : true,
			dataType : "json",
			success : function(data) {
				if(callBackFunc != undefined && callBackFunc != null && callBackFunc != '') {
					callBackFunc(data);
				}
			},
			error :function(e) {
				
			}
		});
	},
	setCurationParam : function(data) {
		var goodsNo = "";
    	var rank = "";
    	var egcode = "";
    	var viewCnt = "";
    	var rankDiff = "";
    	var requestParam = undefined;
    	
    	if(data != undefined && data != "" && data.length > 0) {
    		requestParam = {};
    		for(var i=0; i<data.length; i++) {
    			var tempGoodsNo = "";
    			if(data[i].product == null || data[i].product == undefined) {
    				tempGoodsNo = data[i].itemUrl;
    			} else {
    				tempGoodsNo = data[i].product.itemUrl;
    			}
    			
    			if(tempGoodsNo != undefined && tempGoodsNo != null && tempGoodsNo != "") {
    				goodsNo += tempGoodsNo.replace("goodsNo=", "");
    				rank += !common.isEmpty(data[i].rank) ? data[i].rank : "";
    				
    				if(!common.isEmpty(data.viewcntYn) && data.viewcntYn == "Y") {
    					data[i].count = data[i].count == undefined || data[i].count == "" ? "0" : data[i].count;
    				}
    				
    				viewCnt += !common.isEmpty(data[i].count) ? data[i].count : "";
    				egcode += !common.isEmpty(data[i].egcode) ? data[i].egcode : "";
    				
    				if(i != (data.length - 1)) {
    					goodsNo += ",";
    					viewCnt += ",";
    					
    					if(data[i].rank != "" && data[i].rank != undefined) {
    						rank += ",";
    					}
    					
    					if(data[i].egcode != "" && data[i].egcode != undefined) {
    						egcode += ",";
    					}
    				}
    			}
    		}
    		
    		requestParam.goodsNoStr = goodsNo;
    		requestParam.rankStr = rank;
    		requestParam.viewCntStr = viewCnt;
    		requestParam.egcodeStr = egcode;
    	}
    	
    	return requestParam;
	},

	// getRtsCurationGoodsData : function(rtsApiRequestParameter, callBackFunction) {
	//
	// 	$.ajax({
	// 		url : _baseUrl + "curation/getRtsCurationGoodsDataAjax.do",
	// 		data : rtsApiRequestParameter,
	// 		type : "GET",
	// 		dataType : "json",
	// 		success : function(data) {
	// 			if(callBackFunction != undefined && callBackFunction != null && callBackFunction != '') {
	// 				callBackFunction(data);
	// 			}
	// 		},
	// 		error :function(e) {
	// 			console.log("getRtsCurationGoodsData error : " + e);
	// 		}
	// 	});
	// },

	getCurationJsonCallBack : function(data, callBackFunc) {
    	var requestParam = curation.rts.setCurationParam(data);
    	
    	if(requestParam != undefined) {
    		$.ajax({
    			url : _baseUrl + "curation/getCurationJsonCallBack.do",
    			data : requestParam,
    			type : "POST",
    			dataType : "json",
    			success : function(res) {
    				if(callBackFunc != undefined && callBackFunc != null && callBackFunc != '') {
    					res.type = data.type;
    					callBackFunc(res);
    				}
    			}
    		});
    	}
	}
};

function setPrdPriceInfo(obj) {
	var priceSuffix = "";
	
	// 상품 가격 start
	if(!common.isEmpty(obj.getSupPrc)) {
		if(obj.itemCnt > 0 && !common.isEmpty(obj.minSalePrc) 
				&& !common.isEmpty(obj.maxSalePrc) && obj.minSalePrc != obj.maxSalePrc) {
			priceSuffix = "~";
		}
	}
	
	if(common.isEmpty(obj.supPrc)) {
		if(priceSuffix != "") {
			obj.dispPrc = (obj.minSalePrc).numberFormat();
			obj.rateYn = "N";
		} else {
			if(obj.normPrc == obj.salePrc) {
				obj.dispPrc = (obj.supPrc).numberFormat();
				obj.saleAreaPrc = 0;
				obj.rateYn = "N";
			} else {
				obj.saleAreaPrc = (obj.supPrc).numberFormat();
				obj.dispPrc = (obj.salePrc).numberFormat();
				obj.rateYn = "Y";
			}
		}
	} else {
		if(obj.dsCntYn == "Y") {
			obj.saleAreaPrc = (obj.supPrc).numberFormat();
			obj.dispPrc = (obj.salePrc).numberFormat();
			obj.rateYn = "Y";
		} else {
			if(obj.normPrc == obj.salePrc) {
				obj.dispPrc = (obj.normPrc).numberFormat();
				obj.saleAreaPrc = 0;
				obj.rateYn = "N";
			} else {
				obj.saleAreaPrc = (obj.supPrc).numberFormat();
				obj.dispPrc = (obj.salePrc).numberFormat();
				obj.rateYn = "Y";
			}
		}
	}
	// 상품 가격 end
	
	// 상품 태그 start
	obj.promFlagYn = "";
	obj.dsCntFlagYn = "";
	obj.cpnFlagYn = "";
	obj.prstFlagYn = "";
	obj.freeDlvFlagYn = "";
	obj.quickFlagYn = "";
	
	var chkVal = 0;
	if(!common.isEmpty(obj.promKndCd) && (obj.promKndCd == "P201" || obj.promKndCd == "P202" || obj.promKndCd == "P203")) {
		chkVal++;
		if(chkVal < 5) {
			obj.promFlagYn = "Y";
		} 
	}
	
	if(obj.dsCntYn == "Y") {
		chkVal++;
		if(chkVal < 5) {
			obj.dsCntFlagYn = "Y";
		}
	}
	
	if(obj.cpnYn == "Y") {
		chkVal++;
		if(chkVal < 5) {
			obj.cpnFlagYn = "Y";
		}
	}

	if(obj.prstYn == "Y") {
		chkVal++;
		if(chkVal < 5) {
			obj.prstFlagYn = "Y";
		}
	}

	if(obj.freeDlvYn == "Y") {
		chkVal++;
		if(chkVal < 5) {
			obj.freeDlvFlagYn = "Y";
		}
	}

	if(obj.quickYn == "Y") {
		chkVal++;
		if(chkVal < 5) {
			obj.quickFlagYn = "Y";
		}
	}
	// 상품 태그 end
	
	obj.priceSuffix = priceSuffix;
	
	// 상품평 갯수
	obj.gdasCnt = (Number(obj.oneLineGdasTotCnt) + Number(obj.prmumGdasTotCnt)).numberFormat();
	
	if(!common.isEmpty(obj.goodsEvalScrVal) && Number(obj.goodsEvalScrVal) < 2 ) {
		obj.goodsEvalScrVal = "";
	}
		
	// 선호카테고리 실시간 랭킹 : 순위 변동 디폴트 없음으로 셋팅
	if(common.isEmpty(obj.rankDiffClass)) {
		obj.rankDiffClass = "";
	}
	
	return obj;
}

function getCookie_curation(name) {
	var nameOfCookie = name + "=";
	var x = 0;
	while ( x <= document.cookie.length ){
		var y = (x+nameOfCookie.length);
		if ( document.cookie.substring( x, y ) == nameOfCookie ) {
			if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
				endOfCookie = document.cookie.length;
			return unescape( document.cookie.substring( y, endOfCookie ) );
		}
		x = document.cookie.indexOf( " ", x ) + 1;
		if ( x == 0 )
			break;
	}
	return "";
}

function getDateStr(date, flag) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	
	month = (month < 10) ? "0" + month : month;
	day = (day < 10) ? "0" + day : day;
	
	return String(year).substring(2, 4) + flag + month + flag + day;
}