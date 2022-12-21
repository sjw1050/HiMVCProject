<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<h1>공지사항 작성 폼</h1>
<form action="${pageContext.request.contextPath }/notice/write" method="post" enctype="multipart/form-data">
<div>
<p>공지 제목</p> 
<input type="text" name="noticeTitle" />
<p>공지 내용</p>
<textarea rows="30" cols="30" name="noticeContent">
</textarea>
<br />
<input multiple="multiple"type="file" name="file" />
<input type="submit" name="작성하기"/>
</div>
</form>


</body>
</html>