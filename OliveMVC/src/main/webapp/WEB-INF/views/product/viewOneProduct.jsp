<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>viewOneProduct</title>
</head>
<body>
	<h1>상품 상세 보기</h1>
	<c:forEach items="${oneProdList }" var="oneProduct">
		<div>
			<p>(상품이미지)</p>
			<p>${oneProduct.brandName }</p>
			<p>${oneProduct.productName }</p>
			<p>${oneProduct.productPrice }</p>
			<p>${oneProduct.productInfo }</p>
		</div>
	</c:forEach>
</body>
</html>