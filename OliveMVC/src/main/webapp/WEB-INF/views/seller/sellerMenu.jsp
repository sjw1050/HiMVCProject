<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<h1>${sellerInfo.sellerId } 셀러의 관리 메뉴  </h1>

<!-- 여기에 list 왼쪽 사이드로 빼고, ajax로 뿌릴거임. -->
	<ul>
		<li><a href="">메인으로 가기 </a></li>
		<li><a href="${pageContext.request.contextPath}/seller/viewBySeller?sellerId=${sellerInfo.sellerId}">상품 목록 보기 </a></li>
		<li><a href="${pageContext.request.contextPath}/seller/registProduct">상품 등록 </a></li>
	</ul>
	
	
	<c:if test="${not empty listBySeller }">
		<c:forEach items="${listBySeller }" var="listBySeller">
		<div>
			<a href="/product/viewOneProduct?productId=${allProduct.productId }" >
				<p>(상품이미지)</p>
				<p>${allProduct.productName }</p>
				<p>${allProduct.productPrice }</p>
			</a>
		</div>
	</c:forEach>
	</c:if>
	
</body>
</html>