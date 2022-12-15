<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>

<table>
<tr>
	<th>문의 제목</th>
	<th>문의 날짜</th>
	<th>문의자</th>
	<th>관리자 확인 여부</th>
</tr>

	<c:forEach items="${qlist }" var="quest">
		<tr>
			<td><a href="${pageContext.request.contextPath }/quest/detailQuest?questNum=${quest.questionNum}">${quest.questionTitle }</a></td>
			<td>${quest.questionDate }</td>
			<td>${info.name }</td>
			<c:if test="${quest.viewCheck }">
				<td>O</td>
			</c:if>
			<c:if test="${not quest.viewCheck }">
				<td>X</td>
			</c:if>		
		</tr>
	</c:forEach>
</table>


</body>
</html>