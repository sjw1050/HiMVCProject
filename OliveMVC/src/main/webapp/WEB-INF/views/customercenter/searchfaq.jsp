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
<jsp:include page="../header.jsp"></jsp:include>
<body>
<div id="Container">
	<div id="Contents" class="m2105">
		<div class="sub_title_area customer">
			<h1>
				고객센터 <span>무엇을 도와드릴까요?</span>
			</h1>
		</div>



		<ul class="comm1sTabs threeSet customer">
			<li id="tabFaq" class="on"><a
				href="${pageContext.request.contextPath }/cs/faq/faqview" title="선택됨">FAQ</a></li>
			<li id="tab1on1"><a href="${pageContext.request.contextPath }/cs/quest/view">1:1문의</a></li>
			<li id="tabNotice"><a
				href="${pageContext.request.contextPath }/cs/notice/viewall">공지사항</a></li>
		</ul>
		<form id="sForm" name="sForm">

			<fieldset class="search-faq">
				<legend>FAQ 검색</legend>
				<label for="inqTitNm">FAQ 검색</label>
				<div class="input" id="sch_field2">
					<input type="text" id="inqTitNm" name="inqTitNm"
						title="질문 키워드를 입력해주세요." placeholder="질문 키워드를 입력해주세요." value="${inqTitNm }">
					<a href="javascript:;" class="btn_sch_del"><span class="blind">검색어
							삭제</span></a> 
					<input type="submit" id="searchFaq" value="검색">
				</div>
			</fieldset>
		</form>
		
		<div id="TabsOpenArea">
				<div class="TabsConts tote on">
				<div class="result-board pdT30">
						<span class="num">
							<span>${inqTitNm }</span> 검색결과 총 <em>${count }</em>개
						</span>
					</div>

					<div class="list-customer">
						<ul><!-- faq 뿌리는 부분 foreach -->
						<c:forEach items="${faqList }" var="faq">
							<li class="topThree">
								<!-- faq.faqLrclCd로 --> <a href="#n" role="button" class="tit"
								title="답변 내용보기"><strong>[${faq.faqTitle }]</strong>
									${faq.faqQuestion }</a>
								<ul class="conts">
									<li class="question">
										<div class="pdzero">
											<p>
												${faq.faqAnswer }<br> 
												&nbsp;
											</p>

										</div>

										<!-- <p class="faq_txt_good">
											답변이 도움이 되었나요?
											<button class="btn_faq_good" id="btn_faq_good_245"
												onclick="faq.list.setFaqTagList('245'); return false;">
												<span>도움이 되었어요</span>
											</button>
										</p> <input type="hidden" id="faqTagType245" name="faqTagType245"
										value=""> -->
									</li>
								</ul>
							</li>
							</c:forEach>

						</ul>
					</div>
				</div>
				<div class="pageing">
					<strong title="현재 페이지">1</strong>
				</div>
				</div>
				
				</div>
				</div>
				<jsp:include page="../footer.jsp"></jsp:include>
				</body>
<script>
$(window).load(function() {
	var inqTitNm = $("#inqTitNm").val();
	//console.log("그냥밸류 찍음"+ inqTitNm);
	if(inqTitNm.length > 0){
	    $(".list-customer").find('a').each(function(){
	        var html = $(this).html();
	        //console.log("밸류가 0보다 크면"+html);
	        
	        if(html.indexOf("span") < 0){
	            var reHtml = html.replace(new RegExp("("+inqTitNm+")","gi"),"<span class='tx_same'>$1</span>");
	            //console.log("스팬이 0보다 작으면"+reHtml);
	            $(this).html(reHtml);
	        }
	    })
	}
	});
$('.list-customer .tit').click(function(e){
    e.preventDefault();
    if($(this).parents('li').hasClass('open')){
        $(this).parents('li').removeClass('open');
        $(this).attr('title', '답변 내용보기');
    }else{
    	$(this).attr('title', '답변 내용닫기')
			$(this).parents('li').addClass('open').siblings('li').removeClass('open').children('a').attr('title', '답변 내용보기');

    }
});
$('#searchFaq').on("click", function(e){
	var sForm = $("#sForm");
    e.preventDefault();
    
    if($("#inqTitNm").val().length == 0 || $.trim($("#inqTitNm").val()).length < 1){
        alert('검색어를 입력해주세요.');
        return false;
    }
    if($("#inqTitNm").val().length > 10){
        alert('최대 10자까지 입력 가능합니다.');
        return false;
    }
   
    sForm.attr('action', "${pageContext.request.contextPath }/cs/faq/search");
    sForm.attr('method', "post");
    //console.log(sForm);
    //console.log($("#inqTitNm").val());
  	sForm.submit();
});
</script>
</html>