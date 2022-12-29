<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<div>
레벨:${info.level } ${info.name }님 반갑습니다 
</div>
<ul>
	<li>주문배송조회 </li>
	<li>취소 반품 교환 내역 </li>
	<li>장바구니 </li>
	<li><a href="${pageContext.request.contextPath }/quest/view">1:1문의 내역</a> </li>
	<li>리뷰 </li>
	<li>상품 QNA내역 </li>
	<li><a href="${pageContext.request.contextPath }/mypage/modifymemberform?memberNum=${info.memberNum}">회원정보 수정</a> </li>
	<li><a href="${pageContext.request.contextPath }/mypage/address">배송지 정보 확인</a></li>
	<li><a onclick="return confirmmsg()" href="javascript:showPopUp()">회원탈퇴</a> </li>
</ul>
<hr />
<div>
주문 배송 조회
<hr />
<div>
<c:forEach var="order" items="${order }" >
	<p><span>주문번호 : <a href="${pageContext.request.contextPath }/mypage/orderdetail?orderId=${order.orderId }">${order.orderId }</a></span></p>
<%--     <p><span>수령인:</span>${orderList.receiver}</p>
    <p><span>주소:</span>${orderList.address}</p>
    <p><span>가격:</span><fmt:formatNumber pattern="###,###,###" value="${orderList.totalPrice}" /> 원</p> --%>
    <p><span>주문 상태:</span>${order.status.status }</p>
    <p><span>주문 날짜:</span>${order.orderDate }</p>
    <hr />
   </c:forEach>
   
</div>


<%-- <div>
	<c:forEach var="orderList" items="${orderList }">
	<p><span>브랜드명:</span>${orderList.brandName }  <span>상품명:</span>${orderList.productName}<br /> <span>개당 가격:</span><fmt:formatNumber pattern="###,###,###" value="${orderList.productPrice}" /> 원<br />
     <span>구입 수량:</span>${orderList.orderCount} 개<br /> <span>최종 가격:</span><fmt:formatNumber pattern="###,###,###" value="${orderList.productPrice * orderList.orderCount}" /> 원</p>
	</c:forEach>
</div> --%>
	

</div>
<div>
1:1문의내역 
<table>
<tr>
<th>문의 제목</th>
<th>문의 날짜</th>
<th>문의자</th>
<th>관리자 확인여부</th>
</tr>
<c:forEach items="${quest }" var="quest">
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
</div>
<div>
상품 QNA내역
</div>
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
</body>
</html>