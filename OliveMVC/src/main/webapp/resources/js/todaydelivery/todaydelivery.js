var todayDeliveryService = {

  getAjaxObj : function(_method, _url, _data){
    return $.ajax({
      type     : _method
      ,url     : _url
      ,data     : _data
    });
  },

  sendRequest : function(_method, _url, _data, _callback, _async){
    var that = this;
    $.ajax({
      type     : _method
      ,url     : _url
      ,data     : _data
      ,async  : _async
      ,success: function(response){

        that.proceed(response, _callback);
      }
      ,error    : function (jqXHR,error, errorThrown){
        that.error(jqXHR,error, errorThrown);
      }
      ,beforeSend : function (){
        that.before();
      }
      ,complete : function (){
        that.after();
      }
    });
  },

  sendJSONRequest : function(_method, _url, _data, _callback, _async){
    var that = this;
    _async = _async && true;

    $.ajax({
      type     : _method
      ,url     : _url
      ,data     : _data
      ,async  : _async
      ,dataType : "json"
      ,success: function(response){

        that.proceed(response, _callback);
      }
      ,error    : function (jqXHR,error, errorThrown){
        that.error(jqXHR,error, errorThrown);
      }
    });
  },

  /**
   * 순차적으로 여러 개의 ajax 요청을 전송할 때 사용한다.
   * ajax 객체를 생성하기 위해 commerce.admin.common.Ajax.getAjaxObj 메소드를 사용할 수도 있다.
   * 사용 방법은 다음과 같다.
   *
   *  //1. 순차적으로 동작할 ajax 호출을 작성하고 배열에 입력한다.
   *  var ajax1 = $.ajax(_baseUrl + "/board/listJSON.do");
   *    var ajax2 = $.ajax(_baseUrl + "/board/listJSON.do");
   *    var requests = [ajax1, ajax2];
   *
   *  //2. 구현된 callback 메소드를 각각 순서대로 배열에 입력한다.
   *    var callbacks = [commerce.mobile.BoardList._callback_getBoardList, commerce.mobile.BoardList._callback_getBoardList];
   *
   *  //3. commerce.admin.common.Ajax.sendMultipleRequest를 호출한다.
   *    commerce.admin.common.Ajax.sendMultipleRequest(requests, callbacks);
   *
   * @param _requests
   * @param _callbacks
   */
  sendMultipleRequest : function(_requests, _callbacks){
    var that = this;
    $.when.apply(undefined, _requests).done(function(){
      for(var i = 0 ; i < arguments.length ; i ++){
        that.proceed(arguments[i][0], _callbacks[i]);
      }
    });
  },

  /**
   * JSONP 요청을 전송하는 메소드
   *
   * @param _method
   * @param _url
   * @param _data
   * @param _callback
   */
  sendJsonpRequest : function(_method, _url, _data, _callback){
    var that = this;
    $.ajax({
      type     : _method
      ,url     : _url
      ,data     : _data
      ,dataType : "jsonp"
      ,success: function(response){that.proceed(response, _callback, true);}
      ,error    : function (jqXHR,error, errorThrown){that.error(jqXHR,error, errorThrown);}
    });
  },

  proceed : function(response, _callback, isJSONP){
    var that = this;
    var jsonObject;
    try{
      if(isJSONP || typeof response === 'object'){
        jsonObject = response;
      }else{
        jsonObject = $.parseJSON(response);
      }

      if(jsonObject.succeeded === false){
        // errorCode remove
        jsonObject.message = jsonObject.message.replace(/\(([^)]+)\)/gi, '')
        alert(jsonObject.message);
        return;
      }
//            //   JSONResponseEntity 가 아닐 경우
//            if ( jsonObject == "100" ){
//                window.location.href = _baseUrl + "loginForm.do";
//
//                return;
//            }
//
//            //   JSONResponseEntity 일 경우
//            var message = jsonObject.message;
//            if(message != undefined && message != null && message != '' && message != 'null'){
//
//                //    로그인이 필요한 서비스에 로그인이 되어 있지 않다면 로그인 페이지로 이동
//                if ( message == "100" ){
//                    window.location.href = _baseUrl + "loginForm.do";
//
//                    return;
//                }else{
//                    alert(message);
//                }
//            }

      if(_callback != null && _callback != '' && _callback != undefined) {
        _callback(jsonObject);
      }

    }catch(e){
      if(_callback != null && _callback != '' && _callback != undefined) {
        _callback(response);
      }
    }


//        ajax 통신시 전체 데이터에 대해 xss 처리는 side effect가 발생할 수 있으므로 원본 그대로 callback return 처리함.
//        xss 가 필요한 경우에는 해당 ajax callback 처리 시 구문내에서 xss 처리하도록 함.
//        if(response.message){
//            alert(that.decodeXss(response.message));
//        }
//
//        _callback(that.decodeXss(JSON.stringify(response)));

  },

  error: function(xhr, status, error) {
    if(xhr && xhr.responseText){
      try{
        var response = $.parseJSON(xhr.responseText);
        alert(response.message);
      }catch(error){
        console.log(xhr.statusText);
      }
    }else{
//           alert("알수없는 오류가 발생하였습니다.");
    }
    console.log(error);
  },

  before : function(){
    $("#ajax_indicator").show().fadeIn('fast');
  },

  after : function(){
    $("#ajax_indicator").fadeOut();
  },

  getJSON : function(text){
    try{
      if(!text) {
        return false;
      }
      var obj = eval(text);

      // 에러가 발생했다면 "error"라는 key 이름으로 object에 value가 입력되어 있다고 가정한다.
      if(obj.error) {
        alert("비동기 통신에 문제가 생겼습니다. ["+obj.error+"]");

        return;
      }

      if(typeof obj == "object") return obj;
    }
    catch(e){ return false; }
  },

  decodeXss : function (str){
    if(typeof str === 'string' && str != ""){
      if (!isNaN(str)) {
        return str;
      }
      if (str.length < 5) {
        return str;
      }
      var tmp = str;
      tmp = tmp.replaceAll("&#x27;", "'");
      tmp = tmp.replaceAll("&amp;", "&");
      tmp = tmp.replaceAll("&quot;", "\"");
      tmp = tmp.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
      tmp = tmp.replaceAll("&#40;", "(").replaceAll("&#41;", ")");
      tmp = tmp.replaceAll("&#x2F;", "/");
      return tmp;
    }
    else if (typeof str === "object" && str != null) {
      var obj = str;
      if (obj instanceof Array) {
        for (var i=0, len = obj.length; i < len; i++) {
          obj[i] = this.decodeXss(obj[i]);
        }
      } else if(obj instanceof Object) {
        for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) {
            obj[attr] = this.decodeXss(obj[attr]);
          }
        }
      }
      return obj;
    }
    return str;
  },
  constants: {
    ADD_ADDRESS_PAGE_URL: 'todayDelivery/getTodayDeliveryAddressAdder.do',
    ADDRESS_LIST_PAGE_URL: 'todayDelivery/getTodayDeliveryAddressList.do',
  },
  pages: {
    ADD: 'ADD_REGISTER_PAGE'
  },
  data: {
    selectedAddressItem: {
      item: {},
      checked: false
    },
    registerAddress: {},
    formData: [],
    formDataValues: {},
    address: {
      getListFromStorage: function () {
        var addressList = sessionStorage.getItem('todayDeliveryAddressList');
        return !!addressList ? JSON.parse(addressList) : null;
      },
      setListToStorage: function (addressList) {
        sessionStorage.setItem('todayDeliveryAddressList', JSON.stringify(addressList));
      },
      clearAddressList: function () {
        sessionStorage.removeItem('todayDeliveryAddressList');
      }
    }
  },
  init: {
    removeLocalStorage: function () {
      var localTodayDeliveryAddress = localStorage.getItem('todayDeliveryAddressList');
      if (localTodayDeliveryAddress) {
        localStorage.removeItem('todayDeliveryAddressList');
      }
    },
    // 헤더에 표시되는 on/off 상태를 갖는 버튼
    headTodayButtonState: function () {
      this.removeLocalStorage();
      todayDeliveryService.util.isLogin(function (isLoggedIn) {
        if (isLoggedIn) {
          todayDeliveryService.apis.getAddressList(function (response) {
            var addressList = response.todayDeliveryAddressList || []
            var foundBaseDlvp = false;
            for (var i = 0; i < addressList.length; i++) {
              var item = addressList[i];
              if (item.quickYn === 'Y' && item.strNo) {
                foundBaseDlvp = item;
                break;
              }
            }
            if (!foundBaseDlvp) {
              for (var i = 0; i < addressList.length; i++) {
                var item = addressList[i];
                if (item.quickYn === 'Y') {
                  foundBaseDlvp = item;
                  break;
                }
              }
            }
            // 오늘드림 배송지로 지정 되어 있을 경우 아이콘 on 설정
            todayDeliveryService.events.setHeaderIconStatus(foundBaseDlvp)
            todayDeliveryService.events.setHeaderIconTooltip(foundBaseDlvp)
          });
        } else {
          todayDeliveryService.events.setHeaderIconTooltip(null)
        }
      });
    },
    cookie: function () {
      var lgcCookie = common.getCookie('O2O_CHK');
      var checkLgcTodayDeliveryCookie = common.getCookie('O2O_LGC_CHK');
      if (!!lgcCookie && !checkLgcTodayDeliveryCookie) {
        common.setCookie('O2O_LGC_CHK', 'EXIST', todayDeliveryService.util.getAfterDays());
        common.setCookie('O2O_CHK', '', -1);
        console.log('첫번째 O2O_CHK 제거');

        var lgcCookie2 = common.getCookie('O2O_CHK');
        if (!!lgcCookie2) {
          common.setCookie('O2O_CHK', '', -1);
          console.log('두번째 O2O_CHK 제거');
        }
      }
    },
    applyTodayDeliveryDom: function () {
      var headerTodayIconHtml = '<a href="javascript:;" id="tddlvr_header_today_icon" class="mymenu_layer" title="오늘드림 자세히보기 열기/닫기">오늘드림</a>' +
        '     <!-- 배송지 미등록 / 배송주소 출력-->' +
        '     <div class="delivery_box_wrap"></div>' +
        '     <!--// 배송지 미등록 / 배송주소 출력-->' +
        '     <!-- 배송지 설정-->' +
        '     <div class="delivery_addr" style="display:none">' +
        '      <div class="addr_box">' +
        '       <div class="inner box-head">' +
        '        <h3 class="tit01">배송지<span>배송지에 따라 상품 정보가 달라질 수 있습니다.</span></h3>' +
        '        <div class="set-box">' +
        '         <strong>오늘드림 배송 설정 하기</strong>' +
        '         <p>상세 페이지에서 오늘드림 배송으로 선택돼요</p>' +
        '         <div class="toggleInput">' +
        '          <label id="tddlvr_switch" class="switch">' +
        '           <input id="tddlvr_todayDeliveryFlagCheckbox" type="checkbox">' +
        '           <span id="tddlvr_slider" class="slider"></span>' +
        '          </label>' +
        '         </div>' +
        '        </div>' +
        '       </div>' +
        '       <div class="inner box-cont">' +
        '        <div class="addr-list-wrap">' +
        '         <div class="mCustomScrollbar">' +
        // 주소 표시 부분
        '          <ul class="addr-list"></ul>' +
        '         </div>' +
        '        </div>' +
        '       </div>' +
        '       <div id="callRegDeliveryAddressButton" class="add-address-box">' +
        '        <a class="btnTy btn-plus" data-rel="layer" href="#">새 배송지 추가</a>' +
        '       </div>' +
        '      </div>' +
        '     </div>';

      var shippingPopupHtml = '<!-- 배송지 등록 레이어 팝업 -->' +
        '<div class="layer_pop_wrap w850" id="tddlvr_regDelivery" style="z-index:999;">' +
        ' <div class="layer_cont2">' +
        '  <h2 class="layer_title">배송지 등록</h2>' +
        '  <div class="layer_scroll_box">' +
        '   <!-- 배송지/환불계좌 등록 -->' +
        '   <table class="board-write-2s">' +
        '    <caption>배송지/환불계좌 등록</caption>' +
        '    <colgroup>' +
        '     <col style="width:25%;">' +
        '     <col style="width:75%;">' +
        '    </colgroup>' +
        '    <tbody>' +
        '     <tr>' +
        '      <th scope="row"><label for="AddressChoice">배송지명</label></th>' +
        '      <td class="star">' +
        '       <input type="text" id="tddlvr_AddressName" title="배송지를 입력하세요" placeholder="최대 10자" data-required="true" style="width:200px;" maxlength="10">' +
        '       <input type="checkbox" id="tddlvr_baseAddressCheckBox">' +
        '       <label for="BasiceAddress">기본 배송지 설정</label>' +
        '      </td>' +
        '     </tr>' +
        '     <tr>' +
        '      <th scope="row"><label for="Recipient">받는 분</label></th>' +
        '      <td class="star"><input type="text" id="tddlvr_Recipient" title="받는분을 입력하세요" placeholder="최대 10자" data-required="true" style="width:200px;" maxlength="10"></td>' +
        '     </tr>' +
        '     <tr>' +
        '      <th scope="row"><label for="tddlvr_PhoneNumber1">연락처 1</label></th>' +
        '      <td class="star">' +
        '       <select id="tddlvr_PhoneNumber1" title="통신사를 선택하세요" data-required="true" style="width:90px;">' +
        '        <option>010</option>' +
        '        <option>011</option>' +
        '       </select>' +
        '       <span class="desc">-</span>' +
        '       <input id="tddlvr_PhoneNumber2" type="text" maxlength="4" title="휴대전화 번호 가운데 4자리를 입력하세요" data-required="true" style="width:90px;" onKeyup="this.value=this.value.replace(/[^0-9]/g,\'\');">' +
        '       <span class="desc">-</span>' +
        '       <input id="tddlvr_PhoneNumber3" type="text" maxlength="4" title="휴대전화 번호 마지막 4자리를 입력하세요" data-required="true" style="width:90px;" onKeyup="this.value=this.value.replace(/[^0-9]/g,\'\');">' +
        '      </td>' +
        '     </tr>' +
        '     <tr>' +
        '      <th scope="row"><label for="tddlvr_SecondPhoneNumber1">연락처 2</label></th>' +
        '      <td style="padding-left:36px;">' +
        '       <select id="tddlvr_SecondPhoneNumber1" title="통신사를 선택하세요" style="width:90px;">' +
        '        <option>010</option>' +
        '        <option>011</option>' +
        '       </select>' +
        '       <span class="desc">-</span>' +
        '       <input id="tddlvr_SecondPhoneNumber2" type="text" maxlength="4" title="휴대전화 번호 가운데 4자리를 입력하세요" style="width:90px;" onKeyup="this.value=this.value.replace(/[^0-9]/g,\'\');">' +
        '       <span class="desc">-</span>' +
        '       <input id="tddlvr_SecondPhoneNumber3" type="text" maxlength="4" title="휴대전화 번호 마지막 4자리를 입력하세요" style="width:90px;" onKeyup="this.value=this.value.replace(/[^0-9]/g,\'\');">' +
        '      </td>' +
        '     </tr>' +
        '     <tr class="addr">' +
        '      <th scope="row"><label for="">주소</label></th>' +
        '      <td class="star">' +
        '       <input id="tddlvr_postCode" type="text" title="주소를 입력하세요." disabled="disabled" data-required="true" style="width:90px;">' +
        '       <button id="tddlvr_postButton" type="button" class="btnPost">우편번호</button>' +
        '       <!-- 2016-12-28 삭제 <div class="interval"><input type="text" disabled="disabled" title="주소를 입력하세요" style="width:500px;"></div> -->' +
        '       <!-- 신규 삽입 -->' +
        '       <p id="tddlvr_roadDetails" class="road">' +
        '        도로명 : <br>' +
        '        <span class="data">지&nbsp; &nbsp;번 : </span>' +
        '       </p>' +
        '       <!-- //신규 삽입 -->' +
        '       <input id="tddlvr_detailAddress" type="text" title="상세주소를 입력하세요." placeholder="상세주소를 입력하세요." data-required="true" style="width:500px;">' +
        '      </td>' +
        '     </tr>' +
        '    </tbody>' +
        '   </table>' +
        '   <!-- //배송지/환불계좌 등록 -->' +
        '   <!-- 배송 요청사항 -->' +
        '   <div id="tddlvr_pickupHide5" style="overflow:hidden">' +
        '    <div class="title_wrap">' +
        '     <h2 class="sub-title2">배송 요청사항</h2>' +
        '    </div>' +
        '    <table class="tbl_inp_form important">' +
        '     <caption></caption>' +
        '     <colgroup><col style="width:170px"><col style="width:*"></colgroup>' +
        '     <tbody>' +
        // '     <tr>' +
        // '       <th scope="row">배송 메시지</th>' +
        // '      <td>' +
        // '       <select id="tddlvr_mbrMemoCont" class="selH28" title="택배배송 메시지를 선택해주세요." style="width:350px">' +
        // '        <option value="MH">배송메시지를 선택해주세요.</option>' +
        // '        <option value="10">그냥 문 앞에 놓아 주시면 돼요.</option>' +
        // '        <option value="40">직접 받을게요.(부재 시 문앞)</option>' +
        // '        <option value="30">벨을 누르지 말아주세요.</option>' +
        // '        <option value="20">도착 후 전화주시면 직접 받으러 갈게요. </option>' +
        // '         <option value="O2O">직접 입력하기</option>' +
        // '       </select>' +
        // '       <input id="tddlvr_deliveryMessage" type="text" name="tddlvr_deliveryMessage" value="" class="inpH28 mgT6" title="배송메시지를 입력해주세요." style="width:700px; display: none;">' +
        // '      </td>' +
        // '     </tr>' +
        '     <tr type="exist">' +
        '      <th scope="row">공동현관 출입방법</th>' +
        '      <td class="imp_data">' +
        '       <span class="chk_area mgzero"><input type="radio" id="tddlvr_btn_door_manner_temp1" name="tddlvr_o2oVisitTypeSp" disabled data-required="true" value="1"><label for="tddlvr_btn_door_manner_temp1">비밀번호</label></span>' +
        '       <span class="chk_area"><input type="radio" id="tddlvr_btn_door_manner_temp2" name="tddlvr_o2oVisitTypeSp" disabled value="2"><label for="tddlvr_btn_door_manner_temp2">경비실 호출</label></span>' +
        '       <span class="chk_area"><input type="radio" id="tddlvr_btn_door_manner_temp3" name="tddlvr_o2oVisitTypeSp" disabled value="3"><label for="tddlvr_btn_door_manner_temp3">자유출입가능</label></span>' +
        '       <span class="chk_area"><input type="radio" id="tddlvr_btn_door_manner_temp4" name="tddlvr_o2oVisitTypeSp" disabled value="4"><label for="tddlvr_btn_door_manner_temp4">기타사항</label></span>' +
        '      </td>' +
        '     </tr>' +
        '     <tr id="quickAreaValuesRow" type="exist">' +
        '      <th id="tddlvr_radioDescripter" scope="row">공동현관 비밀번호</th>' +
        '      <td class="imp_data">' +
        '       <input type="text" id="tddlvr_quickAreaDesc" name="tddlvr_o2oVisitTypeDesc" value="" class="inpH28" title="공동현관 출입방법 상세내용을 입력하세요." disabled data-required="true" maxlength="20" style="width: 500px">' +
        '      </td>' +
        '     </tr>' +
        // '     <tr type="exist">' +
        // '      <th scope="row">배송완료 메시지 전송시점</th>' +
        // '      <td class="imp_data">' +
        // '       <span class="chk_area mgzero"><input type="radio" id="tddlvr_btn_dlvp_complete_msg_temp1" name="tddlvr_o2oMsgSendType" value="Y" data-required="true" checked=""><label for="tddlvr_btn_dlvp_complete_msg_temp1">배송 직후</label></span>' +
        // '       <span class="chk_area"><input type="radio" id="tddlvr_btn_dlvp_complete_msg_temp2" name="tddlvr_o2oMsgSendType" value="N" ><label for="tddlvr_btn_dlvp_complete_msg_temp2">없음</label></span>' +
        // '      </td>' +
        // '     </tr>' +
        '     </tbody>' +
        '    </table>' +
        '    </div>' +
        '   <!--// 배송 요청사항-->' +
        '   <div class="usage-guide">' +
        '    <p class="ptit">개인정보수집·이용 안내</p>' +
        '    <ul>' +
        '     <li>개인정보 수집 목적 : 상품구매 시 배송처리</li>' +
        '     <li>개인정보 수집 항목 : 배송지명 , 수령인정보 (받는분 , 연락처 , 주소, 공동현관 출입방법: 비밀번호)</li>' +
        '     <li>보유 및 이용기간 : 정보삭제 또는 회원 탈퇴 시까지</li>' +
        '     <li>확인 버튼을 누르지 않을 경우 배송지 정보가 저장되지 않습니다.</li>' +
        '    </ul>' +
        '   </div>' +
        '   <p class="txt_ct mgT20"><input type="checkbox" id="dlvSaveAgreeCheck">위 개인정보 수집·이용을 확인하고 배송지를 등록합니다.</p>' +
        '   <div class="area1sButton mgT20">' +
        '    <a id="registDeliveryAddressButton" href="#none" class="btnGreen">등록</a>' +
        '    <a id="cancelDeliveryAddressButton" href="#none" class="btnGray">취소</a>' +
        '   </div>' +
        '  </div>' +
        '  <button class="layer_close type2" onclick="todayDeliveryService.popup.regDelivery.close()">창 닫기</button>' +
        ' </div>' +
        '</div>';

      todayDeliveryDom.getHeaderIcon().innerHTML = headerTodayIconHtml
      todayDeliveryDom.getTodayDeliveryPopup().innerHTML = shippingPopupHtml
    },
  },
  util: {
    dom: function (element) {
      if (typeof element !== 'string') {
        console.error('element type is not string.')
        return;
      }
      return document.querySelector(element);
    },
    getAfterDays: function () {
      var time = (new Date()).getTime();
      return new Date(time + 7 * 60 * 60 * 24 * 1000);
    },
    isLogin: function (callback) {
      var url = _baseUrl + "login/loginCheckJson.do";
      $.ajax({
        type: "POST",
        url: url,
        data: null,
        dataType: 'json',
        async: false,
        cache: false,
        success: function (response) {
          var loginSucceed = response.result;
          sessionStorage.setItem("checkLoginStatus", loginSucceed);
          callback && callback(loginSucceed);
        },
        error: function () {
          sessionStorage.removeItem("checkLoginStatus");
          callback && callback(false);
        }
      });
    },
  },
  callBack: {
    _setZipcodeInfo: function (data, pin) {
      var roadAddr = data.roadAddr1 // 도로명 주소
      var jibunAddress = data.jibunAddress || data.autoJibunAddress // 지번 주소
      var postNo = data.postNo // 우편번호

      todayDeliveryService.data.registerAddress = data

      var html = '도로명 : ' + roadAddr + '<br>';
      html += '<span class="data">지&nbsp; &nbsp;번 : ' + jibunAddress + '</span>';

      document.querySelector('#tddlvr_postCode').value = postNo;
      document.querySelector('#tddlvr_roadDetails').innerHTML = html;

      todayDeliveryService.events.setVisibleRadioButtons()
    },
    _callBackTodayDeliveryCheckMark: function (res) {
      if (res !== 'Y') {
        alert('죄송합니다. 고객센터에 문의해 주세요.');
        return false;
      }

      var selectedAddressItem = todayDeliveryService.data.selectedAddressItem;
      var strNo = selectedAddressItem.item.strNo;
      if (!strNo) {
        common.setCookie('TD_ALERT', '일반 배송 지역으로 선택하셨습니다.', 1);
      } else {
        common.setCookie('TD_ALERT', '배송지가 정상적으로 변경 되었습니다.', 1);
      }

      todayDeliveryService.data.address.clearAddressList();

      setTimeout(function () {
        location.reload();
      }, 1300)
      return true;
    }
  },
  apis: {
    getAddressList: function (callbackFunc) {
      var addressList = todayDeliveryService.data.address.getListFromStorage();
      if (addressList) {
        callbackFunc({todayDeliveryAddressList: addressList});
        return;
      }
      var url = _baseUrl + "todayDelivery/getUserAddressList.do";
      todayDeliveryService.sendJSONRequest("GET", url, {}, function (response) {
        todayDeliveryService.data.address.setListToStorage(response.todayDeliveryAddressList);
        callbackFunc(response);
      });
    }
  },
  parsing: {
    getText: function (value, text) {
      if (typeof value === 'string') {
        return !!value ? value : '';
      }
      if (typeof value === 'boolean') {
        return !!value ? text : '';
      }
      return '';
    },
    generateAddressItemsToHtml: function (addressList) {
      var html = '';
      for (var i = 0; i < addressList.length; i++) {
        var item = addressList[i];
        var addressName = item.dlvpNm || '주소지명이 없습니다.';
        var address = item.stnmRmitPostAddr || '주소가 없습니다.';
        var deliveryIcon = !!item.strNo ? ' getYN' : '';
        var shippingBase = item.baseDlvpYn === 'Y';
        var checked = item.quickYn === 'Y' ? ' checked' : '';
        var hasStopReason = !!item.stopReason;
        var isO2oOnlYn = item.o2oOnlYn === 'N';
        if (isO2oOnlYn && hasStopReason) {
          html += '<li class="disabled">';
        } else if (checked) {
          html += '<li class="' + checked + '">';
        } else {
          html += '<li>';
        }
        var strNo = item.strNo || '';
        var mbrDlvpSeq = item.mbrDlvpSeq || '';
        html += '<a onclick="todayDeliveryService.events.setCheckMarkerToAddressList(this, \'' + strNo + '\', \'' + mbrDlvpSeq + '\')">';
        html += '  <div class="tit-wrap">';
        html += '    <strong class="tit02">' + addressName + '</strong>';
        if (shippingBase) {
          html += '    <span class="flag color-basic">기본 배송지</span>';
        }
        if (deliveryIcon) {
          html += '    <span class="' + deliveryIcon + '"><i class="icon_delivery"></i>오늘드림 가능</span>';
        }
        html += '  </div>';
        html += '  <p>' + address + '</p>';
        if (hasStopReason) {
          html += '<strong class="txt-red"><i class="ntc"></i>' + item.stopReason + '</strong>';
        }
        // else if (!hasStopReason && !checked) {
        //   html += '    <p class="warnning">일반 배송 지역 입니다.</p>';
        // }
        html += '</a>';
        html += '</li>';
      }
      return html;
    }
  },
  popup: {
    action: {
      setSelectedAddressItem: function (addressList) {
        for (var i = 0; i < addressList.length; i++) {
          var addressItem = addressList[i];
          if (addressItem.quickYn === 'Y') {
            todayDeliveryService.data.selectedAddressItem = {
              item: addressItem,
              checked: true
            }
            return;
          }
        }
        todayDeliveryService.data.selectedAddressItem = {
          item: null,
          checked: false
        }
      }
    },
    open: function () {
      todayDeliveryService.apis.getAddressList(function (response) {
        if ($('.delivery_addr').css('display') == 'none') {
          $('.delivery_addr').show();
        }

        var todayDeliveryAddressList = response.todayDeliveryAddressList;
        if (!todayDeliveryAddressList || !todayDeliveryAddressList.length) {
          return;
        }

        var quickYn = common.getCookie("O2O_CHK");
        $('#tddlvr_todayDeliveryFlagCheckbox').prop('checked', !common.isEmpty(quickYn) && quickYn === "Y");

        todayDeliveryService.popup.action.setSelectedAddressItem(todayDeliveryAddressList);
        $('.addr-list').html(todayDeliveryService.parsing.generateAddressItemsToHtml(todayDeliveryAddressList));
      });
    },
    regDelivery: {
      open: function () {
        common.zipcodequick.pop.quickYn = 'Y';
        fnLayerSet("tddlvr_regDelivery", "open");
      },
      close: function () {
        common.zipcodequick.pop.quickYn = 'N';
        fnLayerSet("tddlvr_regDelivery", "close", "N");
      }
    }
  },
  events: {
    message: function () {
      var tdAlert = common.getCookie('TD_ALERT');
      if (tdAlert) {
        alert(tdAlert);
        common.setCookie('TD_ALERT', '', -1);
      }
    },
    bindEvent: function () {
      $("#tddlvr_header_today_icon").bind("click", function () {
        $('.delivery_box_wrap').hide();
        todayDeliveryService.util.isLogin(function (isLoggedIn) {
          if (isLoggedIn) {
            // 고객 배송지 목록 조회 팝업 콜
            todayDeliveryService.popup.open();
          } else {
            if (confirm("해당 서비스는 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
              common.link.moveLoginPage();
            }
          }
        });
      });

      $(".mCustomScrollbar").mCustomScrollbar(); // 배송지설정 스크롤바

      $('.delivery .mymenu_layer').hover(function () {
        $('.delivery_box_wrap').show();
      }, function () {
        $('.delivery_box_wrap').hide();
      });

      $('.delivery_addr').mouseleave(function () {
        $(this).hide();
      });

      $('.addr-list-wrap .addr-list li').click(function () { // 기본배송지 설정
        if (!($(this).hasClass('checked')) && !($(this).hasClass('disabled'))) {
          $(this).addClass('checked');
          $(this).siblings().removeClass('checked').find('.flag').remove();
          $(this).find('.tit02').after('<span class="flag color-basic">기본 배송지</span>');
        }
      });

      var checkbox = document.querySelector('#tddlvr_todayDeliveryFlagCheckbox');
      checkbox.addEventListener('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
      });

      $("#tddlvr_switch #tddlvr_slider").click(function (e) {
        var checkbox = document.querySelector('#tddlvr_todayDeliveryFlagCheckbox');
        var selectedAddressItem = todayDeliveryService.data.selectedAddressItem;
        var strNo = selectedAddressItem.item.strNo;
        if (!checkbox.defaultChecked && !strNo) {
          alert('오늘드림 배송지를 설정시에만 ON 처리 가능합니다.');
          return;
        }

        var isChecked = checkbox.defaultChecked;
        if (isChecked) {
          common.setCookie("O2O_CHK", "N", todayDeliveryService.util.getAfterDays());
          checkbox.removeAttribute("checked");
          todayDeliveryService.data.selectedAddressItem.checked = false;
          $('.toggleInput input').prop('checked', false);
        } else {
          checkbox.setAttribute("checked", "checked");
          common.setCookie("O2O_CHK", "Y", todayDeliveryService.util.getAfterDays());
          todayDeliveryService.data.selectedAddressItem.checked = true;
          $('.toggleInput input').prop('checked', true);
        }

        // 상세에서 토글 변경 시 새로고침
        if (location.href.indexOf('getGoodsDetail') > -1) {
          setTimeout(function () {
            location.reload();
          }, 1300);
        }
      });

      $('#callRegDeliveryAddressButton').click(function () {
        todayDeliveryDom.initAllInputItems();
        todayDeliveryService.popup.regDelivery.open();
      });

      // 비밀번호 라디오 버튼
      $('#tddlvr_btn_door_manner_temp1').click(function () {
        $('#quickAreaValuesRow').show().find('input').attr('title', '공동현관 비밀번호를 입력하세요.');
        todayDeliveryDom.getRadioDescripter().textContent = '공동현관 비밀번호';
      });

      // 경비실 호출 라디오 버튼
      $('#tddlvr_btn_door_manner_temp2').click(function () {
        $('#quickAreaValuesRow').show().find('input').attr('title', '경비실 호출 방법을 입력하세요.');
        todayDeliveryDom.getRadioDescripter().textContent = '경비실 호출 방법';
      });

      // 자유출입가능 라디오 버튼
      $('#tddlvr_btn_door_manner_temp3').click(function () {
        todayDeliveryDom.getRadioDescripter().textContent = '';
        $('#quickAreaValuesRow').hide();
      });

      // 기타사항 라디오 버튼
      $('#tddlvr_btn_door_manner_temp4').click(function () {
        $('#quickAreaValuesRow').show().find('input').attr('title', '기타 상세 내용을 입력하세요.');
        todayDeliveryDom.getRadioDescripter().textContent = '기타 상세 내용';
      });

      $('#registDeliveryAddressButton').click(function () {
        todayDeliveryAction.doRegistDeliveryInfo()
      });

      $('#cancelDeliveryAddressButton').click(function () {
        todayDeliveryService.popup.regDelivery.close();
      });

      common.zipcode.pop.init(todayDeliveryService.callBack._setZipcodeInfo, "tddlvr_postButton");
    },
    setHeaderIconStatus: function (deliveryItem) {
      var headerIcon = todayDeliveryDom.getHeaderIcon()
      if (!headerIcon) {
        return;
      }
      if (deliveryItem && !!deliveryItem.strNo && deliveryItem.quickYn === 'Y') {
        headerIcon.classList.add('on');
      } else {
        headerIcon.classList.remove('on');
      }
    },
    setHeaderIconTooltip: function (foundBaseDlvp) {
      var tooltipWrapper = document.querySelector('.delivery_box_wrap');
      var tooltipHtml = '<div class="delivery_box">';
      var condition = foundBaseDlvp && foundBaseDlvp.quickYn === 'Y';
      var addr = foundBaseDlvp && (foundBaseDlvp.stnmRmitPostAddr || foundBaseDlvp.rmitBaseAddr) || '검색된 배송지 정보가 없습니다.';
      if (condition && !!foundBaseDlvp && !!foundBaseDlvp.strNo) {
        tooltipHtml += '<p class="dTxt">' + addr + '</p></div>';
      } else {
        tooltipHtml += '<p class="dTxt">배송지를 등록하고 오늘드림으로 구매 가능한 상품을 확인하세요!</p>';
      }
      tooltipHtml += '</div>';

      tooltipWrapper.innerHTML = tooltipHtml;
      todayDeliveryAction.show(tooltipWrapper);
      // 4초 후 오늘드림 메세지창 숨김
      todayDeliveryAction.hideAfter4Sec();
    },
    setCheckMarkerToAddressList: function (dom, strNo, mbrDlvpSeq) {
      var li = todayDeliveryDom.closest(dom, 'li');
      var liClassList = li.classList;
      var hasDisabled = liClassList.contains('disabled');
      if (!hasDisabled) {
        $('.addr-list li').removeClass("checked");
        liClassList.add('checked');

        $('.toggleInput input').prop('checked', !!strNo);
        todayDeliveryService.popup.action.setSelectedAddressItem([{strNo: strNo, quickYn: 'Y'}]);
        var url = _baseUrl + "goods/registQuickMbrDlvpInfoAjax.do";
        var data = {strNo: strNo, mbrDlvpSeq: mbrDlvpSeq};
        if (!!strNo && !!mbrDlvpSeq) {
          common.setCookie("O2O_CHK", "Y", todayDeliveryService.util.getAfterDays());
        } else {
          common.setCookie("O2O_CHK", "N", todayDeliveryService.util.getAfterDays());
        }
        todayDeliveryService.sendRequest("POST", url, data,
            todayDeliveryService.callBack._callBackTodayDeliveryCheckMark
        );
      }
    },
    setVisibleRadioButtons: function () {
      $('#tddlvr_btn_door_manner_temp1').prop('disabled', false);
      $('#tddlvr_btn_door_manner_temp2').prop('disabled', false);
      $('#tddlvr_btn_door_manner_temp3').prop('disabled', false);
      $('#tddlvr_btn_door_manner_temp4').prop('disabled', false);
      $('#tddlvr_quickAreaDesc').prop('disabled', false);
      $('#tddlvr_door_type_exist').prop('disabled', false);
    }
  }
}

var todayDeliveryDom = {
  closest: function (el, s) {
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
    }

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  },
  getHeaderIcon: function () {
    return document.querySelector('#todayDeliveryContainer');
  },
  getTodayDeliveryPopup: function () {
    return document.querySelector('#todayDeliveryPopup');
  },
  getRadioDescripter: function () {
    return document.querySelector('#tddlvr_radioDescripter');
  },
  initAllInputItems: function () {
    todayDeliveryService.data.formData = [];

    var baseAddressCheckValue = $('.layer_cont2 input[type=checkbox]');
    if (baseAddressCheckValue.length > 0) {
      baseAddressCheckValue[0].defaultChecked = false;
    }

    $('.layer_cont2 input[name="tddlvr_o2oVisitTypeSp"]')
      .each(function (index, item) {
        item.checked = false;
        item.disabled = true;
      });

    var inputTextItems = $('.layer_cont2 input[type=text]');
    for (var i = 0; i < inputTextItems.length; i++) {
      var item = inputTextItems[i];
      item.value = '';
    }

    var inputSelectItems = $('.layer_cont2 select');
    for (var i = 0; i < inputSelectItems.length; i++) {
      var item = inputSelectItems[i];
      item.selectedIndex = 0;
    }

    var html = '도로명 : <br><span class="data">지&nbsp; &nbsp;번 : </span>';
    document.querySelector('#tddlvr_roadDetails').innerHTML = html;

    $('.layer_cont2 input[name="tddlvr_o2oMsgSendType"]')
      .each(function (index, item) {
        item.defaultChecked = false;
      });
  }
}

var todayDeliveryAction = {
  show: function (dom) {
    dom.style.display = 'block';
  },
  hideAfter4Sec: function () {
    var tooltipHideTimeout = setTimeout(function () {
      document.querySelector('.delivery_box_wrap').style.display = 'none';
      clearTimeout(tooltipHideTimeout)
    }, 4000);
  },
  doRegistDeliveryInfo: function () {
    if (todayDeliveryAction.validFormData()) {
      var registAddressInfo = todayDeliveryService.data.registerAddress;

      var formData = todayDeliveryService.data.formData;
      var flatObjFormData = {};
      for (var i = 0; i < formData.length; i++) {
        var data = formData[i];
        var keys = Object.keys(data);
        flatObjFormData[data[keys[0]]] = data[keys[1]];
      }
      todayDeliveryService.data.formDataValues = {
        admrNm: registAddressInfo.admrNm,
        baseDlvpYn: flatObjFormData.tddlvr_baseAddressCheckBox,
        dlvpNm: flatObjFormData.tddlvr_AddressName,
        emdNm: registAddressInfo.emdNm,
        lat: '',
        lng: '',
        mbrDlvpSeq: null,
        o2oMsgSendType: flatObjFormData.tddlvr_o2oMsgSendType,
        o2oVisitSaveInfo: 'Y',
        o2oVisitTypeDesc: flatObjFormData.tddlvr_quickAreaDesc,
        o2oVisitTypeSp: flatObjFormData.tddlvr_o2oVisitTypeSp,
        rmitBaseAddr: registAddressInfo.jibunAddress || registAddressInfo.autoJibunAddress,
        rmitCellEndNo: flatObjFormData.tddlvr_PhoneNumber3,
        rmitCellSctNo: flatObjFormData.tddlvr_PhoneNumber1,
        rmitCellTxnoNo: flatObjFormData.tddlvr_PhoneNumber2,
        rmitDtlAddr: flatObjFormData.tddlvr_detailAddress,
        rmitNm: flatObjFormData.tddlvr_Recipient,
        rmitPostNo: registAddressInfo.postNo,
        rmitTelEndNo: flatObjFormData.tddlvr_SecondPhoneNumber3,
        rmitTelRgnNo: flatObjFormData.tddlvr_SecondPhoneNumber1,
        rmitTelTxnoNo: flatObjFormData.tddlvr_SecondPhoneNumber2,
        stnmRmitDtlAddr: flatObjFormData.tddlvr_detailAddress,
        stnmRmitPostAddr: registAddressInfo.roadAddr1,
        stnmRmitPostNo: registAddressInfo.postNo
      }

      todayDeliveryAction.checkDlvpTotalCount();
    }
  },
  checkDlvpTotalCount: function () {
    todayDeliveryService.sendJSONRequest('GET'
        , _baseUrl + 'mypage/getDlvpTotalCountJSON.do'
        , {}
        , todayDeliveryAction.checkDlvpTotalCountCallBack
        , false
    );
  },
  checkDlvpTotalCountCallBack: function (response) {
    var data = (typeof response !== 'object') ? $.parseJSON(response) : response;
    if (Number(data) >= 20) {
      alert('배송지는 최대 20개까지 등록 가능합니다.');
      return;
    }
    todayDeliveryAction.doRegist();
  },
  doRegist: function () {
    todayDeliveryService.sendJSONRequest('POST'
        , _baseUrl + 'mypage/registDelivery.do'
        , todayDeliveryService.data.formDataValues
        , todayDeliveryAction.doRegistCallBack
        , false
    );
  },
  doRegistCallBack: function (response) {
    var data = (typeof response !== 'object') ? $.parseJSON(response) : response;
    data.succeeded && alert(data.message);

    todayDeliveryService.data.address.clearAddressList();

    // 배송지추가 팝업 종료
    todayDeliveryService.popup.regDelivery.close();
    todayDeliveryService.popup.open();
  },
  validFormData: function () {
    todayDeliveryService.data.formData = [];

    var baseAddressCheckValue = $('.layer_cont2 input[type=checkbox]');
    if (baseAddressCheckValue.length > 0) {
      todayDeliveryService.data.formData.push({
        id: baseAddressCheckValue[0].id,
        value: baseAddressCheckValue[0].checked ? 'Y' : 'N'
      });
    }

    var visitType = {
      value: 0,
      isSelected: false
    };
    $('.layer_cont2 input[name="tddlvr_o2oVisitTypeSp"]')
      .each(function (index, item) {
        if (item.checked) {
          visitType = {
            value: item.value,
            isSelected: true
          }
          todayDeliveryService.data.formData.push({
            id: item.name,
            value: item.value
          });
        }
      });

    var inputTextItems = $('.layer_cont2 input[type=text]:not(#tddlvr_quickAreaDesc)');
    for (var i = 0; i < inputTextItems.length; i++) {
      var item = inputTextItems[i];
      var isRequired = !!item.getAttribute('data-required');
      if (isRequired && item.value === '') {
        alert(item.title);
        item.focus();
        return false;
      }
      todayDeliveryService.data.formData.push({
        id: item.id,
        value: item.value
      });
    }

    var inputSelectItems = $('.layer_cont2 select');
    for (var i = 0; i < inputSelectItems.length; i++) {
      var item = inputSelectItems[i];
      var isRequired = !!item.getAttribute('data-required');
      if (isRequired && !item.value) {
        alert(item.title);
        return false;
      }
      todayDeliveryService.data.formData.push({
        id: item.id,
        value: item.value
      });
    }

    if (!visitType.isSelected) {
      alert('공동현관 출입방법을 선택하세요.');
      return false;
    }

    var $visitTypeDesc = $('.layer_cont2 #tddlvr_quickAreaDesc');
    if (visitType.value !== '3' && $visitTypeDesc.val() === '') {
      alert($visitTypeDesc.attr('title'));
      $visitTypeDesc.focus();
      return false;
    } else {
      todayDeliveryService.data.formData.push({
        id: 'tddlvr_quickAreaDesc',
        value: $visitTypeDesc.val()
      });
    }

    var isMsgSendType = false;
    $('.layer_cont2 input[name="tddlvr_o2oMsgSendType"]')
      .each(function (index, item) {
        if (item.checked) {
          isMsgSendType = true;
          todayDeliveryService.data.formData.push({
            id: item.name,
            value: item.value
          });
        }
      });

    todayDeliveryService.data.formData.push({
      id: 'tddlvr_o2oMsgSendType',
      value: 'Y'
    });

    // if (!isMsgSendType) {
    //   alert('배송완료 메시지 전송시점을 입력하세요.');
    //   return false;
    // }

    var dlvSaveAgreeCheck = $('#dlvSaveAgreeCheck');
    if(dlvSaveAgreeCheck.is(':checked') == false){
    	alert('개인정보 수집·이용에 동의 부탁드립니다.');
    	dlvSaveAgreeCheck.focus();
        return false;
    }

    return true;
  }
}

$(document).ready(function () {
  // todayDeliveryService.init.cookie();
  todayDeliveryService.init.applyTodayDeliveryDom();
  todayDeliveryService.events.bindEvent();
  todayDeliveryService.init.headTodayButtonState();
  todayDeliveryService.events.message();

});
