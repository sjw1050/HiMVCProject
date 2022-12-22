<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	<h1>장바구니</h1>

	<p>장바구니 리스트 불러오기 테스트</p>
	<table border="1">
		<tr>
			<th>장바구니 번호</th>
			<th>장바구니 제품 아이디</th>
			<th>장바구니 제품 수량</th>
			<th>장바구니 제품 총액</th>
		</tr>
		<c:forEach items="${viewCartList }" var="viewCartList">
		<tr>
			<td>${viewCartList.cartId }</td>
			<td>${viewCartList.productId }</td>
			<td>${viewCartList.totalProductCount }</td>
			<td>${viewCartList.totalProductPrice }</td>
		</tr>
		</c:forEach>
	</table>

</body>
</html>