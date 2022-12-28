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
					<td>${List.productName }</td>
					<td>${List.productPrice }</td>
					<td>${List.totalProductCount }</td>
					<td>${List.totalProductPrice }</td>
					<td>
						<form action="/cart/deleteCart" method = "post">
							<input name = "cartId" type="hidden" value="${List.cartId }" />
							<button>삭제</button>
						</form>
					</td>
				</tr>
			</c:forEach>
		</c:if>
	</table>

</body>
</html>