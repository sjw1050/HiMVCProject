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
<%-- <meta property="og:title" content="마이페이지 | 올리브영" />
<meta property="og:url" content="${pageContext.request.contextPath }/mypage/main" />
<meta property="og:image" content=""/> 
<meta property="og:description" content="대한민국 NO.1 헬스&뷰티 스토어 OLIVEYOUNG" /> --%>
</head>
<body>
<jsp:include page="./mypage_header.jsp"></jsp:include>	
<script src="${pageContext.request.contextPath }/resources/js/mypage/mypage.header.js?dumm=20221229001"></script>
<script>
	$(window).ready(function(){
	    mypage.header.init();
	});
</script>	
<div class="mypage-conts">	
			<div class="title-area2">
				<h2 class="tit">주문/배송 조회</h2>
				<!-- <a class="btnMore" id="orderListMore" href="https://www.oliveyoung.co.kr/store/mypage/getOrderList.do" data-attr="마이페이지^주문배송조회_더보기^더보기">더보기</a> -->
			</div>
			<div class="layer_pop_wrap" id="service_survey"></div>
			<a href="${pageContext.request.contextPath }/mypage/getOrderList" class="order_view" data-attr="마이페이지^주문배송조회_요약건수"></a>
				<ul class="mypage-step">
						<c:forEach var="order" items="${order }" >
						<li>						
						<span>주문번호 : <a href="${pageContext.request.contextPath }/mypage/orderdetail?orderId=${order.orderId }">${order.orderId }</a></span><div class="orders">주문날짜 : ${order.orderDate }[주문상태 : ${order.status.status}]</div>
						</li>
						</c:forEach>
				</ul>

<!-- 			<div class="title-area mgT15">
				<h2 class="tit">좋아요</h2>
				<a class="btnMore" id="wishListMore" href="https://www.oliveyoung.co.kr/store/mypage/getWishList.do">더보기</a>
			</div> -->
		
			<!-- 좋아요 상품 목록 -->
			
<!-- 			<div class="list-four">상품 3개 list-three, 상품 4개 list-four
				
					
					
						<ul class="cate_prd_list">
							<li class="nodata">좋아요 상품이 없습니다.</li>
						</ul>
					 
				
			</div>-->
			<!-- //좋아요 상품 목록 -->
		
			<div class="area-over" id="cousel">
				<!-- <div class="left"> -->
				<div class="tit"> <!-- class="left" -->
					<div class="title-area">
						<h2 class="tit">1 : 1 문의내역</h2>
						 <a class="btnMore" id="qnaListMore" href="${pageContext.request.contextPath }/cs/quest/view">더보기</a> 
					</div>
<!-- 					<div class="list-customer">
						<ul>
							<li> -->
							<jsp:include page="../customercenter/quest/viewcontent.jsp"></jsp:include>
				</div>
				<!-- </div> -->
				<!-- <div class="right"> -->
				<div class="tit"> <!-- class="right" -->
					<div class="title-area">
						<h2 class="tit">상품Q&amp;A내역</h2>
						<a class="btnMore" id="goodsQnaListMore" href="${pageContext.request.contextPath }/mypage/productqnaList">더보기</a> 
					</div>
		
					<div class="list-customer">
						<ul>	
							<li><jsp:include page="/WEB-INF/views/mypage/productqnaList.jsp"/></li>
						</ul>
					</div>
			
				</div>
			<!-- </div> -->
			</div>



<!-- //마이페이지 컨텐츠 -->
<script src="${pageContext.request.contextPath }/resources/js/mypage/mypage.main.js?dumm=20221229001"></script>
<script type="${pageContext.request.contextPath }/resources/js/mypage/myorder.js?dumm=20221229001"></script>
<script src="${pageContext.request.contextPath }/resources/js/login/login.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.12.1/underscore-min.js"></script>
<script>
	$(window).ready(function(){
	    mypage.main.init();
	});

	$(document).ready(function(){
		var cookieCheck = getCookie("myMainPop");
		// console.log("쿠키체크가 되는지 로그!!!! todayDone으로 저장될 경우 미노출!!!",cookieCheck);
		if(cookieCheck != 'todayDone'){
			if('' != null && !''.isEmpty()){
				var survMainPop = {
					ordNo             : '',
					svcSurvSeq        : '',
					ordDtlSctCd       : '',
					strNo             : '',
					ordDtime          : '',
					totSalePrc        : '',
					svcSurvTitle      : '',
					svcSurvDesc       : '',
					strNm             : ''
				}
				var targetUrl = _baseUrl+ "mypage/popup/getMypageSurvPop.do";
				$('#service_survey').load(targetUrl,survMainPop,function (){
					fnLayerSet('service_survey','open','');
					$('#service_survey').css('top','3%');
					$('#service_survey').css('z-index','999');
				});
			}
		}

	});
	function getCookie(cName) {
			cName = cName + '=';
			var cookieData = document.cookie;
			var start = cookieData.indexOf(cName);
			var cValue = '';
			if(start != -1){
				start += cName.length;
				var end = cookieData.indexOf(';', start);
				if(end == -1){
					end = cookieData.length;
				}
				cValue = cookieData.substring(start, end);
			}
			return unescape(cValue);
	}
</script>






			</div>
		</div>
		
	

	<script>
		$(document).ready(function() {
		    common.gnb.initMypageMenu(); 
		});
	</script>	







	<div class="laytoast" id="brandOff" style="display: none;">
		<div class="inner">
			<p class="txt_recom txt_01">브랜드<br><em>좋아요</em></p>
		</div>
	</div>
	<div class="laytoast on" id="brandOn" style="display: none;">
		<div class="inner">
			<p class="txt_recom txt_01">브랜드<br><em>좋아요</em></p>
		</div>
	</div>
	<!-- 브랜드 찜 확인 레이어 -->
	<div class="layerAlim brand zzimOn" style="display:none;"><!-- zzimOn / zzimOff -->
	 <span class="icon"></span>
	 <p>브랜드<strong>좋아요</strong></p>
	</div>

	<div class="layerAlim brand zzimOff" style="display:none;"><!-- zzimOn / zzimOff -->
	 <span class="icon"></span>
	 <p>브랜드<strong>좋아요</strong></p>
	</div>
	<!-- 브랜드 찜 확인 레이어 -->
	
	<!-- 찜 확인 레이어 -->
	<div class="layerAlim zzimOn wishPrd" style="display:none;">
		<span class="icon"></span>
		<p class="one"><strong>좋아요</strong></p>
	</div>
	<!--// 찜 확인 레이어 -->
	
	<!-- 찜 취소 레이어 -->
	<div class="layerAlim zzimOff wishPrd" style="display:none;">
		<span class="icon"></span>
		<p class="one"><strong>좋아요</strong></p>
	</div>
	<!--// 찜 취소 레이어 -->

	<!-- 2017-02-23 수정 : TOP 바로가기 버튼 추가 -->
	<div id="directTop">
		<button><span></span>TOP</button>
	</div>
	<!--/ㅁ 2017-02-23 수정 : TOP 바로가기 버튼 추가 -->
</div>
</div>
 <jsp:include page="../footer.jsp"/>
</body>
</html>