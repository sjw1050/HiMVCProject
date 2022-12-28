<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<title>Insert title here</title>

</head>
<body>
<div>
<p>공지 제목 : <input type="text" name="noticeTitle" id="noticeTitle" value="${notice.noticeTitle }" readonly/></p>
<div>
공지 내용 : 
<textarea name="noticeContent" cols="30" rows="30" id="noticeContent" readonly>${notice.noticeContent }</textarea>
<c:if test="${not empty noticeFiles }">
<c:forEach var="noticeFile" items="${noticeFiles }" varStatus="status">
<c:set var="file" value="${noticeFile.fileName}"></c:set>
<div>
첨부파일 :
<c:choose>
<c:when test="${fn:contains(file, 'jpg') or fn:contains(file, 'gif') or fn:contains(file, 'png')}">
	<a href="${pageContext.servletConfig.servletContext.contextPath }/notice/download/?fileName=${file}"><img src="${pageContext.servletConfig.servletContext.contextPath }/upload/${file}" alt="" /></a>
	<c:if test="${not empty admininfo }">
	<button style="display: none;" type="button" onclick="del('${file}')" class="modifileform">파일 삭제하기</button>
	</c:if>
</c:when>
<c:otherwise>
	<a href="${pageContext.servletConfig.servletContext.contextPath }/notice/download/?fileName=${file}">${file }</a>
</c:otherwise>
</c:choose>
</div>
</c:forEach>
<label style="display: none" for="file" id="fileadd">파일 추가하기</label>
<input style="display: none" type="file" name="file" id="file" multiple/>
</c:if>
</div>
<p>공지 날짜 : ${notice.noticeDate }</p>
<p>조회수  : ${notice.viewCount }</p>
<p><a href="${pageContext.request.contextPath }/notice/viewall">돌아가기</a></p>
</div>
<c:if test="${not empty admininfo }">
<input style="display: none" type="file" name="file" id="file" />
<button type="button" onclick="modify();" id="modi"> 수정하기</button>
<button type="button" onclick="modifynotice();" disabled="disabled" id="modibtn"> 전송하기</button>
<button type="button" onclick="remove();">삭제하기</button>
</c:if>
<script>

function del(file) {
	console.log(file);
	var context = "${pageContext.request.contextPath }";
	console.log(context+"/notice/delete?fileName="+file);
 	if(confirm("삭제하시겠습니까? 삭제된 파일은 복구할 수 없습니다.")){
 		$.ajax({
 	        url: "/notice/delete?fileName="+file,
 	        type: "get",
 	        success: function (result) {
 	        	console.log(result);
 	            if (result === "success") {
 	                alert("삭제되었습니다.");
 	               document.location.reload();
 	            }
 	        }
 	    });
	}
	
}

function modify() {
	document.getElementById("noticeTitle").readOnly = false;
	document.getElementById("noticeContent").readOnly = false;
	document.getElementById("modibtn").disabled = false;
	document.getElementById("modi").disabled = true;
	document.getElementById("file").style.display = "block";
	document.getElementById("fileadd").style.display = "block";
	$(".modifileform").css("display","block");
}

function modifynotice() {
	var title = document.getElementById("noticeTitle").value;
	var content = document.getElementById("noticeContent").value;
	var noticeNum = ${notice.noticeNum};
	var file = document.querySelector("#file");
	//console.log(file);
	
	var form = document.createElement("form");
    form.setAttribute("charset", "UTF-8");
    form.setAttribute("method", "Post");  //Post 방식
    form.setAttribute("enctype", "multipart/form-data");
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
    
    form.appendChild(file);      
    document.body.appendChild(form);   
    console.log(form);
   
    
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
</body>
</html>