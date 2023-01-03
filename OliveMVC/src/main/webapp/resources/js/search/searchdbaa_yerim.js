 


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



//0103 예림 테스트
var toDoInput = document.querySelector('#query');
console.log("toDoInput >>>> ", toDoInput);
var toDoList = document.querySelector('#mykeyword');
console.log("toDoList >>>> ", toDoList);






//
//
//
//
//
//
//
//
//쿠키 설정

//인기검색어, 내가찾은 검색어
//function doKeyword(query) {
//    var searchForm = document.search; 
//    searchForm.startCount.value = "0";
//    searchForm.query.value = query;
//    searchForm.collection.value = "ALL";
//    doSearch();
//}
//
//
//
////쿠키값 설정  
//function setCookie_search(c_name,value,exdays) {
//	 var exdate=new Date();
//	 exdate.setDate(exdate.getDate() + exdays);
//	 var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString())+ ";";
//	
//	 c_value += "path=/;";
//	 document.cookie=c_name + "=" + c_value;
//}
//
//
////쿠키값 조회
//function getCookie_search(c_name) {
// var i,x,y,cookies=document.cookie.split(";");
// for (i=0;i<cookies.length;i++) {
//     x=cookies[i].substr(0,cookies[i].indexOf("="));
//     y=cookies[i].substr(cookies[i].indexOf("=")+1);
//     x=x.replace(/^\s+|\s+$/g,"");
// 
//     if (x==c_name) {
//         return unescape(y);
//     }
// }
//}
//
//function getNowDate(){
// var date = new Date();
// var year = date.getFullYear();
// var month = date.getMonth()+1
// var day = date.getDate();
// if(month < 10){
//     month = "0"+month;
// }
// if(day < 10){
//     day = "0"+day;
// }
//
// var today = year+""+month+""+day;
// return today;
//}
//
//
//
////내가 찾은 검색어 조회
//function getMyKeyword(keyword, totCount) {
//  var search_chk = getCookie_search("sch_check");           
//  
//  var MYKEYWORD_COUNT = 11; //내가 찾은 검색어 갯수 + 1
//  var myKeyword = getCookie_search("mykeyword");
//  if( myKeyword== null) {
//      myKeyword = "";
//  }
//
//  var myKeywords = myKeyword.split("^%");
//  
//  
//  if(search_chk == "yes"){
//      //전체 검색결과 상관 없이, 최근검색어 저장 요청
//      //20181218
//      if (keyword != undefined && totCount != undefined && keyword != '') {
////    if( totCount > 0 ) { 
//          var existsKeyword = false;
//          for( var i = 0; i < myKeywords.length; i++) {
//              if( myKeywords[i] == keyword) {
//                  myKeywords.splice(i,1);
//                  myKeywords.push(keyword);
//                  existsKeyword = true;
//                  
//                  break;
//              }
//          }
//  
//          if( !existsKeyword ) {
//              myKeywords.push(keyword);
//              if( myKeywords.length == MYKEYWORD_COUNT) {
//                  myKeywords = myKeywords.slice(1,MYKEYWORD_COUNT);
//              }
//          }
//          setCookie_search("mykeyword", myKeywords.join("^%"), 365);                      
////      }
//      }
//  }           
//  
//  showMyKeyword(myKeywords.reverse()); 
//}
//
////내가 찾은 검색어 삭제
//function removeMyKeyword(keyword,k) {
//     
//    var myKeyword = getCookie_search("mykeyword");
//    if( myKeyword == null) {
//        myKeyword = "";
//    }
//
//    var myKeywords = myKeyword.split("^%");
//
//    var i = 0;
//    while (i < myKeywords.length) {
//        if (myKeywords[i] == keyword) {
//            myKeywords.splice(i, 1);
//        } else { 
//            i++; 
//        }
//    }
//
//    setCookie_search("mykeyword", myKeywords.join("^%"), 365);
//    //showMyKeyword(myKeywords.reverse());
//    
//    var myKeyword = getCookie_search("mykeyword");
//    
//    if(myKeyword == undefined || myKeywords.length <= 0 || myKeyword.trim() == ""){
//        $('#mk'+k).hide();
//        $("#mykeyword").append("<li class='no_data'>최근 검색한 기록이 없습니다.</li>");
//    }else{
//        $('#mk'+k).hide();
//    }
//     
//    
//}
//
//
////내가 찾은 검색어 
//function showMyKeyword(myKeywords) {
//
//  
//	 var str = "";
//	 var myKeyword = getCookie_search("mykeyword");
//	 var search_chk = getCookie_search("sch_check"); 
//	 
//	  console.log("myKeyword >>>>>> ");
//	  console.log(myKeyword);
//	  console.log("search_chk >>>>>> ");
//	  console.log(search_chk);
//	
//	 if(myKeyword == undefined || myKeywords.length <= 0 || myKeyword.trim() == ""){     
//	     str += "<li class='no_data'>최근 검색한 기록이 없습니다.</li>";    
//	     
//	 }else if(search_chk == undefined || search_chk == ""){
//	     $("#sch_save").html("검색어 저장 켜기");
//	     str += "<li class='no_data'>최근 검색어 저장 기능이 꺼져있습니다.</li>";
//	 }else{
//	     for( var i = 0; i < myKeywords.length; i++) {
//	         if( myKeywords[i] == "") continue;                                  
//	//       str += "<li id='mk"+i+"'><a href='#' onClick=\"javascript:recentKeywordSearch('"+myKeywords[i]+"');\">"+myKeywords[i]+"</a><button onClick=\"removeMyKeyword('"+myKeywords[i]+"','"+i+"');\">검색어 삭제</button></li>";         
//	         str += "<li id='mk"+i+"'><a href='#' onClick=\"javascript:recentKeywordSearch('"+cleanXSSjs(myKeywords[i])+"');\" data-attr='공통^통합검색_최근검색어^"+myKeywords[i]+"'>"+myKeywords[i]+"</a><button onClick=\"removeMyKeyword('"+myKeywords[i]+"','"+i+"');\">검색어 삭제</button></li>";
//	     }
//	 //  str += "</ul>";
//	 }
//	 
//	 
//	 //str += "</div>";
//	 
//	 //str = "<li class='no_data' onClick=\"removeMyKeyword('1');\">최근 검색한 기록이 없습니다.</li>";    
//	 //console.log(str);
//	 $("#mykeyword").html(str);
//     
//}
//
//
////메인웹 - 최근검색어 검색
//function recentKeywordSearch(recentKeyword){
//	
////	var giftYn = common._giftCardCheck($("#query").val());
//	
////  var name = 'listnum';
////  var listnumState = getLocalStorageForName(name);
//	  if($("#query").val()){
//	      location.href = "/search/mainSearch?query=" + $("#query").val();
//	  }else{
//	//      location.href = _baseUrl + "search/getSearchMain.do?query=" + encodeURIComponent(recentKeyword) + "&giftYn=" + giftYn;
//	  }    
//}
//
//
////이건 몬지 모르겠음...
//function cleanXSSjs(keyWord) {
//
//    keyWord = keyWord.replaceAll("cookie", "coo-kie");
//    keyWord = keyWord.replaceAll("document", "doc-ument");
//    keyWord = keyWord.replaceAll("([a-z]+)script:", "$1-script:");
//    keyWord = keyWord.replaceAll("(<layer[^>]+)src", "$1x-src");
//    keyWord = keyWord.replaceAll("(i*)input(.*?)", "$1x-input$2");
//    keyWord = keyWord.replaceAll("(a*)action(.*?)", "$1x-action$2");
//    keyWord = keyWord.replaceAll("function", "");
//    keyWord = keyWord.replaceAll("alert", "");
//    
//    keyWord = keyWord.replaceAll("\"","&qout;");
//    keyWord = keyWord.replaceAll("\'","&apos;");
//    keyWord = keyWord.replaceAll("<","&lt;");
//    keyWord = keyWord.replaceAll(">","&gt;");
//    keyWord = keyWord.replaceAll("\\(","&#40;");
//    keyWord = keyWord.replaceAll("\\)","&#41;");
//
//    return keyWord;
//}
//
////쿠키 전체 삭제
//function deleteCookies(){
//    
//    
//    myKeywords = "";
//    
//    if(confirm("최근 검색어를 모두 삭제 하시겠습니까?") == true){                
//        setCookie_search("mykeyword", '', '-1');        
//        showMyKeyword(myKeywords);
//        
//    }else{ //취소
//        
//        return;
//    }
//
//}
//
//
////메인 스크립트
//$(document).ready(function(){
//  //초기 페이지 default 검색어 저장 켜기 
//  var search_chk = getCookie_search("sch_check");
//  var my = getCookie_search("mykeyword");    
//
//  if(search_chk == undefined){
//      setCookie_search("sch_check", "yes", 365);
//      $(".sch_save").html("검색어 저장 끄기"); 
//  }
//  
//  if(search_chk == "yes"){ 
//      $(".sch_save").html("검색어 저장 끄기");
//      
//      
//      
//  }else if(search_chk == ""){       
//      $(".sch_save").html("검색어 저장 켜기");
//      
//  }
//  
//  //메인 - 검색어저장 버튼 클릭
//  $(".sch_save").bind("click", function() {
//      var search_chk = getCookie_search("sch_check");           
//      if(search_chk == undefined || search_chk == ""){
//          setCookie_search("sch_check", "yes", 365);            
//          $(".sch_save").html("검색어 저장 끄기");
//          getMyKeyword();
//                   
//      }else if(search_chk="yes"){         
//          $(".sch_save").html("검색어 저장 켜기");
//          setCookie_search("sch_check", '', 365);          
//          getMyKeyword();
//          
//      }
//   });
//  
//  //Mainpopkeyword();
//  //MainSuddenKeyword();
//  //getMyKeyword();
//  
//  if(search_chk == ""){
//      $("#searchRecent").removeClass("search_tab tab01 on").addClass("search_tab tab01");
//      $("#searchPop").removeClass("search_tab tab02").addClass("search_tab tab02 on");
//  }
// 
//  
//
//
//
//});
//
//
////메인 - input 창 focus 이벤트
//$('#query').click(function() {   
//    
//    //console.log('최근 검색어 삭제하면 여기로 옴');
//    //최근검색어 꺼진경우 검색어가 없을때 인기검색어 노출
//    //최초 접속시 최근검색어 켜짐 따라서 마우스 클릭시 최근검색어 화면 보임. 
//    
//     
//    var search_chk = getCookie_search("sch_check"); 
//    var query = $(queryId).val();
//    $("#searchRecent").removeClass("search_tab tab01").addClass("search_tab tab01 on");
//    $("#searchPop").removeClass("search_tab tab02 on").addClass("search_tab tab02");
//    
//    if (query == "") {          
//        $("#ark_w").hide();                          
//        $("#searchRecent").show();
//        $("#searchPop").show();
//                     
//        $("#recent_cont").show();
//        $("#w_pop_cont").hide();
//        //$("#searchRecent").removeClass("search_tab tab01").addClass("search_tab tab01 on");          
//        if(search_chk =="" ){
//            var cbt = $("#chkButton").val();
//             
//            if(cbt == "ok"){ //최근검색어를 클릭한경우
//                $("#searchRecent").show();
//                $("#searchPop").show();
//                $("#recent_cont").show();
//                $("#w_pop_cont").hide();
//            }else{ //최근검색어를 클릭하지 않은 디폴트
//                $("#searchPop").show();
//                $("#w_pop_cont").show();
//                $("#recent_cont").hide();
//                $("#searchRecent").removeClass("search_tab tab01 on").addClass("search_tab tab01");
//                $("#searchPop").removeClass("search_tab tab02").addClass("search_tab tab02 on");
//                // [3490108] 검색어 저장 끄기 상태에서 검색어가 없을 경우 급상승 검색어 노출 문제 수정
//                if (common.header.suddenClickFlag == "N") {
//                    MainSuddenKeyword('keyword_main');
//                    common.header.suddenClickFlag = "Y";
//                }
//            }
//        }else{
//             
//            if($('#mykeyword').find('li').hasClass('no_data')){
//                $("#searchPop").show();
//                $("#w_pop_cont").show();             
//                $("#recent_cont").hide();
//                $("#searchRecent").removeClass("search_tab tab01 on").addClass("search_tab tab01");
//                $("#searchPop").removeClass("search_tab tab02").addClass("search_tab tab02 on");
//                //급상승 검색어 조회
//                if (common.header.suddenClickFlag == "N") {
//        			MainSuddenKeyword('keyword_main');
//        			common.header.suddenClickFlag = "Y";
//        		}  
//            }else{              
//                $("#searchRecent").removeClass("search_tab tab01").addClass("search_tab tab01 on");
//                $("#searchPop").removeClass("search_tab tab02 on").addClass("search_tab tab02");
//            }
//        }
//        return;
//    }else{ 
//        $("#ark_w").show();
//        
//        $("#searchPop").hide();
//        $("#w_pop_cont").hide();                 
//        
//        $("#searchRecent").hide();
//        $("#recent_cont").hide(); 
//    }
//    
//    //doArk(query);
//});
