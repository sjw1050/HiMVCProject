 


//엔터 체크
function pressCheck() {   
    if (event.keyCode == 13) {
    	alert("엔터키눌렀닝?");
        return clickSearch();
    }else{
        return false;
    }
}


// 엔터키 눌러서 검색
function pressCheck_WEB_MainSearch(e,a) {   
	  if (e.keyCode == 13) {
	      if($("#query").val()){
// alert("presscheck_web_mainSearch, query >>> :::: " + $("#query").val());
	    	  location.href = "/search/mainSearch?query=" +  $("#query").val();
	      }else{
	    	  alert("엔터키, 검색어 입력 안됨");
	      }

	  }else{
	      return false;
	  }
	}

// 요건 아직 수정 안함
// PC - 메인검색 백스페이스체크
function downCheck_WEB_MainSearch(e) {
	if (e.keyCode === 8)
	    $('#w_search_box').addClass("search_box active");
	}


// 돋보기 버튼 클릭해서 검색
$("#searchSubmit").bind("click", function () {
	
	// search input 값 잡아서 변수로 설정
	var _query = $("#query").val();
	 alert("예리미가 #searchSubmit 클릭함. 검색내용(#query) >>>>>> " + $("#query").val() +" ::: "+ $("#query").data("placeholder"));
	
    if (_query == "" && $("#query").data("placeholder") == "") {
        // 추천검색어 x & 검색어 입력 없을 시
    	return alert("검색어를 입력해주세요.");
    } else if (_query == "" && $("#query").data("placeholder") != "") {
        // 추천검색어 o & 검색어 입력 없을 시 -> 추천검색어 링크 처리
    	setCookie($("#query").data("placeholder"));
    	location.href = $("#query").data("ref-linkUrl");
    } else if(_query){
    	//검색어 입력 없을 시
        alert("검색어가 잘 들어왔나요? 검색어(#query) >>>>>> " +  $("#query").val());
    	setCookie(_query);
    	alert("getCookie :: " + getCookie("mykeyword"));
        location.href = "/search/mainSearch?query=" +  $("#query").val();
     }
 });


//쿠키 설정
function setCookie(value)
{
  //  Date 형 변수 선언	
  var exdate = new Date();
  // Date객체의 getDate 메소드를 통해 현재 날짜를 받아오고 거기에 1을 더한다.(쿠키의 만료날짜는 1일)
  exdate.setDate(exdate.getDate() + 1);
  let preValue = getCookie("mykeyword");
  console.log("preValue ::: " + preValue);
  value += "/".concat(preValue);
  console.log("value ::: " + value);
  //  document.cookie 양식에 맞게 데이터 입력 
  var cookie_value=  encodeURI(value)+'; expires=' + exdate.toUTCString();
  console.log("cookie_value ::: " + cookie_value);
  document.cookie = 'mykeyword=' + cookie_value;

}

//원하는 쿠키이름 입력 시 해당 쿠키 값을 리턴 
function getCookie(name) {
	  let cookieName, cookieValue;
	  // 쿠키 값에 입력된 데이터를 ;를 구분자로 나누어서 배열형태로 저장한다. 
	  let totalValue = document.cookie.split(';');
	  console.log("totalValue :::: " + totalValue);
	  
	  for(let i = 0 ; i < totalValue.length; i++) {
	   // 쿠키 이름에 해당하는 부분
	  cookieName = totalValue[i].substr(0, totalValue[i].indexOf('='));
	   console.log("cookieName ::: " + cookieName);
	   // 쿠키 값에 해당하는 부분
	  cookieValue = totalValue[i].substr(totalValue[i].indexOf('=') + 1 );
	  console.log("cookieValue ::: " + cookieValue);
	   // 쿠키이름 양쪽 공백제거
	   cookieName = $.trim(cookieName);
	   if(cookieName == name){
		 // 쿠키값은 디코딩 후 값을 리턴
	     return  decodeURI(cookieValue); 
	   }
	  }
} 

// event bubbling 해결하기
const showkeywords = function () {
	let cookieValue = getCookie("mykeyword");
	console.log("cookieValue ::: " + cookieValue);
	let myKeyWords = cookieValue.split("/");
	$.each (myKeyWords, function (index, value) {
		console.log('element', index, value);
		$('#mykeyword').append($('<li>').text(value));
	});
}

$('#query').on("focus", showkeywords);

