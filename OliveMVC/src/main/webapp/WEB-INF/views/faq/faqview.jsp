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
	<c:forEach items="${list }" var="faq">
	<tr>
		<th>제목</th>
		<td>${faq.faqTitle }</td>
	</tr>
	<%-- <tr>
		<td>Q.${faq.faqQuestion }</td>
	</tr>
	<tr>
		<td>A.${faq.faqAnswer }</td>
	</tr> --%>
	</c:forEach>
</table>
</body>
</html>