
$.namespace("main.membership");
main.membership = {
    _ajax : common.Ajax,

    nextPageIdx : 1,
    mbrGradeCd : "",
    comtSaveChk : true,
    
    eplgComtPageIdx : 1,
    eplgNo : "",
    mbrNo : "",
    
    init : function() {
        setTimeout(function() {
            common.wlog("coupon_onbenefit_tab");
            main.membership.getMembershipAjax();
        }, 300);
        
        $("#couponButton").click(function(){
            common.link.moveMainCoupon('coupon');
        });
    },
    
    comtInit : function(eplgNo,mbrNo) {
        main.membership.eplgNo = eplgNo;
        main.membership.mbrNo = mbrNo; 
        
        main.membership.getComtList();
    },
    
    bindEvent : function(){
        // 페이징버튼 클릭이벤트 - 수정중
        $('.reply_view .pageing').find('a').bind('click', function(){
            var pageIdx = $(this).data('pageNo');
            if(typeof pageIdx == 'undefined' || pageIdx == '') return;
            main.membership.getComtList(pageIdx);
        });
    },
    
    myComtBindEvent : function(){
        // 페이징버튼 클릭이벤트 - 수정중
        $('.reply_view .pageing').find('a').bind('click', function(){
            var pageIdx = $(this).data('pageNo');
            if(typeof pageIdx == 'undefined' || pageIdx == '') return;
            main.membership.myComtList(pageIdx);
        });
    },
    
    getComtList : function(pageIdx){
        if(pageIdx == undefined){
            pageIdx = 1;
        }
        
        $(".reply_view").empty();

        param = {
                eplgNo : main.membership.eplgNo, 
                mbrNo : main.membership.mbrNo,    
                pageIdx : pageIdx,
                pagingFlag : 'Y'
        };
            
        common.Ajax.sendRequest("POST"
                , _baseUrl + "main/getMemComtListPagingAjax.do"
                , param
                , main.membership.getMemComtListPagingAjaxCallback
                , false
        );
    },
    
    getMemComtListPagingAjaxCallback : function(res, type, callback){
        if (res.trim() == "") {
            $(".no_data").show();

        } else {
            $(".reply_view").append(res);
            main.membership.bindEvent();
            
        }
    },
    
    /**
     * 2018-02-22 멤버십/쿠폰 개편
     * - 올리브영 멤버십
     */
    getMembershipAjax : function() {
        
        $(document).scrollTop(0);

        var data = new Object();

        // bo에서 미리보기 일때 eplgPreview  값이 존재
        if($("#viewMode").val() != null){
            data.eplgNo = $("#prvEplgNo").val();
            data.viewMode = $("#viewMode").val();
        }
        
        this._ajax.sendRequest(
                "GET"
                , _baseUrl + "main/getMembershipLoungeAjax.do"
                , data
                , this._callback_getMembershipAjax);
        
    },
    
    _callback_getMembershipAjax : function(strData) {
        $("#couponMainHtml").empty();
        $("#couponMainHtml").append(strData);

    },
    
    comtViewPop : function(obj, eplgNo) {
        common.wlog("mem_lounge_eplgcomt_allview");
        main.membership.eplgNo = eplgNo;
        
        common.Ajax.sendRequest("POST"
            , _baseUrl + "main/getMembershipEplgComtView.do?ver=20190826&eplgNo="+eplgNo
            , null
            , function(res) {
                $("#layerWrap680").html(res);
                
                fnLayerTopCustomSet('layerWrap680','open');
                
                // 쿠폰 안내 레이어 팝업 close
                $(".layer_close.type2").on("click", function(e){
                    fnLayerTopCustomSet('layerWrap680', 'close');
                });
                
            }
        );
    },
    
    myComtList : function(pageIdx){
        
        if(pageIdx == undefined){
            pageIdx = 1;
        }
        
        $(".reply_view").empty();
        
        var data = {eplgNo : $("#comtViewForm #eplgNo").val()
                 , comtListType : "MY"
                 , pageIdx : pageIdx
                 , pagingFlag : 'Y'
                };
            
        common.Ajax.sendRequest("POST"
            , _baseUrl + "main/getEplgDetailComtListPagingAjax.do"
            , data
            , main.membership.getEplgDetailComtListPagingAjaxCallback
            , false
        );
    },
    
    getEplgDetailComtListPagingAjaxCallback : function(res, type, callback){
        if (res.trim() == "") {
            $(".no_data").show();

        } else {
            $(".reply_view").append(res);
            main.membership.myComtBindEvent();
        }
    },        
    
    comtDelete : function(eplgNo, eplgComtSeq, mbrNo){
        if(confirm("댓글이 삭제됩니다.")){
            var data = {
                          eplgNo : eplgNo
                        , eplgComtSeq : eplgComtSeq
                        , mbrNo : mbrNo
            };
         
            common.Ajax.sendRequest("POST"
                , _baseUrl + "main/deleteEplgComtAjax.do"
                , data 
                , function(res) {
                    
                    // 에필로그 정보를 가져옴
                    var subjectCont =  $("#comtViewForm .subject").html();
                    
                    if(res.result == "success"){
                        alert(res.message);
                        // 성공후 댓글상세 내용을 다시 호출
                        common.Ajax.sendRequest("POST"
                                , _baseUrl + "main/getMembershipEplgComtView.do?eplgNo="+eplgNo
                                , null
                                , function(res) {
                                    $("#layerWrap680").html(res);
                                    
                                    fnLayerSet('layerWrap680','open');
                                    
                                    // 쿠폰 안내 레이어 팝업 close
                                    $(".layer_close.type2").on("click", function(e){
                                        fnLayerSet('layerWrap680', 'close');
                                    });
                                    
                                    main.membership.eplgComtInit(eplgNo);
                                }
                            );
                    } else if(res.result == "login"){
                        common.loginChk();
                    }else {
                        // 에러
                        alert(res.message);
                    }
                    
                    return;
                }
            );
        } else {
            return false;
        }
    },
    
    
    comtWritePop : function(obj, eplgNo) {
        common.wlog("mem_lounge_eplgcomt_write");
        common.Ajax.sendRequest("POST"
            , _baseUrl + "main/getMembershipEplgComtWrite.do?eplgNo="+eplgNo
            , null
            , function(res) {
                $("#layerWrap850").html(res);
                
                fnLayerSet('layerWrap850','open');
                
                // 쿠폰 안내 레이어 팝업 close
                $(".layer_close.type2").on("click", function(e){
                    fnLayerSet('layerWrap850', 'close');
                });
                
            }
        );
    },
    
    comtSave : function() { 
        var popEplgNo = $("#comtWriteForm > #eplgNo").val();
        var popComtCont = $("textarea[name=comtCont]").val();
        
        var contChk = popComtCont.trim();
        
        if(contChk == "" || contChk == null){
            alert("내용을 입력해 주세요.");
            return false;
        }
        main.membership.comtWriteSave(popEplgNo, popComtCont);
    },
    
    doubleClickCheck : function(){
        if(main.membership.comtSaveChk){
            return main.membership.comtSaveChk;
        }else{
            main.membership.comtSaveChk = false;
            return false;
        }
    },
    
    comtWriteSave : function(eplgNo, comtCont){

        if(main.membership.doubleClickCheck()){
            main.membership.comtSaveChk = false;

            var url = _baseUrl+"main/saveEplgComtWriteAjax.do"
            var data = {
                    eplgNo : eplgNo
                    ,comtCont : comtCont
            };
            
            common.Ajax.sendRequest("POST", url, data, main.membership.comtWriteSaveCallback);
        }

    },
    comtWriteSaveCallback : function(res){
       // 금칙어에 걸리는경우
       if(res.result == "bw"){
           //alert("[" + res.resultMsg + "] (은)는 금칙어로 입력이 제한됩니다.");
           alert("작성하신 댓글에 욕설 및 비속어가\n포함되어 있습니다. 확인 후 다시\n작성 부탁드립니다.");
           main.membership.comtSaveChk = true;
       } else if(res.result == "disp"){
           alert("전시기간이 종료된 에필로그 입니다. 다음 기회에 댓글을 작성 해주세요.");
           main.membership.comtSaveChk = true;
           document.location.reload();
       } else if(res.result == "success"){
            alert(res.message);

            main.membership.comtSaveChk = true;
            main.membership.eplgComtInit(res.eplgNo);

            fnLayerSet('layerWrap850', 'close');

        } else if(res.result == "login"){
            main.membership.comtSaveChk = true;
            common.loginChk();
        }else {
            // 에러
            alert(res.result.message);
            main.membership.comtSaveChk = true;
        }
    },
    
    eplgComtInit : function(eplgNo){

        var data = {eplgNo : eplgNo
                 , comtListType : "ALL"
                };

        common.Ajax.sendRequest("POST"
                , _baseUrl + "main/getEplgDetailComtListAjax.do"
                , data
                , function(res) {
                    var comtHtml = "";
                    var result = res.eplgComtList;
                    

                    if(result != null){

                        var resultLength = result.length;
                        
                        $("."+eplgNo).empty();

                        if(resultLength == 1){
                            comtHtml += "<li>";
                            if( (result[0].profileImg != null && result[0].profileImg != "") && result[0].profileOpenYn == "Y"){
                                comtHtml += "    <div class='thum'>";
                                comtHtml += "        <span class='bg'></span>";
                                comtHtml += "        <img src='"+_profileImgUploadUrl+result[0].profileImg+"' alt=''>";
                                comtHtml += "    </div>";
                                
                            }else{
                                comtHtml += "    <div class='thum'>";
                                comtHtml += "        <span class='bg'></span>";
                                comtHtml += "        <img src='"+_imgUrl+"comm/my_picture_base.jpg' alt=''>";
                                comtHtml += "    </div>";
                            }
                            
                            if( result[0].mbrNickNm != null && result[0].mbrNickNm != "" ){
                                comtHtml += "    <dl class='txt'>";
                                comtHtml += "        <dt>"+result[0].mbrNickNm+"</dt>";
                                comtHtml += "        <dd>"+result[0].comtCont+"</dd>";
                                comtHtml += "    </dl>";
                                comtHtml += "</li>";
                                
                            }else{
                                comtHtml += "    <dl class='txt'>";
                                comtHtml += "        <dt>"+result[0].userId+"</dt>";
                                comtHtml += "        <dd>"+result[0].comtCont+"</dd>";
                                comtHtml += "    </dl>";
                                comtHtml += "</li>";
                            }
                            
                        } else if(resultLength > 0){
                            for (var i = 0; i < 2; i++) {
                                comtHtml += "<li>";
                                if( (result[i].profileImg != null && result[i].profileImg != "") && result[i].profileOpenYn == "Y"){
                                    comtHtml += "    <div class='thum'>";
                                    comtHtml += "        <span class='bg'></span>";
                                    comtHtml += "        <img src='"+_profileImgUploadUrl+result[i].profileImg+"' alt=''>";
                                    comtHtml += "    </div>";
                                    
                                }else{
                                    comtHtml += "    <div class='thum'>";
                                    comtHtml += "        <span class='bg'></span>";
                                    comtHtml += "        <img src='"+_imgUrl+"comm/my_picture_base.jpg' alt=''>";
                                    comtHtml += "    </div>";
                                }
                                
                                if( result[i].mbrNickNm != null && result[i].mbrNickNm != "" ){
                                    comtHtml += "    <dl class='txt'>";
                                    comtHtml += "        <dt>"+result[i].mbrNickNm+"</dt>";
                                    comtHtml += "        <dd>"+result[i].comtCont+"</dd>";
                                    comtHtml += "    </dl>";
                                    comtHtml += "</li>";
                                    
                                }else{
                                    comtHtml += "    <dl class='txt'>";
                                    comtHtml += "        <dt>"+result[i].userId+"</dt>";
                                    comtHtml += "        <dd>"+result[i].comtCont+"</dd>";
                                    comtHtml += "    </dl>";
                                    comtHtml += "</li>";
                                }
                            }
                        }
                        
                        $("."+eplgNo).append(comtHtml);
                    }
                }
            );
    },
    
    eventListClick : function(evtNo, urlInfo, evtSeq){
        
        if(!common.isEmpty(evtSeq)){
            if(evtSeq == '1'){
                common.wlog("mem_lounge_evt1");
            }else if(evtSeq == '2'){
                common.wlog("mem_lounge_evt2");
            }else if(evtSeq == '3'){
                common.wlog("mem_lounge_evt3");
            }else if(evtSeq == '4'){
                common.wlog("mem_lounge_evt4");
            }else if(evtSeq == '5'){
                common.wlog("mem_lounge_evt5");
            }
        }
        
        if(!common.isEmpty(urlInfo)){
            common.link.commonMoveUrl(urlInfo);
        }else{
            common.link.moveEventDetailPage(evtNo);
        }
    },

};


$.namespace("main.membershipCpn");
main.membershipCpn = {
    
    _ajax : common.Ajax,
    /* cjOne, olive 마지막 리스트 여부 */
    lastYn : "N",
    cjLastYn : "N",

    /*  쿠폰 카운트  */
    failCount : 0,
    succeseCount : 0,
    otherCount : 0,
    msgStr : "",
    //임직원 여부
    staffYn : "",

    init : function() {
        
         // 쿠폰 안내 레이어 팝업 open
        $(".posR").on("click", function(e){
            $("#layer_pop_wrap").html($("#couponDescInfoLPop").html());
            
            fnLayerSet('layer_pop_wrap', 'open');
            
            // 쿠폰 안내 레이어 팝업 close
            $(".ButtonClose").on("click", function(e){
                fnLayerSet('layer_pop_wrap', 'close');
            });
        });

        $(".coupon_list .bg").on('click', function(e){
            e.preventDefault();
            if(common.isLogin() == false){

               if(!confirm("로그인 후 나의 등급과 다운로드 가능한 쿠폰을 확인하세요. 로그인 페이지로 이동하시겠습니까?")){
                   return ;
               }else{
                   common.loginChk();
                   return ;
               }
           }
                main.membershipCpn.downCouponJson($(this));
        });

         $(".cpnAllDown .btnCpDown").on('click', function(e){
            e.preventDefault();
            if(common.isLogin() == false){

                 if(!confirm("로그인 후 나의 등급과 다운로드 가능한 쿠폰을 확인하세요. 로그인 페이지로 이동하시겠습니까?")){
                     return ;
                 }else{
                     common.loginChk();
                     return ;
                 }
             }
             common.wlog("mem_lounge_cpn_alldown");
             main.membershipCpn.allDownCouponEncJson();
         });

         if(sessionStorage.getItem("cpnDownloaded") == "Y"){
             main.membershipCpn.setFixedArea();
         }


         $(".btnGray2.cpnZone").on('click', function(e){
             e.preventDefault();

             setTimeout(function() {
                 common.wlog("membership_coupon_list");
                 $("#membership").removeClass("on");
                 $("#coupon").addClass("on");

                 main.coupon.getCouponAjax();
             }, 300);

          });
    },

    downCouponJson : function(obj) {
        /*멤버십라운지 단일 쿠폰 다운로드*/
        var cpnCd = obj.parents('li').data("cpnCd");
        var cjCpnNo = obj.parents('li').data("cjCpnNo");
        var expireSDate = obj.parents('li').data("expireSDate");
        var expireEDate = obj.parents('li').data("expireEDate");
        
        var cpnNo = obj.find("input[name*=cpnNo]").val();
        
        var param = {    cpnNo        : cpnNo
                        ,certCpnNo    : cpnCd
                        ,cjOneCpnNo   : cjCpnNo
                        ,useStrtDtime : expireSDate
                        ,useEndDtime  : expireEDate};
        
       this._ajax.sendRequest(
                "GET"
                , _baseUrl + "main/downCouponEncJson.do"
                , param
                , this._callback_downCouponJson);

    },

    _callback_downCouponJson : function(strData) {
        if(strData.ret == '-1'){            
            common.loginChk();
        }else{
            alert(strData.message);
            sessionStorage.setItem('cpnDownloaded', 'Y');
            common.link.moveMembershipLounge();
        }
    },
    
    setFixedArea : function(){
        setTimeout(function(){
              var tabPos = $("#cpnAnchor").position();
              window.scroll(0, tabPos.top);
         }, 500);
      
      sessionStorage.removeItem("cpnDownloaded");
    },
    
    allDownCouponEncJson : function() {
        /*멤버십라운지 전체 쿠폰 다운로드*/
        //gVariable 초기화
        main.membershipCpn.failCount = 0;
        main.membershipCpn.succeseCount = 0;
        main.membershipCpn.otherCount = 0;
        main.membershipCpn.msgStr = "";
        
        //올리브영쿠폰리스트 사이즈
        var oliveCpnLength = $("input[name*=cpnNoArr]").length;
        //cjOne쿠폰리스트 사이즈
        var cpnCdLength = $("input[name*=cpnCd]").length;
        
        $("input[name*=cpnCd]").each(function(index, item){
            var cpnCdArr = { 
                             certCpnNo    : $(item).val() 
                            ,cjOneCpnNo   : $("#cjCpnNo_"+index).val()
                            ,useStrtDtime : $("#dataExpireSdate_"+index).val()
                            ,useEndDtime  : $("#dataExpireEdate_"+index).val()
                            };
             $.ajax({
                 type: "GET",
                 url: _baseUrl + "main/downCouponEncJson.do",
                 data: cpnCdArr,
                 dataType : 'json',
                 async: false,
                 cache: false,
                 success: function(data) {
                   if (index === cpnCdLength-1) {
                      if(oliveCpnLength == null || oliveCpnLength == 0){
                          main.membershipCpn.cjLastYn = "Y";
                      }else {
                          main.membershipCpn.cjLastYn = "N";
                      }
                   }else{
                      main.membershipCpn.cjLastYn = "N";
                   }
                     main.membershipCpn._callback_allDownCouponEncJson(data);
                 },
                 complete: function(data){
                     if( main.membershipCpn.cjLastYn == "Y"){
                         sessionStorage.setItem('cpnDownloaded', 'Y');
                         common.link.moveMembershipLounge();
                     }
                 },
                 error: function() {
                     main.membershipCpn._callback_allDownCouponEncJson(data);
                     if(main.membershipCpn.lastYn == "Y"){
                         sessionStorage.setItem('cpnDownloaded', 'Y');
                         common.link.moveMembershipLounge();
                     }
                 }
             });
        });
        
        $("input[name=cpnNoArr]").each(function(index, item){
            var param = {cpnNo : $(item).val() };
            $.ajax({
                type: "GET",
                url: _baseUrl + "main/downCouponEncJson.do",
                data: param,
                dataType : 'json',
                async: false,
                cache: false,
                success: function(data) {
                    if (index === oliveCpnLength-1) {
                        main.membershipCpn.lastYn = "Y";
                      }else{
                        main.membershipCpn.lastYn = "N";
                      }
                    main.membershipCpn._callback_allDownCouponEncJson(data);
                },
                complete: function(data){
                    if(main.membershipCpn.lastYn == "Y"){
                        sessionStorage.setItem('cpnDownloaded', 'Y');
                        common.link.moveMembershipLounge();
                    }
                },
                error: function() {
                    main.membershipCpn._callback_allDownCouponEncJson(data);
                    if(main.membershipCpn.lastYn == "Y"){
                        sessionStorage.setItem('cpnDownloaded', 'Y');
                        common.link.moveMembershipLounge();
                    }
                }
            });
        });
    },

    _callback_allDownCouponEncJson : function(strData) {
        //throw exception으로 나오는 메시지에서 임직원을 고름. 
        if(strData.succeeded  ==  false){
            main.membershipCpn.failCount++;
            //main.membershipCpn.msgStr += "\n>>>"+strData.message;
        }else if(strData.ret == 0){
            main.membershipCpn.succeseCount++;
        }else{
            main.membershipCpn.otherCount++;
        }
        
        if(main.membershipCpn.lastYn == "Y" || main.membershipCpn.cjLastYn == "Y"){
            
            //common.hideLoadingLayer();
            if(main.membershipCpn.succeseCount == 0){
                if(main.membershipCpn.staffYn == "Y" ){
                    //임직원이면서 staffDscntSctCd 코드가 20    
                    /*alert("현재 임직원이 다운로드 가능한 쿠폰이 없습니다.");*/
                    /*alert("현재 임직원이 받을 수 있는 쿠폰이 없습니다.");*/
                    alert("고객님, 현재 받을 수 있는 쿠폰이 없어요. \n쿠폰/혜택 에서 더 많은 혜택을 확인해 보세요.");
                    return false;
                }else{
                    //임직원이 아니면서 staffDscntSctCd 코드가 30
                    /*alert("현재 받을 수 있는 쿠폰이 없습니다.");*/
                    alert("고객님, 현재 받을 수 있는 쿠폰이 없어요. \n쿠폰/혜택 에서 더 많은 혜택을 확인해 보세요.");
                    return false;
                }
            }
            alert(main.membershipCpn.failCount + main.membershipCpn.succeseCount + main.membershipCpn.otherCount
                    + "개의 쿠폰 중 " + main.membershipCpn.succeseCount + "개의 쿠폰이 발급되었습니다. \n등록된 쿠폰은 '마이페이지 > 쿠폰'에서 확인 가능합니다.");
        }
    }

};
