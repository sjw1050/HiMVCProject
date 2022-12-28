<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
</head>
<body>
<p>${list }</p>
	<h1>"${sellerInfo.brandName }" 셀러의 상품 목록</h1>
	<c:forEach items="${listBySeller }" var="list">
		<p>${list.fileName }</p>
		<div>
			<img alt=""
				src="${pageContext.servletConfig.servletContext.contextPath }/upload/${file}">
			<p>${list.productName }</p>
			<p>${list.productPrice }</p>
			<button onclick="" type="button" id="modiProd">수정</button>
			<button onclick="deleteProd" type="button" id="deleteProd">삭제</button>
		</div>
	</c:forEach>

	<!-- 스크립트  -->
	<script type="text/javascript">

		/* 수정 버튼 */
		$("#modiProd").click(function() {
			alert("라라라");
		

		});

		/* 삭제 버튼 */
		$("#deleteProd").on("click", function() {
	
			if(confirm("상품을 삭제하시겠습니까?")==true){
				location.href = "/seller/removeProd"
		        alert("상품이 삭제되었습니다.");
			}
			
			
			/* function deleteProd() {
		        if (!confirm("상품을 삭제하시겠습니까?")) {
		        	alert("test");
		        } else{
		        	location.href = "/seller/removeProd"
			        	alert("상품이 삭제되었습니다.");
		        }
		    } */
			
			
		});
	</script>
	<!-- 스크립트 끝 -->

</body>
</html>