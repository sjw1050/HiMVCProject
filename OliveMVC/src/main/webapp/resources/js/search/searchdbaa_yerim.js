
//엔터 체크
function pressCheck() {   
    if (event.keyCode == 13) {
    	alert("엔터키눌렀닝?");
        return clickSearch();
    }else{
        return false;
    }
}


//엔터키 눌러서 검색
function pressCheck_WEB_MainSearch(e,a) {   
	  if (e.keyCode == 13) {
	      if($("#query").val()){
//	    	  alert("presscheck_web_mainSearch, query >>> :::: " + $("#query").val());
	    	  location.href = "/search/mainSearch?query=" +  $("#query").val();
	      }else{
	    	  alert("엔터키, 검색어 입력 안됨");
	      }

	  }else{
	      return false;
	  }
	}

//요건 아직 수정 안함
//PC - 메인검색 백스페이스체크
function downCheck_WEB_MainSearch(e) {
	if (e.keyCode === 8)
	    $('#w_search_box').addClass("search_box active");
	}


//돋보기 버튼 클릭해서 검색
$("#searchSubmit").bind("click", function() {
	
//	alert("예리미가 #searchSubmit 클릭함. 검색내용(#query) >>>>>> " + $("#query").val());
    if ($("#query").val() == "" && $("#query").attr("data-ref-linkUrl") == "") {
        //추천검색어 x & 검색어 입력 없을 시
    	return alert("검색어를 입력해주세요.");
    	
    } else if ($("#query").val() == "" && $("#query").attr("data-ref-linkUrl") != "") {
        //추천검색어 o & 검색어 입력 없을 시 -> 추천검색어 링크 처리
    	location.href = $("#query").attr("data-ref-linkUrl");
    	
    } else {
        //검색 결과 처리
        if($("#query").val()){
        	alert("검색어가 잘 들어왔나요? 검색어(#query) >>>>>> " +  $("#query").val());
            location.href = "/search/mainSearch?query=" +  $("#query").val();
        }else{
        	alert("검색결과처리 'else', query >>> :: ");
//            location.href = _baseUrl + "search/getSearchMain.do?onlyOneBrand=&query=" + encodeURIComponent($("#query").val()) + "&giftYn=" + giftYn;
        }
//
    }
    common.wlog("main_search_icon");
});
 


