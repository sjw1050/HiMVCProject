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
	<%-- <c:forEach items="${cateId }" var="cateId">
	<h1>${cateId }</h1>
	</c:forEach> --%>
	
	<!-- 메뉴. menu container (sticky)-->
	<div class="menu">
		<!-- 네비. nav container (flex). 추후 드롭다운으로 구현-->
		<div class="nav">
			<!-- 스킨케어 -->

			<!-- main ul -->
			<ul class="">
				
				<!-- 스킨케어 -->
				<li><a href="/categories?mainCateId=1">스킨케어</a>

					<ul class="low">
						<li><a href="">토너/로션/올인원</a></li>
						<li><a href="">에센스/크림</a></li>
						<li><a href="">미스트/오일</a></li>
						<li><a href="">마스크팩</a></li>
						<li><a href="">선케어</a></li>
					</ul></li>

				<!-- 메이크업 -->

				<li><a href="/categories/makeup">메이크업</a>
					<ul class="low">
						<li><a href="">립</a></li>
						<li><a href="">베이스</a></li>
					</ul></li>

				<!-- 클렌징 -->

				<li><a href="">클렌징</a>
					<ul class="low">
						<li><a href="">클렌징폼/젤</a></li>
						<li><a href="">오일/워터/리무버</a></li>
						<li><a href="">필링/패드</a></li>
						<li><a href="">아이</a></li></li>
			</ul>
			</li>
			<!-- 헤어/바디 -->

			<li><a href="">헤어/바디</a>
				<ul class="low">
					<li><a href="">샴푸/트리트먼트</a></li>
					<li><a href="">염색약</a></li>
					<li><a href="">제모용품</a></li>
					<li><a href="">로션/오일</a></li>
					<li><a href="">바디워시</a></li>
					<li><a href="">핸드케어</a></li>
				</ul></li>
			<!-- 향기 -->

			<li><a href="">향기</a>
				<ul class="low">
					<li><a href="">향수</a></li>
					<li><a href="">디퓨저/향초</a></li>
				</ul></li>
			<!-- 미용소품 -->

			<li><a href="">미용소품</a>
				<ul class="low">
					<li><a href="">페이스</a></li>
					<li><a href="">아이</a></li>
					<li><a href="">제모용품</a></li>
					<li><a href="">네일</a></li>
					<li><a href="">기타</a></li>
				</ul></li>
		</div>
		<!-- nav div 끝. -->
	</div>
	<!-- menu div 끝. -->


	<!-- 예리미 테스트 중... -->
	<!-- <ul>
			<li><a href="/product/viewAllProduct">상품 전체 보기</a></li>
			수정할거임 <li><a href="/product/viewCategory">카테고리</a></li>
		</ul> -->
	</div>
</body>
</html>