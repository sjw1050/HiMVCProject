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
							<li id="membershipBenefit"><a href="javascript:common.wlog('mypage_coupon_onbenefit_tab');" onclick="location.href='https://www.oliveyoung.co.kr/store/main/getMembership.do';">멤버십라운지</a></li>
							
							<li id="profileModify"><a href="javascript:common.wlog('mypage_profile');" onclick="mypage.header.goReviewerProfile('YnVVUnc5ZzJGQkdobGtRekdqOUltdz09')">나의 프로필</a></li>
						</ul>
					</div>
					
					
					
					
					<div class="point-box ">
						<ul class="infor clrfix" id="pointInfo">
							<li id="cjOnePoingInfo" onclick="location.href='https://www.oliveyoung.co.kr/store/mypage/getCJOnePointInfo.do'">
								<span class="tit">CJ ONE 포인트</span>
								<a class="num" href="javascript:;" >0<em class="unit">P</em></a>
							</li>
							<li id="couponList" onclick="location.href='https://www.oliveyoung.co.kr/store/mypage/getCouponList.do'">
								<span class="tit">쿠폰</span>
								<a class="num" href="javascript:;" data-attr="마이페이지^쿠폰^쿠폰함이동">0<em class="unit">개</em></a>
							</li>
							<li id="depositList" onclick="location.href='https://www.oliveyoung.co.kr/store/mypage/getDepositList.do'">
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
								<li class="subMenu"><a href="${pageContext.request.contextPath }/mypage/orderdetail" data-attr="마이페이지^메뉴^주문/배송 조회">주문/배송 조회</a></li>
								<li class="subMenu"><a href="javascript:;" myMenuId="0102" data-ref-linkUrl="https://www.oliveyoung.co.kr/store/mypage/getOrderCancelList.do" data-attr="마이페이지^메뉴^취소/반품/교환 내역">취소/반품/교환 내역</a></li>
							</ul>
							<ul class="line">
								<li class="subMenu"><a onclick="return loginCheck('${info}')" href="${pageContext.request.contextPath }/cart/viewCart" data-attr="마이페이지^메뉴^장바구니">장바구니</a></li>
								<li class="subMenu"><a href="javascript:;" myMenuId="0202" data-ref-linkUrl="https://www.oliveyoung.co.kr/store/mypage/getWishList.do" data-attr="마이페이지^메뉴^좋아요">좋아요</a></li> <!-- =찜하기 -->
							</ul>

						</li>
						<li><h2>마이 활동</h2>
							<ul>
								<li class="subMenu"><a href="${pageContext.request.contextPath }/quest/viewquest" data-attr="마이페이지^메뉴^1:1문의내역">1:1문의내역</a>
								
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


				
				<div class="mypage-conts">
<script src="${pageContext.request.contextPath }/resources/js/mypage/mypage.header.js?dumm=20221229001"></script>
<script>
	$(window).ready(function(){
	    mypage.header.init();
	});
</script>				
		<!-- 마이페이지 컨텐츠 -->







	
 	
			<!-- Olive Lounge -->
			<!-- 2019-09-18 멤버십 라운지 개편으로 삭제 -->
			
			<!-- //Olive Lounge -->
	
			<div class="title-area2">
				<h2 class="tit">주문/배송 조회</h2>
				<!-- <a class="btnMore" id="orderListMore" href="https://www.oliveyoung.co.kr/store/mypage/getOrderList.do" data-attr="마이페이지^주문배송조회_더보기^더보기">더보기</a> -->
			</div>
			<div class="layer_pop_wrap" id="service_survey"></div>
			<a href="https://www.oliveyoung.co.kr/store/mypage/getOrderList.do" class="order_view" data-attr="마이페이지^주문배송조회_요약건수"></a>
				<ul class="mypage-step">
					<p>주문자 정보</p>
						<div>
						<c:forEach var="orderList" items="${orderList }" varStatus="status" >
							<c:if test="${status.first }">
							<p><span>주문번호 :</span>${orderList.orderId }</p>
						    <p><span>수령인:</span>${orderList.receiver}</p>
						    <p><span>주소:</span>&#91;${orderList.addressNumber}&#93;${orderList.addressInfo } ${orderList.addressDetail } ${orderList.addressDetail2 }</p>
						    <p><span>가격:</span><fmt:formatNumber pattern="###,###,###" value="${orderList.totalPrice}" /> 원</p>
						    <p><span>주문 상태:</span>${orderList.status }</p>
						    <p><span>주문 날짜:</span>${orderList.orderDate }</p>
						    <hr />
						    </c:if>
						   </c:forEach>
						</div>
					<p>주문 상품 정보</p>
						<div>
							<c:forEach var="orderList" items="${orderList }">
							<p><span>브랜드명:</span>${orderList.brandName }  
							<span>상품명:</span>${orderList.productName}<br /> 
							<span>개당 가격:</span><fmt:formatNumber pattern="###,###,###" value="${orderList.productPrice}" /> 원<br />
						     <span>구입 수량:</span>${orderList.orderCount} 개<br /> <span>최종 가격:</span><fmt:formatNumber pattern="###,###,###" value="${orderList.productPrice * orderList.orderCount}" /> 원</p>
							</c:forEach>
						</div>
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
				<div class="tit"> <!-- class="left" -->
					<div class="title-area">
						<h2 class="tit">1 : 1 문의내역</h2>
						 <a class="btnMore" id="qnaListMore" href="${pageContext.request.contextPath }/customercenter/cs_main">더보기</a> 
					</div>
					<div class="list-customer">
						<ul>
							<li>
							<table>
								<tr>
									<th>문의 제목</th>
									<th>문의 날짜</th>
									<th>문의자</th>
									<th>관리자 확인 여부</th>
								</tr>
								
									<c:forEach items="${qlist }" var="quest">
										<tr>
											<td><a href="${pageContext.request.contextPath }/quest/detailQuest?questionNum=${quest.questionNum}">${quest.questionTitle }</a></td>
											<td>${quest.questionDate }</td>
											<td>${quest.getWriter().getMemberName() }</td>
											<c:if test="${quest.viewCheck }">
												<td>O</td>
											</c:if>
											<c:if test="${not quest.viewCheck }">
												<td>X</td>
											</c:if>		
										</tr>
									</c:forEach>
							</table>
							</li>
						</ul>
					</div>
				</div>
				
				<div class="tit" id="goodsQna"> <!-- class="right" -->
					<div class="title-area">
						<h2 class="tit">상품Q&amp;A내역</h2>
						<a class="btnMore" id="goodsQnaListMore" href="${pageContext.request.contextPath }/mypage/detailproductqna">더보기</a> 
					</div>
		
					<div class="list-customer">
						<ul>
	
	
							<li><jsp:include page="/WEB-INF/views/mypage/productqnaList.jsp"/></li>
		
	
						</ul>
					</div>
			
				</div>
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
</div>
</div>
 <jsp:include page="../footer.jsp"/>
</body>
</html>