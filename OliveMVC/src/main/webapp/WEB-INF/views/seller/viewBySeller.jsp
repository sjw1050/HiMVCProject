<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

	<!-- <script src="https://code.jquery.com/jquery-3.6.0.js"></script> -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<%-- <form action="${pageContext.request.contextPath }/seller/removeProd?productId=${list.productId}" 
		 method="post"> --%>
</head>
<body>

<h1>${listBySeller }<h1>
	<h1>"${sellerInfo.brandName }" 셀러의 상품 목록</h1>
	<c:forEach items="${listBySeller }" var="list" varStatus="status">
	
			<p>${list.fileName }</p>
			<div>
				
				<p>상품 고유아이디: ${list.productId}</p>
				<p>상품 이름: ${list.productName }</p>
				<p>상품 가격${list.productPrice }</p>
				
				<%-- <button onclick="" type="button" id="modiProd">수정</button>
				<button onclick="deleteProd(${status.index})" type="button" id="deleteProd">삭제</button> --%>
					<input type="submit" id="deleteProd" value = "삭제하기" />
					<input type="hidden" id="testinput" name="test${status.index }" value="${list.productId}"/> 
					<a href="${pageContext.request.contextPath }/seller/removeProd?productId=${list.productId}">2.삭제하기</a>
				<a href="${pageContext.request.contextPath }/seller/modiProd?productId=${list.productId}"><button type="button" >수정하기</button></a>
					<input type="button" id="modiProd" value = "가짜버튼" />
					<hr>
			</div> 
		<!-- </form> -->
		<button type="button" onclick="gotomodi()">수정테스트</button>
		<button type="button" onclick="gotodelete()">수정테스트</button>
	</c:forEach>

	<!-- 스크립트  -->
	<script >
	
	function goto(){
		location.href = "/seller/removeProd";
		alert("goto 입니다.");
	}
 	$("#modiProd").click(function() {
		// var answer=confirm("선택하신 도서를 대출목록에서 삭제하시겠습니까?");
		
		 if(name){
			 alert("ddd");
		 }
	   // if(answer){	alert("foreach:javascript 성공");} 
	        
 	});

	/*------ 시작 --------*/
		/* var thisform =  $("${status.count }");
		int num = 
	
		/* 수정 버튼 */
	/* 	$("#modiProd").click(function() {
			alert("라라라");
		

		});
 */
		/* 삭제 버튼 */
		/* $("#deleteProd").on("click", function() {
	
			if(confirm("상품을 삭제하시겠습니까?")==true){
				location.href = "/seller/removeProd?productId="+this.value;
		        alert("상품이 삭제되었습니다.");
			}  */
			
/*------ 끝 --------*/			
  
 
 
			/* function deleteProd() {
		        if (!confirm("상품을 삭제하시겠습니까?")) {
		        	alert("test");
		        } else{
		        	location.href = "/seller/removeProd"
			        	alert("상품이 삭제되었습니다.");
		        }
		    } */
			
			
		/* }); */
	
</script>
</body>
</html>