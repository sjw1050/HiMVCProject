<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script>
function modify() {
	document.getElementById("noticeTitle").readOnly = false;
	document.getElementById("noticeContent").readOnly = false;
	document.getElementById("modibtn").disabled = false;
	document.getElementById("modi").disabled = true;
}

function modifyquest() {
	var title = document.getElementById("noticeTitle").value;
	var content = document.getElementById("noticeContent").value;
	var noticeNum = ${notice.noticeNum};
	
	var form = document.createElement("form");
    form.setAttribute("charset", "UTF-8");
    form.setAttribute("method", "Post");  //Post 방식
    form.setAttribute("action", "${pageContext.request.contextPath }/notice/modinotice"); //요청 보낼 주소

    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "noticeTitle");
    hiddenField.setAttribute("value", title);
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "noticeContent");
    hiddenField.setAttribute("value", content);
    form.appendChild(hiddenField);
    
    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "noticeNum");
    hiddenField.setAttribute("value", noticeNum);
    form.appendChild(hiddenField);
    document.body.appendChild(form);
    
    form.submit();	
}

function remove() {
	var noticeNum = ${notice.noticeNum};
	var form = document.createElement("form");
	form.setAttribute("method", "post");  //Post 방식
    form.setAttribute("action", "${pageContext.request.contextPath }/notice/removenotice"); //요청 보낼 주소
    
	hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "noticeNum");
    hiddenField.setAttribute("value", noticeNum);
    form.appendChild(hiddenField);
    document.body.appendChild(form);
    
    form.submit();
}
</script>
</head>
<body>
<div>
<p>공지 제목 : <input type="text" name="noticeTitle" id="noticeTitle" value="${notice.noticeTitle }" readonly/></p>
<div>
공지 내용 : 
<textarea name="noticeContent" cols="30" rows="30" id="noticeContent" readonly>${notice.noticeContent }</textarea>
<c:set var="pattern" value="/jpg$|gif$|png$|jpge$/i"></c:set>
<c:if test="${not empty noticeFile }">
<div>
<c:forTokens var="ext" items="${noticeFile.fileName}" delims="." varStatus="status">
    <!-- 파일명중간에 "." 이 존재할수도 있으니 항상 status.last(마지막번째) 를 실행해주어야 한다 -->
    <c:if test="${status.last}">
        <c:choose>
            <c:when test="${ext eq 'img'}">
                <img src="${pageContext.servletConfig.servletContext.contextPath }/upload/${noticeFile.fileName}" alt="" />
            </c:when>
            </c:choose>
            </c:if>
            </c:forTokens>
<a href="${pageContext.servletConfig.servletContext.contextPath }/notice/download/?noticeNum=${notice.noticeNum}">${noticeFile.fileName}</a>
</div>
</c:if>
</div>
<p>공지 날짜 : ${notice.noticeDate }</p>
<p>조회수  : ${notice.viewCount }</p>
<p><a href="${pageContext.request.contextPath }/notice/viewall">돌아가기</a></p>
</div>
<c:if test="${not empty admininfo }">
<button type="button" onclick="modify();" id="modi"> 수정하기</button>
<button type="button" onclick="modifyquest();" disabled="disabled" id="modibtn"> 전송하기</button>
<button type="button" onclick="remove();">삭제하기</button>
</c:if>
</body>
</html>