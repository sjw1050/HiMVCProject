$.namespace("main.planshop");
main.planshop = {
    nextPageIdx : 1,

    init : function() {
        var that = this;
        
        //서브 메뉴바 바인드 처리
        main.planshop.subCtgBindEvent();

        main.planshop.goDetailPage();

        var planshopList = $(".goods-plan > li");
        var iconCnt = 0, goodsCnt = 0;

        for (var i = 0; i < planshopList.size(); i++) {
            iconCnt += planshopList.eq(i).find("ul li .prd_info .prd_flag span.icon_flag.blank").length;
            goodsCnt += planshopList.eq(i).find("ul li").length;

            if ((i % 2) == 1) {
                if (iconCnt == 4) {
                    planshopList.eq(i - 1).find("ul li .prd_info .prd_flag").remove();
                    planshopList.eq(i).find("ul li .prd_info .prd_flag").remove();
                    
                    planshopList.eq(i - 1).css("height", "675px");
                    planshopList.eq(i).css("height", "675px");
                }
                
                if (iconCnt == 2 && goodsCnt == 2) {
                    planshopList.eq(i - 1).find("ul li .prd_info .prd_flag").remove();
                    planshopList.eq(i).find("ul li .prd_info .prd_flag").remove();
                    
                    planshopList.eq(i - 1).css("height", "675px");
                    planshopList.eq(i).css("height", "675px");
                }
                
                iconCnt = 0;
                goodsCnt = 0;
            }

            //마지막이 홀수인경우
            if (i == planshopList.size() && iconCnt > 0) {
                planshopList.eq(i).find("ul li .prd_info .prd_flag");
                
                iconCnt = 0;
                goodsCnt = 0;
            }

        }

        var fltDispCatNo = $("#fltDispCatNo").val();
        $(".common-menu ul li").each(function() {
            if ( fltDispCatNo == $(this).children().attr("data-ref-dispCatNo") ) {
                $(this).addClass("on").siblings().removeClass("on");
                $(this).children().attr('title','선택됨');
            }
        });
        
        //웹로그 바인딩
        setTimeout(function() {
            main.planshop.bindWebLog();
        }, 700);

        //오특 플래그
        common.gnb.todaySpecial.setTodaySpecialFlag('.a_detail .newOyflag');

    },
    
    /**
     * 서브카테고리 클릭 시 처리
     */
    subCtgBindEvent : function() {
        
      //서브카테고리 이벤트
        $(".common-menu ul li button[data-ref-dispcatno]").click(function() {
            $(this).parent().addClass("on").siblings().removeClass("on");
            main.planshop.goPage();
        });

        setTimeout(function() {
            //링크 처리
            common.bindGoodsListLink();
        }, 100);
    },

    goDetailPage : function(){//
        $(".goods-plan li a, .goods-plan-recom li a").bind('click', function(){
            common.link.movePlanShop($(this).attr("data-ref-dispCatNo"), $(this).attr("data-tracking-cd"));
        });
    },
    
    goPage : function (){
        /* 서브카테고리 */
        $(".common-menu ul li").each(function(){
            if($(this).hasClass("on")){
                $("#fltDispCatNo").val($(this).children().attr("data-ref-dispCatNo"));
            }
        });

        $("#initForm").attr("action", _baseUrl + "main/getPlanShopList.do").submit();
    },

    /**
     * 웹로그 바인딩
     */
    bindWebLog : function() {
        $(".goods-plan li a.planImg").each(function(planshopIdx){
            var dispCatNo = $("#fltDispCatNo").val();

            if(dispCatNo == ''){
                var tmpIdx = planshopIdx + 1;
                
                //기획전 배너
                $(this).bind('click', function(){
                    common.wlog("planshop_banner_" + tmpIdx);
                });
    
                //기획전 상품
                $(this).parent().parent().find(".cate_prd_list li").each(function(goodsIdx){
                    $(this).find(".prd_info").bind("click", function() {
                        common.wlog("planshop_banner_" + tmpIdx + "_" + (goodsIdx + 1));
                    });
                });
            }
        });
        
        // [3428974] 추천 기획전 추가
        $(".goods-plan-recom li a").each(function(planshopIdx){
            var dispCatNo = $("#fltDispCatNo").val();

            if(dispCatNo == ''){
                var tmpIdx = planshopIdx + 1;
                
                //추천 기획전 배너
                $(this).bind('click', function(){
                    common.wlog("planshop_banner_recom_" + tmpIdx);
                });
            }
        });
    }
};