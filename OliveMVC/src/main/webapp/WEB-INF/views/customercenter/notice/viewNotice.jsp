<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
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
	
	<style>
<!--
table {
    border-collapse: separate;
    text-indent: initial;
    border-spacing: 2px;
}
-->
</style>
</head>
<jsp:include page="../../header.jsp"></jsp:include>
<body>
<div id="Container">
	<div id="Contents" class="m2105">
		<div class="sub_title_area customer">
			<h1>
				고객센터 <span>무엇을 도와드릴까요?</span>
			</h1>
			<button type="button" class="btn_inquiry" id="regForm1on1" onclick="javascript:location.href='${pageContext.request.contextPath }/cs/quest/write';">1<em>:</em>1 문의하기</button>
		</div>
		
		<ul class="comm1sTabs threeSet customer">
			<li id="tabFaq"><a
				href="${pageContext.request.contextPath }/cs/faq/faqview" title="선택됨">FAQ</a></li>
			<li id="tab1on1" ><a href="${pageContext.request.contextPath }/cs/quest/view">1:1문의</a></li>
			<li id="tabNotice" class="on"><a
				href="${pageContext.request.contextPath }/cs/notice/viewall">공지사항</a></li>
		</ul>
		
		<div id="TabsOpenArea">
				
				<div class="area-customer">
					<ul class="comm2sTabs fourSet pdB30">					
						<li data-ref-ntcclsscd="00" class="on"><button type="button" onclick="counsel.noticeList.goNoticeList();" title="선택됨">전체</button></li>

					</ul>
				</div>	
				
				
				<div class="TabsConts on">
					<ul class="noticeList" id="notice-list"></ul>
					<table class="board-list-1s">
						<caption>번호, 제목, 등록일/당첨자 발표일로 이루어진 공지사항 목록 표</caption>
						<colgroup>
							<col style="width:9%;">
							<col style="width:70%;">
							<col style="width:12%;">
							<!-- 2017-03-10 수정 : colgroup 영역 전체 복사+붙여넣기해주세요(각 항목 간격 수정) -->
						</colgroup>
						<thead>
							<tr>
								<th style="text-align: center;" scope="col">번호</th>
								<th style="text-align: center;" scope="col">제목</th>
								<th style="text-align: center;" scope="col">등록일</th>
								<th style="text-align: center;" scope="col">조회수</th>
							</tr>
						</thead>
						<tbody>	
						<!-- 이슈가 있는 공지는 tr에 클래스 넣고 td에 중요하다고 표시함 c:if사용한 듯  -->
<!-- 			<tr class="notice_fix">			
								<td>중요</td>												
								<td class="subject"><strong class="FG01">일반 </strong><a href="javascript:counsel.noticeList.goDetail('38824')">온라인몰 배송지연에 진심으로 사과드립니다.</a></td>
								<td>2022.12.27</td>
							</tr> -->
							<!-- 그 외 일반 공지글들은 게시글번호로 표시 (count사용했을 것 같음)  -->
							<!-- 여기부터 foreach시작  -->				
					<c:forEach items="${noticelist }" var="notice" >
							<tr>	
								<td>${notice.noticeNum }</td>											
								<td class="subject">
								<strong class="FG01">일반 </strong>
								<a href="${pageContext.request.contextPath }/cs/notice/viewnotice?noticeNum=${notice.noticeNum}">${notice.noticeTitle }</a>
								</td>
								<td>${notice.noticeDate }</td>
								<td>${notice.viewCount }</td>
							</tr>
					</c:forEach>		
						</tbody>
					</table>
				</div>
				
			</div>
		</div>
		</div>
		
		<jsp:include page="../../footer.jsp"></jsp:include>
		


</body>
</html>