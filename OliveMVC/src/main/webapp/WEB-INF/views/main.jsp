<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="${pageContext.request.contextPath }/resources/css/style.css" />
 <%-- <link rel="stylesheet" href="${pageContext.request.contextPath }/resources/css/account_dropdown.css" /> --%>
<%--<link rel="stylesheet" href="${pageContext.request.contextPath }/resources/css/account_dropdown.js" /> --%>
<script
      src="https://kit.fontawesome.com/e8644e93da.js"
      crossorigin="anonymous"
    ></script>
    <link
      href="//db.onlinewebfonts.com/c/2596224269750e00c3ad5356299a3b9f?family=Ogg"
      rel="stylesheet"
      type="text/css"
    />
<title>Insert title here</title>
</head>
<body>
	<nav class="navigation">
		<div class="container">
			<div class="navigation-desktop">
				<a href="${pageContext.request.contextPath }/main"><img
					src="${pageContext.request.contextPath }/resources/images/oliveyoung-logo.png"
					alt="Olive Young Logo" /></a>
				<ul class="menu">
					<li><a href="/product/viewAllProduct">Category</a> 
					
					<!-- 카테고리. category container -->
						<div class="category_dropdown" >
							<!-- 스킨케어  -->
							<button class="dropbtn">스킨케어</button>
							<div class="dropdown-content">
							<div class="mainCate1">
								<ul>
									<li><a href="/categories?mainCateId=1">스킨케어</a>
										<ul class="low">
											<li><a href="/categories/sub?subCateId=1">토너/로션/올인원</a></li>
											<li><a href="/categories/sub?subCateId=2">에센스/크림</a></li>
											<li><a href="/categories/sub?subCateId=3">미스트/오일</a></li>
											<li><a href="/categories/sub?subCateId=4">마스크팩</a></li>
											<li><a href="/categories/sub?subCateId=5">선케어</a></li>
										</ul>
									</li>
								</ul>
							</div>
							</div>

							<!-- 메이크업 -->
							<div class="mainCate2">
								<ul>
									<li><a href="/categories?mainCateId=2">메이크업</a>
										<ul class="low">
											<li><a href="/categories/sub?subCateId=6">립</a></li>
											<li><a href="/categories/sub?subCateId=7">베이스</a></li>
											<li><a href="/categories/sub?subCateId=8">아이</a></li></li>
										</ul>
									</li>
								</ul>
							</div>

							<!-- 클렌징 -->
							<div class="mainCate3">
								<ul>
									<li><a href="/categories?mainCateId=3">클렌징</a>
										<ul class="low">
											<li><a href="/categories/sub?subCateId=9">클렌징폼/젤</a></li>
											<li><a href="/categories/sub?subCateId=10">오일/워터/리무버</a></li>
											<li><a href="/categories/sub?subCateId=11">필링/패드</a></li>
										</ul>
									</li>
								</ul>
							</div>
							<!-- 헤어/바디 -->
							<div class="mainCate4">
								<ul>
									<li><a href="/categories?mainCateId=4">헤어/바디</a>
										<ul class="low">
											<li><a href="/categories/sub?subCateId=12">샴푸/트리트먼트</a></li>
											<li><a href="/categories/sub?subCateId=13">염색약</a></li>
											<li><a href="/categories/sub?subCateId=14">기타헤어제품</a></li>
											<li><a href="/categories/sub?subCateId=15">제모용품</a></li>
											<li><a href="/categories/sub?subCateId=16">로션/오일</a></li>
											<li><a href="/categories/sub?subCateId=17">바디워시</a></li>
											<li><a href="/categories/sub?subCateId=18">핸드케어</a></li>
										</ul>
									</li>
								</ul>
							</div>
							
							<!-- 향기 -->
							<div class="mainCate5">
								<ul>
									<li><a href="/categories?mainCateId=5">향기</a>
										<ul class="low">
											<li><a href="/categories/sub?subCateId=19">향수</a></li>
											<li><a href="/categories/sub?subCateId=20">디퓨저/향초</a></li>
										</ul>
									</li>
								</ul>
							</div>
							
							<!-- 미용소품 -->
							<div class="mainCate6">
								<ul>
									<li><a href="/categories?mainCateId=6">미용소품</a>
										<ul class="low">
											<li><a href="/categories/sub?subCateId=21">페이스</a></li>
											<li><a href="/categories/sub?subCateId=22">아이</a></li>
											<li><a href="/categories/sub?subCateId=23">네일</a></li>
											<li><a href="/categories/sub?subCateId=24">기타</a></li>
										</ul>
									</li>
								</ul>
							</div>
						</div> <!-- category_dropdown 끝. -->
			
		</li> 
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
			
			<li class="register"> <a href="${pageContext.request.contextPath}/member/regist">회원가입</a></li>
            <li class="login"> <a href="${pageContext.request.contextPath}/member/loginForm">로그인</a></li>
  

			<li class="bag">
				<button>
					<i class="fas fa-shopping-cart"></i>
				</button>
			</li> 
		</ul>
		</div>
		</div>
	</nav>    
    <a href="${pageContext.request.contextPath }/quest/view">질문&답변</a>
    <a href="${pageContext.request.contextPath }/quest/write">질문 작성하러 가기</a>
    <a href="${pageContext.request.contextPath }/notice/viewall">공지 확인</a>
    <a href="${pageContext.request.contextPath }/notice/write">공지 작성하기</a>    
    <a href="${pageContext.request.contextPath }/member/loginForm">로그인</a>
    <a href="${pageContext.request.contextPath }/member/adminlogin">관리자 로그인</a>
</script>
</body>
</html>