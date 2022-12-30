<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>장바구니</title>
</head>
<body>
	<h1>${info.name }님의장바구니</h1>
 
	<table>
		<tr>
		<th>장바구니 번호</th>
			<th>제품 이름</th>
			<th>제품 가격</th>
			<th>제품 수량</th>
			<th>제품 총액</th>
		</tr>
		<c:if test="${empty viewCartList }">
			<p>장바구니에 든 상품이 없어요</p>
		</c:if>
		<c:if test="${!empty viewCartList }">
			<c:forEach items="${viewCartList }" var="List">
				<tr>
				<td>${List.cartId }</td>
					<td>${List.productName }</td>
					<td>${List.productPrice }</td>
					<form action="${pageContext.request.contextPath }/cart/modifyQuantity" method = "post">
					<td>
					<input name="cartId" type="hidden" value="${List.cartId }" />
					<input name="totalProductCount" min="1" type="number" value="${List.totalProductCount }" />
					<input type="submit" value="수량 변경" /></td>
					</form>
					<td>${List.productPrice * List.totalProductCount }</td>
					<td>
						<form action="${pageContext.request.contextPath }/cart/deleteCart" method="post">
						<input name="deleteCartId" type="hidden" value="${List.cartId }" />
						<input type="submit" value="삭제" />
						</form>
						<form action="${pageContext.request.contextPath }/order/viewMyOrder" method="post">
			<input name="productId" type="hidden" value="${oneProduct.productId }" />
			<input name="productPrice" type="hidden" value="${oneProduct.productPrice }" />
			<input type="submit" value ="바로구매" />
		</form>
					</td>
				</tr>
			</c:forEach>
		</c:if>
	</table>

</body>
</html>