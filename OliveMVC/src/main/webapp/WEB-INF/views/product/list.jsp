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
	<h1>카테고리별 상품 </h1>

	<!-- main 카테고리별 상품  -->
	<ul>
		<c:forEach items="${listByCate}" var="listByCate">
			<li>
				<div class="">
					<p>${listByCate.brandName}</p>
					<p>${listByCate.productName}</p>
					<p>${listByCate.productPrice}</p>
				</div>
		</c:forEach>
	</ul>
	
	<!-- sub 카테고리별 상품  -->
	<ul>
		<c:forEach items="${subList}" var="subList">
			<li>
				<div class="">
					<p>${subList.brandName}</p>
					<p>${subList.productName}</p>
					<p>${subList.productPrice}</p>
				</div>
		</c:forEach>
	</ul>
	<!--  -->

</body>
</html>