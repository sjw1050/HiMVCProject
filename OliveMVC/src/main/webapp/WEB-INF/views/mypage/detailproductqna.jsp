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
<div>
		<p>
			문의 제목 : <input type="text" name="productQuestionTitle" id="questionTitle"
				value="${qna.productQuestionTitle }" readonly />
		</p>
		<div>
			문의 내용 :
			<textarea name="productQuestion" cols="30" rows="10"
				id="productQuestion" readonly>${qna.productQuestion }</textarea>
		</div>
		<p>문의 날짜 : ${qna.productQuestionDate }</p>
		<p>문의자 : ${qna.member.memberName }</p>
</body>
</html>