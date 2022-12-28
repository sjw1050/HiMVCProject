<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- 모달 부트스트랩 -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
	crossorigin="anonymous"/>
		
<script src="https://kit.fontawesome.com/e8644e93da.js" crossorigin="anonymous"></script>

<link href="//db.onlinewebfonts.com/c/2596224269750e00c3ad5356299a3b9f?family=Ogg" rel="stylesheet" type="text/css" />
	
<!-- 다음 주소 Api --> 	
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/DaumApi.js"></script>

<!-- 유효성 확인 자바스크립트 -->
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/registForm_valid_check.js"></script>

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
	
<!-- 로그인 -->
	
	<!-- Modal -->
	<div class="modal fade" id="loginModal" tabindex="-1"
		aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="exampleModalLabel">로그인</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal"
						aria-label="Close"></button>
				</div>
				<div class="modal-body">

					<c:if test="${not empty notmember }">
						<script>
							alert("${notmember}")
						</script>
					</c:if>
					<form action="${pageContext.request.contextPath}/member/login"	method="post" > 
					<table>          
						<tr>
							<th>아이디:</th>
							<td><input type="text" name="memberId" id="memberId"/></td>
						</tr>
						<tr>
							<th>비밀번호:</th>
							<td><input type="password" name="pw" id="pw"/></td>
						</tr>
					</table>
					
				</div>
				
				<div class="modal-footer">
					<button type="submit" class="btn btn-secondary"
						data-bs-dismiss="modal">로그인하기</button>
				</div>
				</form>
			</div>
		</div>
	</div>
	
	
<!-- 회원가입 -->
	
		<!-- Modal -->
	<div class="modal fade" id="registModal" tabindex="-1"
		aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="exampleModalLabel">회원가입</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal"
						aria-label="Close"></button>
				</div>
				<div class="modal-body">

					<c:if test="${!empty err }">
						<script>
							alert("${err}");         
						</script>
					</c:if>
					<form action="${pageContext.request.contextPath}/member/regist" method="post" name="registForm">
						<table>
							<tr>
								<th>*아이디:</th>
								<td><input type="text" name="memberId" id="memberId"/></td>
							</tr>
							<tr>
								<th>*비밀번호:</th>
								<td><input type="password" name="pw" id="pw" placeholder="영문자+숫자+특수문자 조합" /></td>
							</tr>
					  		<tr>
								<th>*비밀번호 재확인:</th>
								<td><input type="password" name="re_pw" id="re_pw"/></td>
							</tr>
							<tr>
								<th>*이름:</th>
								<td><input type="text" name="memberName" id="memberName"/></td>
							</tr>
							<tr>
								<th>*이메일:</th>
								<td><input type="text" name="email" id="email" />@</td>
								<!-- <input type="text" name="email_add" id="email_add"/> -->
								<!-- <select name="email_sel" id="email_sel" onchange="change_email();"> -->
					<!--onchage: select안에 있는 옵션들의 값이 바꼈을때 명령이 실행 onclick을 안하는 이유: 키보드 사용자는 click을 할수 없으므로-->
									<!-- <option value="">직접입력</option>
									<option value="naver.com">naver</option>
									<option value="gmail.com">gmail</option>
									<option value="nate.com">nate</option>
								</select> -->
							</tr>
			 		 		<tr>
								<th>전화번호:</th>
								<td><input type="text" name="phone" id="phone"/>"-"없이 숫자만 입력</td>
							</tr>
							<tr>
								<th>*성별:</th>
								<td><input type="radio" name="gender" value="f" id="f">여성 
								    <input type="radio" name="gender" value="m" id="m"/>남성</td>
							</tr>
							<tr>
								<th>생년월일:
								<td><input type="date" name="birthday" id="birthday"/></td>
								<!-- date 오늘 이후로 선택 안 되도록 -->
								<script>
									var now_utc = Date.now()
									var timeOff = new Date().getTimezoneOffset() * 60000;
									var today = new Date(now_utc - timeOff).toISOString()
											.split("T")[0];
									document.getElementById("Date").setAttribute("max", today);
								</script>
							</tr>
							<tr>
								<th>주소:</th>

								<td><input type="text" name="address" id="sample6_postcode" placeholder="우편번호"> 
									<input type="button" onclick="sample6_execDaumPostcode()" value="우편번호 찾기"><br>
									<input type="text" name="address" id="sample6_address" placeholder="주소"><br>
									<input type="text" name="address" id="sample6_detailAddress" placeholder="상세주소"><br> 
									<input type="text" name="address" id="sample6_extraAddress" placeholder="참고항목"></td>
							</tr>

						</table>
				</div>
				<div class="modal-footer">
					<!-- <button type="submit" class="btn btn-secondary"
						data-bs-dismiss="modal" onclick="checkform()">가입하기</button> -->
						<input type="submit" value="가입하기" onclick="checkform()">
				</div>
			</div>
		</div>
	</div>
	</form>
	
	<!-- category -->
	<nav class="navigation">
		<div class="container">
			<div class="navigation-desktop">
				<a href="${pageContext.request.contextPath }/main">
				<!-- 예전 css -->
				<img
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
					<li class="register">  
             		<button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#registModal" style="border:0;">회원가입</button> 
             		</li>
             		<li class="login">  
             		<button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#loginModal" style="border:0;">로그인</button> 
             		</li>
					</c:if>
<!-- 로그아웃 -->					
					<c:if test="${!empty info}">
					<span>${info.name }님, 환영합니다</span> 
					<li class="logout"> <a href="${pageContext.request.contextPath}/member/logout">로그아웃</a></li>
					<li class="logout"> <a href="${pageContext.request.contextPath}/mypage/main">마이페이지</a></li>
					
					</c:if>
					
					<!-- 셀러 로그인시 -->
					<c:if test="${!empty sellerInfo}">
						<span>${sellerInfo.sellerId } 셀러님, 환영합니다 </span>
						<li class="logout"> <a href="${pageContext.request.contextPath}/seller/logout">로그아웃</a></li>
						<li class="registProduct"> <a href="${pageContext.request.contextPath}/seller/sellerMenu?sellerId=${sellerInfo.sellerId}">셀러 관리 메뉴  </a></li>
					</c:if>
					<!-- 셀러 로그인시-->
					
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
    <a style="border-right: 1px solid black;" href="${pageContext.request.contextPath }/seller/sellerLogin">셀러로그인 </a>
<!-- 모달 bootstrap -->
			<script
				src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
				integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
				crossorigin="anonymous">
			</script>
			
<!-- 다음 주소 Api --> 			
			<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
</body>
</html>