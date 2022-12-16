<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>

<c:if test="${not empty admininfo}">
	<p>${admininfo }</p>
</c:if>
<body>
	<c:if test="${not empty info}">
		<p>${info.name }님반갑습니다.</p>
	</c:if>
	
	<!-- nav (수정할거임) -->
	<div>
		<ul>
			<li><a href="/product/viewAllProduct">상품 전체 보기</a></li>
			<!-- 수정할거임 <li><a href="/product/viewCategory">카테고리</a></li> -->
		</ul>
	</div>
</body>
</html>