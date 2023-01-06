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
			<li id="tab1on1" class="on"><a href="${pageContext.request.contextPath }/cs/quest/view">1:1문의</a></li>
			<li id="tabNotice"><a
				href="${pageContext.request.contextPath }/cs/notice/viewall">공지사항</a></li>
		</ul>
		
		<fieldset class="search-period mgT30">
		<legend></legend>
		<!-- 2019.10.20 오프라인리뷰관련 추가 -->
		

		<div class="select_con">
		<p>구매기간</p>
			<ul class="select-month">
<!-- 			[3394070] 올영체험단 리뷰 배너 오류 문의 件 요청으로 올영체험단 리뷰는 시작시 12개월로 선택되게 조건 변경 -->
				<li class="on"><button type="button" data-month="-1">1개월</button></li>
				<li><button type="button" data-month="-3">3개월</button></li>
				<li><button type="button" data-month="-6">6개월</button></li>
				<li><button type="button" data-month="-12">12개월</button></li>

				
			</ul>
			<div class="select-range">
				<select id="cal-start-year" title="년도를 선택하세요" style="width:76px;"><option value="2014">2014</option><option value="2015">2015</option><option value="2016">2016</option><option value="2017">2017</option><option value="2018">2018</option><option value="2019">2019</option><option value="2020">2020</option><option value="2021">2021</option><option value="2022" selected="selected">2022</option><option value="2023">2023</option></select>
				<label for="cal-start-year">년</label>
				<select id="cal-start-month" title="달월을 선택하세요" style="width:60px;">
					<option value="01">1</option>
					<option value="02">2</option>
					<option value="03">3</option>
					<option value="04">4</option>
					<option value="05">5</option>
					<option value="06">6</option>
					<option value="07">7</option>
					<option value="08">8</option>
					<option value="09">9</option>
					<option value="10">10</option>
					<option value="11">11</option>
					<option value="12" selected="selected">12</option>
				</select>
				<label for="cal-start-month">월</label>
				<select id="cal-start-day" title="날일을 선택하세요" style="width:60px;">
				<option value="01">1</option><option value="02">2</option><option value="03">3</option><option value="04">4</option><option value="05" selected="selected">5</option><option value="06">6</option><option value="07">7</option><option value="08">8</option><option value="09">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option></select>
				<label for="cal-start-day">일</label>
				<span class="des">~</span>
				<select id="cal-end-year" title="년도를 선택하세요" style="width:76px;"><option value="2014">2014</option><option value="2015">2015</option><option value="2016">2016</option><option value="2017">2017</option><option value="2018">2018</option><option value="2019">2019</option><option value="2020">2020</option><option value="2021">2021</option><option value="2022">2022</option><option value="2023" selected="selected">2023</option></select>
				<label for="cal-end-year">년</label>
				<select id="cal-end-month" title="달월을 선택하세요" style="width:60px;">
					<option value="01" selected="selected">1</option>
					<option value="02">2</option>
					<option value="03">3</option>
					<option value="04">4</option>
					<option value="05">5</option>
					<option value="06">6</option>
					<option value="07">7</option>
					<option value="08">8</option>
					<option value="09">9</option>
					<option value="10">10</option>
					<option value="11">11</option>
					<option value="12">12</option>
				</select>
				<label for="cal-end-month">월</label>
				<select id="cal-end-day" title="날일을 선택하세요" style="width:60px;">
				<option value="01">1</option><option value="02">2</option><option value="03">3</option><option value="04">4</option><option value="05" selected="selected">5</option><option value="06">6</option><option value="07">7</option><option value="08">8</option><option value="09">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option></select>
				<label for="cal-end-day">일</label>
			</div>
		  </div>
		  <!-- //오프라인 리뷰 -->
		  <!-- 2016-12-23 수정 -->
		<button type="button" class="btnLookup" id="do-search-period">조회</button>
	</fieldset>
	<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/common/searchPeriod.js"></script>
	<script>
	//[3394070] 올영체험단 리뷰 배너 오류 문의 件 요청으로 올영체험단 리뷰는 시작시 12개월로 선택되게 조건 변경 되어 START_DATE, END_DATE 변경
		START_DATE   = '';
		END_DATE     = '';
		ollyoungYn = '';

		$(document).ready(function(){
		var cnslChk = "Y";
		var startYear = 2012
		var thisYear = new Date().getFullYear();

		if(!common.isEmpty(cnslChk)) startYear = 2014;
			$("#cal-start-year,#cal-end-year").empty();
		while (startYear <= thisYear) {
			$("#cal-start-year,#cal-end-year").append("<option value='"+startYear+"'>"+startYear+"</option>");
		startYear++
		}

		setTimeout(function() {
			SearchPeriod.init();
		},500);
	});
</script>
	
	
	
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
				<strong style="background-color:#9bce26">답변 완료</strong>
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
						<c:when test="${fn:contains(fn:toLowerCase(file), 'jpg') or fn:contains(fn:toLowerCase(file), 'gif') or fn:contains(fn:toLowerCase(file), 'png')}">
							<!-- test="${fn:contains(fn:toLowerCase(file), 'jpg') or fn:contains(fn:toLowerCase(file), 'gif') or fn:contains(fn:toLowerCase(file), 'png')}"> -->
							
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
							</li>
							<li class="answer">
							<c:if test="${not empty answer }">
		<c:forEach items="${answer }" var="answer" varStatus="status">
		<c:if test="${quest.questionNum == answer.questionNum}">
			<div>
				<input style="" type="hidden" name="answerNum"
					id="answerNum${status.index }" value="${answer.answerNum}" />
				<p><strong style="color:#9bce26">답변완료</strong></p>
				<textarea name="answer" cols="30" rows="3"
					id="answerForm${status.index }" readonly>${answer.answer }</textarea>
				<p>답변 날짜 : ${answer.answerDate }</p>
				<div class="phr">문의에 대한 답변이 부족하거나 추가문의사항이 있으시면 새로운 문의사항으로 등록해주세요.<a href="${pageContext.request.contextPath }/cs/quest/write" class="btnGreenW">새로운 문의하기</a></div>
				<c:if test="${not empty admininfo }">
					<button style="color: black;" type="button" onclick="modifyAnswerForm(${status.index });"
						id="modifyAnswerformbtn${status.index }">답변 수정하기</button>
					<button style="display: none; color: black;" type="button"
						onclick="modifyAnswer(${status.index }, '${quest.questionNum }');"
						id="modifyAnswer${status.index }">수정한 답변 전송하기</button>
				</c:if>
			</div>
			</c:if>
			<c:if test="${quest.questionNum != answer.questionNum}">
			<p>
			<strong style="color: #888">답변 대기</strong>답변이 등록되지 않았습니다.</p></c:if>
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
			<div class="pageing">			
		<strong title="현재 페이지">1</strong>	
			</div>
			<div class="area1sButton pdT30">
				<a href="${pageContext.request.contextPath }/cs/quest/write" class="btnGreen" data-attr="고객센터^FAQ^1:1문의">1:1문의하기</a>
			</div>


</div>
</div>
<jsp:include page="../../footer.jsp"></jsp:include>
<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> -->
<script>
$('.list-customer .stit').click(function(e){
    e.preventDefault();
    if($(this).parents('li').hasClass('open')){
        $(this).parents('li').removeClass('open');
        $(this).attr('title', '답변 내용보기');
    }else{
        $(this).attr('title', '답변 내용닫기')
		$(this).parents('li').addClass('open').siblings('li').removeClass('open').children('a').attr('title', '답변 내용보기');
    }
});

function createAnswer(index) {
	var addanswer = document.getElementById("addanswer"+index);
	var addanswerForm = document.getElementById("addanswerForm"+index);
	var answerbtn = document.getElementById("answerbtn"+index);
	addanswerForm.style.display = "block";
	answerbtn.style.display = "block";
	addanswer.style.display = "none";

}

function addAnswer(questNum, index) {
	var addanswerFormdata = document.getElementById("addanswerForm"+index);
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("charset", "UTF-8");
	form.setAttribute("action",	"${pageContext.request.contextPath }cs/quest/addAnswer");
	
	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("name", "questionNum");
	hiddenField.setAttribute("value", questNum);
	form.appendChild(hiddenField);
	document.body.appendChild(form);
	
	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("name", "answer");
	hiddenField.setAttribute("value", addanswerFormdata.value);
	form.appendChild(hiddenField);
	document.body.appendChild(form);
	
	form.submit();
	
}

function modifyAnswerForm(index) {
	var modifyAnswer = document.getElementById("modifyAnswer"+index);
	var modifyAnswerformbtn = document.getElementById("modifyAnswerformbtn"+index);
	//console.log("answerForm"+index);
	var answerForm = document.getElementById("answerForm"+index);
	//console.log(answerForm);
	modifyAnswerformbtn.style.display = "none";
	answerForm.readOnly = false;
	modifyAnswer.style.display = "block";
	addanswer.style.display = "none";
	
}

function modifyAnswer(index, questnum) {
	var form = document.createElement("form");
	var answerNum = document.getElementById("answerNum"+index).value;
	var answerForm = document.getElementById("answerForm"+index);
	
	form.setAttribute("method", "post");
	form.setAttribute("charset", "UTF-8");
	form.setAttribute("action",	"${pageContext.request.contextPath }cs/quest/modifyAnswer");

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("name", "questionNum");
	hiddenField.setAttribute("value", questnum);
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