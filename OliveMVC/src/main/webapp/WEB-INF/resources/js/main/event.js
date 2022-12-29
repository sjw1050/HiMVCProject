
$.namespace("main.event");
main.event = {

    _ajax : common.Ajax,
    init : function() {

        common.setLazyLoad();

        $('#tabList').find('a').on({
            'click' : function(e){
                e.preventDefault();

                var index = $(this).parent().index();
                var evtType = '20';
                if(index == 1){
                    evtType = '10';
                    common.wlog("event_buyuser_tab");
                }else if(index == 2){
                    evtType = '100';
//                    common.wlog("event_beautyuser_tab");
                    common.wlog("event_ollyoungUser_tab");
                }

                if(evtType == '20'){
                    common.wlog("event_alluser_tab");
                }

                common.link.moveMainEvent(evtType,1);
            }
        });

        $("#winner").click(function(){
            common.link.moveNtcList('03');
        });

        $('[data-rel="layer"]').layerOpen();
        $(".beauty_info_box").click(function(){
            common.wlog("event_beautyuser_banner");
        });


        $('.pageing').find('a').click(function(){
            var pageIdx = $(this).data('pageNo');
            // [3306051] 올영체험단 미리보기 기능 개선
            var previewDate = $("#previewDate").val();
            var previewYn = $("#previewYn").val();
            
            if(typeof pageIdx == 'undefined' || pageIdx == '') return;
            
            // [3306051] 올영체험단 미리보기 기능 개선
            if(previewYn == "Y" && previewYn != ""){
            	location.href = _plainUrl + "main/getEventList.do?evtType=100&pageIdx=" + pageIdx + "&previewDate=" + previewDate + "&previewYn=" + previewYn;
            }else{
            	common.link.moveMainEvent('100',pageIdx);
            }
        });

        $(".event_thumb_list > li").click(function(){

            var evtClssCd = $(this).find("input[name=evtClssCd]").val();
            var urlInfo = $(this).find("input[name=urlInfo]").val();
            var index = $(".event_thumb_list > li").index(this) ;
            if(index <15){
                index  = index +1;
                
                if($("#_evtType").val() == '10'){
                    common.wlog("event_buyuser_banner_" + index);
                }else{
                    common.wlog("event_alluser_banner_" + index);
                }
            }

            if(!common.isEmpty(urlInfo)){
            	var eventBaseUrl = (urlInfo.indexOf("sslYn=Y") >= 0 ? _secureUrl : _baseUrl);
                
                if($(this).find("input[name=evtNo]").val() == "00000000005763"){
                    location.href = "https://www.oliveyoung.co.kr/store/" + urlInfo;
                }else{
                    location.href = eventBaseUrl + urlInfo;
                }
            }else{
                var evtNo = $(this).find("input[name=evtNo]").val();
                common.link.moveEventDetailPage(evtNo);
            }
        });


        $(".event_beauty_list > li").click(function(){

            var index = $(".event_beauty_list > li").index(this) ;
            if(index <10){
                common.wlog("event_beautyuser_banner_" + Number(index + 1));
            }

            var urlInfo = $(this).find("input[name=urlInfo]").val();
            if(!common.isEmpty(urlInfo)){
                location.href = _baseUrl + urlInfo;
            }else{
                var evtNo = $(this).find("input[name=evtNo]").val();
                common.link.moveBeautyDetailPage(evtNo);
            }

        });
        
        $(".option_area > .op_list > li").click(function(){
    		if($(this).index() == 0){
    			location.href = _plainUrl + "main/getEventList.do?evtType=100&pageIdx=1";
    		}else{
    			location.href = _plainUrl + "main/getEventList.do?evtType=100&pageIdx=1&sEvtKeyWord=S";
    		}
        });
        
        $('#agreePushMove').click(function(){
    		   alert("APP PUSH 수신 동의는 모바일앱에서만 가능합니다.");
	    });
	       //올영로그인
        $('#agreeSmsMove').click(function(){
    	   if(common.isLogin() == true){
    		   location.href = _plainUrl +"mypage/getMktReceiptInfo.do";
    	   }else{
    		   common.link.moveLoginPage("",_plainUrl+ "main/getEventList.do?evtType=100&pageIdx=1");
    	   }
    	   
        });
    },
};


