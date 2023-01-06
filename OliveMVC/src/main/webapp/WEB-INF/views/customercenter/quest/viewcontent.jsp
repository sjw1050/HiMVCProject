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
<div class="list-customer">
	<c:if test="${empty mqlist }">
				<ul>	
					<li class="nodata">등록하신 1:1 문의가 없습니다.</li>	
				</ul>
			</c:if>
			
			<c:if test="${not empty mqlist }">
			<!-- 1:1질문 foreach뿌리는 부분 -->
			<c:forEach items="${mqlist }" var="quest">
			<c:if test="${quest.viewCheck }">
				<!-- <strong style="background-color:#9bce26">답변 완료</strong> -->
				<ul>
							<li class="open">
								<p class="stit">
								<strong>답변완료</strong>
									<a href="${pageContext.request.contextPath }/cs/quest/view">${quest.questionTitle }</a>
									<span class="data">${quest.questionDate }</span>
								</p>
							</li>
						</ul>
			</c:if>
			<c:if test="${not quest.viewCheck }">
				<ul>
							<li>
								<p class="stit">
								<strong>답변대기</strong>
									<a href="${pageContext.request.contextPath }/cs/quest/view">${quest.questionTitle }</a>
									<span class="data">${quest.questionDate }</span>
								</p>
							</li>
						</ul>
			</c:if>								
				</c:forEach>
			</c:if>
</div>
</body>
</html>