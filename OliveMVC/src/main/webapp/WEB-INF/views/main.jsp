<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="${pageContext.request.contextPath }/resources/css/style.css" />
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

<c:if test="${not empty admininfo}">
   <p>${admininfo }</p>
</c:if>
<body>
<%--    <c:if test="${not empty info}">
      <p>${info.name }님반갑습니다.</p>
   </c:if>
   
   <!-- nav (수정할거임) -->
   <div>
      <ul>
         <li><a href="/product/viewAllProduct">상품 전체 보기</a></li>
         <!-- 수정할거임 <li><a href="/product/viewCategory">카테고리</a></li> -->
      </ul>
   </div> --%>
   <nav class="navigation">
      <div class="container">
    <div class ="navigation-desktop">
          <a href="${pageContext.request.contextPath }/main"><img src="${pageContext.request.contextPath }/resources/images/oliveyoung-logo.png" alt="Olive Young Logo" /></a>
          <ul class="menu">
            <li><a href="">Category</a></li>
            <li><a href="">Bestseller</a></li>
            <li><a href="">New Arrival</a></li>
            <li><a href="">Brands</a></li>
            <li><a href="">Events</a></li>
          </ul>
          <ul class="user">
            <li class="search-input">
              <input type="text" placeholder="search our store" />
              <button><i class="fas fa-search"></i></button>
            </li>
  
            <li class="account">
              <button class="account" onclick="dropdown()"><i class="fas fa-user"></i></button>
            </li>
            <li class="register"> <a href="${pageContext.request.contextPath}/member/regist">회원가입</a></li>
            <li class="login"> <a href="${pageContext.request.contextPath}/member/loginForm">로그인</a></li>
  
            <li class="bag">
              <button><i class="fas fa-shopping-cart"></i></button>
            </li>
          </ul>
    </div>
      </div>
    </nav>
<script>
/* account dropdown 시도 */
function dropdown(){
    let dropdown = document.getElementById("drop-content");
    if(click.style.display === "none"){
        click.style.display = "block";

    }else{
        click.style.display = "none";

    }
}

  /*   $(document).ready(function(){
        $(".menu>a").click(function(){
            var submenu = $(this).next("ul");
 
            // submenu 가 화면상에 보일때는 위로 보드랍게 접고 아니면 아래로 보드랍게 펼치기
            if( submenu.is(":visible") ){
                submenu.slideUp();
            }else{
                submenu.slideDown();
            }
        }).mouseover(function(){
            $(this).next("ul").slideDown();
        });
    }); */
</script>
</body>
</html>