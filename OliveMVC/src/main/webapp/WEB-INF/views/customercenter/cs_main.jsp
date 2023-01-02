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
				href="https://www.oliveyoung.co.kr/store/counsel/getNoticeList.do">공지사항</a></li>
		</ul>
		<form id="sForm" name="sForm">

			<fieldset class="search-faq">
				<legend>FAQ 검색</legend>
				<!-- 					<label for="inqTitNm">FAQ 검색</label> -->
				<div class="input" id="sch_field2">
					<input type="text" id="inqTitNm" name="inqTitNm"
						title="질문 키워드를 입력해주세요." placeholder="질문 키워드를 입력해주세요." value="">
					<a href="javascript:;" class="btn_sch_del"><span class="blind">검색어
							삭제</span></a> <input type="submit" id="searchFaq" value="검색">
				</div>
			</fieldset>
			<input type="hidden" id="faqLrclCd" name="faqLrclCd" value="99">
			<input type="hidden" id="faqMdclCd" name="faqMdclCd" value="">

			<input type="hidden" id="tagYn" name="tagYn" value="">
		</form>




		<!-- <div class="tag_list_wrap">
			<span class="tag_list_tit">인기키워드</span>
			<div class="tag_list" style="margin-left: -256.206px;">
		
				<a href="javascript:faq.list.searchFaqTagList('선물하기');">선물하기</a> <a
					href="javascript:faq.list.searchFaqTagList('빠른결제');">빠른결제</a> <a
					href="javascript:faq.list.searchFaqTagList('기프트카드');">기프트카드</a> <a
					href="javascript:faq.list.searchFaqTagList('리뷰');">리뷰</a> <a
					href="javascript:faq.list.searchFaqTagList('오늘드림');">오늘드림</a> <a
					href="javascript:faq.list.searchFaqTagList('올영체험단');">올영체험단</a> <a
					href="javascript:faq.list.searchFaqTagList('픽업');">픽업</a> <a
					href="javascript:faq.list.searchFaqTagList('매장');">매장</a> <a
					href="javascript:faq.list.searchFaqTagList('배송');">배송</a> <a
					href="javascript:faq.list.searchFaqTagList('반품');">반품</a> <a
					href="javascript:faq.list.searchFaqTagList('결제');">결제</a> <a
					href="javascript:faq.list.searchFaqTagList(' 리뷰');"> 리뷰</a> <a
					href="javascript:faq.list.searchFaqTagList('교환');">교환</a> <a
					href="javascript:faq.list.searchFaqTagList('매장반품');">매장반품</a>
		
			</div>
		</div> -->


		<div id="TabsOpenArea">
				<div class="TabsConts tote on">

					<div class="list-customer">
						<ul><!-- faq 뿌리는 부분 foreach -->
						<c:forEach items="${faqList }" var="faq">
							<li class="topThree">
								<!-- faq.faqLrclCd로 --> <a href="#n" role="button" class="tit"
								title="답변 내용보기"
								data-attr="고객센터^FAQ_TOP10_TOP10^[픽업]픽업 서비스가 궁금해요"><strong>TOP10</strong><span
									class="txt_bold">[${faq.faqTitle }]</span>${faq.faqQuestion }</a>
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



				<div class="phone-banner">
					<div class="deposits">
						<strong>매장</strong> <em>1577-4887</em> <span>평일 09:00 ~
							18:00</span>
					</div>
					<div class="online">
						<strong>온라인몰</strong> <em>1522-0882</em> <span>평일 09:00 ~
							18:00</span>
					</div>
				</div>
				</div>
				
				</div>
				</div>
				<jsp:include page="../footer.jsp"></jsp:include>
		
</body>
<script>
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
</script>
</html>