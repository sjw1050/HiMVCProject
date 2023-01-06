<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/common/publish/jquery-1.9.1.min.js"></script>
</head>
<body>
<p>${modiProduct }</p>


	<h2>상품 수정</h2>
	
	<form action="${pageContext.request.contextPath }/seller/modiProd?productId=${modiProduct.productId} " id="form2" name="form2" enctype="multipart/form-data" method="post" >
		<table border="1">
			 
			  <tr>
				<th>브랜드</th>
				<td><input type="text" name="brandNum" id="brandNum" value="${sellerInfo.brandNum }" ></td>
			<tr> 
				<th>카테고리  </th>
				 <td>
					<%-- <select name="subCateId" id="subCateId" >
						
						<c:forEach items="${subCateList }" var="subCateList">
					    <option id="subCateId" value="${subCateList.subCateId }"> ${subCateList.subCateName }</option>
					    </c:forEach>
					</select> --%>
				</td>
			</tr>
			<tr>
				<th>상품명</td>
				<td><input type="text" name="productName" id="productName" value="${modiProduct.productName }"></td>
			</tr>
			<tr>
				<th>가격</th>
				<td><input type="text" name="productPrice" id="productPrice" value="${modiProduct.productPrice }" ></td>
			<tr>
				<th>상품설명</th>
				<td><textarea rows="5" cols="60" name="productInfo" id="productInfo"">${modiProduct.productInfo }</textarea></td>
			</tr>
			<tr>
				<th>현재 상품이미지</th>
				<td>
					<img src="${oliveFile.fileName}" alt="" />
				</td>
			</tr>
			<tr>
				<th>파일 추가</th>
				<td>
					<input multiple="multiple" type="file" name="productImage" id="productImage">
				</td>
			</tr>
					</table>
	</form>
		
				<input type="submit" value="등록" id="addBtn"> 
				<input type="button" value="취소" id="listBtn">
			
<script>
	$("#addBtn").on("click", function(){
		var form2 = $("#form2");
		//alert("#addBtn 클릭했음");
		e.preventDefault();
	
		form2.submit();
	});
</script>
	
</body>
</html>