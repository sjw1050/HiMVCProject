// 인기검색어, 내가찾은 검색어
function doKeyword(query) {
    var searchForm = document.search; 
    searchForm.startCount.value = "0";
    searchForm.query.value = query;
    searchForm.collection.value = "ALL";
    doSearch();
}

// 쿠키값 조회
function getCookie_search(c_name) {
    var i,x,y,cookies=document.cookie.split(";");
    for (i=0;i<cookies.length;i++) {
        x=cookies[i].substr(0,cookies[i].indexOf("="));
        y=cookies[i].substr(cookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
    
        if (x==c_name) {
            return unescape(y);
        }
    }
}

function getNowDate(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1
    var day = date.getDate();
    if(month < 10){
        month = "0"+month;
    }
    if(day < 10){
        day = "0"+day;
    }
 
    var today = year+""+month+""+day;
    return today;
}

// 쿠키값 설정  
function setCookie_search(c_name,value,exdays) {
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString())+ ";";

    c_value += "path=/;";
    document.cookie=c_name + "=" + c_value;
}

//내가 찾은 검색어 조회
function getMyKeyword(keyword, totCount) {
    var search_chk = getCookie_search("sch_check");           
    
    var MYKEYWORD_COUNT = 11; //내가 찾은 검색어 갯수 + 1
    var myKeyword = getCookie_search("mykeyword");
    if( myKeyword== null) {
        myKeyword = "";
    }

    var myKeywords = myKeyword.split("^%");
    
    
    if(search_chk == "yes"){
        //전체 검색결과 상관 없이, 최근검색어 저장 요청
        //20181218
        if (keyword != undefined && totCount != undefined && keyword != '') {
//      if( totCount > 0 ) { 
            var existsKeyword = false;
            for( var i = 0; i < myKeywords.length; i++) {
                if( myKeywords[i] == keyword) {
                    myKeywords.splice(i,1);
                    myKeywords.push(keyword);
                    existsKeyword = true;
                    
                    break;
                }
            }
    
            if( !existsKeyword ) {
                myKeywords.push(keyword);
                if( myKeywords.length == MYKEYWORD_COUNT) {
                    myKeywords = myKeywords.slice(1,MYKEYWORD_COUNT);
                }
            }
            setCookie_search("mykeyword", myKeywords.join("^%"), 365);                      
//        }
        }
    }           
    
    showMyKeyword(myKeywords.reverse()); 
}


// 내가 찾은 검색어 삭제
function removeMyKeyword(keyword,k) {
     
    var myKeyword = getCookie_search("mykeyword");
    if( myKeyword == null) {
        myKeyword = "";
    }

    var myKeywords = myKeyword.split("^%");

    var i = 0;
    while (i < myKeywords.length) {
        if (myKeywords[i] == keyword) {
            myKeywords.splice(i, 1);
        } else { 
            i++; 
        }
    }

    setCookie_search("mykeyword", myKeywords.join("^%"), 365);
    //showMyKeyword(myKeywords.reverse());
    
    var myKeyword = getCookie_search("mykeyword");
    
    if(myKeyword == undefined || myKeywords.length <= 0 || myKeyword.trim() == ""){
        $('#mk'+k).hide();
        $("#mykeyword").append("<li class='no_data'>최근 검색한 기록이 없습니다.</li>");
    }else{
        $('#mk'+k).hide();
    }
     
    
}
 
// 내가 찾은 검색어 

function showMyKeyword(myKeywords) {
     
    var str = "";
    var myKeyword = getCookie_search("mykeyword");
    var search_chk = getCookie_search("sch_check"); 

    if(myKeyword == undefined || myKeywords.length <= 0 || myKeyword.trim() == ""){     
        str += "<li class='no_data'>최근 검색한 기록이 없습니다.</li>";    
        
    }else if(search_chk == undefined || search_chk == ""){
        $("#sch_save").html("검색어 저장 켜기");
        str += "<li class='no_data'>최근 검색어 저장 기능이 꺼져있습니다.</li>";
    }else{
        for( var i = 0; i < myKeywords.length; i++) {
            if( myKeywords[i] == "") continue;                                  
//          str += "<li id='mk"+i+"'><a href='#' onClick=\"javascript:recentKeywordSearch('"+myKeywords[i]+"');\">"+myKeywords[i]+"</a><button onClick=\"removeMyKeyword('"+myKeywords[i]+"','"+i+"');\">검색어 삭제</button></li>";         
            str += "<li id='mk"+i+"'><a href='#' onClick=\"javascript:recentKeywordSearch('"+cleanXSSjs(myKeywords[i])+"');\" data-attr='공통^통합검색_최근검색어^"+myKeywords[i]+"'>"+myKeywords[i]+"</a><button onClick=\"removeMyKeyword('"+myKeywords[i]+"','"+i+"');\">검색어 삭제</button></li>";
        }
    //  str += "</ul>";
    }
    
    
    //str += "</div>";
    
    //str = "<li class='no_data' onClick=\"removeMyKeyword('1');\">최근 검색한 기록이 없습니다.</li>";    
    //console.log(str);
    $("#mykeyword").html(str);
        
}

function cleanXSSjs(keyWord) {

    keyWord = keyWord.replaceAll("cookie", "coo-kie");
    keyWord = keyWord.replaceAll("document", "doc-ument");
    keyWord = keyWord.replaceAll("([a-z]+)script:", "$1-script:");
    keyWord = keyWord.replaceAll("(<layer[^>]+)src", "$1x-src");
    keyWord = keyWord.replaceAll("(i*)input(.*?)", "$1x-input$2");
    keyWord = keyWord.replaceAll("(a*)action(.*?)", "$1x-action$2");
    keyWord = keyWord.replaceAll("function", "");
    keyWord = keyWord.replaceAll("alert", "");
    
    keyWord = keyWord.replaceAll("\"","&qout;");
    keyWord = keyWord.replaceAll("\'","&apos;");
    keyWord = keyWord.replaceAll("<","&lt;");
    keyWord = keyWord.replaceAll(">","&gt;");
    keyWord = keyWord.replaceAll("\\(","&#40;");
    keyWord = keyWord.replaceAll("\\)","&#41;");

    return keyWord;
}

//메인웹 - 최근검색어 검색
function recentKeywordSearch(recentKeyword){
	
	var giftYn = common._giftCardCheck($("#query").val());
	
    var name = 'listnum';
    var listnumState = getLocalStorageForName(name);
    if(listnumState){
        location.href = _baseUrl + "search/getSearchMain.do?query=" + encodeURIComponent(recentKeyword) + "&listnum=" + listnumState + "&giftYn=" + giftYn;
    }else{
        location.href = _baseUrl + "search/getSearchMain.do?query=" + encodeURIComponent(recentKeyword) + "&giftYn=" + giftYn;
    }    
}

// 오타 조회
function getSpell(query) {     
    if (query != "") {
        var str = "";
        str += "혹시 이것을 찾으시셨나요? <a href=\"javascript:;\" onClick=\"javascript:doKeyword('"+query+"');\"><span>'"+ query + "'</span>검색결과로 이동</a>";
        $("#spell").html(str);
        return true;
    } else {
        return false;
    }
}

// 오타 조회
function getSpellOld(query) { 
    $.ajax({
      type: "POST",
      url: "./popword/popword.jsp?target=spell&charset=",
      dataType: "xml",
      data: {"query" : query},
      success: function(xml) {
        if(parseInt($(xml).find("Return").text()) > 0) {
            var str = "<div class=\"resultall\">";

            $(xml).find("Data").each(function(){
                if ($(xml).find("Word").text() != "0" && $(xml).find("Word").text() != query) {
                    str += "<span>이것을 찾으셨나요? </span><a href=\"#none\" onClick=\"javascript:doKeyword('"+$(xml).find("Word").text()+"');\">" + $(xml).find("Word").text() + "</a>";
                }           
            });
            
            str += "</div>";

            $("#spell").html(str);
        }
      }
    });

    return true;
}

// 뷰 방식 전환 
function doView(view) { 
    var searchForm = document.search;
    searchForm.viewtype.value = view;
    searchForm.submit();
}


// 뷰 방식 전환 
function doSearchNormal() { 
    var searchForm = document.search; 
    searchForm.submit();
}


// 기간 설정
function setDate(range) {
    var startDate = "";
    var endDate = "";
    
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() +1;
    var day = currentDate.getDate();

    if (parseInt(month) < 10) {
        month = "0" + month;
    }

    if (parseInt(day) < 10) {
        day = "0" + day;
    }

    var toDate = year + "." + month + "." + day;

    // 기간 버튼 이미지 초기화
    for (i = 1;i < 5 ;i++) {
        $("#range"+i).attr ("src", "images/btn_term" + i + ".gif");
    }
    
    // 기간 버튼 이미지 선택
    if (range == "D") {
        startDate = getAddDay(currentDate, -0);
        $("#range2").attr ("src", "images/btn_term22.gif");
    } else if (range == "W") {
        startDate = getAddDay(currentDate, -6);
        $("#range3").attr ("src", "images/btn_term32.gif");
    } else if (range == "M") {
        startDate = getAddDay(currentDate, -29);
        $("#range4").attr ("src", "images/btn_term42.gif");
    } else {
        startDate = "1970.01.01";
        endDate = toDate;
        $("#range1").attr ("src", "images/btn_term12.gif");
    }
    
    if (range != "A" && startDate != "") { 
        year = startDate.getFullYear();
        month = startDate.getMonth()+1; 
        day = startDate.getDate();

        if (parseInt(month) < 10) {
            month = "0" + month;
        }

        if (parseInt(day) < 10) {
            day = "0" + day;
        }

        startDate = year + "." + month + "." + day;             
        endDate = toDate;
    }
    
    $("#range").val(range);
    $("#startDate").val(startDate);
    $("#endDate").val(endDate);
}

// 날짜 계산
function getAddDay ( targetDate, dayPrefix )
{
    var newDate = new Date( );
    var processTime = targetDate.getTime ( ) + ( parseInt ( dayPrefix ) * 24 * 60 * 60 * 1000 );
    newDate.setTime ( processTime );
    return newDate;
}

// 정렬
function doSorting(sort) {  
    
    var searchForm = document.search;   
    searchForm.sort.value = sort;
    searchForm.goods_sort.value = sort;
    //searchForm.rt.value = "2";    
    // 페이지 초기화
    searchForm.startCount.value =  "0";   
    
    if(sort == 'WEIGHT/DESC,RNK/DESC'){
        common.wlog("search_sort_popular"); 
    }else if(sort == 'DATE/DESC'){
        common.wlog("search_sort_recent"); 
    }else if(sort == 'SALE_QTY/DESC'){
        common.wlog("search_sort_popular"); 
    }else if(sort == 'GDAS_TOT_CNT/DESC'){
        common.wlog("search_sort_reputation"); 
    }else if(sort == 'SALE_PRC/ASC'){
        common.wlog("search_sort_lowprice"); 
    }else if(sort == 'SALE_PRC/DESC'){
        common.wlog("search_sort_highprice"); 
    }   
    searchForm.submit();
}

//조건 검색 초기화
function fieldInit() {

    var searchForm = document.search;
    if ( searchForm.cateId != null )
    {
        searchForm.cateId.value = "";
    }
    if ( searchForm.cateId2 != null )
    {
        searchForm.cateId2.value = "";
    }
    if ( searchForm.brandId != null )
    {
        searchForm.brandId.value = "";
    }
    
    
    searchForm.quickYn.value = "N"; // 오늘드림여부초기화
    
    //체크박스 선택 초기화
    $("input[type=checkbox]").prop("checked",false);
    
    //input 가격을 초기화 시킨다.
    $("#sale_below_price").prop("value","");
    $("#sale_over_price").prop("value","");
        
}

// 검색
function doSearch() {
    var searchForm = document.search; 
    //alert("mainsort ::::: " + searchForm.query.value);
    if (searchForm.query.value == "") {
        //alert("검색어를 입력하세요.");
        searchForm.query.focus();
        //return;
    }
     
    fieldInit();
    searchForm.tmp_requery.value = "";
    $("#search_tab_area").hide();
    
    searchForm.submit();
}

// 컬렉션별 검색
function doCollection(coll) {
    var searchForm = document.search; 
    searchForm.collection.value = coll;
    searchForm.rt.value = "2";
    searchForm.submit();
}
    
// 엔터 체크    
function pressCheck() {   
    if (event.keyCode == 13) {
        return doSearch();
    }else{
        return false;
    }
}


// 결과내 재검색
function checkReSearch() {
    var searchForm = document.search;

    if (document.getElementById("reChk").checked == true) {
        temp_query = searchForm.query.value;        
        searchForm.rt.value = "1";
        searchForm.reQuery.value = "";
    } else {
        searchForm.rt.value = "";
    }
}

// 페이징
function doPaging(count) {
    var searchForm = document.search;
    searchForm.startCount.value = count;
    //searchForm.rt.value = "2";
    searchForm.submit();
}

// 기간 적용
function doRange() {
    var searchForm = document.search;
    
    if($("#startDate").val() != "" || $("#endDate").val() != "") {
        if($("#startDate").val() == "") {
            alert("시작일을 입력하세요.");
            $("#startDate").focus();
            return;
        }

        if($("#endDate").val() == "") {
            alert("종료일을 입력하세요.");
            $("#endDate").focus();
            return;
        }

        if(!compareStringNum($("#startDate").val(), $("#endDate").val(), ".")) {
            alert("기간이 올바르지 않습니다. 시작일이 종료일보다 작거나 같도록 하세요.");
            $("#startDate").focus();
            return;
        }       
    }

    searchForm.startDate.value = $("#startDate").val();
    searchForm.endDate.value = $("#endDate").val();
    searchForm.range.value = $("#range").val();
    searchForm.rt.value = "2";
    searchForm.submit();
}

// 영역
function doSearchField(field) {
    var searchForm = document.search;
    searchForm.searchField.value = field;
    searchForm.rt.value = "2";
    searchForm.submit();
}

// 문자열 숫자 비교
function compareStringNum(str1, str2, repStr) {
    var num1 =  parseInt(replaceAll(str1, repStr, ""));
    var num2 = parseInt(replaceAll(str2, repStr, ""));

    if (num1 > num2) {
        return false;
    } else {
        return true;
    }
}

// Replace All
function replaceAll(str, orgStr, repStr) {
    return str.split(orgStr).join(repStr);
}

// 공백 제거
function trim(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}


function popkeyword() {
    var range = "W";
    var collection = "ALL";
    // 인기검색어 조회
    $.ajax({
        type: "POST",
        url: _baseUrl + "search/getPopwordAjax.do?target=popword",          
        dataType: "json",
        data: {"range" : range, "collection" : collection},
        success: function(data) {
            var str = "";           
            str += "<h2>인기검색어</h2>";
            str += "<div class='BoxPopularity'>";                   
            
            var num = 0;
            $.each(data.Data.Query, function(i,item){                              
               if ( num < 20 ) {
                    if(num == 0 || num == 10){
                        str += "<ol>";  
                    }
                    // [3389141] (영역별 매출분석) 오특, 검색, 베스트, 메인 추가(CHY)
                    str += "<li><span class='num'>" +item.id + "</span><a href='#' onclick=\"javascript:popwordSearchdo('" + item.content + "', 'Pop_PROD');\">"+ item.content +"</a></li>";
                    num ++;
                    if(num == 10 || num == 20){
                        str += "</ol>";
                    }                   
                }
               
            });
            
            str += "</div>";
            
            $("#popword").html(str);
        }
    });
}

function recommend(query) {
	// 큐레이션 데이터로 변경. 11월 12일 이후 반영 예정
	/*var param = {
	    st : query	
	};
	
	if(common.isEmpty(param.st)) {
    	return;
    }
	
	curation.callCuration("s204", param, function(data) {
		var results = data.results;
		
		if(results != null && results != undefined) {
			var len = results.length;
			
			if(len > 0) {
				//연관 검색어 화면 그리기
				
				len = len > 20 ? 20 : len;
				
				var arrHtml = [];
    			for(var i=0; i<len; i++) {
    				arrHtml.push("<a href=\"#none\" onclick=\"javascript:recentSearchdo('" + results[i].itemId + "');\">" + results[i].itemId + "</a>");
    			}
    			
    			$("#recommend").html(arrHtml.join("\n"));
				$(".relatedSearch").show();
			}
		}
	});
	*/
	
    var label = "_ALL_";

    // 추천검색어 조회
    $.ajax({
        type: "POST",
        url: _baseUrl + "search/getRecommendAjax.do?target=recommend",
        dataType: "json",
        data: {"query" : query, "label" : label},
        success: function(data) {
            
            var str = "";                        
            if(data.Data.Return != 1){
                //연관 검색어 화면 그리기            
                $(".relatedSearch").show();       
                 
                for(var i=0; i<20 && i<data.Data.Word.length ; i++) {
                    str += "      <a href=\"#none\" onclick=\"javascript:recentSearchdo('" + data.Data.Word[i] + "');\">";
                    str += " " + data.Data.Word[i] + "</a>";
                }           
                
                $("#recommend").html(str);                
            }
        }
    });
}

function catesearch(name,id,depth) {
    document.search.catename.value = name;
    document.search.category.value = id;
    document.search.catedepth.value = depth;
    document.search.submit();
}

function number_format(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

var flag = false;

function viewMoreCategory(){
    if (!flag) {
        $("#pcategory").removeClass().addClass("pcategory_all");
        $("#categoryFlagBtn").html("");
        $("#categoryFlagBtn").html("<a href=\"javascript:viewMoreCategory();\">카테고리 닫기 </a>");
        flag = true;
    } else {
        $("#pcategory").removeClass().addClass("pcategory");
        $("#categoryFlagBtn").html("");
        $("#categoryFlagBtn").html("<a href=\"javascript:viewMoreCategory();\">카테고리 더보기</a>");
        flag = false;
    }
}

//페이지당 결과 출력
function ShowViewList(ViewCount){
    var searchForm = document.search; 
    searchForm.listnum.value = ViewCount;
    searchForm.startCount.value =  "0";   
    localStorage.setItem('listnum', ViewCount);
    if(ViewCount == 24){
        common.wlog("search_view_24"); 
    }else  if(ViewCount == 36){
        common.wlog("search_view_36"); 
    }else  if(ViewCount == 48){
        common.wlog("search_view_48"); 
    }
    searchForm.submit();        
}

//상세검색 버튼 클릭 초기화
function Reset_Button_Click(){
    if(confirm("설정하신 항목을 초기화 하시겠습니까?") == true){
        var searchForm = document.search;
        //만약 전체 선택 체크박스가 체크된상태일경우
        //해당화면에 모든 checkbox들의 체크를해제시킨다.
        $("input[type=checkbox]").prop("checked",false);
        //input 가격을 초기화 시킨다.
        $("#sale_below_price").prop("value","");
        $("#sale_over_price").prop("value","");
        $("input[name=setMinPrice]").val("");
        $("input[name=setMaxPrice]").val("");
        
        //카테고리 초기화
        $(".finderArea > li").removeClass("cate on").addClass("cate");
        $(".subCate > ul").prop("style","display:none");
        
        //전체선택 체크박스 해제
        searchForm.BenefitAll_CHECK.value = ""; 
        //카테고리 선택 해제
        searchForm.cateId.value = "";
        searchForm.categoryDepthValue.value = "";
        searchForm.cateId2.value = "";
        searchForm.selectCateNm.value ="전체"; 
        $("#tmp_requery2").val('');
        $("#reChk").val('');
        $("#reQuery").val('');
        searchForm.tmp_requery.value = "";	//재검색어
        
        searchForm.quickYn.value = "N"; // 오늘드림여부초기화
        
        searchForm.submit();
        
    }else{ //취소
        
        return;
    }
    
    
}
/*$(function(){
        //전체선택 체크박스 클릭
        $("#Allcheck_close").click(function(){ 
            
            if(confirm("설정하신 항목을 초기화 하시겠습니까?") == true){
                var searchForm = document.search;
                //만약 전체 선택 체크박스가 체크된상태일경우
                //해당화면에 모든 checkbox들의 체크를해제시킨다.
                $("input[type=checkbox]").prop("checked",false);
                //input 가격을 초기화 시킨다.
                $("#sale_below_price").prop("value","");
                $("#sale_over_price").prop("value","");
                
                //카테고리 초기화
                $(".finderArea > li").removeClass("cate on").addClass("cate");
                $(".subCate > ul").prop("style","display:none");
                
                //전체선택 체크박스 해제
                searchForm.BenefitAll_CHECK.value = ""; 
                //카테고리 선택 해제
                searchForm.cateId.value = "";
                searchForm.categoryDepthValue.value = "";
                searchForm.cateId2.value = "";
                searchForm.selectCateNm.value ="전체"; 
                $("#tmp_requery2").val('');
                $("#reChk").val('');
                $("#reQuery").val('');      
                
                searchForm.quickYn.value = "N"; // 오늘드림여부초기화
                
                searchForm.submit();
                
            }else{ //취소
                
                return;
            }
                
            
        })
    })*/

//결과 재 검색
function reSearch(){ 
    var reKeyword = document.getElementById("reChk").value;      
    var rt = "";
    // 검색엔진 rt사용에 대한 변경으로 인해 수정 20201027
    if (reKeyword != undefined && reKeyword != "") {    	
    	rt = "1";
    }
    var tmp_requery2 = $("#tmp_requery2").val();
    var query = $("#query").val();    
  
    
    if(tmp_requery2 == "" || tmp_requery2 == undefined){
        tmp_requery2 = query;
    }
    //location.href = _baseUrl + "search/getSearchMain.do?query=" + encodeURIComponent($("#query").val()) + "&rt=" + rt +"&reQuery=" + encodeURIComponent(reKeyword) + "&tmp_requery2=" + encodeURIComponent(tmp_requery2);   

    var searchForm = document.search;
    searchForm.reQuery.value=reKeyword;
    searchForm.tmp_requery2.value=tmp_requery2;
    searchForm.rt.value=rt; // page 초기화
    searchForm.startCount.value =  "0";      
    searchForm.submit();
    
}


//결과내 재검색 엔터 체크 
function pressCheckReSearch() {   
    if (event.keyCode == 13) {
        return reSearch();
        } else {
            return false;
        }
        
    }

//가격대 검색
function Price_Search(){ 
    var searchForm = document.search;
    var minPrice = $("#sale_below_price").val();
    var maxPrice = $("#sale_over_price").val();
    
    searchForm.sale_below_price.value = minPrice;
    searchForm.sale_over_price.value = maxPrice;
    searchForm.setMinPrice.value = minPrice;
    searchForm.setMaxPrice.value = maxPrice;
    
    //최소가격 & 최대가격 비교
    var minPrice_check = minPrice.replace(/,/gi,"");
    var maxPrice_check = maxPrice.replace(/,/gi,"");       
    
    if(parseInt(minPrice_check) > parseInt(maxPrice_check)){
        
        alert("최소가격이 최대가격보다 높게 입력 되었습니다.");
        $("#sale_over_price").prop("value","");
        return false;
    }   
    
    // page 초기화
    searchForm.startCount.value =  "0";

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(
        {
            'event': 'click-event',
            'data-attr' : '통합검색결과페이지^필터_가격대^' + minPrice.replaceAll(',','') + '-' + maxPrice.replaceAll(',','')
        }
    );

    common.wlog("search_price");
    searchForm.submit();
}

function save_close(){ 
    var searchForm = document.search;
    
    
        $("#mykeyword").hide();
        searchForm.save_flag.value == "0";      
        $(".aa").hide();
        $(".bb").show();
    //searchForm.submit();
}

function save_open(){ 
    var searchForm = document.search;   
    
        $("#mykeyword").show();
        $(".aa").show();
        $(".bb").hide();    
    //searchForm.submit();
}

function CateOnclick(DepthId){
    var searchForm = document.search;
    
    searchForm.cateId.value = DepthId;
    searchForm.cateId2.value = "";
    searchForm.categoryDepthValue.value = "1";
    
    searchForm.submit();
    
}

function CateOnclick(DepthId,Nm){
    
    var searchForm = document.search;
    
    searchForm.cateId.value = DepthId;
    searchForm.cateId2.value = "";
    searchForm.categoryDepthValue.value = "1";
    searchForm.selectCateNm.value = Nm+' 카테고리에';

    $('#brandTop').val(''); 
    //카테고리 선택시 초기화     
    searchForm.BenefitAll_CHECK.value = ""; 
    $("input[type=checkbox]").prop("checked",false);
    
    // page 초기화
    searchForm.startCount.value =  "0";      
   
    
    common.wlog("search_category"); 
    
    searchForm.cateChk.value = 'opened';
    
    $('.search_box.cate .list_subbox').not().removeClass('show');
    
    
    searchForm.submit();
    
}

function CateOnclick2(DepthId){
    var searchForm = document.search;
    
    searchForm.cateId2.value = DepthId;
    searchForm.categoryDepthValue.value = "2";
    // page 초기화
    searchForm.startCount.value =  "0";      
    searchForm.submit();
    
}

function CateOnclick2(DepthId,Nm){
    var searchForm = document.search;
    
    searchForm.cateId2.value = DepthId;
    searchForm.categoryDepthValue.value = "2";
    searchForm.selectCateNm.value = Nm+' 카테고리에';
    $('#brandTop').val(''); 
    //카테고리 선택시 초기화     
    searchForm.BenefitAll_CHECK.value = ""; 
    $("input[type=checkbox]").prop("checked",false);
    
    // page 초기화
    searchForm.startCount.value =  "0";  
    
    common.wlog("search_category"); 
    searchForm.submit();
    
}

function quickOnclick(){
    var searchForm = document.search;  
    if(document.getElementById("check_view").checked == true){
        searchForm.quickYn.value = "Y";
        
        $("input[name=benefit_check]").prop("checked",false);
        searchForm.BenefitAll_CHECK.value = "";
        
        $("input[name=brand_check]").prop("checked",false);
        searchForm.branChk.value =  "";
        
        $("input[name^=attr_check]").prop("checked",false);
        $("input[name^=attr_check]").val("");
        
        $("[name=cateId]").prop("value","");
        $("[name=cateId2]").prop("value","");
        
        // 	page 초기화
        searchForm.startCount.value =  "0";          
    }else{
        searchForm.quickYn.value = "N";
    }
    searchForm.submit();
}

function brandOnclick(){
    var _brandTop = $('.search_box .scrbar').scrollTop();
    var searchForm = document.search;
    searchForm.brandTop.value = _brandTop;
    searchForm.branChk.value =  $('#branChk').val()
    /*searchForm.BenefitAll_CHECK.value = "";
    $("input[type=checkbox]").not('[name=brand_check]').prop("checked",false);*/
    // page 초기화
    searchForm.startCount.value =  "0";  
   
    common.wlog("search_brand");
    searchForm.submit();
}

function attrOnclick(idx){
    var _brandTop = $('.finderArea>li .listBrand').scrollTop();
    var searchForm = document.search;
    searchForm.brandTop.value = _brandTop;
    common.wlog("search_attr"+idx);
    //속성값 클릭하면 속성항목 1-5 모두 펼쳐짐
    searchForm.attrChk.value = 'opened';
    // page 초기화
    searchForm.startCount.value =  "0";  
    
    searchForm.submit();
}

function benefitOnclick(){
    var searchForm = document.search;  
    
    searchForm.BenefitAll_CHECK.value = "";
    // page 초기화
    searchForm.startCount.value =  "0";  
    common.wlog("search_benefit");
    searchForm.submit();
}

function benefitAllclick(){
    var searchForm = document.search;
        if(searchForm.BenefitAll_CHECK.value == ""){
            $("input[name=benefit_check]").prop("checked",true);
            searchForm.BenefitAll_CHECK.value = "BenefitAll";
            
        }else{
            $("input[name=benefit_check]").prop("checked",false);
            searchForm.BenefitAll_CHECK.value = "";         
        }   
        // page 초기화
        searchForm.startCount.value =  "0";          
        
        common.wlog("search_benefit");
        
        searchForm.submit();
}

function getLocalStorageForName(name) {
    //var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    var value = localStorage.getItem(name);
    return value;
};
//PC - 메인검색 엔터체크    
function pressCheck_WEB_MainSearch(e,a) {   
  if (e.keyCode == 13) {
	  
	  var giftYn = common._giftCardCheck($("#query").val());
	  
      var name = 'listnum';
      var listnumState = getLocalStorageForName(name);
      if(listnumState){
          console.log("listnumState : " + listnumState);
          location.href = _baseUrl + "search/getSearchMain.do?query=" + encodeURIComponent($("#query").val()) + "&listnum=" + listnumState + "&giftYn=" + giftYn;
      }else{
          location.href = _baseUrl + "search/getSearchMain.do?query=" + encodeURIComponent($("#query").val()) + "&giftYn=" + giftYn;
      }

  }else{
      return false;
  }
}
//PC - 메인검색 백스페이스체크
function downCheck_WEB_MainSearch(e) {
    if (e.keyCode === 8)
        $('#w_search_box').addClass("search_box active");
}

//쿠키 전체 삭제
function deleteCookies(){
    
    
    myKeywords = "";
    
    if(confirm("최근 검색어를 모두 삭제 하시겠습니까?") == true){                
        setCookie_search("mykeyword", '', '-1');        
        showMyKeyword(myKeywords);
        
    }else{ //취소
        
        return;
    }

}

function Mainpopkeyword() {
    var range = "W";
    var collection = "ALL";
    // 인기검색어 조회
    $.ajax({
        type: "POST",
        url: _baseUrl + "search/getPopwordAjax.do?target=popword",          
        dataType: "json",
        data: {"range" : range, "collection" : collection},
        success: function(data) {
            var str = "";                                                          
            
            var num = 0;
            $.each(data.Data.Query, function(i,item){               
               if(num < 10){
            	   // [3389141] (영역별 매출분석) 오특, 검색, 베스트, 메인 추가(CHY)
            	   str += "<li><a href='#' onclick=\"javascript:popwordSearchdo('" + item.content + "', 'Pop_PROD');\" ><span>" + item.id +"</span>"+ item.content +"</a></li>";
               }
               num++
            });
            
            str += "</div>";
            
            $("#mainPopword").html(str);
        }
    });
}

//메인 - 급상승검색어
function MainSuddenKeyword(htmlType) {
	/* [3509650] (큐레이션) 온라인몰 라이브스트림 발행 로직 수정
                현재 : 100개 호출, 30분간 누적 데이터, 호출 현시점 기준 60분 전 데이터(60분전 30분 누적 데이터, 60~90분 전)와 비교
                변경 : 100개 호출, 60분간 누적 데이터, 호출 현시점 기준 10분 전 데이터와 비교

	var requestParam = {
		type : "search",
		interval : 60,
		size : 100
	};
	*/
	var requestParam =	{
							type 		: "search",	//반환되는 스탯 정보의 타입
							size 		: 100,		//반환되는 아이템의 최대 개수
							interval 	: 10,		//몇 분 전 데이터와 비교할지 지정 (5분 단위로 입력)
							span		: 60		//몇 분간의 스탯 정보를 가져올 것인지 설정(60분간의 누적 스탯 정보를 반환. default:30)
						};

	curation.rts.callRtsCuration("stats-transition", requestParam, function(data) {
		if(data != undefined && data != null) {
			var result = data.items;

			if(result != undefined && result != null && result.length > 0) {
				var len = result.length;
				len = len > 10 ? 10 : len;
                htmlType === 'keyword_main' ? suddenKeywordMainSearchView(result,len) :suddenKeywordSearchBottomView(result, len)
			}
		}
	});
}

function suddenKeywordMainSearchView(rankingData, length) {
    var arrHtml = [];
    var rank = 0;
    for(var i=0; i<length; i++) {
        var obj = rankingData[i];

        if(!common.isEmpty(obj.id)) {
            rank++;
            arrHtml.push(suddenKeywordMainSearchRankingView(rank, obj.id, getRankingDiff(obj.rankDiff).rankingCount, getRankingDiff(obj.rankDiff).rankDiffClass));
        }
    }

    $("#mainPopword").html(arrHtml.join("\n"));
}


function suddenKeywordMainSearchRankingView(rank, itemName, count, diffClass){
    var itemNameData = {'itemName' : itemName}
    var itemNameHtml = rank <=3 ? '<strong>${itemName}</strong>' : '${itemName}'

    var data = {'rank' : rank , 'itemName' : itemName, 'rankClass' : rank <= 3 ? 'top' : '', 'count' : count, 'diffClass' : diffClass}

    var html = '<li class="${rankClass}">\n' +
        '            <a href=\'#\' onclick="javascript:popwordSearchdo(\'${itemName}\',\'Pop_PROD\');"  data-attr="공통^통합검색_급상승검색어^${itemName}" >\n' +
        '                <span>${rank}</span>\n' +
                         oy.utils.template(itemNameHtml, itemNameData) +
        '                <span class="rate ${diffClass}">' +
        '                    <span>${count}</span>' +
        '                </span>' +
        '            </a>\n' +
        '        </li>'


    return oy.utils.template(html, data)
}

function suddenKeywordSearchBottomView(rankingData, length) {
    var suddenKeywordSearchBottomHtml = [];
    var rank = 0;

    suddenKeywordSearchBottomHtml.push('<div class="search_btm_results">')
    suddenKeywordSearchBottomHtml.push('<div class="inner">')
    suddenKeywordSearchBottomHtml.push('<h4 class="tit">급상승 검색어</h4>')
    suddenKeywordSearchBottomHtml.push('<div class="cont">')
    suddenKeywordSearchBottomHtml.push('<ul class="list">')

    for(var i=0; i<length; i++) {
        var obj = rankingData[i];

        if(!common.isEmpty(obj.id)) {
            rank++;
            suddenKeywordSearchBottomHtml.push(suddenKeywordSearchBottomRankingView(rank, obj.id, getRankingDiff(obj.rankDiff).rankingCount, getRankingDiff(obj.rankDiff).rankDiffClass));
        }
    }

    suddenKeywordSearchBottomHtml.push('</ul>')
    suddenKeywordSearchBottomHtml.push('</div>')
    suddenKeywordSearchBottomHtml.push('</div>')
    suddenKeywordSearchBottomHtml.push('</div>')


    $("#popword").html(suddenKeywordSearchBottomHtml.join("\n"));
}

function suddenKeywordSearchBottomRankingView(rank, itemName, count, diffClass) {
    var data = {'rank' : rank , 'itemName' : itemName, 'count' : count, 'diffClass' : diffClass, 'rankClass' : rank <= 4 ? 'top' : ''}
    var html = '<li><a href=\'#\' onclick="javascript:popwordSearchdo(\'${itemName}\',\'Pop_PROD\');"><span class="num ${rankClass}">${rank}</span><p class="txt">${itemName}</p><span class="rate ${diffClass}"><span>${count}</span></span></a></li>'

    return oy.utils.template(html, data);
}


function getRankingDiff(rankDiff) {
    var diffClass = "";
    var count = "";
    var diff = rankDiff;

    if(common.isEmpty(diff)) {
        diffClass = "new";
        count = "NEW";
    } else {
        diff = parseInt(diff);

        if(diff == 0) {
            diffClass = "";
            count = "&nbsp;";
        } else if(diff < 0) {
            diffClass = "dn";
            count = Math.abs(diff);
        } else {
            diffClass = "up";
            count = Math.abs(diff);
        }
    }

    return {
        rankingCount : count ,
        rankDiffClass: diffClass,
    }
}

//결과 없음 - 급상승검색어
function noresult_SuddenKeyword() {
    var datatype = "json";
    
    $.ajax({
        type: "POST",
        // [상세검색개선] UI/UX 로직개선 2020-09-07
        //url: _baseUrl + "search/getPopwordAjax.do?target=suddenkeyword",  
        // 2차 개선에서 주석삭제 
        url: _baseUrl + "search/popwordApi.do?target=suddenkeyword",
        // [상세검색개선] UI/UX 로직개선 2020-09-07 - end
        dataType: "json",
        data: {"datatype" : datatype},
        success: function(data) {
            var str = "";           
            str += "<h2>인기검색어</h2>";
            str += "<div class='BoxPopularity'>";                   
            
            var num = 0;
            
            if(data.Data.Word.length != undefined && data.Data.Word.length !='' ){ 
                $.each(data.Data.Word, function(i,item){                              
                   if ( num < 20 ) {
                        if(num == 0 || num == 10){
                            str += "<ol>";  
                        }
                        
                        //순위 1~3위 일 경우, <strong>감싸기
                        if(num < 3){                        
                        //    str += "<li><span class='num'>" +item.id + "</span><a href='#' onclick=\"javascript:popwordSearchdo('" + item.content + "');\"><strong>"+ item.content +"</strong></a></li>";                    
                        }else{
                        //    str += "<li><span class='num'>" +item.id + "</span><a href='#' onclick=\"javascript:popwordSearchdo('" + item.content + "');\">"+ item.content +"</a></li>";
                        }
                        // [3389141] (영역별 매출분석) 오특, 검색, 베스트, 메인 추가(CHY)
                        str += "<li><span class='num'>" +item.id + "</span><a href='#' onclick=\"javascript:popwordSearchdo('" + item.content + "', 'Pop_PROD');\">"+ item.content +"</a></li>";
                        
                        num ++;
                        if(num == 10 || num == 20){
                            str += "</ol>";
                        }                   
                    }
                   
                });
            }else{
                str += "<ol>";        
                // [3389141] (영역별 매출분석) 오특, 검색, 베스트, 메인 추가(CHY)
                str += "<li><span class='num'>" +data.Data.Word.id + "</span><a href='#' onclick=\"javascript:popwordSearchdo('" + data.Data.Word.content + "', 'Pop_PROD');\">"+ data.Data.Word.content +"</a></li>";
                str += "</ol>";
                
            }
            str += "</div>";
            
            $("#popword").html(str);
        }
    });
}

//메인 - 최근검색어 - 검색
function recentSearchdo(query) {    
	
	var giftYn = common._giftCardCheck($("#query").val());
	
    var name = 'listnum';
    var listnumState = getLocalStorageForName(name);
    if(listnumState){
        location.href = _baseUrl + "search/getSearchMain.do?query=" + encodeURIComponent(query) + "&listnum=" + listnumState  + "&giftYn=" + giftYn;
    }else{
        location.href = _baseUrl + "search/getSearchMain.do?query=" + encodeURIComponent(query)  + "&giftYn=" + giftYn;
    }
}

//메인 - 인기검색어 - 검색
//[3389141] (영역별 매출분석) 오특, 검색, 베스트, 메인 추가(CHY)
function popwordSearchdo(query, trackingCd) {
	var giftYn = common._giftCardCheck($("#query").val());
    var name = 'listnum';
    var listnumState = getLocalStorageForName(name);
    
    if(listnumState && !common.isEmpty(trackingCd)){
        location.href = _baseUrl + "search/getSearchMain.do?query=" + encodeURIComponent(query) + "&listnum=" + listnumState + "&giftYn=" + giftYn + "&trackingCd=" + trackingCd;
    }else if(listnumState && common.isEmpty(trackingCd)){
    	location.href = _baseUrl + "search/getSearchMain.do?query=" + encodeURIComponent(query) + "&listnum=" + listnumState + "&giftYn=" + giftYn;
	}else if(!listnumState && !common.isEmpty(trackingCd)){
		location.href = _baseUrl + "search/getSearchMain.do?query=" + encodeURIComponent(query) + "&giftYn=" + giftYn + "&trackingCd=" + trackingCd;
	}else{
        location.href = _baseUrl + "search/getSearchMain.do?query=" + encodeURIComponent(query) + "&giftYn=" + giftYn;
    }
}


//메인 스크립트
$(document).ready(function(){
    //초기 페이지 default 검색어 저장 켜기 
    var search_chk = getCookie_search("sch_check");
    var my = getCookie_search("mykeyword");    

    if(search_chk == undefined){
        setCookie_search("sch_check", "yes", 365);
        $(".sch_save").html("검색어 저장 끄기"); 
    }
    
    if(search_chk == "yes"){ 
        $(".sch_save").html("검색어 저장 끄기");
        
        
        
    }else if(search_chk == ""){       
        $(".sch_save").html("검색어 저장 켜기");
        
    }
    
    //메인 - 검색어저장 버튼 클릭
    $(".sch_save").bind("click", function() {
        var search_chk = getCookie_search("sch_check");           
        if(search_chk == undefined || search_chk == ""){
            setCookie_search("sch_check", "yes", 365);            
            $(".sch_save").html("검색어 저장 끄기");
            getMyKeyword();
                     
        }else if(search_chk="yes"){         
            $(".sch_save").html("검색어 저장 켜기");
            setCookie_search("sch_check", '', 365);          
            getMyKeyword();
            
        }
     });
    
    //Mainpopkeyword();
    //MainSuddenKeyword();
    //getMyKeyword();
    
    if(search_chk == ""){
        $("#searchRecent").removeClass("search_tab tab01 on").addClass("search_tab tab01");
        $("#searchPop").removeClass("search_tab tab02").addClass("search_tab tab02 on");
    }
   
    



});


$("#searchSubmit").bind("click", function() {
    var name = 'listnum';
    var listnumState = getLocalStorageForName(name);
    if ($("#query").val() == "" && $("#query").attr("data-ref-linkUrl") == "") {
        //추천검색어 x & 검색어 입력 없을 시
        
        return;
    } else if ($("#query").val() == "" && $("#query").attr("data-ref-linkUrl") != "") {
        //추천검색어 o & 검색어 입력 없을 시 -> 추천검색어 링크 처리
        location.href = $("#query").attr("data-ref-linkUrl");
    } else {

    	var giftYn = common._giftCardCheck($("#query").val());
    	
        //검색 결과 처리
        if(listnumState){
            location.href = _baseUrl + "search/getSearchMain.do?onlyOneBrand=&query=" + encodeURIComponent($("#query").val()) + "&listnum=" + listnumState + "&giftYn=" + giftYn;
        }else{
            location.href = _baseUrl + "search/getSearchMain.do?onlyOneBrand=&query=" + encodeURIComponent($("#query").val()) + "&giftYn=" + giftYn;
        }

    }
    common.wlog("main_search_icon");
});
 
//메인 - 인기검색어 - 닫기
 $(".sch_pop_close").bind("click", function() {
     
     $(".search_box").prop("class","search_box");
  });

//상세검색 - 가격관련 스크립트
 $(function() {
          $(document).on("keyup", "#sale_over_price", function() {
                             
                  var str = $("#sale_over_price").val();                
                  var org_price = str;
                  
                  var re = /,/gi;
                  var str_end_check = str.substring(str.length-1,str.length);
                  
                  if($.isNumeric(str_end_check) == false && str != "" && str_end_check.indexOf(",") == -1){                     
                      alert("숫자만 입력이 가능합니다.");
                      $("#sale_over_price").prop("value","");
                      $(this).val( $(this).val().replace(/[^0-9]/gi,"") );   
                      return false;
                  }
                  
                //가격이 10억원 넘었을 경우 처리
                  org_price = org_price.replace(/,/gi,"");                                                        
                  if(parseInt(org_price) > 100000000){
                      alert("입력 범위를 넘었습니다");                  
                      return $("#sale_over_price").prop("value","");                  
                  }
                                   
                  if(str.length > 11){
                      
                      alert("입력 범위를 넘었습니다");
                      str = str.substring(0,11);            
                      $("#sale_over_price").prop("value","");
                      //return false;
                  }else{
                      //천원 단위 콤마 구분
                      str = str.replaceAll(",","");                      
                      str = comma(str);                     
                      return $("#sale_over_price").prop("value",str); 
                  }         
              
          });
          
          $(document).on("keyup", "#sale_below_price", function() {
              
              var str = $("#sale_below_price").val();
              var org_price = str;
              
              var re = /,/gi;                                        
              var str_end_check = str.substring(str.length-1,str.length);
              
              if($.isNumeric(str_end_check) == false && str != "" && str_end_check.indexOf(",") == -1){
                  
                      alert("숫자만 입력이 가능합니다.");
                      $("#sale_below_price").prop("value","");
                      $(this).val( $(this).val().replace(/[^0-9]/gi,"") );       
                      return false;
                      
                  
              }
              
              //가격이 10억원 넘었을 경우 처리
              org_price = org_price.replace(/,/gi,"");                                                        
              if(parseInt(org_price) > 100000000){
                  alert("입력 범위를 넘었습니다");                  
                  return $("#sale_below_price").prop("value","");                  
              } 
                           
              if(str.length > 11){                                   
                  alert("입력 범위를 넘었습니다");                  
                  str = str.substring(0,11);            
                  $("#sale_below_price").prop("value","");
                  //return false;
              }else{
                  //천원 단위 콤마 구분
                  str = str.replaceAll(",","");                      
                  str = comma(str);                     
                  return $("#sale_below_price").prop("value",str); 
              }
      });                          
 });
 
 function comma(num){
     var len, point, str;  
        
     num = num + "";  
     point = num.length % 3 ;
     len = num.length;  
    
     str = num.substring(0, point);  
     while (point < len) {  
         if (str != "") str += ",";  
         str += num.substring(point, point + 3);  
         point += 3;  
     }  
      
     return str;
  
 }
 
 //최근 검색어 클릭 이벤트
 $("#searchRecent").bind("click", function() {
     $("#searchRecent").show();                 
     $("#recent_cont").show();
     
     $("#searchPop").show();                 
     $("#w_pop_cont").hide();
     
     $("#chkButton").prop("value","ok");
     
  });
 
 //인기검색어 클릭 이벤트
 $("#searchPop").bind("click", function() {
     $("#searchRecent").show();                 
     $("#recent_cont").hide();
     
     $("#searchPop").show();                 
     $("#w_pop_cont").show();        
    
     $("#chkButton").prop("value","");
     
  });

 //메인 - input 창 focus 이벤트
 $('#query').click(function() {   
     
     //console.log('최근 검색어 삭제하면 여기로 옴');
     //최근검색어 꺼진경우 검색어가 없을때 인기검색어 노출
     //최초 접속시 최근검색어 켜짐 따라서 마우스 클릭시 최근검색어 화면 보임. 
     
      
     var search_chk = getCookie_search("sch_check"); 
     var query = $(queryId).val();
     $("#searchRecent").removeClass("search_tab tab01").addClass("search_tab tab01 on");
     $("#searchPop").removeClass("search_tab tab02 on").addClass("search_tab tab02");
     
     if (query == "") {          
         $("#ark_w").hide();                          
         $("#searchRecent").show();
         $("#searchPop").show();
                      
         $("#recent_cont").show();
         $("#w_pop_cont").hide();
         //$("#searchRecent").removeClass("search_tab tab01").addClass("search_tab tab01 on");          
         if(search_chk =="" ){
             var cbt = $("#chkButton").val();
              
             if(cbt == "ok"){ //최근검색어를 클릭한경우
                 $("#searchRecent").show();
                 $("#searchPop").show();
                 $("#recent_cont").show();
                 $("#w_pop_cont").hide();
             }else{ //최근검색어를 클릭하지 않은 디폴트
                 $("#searchPop").show();
                 $("#w_pop_cont").show();
                 $("#recent_cont").hide();
                 $("#searchRecent").removeClass("search_tab tab01 on").addClass("search_tab tab01");
                 $("#searchPop").removeClass("search_tab tab02").addClass("search_tab tab02 on");
                 // [3490108] 검색어 저장 끄기 상태에서 검색어가 없을 경우 급상승 검색어 노출 문제 수정
                 if (common.header.suddenClickFlag == "N") {
                     MainSuddenKeyword('keyword_main');
                     common.header.suddenClickFlag = "Y";
                 }
             }
         }else{
              
             if($('#mykeyword').find('li').hasClass('no_data')){
                 $("#searchPop").show();
                 $("#w_pop_cont").show();             
                 $("#recent_cont").hide();
                 $("#searchRecent").removeClass("search_tab tab01 on").addClass("search_tab tab01");
                 $("#searchPop").removeClass("search_tab tab02").addClass("search_tab tab02 on");
                 //급상승 검색어 조회
                 if (common.header.suddenClickFlag == "N") {
         			MainSuddenKeyword('keyword_main');
         			common.header.suddenClickFlag = "Y";
         		}  
             }else{              
                 $("#searchRecent").removeClass("search_tab tab01").addClass("search_tab tab01 on");
                 $("#searchPop").removeClass("search_tab tab02 on").addClass("search_tab tab02");
             }
         }
         return;
     }else{ 
         $("#ark_w").show();
         
         $("#searchPop").hide();
         $("#w_pop_cont").hide();                 
         
         $("#searchRecent").hide();
         $("#recent_cont").hide(); 
     }
     
     //doArk(query);
 });


//[3658994] (큐레이션) 검색어저장끄기 클릭 시 급상승검색어 탭 미노출 결함 수정 요청 건 (검색어저장기능 끄기 > 검색 > 검색어 삭제 > '급상승 검색어' 공란으로 출력되는 현상)
$("#query").keyup(function(event) {
		//console.log("DEBUG > search.js - #query.keyup > query:" + query);
	if ($(queryId).val() == ""  &&  common.header.suddenClickFlag == "N") {
		//console.log("DEBUG > search.js - #query.keyup > call MainSuddenKeyword");
		MainSuddenKeyword('keyword_main');
		common.header.suddenClickFlag = "Y";
	}
});

 //자동완성 - 닫기 버튼 클릭 이벤트 
 function onClickArkClose(){     
     $(".search_box").prop("class","search_box");
     
 }
 
 $(document).ready(function() {
     setTimeout(function() {
         //웹로그 바인딩
         bindSearchWebLog();
     }, 700);
 
});
 
 //웹로그 바인딩
 function bindSearchWebLog() {
   
     
     $("#ark_brand").bind("click", function() {          
         common.wlog("home_search_brand"); 
     });
     
     $("#searchPop").bind("click", function() {  
         common.wlog("home_search_popular"); 

		 //[3658994] (큐레이션) 검색어저장끄기 클릭 시 급상승검색어 탭 미노출 결함 수정 요청 건 (검색 > 검색어툴바 click한 상태로(떼지않고) 아래부분으로 내려온 후 '급상승 검색어' click해도 내용이 나타나지 않는 현상 - 현재 검색어저장기능 끄기/켜기 똑같음)
            //console.log("DEBUG > search.js - #searchPop.bind click");
		 if(common.header.suddenClickFlag == "N") {
			//console.log("DEBUG > search.js - #searchPop.bind click >  call MainSuddenKeyword");
			MainSuddenKeyword('keyword_main');
			common.header.suddenClickFlag = "Y";
		 }
     });
     
     $("#searchRecent").bind("click", function() {        
         common.wlog("home_search_recent"); 
     });
      
     $(".searchWrap input[type=submit]").bind("click", function() {
         common.wlog("search_recheck"); 
     });
     
     $("div.brandBanner button").bind("click", function() {  
         common.wlog("search_branddirect"); 
     });
     
     $("div.type_sort button.btn_thumb").bind("click", function() {  
         common.wlog("search_list_gallery"); 
     });
     
     $("div.type_sort button.btn_list").bind("click", function() {  
         common.wlog("search_list_list"); 
     });
         
//     $("ul.cate_prd_list button.btn_zzim").bind("click", function() {           
//         if($('#typeChk').val() == 'list'){
//             common.wlog("search_list_wish"); 
//         }else{
//             common.wlog("search_gallery_wish"); 
//         }
//     });
     
     
     $("p.prd_btn_area button.cartBtn").bind("click", function() {  
         common.wlog("search_list_cart");  
     });
     
     $("p.prd_btn_area button.btn_new_pop").bind("click", function() {  
         common.wlog("search_list_window");  
     });
     
 } 

 
function zzimWebLog() {           
    if($('#typeChk').val() == 'list'){
        common.wlog("search_list_wish"); 
    } else {
        common.wlog("search_gallery_wish"); 
    }
}

//필터링 제거 함수
function doDelFilter( selected ){
    //선택한 체크박스 해제
    $('#'+selected).prop("checked",false);
    
    document.search.submit();
}


//가격필터링 제거 함수
function doDelprice(price){
    
    $("[name=sale_below_price]").val("");
    $("[name=sale_over_price]").val("");
    // min/max 가격 초기화 20201027
    $("[name=setMinPrice]").val("");
    $("[name=setMaxPrice]").val("");
    document.search.submit();
}
//재검색필터링 제거 함수
function doDelquery(query){
    $("[name=tmp_requery]").val("");
    document.search.submit();
    
}


function doDelCate(cate){
    var searchForm = document.search;
    $("[name=cateId]").prop("value","");
    $("[name=cateId2]").prop("value","");
    searchForm.submit();
}

function doDelCate2(cate){
    var searchForm = document.search;
    searchForm.categoryDepthValue.value = '1';
    $("[name=cateId2]").prop("value","");
    searchForm.selectCateNm.value='';
    searchForm.submit();
}

var totalCnt = 0;
var searchKeyword = "";


function getNewCuration(cnt) {
	totalCnt = cnt;
	searchKeyword = $("#query").val();
	
    if(recoBellUseYn == "Y" && recoBellViewYn == "Y"){
    	
    	if(common.isEmpty($.trim(searchKeyword))) {
    		return;
    	}
    	
    	$("#curation_area_s001").show();
    	
    	$(window).scroll(function() {
			var wH = $(window).height(),
	           wS = $(this).scrollTop();
			
			if(window['isCurationAres001Called'] != 'Y'){
				var offsetTop = $("#goods_curation_s001").offset().top;
				
				if(wS > ( offsetTop-wH )){
					curationResult();
					window['isCurationAres001Called'] = 'Y'
				}
			}
			
			if(totalCnt > 3) {
				if(window['isCurationAres204Called'] != 'Y'){
					var offsetTop = $("#curation_area_s204").offset().top;
					
					if(wS > ( offsetTop-wH )){
						curationKeyword();
						window['isCurationAres204Called'] = 'Y'
					}
				}
			}
    	});
    }
    
 	// 큐레이션 : 로그인 후 팝업 reload를 위해 스크립트 추가
   	// curation.reloadEvent();
}


function curationResult() {
	var curation_area = "";
	var title = "";
	var extGoodsStr = "";
	var listType = "";
	
	var param = {
			st : searchKeyword
		};
	
	if(totalCnt >= 0 && totalCnt < 3) {
		curation_area = "1";
		title = "다른 고객님이 많이 검색한 상품";
		tooltip = "다른 고객님들이 <strong>" +searchKeyword+ "</strong> 검색 후 다시 많이 찾은 상품이에요.";
		extGoodsStr = tempGoodsNo; // [기능개선 일감 3680] 추가하게되면 검색에서 나온 상품은 제외하게된다. : jwkim
		listType = "lastY";
	} else {
		curation_area = "2";
		title = "이런 상품을 찾으시나요?";
		tooltip = "검색하신 상품이 마음에 들지 않았다면 대신 이런 상품을 추천해드려요";
		extGoodsStr = tempGoodsNo;
		listType = "lastN";
	}
	
	curation.callCuration("s001", param, function(data) {
		var url = _baseUrl + "search/getEigeneApiAjax.do";
		$("#loadingBox_result_s001").hide();
		
		var results = data.results;
		
		if(results != null && results != undefined) {
			var len = results.length;
			
			if(len > 0) {
				var goodsNo = "";
				var rank = "";
				var egcode = "";
				
				for(var i=0; i<results.length; i++) {
					var itemUrl = results[i].product.itemUrl;
					
					if(itemUrl != "" && itemUrl != undefined) {
						goodsNo += itemUrl.replace("goodsNo=", "");
						rank += results[i].rank != undefined && results[i].rank != "" ? results[i].rank : (i+1);
						egcode += results[i].egcode != undefined && results[i].egcode != "" ? results[i].egcode : "";
						
						if(i != (results.length - 1)) {
							goodsNo += ",";
							rank += ",";
							egcode += ",";
						}
					}
				}
				
				var requestParam = {
					"goodsNoStr" : goodsNo,
					"rankStr" : rank,
					"egcodeStr" : egcode,
					"keyword" : searchKeyword,
					"title" : title,
					"extGoodsNo" : extGoodsStr != [] ? extGoodsStr.join(",") : "",
					"listType" : listType
				};
				
				$.ajax({
					url : url,
					data : requestParam,
					type : "POST",
					dataType : "html",
					success : function(html) {
						$("#goods_curation_s001").html("");
				        $("#goods_curation_s001").html(html);
				        
				        if($("#curation_ulList_s001").find("li").length > 0) {
				        	if(listType == "lastY" && totalCnt > 0) {
				        		$(".ul_curation").addClass("ul_underThree");
				        	} else if(listType == "lastY" && totalCnt == 0) {
				        		$(".ul_curation").addClass("ul_noResult");	
				        	}
				        	
				        	$(".ul_curation").show();

						    var setParam = {
						    	size : 20,
						    	viewType : "VertPop",
						    	popupYn : "Y",
						    	titlRp : title + ";" + tooltip,
						    	recType : "s001",
                                trackingCd : listType == "lastY" ? "noResult_Curation_More" : "Result_Curation_More",
						    	viewArea : listType == "lastY" ? "search_noresult_curation_more_prod" : "search_list_curation_more_prod",
						    	extGoodsNo : extGoodsStr,
						    	rccode : listType == "lastY" ? "pc_search_04_a" : "pc_search_01_a"
						    };
						    
						    var sendParam = jQuery.extend(param, setParam);
						    
						    curation.btnMoreEvent(sendParam);
				        }
					}
				});
				
			}
		}
	});
}

function curationKeyword() {
	
	var param = {
			st : searchKeyword
		};
	
	curation.callCuration("s204", param, function(data) {
		var results = data.results;
		if(results != null && results != undefined) {
			var len = results.length;
			if(len > 0) {
				var div = $("#inner_cura_keyword").find(".curation_btnArea");
				
				len = len > 15 ? 15 : len;
				
				for(var i=0; i<len; i++) {
					div.append("<button onclick=\"javascript:btnKeywordEvent('"+results[i].itemId+"')\";><span data-attr='통합검색결과페이지^추천키워드^"+results[i].itemId+"'>"+results[i].itemId+"</span></button>");
				}
				
				if(div.find("button").length > 0) {
					$("#curation_area_s204").show();
					$("#curation_area_s204").parents("ul:eq(0)").show();
				}
			}
		}
	});
}

function btnKeywordEvent(keyword) {
    var name = 'listnum';
    var listnumState = getLocalStorageForName(name);
    
	var giftYn = common._giftCardCheck(keyword);
	
    //검색 결과 처리
    if(listnumState){
        location.href = _baseUrl + "search/getSearchMain.do?onlyOneBrand=&query=" + encodeURIComponent(keyword) + "&listnum=" + listnumState + "&giftYn=" + giftYn;
    }else{
        location.href = _baseUrl + "search/getSearchMain.do?onlyOneBrand=&query=" + encodeURIComponent(keyword) + "&giftYn=" + giftYn;
    }
}

function onPressSearchBrandLikeButton(e, brndCd) {
    e.stopPropagation();

    if(common.isLogin() == false) {
        common.link.moveLoginPage();
    } else {
        var currentLike = $('.brandInfo p span').text()

        var param = {
            onlBrndCd: brndCd
        };

        if ($('.brandInfo p').hasClass('on')) {
            common.wish.delBrndWishLst(param, $(this));
            $('.brandInfo p').removeClass('on');
            if (Number(currentLike) == 1) {
                $('.brandInfo p').html('브랜드의 상품 안내 및 추천을 받으실 수 있습니다.');
            } else {
                $('.brandInfo p span').text(Number(currentLike) - 1);
            }
        } else {
            common.wish.regBrndWishLst(param, $(this));
            $('.brandInfo p').addClass('on');
            if (Number(currentLike) == 0) {
                var onlBrandNmKr = $('.brandInfo span').text();
                var paticle = common.checkTxtParticle(onlBrandNmKr, "을", "를");
                $('.brandInfo p').html('<span>1</span>명이 ' + onlBrandNmKr + paticle + ' 좋아합니다.');
            } else {
                $('.brandInfo p span').text(Number(currentLike) + 1);
            }
        }
    }

}


