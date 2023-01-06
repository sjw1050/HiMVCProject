<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta property="og:title" content="올리브영 온라인몰" />

<meta property="og:url" content="main.html" />

<meta property="og:image" content="" />

<meta property="og:description" content="대한민국 NO.1 헬스&뷰티 스토어 OLIVEYOUNG" /> 
</head>
<body>

<title>올리브영 온라인몰</title>
<meta name="title" content="올리브영 온라인몰" />
<meta name="description" content="대한민국 NO.1 헬스&뷰티 스토어 OLIVEYOUNG">
<meta name="facebook-domain-verification"
	content="e6vbg9ygxkui4o2owlhxnwptf0mdk2" />

<jsp:include page="/WEB-INF/views/header.jsp"/>

<!-- 검색 결과 총 상품 갯수 counting 위한 foreach문 -->
 <c:forEach items="${searchResult }" var="check">
 	<c:set var= "total" value="${total + 1}"/>
 </c:forEach>
 
<!-- 검색 결과 있을 시 -->
<c:if test="${!empty searchResult}">
	<p class="cate_info_tx">전체 <span>${total }</span>개의 상품이 등록되어 있습니다.</p>	

	<!-- 상품 뿌리기 -->
	<div class="main_recomm_wrap" id="mainReComSlider">
		<div>
		<ul class="cate_prd_list no_line">
			<!-- c:forEach 시작 -->
			<c:forEach items="${searchResult }" var="list"  varStatus="status" >
			
				<li class="flag">
						<div class="prd_info ">
						<input name="productId" type="hidden" value="${list.productId }" />
						<!-- <a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000170878&amp;dispCatNo=90000010001&amp;trackingCd=Home_Recommand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Recommand" class="prd_thumb goodsList" data-ref-goodsNo="A000000170878" data-attr="홈^이상품어때요^[12월 올영픽][미노이PICK/미노이QR카드] 줄라이미 페르소나 퍼퓸 50ml 단품/기획 6종 택1^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="002" data-trk="null" data-impression="A000000170878^홈_이상품어때요^1"> -->
						<a href="${pageContext.request.contextPath }/product/viewOneProduct?productId=${list.productId }" name="Home_Recommand" class="prd_thumb goodsList" data-ref-goodsNo="#" data-attr="#">
							<span class="thumb_flag best">베스트</span>
							<img src="${pageContext.servletConfig.servletContext.contextPath }${list.oliveFile.fileName}" alt="" onerror="common.errorImg(this);"/> 
						</a>
						<div class="prd_name">
							<a href="javascript:;" name="Home_Recommand" class="goodsList" data-ref-goodsNo="A000000170878" data-attr="홈^이상품어때요^[12월 올영픽][미노이PICK/미노이QR카드] 줄라이미 페르소나 퍼퓸 50ml 단품/기획 6종 택1^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="002" data-trk="null">
								<span class="tx_brand">${list.brandName }</span>
								<p class="tx_name">${list.productName }</p>
							</a>
							</div>
							<button class="btn_zzim jeem" data-ref-goodsNo="A000000170878">찜하기</button>
							<p class="prd_price">
								<span class="tx_cur"><span class="tx_num">${list.productPrice}</span>원 </span>
							</p>
							<p class="prd_flag"><span class="icon_flag sale">세일</span>
							<span class="icon_flag coupon">쿠폰</span>
							<span class="icon_flag delivery">오늘드림</span>
							</p>
							<p class="prd_point_area tx_num">
								<span class="review_point"><span class="point" style="width:98.0%">10점만점에 5.5점</span></span>(999+)
							</p>
							<p class="prd_btn_area">
								<button class="cartBtn" data-ref-goodsNo="A000000170878" data-ref-dispCatNo="90000010001" data-ref-itemNo="002">장바구니</button>
								<button class="btn_new_pop goodsList">새창보기</button>
							</p>
						</div>
					</li>
			</c:forEach>
			<!-- c:forEach 끝 -->
			</ul>
		</div>
	</div>
	<!-- 상품 뿌리기 끝 -->

</c:if>
<!-- // 검색 결과 있을 시 -->

	 
	 
	 
<!-- 검색 결과 없을 시 -->
<c:if test="${empty searchResult}">
	<div id="ajaxList">
		<div class="search_no_data">    
			<p>검색하신 <strong> ${query }</strong>에 대한 <strong>검색</strong> 결과가 없습니다.</p>
			<div class="usage-guide">
				<p>다시 검색해 보세요</p>
				<ul>
					<li>검색어의 철자가 정확한지 확인해보세요.</li>            
					<li>한글을 영어로 혹은 영어를 한글로 입력했는지 확인해보세요.</li>            
					<li>검색어의 띄어쓰기를 다르게 해보세요.</li>        
				</ul>    
			</div>
		</div>
	 </div>
</c:if>
<!--// 검색 결과 없을 시  -->
			
	 
	 
	 <!-- 
	 
<div id="Container">
		#Contents
	 
		<div id="Contents">
			<form name="search" id="search" action="/store/search/getSearchMain.do" method="get" onsubmit="return false;">
				<input type="hidden" name="startCount" value="0">
				<input type="hidden" name="sort" value="RNK/DESC">
				<input type="hidden" name="goods_sort" id="goods_sort" value="WEIGHT/DESC,RNK/DESC">
				<input type="hidden" name="collection" value="ALL">
				<input type="hidden" name="realQuery" id="realQuery" value="어앵이이아">
				<input type="hidden" name="reQuery" id="reQuery" value="">
				<input type="hidden" name="viewtype" value="image">
				<input type="hidden" name="category" value="">
				<input type="hidden" name="catename" value="LCTG_ID">
				<input type="hidden" name="catedepth" value="1">
				<input type="hidden" name="rt" value="">
				<input type="hidden" name="setMinPrice" value="">
				<input type="hidden" name="setMaxPrice" value="">
				<input type="hidden" name="listnum" id="listnum" value="24">
				<input type="hidden" name="tmp_requery" value="">
				<input type="hidden" name="tmp_requery2" id="tmp_requery2" value="">
				<input type="hidden" name="categoryDepthValue" value="">
				<input type="hidden" name="cateId" value="">
				<input type="hidden" name="cateId2" value="">
				<input type="hidden" name="BenefitAll_CHECK" value="">
				<input type="hidden" name="query" id="query" value="어앵이이아">

				<input type="hidden" name="selectCateNm" id="selectCateNm" value="전체">
				<input type="hidden" name="firstTotalCount" id="firstTotalCount" value="0">
				<input type="hidden" name="typeChk" id="typeChk" value="thum">
				<input type="hidden" name="branChk" id="branChk" value="">
				<input type="hidden" name="brandTop" id="brandTop" value="">

				<input type="hidden" name="attrChk" id="attrChk" value="">
				<input type="hidden" name="attrTop" id="attrTop" value="">
				<input type="hidden" name="onlyOneBrand" id="onlyOneBrand" value="">
				<input type="hidden" name="quickYn" id="quickYn" value="N">

				<input type="hidden" name="cateChk" id="cateChk" value="">
				<input type="hidden" name="benefitChk" id="benefitChk" value="">


				<input type="hidden" name="attrCheck0" id="attrCheck0" value="">
				<input type="hidden" name="attrCheck1" id="attrCheck1" value="">
				<input type="hidden" name="attrCheck2" id="attrCheck2" value="">
				<input type="hidden" name="attrCheck3" id="attrCheck3" value="">
				<input type="hidden" name="attrCheck4" id="attrCheck4" value="">

				<input type="hidden" name="brandChkList" id="brandChkList" value="">
				<input type="hidden" name="benefitChkList" id="benefitChkList" value="">

				
				<input type="hidden" name="_displayImgUploadUrl" id="_displayImgUploadUrl" value="https://image.oliveyoung.co.kr/uploads/images/display/">

				<input type="hidden" name="recobellMbrNo" id="recobellMbrNo" value="null">
				<input type="hidden" name="recobellCuid" id="recobellCuid" value="8b47cf9f-efd1-48e4-8f83-10ee8a07945b">
				
				20210805 오타 키워드 정타 키워드 변경 알림 S
				<div id="suggestKeywordWrap"></div>
				20210805 오타 키워드 정타 키워드 변경 알림 E
	
				검색어오류 영역 추가 (2017-01-13 추가) 
				<div class="searchResultArea">    <p class="resultTxt"><strong>어앵이이아</strong>검색결과 (전체 <span>0개</span>의 상품)    </p></div>
				// 검색어오류 영역 추가
				연관검색어			
				<div class="relatedSearch" style="display:none;">
					<div class="tit"><span>연관검색어</span></div>
					<div class="link" id="recommend"></div>
					<button class="btn_more">더보기</button>
				</div>			
				//연관검색어
				
				상품 속성 정보 검색 서비스 개선
				<div class="detailSearch new"></div>
				// 상품 속성 정보 검색 서비스 개선
			</form>

			<div id="banner_area" style="display: none;"></div>
			
			<p class="cate_info_tx" style="display: none;"></p>
			bFirstSearch
			상품 정렬 조건 영역
			<div class="cate_align_box" style="display: none;">
				<div class="align_sort"> 
					<ul>
						<li class="on"><a href="#" value="WEIGHT/DESC,RNK/DESC" onclick="doSorting('WEIGHT/DESC,RNK/DESC');">인기순</a></li>
						<li><a href="#" value="DATE/DESC" onclick="doSorting('DATE/DESC');">최근등록순</a></li>
						<li><a href="#" value="SALE_QTY/DESC" onclick="doSorting('SALE_QTY/DESC');">판매수량순</a></li>
						

						<li><a href="#" value="SALE_PRC/ASC" onclick="doSorting('SALE_PRC/ASC');">낮은 가격순</a></li>
						<li><a href="#" value="SALE_PRC/DESC" onclick="doSorting('SALE_PRC/DESC');">높은 가격순</a></li>
					</ul>
				</div>
				<div class="count_sort tx_num">
					<span class="tx_view">VIEW</span>
					<ul>
						<li class="on">24</li>
						<li>36</li>
						<li>48</li>
					</ul>
				</div>
				<div class="type_sort">
					<button class="btn_thumb active">컬럼형식으로 보기</button>
					<button class="btn_list">리스트형식으로 보기</button>
				</div> 
			</div>
			// 상품 정렬 조건 영역  
			
			카테고리 상품 리스트 
			컬럼형 리스트
			<div id="ajaxList"><div class="search_no_data">    <p>검색하신 <strong> 어앵이이아</strong>에 대한 <strong>검색</strong> 결과가 없습니다.</p>    <div class="usage-guide">        <p>다시 검색해 보세요</p>        <ul>            <li>검색어의 철자가 정확한지 확인해보세요.</li>            <li>한글을 영어로 혹은 영어를 한글로 입력했는지 확인해보세요.</li>            <li>검색어의 띄어쓰기를 다르게 해보세요.</li>        </ul>    </div></div></div>
			// 컬럼형 리스트
			
			// 카테고리 상품 리스트
			<div id="curationArea">            <ul style="display:none;">                <li class="cura_resultsList">                    <div class="cura_pord crtBtm" id="curation_area_s204" style="display: none;">                        <div id="inner_cura_keyword">                            <div class="cura_ttl">추천 키워드</div>                            <div class="curation_btnArea">                            </div>                        </div>                    </div>                </li>            </ul>            <ul class="ul_curation" style="display:none;">                <li>                    <div class="cura_pord crtBtm" id="curation_area_s001" style="">                        <div class="curation_slide type01" id="goods_curation_s001">                        </div>                        <div class="loading_box" id="loadingBox_result_s001" style="display: none;">                            <span class="icon"><img src="https://static.oliveyoung.co.kr/pc-static-root/image/comm/pc_loading.gif" alt="로딩중"></span>                            <p class="txt">고객님을 위한 상품 추천중이에요</p>                        </div>                    </div>                </li>            </ul></div>

				<div class="popularitySearch" id="popword"><div class="search_btm_results">
<div class="inner">
<h4 class="tit">급상승 검색어</h4>
<div class="cont">
<ul class="list">
<li><a href="#" onclick="javascript:popwordSearchdo('닥터자르트 세라마이딘','Pop_PROD');"><span class="num top">1</span><p class="txt">닥터자르트 세라마이딘</p><span class="rate "><span>&nbsp;</span></span></a></li>
<li><a href="#" onclick="javascript:popwordSearchdo('립밤','Pop_PROD');"><span class="num top">2</span><p class="txt">립밤</p><span class="rate "><span>&nbsp;</span></span></a></li>
<li><a href="#" onclick="javascript:popwordSearchdo('틴트','Pop_PROD');"><span class="num top">3</span><p class="txt">틴트</p><span class="rate up"><span>1</span></span></a></li>
<li><a href="#" onclick="javascript:popwordSearchdo('쿠션','Pop_PROD');"><span class="num top">4</span><p class="txt">쿠션</p><span class="rate dn"><span>1</span></span></a></li>
<li><a href="#" onclick="javascript:popwordSearchdo('핸드크림','Pop_PROD');"><span class="num ">5</span><p class="txt">핸드크림</p><span class="rate "><span>&nbsp;</span></span></a></li>
<li><a href="#" onclick="javascript:popwordSearchdo('3ce','Pop_PROD');"><span class="num ">6</span><p class="txt">3ce</p><span class="rate "><span>&nbsp;</span></span></a></li>
<li><a href="#" onclick="javascript:popwordSearchdo('롬앤','Pop_PROD');"><span class="num ">7</span><p class="txt">롬앤</p><span class="rate "><span>&nbsp;</span></span></a></li>
<li><a href="#" onclick="javascript:popwordSearchdo('마스카라','Pop_PROD');"><span class="num ">8</span><p class="txt">마스카라</p><span class="rate "><span>&nbsp;</span></span></a></li>
<li><a href="#" onclick="javascript:popwordSearchdo('넘버즈인','Pop_PROD');"><span class="num ">9</span><p class="txt">넘버즈인</p><span class="rate "><span>&nbsp;</span></span></a></li>
<li><a href="#" onclick="javascript:popwordSearchdo('마스크팩','Pop_PROD');"><span class="num ">10</span><p class="txt">마스크팩</p><span class="rate dn"><span>1</span></span></a></li>
</ul>
</div>
</div>
</div></div>
				//
			pageing start
			<div class="pageing">
			</div>
			//pageing end			
		</div>
		</div>
		//#Contents
	</div>
<script type="text/javascript" src="https://static.oliveyoung.co.kr/pc-static-root/js/search/newSearch.js?dumm=20230103001"></script>
<script type="text/javascript">
var authenticYn = "N";
var tempGoodsNo = new Array();
var brand = "";
var attr_chkList = ""; 
var bFirstSearch = true;

var selectList = new Array();
var selectListCate1 = new Array();
var selectListCate2 = new Array();
var selectListBenefit = new Array();
var selectListBenefit2 = new Array();
var selectCateNm = "전체";
var isGtmClickEvent = false;

window.dataLayer = window.dataLayer || [];

window.addEventListener('scroll', function() {

	var intViewportHeight = $(window).innerHeight();
	var curationArea = $("#curation_area_s204");
	var some1 = curationArea.offset().top;							// 아래에 걸린 경우
	var some2 = some1 + curationArea.height() - intViewportHeight;	// 위에 걸린 경우

	if (some1 > 0 && some2 > 0 && $(window).scrollTop() <= some1 && $(window).scrollTop() >= some2 && isGtmClickEvent === false) {

		$('.curation_btnArea button').each(function() {
			window.dataLayer.push(
					{
						'event': 'click-event',
						'data-attr' : '통합검색결과페이지^추천키워드^' + $(this).find('span').text()
					}
			);
			isGtmClickEvent = true
		})
	}
})


$(document).ready(function() {
   
 	// 레코벨 사용 여부 셋팅
    recoBellUseYn = "Y";
	// 레코벨 show 여부 셋팅
    recoBellViewYn = "Y";
    
    // 검색결과조회
    NewSearchMain.detail.init();    
    
    recommend('어앵이이아');
    
    
	//20181217
	//현재 로컬스토리지에 있는 값을 읽어 옴
	//getLocalStorageValue();
	
	//20181217
	//현재 로컬스토리지에 있는 view 값을 읽어옴
	getViewValue();
	
	//페이지 로딩 처리 초기화
	
	var numberName = 'numberFlag';
	var viewName = 'viewFlag';
	
	
	//로컬스토리지에서 현재 값을 가져오기
	//var viewState = getLocalStorageForName(viewName);
	
		
    var reChk = '';
	if(reChk == null || reChk ==''){
	    $('#reChk').val(''); 
	}

	var reQuery = '';
	if(reQuery == null || reQuery ==''){
	    $('#reChk').val('');
	    $('#reQuery').val(''); 
	}

	//가격 초기화
	var saleBelowPrice = '';
	if(saleBelowPrice == null || saleBelowPrice ==''){
	    $('#sale_below_price').val('');
	}
	var saleOverPrice =  '';
	if(saleOverPrice == null || saleOverPrice ==''){
	    $('#sale_over_price').val('');
	}
	
    //브랜드
    var brndChk1 ='';
	if(brndChk1 == null || brndChk1 ==''){
	    $('input[name=brand_check]').attr('checked', false);
	}
	
	//기능 초기화
	var attrChk1 ='';
	if(attrChk1 == null || attrChk1 ==''){
	    $('input[name^=attr_check]').attr('checked', false);
	}
	
	
	//베네핏 초기화 
	var benefitChk1 ='';
	if(benefitChk1 == null || benefitChk1 ==''){
	    $('input[name=benefit_check]').attr('checked', false);
	}
	
	getMyKeyword('어앵이이아', 0);  
	
	//장바구니 클릭
    $(".cartBtn").bind('click',function(){
        if (common.loginChk()) {
            //  옵션선택이 있거나, 없거나 일단 화면 진입
            var url = _baseUrl + "common/getCartOptionSelectAjax.do";
            var data = {goodsNo : $(this).attr("data-ref-goodsNo"), itemNo : $(this).attr("data-ref-itemNo"), itemCnt : $(this).attr("data-ref-cnt"), prstyn : $(this).attr("data-ref-prstyn") };
			// 상품카드 장바구니버튼 트래킹코드
			common.cart.trackingInfo.setTrackingCd($(this));
            common.Ajax.sendRequest("POST",url,data,common._callCartOptionSelect);                    
        }
    });
	
	//브랜드 오픈 상태 유지
    //if('opened' == ''){
    //    $('.#branChk').addClass('more_view');
	//}else{
	//    $('#branChk').scrollTop(0);
	//    $('#branChk').removeClass('more_view');
	//}
	
	//브랜드 카테고리 스크롤 위치		
	//if($('#brandTop').val() != '' ){
    //	$('.finderArea>li .listBrand').scrollTop($('#brandTop').val());
	//}
	
	if($('#onlyOneBrand').val() != ''){
	    var bCode = "inpChk1_"+$('#onlyOneBrand').val()
	    $('#'+bCode).prop('checked', true);
	}
	
    if('N'=="Y"){
        $("#check_view").prop('checked', true);
        
    }else{
        $("#check_view").prop('checked', false);
    }

	var firstTotalCount = $("#firstTotalCount").val();

	if (window.location.href.indexOf("onlBrndCd") != -1) {
		if (firstTotalCount < 3) {
			$('.btn_thumb').removeClass('active');
			$('.btn_list').addClass('active');
			$('.cate_prd_list').addClass('list_type');
		}
	}

	//test
	  /* $('.list.show').on('click', function(){
	      //alert("111");
	      var _this = $(this),
			   _thisCate = _this.parents('.search_box.cate'); 
	   	   _thisSbox = _this.parents('.search_box');
	   	   
	   		
	   	_thisCate.toggleClass('on');
	   		
	   		
	   		if(_thisSbox.hasClass('cate')){
		   	 	if(!_thisCate.hasClass('on')){
		   	 	 $('#cateChk').val('opened');
		   	 	}else{
				 $('#cateChk').val('');
				}
		   	}
	  }); */
});

//서비스 기획팀 강민주님 요청으로 롤백 2021-08-26































//상세검색 아닐때 결과없음 wlog 
function noresult_wlog(){
	$(document).ready(function() {
	     setTimeout(function() {
	         common.wlog("search_noresult");
	     }, 700);
	});
	//alert(2);
}

//20181217
function getViewValue(){
    var name = 'viewFlag';
    var viewState = getLocalStorageForName(name);
    if(viewState == null){ //numbe 값이 없다면 (로컬스토리지 내 저장된 값이 없다면)
        localStorage.setItem('viewFlag', 'btn_thumb');
    }else if(viewState == 'btn_thumb'){ //로컬스토리지 viewFlag 값이 btn_thumb이라면
        $('.cate_prd_list').removeClass('list_type');
		$('#typeChk').val('thum');
		$('.btn_list').removeClass('active');
		$('.btn_thumb').addClass('active');	
    }else{ //로컬스토리지 viewFlag 값이 btn_list 이라면		
        
	    $('.cate_prd_list').removeClass('btn_thumb');
		$('#typeChk').val('list');
		$('.cate_prd_list').addClass('list_type');
		$('.btn_thumb').removeClass('active');
		$('.btn_list').addClass('active');	
	}
}

$(window).load(function() {
    common.wish.init();
    
}); 
</script>
 -->


<jsp:include page="/WEB-INF/views/footer.jsp"/>
</body>
</html>