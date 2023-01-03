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
			<c:forEach items="${mqlist }" var="quest">
				<ul>	
					<li id="${quest.questionNum }">
						<a href="${pageContext.request.contextPath }/cs/quest/view" role="button" class="stit" title="1:1문의 이동">
			<c:if test="${quest.viewCheck }">
				<strong>답변 완료</strong>
			</c:if>
			<c:if test="${not quest.viewCheck }">
				<strong>답변 대기</strong>
			</c:if>								
							${quest.questionTitle }							
						</a>	
						<span style="margin-left: 500px" class="data">${quest.questionDate }</span>						
					</li>	
				</ul>
				</c:forEach>
			</c:if>
			
			
			</div>
</body>
</html>