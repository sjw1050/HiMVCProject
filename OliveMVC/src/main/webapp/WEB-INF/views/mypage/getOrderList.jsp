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
<jsp:include page="./mypage_header.jsp"></jsp:include>
				
				<div class="mypage-conts">
	<div class="title-area2">
		<h2 class="tit">주문/배송 조회</h2>
	</div>
	<div class="layer_pop_wrap" id="service_survey" style=""></div>	
	
	
	<table class="board-list-2s mgT20">
		<caption>주문일자, 상품, 수량, 주문금액, 상태로 이루어진 주문/배송/내역 목록 표</caption>
		<colgroup>
			<col style="width:18%;">
			<col style="width:%;">
			<col style="width:8%;">
			<col style="width:130px;">
			<col style="width:110px;">
		</colgroup>
		<thead>
			<tr>
				<th scope="col" style="text-align: center;">주문일자</th>
				<th scope="col" style="text-align: center;">상품</th>
				<th scope="col" style="text-align: center;">수량</th>
				<th scope="col" style="text-align: center;">주문금액</th>
				<th scope="col" style="text-align: center;">상태</th>
			</tr>
		</thead>
		<c:if test="${not empty map }">	
		<%--<c:if test="${not empty poList }">	
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
				<ul class="mypage-flag-apply">
						<li class="order-date"> ${poList.orderDate } </li>								
						<li class="color1s"> ${poList.orderId } </li>								
						<li>
							<a href="javascript:void(0);" class="btnDetail" data-oper-dt="2023.01.05" data-origin-bizpl-cd="" data-pos-no="" data-receipt-no="" data-deal-sp="" data-frst-receipt-no="" onclick="javascript:mypage.orderList.goOrderDetail('Y2301050875403','', this); return false;">상세보기</a>
						</li>							
					</ul>
				</c:if>
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
		</c:forEach> --%>
		
		<c:forEach var="i" items="${map}">
		<c:set var="size" value="${i.value.size() }"/>
		
		<tbody class="history">
		<c:forEach var="j" items="${i.value}" varStatus="status">
			<tr>
			<c:if test="${status.count == 1}">
				<td rowspan="${size }">
				<ul class="mypage-flag-apply">
						<li class="order-date"> ${j.order.orderDate } </li>								
						<li class="color1s"> ${i.key} </li>								
						<li>
							<a href="${pageContext.request.contextPath }/mypage/orderdetail?orderId=${i.key }" class="btnDetail" data-oper-dt="2023.01.05" data-origin-bizpl-cd="" data-pos-no="" data-receipt-no="" data-deal-sp="" data-frst-receipt-no="" onclick="javascript:mypage.orderList.goOrderDetail('Y2301050875403','', this); return false;">상세보기</a>
						</li>							
					</ul>
				</td>
				</c:if>
				<c:if test="${size == 1 }">
				<td class="subject">
				</c:if>
				<c:if test="${size != 1 }">
				<td class="subject lineLeft">
				</c:if>				
					<div class="area">
									<a class="thum" href="#">
										<img src="#" alt="상품 썸네일 이미지경로" onerror="common.errorImg(this);">
									</a>
									<div class="textus">
										<a class="" href="${pageContext.request.contextPath }/product/viewOneProduct?productId=${j.product.productId }">
											<span class="tit">${j.product.brandName }</span>
											<span class="txt">${j.product.productName }</span>
										</a>
									</div>
					</div>
				</td>
				<td class="">${j.orderCount }</td>
				<td class="colorOrange">
						<strong><fmt:formatNumber type="number" maxFractionDigits="3" value="${j.product.productPrice * j.orderCount }" /></strong> 원
					
				</td>
				<td><strong>${j.order.status.status }</strong>
											<button type="button" class="BtnDelete mgT5" id="btnDelete" onclick="mypage.orderList.goOrderCancelForm('Y2301050875403','20','1','10','10','',''); return false;">주문취소</button>
				</td>				
			</tr>
		</c:forEach>
		</c:forEach>
		</c:if>
		<c:if test="${empty map}">
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