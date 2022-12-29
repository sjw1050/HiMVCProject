// 페스타 사전컴
$.namespace("festa2022.type1");
festa2022.type1 = {
    init : function(){
        festa2022.common.init();
    }
}
// 페스타 본컴
$.namespace("festa2022.type2");
festa2022.type2 = {
    init : function(){
        festa2022.common.init();

        this.bindEvent();
        this.setRudolfEvtInfo();
    },
    bindEvent : function () {
        $('.festa_sec.sec_share').on('click', function () {
            alert("APP에서만 확인 가능합니다.");
        });
        $('.card').on('click', function (e) {
            festa2022.type2.onClickHintCard(e);
        });
        $('.findBox').on('click', function (e) {
            festa2022.type2.onClickFindBox(e);
        });
        $('.btn_enroll').on('click', function (e) {
            festa2022.type2.onClickSantaGift(e);
        });
    },
    onClickHintCard : function (e) {
        var target = $(e.currentTarget);

        // 로그인 체크
        if (common.isLogin() === false) {
            if(confirm("해당 서비스는 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
                common.link.moveLoginPage('', location.href);
            }
        } else {
            if (!target.hasClass('off')) {
                if(target.hasClass('flip')){
                    var cardName = target.attr('class').split(' ')[1];
                    var cardObj = {
                        card1: {
                            storageKey: 'awardRudolfYN',
                            linkURL: 'amusement/award.do?awardedYear=2022'
                        },
                        card2: {
                            storageKey: 'todaySpecialRudolfYN',
                            linkURL: 'main/getHotdealList.do'
                        },
                        card3: {
                            storageKey: 'rankingRudolfYN',
                            linkURL: 'main/getBestList.do'
                        }
                    }

                    if(cardObj[cardName]) {
                        var storageKey = cardObj[cardName].storageKey;
                        var linkURL = cardObj[cardName].linkURL;

                        sessionStorage.setItem(storageKey, 'N');
                        common.link.commonMoveUrl(linkURL);
                    }
                } else {
                    target.addClass("flip");
                }
            }
        }
    },
    onClickFindBox : function (e) {
        var target = $(e.currentTarget);

        if (target.hasClass('logout')) {
            if(confirm("해당 서비스는 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
                common.link.moveLoginPage('', location.href);
            }
        }
    },
    setRudolfEvtInfo : function () {
        var isLogin = common.isLogin();

        if (isLogin) {
            common.Ajax.sendRequest("GET", _baseUrl + "amusement/get/event-info.do", {}, function (res) {
                var storageKeyList = ["awardRudolfYN", "todaySpecialRudolfYN", "rankingRudolfYN"];
                var eventList = res.eventList;

                if (eventList) {
                    eventList.forEach(function (item, idx) {
                        var eventID = item.split('2022_awards_festa_')[1];
                        var cardIdx = storageKeyList.indexOf(eventID);
                        var stampEl = $('.stamp').find('li').eq(idx);

                        if(cardIdx > -1){
                            var cardEl = $('.card_area').find('.card').eq(cardIdx);

                            cardEl.addClass('off');
                        }

                        stampEl.addClass('on');
                    });
                }
            });
        } else {
            $('.findBox').addClass('logout');
        }
    },
    onClickSantaGift: function (e) {
        var target = $(e.currentTarget);
        if(target.hasClass('off')) return;

        if (common.isLogin() === false) {
            if(confirm("해당 서비스는 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
                common.link.moveLoginPage('', location.href);
            }
        } else {
            var rudolfCnt = $('.stamp').find('.on').length;
            if(rudolfCnt !== 3) {
                alert("3마리의 루돌프를 모두 찾아주세요");
                return;
            }

            festa2022.type2.sendSantaGiftEvent(target);
            target.addClass('off');
        }
    },
    sendSantaGiftEvent: function () {
        var param = {
            evtNo : _santaGiftEvtNo
        };

        common.Ajax.sendRequest("GET", _baseUrl + "amusement/apply/event.do", param, function (res) {
            var result = res.result.result;
            var message = res.message;

            if (result === true) {
                alert("응모가 완료 되었습니다");
            } else {
                alert(message);
            }
        });
    },
    initRudolfBanner: function (pathUrl) {
        var rudolfCk = "";
        var sessionStorageNm = "";

        switch (pathUrl) {
            case "todaySpecial": sessionStorageNm = "todaySpecialRudolfYN"; break;
            case "ranking": sessionStorageNm = "rankingRudolfYN"; break;
            case "award2022": sessionStorageNm = "awardRudolfYN"; break;
        }
        rudolfCk = sessionStorage.getItem(sessionStorageNm);

        if(common.isLogin() && rudolfCk) {
            // 루돌프 찾은 경우
            if(rudolfCk === "Y") {
                $("#main_moving_banner2").show();
            }
            // 루돌프 찾지 못한 경우
            else {
                $("#main_moving_banner1").show();
                festa2022.type2.onClickRudolfBanner(sessionStorageNm);
            }
        }
    },
    onClickRudolfBanner: function (sessionStorageNm) {
        $('#main_moving_banner1').on('click', function (){
            festa2022.type2.sendRudolfClickEvent(sessionStorageNm);
        });
    },
    sendRudolfClickEvent: function (sessionStorageNm) {
        var param = {
            eventId : "2022_awards_festa_" + sessionStorageNm
        };

        common.Ajax.sendRequest("POST", _baseUrl + "amusement/set/event-info.do", param, function (res) {
            var result = res.result.result;
            if(result && result === true) {
                $("#main_moving_banner1").hide();
                $("#main_moving_banner2").show();
                $("#festa_evt_pop").show();

                // 세션스토리지 저장
                sessionStorage.setItem(sessionStorageNm, "Y");
            }
        });
    }
}
// 페스타 현장공유
$.namespace("festa2022.type3");
festa2022.type3 = {
    init : function(){
        festa2022.common.init();
    },
    bindEvent : function () {

    }
}

$.namespace("festa2022.common");
festa2022.TAB = ['festa', 'myAwards'];
festa2022.common = {
    init: function (){
        this.bindEvent();
        this.handleURLQueryString();
        this.handleTabElement();

        window.onload = function () {
            festa2022.common.doAnchorUrl();
        }
    },
    bindEvent : function () {
        $('.contents_header_tab_item').on("click",function () {
            common.link.commonMoveUrl('amusement/intro.do');
        });
        $('.btn_contents_header').on("click",function () {
            common.link.commonMoveUrl('amusement/intro.do');
        });
        $("#awardsInfoBtn").on("click", function(){
            festa2022.common.getMyAwardsInfo();
        });
        $(".btn_tab").on("click", function(e){
            festa2022.common.onClickawardsPrdBtn(e);
        });
        $('.btn_wrap .btn_item').on("click",function (e) {
            festa2022.common.onChangeTab(e);
            festa2022.common.handleTabElement();
        });
    },
    handleURLQueryString : function () {
        var url = new URL(location.href);
        var searchParams = url.searchParams;

        if(searchParams.has('festaTab')){
            var tabName = searchParams.get('festaTab');
            var tabIndex = festa2022.TAB.indexOf(tabName);

            if(tabIndex > -1){
                var target = $('.btn_wrap .btn_item').eq(tabIndex);

                FESTA.main.activeBtn(target);
                FESTA.main.tabChange(target);
                FESTA.main.onScrollSticky();
            }
        }
    },
    getMyAwardsInfo: function () {
        // 로그인 체크
        if (common.isLogin() === false) {
            if(confirm("해당 서비스는 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
                common.link.moveLoginPage();
            }
        } else {
            $(".personal1").addClass("on");
            $("#awardsInfoBtn").addClass("off");

            var awardsDataYn = $("#awardsDataYn").val();
            if(awardsDataYn === "N") {
                $("#noAwardsInfo").show();
                return;
            }

            festa2022.common.setMyAwardsDay();
            festa2022.common.setMyAwardsCategory();
            $("#awardsInfo").show();
        }
    },
    setMyAwardsDay: function () {
        var day = $("#myAwardsDay").attr("day");
        switch (day) {
            case "일요일" : $(".daybox").find(".sun").show(); break;
            case "월요일" : $(".daybox").find(".mon").show(); break;
            case "화요일" : $(".daybox").find(".tue").show(); break;
            case "수요일" : $(".daybox").find(".wed").show(); break;
            case "목요일" : $(".daybox").find(".thu").show(); break;
            case "금요일" : $(".daybox").find(".fri").show(); break;
            case "토요일" : $(".daybox").find(".sat").show(); break;
        }
    },
    setMyAwardsCategory: function() {
        var category = $("#myAwardsCate").attr("category");
        switch (category) {
            case "스킨케어" : $(".catebox").find(".cate01").show(); break;
            case "마스크팩" : $(".catebox").find(".cate01").show(); break;
            case "클렌징" : $(".catebox").find(".cate01").show(); break;
            case "썬케어" : $(".catebox").find(".cate01").show(); break;
            case "기초화장품기타" : $(".catebox").find(".cate01").show(); break;

            case "색조화장품" : $(".catebox").find(".cate02").show(); break;
            case "헤어용품" : $(".catebox").find(".cate03").show(); break;
            case "바디용품" : $(".catebox").find(".cate04").show(); break;
            case "건강/위생용품" : $(".catebox").find(".cate05").show(); break;
            case "미용소품" : $(".catebox").find(".cate06").show(); break;
            case "프래그런스" : $(".catebox").find(".cate07").show(); break;
            case "일반식품" : $(".catebox").find(".cate08").show(); break;
            case "건강식품" : $(".catebox").find(".cate09").show(); break;
            case "잡화" : $(".catebox").find(".cate10").show(); break;
        }
    },
    onClickawardsPrdBtn: function (e) {
        var target = $(e.currentTarget),
            targetValue = target.parent().attr("data-tab-value");

        // 나만의 어워즈 클릭했을 때
        if(targetValue === "02") {
            if (common.isLogin() === false) {
                if (confirm("해당 서비스는 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
                    common.link.moveLoginPage('', location.href);
                }
                return;
            } else {
                festa2022.common.setMyAwardsPrd();
            }
        }

        $(".btn_tab").parent().removeClass("is_select");
        target.parent().addClass("is_select");
        var tabData = $("[data-tab-content=" + targetValue + "]");
        $('.data_list').removeClass("is_show");
        tabData.addClass("is_show");
    },
    setMyAwardsPrd: function () {
        var awardsPrdYn = $("#awardsPrdYn").val();
        var noAwardsPrdTxt = $("#noAwardsPrdTxt");
        var AwardsPrdTxt = $("#AwardsPrdTxt");

        if (awardsPrdYn === "N") {
            noAwardsPrdTxt.show();
            AwardsPrdTxt.hide();
        } else {
            AwardsPrdTxt.show();
            noAwardsPrdTxt.hide();
        }
    },
    handleSectionCategory : function () {
        $(".plan-menu li").bind('click', function(){
            if($(this).children().is("a")){
                var index = $(this).index();
                //전체 Show
                $(".tema").show();
                $(".tema").next().show();

                //전체보기가 아닌 경우
                if(index > 0){
                    $(".tema :not(:eq(" + (index-1) + "))").hide();
                    $(".tema :not(:eq(" + (index-1) + "))").next().hide();
                }
            }
        });
    },
    bindSectionPrdGtmEvent: function (e) {
        var classNm = ".cate_prd_list .prd_info ";

        $(classNm + ".goodsList").on("click", function(e) {
            e.preventDefault();
            _data_goodsno = $(this).attr("data-ref-goodsNo");
            var _gtmListFromDataAttr = String($(this).attr("data-attr"));
            var _gtmList = _gtmListFromDataAttr.split("^");
            var _gtm = _gtmList[0] + "_" + _gtmList[1];
            gtm.goods.callGoodsGtmInfo(_data_goodsno, null, 'ee-productClick', _gtm, _gtmList[3]);
        });
    },
    onChangeTab: function (e) {
        var url = new URL(location.href);
        var searchParams = url.searchParams;
        var tabIndex = $(e.target).index();
        var tabName = festa2022.TAB[tabIndex];

        searchParams.set('festaTab', tabName);

        history.replaceState(null, null, url.href);
    },
    handleTabElement: function () {
        var tabIndex = $('.btn_item.on').index();

        // 나만의 어워즈
        if(tabIndex === 1){
            var myAwardsEl = $('.panel2');
            var themeEl = $('.theme_prd');

            if(myAwardsEl.html() === '' || themeEl.html() === ''){
                myAwardsEl.html($('#myAwards_tmpl').html());
                themeEl.html($('#theme_tmpl').html());
                
                common.wish.checkWishList();
                common.bindGoodsListLink();

                this.bindEvent();
                this.handleSectionCategory();
                this.bindSectionPrdGtmEvent();
            }
        }
    },
    doAnchorUrl: function () {
        var url = new URL(location.href);
        var searchParams = url.searchParams;

        if(searchParams.has('festaTab') && searchParams.has('evtNm')) {
            var evtNm = searchParams.get('evtNm');
            var scrollTop;

            if(evtNm === "allAwardsInfo") {
                scrollTop =  $('.personal1').offset().top - 90;
            } else if(evtNm === "randomCoupon") {
                scrollTop =  $('.personal3').offset().top - 90;
            } else if(evtNm === "awardsPrd") {
                scrollTop =  $('.personal2').offset().top - 90;
            } else if(evtNm === "rudolf") {
                scrollTop =  $('.sec2_2').offset().top - 90;
            }

            window.scrollTo({ "top" : scrollTop });
        }
    }
}