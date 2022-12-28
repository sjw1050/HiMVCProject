<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<title>Insert title here</title>
</head>
<body>
	<div>
		<p>
			문의 제목 : <input type="text" name="questionTitle" id="questionTitle"
				value="${qboard.questionTitle }" readonly />
		</p>
		<div>
			문의 내용 :
			<textarea name="questionContent" cols="30" rows="10"
				id="questionContent" readonly>${qboard.questionContent }</textarea>
		</div>
		<c:if test="${not empty questFiles }">
			<c:forEach var="questFile" items="${questFiles }"
				varStatus="status">
				<c:set var="file" value="${questFile.fileName}"></c:set>
				<div>
					첨부파일 :
					<c:choose>
						<c:when
							test="${fn:contains(file, 'jpg') or fn:contains(file, 'gif') or fn:contains(file, 'png')}">
							<a
								href="${pageContext.servletConfig.servletContext.contextPath }/quest/download/?fileName=${file}"><img
								src="${pageContext.servletConfig.servletContext.contextPath }/upload/${file}"
								alt="" /></a>
							<c:if test="${not empty info }">
								<button style="display: none;" type="button"
									onclick="del('${file}')" class="modifileform">파일 삭제하기</button>
							</c:if>
						</c:when>
						<c:otherwise>
							<a
								href="${pageContext.servletConfig.servletContext.contextPath }/quest/download/?fileName=${file}">${file }</a>
						</c:otherwise>
					</c:choose>
				</div>
			</c:forEach>
			<label style="display: none" for="file" id="fileadd">파일 추가하기</label>
			<input style="display: none" type="file" name="file" id="file"
				multiple />
		</c:if>
		<p>문의 날짜 : ${qboard.questionDate }</p>
		<p>문의자 : ${qboard.getWriter().getMemberName() }</p>
		<button type="button" onclick="modify();" id="modi">수정하기</button>
		<button type="button" onclick="modifyquest();" disabled="disabled"
			id="modibtn">전송하기</button>
		<button type="button" onclick="remove();" id="remove">삭제하기</button>
		<p>
			<a href="${pageContext.request.contextPath }/quest/view">돌아가기</a>
		</p>
		<hr />
	</div>

	<c:if test="${not empty answer }">
		<c:forEach items="${answer }" var="answer" varStatus="status">
			<div>
				<input style="" type="hidden" name="answerNum"
					id="answerNum${status.index }" value="${answer.answerNum}" />
				<p>답변 내용:</p>
				<textarea name="answer" cols="30" rows="3"
					id="answerForm${status.index }" readonly>${answer.answer }</textarea>
				<p>답변 날짜 : ${answer.answerDate }</p>
				<c:if test="${not empty admininfo }">
					<button type="button" onclick="modifyAnswerForm(${status.index });"
						id="modifyAnswerform${status.index }">답변 수정하기</button>
					<button style="display: none" type="button"
						onclick="modifyAnswer(${status.index });"
						id="modifyAnswer${status.index }">수정한 답변 전송하기</button>
				</c:if>
			</div>
		</c:forEach>
		<hr />
	</c:if>
	<c:if test="${empty answer }">
		<div>
			<p>현재 등록된 답변이 없습니다.</p>
		</div>
	</c:if>
	<c:if test="${not empty admininfo }">
		<textarea id="addanswerForm" style="display: none" name="answer"
			cols="30" rows="3">추가할 답변을 입력하시오.</textarea>
		<button type="button" onclick="createAnswer();" id="addanswer">답변
			작성하기</button>
		<button style="display: none" type="button" onclick="addAnswer();"
			id="answerbtn">답변 전송하기</button>
	</c:if>

	<script>
	function del(file) {
		//console.log(file);
		var context = "${pageContext.request.contextPath }";
		//console.log(context+"/quest/delete?fileName="+file);
	 	if(confirm("삭제하시겠습니까? 삭제된 파일은 복구할 수 없습니다.")){
	 		$.ajax({
	 	        url: "/quest/delete?fileName="+file,
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
		var viewcheck = ${qboard.viewCheck};
		var memberNum = ${qboard.getWriter().getMemberNum()};
		var infoMeberNum = "${info.memberNum}";
		if(viewcheck){
			alert("관리자가 확인하여 수정이 불가능합니다.");
			return;
		}
		if(memberNum != infoMeberNum){
			alert("작성한 회원이 아니면 게시글 수정이 불가능합니다.");
			return;
		}
		document.getElementById("questionTitle").readOnly = false;
		document.getElementById("questionContent").readOnly = false;
		document.getElementById("modibtn").disabled = false;
		document.getElementById("modi").disabled = true;
		document.getElementById("file").style.display = "block";
		document.getElementById("fileadd").style.display = "block";
		$(".modifileform").css("display","block");
		
	}

	function modifyquest() {
		var title = document.getElementById("questionTitle").value;
		var content = document.getElementById("questionContent").value;
		var questionNum = ${qboard.questionNum};
		var file = document.querySelector("#file");

		var form = document.createElement("form");
		form.setAttribute("charset", "UTF-8");
		form.setAttribute("method", "Post"); //Post 방식
		form.setAttribute("enctype", "multipart/form-data");
		form.setAttribute("action",
				"${pageContext.request.contextPath }/quest/modiquest"); //요청 보낼 주소

		var hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", "questionTitle");
		hiddenField.setAttribute("value", title);
		form.appendChild(hiddenField);

		hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", "questionContent");
		hiddenField.setAttribute("value", content);
		form.appendChild(hiddenField);

		hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", "questionNum");
		hiddenField.setAttribute("value", questionNum);
		form.appendChild(hiddenField);
		form.appendChild(file);
		document.body.appendChild(form);

		form.submit();
	}

	function remove() {
		var viewcheck = ${qboard.viewCheck};
		var memberNum = ${qboard.getWriter().getMemberNum()};
		var infoMeberNum = "${info.memberNum}";
		if(viewcheck){
			alert("관리자가 확인하여 삭제가 불가능합니다.");
			return;
		}
		if(memberNum != infoMeberNum){
			alert("작성한 회원이 아니면 게시글 삭제가 불가능합니다.");
			return;
		}
		var questionNum = ${qboard.questionNum};
		var form = document.createElement("form");
		form.setAttribute("method", "post"); //Post 방식
		form.setAttribute("action",
				"${pageContext.request.contextPath }/quest/removequest"); //요청 보낼 주소

		hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", "questionNum");
		hiddenField.setAttribute("value", questionNum);
		form.appendChild(hiddenField);
		document.body.appendChild(form);

		form.submit();
	}

	function createAnswer() {
		var modifyAnswerform = document.getElementById("modifyAnswerform");
		var addanswerForm = document.getElementById("addanswerForm");
		var modi = document.getElementById("modi");
		var modibtn = document.getElementById("modibtn");
		var remove = document.getElementById("remove");
		var addanswer = document.getElementById("addanswer");
		var answerbtn = document.getElementById("answerbtn");
		addanswerForm.style.display = "block";
		modi.style.display = "none";
		modibtn.style.display = "none";
		remove.style.display = "none";
		addanswer.style.display = "none";
		answerbtn.style.display = "block";
		modifyAnswerform.style.display = "none";

	}

	function addAnswer() {
		var form = document.createElement("form");
		var questionNum = ${qboard.questionNum};
		
		form.setAttribute("method", "post");
		form.setAttribute("charset", "UTF-8");
		form.setAttribute("action",	"${pageContext.request.contextPath }/quest/addAnswer");

		hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", "questionNum");
		hiddenField.setAttribute("value", questionNum);
		form.appendChild(hiddenField);
		document.body.appendChild(form);
		
		hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", "answer");
		hiddenField.setAttribute("value", addanswerForm.value);
		form.appendChild(hiddenField);
		document.body.appendChild(form);
		
		form.submit();
	}
	
	function modifyAnswerForm(index) {
		var modifyAnswer = document.getElementById("modifyAnswer"+index);
		//console.log("answerForm"+index);
		var answerForm = document.getElementById("answerForm"+index);
		//console.log(answerForm);
		answerForm.readOnly = false;
		modifyAnswer.style.display = "block";
		addanswer.style.display = "none";
		modifyAnswerform.style.display = "none";
	}
	
	function modifyAnswer(index) {
		var form = document.createElement("form");
		var questionNum = ${qboard.questionNum};
		var answerNum = document.getElementById("answerNum"+index).value;
		var answerForm = document.getElementById("answerForm"+index);
		
		form.setAttribute("method", "post");
		form.setAttribute("charset", "UTF-8");
		form.setAttribute("action",	"${pageContext.request.contextPath }/quest/modifyAnswer");

		hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", "questionNum");
		hiddenField.setAttribute("value", questionNum);
		form.appendChild(hiddenField);
		document.body.appendChild(form);
		
		hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", "answerNum");
		hiddenField.setAttribute("value", answerNum);
		form.appendChild(hiddenField);
		document.body.appendChild(form);
		
		hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", "answer");
		hiddenField.setAttribute("value", answerForm.value);
		form.appendChild(hiddenField);
		document.body.appendChild(form);
		
		form.submit();
		
	}
</script>

</body>
</html>