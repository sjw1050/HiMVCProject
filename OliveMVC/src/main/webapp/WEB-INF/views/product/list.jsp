<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<%-- <h1>${ }</h1> --%>
	<!-- main 카테고리별 상품  -->
	<c:forEach items="${listByMain}" var="listByMain">
		<div onclick="location.href='/product/viewOneProduct?productId=${listByMain.productId}'">
			<ul>
				<li>${listByMain.brandName}</li>
				<li>${listByMain.productName}</li>
				<li>${listByMain.productPrice}</li>
			</ul>
		</div>
		<hr>
	</c:forEach>


	<!-- sub 카테고리별 상품  -->
	<c:forEach items="${listBySub}" var="listBySub">
		<div onclick="location.href='/product/viewOneProduct?productId=${listBySub.productId}'">
			<ul>
				<li>${listBySub.brandName}</li>
				<li>${listBySub.productName}</li>
				<li>${listBySub.productPrice}</li>
			</ul>
		</div>
		<hr>
	</c:forEach>


</body>
</html>