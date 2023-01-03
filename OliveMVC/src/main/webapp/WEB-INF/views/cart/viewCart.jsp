<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<title>장바구니</title>
</head>
<body>
	<h1>${info.name }님의장바구니</h1>
 <c:if test="${!empty viewCartList }">
	<table>
		<tr>
			<th>구매 여부</th>
			<th>제품 이름</th>
			<th>제품 가격</th>
			<th>제품 수량</th>
			<th>제품 총액</th>
		</tr>		
			<c:forEach items="${viewCartList }" var="list" varStatus="status">
				<tr>
					<td><input type="checkbox"id="" value="${list.cartId }"/>
					<input name="cartId" type="hidden" value="${list.cartId }" />
					</td>
					<td>${list.productName }</td>
					<td>${list.productPrice }</td>
					<td>
					<form action="${pageContext.request.contextPath }/cart/modifyQuantity" method = "post">
					<input name="cartId" type="hidden" id="cartId" value="${list.cartId }" />
					<input name="totalProductCount" min="1" type="number"  value="${list.totalProductCount }" />
					<input type="submit"  value ="수량변경" />
					</form>
					<td>${list.productPrice * list.totalProductCount }</td>
					<td>
						<form action="${pageContext.request.contextPath }/cart/deleteCart" method="post">
						<input name="deleteCartId" type="hidden" value="${list.cartId }" />
						<input type="submit" value="삭제"  />
						</form>
					</td>
				</tr>
			</c:forEach>
	</table>
	<button type="button" onclick="addOrder()">선택한 제품 구매하기</button>
	</c:if>	
			<c:if test="${empty viewCartList }">
			<p>장바구니에 든 상품이 없어요</p>
		</c:if>
</body>
<script>
$(document).ready(function() {
	$("input:checkbox").on('click', function() {
		if ( $(this).prop('checked') ) {
			var cart = $(this).siblings("input").val();			
			console.log(cart);
			
		}
	});
});


function addOrder() {
	
		var cartId = [];
		$('input[type="checkbox"]:checked').each(function(){
			var cart = $(this).val();
			cartId.push(cart);
		});
		console.log(cartId);
		
		/* var form = $('<form></form>')
		form.attr('action', '${pageContext.request.contextPath }/order/viewMyOrder');
		form.attr('method', 'post');
		form.appendTo('body');
		form.append('<input name="cartId" type="hidden" value="cartId" />'); */
		
		var form = document.createElement("form");
		form.setAttribute("charset", "UTF-8");
		form.setAttribute("method", "Post"); //Post 방식
		form.setAttribute("action", "${pageContext.request.contextPath }/order/viewMyOrder");
		
		var hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", "cartId");
		hiddenField.setAttribute("value", cartId);
		form.appendChild(hiddenField);
		
		document.body.appendChild(form);
		console.log(form);
		form.submit();
}

</script>
</html>