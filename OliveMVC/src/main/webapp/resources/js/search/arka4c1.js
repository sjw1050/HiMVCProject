var g_oConvert = "fw";							// 정방향, 역방향 값
var isArk = true;								// 자동완성 기능 사용 여부
var isKeydown = false;							// 브라우저가 파이어폭스, 오페라일 경우 keydown 사용 여부
var isListShow = true;
var cursorPos = -1;								// 자동완성 커서 위치 값
var formName = "#search";						// 검색 form의 name을 설정한다.
var queryId = "#query";							// 검색어 <input> 의 id을 설정한다
var arkId = "#ark";								// 자동완성 전체 <div> 의 id을 설정한다
var wrapId = "ark_wrap";						// 자동완성 결과 <div> 의 id을 설정한다
var footerId = "ark_footer";					// 자동완성 Footer <div> 의 id을 설정한다
var contentListId = "ark_content_list";			// 자동완성 Content List <li> 의 id을 설정한다
var imgDownId = "ark_img_down";					// 자동완성 down 이미지 id을 설정한다
var imgUpId = "ark_img_up";						// 자동완성 up 이미지 id을 설정한다
var arkUpId = "ark_up";							// 자동완성 up 이미지 <div> 의 id을 설정한다
var arkDownId = "ark_down";						// 자동완성 down 이미지 <div> 의 id을 설정한다
var totalFwCount = 0;							// 전방 검색 전체 개수
var totalRwCount = 0;							// 후방 검색 전체 개수
var target = "";								// ARK 웹서버 설정파일의 목록에 있는 추천어 서비스 대상을 지정한다.
var charset = "utf-8";							// 인코딩 설정 (인코딩이 utf-8이 아닐 경우 8859_1 로 설정해야함)
var datatype = "json";							// 반환받을 Data의 타입을 설정. XML 과 JSON이 가능 (xml | json)
var arkPath = "./ark";							// 자동완성 경로
var transURL = _baseUrl + "search/getArkAjax.do";		// trans 페이지의 URL을 설정한다.
var tempQuery = "";
var cc =true;
/**
 *  ARK 구성요소의 위치 및 크기를 아래 변수를 통해 조정함.
 */
var browser = "";
if ($.browser.msie) {
	browser = "IE";
} else if ($.browser.mozilla) {
	browser = "FF";
} else if ($.browser.opera) {
	browser = "OPERA";
} else if ($.browser.webkit) {
	browser = "CHROME";
}
var browserVersion = $.browser.version;			// 웹브라우져의 버전
var offset = null;
var offsetTop = 0;
var offsetLeft = 0;

/** ARK 구성요소의 위치 및 크기를 아래 변수를 통해 조정함. **/
var IE6_TOP_OFFSET = -36;				// IE6 일 경우 TOP 옵셋 값 오차 조정
var IE6_LEFT_OFFSET = 20;				// IE6 일 경우 LEFT 옵셋 값 오차 조정
var IE7_TOP_OFFSET = -60;				// IE7 일 경우 TOP 옵셋 값 오차 조정
var IE7_LEFT_OFFSET = -18;				// IE7 일 경우 LEFT 옵셋 값 오차 조정
var IE8_TOP_OFFSET = 0;					// IE8 일 경우 TOP 옵셋 값 오차 조정
var IE8_LEFT_OFFSET = 0;				// IE8 일 경우 LEFT 옵셋 값 오차 조정
var FF_TOP_OFFSET = 0;
var FF_LEFT_OFFSET = 0;
var CHROME_TOP_OFFSET = 0;
var CHROME_LEFT_OFFSET = 0;
var OPERA_TOP_OFFSET = 0;
var OPERA_LEFT_OFFSET = 0;

/** ARK 구성요소의 위치 및 크기를 아래 변수를 통해 조정함. **/
var arkWidth = 37;								// 자동완성 전체 넓이 값을 설정한다(변동폭).
var arkTop = 29;								// 자동완성 상단에서의 위치 값을 설정한다.
var arkLeft = -3;								// 자동완성 왼쪽에서의 위치 값을 설정한다.
var arkImgTop = 26;								// 자동완성 화살표 이미지의 상단에서 위치 값을 설정한다.
var arkImgLeft = 26;							// 자동완성 화살표 이미지의 왼쪽에서 위치 값을 설정한다.
var tooltip01TopPos = 0;						// 자동완성 기능끄기 툴팁의 상단 기준 위치 오차 조정값
var tooltip01LeftPos = -155;					// 자동완성 기능끄기 툴팁의 좌측 기준 위치 오차 조정값

var keyFix = new beta.fix('query');

let previousKeyword = "";

var broswer = {}; 
//브라우저의 종류 확인
broswer.getBroswerName = function() {
    //userAgent값을 모두 소문자로 변환하여 변수에 대입
    var agt = navigator.userAgent.toLowerCase();
    
    if(agt.indexOf("chrome") != -1) {
        return 'Chrome';
    }
    else if(agt.indexOf("opera") != -1) {
        return 'Opera';
    }
    else if(agt.indexOf("firefox") != -1) {
        return 'Firefox';
    }
    else if(agt.indexOf("safari") != -1) {
        return 'Safari';
    }
    else if(agt.indexOf("skipstone") != -1) {
        return 'Skipstone';
    }
    //msie는 Expolrer 11d이전 버전, trident는 Explorer 11버전
    else if(agt.indexOf("msie") != -1 || agt.indexOf("trident") != -1) {
        return 'IE';
    }
    else if(agt.indexOf("netscape") != -1) {
        return 'Netscape';
    }
    else {
        return 'Unknown';
    }
};


$(document).ready(function() {
    // 자동완성 기능 사용 여부 확인 한다.
	if(getCookie("ark")=="off") {
		isArk = false;
		$(queryId).attr("autocomplete","on");
	} else {
		$(queryId).attr("autocomplete","off");
	}

	// 브라우져별 ARK 옵셋 설정
	setArkOffset();

	// 자동완성 <div> 생성
	drawArk();

	// 자동완성 위치 설정
	setArkLocation();

	// 자동완성 넓이 및 높이 설정
	setArkSize();

	let timeout = null;
	$(queryId).keyup(function(event) {
		clearTimeout(timeout);

		timeout = setTimeout(function(){
			let query = $(queryId).val();
			if (query == "") {
				initCompletedLayer();
				return;
			} else {
				$("#ark_w").show();

				$("#searchPop").hide();
				$("#w_pop_cont").hide();

				$("#searchRecent").hide();
				$("#recent_cont").hide();
			}

			if (event.keyCode == 38 || event.keyCode == 40) {
				moveFocusEvent(event);
			} else {
				if ($(event.target).is(queryId)) {
					if (isArk) {
						request_W_ArkJson($(queryId).val());
					}
				}
			}
		},300);
	});

	// 브라우저에서 일어나는 클릭 이벤트를 체크한다.
	$("#query").click(function(event) {
		stopEventBubble(event);
		if ($(event.target).is("#" + imgDownId)) {
			isListShow = false;
			showArk();
			showArkGuide();
			setArkFooter();
		} else if ($(event.target).is("#" + imgUpId)) {
			hideArk();
		} else if ($(event.target).is(queryId)) {
			if (isArk) {
				var query = $(queryId).val();
				if (query != "") {
					if(datatype == "json") {
						request_W_ArkJson($(queryId).val());
					}
					keyword = query;
				}
				isKeydown = true;
			}
		} else if (!$(event.target).is("#" + wrapId)) {
			hideArk();
		}
	});
});

function initCompletedLayer() {
	hideArk();
	$("#ark_w").hide();
	$("#searchRecent").show();
	$("#searchPop").show();

	$("#recent_cont").show();
	$("#w_pop_cont").hide();
	$("#searchRecent").addClass("search_tab tab01 on");
	if($('#mykeyword').find('li').hasClass('no_data')){
		$("#searchPop").show();
		$("#w_pop_cont").show();
		$("#recent_cont").hide();
		$("#searchRecent").removeClass("search_tab tab01 on").addClass("search_tab tab01");
		$("#searchPop").removeClass("search_tab tab02").addClass("search_tab tab02 on");
	}
	$("#ark_brand").hide();
}

/************************************************
 * jQuery Event Bubbling 방지를 위한 함수.
 * @name stopEventBubble
 * @param evt 페이지 이벤트
 ************************************************/
function stopEventBubble(evt) {
	var eventReference = (typeof evt !== "undefined") ? evt : event;
	//alert(eventReference.stopPropagation);

	if(eventReference.stopPropagation) {
		eventReference.stopPropagation();
	} else {
		eventReference.cancelBubble = true;
	}
}

/************************************************
 * 자동완성 키워드 목록 출력을 위한 DIV 생성
 * @name drawArk
 ************************************************/
function drawArk() {
	var str;

	// 자동완성 접기/펼침 이미지 생성
	str = "<div id=\"" + arkDownId + "\" style=\"position:absolute; display:block; cursor:pointer;\"><img id=\"" + imgDownId + "\" src=\"" + arkPath + "/img/arrow_auto.gif\" alt=\"자동완성펼치기\"></div>";
	str += "<div id=\"" + arkUpId + "\" style=\"position:absolute; display:none; cursor:pointer;\"><img id=\"" + imgUpId + "\" src=\"" + arkPath + "/img/arrow_auto2.gif\" alt=\"자동완성접기\" ></div>";
	
	// 툴팁 이미지 생성
	str += "<div id=\"tooltip01\" style=\"position:absolute; display:none; cursor:pointer; z-index:999999;\"><img id=\"tooltipIcon01\" src=\"" + arkPath +"/img/tooltip_01.gif\"/></div>";

	// 자동완성 결과 생성
	str += "<div class=\"ark_wrap\" id=\"" + wrapId +"\">";
	str += "	<ul>";
	str += "		<li class=\"ark_content\" >";
	str += "			<ul class=\"fl\" id=\"" + contentListId + "\"></ul>";
	str += "		</li>";
	//str += "		<li class=\"ark_footer\" id=\"" + footerId +"\"></li>";
	str += "	</ul>";
	str += "</div>";

	$(arkId).html(str);
}

/************************************************
 * Browser별로 기준점 Offset 값을 설정
 * @name setArkOffset
 ************************************************/
function setArkOffset() {
	offset = $(queryId).position();
	offsetTop = offset.top;
	offsetLeft = offset.left;

	if (browser == "IE") {
		if (browserVersion == "6.0") {
			offsetTop = offsetTop + IE6_TOP_OFFSET;
			offsetLeft = offsetLeft + IE6_LEFT_OFFSET;
		} else if (browserVersion == "7.0") {
			offsetTop = offsetTop + IE7_TOP_OFFSET;
			offsetLeft = offsetLeft + IE7_LEFT_OFFSET;
			offsetTop = offsetTop - 2;
		} else if (browserVersion == "8.0") {
			offsetTop = offsetTop + IE8_TOP_OFFSET;
			offsetLeft = offsetLeft + IE8_LEFT_OFFSET;
		}
	} else if (browser == "FF") {
		offsetTop = offsetTop + FF_TOP_OFFSET;
		offsetLeft = offsetLeft + FF_LEFT_OFFSET;
	} else if (browser == "CHROME") {
		offsetTop = offsetTop + CHROME_TOP_OFFSET;
		offsetLeft = offsetLeft + CHROME_LEFT_OFFSET;
	} else if (browser == "OPERA") {
		offsetTop = offsetTop + OPERA_TOP_OFFSET;
		offsetLeft = offsetLeft + OPERA_LEFT_OFFSET;
	}
}

/************************************************
 * 자동완성 DIV의 위치 자동설정
 * @name setArkLocation
 ************************************************/
function setArkLocation() {
	var queryWidth = parseInt($(queryId).width());
	var queryHeight = parseInt($(queryId).height());

	// 자동완성 전체 위치 설정
	$(arkId).css({"position" : "relative", "z-index":"999999", "top" : offsetTop + "px", "left" : offsetLeft + "px", "width" : (queryWidth + arkWidth) + "px"});

	// ARK Wrap의 위치 설정
	$("#" + wrapId).css({"position" : "absolute", "top" : arkTop, "left" : arkLeft});

	// 화살표 닫기 이미지 위치 설정
	$("#" + arkUpId).css({"top" : (arkImgTop - queryHeight) + "px"});
	$("#" + arkUpId).css({"left" : ((queryWidth - 10) + arkImgLeft) + "px"});

	// 화살표 열기 이미지 위치 설정
	$("#" + arkDownId).css({"top" : (arkImgTop - queryHeight) + "px"});
	$("#" + arkDownId).css({"left" : ((queryWidth - 10) + arkImgLeft) + "px"});
	
	// 자동완성접기 툴팁 이미지 위치 설정
	$("#tooltip01").css({"top" : (offsetTop + tooltip01TopPos) + "px", "left" : (offsetLeft + queryWidth + tooltip01LeftPos) + "px"});
}

/************************************************
 * 자동완성 DIV의 넓이/높이 자동설정
 * @name setArkSize
 ************************************************/
function setArkSize() {
	var queryWidth = parseInt($(queryId).width());
	$("#" + wrapId).css({"width" : (queryWidth + arkWidth) + "px"}); // 자동완성 넓이 설정
	$("#" + contentListId).css({"width" : (queryWidth + arkWidth) + "px"}); // 자동완성 결과 리스트 넓이 설정
	$("#" + footerId).css({"width" : (queryWidth + arkWidth) + "px"}); // 자동완성 풋터 넓이 설정
}

//모바일 자동완성 생성
function request_W_ArkJson(query) {
	query = query.replace("?","");
	if (query == "") {
		previousKeyword = "";
		initCompletedLayer();
		return;
	} else if ($.trim(previousKeyword) == $.trim(query)) {
		return;
	}

    jQuery.support.cors = true;

    cursorPos = -1;

    $.ajaxSetup({cache:false});
    $.ajax({
    	url: _baseUrl + "search/arkApi.do",
        type: "GET",
        dataType: "json",
		cache:true,         // for http cache
        data: {"convert":g_oConvert, "target":target, "charset":charset, "query":query, "datatype": datatype},
		beforeSend : function (xhr){
			xhr.setRequestHeader("stonUseYn", "Y");
		}, success: function(data) {
			previousKeyword = $.trim(query);
			if ((typeof data) == 'string')
				data = $.parseJSON(data)

			if (data.ark.result.length <= 0 && data.arkBrand.result.items.length <= 0) {
				totalFwCount = 0;
				totalRwCount = 0;

				$("#w_search_box").removeClass("search_box active").addClass("search_box");
				initCompletedLayer();
			} else {
				// 자동완성 > 키워드
				let keywordHtml = "";
				$.each(data.ark.result, function (i, result) {
					var totalCount = parseInt(result.totalcount);
					if (i == 0) {
						totalFwCount = totalCount;
					} else {
						totalRwCount = totalCount;
					}

					if (totalCount > 0 && i == 0) {
						$("#w_search_box").removeClass("search_box").addClass("search_box active");

						//자동완성 결과 리스트
						keywordHtml += "<ul>";

						// 자동완성 리스트 설정
						$.each(result.items, function (num, item) {
							if (i != 0) {
								num = totalFwCount + num;
							}
							let coloredText = "<span>" + (item.keyword === item.keyword.toLowerCase() ? query.toLowerCase() : query.toUpperCase())  + "</span>";
							let replaceVar = item.keyword.replace(new RegExp(query.trim(), "gi"), coloredText);

							keywordHtml += "<li id=\"bg" + num + "\" onclick=\"onClickKeywordSearch('" + item.keyword + "','" + num + "');\" onmouseover=\"onMouseOverKeyword(" + num + ");\"><a href='#' data-attr=\"통합^통합검색_자동완성키워드^" + item.keyword + "\">" + replaceVar + "</a></li>";

						});
						keywordHtml += "</ul>";
					}
				});

				keywordHtml += "<div class='search_set_area'>";
				keywordHtml += "<a href='#' class='sch_close' onclick=\"onClickArkClose();\">닫기</a>";
				keywordHtml += "</div>";

				$("#ark_w").html(keywordHtml);

				// 자동완성 > 브랜드
				if (data.arkBrand.result.items.length > 0) {
					let brandHtml = "";

					// 자동완성 리스트 설정
					if (data.arkBrand.result.totalCount > 0) {
						$("#ark_brand").show();

						$.each(data.arkBrand.result.items, function (num, item) {
							var brandName = item.ONL_BRND_NM_KR;
							var brandImg = (num == 0 && !common.isEmpty(item.IMG_PATH) ? "background-image:url(" + _fileUploadUrl + item.IMG_PATH + ");" : "");
							let coloredText = "<span class='keyword'>" + (brandName === brandName.toLowerCase() ? query.toLowerCase() : query.toUpperCase())  + "</span>";
							let replaceVar = brandName.replace(new RegExp(query.trim(), "gi"), coloredText);

							// 브랜드 최대 2개 노출
							brandHtml += "<a href='#' onclick=\"javascript:common.link.moveBrandShop('" + item.ONL_BRND_CD + "', null, 'Search');\" "
								+ " class='brand_box " + (num == 0 ? "high" : "") + "' "
								+ " data-attr='공통^통합검색_브랜드관바로가기^" + brandName + "' "
								+ " style='" + brandImg + "'>";
							brandHtml += "    <strong>" + replaceVar + "</strong>";
							brandHtml += "    <span>브랜드관 바로가기</span>";
							brandHtml += "</a>";
						});
					}

					$("#ark_brand").html(brandHtml);
				}
			}
		}
    });
}

 

var keyword = "";

/************************************************
 * 브라우저가 FireFox, Opera 일 경우 한글 입력
 * @name eventKeydown
 ************************************************/
function eventKeydown() {
	// 방향키 이동시 메소드 실행을 중지시킨다.
	if(!isKeydown) {
		return;
	}
	if (keyword != $(queryId).val()) {
		keyword = $(queryId).val();
		if (keyword != "" && isArk) {
			if(datatype == "json") {
				request_W_ArkJson($(queryId).val());
			}
		} else {
			hideArk();
		}
	}
	setTimeout("eventKeydown()", 1000);
}


/************************************************
 * 방향키 이벤트 처리
 * @name moveFocusEvent
 * @param event 페이지 이벤트
 ************************************************/
function moveFocusEvent(event) {
	isKeydown = false;	 	
	if (event.keyCode == 38) {
		if (cursorPos==-1 || cursorPos==0) {		     
			cursorPos = 0;
			cc =true;
			$(queryId).val(tempQuery);
			tempQuery = "";
			if($(queryId).val() ==''){			    
			    $("#ark_brand").hide();
			    cursorPos =-1;
			    onMouseOverKeyword(cursorPos);
			}
			 
		} else {
			onMouseOutKeyword(cursorPos);
			cursorPos = cursorPos - 1;
			onMouseOverKeyword(cursorPos);
			$(queryId).val($("#bg" + cursorPos+">a").text());
			 
		} 		 
	} else if (event.keyCode == 40) { 
	    
		if(cursorPos == -1 && cc) {		     
			tempQuery = $(queryId).val(); 
		}
		 
		if ($.browser.mozilla) {
    		if(tempQuery == $(queryId).val()){
    		    cursorPos =-1;
    		    cc =false;
    		    tempQuery =''; 
    		    return;
    		}
		}
		
		if ((totalFwCount) > (cursorPos + 1)) {		
			onMouseOutKeyword(cursorPos);			
	        cursorPos = cursorPos + 1;		  
			onMouseOverKeyword(cursorPos);
			$(queryId).val($("#bg" + cursorPos+">a").text()); 
						
		}
		
	}
	
}

/************************************************
 * MouseOver 일 경우 선택한 배경을 설정
 * @name onMouseOverKeyword
 * @param cursorNum 커서의 위치 인덱스 값
 ************************************************/
function onMouseOverKeyword(cursorNum) {
	clearCursorPos();
	cursorPos = cursorNum;
	$("#bg" + cursorNum).css({"backgroundColor" : "#eeeeee"});
	$("#bg" + cursorNum).css({"cursor" : "pointer"});
}

/************************************************
 * MouseOut 일 경우 설정한 배경을 초기화
 * @name onMouseOutKeyword
 * @param cursorNum 커서의 위치 인덱스 값
 ************************************************/
function onMouseOutKeyword(curSorNum) {
	cursorPos = curSorNum;
	$("#bg" + cursorPos).css({"backgroundColor" : "#ffffff"});
}

/************************************************
 * 커서 위치가 변경될 때마다 선택되지 않은 부분 초기화
 * @name clearCursorPos
 ************************************************/
function clearCursorPos() {
	for(var i=0; i<(totalFwCount); i++){
		$("#bg" + i).css({"backgroundColor" : "#ffffff"});
	}
}

/************************************************
 * 마우스 클릭시 검색을 수행
 * @name onClickKeyword
 * @param cursorPos 커서의 위치
 ************************************************/
function onClickKeyword(cursorPos) {
    $(queryId).val($("#f" + cursorPos).text());
    $(formName).submit();
}

function onClickKeywordSearch(keyword) { 
    var name = 'listnum'; 
    var listnumState = getLocalStorageForName(name);
    var giftYn = common._giftCardCheck(keyword);
    if(listnumState){
        location.href = _baseUrl + "search/getSearchMain.do?query=" + encodeURIComponent(keyword) + "&listnum=" + listnumState+"&giftYn=" + giftYn;
    }else{
        location.href = _baseUrl + "search/getSearchMain.do?query=" + encodeURIComponent(keyword)+"&giftYn=" + giftYn;
    }
}

function onClickKeywordSearch(keyword,id) { 
    var dd = parseInt(id)+1;
    var name = 'listnum';
    var listnumState = getLocalStorageForName(name);
    common.wlog("home_search_popular_"+dd); 
    var giftYn = common._giftCardCheck(keyword);
    if(listnumState){
        location.href = _baseUrl + "search/getSearchMain.do?query=" + encodeURIComponent(keyword) + "&listnum=" + listnumState+"&giftYn=" + giftYn;
    }else{
        location.href = _baseUrl + "search/getSearchMain.do?query=" + encodeURIComponent(keyword)+"&giftYn=" + giftYn;
    }
}

/************************************************
 * 자동완성 상태를 설정
 * @name showArkGuide
 ************************************************/
function showArkGuide() {
	var str = "<li style=\"line-height:145%; font-size:11px;\">";

	if (isArk) {
		str += "현재 검색어 &nbsp;<strong>자동 추천 기능</strong>을 사용하고 있습니다.<br>검색어 입력시 자동으로 관련어를 추천합니다.";
	} else {
		str += "<strong>자동 추천 기능</strong>을 사용해 보세요. <label OnClick=\"setArkOn();\" style=\"cursor:pointer;color:#435fea;text-decoration:underline;\">기능켜기</label><br>검색어 입력시 자동으로 관련어를 추천합니다.";
	}

	str += "</li>";

	$("#" + contentListId).html(str);
}

/************************************************
 * 자동완성 Footer 생성
 * @name setArkFooter
 ************************************************/
function setArkFooter() {
	var str = "";

	if (isArk && $(queryId).val() != "" && (totalFwCount + totalRwCount) > 0 && isListShow) {
		str += "<div class=\"left\" style=\"padding:8px 0 0 5px; color:#888888;\">";

		if (g_oConvert == "fw") {
			str += "<label OnClick=\"onConvert('rw');\" style=\"cursor:pointer;\">끝단어 더보기</label>";
		} else if (g_oConvert == "rw") {
			str += "<label OnClick=\"onConvert('fw');\" style=\"cursor:pointer;\">첫단어 더보기</label>";
		}

		str += "</div>";
	}

	if (isArk) {
		str += "<div class=\"right\" style=\"padding:8px 0 0 0; color:#888888;\">";

		if ($(queryId).val() != "" && isListShow) {
			str += "<label id=\"arkOff\" onmouseover=\"previewShow(event, this,'tooltip02');\" OnClick=\"setArkOff();\" style=\"cursor:pointer;\">기능끄기</label>";
			$("body").append("<span style=\"display:none;\"><div id=\"tooltip02\" style=\"position:absolute;\"><img id=\"tooltipIcon02\" src=\"" + arkPath +"/img/tooltip_02.gif\"/></div></span>");
		} else {
			str += "<label OnClick=\"showArk();\" style=\"cursor:pointer;\">닫기</label>";
			isListShow = true;
		}

		str += "</div>";
	} else {
		str += "<div class=\"right\" style=\"padding:8px 0 0 0; color:#888888;\"><label OnClick=\"showArk();\" style=\"cursor:pointer;\">닫기</label></div>";
	}

	$("#" + footerId).html(str);
}

/************************************************
 * 자동완성 목록을 화면에 보여줌
 * @name showArk
 ************************************************/
function showArk() { 
  if(  $(queryId).val() != ""){
	    $("#" + wrapId).show();
	    $("#" + arkUpId).show();
	    $("#" + arkDownId).hide();
	}
}

/************************************************
 * 자동완성 목록을 화면에서 감춤
 * @name hideArk
 ************************************************/
function hideArk() {
	$("#" + wrapId).hide();
	$("#" + arkUpId).hide();
	$("#" + arkDownId).show();
}

/************************************************
 * 도움말 팝업
 * @name openHelp
 ************************************************/
function openHelp() {
	window.open(arkPath + "/help/help_01.html", "도움말", "height=540,width=768,toolbar=no,menubar=no,scrollbars=yes,resizable=no,location=no,directories=no,status=no");
}

/************************************************
 * 단어 입력 후 정방향/역방향 이미지 버튼 클릭시 이벤트 처리
 * @name onConvert
 * @param convert
 ************************************************/
function onConvert(convert) {
	var query = $(queryId).val();

	if (convert == "fw") {
		g_oConvert = "fw";
	} else {
		g_oConvert = "rw";
	}

	if (datatype == "json") {
		request_W_ArkJson(query);
	}

	return;
}

/************************************************
 * 자동완성 기능 끄기
 * @name setArkOff
 ************************************************/
function setArkOff() {
	$(queryId).attr("autocomplete", "on");
	isArk = false;

	var today = new Date();
	var expire_date = new Date(today.getTime() + 365*60*60*24*1000);
	setCookie("ark", "off", expire_date);
}

/************************************************
 * 자동완성 기능 켜기
 * @name setARkOn
 ************************************************/
function setArkOn() {
	$(queryId).attr("autocomplete", "on");
	isArk = true;

	var today = new Date();
	var expireDate = new Date(today.getTime() - 60*60*24*1000);
	setCookie("ark", "on", expireDate);

	var query = $(queryId).val();
	if (query != "") {
		if(datatype == "json") {
		    request_W_ArkJson(query);
		}
		setArkFooter();
	}
}

/************************************************
 * 쿠키 설정값을 저장
 * @name setCookie
 * @param name 쿠키 항목명
 * @param value 쿠키 항목의 값
 * @param expire 쿠키 만료일자
 ************************************************/
function setCookie(name, value, expire) {
	var expire_date = new Date(expire);
	document.cookie = name + "=" + escape(value) + "; path=/; expires=" + expire_date.toGMTString();
}

/************************************************
 * 쿠키 설정값을 로드
 * @name getCookie
 * @param name 쿠키 항목명
 ************************************************/
function getCookie(name) {
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0) {
			return null;
		}
	} else {
		begin += 2;
	}

	var end = document.cookie.indexOf(";", begin);

	if (end == -1) {
		end = dc.length;
	}

	return unescape(dc.substring(begin + prefix.length, end));
}

var preview = "";
var gobj = "";

function attachEvent_(obj, evt, fuc, useCapture) {
	if (!useCapture) {
		useCapture = false;
	}

	if (obj.addEventListener) {
		// W3C DOM 지원 브라우저
		return obj.addEventListener(evt,fuc,useCapture);
	} else if (obj.attachEvent) {
		// MSDOM 지원 브라우저
		return obj.attachEvent("on"+evt, fuc);
	} else {
		// NN4 나 IE5mac 등 비 호환 브라우저
		MyAttachEvent(obj, evt, fuc);
		obj['on'+evt]=function() { MyFireEvent(obj,evt) };
	}
}

function detachEvent_(obj, evt, fuc, useCapture) {
  if(!useCapture) useCapture=false;
  if(obj.removeEventListener) {
    return obj.removeEventListener(evt,fuc,useCapture);
  } else if(obj.detachEvent) {
    return obj.detachEvent("on"+evt, fuc);
  } else {
    MyDetachEvent(obj, evt, fuc);
    obj['on'+evt]=function() { MyFireEvent(obj,evt) };
  }
}

function MyAttachEvent(obj, evt, fuc) {
  if(!obj.myEvents) obj.myEvents= {};
  if(!obj.myEvents[evt]) obj.myEvents[evt]=[];
  var evts = obj.myEvents[evt];
  evts[evts.length]=fuc;
}

function MyFireEvent(obj, evt) {
  if(!obj.myEvents || !obj.myEvents[evt]) return;
  var evts = obj.myEvents[evt];
  for (var i=0;i<len;i++) {
    len=evts.length;
    evts[i]();
  }
}

function previewShow(e, obj, pv) {
  preview=pv;
  gobj=obj;
  attachEvent_(obj, "mousemove", previewMove, false);
  attachEvent_(obj, "mouseout", previewHide, false);
}

function previewMove(e) {
  var hb = document.getElementById(preview);
  if(hb.parentElement) {
	  hb.parentElement.style.display="block";
  } else {
	  hb.parentNode.style.display="";
  }
  var evt = e ? e : window.event;
  var posx=0;
  var posy=0;

  if (evt.pageX || evt.pageY) { // pageX/Y 표준 검사
    posx = evt.pageX +8;
    posy = evt.pageY +16;
  } else if (evt.clientX || evt.clientY) { //clientX/Y 표준 검사 Opera
    posx = evt.clientX +10;
    posy = evt.clientY +20;
    if (window.event) { // IE 여부 검사
      posx += document.body.scrollLeft - 80;
      posy += document.body.scrollTop;
     }
  }

  hb.style.left = posx + "px";
  hb.style.top = posy + "px";
}

function previewHide() {
  var hb = document.getElementById(preview);
  if(hb.parentElement) hb.parentElement.style.display="none";
  else hb.parentNode.style.display="none";

  detachEvent_(gobj,"mousemove", previewMove, false);
}