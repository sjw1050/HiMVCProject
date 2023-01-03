<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta property="og:title" content="올리브영 온라인몰" />

<meta property="og:url" content="main.html" />

<meta property="og:image" content="" />

<meta property="og:description" content="대한민국 NO.1 헬스&뷰티 스토어 OLIVEYOUNG" /> 
</head>
<body>

<title>올리브영 온라인몰</title>
<meta name="title" content="올리브영 온라인몰" />
<meta name="description" content="대한민국 NO.1 헬스&뷰티 스토어 OLIVEYOUNG">
<meta name="facebook-domain-verification"
	content="e6vbg9ygxkui4o2owlhxnwptf0mdk2" />

<jsp:include page="/WEB-INF/views/header.jsp"/>


	<h1>이곳은 searchProduct.jsp </h1>
	<h2>"${query }" 검색 결과</h2> 
	<c:forEach items="${searchResult}" var="list">
		<div style="background-color:lightyellow; margin:15px">
			<p>${list.brandName }</p>
			<ul>
				<li>${list.productName }</li>
				<li>${list.productPrice}</li>
			</ul>
		</div>
		<hr >
	</c:forEach>

<jsp:include page="/WEB-INF/views/footer.jsp"/>
</body>
</html>