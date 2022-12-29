$.namespace("common.link");
common.link = {
    /**
     * 메인 이동
     */
    moveMainHome : function() {
        location.href = _plainUrl + "main/main.do";
    },
    /**
     * kiosk 메인 이동
     */
    moveMainHomeKiosk : function() {
        setTimeout(function(){
            location.href = _plainUrl + "kiosk/main.do";
        },10);
    },

    /**
     *  메인 - 브랜드 검색  이동
     */
    moveBrandPage : function() {
        location.href = _plainUrl + "main/getBrandList.do";
    },

    /**
     *  메인 - 핫딜 이동
     */
    moveMainHotdeal : function() {
        location.href = _plainUrl + "main/getHotdealList.do";
    },

    /**
     *  메인 - 테마샵 이동
     */
    moveMainTheme : function() {
        location.href = _plainUrl + "main/getThemeList.do";
    },
    
    /**
     *  메인 - 올리브영 멤버십이동 이동
     */
    
   /* moveMainMembership : function(couponMode) {
        location.href = _secureUrl + "main/getMembership.do?;
    },*/
    
    /**
     *  멤버십 라운지 이동
     */
    moveMembershipLounge : function() {
        location.href = _plainUrl + "main/getMembership.do";
        common.wlog("coupon_onbenefit_tab");
    },
    
    /**
     *  멤버십 등급별 혜택 이동
     */
    getMembershipBenefitInfoMoveUrl : function() {
        location.href = _plainUrl + "main/getMembershipBenefitInfo.do";
    	common.wlog("mem_lounge_membenefit");
    },
    
    
    /**
     *  메인 - 쿠폰혜택 이동
     */
    moveMainCoupon : function(couponMode) {
        location.href = _secureUrl + "main/getCouponList.do?couponMode="+couponMode;
    	common.wlog("mem_lounge_cpn_benefit");
    },

    /**
     *  탑리뷰어 이동
     */
    moveTopReviewer : function() {
    	location.href = _plainUrl +"mypage/getReviewerLounge.do";
        common.wlog("best_goods_tab_go_reviewer");
    },

    /**
     *  올영체험단 이동
     */
    moveOllyoung : function() {
    	location.href = _plainUrl + "main/getEventList.do?evtType=100&pageIdx=1";
    	common.wlog("event_ollyoungUser_tab");
    },
    /**
     * 올영체험단 상품상세 이동
     */
    moveOllyoungGoodsDetail : function(goodsNo , dispCatNo, index) {
        var param = "?goodsNo=" + goodsNo;
        if (!common.isEmpty(dispCatNo)) {
            param = param + "&dispCatNo=" + dispCatNo;
        }
        if(!common.isEmpty(index)){
            common.wlog("event_ollyoungUser_banner_"+index);   
        }
        location.href = _plainUrl + "goods/getGoodsDetail.do" + param;
    },
    
    /**
     * 메인 - 이벤트 이동
     */
    moveMainEvent : function(evtType,pageIdx) {

        if(common.isEmpty(evtType)){
            location.href = _plainUrl + "main/getEventList.do";
        }else if(common.isEmpty(pageIdx)){
            location.href = _plainUrl + "main/getEventList.do?evtType="+evtType;
        }else{
            location.href = _plainUrl + "main/getEventList.do?evtType="+evtType+"&pageIdx="+pageIdx;
        }
    },

    /**
     *  메인 - 기획전 이동
     */
    moveMainPlanShop : function() {
        location.href = _plainUrl + "main/getPlanShopList.do";
    },

    /**
     *  메인 - 온리원 이동
     */
    moveMainOnlyOne : function() {
        location.href = _plainUrl + "main/getOnlyOneList.do";
    },

    /**
     *  메인 - 신상품 이동
     */
    moveMainNew : function() {
        location.href = _plainUrl + "main/getNewList.do";
    },

    /**
     *  메인 - 세일 이동
     */
    moveMainSale : function() {
        location.href = _plainUrl + "main/getSaleList.do";
    },

    /**
     *  메인 - 베스트 이동
     */
    moveMainBest : function() {
        location.href = _plainUrl + "main/getBestList.do";
    },

    /**
     * 마이페이지 메인 이동
     */
    moveMyPageMain : function() {
        location.href = _secureUrl + "mypage/myPageMain.do";
    },

    /**
     * 상품상세 이동
     */
    moveGoodsDetail : function(goodsNo , dispCatNo, trackingCd) {
        location.href = common.link.getGoodsDetailUrl(goodsNo, dispCatNo, trackingCd);
    },

    /**
     * 상품 상세 url 생성
     */
    getGoodsDetailUrl : function(goodsNo, dispCatNo, trackingCd) {
        var param = "?goodsNo=" + goodsNo;
        if (!common.isEmpty(dispCatNo)) {
            param = param + "&dispCatNo=" + dispCatNo;
            // trackingCd 값이 없는 경우 null로 들어와 분기 처리 = [3389141] (영역별 매출분석) 오특, 검색, 베스트, 메인 추가(CHY)
            if(trackingCd!=null && trackingCd!=undefined && trackingCd != 'null'){
                param = param + "&trackingCd="+trackingCd;
            }
        }else{
            // trackingCd 값이 없는 경우 null로 들어와 분기 처리 = [3389141] (영역별 매출분석) 오특, 검색, 베스트, 메인 추가(CHY)
            if(trackingCd!=null && trackingCd!=undefined && trackingCd != 'null'){
                param = param + "&trackingCd="+trackingCd;
            }
        }
        return _plainUrl + "goods/getGoodsDetail.do" + param;
    },

    /**
     * curation 상품상세 이동
     * trackingCd 변수 추가 - [3389141] (영역별 매출분석) 오특, 검색, 베스트, 메인 추가(CHY)
     */
    moveGoodsDetailCuration : function(goodsNo , dispCatNo, curation, rccode, egcode, egrank, trackingCd) {
        var param = "?goodsNo=" + goodsNo;
        if (!common.isEmpty(dispCatNo)) {
            param = param + "&dispCatNo=" + dispCatNo;
        }
        if (!common.isEmpty(curation)) {
            param = param + "&curation=" + curation;
        }
        if (!common.isEmpty(rccode)) {
            param = param + "&rccode=" + rccode;
        }
        if (!common.isEmpty(egcode)) {
        	param = param + "&egcode=" + egcode;
        }
        if (!common.isEmpty(egrank)) {
        	param = param + "&egrankcode=" + egrank;
        }
        if (!common.isEmpty(trackingCd)) {
            param = param + "&trackingCd=" + trackingCd;
        }
        location.href = _plainUrl + "goods/getGoodsDetail.do" + param;
    },
    
    //키오스크 일경우
    moveGoodsDetailCurationKiosk : function(goodsNo , dispCatNo, curation, rccode, kioskMenuId) {
        var param = "?goodsNo=" + goodsNo;
        param = param + "&curation=" + curation;
        param = param + "&rccode=" + rccode;
        param = param + "&kioskMenuId=" + kioskMenuId;
        if (!common.isEmpty(dispCatNo)) {
            param = param + "&dispCatNo=" + dispCatNo;
        }
        setTimeout(function(){
        location.href = _plainUrl + "kiosk/getGoodsDetail.do" + param;
        },10);
    },
    
    /**
     * 매장 상품상세 이동 
     */
    moveGoodsDetailOffline : function(goodsNo , dispCatNo) {
        var param = "?goodsNo=" + goodsNo;
        if (!common.isEmpty(dispCatNo)) {
            param = param + "&dispCatNo=" + dispCatNo;
        }
        location.href = _plainUrl + "goods/getGoodsDetailOfflinePrint.do" + param;
    },
    /**
     * 상품상세 이동
     */
    moveGoodsDetailKiosk : function(goodsNo , dispCatNo) {
        var kioskMenuId =  $("#kioskMenuId").val();
        var param = "?goodsNo=" + goodsNo+"&kioskMenuId="+kioskMenuId;
        if (!common.isEmpty(dispCatNo)) {
            param = param + "&dispCatNo=" + dispCatNo;
        }
        setTimeout(function(){
        location.href = _plainUrl + "kiosk/getGoodsDetail.do" + param;
        },10);
    },
    /**
     * 매장 상품상세 이동 
     */
    moveGoodsDetailBarcodeOffline : function(goodsNo) {
        var param = "?goodsNo=" + goodsNo;
        
        location.href = _plainUrl + "goods/getGoodsDetailOfflinePrint.do" + param;
    },

    /**
     * 상품상세 이동 (새창)
     */
    moveGoodsDetailNew : function(goodsNo , dispCatNo) {
        var param = "?goodsNo=" + goodsNo;
        if (!common.isEmpty(dispCatNo)) {
            param = param + "&dispCatNo=" + dispCatNo;
        }
        window.open(_plainUrl + "goods/getGoodsDetail.do" + param);
    },

    /**
     * 기획전 상세 카테고리로 이동
     * trackingCd 변수 추가 - [3389141] (영역별 매출분석) 오특, 검색, 베스트, 메인 추가(CHY)
     */
    movePlanShop : function(dispCatNo, trackingCd) {
    	var param = "?dispCatNo=" + dispCatNo;
    	
    	if (!common.isEmpty(trackingCd)) {
            trackingCd = common.cart.urlParams().trackingCd || trackingCd;
            param = param + "&trackingCd=" + trackingCd;
        }
    	
    	location.href = _plainUrl + "planshop/getPlanShopDetail.do"+param;
    },
    /**
     * 연관된 기획전 상세 카테고리로 이동
     */
    moveRelPlanShop : function(dispCatNo, curation) {
        location.href = _plainUrl + "planshop/getPlanShopDetail.do?dispCatNo="+dispCatNo+"&curation="+curation;
    },
    /**
     * KIOSK 기획전 상세 카테고리로 이동
     */
    movePlanShopKiosk : function(dispCatNo) {
        var kioskMenuId =  $("#kioskMenuId").val();
        var param = "?dispCatNo=" + dispCatNo;
        if (kioskMenuId) {
            param = param +"&kioskMenuId="+kioskMenuId;
        }
        setTimeout(function(){
        location.href = _plainUrl + "kiosk/getPlanShopDetail.do"+param;
        },10);
    },

    /**
     * 전문관 카테고리
     */
    moveSpcShop : function(dispCatNo) {
        location.href = _plainUrl + "planshop/getSpcShopDetail.do?dispCatNo="+dispCatNo;
    },

    /**
     * 브랜드관카테고리로 이동
     */
    moveBrandShop : function(onlBrndCd, trackingCd, gateCd) {
        var param = "";
        if (!common.isEmpty(trackingCd)) {
            param = "&trackingCd=" + trackingCd;
        }
        if (!common.isEmpty(gateCd)) {
            param = "&gateCd=" + gateCd;
        }
        if (window.location.href.indexOf('Drawer') > -1) {
            param += "&gateCd=Drawer";
        }
        location.href = _plainUrl + "display/getBrandShopDetail.do?onlBrndCd=" + onlBrndCd + param;
    },
    moveBrandShopKiosk : function(onlBrndCd) {
        setTimeout(function(){
            location.href = _plainUrl + "kiosk/getBrandShopDetail.do?onlBrndCd="+onlBrndCd;
        },10);
    },
    
    /**
     * 카테고리관으로 이동 - 카테고리관 추가 (2020.05)
     */
    moveCategoryShop : function(dispCatNo, gateCd) {
        location.href = _plainUrl + "display/getCategoryShop.do?dispCatNo="+dispCatNo  + (gateCd ? '&gateCd='+gateCd : '');
    },
    
    /**
     * 전시카테고리로 이동
     */
    moveCategory : function(dispCatNo, trackingCd, gateCd) {
        var loginCnt = sessionStorage.getItem("lCnt");
        var aShowCnt = sessionStorage.getItem("aCnt");
        var bShowCnt = sessionStorage.getItem("bCnt");
        var cShowCnt = sessionStorage.getItem("cCnt");
        var uprCatNo = dispCatNo.substring(0, 7);
        var gateCd = gateCd ? '&gateCd=' + gateCd : '';
        var param = "";
        if (!common.isEmpty(trackingCd)) {
            param = "&trackingCd=" + trackingCd
        }

        if(loginCnt=="null" || loginCnt==null){
            loginCnt = 0;
            sessionStorage.setItem("lCnt", 0);
            aShowCnt = 0;
            sessionStorage.setItem("aCnt", 0);
            bShowCnt = 0;
            sessionStorage.setItem("bCnt", 0);
            cShowCnt = 0;
            sessionStorage.setItem("cCnt", 0);
        } else if("1000001" == uprCatNo){
            loginCnt++;
            sessionStorage.setItem("lCnt", loginCnt);
        }
//        alert(aShowCnt + "\n" + bShowCnt + "\n" + cShowCnt);
        location.href = _plainUrl + "display/getMCategoryList.do?dispCatNo="+dispCatNo+"&isLoginCnt="+loginCnt+"&aShowCnt="+aShowCnt+"&bShowCnt="+bShowCnt+"&cShowCnt="+cShowCnt + gateCd + param;
    },

    /**
     * 전문관 상품 리스트로 이동 
     */
    moveLuxurySpcShopGoodsList : function(dispCatNo,setNo){
        location.href = _plainUrl + "planshop/getLuxurySpcShopGoodsList.do?dispCatNo="+dispCatNo+"&setNo="+setNo+"&trackingCd=Premium_Cat_PROD";
    },
    /**
     * 로그인 페이지로 이동
     */
    moveLoginPage : function(authYn, redirectUrl){
        var param = "";
        if (authYn != undefined && authYn != null && authYn != "") {
            param = "?authYn=" + authYn;
        }
        if (redirectUrl != undefined && redirectUrl != null && redirectUrl != "") {
            if (param != "") {
                param = param + "&redirectUrl=" + encodeURIComponent(redirectUrl);
            } else {
                param = "?redirectUrl=" + encodeURIComponent(redirectUrl);
            }
        }
        location.href = _secureUrl + "login/loginForm.do" + param;
    },
    
    /**
     * 로그인 페이지로 이동
     */
    moveLoginCurationPage : function(authYn, redirectUrl){
        var param = "";
        if (authYn != undefined && authYn != null && authYn != "") {
            param = "?authYn=" + authYn;
        }
        if (redirectUrl != undefined && redirectUrl != null && redirectUrl != "") {
            if (param != "") {
                param = param + "&redirectUrl=" + encodeURIComponent(redirectUrl);
            } else {
                param = "?redirectUrl=" + encodeURIComponent(redirectUrl);
            }
        }
        common.wlog("home_curation_login1");
        location.href = _secureUrl + "login/loginForm.do" + param;
    },


    /**
     * 로그인 페이지로 이동
     */
    moveRegCertPage : function(authYn,redirectUrl){
        var param = "";
        if (authYn != undefined) {
            param = "?authYn=" + authYn;
            if (redirectUrl != undefined && redirectUrl != null && redirectUrl != "") {
                if (param != "") {
                    param = param + "&redirectUrl=" + encodeURIComponent(redirectUrl);
                } else {
                    param = "?redirectUrl=" + encodeURIComponent(redirectUrl);
                }
            }
        }
        location.href = _secureUrl + "customer/regCertification.do" + param;
    },

    /**
     * 로그아웃 페이지로 이동
     */
    moveLogoutPage : function(){
        sessionStorage.setItem("lCnt", 0);
        sessionStorage.setItem("aCnt", 0);
        sessionStorage.setItem("bCnt", 0);
        sessionStorage.setItem("cCnt", 0);
        //로그아웃
        /* 3200210  큐레이션 개선 관련 건-레코벨 데이터 송부
         * 로그인 유저에 한해서 피부정보 조회(동의여부 기반 조회)
         * 중복 호출을 막기 위해, localStorage 사용.
         * updateSkinYn은 '프로필-나의 피부 컨디션 정보 변경 시, N으로 변경되며, 'N'에 해당 경우에만 DB를 호출하도록 변경
         * 로그아웃 시에는 localStorage에서 제거
       	 * 해당건은 2020-02-20에 배포 예정 
		 */
		if (localStorage)
			localStorage.removeItem("updateSkinYn");
		
        /* 3212592 12월올영세일_온라인몰 특이현상 점검 및 개선 요청의 件 
         * "login/loginCheckJson.do" 중복 호출을 막기 위한 SessionStorage내, checkLoginStatus등록
         * 만약 checkLoginStatus내에 값이 존재할 경우, 값을 반환한다.
         * 로그 아웃일 경우,  SessionStorage내, checkLoginStatus를 제거한다.
         */		
		sessionStorage.removeItem("checkLoginStatus");

        // 2022 페스타 본컴 루돌프 응모 결과 삭제
        sessionStorage.removeItem("todaySpecialRudolfYN");
        sessionStorage.removeItem("rankingRudolfYN");
        sessionStorage.removeItem("awardRudolfYN");

        location.href = _secureUrl + "login/logout.do";
    },

    /**
     * 회원가입 페이지로 이동
     * [3336927] 회원 가입 후 이동 페이지 변경 2007071 ~ 201231
     * [3461403] 약관동의 팝업 동의 후 레이어팝업 문구/URL 수정 요청
     */
    moveJoinMember : function(){
        var url = _memberJoinUrl;
        var evtNo = common.memJoinEvtNo();
        
        if( !common.isEmpty(evtNo) ){
            url = _memberJoinUrl + "&coop_return_url=" + encodeURIComponent(_baseUrl+"event/getEventDetail.do?evtNo="+evtNo);
        }
        
        window.open(url);
    },

    /**
     * 장바구니 페이지 이동
     */
    moveCartPage : function(){
    	//오늘드림 체크박스 체크여부
    	/*var quickYn = sessionStorage.getItem('O2O_CHK');
    	if(!common.isEmpty(quickYn) && quickYn=='Y' && recoCart != "Y"){
    		location.href = _secureUrl + "cart/getCart.do?quickYn=Y";
    	}else if(!common.isEmpty(quickYn) && quickYn=='N'){
    		location.href = _secureUrl + "cart/getCart.do?quickYn=N";
    	}else{
    		location.href = _secureUrl + "cart/getCart.do";
    	}*/
        
    	var quickYn = sessionStorage.getItem("O2O_CHK");
    	if(!common.isEmpty(quickYn) && quickYn == "Y") {
    		location.href = _secureUrl + "cart/getCart.do?quickYn=Y";
    	} else {
    		location.href = _secureUrl + "cart/getCart.do";
    	}
    },


    /**
     * 주문배송목록 페이지 이동
     */
    moveOrderList : function(){
        location.href = _secureUrl + "mypage/getOrderList.do";
    },

    /**
     * 고객센터 메인 페이지 이동
     */
    moveCounselMain : function(){
        location.href = _plainUrl + "counsel/main.do";
    },

    /**
     * 매장안내 메인 페이지 이동
     */
    moveStoreMain : function(){
        sessionStorage.removeItem("storePageIdx");
        location.href = _plainUrl + "store/getStoreMain.do?trackingCd=Store_Recommend_Best";
    },

    /**
     * 매장상세 페이지 이동
     */
    moveStoreDetail : function(strNo, isMap){
        if (isMap) {
            location.href = _plainUrl + "store/getStoreDetail.do?strNo=" + strNo + "#mapInfo";
        } else {
            location.href = _plainUrl + "store/getStoreDetail.do?strNo=" + strNo;
        }
    },

    /**
     * 공지 이동
     * 관심매장  : 02
     */
    moveNtcList : function(ntcClssCd) {
        if (ntcClssCd == undefined) {
            ntcClssCd = "";
        }
        location.href = _plainUrl + "counsel/getNoticeList.do?ntcClssCd=" + ntcClssCd;
    },

    /**
     * 공지 상세
     */
    moveNtcDetail : function(ntcClssCd, ntcSeq) {
        if (ntcClssCd == undefined) {
            ntcClssCd = "";
        }
        if (ntcSeq == undefined) {
            ntcSeq = "";
        }
        location.href = _plainUrl + "counsel/getNoticeDetail.do?ntcSeq=" + ntcSeq + "&ntcClssCd=" + ntcClssCd;
    },

    /**
     * FAQ 이동
     */
    moveFaqList : function() {
        location.href = _plainUrl + "counsel/getFaqList.do";
    },

    /**
     * QNA 이동
     */
    moveQnaList : function(cnslSeq) {
        if (cnslSeq == undefined) {
            cnslSeq = "";
        }
        location.href = _secureUrl + "counsel/getQnaList.do?cnslSeq="+cnslSeq;
        
        
    },
    
    /**
     * QNA 작성 폼 이동
     */
    moveQnaForm : function() {
        location.href = _secureUrl + "counsel/getQnaForm.do";
    },

    /**
     * 검색 메인 이동
     */
    moveSearchMain : function() {

        alert("검색메인 작업 후 redirect 처리예정.");
        return;
    },

    /**
     * 개인정보 처리방침 페이지 이동
     */
    movePrivacyPage : function() {
        location.href = _plainUrl + "company/privacy.do";
    },

    /**
     * 영상정보처리기기 운영/관리 방침 페이지 이동
     */
    moveMultimediaPage : function() {
        location.href = _plainUrl + "company/multimedia.do";
    },

    /**
     * 이메일 무단 수집 거부 페이지 이동
     */
    moveDenyEmailPage : function() {
        location.href = _plainUrl + "company/denyEmail.do";
    },

    /**
     * 이용약관 페이지 이동
     */
    moveTermsPage : function() {
        location.href = _plainUrl + "company/terms.do";
    },

    /**
     * 법적고지 페이지 이동
     */
    moveLegalPage : function() {
        location.href = _plainUrl + "company/legal.do";
    },

    /**
     * 청소년 보호 정책 페이지 이동
     */
    moveYouthProtectionPage : function() {
        location.href = _plainUrl + "company/youthProtection.do";
    },

    /**
     * 서비스 가입사실 확인
     */
    moveServiceJoinConfirmPage : function() {
        window.open("http://image.cjmall.net/cjupload/hanabank_20160331.pdf", "_blank");
    },

    /**
     * 이벤트 상세 페이지 이동
     */
    moveEventDetailPage : function(evtNo) {
        location.href = _plainUrl + "event/getEventDetail.do?evtNo="+evtNo;
    },

    /**
     * 뷰티테스터 상세 페이지 이동
     */
    moveBeautyDetailPage : function(evtNo) {
        location.href = _plainUrl + "beauty/getBeautyDetail.do?evtNo="+evtNo;
    },

    /**
     * 매장안내 상세 페이지 이동
     */
    moveStoreDetailPage : function(strNo) {
        location.href = _plainUrl + "store/getStoreDetail.do?strNo="+strNo;
    },

    /**
     * 마이 뷰티리스트 페이지 이동
     */
    moveMyBeautyListPage : function(searchMonth,startDate,endDate,pageIdx) {
        location.href = _secureUrl + "mypage/getMyBeautyList.do?searchMonth="+searchMonth+"&startDate="+startDate + "&endDate="+endDate+"&pageIdx="+pageIdx;
    },
    
    /**
     * 마이 올영체험단 상품평 페이지 이동
     */
    moveMyOllyoungListPage : function(searchMonth,startDate,endDate,pageIdx) {
    	//파라미터를 안쓰고 펑션을 호출하는 페이지도 있기 떄문에 undefined 체크 추가 
    	var param = "";
    	param += typeof searchMonth != "undefined" ? "searchMonth="+searchMonth : "";
    	if(param != "") param +="&";
    	param += typeof startDate != "undefined" ? "startDate="+startDate : "";
    	if(param != "") param +="&";
    	param += typeof endDate != "undefined" ? "endDate="+endDate : "";
    	if(param != "") param +="&";
    	param += typeof pageIdx != "undefined" ? "pageIdx="+pageIdx : "";
    	location.href = _secureUrl + "mypage/getMyOllyoungList.do?" + param;
    },

    /**
     * 마이 이벤트 페이지 이동
     */
    moveMyEventListPage : function(searchMonth,startDate,endDate,pageIdx) {
        location.href = _secureUrl + "mypage/getMyEventList.do?searchMonth="+searchMonth+"&startDate="+startDate + "&endDate="+endDate+"&pageIdx="+pageIdx;
    },

    /**
     * 마이 뷰티리스트 페이지 후기작성이동
     */
    moveMyBeautyWritePage : function(evtNo,goodsNo,retUrl) {
        location.href = _secureUrl + "mypage/getGdasForm.do?evtNo="+evtNo+"&goodsNo="+goodsNo+"&gdasSctCd=30";
    },

    /**
     * 마이 페이지 배송지 수정
     */
    moveMyDeliveryInfoPage : function() {
        location.href = _secureUrl + "mypage/getDeliveryInfo.do";
    },

    /**
     * 공정거래위원회>정보공개>사업자등록현황>통신판매사업자>상세조회화면 으로 이동
     */
    openFtcBizInfo : function() {
        window.open("http://www.ftc.go.kr/bizCommPop.do?wrkr_no=8098101574");
    },

    /**
     * LGU+ 에스크로
     */
    openLGUPEscrow : function() {
        window.open("https://pgweb.uplus.co.kr/ms/escrow/s_escrowYn.do?mertid=CJS31", "", "width=460,height=520,resizable=no,scrollbars=no, status=yes,toolbar=no");
    },

    /**
     * 하나은행 지급보증서
     */
    openEscrowPopup : function(url, popupName, windowWidth, windowHeight) {
        var browserWidth = document.documentElement.clientWidth;   // 현재창의 너비
        var browserHeight = document.documentElement.clientHeight; // 현재창의 높이
        var browserLeft = window.screenX || window.screenLeft || 0;   // 현재창의 x좌표
        var browserTop = window.screenY || window.screenTop || 0;    // 현재창의 y좌표

        var left = browserLeft + (browserWidth - windowWidth)/2;
        var top = browserTop + (browserHeight - windowHeight)/2;

        window.open(url, popupName, "left="+left+",top="+top+",width="+windowWidth+",height="+windowHeight+",toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no");
    },

    /**
     * 사이버감사실
     */
    openCyberAudit : function() {
        window.open("https://ethics.cj.net/whistles/information");
        
        common.cyber.oyLayerClose('cyberAuditPop');
        //location.href = _plainUrl + "prvsuser/getCjaudit.do";
    },

    /**
     * 상품상세 이동(새창모드)
     */
    openGoodsDetail : function(goodsNo) {
        window.open(_plainUrl + "goods/getGoodsDetail.do?goodsNo=" + goodsNo, '상품상세');
    },

    /**
     * 마이 회원정보수정 이동
     */
    moveMemberInfoChangePage : function() {
        location.href = _secureUrl + "mypage/getMktReceiptInfo.do";
    },

    /**
     * 1:1문의 리스트 이동
     */
    moveCounselListPage : function() {
        location.href = _secureUrl + "counsel/getQnaList.do";
    },

    openKakao : function() {
        window.open('https://pf.kakao.com/_xbmwYh', '');
        return;
    },

    /**
     * 상품상세 탭으로 이동
     * trackingCd 변수 추가 - [3389141] (영역별 매출분석) 오특, 검색, 베스트, 메인 추가(CHY)
     */
    moveGoodsDetailTab : function(goodsNo , dispCatNo, moveTab, trackingCd) {
        var param = "?goodsNo=" + goodsNo;
        if (!common.isEmpty(dispCatNo)) {
            param = param + "&dispCatNo=" + dispCatNo;
        }
        
        if (!common.isEmpty(trackingCd)) {
            param = param + "&trackingCd=" + trackingCd;
        }

        sessionStorage.setItem("moveTab", moveTab);
        location.href = _plainUrl + "goods/getGoodsDetail.do" + param;
    },
    
    /**
     * 공통 URL 이동 ( CONTEXT 이후의 URL로 이동하기 )
     * trackingCd 변수 추가 - [3389141] (영역별 매출분석) 오특, 검색, 베스트, 메인 추가(CHY)
     */
    commonMoveUrl : function(url){
    	var trackingCd = $(".plan-visual").attr("name");
    	
    	if (!common.isEmpty(trackingCd) && url.indexOf("?") != -1) {
    		url = url + "&trackingCd=" + trackingCd;
    	}else if(!common.isEmpty(trackingCd) && url.indexOf("?") == -1){
    		url = url + "?trackingCd=" + trackingCd;
    	}
    	
        location.href = _plainUrl + url;
    },
    
    /**
     * 오늘드림 테마리스트 URL
     */
    moveQuickListUrl : function(themeNo, themeNm, themeType, trackingCd) {
        location.href = _plainUrl + "quick/getFOQuickList.do?dispCatNo="+themeNo+"&themeType="+themeType + (trackingCd ? '&trackingCd=' + trackingCd : '');
    },
    /**
     *  메인 - 오늘드림  이동
     */
    moveQuickMainPage : function() {
        location.href = _plainUrl + "main/getQuickMainList.do";
    },
    /**
     * KIOSK 테마리스트 URL
     */
    moveQuickListUrlKiosk : function(themeNo, themeNm, themeType,menuId) {
        setTimeout(function(){
            var kioskMenuId = menuId;
            if(!kioskMenuId){
                kioskMenuId = $("#kioskMenuId").val();
            }
            location.href = _plainUrl + "kiosk/getFOQuickList.do?dispCatNo="+themeNo+"&themeType="+themeType+"&kioskMenuId="+kioskMenuId;
        },10);
    },
    /**
     *  메인 - KIOSK  이동
     */
    moveQuickMainPageKiosk : function(menuId) {
        setTimeout(function(){
            var kioskMenuId = menuId;
            if(!kioskMenuId){
                kioskMenuId = $("#kioskMenuId").val();
            }
            location.href = _plainUrl + "kiosk/getQuickMainList.do?kioskMenuId=03";
        },10);
    },
    
    /**
     * 설문 온라인몰 연동
     */
    openCampSurvey : function(res) {
    	var modifyEvtCampLinkUrl = res.evtCampLinkUrl;
    	window.open(modifyEvtCampLinkUrl);
    }
};
