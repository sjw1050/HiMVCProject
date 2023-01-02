<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
<div class="list-customer onenone m2105">
	<c:if test="${empty mqlist }">
				<ul>	
					<li class="nodata">등록하신 1:1 문의가 없습니다.</li>	
				</ul>
			</c:if>
			
			<c:if test="${not empty mqlist }">
			<!-- 1:1질문 foreach뿌리는 부분 -->
			<c:forEach items="${mqlist }" var="quest" varStatus="varstatus">
				<ul>	
					<li id="${quest.questionNum }">
						<a href="#n" role="button" class="stit" title="답변 내용보기">
			<c:if test="${quest.viewCheck }">
				<strong>답변 완료</strong>
			</c:if>
			<c:if test="${not quest.viewCheck }">
				<strong>답변 대기</strong>
			</c:if>	
							
							${quest.questionTitle }
							<span class="data">${quest.questionDate }</span>
						</a>	
		
						<ul class="conts">
							<li class="question">
								<strong>문의 내용</strong>
								<p>
									${quest.questionContent }
								</p>
								<c:if test="${not empty questFiles }">
								<c:forEach var="questFile" items="${questFiles }">
				<c:if test="${quest.questionNum ==  questFile.questionNum.questionNum}">
				<c:set var="file" value="${questFile.fileName}"></c:set>
				<div>
					<strong>첨부 파일:</strong>
					<c:choose>
						<c:when
							test="${fn:contains(file, 'jpg') or fn:contains(file, 'gif') or fn:contains(file, 'png')}">
							<a href="${pageContext.servletConfig.servletContext.contextPath }cs/quest/download/?fileName=${file}"><img
								src="${pageContext.servletConfig.servletContext.contextPath }/upload/${file}"
								alt="" /></a>
								</c:when>
						<c:otherwise>
							<a
								href="${pageContext.servletConfig.servletContext.contextPath }cs/quest/download/?fileName=${file}">${file }</a>
						</c:otherwise>
						</c:choose>
				</div>
				</c:if>
			</c:forEach>
								</c:if>
			<c:if test="${not empty answer }">
		<c:forEach items="${answer }" var="answer" varStatus="status">
		<c:if test="${quest.questionNum == answer.questionNum}">
			<div>
				<input style="" type="hidden" name="answerNum"
					id="answerNum${status.index }" value="${answer.answerNum}" />
				<p><strong>답변 내용:</strong></p>
				<textarea name="answer" cols="30" rows="3"
					id="answerForm${status.index }" readonly>${answer.answer }</textarea>
				<p>답변 날짜 : ${answer.answerDate }</p>
				<c:if test="${not empty admininfo }">
					<button style="color: black;" type="button" onclick="modifyAnswerForm(${status.index });"
						id="modifyAnswerformbtn${status.index }">답변 수정하기</button>
					<button style="display: none; color: black;" type="button"
						onclick="modifyAnswer(${status.index }, '${quest.questionNum }');"
						id="modifyAnswer${status.index }">수정한 답변 전송하기</button>
				</c:if>
			</div>
			</c:if>
		</c:forEach>
		<hr />
	</c:if>
	<c:if test="${not empty admininfo }">
		<textarea id="addanswerForm${varstatus.index}" style="display: none" name="answer"
			cols="30" rows="3">추가할 답변을 입력하시오.</textarea>
		<button type="button" class="btnGreen" onclick="createAnswer('${varstatus.index}');" id="addanswer${varstatus.index}">답변
			작성하기</button>
		<button style="display: none" class="btnGreen" type="button" onclick="addAnswer('${quest.questionNum }', '${varstatus.index}');"
			id="answerbtn${varstatus.index}">답변 전송하기</button>
	</c:if>
								
							</li>
						</ul>
					</li>	
				</ul>
				</c:forEach>
			</c:if>
			
			
			</div>
</body>
</html>