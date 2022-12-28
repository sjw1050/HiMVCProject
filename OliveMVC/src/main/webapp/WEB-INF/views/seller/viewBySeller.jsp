<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<h1>"${sellerInfo.brandName }" 셀러의 상품 목록</h1>
	<c:forEach items="${listBySeller }" var="list">
	 <div>
	 	<p>${list.productName }</p>
	 	<p>${list.productPrice }</p>
	 </div>
 
	</c:forEach>
	
</body>
</html>