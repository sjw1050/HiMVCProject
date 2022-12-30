<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>viewOneProduct</title>
<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
</head>
<body>   
<c:set value="${listBySeller}" var="listBySeller"/>
<p>${listBySeller.fileName}</p>
	<h1>상품 상세 보기</h1>
		<div>
			<img alt="" src="${listBySeller.fileName }">
			<p>(상품이미지)</p>
			<p>${oneProdList.brandName }</p>
			<p>${oneProdList.productName }</p>
			<p>${oneProdList.productPrice }</p>
			<p>${oneProdList.productInfo }</p>
		</div>
		<div>
		<form action="${pageContext.request.contextPath }/cart/insertInCart" method="post">
		<input name="productId" type="hidden" value="${oneProduct.productId }" />
		<%-- <input name="productPrice" type="hidden" value = "${oneProduct.productPrice }" /> --%>
		<input name = "count"  min="1" type="number"/>
		<input type="submit" value = "장바구니" />
		</form>
		<form action="${pageContext.request.contextPath }/order/viewOrderList" method="get">
			<input name="productId" type="hidden" id="productId" value="${oneProdList.productId }" />
			<input type="submit" value ="바로구매" />
		</form>
		<button type="button" onclick="return addproductquest()">상품 문의 남기기</button>
		
		</div>
</body>
<script type="text/javascript">
function addproductquest() {
if(("${info.memberNum}") == ""){
	alert("회원만 문의를 남길 수 있습니다.");
	return false;
}
	let productId = document.getElementById("productId").value;
	window.open("${pageContext.request.contextPath }/mypage/productquestform?productId="+productId);
}
</script>
</html>