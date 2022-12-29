var console = window.console || {
    log : function() {
    },
    info : function() {
    },
    warn : function() {
    },
    error : function() {
    }
};

//바로구매 장바구니에서 프로모션 자세히보기레이어의 장바구니 버튼을 눌렀을때 응답 카트번호 저장
var cartNosForDirectCart = "";
var beautyLoginCnt = sessionStorage.getItem("lCnt");
var recoCart = "N";
var goodsDetailCartYn = "N";
var recoRcCode = "";

//3440969_PM작업시 오늘드림 레이어 팝업 노출 요청 건
var rcvStr = ''; //전달받는 처리 유형
var rcvObj = ''; //전달받는 속성 Object

if(beautyLoginCnt == null || beautyLoginCnt == 'NaN' || beautyLoginCnt == "null") beautyLoginCnt = 0;

// 오특 타이머 Interval
var commonTimerInterval = 0;
var commonTodaySpecialInterval = 0;


// 공통 타이머
var commonTimer = {
    hours : '00',
    minutes : '00',
    seconds : '00'
};

$.namespace = function() {
    var a = arguments, o = null, i, j, d;
    for (i = 0; i < a.length; i = i + 1) {
        d = a[i].split(".");
        o = window;
        for (j = 0; j < d.length; j = j + 1) {
            o[d[j]] = o[d[j]] || {};
            o = o[d[j]];
        }
    }
    return o;
};

jQuery.fn.serializeObject = function() {
    var obj = null;
    try{
        if ( this[0].tagName && this[0].tagName.toUpperCase() == "FORM" ) {
            var arr = this.serializeArray();
            if ( arr ) {
              obj = {};
              jQuery.each(arr, function() {
                obj[this.name] = this.value;
              });
            }
        }
    }
    catch(e) {}
    finally  {}

    return obj;
};

$.namespace("common");
common = {

    scrollPos : 0,

    cannotAccess : function() {
        alert('접근할 수 없습니다. 권한이 부족합니다.');
    },
    validateFieldNotEmpty : function(id, message) {
        var loginId = $(id).val();
        if ($.trim(loginId) == '') {
            alert(message);
            return false;
        }

        return true;
    },
    convertSystemToJtmpl : function(str){
        if(str){
            str = str.replace(/\n/gi, "<br/>");
            str = str.replace(/ /gi, "&nbsp;");
            return str;
        }
    },
    splitToEnterKey : function(str){
        if(str){
            var patt= /\n/g;

            if(patt.test(str)){
                str = str.split(/\r|\n/)[0];
            }
            return str;
        }
    },

    sessionClear:function(){
        var url = _baseUrl +"login/sessionClear.do";
        common.Ajax.getAjaxObj("POST", url, "");
        console.log("sessionClear=======");
    },

    /**
     * 약관동의 이벤트페이지 이벤트번호 가져오기
     * [3461403] 약관동의 팝업 동의 후 레이어팝업 문구/URL 수정 요청
     */
    memJoinEvtNo : function() {

        var evtNo = "";
        var url= _baseUrl + "event/getAgreeTermEventInfoAjax.do";

        $.ajax({
            type: "POST",
            url: url,
            dataType : 'json',
            async: false,
            success: function(data) {
                if(data.result){
                    evtNo = data.evtNo;
                }
                return evtNo;
            }
        });
        return evtNo;
    },
    
    loginChkForEvt : function(){
        var url= _baseUrl + "login/loginCheckJson.do";
        var loginResult = false;

        $.ajax({
            type: "POST",
            url: url,
            data: null,
            dataType : 'json',
            async: false,
            cache: false,
            success: function(data) {

                if(!data.result && data.url!=null){
                    window.location.href = _secureUrl + data.url + "?redirectUrl=" + encodeURIComponent(location.href);
                }

                loginResult = data.result;
            },
            error : function(a, b, c) {
                console.log(a);
                console.log(b);
                console.log(c);
            }
        });

        return loginResult;
    },

    isLoginForEvt : function(){
        var url= _baseUrl + "login/loginCheckJson.do";
        var loginResult = false;

        $.ajax({
            type: "POST",
            url: url,
            data: null,
            dataType : 'json',
            async: false,
            cache: false,
            success: function(data) {
                loginResult = data.result;
                sessionStorage.setItem("checkLoginStatus", data.result);
            },
            error : function() {
                loginResult = false;
                sessionStorage.removeItem("checkLoginStatus");
            }
        });

        return loginResult;
    },    

    loginChk : function(){

        /* 3273769 로그인체크 중복 제거 추가 진행 요청 
         * "login/loginCheckJson.do" 중복 호출을 막기 위한 SessionStorage내, checkLoginStatus등록
         * 만약 checkLoginStatus내에 값이 존재할 경우, 값을 반환한다.
         * false일 경우에는 checkLoginStatus값을 제거한다.
         */
        var checkLoginStatus = sessionStorage.getItem("checkLoginStatus");
        if(checkLoginStatus == null || checkLoginStatus == "undefined"){

            var url= _baseUrl + "login/loginCheckJson.do";
            var loginResult = false;

            $.ajax({
                type: "POST",
                url: url,
                data: null,
                dataType : 'json',
                async: false,
                cache: false,
                success: function(data) {

                    if(!data.result && data.url!=null){
                        window.location.href = _secureUrl + data.url + "?redirectUrl=" + encodeURIComponent(location.href);
                    }

                    loginResult = data.result;
                },
                error : function(a, b, c) {
                    console.log(a);
                    console.log(b);
                    console.log(c);
                }
            });
        }else{
            loginResult = JSON.parse(sessionStorage.getItem("checkLoginStatus"));
            if(loginResult == false){
                window.location.href = _secureUrl + "login/loginForm.do" + "?redirectUrl=" + encodeURIComponent(location.href);
            }
        }
        return loginResult;
    },


    isLogin : function(){
        
        /* 3212592 12월올영세일_온라인몰 특이현상 점검 및 개선 요청의 件 
         * "login/loginCheckJson.do" 중복 호출을 막기 위한 SessionStorage내, checkLoginStatus등록
         * 만약 checkLoginStatus내에 값이 존재할 경우, 값을 반환한다.
         * false일 경우에는 checkLoginStatus값을 제거한다.
         */
        var checkLoginStatus = sessionStorage.getItem("checkLoginStatus");
        if(checkLoginStatus == null || checkLoginStatus == "undefined"){

            var url= _baseUrl + "login/loginCheckJson.do";
            var loginResult = false;

            $.ajax({
                type: "POST",
                url: url,
                data: null,
                dataType : 'json',
                async: false,
                cache: false,
                success: function(data) {
                    loginResult = data.result;
                    sessionStorage.setItem("checkLoginStatus", data.result);
                },
                error : function() {
                    loginResult = false;
                    sessionStorage.removeItem("checkLoginStatus");
                }
            });
        }else{
            loginResult = JSON.parse(sessionStorage.getItem("checkLoginStatus"));
        }
        return loginResult;
    },
    
    isBeautyLoginCnt : function(){
        /* 3273769 로그인체크 중복 제거 추가 진행 요청 
         * "login/loginCheckJson.do" 중복 호출을 막기 위한 SessionStorage내, checkLoginStatus등록
         * 만약 checkLoginStatus내에 값이 존재할 경우, 값을 반환한다.
         * false일 경우에는 checkLoginStatus값을 제거한다.
         */
        var checkLoginStatus = sessionStorage.getItem("checkLoginStatus");
        if(checkLoginStatus == null || checkLoginStatus == "undefined"){

            var url= _baseUrl + "login/loginCheckJson.do";

            $.ajax({
                type: "POST",
                url: url,
                data: null,
                dataType : 'json',
                async: false,
                cache: false,
                success: function(data) {
                    beautyLoginCnt++;
                },
                error : function() {
                    beautyLoginCnt = 0;
                }
            });
        }else{
            loginResult = JSON.parse(sessionStorage.getItem("checkLoginStatus"));
            if(loginResult == true){//로그인 여부 확인
                beautyLoginCnt++;
            }else{
                beautyLoginCnt = 0;
            }
        }

        return beautyLoginCnt;
    },

    fileChk : function(file){
        var maxSize = 500 * 1024 * 1024 ; // 500KB
        // var maxSize = 0 ;
        var fileFilter =/.(jpg|gif|png|jpeg)$/i;
        var fileType = "";
        var fileSize = 0;

        if(file != null && file != undefined){
            for(i = 0; i < file.size(); i++){
                if(file[i].value!=""){
                    fileType = file[i].files[0].name.slice(file[i].files[0].name.lastIndexOf("."));
                    fileSize = file[i].files[0].size;

                    /*
                     * console.log("파일["+i+"]>>"+file);
                     * console.log("파일Type["+i+"]>>"+fileType);
                     */

                    if(!fileType.match(fileFilter)){
                        alert("등록할 수 없는 파일 형식입니다.");
                        return false;
                    }

                    if(fileSize > maxSize){
                        alert("이미지 파일은 500KB를 넘을 수 없습니다.");
                        return false;
                    }
                }else{
                    console.log("첨부된 파일이 없습니다.["+file[i].name+"]");
                    return false;
                }
            }
            return true;
        }
    },
    getNowScroll : function() {
        var de = document.documentElement;
        var b = document.body;
        var now = {};
        now.X = document.all ? (!de.scrollLeft ? b.scrollLeft : de.scrollLeft) : (window.pageXOffset ? window.pageXOffset : window.scrollX);
        now.Y = document.all ? (!de.scrollTop ? b.scrollTop : de.scrollTop) : (window.pageYOffset ? window.pageYOffset : window.scrollY);
        return now;
    },
    isEmpty : function(str) {
        if (str == undefined || str == null || str === "" || str == "undefined" || str == "null") {
            return true;
        } else {
            return false;
        }
    },
    /**
     * Validation 처리를 위한 Object
     */
    Validator : {
        /**
         * common.Validator.isNumber()
         *
         * 해당 필드 값이 숫자인지 여부를 검사 함.
         *
         * 사용 예)
         * common.Validator.isNumber("#elId", "값을 확인 하세요.");
         * 일때 다음의 동작 실행
         * if($("#elId").val() != 숫자) {
         *      alert("값을 확인 하세요.");
         *      $("#elId").focus();
         *    }
         *
         *
         *
         * @param jqPath : Element의 Jquery Path
         * @param message : 입력값 오류일때 표시할 Message 값
         *
         * @return true(정상) or false(오류)
         *
         *
         */
        isNumber : function(jqPath, message) {
            var obj = $(jqPath);
            var value = obj.val();
            var isNumber = value.isNumber();
            if(!(isNumber)) {
                alert(message);
                obj.focus();
            }
            return isNumber;
        }
    },
    /**
     * timeStamp 데이타를 날짜 포맷으로 변환
     */
    formatDate  : function (timeStamp, format){
        var newDate = new Date();
        newDate.setTime(timeStamp);
        var formatDate = newDate.format(format);

        return formatDate;
    },
    // 받침 유무에 따른 조사 구하기
    checkTxtParticle : function(txt, exist, notExist) {
        if(common.isEmpty(txt)) {
            return "";
        }

        var lastChar = txt.charCodeAt(txt.length - 1);

        return (lastChar - 0xAC00) % 28 > 0 ? exist : notExist;
    },
    setLazyLoad : function(type) {

        if (type == undefined  || type == "seq" ) {
            //lazyload - 이미지스크롤이벤트
            $(document).find("img.seq-lazyload").lazyload({
                effect : "fadeIn",
                event : "sequential"
            });

            //로딩 된 이미지에 중복으로 lazyload를 바인드하지 않도록 하기 위해 클래스명 변경
            $(document).find("img.seq-lazyload").removeClass("seq-lazyload").addClass("completed-seq-lazyload");

        }

        if (type == undefined  || type == "scr" ) {
            //lazyload - 이미지스크롤이벤트
//            $(document).find("img.scroll-lazyload").lazyload({
//                effect : "fadeIn",
//                add_bottom_scroll: 500,          //20150529 jwlim 상향 스크롤 시 셋팅한 픽셀 먼저 로딩
//                sub_top_scroll  : 500           //20150529 jwlim 하향 스크롤 시 셋팅한 픽셀 먼저 로딩
//            });

            $(document).find("img.scroll-lazyload").lazyload({
                effect : "fadeIn",
                event : "sequential"
            });

            //로딩 된 이미지에 중복으로 lazyload를 바인드하지 않도록 하기 위해 클래스명 변경
            $(document).find("img.scroll-lazyload").removeClass("scroll-lazyload").addClass("completed-scroll-lazyload");
        }

    },

    //  재입고 알림 팝업 오픈
    openStockAlimPop : function(goodsNo, itemNo){
        if ( common.loginChk() ){
            var url = _baseUrl + "goods/getAlertStockAjax.do";
            var data = {goodsNo : goodsNo, itemNo : itemNo};
            common.Ajax.sendRequest("POST",url,data,common._callBackAlearStockForm);
        }
    },

    //  재입고 알림 콜백
    _callBackAlearStockForm : function(res){
        $('body').append(res);
        fnLayerSet('reStockAlim', 'open');
    },

    // 오늘드림 고도화 오프라인 매장 재입고 알림 팝업 오픈 2019-12-22 추가
    openStockOffStoreAlimPop : function(goodsNo, itemNo, strNo){
        if ( common.loginChk() ){
            var url = _baseUrl + "goods/regAlertStockOffStoreJson.do";
            var data = {goodsNo : goodsNo, itemNo : itemNo, strNo : strNo};
            common.Ajax.sendRequest("POST",url,data,common._callBackAlearStockOffStoreForm);
        }
    },

    //  오늘드림 고도화 오프라인 매장 재입고 알림 콜백 오픈 2019-12-22 추가
    _callBackAlearStockOffStoreForm : function(res){
        alert(res);
    },
    
    //  행사안내 팝업 오픈
    openEvtInfoPop : function( promNo, promKndCd, promCond, goodsNo, itemNo ){
        
//        var quickYn = $(":input:radio[name=qDelive]:checked").val();
//        if(typeof(quickYn) == "undefined"){
//            quickYn = $("#quickYn").val();
//        }
        
    	var quickYn = "N";
        if($("input[name=qDelive]").attr("type") == "radio"){
    		quickYn = $(":input:radio[name=qDelive]:checked").val();
    	} else if($("input[name=qDelive]").attr("type") == "checkbox"){
    		quickYn = $("input[name=qDelive]").is(":checked") ? "Y" : "N";
    	} else {
    		quickYn = $("#quickYn").val();
    	}
        
        var url = _baseUrl + "goods/getGoodsPromEvtInfoAjax.do";
        var data = {promNo : promNo, promKndCd : promKndCd, promCond : promCond, goodsNo : goodsNo, itemNo : itemNo, quickYn: quickYn};
        common.Ajax.sendRequest("POST",url,data,common._callBackGoodsEvtInfo);
    },

    //  행사안내 콜백
    _callBackGoodsEvtInfo : function(res){
        $("#layer_pop_wrap").html(res);

        //레이어 팝업 띄우는 함수
        fnLayerSet("layer_pop_wrap", "open");
    },
    
    isMainHome : function() {
        try {
            if (location.href.endWith("/main/main.do#0")) {
                return true;
            }

            return false;
        } catch(e) {
            return false;
        }
    },

    bindGtmTrkparam : function () {
        var params = common.cart.urlParams();
        var gtmTrackingParma = ( params.gateCd || "" ) + "/" + ( params.trackingCd || "" );

        return gtmTrackingParma;
    },

    bindGoodsGtmInfo : function(filterSelectorStr, gtmList) {
        var classNm = filterSelectorStr == undefined ? "" : filterSelectorStr + " ";

        $(classNm + ".goodsList").on("click", function(e) {
            e.preventDefault();
            var _data_goodsno = $(this).attr("data-ref-goodsNo");
            var _data_attr = $(this).attr('data-attr').split('^');

            var _item_index = _data_attr[_data_attr.length - 1];

            gtm.goods.callGoodsGtmInfo(_data_goodsno, null, 'ee-productClick', gtmList, _item_index);
        });
    },

    bindGoodsGtmImpression : function(filterSelectorStr, gtmList) {
        var classNm = filterSelectorStr == undefined ? "" : filterSelectorStr + " ";

        var gtmGoodsNoArr = new Array();
        var gtmItemNoArr = new Array();

        $(classNm + ".prd_info .goodsList").each(function(index) {
            var _data_goodsno = $(this).attr("data-ref-goodsno");
            var _data_itemno = $(this).attr("data-ref-itemno") || '001';

            if(_data_goodsno) {
                for (var i = 0; i < gtmGoodsNoArr.length; i++) {
                    if (gtmGoodsNoArr[i] === _data_goodsno) {
                        return;
                    }
                }
                gtmGoodsNoArr.push(_data_goodsno);
                gtmItemNoArr.push(_data_itemno);
            }

        });

        //gtm.goods.callGoodsGtmInfo(gtmGoodsNoArr, gtmItemNoArr, 'ee-productImpression', gtmList);
    },

    bindGoodsGtmDataAttr : function (container ,attrTxt) {
        var currentContainer = container + ' .prd_info';
        $(currentContainer).each(function (index) {
            var goodNm =  $(this).find('a').siblings('.prd_name').find('a .tx_name').text();
            $(this).find('a').attr("data-attr" , attrTxt + goodNm);
        })
    },

    bindGoodsListLink : function(filterSelectorStr) {
        var classNm = filterSelectorStr == undefined ? "" : filterSelectorStr + " ";
        $(classNm + ".goodsList").each(function (e) {
            var trackingCd = common.cart.urlParams().trackingCd;
            if (!!trackingCd) $(this).attr("name", trackingCd);
        });
        $(classNm + ".goodsList").unbind("click");

        $(classNm + ".goodsList").bind("click", function(e) {
            e.preventDefault();
            var trackingCd = common.cart.urlParams().trackingCd || $(this).attr("name");
            if($(this).hasClass("btn_new_pop")){
                //새창보기
                common.link.moveGoodsDetailNew($(this).parent().parent().find("a").attr("data-ref-goodsNo"), $(this).parent().parent().find("a").attr("data-ref-dispCatNo"));
            }else{
                //페이지이동
                // goodsList 중 trackingCd 값이 없는 경우 null로 들어와 분기 처리 - [3389141] (영역별 매출분석) 오특, 검색, 베스트, 메인 추가(CHY)
                if(trackingCd != null && trackingCd != undefined && trackingCd != 'null'){
                    common.link.moveGoodsDetail($(this).attr("data-ref-goodsNo"), $(this).attr("data-ref-dispCatNo"), trackingCd);
                }else{
                    common.link.moveGoodsDetail($(this).attr("data-ref-goodsNo"), $(this).attr("data-ref-dispCatNo"));
                }
                
            }
        });
        $(classNm + ".goodsList.kiosk").unbind("click");
        $(classNm + ".goodsList.kiosk").bind("click", function(e) {
            e.preventDefault();
            var goodsNo = $(this).attr("data-ref-goodsNo");
            var dispCatNo = $(this).attr("data-ref-dispCatNo");
            common.kiosk.goodDetailLog();
            setTimeout(function(){
                common.link.moveGoodsDetailKiosk(goodsNo, dispCatNo);
            },10);
        });

        $(classNm + ".goodsListLogin").bind("click", function(e) {
            e.preventDefault();
            //로그인 성인체크 로그인성인
            common.link.moveGoodsDetail($(this).attr("data-ref-goodsNo"), $(this).attr("data-ref-dispCatNo"));

        });

        $(classNm + ".goodsListAuth").bind("click", function(e) {
            e.preventDefault();
            // 성인체크 성인
            common.link.moveGoodsDetail($(this).attr("data-ref-goodsNo"), $(this).attr("data-ref-dispCatNo"));
        });
        
        
        $(classNm + ".goodsListAuth.kiosk").unbind("click");
        $(classNm + ".goodsListLogin.kiosk").bind("click", function(e) {
            e.preventDefault();
            //로그인 성인체크 로그인성인
            var goodsNo = $(this).attr("data-ref-goodsNo");
            var dispCatNo = $(this).attr("data-ref-dispCatNo");
            setTimeout(function(){
                common.link.moveGoodsDetailKiosk(goodsNo, dispCatNo);
            },10);
            
        });
        $(classNm + ".goodsListAuth.kiosk").unbind("click");
        $(classNm + ".goodsListAuth.kiosk").bind("click", function(e) {
            e.preventDefault();
            // 성인체크 성인
            var goodsNo = $(this).attr("data-ref-goodsNo");
            var dispCatNo = $(this).attr("data-ref-dispCatNo");
            setTimeout(function(){
                common.link.moveGoodsDetailKiosk(goodsNo, dispCatNo);
            },10);
        });
        
        //장바구니 클릭
        $(classNm + ".cartBtn").bind('click',function(){
            if (common.loginChk()) {
                //  옵션선택이 있거나, 없거나 일단 화면 진입
                var url = _baseUrl + "common/getCartOptionSelectAjax.do";
                
                var tmpItemNo = $(this).attr("data-ref-itemNo");
                if (tmpItemNo.length > 3) {
                    tmpItemNo = "001";
                }
                
                var data;
                
                // 오늘드림 전문관 리스트인 경우 장바구니 클릭시 오늘드림 장바구니에 추가되게끔 하기위해 값 추가
                // quickInfo class는 오늘드림 전문관에서만 사용함
                if($(this).closest("li").hasClass("quickInfo")){
                    data = {goodsNo : $(this).attr("data-ref-goodsNo"), itemNo : tmpItemNo , quickYn : "Y" };
                } else {
                    data = {goodsNo : $(this).attr("data-ref-goodsNo"), itemNo : tmpItemNo };
                }
                // 상품카드 장바구니버튼 트래킹코드
                common.cart.trackingInfo.setTrackingCd($(this));
                
                common.Ajax.sendRequest("POST",url,data,common._callCartOptionSelect);                    
            }
        });
        
        //상품평 클릭
        $(classNm + ".prd_info .comment li p").bind("click", function(e) {
            e.preventDefault();
            var goodsListElmt = $(this).closest(".prd_info").find(".goodsList").eq(0);
            var goodsNo = goodsListElmt.attr("data-ref-goodsNo");
            
            if(goodsNo == undefined || goodsNo == null || goodsNo == ""){
                goodsListElmt = $(this).closest(".prd_info").find(".goodsListLogin").eq(0);
                goodsNo = goodsListElmt.attr("data-ref-goodsNo");
            }
            
            if(goodsNo == undefined || goodsNo == null || goodsNo == ""){
                goodsListElmt = $(this).closest(".prd_info").find(".goodsListAuth").eq(0);
                goodsNo = goodsListElmt.attr("data-ref-goodsNo");
            }
            
            common.link.moveGoodsDetailTab(goodsNo, goodsListElmt.attr("data-ref-dispCatNo"), 2);
        }).bind("mouseover", function() {
            $(this).css("cursor", "pointer");
        }).bind("mouseout", function() {
            $(this).css("cursor", "");
        });
        
        //상품별점 클릭
        $(classNm + ".prd_info .prd_point_area").bind("click", function(e) {
            e.preventDefault();
            var goodsListElmt = $(this).closest(".prd_info").find(".goodsList").eq(0);
            var goodsNo = goodsListElmt.attr("data-ref-goodsNo");
            
            if(goodsNo == undefined || goodsNo == null || goodsNo == ""){
                goodsListElmt = $(this).closest(".prd_info").find(".goodsListLogin").eq(0);
                goodsNo = goodsListElmt.attr("data-ref-goodsNo");
            }
            
            if(goodsNo == undefined || goodsNo == null || goodsNo == ""){
                goodsListElmt = $(this).closest(".prd_info").find(".goodsListAuth").eq(0);
                goodsNo = goodsListElmt.attr("data-ref-goodsNo");
            }
            
            common.link.moveGoodsDetailTab(goodsNo, goodsListElmt.attr("data-ref-dispCatNo"), 2);
        }).bind("mouseover", function() {
            $(this).css("cursor", "pointer");
        }).bind("mouseout", function() {
            $(this).css("cursor", "");
        });
    },
    
    //  옵션 선택 후 레이어 오픈
    _callCartOptionSelect : function(data){
        var tmpOption = $("<div id=\"tmpOption\">" + data + "</div>");
        
        // 프로모션 정보 가져오기
        common.cart.promKndCd = tmpOption.find("#promKndCd").val();
        common.cart.promNo = tmpOption.find("#promNo").val();
        common.cart.buyCnt = tmpOption.find("#buyCnt").val();
        
        common.cart.getItemAutoAddYn = tmpOption.find("#getItemAutoAddYn").val();
        common.cart.recoSelGoodsNo = tmpOption.find("#paramGoodsNo").val();

        var rccode = tmpOption.find("#recoRcCode").val();
        if(!common.isEmpty(rccode)) {
            recoRcCode = rccode;
        } else {
            recoRcCode = "";
        }
        
        if (tmpOption.find("#dupYn").val() != 'Y') {
            //옵션이 없는 상품일 경우 바로 장바구니 등록
            var cartGoodsNo = tmpOption.find("#paramGoodsNo").val();
            var cartItemNo = tmpOption.find("#paramItemNo").val();

            // 오늘드림 전문관에서 장바구니 클릭시 val값은 Y이다
            var cartQuickYn = tmpOption.find("#quickYn").val();

            // Y가 아닌경우는 오늘드림 관련 제어가 필요 없기 때문에 N으로 초기화
            if(cartQuickYn != "Y"){
                cartQuickYn = "N";
            }
            
            var ordPsbMinQty = tmpOption.find("#ordPsbMinQty").val();

            //  옵션선택이 없다면, 파라미터 받은 값으로 바로 RegCart 실행
            if(cartGoodsNo != undefined && cartGoodsNo != "" && cartItemNo != undefined && cartItemNo != "" ){
                var resultData = new Array();

                var param = {
                      goodsNo : cartGoodsNo,
                      itemNo : cartItemNo,
                      ordQty : ordPsbMinQty,
//                      ordQty : 1,
                      quickYn : cartQuickYn,
                      regCartRecoBellGoodsInCartYn : common.cart.regCartRecoBellGoodsInCartYn,
                }
                resultData.push(param);

                // 프로모션이 동일(P201), A+B(P203) 이고, N+1 중 N이 1인 경우, FreeGift 가 1종류인 경우 Get상품 추가
                var promNo = common.cart.promNo;
                var promKndCd = common.cart.promKndCd;

                var buyGoodsNo = cartGoodsNo;
                var buyItemNo = cartItemNo;
                var buyOrdQty = 1;
                var samePrdSumOrdQty = buyOrdQty;
                var buyCondStrtQtyAmt = common.cart.buyCnt;

                var getItemAutoAddYn = common.cart.getItemAutoAddYn;
                var getGoodsNo = (promKndCd == "P201") ? cartGoodsNo : tmpOption.find("#getItemGoodsNo").val();
                var getItemNo = (promKndCd == "P201") ? cartItemNo : tmpOption.find("#getItemItemNo").val();
                var getOrdQty = 1;

                if(promNo != undefined && promNo != '' && buyCondStrtQtyAmt == 1){
                    if(promKndCd == "P201" ||
                      (promKndCd == "P203" && getItemAutoAddYn == "Y" &&
                       getGoodsNo != undefined && getGoodsNo != '' &&
                       getItemNo != undefined && getItemNo != '')){

                        var getGoodsData = {
                                goodsNo : getGoodsNo,
                                itemNo : getItemNo,
                                ordQty : buyOrdQty,
                                rsvGoodsYn : "N", // 예약상품여부
                                dispCatNo : "",  // 전시카테고리 번호
                                drtPurYn : "N",            //바로구매여부
                                promKndCd : promKndCd,     //프로모션구분
                                crssPrstNo : promNo,        //프로모션번호
                                prstGoodsNo : buyGoodsNo,  //타겟buy군의 상품번호
                                prstItemNo : buyItemNo,    //타겟buy군의 아이템번호
                                buyCondStrtQtyAmt : buyCondStrtQtyAmt,
                                samePrdSumOrdQty : samePrdSumOrdQty,     //상품번호 아이템번호가 같은상품의 수량을 합한값
                                getItemAutoAddYn : getItemAutoAddYn
                        };

                        resultData.push(getGoodsData);
                    }
                }
                // N+1 동일 일 경우 장바구니에 자동 추가 (끝)

                common.cart.regCart(resultData, 'N', '', 'Y');
            } else {
                alert("판매종료된 상품입니다. 다른 상품을 담아주세요.");
                recoRcCode = "";
            }
        } else {
            //옵션이 있는경우
            $("#basketOption").html(data);
            
            // 옵션변경일 경우 선택된 옵션은 음영처리
            var optChgYn = (common.cart.regCartRecoBellGoodsInCartYn == "Y") ? "N" : $("#optChgYn").val();
            var selGoodsNo = $("#paramGoodsNo").val();
            var selPkgGoodsObj = $("table.tbl_prd_list").find("tr[pkgGoodsNo=" + selGoodsNo + "]").attr("goodsNo");
            var selItemNo = $("#paramItemNo").val();
            
            if(selPkgGoodsObj != undefined)
                selGoodsNo = selPkgGoodsObj;
            
            // [START 오늘드림 옵션상품 개선:jwkim]
            var cartQuickYn = tmpOption.find("#quickYn").val();
            
            // 오늘드림인 경우 오늘드림이 아닌 옵션상품을 품절처리
            // (품절 문구는 없으나 품절처럼 선택할 수 없게 하기위해서 사용)
            if(cartQuickYn == "Y"){
                $("#basketOption .nonQuick").addClass("soldout");
            }
            // [END 오늘드림 옵션상품 개선:jwkim]
            
            if(optChgYn == "Y"){
                $("ul.sel_option_list li").each(function(){
                    var curGoodsNo = $(this).find("a").attr("data-ref-goodsNo");
                    var curItemNo = $(this).find("a").attr("data-ref-itemNo");
                    
                    if( selGoodsNo == curGoodsNo && selItemNo == curItemNo ){
                        $(this).addClass("on");
                        $("a#mainCartSelect").text($(this).find("span.option_value").text());
                    }
                });
                
                if($("ul.sel_option_list li").length <= 1) {
                    $("a#mainCartSelect").text("선택 가능한 상품이 없습니다.");
                    recoRcCode = "";
                }
            }
            
            fnLayerSet('basketOption', 'open');
            
            //닫기버튼 클릭이벤트
            $("#basketOption").find(".layer_close").bind('click', function(){
                fnLayerSet('basketOption', 'close');
            });
        }
    },
    
    //  장바구니 담기 후 완료 레이어 오픈
    _callCartComplete : function(data){
        $("#basketOption").html(data);
        fnLayerSet('basketOption', 'open');
        
        common.cart.regCartRecoBellGoodsInCartPopYn = "N";
        
        if(recoCart == 'Y' || goodsDetailCartYn == "Y"){
            common.cart.callRecoBellGoodsInCart(common.cart.recoSelGoodsNo, common.cart.recoSelLgcGoodsNo);
        }
    },

    popContLayerClose : function(){
        $(".dimm").remove();
        $("#pop_cont").hide();
    },
    
    preventAction : function(){
        $(document.body).attr("oncontextmenu", "return false");
        document.onkeydown = common.preventKeyAction;
        document.onmousedown = common.preventKeyAction;
    },
    
    preventKeyAction : function(){
        if (event.keyCode == 17){
            alert ("Ctrl 금지");
            return false;
        }
        
//        if (event.keyCode == 18){
//            alert ("Alt 금지");
//            return false;
//        }
//        
        if (event.keyCode ==91){
            event.keyCode == 505;
            alert ("윈도우 Fuction Key 금지");
        }
        
        if (event.keyCode > 112 && event.keyCode < 123){
            event.keyCode = 505;
            alert("Function key 금지");
        }
        if (event.keyCode == 505) {
            return false;
        }
    },
    
    //  행사안내 팝업 닫기
    closePromEvtPop : function(){
        
        fnLayerSet('layer_pop_wrap', 'close');
        $('#layer_pop_wrap').css('top','');
        $('#layer_pop_wrap').css('margin-left','');
        $('#layer_pop_wrap').css('margin-top','');
        
        if ( location.href.indexOf("getCart.do") > 0 && common.cart.regCartCnt > 0 ){
            var linkCartNo = location.href.substring(location.href.indexOf("cartNo=")+7);
            var sumCartNo = "";
            
            if(linkCartNo != ""){
                if(cartNosForDirectCart != ""){
                    sumCartNo = linkCartNo + "," + cartNosForDirectCart;
                }else{
                    sumCartNo = linkCartNo;
                }
            }
            
            cartNosForDirectCart = "";
            common.cart.regCartCnt = 0;
            
            if(location.href.indexOf("cartNo=") > 0){
                location.href = _secureUrl + "cart/getCart.do?cartNo=" + sumCartNo;
            }else{
                window.location.reload();
            }
        }
    },
    
    //  장바구니 옵션 선택 액션
    setItem : function(goodsNo, itemNo, obj){
        
        //  선택된 상품번호, 단품번호 세팅
        $("#cartGoodsNo").val(goodsNo);
        $("#cartItemNo").val(itemNo);
        
        //  선택된 상품명 세팅
        $(obj).parents('.prd_option_box').find('.sel_option').html($(this).find(".option_value").html());
        
        //  선택창 닫기
        $(obj).parents('.prd_option_box').removeClass('open');
    },
    
    /**
     * 이미지 공통 처리
     */
    errorImg : function(obj) {
        obj.src = _imgUrl + "/comm/noimg_550.gif";
        obj.onerror = '';
    },
    errorProfileImg : function(obj) {
        obj.src = _imgUrl + "/comm/my_picture_base.jpg";
        obj.onerror = '';
    },
    errorBrandImg : function(obj) {
        obj.src = _imgUrl + "/comm/noimage_brandshop.png";
        obj.onerror = '';
    },
    errorCatImg : function(obj) {
        obj.src = _imgUrl + "/comm/noimg_550.gif";
        obj.onerror = '';
        obj.parentElement.className = 'img no-img';
    },
    errorCrcImg : function(obj) {
        obj.src = _imgUrl + "/category/brand_default.png";
        obj.onerror = '';
        obj.parentElement.className = 'img no-img';
    },
    errorCurationBrandImg : function(obj) {
        obj.src = _imgUrl + "curation/brand_bg.png";
        obj.onerror = "";
    },
    imgLoads : function(obj,size){
        var _thisImg = $(obj);
        if(_thisImg.attr('src').indexOf('?') == -1){
            _thisImg.attr('src', common.resizeImg(obj, size));
        }
    },
    errorResizeImg : function(obj, size) {
        obj.src = _fileUploadUrl + "comm/noimg_550.gif?RS="+size;
        obj.onerror = '';
    },
    errorResizeProfileImg : function(obj, size) {
        obj.src = _fileUploadUrl + "comm/my_picture_base.jpg?RS="+size;
        obj.onerror = '';
    },
    resizeImg : function(obj, thum_size){
        var _thisImg = $(obj);
        var _thisImgUrl = _thisImg.attr('src');
        var _thiswidth = _thisImg.width(), _thisHeight = _thisImg.height();
        var _resize_size = thum_size, _resize_ratio = 2;
        var rs_width = 0, rs_height = 0, cs_width = 0, cs_height = 0;
        if(_thiswidth > _thisHeight){
            if(_thisHeight > _resize_size){
                rs_width = _resize_size * _resize_ratio, rs_height = 0; 
                cs_width = _resize_size, cs_height = _resize_size;
            }else if(_thisHeight <= _resize_size){
                //rs_width = _resize_size * _resize_ratio, rs_height = _resize_size * _resize_ratio;
                //cs_width = _resize_size, cs_height = _resize_size;
                rs_width = _resize_size * _resize_ratio, rs_height = 0;
                cs_width = _thisHeight, cs_height = _thisHeight;
            }
        }else if(_thiswidth < _thisHeight){
            if(_thiswidth > _resize_size){
                rs_width = _resize_size * _resize_ratio, rs_height = 0; 
                cs_width = _resize_size, cs_height = _resize_size;
            }else if(_thiswidth <= _resize_size){
                //rs_width = _resize_size * _resize_ratio, rs_height = _resize_size * _resize_ratio;
                //cs_width = _resize_size, cs_height = _resize_size;
                rs_width =_thiswidth, rs_height = 0;
                cs_width = _thiswidth, cs_height = _thiswidth;
            }
        }else if(_thiswidth == _thisHeight){
            rs_width = _resize_size, rs_height = _resize_size;
            cs_width = _resize_size, cs_height = _resize_size;
        }
        return_url = _thisImgUrl+'?RS='+parseInt(rs_width)+'x'+parseInt(rs_height)+'&CS='+parseInt(cs_width)+'x'+parseInt(cs_height);
        setTimeout(function() {
            //웹로그 바인딩
            //_thisImg.css('visibility','visible')
        }, 100);
        return return_url;
    },
    onLoadProfileImg : function(obj, size){
        var _thisProfileImg = $(obj);
        if($(obj)[0].src.indexOf("?CS=") > -1){
            var temp = $(obj)[0].src.substring(0,$(obj)[0].src.indexOf("?CS="));
            $(obj)[0].src = temp;
        }
        _thisProfileImg.siblings('div.thum').find('img.profileThum_s').attr('src',common.profileImgResize(obj, size));
    },
    profileImgResize :  function(obj, thum_size){
        var _thisImg = $(obj);  
        var _thisImgUrl = _thisImg.attr('src');
        var _thiswidth = _thisImg.width(), _thisHeight = _thisImg.height();
        var _resize_size = thum_size, _resize_ratio = 0;
        var rs_width = 0, rs_height = 0, cs_width = 0, cs_height = 0;
        
        if(_thiswidth > _thisHeight){
            if(_thisHeight > _resize_size){
                _resize_ratio = _resize_size / _thisHeight;
                rs_width = _thiswidth * _resize_ratio, rs_height = _resize_size;
                cs_width = _resize_size, cs_height = _resize_size;
            }else if(_thisHeight < _resize_size){
                rs_width = _thiswidth, rs_height = _thisHeight;
                cs_width = _thisHeight, cs_height = _thisHeight;
            }
        }else if(_thiswidth < _thisHeight){
            if(_thiswidth > _resize_size){
                _resize_ratio = _resize_size / _thiswidth;
                rs_width = _resize_size, rs_height = _thisHeight * _resize_ratio;
                cs_width = _resize_size, cs_height = _resize_size;
            }else if(_thiswidth < _resize_size){
                rs_width = _thiswidth, rs_height = _thisHeight;
                cs_width = _thiswidth, cs_height = _thiswidth;
            }
        }else if(_thiswidth == _thisHeight){
            if(_thiswidth > _resize_size){
                rs_width = _resize_size, rs_height = _resize_size;
                cs_width = _resize_size, cs_height = _resize_size;
            }else if(_thiswidth < _resize_size){
                rs_width = _thiswidth, rs_height =_thiswidth;
                cs_width = _thiswidth, cs_height = _thiswidth;
            }
        }
        return_url = _thisImgUrl+'?RS='+parseInt(rs_width)+'x'+parseInt(rs_height)+'&CS='+parseInt(cs_width)+'x'+parseInt(cs_height);
        return return_url;
    },
    /** EP 쿠폰 **/
    epCouponOpen : function(){
        $("#layer_pop_wrap").html($("#pluscouponDownload").html());
        fnLayerSet('layer_pop_wrap', 'open');
    },
    
    /**
     * 웹로그 
     */
    wlog : function(wlKey) {
        // console.log(wlKey, "ds코드");
        try {
            try{
                if(wlKey=="goods_cart"){
                    n_click_logging(_baseUrl+"cart/regCartJson.do", _baseUrl+"goods/getGoodsDetail.do");
                }else if(wlKey=="goods_buy"){
                    n_click_logging(_baseUrl+"order/getOrderForm.do", _baseUrl+"store/goods/getGoodsDetail.do");
                }else if(wlKey=="home_curation_area"){
                    n_click_logging(_baseUrl + "?clickarea=" + wlKey);
                }
            }catch(e){}
            n_click_logging(_baseUrl + "?clickspace=" + wlKey);
        } catch (e) {
        }

//        setTimeout(function() {
//            $.ajax({
//                type: "GET",
//                url: _baseUrl + "common/dummyJson.do?clickspace=" + wlKey,
//                contentType: "application/json;charset=UTF-8",
//                dataType : 'json',
//                async: true,
//                cache: false,
//                success: function(data) {
//                }
//            });
//        }, 10);
    },_giftCardCheck : function(data) {
        var retStr = 'N';

        var giftcardText = ['기프트카드', '기푸트카드', '기프드카드', '기프투카드', '기프트가드', '기프트카두', '기푸드카드', '기푸투카드', '기푸트가드', '기푸트카두', '기프드가드',
                            '기프드카두', '기프투가드', '기프투카두', '기프트가두', '기푸드가드', '기푸드카두', '기프드가두', '기프투가두', '기푸투카두', '기푸드가두', '기푸투가두',
                            '기프트카트', '키프트카드', '기츠트카드', '기프티카드', '기프트칻ㅡ', '기브트카드', '기푸트카트', '기프투카트', '기프트가트', '기프트카투', '기푸투카트',
                            '기푸트가트', '기푸트카투', '기프투가트', '기프투카투', '기프트가투', '기프투가투', '기푸투카투', '기푸트가투', '기푸투가투', '키푸트카드', '키프드카드',
                            '키프투카드', '키프트가드', '키프트카두', '키푸드카드', '키푸투카드', '키푸트가드', '키푸트카두', '키프드가드', '키프드카두', '키프투가드', '키프투카두',
                            '키프트가두', '키푸드가드', '키푸드카두', '키프드가두', '키프투가두', '키푸투카두', '키푸드가두', '키푸투가두'];

        data = data.replaceAll(' ','');

        if( giftcardText.indexOf(data) > -1){
            retStr = 'Y';
        }

        return retStr;
    },
    
    /**
     * [3283136] 마이페이지 PC GUI 개편 및 장바구니 버튼 추가 요청의 件 (CHY)
     * 장바구니 담기(공통) 상품상세 이외 전역에서 사용 가능
     * 
     */
    gf_regCart : function(obj) {

        if ($(obj).attr('data-rccode') == 'pc_detail_soldout_ac') {
            common.wlog('goods_soldout_popup_prod_cart');
        }

        if ($(obj).attr("trackingCd") == "Today_Special") {
            common.wlog('todayspecial_dailySpecailGoods_cart');
        } else if ($(obj).attr("trackingCd") == "Today") {
            common.wlog('todayspecial_dailyGoods_cart');
        }

        var params = $(obj).data();
        var callOrg = $(obj).context.className;
        if (common.loginChk()) {

            // 옵션선택이 있거나, 없거나 일단 화면 진입
            var url = _baseUrl + "common/getCartOptionSelectAjax.do";

            var tmpItemNo = params.itemNo;

            if (tmpItemNo.length > 3) {
                tmpItemNo = "001";
            }

            var data;

            // 오늘드림 전문관 리스트인 경우 장바구니 클릭시 오늘드림 장바구니에 추가되게끔 하기위해 값 추가
            // quickInfo class는 오늘드림 전문관에서만 사용함
            if ($(this).closest("li").hasClass("quickInfo")) {
                data = {
                    goodsNo : params.goodsNo,
                    itemNo : tmpItemNo,
                    quickYn : "Y"
                };
            } else {
                data = {
                    goodsNo : params.goodsNo,
                    itemNo : tmpItemNo
                };
                
                if(params.quickYn == "Y") {
                    data.quickYn = "Y";
                }
                
                if(callOrg == 'btnbag') {
                    recoCart = "Y";
                }
                
                if(callOrg == "btnbag2") {
                    common.cart.regCartRecoBellGoodsInCartPopYn = "Y";
                    recoCart = "N";
                    goodsDetailCartYn == "N";
                } else {
                    common.cart.regCartRecoBellGoodsInCartPopYn = "N";
                }
                
                if(!common.isEmpty(params.rccode)) {
                    data.recoRcCode = params.rccode;
                }
                
                if(!common.isEmpty(params.strno)) {
                    data.strNo = params.strno;
                }
            }

            // 상품카드 장바구니버튼 트래킹코드
            common.cart.trackingInfo.setTrackingCd(obj);

            common.Ajax.sendRequest("POST", url, data, common._callCartOptionSelect);
        }
    },
    sendRecobell : function(item_id, track) {
        var src = (('https:'==document.location.protocol)?'https':'http')+'://logger.ai.oliveyoung.co.kr/js/logger.min.js';
        var scriptLen = $("script").filter("[src='"+src+"']").length;

        if(scriptLen == 0) {
            (function(s,x){s=document.createElement('script');s.type='text/javascript';
            s.async=true;s.defer=true;s.src=(('https:'==document.location.protocol)?'https':'http')+
            '://logger.ai.oliveyoung.co.kr/js/logger.min.js';
            x=document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);})();
        }

        eglc.op('setVar', 'cuid', recoCuid);
        eglc.op('setVar', 'itemId', item_id);

        if(track == "cart" && !common.isEmpty(recoRcCode)) {
            eglc.op('setVar', 'rcCode', recoRcCode);
            recoRcCode = "";
        }

        eglc.op('setVar', 'userId', hashedRecoSsoMbrNo);
        eglc.op('track', track);
    },
    convertObjectToQuerystring: function(obj) {
      var str = [];
      for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
          str.push((p) + "=" + (encodeURIComponent(obj[p])));
        }
      }
      return str.join("&");
    },
    /**
     * 입력된 문자열을 사이즈만큼 잘라서 리턴
     */
    cmCheckMaxSize : function(_input, size) {
        var str = _input.val();
        if(str.length > size) {
            var pos = _input[0].selectionEnd;
            var endStr = str.substring(pos, str.length);
            var startStr = str.substr(0, size-endStr.length);
            _input.val(startStr+endStr);
            _input[0].setSelectionRange(startStr.length,startStr.length);
        }
    },
    setCookie : function(name, value, expires) {
        var expdate = new Date();

        if (typeof expires == 'undefined') {
            document.cookie = name + "=" + value + "; path=/; domain=" + document.domain + ";";
        } else {
            expdate.setTime(expdate.getTime() + (typeof expires == 'number' ? expires : (1 * 24 * 60 * 60 * 1000)));
            document.cookie = name + "=" + value + "; path=/; domain=" + document.domain + "; expires="
              + expdate.toGMTString();
        }
    },
    setSessionCookie : function(name, value) {
        this.setCookie(name, value);
    },
    getCookie : function(name) {
        var cName = name + '=';
        var cookieData = document.cookie;
        var start = cookieData.indexOf(cName);
        var cValue = '';
        if (start != -1) {
            start += cName.length;
            var end = cookieData.indexOf(';', start);
            if (end == -1)
                end = cookieData.length;
            cValue = cookieData.substring(start, end);
        }
        return unescape(cValue);
    },

    getDataAttribution: function (obj, attribution) {
        //TODO 어워즈 관련 이벤트 위임 작업 이후 제거 예정
        return obj.attr(attribution) || obj.siblings().attr(attribution) || obj.parent().attr(attribution);
    },

    initBraze: function(brazeApiKey, brazeSDKEndPoint, hashedGtmMbrNo, hashedSsoMbrNo) {
        appboy.initialize(brazeApiKey, {
            enableLogging: false,
            baseUrl: brazeSDKEndPoint,
        });
        appboy.display.automaticallyShowNewInAppMessages();

        if(common.isLogin() && hashedGtmMbrNo) {
            appboy.changeUser(hashedGtmMbrNo);
            if(hashedSsoMbrNo) {
                appboy.getUser().addAlias(hashedSsoMbrNo, 'cjone_memberNumber');
            }
        }

        appboy.openSession();
    },
};

$.namespace("common.gnb");
common.gnb = {

    init : function() {
      //최근 본 상품
        //3310501 (Action Item) 중복호출 제거 - pc최근본 상품 중복호출 제거
        /* 임시로 클릭이벤트로 변경 예정
         * 브세 이후에 Storage를 이용한 고도화 예정
        try {
            common.recentGoods.init();
        } catch (e) {}
        */
        //3310501 (Action Item) 중복호출 제거 - pc최근본 상품 중복호출 제거 start
        //클릭 이벤트 구현

        $('.mymenu_area .recent .mymenu_layer').bind("click", function() {
            try {
                $('.mymenu_area .recent').addClass('open');
                common.recentGoods.getList();
            } catch (e) {}
        });
        //3310501 (Action Item) 중복호출 제거 - pc최근본 상품 중복호출 제거 end
        
        $(".page_location .loc_home").bind("click", function() {
           common.link.moveMainHome();
        });
        $(".page_location .loc_home.kiosk").bind("click", function() {
            common.link.moveMainHomeKiosk();
        });
        
        setTimeout(function() {
            //웹로그 바인딩
            common.gnb.bindWebLog();
        }, 700);
    },


    initMypageMenu : function() {
        common.gnb.bindMypageMenu();
    },

    bindMypageMenu : function() {
        $(".mypage-lnb .subMenu").bind("click", function(e) {
            e.preventDefault();

            // 마이페이지 위치값 저장 후 리뷰 작성 메뉴로 진입했을 경우 스크롤 이동없도록 처리.
            var menuId = $(this).find("a").attr("myMenuId");
            if(menuId == "0402"){
                sessionStorage.removeItem("gdasPopScrollY");
            }

            location.href = $(this).find("a").attr("data-ref-linkUrl");
        });
    },

    /**
     * 마이페이지 메뉴 선택
     */
    setMypageMenu : function(menuId) {
        $(".mypage-lnb .subMenu").removeClass("on");
        $(".mypage-lnb .subMenu").find("a[myMenuId='" + menuId + "']").closest("li").addClass("on");
    },
    
    //웹로그 바인딩
    bindWebLog : function() {
        //일반둥둥이배너
        $(".main_moving_banner a").bind("click", function() {
            common.wlog("home_floating_normal");
        });
        //BI
        $(".header_inner h1 a").bind("click", function() {
            common.wlog("home_header_bi");
        });
        //회원가입
        $("#Header .menu_list .join").bind("click", function() {
            common.wlog("home_header_join");
        });
        //로그인
        $("#Header .menu_list .login").bind("click", function() {
            common.wlog("home_header_login");
        });
        //로그아웃
        $("#Header .menu_list .logout").bind("click", function() {
            common.wlog("home_header_logout");
        });
        //마이페이지
        $("#Header .menu_list .mypage").bind("click", function() {
            common.wlog("home_header_mypage");
        });
        //카트
        $("#Header .menu_list .cart").bind("click", function() {
            common.wlog("home_header_cart");
        });
        //배송
        $("#Header .menu_list .order").bind("click", function() {
            common.wlog("home_header_delivery");
        });
        //고객센터
        $("#Header .menu_list .customer").bind("click", function() {
            common.wlog("home_header_customer");
        });
        //매장안내
        $("#Header .menu_list .store").bind("click", function() {
            common.wlog("home_header_store");
        });
        
        //매장안내
        $("#Header .menu_list .store").bind("click", function() {
            common.wlog("home_header_store");
        });
        //카테고리
        $(".all_menu_wrap a").bind("click", function() {
            common.wlog("home_gnb_" + $(this).attr("data-ref-dispCatNo"));
        });
        //카테고리관 (2020.07)
        //기존 대카테고리 DS사용 (2020.08.04)
//        $(".all_menu_wrap .sub_depth a").bind("click", function() {
//          common.wlog("home_gnb_" + $(this).attr("data-ref-dispCatNo") + "_categoryshop");
//        });
        //관심매장공지
        $(".mymenu_area .store .store_info").bind("click", function() {
            common.wlog("home_header_interest_" + $(this).attr("data-ref-strNo"));
        });
        //gnb 메뉴
        $(".gnb_menu_list").find("a[data-ref-linkUrl='main/getHotdealList.do']").bind("click", function() {
            common.wlog("home_gnb_hotdeal");
        });
        $(".gnb_menu_list").find("a[data-ref-linkUrl='main/getThemeList.do']").bind("click", function() {
            common.wlog("home_gnb_theme");
        });
        $(".gnb_menu_list").find("a[data-ref-linkUrl='main/getMembership.do']").bind("click", function() {
            common.wlog("home_gnb_coupon");
        });
        $(".gnb_menu_list").find("a[data-ref-linkUrl='main/getEventList.do']").bind("click", function() {
            common.wlog("home_gnb_event");
        });
        $(".gnb_menu_list").find("a[data-ref-linkUrl='main/getPlanShopList.do']").bind("click", function() {
            common.wlog("home_gnb_planshop");
        });
        $(".gnb_menu_list").find('span:contains("펫#")').bind("click", function() {
            common.wlog("home_gnb_petshop");
        });
        $(".gnb_menu_list").find("a[data-ref-linkUrl='main/getOnlyOneList.do']").bind("click", function() {
            common.wlog("home_gnb_onlyone");
        });
        $(".gnb_menu_list").find("a[data-ref-linkUrl='main/getNewList.do']").bind("click", function() {
            common.wlog("home_gnb_new");
        });
        $(".gnb_menu_list").find("a[data-ref-linkUrl='main/getSaleList.do']").bind("click", function() {
            common.wlog("home_gnb_sale");
        });
        $(".gnb_menu_list").find("a[data-ref-linkUrl='main/getBestList.do']").bind("click", function() {
            common.wlog("home_gnb_best");
        });
        $(".gnb_menu_list").find("a[data-ref-linkUrl='main/getBrandList.do']").bind("click", function() {
            common.wlog("home_gnb_brand");
        });
        $(".gnb_menu_list").find("a[data-ref-linkUrl='main/getQuickList.do']").bind("click", function() {
            common.wlog("home_gnb_quick");
        });
        $(".gnb_menu_list").find("a[data-ref-linkUrl='main/getQuickMainList.do']").bind("click", function() {
            common.wlog("home_gnb_quick");
        });
        $(".gnb_menu_list").find("a[data-ref-linkUrl='giftCardGuide/getGiftCardGuide.do']").bind("click", function() {
            common.wlog("giftcard_pc_gnb_param");
            n_click_logging( _baseUrl + "?clickarea=giftcard_pc_gnb_param2");
        });
        $(".gnb_menu_list").find("a[data-ref-linkUrl='mycuration/getCurationForYou.do']").bind("click", function() {
            common.wlog("gnb_foru");
        });

        //footer
        $(".oneConts .list-menu li .brandstory").bind("click", function() {
            common.wlog("home_footer_brandstory");
        });
        $(".oneConts .list-menu li .recruit").bind("click", function() {
            common.wlog("home_footer_recruit");
        });
        $(".oneConts .list-menu li .prvsuser").bind("click", function() {
            common.wlog("home_footer_prvsuser");
        });
        $(".oneConts .list-menu li .cjoyp").bind("click", function() {
            common.wlog("home_footer_cjoyp");
        });
        $(".threeConts .sns .facebook").bind("click", function() {
            common.wlog("home_footer_facebook");
        });
        $(".threeConts .sns .insta").bind("click", function() {
            common.wlog("home_footer_instagram");
        });
        $(".threeConts .sns .youtube").bind("click", function() {
            common.wlog("home_footer_youtube");
        });
        $(".threeConts .sns .kakao").bind("click", function() {
            common.wlog("home_footer_kakaotalk");
        });
        
        /*$(".threeConts .sns .cafe").bind("click", function() {
            common.wlog("home_footer_navercafe");
        });
        $(".threeConts .sns .twitter").bind("click", function() {
            common.wlog("home_footer_twitter");
        });*/

        // 각 gnb에 url로 직접 접근했을 경우에도 ds 등록
        if (!document.referrer) {
            switch (window.location.pathname) {
                case '/store/main/getHotdealList.do'            : common.wlog("home_gnb_hotdeal");      break;
                case '/store/main/getNewList.do'                : common.wlog("home_gnb_new");          break;
                case '/store/main/getBestList.do'               : common.wlog("home_gnb_best");         break;
                case '/store/planshop/getSpcShopDetail.do'      : break;
                case '/store/main/getQuickMainList.do'          : common.wlog("home_gnb_quick");        break;
                case '/store/main/getPlanShopList.do'           : common.wlog("home_gnb_planshop");     break;
                case '/store/giftCardGuide/getGiftCardGuide.do' : common.wlog("giftcard_pc_gnb_param"); break;
                case '/store/main/getSaleList.do'               : common.wlog("home_gnb_sale");         break;
                case '/store/main/getMembership.do'             : common.wlog("home_gnb_coupon");       break;
                case '/store/main/getEventList.do'              : common.wlog("home_gnb_event");        break;
            }
        }
        
    }
};

/*--------------------------------------------------------------------------------*\
* SNS 공통 script
\*--------------------------------------------------------------------------------*/
$.namespace("common.sns");
common.sns = {

    /**
     * 공통 SNS 공유 방법
     *
     * 1. 공유를 원하는 페이지에서 common.sns.init 함수를 호출한다.
     *
     * 2. init 함수 호출에 필요한 인자는 이미지URL, 공유제목, 공유할 URL이 된다.
     *
     * 3. init후에는 각 공유 버튼 마다 common.sns,doShare 함수를 호출한다.
     *
     * 4. doShare에 필요한 호출인자는 공유할 서비스 명이다. (kakaotalk, kakaostory, facebook)
     *
     */

    imgUrl : '',        //  이미지 URL
    title : '',         //  공유 제목
    shareUrl : '',      //  공유할 URL

    imgUrlKakaoEvt : '', // 이미지 URL
    titleKakaoEvt : '', // 공유 제목
    shareUrlKakaoEvt : '', // 공유할 URL

    // PC 카톡
    kakao : {
        defaultButton : null,
        defaultContent : null,
        defaultLinkObj : null
    },   // PC 카톡 기능 Ojb


    //  SNS 공유 Init 함수
    init : function(imgUrl, title, shareUrl) {

        try {
            //  카카오톡 Init
            Kakao.init('24077b12ac18b11a96696382ccaa7138');
//        Kakao.init('0305c586bcd3328a207f11633e65717a');
        } catch (e) {}

        common.sns.imgUrl = imgUrl;
        common.sns.title = title;
        common.sns.shareUrl = shareUrl;
        common.sns.kakao.defaultButton = {
            title: '앱으로 보기',
            link: {
                mobileWebUrl: common.sns.shareUrl,
                webUrl:common.sns.shareUrl,
            }
        };

        common.sns.kakao.defaultContent = {
                title : common.sns.title,
                imageUrl : common.sns.imgUrl,
                link : {
                    webUrl : common.sns.shareUrl,
                    mobileWebUrl : common.sns.shareUrl,
                    androidExecParams : common.sns.shareUrl,
                    iosExecParams : common.sns.shareUrl
                }
        };

        common.sns.kakao.defaultLinkObj = {
            objectType : 'feed',
            content : common.sns.kakao.defaultContent,
            buttons : [common.sns.kakao.defaultButton],
            serverCallbackArgs : {
                evtNo : $("input[id='evtNo']:hidden").val(),
                fvrSeq : $("input[id='fvrSeq1']:hidden").val(),
                mbrNo : recoSsoMbrNo,
                type : $("input[id='type']:hidden").val()
            },
            success : function(response) {
                console.log("response : " + response);
            },
            fail : function(error) {
                console.log("error : " + error);
            }
        };
        
        //  메타 태그 INIT
        common.sns.metaTagInit();

        //  URL INPUT BOX 세팅
        $("#shareUrlTxt").attr("value",shareUrl);
    },

    //  SNS 공유 Init 함수 버튼문구 변경용
    init2 : function(imgUrl, title, shareUrl, titleName) {

        try {
            //  카카오톡 Init
            Kakao.init('24077b12ac18b11a96696382ccaa7138');
//        Kakao.init('0305c586bcd3328a207f11633e65717a');
        } catch (e) {}

        common.sns.imgUrl = imgUrl;
        common.sns.title = title;
        common.sns.shareUrl = shareUrl;
        common.sns.kakao.defaultButton = {
            title: titleName,
            // title: '앱으로 보기',
            link: {
                mobileWebUrl: common.sns.shareUrl,
                webUrl:common.sns.shareUrl,
            }
        };

        common.sns.kakao.defaultContent = {
                title : common.sns.title,
                imageUrl : common.sns.imgUrl,
                link : {
                    webUrl : common.sns.shareUrl,
                    mobileWebUrl : common.sns.shareUrl,
                    androidExecParams : common.sns.shareUrl,
                    iosExecParams : common.sns.shareUrl
                }
        };

        common.sns.kakao.defaultLinkObj = {
            objectType : 'feed',
            content : common.sns.kakao.defaultContent,
            buttons : [common.sns.kakao.defaultButton],
            serverCallbackArgs : {
                evtNo : $("input[id='evtNo']:hidden").val(),
                fvrSeq : $("input[id='fvrSeq1']:hidden").val(),
                mbrNo : recoSsoMbrNo,
                type : $("input[id='type']:hidden").val()
            },
            success : function(response) {
                console.log("response : " + response);
            },
            fail : function(error) {
                console.log("error : " + error);
            }
        };
        
        //  메타 태그 INIT
        common.sns.metaTagInit();

        //  URL INPUT BOX 세팅
        $("#shareUrlTxt").attr("value",shareUrl);
    },

    //  페이스북 공유를 위한 메타 태그 세팅
    metaTagInit : function(){
        $("meta[property='og:title']").attr("content", common.sns.title);
        $("meta[property='og:url']").attr("content", common.sns.shareUrl);
        $("meta[property='og:image']").attr("content", common.sns.imgUrl);
    },

    //  공유 처리
    doShare : function(type) {
        //  카카오톡(default)
        if(type == "kakaotalk") {
            Kakao.Link.sendDefault(common.sns.kakao.defaultLinkObj);
        }else if(type == "kakaostory"){         //  카카오스토리
            Kakao.Story.share({
                url: common.sns.shareUrl,
                text: common.sns.title
            });
        }else if(type == "facebook") {          //  페이스북
            var facebook_url = "";
            facebook_url += "http://m.facebook.com/sharer.php?";
            facebook_url += "t="+encodeURIComponent(common.sns.title);
            facebook_url += "&u="+encodeURIComponent(common.sns.shareUrl);

            window.open(facebook_url);
        }else if(type == "url"){
//            var IE = (document.all) ? true : false; 
//            var IE11 = navigator.userAgent.search('Trident');
//            
//            if (IE || IE11!=-1) { 
//                window.clipboardData.setData('Text', common.sns.shareUrl); 
//                alert('URL 주소가 복사되었습니다.'); 
//            }else { 
                temp = prompt("Ctrl+C를 눌러 클립보드로 복사하세요", common.sns.shareUrl ); 
//            } 
        }
    },

    // 공유 처리 (응모기능 버튼1용)
    onlyMainkakaoButton : function(mainBtnNm, mainBtnUrl ) {
      var mobileWebUrl;
      var webUrl;
      if(!common.isEmpty(mainBtnUrl)) {
        mobileWebUrl = mainBtnUrl;
        webUrl = mainBtnUrl;
      }else {
        mobileWebUrl = common.sns.shareUrl;
        webUrl = common.sns.shareUrl;
      }
      common.sns.kakao.defaultButton.title = mainBtnNm;
      common.sns.kakao.defaultButton.link = {
        mobileWebUrl: mobileWebUrl,
          webUrl:webUrl
      }
    },

    initKakaoAddButton : function(imgUrl, title, shareUrl) {
        common.sns.init(imgUrl, title, shareUrl);
    },
    addKakaoButton : function(mainButtonName, secondButtonName, secondButtonUrl) {
        common.sns.kakao.defaultButton.title = mainButtonName;
        common.sns.kakao.defaultLinkObj.buttons = [
            common.sns.kakao.defaultButton,
            {
                title: secondButtonName,
                link: {
                    mobileWebUrl: secondButtonUrl.replaceAll("https://", "http://"),
                    webUrl: secondButtonUrl.replaceAll("https://", "http://"),
                }
            }
        ];
    }
};


/*--------------------------------------------------------------------------------*\
* 장바구니 공통 script
\*--------------------------------------------------------------------------------*/
$.namespace("common.cart");
common.cart = {
        cartNo : '',
        promKndCd : '',
        promNo : '',
        buyCnt : 0,
        getItemAutoAddYn : 'N',     // 프로모션 Get군 상품 자동증가 여부 (Get군의 상품 종류가 1가지일 경우)
        getItemGoodsNo : '',        // Get 상품 종류가 1가지인 goods_no
        getItemItemNo : '',             // Get 상품 종류가 1가지인 item_no
        regCartRecoBellGoodsInCartYn : 'N', // 장바구니에서 레코벨 추천상품 담았는지 여부
        regCartRecoBellGoodsInCartPopYn : 'N',
        regCartCnt : 0,
        jsonParam : undefined,     
        recoSelGoodsNo : '',
        recoSelLgcGoodsNo : '',
        trackingInfo: {
            clickedBtn: '',
            gateVal: '',
            trackVal: '',
            setGateCd: function() {
                if (window.location.href.indexOf('loginForm.do') > -1
                    || document.referrer.indexOf('loginForm.do') > -1) return;
                if (window.location.href.indexOf('Drawer') > -1) {
                    common.cart.trackingInfo.gateVal = 'Drawer';
                    sessionStorage.setItem('referGateCd', 'Drawer');
                    return;
                }
                if (window.location.href.indexOf('Search') > -1) {
                    common.cart.trackingInfo.gateVal = 'Search';
                    sessionStorage.setItem('referGateCd', 'Search');
                    return;
                }

                function getGateCd(url) {
                    if (url.indexOf('getSearchMain.do') > -1)
                        return 'Search';
                    else if (url.indexOf('main.do') > -1)
                        return 'Main';
                    else if (url.indexOf('getGoodsDetail.do') > -1)
                        return 'PDP';
                    else if (url.indexOf('getCurationPop.do') > -1)
                        return 'PDP';
                    else if (url.indexOf('myPageMain.do') > -1)
                        return 'My';
                    else if (url.indexOf('/main/') > -1) // GNB 메뉴
                        return 'Main';
                    else if (url.indexOf('/mypage/') > -1)
                        return 'My';

                    return null;
                };
                common.cart.trackingInfo.gateVal = getGateCd(window.location.href);
                var temprefer = getGateCd(document.referrer);
                if (!!temprefer) sessionStorage.setItem('referGateCd', temprefer);
            },
            getGateCd: function() {
                if (!common.cart.trackingInfo.gateVal) return sessionStorage.getItem('referGateCd');
                return common.cart.trackingInfo.clickedBtn == 'referrer' ? common.cart.trackingInfo.gateVal : sessionStorage.getItem('referGateCd');
            },
            getTrackingCd: function() {
                var temp = common.cart.trackingInfo.trackVal;
                common.cart.trackingInfo.trackVal = '';
                return temp;
            },
            setTrackingCd: function(obj) {
                var val = '';

                if (typeof obj == 'string')
                    val = obj;
                else
                    val = $(obj).attr('name') ||
                        $(obj).closest(".prod-info").find("a").attr("name") ||
                        $(obj).closest(".innerBox").find("a").attr("name") ||
                        $(obj).closest("li").find("a").attr("name");

                if (!!val)
                    common.cart.trackingInfo.trackVal = val;
                common.cart.trackingInfo.clickedBtn = typeof obj == 'string' ? 'gateCd' : 'referrer';
            },
        },

        //  전시에서 사용 ( 전시에서 장바구니 담을때 쓰는 Ajax 화면에서 Init) 
        init : function(){
            if( $("#dupYn").val() != 'Y'){
                //옵션이 없는 상품일 경우 바로 장바구니 등록 
//                var cartGoodsNo = $("#paramGoodsNo").val();
//                var cartItemNo = $("#paramItemNo").val();
//                
//                //  옵션선택이 없다면, 파라미터 받은 값으로 바로 RegCart 실행
//                if( common.cart.cartSelValid(cartGoodsNo, cartItemNo) ){
//                    var resultData = new Array();
//                    
//                    var param = { 
//                          goodsNo : cartGoodsNo,
//                          itemNo : cartItemNo,
//                          ordQty : 1
//                    }
//                    resultData.push(param);
//        
//                    common.cart.regCart(resultData, 'N', '', 'Y');
//                }
            }else{
                //  옵션있는 상품이라면 버튼 Bind
                common.cart.bindButtonInit();    
            }
        },
        
        bindButtonInit : function(){
            
            //  옵션 선택 레이어 Open & Close Bind
            $(function(){       
                $('#mainCartSelect').click(function(e){
                   e.preventDefault();
                   if($(this).parent().hasClass('open')){
                       $(this).parent().removeClass('open');
                   }else{
                       $(this).parent().addClass('open');
                   }
                });
            });
            
            //  옵션 상품 선택 Bind
            $('.selectItem').find('a').click(function(e){
                e.preventDefault();
                
                // 선택한 상품이 품절이면 return
                if($(this).parent().hasClass("soldout")) return;
                
                $(this).parents('.prd_option_box').find('.sel_option').html($(this).find(".option_value").html());
                $(this).parents('.prd_option_box').removeClass('open');
                
                $("#cartGoodsNo").val($(this).attr("data-ref-goodsNo"));
                
                var tmpItemNo = $(this).attr("data-ref-itemNo");
                if (tmpItemNo.length > 3) {
                    tmpItemNo = "001";
                }
                
                $("#cartItemNo").val(tmpItemNo);
                
                // 프로모션 정보 갱신
                $("#promKndCd").val($(this).attr("promKndCd"));
                $("#promNo").val($(this).attr("promNo"));
                $("#buyCnt").val($(this).attr("buyCnt"));
                $("#getItemAutoAddYn").val($(this).attr("getItemAutoAddYn"));
                $("#getItemGoodsNo").val($(this).attr("getItemGoodsNo"));
                $("#getItemItemNo").val($(this).attr("getItemItemNo"));
                
                // common.cart 전역변수 저장
                common.cart.promKndCd = $(this).attr("promKndCd");
                common.cart.promNo = $(this).attr("promNo");
                common.cart.buyCnt = $(this).attr("buyCnt");
                common.cart.getItemAutoAddYn = $(this).attr("getItemAutoAddYn");
                common.cart.getItemGoodsNo = $(this).attr("getItemGoodsNo");
                common.cart.getItemItemNo = $(this).attr("getItemItemNo");
            });
            
            //  상품선택 장바구니 버튼 Bind
            $("#goodsSelCart").click(function(){
                var resultData = new Array();
                
                var goodsSctCd = $("#basketOption #goodsSctCd").val();
                var cartGoodsNo = $("#basketOption #cartGoodsNo").val();
                var cartItemNo = $("#basketOption #cartItemNo").val();
                
                var pkgGoodsYn = $("#basketOption #pkgGoodsYn").val();
                var pkgGoodsNo = (pkgGoodsYn == "Y") ? $("#basketOption #paramGoodsNo").val() : "";
                
                var promKndCd = $("#basketOption #promKndCd").val();
                var buyCondStrtQtyAmt = parseInt( $("#basketOption #buyCnt").val() );
                
                var optChgYn = (common.cart.regCartRecoBellGoodsInCartYn == "Y" || common.cart.regCartRecoBellGoodsInCartPopYn == "Y") ? "N" : $("#optChgYn").val();
                var goodsInfo = (pkgGoodsYn == "Y") ? $("tr[pkggoodsno=" + pkgGoodsNo + "]") : $("tr[goodsno=" + cartGoodsNo + "]");
                var ordQty = parseInt( goodsInfo.find("select[name=s_amount]").val() );
                
                if(isNaN(ordQty))
                    ordQty = parseInt( goodsInfo.find("input[name=s_amount]").val() );
                
                // 오늘드림 전문관에서 상품 옵션 선택시 
                // 오늘드림 장바구니에 가게끔 처리
                // 옵션상품이 아닌경우와 같은 로직탐
                var cartQuickYn = $("#basketOption #quickYn").val();
                
                if(cartQuickYn != "Y"){
                    cartQuickYn = "N";
                }
                
                if( common.cart.cartSelValid(cartGoodsNo, cartItemNo, goodsSctCd) ){
                    var param = { 
                            goodsNo : cartGoodsNo,
                            itemNo : cartItemNo,
                            pkgGoodsNo : pkgGoodsNo,
                            ordQty : (optChgYn == "Y" && ordQty != undefined) ? ordQty : 1,
                            cartNo : common.cart.cartNo,
                            promKndCd : promKndCd,
                            buyCondStrtQtyAmt : buyCondStrtQtyAmt,
                            quickYn : cartQuickYn,
                            regCartRecoBellGoodsInCartYn : common.cart.regCartRecoBellGoodsInCartYn,
                      }
                    
                      resultData.push(param);
                    
                        // 프로모션이 동일(P201), A+B(P203) 이고, FreeGift 가 1종류인 경우 Get상품 추가
                        var promKndCd = $("#basketOption #promKndCd").val();
                        var promNo = $("#basketOption #promNo").val();
                        var buyCondStrtQtyAmt = parseInt( $("#basketOption #buyCnt").val() );
                        var getItemAutoAddYn = $("#basketOption #getItemAutoAddYn").val();
                        var getGoodsNo = (promKndCd == "P201") ? cartGoodsNo : $("#basketOption #getItemGoodsNo").val();
                        var getItemNo = (promKndCd == "P201") ? cartItemNo : $("#basketOption #getItemItemNo").val();
                    
                        if(promNo != undefined && promNo != '' && buyCondStrtQtyAmt == 1){
                            if(promKndCd == "P201" || 
                              (promKndCd == "P203" && getItemAutoAddYn == "Y" && 
                               getGoodsNo != undefined && getGoodsNo != '' && 
                               getItemNo != undefined && getItemNo != '')){
                                var getGoodsData = {
                                        goodsNo : getGoodsNo,
                                        itemNo : getItemNo,
                                        ordQty : (optChgYn == "Y" && ordQty != undefined) ? ( parseInt(ordQty / buyCondStrtQtyAmt) ) : 1,
                                        rsvGoodsYn : "N", // 예약상품여부
                                        dispCatNo : "",  // 전시카테고리 번호
                                        drtPurYn : "N",            //바로구매여부
                                        promKndCd : promKndCd,     //프로모션구분
                                        crssPrstNo : promNo,        //프로모션번호
                                        prstGoodsNo : cartGoodsNo,  //타겟buy군의 상품번호
                                        prstItemNo : cartItemNo,    //타겟buy군의 아이템번호
                                        buyCondStrtQtyAmt : buyCondStrtQtyAmt,
                                        samePrdSumOrdQty : 0,     //상품번호 아이템번호가 같은상품의 수량을 합한값
                                        getItemAutoAddYn : getItemAutoAddYn
                                };
                                                               
                                resultData.push(getGoodsData);
                            }
                        }
                        // 옵션있는 N+1 동일인 경우 Get상품 추가 (끝)
          
                      common.cart.regCart(resultData, 'N', '', 'Y', optChgYn,'Y');
                }
            });
            
        },
        
        cartSelValid : function(goodsNo, itemNo, goodsSctCd){
            var msg = "옵션을 선택해주시기 바랍니다.";
            
            if( goodsSctCd == "20"){
                msg = "상품을 선택해주시기 바랍니다.";
            }    
            
            if((goodsNo != undefined && goodsNo != "") || ( itemNo != undefined && itemNo != "" )){
                return true;
            }else{
                alert(msg);
                return false;
            }
        },
        
        urlParams : function(){
            var params = {};
            window.location.search.replace(
                /[?&]+([^=&]+)=([^&]*)/gi,
                function(str, key, value) {params[key] = value;}
            );
            return params;
        },
        
        // 오늘드림 옵션상품 개편 (cartSelGetInfoList, directYn, saveTp, listYn, optChgYn, cartYn, mbrDlvpSeq) 값 추가 jwikim
        regCart : function(cartSelGetInfoList, directYn, saveTp, listYn, optChgYn, cartYn, mbrDlvpSeq, pickupDirectYn){
            
            if(cartYn == undefined){
                cartYn = "N";
            }
            
            if(cartSelGetInfoList.goodsCartYn != undefined && cartSelGetInfoList.goodsCartYn != "") {
                goodsDetailCartYn = cartSelGetInfoList.goodsCartYn;
            }
            
            var quickYn = "N";
            var url = _baseUrl + "cart/regCartJson.do";
            
            var callBackResult = "";
            
            var dlvpSeq = "";

            var callback = function(data) {

                var result = data.result;
                callBackResult = data;
                
                if ( result ){
                    //장바구니 수량 업데이트
                    //3310497 (Action Item) 중복호출 제거 - 장바구니 수량 카운트
                    var cookie = new Cookie('local', 1, 'D');
                    if(cookie.get('cartTotCnt') != undefined && cookie.get('cartTotCnt') != ""
                        && cookie.get('cartTotCnt') != "null" && cookie.get('cartTotCnt') != null){
                        var cartTotCnt = cookie.get('cartTotCnt');
                        $("#cartToCnt").text("("+cartTotCnt+")");
                    }else{
                        $.ajax({
                            type: "POST",
                            url: _baseUrl + "common/getCartCntJson.do",
                            contentType: "application/json;charset=UTF-8",
                            dataType : 'json',
                            async: false,
                            cache: false,
                            success: function(data) {
                                if(data != 0){
                                    $("#cartToCnt").text("(" + data + ")");
                                    //3310497 (Action Item) 중복호출 제거 - 장바구니 수량 카운트
//                                var cookie = new Cookie('local', 1, 'D');
//                                cookie.set("cartToCnt", data); //Cookie 저장.(모바일 같은 경우는 syncCookie필요)                                
                                }
                            }
                        });
                    }
                    
                    //바로구매시 사용할 return cartNo
                    if ( directYn == 'Y' ){
                        if( listYn == 'A' || listYn == 'S' )
                            return false;
                        
                        // 오늘드림 배송지 선택시 선택한 배송지 seq jwkim
                        if(mbrDlvpSeq != "" && mbrDlvpSeq != undefined){
                            dlvpSeq = mbrDlvpSeq;
                        }

                        // 선물하기 여부
                        var presentYn = window['presentYn'] == 'Y' ? 'Y' : 'N';
                        
                        //넷퍼넬 상품상세 바로구매 act_01
                        NetFunnel_Action({action_id:"act_01"},function(ev,ret){
                        
                            // 장바구니로 이동
                            // jwkim 오늘드림배송에서 일반으로 배송하는 로직에서 사용하는 mbrDlvpSeq(배송지seq) 값추가
                            location.href = _secureUrl + "cart/getCart.do?cartNo=" + data.rCartNo + "&quickYn=" + quickYn + "&mbrDlvpSeq=" + dlvpSeq + "&presentYn=" + presentYn + "&pickupDirectYn=" + pickupDirectYn;
                            // location.href = _secureUrl + "cart/getCart.do?cartNo=" + data.rCartNo + "&quickYn=" + quickYn; // as-is 로직

                        }); 
                        
                    }else{
                        //큐레이션
                        try {
                            if(data != null && data != undefined && data != "" && data.rStockQtyInfo != "") {
                                var lgcGoodsNo = data.rStockQtyInfo[0].split("@=@")[4];

                                if(lgcGoodsNo != undefined && lgcGoodsNo != null && lgcGoodsNo != "") {
                                    common.sendRecobell(lgcGoodsNo, 'cart');
                                    common.cart.recoSelLgcGoodsNo = lgcGoodsNo;
                                }
                            }
                        } catch(e) {

                        }

                        // GTM
                        var goodsInfoList = callBackResult.goodsInfoList;

                        if(!!goodsInfoList && goodsInfoList.length > 0) {
                            // productid2 변수 추가 - [3388239] 페이스북 카달라고 Data Layer 수정 요청(CHY)
                            // price, sale_price 데이터 추가 - [3451865] 페이스북 카달로그 DATA Layer 필드 값 수정 요청(CHY)
                            var goodsNos = [];
                            var goodsNos2 = [];
                            var goodsNms = "";
                            var salePrc = 0;
                            var price = 0;
                            var sale_price = 0;
                            for(var i = 0 ; i < goodsInfoList.length ; i++) {
                                if(i > 0) {
                                    goodsNms += "|";
                                }
                                goodsNos.push(goodsInfoList[i].goodsNo+goodsInfoList[i].itemNo);
                                goodsNos2.push(goodsInfoList[i].goodsNo);
                                goodsNms += goodsInfoList[i].goodsNm;
                                salePrc += (parseInt(goodsInfoList[i].salePrc) - parseInt(goodsInfoList[i].cpnRtAmtVal));
                                price += (parseInt(goodsInfoList[i].orgSalePrc));
                                sale_price += (parseInt(goodsInfoList[i].salePrc) - parseInt(goodsInfoList[i].cpnRtAmtVal));
                            }
                            dataLayer.push({
                                'productId' : goodsNos,                         //상품ID + 옵션번호
                                'productId2' : goodsNos2,                       //상품ID
                                'productName' : goodsNms,                       //상품명
                                'productAmt' : salePrc.toString(),              //상품가격
                                'price' : price.toString() + ' KRW',            //상품원가격
                                'sale_price' : sale_price.toString() + ' KRW'   //상품세일가격
                            });
                        }

                        // [3551897] (GA) 전자상거래 태깅 - 매출
                        var gtmGoodsInfoList = callBackResult.gtmGoodsInfoList;
                        console.log(gtmGoodsInfoList);
                        if(!!gtmGoodsInfoList && gtmGoodsInfoList.length > 0) {
                            var productArr = new Array();
                            for(var i = 0 ; i < gtmGoodsInfoList.length ; i++){
                                productArr.push({
                                    'id':gtmGoodsInfoList[i].lgcGoodsNo, // 마스터 상품코드
                                    'name':gtmGoodsInfoList[i].goodsNm, // 상품명
                                    'price':(Number(gtmGoodsInfoList[i].salePrc) || 0), // 상품단가
                                    'brand':gtmGoodsInfoList[i].onlBrndNm, // 브랜드
                                    'category':(gtmGoodsInfoList[i].stdCatNm ? gtmGoodsInfoList[i].stdCatNm.replaceAll("/", "_").replaceAll(">", "/") : undefined), // 상품카테고리
                                    'quantity':(Number(gtmGoodsInfoList[i].cartOrdQty) || 0),
                                    'variant':gtmGoodsInfoList[i].itemNm,
                                    'dimension43':gtmGoodsInfoList[i].goodsNo, // 온라인 상품코드
                                    'dimension44':gtmGoodsInfoList[i].goodsNm, // 온라인 상품명
                                    'dimension45':gtmGoodsInfoList[i].itemNm, // 온라인 상품옵션
                                    'dimension46':gtmGoodsInfoList[i].prgsStatNm, // 판매상태
                                    'dimension47':gtmGoodsInfoList[i].dermoYn, // 더모 여부
                                    'dimension48':(gtmGoodsInfoList[i].premBrndYn ? gtmGoodsInfoList[i].premBrndYn : undefined), // 프리미엄 여부
                                    'dimension49':(gtmGoodsInfoList[i].tradeShpCd == '1' ? 'N' : 'Y'), // 위수탁 구분
                                    'dimension51':(gtmGoodsInfoList[i].malInfSctCd == '2' ? 'Y' : 'N'), // 남성상품 여부
                                    'dimension52':(gtmGoodsInfoList[i].malInfSctCd == '3' ? 'Y' : 'N'), // 유아상품 여부
                                    'dimension53':gtmGoodsInfoList[i].onlYn, // 온라인전용상품 여부
                                    'dimension54':gtmGoodsInfoList[i].onlyoneSctNm, // ONLYONE상품 구분
                                    'dimension55':gtmGoodsInfoList[i].quickYn, // 오늘드림 상품여부
                                    'dimension56':((Number(gtmGoodsInfoList[i].oneLineGdasTotCnt)+Number(gtmGoodsInfoList[i].prmumGdasTotCnt)) || 0), // 고객 리뷰수
                                    'dimension57':(gtmGoodsInfoList[i].dispCatNm ? gtmGoodsInfoList[i].dispCatNm.replaceAll("/", "_").replaceAll(">", "/") : undefined), // 전시 카테고리
                                    'dimension58':gtm.goods.getBenefitInfo(gtmGoodsInfoList[i]), // 적용 혜택
                                    'dimension60':Math.floor(Number(gtmGoodsInfoList[i].orgSalePrc) > Number(gtmGoodsInfoList[i].salePrc) ? ((Number(gtmGoodsInfoList[i].orgSalePrc) - Number(gtmGoodsInfoList[i].salePrc)) / Number(gtmGoodsInfoList[i].orgSalePrc) * 100) : 0), // 상품 할인율
                                    'dimension61':quickYn, // 오늘드림이용 여부
                                    'dimension62':presentYn // 선물하기이용 여부
                                });
                            }

                            var urlParams = common.cart.urlParams();
                            var gateCd = "";
                            var trackingCd = "";
                            /*
                            if(urlParams.gateCd != undefined){
                                gateCd = urlParams.gateCd;
                            }else{
                                gateCd = common.cart.trackingInfo.getGateCd();
                            }
                            if(urlParams.trackingCd != undefined){
                                trackingCd = urlParams.trackingCd;
                            }else{
                                trackingCd = common.cart.trackingInfo.getTrackingCd();
                            }
                            */

                            var presentYn = window['presentYn'] == 'Y' ? 'Y' : 'N';

                            window.dataLayer = window.dataLayer || [];
                            var gtmParam = {
                                "event":'ee-addToCart',
                                'dimension41':gtmGoodsInfoList[0].lgcGoodsNo, // 마스터 상품코드
                                'dimension42':gtmGoodsInfoList[0].goodsNm, // 마스터 상품명
                                'dimension50':gtmGoodsInfoList[0].onlBrndNm, // 브랜드명
                                'dimension75':(gateCd ? gateCd : undefined), // 게이트 코드
                                'dimension76':(trackingCd ? trackingCd : undefined), // 트래킹 코드
                                'ecommerce': {
                                    'currencyCode': 'KRW',
                                    'add': {
                                        'products': productArr
                                    }
                                }
                            };
                            window.dataLayer.push(gtmParam);
                        }

                        // Pixel AddToCart
                        if(!!cartSelGetInfoList && cartSelGetInfoList.length > 0) {
                            var contentsForFixel = [];
                            var totalPrice = 0;

                            for(var i = 0 ; i < cartSelGetInfoList.length ; i++) {
                                var content_id = cartSelGetInfoList[i].goodsNo;
                                var content_quantity = cartSelGetInfoList[i].ordQty;
                                var infoItem = gtmGoodsInfoList.find(function(x) {
                                    return x.goodsNo === content_id;
                                });

                                if(typeof infoItem != 'undefined'){
                                    totalPrice += Number(infoItem.salePrc) * content_quantity;
                                }
                                // totalPrice += Number(infoItem.salePrc) * content_quantity;

                                contentsForFixel.push({
                                    id: content_id,
                                    quantity: content_quantity,
                                })
                            }

                            fbq('track', 'AddToCart', {
                                contents: contentsForFixel,
                                content_type: 'product',
                                value: totalPrice,
                                currency: 'KRW',
                            });
                        }


                        //  메인 목록에서 장바구니 담기 했을 시
                        if ( listYn == 'Y' ){
                            //  기존 화면 닫기
                            fnLayerSet('basketOption', 'close');
                            
                            if( optChgYn == 'Y' ){
                                    location.reload();
                            } else {
                                //  장바구니 등록 완료 화면으로 이동
                                if( recoCart == 'Y'){
                                    var url = _baseUrl + "common/getCartCompleteLayerAjax.do";
                                    common.Ajax.sendRequest("POST",url,data,common._callCartComplete);
                                }else{
                                    var url = _baseUrl + "common/getCartCompleteAjax.do";
                                    common.Ajax.sendRequest("POST",url,data,common._callCartComplete);
                                }
                            }
                        } else if( listYn == 'A' || listYn == 'S' ) {
                            common.cart.regCartCnt += 1;
                        } else {
                            if(goodsDetailCartYn == "Y") {
                                common.cart.regCartCnt += 1;
                                var url = _baseUrl + "common/getCartCompleteLayerAjax.do";
                                common.Ajax.sendRequest("POST",url,data,common._callCartComplete);
                            } else {
                                common.cart.showBasket();
                            }
                        }
                    }
                    
                }else{
                    if( listYn == 'A' )
                        return false;
                    
                    if(!!data.message && data.message.length < 100){
                        alert(data.message);
                    }else{
                        alert("장바구니 등록에 실패하였습니다.");  
                    }
//                    if (data.message == "-9990") {
//                        alert("판매중지된 상품은 장바구니에 담을 수 없습니다.");
//                    } else if (data.message == "0") {
//                        alert("재고가 부족하여 상품을 장바구니에 담을 수 없습니다.");
//                    } else if (data.message == "99") {
//                        alert("장바구니는 99개까지만 담으실 수 있습니다");    
//                    } else {
//                        alert("장바구니 등록에 실패하였습니다.");
//                    }
                }
            };
            
            // 퀵배송변수 quickYn SET
            try{
                quickYn = cartSelGetInfoList[0].quickYn;
                if(quickYn != "Y" && quickYn != "N"){
                    quickYn = "N";
                }
            }catch(e){
                quickYn = "N";
            }
            
            if(quickYn == "Y") {
                $("#basketOption").attr("data-quick-yn", "Y"); // moveCartPage 에서 장바구니 경로 분기처리를 위해 추가.
            } else {
                $("#basketOption").attr("data-quick-yn", "N"); // moveCartPage 에서 장바구니 경로 분기처리를 위해 추가.
            }


            // [CJOYITEM-356] 블랙프라이데이 색조 클리어런스 기획전 용 등급별 구매 가능 시간 분리 코드
            // var ajax_result = "";
            //
            // $.ajax({
            //     url: _baseUrl + "goods/checkBuyingGradeAjax.do",
            //     async: false,
            //     data: {'goodsNo': $("#goodsNo").val()},
            //     dataType: 'json',
            //     success: function (res) {
            //         if(res.result == false) {
            //             alert(res.message);
            //         }
            //
            //         ajax_result = res.result;
            //     },
            //     error: function (err) {
            //         // 구매 가능하지 않은 등급의 고객은 알림 창 표시 후 구매를 진행하지 못하도록 막는다.
            //         alert(err.message);
            //         ajax_result = false;
            //     }
            // });
            //
            // if(ajax_result == false) return false;

            // 오늘드림 전문관의 오늘드림 여부 추가
            var isValid = this.validation(cartSelGetInfoList, directYn, saveTp, optChgYn, cartYn, quickYn, pickupDirectYn);

            if (isValid) {
                $.ajax({
                    type: "POST",
                    url: url,
                    data: JSON.stringify(this.jsonParam),
                    contentType: "application/json;charset=UTF-8",
                    dataType : 'json',
                    async: false,
                    cache: false,
                    success: callback,
                    error : function(e) {
                        console.log(e);
                        alert("장바구니 등록에 실패하였습니다.");
                    }
                });
            }

            return callBackResult;
        },
        
        validation : function(cartSelGetInfoList, directYn, saveTp, optChgYn, cartYn, quickYn, pickupDirectYn) {
            // 파라메터의 validation 처리
            var isValid = true;
            if(cartSelGetInfoList == null) {
                var msg = "죄송합니다. 고객센터에 문의해 주세요.";

                this.jsonParam = false;
                isValid = false;
            }
            
            //행사안내레이어 장바구니버튼 진입시사용
            if(location.href.indexOf("getCart.do?cartNo=") > 0){
                directYn = "Y";
            }
            
            if(isValid) {
                
                var qDeliveVal = "N";
                if(quickYn == "Y" && quickYn == "N"){
                    qDeliveVal = $("input[name=qDelive]:checked").val();
                    
                    if(qDeliveVal==undefined || qDeliveVal == null || qDeliveVal == ""){
                        qDeliveVal = "N";
                    }
                }
                
                // 오늘드림 전문관 리스트에서 장바구니 클릭시 quickYn값이 Y임
                // qDeliveVal 값을 Y로 해야만 오늘드림 관련 비지니스 로직을 타기 때문에 Y로함
                if(quickYn == "Y"){
                    qDeliveVal = "Y";
                }
                
                if(quickYn == "N"){
                    qDeliveVal = "N";
                }
                
                // 오늘드림 상품상세 장바구니 담기 추가.
                var prodView = cartSelGetInfoList.prodView;
                if(prodView == undefined || prodView == "") {
                    prodView = "N";
                }
                
                // 오늘드림 상품상세 장바구니 담기 추가.
                var strNo = cartSelGetInfoList.strNo;
                if(strNo == undefined || strNo == null) {
                    strNo = "";
                }
                
                var urlParams = common.cart.urlParams();
                var gateCd = cartSelGetInfoList[0].gateCd || common.cart.trackingInfo.getGateCd();
                var trackingCd = cartSelGetInfoList[0].trackingCd || common.cart.trackingInfo.getTrackingCd();
                if (!trackingCd && urlParams.trackingCd != undefined) {
                    trackingCd = urlParams.trackingCd;
                }
                // console.log('gate ' + gateCd);
                // console.log('tracking ' + trackingCd);
                this.jsonParam =   {
                        drtPurYn : directYn
                        ,saveTp : saveTp
                        ,optChgYn : optChgYn
                        ,cartYn : cartYn
                        ,quickYn : qDeliveVal
                        ,prodView : prodView
                        ,strNo : strNo
                        ,regCartRecoBellGoodsInCartYn : common.cart.regCartRecoBellGoodsInCartYn
                        ,opCartBaseList : cartSelGetInfoList
                        ,trackingCd : trackingCd
                        ,gateCd : gateCd
                        ,pickupDirectYn : pickupDirectYn
                    };
            }
            
            return isValid;
        }, 
        
        showBasket : function(){
            alert("나의 장바구니에 담았어요");
            
            common.cart.regCartCnt += 1;
        },
        
        callRecoBellGoodsInCart : function(goodsNo, lgcGoodsNo) {
            var goodsNos = [];
            goodsNos.push(goodsNo);
            
            var url = _baseUrl + "cart/getRecoBellGoodsInCartLayerAjax.do";
            var param = {
                    goodsNos : goodsNos.toString(),
                    quickYn : $("#quickYn").val() || null,
                    lgcGoodsNo : lgcGoodsNo
            };
            
            var _callBackRecoBellGoodsInCartInfo = function(data) {
                $("#curation_area_a008").html("");
                $("#curation_area_a008").html(data);
                
                if($("#curation_area_inner_a008").find("li").length == 0) {
                    $("#curation_area_a008").hide();
                }
                
                /*$('#curation_ul_a003').slick({
                    arrows: true,
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 3,           
                    dots : true,
                });*/            
                //mcart.base.slideOver();
                
                //찜 처리 초기화
                //common.wish.init();
            };
            
            common.Ajax.sendRequest("POST",url,param,_callBackRecoBellGoodsInCartInfo);
        },
        
        updHeaderCartCnt : function(){
            if (common.isLogin()) {
                //3310497 (Action Item) 중복호출 제거 - 장바구니 수량 카운트
                var cookie = new Cookie('local', 1, 'D');
                if(cookie.get('cartTotCnt') != undefined && cookie.get('cartTotCnt') != ""
                    && cookie.get('cartTotCnt') != "null" && cookie.get('cartTotCnt') != null){
                    var cartTotCnt = cookie.get('cartTotCnt');
                    $("#cartToCnt").text("("+cartTotCnt+")");
                }else{
                    //장바구니 수량 업데이트
                    $.ajax({
                        type: "POST",
                        url: _baseUrl + "common/getCartCntJson.do",
                        contentType: "application/json;charset=UTF-8",
                        dataType : 'json',
                        async: false,
                        cache: false,
                        success: function(data) {
                            if(typeof data != 'undefined' && data != null && data != 0){
                                $("#cartToCnt").text("("+data+")");
                            }
                        }
                    });
                }
            }
        },
        
        updStonArea : function(){
            
            var _headerLoginAreaHtml = "";
            var _menu_list_header = $("#menu_list_header");
            
            var _headerLogoutObj = _menu_list_header.find("li.logout");
            var _headerMypageObj = _menu_list_header.find("li.mypage");
            var _headerJoinObj = _menu_list_header.find("li.join");
            var _headerLoginObj = _menu_list_header.find("li.login");
            
            var _isLogin = common.isLogin(); 
            
            if (_isLogin) {
                // 로그인되있을때 : 노출= 등급, 이름, 로그아웃, 마이페이지
                // 회원가입, 로그인 있으면 display none
                if(_headerJoinObj.size() > 0){_headerJoinObj.css("display", "none");}
                if(_headerLoginObj.size() > 0){_headerLoginObj.css("display", "none");}
                
                $.ajax({
                    type: "POST",
                    url: _baseUrl + "common/getStonDataJson.do",
                    contentType: "application/json;charset=UTF-8",
                    dataType : 'json',
                    async: false,
                    cache: false,
                    success: function(data) {  
                        
                        if(_headerMypageObj.size() > 0){
                            // 마이페이지 있을때 display block
                            if(_headerMypageObj.size() > 0){_headerMypageObj.css("display", "block");}
                            
                        }else{
                            // 마이페이지 없을때 html prepend
                            _headerLoginAreaHtml = '<li class="mypage"><a href="javascript:common.link.moveMyPageMain();">마이페이지</a></li>';
                            _menu_list_header.prepend(_headerLoginAreaHtml);
                        }
                        
                        if(_headerLogoutObj.size() > 0){
                            // 로그아웃 있을때는 display block
                            _headerLogoutObj.css("display", "block");
                        }else{
                            // 로그아웃 없을때 html prepend
                            _headerLoginAreaHtml = '<li class="logout"><strong>' + data.mbrGradeCdNm +' ' + data.name + ' </strong> <a href="javascript:common.link.moveLogoutPage();">로그아웃</a></li>';
                            _menu_list_header.prepend(_headerLoginAreaHtml);
                        }
                        
                        
                    }
                });
                
            }else{
                // 비로그인 : 노출= 회원가입, 로그인
                
                if(_headerLogoutObj.size() > 0){_headerLogoutObj.css("display", "none");}
                if(_headerMypageObj.size() > 0){_headerMypageObj.css("display", "none");}
                
                if(_headerLoginObj.size() > 0){
                    // 로그인 있을때는 display block
                    _headerLoginObj.css("display", "block");
                }else{
                    // 로그인 없을때 html prepend
                    _headerLoginAreaHtml = '<li class="login"><a href="javascript:common.link.moveLoginPage();">로그인</a></li> ';
                    _menu_list_header.prepend(_headerLoginAreaHtml);
                    
                }
                
                if(_headerJoinObj.size() > 0){
                    // 회원가입 있을때는 display block
                    _headerJoinObj.css("display", "block");
                }else{
                    // 회원가입 없을때 html prepend
                    _headerLoginAreaHtml = '<li class="join"><a href="javascript:common.link.moveJoinMember();">회원가입</a></li> ';
                    _menu_list_header.prepend(_headerLoginAreaHtml);
                }
                
                
            }
            
            try{
                common.cart.sendRedirectDevice(); // device에 따라 redirect 처리
            }catch(e){
                console.log(">>>>> sendRedirectDevice catch = " + e);
            }
            
        },
        
        sendRedirectDevice : function() {

            var _parser = new UserAgentUtil(navigator.userAgent);
            
            var _isMobile = _parser.isMobile(); // 계속 호출하면 return 값이 변해서 변수선언
            var _currUrl = window.location.href;
            var _toUrl = _baseUrl;

            // redirect url protocol 제거
            _redirectMoBaseUrl = _redirectMoBaseUrl.replace("https:", "").replace("http:", "");
            _redirectMaBaseUrl = _redirectMaBaseUrl.replace("https:", "").replace("http:", "");
            _redirectFoBaseUrl = _redirectFoBaseUrl.replace("https:", "").replace("http:", "");
            
            // http 일경우 https로 redirect
            if (_currUrl.indexOf("http://") > -1) {
                _toUrl = _currUrl.replace("http://", "https://");
                window.location.href = _toUrl;
            }

            if (_isMobile) {
                // 모바일 일때, 모바일web으로 forward
                if (_currUrl.indexOf(_redirectFoBaseUrl) > -1) {
                    _toUrl = _currUrl.replace(_redirectFoBaseUrl, _redirectMoBaseUrl);
                    window.location.href = _toUrl;
                }
            }

        },

        completeMsg : function(){
           var addMsg = "";
           
           if(common.cart.buyCnt == 1){     // 프로모션 N+1 조건 중 N이 1일 경우
               if(common.cart.promKndCd == "P201"){
                   addMsg = "<br>" + common.cart.buyCnt + "+1상품도 함께 추가되었습니다!";
               } if(common.cart.promKndCd == "P202"){
                       addMsg = "<br>" + common.cart.buyCnt + "+1행사상품이므로, 장바구니에서<br>추가상품을 선택해주세요!";
               } if(common.cart.promKndCd == "P203"){
                   if(common.cart.getItemAutoAddYn == "Y")
                       addMsg = "<br>Gift상품도 함께 추가되었습니다!";
                   else
                       addMsg = "<br>Gift행사상품이므로, 장바구니에서<br>추가상품을 선택해주세요!";
               }
           }
           
           if(common.cart.promNo != undefined && common.cart.promNo != "")
               $("div.basket_add_txt").html($("div.basket_add_txt").text() + addMsg);
        },
       
       completeRecoLayerMsg : function(){
           var addMsg = "";
           if(common.cart.buyCnt >= 1){     // 프로모션 N+1 조건 중 N이 1일 경우
               if(common.cart.promKndCd == "P201"){
                   addMsg = "<br>" + common.cart.buyCnt + "+1상품도 함께 추가되었습니다!";
               } if(common.cart.promKndCd == "P202"){
                       addMsg = "<br>" + common.cart.buyCnt + "+1행사상품이므로, 장바구니에서<br>추가상품을 선택해주세요!";
               } if(common.cart.promKndCd == "P203"){
                   if(common.cart.getItemAutoAddYn == "Y")
                       addMsg = "<br>Gift상품도 함께 추가되었습니다!";
                   else
                       addMsg = "<br>Gift행사상품이므로, 장바구니에서<br>추가상품을 선택해주세요!";
               }
           }
           
           if(common.cart.promNo != undefined && common.cart.promNo != ""){
                $(".pop-conts .popCont .txt_onbag").html("<p class='txt_onbag'>"+addMsg+"</p>");
           }else{
                $(".pop-conts .popCont .txt_onbag").html("<p class='txt_onbag'>장바구니에 추가되었습니다.</p>");
           }
       }
};

/*--------------------------------------------------------------------------------*\
* 최근 본 상품 공통
\*--------------------------------------------------------------------------------*/
$.namespace("common.recentGoods");
common.recentGoods = {

        param : "",
        totCnt : 0,

        init : function(){
            //3310501 (Action Item) 중복호출 제거 - pc최근본 상품 중복호출 제거
            /* 임시로 클릭이벤트로 변경 예정
             * 브세 이후에 Storage를 이용한 고도화 예정
            common.recentGoods.getList();
             */
        },

        bindEvent : function(){
            // 페이징버튼 클릭이벤트 - 수정중
            $('.recent_prd_box .pageing').find('a').bind('click', function(){
                var pageIdx = $(this).data('pageNo');

                if(typeof pageIdx == 'undefined' || pageIdx == '') return;
                common.recentGoods.getList(pageIdx);
            });
            
            //최근 본 상품 개별삭제 클릭이벤트
            $(".recent_prd_box .cate_prd_list li .btnDelete").bind('click', function(){
                common.recentGoods.delRecentGoods(this);
            });
            
            //최근 본 상품 전체삭제 클릭이벤트
            $(".recent_prd_box .mymenu_btn").bind('click', function(){
                common.recentGoods.delAllRecentGoods();
            });
        },

        getGoodsList : function(pageIdx){
            var goodsNo = "";

            var cookie  = new Cookie('local', 1, 'M');

            if ( cookie.get('productHistory') != undefined && cookie.get('productHistory') != "" ){

                var jsonStr = JSON.parse(cookie.get('productHistory'));
                var cnt = jsonStr.length;

                for(var i=0; i <jsonStr.length && i < 10; i++){
                    if(i < cnt && jsonStr[i].goodsNo != null && jsonStr[i].goodsNo != ""){
                        if (i == jsonStr.length - 1 || i == 9) {
                            goodsNo += jsonStr[i].goodsNo;
                        }else{
                            goodsNo += jsonStr[i].goodsNo + ",";
                        }
                    }
                }
            }
            return goodsNo;
        },
        
        getList : function(pageIdx){
            if(pageIdx == undefined){
                pageIdx = 1;
            }
            
            var goodsNo = common.recentGoods.getGoodsList(pageIdx);

            if(goodsNo != null && goodsNo != ""){
                $(".recent_prd_box").empty();

                param = {
                        goodsInfo : goodsNo ,
                        pageIdx : pageIdx,
                        pagingFlag : 'Y'
                };
                
                common.Ajax.sendRequest("get"
                        , _baseUrl + "mypage/getRecentListPagingAjax.do"
                        , param
                        , common.recentGoods.getRecentListAjaxCallback
                        , false
                );
            } else {
                $(".no_data").show();
                $(".recent_prd_box .recent_tit span").text(0);
                $(".recent_prd_box .recent_tit .mymenu_btn").hide();
                $(".recent_prd_box .pageing").hide();
                $(".recent_prd_box .cate_prd_list").remove();
            }
        },
        
        /**
         * 최근 본 상품 정보조회
         */
        getRecentListAjaxCallback : function(res, type, callback){
            if (res.trim() == "") {
                $(".no_data").show();

            } else {
                $(".recent .recent_prd_box").append(res);

                common.recentGoods.bindEvent();

                //체크 처리.
                common.wish.checkWishList();
                
                var cookie  = new Cookie('local', 1, 'M');
                var jsonStr =  JSON.parse(cookie.get('productHistory'));
                
                // 쿠키 32개 넘어가는 상품번호 삭제처리
                for( var j=0; j<jsonStr.length; j++){
                    if (j >= 32) {
                        delete jsonStr.splice(j, 1);
                    }
                }
                //쿠키에 값 셋팅
                cookie.set('productHistory', JSON.stringify(jsonStr));
                
                setTimeout(function() {
                    //링크 처리
                    common.bindGoodsListLink(".recent_prd_box .cate_prd_list li .prd_info");
                    
                    common.recentGoods.bindWeblog();
                }, 500);
            }

            if (callback != undefined) {
                callback();
            }
        },
        
        //최근본상품 삭제 클릭 이벤트
        delRecentGoods : function(obj) {
        	var cookie  = new Cookie('local', 1, 'M');

            //쿠키 데이터 지우기
            var jsonStr =  JSON.parse(cookie.get('productHistory'));
            
            for( var j=0; j<jsonStr.length; j++){

                if ($(obj).parent().find("a").attr("data-ref-goodsNo") == jsonStr[j].goodsNo ){
                    delete jsonStr.splice(j, 1);

                    $(obj).closest("li").remove();
                    break;
                }
            }
            
            //쿠키에 값 셋팅
            cookie.set('productHistory', JSON.stringify(jsonStr));

            //Reload
            var pageIdx = 0;
            if($(".recent_prd_box .cate_prd_list li").size() == 0){
                pageIdx = $(".recent_prd_box .pageing strong").index();
            }else{
                pageIdx = $(".recent_prd_box .pageing strong").index() + 1;
            }

            common.recentGoods.getList(pageIdx);
        },
        
        //최근본상품 삭제 클릭 이벤트
        delAllRecentGoods : function() {
            if(confirm("전체 상품을 삭제하시겠습니까?")){
                today = new Date();
                today.setDate(today.getDate() - 1);

				var cookie  = new Cookie('local', 1, 'M');
                cookie.set('productHistory', '');
                
                $(".recent_prd_box .recent_tit .mymenu_btn").hide();                
                $(".recent_prd_box .cate_prd_list").remove();
                $(".recent_prd_box .pageing").remove();
                $(".recent_tit span").text(0);
                $(".no_data").show();
            }
        },
        
        bindWeblog : function() {
            //최근본상품
            $(".recent_prd_box .cate_prd_list li").each(function(idx) {
                var goodsIdx = $(this).attr("data-ref-recentGoodsIdx");
                $(this).find(".prd_info .goodsList").bind("click", function() {
                    common.wlog("home_header_recent_" + goodsIdx);
                });
            });
        },
        curationMove : function(lgcGoodsNo, goodsNo, dispCatNo, smlDispName){
        	
            var rccode = "";
            if(common.isLogin()){
            	rccode = "pc_recency_01_a";
            } else {
            	rccode = "pc_recency_01_c";
            }
            
            var options = {
            		size : 40, //큐레이션 api 호출용, 더보기 팝업 노출갯수
            		cps : true, //큐레이션 api 호출용
            		cpt : "c001",
            		viewType : 'RecentPop', 
            		popupYn : "Y",
            		titlRp : smlDispName, // 타이틀 replace 텍스트
            		viewArea : 'goods_curation_pop_a002',
            		recType : "a002", // 큐레이션 url 정보
            		iids : lgcGoodsNo,
            		goodsNo : goodsNo,
            		cpcids : dispCatNo,
            		rccode : rccode
            	};
            
            var requestUrl = _baseUrl + "curation/getLgcGoodsNoListAjax.do"
	   		common.Ajax.sendRequest("POST", requestUrl, {goodsNos : options.goodsNo}, function(res) {
	   			options.iids = res.data;
	   			curation.popLoadEvent(options);
	   		});
        }
};

/*--------------------------------------------------------------------------------*\
* 찜 클릭 공통
\*--------------------------------------------------------------------------------*/
$.namespace("common.wish");
common.wish = {

        init : function(){
            //체크 처리.
            common.wish.checkWishList();
            //오특 플래그
            common.gnb.todaySpecial.setTodaySpecialFlag('.a_detail .newOyflag');
        },

        bindEvent : function() {

            $('.btn_zzim').unbind("click");

            //찜 클릭 이벤트
            $('.btn_zzim').bind('click', function(){

                if ($(this).attr("data-rccode") == 'pc_detail_soldout_ac') {
                    common.wlog('goods_soldout_popup_prod_like');
                }

                //로그인 체크
//                if(common.loginChk()){
                    var param = {
                            goodsNo : $(this).attr("data-ref-goodsNo")
                    };

                    if($(this).hasClass("on")){
                        //off
                        if($(this)[0].tagName == "BUTTON"){
                            $(this).html('<span>찜하기전</span>');
                        }
                        common.wish.delWishLst(param, $(this));
                    }else{
                        //on
                        if($(this)[0].tagName == "BUTTON"){
                            $(this).html('<span>찜하기후</span>');
                        }
                        common.wish.regWishLst(param, $(this));
                    }
//                }
            });
            
            //브랜드 좋아요 클릭
            $('.brand_like > a').unbind("click");

            //브랜드 좋아요 클릭 이벤트
            $('.brand_like > a').bind('click', function(event){
                    event.preventDefault();
                    var param = {
                            onlBrndCd : $(this).attr("data-ref-onlBrndCd")
                    };

                    if($(this).hasClass("on")){
                        common.wish.delBrndWishLst(param, $(this));
                    }else{                        
                        common.wish.regBrndWishLst(param, $(this));
                    }
            });
            
            // 브랜드관 용으로 재구성
            $('.favorite').unbind("click");

            //찜 클릭 이벤트
            $('.favorite').bind('click', function(){
                if ($(this).attr("trackingCd") == 'Today_Special') {
                    common.wlog('todayspecial_dailySpecailGoods_like');
                } else if ($(this).attr("trackingCd") == "Today") {
                    common.wlog('todayspecial_dailyGoods_like');
                }

                //로그인 체크
//                if(common.loginChk()){
                    var param = {
                            goodsNo : $(this).attr("data-ref-goodsNo")
                    };

                    if($(this).hasClass("on")){
                        //off
                        if($(this)[0].tagName == "BUTTON"){
                            $(this).html('<span>찜하기</span>');
                        }
                        common.wish.delWishLst(param, $(this));
                    }else{
                        //on
                        if($(this)[0].tagName == "BUTTON"){
                            $(this).html('<span>찜하기</span>');
                        }
                        common.wish.regWishLst(param, $(this));
                    }
//                }
            });

        },

        loadData : function() {
            var cookie = new Cookie('local', 1, 'd');
            
            //로그인 여부에 따라 찜목록 저장.
            if(common.isLogin()){
                var wishListJson = cookie.get("wishList");
                

                //없으면 조회
                if (wishListJson == null || wishListJson.trim() == "") {

                    common.wish.isLoading = false;

                    //저장된 화면이 없을 경우 html 조회
                    $.ajax({
                        type: "POST",
                        url: _baseUrl + "mypage/getWishListJson.do",
                        data: null,
                        dataType : 'text',
                        async: false,
                        cache: false,
                        success: function(data) {

                            try {
                                var jsonObject = $.parseJSON(data);
                                cookie.set("wishList", data);

                            } catch (e) {}

                            common.wish.isLoading = true;
                        },
                        error: function() {
                            common.wish.isLoading = true;
                        }
                    });
                }

            } else {
                //제거
                cookie.remove("wishList");
            }
        },

        checkWishList : function() {

            common.wish.bindEvent();

            setTimeout(function() {
                //정보 조회
                common.wish.loadData();
                var cookie = new Cookie('local', 1, 'd');
                var wishListJson = cookie.get("wishList");

                $('.btn_zzim').removeClass("on");
                $('.btn_zzim').html('<span>찜하기전</span>');
                
                if (wishListJson != null && wishListJson.trim() != "") {
                    try {
                        var jsonObject = $.parseJSON(wishListJson);

                        var goodsList = jsonObject.goodsList;

                        for (var i = 0; i < goodsList.length; i++) {
                            $(".btn_zzim[data-ref-goodsNo='" + goodsList[i] + "']").addClass("on");
                            $(".btn_zzim[data-ref-goodsNo='" + goodsList[i] + "']").html('<span>찜하기후</span>');
                        }
                    } catch (e) {}
                }
                
                $('.favorite').removeClass("on");
                $('.favorite').html('<span>찜하기</span>');
                
                if (wishListJson != null && wishListJson.trim() != "") {
                    try {
                        var jsonObject = $.parseJSON(wishListJson);

                        var goodsList = jsonObject.goodsList;

                        for (var i = 0; i < goodsList.length; i++) {
                            $(".favorite[data-ref-goodsNo='" + goodsList[i] + "']").addClass("on");
                            $(".favorite[data-ref-goodsNo='" + goodsList[i] + "']").html('<span>찜하기</span>');
                        }
                    } catch (e) {}
                }

            }, 100);
        },

        regWishLst : function(param, obj){
            if (param.goodsNo == undefined || param.goodsNo == "" ) {
                alert("등록이 실패하였습니다.\n상품정보가 없습니다.");
                return;
            }
            
            var callBackResult = "";

            common.Ajax.sendRequest(
                      "POST"
                    , _baseUrl + "mypage/regWishLstAjax.do"
                    , param
                    , function(res) {
                        callBackResult = res.message;
                        common.wish.regWishLstAjaxCallback(res.message, obj);
                        
                        try {
                            var lgcGoodsNo = res.data.lgcGoodsNo;
                            if(lgcGoodsNo != undefined && lgcGoodsNo != null && lgcGoodsNo != "") {
                                common.sendRecobell(lgcGoodsNo, 'like');
                            }
                        } catch(e) {

                        }
                    }
                    , false
            );
            
            return callBackResult;
        },

        regWishLstAjaxCallback : function(res, obj){

            var cookie = new Cookie('local', 1, 'd');
            
            setTimeout(function() {
                //목록 갱신을 위해 제거
                cookie.remove("wishList");
                common.wish.checkWishList();
            }, 100);

            var result = res.trim();
            if (result != '000') {
                if (result == '100') {
                    //로그인 실패
                    if (!common.loginChk()) {
                        return;
                    }
                } else if (result == '200') {
                    if(common.isLogin()){
                        //  성인상품인데 로그인은 되어 있으나 성인인증이 안되었을 경우
                        common.link.moveRegCertPage("Y",location.href);
                    }else{
                        //성인인증필요
                        //로그인 성인체크
                        common.link.moveLoginPage("Y", location.href);
                    }
                    return;
                } else if (result == '500') {
                    //개수 초과
                    alert("쇼핑 찜은 99개 까지만 담으실 수 있습니다.");
                    return;
                } else if (result == '600') {
                    //이미 찜
                    //alert("이미 찜한 상품입니다.");
                    alert("쇼핑찜리스트에 저장된 상품입니다."); 
                    return;
                }
            }

            if (obj != undefined) {
                obj.addClass("on");
            }

            //찜 알림레이어 On
            //alert("찜! 되었습니다.");
            common.wish.setZzimOn('on');
        },

        delWishLst : function(param, obj){
            if (param.goodsNo == undefined || param.goodsNo == "" ) {
                alert("삭제가 실패하였습니다.\n상품정보가 없습니다.");
                return;
            }
            
            var callBackResult = "";

            common.Ajax.sendRequest(
                    "POST"
                  , _baseUrl + "mypage/delWishLstAjax.do"
                  , param
                  , function(res) {
                      callBackResult = res;
                      common.wish.delWishLstAjaxCallback(res, obj);
                  }
                  , false
            );
            
            return callBackResult;
            
        },

        delWishLstAjaxCallback : function(res, obj){
            //목록 갱신을 위해 제거
            var cookie = new Cookie('local', 1, 'd');
            cookie.remove("wishList");
            common.wish.checkWishList();

            var result = res.trim();
            if (result != '000') {
                if (result == '100') {
                    //로그인 실패
                    if (!common.loginChk()) {
                        return ;
                    }
                }
            }

            if (obj != undefined) {
                obj.removeClass("on");
            }

            //찜 알림레이어 Off
            //alert("찜이 취소 되었습니다.");
            common.wish.setZzimOn('off');
        },
        
        regBrndWishLst : function(param, obj){
            if (param.onlBrndCd == undefined || param.onlBrndCd == "" ) {
                alert("등록이 실패하였습니다.\n브랜드정보가 없습니다.");
                return;
            }
            
            var callBackResult = "";

            common.Ajax.sendRequest(
                      "POST"
                    , _baseUrl + "mypage/regBrndWishLstAjax.do"
                    , param
                    , function(res) {                    	
                        callBackResult = res;
                        common.wish.regBrndWishLstAjaxCallback(res, obj);
                        
                        if(res.resultCd == '000') {
                        	try {
                        		common.wish.sendBrdLikeRecobell(param.onlBrndCd);
                        	} catch(e) {
                        		
                        	}
                        }
                    }
                    , false
            );
            
            return callBackResult;
        },
        regBrndWishLstAjaxCallback : function(res, obj){

            var result = res.resultCd
            if (result != '000') {
                if (result == '100') {
                    //로그인 실패
                    if (!common.loginChk()) {
                        return;
                    }
                }else if (result == '600') {
                    //이미 찜
                    //alert("이미 찜한 상품입니다.");
                    alert("이미 좋아요에 저장된 브랜드입니다."); 
                    return;
                }
            }

            if (obj != undefined) {
                obj.addClass("on");
                
                var brndcd = $(".brand_like a").attr("data-ref-onlBrndCd");
                if($(".a_brnd").filter("[data-brndcd="+brndcd+"]").length > 0) {
                	$(".a_brnd").filter("[data-brndcd="+brndcd+"]").attr("data-usrlikeyn", "Y");
                	$(".a_brnd").filter("[data-brndcd="+brndcd+"]").attr("data-likecnt", res.brndCnt);
                }
            }
            
            var paticle = common.checkTxtParticle($(".brand_like a").attr("data-ref-onlBrndNm"), "을", "를");
            
            if(res.brndCnt > 0){
    			$(".brand_like span.icon").html("<span id='brndCnt'>"+(res.brndCnt).numberFormat()+"</span>명이 <span class='bdName'>"+$(".brand_like a").attr("data-ref-onlBrndNm")+"</span><span id='span_ptc'>"+paticle+"</span> 좋아합니다.");
    		}else{
    			$(".brand_like span.icon").html("브랜드의 상품 안내 및 추천을 받으실 수 있습니다.");
    		}
            
            common.wish.setBrandZzimOn('on');
        },
        
        delBrndWishLst : function(param, obj){
            if (param.onlBrndCd == undefined || param.onlBrndCd == "" ) {
                alert("삭제가 실패하였습니다.\n브랜드정보가 없습니다.");
                return;
            }
            
            var callBackResult = "";

            common.Ajax.sendRequest(
                    "POST"
                  , _baseUrl + "mypage/delBrndWishLstAjax.do"
                  , param
                  , function(res) {                	
                      callBackResult = res;
                      common.wish.delBrndWishLstAjaxCallback(res, obj);
                  }
                  , false
            );
            
            return callBackResult;
            
        },

        delBrndWishLstAjaxCallback : function(res, obj){
            //목록 갱신을 위해 제거
//            common.wish.checkWishList();

            var result = res.resultCd;
            if (result != '000') {
                if (result == '100') {
                    //로그인 실패
                    if (!common.loginChk()) {
                        return ;
                    }
                }
            }

            if (obj != undefined) {
                obj.removeClass("on");
                
                var brndcd = $(".brand_like a").attr("data-ref-onlBrndCd");
                if($(".a_brnd").filter("[data-brndcd="+brndcd+"]").length > 0) {
                	$(".a_brnd").filter("[data-brndcd="+brndcd+"]").attr("data-usrlikeyn", "N");
                	$(".a_brnd").filter("[data-brndcd="+brndcd+"]").attr("data-likecnt", res.brndCnt);
                }
            }
            
            var paticle = common.checkTxtParticle($(".brand_like a").attr("data-ref-onlBrndNm"), "을", "를");
            
            if(res.brndCnt > 0){
            	$(".brand_like span.icon").html("<span id='brndCnt'>"+(res.brndCnt).numberFormat()+"</span>명이 <span class='bdName'>"+$(".brand_like a").attr("data-ref-onlBrndNm")+"</span><span id='span_ptc'>"+paticle+"</span> 좋아합니다.");
    		}else{
    			$(".brand_like span.icon").html("브랜드의 상품 안내 및 추천을 받으실 수 있습니다.");
    		}
            
            common.wish.setBrandZzimOn('off');
        },
        
        delAllBrndWishLst : function(param){
            common.Ajax.sendRequest(
                    "POST"
                  , _baseUrl + "mypage/delBrndWishLstAjax.do"
                  , param
                  , common.wish.delBrndWishLstAjaxCallback
            );
        },
        
        delAllWishLst : function(param){
            common.Ajax.sendRequest(
                    "POST"
                  , _baseUrl + "mypage/delWishLstAjax.do"
                  , param
                  , common.wish.delWishLstAjaxCallback
            );
        },
        
        setBrandZzimOn : function(type){
            if(type=='on'){
                $('#brandOn').fadeIn(500);
                // $('.com.zzimOn.brand').fadeIn(500);
            }else{
                $('#brandOff').fadeIn(500);
                // $('.layerAlim.zzimOff.brand').fadeIn(500);
            }
            setTimeout(function(){
                 $(".laytoast").fadeOut(800);
            }, 1200);
        },
        
        setZzimOn : function(type){
            if(type=='on'){
                $('.layerAlim.zzimOn.wishPrd').fadeIn(500);
            }else{
                $('.layerAlim.zzimOff.wishPrd').fadeIn(500);
            }
            setTimeout(function(){
                 $(".layerAlim").fadeOut(800);
            }, 1200);
        },
        sendBrdLikeRecobell : function(brand_id) {
    	    var src = (('https:'==document.location.protocol)?'https':'http')+'://logger.ai.oliveyoung.co.kr/js/logger.min.js';
    	    var scriptLen = $("script").filter("[src='"+src+"']").length;
    	    
    	    if(scriptLen == 0) {
    	    	(function(s,x){s=document.createElement('script');s.type='text/javascript';
    		    s.async=true;s.defer=true;s.src=(('https:'==document.location.protocol)?'https':'http')+
    		    '://logger.ai.oliveyoung.co.kr/js/logger.min.js';
    		    x=document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);})();
    	    }
    	    
    	    eglc.op('setVar', 'cuid', recoCuid);
    	    eglc.op('setVar', 'brandId', brand_id);
    	    eglc.op('setVar', 'userId', hashedRecoSsoMbrNo);
    	    eglc.op('track', 'like');
        }
};

$.namespace("common.coupon");
common.coupon = {
        /**
         ***** 쿠폰 등록 레이어 팝업 *****
         *
         * 팝업 호출 및 쿠폰 등록
         *
         * getRegCouponForm : arg = true 이면 화면 갱신
         *                    arg     없으면 화면 갱신하지 않음
         **/
        reload : false
        ,
        getRegCouponForm : function(reload){
            if(typeof reload != "undefined"){
                if(reload){
                    common.coupon.reload = true;
                }
            }else{
                common.coupon.reload = false;
            }
            common.Ajax.sendRequest("POST"
                , _baseUrl + "common/popup/getRegCouponFormPop.do"
                , null
                , function(res) {
                    $("#layer_pop_wrap").html(res);
                    fnLayerSet('layer_pop_wrap', 'open');
                    // 쿠폰 안내 레이어 팝업 close
                    $(".layer_close").on("click", function(e){
                        fnLayerSet('layer_pop_wrap', 'close');
                    });
                }
            );
        },
        regCouponAjax : function(){
            if(!common.isLogin() && confirm("로그인 후 신청하실 수 있습니다.\r\n로그인 페이지로 이동하시겠습니까?")){
                common.link.moveLoginPage(null, location.href);
            }else{
                var rndmVal = $("#rndmVal").val();
    
                if(rndmVal.length <= 0){
                    alert("쿠폰번호를 입력해주세요.");
                    return false;
                }
                common.Ajax.sendRequest("POST"
                    , _baseUrl + "common/regCouponJson.do"
                    , { rndmVal : rndmVal}
                    , common.coupon.regCouponAjaxCallback
                );
            }
        },
        regCouponAjaxCallback : function(res){
            if(typeof res != "undefined"){
                if(res == '000'){
                    if(common.coupon.reload){
                        alert("쿠폰이 등록되었습니다. 등록된 쿠폰은 'MY>쿠폰'에서 확인 가능합니다.");
                        document.location.reload();
                    }else{
                        alert("쿠폰이 등록되었습니다. 등록된 쿠폰은 'MY>쿠폰'에서 확인 가능합니다.");
                        //팝업 닫기
                        fnLayerSet('layer_pop_wrap', 'close');
                    }
                }else{
                    alert(res);
                }
            }
        }
};

/*--------------------------------------------------------------------------------*\
* Q&A 등록 레이어 팝업
\*--------------------------------------------------------------------------------*/
$.namespace("common.qna");
common.qna = {
        /**
         ***** QNA 등록 레이어 팝업 *****
         **/

        openQnaRegPop : function(goodsNo, gdasSeq, retUrl){

            var param = {
                    goodsNo : goodsNo,
                    gdasSeq : gdasSeq,
                    retUrl : retUrl
            }

            common.Ajax.sendRequest("POST"
                    , _baseUrl + "mypage/getGoodsQnaFormAjax.do"
                    , param
                    , common.qna._callBackRegQnaForm
            );

        },

        _callBackRegQnaForm : function(res){
            fnLayerSet('pop_cont', 'open');
            $("#pop_cont").css("top", common.getNowScroll().Y + 400);
            $("#pop_cont").html(res);
        }
}

/*--------------------------------------------------------------------------------*\
* 상품평 등록 레이어 팝업
\*--------------------------------------------------------------------------------*/
$.namespace("common.gdas");
common.gdas = {
        /**
         ***** 상품평 등록 레이어 팝업 *****
         **/
        refNm : "",
        
        // 2019.10.18 오프라인 리뷰 관련 추가 - 오프라인 구매관련 데이터 추가 : offLineOrderData
        openGdasRegPop : function(refNm, goodsNo, gdasSeq, ordNo, itemNo, itemNm, lgcGoodsNo, ordGoodsSeq, evtNo, gdasTpCd, gdasSctCd, thnlPathNm, writeYn, retUrl, offLineOrderData, purMbrYn, used1mmGdasYn, renewUsed1mmGdasYn, orgGdasSeq){
            common.gdas.refNm = refNm;
            
            var param ={
                    goodsNo : goodsNo,
                    gdasSeq : gdasSeq,
                    ordNo : ordNo,
                    itemNo : itemNo,
                    itemNm : itemNm,
                    lgcGoodsNo: lgcGoodsNo,
                    ordGoodsSeq: ordGoodsSeq,
                    evtNo : evtNo,
                    gdasTpCd : gdasTpCd,
                    gdasSctCd : gdasSctCd,
                    thnlPathNm : thnlPathNm,
                    writeYn : writeYn,
                    retUrl : retUrl,
                    purMbrYn : purMbrYn,
                    used1mmGdasYn : used1mmGdasYn,
                    renewUsed1mmGdasYn : renewUsed1mmGdasYn,
                    orgGdasSeq : orgGdasSeq
            }
            
            // 오프라인리뷰일 경우 데이터 추가
            if(gdasSctCd == '60') {
                $.extend(param, offLineOrderData);
            }

            // 리뷰 작성 팝업 호출시 현재 스크롤 위치 저장 - 작성 후에 스크롤 위치를 기억하기 위함.
            sessionStorage.setItem("gdasPopScrollY", window.scrollY);

            common.Ajax.sendRequest("POST"
                    , _baseUrl + "mypage/getGdasFormAjax.do"
                    , param
                    , common.gdas._callBackGdasRegForm
            );

        },
       /* openGdasRegPop : function(refNm, goodsNo, gdasSeq, ordNo, evtNo, gdasTpCd, gdasSctCd, writeYn, retUrl){
            common.gdas.refNm = refNm;

            var param ={
                    goodsNo : goodsNo,
                    gdasSeq : gdasSeq,
                    ordNo : ordNo,
                    evtNo : evtNo,
                    gdasTpCd : gdasTpCd,
                    gdasSctCd : gdasSctCd,
                    writeYn : writeYn,
                    retUrl : retUrl
            }

            common.Ajax.sendRequest("POST"
                    , _baseUrl + "mypage/getGdasFormAjax.do"
                    , param
                    , common.gdas._callBackGdasRegForm
            );

        },*/

        _callBackGdasRegForm : function(res){
            fnLayerSet('pop_cont', 'open');
            
            // Mantis 0001199: 프리미엄 상품평 이미지 용량 초과 얼럿 닫은 후 이미지 찾아보기 버튼 노출 오류
            // IE에서 common.getNowScroll().Y를 undefined로 인식하여 레이어 Top Margin 계산 오류 발생으로 인하여 분기
            if(common.getNowScroll().Y == undefined) {
                $("#pop_cont").css("top", 0 + 300);
            } else {
                $("#pop_cont").css("top", common.getNowScroll().Y + 300);
            }
            
            $("#pop_cont").html(res);
        },

        /** 상품평 삭제 전 처리 **/
     // 오프라인리뷰관련추가
        moveGoodsGdasDel : function(gdasSeq, goodsNo, lgcGoodsNo, pntPayYn, retUrl, gdasSctCd){

            var loginCheck = common.loginChk();
            //*탑리뷰어_lsy 상품평->리뷰**/
            var deleteMessage = '작성하신 리뷰를 삭제하시겠습니까?';

            if(!loginCheck) return;

            if(!confirm(deleteMessage)) return;

            common.gdas.delGdasProceess(gdasSeq, goodsNo,lgcGoodsNo, retUrl, gdasSctCd);
        },

        /** 상품평 삭제 처리 **/
     // 오프라인리뷰관련추가
        delGdasProceess : function(gdasSeq, goodsNo, lgcGoodsNo, retUrl, gdasSctCd){
        	
            var data = {gdasSeq : gdasSeq, goodsNo : goodsNo, retUrl: retUrl, gdasSctCd : gdasSctCd, lgcGoodsNo : lgcGoodsNo};
            
            //jsTemplet
            common.Ajax.sendJSONRequest("POST"
                , _baseUrl + "mypage/delGdasJson.do?gdasSeq="+gdasSeq
                , data
                , common.gdas.afterDelGoodsGdasSuccess
            );
        },

        /** 상품평 삭제 후 처리 **/
        afterDelGoodsGdasSuccess : function(data){

            if(data.resultCd == "000"){
            	// 오프라인리뷰관련추가
            	sessionStorage.removeItem("gdasPossibleTotCnt");
            	 alert("삭제 완료");
            	 //탑리뷰어_ lsy
//                alert("성공적으로 삭제하였습니다.");
            	 
                if ( data.retUrl == ""){ // return할 url이 없는 경우
                    location.href = _baseUrl + '/index.do';
                }else{
                    // location.href = _baseUrl + 'mypage/getGdasList.do';
                    // 작성했던 url로 보내기 위함.
                    location.href = data.retUrl;
                }
            }else{
                alert("삭제가 실패하였습니다.");
            }
        }
}

$.namespace("common.zipcode.pop");
common.zipcode.pop = {
        daumApiYn : 'Y', //DAUM 주소팝업 사용여부 Y:사용, Y가 아닌경우 구 주소팝업 호출
        
        fnCallback : '',

        defaultId : "search-zipcode-pop",
        
        init : function(popCallback, id){
            common.zipcode.pop.fnCallback = popCallback;

            if(arguments.length == 1 || !id){
                id = common.zipcode.pop.defaultId;
            }
            
            
            if(common.zipcode.pop.daumApiYn == 'Y'){
                $('#'+id).click(function(){
                    
                    $('#layer_pop_wrap').html('');
                    
                    $('#layer_pop_wrap').load(_baseUrl + 'common/popup/searchZipcodePopApi.do', function(){
                        
                        fnLayerSet('layer_pop_wrap','open');
                        
                        common.popup.zipcodeApi.init(common.zipcode.pop.fnCallback);
                    });
                });
            } else {
                $('#'+id).click(function(){
                    
                    $('#layer_pop_wrap').html('');
                    
                    $('#layer_pop_wrap').load(_baseUrl + 'common/popup/searchZipcodePop.do', function(){
                        
                        fnLayerSet('layer_pop_wrap','open');
                        
                        common.popup.zipcode.init(common.zipcode.pop.fnCallback);
                    });
                });
            }
            
        }
};

/*--------------------------------------------------------------------------------*\
* 당일배송용 우편번호 조회
\*--------------------------------------------------------------------------------*/
$.namespace("common.zipcodequick.pop");
common.zipcodequick.pop = {
        fnCallback : '',

        excute : false,
        
        defaultId : "search-zipcode-pop",
        
        init : function(popCallback, id){
            common.zipcodequick.pop.fnCallback = popCallback;
            common.zipcodequick.pop.quickYn = 'Y'; //당인배송에서 호출하는 경우 추가

            if(arguments.length == 1 || !id){
                id = common.zipcodequick.pop.defaultId;
            }
            
            if(common.zipcode.pop.daumApiYn == 'Y'){
                $('#'+id).click(function(){
                    
                    $('#layer_pop_wrap').html('');
                    
                    $('#layer_pop_wrap').load(_baseUrl + 'common/popup/searchZipcodePopApi.do', function(){
                        
                        $('.dimm').css({"zIndex":992});
                        fnLayerSet('layer_pop_wrap','open');
                        
                        common.popup.zipcodeApi.init(common.zipcodequick.pop.fnCallback);
                    });
                });
            } else {
                $('#'+id).click(function(){
                    
                    $('#layer_pop_wrap').html('');
                    
                    $('#layer_pop_wrap').load(_baseUrl + 'common/popup/searchZipcodePop.do', function(){
                        
                        $('.dimm').css({"zIndex":992});
                        fnLayerSet('layer_pop_wrap','open');
                        
                        common.popup.zipcode.init(common.zipcodequick.pop.fnCallback);
                    });
                });
            }
        },
        
        // 오늘드림 고도화 2019-12-19 추가
        /** 배송지 수정 폼 **/
        deliveryModifyFormOnlyRegist : function(dlvpSeq){
            var url = _baseUrl + "goods/getDeliveryRegistFormOnlyRegistAjax.do";
            var data ={mbrDlvpSeq : dlvpSeq};
            common.Ajax.sendRequest("POST",url,data,common.zipcodequick.pop._callBackDeliveryRegistFormOnlyRegist);
        },
        
        // 오늘드림 고도화 2019-12-19        
        /** 배송지 수정 폼 **/
        deliveryModifyCartForm : function(dlvpSeq){
            var url = _baseUrl + "cart/getDeliveryRegistFormCartAjax.do";
            var data ={mbrDlvpSeq : dlvpSeq};
            common.Ajax.sendRequest("POST",url,data,common.zipcodequick.pop._callBackDeliveryRegistForm);
        },
        
        /** 배송지 등록 폼 **/
        deliveryRegistForm : function(){
            var url = _baseUrl + "goods/getDeliveryRegistFormAjax.do";
            var data ={};
            common.Ajax.sendRequest("POST",url,data,common.zipcodequick.pop._callBackDeliveryRegistForm);
        },
        
        // 2019-11-14
        /** 배송지 등록 폼 (기존 배송지 선택 팝업로직과 다름, 배송지 추가하는 부분만 다룬다.) **/
        deliveryRegistFormOnlyRegist : function(){
            var url = _baseUrl + "goods/getDeliveryRegistFormOnlyRegistAjax.do";
            var data ={};
            common.Ajax.sendRequest("POST",url,data,common.zipcodequick.pop._callBackDeliveryRegistFormOnlyRegist);
        },
        
        /** 배송지 등록 폼 **/
        deliveryRegistCartForm : function(){
            var url = _baseUrl + "cart/getDeliveryRegistFormCartAjax.do";
            var data ={};
            common.Ajax.sendRequest("POST",url,data,common.zipcodequick.pop._callBackDeliveryRegistForm);
        },        
        
        /** 배송지 등록  **/
        deliveryRegistCart : function(){
            if(!common.loginChk()) return;
            
            if(common.zipcodequick.pop.excute){
                alert('처리중입니다. 잠시만 기다려주세요.');
                return;
            }
            common.zipcodequick.pop.excute = true;
            
            if(!mypage.deliveryForm.validator()){
                common.zipcodequick.pop.excute = false;
                return;
            } 
            common.zipcodequick.pop.checkDlvpTotalCount();
            
        },
        
        doRegistDelivery : function(){
            common.zipcodequick.pop.setBaseDlvpYn();
            
            var values = $('#delivery-form').serializeObject();
            
            _ajax.sendJSONRequest('POST'
                    , _baseUrl + 'mypage/registDelivery.do'
                    , values
                    , common.zipcodequick.pop.registDeliveryCartJSONCallback
                    , false
            );
        },
        
        checkDlvpTotalCount : function(){
            _ajax.sendJSONRequest('GET'
                    ,_baseUrl + 'mypage/getDlvpTotalCountJSON.do'
                    ,{}
                    ,common.zipcodequick.pop.checkDlvpTotalCountCallBack
                    ,false
            );  
        },
        
        checkDlvpTotalCountCallBack : function(res){
            var data = (typeof res !== 'object') ? $.parseJSON(res) : res;
            
            if(Number(data) >= 20){
                alert(MESSAGE.DLVP_COUNT_MAX);
                mypage.deliveryForm.excute = false;
                return;
            }
            
            common.zipcodequick.pop.doRegistDelivery();
        },
        
        setBaseDlvpYn : function(){
            var baseDlvpYn = $('#base-dlvp-yn-check').is(':checked') ? 'Y' : 'N';
            
            $('#base-dlvp-yn').val(baseDlvpYn);
        },
        
        /** 배송지 등록  닫기 **/
        deliveryRegistFormClose : function(){
            fnLayerSet("todayRegDelivery", "close");
            $('.dimm').remove();
            common.zipcodequick.pop.quickYn = ''; 
            
            goods.detail.todayDelivery.todayDeliveryList();
        },
        
        // 오늘드림 고도화 2019-11-14 추가
        /** 배송지 등록  닫기 (기존 배송지 팝업 로직X, 팝업 닫힘.) **/
        deliveryRegistFormCloseOnlyRegist : function(){
            fnLayerSet("todayRegDelivery", "close");
            $('.dimm').remove();
            common.zipcodequick.pop.quickYn = ''; 
            
            /*goods.detail.todayDelivery.todayDeliveryList();*/
        },
        
        /** 배송지 등록  후 닫기 **/
        deliveryRegistFormAfterClose : function(){
            fnLayerSet("todayRegDelivery", "close");
            $('.dimm').remove();
            common.zipcodequick.pop.quickYn = '';
            
            // 2020.12.09 상품값이 있을 경우에만 조회하도록 한다. (crt.허민)
            if(typeof goods != 'undefined') {
            	goods.detail.todayDelivery.registTodayDeliverySelect();
            }
        },
        
        
        // 오늘드림 고도화 2019-11-14 추가
        /** 배송지 등록  후 닫기  (기존 배송지 팝업 로직X, 등록 후 팝업 닫힘.) **/
        deliveryRegistFormAfterCloseOnlyRegist : function(){
            fnLayerSet("todayRegDelivery", "close");
            $('.dimm').remove();
            common.zipcodequick.pop.quickYn = ''; 
            
            /*goods.detail.todayDelivery.todayDeliveryListOnPage();*/
            
            // 2020.12.09 상품값이 있을 경우에만 조회하도록 한다. (crt.허민)
            if(typeof goods != 'undefined') {
            	goods.detail.todayDelivery.registTodayDeliverySelect2();
            }
        },
        
        /** 배송지 등록  닫기 **/
        deliveryRegistFormCartSaveClose : function(){
            fnLayerSet("todayRegDelivery", "close");
            $('.dimm').remove();
            common.zipcodequick.pop.quickYn = ''; 
            
            window.location.reload();
        },
        
        /** 배송지 등록  닫기 **/
        deliveryRegistFormCartClose : function(){
            fnLayerSet("todayRegDelivery", "close");
            $('.dimm').remove();
            common.zipcodequick.pop.quickYn = ''; 
        },
        
        registDeliveryJSONCallback : function(res){
            var data = (typeof res !== 'object') ? $.parseJSON(res) : res;
            
            data.succeeded && alert(data.message);
            
            common.zipcodequick.pop.deliveryRegistFormClose();
            
        },
        
        registDeliveryCartJSONCallback : function(res){
            var data = (typeof res !== 'object') ? $.parseJSON(res) : res;
            data.succeeded && alert(data.message);
            
            common.zipcodequick.pop.deliveryRegistFormCartSaveClose();
            
        },
        
        /** 배송지 등록 폼 콜백 **/
        _callBackDeliveryRegistForm : function(res){
            var cDiv = $(res.trim());
            $("#todayRegDelivery").html(cDiv);
            $('#rmitCellSctNo').css({'width':'90px'});
            $('#rmitTelRgnNo').css({'width':'90px'});
            fnLayerSet("todayRegDelivery", "open");
            common.zipcodequick.pop.init(mypage.deliveryForm.selectedZipcodeCallback);
        },
        
        // 오늘드림 고도화 2019-11-14 추가
        /** 배송지 등록 폼 콜백 **/
        _callBackDeliveryRegistFormOnlyRegist : function(res){
            var cDiv = $(res.trim());
            $("#todayRegDelivery").html(cDiv);
            $('#rmitCellSctNo').css({'width':'90px'});
            $('#rmitTelRgnNo').css({'width':'90px'});
            fnLayerSet("todayRegDelivery", "open");
            common.zipcodequick.pop.init(mypage.deliveryForm.selectedZipcodeCallback);
        }
};

$.namespace("common.bann");
common.bann = {
        
        init : function(){
            
            if (common.bann.isOpenCommFloatBann()) {
                $(".main_moving_banner").show();
                $('.main_moving_banner').css("z-index", "99");
            }
            
            banner_pos = parseInt($('.main_moving_banner').css('top'), 10);
            cur_pos = banner_pos;
            
            this.addEvent();
        },
        
        addEvent : function(){
            setInterval(function(){
                if(cur_pos >= banner_pos) cur_pos = banner_pos - 5;
                else cur_pos = banner_pos + 5;
        
                $('.main_moving_banner').animate({'top': cur_pos +'px'}, 500);
            }, 500);
            
            $('.moving_banner_close').click(function(e){
                common.bann.setPopInfo("commonFloatBann", $(".main_moving_banner a img").attr("data-ref-compareKey"));
                $('.main_moving_banner').remove();
                
            });
        },
        
        isOpenCommFloatBann : function() {
            var bannInfo = common.bann.getPopInfo("commonFloatBann");
            if (bannInfo == null) {
                return true;
            }
            //이미지 정보가 다를 경우
            if (bannInfo.compareKey != $(".main_moving_banner a img").attr("data-ref-compareKey")) {
                return true;
            }
            //1일 경과 후
            if (new Date() - bannInfo.regDtime >= (1000 * 60 * 60 * 24)) {
                return true;
            }
            
            return false;
        },
        
        getPopInfo : function(popType) {
            var cookie = new Cookie('local', 1, 'D');

            if ( cookie.get('popBannHistory') != undefined && cookie.get('popBannHistory') != "" ) {
                var popBannHistoryStr = cookie.get('popBannHistory');
                var jsonStr =  JSON.parse(popBannHistoryStr);
                
                for(var i=0; i <jsonStr.length; i++) {
                    if (jsonStr[i].popType == popType) {
                        return jsonStr[i];
                    }
                }
            }
            return null;
        },
        
        setPopInfo : function(popType, compareKey) {
            var cookie = new Cookie('local', 1, 'D');

            var bannArr = new Array();

            if ( cookie.get('popBannHistory') != undefined && cookie.get('popBannHistory') != "" ) {
                var popBannHistoryStr = cookie.get('popBannHistory');
                
                //신규
                if (popBannHistoryStr == "") {
                    var bannInfo = new Object();
                    
                    bannInfo.popType = popType;
                    bannInfo.compareKey = compareKey;
                    bannInfo.regDtime = new Date();
                       
                    bannArr.push(bannInfo);
                    
                } else {
                    var jsonStr =  JSON.parse(popBannHistoryStr);
                    
                    var hasInfo = false;
                    
                    for(var i=0; i <jsonStr.length; i++) {
                        if (jsonStr[i].popType == popType) {
                            jsonStr[i].compareKey = compareKey;
                            jsonStr[i].regDtime = new Date();
                            hasInfo = true;
                        }
                        
                        bannArr.push(jsonStr[i]);
                    }
                    
                    if (!hasInfo) {
                        var bannInfo = new Object();
                        
                        bannInfo.popType = popType;
                        bannInfo.compareKey = compareKey;
                        bannInfo.regDtime = new Date();
                           
                        bannArr.push(bannInfo);
                        
                    }
                }

            } else {
                var bannInfo = new Object();
                
                bannInfo.popType = popType;
                bannInfo.compareKey = compareKey;
                bannInfo.regDtime = new Date();
                   
                bannArr.push(bannInfo);
            }
            cookie.set('popBannHistory', JSON.stringify(bannArr)); 
        }      
};


$.namespace("common.header");
common.header = {
    
	suddenClickFlag : "N",
		
    init : function(){
      //장바구니 갯수 갱신
        common.cart.updHeaderCartCnt();
        
        console.log("_stonUseYnReqHeader = " + _stonUseYnReqHeader);
        
        try{
        	if(_stonUseYnReqHeader == "Y"){
        		common.cart.updStonArea();
        	}
        }catch(e){}// footer 로그인노출영역 체크, for ston
        
        var scpClickFlag = "N";
        
        $("#query").bind("keyup", function(){
            if($("#query").val().length>0){
               $(".scp_cont").css("display", 'none');
            }else{
               $(".scp_cont").css("display", 'block');
            }
        });
        
        $(".inp_placeholder").bind("click", function(){
            if(scpClickFlag=="N"){
                common.header.getScpGoodsListAjax();
                common.header.callSuddenKeyWord();
                getMyKeyword();
                scpClickFlag="Y";
            }
        });

        // 이벤트 기간 만료로 인한 주석 처리
		var topBanInfo = common.bann.getPopInfo("awardsTopBanner");
        var dt = new Date();
        var m_dt = dt.getFullYear() +(dt.getMonth()+1).lpad(2,'0') + dt.getDate().lpad(2,'0');
        var period_flag1 = ("20221125" <= m_dt && 10 <= dt.getHours()) && m_dt <= "20221127";
        var period_flag2 = "20221208" <= m_dt && m_dt <= "20221230";

		if(period_flag1 || period_flag2){
            var imgName = period_flag1 ? 'banner_awards_2022_ver1' : 'banner_awards_2022_ver2';

            $("#top_banner_image").append(
                `<img src="/pc-static-root/image/awards/${imgName}.jpg" alt="">`
            );

			if (topBanInfo !== null) {
		         if (new Date() - new Date(topBanInfo.regDtime) >= (1000 * 60 * 60 * 24)) {
		      	    $('.banUpperBox').show();
		         } else {
                     $('.banUpperBox').hide();
                 }
		     }else {
                $('.banUpperBox').show();
		     }
		}
    },
    
    callSuddenKeyWord : function(){
    	$("#searchPop").click(function(){
    		if (common.header.suddenClickFlag == "N") {
    			MainSuddenKeyword('keyword_main');
    			common.header.suddenClickFlag = "Y";
    		}    
    	});    	
    },
    
    moveGoodsdetail: function(goodsNo, idxNo, trackingCd){
        //var goodsNo = $(this).find("input[name*='goodsNo']").val();
        //var idxNo = $(this).find("input[name*='idxNo']").val();
        common.wlog("search_scp_idx_"+idxNo);
        common.link.moveGoodsDetail(goodsNo, null, trackingCd);
    },
    getScpGoodsListAjax: function(){
        var url= _baseUrl + "common/getScpGoodsListAjax.do";
        var loginResult = false;

        $.ajax({
            type: "POST",
            url: url,
            data: null,
            async: false,
            cache: false,
            success: function(data) {
                common.header.getScpGoodsListAjaxCallBack(data);
            },
            error : function() {
                
            }
        });
        
        //common.Ajax.sendRequest("POST",url,data,common._callBackAlearStockForm);
    },
    getScpGoodsListAjaxCallBack: function(data){
        $("#scp_cont_id").html(data);
      //SCP
        //랜덤 숫자 가져오는 함수
        var fnRandomNum = function(max){            //랜덤 숫자 가져오는 함수(0~max사이의 값)
            return Math.floor(Math.random() * max);
        }
        
        //이벤트 페이드효과 True & 자동플레이 False & 랜덤 False & 도트 True
        var eventSlider_len = $('.FadeDot').children('div').length;      //배너 slide 갯수
        $('.FadeDot').on('init', function(){
            if(eventSlider_len == 1){
                //$(this).append('<button class="slick-arrow slick-prev">이전배너</button><button class="slick-arrow slick-next">다음배너</button>');
                $(this).append('<ul class="slick-dots"><li class="slick-active"></li></ul>');
            }
        }).slick({
            dots: true,
            arrows: true,
            infinite: false,
            fade: true,
            autoplay: false,
            autoplaySpeed: 4000
        }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
            //$(this).find('.slick-paging > .cur_no').text(nextSlide + 1);
        });
        
        $("#query").bind("keyup", function(){
            if($("#query").val().length>0){
               $(".scp_cont").css("display", 'none');
            }else{
               $(".scp_cont").css("display", 'block');
            }
        });
 
    },
    moveGoodsdetail: function(goodsNo, idxNo, trackingCd){
        //var goodsNo = $(this).find("input[name*='goodsNo']").val();
        //var idxNo = $(this).find("input[name*='idxNo']").val();
        common.wlog("search_scp_idx_"+idxNo);
        common.link.moveGoodsDetail(goodsNo, null, trackingCd);
    }
        
};


/*
 * 행사사은품선택팝업띄우기
 */
$.namespace('common.popLayer.promGift');
common.popLayer.promGift = {
        jsonParam : false,
        
        openPromGiftPop : function(vGoodsNo,vItemNo,vPromNo) {
            var url = _baseUrl + "cart/promGiftPopAjax.do";
            
            var callback = function(res) {
                fnLayerSet('cart_layer_pop_wrap','open');
                $("#cart_layer_pop_wrap").html(res);
                common.setLazyLoad('seq');
                $('#cart_layer_pop_wrap').css('top','15%');
                $('#cart_layer_pop_wrap').css('margin-left','-275px');
                $('#cart_layer_pop_wrap').css('margin-top',$(document).scrollTop());
                
                //GET레이어의 상품 수가  1인경우 자동실행
                if($('li[name=selPopInfo]').length == 1){
                    var stockQty = parseInt( $('li[name=selPopInfo]').eq(0).attr('stockQty') );
                    
                    if(stockQty > 0){
                        var setItemCnt = 0;
                        if(stockQty > getItemCnt) 
                            setItemCnt = getItemCnt;
                        else
                            setItemCnt = stockQty;
                        
                        $('li[name=selPopInfo]').eq(0).find('input[name=promGiftAmount]').val(setItemCnt);
                        $('li[name=selPopInfo]').eq(0).attr("class","on");
                        
                        // 기 선택한 추가상품 수량
                        $("p.layer_desc2 span.tx:eq(1) i").text(setItemCnt);
                    }
                } else {
                    //buy상품군의 수량정보를 가져와 품절체크추가
                    //레이어창의 상품군
                    var totalCnt = 0;
                    $('li[name=selPopInfo]').each(function(){
                        var layerPopObj = $(this);
                        
                        $("div.prd_cnt_box").each(function(){
                            var buyObj = $(this);
                            var buyGoodsNo = buyObj.find("input[name=sGoodsNo]").val();
                            var buyItemNo = buyObj.find("input[name=itemNo]").val();
                            
                            buyGoodsNo = (buyGoodsNo == undefined) ? $("#goodsNo").val() : buyGoodsNo;
                            buyItemNo = (buyItemNo == undefined) ? $("#itemNo").val() : buyItemNo;
                            
                            //buy상품군의 상품정보와 레이어창의 상품정보가 같으면
                            if(layerPopObj.attr('goodsNo') == buyGoodsNo && layerPopObj.attr('itemNo') == buyItemNo){
                                var buyGoodsCnt = parseInt(buyObj.find('input[type=text].tx_num').val());
                                var getGoodsCnt = parseInt(layerPopObj.attr('stockQty'));
                                
                                // 상품상세에서 오늘드림 여부가 선택된 경우 오늘드림 재고를 보고 판단해야함 jwkim
                                if($("#deliveDay").prop("checked")==true){
                                    getGoodsCnt = $("#quickItemInv_"+(buyGoodsNo+buyItemNo)).val();
                                }
                                
                                //buy상품군의 수량이 실재고 수량보다 크거나 같으면
                                if(buyGoodsCnt >= getGoodsCnt){
                                    //조건만족시 수량0으로 셋팅하고 품절처리
                                    layerPopObj.find('input[name=promGiftAmount]').val(0);
                                    layerPopObj.find('p.img').append("<span class='soldout'>일시품절</span>");
                                    layerPopObj.find('input[name=promGiftAmount]').attr('disabled','disabled');
                                    layerPopObj.find('input[name=promGiftAmount]').siblings().attr('disabled','disabled');
                                    layerPopObj.removeClass("on");
                                } else {
                                    layerPopObj.attr('stockQty', getGoodsCnt - buyGoodsCnt);
                                }
                            }
                        });
                        
                        totalCnt += parseInt( layerPopObj.find("input[name=promGiftAmount]").val() );
                    });
                    
                    // 현재 선택된 수량 갱신
                    $("p.layer_desc2 span.tx:eq(1) i").text(totalCnt);      // 기 선택한 추가상품 수량
                    
                    // 일시품절 상품 하단 정렬 시작
                    var getItemList = [];
                    var getItemSoldOutList = [];

                    $("ul.evt_prd_list li[name=selPopInfo]").each(function(){
                        if($(this).find("p.img span").hasClass("soldout")){
                            getItemSoldOutList.push($(this));
                        } else {
                            getItemList.push($(this));
                        }
                    });

                    $("ul.evt_prd_list").html();

                    $(getItemList).each(function(){
                        $("ul.evt_prd_list").append($(this));
                    });

                    $(getItemSoldOutList).each(function(){
                        $("ul.evt_prd_list").append($(this));
                    });
                    // 일시품절 상품 하단 정렬 끝
                }
            };
            
            var isValid = this.validation(vGoodsNo,vItemNo,vPromNo);
            
            if (isValid) {
                _ajax.sendRequest("GET", url, this.jsonParam, callback);
            }
        },
        /**
         *   파라메터의 validation 처리
         */
        validation : function(vGoodsNo,vItemNo,vPromNo) {
            var isValid = true;
            if(vGoodsNo == null || vGoodsNo == '' || vItemNo == null || vItemNo == '' || vPromNo == null || vPromNo == '') {
                var msg = "죄송합니다. 고객센터(1522-0882)로 문의해 주세요.";

                this.jsonParam = false;
                isValid = false;
                return isValid;
            }
            
            var buyItemCnt = 0;
            $("div.prd_cnt_box[promNo=" + vPromNo + "]").each(function(){
                buyItemCnt += parseInt( $(this).find("input.tx_num").val() );
            });
            
            var buyCondStrtQtyAmt = parseInt( $("div.prd_gift_box.item_" + vGoodsNo + vItemNo).attr("buyCondStrtQtyAmt") );
            var getItemCnt = parseInt( buyItemCnt / buyCondStrtQtyAmt );
            
            var quickYn = $(":input:radio[name=qDelive]:checked").val();
            var qDeliveYn = $(":input:checkbox[name=qDelive]:checked").val();

            if(typeof(quickYn) == "undefined"){
            	quickYn = $("#quickYn").val();
            }
            
            if(typeof(qDeliveYn) == "undefined") {
            	qDeliveYn = "N";
            }

            if(isValid) {
                this.jsonParam =   {
                        "goodsNo" : vGoodsNo,
                        "itemNo" : vItemNo,
                        "promNo" : vPromNo,
                        "buyItemCnt" : buyItemCnt,
                        "getItemCnt" : getItemCnt,
                        "quickYn" : quickYn,
                        "qDeliveYn" : qDeliveYn
                    };
            }
            return isValid;
        },
        /**
         * 추가상품의 수량 조절
         */
        calcQty : function(optionKey, operator) {
            var oldVal = parseInt( $("input[name=promGiftAmount]#cartCnt_" + optionKey).val() );
            $("input[name=promGiftAmount]#cartCnt_" + optionKey).data('old', oldVal);
            
            if(operator == "plus"){
                if(oldVal >= getItemCnt){
                    alert('선택하실 수 있는 추가 상품은 최대 '+getItemCnt+'개 입니다.');
                    return false;
                }
                
                $("input[name=promGiftAmount]#cartCnt_" + optionKey).val(++oldVal).trigger("focusout");
            } else if(operator == "minus"){
                if(oldVal <= 0)
                    return false;
                
                $("input[name=promGiftAmount]#cartCnt_" + optionKey).val(--oldVal).trigger("focusout");
            } else {
                return false;
            }
        }
};

/*
 * 3440969_PM작업시 오늘드림 레이어 팝업 노출 요청 건
 * 모듈화 작업 진행
 * 표현하고자 하는 화면 내에 DIV "todayDeliveryNotice" 선언 필요.
 */
$.namespace('common.popLayer.todayDelivery');
common.popLayer.todayDelivery = {

    // 특정 시간 대 장바구니, 구매하기에 팝업 설정 (하단의 명절 팝업 노출)
    deliveryStopDate : {
        "startYear" : 2022, "startMonth" : 8, "startDate" : 8, "startHours" : 20, "startMinutes" : 0,
        "endYear" : 2022, "endMonth" : 8, "endDate" : 11, "endHours" : 20, "endMinutes" : 0
    },

	openTodayDeliveryNotice : function(str, obj) {//팝업 호출 선행 기능
		
		common.popLayer.todayDelivery.setStrAndObj(str, obj);

        var urlParams = common.cart.urlParams();
        if (!!urlParams.trackingCd) { // trackingCd 저장
            common.cart.trackingInfo.setTrackingCd(urlParams.trackingCd);
        }
		
		//IOS RangeError: Invalid Date toISOString 오류로 예외 처리  
		try {
//	        var inDate = "2021-02-10 20:00:00.000"; //추후 제한 조건을 설정할 부분(날짜)
//	    	var endDate = "2021-02-13 20:00:00.000"; //추후 제한 조건을 설정할 부분(날짜)
//	        var stDateParse = new Date(inDate).toISOString(); //추후 제한 조건을 설정할 부분(날짜)
//	        var endDateParse = new Date(endDate).toISOString(); //추후 제한 조건을 설정할 부분(날짜)
//	        var today = new Date();
//	        var todayParse = new Date(today).toISOString();     

            var deliveryStopDate = common.popLayer.todayDelivery.deliveryStopDate;
            var stDateParse = new Date(deliveryStopDate.startYear, deliveryStopDate.startMonth,
                deliveryStopDate.startDate, deliveryStopDate.startHours, deliveryStopDate.startMinutes); //추후 제한 조건을 설정할 부분(날짜)
            var endDateParse =  new Date(deliveryStopDate.endYear, deliveryStopDate.endMonth,
                deliveryStopDate.endDate, deliveryStopDate.endHours, deliveryStopDate.endMinutes); //추후 제한 조건을 설정할 부분(날짜)
	        var todayParse = new Date();
	        
		} catch(e){
//			console.log("error!!", e);
		}
		
//		console.log("stDateParse", stDateParse);
//		console.log("endDateParse", endDateParse);
//		console.log("todayParse", todayParse);
		
		var quickYn = 'N';
		if(rcvStr == 'goodsdetail.cart' || rcvStr == 'goodsdetail.order'){
			quickYn = sessionStorage.getItem("O2O_CHK");
		}else{
			quickYn = $("#quickYn").val();
		}

    	if(quickYn != 'Y'){//오늘드림이 아닌 경우
    		common.popLayer.todayDelivery.continueAction(); //호출위치에 따른 기능 재게
    	}else{
        	var html = '';
        	
        	// 시스템 점검 시작
//        	html += '	<div class="layer_cont2">';
//        	html += '		<h2 class="layer_title" name="todayD">오늘드림 서비스 안내</h2>';
//        	html += '		<div class="layer_desc3">';
//        	html += '			<ul align="center" class="info_dash_list fwb">';
//        	html += '				<div style="font-size:16px;">시스템 점검으로 인해 오늘드림 서비스 주문이</div>';
//            html += '				<div style="color:red;font-size:16px;">11시 ~ 15시까지 일시적으로 중단됩니다.</div>';
//            html += '           	<p style="color:grey;font-size:14px;">(15시 이후 부터 주문 가능합니다)</p>';
//        	html += '			</ul>';
//        	html += '			<div class="layer_btn_area">';    	
//        	html += '				<button class="btnMedium btnGreenW w120" id="stopTodayFor" onclick="javascript:common.popLayer.todayDelivery.openQuickPopToday();">오늘 하루 안보기</button>';
//        	html += '				<button class="btnMedium fullGreen w120" id="btnConfirmFor" onclick="javascript:common.popLayer.todayDelivery.layerClose();">확인</button>';
//        	html += '			</div>';
//        	html += '		</div>';
//        	html += '		<button class="layer_close type2" id="btnLayerClose" onclick="javascript:common.popLayer.todayDelivery.layerCloseWithoutSend();">창 닫기</button>';
//        	html += '		<button class="layer_close type2" id="btnLayerClose2" onclick="javascript:common.popLayer.todayDelivery.layerCloseWithoutSend();">창 닫기</button>';
//        	html += '		<div class="layer_full_area mgT5">';
//        	html += '			<ul class="info_dash_list">';
//        	html += '				<li>주문 확인 시 재고가 부족한 경우, 부득이하게 주문이 취소될 수 있습니다.</li>';
//        	html += '				<li>배송센터 사정에 따라 부득이하게 주문이 취소될 수 있습니다.</li>';
//        	html += '			</ul>';
//        	html += '		</div>';    	
//        	html += '	</div>';
        	// 시스템 점검 끝
        	
        	// 명절 안내 시작
        	html += '	<div class="layer_cont2">';
        	html += '		<h2 class="layer_title" name="todayD">오늘드림 서비스 안내</h2>';
        	html += '		<div align="center" class="layer_desc3" style="padding-bottom: 0px; ">';
        	html += '			<ul align="center" class="info_dash_list fwb">';
        	html += '				<div style="font-size:16px;">배송업체 휴무로 인해 <span style="color:blue;">9/8 20시~9/11 19시 59분까지</span> </div>';
        	html += '				<div style="font-size:16px;">오늘드림 서비스가 일시 중지됩니다. </div>';
            html += '				<div style="font-size:16px;">* 픽업 주문 포함 </div>';
        	html += '				<div style="font-size:16px;">기존 주문하신 픽업은 매장에서 수령 가능하니,</div>';
        	html += '				<div style="font-size:16px;">방문 전 매장 영업 시간 확인 부탁드립니다.</div>';
//        	html += '				<div style="font-size:16px;">(일부 지역의 경우 주문 불가할 수 있는 점 양해 부탁드립니다) </div>';
        	
        	html += '			</ul>';
        	html += '			<div class="layer_btn_area">';    	
//        	html += '				<button class="btnMedium btnGreenW w120" id="stopTodayFor" onclick="javascript:common.popLayer.todayDelivery.openQuickPopToday();">오늘 하루 안보기</button>';
if(rcvStr == 'goodsdetail.cart'){
    var possibleO2oStore = $('.dt_dlvp').attr('data-strno'); // 오늘드림 가능 여부

    if (possibleO2oStore && possibleO2oStore =='NM' && (todayParse >= stDateParse && todayParse <= endDateParse)) {//게시기간에 해당되는 경우
        html += '				<button class="btnMedium fullGreen w120" id="btnConfirmFor" onclick="javascript:common.popLayer.todayDelivery.layerCloseWithoutSend();">확인</button>';
    }else{
        html += '				<button class="btnMedium fullGreen w120" id="btnConfirmFor" onclick="javascript:common.popLayer.todayDelivery.layerClose();">확인</button>';
    }
}else{        	
        	html += '				<button class="btnMedium fullGreen w120" id="btnConfirmFor" onclick="javascript:common.popLayer.todayDelivery.layerCloseWithoutSend();">확인</button>';
}        	
        	html += '			</div>';
        	html += '		</div>';
            if (rcvStr == 'goodsdetail.cart' && possibleO2oStore && possibleO2oStore !='NM') {
                html += '		<button class="layer_close type2" id="btnLayerClose" onclick="javascript:common.popLayer.todayDelivery.layerClose();">창 닫기</button>';
            } else {
                html += '		<button class="layer_close type2" id="btnLayerClose" onclick="javascript:common.popLayer.todayDelivery.layerCloseWithoutSend();">창 닫기</button>';
            }
        	html += '	</div>';
        	// 명절 안내 끝
        	
        	$("#todayDeliveryNotice").html(''); //팝업 정보 초기화
        	$("#todayDeliveryNotice").html(html); //내용 반영
        	
            if(todayParse >= stDateParse && todayParse <= endDateParse){//게시기간에 해당되는 경우
        		//202109명절 팝업 노출 예외(장바구니 오늘드림 탭 클릭시 as-is : 레이어 노출, to-be : 레이어 미노출) start
        		if(quickYn == 'Y' && rcvStr == 'cart.todayTab'){
        			common.popLayer.todayDelivery.continueAction();
        			return;
        		}
        		//202109명절 팝업 노출 예외(장바구니 오늘드림 탭 클릭시 as-is : 레이어 노출, to-be : 레이어 미노출) end
        		var bannInfo = common.bann.getPopInfo("todayDeliveryNotice"); //팝업 차단 등록 시간 확인
     		    if (bannInfo != null) {
 		    		if (new Date() - bannInfo.regDtime >= (1000 * 60 * 60 * 24)) {
 		                $("#todayDeliveryNotice").css('z-index', '999');
 		                fnLayerSet("todayDeliveryNotice", "open");
 		    		}else{
 		    			$("#quickInfoYn").val("Y");
 		    			common.popLayer.todayDelivery.continueAction(); //호출위치에 따른 기능 재게
 		    			return;
                   }
               } else {
                   $("#todayDeliveryNotice").css('z-index', '999');
                   fnLayerSet("todayDeliveryNotice", "open");
               }
        	}else{
        		common.popLayer.todayDelivery.continueAction(); //호출위치에 따른 기능 재게
        	}
    	}
    },
    
    setStrAndObj : function(str, obj){
    	rcvStr = str;
    	rcvObj = obj;
    },
    
    //3440969_PM작업시 오늘드림 레이어 팝업 노출 요청 건 - 서비스 안내 닫기 후 프로세스 호출 없음(x표 닫기)
    layerCloseWithoutSend : function(){
        
        $(".layer_pop_wrap").hide();
        $('.dimm').remove();
        
    },
    //3440969_PM작업시 오늘드림 레이어 팝업 노출 요청 건 - 서비스 안내 닫기 후 프로세스 호출
    layerClose : function(){
        
//        $(".layer_pop_wrap").hide();
//        $('.dimm').remove();
         fnLayerSet("todayDeliveryNotice", "close");
         common.popLayer.todayDelivery.continueAction(); //호출위치에 따른 기능 재게
        
    },    
    //3440969_PM작업시 오늘드림 레이어 팝업 노출 요청 건 - 하루동안 보지 않기
    openQuickPopToday : function(){

    	common.bann.setPopInfo("todayDeliveryNotice", $("#todayDeliveryNotice").attr("data-ref-compareKey"));
    	$("#quickInfoYn").val("Y");
		
        $(".layer_pop_wrap").hide();
        $('.dimm').remove();
        
        common.popLayer.todayDelivery.continueAction();//호출위치에 따른 기능 재게

    },
    
    //3440969_PM작업시 오늘드림 레이어 팝업 노출 요청 건 - 서비스 안내 닫기 후 프로세스 호출
    layerCloseForNoti : function(){  
        
    	$("#quickInfoYn").val("Y");
    	
        $(".layer_pop_wrap").hide();
        $('.dimm').remove();
        
		forder.orderForm.onClickSubmit();     //주문 결재
        
    },    
    //3440969_PM작업시 오늘드림 레이어 팝업 노출 요청 건 - 하루동안 보지 않기
    openQuickPopTodayForNoti : function(){

    	common.bann.setPopInfo("infoTodayDeliveryOrder", $("#infoTodayDeliveryOrder").attr("data-ref-compareKey"));
    	$("#quickInfoYn").val("Y");
		
        $(".layer_pop_wrap").hide();
        $('.dimm').remove();
        
		forder.orderForm.onClickSubmit();     //주문 결재

    },    
    
    //3440969_PM작업시 오늘드림 레이어 팝업 노출 요청 건 - 팝업 이후에 처리할 프로세스
    continueAction : function(){//
    	if(rcvStr == 'order'){
    		forder.orderForm.onClickSubmit();     //주문 결재
    	}else if(rcvStr == 'cart.orderAll'){
    		mcart.base.http.clickAllOrderBtn();   //장바구니 - 모두 구매
    	}else if(rcvStr == 'cart.orderPart'){
    		mcart.base.http.clickPartOrderBtn();  //장바구니 - 선택구매
    	}else if(rcvStr == 'cart.buyNow'){
    		mcart.base.http.clickBtnBuy(rcvObj);        //장바구니 - 바로구매
    	}else if(rcvStr == 'goodsdetail.cart'){
    		goods.detail.bindBtnBasket();         //상품상세 - 장바구니 담기
    	}else if(rcvStr == 'goodsdetail.order'){
            goods.detail.bindBtnBuy2();           //상품상세 - 바로구매
     	}else if(rcvStr == 'goodsdetail.gift') {
            goods.detail.bindBtnGift();           //상품상세 - 선물하기
        }else if(rcvStr == 'cart.todayTab'){      //장바구니, 오늘드립 탭 클릭
     		mcart.base.quick.clickUlDelivGbLi();
    	}//이외의 정보는 호출 URL이 없으므로, 팝업만 출력하고 끝나게 됨
    }
};
/*--------------------------------------------------------------------------------*\
 * 오특 GNB 개편 공통 script
 \*--------------------------------------------------------------------------------*/
$.namespace("common.gnb.todaySpecial");
common.gnb.todaySpecial = {
    init : function () {

    },

    commonTimer : function() {
        if(!commonTimerInterval) {
            common.gnb.todaySpecial.setCommonTimer();
            commonTimerInterval = setInterval(common.gnb.todaySpecial.setCommonTimer, 1000);
        }
    },

    setCommonTimer : function() {
        var date = new Date();
        var now = date.getTime();
        var tomorrow = date;
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0);

        var distance = tomorrow - now;
        commonTimer = common.gnb.todaySpecial.getTimerInfo(distance);
    },

    getTimerInfo : function(distance) {
        var time = {
            hours : '',
            minutes : '',
            seconds : ''
        }

        time.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        time.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        time.seconds = Math.floor((distance % (1000 * 60)) / 1000);

        return time;
    },

    setTodaySpecialFlag : function(element) {
        common.gnb.todaySpecial.commonTimer();

        var tempLabelText = '';

        tempLabelText = common.gnb.todaySpecial.setFlagGoodsList(element, tempLabelText);
        commonTodaySpecialInterval = setInterval(function() {
            tempLabelText = common.gnb.todaySpecial.setFlagGoodsList(element, tempLabelText);
        }, 1000);
    },

    setFlagGoodsList : function(element, tempLabelText) {
        var nowHours = new Date().getHours();
        var TIMER_CLOSE_HOURS = 18;

        if(nowHours >= TIMER_CLOSE_HOURS) {
            var currentTime = commonTimer.hours + ':' + commonTimer.minutes;

            if(!tempLabelText || String(tempLabelText) !== String(currentTime)) {
                $(element).each(function (i) {
                    $(this).hasClass('today') && $(this).css('display') === 'block' && $(this).hide();
                    $(this).hasClass('time') && $(this).css('display') === 'none' && $(this).show();

                    common.gnb.todaySpecial.setTodaySpecialTimer($(this).find(".nums.h"), commonTimer.hours);
                    common.gnb.todaySpecial.setTodaySpecialTimer($(this).find(".nums.m"), commonTimer.minutes);
                })
            }

            return currentTime;
        } else {
            if(tempLabelText !== '오특') {
                $(element).each(function (i) {
                    $(this).hasClass('today') && $(this).css('display') === 'none' && $(this).show();
                    $(this).hasClass('time') && $(this).css('display') === 'block' && $(this).hide();
                })
            }

            return '오특';
        }
    },

    setTodaySpecialTimer : function (element, time) {
        var t = time < 10 && String(time).length <= 1 ? "0" + time : String(time);

        var t1 = t.slice(0, 1);
        var t2 = t.slice(1, 2);

        element.find(".num").eq(0).attr("data-timer-val", t1).text(t1);
        element.find(".num").eq(1).attr("data-timer-val", t2).text(t2);
    },
};

/*--------------------------------------------------------------------------------*\
* String Object Prototype
\*--------------------------------------------------------------------------------*/
String.prototype.isEmpty = function() {
    return (this == null || this == '' || this == 'undefined' || this == 'null');
};
// alert("isEmpty="+"".isEmpty());


/**
 *
 * 숫자여부 체크 함.
 * 사용 예)
 *
 * "100".isNumber()
 * "-100,000".isNumber(1)
 *
 * @param opt
 *            1 : (Default)모든 10진수
 *            2 : 부호 없음
 *            3 : 부호/자릿수구분(",") 없음
 *            4 : 부호/자릿수구분(",")/소숫점
 *
 * @return true(정상) or false(오류-숫자아님)
 *
 */
String.prototype.isNumber = function(opt) {
    // 좌우 trim(공백제거)을 해준다.
    value = String(this).replace(/^\s+|\s+$/g, "");

    if (typeof opt == "undefined" || opt == "1") {
        // 모든 10진수 (부호 선택, 자릿수구분기호 선택, 소수점 선택)
        var regex = /^[+\-]?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
    } else if (opt == "2") {
        // 부호 미사용, 자릿수구분기호 선택, 소수점 선택
        var regex = /^(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
    } else if (opt == "3") {
        // 부호 미사용, 자릿수구분기호 미사용, 소수점 선택
        var regex = /^[0-9]+(\.[0-9]+)?$/g;
    } else {
        // only 숫자만(부호 미사용, 자릿수구분기호 미사용, 소수점 미사용)
        var regex = /^[0-9]$/g;
    }

    if (regex.test(value)) {
        value = value.replace(/,/g, "");
        return isNaN(value) ? false : true;
    } else {
        return false;
    }
};
//alert("isNumber="+("1-00".isNumber()));


String.prototype.nvl = function(s) {
    return this.isEmpty() ? (s ? s : '') : this+'';
};
String.prototype.startWith = function(str) {
    if (this === str)    return true;

    if (str.length > 0)
        return str === this.substr(0, str.length);
    else
        return false;
};
String.prototype.endWith = function(str) {
    if (this == str)    return true;

    if (String(str).length > 0)
        return str === this.substr(this.length - str.length, str.length);
    else
        return false;
};
String.prototype.bytes = function()
{    // 바이트 계산.
    var b = 0;
    for (var i=0; i<this.length; i++) b += (this.charCodeAt(i) > 128) ? 2 : 1;
    return b;
};
String.prototype.nl2br = function() {
    return this.replace(/\n/g, "<br />");
};
String.prototype.toMoney = function() {
    var s = (this.nvl('0')).trim();
    if (isFinite(s)) {
        while((/(-?[0-9]+)([0-9]{3})/).test(s)) {
            s = s.replace((/(-?[0-9]+)([0-9]{3})/), "$1,$2");
        }
        return s;
    }
    else {
        return this;
    }
};
String.prototype.toNegative = function() {
    return this == '0' ? this : "- " + this;
};


/**
 * val 문자열을 len 길이만큼 왼쪽에 char 문자를 붙여서 반환 한다.
 *
 * 사용 예) "A".lpad(5, "0") => "0000A"
 *
 * @param val
 *            문자열
 * @param len
 *            생성할 문자열 길이
 * @param char
 *            해당 길이만큼 왼쪽에 추가할 문자
 */
String.prototype.lpad = function(len, char) {
    var val = String(this);
    if (typeof(char)!="string" && typeof(len)!="number") {
        return val;
    }
    char = String(char);
    while(val.length + char.length<=len) {
        val = char + val;
    }

    return val;
};
// alert("A".lpad(5, "0"));

/**
 * val 문자열을 len 길이만큼 오른쪽에 char 문자를 붙여서 반환 한다.
 *
 * 사용 예) "A".rpad(5, "0") => "A0000"
 *
 * @param val
 *            문자열
 * @param len
 *            생성할 문자열 길이
 * @param char
 *            해당 길이만큼 오른쪽에 추가할 문자
 */
String.prototype.rpad = function(len, char) {
    var val = String(this);
    if (typeof(char)!="string" && typeof(len)!="number") {
        return val;
    }
    char = String(char);
    while(val.length + char.length<=len) {
        val = val + char;
    }

    return val;
};
//alert("A".rpad(5, "0"))

String.prototype.numberFormat = function() {
// return this;
// return $.number(this);
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


String.prototype.getBytesLength = function() {
    var s = this;
    for(b = i = 0;c = s.charCodeAt(i++);b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
    return b;
};

String.prototype.getTransSpace = function() {
    return this.split(" ").join("&nbsp;");
};


/*--------------------------------------------------------------------------------*\
* Number Object Prototype
\*--------------------------------------------------------------------------------*/
Number.prototype.toMoney = function() {
    return String(this).toMoney();
};


Number.prototype.numberFormat = function() {
// return this
// return $.number(this);
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


/**
 * val 문자열을 len 길이만큼 왼쪽에 char 문자를 붙여서 반환 한다.
 *
 * 사용 예) (123).lpad(5,"0") => "00123"
 *
 * @param val
 *            문자열
 * @param len
 *            생성할 문자열 길이
 * @param char
 *            해당 길이만큼 왼쪽에 추가할 문자
 */
Number.prototype.lpad = function(len, char) {
    return String(this).lpad(len,char);
};
//alert((123).lpad(5,"0"));

/**
 * val 문자열을 len 길이만큼 오른쪽에 char 문자를 붙여서 반환 한다.
 *
 * 사용 예) (123).rpad(5,"0") => "12300"
 *
 * @param val
 *            문자열
 * @param len
 *            생성할 문자열 길이
 * @param char
 *            해당 길이만큼 오른쪽에 추가할 문자
 */
Number.prototype.rpad = function(len, char) {
    return String(this).rpad(len,char);
}
//alert((123).rpad(5,"0"));

/*--------------------------------------------------------------------------------*\
* Date Object Prototype
\*--------------------------------------------------------------------------------*/
/**
 *
 * 포멧에 맞는 날짜 문자열을 꺼낸다.
 *
 * 사용 예)
 * > new Date().format("yyyy-MM-dd hh:mm:ss E a/p")
 * > => 2016-11-24 11:00:31 목요일 오전
 *
 *
 *
 */
Date.prototype.format = function(format) {
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

    if (!d.valueOf()) return " ";
    if(format == undefined) return " ";
    format = String(format);

    return format.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy":   return (d.getFullYear() % 1000).lpad(2, "0");
            case "MM":   return (d.getMonth() + 1).lpad(2, "0");
            case "dd":   return d.getDate().lpad(2, "0");
            case "E":    return weekName[d.getDay()];
            case "HH":   return d.getHours().lpad(2, "0");
            case "hh":   return ((h = d.getHours() % 12) ? h : 12).lpad(2, "0");
            case "mm":   return d.getMinutes().lpad(2, "0");
            case "ss":   return d.getSeconds().lpad(2, "0");
            case "a/p":  return d.getHours() < 12 ? "오전" : "오후";
            default:     return $1;
        }
    });
};
//alert(new Date().format("yyyy-MM-dd hh:mm:ss E a/p"));


/**
 * 일수를 계산한 날짜를 반환 한다.
 *
 * 사용 예)
 * new Date().addDate(1);  : 내일날짜 반환
 * new Date().addDate(0);  : 오늘날짜 반환
 * new Date().addDate(-1); : 어제날짜 반환
 *
 * @param dateCount
 *            더할 일수
 *
 * @return 계산되어 생성된 Date Object
 *
 */
Date.prototype.addDate = function(dateCount) {
    return new Date(this.valueOf() + (dateCount * (24*60*60*1000)) );
};
//alert(new Date().addDate(1).addDate(1));




/*--------------------------------------------------------------------------------*\
* Cookie object
\*--------------------------------------------------------------------------------*/
var Cookie = function(expiresDay) {
    var expdate = (typeof expiresDay == 'number') ? expiresDay : 1;
    return {
        get : function(cName) {
            cName = cName + '=';
            var cookieData = document.cookie;
            var start = cookieData.indexOf(cName);
            var cValue = '';
            if(start != -1){
                 start += cName.length;
                 var end = cookieData.indexOf(';', start);
                 if(end == -1)end = cookieData.length;
                 cValue = cookieData.substring(start, end);
            }
            return unescape(cValue);
        },
        set : function(cName, cValue, expireDays) {
            this.setOwner(cName, cValue, ((typeof expireDays == 'number' ? expireDays : expdate) * 24 * 60 * 60 * 1000))
            return this;
        },
        setOwner : function(cName, cValue, expire) {
            var expdate = new Date();
            expdate.setTime(expdate.getTime() + (typeof expire == 'number' ? expire : (expdate * 24 * 60 * 60 * 1000)));
            document.cookie = cName+"=" + cValue + "; path=/; domain="+document.domain+"; expires=" + expdate.toGMTString();
        },
        remove : function(name) {
            return this.set(name, '', -1);
        },
        getItem : function(name) {
            return this.get(name);
        },
        setItem : function(name, value) {
            this.set(name, value);
        },
        removeItem : function(name) {
            this.remove(name);
        },
        clear : function() {
            return;
        }
    };
};





/*--------------------------------------------------------------------------------*\
* Cache object
\*--------------------------------------------------------------------------------*/
var Cache = function(type, span/* integer */, format/* s, m, h, d, M, y, w */) {
    var _cacheType  = (typeof type != 'string' || type == '') ? 'cache' : type; // cache
                                                                                // ||
                                                                                // local
                                                                                // ||
                                                                                // session
    var _span       = (typeof span == 'number') ? span : 0;
    var _format     = (typeof format == 'string') ? format : '';
    var _storage    = null;
    var _expires    = getCacheExpires(_span, _format);
    var _default    = {
            set : function() { return;},
            get : function() { return '';},
            isStatus : function() { return false;},
            remove : function() { return; },
            clear : function() { return; }
        };


    if (_cacheType == 'session') {
        if (!window.sessionStorage) return _default;
        _storage= window.sessionStorage;
        _expires= (_span != 0) ? _expires : getCacheExpires(12, 'h'); // 12
                                                                        // hours
    }
    else if (_cacheType == 'cache') {
        if (!window.localStorage) return _default;
        _storage= window.sessionStorage;
        _expires= (_span != 0) ? _expires : getCacheExpires(5, 'm'); // 5
                                                                        // minutes
    }
    else if (_cacheType == 'local') {
        if (!window.localStorage) return _default;
        _storage = window.localStorage;
        _expires= (_span != 0) ? _expires : getCacheExpires(7, 'd'); // 7
                                                                        // days
    }
    else if (_cacheType == 'cookie') {
        _storage = com.lotte.smp.Cookie(1);
        _expires= (_span != 0) ? _expires : getCacheExpires(1, 'd'); // 1
                                                                        // days
    }
    else {
        return _default;
    }

    function getCacheExpires(s, f) {
        var exp = 0;
        switch(f) {
            case 's' : exp = 1;         break;
            case 'm' : exp = 60;        break;
            case 'h' : exp = 3600;      break;  // 60 * 60
            case 'd' : exp = 86400;     break;  // 60 * 60 * 24
            case 'w' : exp = 604800;    break;  // 60 * 60 * 24 * 7
            case 'M' : exp = 2592000;   break;  // 60 * 60 * 24 * 30
            case 'y' : exp = 31536000;  break;  // 60 * 60 * 24 * 365
        }
        return s * exp;
    }

    return {
        type    : _cacheType,
        storage : _storage,
        expires : _expires,
        set : function(name, value, expires) {
            if (typeof name != 'string' || name == '') return;
            if (value == 'undefined') return;
            if (expires=='undefined' || typeof expires != 'number') { expires = this.expires; }

            var date = new Date();
            var schedule= Math.round((date.setSeconds(date.getSeconds()+expires))/1000);

            this.storage.setItem(this.type +'@'+ name, value);
            this.storage.setItem(this.type +'@time_' + name, schedule);

            return this;
        },
        get : function(name) {
            if (this.isStatus(name)) {
                return this.storage.getItem(this.type +'@'+ name);
            }
            else {
                return '';
            }
        },
        isStatus : function(name) {
            if (this.storage.getItem(this.type +'@'+ name) == null || this.storage.getItem(this.type +'@'+ name) == '')
                return false;

            var date = new Date();
            var current = Math.round(+date/1000);

            // Get Schedule
            var stored_time = this.storage.getItem(this.type +'@time_' + name);
            if (stored_time=='undefined' || stored_time=='null') { stored_time = 0; }

            // Expired
            if (stored_time < current) {
                this.remove(name);
                return false;
            } else {
                return true;
            }
        },
        remove : function(name) {
            this.storage.removeItem(this.type +'@'+ name);
            this.storage.removeItem(this.type +'@time_' + name);
        },
        clear : function() {
            for (var item in this.storage) {
                if (String(item).startWith(this.type)) {
                    this.storage.removeItem(item);
                }
            }
            // this.storage.clear();
        }
    };
};

jQuery.fn.serializeObject = function() {
    var obj = null;
    try{
        if ( this[0].tagName && this[0].tagName.toUpperCase() == "FORM" ) {
            var arr = this.serializeArray();
            if ( arr ) {
              obj = {};
              jQuery.each(arr, function() {
                obj[this.name] = this.value;
              });
            }
        }
    }
    catch(e) {}
    finally  {}

    return obj;
};

//레이어 팝업 공통(열기, 닫기) 퍼블리싱
var fnLayerTopCustomSet = function(layer, status){ //layer : 레이어 아이디 , status : open/close
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
            
            // 중간을 보여주는 포지션
            //popPos = parseInt($(window).scrollTop(), 10) + ((parseInt($(window).height(), 10) - popHgt)/2) ;
            
            // 팝업레이어의 탑을 보여주는 포지션
            if(_obj.height() > $(window).height()){
                popPos = $(window).scrollTop();
            }else{
                popPos = $(window).scrollTop() + ($(window).height() - _obj.height())/2;
            }
            
            _obj.css({'left':'50%' , 'margin-left':-(popWid) +'px' , 'top': popPos +'px'});
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

//레이어 팝업 공통(열기, 닫기) 퍼블리싱
var fnLayerSet = function(layer, status, removeYn){ //layer : 레이어 아이디 , status : open/close
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

		if(layer=='passwdLayer' || layer=='lockLayer'){
			popPos2 = _obj.height()/2;
			//_obj.css({'left':'50%' , 'margin-left':-(popWid) , 'top':'50%' , 'margin-top':-(popPos)}).show()
			_obj.css({'left':'50%' , 'margin-left':-(popWid) +'px' , 'top':'50%', 'margin-top':-(popPos2) +'px'});
			$('body').append('<div id="dim"></div>');
		} else if(layer == 'basketOption' && $("#basketOption div").attr('class') == 'popup-contents') {
			_obj.removeClass('hide');

			if(popHgt > $(window).height()){
				popPos = parseInt($(window).scrollTop(), 10);
			}else{
				popPos = parseInt($(window).scrollTop(), 10) + ((parseInt($(window).height(), 10) - 747)/2);
			}

			_obj.css({'left':'50%' , 'margin-left':-(popWid) +'px' , 'top': popPos +'px'});
			$('body').append('<div class="dimm" style="\z-index:990;\"></div>');
		} else {
			var popHgt = _obj.height();
			//_obj.removeClass('hide').css({'margin-top': -_obj.height()/2 +'px'});
			_obj.removeClass('hide');
			popHgt = parseInt(_obj.height(), 10);
			popWid = parseInt(_obj.width(), 10)/2;

            if(popHgt > $(window).height()){
                popPos = parseInt($(window).scrollTop(), 10) + 40;
            }else{
                popPos = parseInt($(window).scrollTop(), 10) + ((parseInt($(window).height(), 10) - popHgt)/2) ;
            }

			_obj.css({'left':'50%' , 'margin-left':-(popWid) +'px' , 'top': popPos +'px'});
			$('body').append('<div class="dimm" style="\z-index:990;\"></div>');
			console.log(popPos, popHgt);
		}
	} else if(status == 'close') {
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
			} else {
				$('.dimm').remove();
				$('#layer_pop_wrap').css('top','');
				$('#layer_pop_wrap').css('margin-left','');
				$('#layer_pop_wrap').css('margin-top','');
				$('body').append('<div class="dimm" style="\z-index:990;\"></div>');
			}
		} else {
			_obj.hide();
			_obj.addClass('hide');
			removeYn = typeof removeYn == 'undefined' ? 'Y' : removeYn;

			if(removeYn == 'Y'){
				_obj.html("");
			}

			if(layer=='passwdLayer'||layer=='lockLayer'){
				$('#dim').remove();
				$('#layer_pop_wrap').css('top','');
				$('#layer_pop_wrap').css('margin-left','');
				$('#layer_pop_wrap').css('margin-top','');
			} else {
				$('.dimm').remove();
				$('#layer_pop_wrap').css('top','');
				$('#layer_pop_wrap').css('margin-left','');
				$('#layer_pop_wrap').css('margin-top','');
			}
		}
		// 레코벨 추천상품을 장바구니에서 담든 안담든 레이어 닫을때 N 값으로 초기화
		common.cart.regCartRecoBellGoodsInCartYn = 'N';
	} else if(status == 'closeRecoBellGoodsInCart') {
		location.reload();
	}
};


//키오스크용 
$.namespace("common.kiosk");
common.kiosk = {
    //키오스크에서 지원하는 화면 URI 체크
    //Req매핑 값등록함
    checkKioskURL : function(thisURL,callBack){
        var returnURL ="#";
        var checkURI = {
                "getQuickMainList":true,
                "getPlanShopList":true,
                "getPlanShopDetail":true,
                "getNewList":true,
                "getMCategoryList":true,
                "getGoodsDetailNonDisplay":true,
                "getGoodsDetail":true,
                "getFOQuickList":true,
                "getBrandShopDetail":true,
                "getBestList":true,
                "getSearchMain":true,
        };
        //값이 없는경우
        if(!thisURL){
            //Callback 함수가 있는경우
            if($.isFunction(callBack)){
                callBack(returnURL);
            }
            return returnURL;   
        }
        var word = "store";
        var wordIdx = thisURL.indexOf(word);
        var paramIdx = thisURL.lastIndexOf(".do");
        
        // URL Root      ex) http://www.lopc.com/store/
        var url1 = thisURL.substring(0,thisURL.indexOf("/",wordIdx+1)+1);
        // URL 업무구분         ex) planshop 
        var url2 = thisURL.substring(thisURL.indexOf("/",wordIdx+1)+1,thisURL.lastIndexOf("/"));
        // URL Mapping   ex)getPlanShopDetail
        var url3 = thisURL.substring(thisURL.lastIndexOf("/")+1,paramIdx);
        // URL Param     ex).do?dispCatNo=500000100210026
        var url4 = thisURL.substring(paramIdx);
        
        var url5 = "";
        if(thisURL.indexOf("javascript") >= 0){
            if(thisURL.indexOf("http") < 0){
                url1 = thisURL.substring(0,thisURL.indexOf("'")+1);
                // URL 업무구분         ex) planshop 
                url2 = thisURL.substring(thisURL.indexOf("'")+1,thisURL.lastIndexOf("/"));
            }
            url4 = thisURL.substring(paramIdx,thisURL.lastIndexOf("'"));
            url5 = thisURL.substring(thisURL.lastIndexOf("'"));;
        }
        //KIOSK에 화면이 지원하는경우
        if(checkURI[url3]){
            
            var kioskMenuId = $("#kioskMenuId").val();
            var paramIdx = url4.indexOf("\?");
            var menuIdx = url4.indexOf("kioskMenuId");
            
            //kioskMenuId값이 있고 URL에 없는경우 추가 한다
            if(kioskMenuId){
                if(paramIdx == -1 ){
                    url4+="?kioskMenuId="+kioskMenuId;
                }else if(menuIdx == -1 ){
                    url4+="&kioskMenuId="+kioskMenuId;
                } 
            }
            var returnURL =  url1+"kiosk/"+url3+url4+url5;
            //Callback 함수가 있는경우
            if($.isFunction(callBack)){
                callBack(returnURL);
            }
            return returnURL;   
        //KIOSK에 화면이 없음X
        }else{
            //Callback 함수가 있는경우
            if($.isFunction(callBack)){
                callBack(returnURL);
            }
            return returnURL;   
        }
        
    },
    goodDetailLog : function(){
        var kioskMenuId = $("#kioskMenuId").val();
        switch (kioskMenuId) {
            case "00": common.wlog("kiosk_search_detail"); break;
            case "01": common.wlog("kiosk_best_detail"); break;
            case "02": common.wlog("kiosk_new_detail"); break;
            case "03": common.wlog("kiosk_quick_detail"); break;
            case "04": common.wlog("kiosk_planshop_detail"); break;
        } 
    }
};

$.namespace('common.chatbot');
common.chatbot = {
    apiUrl : "",
    bSId : "",
    encMbrNo : "",
    maskMbrNm : "",
    initFlag : false,
    init : function(apiUrl, bSId, encMbrNo, maskMbrNm)  {
        common.chatbot.apiUrl = apiUrl;
        common.chatbot.bSId = bSId;
        common.chatbot.encMbrNo = encMbrNo;
        common.chatbot.maskMbrNm = maskMbrNm;
        common.chatbot.initFlag = true;
    },
    sendAwesomeBotApi : function(data) {
        if(!common.chatbot.initFlag) return;
        if(!common.isEmpty(data)) {
            if(!common.isEmpty(data.maskMbrNm)) common.chatbot.maskMbrNm = data.maskMbrNm;
            if(!common.isEmpty(data.encMbrNo)) common.chatbot.encMbrNo = data.encMbrNo;
        }
        if(common.isEmpty(common.chatbot.bSId)) return;
        if(common.isEmpty(common.chatbot.maskMbrNm)) return;
        if(common.isEmpty(common.chatbot.encMbrNo)) return;

        $.ajax({
            url: common.chatbot.apiUrl,
            type: 'POST',
            data: {
                    "bSId": common.chatbot.bSId,
                    "uId": common.chatbot.encMbrNo,
                    "uName": this.maskingName(common.chatbot.maskMbrNm)
                  },
            async: false,
            success: function(data){
                try {
                    console.log(data);
                    //location.href = "kakaotalk://inappbrowser/close";
                    //window.close();
                }
                catch(e){
                    console.log(e);
                }
            }
        });
    },
    maskingName : function (strName) {
        if (strName.length > 2) {
            var originName = strName.split('');
            originName.forEach(function(name, i) {
                if (i === 0 || i === originName.length - 1) return;
                originName[i] = '*';
            });
            var joinName = originName.join();
            return joinName.replace(/,/g, '');
        } else {
            var pattern = /.$/; // 정규식
            return strName.replace(pattern, '*');
        }
    }
};

$.namespace("common.push");
common.push = {
    // 푸시 수신 미동의상태의 회원에게는 앱푸시수신동의 팝업을 노출한다.
    pushMsgAgrPopupOpen : function(){
        var trackingUrl = _baseUrl + "store/getPushMsgAgrPop.do";
        $('#pushMsgRcvAgrPop').html('');
        $('#pushMsgRcvAgrPop').load(trackingUrl, function() {
            if($('#popPushMsgRcvYn').val() == 'N'){
                var oylayId;
                common.push.oylayId = $('#pushMsgRcvAgrPop');
                common.push.dimShow();
                common.push.oylayId.show();
                common.push.popPos();
                common.push.accFocus();
            }
        });
    },
    dimShow : function(){
        common.push.oylayId.append('<div class="oyDimmed"><button class="btnLayClose">닫기</button></div>');
        $('.oyDimmed').on('click', function(){
            common.push.oyLayerClose(common.push.oylayId);
        });
    },
    popPos : function(){
        var height = $(window).height(),
            lay = common.push.oylayId.children('.oyLayerContainer'),
            layheight = lay.outerHeight(),
            layW = -(lay.outerWidth()/2),
            layH = -(lay.outerHeight()/2),
            scroll = $(window).scrollTop(),
            scroll2 = scroll + (height - lay.outerHeight())/2;
        lay.css({marginLeft:layW});
        if(height<=layheight){
            lay.css({top:scroll});
        }else{
            lay.css({top:scroll2});
        }
    },
    oyLayerClose : function(id){
        common.push.oylayId.hide();
        $('.oyDimmed').remove();
        $('.btnthis').focus().removeClass('btnthis');
    },
    accFocus : function(){
        var close = $('.oyDimmed .btnLayClose'),
            layClose = $('.oyLayerWrap .btnClose');
            oyHead = common.push.oylayId.find('.oyHead');
        if(oyHead.length>0){
            oyHead.attr('tabindex', '0').focus();
        }else{
            common.push.oylayId.children('div').attr('tabindex', '0').focus();
        }
        close.on('keydown', function(e){
            e = event || window.event;
            var keycode = e.keyCode || e.which;
            if(!e.shiftKey && keycode === 9){
                common.push.oylayId.focus();
            }
        });
        layClose.on('keydown', function(e){
            e = event || window.event;
            var keycode = e.keyCode || e.which;
            if(e.shiftKey && keycode === 9){
                close.focus();
            }
        });
    }
};
$.namespace("common.cyber");
common.cyber = {
	//oy 레이어팝업 S	
	oyLayerOpen : function(id,e){
		var trackingUrl = _baseUrl + "main/getCyberAuditPop.do";
	    $('#cyberAuditPop').html('');
	    $('#cyberAuditPop').load(trackingUrl, function() {
            var oylayId;
            common.cyber.oylayId = $('#'+id); 
            common.cyber.dimShow();
            common.cyber.oylayId.show();
            common.cyber.popPos();
            common.cyber.accFocus();
	    });
	},
	dimShow : function(){
		common.cyber.oylayId.append('<div class="oyDimmed"><button class="btnLayClose">닫기</button></div>')
		$('.oyDimmed').on('click', function(){
			common.cyber.oyLayerClose(common.cyber.oylayId);
		});
	},
	popPos : function(){
		var height = $(window).height(),
			lay = common.cyber.oylayId.children('.oyLayerContainer'),
			layheight = lay.outerHeight(),
			layW = -(lay.outerWidth()/2),
			layH = -(lay.outerHeight()/2),
			scroll = $(window).scrollTop(),
			scroll2 = scroll + (height - lay.outerHeight())/2;
		lay.css({marginLeft:layW});
		if(height<=layheight){        
			lay.css({top:scroll});
		}else{
			lay.css({top:scroll2});    
		}
	},
	oyLayerClose : function(id){
		common.cyber.oylayId.hide();
		$('.oyDimmed').remove();
		$('.btnthis').focus().removeClass('btnthis');
	},
	accFocus : function(){
		var close = $('.oyDimmed .btnLayClose'),
			layClose = $('.oyLayerWrap .btnClose');
			oyHead = common.cyber.oylayId.find('.oyHead');	    	
		if(oyHead.length>0){
			oyHead.attr('tabindex', '0').focus();    
		}else{
			common.cyber.oylayId.children('div').attr('tabindex', '0').focus();
		}	    
		close.on('keydown', function(e){
			e = event || window.event;
			var keycode = e.keyCode || e.which;
			if(!e.shiftKey && keycode === 9){
				common.cyber.oylayId.focus();            
			}
		});
		layClose.on('keydown', function(e){
			e = event || window.event;
			var keycode = e.keyCode || e.which;
			if(e.shiftKey && keycode === 9){
				close.focus();
			}
		});
	}
};

$(function() {
    common.cart.trackingInfo.setGateCd();
});

$.namespace("common.faq");
common.faq = {
    getFaqList : function (cd) {
        location.href = _baseUrl + "counsel/getFaqList.do?faqLrclCd="+cd;
    }
};