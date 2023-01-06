<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
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
								<li class="subMenu"><a href="${pageContext.request.contextPath }/mypage/getOrderList" data-attr="마이페이지^메뉴^주문/배송 조회">주문/배송 조회</a></li>
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
				
				<div class="mypage-conts">
	<div class="title-area2">
		<h2 class="tit">주문/배송 조회</h2>
	</div>
	<div class="layer_pop_wrap" id="service_survey" style=""></div>	
	
	
	<table class="board-list-2s mgT20">
		<caption>주문일자, 상품, 수량, 주문금액, 상태로 이루어진 주문/배송/내역 목록 표</caption>
		<colgroup>
			<col style="width:17%;">
			<col style="width:%;">
			<col style="width:8%;">
			<col style="width:130px;">
			<col style="width:110px;">
		</colgroup>
		<thead>
			<tr>
				<th scope="col">주문일자</th>
				<th scope="col">상품</th>
				<th scope="col">수량</th>
				<th scope="col">주문금액</th>
				<th scope="col">상태</th>
			</tr>
		</thead>
		<c:if test="${not empty poList }">	
		<c:forEach var="poList" items="${poList }">
		<tbody class="history">
		<!-- 여기서 foreach를 한번 더 돌림  -->		
		<c:forEach var="odList" items="${odList }" >
			<tr>
			<c:if test="${poList.orderId eq odList.order.orderId }">		
				<td rowspan="2">
				</c:if>
				<c:if test="${poList.orderId ne odList.order.orderId }">		
				<td rowspan="1">
				</c:if>
				<ul class="mypage-flag-apply">
						<li class="order-date"> ${poList.orderDate } </li>								
						<li class="color1s"> ${poList.orderId } </li>								
						<li>
							<a href="javascript:void(0);" class="btnDetail" data-oper-dt="2023.01.05" data-origin-bizpl-cd="" data-pos-no="" data-receipt-no="" data-deal-sp="" data-frst-receipt-no="" onclick="javascript:mypage.orderList.goOrderDetail('Y2301050875403','', this); return false;">상세보기</a>
						</li>							
					</ul>
				<td class="subject">
				<!-- <td class="subject lineLeft"> -->
					<div class="area">
									<a class="thum" href="#">
										<img src="#" alt="상품 썸네일 이미지경로" onerror="common.errorImg(this);">
									</a>
									<div class="textus">
										<a class="" href="javascript:common.link.moveGoodsDetail('A000000174719','', 'Order');">
											<span class="tit">${odList.product.brandName }</span>
											<span class="txt">${odList.product.productName }</span>
										</a>
									</div>
					</div>
				</td>
				<td class="">${odList.orderCount }</td>
				<td class="colorOrange">
						<strong><fmt:formatNumber type="number" maxFractionDigits="3" value="${odList.product.productPrice * odList.orderCount }" /></strong> 원
					
				</td>
				<td><strong>${odList.order.status.status }</strong>
											<button type="button" class="BtnDelete mgT5" id="btnDelete" onclick="mypage.orderList.goOrderCancelForm('Y2301050875403','20','1','10','10','',''); return false;">주문취소</button>
				</td>
			</tr>	
			</c:forEach>	
		</tbody>
		</c:forEach>
		</c:if>
			<!-- 중복이 된다면
			<tr>
					<td class="subject lineLeft">
					<div class="area">
									<a class="thum" href="javascript:common.link.moveGoodsDetail('A000000159331','', 'Order');">
										<img src="https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0015/A00000015933109ko.jpg?l=ko" alt="[단독기획] 로벡틴 수분에센스 (본품180ml+100ml 추가 증정)" onerror="common.errorImg(this);">
									</a>
									<div class="textus">
										<a class="" href="javascript:common.link.moveGoodsDetail('A000000159331','', 'Order');">
											<span class="tit">로벡틴</span>
											<span class="txt">[단독기획] 로벡틴 수분에센스 (본품180ml+100ml 추가 증정)</span>
										</a>
									</div>
					</div>
				</td>
				<td class="">1</td>
				<td class="colorOrange">
					오프라인구매용 금액
						<strong>20,300</strong> 원
				</td>
				<td><strong>주문접수</strong>
					<button type="button" class="BtnDelete mgT5" id="btnDelete" onclick="mypage.orderList.goOrderCancelForm('Y2301050875403','20','1','10','10','',''); return false;">주문취소</button>
				</td>
			</tr>
					</tbody> -->
		
		
		
		<c:if test="${empty poList}">
			<tbody class="history">
			<tr>
				<td colspan="5">주문 정보가 없습니다.</td>
			</tr>
		</c:if>
	</table>
	<div class="pageing">	
		<strong title="현재 페이지">1</strong>
	</div>
			</div>
			</div>
			</div>
			<jsp:include page="../footer.jsp"></jsp:include>
	
</div>
</body>
</html>