<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/registForm_valid_check.js"></script>	
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script>
let memberNum = "${info.memberNum}";
function confirmmsg() {
	if(confirm("회원 탈퇴 시 고객님의 모든 정보가 삭제되며, 복구가 불가능 할 수 있습니다 그래도 탈퇴하시겠습니까?")){
		return true;
	}else{
		return false;
	}
}

function showPopUp() {
	
	//창 크기 지정
	var width = 500;
	var height = 500;
	
	//pc화면기준 가운데 정렬
	var left = (window.screen.width / 2);
	var top = (window.screen.height / 4);
	
    	//윈도우 속성 지정
	var windowStatus = 'width='+width+', height='+height+', left='+left+', top='+top+', scrollbars=yes, status=no, resizable=yes, titlebar=no';
	
    	//연결하고싶은url
    	const url = "${pageContext.request.contextPath}/mypage/withdrawalform?memberNum="+memberNum;

	//등록된 url 및 window 속성 기준으로 팝업창을 연다.
	window.open(url, "hello popup", windowStatus);
}
</script>
<%-- <meta property="og:title" content="마이페이지 | 올리브영" />
<meta property="og:url" content="${pageContext.request.contextPath }/mypage/main" />
<meta property="og:image" content=""/> 
<meta property="og:description" content="대한민국 NO.1 헬스&뷰티 스토어 OLIVEYOUNG" /> --%>
</head>
<body>
<title>마이페이지 | 올리브영</title>
<!-- <meta name="title" content="마이페이지 | 올리브영" />
<meta name="description" content="올리브영 온라인몰 MY 페이지 입니다.">
<meta name="facebook-domain-verification" content="e6vbg9ygxkui4o2owlhxnwptf0mdk2" /> -->
    
 <jsp:include page="../header.jsp"/>
<div id="Container">
		
		<div id="Contents">	
		
		
  <div class="mypage-head rate_05">
				<h1 class="tit"><a href="${pageContext.request.contextPath }/mypage/main">마이페이지</a></h1>
				
				<div class="grd-box">
					<div class="info_user clrfix">
						
						<div class="thum">
							<span class="bg"></span>
								
									<img src="${pageContext.request.contextPath }/resources/image/comm/my_picture_base.jpg" alt="" onerror="common.errorImg(this);"> 
</div>
						<p class="txt">
레벨:${info.level } <strong class="name">${info.name }</strong>님 반갑습니다 
</p>
<ul class="mem_opt">
							<li id="membershipBenefit"><a href="">멤버십라운지</a></li>
							
							<li id="profileModify"><a href="">나의 프로필</a></li>
						</ul>
					</div>
					
					
					
					
					<div class="point-box ">
						<ul class="infor clrfix" id="pointInfo">
							<li id="cjOnePoingInfo" >
								<span class="tit">CJ ONE 포인트</span>
								<a class="num" href="javascript:;" >0<em class="unit">P</em></a>
							</li>
							<li id="couponList">
								<span class="tit">쿠폰</span>
								<a class="num" href="javascript:;" data-attr="마이페이지^쿠폰^쿠폰함이동">0<em class="unit">개</em></a>
							</li>
							<li id="depositList">
								<span class="tit">예치금</span>
								<a class="num" href="javascript:;" >0<em class="unit">원</em></a>
							</li>
							
						</ul>
					</div>
				</div>
			</div>
			<div class="mypage-ix">
			

				
				<div class="mypage-lnb">
					<ul>
						<li><h2>마이 쇼핑</h2>
							<ul>
								<li class="subMenu"><a href="${pageContext.request.contextPath }/mypage/getOrderList" data-attr="마이페이지^메뉴^주문/배송 조회">주문/배송 조회</a></li>
								<li class="subMenu"><a href="javascript:;" myMenuId="0102" data-ref-linkUrl="" data-attr="마이페이지^메뉴^취소/반품/교환 내역">취소/반품/교환 내역</a></li>
							</ul>
							<ul class="line">
								<li class="subMenu"><a onclick="return loginCheck('${info}')" href="${pageContext.request.contextPath }/cart/viewCart" data-attr="마이페이지^메뉴^장바구니">장바구니</a></li>
								<li class="subMenu"><a href="javascript:;" myMenuId="0202" data-ref-linkUrl="" data-attr="마이페이지^메뉴^좋아요">좋아요</a></li> <!-- =찜하기 -->
							</ul>

						</li>
						<li><h2>마이 활동</h2>
							<ul>
								<li class="subMenu"><a href="${pageContext.request.contextPath }/cs/quest/view" data-attr="마이페이지^메뉴^1:1문의내역">1:1문의내역</a>
								
								<!-- 리뷰는 아직 -->
								<li class="subMenu"><a href="#"  data-attr="마이페이지^메뉴^리뷰">리뷰 (<span class="num_review" id="_gdasPossibleTotCnt"></span>)<img src="https://static.oliveyoung.co.kr/pc-static-root/image/comm/icon_lnb_new2.png" class="new" id="_newGdasPossible" style="display: none;" alt="신규 리뷰 작성" /></a></li>
								<li class="subMenu"><a href="${pageContext.request.contextPath }/mypage/productqnaList" data-attr="마이페이지^메뉴^상품Q&A내역">상품Q&amp;A내역</a></li>
							</ul>
						</li>
						<li><h2>마이 정보</h2>
							<ul>
								<li class="subMenu"><a href="${pageContext.request.contextPath }/mypage/modifymemberform?memberNum=${info.memberNum}" data-attr="마이페이지^메뉴^회원정보 수정">회원정보 수정</a></li>
								<li class="subMenu"><a href="${pageContext.request.contextPath }/mypage/address" data-attr="마이페이지^메뉴^배송지/환불계좌">배송지 정보 확인</a></li>
								<li class="subMenu"><a onclick="return confirmmsg()" href="javascript:showPopUp()" data-attr="마이페이지^메뉴^회원탈퇴">회원탈퇴</a></li>
							</ul>
						</li>
					</ul>
				</div>
				<!-- //마이페이지 SUB 메뉴 -->

<!-- //마이페이지 SUB -->
<script src="${pageContext.request.contextPath }/resources/js/mypage/mypage.side.js?dumm=20221229001"></script>
<script>
	$(window).ready(function(){
	    mypage.side.init();
	    
	    if(_isLogin) {
	    	var gdasPossibleTotCnt = sessionStorage.getItem("gdasPossibleTotCnt");
	    	// if( common.isEmpty(gdasPossibleTotCnt) ) {
	    		common.Ajax.sendJSONRequest(
						"POST"
					  , _baseUrl + "mypage/getGdasPossibleTotCnt.do"
					  , null
					  , function(res) {
						  if(res.result != null && res.result > 0) {
							  sessionStorage.setItem("gdasPossibleTotCnt", res.result.numberFormat());
						} else {
							 sessionStorage.setItem("gdasPossibleTotCnt", "0");							
						}
						$("#_gdasPossibleTotCnt").text( sessionStorage.getItem("gdasPossibleTotCnt") );
						  
				  });
	    	//} else {
	    	//	$("#_gdasPossibleTotCnt").text( gdasPossibleTotCnt );
	    	//}
	    	
	    	// [3283136] 마이페이지 PC GUI 개편 및 장바구니 버튼 추가 요청의 件(CHY)
	    	// 신규 리뷰 작성 여부의 따라 N 아이콘 표출
    		var lastCheckDtime = localStorage.getItem("lastCheckDtime");
           	common.Ajax.sendJSONRequest(
       				"POST"
       			  , _baseUrl + "mypage/getNewGdasPossibleCnt.do"
       			  , {"lastCheckDtime" : lastCheckDtime}
       			  , function(res) {
     				  if(res.result > 0) {
     					$("#_newGdasPossible").show();
     				  } else {
     					  $("#_newGdasPossible").hide();
     				  }
       		  });
	    }
	    
	});
</script>