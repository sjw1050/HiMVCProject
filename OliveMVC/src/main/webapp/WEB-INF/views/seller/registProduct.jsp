<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script 
	src="https://code.jquery.com/jquery-3.5.1.js"
	integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
	crossorigin="anonymous"></script>

<!-- js test  -->
<!-- <script type="text/javascript">
	$("#listBtn").click(function(){
		alert("listbtn 눌렀다 ");
	});
</script> -->
<!-- js test  -->
<c:set value="${pageContext.request.contextPath}" var="path"/>

</head>

<body>

	<h1>"${sellerInfo.brandName }" 셀러의 상품등록 페이지</h1>
	<br><p>${sellerInfo }</p><br>
	
	<h2>상품 등록</h2>
	<form action="${path }/seller/registProduct" id="form1" name="forml" enctype="multipart/form-data" method="post" >
		<table border="1">
			
			  <tr>
				<th>브랜드</th>
				<td><input type="text" name="brandNum" id="brandNum" value="${sellerInfo.brandNum }" ></td>
			<tr> 
				<th>카테고리  </th>
				 <td>
					<select name="subCateId" id="subCateId" >
						
						<c:forEach items="${subCate }" var="subCate">
					    <option id="subCateId" value="${subCate.subCateId }"> ${subCate.subCateName }</option>
					    </c:forEach>
					</select>
				</td>
			</tr>
			<tr>
				<th>상품명</td>
				<td><input type="text" name="productName" id="productName"></td>
			</tr>
			<tr>
				<th>가격</th>
				<td><input type="text" name="productPrice" id="productPrice"></td>
			<tr>
				<th>상품설명</th>
				<td><textarea rows="5" cols="60" name="productInfo" id="productInfo"></textarea></td>
			</tr>
			<tr>
				<th>상품이미지</th>
				<td><input multiple="multiple" type="file" name="productImage" id="productImage"></td>
			</tr>
			<tr>
				<td colspan="2" align="center">
				<input type="submit" value="등록" id="addBtn"> 
				<input type="button" value="목록" id="listBtn">
				</td>
			</tr>
		</table>
	</form>
	
	<!-- 스크립트  -->
	<script type="text/javascript">
	
	var form1 = $("#form1");
	
	/* 취소(목록) 버튼 */
	$("#listBtn").click(function(){
	/* alert("라라라"); */
	location.href="/seller/viewBySeller"
	
	});
	
	/* 상품 등록 버튼 */
	$("#addBtn").on("click",function(e){
	
	e.preventDefault();
	
	form1.submit();
	
	});
	</script>
	<!-- 스크립트 끝 -->
</body>
</html>