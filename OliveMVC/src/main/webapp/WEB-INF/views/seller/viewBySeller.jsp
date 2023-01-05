<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<style>

</style>
</head>
<body>
<jsp:include page="/WEB-INF/views/header.jsp"/>
<%-- <h1>${listBySeller }<h1> --%>
	<h1>"${sellerInfo.brandName }" 셀러의 상품 목록</h1>
	<c:forEach items="${listBySeller }" var="list" varStatus="status">
	
			<p>${list.fileName }</p>
			<div>
				
				<p>상품 고유아이디: ${list.productId}</p>
				<p>상품 이름: ${list.productName }</p>
				<p>상품 가격${list.productPrice }</p>
			</div> 
		<button type="button" id="btn_modi" onclick="gotomodi(${list.productId})" >수정</button>
		<button type="button" onclick="gotodelete(${list.productId})">삭제</button>
		<hr>
	</c:forEach>

	<c:if test="bu">
		
	</c:if>

	<!-- 스크립트  -->
	<script >
	
	// 삭제
	function gotodelete(productId){
		location.href = "/seller/removeProd?productId=" + productId;
	}
	
	function gotomodi(productId){
		//alert("productId ::::: " + productId);
		location.href = "/seller/modiProd?productId=" + productId;
	}
	
	
	// 수정
	/* $("#btn_modi").click(function gotomodi(productId){
		location.href = "/seller/modiProd?productId=" + productId;
	}); */

	
	
</script>
<jsp:include page="/WEB-INF/views/footer.jsp"/>
</body>
</html>