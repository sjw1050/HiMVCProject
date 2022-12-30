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
	<c:forEach items="${oneProdList }" var="oneProduct">
		<div>
			<img alt="" src="${listBySeller.fileName }">
			<p>(상품이미지)</p>
			<p>${oneProduct.brandName }</p>
			<p>${oneProduct.productName }</p>
			<p>${oneProduct.productPrice }</p>
			<p>${oneProduct.productInfo }</p>
		</div>
		<div>
		<form action="${pageContext.request.contextPath }/cart/insertInCart" method="post">
		<input name="productId" type="hidden" value="${oneProduct.productId }" />
		<%-- <input name="productPrice" type="hidden" value = "${oneProduct.productPrice }" /> --%>
		<input name = "count"  min="1" type="number"/>
		<input type="submit" value = "장바구니" />
		</form>
		<form action="${pageContext.request.contextPath }/order/viewMyOrder" method="post">
			<input name="productId" type="hidden" value="${oneProduct.productId }" />
			<input name="productPrice" type="hidden" value="${oneProduct.productPrice }" />
			<input type="submit" value ="바로구매" />
		</form>
		</div>
	</c:forEach>	
</body>
<script type="text/javascript">
</script>
</html>