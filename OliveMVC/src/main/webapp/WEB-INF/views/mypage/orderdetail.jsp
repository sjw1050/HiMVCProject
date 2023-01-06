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
	<div class="title-area linezero">
		<h2 class="tit">상세 주문 정보</h2>
	</div>	
	<c:forEach var="orderList" items="${orderList }" varStatus="status">
	<c:if test="${status.first }">
	<ul class="infor-data mypage-flag-apply">
		<li>
			<span>주문일자&nbsp;&nbsp;:</span>
			<strong>${orderList.orderDate }</strong>
		</li>
		<li>
			<span>주문번호&nbsp;&nbsp;:</span>
			<strong>${orderList.orderId }</strong>
		</li>
	</ul>
	</c:if>
	</c:forEach>
	<h3 class="sub-title3">배송상품</h3>
	<table class="board-list-2s">
		<caption>올리브영 배송상품</caption>
		<colgroup>
			<col style="width:%;">
			<col style="width:130px;">
			<col style="width:8%;">
			<col style="width:130px;">
			<col style="width:110px;">
		</colgroup>
		<thead>
			<tr>
				<th scope="col">상품명</th>
				<th scope="col">판매가</th>
				<th scope="col">수량</th>
				<th scope="col">진행현황</th>
			</tr>
		</thead>
		<tbody class="history3">
		<c:forEach var="orderList" items="${orderList }">
			<tr>
				<td class="subject">
					<div class="area">
						<a class="thum" href="javascript:common.link.moveGoodsDetail('A000000159331','', 'Order');">
							<img src="" onerror="common.errorImg(this);">
						</a>
						<div class="textus" style="width:68%;">
							<a class="" href="javascript:common.link.moveGoodsDetail('A000000159331','', 'Order');">
								<span class="tit">${orderList.brandName }</span>
								<span class="txt">${orderList.productName}</span>
							</a>
						</div>
					</div>
				</td>
				<td class="colorBlack"><strong><fmt:formatNumber type="number" maxFractionDigits="3" value="${orderList.productPrice}"/></strong> 원</td>
				<td>${orderList.orderCount }</td>
				<td class="bgnone">
					<strong>${orderList.status }</strong>		
					<button type="button" class="BtnDelete" id="btnDelete" onclick="mypage.orderDetail.goOrderCancelForm('20','1','10','10','',''); return false;">주문취소</button>
				</td>
			</tr>
			 </c:forEach>
		</tbody>
	</table>
	<div class="area-over mgT20">	
		<h3 class="sub-title3">배송지 정보</h3>
		<!-- <a class="ButtonBasic fob" onclick="window.open(this.href, 'mypage', 'width=500, height=710'); return false;" href="https://www.oliveyoung.co.kr/store/mypage/winpop/getDeliveryChangePop.do?ordNo=Y2301050875403" target="_blank">배송지 변경</a> -->
	</div>
	<table class="board-write-2s view">
		<caption>배송지 정보 보기</caption>
		<colgroup>
			<col style="width:20%;">
			<col style="width:30%;">
			<col style="width:20%;">
			<col style="width:30%;">
		</colgroup>
		<c:forEach var="orderList" items="${orderList }" varStatus="status">
		<c:if test="${status.first }">
		<tbody>			
			<tr>
				<th scope="row">받는분</th>
				<td colspan="3">${orderList.receiver }</td>
			</tr>
			<tr>
				<th scope="row">연락처1</th>
				<td colspan="3">${orderList.phone}</td>
			</tr>
			<tr class="addr">
				<th scope="row">주소</th>
				<td colspan="3">
					(${orderList.addressNumber})<br>도로명 : &#93;${orderList.addressInfo } ${orderList.addressDetail } ${orderList.addressDetail2 }<br>
				</td>
			</tr>
		</tbody>
		</c:if>
		</c:forEach>
	</table>
	<div class="area1sButton mgT40">
		<a href="${pageContext.request.contextPath }/mypage/getOrderList" class="btnGray">목록</a>
	</div>
	</div>
	</div>
	</div>
	</div>
	<jsp:include page="../footer.jsp"></jsp:include>
</body>
</html>