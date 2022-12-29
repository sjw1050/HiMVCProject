$.namespace("main.news");
main.news = {

        init : function(){

            //오특 플래그
            common.gnb.todaySpecial.setTodaySpecialFlag('.newOyflag');

            //lazyload 처리
            common.setLazyLoad();
            //찜 처리 초기화
            common.wish.init();

            setTimeout(function() {
                //링크 처리
                common.bindGoodsListLink();

                $(".list-new li h2,p").css('cursor', 'pointer');

                /* 배너 링크 처리 */
                $(".list-new > li > .pic > img, .list-new > li > .pic > video").bind("click", function() {
                    if( !common.isEmpty($(this).parent().attr("data-wlog-id"))){
                        common.wlog( $(this).parent().attr("data-wlog-id"));
                    }
                    location.href = $(this).attr("data-ref-link-url");
                });

                /* 배너 텍스트 클릭시 배너링크 호출 */
                $(".list-new > li > h2 , .list-new > li > .text").click(function(){
                    $(this).siblings(".pic").children().click();
                });

                /* 상품이미지 클릭시 상품텍스트 링클 호출 */
                $(".list-new > li .list li .pic").click(function(){

                    $(this).siblings(".area").children().children().click();
                });

                /* 상품텍스트 클릭시 로그생성 */
                $(".list-new > li .list li .area a").click(function(){
                    var _data_goodsno =  $(this).attr('data-ref-goodsno');
                    var _item_index = $('.list-new > li .list li .area a').index((this)) + 1;
                    gtm.goods.callGoodsGtmInfo(_data_goodsno, null, 'ee-productClick', '신상_기획전상세', _item_index);

                    if( !common.isEmpty($(this).parent().parent().attr("data-wlog-id"))){
                        common.wlog( $(this).parent().parent().attr("data-wlog-id"));
                    }
                });

            }, 100);

            setTimeout(function() {
                //웹로그 바인딩
                main.news.bindWebLog();
            },700);

        },

        bindWebLog : function (){

            $(".list-new.left > li > .pic").each(function(idx) {

                var logParam = "new_banner" + (2 * idx + 1); //홀수 넘버링

                //배너로그에 필요한 id생성
                $(this).attr("data-wlog-id" , logParam);

                //GTM Tagging
                $(this).attr("data-attr", '신상^기획전상세^'+$(this).siblings('h2').text()+'^'+(2 * idx + 1));
                $(this).attr("data-trk", common.bindGtmTrkparam());
                //상품로그에 필요한 id생성
                $(this).siblings(".list").find("li .area").each(function(sidx){
                    $(this).attr("data-wlog-id", logParam  + "_"+ (sidx + 1) );
                });
            });

            $(".list-new.right > li > .pic").each(function(idx) {

                var logParam = "new_banner" + (2 * (idx +1) ); // 짝수 넘버링

                //배너로그에 필요한 id생성
                $(this).attr("data-wlog-id" , logParam);

                //GTM Tagging
                $(this).attr("data-attr", '신상^기획전상세^'+$(this).siblings('h2').text()+'^'+(2 * (idx +1) ));
                $(this).attr("data-trk", common.bindGtmTrkparam());

                //상품로그에 필요한 id생성
                $(this).siblings(".list").find("li .area").each(function(sidx){
                    $(this).attr("data-wlog-id", logParam  + "_"+ (sidx + 1) );
                });
            });
        },

};