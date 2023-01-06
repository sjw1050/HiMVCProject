<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
</head>
<body>
<jsp:include page="./mypage_header.jsp"></jsp:include>
				
				<div class="mypage-conts">
<form action="${pageContext.request.contextPath }/mypage/productquestinsert" method="post">
<input style="display: none" type="hidden" name="member.memberNum" value="${info.memberNum }" />
<input style="display: none" type="hidden" name="product.productId" value="${oneProd.productId }" />
<table>
<tr>
	<th>문의 제목</th>
	<td><input type="text" name="productQuestionTitle" id="productQuestionTitle" /></td>
</tr>
<tr>
	<th>문의 내용</th>
	<td><textarea name="productQuestion" id="productQuestion" cols="100" rows="10"></textarea></td>
</tr>
<tr>
	<th>문의 상품</th>
	<td>${oneProd.productName }</td>
</tr>
</table>
<button type="submit">작성하기</button>
</form>
</div>
</div>
</div>
<jsp:include page="../footer.jsp"></jsp:include>
</body>
</html>