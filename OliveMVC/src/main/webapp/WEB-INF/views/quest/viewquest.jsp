<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath }/resources/css/styledbaa.css?dumm=20221223001" />
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/common/publish/jquery-1.9.1.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/common/publish/prefixfree.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/common/publish/slick.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/common/publish/commondbaa.js?dumm=20221223001"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/netfunnel/netfunneldbaa.js?dumm=20221223001"
	charset="UTF-8"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/netfunnel/pc_skindbaa.js?dumm=20221223001"
	charset="UTF-8"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/common/common.utils.js"
	charset="UTF-8"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/todaydelivery/todaydelivery.js"
	charset="UTF-8"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/common/publish/jquery.mCustomScrollbar.concat.min.js"></script>
</head>
<jsp:include page="../header.jsp"></jsp:include>
<body>
	<div id="Contents" class="m2105">
		<div class="sub_title_area customer">
			<h1>
				고객센터 <span>무엇을 도와드릴까요?</span>
			</h1>
		</div>


<table>
<tr>
	<th>문의 제목</th>
	<th>문의 날짜</th>
	<th>문의자</th>
	<th>관리자 확인 여부</th>
</tr>

	<c:forEach items="${qlist }" var="quest">
		<tr>
			<td><a href="${pageContext.request.contextPath }/quest/detailQuest?questionNum=${quest.questionNum}">${quest.questionTitle }</a></td>
			<td>${quest.questionDate }</td>
			<td>${quest.getWriter().getMemberName() }</td>
			<c:if test="${quest.viewCheck }">
				<td>O</td>
			</c:if>
			<c:if test="${not quest.viewCheck }">
				<td>X</td>
			</c:if>		
		</tr>
	</c:forEach>
</table>


</body>
</html>