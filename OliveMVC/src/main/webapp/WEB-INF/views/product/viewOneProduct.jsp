<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
이것이 찐이다
  <script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/common/publish/jquery-1.9.1.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/common/publish/prefixfree.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/common/publish/slick.min.js"></script>
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
  <link rel="stylesheet" href="${pageContext.request.contextPath }/resources/css/styledbaa.css" />

</head>
  <jsp:include page="../header.jsp" />
<body>

	<div id="Container">
		<div id="Contents">

			<div class="prd_detail_box renew">
				<div class="left_area">

					<div class="prd_img">

						<span class="thumb_flag best">베스트</span> <img id="mainImg"
							src="https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0016/A00000016302004ko.jpg?l=ko"
							alt="상품명 이미지" onerror="common.errorImg(this);"> <input
							type="hidden" id="mainImgSize" value="550">


						<!-- 20200526 상품개선 : 추가 / 발색비교 옵션 선택 시 옵션명 변경 및 관련 썸네일로 변경 -->
						<div class="prd-option-name">
							<!-- 노출 시 is-active class 추가 -->
							<span class="txt" id="goodstxt">03. 얼모스트 핑크</span>
						</div>
					</div>

					<ul class="prd_thumb_list" id="prd_thumb_list">

						<input type="hidden" id="snsImgUrl"
							value="https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0016/A00000016302004ko.jpg?l=ko">

						<!-- <li class="sel"><a href="javascript:;"
							data-img="https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0016/A00000016302004ko.jpg?l=ko"><img
								src="https://image.oliveyoung.co.kr/uploads/images/goods/85/10/0000/0016/A00000016302004ko.jpg?l=ko"
								alt="썸네일이미지" onerror="common.errorImg(this);"></a></li>

						<li class=""><a href="javascript:;"
							data-img="https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0016/A00000016302003ko.jpg?l=ko"><img
								src="https://image.oliveyoung.co.kr/uploads/images/goods/85/10/0000/0016/A00000016302003ko.jpg?l=ko"
								alt="썸네일이미지" onerror="common.errorImg(this);"></a></li>
 -->
					</ul>

					<!-- 202005 상품개선 : 위치 변경 및 마크업 변경 -->
					<!-- 고객 만족도 및 공유, 재고확인 -->
					<div class="prd_social_info">
						<!-- 평점 및 리뷰 건수 추가 -->
						<p id="repReview">
							<strong>고객 리뷰</strong> <span class="review_point"> <span
								class="point" style="width: 92.0%"> </span>
							</span> <b> 4.6 </b> <em>(459건)</em>
						</p>
						<!-- 위치 변경 <p><a href="#" class="btn_off_store" data-rel="layer" data-target="offlineStore">올리브영 오프라인 매장 재고확인</a></p>-->
						<p>
							<!-- 							<strong>공유하기</strong> -->
							<a href="javascript:common.sns.doShare('kakaostory');"
								class="link_social kakao goods_share_kakao">카카오톡 공유하기(새창)</a> <a
								href="javascript:common.sns.doShare('facebook');"
								class="link_social facebook goods_share_facebook">페이스북
								공유하기(새창)</a> <a href="javascript:common.sns.doShare('url');"
								class="link_social url goods_share_url">URL공유하기</a>
						</p>
					</div>
					<!--// 고객 만족도 및 공유, 재고확인 -->

				</div>
				<div class="right_area">
					<div class="prd_info">



						<p class="prd_brand">

							<a href="#" id="moveBrandShop" class="pd_arrow_link">${oneProdList.brandName }</a>
						</p>

						<p class="prd_name">${oneProdList.productInfo }
							<br />${oneProdList.brandName  } 야야야야야야야
							<br />${viewCartList }</p>


						<!-- 202005 상품개선 : 추가 -->
						<!-- 					<p class="prd-txt1">1회 최대 구매수량 5개 입니다.</p> -->

						<div class="price">


							<span class="price-2"> ${oneProdList.productPrice }원</span>


						</div>

						<div class="prd_more_info">

							<div class="row">
								<p class="tit">
									배송정보<a
										class="ico_info" style="margin: 5px 0 0 7px">배송정보 레이어 열기</a>
								</p>
								<p></p>

								<ul class="bl_list">

									<li><span>일반배송</span>
										<div>
											2,500원 ( 20,000 원 이상 무료배송 ) <br> <em>올리브영 배송 </em> <em>평균
												9일 이내 배송</em>

										</div>
									</li>
								</ul>
							</div>
						
							<div class="row">
								<p class="tit">결제혜택</p>
								<div class="txt_list">

									<p>
										THE CJ 카드 추가 10%할인 <a
											href="javascript:goods.detail.openCardFullPop();"
											class="ico_info">카드혜택가 안내 레이어 열기</a>
									</p>





									<p>
										CJ ONE 포인트 <span class="color-4">PINK OLIVE</span> 0.5% 적립 예상
										<a onclick="openCjonepntPop()"
											class="ico_info">CJ ONE 포인트 예상적립 레이어 열기</a>
									</p>



								</div>
							</div>


						</div>

						<div class="option_add_area pkg_goods_n">
							<div class="prd_cnt_box item_A000000163020002 no_prom" promno="">
								<input type="hidden" id="itemInv_A000000163020002" value="6683">
								<input type="hidden" id="quickItemInv_A000000163020002" value="6683"> 
							    <input type="hidden" id="itemQty_A000000163020002" value="1"> 
							    <input type="hidden" id="itemMinQty_A000000163020002" value="1">
								<input type="hidden" id="itemMaxQty_A000000163020002" value="10">
								<input type="hidden" name="itemNo" value="002"> 
								<input type="hidden" name="sGoodsNo" value="A000000163020"> 
								<input type="hidden" name="itemPrsntYn" value="N"> 
								<input type="hidden" id="itemLgcGoodsNo_8809782559384" name="itemLgcGoodsNo" value="8809782559384"> 
								<input type="hidden" id="quickYn_A000000163020002" value="Y">
								<input type="hidden" id="itemSalePrc_A000000163020002" value="10000">
								
								<div class="tit_area">
									<span>수량을 입력하세요</span>
									<span class="option_cnt_box">
										<button class="btnCalc minus"
											onclick="goods.detail.cart.prevVal('A000000163020002','10000','1');">수량
											1감소</button> <input type="text" id="cartCnt_A000000163020002" name="" value="1" class="tx_num" title="구매수량">
										<button class="btnCalc plus"
											onclick="goods.detail.cart.nextVal('A000000163020002','10000','1');">수량
											1증가</button>
									</span>
								</div>
								<div class="cont_area">
									<span class="option_price"><span class="tx_num">${list.productPrice * list.totalProductCount }</span>원</span>
									
								</div>
							</div>
						</div>


						<div class="option_add_area pkg_goods_n"></div>

						<div class="prd_total_price">
							<span class="tx_tit">상품금액 합계</span>
							<input type="hidden" id="totalCnt" value="1" name="totalCnt">
							<input type="hidden" id="totalPrc" value="10000" name="totalPrc">
							
							<span class="tx_cont"><span class="tx_num" id="totalPrcTxt">10,000</span>원</span>
							
							
						</div>

						<div class="prd_btn_area new-style type1">
							<form
								action="${pageContext.request.contextPath }/cart/insertInCart"
								method="post">
								<input name="productId" type="hidden" value="${oneProduct.productId }" />
								<%-- <input name="productPrice" type="hidden" value = "${oneProduct.productPrice }" /> --%>
								<!-- <input name="count" min="1" type="number" /> -->
								<button class="btnBasket dupItem goods_cart"
									data-attr="상품상세^주문유형^장바구니">장바구니</button>
							</form>

							<form
								action="${pageContext.request.contextPath }/order/viewOrderList" method="get">
								<input name="productId" type="hidden" id="productId" value="${oneProdList.productId }" />
								<button class="btnBuy goods_buy" id="cartBtn"
									onclick="javascript:common.popLayer.todayDelivery.openTodayDeliveryNotice('goodsdetail.order');"
									data-attr="상품상세^주문유형^바로구매">바로구매</button>
							</form>

							<button class="btnZzim  goods_wish"
								data-ref-goodsno="A000000163020"
								data-attr="상품상세^상품좋아요^[벅벅쿠션] 브링그린 티트리 시카 톤업 선 쿠션 15g_0">
							<img src="${pageContext.request.contextPath }/resources/image/comm/icon-like-32-line.png"/>찜하기전</button>
						</div>
					</div>
				</div>
			</div>
			
		<ul class="prd_detail_tab" id="tabList">
			<li class="on" id="productInfo"><a href="javascript:;" class="goods_detailinfo" data-attr="상품상세^상품상세_SortingTab^상품설명">상품설명</a></li>
			<li id="buyInfo" class=""><a href="javascript:;" class="goods_buyinfo" data-attr="상품상세^상품상세_SortingTab^구매정보">구매정보</a></li>
			<li id="reviewInfo" class=""><a href="javascript:;" class="goods_reputation" data-attr="상품상세^상품상세_SortingTab^리뷰">리뷰<span>(461)</span></a></li>
			<li id="qnaInfo"><a href="javascript:;" class="goods_qna" data-attr="상품상세^상품상세_SortingTab^Q&amp;A">Q&amp;A<span>(8)</span></a></li>
		</ul>


	      	<!-- 상품 설명 -->
		<div class="tabConts prd_detail_cont show">
									<div class="detail_area">
									
	
													<div class="contEditor">
														<script>
															$(window).load(function(){
																// 2017-02-18 : txs : 상품 상세 레이아웃 크기 재조정
													            goods.detail.tagHandler.inittGoodsDetailObjects();
													            $("#tempHtml").html("");
															});
														</script>
													
							
								<div style="text-align: center">
									<img alt=""
										src="${pageContext.request.contextPath }/resources/image/product_features/bringgreen_teatree_toneup_explanation.jpg">
								</div>
						
							
						</div>
										
										
									
									
									
									</div>
						
									
									<p class="tit_cate_best mgT40 dispCatBest" style="display:none;">선케어 카테고리 베스트 상품</p>
									<ul class="cate_prd_list dispCatBest" id="recommGoodsList" style="display:none;">
									
									</ul>
									
						
									
								
									
										<div class="curation_area_a029_lead"></div>
										<div id="recobell_area_a029" class="cura_pord curation_area_029 btm" style="display:none;">
											<h4 class="tit_h4">함께 보면 좋은 상품이에요</h4>
											<div class="loading_box">
												<span class="icon"><img src="https://static.oliveyoung.co.kr/pc-static-root/image/comm/pc_loading.gif" alt="로딩중"></span>
												<p class="txt">고객님을 위한 상품 추천중이에요</p>
											</div>
										</div>
						<!-- 				<div class="curation_area_a003_lead"></div> -->
						<!-- 				<div id="recobell_area_a003" class="cura_pord curation_area_003 btm" style="display:none;"> -->
						<!-- 					<h4 class="tit_h4">함께 보면 좋은 상품이에요</h4> -->
						<!-- 					<div class="loading_box"> -->
						
						<!-- 						<p class="txt">고객님을 위한 상품 추천중이에요</p> -->
						<!-- 					</div> -->
						<!-- 				</div> -->
									
								
									
									<div id="relPlanShop_area" class="related_plan"></div>
						
								</div>
								
		<!-- 구매정보 -->
		<div class="tabConts prd_detail_cont ">
												<jsp:include page="/WEB-INF/views/product/purchaseInfo.jsp" />
											</div>
	
		<!-- 리뷰 -->
		
		<div class="tabConts prd_detail_cont" id="gdasContentsArea">
	         adsfsadfadsfasdfasdf                        	<!-- 우리가 만든 리뷰가 들어갈 자리입니다 -->
		</div>
		
		<!-- 큐앤에이 -->
		<div class="tabConts prd_detail_cont" id="qnaContentsArea">

 
	<div class="prd_qna_tit">
		<p onclick="location.href='${pageContext.request.contextPath }/cs/quest/write'" style="cursor: pointer;">★ 상품 문의사항이 아닌 반품/교환관련 문의는 고객센터 1:1 문의를 이용해주세요.</p>
		<button class="btnInquiry goods_qna_inquiry" onclick="location.href='${pageContext.request.contextPath }/cs/quest/write'">상품문의</button>
	</div>
	<ul class="prd_qna_list" id="prd_qna_list">

	
		
		<li>
			<div class="qna_tit_box">
				<p class="qna_question">
							
				
					<span class="qna_flag complete">답변완료</span>
				
				
			
					<a href="javascript:;" class="completeBind">일본산원료가 들어있나요</a>
				</p>
				<p class="tx_userid">
					<span>dkstj****</span>
			
				</p><p class="tx_date">2022.11.13</p>
			</div>
			<div class="qna_answer_box">
				<div class="tx_question">
					<span class="ico_qna question">질문</span>
					일본산원료가 들어있나요
				</div>
			
				<div class="tx_answer">
					<span class="ico_qna answer">답변</span>
					반갑습니다<br>올리브영 온라인몰입니다.<br><br>브링그린 티트리시카톤업선쿠션 상품 내 일본산 원료 포함되어 있습니다.<br><br>감사합니다.
					
				</div>
						
			</div>
		</li>
		
		<li>
			<div class="qna_tit_box">
				<p class="qna_question">
							
				
					<span class="qna_flag complete">답변완료</span>
				
				
			
					<a href="javascript:;" class="completeBind">옵션에 단품이 있고 리필기획이 있던데
리필기획은 구성이 어떻게 되나요?</a>
				</p>
				<p class="tx_userid">
					<span>yyh****</span>
			
				</p><p class="tx_date">2022.10.17</p>
			</div>
			<div class="qna_answer_box">
				<div class="tx_question">
					<span class="ico_qna question">질문</span>
					옵션에 단품이 있고 리필기획이 있던데
<br>리필기획은 구성이 어떻게 되나요?
				</div>
			
				<div class="tx_answer">
					<span class="ico_qna answer">답변</span>
					반갑습니다<br>올리브영 온라인몰입니다.<br><br>리필 기획은 본품과 리필이 포함되어 발송되며, 단품은 일반 본품만 발송됩니다. <br><br>감사합니다.
					
				</div>
						
			</div>
		</li>
		
		<li>
			<div class="qna_tit_box">
				<p class="qna_question">
							
				
					<span class="qna_flag complete">답변완료</span>
				
				
			
					<a href="javascript:;" class="completeBind">자차지수 인증된 제품인가용??</a>
				</p>
				<p class="tx_userid">
					<span>skyblue****</span>
			
				</p><p class="tx_date">2022.05.04</p>
			</div>
			<div class="qna_answer_box">
				<div class="tx_question">
					<span class="ico_qna question">질문</span>
					자차지수 인증된 제품인가용??
				</div>
			
				<div class="tx_answer">
					<span class="ico_qna answer">답변</span>
					반갑습니다<br>올리브영 온라인몰입니다.<br><br>본 상품은 무기자차 인증 제품 입니다. <br>감사합니다.
					
				</div>
						
			</div>
		</li>
		
		<li>
			<div class="qna_tit_box">
				<p class="qna_question">
							
				
					<span class="qna_flag complete">답변완료</span>
				
				
			
					<a href="javascript:;" class="completeBind">리필이랑 같이 있는 상품은 안 내주시나요?? ㅜ&nbsp;
한통씩 사는거 너무 낭비 같아요 ㅜ 선크림이라 금방금방 쓰게되는데&nbsp;
제품이 바뀌었다고 하는데 톤업되는 정도도 많이 차이 나나요??</a>
				</p>
				<p class="tx_userid">
					<span>pee****</span>
			
				</p><p class="tx_date">2022.04.09</p>
			</div>
			<div class="qna_answer_box">
				<div class="tx_question">
					<span class="ico_qna question">질문</span>
					리필이랑 같이 있는 상품은 안 내주시나요?? ㅜ&nbsp;
<br>한통씩 사는거 너무 낭비 같아요 ㅜ 선크림이라 금방금방 쓰게되는데&nbsp;
<br>제품이 바뀌었다고 하는데 톤업되는 정도도 많이 차이 나나요??
				</div>
			
				<div class="tx_answer">
					<span class="ico_qna answer">답변</span>
					반갑습니다<br>올리브영 온라인몰입니다.<br><br>소중한 의견 감사드립니다.<br><br>남겨주신 의견은 유관부서에 전달하여 <br>향후 더 좋은 서비스로 찾아뵙기 위해 노력하겠습니다.<br><br>또한 톤업 정도의 경우 피부에 발색 되는 정도가 사용하시는 고객님의 피부톤에 따라 다를 수 있고 발색을 인식하는 정도가 주관적일 수 있습니다. <br>가능하시다면 가까운 매장에서 제품 테스트와 상담을 통해 고객님께 적합한 제품을 찾기를 권장해 드립니다.<br><br>감사합니다.
					
				</div>
						
			</div>
		</li>
		
		<li>
			<div class="qna_tit_box">
				<p class="qna_question">
							
				
					<span class="qna_flag complete">답변완료</span>
				
				
			
					<a href="javascript:;" class="completeBind">사용연령이 있나요?
초등 고학년 중학생 사용 가능한가요?</a>
				</p>
				<p class="tx_userid">
					<span>fine****</span>
			
				</p><p class="tx_date">2022.04.01</p>
			</div>
			<div class="qna_answer_box">
				<div class="tx_question">
					<span class="ico_qna question">질문</span>
					사용연령이 있나요?
<br>초등 고학년 중학생 사용 가능한가요?
				</div>
			
				<div class="tx_answer">
					<span class="ico_qna answer">답변</span>
					반갑습니다<br>올리브영 온라인몰입니다.<br><br>죄송하게도, 문의주신 상품은<br>피부 상태 및 개인의 차이에 따라 상이할 수 있는 부분으로<br>가능하시다면 가까운 매장에서 제품 테스트와 상담을 통해 이용을 권장드립니다.<br><br>감사합니다.
					
				</div>
						
			</div>
		</li>
		
		<li>
			<div class="qna_tit_box">
				<p class="qna_question">
							
				
					<span class="qna_flag complete">답변완료</span>
				
				
			
					<a href="javascript:;" class="completeBind">그전 제품이랑 동일한가요??</a>
				</p>
				<p class="tx_userid">
					<span>jjhnew****</span>
			
				</p><p class="tx_date">2022.03.03</p>
			</div>
			<div class="qna_answer_box">
				<div class="tx_question">
					<span class="ico_qna question">질문</span>
					그전 제품이랑 동일한가요??
				</div>
			
				<div class="tx_answer">
					<span class="ico_qna answer">답변</span>
					반갑습니다.<br>올리브영 온라인몰입니다.<br><br>신규로 출시된 "브링그린 티트리 시카 톤업 선쿠션"은 기존 브링그린 운영 제품이었던 "브링그린 티트리 톤업 선쿠션"과 성분/제형 모두 다른 제품입니다.<br><br>감사합니다.
					
				</div>
						
			</div>
		</li>
		
		<li>
			<div class="qna_tit_box">
				<p class="qna_question">
							
				
					<span class="qna_flag complete">답변완료</span>
				
				
			
					<a href="javascript:;" class="completeBind">저도 궁금합니다 기존에 있던 선 쿠션 팬인데
구매하려고 보니 싹 바뀌었는데, 리뉴얼 제품 맞는거죠?</a>
				</p>
				<p class="tx_userid">
					<span>hiy****</span>
			
				</p><p class="tx_date">2022.03.03</p>
			</div>
			<div class="qna_answer_box">
				<div class="tx_question">
					<span class="ico_qna question">질문</span>
					저도 궁금합니다 기존에 있던 선 쿠션 팬인데
<br>구매하려고 보니 싹 바뀌었는데, 리뉴얼 제품 맞는거죠?
				</div>
			
				<div class="tx_answer">
					<span class="ico_qna answer">답변</span>
					반갑습니다.<br>올리브영 온라인몰입니다.<br><br>신규로 출시된 "브링그린 티트리 시카 톤업 선쿠션"은 기존 브링그린 운영 제품이었던 "브링그린 티트리 톤업 선쿠션"과 성분/제형 모두 다른 제품입니다.<br><br>감사합니다.
					
				</div>
						
			</div>
		</li>
		
		<li>
			<div class="qna_tit_box">
				<p class="qna_question">
							
				
					<span class="qna_flag complete">답변완료</span>
				
				
			
					<a href="javascript:;" class="completeBind">기존 티트리 선쿠션 리뉴얼 제품인건가요?! 성분이나 제형 모두 동일한가요???</a>
				</p>
				<p class="tx_userid">
					<span>012****</span>
			
				</p><p class="tx_date">2022.02.25</p>
			</div>
			<div class="qna_answer_box">
				<div class="tx_question">
					<span class="ico_qna question">질문</span>
					기존 티트리 선쿠션 리뉴얼 제품인건가요?! 성분이나 제형 모두 동일한가요???
				</div>
			
				<div class="tx_answer">
					<span class="ico_qna answer">답변</span>
					반갑습니다.<br>올리브영 온라인몰입니다.<br><br>신규로 출시된 "브링그린 티트리 시카 톤업 선쿠션"은 기존 브링그린 운영 제품이었던 "브링그린 티트리 톤업 선쿠션"과 성분/제형 모두 다른 제품입니다.<br><br>감사합니다.
					
				</div>
						
			</div>
		</li>

	</ul>
		
	<div class="pageing">
		
		<strong title="현재 페이지">1</strong>
</div>


</div>
												<!-- 큐앤에이 끝 -->
												

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<!-- 상세 배송 정보 i 아이콘 누르면 뜨게 만들어 봄 -->
<script>
$(document).ready(function(){
	$(".tit>.ico_info").click(function(){
		$(".layer_pop_wrap w400").fadeIn(); $(".layer_pop_wrap w400").addClass("black");
	});
	$(".layer_pop_wrap w400>.layer_close type2").click(function(){
		$(this).parent().fadeOut();
	});
});
</script>
<!-- //상세 배송 정보 i 아이콘 누르면 뜨게 만들어 봄 -->
<script type="text/javascript">
var _ajax = common.Ajax;
var _ajaxUrl = 'https://www.oliveyoung.co.kr/store/';
var _qnaGoodsNo = "";

var retUrl ="";
/* 
var _pageIdx = 1; */

$(document).ready(function(){
    goods.detail.qna.init();
});

</script>

<script> 
$.fn.tabToggle = function(options){
    var defaults = {
        cont_nm : '.tabConts',          //기본 탭 컨텐츠 클래스
        init_no : 0                     //탭 오픈 idx
    }
    options = $.extend(defaults, options);
    console.log("options  >>>>>>>>>>>>>>" , options);
	console.log("this  >>>>>>>>>>>>>>" , this);

    return this.each(function(){
        var _idx = options.init_no;
        var _this = $(this);
        console.log("_this  >>>>>>>>>>>>>>" , _this);
        console.log("this.children  >>>>>>>>>>>>>>" , this.children);
        _this.children('li:eq('+ _idx +')').addClass('on').siblings('li').removeClass();
        console.log("$(options.cont_nm)  >>>>>>>>>>>>>>" , $(options.cont_nm));
        $(options.cont_nm).eq(_idx).addClass('show').siblings(options.cont_nm).removeClass('show');

        _this.find('a').click(function(e){
        	console.log("_this.find('a')  >>>>>>>>>>>>>>" , _this.find('a'));
            e.preventDefault();
            _idx = $(this).parent().index();
            console.log("_idx  >>>>>>>>>>>>>>" , _idx);
            _this.children('li:eq('+ _idx +')').addClass('on').siblings('li').removeClass();
            $(options.cont_nm).eq(_idx).addClass('show').siblings(options.cont_nm).removeClass('show');
        });
        
    });       
}

/* /** 상세정보, 구매정보, 상품평, Q&A 탭 토글 **/
 $('#tabList').length && $('#tabList').tabToggle();  

 
		 /** CJ ONE 포인트 예상 적립 레이어 팝업 열기 **/
	      function openCjonepntPop(){
	        	$("#layerWrap534").html($("#cjonePntInfo").html());
	        	fnLayerSet("layerWrap534", "open");
	            $('#layerWrap534').addClass('ly_cjone_point').addClass('show').removeClass('w534');
	            $(".dimm").bind("click", function(){
	                fnLayerSet("layerWrap534", "close");
	            });

	        //  웹로그 바인딩
	        bindWebLog : function(){
	        	 //  장바구니
	            $(".goods_cart").bind("click", function(){
	                common.wlog("goods_cart");
	            });
	            //  구매하기
	            $(".goods_buy").bind("click", function(){
	                common.wlog("goods_buy");
	            });
	            //  찜
	            $(".goods_wish").bind("click", function(){
	                common.wlog("goods_wish");
	            });
	            //  공유하기 - 카카오스토리
	            $(".goods_share_kakao").bind("click", function(){
	                common.wlog("goods_share_kakao");
	            });
	            //  공유하기 - 페이스북
	            $(".goods_share_facebook").bind("click", function(){
	                common.wlog("goods_share_facebook");
	            });
	            //  공유하기 - URL
	            $(".goods_share_url").bind("click", function(){
	                common.wlog("goods_share_url");
	            });
	        },
	        /** 수량 증가 함수 **/
	        nextVal : function(optionKey, itemSalePrc, qtyAddUnit){
	            // [START 오늘드림 옵션상품 개선:jwkim]
	            var promKnCd = $(".prd_gift_box.item_"+optionKey).attr("promkndcd"); 
	            var getItemAutoAddYn = $(".prd_gift_box.item_"+optionKey).attr("getitemautoaddyn"); 
	            
	            // 증정 상품의 경우 레이어에서 상품 선택시 오토를 N으로 하기 때문에 수량변경시 Y로 바꿔줘야 
	            // 기존로직그대로 탄다
	            if(promKnCd == "P203" && getItemAutoAddYn == "N"){
	                var oriItemAutoAddYn = $(".prd_gift_box.item_"+optionKey).attr("getoriitemautoaddyn");
	                
	                $(".prd_gift_box.item_"+optionKey).attr("getitemautoaddyn", oriItemAutoAddYn);
	            }
	            // [END 오늘드림 옵션상품 개선:jwkim]
	            
	            //  장바구니 구매수량
	            var cartCnt = Number($("#cartCnt_" + optionKey).val());
	            
	            //  구매 개수 적용
	            cartCnt = cartCnt + Number(qtyAddUnit);
	            
	            //  장바구니 구매수량 관련 Validation
	            var check = goods.detail.cart.cartCheck(cartCnt, optionKey);
	            
	            //  정상적으로 체크가 되었을 경우 
	            if ( check == 'Y'){
	                
	                //  증가된 값 세팅
	                $("#cartCnt_" + optionKey).val(cartCnt);
	                
	                //  화면에 노출된 옵션 하위상품의 개수가 1개 이상일 경우
	                //  여러개중에 선택한 값만 증가되고, 총 개수만 증가됨
	                var totalCnt = Number($("#totalCnt").val()) + Number(qtyAddUnit);
	                
	                var totalPrc = Number($("#totalPrc").val()) + (Number(itemSalePrc) * Number(qtyAddUnit));
	                $("#totalPrc").val(totalPrc);
	                
	                $("#totalCnt").val(totalCnt);
	                $("#totalPrcTxt").text($.number(totalPrc));
	                goods.detail.todayDelivery.deliveryCharge(); // 배송비 계산
	                
	                // 선택된 프로모션 상품이 없는경우특정 프로모션 상품 개수 증가X
	                // [START 오늘드림 옵션상품 개선:jwkim]
	                if($("div.prd_gift_box.item_" + optionKey).hasClass("giftInit")){
	                
	                } else {
	                    
	                    // N+1 프로모션 안내 멘트 추가
	                    goods.detail.cart.changeMsg(optionKey);
	                }
	                //goods.detail.cart.changeMsg(optionKey); // as-is 로직
	                // [END 오늘드림 옵션상품 개선:jwkim]
	                
	            }else{
	                //  비정상적으로 체크되었을 경우 아무동작하지 않도록 return 
	                return;
	            }
	        },
	        
	        /** 수량 감소 함수 **/
	        prevVal : function(optionKey, itemSalePrc, qtyAddUnit){
	            
	            // [START 오늘드림 옵션상품 개선:jwkim]
	        	var promKnCd = $(".prd_gift_box.item_"+optionKey).attr("promkndcd"); 
	            var getItemAutoAddYn = $(".prd_gift_box.item_"+optionKey).attr("getitemautoaddyn"); 
	            
	            // 증정 상품의 경우 레이어에서 상품 선택시 오토를 N으로 하기 때문에 수량변경시 Y로 바꿔줘야 
	            // 기존로직그대로 탄다
	            if(promKnCd == "P203" && getItemAutoAddYn == "N"){
	                var oriItemAutoAddYn = $(".prd_gift_box.item_"+optionKey).attr("getoriitemautoaddyn");
	                
	                $(".prd_gift_box.item_"+optionKey).attr("getitemautoaddyn", oriItemAutoAddYn);
	            }
	            // [END 오늘드림 옵션상품 개선:jwkim]
	            
	            //  장바구니 구매수량
	            var cartCnt = Number($("#cartCnt_" + optionKey).val());
	            
	            //  구매 개수 적용
	            cartCnt = cartCnt - Number(qtyAddUnit);
	            
	            //  장바구니 구매수량 관련 Validation
	            var check = goods.detail.cart.cartCheck(cartCnt, optionKey);
	            
	            //  정상적으로 체크가 되었을 경우
	            if ( check == 'Y'){
	                
	                //  감소된 값 세팅
	                $("#cartCnt_" + optionKey).val(cartCnt);
	                
	                //  화면에 노출된 옵션 하위상품의 개수가 1개 이상일 경우
	                //  여러개중에 선택한 값만 증가되고, 총 개수만 증가됨
	                var totalCnt = Number($("#totalCnt").val()) - Number(qtyAddUnit);
	                
	                var totalPrc = Number($("#totalPrc").val()) - (Number(itemSalePrc) * Number(qtyAddUnit));
	                $("#totalPrc").val(totalPrc);
	                
	                $("#totalCnt").val(totalCnt);
	                $("#totalPrcTxt").text($.number(totalPrc));   
	                goods.detail.todayDelivery.deliveryCharge(); // 배송비 계산
	                
	                // 선택된 프로모션 상품이 없는경우특정 프로모션 상품 개수 증가X
	                // [START 오늘드림 옵션상품 개선:jwkim]
	                if($("div.prd_gift_box.item_" + optionKey).hasClass("giftInit")){
	                    
	                } else {
	                    // N+1 프로모션 안내 멘트 추가
	                    goods.detail.cart.changeMsg(optionKey);
	                }
	                //goods.detail.cart.changeMsg(optionKey);
	                // [END 오늘드림 옵션상품 개선:jwkim]
	            }else{
	                //  비정상적으로 체크되었을 경우 아무동작하지 않도록 return
	                return;
	            }
	        }
 }
 
       </script>							
		</div>
	</div>


	<jsp:include page="../footer.jsp" />



	<div class="popLayerWrap" id="snsPopUp">
		<div class="popLayerArea">
			<div class="dimLayer">
				<ul class="shareSNS">
					<li class="kaka"><a href="javascript:;" class="snsShareDo"
						snstype="kakaotalk">카카오톡</a></li>
					<li class="kakaoS"><a href="javascript:;" class="snsShareDo"
						snstype="kakaostory">카카오스토리</a></li>
					<li class="fb"><a href="javascript:;" class="snsShareDo"
						snstype="facebook">페이스북</a></li>
					<li class="url"><a href="javascript:;" class="snsShareDo"
						snstype="url">URL</a></li>
				</ul>
				<div id="urlInfo" style="display: none">
					<br> <br> <br>
					<p>아래의 URL을 복사해주세요</p>
					<input type="text" id="shareUrlTxt" name="shareUrlTxt"
						style="width: 100%"
						value="https://www.oliveyoung.co.kr/store/G.do?goodsNo=A000000163020">
				</div>
				<a href="javascript:;" class="btnClose"
					onclick="goods.detail.sns.popLayerClose('LAYERPOP01');return false;">닫기</a>
			</div>
		</div>
	</div>
	<div class="dim"></div>

	<!-- #CJ ONE 포인트 적립 개선 및 등급별 헤택 페이지(07/02) -->
	<div class="layer_pop_wrap w534" id="cjonePntInfo" style="">
		<div class="layer_cont2">
			<h2 class="layer_title2">등급별 CJ ONE 포인트 적립</h2>
			<div class="cjoneBox">
				<table class="table_type">
					<caption>등급별 CJ ONE 포인트 적립표</caption>
					<colgroup>
						<col style="width: 50%;">
						<col style="width: 50%;">
					</colgroup>
					<thead>
						<tr>
							<th>등급</th>
							<th>적립률</th>
						</tr>
					</thead>
					<tbody>

						<tr>
							<th>
								<div class="icon_group">
									<span class="icon_grade icon_grade1"></span> <span
										class="txt_grade">GOLD OLIVE</span>
								</div>
							</th>
							<td><em>1%</em></td>
						</tr>

						<tr>
							<th>
								<div class="icon_group">
									<span class="icon_grade icon_grade2"></span> <span
										class="txt_grade">BLACK OLIVE</span>
								</div>
							</th>
							<td><em>1%</em></td>
						</tr>

						<tr>
							<th>
								<div class="icon_group">
									<span class="icon_grade icon_grade3"></span> <span
										class="txt_grade">GREEN OLIVE</span>
								</div>
							</th>
							<td><em>1%</em></td>
						</tr>

						<tr>
							<th>
								<div class="icon_group">
									<span class="icon_grade icon_grade4"></span> <span
										class="txt_grade">PINK OLIVE</span>
								</div>
							</th>
							<td><em>0.5%</em></td>
						</tr>

						<tr>
							<th>
								<div class="icon_group">
									<span class="icon_grade icon_grade5"></span> <span
										class="txt_grade">BABY OLIVE</span>
								</div>
							</th>
							<td><em>0.5%</em></td>
						</tr>

					</tbody>
				</table>
				<div class="usage-guide mgT20">
					<ul class="">
						<li>일부 제휴카드 / 임직원 카드로 결제 시 0.5% 적립</li>
						<li>복합 결제 진행 시 포인트 적립액 상이 가능</li>
					</ul>
				</div>
			</div>
			<div class="layer_btn_area mgT20">
				<button class="btnMedium fullGreen w120"
					onclick="fnLayerSet('layerWrap534', 'close');">닫기</button>
			</div>
			<button class="layer_close type2"
				onclick="fnLayerSet('layerWrap534', 'close');">창 닫기</button>
		</div>
	</div>
	<!--// #CJ ONE 포인트 적립 개선 및 등급별 헤택 페이지(07/02) -->



	<div class="layer_pop_wrap w850" id="cardBenefitInfo"
		style="display: none;">
		<div class="layer_cont2 w650">
			<h2 class="layer_title2">카드할인혜택</h2>

			<dl class="card_info_data">
				<dt>THE CJ카드</dt>
				<dd>결제 시 10% 할인 (BC 카드 제외)</dd>
			</dl>




			<button class="layer_close type2"
				onclick="fnLayerSet('layer_pop_wrap', 'close');">창 닫기</button>
		</div>
	</div>

<!-- (도서산간) 배송비정책표기 팝업 [3689355]-->
<div class="layer_pop_wrap w400"  id="dlexAmtPopup" style="display:none">
	<div class="layer_cont2 w400" id="dlexAmtCont" data-dlv-cd="20" data-set="false" >
		<h2 class="layer_title2">배송비 안내</h2>

		<dl class="oy_dlex">
			<dt class="bold_str"><span id="dlvShpStr">올리브영</span> 배송</dt>
			<dd><span id="dlexAmt">2,500</span>원</dd>
		</dl>
		<dl class="add_dlex_amt">
			<dt class="bold_str">추가 배송비</dt>
			<dd></dd>
		</dl>
		<dl class="dlex_amt_info">
			<dt>도서산간</dt>
			<dd><span id="ferryRgnDlexAmt">2,500</span>원</dd>
		</dl>
		<dl class="dlex_amt_info">
			<dt>제주지역</dt>
			<dd><span id="jejuDlexAmt">2,500</span>원</dd>
		</dl>
		<dl class="dlex_amt_info">
			<dt>제주도서산간</dt>
			<dd><span id="jejuFerryRgnDlexAmt">7,000</span>원</dd>
		</dl>
		<button class="layer_close type2" onClick="fnLayerSet('layer_pop_wrap', 'close');">창 닫기</button>
	</div>
</div>
<!--// (도서산간) 배송비정책표기 팝업 [3689355]-->

	<form id="goodsForm">
		<input type="hidden" id="goodsNo" name="goodsNo" value="A000000163020">
		<input type="hidden" id="itemNo" name="itemNo" value="001"> <input
			type="hidden" id="lgcGoodsNo" name="lgcGoodsNo" value="8809782557397">
		<input type="hidden" id="onlBrndNm" name="onlBrndNm" value="브링그린">
		<input type="hidden" id="goodsNm" name="goodsNm"
			value="[벅벅쿠션] 브링그린 티트리 시카 톤업 선 쿠션 15g"> <input type="hidden"
			id="gdasTpCd" name="gdasTpCd" value=""> <input type="hidden"
			id="onlBrndCd" name="onlBrndCd" value="A002253"> <input
			type="hidden" id="avalInvQty" name="avalInvQty" value="103">


		<input type="hidden" id="qtyAddUnit" name="qtyAddUnit" value="1">
		<input type="hidden" id="adulAuthYn" name="adulAuthYn" value="N">
		<input type="hidden" id="artcGoodsNo" name="artcGoodsNo"
			value="A000000163020"> <input type="hidden" id="artcItemNo"
			name="artcItemNo" value="001"> <input type="hidden"
			id="epCpnYn" name="epCpnYn" value="N"> <input type="hidden"
			id="soldOutYn" name="soldOutYn" value="N"> <input
			type="hidden" id="quickAvalInvQty" name="quickAvalInvQty" value="999">
	</form>

	<form id="qnaForm">
		<input type="hidden" name="gdasSeq" id="gdasSeq" value=""> <input
			type="hidden" name="goodsNo" id="qnaGoodsNo" value="A000000163020">
		<input type="hidden" name="retUrl" id="retUrl" value=""> <input
			type="hidden" name="ordNo" id="ordNo" value=""> <input
			type="hidden" name="evtNo" id="evtNo" value=""> <input
			type="hidden" name="gdasSctCd" id="gdasSctCd" value="">
	</form>

	<input type="hidden" name="ordPsbMinQty" id="ordPsbMinQty" value="1">
	<input type="hidden" name="ordPsbMaxQty" id="ordPsbMaxQty" value="10">
	<input type="hidden" name="stdCatNm" id="stdCatNm"
		value="기초화장품>썬케어>썬블록">
	<input type="hidden" name="finalPrc" id="finalPrc" value="15000">
	<input type="hidden" name="dispCatNo" id="dispCatNo" value="">
	<input type="hidden" name="assocDispCatNo" id="assocDispCatNo"
		value="10000010011">
	<input type="hidden" name="dupItemYn" id="dupItemYn" value="Y">
	<input type="hidden" name="rsvSaleYn" id="rsvSaleYn" value="N">
	<input type="hidden" name="rsvLmtSctCd" id="rsvLmtSctCd" value="">
	<input type="hidden" name="prsntYn" id="prsntYn" value="Y">
	<input type="hidden" name="quickPrsntYn" id="quickPrsntYn" value="Y">
	<input type="hidden" name="pkgGoodsYn" id="pkgGoodsYn" value="N">

	<input type="hidden" name="premiumGdasCnt" id="premiumGdasCnt"
		value="459">
	<input type="hidden" name="simpleGdasCnt" id="simpleGdasCnt" value="0">
	<input type="hidden" name="realQnaCnt" id="realQnaCnt" value="8">
	<input type="hidden" name="gdasPrhbCatCnt" id="gdasPrhbCatCnt"
		value="0">
	<input type="hidden" name="gdasMedapCnt" id="gdasMedapCnt" value="0">
	<input type="hidden" name="previewInfo" id="previewInfo" value="">
	<input type="hidden" name="chlNo" id="chlNo" value="">
	<input type="hidden" id="quickYn" name="quickYn" value="Y">
	<input type="hidden" id="quickOrdMaxQty" name="quickOrdMaxQty"
		value="10">
	<input type="hidden" id="quickOrdMaxQtyTemp" name="quickOrdMaxQtyTemp"
		value="999">
	<input type="hidden" id="quickOrdTimeFrom" name="quickOrdTimeFrom"
		value="0">
	<input type="hidden" id="quickOrdTimeTo" name="quickOrdTimeTo"
		value="24">
	<input type="hidden" id="orderStrNo" name="orderStrNo" value="">
	<input type="hidden" id="recoBellDispCatNo" name="recoBellDispCatNo"
		value="1000001001100010003">
	<input type="hidden" id="eigeneSmlDispName" value="선블록">

</body>
<script>
var _ajax = common.Ajax;
var _ajaxUrl = 'https://www.oliveyoung.co.kr/store/';

var qtyAddUnit = '1';

if ( qtyAddUnit == undefined || qtyAddUnit == '' || qtyAddUnit == 'null'){
    qtyAddUnit = '1';
}

var directDscntAmt = '2000';
var salePrc = '17000';

if ( directDscntAmt > 0 ){
    salePrc = '15000';
}


var _retType = '';


var premiumGdasCnt = '459';

var simpleGdasCnt = '0';

var dlexFvrStdAmt = '30000';

var quickDlexTxt = '<span class=\'tx_num\'>2,500</span>원 또는 <span class=\'tx_num\'>5,000</span>원 (3만원이상 무료)';


var quickAddrYn = "Y";

var uAgent = navigator.userAgent;
if (uAgent.indexOf('Trident') > -1 || uAgent.indexOf('MSIE') > -1) {
	$(".link_social.facebook.goods_share_facebook").hide();
}

</script>
<link
	href="https://static.oliveyoung.co.kr/pc-static-root/css/goods.css?dumm=20230103001"
	type="text/css" rel="stylesheet" data-inprogress="">
<script type="text/javascript"
	src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/js/common/publish/commondbaa.js"
	charset="utf-8"></script>
<script type="text/javascript" src="https://static.oliveyoung.co.kr/pc-static-root/js/goods/goods.js?dumm=20230103001" charset="utf-8"></script>
<script type="text/javascript"
	src="https://static.oliveyoung.co.kr/pc-static-root/js/goods/gdas.js?dumm=20230103001"
	charset="utf-8"></script>
<script type="text/javascript"
	src="https://static.oliveyoung.co.kr/pc-static-root/js/mypage/gdas.js?dumm=20230103001"></script>
<script type="text/javascript"
	src="https://static.oliveyoung.co.kr/pc-static-root/js/goods/prom.js?dumm=20230103001"
	charset="utf-8"></script>


<script
	src="https://static.oliveyoung.co.kr/pc-static-root/js/store/store_near.js?dumm=20230103001"
	charset="utf-8"></script>
<script
	src="https://static.oliveyoung.co.kr/pc-static-root/js/store/jquery.mCustomScrollbar.concat.min.js"></script>
<script
	src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<link rel="stylesheet"
	href="https://static.oliveyoung.co.kr/pc-static-root/css/jquery.mCustomScrollbar.css"
	data-inprogress="">

<script>

var mKey = "";
$(document).ready(function(){

 	// 레코벨 사용 여부 셋팅
    goods.detail.recoBellUseYn = "Y";

 	// 레코벨 노출 여부 셋팅
    goods.detail.recoBellViewYn = "Y";

    goods.detail.init();
    goods.detail.todayDelivery.init();
    goods.gdas.eval.init();


// productid2 변수 추가 - [3388239] 페이스북 카달라고 Data Layer 수정 요청(CHY)
// price, sale_price 데이터 추가 - [3451865] 페이스북 카달로그 DATA Layer 필드 값 수정 요청(CHY)
dataLayer = [{
	"productid" : ["A000000163020001"],
	"productid2" : ["A000000163020"],
	"productname" : "[벅벅쿠션] 브링그린 티트리 시카 톤업 선 쿠션 15g",
	"productamt" : "17000",
	"price" : "20000 KRW",
	"sale_price" : "17000 KRW"
 }];

// [3551897] (GA) 전자상거래 태깅 - 매출
$(document).ready(function(){
	gtm.goods.callGoodsGtmInfo('A000000163020', null, "ee-productView", null, 1);
});
</script>


<!-- RecoBell Script Start -->
<meta property="eg:type" content="product">
<meta property="eg:cuid" content="8b47cf9f-efd1-48e4-8f83-10ee8a07945b">
<meta property="eg:itemId" content="8809782557397">
<meta property="eg:itemName" content="[벅벅쿠션] 브링그린 티트리 시카 톤업 선 쿠션 15g">
<meta property="eg:itemImage"
	content="10/0000/0016/A00000016302004ko.jpg?l=ko">
<meta property="eg:itemUrl" content="goodsNo=A000000163020">
<meta property="eg:originalPrice" content="20000">
<meta property="eg:salePrice" content="17000">
<meta property="eg:category1" content="10000010011">
<meta property="eg:category2" content="100000100110001">
<meta property="eg:category3" content="1000001001100010003">
<meta property="eg:brandId" content="A002253">
<meta property="eg:brandName" content="브링그린">
<meta property="eg:regDate" content="2022-02-15T00:00:00Z">
<meta property="eg:updateDate" content="2022-12-12T16:26:23Z">
<meta property="eg:stock" content="">
<meta property="eg:state" content="">
<meta property="eg:description" content="">
<meta property="eg:extraImage" content="8809782557397,8809782559384,">
<meta property="eg:locale" content="">


<script
	src="https://static.oliveyoung.co.kr/pc-static-root/js//common/libs/sha256.js"></script>
<script type="text/javascript">
var recoMbrNo = 'M0000010066194';
// User ID 암호화
var hashedRecoMbrNo = CryptoJS.SHA256(recoMbrNo).toString();

if(recoMbrNo === 'null'){
    hashedRecoMbrNo = "";
}

/* 3200210  큐레이션 개선 관련 건-레코벨 데이터 송부
 * 로그인 유저에 한해서 피부정보 조회(동의여부 기반 조회)
 * 중복 호출을 막기 위해, localStorage 사용.
 * updateSkinYn은 '프로필-나의 피부 컨디션 정보 변경 시, N으로 변경되며, 'N'에 해당 경우에만 DB를 호출하도록 변경
 * 업데이트 이후에는 중복 사항 호출을 막기 위해 updateSkinYn를 'Y'로 변경
 */

 setTimeout(function(){
	 try {

			window._eglqueue = window._eglqueue || [];
			_eglqueue.push(['setVar','cuid','8b47cf9f-efd1-48e4-8f83-10ee8a07945b']);
			//_eglqueue.push(['setVar','device','PW']);
			_eglqueue.push(['setVar','userId',hashedRecoSsoMbrNo]); // optional
			_eglqueue.push(['track','visit']);
			(function(s,x){s=document.createElement('script');s.type='text/javascript';
			s.async=true;s.defer=true;s.src=(('https:'==document.location.protocol)?'https':'http')+
			'://logger.ai.oliveyoung.co.kr/js/logger.min.js';
			x=document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);})();

			var skinType = '';
		    var skinTone = '';
		    var skinIssue = '';
		    var skinState = localStorage.getItem("updateSkinYn");
		    if(skinState == null) {//localStorage 미적재 확인
		    	localStorage.setItem("updateSkinYn", "N");
		    }

			try{
			    if(recoSsoMbrNo != undefined && recoSsoMbrNo != ''){

				    if(skinState == 'N') {//skin 정보 변경으로 인한 업데이트가 필요한 경우

					       var url = _baseUrl + "main/getMySkinConditionList.do";
					       var data = {mbrNo : recoSsoMbrNo}
					         $.ajax({
					           type   : "POST"
					          ,url    : url
					          ,data   : data
					          ,async  : true
					          ,success: function(response){
					              callBackGetMySkinConditionList(response, skinState, skinType, skinTone, skinIssue);
					           }
					          ,error  : function (jqXHR,error, errorThrown){
					        	  sendRecobell(skinState, skinType, skinTone, skinIssue); //해당 정보 무시하고 Recobell 전송
					           }
		       			});
					}else{
						sendRecobell(skinState, skinType, skinTone, skinIssue); //변경사항 없이 Recobell 전송
					}
			    }else{
			    	sendRecobell(skinState, skinType, skinTone, skinIssue); //변경사항 없이 Recobell 전송
			    }
			}catch(e){
				sendRecobell(skinState, skinType, skinTone, skinIssue); //해당 정보 무시하고 Recobell 전송
			}
			
			var entrMenu = "";
			var viewCatNo = "";

			try {
				entrMenu = menuList['search/getSearchMain.do'].contsNm == undefined ? "" : menuList['search/getSearchMain.do'].contsNm;
				viewCatNo = '';
			} catch(e) {
				entrMenu = "";
				viewCatNo = "";
			}
			
		    window._eglqueue = window._eglqueue || [];
		    _eglqueue.push(['setVar','cuid','8b47cf9f-efd1-48e4-8f83-10ee8a07945b']);
		    //_eglqueue.push(['setVar','device','PW']);
		    _eglqueue.push(['setVar','itemId','8809782557397']);
		    _eglqueue.push(['setVar','userId',hashedRecoMbrNo]);
		    _eglqueue.push(['setVar','categoryId','10000010011']); // 전시 카테고리 1 변경요청 20.10.14
		    _eglqueue.push(['setVar','brandId','A002253']);
		    _eglqueue.push(['setVar','searchTerm','']);
		  	_eglqueue.push(['setVar', 'onlineItemId', "A000000163020"]);
		  	_eglqueue.push(['setVar', 'dispStDt', "2022-02-15 00:00:00.0"]);
		    _eglqueue.push(['setVar','entrMenu', entrMenu]);
		    _eglqueue.push(['setVar','viewCatNo', viewCatNo]);
		    _eglqueue.push(['track','view']);
		    _eglqueue.push(['track','product']);  /* -- IMPORTANT -- */
		    (function(s,x){s=document.createElement('script');s.type='text/javascript';
		    s.async=true;s.defer=true;s.src=(('https:'==document.location.protocol)?'https':'http')+
		    '://logger.ai.oliveyoung.co.kr/js/logger.min.js';
		    x=document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);})();

		 // 상품기술서 내 배너 trackingCd 적용
		 var contEditor = $(".detail_area a");

		 $('.detail_area a').each(function() {
			 var baseUrl = $(this).attr("href")
					 .replace(/[&|\?]trackingCd=([^&]+){1,}&?/g, "")
					 .split("#");
			 var conjunction = baseUrl[0].indexOf('?') > -1 ? "&" : "?";

			 if (!baseUrl[1]) {
				 $(this).attr('href', baseUrl[0].concat(conjunction, "trackingCd=Banner"));
			 } else {
				 $(this).attr('href', baseUrl[0].concat(conjunction, "trackingCd=Banner").concat("#", baseUrl[1]));
			 }
		 });
		} catch(e) {}
 }, 500);


	<script>
	//[3346554] 상품상세 수량입력 후 페이지 이동시 오류(CHY)
	$(window).load(function(){
		var dupItemYn = "Y";
		var soldOutYn = "N";
		
		if(dupItemYn == 'N' && soldOutYn != 'Y'){
			var directDscntAmt = "2000";
			var sPrc = "17000";
			
			if(directDscntAmt > 0){
				sPrc = "15000";
			}
			
			var goodsitem = "A000000163020001";
			var sCnt = $("#cartCnt_"+goodsitem).val();
			$("#totalCnt").val(sCnt);
			$("#totalPrc").val(sPrc*sCnt);
			$("#totalPrcTxt").text($.number(sPrc*sCnt));
		}
	});
</script>
<script type="text/javascript">
	window.dataLayer = window.dataLayer || [];

	var gtmDataAttrArray = [];
	var gtmClickEventArray = [];

	


	$(".detail_area a").each(function (i) {
		gtmDataAttrArray.push(i);
	})

	fbq('track', 'ViewContent', {
		content_ids: ['A000000163020'],
		content_type: 'product',
		currency: 'KRW',
		value: '15000',
	});

	window.addEventListener('scroll', function () {
		var intViewportHeight = $(window).innerHeight();

		$(".detail_area a").each(function (i) {
			var some1 = $(this).offset().top;							// 아래에 걸린 경우
			var some2 = some1 + $(this).height() - intViewportHeight;	// 위에 걸린 경우
			var attr = $(this).attr('data-attr');

			if (some1 > 0 && some2 > 0 && $(window).scrollTop() <= some1 && $(window).scrollTop() >= some2 && (gtmClickEventArray.length !== gtmDataAttrArray.length)) {
				if(gtmClickEventArray.indexOf(attr) == -1) {
					window.dataLayer.push(
							{
								'event': 'click-event',
								'data-attr' : '상품상세^MD공지배너^' + $(this).find('img').attr('alt') +'_노출'
							}
					);
					gtmClickEventArray.push(attr);
				}
			}
		})

	})

	$(function(){

		$('#deliveDay').on('change', function(){
			var is = $(this).is(':checked');
			if(is){
				$('.prd_btn_area.new-style').addClass('today');
				$('.today_dvArea').slideDown();
			}else{
				$('.prd_btn_area.new-style').removeClass('today');
				$('.today_dvArea').slideUp();
			}
		});


		function thumbView() {
			$('#prd_thumb_list a').on('click', function(e){

			    e.preventDefault();

			    $('.prd_img > img').attr('src', $(this).attr("data-img"));
			    $(this).parent().addClass('sel').siblings().removeClass('sel');

			});
		}
		</script>
	<div class="laytoast" id="brandOff" style="display: none;">
		<div class="inner">
			<p class="txt_recom txt_01">
				브랜드<br>
				<em>좋아요</em>
			</p>
		</div>
	</div>
	<div class="laytoast on" id="brandOn" style="display: none;">
		<div class="inner">
			<p class="txt_recom txt_01">
				브랜드<br>
				<em>좋아요</em>
			</p>
		</div>
	</div>
	<!-- 브랜드 찜 확인 레이어 -->
	<div class="layerAlim brand zzimOn" style="display: none;">
		<!-- zzimOn / zzimOff -->
		<span class="icon"></span>
		<p>
			브랜드<strong>좋아요</strong>
		</p>
	</div>

	<div class="layerAlim brand zzimOff" style="display: none;">
		<!-- zzimOn / zzimOff -->
		<span class="icon"></span>
		<p>
			브랜드<strong>좋아요</strong>
		</p>
	</div>
	<!-- 브랜드 찜 확인 레이어 -->

	<!-- 찜 확인 레이어 -->
	<div class="layerAlim zzimOn wishPrd" style="display: none;">
		<span class="icon"></span>
		<p class="one">
			<strong>좋아요</strong>
		</p>
	</div>
	<!--// 찜 확인 레이어 -->

	<!-- 찜 취소 레이어 -->
	<div class="layerAlim zzimOff wishPrd" style="display: none;">
		<span class="icon"></span>
		<p class="one">
			<strong>좋아요</strong>
		</p>
	</div>
	<!--// 찜 취소 레이어 -->

	<!-- 2017-02-23 수정 : TOP 바로가기 버튼 추가 -->
	<div id="directTop" style="display: block;">
		<button>
			<span></span>TOP
		</button>
	</div>
	<!--/ㅁ 2017-02-23 수정 : TOP 바로가기 버튼 추가 -->


	<meta name="google-site-verification"
		content="aGex1x92TU-fDKdOY8N9ExT48CLNy5JvgibT5bdkY30">
	<script type="text/javascript" id="">try{var fbq=window.fbq;void 0!==fbq&&fbq("track","PageView")}catch(a){console.warn("pixel GTM is error occurred")};
	</script>

<script type="text/javascript" id="" src="//wcs.naver.net/wcslog.js"></script>
<div style="display: none; visibility: hidden;">

	<script type="text/javascript">var TRS_AIDX=10416,TRS_PROTOCOL=document.location.protocol;document.writeln();var TRS_URL=TRS_PROTOCOL+"//"+("https:"==TRS_PROTOCOL?"analysis.adinsight.co.kr":"adlog.adinsight.co.kr")+"/emnet/trs_esc.js";document.writeln("\x3cscript language\x3d'javascript' src\x3d'"+TRS_URL+"'\x3e\x3c/script\x3e");</script>
	<script language="javascript"
		src="https://analysis.adinsight.co.kr/emnet/trs_esc.js"></script>


</div>
<script type="text/javascript" id="">var roosevelt_params={retargeting_id:"lBDbJrrMk3RICJMPz2B8gg00",tag_label:"0kGfEZtvTNqCoDKElqTLHQ"};</script>
<script type="text/javascript" id=""
	src="//adimg.daumcdn.net/rt/roosevelt.js"></script>
<script type="text/javascript" id="" charset="UTF-8"
	src="//t1.daumcdn.net/adfit/static/kp.js"></script>
<script type="text/javascript" id="">!function(b,a){b.cre||(a=b.cre=function(c,d,e,f){a.queue.push(arguments)},a.push=a,a.loaded=!0,a.queue=[])}(window);cre("init","oliveyoung");cre("send","Pageview");</script>
<script type="text/javascript" id="" src="//cdn.cresendo.net/Track.js"></script>
<script type="text/javascript" id=""
	src="//static.criteo.net/js/ld/ld.js"></script>
<script type="text/javascript" id="" charset="UTF-8"
	src="//t1.daumcdn.net/adfit/static/kp.js"></script>
<script type="text/javascript" id="" charset="UTF-8"
	src="//t1.daumcdn.net/adfit/static/kp.js"></script>
<script type="text/javascript" id="">try{var _ADVID="1970342711",_EUR=function(a){return a=encodeURIComponent(a)},_toastace=new Image(0,0),_ESTR="u\x3d"+_EUR(document.URL)+"\x26advid\x3d"+_ADVID+"\x26r\x3d"+_EUR(document.referrer)+"\x26code\x3dutf-8\x26target\x3d"+_EUR(_EUR('{"oid":"","items":[]}'))+"\x26action\x3dvisit";_toastace.src="//adlc-exchange.toast.com/log?"+_ESTR}catch(a){};</script>
<script type="text/javascript" id="">if(!wcs_add)var wcs_add={};wcs_add.wa="s_3ee47970f314";if(!_nasa)var _nasa={};wcs.inflow();wcs_do(_nasa);</script>
<script type="text/javascript" id="">kakaoPixel("8451652009131684431").pageView();</script>
<script type="text/javascript" id="" charset="UTF-8"
	src="//t1.daumcdn.net/adfit/static/kp.js"></script>
<script type="text/javascript" id="">window.criteo_q=window.criteo_q||[];window.criteo_q.push({event:"setAccount",account:70319},{event:"setSiteType",type:"d"},{event:"viewItem",item:google_tag_manager["GTM-NF4R92W"].macro(53)});</script>
<script type="text/javascript" id="">kakaoPixel("8143468118245396271").pageView();</script>

<script type="text/javascript" id="">kakaoPixel("8143468118245396271").pageView();kakaoPixel("8143468118245396271").viewContent({id:google_tag_manager["GTM-NF4R92W"].macro(54)});</script>
<script type="text/javascript" id="">kakaoPixel("8451652009131684431").pageView();kakaoPixel("8451652009131684431").viewContent({id:google_tag_manager["GTM-NF4R92W"].macro(69).toString()});</script>
<div id="criteo-tags-div" style="display: none;"></div>
<iframe height="0" width="0" title="Criteo DIS iframe"
	style="display: none;"></iframe>


</body>

</html>


