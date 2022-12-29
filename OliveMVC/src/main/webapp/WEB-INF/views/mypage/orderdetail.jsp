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
<h1>상세 주문목록</h1>
<a href="${pageContext.request.contextPath }/mypage/main">돌아가기</a>
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
</body>
</html>