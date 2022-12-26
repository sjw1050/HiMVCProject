<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet"
	href="${pageContext.request.contextPath }/resources/css/style.css" />
<script src="https://kit.fontawesome.com/e8644e93da.js"
	crossorigin="anonymous"></script>
<link
	href="//db.onlinewebfonts.com/c/2596224269750e00c3ad5356299a3b9f?family=Ogg"
	rel="stylesheet" type="text/css" />
<title>Insert title here</title>
</head>

<c:if test="${not empty admininfo}">
	<p>${admininfo }</p>
</c:if>
<body>
	<!-- category -->
	<c:set value="${subCateList }" var="subCateList" />
	<c:forEach items="${mainCateList }" var="mainCateList">
		<!-- <div class="mainCate"> -->
		<ul>
			<li><h3>
					<a href="/category?mainCateId=${mainCateList.mainCateId }">${mainCateList.mainCateName}</a>
				</h3>
				<ul class="low">
					<c:forEach items="${subCateList }" var="subCateList">
						<c:if test="${subCateList.mainCateId eq mainCateList.mainCateId}">
							<li><a
								href="/category/sub?subCateId=${subCateList.subCateId }">${subCateList.subCateName }</a></li>
						</c:if>
					</c:forEach>
				</ul>
			</li>
		</ul>
		<!-- </div> -->
	</c:forEach>
	<!-- category -->
	<nav class="navigation">
		<div class="container">
			<div class="navigation-desktop">
				<a href="${pageContext.request.contextPath }/main"><img
					src="${pageContext.request.contextPath }/resources/images/oliveyoung-logo.png"
					alt="Olive Young Logo" /></a>
				<ul class="menu">

					<li><a href="/product/viewAllProduct">Category</a></li>
					<li><a href="">Bestseller</a></li>
					<li><a href="">New Arrival</a></li>
					<li><a href="">Brands</a></li>
					<li><a href="">Events</a></li>
				</ul>
				<ul class="user">
					<li class="search-input"><input type="text"
						placeholder="search our store" />
						<button>
							<i class="fas fa-search"></i>
						</button></li>

					<li class="account">
						<button id="account" onclick="dropdown();">
							<i class="fas fa-user"></i>
						</button>
					</li>

					<c:if test="${empty info}">
					<li class="register"> <a href="${pageContext.request.contextPath}/member/regist">회원가입</a></li>
             		<li class="login"> <a href="${pageContext.request.contextPath}/member/loginForm">로그인</a></li>
					</c:if>
<!-- 로그아웃 -->					
					<c:if test="${!empty info}">
					<span>${info.name }님, 환영합니다</span> 
					<li class="logout"> <a href="${pageContext.request.contextPath}/member/logout">로그아웃</a></li>
					<li class="logout"> <a href="${pageContext.request.contextPath}/mypage/main">마이페이지</a></li>
					
					</c:if>
					
					<li class="bag">
						<button>
							<i class="fas fa-shopping-cart"></i>
						</button>
					</li>
				</ul>
			</div>
		</div>
	</nav>    
    <a style="border-right: 1px solid black;" href="${pageContext.request.contextPath }/quest/view">질문&답변</a>
    <a style="border-right: 1px solid black;" href="${pageContext.request.contextPath }/quest/write">질문 작성하러 가기</a>
    <a style="border-right: 1px solid black;" href="${pageContext.request.contextPath }/notice/viewall">공지 확인</a>
    <a style="border-right: 1px solid black;" href="${pageContext.request.contextPath }/notice/write">공지 작성하기</a>    
    <a style="border-right: 1px solid black;" href="${pageContext.request.contextPath }/member/loginForm">로그인</a>
    <a style="border-right: 1px solid black;" href="${pageContext.request.contextPath }/cart/viewCart">장바구니</a>
    <a style="border-right: 1px solid black;" href="${pageContext.request.contextPath }/member/adminlogin">관리자 로그인</a>
</script>
</body>
</html>