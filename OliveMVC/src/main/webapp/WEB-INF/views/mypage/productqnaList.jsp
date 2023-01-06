<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<jsp:include page="./mypage_header.jsp"></jsp:include>
				
				<div class="mypage-conts">
<table>
	<tr>
		<th>문의자</th>
		<th>문의 상품</th>
		<th>문의 제목</th>
		<th>문의 날짜</th>
	</tr>
	
	<c:forEach var="pq" items="${pqList }">
		<tr>
		<td>${pq.member.memberName }</td>
		<td>${pq.product.productName }</td>
		<td><a href="${pageContext.request.contextPath }/mypage/detailproductqna?productQnaId=${pq.productQnaId }">${pq.productQuestionTitle }</a></td>
		<td>${pq.productQuestionDate }</td>
		</tr>
	</c:forEach>	
</table>
</div>
</div>
</div>
<jsp:include page="../footer.jsp"></jsp:include>
</body>
</html>