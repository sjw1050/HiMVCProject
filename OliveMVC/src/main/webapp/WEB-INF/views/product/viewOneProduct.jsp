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
	<c:forEach items="${oneProductList }" var="OneProduct">
		<div>
			<p>(상품이미지)</p>
			<p>${OneProduct.brandName }</p>
			<p>${OneProduct.productName }</p>
			<p>${OneProduct.productPrice }</p>
			<p>${OneProduct.productInfo }</p>
		</div>
	</c:forEach>
</body>
</html>