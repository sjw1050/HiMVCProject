<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<html>
<head>
<meta property="og:title" content="올리브영 온라인몰" />

<meta property="og:url" content="main.html" />

<meta property="og:image" content="" />

<meta property="og:description" content="대한민국 NO.1 헬스&뷰티 스토어 OLIVEYOUNG" /> 
</head>
<body>

<title>올리브영 온라인몰</title>
<meta name="title" content="올리브영 온라인몰" />
<meta name="description" content="대한민국 NO.1 헬스&뷰티 스토어 OLIVEYOUNG">
<meta name="facebook-domain-verification"
	content="e6vbg9ygxkui4o2owlhxnwptf0mdk2" />

<jsp:include page="/WEB-INF/views/header.jsp"/>



<!-- 클릭한 카테고리에 상품 없을 시 -->
	<c:if test="${empty listBySub && empty listByMain}">
		<div class="searchResultArea">    
		<p class="resultTxt"><strong></strong>전체 <span>0개</span>의 상품</p>
		</div>
		<div class="search_no_data">    
			<p>해당 카테고리에 대한 결과가 없습니다.</p>    
			<div class="usage-guide">        
				<p>다른 카테고리의 상품을 둘러보세요.</p>        
				<ul>            
					<li>토너/로션/올인원 제품</li>            
					<li>샴푸/트리트먼트 제품</li>            
					<li>베이스메이크업 제품</li>        
				</ul>    
			</div>
		</div>
	</c:if>
	

	
	
<!-- main카테고리별 상품 -->
<div class="main_recomm_wrap" id="mainReComSlider">
	<div>
		<ul class="cate_prd_list no_line">
			<!-- c:forEach 시작 -->
			 <c:forEach items="${listByMain}" var="listByMain">
				<li class="flag">
						<div class="prd_info ">
						<input name="productId" type="hidden" value="${pList.productId }" />
						<!-- <a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000170878&amp;dispCatNo=90000010001&amp;trackingCd=Home_Recommand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Recommand" class="prd_thumb goodsList" data-ref-goodsNo="A000000170878" data-attr="홈^이상품어때요^[12월 올영픽][미노이PICK/미노이QR카드] 줄라이미 페르소나 퍼퓸 50ml 단품/기획 6종 택1^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="002" data-trk="null" data-impression="A000000170878^홈_이상품어때요^1"> -->
						<a href="${pageContext.request.contextPath }/product/viewOneProduct?productId=${listByMain.productId}" name="Home_Recommand" class="prd_thumb goodsList" data-ref-goodsNo="#" data-attr="#">
							<span class="thumb_flag best">베스트</span>
							<img src="${pageContext.servletConfig.servletContext.contextPath }${listByMain.oliveFile.fileName}" alt="" onerror="common.errorImg(this);"/> 
						</a>
						<div class="prd_name">
							<a href="javascript:;" name="Home_Recommand" class="goodsList" data-ref-goodsNo="A000000170878" data-attr="홈^이상품어때요^[12월 올영픽][미노이PICK/미노이QR카드] 줄라이미 페르소나 퍼퓸 50ml 단품/기획 6종 택1^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="002" data-trk="null">
								<span class="tx_brand">${listByMain.brandName}</span>
								<p class="tx_name">${listByMain.productName}</p>
							</a>
							</div>
							<button class="btn_zzim jeem" data-ref-goodsNo="A000000170878">찜하기</button>
							<p class="prd_price">
								<span class="tx_cur"><span class="tx_num">${listByMain.productPrice}</span>원 </span>
							</p>
							<p class="prd_flag"><span class="icon_flag sale">세일</span>
							<span class="icon_flag coupon">쿠폰</span>
							<span class="icon_flag delivery">오늘드림</span>
							</p>
							<p class="prd_point_area tx_num">
								<span class="review_point"><span class="point" style="width:98.0%">10점만점에 5.5점</span></span>(999+)
							</p>
							<p class="prd_btn_area">
								<button class="cartBtn" data-ref-goodsNo="A000000170878" data-ref-dispCatNo="90000010001" data-ref-itemNo="002">장바구니</button>
								<button class="btn_new_pop goodsList">새창보기</button>
							</p>
						</div>
					</li>
			</c:forEach>
			<!-- c:forEach 끝 -->
		</ul>
	</div>
</div>
<!-- main카테고리별 상품 끝 -->



<!-- sub 카테고리별 상품 -->
<div class="main_recomm_wrap" id="mainReComSlider">
	<div>
		<ul class="cate_prd_list no_line">
			<!-- c:forEach 시작 -->
			 <c:forEach items="${listBySub}" var="listBySub">
				<li class="flag">
						<div class="prd_info ">
						<input name="productId" type="hidden" value="${pList.productId }" />
						<!-- <a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000170878&amp;dispCatNo=90000010001&amp;trackingCd=Home_Recommand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Recommand" class="prd_thumb goodsList" data-ref-goodsNo="A000000170878" data-attr="홈^이상품어때요^[12월 올영픽][미노이PICK/미노이QR카드] 줄라이미 페르소나 퍼퓸 50ml 단품/기획 6종 택1^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="002" data-trk="null" data-impression="A000000170878^홈_이상품어때요^1"> -->
						<a href="${pageContext.request.contextPath }/product/viewOneProduct?productId=${listBySub.productId}" name="Home_Recommand" class="prd_thumb goodsList" data-ref-goodsNo="#" data-attr="#">
							<span class="thumb_flag best">베스트</span>
							<img src="${pageContext.servletConfig.servletContext.contextPath }${listBySub.oliveFile.fileName}" alt="" onerror="common.errorImg(this);"/> 
						</a>
						<div class="prd_name">
							<a href="javascript:;" name="Home_Recommand" class="goodsList" data-ref-goodsNo="A000000170878" data-attr="홈^이상품어때요^[12월 올영픽][미노이PICK/미노이QR카드] 줄라이미 페르소나 퍼퓸 50ml 단품/기획 6종 택1^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="002" data-trk="null">
								<span class="tx_brand">${listBySub.brandName}</span>
								<p class="tx_name">${listBySub.productName}</p>
							</a>
							</div>
							<button class="btn_zzim jeem" data-ref-goodsNo="A000000170878">찜하기</button>
							<p class="prd_price">
								<span class="tx_cur"><span class="tx_num">${listBySub.productPrice}</span>원 </span>
							</p>
							<p class="prd_flag"><span class="icon_flag sale">세일</span>
							<span class="icon_flag coupon">쿠폰</span>
							<span class="icon_flag delivery">오늘드림</span>
							</p>
							<p class="prd_point_area tx_num">
								<span class="review_point"><span class="point" style="width:98.0%">10점만점에 5.5점</span></span>(999+)
							</p>
							<p class="prd_btn_area">
								<button class="cartBtn" data-ref-goodsNo="A000000170878" data-ref-dispCatNo="90000010001" data-ref-itemNo="002">장바구니</button>
								<button class="btn_new_pop goodsList">새창보기</button>
							</p>
						</div>
					</li>
			</c:forEach>
			<!-- c:forEach 끝 -->
		</ul>
	</div>
</div>
<!-- sub 카테고리별 상품 끝 -->


<jsp:include page="/WEB-INF/views/footer.jsp"/>
</body>
</html>