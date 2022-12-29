$.namespace("main.sale");
main.sale = {
	pageClick : true,

        init : function(){

            main.sale.bindEvent();

            //lazyload 처리
            common.setLazyLoad();
            //찜 처리 초기화
            common.wish.init();

            setTimeout(function() {
                //링크 처리
                common.bindGoodsListLink();
            }, 100);
            
            //웹로그 바인딩
            setTimeout(function(){
                main.sale.bindWebLog();
            }, 700);
            //오특 플래그
            common.gnb.todaySpecial.setTodaySpecialFlag('.a_detail .newOyflag');

        },

        bindEvent : function(){
            /* 서브카테고리 로드 이벤트 */
            var fltDispCatNo = $("#fltDispCatNo").val();
            $(".common-menu ul li").each(function() {

                var flag = $(".sale-area").find(".comm5sTabs li").attr("id");
                var gtmDataAttr = '세일^세일카테고리_'+ (flag === 'hot' ? '핫인기세일' : '증정/하나 더') + '^' + $(this).children().text();
                $(this).children().attr('data-attr',gtmDataAttr);

                if ( fltDispCatNo == $(this).children().attr("data-ref-dispCatNo") ) {
                    $(this).addClass("on").siblings().removeClass("on");
                }
            });

            /* 탭 로드 이벤트 */
            var dispCatNo = $("#dispCatNo").val();
            $(".sale-area .comm5sTabs li").each(function (){
                if(dispCatNo == $(this).attr("data-ref-dispCatNo")){
                    $(this).addClass("on").siblings().removeClass("on");
                }
            });

            /* 탭 이벤트 */
            $('.sale-area').find('.comm5sTabs > li ').on('click', function(){
                var idx = $(this).index();
                $('.sale-area').find('.comm5sTabs > li').removeClass('on').eq(idx).addClass('on');
                main.sale.goPage();
            });

            /* 서브카테고리 검색 */
            $(".common-menu ul li button[data-ref-dispcatno]").click(function() {
                $(this).parent().addClass("on").siblings().removeClass("on");
                main.sale.goPage();
            });

            /* 데이터 정렬 검색 */
            $(".align_sort ul li").click(function (){
                $(this).addClass("on").siblings().removeClass("on");
                main.sale.goPage($("#pageIdx").val());
            });

            /* 페이징 갯수 변경검색 */
            $(".count_sort ul li").click(function (){
                $(this).addClass("on").siblings().removeClass("on");
                main.sale.goPage();
            });

            /* 리스트 형태 UI제어 */
            $('.type_sort').find('button').click(function(){
                if($(this).hasClass('btn_thumb')){
                    $('.cate_prd_list').removeClass('list_type');
                }else{
                    $('.cate_prd_list').addClass('list_type');
                }
                $(this).addClass('active').siblings().removeClass('active');
				$('.recent_prd_box .cate_prd_list').removeClass('list_type');
            });

            /* 리스트 출력형태 로드시 이벤트 */
            $(".type_sort .active").click();

            /* 페이징 이벤트 */
            $(".pageing").find("a").click(function(){

                var pageIdx = $(this).data("pageNo");
                if(typeof pageIdx == "undefined" || pageIdx == "") return;

                main.sale.goPage(pageIdx);
            });

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

            /* 데이터 정렬 검색 */
            $(".align_sort ul li").each(function (){
                if($(this).hasClass("on")){
                    $("#prdSort").val($(this).children().data().prdsoting);
                }
            });

            /* 페이징 갯수 변경검색 */
            $(".count_sort ul li").each(function (){
                if($(this).hasClass("on")){
                    $("#rowsPerPage").val($(this).children().text());
                }
            });

            /* 리스트 출력형태 이벤트 */
            $(".type_sort button").each(function (){
                if($(this).hasClass("active")){
                    var $searchTypeSort = $(this).clone();
                    $("#searchTypeSort").val(  $searchTypeSort.removeClass("active").attr("class").trim() );
                }
            });

            /* 탭 이벤트 */
            var dispCatNoAfter = "";
            $(".sale-area .comm5sTabs li").each(function (){
                if($(this).hasClass("on")){
                    dispCatNoAfter = $(this).attr("data-ref-dispCatNo");
                }
            });
            var dispCatNoBefore = $("#dispCatNo").val();

            /* 로드시 기본값이 없어서 예외처리함 */
            if(common.isEmpty(dispCatNoBefore)){
                dispCatNoBefore = $(".sale-area .comm5sTabs li:first").attr("data-ref-dispCatNo");
            }

            /* 현재탭인지 구분하여 분기 처리 */
            if(dispCatNoBefore != dispCatNoAfter){
                $("#dispCatNo").val(dispCatNoAfter);
                $("#fltDispCatNo").val("");
                $("#prdSort").val("");
                $("#pageIdx").val(1);
                $("#rowsPerPage").val(24);
                $("#searchTypeSort").val("");
            }
            
            if(main.sale.pageClick){
            	main.sale.pageClick = false;
            	$("#initForm").attr("action", _baseUrl + "main/getSaleList.do").submit();
            }
        },
        
        /**
         * 웹로그 바인딩
         */
        bindWebLog : function() {
            $(".sale-area ul.comm5sTabs").each(function(){
                //핫인기세일 탭 클릭
                $(this).find("li:eq(0)").bind('click', function(){
                    common.wlog("sale_popular_tab");
                });
                
                //하나더/증정 탭 클릭
                $(this).find("li:eq(1)").bind('click', function(){
                    common.wlog("sale_more_tab"); 
                });
           });
        }

};