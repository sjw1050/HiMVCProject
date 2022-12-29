$.namespace("main.best");
main.best = {
	pageClick : true,
	pageIdx : 2,
        init : function(param){

            main.best.bindEvent();

            //lazyload 처리
            common.setLazyLoad();
            //찜 처리 초기화
            common.wish.init();
            //오특 플래그
            common.gnb.todaySpecial.setTodaySpecialFlag('.newOyflag');
            if( param != undefined && param.isReviewBest == 'Y' ){
            	// 리뷰 베스트인 경우 페이징 처리 
                PagingCaller.destroy();
                main.best.getReviewBestList();
            }

            //툴팁
        	$('a.btnTool').on('mouseover', function(){
        		var _thisPos = $(this).position();
        		$(this).next('.boxTooltip').css({
        			top:(_thisPos.top)+26,
        			left:(_thisPos.left)
        		}).show();
        	}).on('mouseout', function(){
        		$(this).next('.boxTooltip').hide();
        	});
            
            //웹로그 바인딩
            setTimeout(function(){
                main.best.bindWebLog();
            }, 700);
        },

        getReviewBestList : function(){
        	
        	var dispCatNo = $("#dispCatNo").val();
	        var fltDispCatNo = $("#fltDispCatNo").val();
	        
    		PagingCaller.init({
    			callback : function(){
    				var param = {
    						pageIdx : main.best.pageIdx,
    						dispCatNo : dispCatNo,
    						rowsPerPage : 20,			// 리뷰고도화 기존 50에서 변경(2020.08.18)
    						fltDispCatNo : (fltDispCatNo == undefined || fltDispCatNo == null) ? "" : fltDispCatNo
    				}
    				common.Ajax.sendRequest(
    						"POST"
    						, _baseUrl + "main/getReviewBestListAjax.do"
    						, param
    						, main.best.getReviewBestListSuccessCallback
    						, false);
    			}
    		,startPageIdx : main.best.pageIdx
    		,subBottomScroll : 700
    		,initCall : ( main.best.pageIdx > 1 ) ? false : true
    		});
		},
		
		getReviewBestListSuccessCallback : function(res){
			if(main.best.pageIdx == 1){
				$("#reviewBestList").empty();
			}
			
			$("#reviewBestList").append(res);
			main.best.pageIdx += 1;
		},

        bindEvent : function(){
            /* 서브카테고리 로드 이벤트 */
            var fltDispCatNo = $("#fltDispCatNo").val();
            var dispCatNo = $("#dispCatNo").val();
            var cnt = 0;
            var count = 0;
            $(".common-menu ul li").each(function(idx) {
                if ( fltDispCatNo == $(this).children().attr("data-ref-dispCatNo") ) {
                    $(this).addClass("on").siblings().removeClass("on");
                    $(this).children().attr('title','선택됨');
                }
            });

            /* 탭 로드 이벤트 */
            var dispCatNo = $("#dispCatNo").val();
            $(".comm5sTabs li").each(function (){
                if(dispCatNo == $(this).attr("data-ref-dispCatNo")){
                    $(this).addClass("on").siblings().removeClass("on");
                    $(".comm5sTabs li").children().removeAttr('title');
                    $(this).children().attr('title','선택됨');
                }
            });

            /* 탭 이벤트 */
            $('.comm5sTabs > li ').on('click', function(){
                var idx = $(this).index();
                $('.comm5sTabs > li').removeClass('on').eq(idx).addClass('on');
                $('.comm5sTabs > li').removeAttr('title');
                $(this).children().attr('title','선택됨');
                main.best.goPage();
            });

            /* 서브카테고리 검색 */
            $(".common-menu ul li button[data-ref-dispcatno]").click(function() {
                $(this).parent().addClass("on").siblings().removeClass("on");
                /* 클릭 지표용 */
                count =  $( ".common-menu ul li button[data-ref-dispcatno]" ).index(this) + 1;
                if(dispCatNo == '900000100100001') { //판매 베스트 카테고리
                    common.wlog("best_category_tab_p" + count);
                } else if(dispCatNo == '900000100100002') { //리뷰 베스트 카테고리
                    common.wlog("best_category_tab_r" + count);
                }
                main.best.goPage();
            });
            
            
            /* 판매베스트 상품 랭킹 클릭지표용 */
            $(".cate_prd_list > li").click(function(){
                count =  $( ".cate_prd_list > li" ).index(this) + 1 -4 ;
                common.wlog("best_category_tab_goods" + count);
            });
            
            /* 오늘의 도움 리뷰 top5 클릭 지표용 */
            /* 리뷰고도화 추가 - 사용안함(2020.08.18) */
//            $("#reviewBestTop > li").click(function(){
//                count =  $( "#reviewBestTop > li" ).index(this) + 1;
//                common.wlog("best_goods_tab_review" + count);
//            });
            
            /* 오늘의 별점 랭킹 클릭지표용 */
            /* 리뷰고도화 추가 - 사용안함(2020.08.18) */
//            $("#reviewBestList > li").click(function(){
//                count =  $( "#reviewBestList > li" ).index(this) + 1;
//                common.wlog("best_goods_tab_goods" + count);
//            });
            
            /* 오늘의 도움 리뷰 클릭지표용 */
            /* 리뷰고도화 추가(2020.08.18) */
          	$("#reviewBestList > div").click(function(){
              	count =  $( "#reviewBestList > div" ).index(this) + 1;
              	common.wlog("best_goods_tab_review" + count);
          	});

            
            /* 상품 클릭 */
          	/* 리뷰고도화 추가 - 사용안함(2020.08.18) */
//            $(document).on("click",".review_best_thumb",function(e){
//            	e.preventDefault();
//                var goodsNo = $(this).attr("data-ref-goodsNo");
//                var dispCatNo = $(this).attr("data-ref-dispCatNo");
//                common.link.moveGoodsDetailTab(goodsNo, dispCatNo, 2);
//            });


            var url = common.cart.urlParams();

            if(url.dispCatNo === '900000100100001' || url.dispCatNo === undefined || url.dispCatNo === '') {
                var categoryTxt = ''

                $(".common-menu ul li").each(function() {
                    var selectedClass = $(this).attr('class');
                    if(selectedClass === 'on') {
                        categoryTxt = $(this).find("button").text();
                    }
                });

                $('.TabsConts.on .prd_info').each(function (index) {
                    var goodNm =  $(this).find('a').siblings('.prd_name').find('a .tx_name').text();
                    var _data_goodsno = $(this).find('a').attr('data-ref-goodsno');
                    $(this).find('a').attr("data-attr" , '랭킹^판매랭킹리스트_'+categoryTxt + '^' + goodNm + "^" + (index+1));
                    $(this).find('a').attr('data-trk', common.bindGtmTrkparam());
                    $(this).find('a.prd_thumb').attr("data-impression" , _data_goodsno+'^랭킹_판매랭킹리스트_' + categoryTxt + '^' +(index+1));
                })

                common.bindGoodsGtmImpression('.TabsConts.on','랭킹^판매랭킹리스트_'+categoryTxt);
            }


            setTimeout(function() {
                //링크 처리
                common.bindGoodsListLink();
                common.bindGoodsGtmInfo('.TabsConts.on','랭킹_판매랭킹리스트_'+categoryTxt);

            }, 100);

        },

        goPage : function(pageIdx){

            if(common.isEmpty(pageIdx) ){
                pageIdx = "1";
            }

            $("#pageIdx").val( pageIdx );

            /* 서브카테고리 검색 */
            $(".common-menu ul li").each(function(){
                if($(this).hasClass("on")){
                    $("#fltDispCatNo").val($(this).children().attr("data-ref-dispCatNo"));
                }
            });

            /* 페이징 갯수 변경검색 */
            $(".count_sort ul li").each(function (){
                if($(this).hasClass("on")){
                    $("#rowsPerPage").val($(this).children().text());
                }
            });

            /* 탭 이벤트 */
            var dispCatNoAfter = "";
            $(".comm5sTabs li").each(function (){
                if($(this).hasClass("on")){
                    dispCatNoAfter = $(this).attr("data-ref-dispCatNo");
                }
            });
            var dispCatNoBefore = $("#dispCatNo").val();

            /* 로드시 기본값이 없어서 예외처리함 */
            if(common.isEmpty(dispCatNoBefore)){
                dispCatNoBefore = $(".comm5sTabs li:first").attr("data-ref-dispCatNo");
            }

            /* 현재탭인지 구분하여 분기 처리 */
            if(dispCatNoBefore != dispCatNoAfter){
                $("#dispCatNo").val(dispCatNoAfter);
                $("#fltDispCatNo").val("");
                $("#pageIdx").val(0);
                $("#rowsPerPage").val(0);
                
                /* 리뷰고도화 추가(2020.08.18) */
                if(dispCatNoAfter == '900000100100002'){
                	$("#fltDispCatNo").val("10000010001");	// "전체"항목 제거; 스킨케어 기본 조회
                }
            }
            
            if(main.best.pageClick){
            	main.best.pageClick = false;
            	$("#initForm").attr("action", _baseUrl + "main/getBestList.do").submit();
            }
        },
        
        /**
         * 웹로그 바인딩
         */
        bindWebLog : function() {
            $(".best-area ul.comm5sTabs").each(function(){
                //핫인기세일 탭 클릭
                $(this).find("li:eq(0)").bind('click', function(){
                    common.wlog("best_category_tab");
                });
                
                //하나더/증정 탭 클릭
                $(this).find("li:eq(1)").bind('click', function(){
                    common.wlog("best_goods_tab"); 
                });
           });
        }
};    
