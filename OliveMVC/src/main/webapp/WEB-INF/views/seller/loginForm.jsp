<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<c:if test="${not empty notadmin}">
<script type="text/javascript">
	alert("${notadmin}");
</script>
</c:if>
<body>
<h1>로그인 폼</h1>

<form action="${pageContext.request.contextPath}/seller/sellerLogin" method="post">
<fieldset>
<legend>Seller login</legend>
<input type="text" name="sellerId" />
<input type="password" name="sellerPw" />
<input type="submit" value="로그인하기"/>
</fieldset>
</form>
</body>
</html>