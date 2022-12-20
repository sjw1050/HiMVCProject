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
	<c:forEach items="${viewCartList }" var="viewCartList">
	<ul>
		<li>장바구니 번호      ${viewCartList.cartId }</li>
		<li>장바구니 제품 아이디     ${viewCartList.productId }</li>
		<li>장바구니 제품 수량     ${viewCartList.totalProductCount }</li>
		<li>장바구니 제품 총액     ${viewCartList.totalProductPrice }</li>
	</ul>
	</c:forEach>
	
</body>
</html>