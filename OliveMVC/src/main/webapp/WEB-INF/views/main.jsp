<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- 로그인, 회원가입 모달 부트스트랩 -->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
	crossorigin="anonymous" />

<script src="https://kit.fontawesome.com/e8644e93da.js"
	crossorigin="anonymous"></script>
	
<link
	href="//db.onlinewebfonts.com/c/2596224269750e00c3ad5356299a3b9f?family=Ogg"
	rel="stylesheet" type="text/css" />
	
<!-- 비밀번호 보여주는 눈 모양 사용 -->
<link rel="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">

<!-- 다음 주소 Api -->
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/DaumApi.js"></script>



<!-- 올리브영 css 시작 -->
<meta http-equiv="Content-Script-Type" content="text/javascript">
<meta http-equiv="Content-Style-Type" content="text/css">
<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
<meta name="format-detection" content="telephone=no">

<meta property="og:type" content="website" />

<meta property="og:title" content="올리브영 온라인몰" />

<meta property="og:url" content="main.html" />

<meta property="og:image" content="" />

<meta property="og:description" content="대한민국 NO.1 헬스&뷰티 스토어 OLIVEYOUNG" />

<title>올리브영 온라인몰</title>
<meta name="title" content="올리브영 온라인몰" />
<meta name="description" content="대한민국 NO.1 헬스&뷰티 스토어 OLIVEYOUNG">
<meta name="facebook-domain-verification"
	content="e6vbg9ygxkui4o2owlhxnwptf0mdk2" />

<link rel="stylesheet"
	href="${pageContext.request.contextPath }/resources/css/styledbaa.css?dumm=20221223001" />

<script>
	var _tmsPushUrl = "https://pmsg.oliveyoung.co.kr/msg-api/user/mkt-flag";
	var _baseUrl = 'https://www.oliveyoung.co.kr/store/';
	var _plainUrl = 'https://www.oliveyoung.co.kr/store/';
	var _secureUrl = 'https://www.oliveyoung.co.kr/store/';
	var _jsUrl = 'https://static.oliveyoung.co.kr/pc-static-root/js/';
	var _cssUrl = 'https://static.oliveyoung.co.kr/pc-static-root/css/';
	var _imgUrl = 'https://static.oliveyoung.co.kr/pc-static-root/image/';
	var _imgUrlLocale = 'https://static.oliveyoung.co.kr/pc-static-root/image/ko/';
	var _stampEvtUrl = '500000100140038.html';
	var _goodsImgUploadUrl = 'https://image.oliveyoung.co.kr/uploads/images/goods/';
	var _cabUrl = 'https://static.oliveyoung.co.kr/pc-static-root/cab/';
	var _isLogin = false;
	var _genSctCd = 'null' == 'A' ? 'M' : ('null' == 'B' ? 'F' : '');
	var _mainUrl = 'main/main.html';
	var _goodsImg85 = '85';
	var _gdasImgUploadUrl = 'https://image.oliveyoung.co.kr/uploads/images/gdasEditor/';
	var _profileImgUploadUrl = 'https://image.oliveyoung.co.kr/uploads/images/mbrProfile/';
	var _memberJoinUrl = 'https://www.cjone.com/cjmweb/join.do?coopco_cd=7030&amp;brnd_cd=3000&amp;mcht_no=3000';
	var _cdnImgUrl = 'http://image.oliveyoung.co.kr/uploads/';
	var _fileUploadUrl = 'https://image.oliveyoung.co.kr/uploads/images/';
	var _currentUrl = 'https://www.oliveyoung.co.kr/main/main.do';

	var _eplgUploadUrl = 'https://image.oliveyoung.co.kr/uploads/images/epilogue/'; //멤버십라운지 에필로그 추가 

	var _redirectFoBaseUrl = 'https://www.oliveyoung.co.kr/store'; // ston redirect 처리위해 추가
	var _redirectMoBaseUrl = 'https://m.oliveyoung.co.kr/m'; // ston redirect 처리위해 추가
	var _redirectMaBaseUrl = 'https://ma.oliveyoung.co.kr/m'; // ston redirect 처리위해 추가

	var _stonUseYnReqHeader = 'N'; // ston redirect 처리위해 추가

	var _offlineGoodsNo = 'A000000000000';

	var _templateUrl = 'https://static.oliveyoung.co.kr/pc-static-root/template/';
</script>

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

<script
	src="../../../t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<!-- 올리브영 css 끝 -->

</head>
<body>
<!-- 올리브영 css 시작 -->
<div class="infoUpgr" style="display: none;">
	<p>
		<a class="ie"
			href="https://www.microsoft.com/ko-kr/download/internet-explorer.aspx"
			target="_blank">ie 업그레이드</a> <a class="cr"
			href="https://www.google.co.kr/chrome/browser/desktop/"
			target="_blank">크롬 업그레이드</a> <a class="ff"
			href="https://www.mozilla.org/ko/firefox/new/" target="_blank">파폭
			업그레이드</a> <a class="op" href="http://www.opera.com/ko/download"
			target="_blank">오페라 업그레이드</a>
	</p>
</div>

<div id="todayDeliveryPopup"></div>


<div id="Wrapper">
	<div id="skip_navi">
		<a href="#Container">본문바로가기</a>
	</div>

	<!-- 상단 띠 배너 - 어워즈관 S -->
	<div class="banUpperBox" style="display: none">
		<div class="inner">
			<a href="javascript:common.link.commonMoveUrl('amusement/intro.do')"
				id="top_banner_image"></a> <a href="#" class="btn_upper_close">오늘
				안 보기</a>
		</div>
		<div class="dimBan">
			<div class="in"></div>
		</div>
	</div>
	<div class="dimBanWhite" style="display: none">
		<div class="in"></div>
	</div>
	<div class="dimBanBlack"></div>
	<!-- 상단 띠 배너 - 어워즈관 E -->

	<!-- 상단 띠 배너 - IE대응 S -->
	<div class="banUpperBox2">
		<div class="inner">
			<p>
				고객님의 브라우저에서는 올리브영 온라인몰이 정상 동작하지 않습니다.<br>다른 브라우저로 접속해주세요.
			</p>
			<ul>
				<li>크롬</li>
				<li>엣지</li>
				<li>사파리</li>
			</ul>
		</div>
	</div>
	<!-- 상단 띠 배너 - IE대응 E -->


	<div id="Header">
		<div class="top_util">
			<ul class="menu_list" id="menu_list_header">
				<!-- 올리브영 css 끝 -->

				<!-- 우측 상단 검색 창 위 div 시작-->
				<c:if test="${empty info}">
					<li class="join"><a class="btn" data-bs-toggle="modal"
						data-bs-target="#registModal" data-attr='공통^헤더^회원가입'>회원가입</a></li>

					<!-- 회원가입  Modal -->
					<div class="modal fade" id="registModal" tabindex="-1"
						aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header">
									<h1 class="modal-title fs-5" id="exampleModalLabel">회원가입</h1>
									<button type="button" class="btn-close" data-bs-dismiss="modal"
										aria-label="Close"></button>
								</div>
								<div class="modal-body">
									<form action="${pageContext.request.contextPath}/member/regist"
										method="post" name="registForm">
										
										<table>
											<tr>
												<th>*아이디</th>
								<td><input type="text" name="memberId" id="memberId"/> 
								<button style="color: grey;" type="button" onclick="return idcheck()">ID중복체크</button></td>
											</tr>
											<tr>
												<th>*비밀번호</th>
												<td><div class="show_password">
												<input type="password" name="pw" id="pw" placeholder="영문자+숫자+특수문자 조합" />
												<i class="fa fa-eye fa-lg"></i>
												</div></td>
											</tr>
											<tr>
												<th>*비밀번호 재확인</th>
												<td><input type="password" name="re_pw" id="re_pw" /></td>
											</tr>
											<tr>
												<th>*이름</th>
												<td><input type="text" name="memberName"
													id="memberName" /></td>
											</tr>
											<tr>
												<th>*이메일</th>
												<td><input type="text" name="email" id="email" placeholder="olive@example.com"/></td>
												<!-- <input type="text" name="email_add" id="email_add"/> -->
												<!-- <select name="email_sel" id="email_sel" onchange="change_email();"> -->
												<!--onchage: select안에 있는 옵션들의 값이 바꼈을때 명령이 실행 onclick을 안하는 이유: 키보드 사용자는 click을 할수 없으므로-->
												<!-- <option value="">직접입력</option>
														<option value="naver.com">naver</option>
														<option value="gmail.com">gmail</option>
														<option value="nate.com">nate</option>
													</select> -->
											</tr>
											<tr>
												<th>전화번호</th>
												<td><input type="text" name="phone" id="phone" placeholder="010-0000-0000식으로 작성"/></td>
											</tr>
											<tr>
												<th>*성별</th>
												<td><input type="radio" name="gender" value="f" id="f">여성
													<input type="radio" name="gender" value="m" id="m" />남성</td>
											</tr>
											<tr>
												<th>생년월일
												<td><input type="date" name="birthday" id="birthday" /></td>
											</tr>
											<tr>
												<th>주소</th>

								<td><input type="text" name="addressNumber" id="sample6_postcode" placeholder="우편번호"> 
									<input type="button" onclick="sample6_execDaumPostcode()" value="우편번호 찾기"><br>
									<input type="text" name="addressInfo" id="sample6_address" placeholder="주소"><br>
									<input type="text" name="addressDetail" id="sample6_detailAddress" placeholder="상세주소"><br> 
									<input type="text" name="addressDetail2" id="sample6_extraAddress" placeholder="참고항목"></td>
							</tr>

										</table>
										</form>
								</div>								
								<div class="modal-footer">
									<!-- <button type="submit" class="btn btn-secondary"
											data-bs-dismiss="modal" onclick="checkform()">가입하기</button> -->
									<input type="submit" value="가입하기" onclick="return checkform()">
								</div>
								
							</div>
						</div>
					</div>

					<li class="login"><a class="btn" data-bs-toggle="modal"
						data-bs-target="#loginModal" data-attr='공통^헤더^로그인'>로그인</a></li>
					<!-- 로그인 -->

					<!-- Modal -->
					<div class="modal fade" id="loginModal" tabindex="-1"
						aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header">
									<h1 class="modal-title fs-5" id="exampleModalLabel">로그인</h1>
									<button type="button" class="btn-close" data-bs-dismiss="modal"
										aria-label="Close"></button>
								</div>
								<div class="modal-body">

									<c:if test="${not empty notmember }">
										<script>
											alert("${notmember}")
										</script>
									</c:if>
									<form action="${pageContext.request.contextPath}/member/login"
										method="post">
										<table>
											<tr>
												<th>아이디</th>
												<td><input type="text" name="memberId" id="memberId" /></td>
											</tr>
											<tr>
												<th>비밀번호</th>
												<td><div class="show_password">
												<input type="password" name="pw" id="pw"/>
												<i class="fa fa-eye fa-lg"></i>
												</div></td>
											</tr>
										</table>
								</div>

								<div class="modal-footer">
									<button type="submit" class="btn btn-secondary"
										data-bs-dismiss="modal">로그인하기</button>
								</div>
								</form>
							</div>
						</div>
					</div>
				</c:if>

				<!-- 로그아웃 -->
				<c:if test="${!empty info}">
					<li><span>레벨:${info.level } ${info.name }님, 환영합니다</span></li>
					<li class="logout"><a
						href="${pageContext.request.contextPath}/member/logout">로그아웃</a></li>
					<li class="logout"><a
						href="${pageContext.request.contextPath}/mypage/main">마이페이지</a></li>

				</c:if>
   
				<!-- 셀러 로그인시 -->
				<c:if test="${!empty sellerInfo}">
					<li><span>${sellerInfo.sellerId } 셀러님, 환영합니다 </span></li>
					<li class="logout"><a
						href="${pageContext.request.contextPath}/seller/logout">로그아웃</a></li>
					<li class="registProduct"><a
						href="${pageContext.request.contextPath}/seller/sellerMenu?sellerId=${sellerInfo.sellerId}">셀러
							관리 메뉴 </a></li>
				</c:if>
				<!-- 셀러 로그인시-->

				<li class="cart"><a onclick="return loginCheck('${info}')"
					href="${pageContext.request.contextPath }/cart/viewCart"
					data-attr='공통^헤더^장바구니'>장바구니<span id="cartToCnt"></span></a></li>


				<li class="order"><a
					href="javascript:common.link.moveOrderList();"
					data-attr='공통^헤더^주문배송'>주문배송</a></li>
				<li class="customer"><a
					href="javascript:common.faq.getFaqList('99');"
					data-attr='공통^헤더^고객센터'>고객센터</a></li>
				<li class="store"><a
					href="javascript:common.link.moveStoreMain();"
					data-attr='공통^헤더^매장안내'>매장안내</a></li>
				<li class="global"><a href="http://global.oliveyoung.com/"
					target="_blank" title="올리브영 글로벌 새창으로 열기" data-attr='공통^헤더^Global'>Global</a></li>
			</ul>
		</div>
		<!-- 우측 상단 검색 창 위 div 끝-->

		<!-- 올리브영 메인 로고 시작 -->
		<div class="header_inner s_yearend">
			<h1>
				<a href="${pageContext.request.contextPath }/main"> <img
					src="${pageContext.request.contextPath }/resources/image/comm/h1_logo_yearend.png"
					alt="올리브영" />
				</a>
			</h1>
			<!-- 올리브영 메인 로고 끝 -->

			<div class="search_box" id="w_search_box">
				<input type="hidden" name="chkButton" id="chkButton" value="" /> <input
					type="text" id="query" name="" value="" class="inp_placeholder"
					data-placeholder="쿤달 아쿠아올인원 런칭!"
					data-ref-linkUrl="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000102190141"
					onKeypress="javascript:pressCheck_WEB_MainSearch((event),this);"
					onkeydown="javascript:downCheck_WEB_MainSearch((event));" />

				<button id="searchSubmit">검색</button>

				<!-- 검색 레이어 영역 (디자인 수정 예정) -->
				<div class="search_layer">
					<div class="layer_inner">
						<!-- 2017-02-07 수정 : 자동완성기능 영역 -->
						<div class="auto_search_cont">
							<div class="brand_area" id="ark_brand"></div>
							<div class="auto_list" id="ark_w"></div>
						</div>
						<!--// 2017-02-07 수정 : 자동완성기능 영역 -->

						<!-- 최근 검색어 -->
						<a href="#" class="search_tab tab01 on" id="searchRecent">최근
							검색어</a>
						<!-- 현재 보여지는 탭에 클래스 on 넣어주세요 -->
						<div class="search_tab_cont" id="recent_cont">
							<ul id="mykeyword">
								<!-- 검색 기록이 없을 경우 -->
								<!-- 							<li class="no_data" id="recent_no_data" style="display:none;">최근 검색한 기록이 없습니다.</li> -->
								<!--// 검색 기록이 없을 경우 -->
								<!-- 검색 저장 기능이 꺼져있을 경우 -->
								<!-- 							<li class="no_data" id="recent_no_save" style="display:none;">최근 검색어 저장 기능이 꺼져있습니다.</li> -->
								<!--// 검색 저장 기능이 꺼져있을 경우 -->
							</ul>
							<div class="search_set_area">
								<a href="#" class="sch_all_del"
									onclick="javascript:deleteCookies();">전체 삭제</a>
								<!-- 										<a href="#" class="sch_save"></a>																		 -->
								<a href="#" class="sch_save"></a>
							</div>
						</div>

						<!--// 최근 검색어 -->
						<!-- 급상승 검색어 -->
						<a href="#" class="search_tab tab02" id="searchPop">급상승 검색어</a>
						<div class="search_tab_cont sharp_rise" id="w_pop_cont">
							<ul id="mainPopword">
							</ul>
							<div class="search_set_area">
								<a href="#" class="sch_pop_close">닫기</a>
							</div>
						</div>
						<!--// 인기 검색어 -->
						<!-- SCP추가 -->
						<div class="scp_cont" id="scp_cont_id"></div>
						<!-- //SCP추가 -->
					</div>
				</div>
				<!--// 검색 레이어 영역 -->
			</div>
			<!--// 검색영역 -->

			<ul class="mymenu_area">
				<!-- 오늘드림 플래그 개인화 노출 2차 POC 추가 -->
				<li id="todayDeliveryContainer" class="delivery"></li>
				<!-- // 오늘드림 플래그 개인화 노출 2차 POC 추가 -->
				<li class="store "><a href="#" class="mymenu_layer"
					title="관심 매장소식 자세히보기 열기/닫기">관심 매장소식</a>
					<div class="alim_box">

						<p class="store_desc">
							<span>로그인</span>하시면 자주가는 매장을 <br />관심 매장으로 설정 할 수 있습니다.
						</p>
						<button class="mymenu_btn"
							onClick="javascript:common.link.moveLoginPage();">로그인</button>

					</div></li>
				<li class="recent"><a href="javascript:;" class="mymenu_layer"
					title="최근 본 상품 자세히보기 열기/닫기">최근 본 상품</a>
					<div class="recent_prd_box" style="min-height: 510px;">
						<p class="recent_tit">
							전체 <span>0</span>개
						<div class="no_data" style="display: none;">최근 본 상품이 없습니다.</div>
					</div></li>
			</ul>
		</div>
		<div class="header_design_area"></div>
	</div>

	<div class="main_moving_banner" style="display: none;">
		<a
			href="https://www.oliveyoung.co.kr/store/storeEvent/getCultureTicketEventDetail.do?evtNo=00000000011227"
			data-attr="홈^우측원형플로팅배너^컬쳐이벤트_디즈니_김채원"><img
			src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000040003/39/263147772111492742.png"
			alt="컬쳐이벤트_디즈니_김채원"
			data-ref-compareKey="90000040003/39/263147772111492742.html" /></a>
		<button type="button" class="moving_banner_close">배너 하루동안 보지
			않기</button>
		<!-- 2017-02-06 코드수정 -->
	</div>

	<div id="Gnb" class="main gen1">
		<div id="gnbWrap">
			<a href="#" id="btnGnbOpen">카테고리</a>
			<!-- 전체 카테고리 레이어 -->
			<div class="layer_all_menu" id="gnbAllMenu">
				<ul class="all_menu_wrap">
					<li>
						<h2>뷰티</h2>
						  <c:set value="${subCateList }" var="subCateList" />
						  <c:forEach items="${mainCateList }" var="mainCateList">
						<div class="sub_menu_box">

							<p class="sub_depth">
								<a href="/category?mainCateId=${mainCateList.mainCateId }">${mainCateList.mainCateName}</a>
							</p>

							<ul>
								<c:forEach items="${subCateList }" var="subCateList">
								<c:if test="${subCateList.mainCateId eq mainCateList.mainCateId}">
								  <li><a href="/category/sub?subCateId=${subCateList.subCateId }">${subCateList.subCateName }</a></li>
								</c:if>
								</c:forEach>
								</ul>
							</div>

							</c:forEach>
							</li>

				<button id="btnGnbClose">전체 카테고리 창 닫기</button>
			          </div>
			          
			<!--// 전체 카테고리 레이어 -->


			<ul class="gnb_menu_list">

				<li style="">
					<a href="getHotdealList.html"
					   data-ref-linkUrl="main/getHotdealList.do" 
					   data-attr="공통^GNB^오특"><span>오특</span>
					</a>
				</li>

				<li style="">
					<a href="getNewList.html"
					   data-ref-linkUrl="main/getNewList.do" 
					   data-attr="공통^GNB^신상"><span>신상</span>
					</a>
				</li>	

				<li style="">
					<a href="getBestList.html"
					   data-ref-linkUrl="main/getBestList.do" 
					   data-attr="공통^GNB^랭킹"><span>랭킹</span>
					</a>
				</li>

				<li style="">
					<a href="https://www.oliveyoung.co.kr/store/planshop/getSpcShopDetail.do?dispCatNo=500000200080001"
					   data-ref-linkUrl="planshop/getSpcShopDetail.do?dispCatNo=500000200080001" 
					   data-attr="공통^GNB^프리미엄관"><span>프리미엄관</span>
					</a>
				</li>

				<li style="">
					<a href="getPlanShopList.html"
					   data-ref-linkUrl="main/getPlanShopList.do" 
					   data-attr="공통^GNB^기획전"><span>기획전</span>
					</a>
				</li>

				<li style="">
					<a href="getSaleList.html"
					   data-ref-linkUrl="main/getSaleList.do" 
					   data-attr="공통^GNB^세일"><span>세일</span>
					</a>
				</li>

				<li style="">
					<a href="https://www.oliveyoung.co.kr/store/giftCardGuide/getGiftCardGuide.do"
					   data-ref-linkUrl="giftCardGuide/getGiftCardGuide.do" 
					   data-attr="공통^GNB^기프트카드"><span>기프트카드</span>
					</a>
				</li>

				<li style="">
					<a href="getMembership.html"
					   data-ref-linkUrl="main/getMembership.do" 
					   data-attr="공통^GNB^멤버십/쿠폰"><span>멤버십/쿠폰</span>
					</a>
				</li>

				<li style="">
					<a href="getEventList.html"
					   data-ref-linkUrl="main/getEventList.do" 
					   data-attr="공통^GNB^이벤트"><span>이벤트</span>
					</a>
				</li>

<script type="text/javascript">
	$('.gnb_menu_list').click(function() {
		localStorage.removeItem("prdSort");
	});
</script>

			</ul>

		</div>

<script>
	$(window).ready(function(){
		//넷퍼넬 키 반환 호출(전역)
		NetFunnel_Complete();
		
		//넷퍼넬 키 반환 호출(main.do) act_03
		var checkNfl = "0";
		if(checkNfl != undefined && checkNfl != "" ){
			NetFunnel_Complete({cookie_id:"NetFunnel_Main", action_id:"act_03"});
		}  

	    common.header.init();

		$('.btn_upper_close').on('click', function(){
	        common.bann.setPopInfo("awardsTopBanner", "noNeed");
		    $('.banUpperBox').hide();
		    $('.dimBanWhite').hide();
		    //오늘 하루 안보기 소스 넣어주세요.
		});

		var parser = new UserAgentUtil(navigator.userAgent);
		if(parser.getBrowser().name.indexOf("msie") >= 0) {
			$(".banUpperBox2").show();
		}
	});
	
	function awardsMoveBan(){
		console.log(0);
		console.log("oyawards_headerbanner");
		common.wlog("oyawards_headerbanner");
		    var $banUpperBox = $('.banUpperBox'),
		    	$dimBan = $banUpperBox.children('.dimBan'),
		    	$dimBanWhite = $('.dimBanWhite');

		    $dimBan.animate({'width': '100%'}, 200);
		    $dimBanWhite.show().animate({'left': 0}, 200).delay('200').queue(function(){
		        $dimBan.children('.in').show().animate({'width': '100%'}, 200);
		        $dimBanWhite.children('.in').show().animate({'left':0}, 200);
		    });
		    /* $('.dimBanWhite').animate({'left': 0}, 200).queue(function(){
		        $('.dimBanBlack').show();
		        $('.dimBanBlack').animate({'opacity': 1}, 500);
		    }); 제거  */

		    setTimeout(function(){
		        //alert('링크이동');
		    	location.href= "https://www.oliveyoung.co.kr/store/awards/getAwardsMain.do?bannerGo=Y";
		    }, 700);
	    var $banUpperBox = $('.banUpperBox'),
	    	$dimBan = $banUpperBox.children('.dimBan');
	    $dimBan.animate({'width': '100%'}, 200);
	    $('.dimBanWhite').animate({'left': 0}, 200).queue(function(){
	        $('.dimBanBlack').show();
	        $('.dimBanBlack').animate({'opacity': 1}, 500);
	    });

	    setTimeout(function(){
	        //alert('링크이동')
	    	common.link.commonMoveUrl("awards/getAwardsMain.do?bannerGo=Y");
	    }, 500);
	}
</script>

<!-- RecoBell Script Start -->
 <script type="text/javascript" src="../../../logger.ai.oliveyoung.co.kr/js/eglpcidgen.min.js"></script>
<script src="${pageContext.request.contextPath }/resources/js/common/libs/sha256.js"></script>
<script type="text/javascript">
try {
	var recoSsoMbrNo = 'null';
	var recoCuid = '8b47cf9f-efd1-48e4-8f83-10ee8a07945b';
	// User ID 암호화
	var hashedRecoSsoMbrNo = CryptoJS.SHA256(recoSsoMbrNo).toString();
	
	if(recoSsoMbrNo === 'null'){
	    hashedRecoSsoMbrNo = "";
	}

}catch(e){}

</script> 
<!-- RecoBell Script End  -->

<!--Pixel init Script Start-->
<script>
	! function(b, e, f, g, a, c, d) {
		b.fbq || (a = b.fbq = function() {
			a.callMethod ? a.callMethod.apply(a, arguments) : a.queue.push(arguments)
		}, b._fbq || (b._fbq = a), a.push = a, a.loaded = !0, a.version = "2.0", a.queue = [], c = e.createElement(f), c.async = !0, c.src = g, d = e.getElementsByTagName(f)[0], d.parentNode.insertBefore(c, d))
	}(window, document, "script", "../../../connect.facebook.net/en_US/fbevents.js");
	fbq("init", "1926423667616265");
	fbq("track", "PageView");
</script>
<!--Pixel init Script End-->


 







	<script src="${pageContext.request.contextPath }/resources/js/common/jquery.popupWindowdbaa.js?dumm=20221223001" charset="utf-8"></script>
	<script src="${pageContext.request.contextPath }/resources/js/common/jquery.ddslick.mindbaa.js?dumm=20221223001" charset="utf-8"></script>
	<script src="${pageContext.request.contextPath }/resources/js/common/jquery.tmpl.mindbaa.js?dumm=20221223001" charset="utf-8"></script>
	<script src="${pageContext.request.contextPath }/resources/js/common/jquery.numberdbaa.js?dumm=20221223001" charset="utf-8"></script>
	<script src="${pageContext.request.contextPath }/resources/js/common/jquery.lazyload.js" charset="utf-8"></script>
	<script src="${pageContext.request.contextPath }/resources/js/common/publish/slick.mindbaa.js?dumm=20221223001" charset="utf-8"></script>
	
	<script src="${pageContext.request.contextPath }/resources/js/common/elrte/elrte.fulldbaa.js?dumm=20221223001" type="text/javascript" charset="utf-8"></script>
	<script src="${pageContext.request.contextPath }/resources/js/common/elrte/i18n/elrte.kodbaa.js?dumm=20221223001" type="text/javascript" charset="utf-8"></script>
	
	<script src="${pageContext.request.contextPath }/resources/js/common/commondbaa.js?dumm=20221223001" charset="utf-8"></script>
	<script src="${pageContext.request.contextPath }/resources/js/common/common.linkdbaa.js?dumm=20221223001" charset="utf-8"></script>
	<script src="${pageContext.request.contextPath }/resources/js/common/textdbaa.js?dumm=20221223001" charset="utf-8"></script>
	<script src="${pageContext.request.contextPath }/resources/js/common/ajaxdbaa.js?dumm=20221223001" charset="utf-8"></script>
	<script src="${pageContext.request.contextPath }/resources/js/common/utf_8dbaa.js?dumm=20221223001" charset="utf-8"></script>
	<script src="${pageContext.request.contextPath }/resources/js/common/useragent_utildbaa.js?dumm=20221223001" charset="utf-8"></script>
	
	<script src="${pageContext.request.contextPath }/resources/js/common/jcarousellite_1.0.1.mindbaa.js?dumm=20221223001" charset="utf-8"></script>	
	
	<script src="${pageContext.request.contextPath }/resources/js/search/beta.fixdbaa.js?dumm=20221223001" charset="utf-8"></script>
	<script src="${pageContext.request.contextPath }/resources/js/search/beta2.fixdbaa.js?dumm=20221223001" charset="utf-8"></script>
	<script src="${pageContext.request.contextPath }/resources/js/search/searchdbaa.js?dumm=20221223001" charset="utf-8"></script>
	<script src="${pageContext.request.contextPath }/resources/js/search/arkdbaa.js?dumm=20221223001" charset="utf-8"></script>
	<script src="${pageContext.request.contextPath }/resources/js/curation/curationdbaa.js?dumm=20221223001" charset="utf-8"></script>
	<script src="${pageContext.request.contextPath }/resources/js/gtm/gtmdbaa.js?dumm=20221223001" charset="utf-8"></script>

	<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/event/eventLiveBroadcastdbaa.js?dumm=20221223001"></script>
  

	
		
		
		
			<script>
				(function(h,o,u,n,d) {
					h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
					d=o.createElement(u);d.async=1;d.src=n
					n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
				})(window,document,'script','../../../www.datadoghq-browser-agent.com/datadog-rum.js','DD_RUM')
				DD_RUM.onReady(function() {
					DD_RUM.init({
						clientToken: 'pubc89a173fb013152879aea4ea5580abcb',
						applicationId: '4a379cad-dfb2-4a67-930e-6416ebc206b1',
						site: 'datadoghq.com',
						service:'oympprd',
						env:'prd',
						// Specify a version number to identify the deployed version of your application in Datadog
						// version: '1.0.0',
						sampleRate: 5,
						replaySampleRate: 0,
						premiumSampleRate : 5,
						trackInteractions: true,
						allowedTracingOrigins:[/http:\/\/.*\.oliveyoung\.co\.kr/, /https:\/\/.*\.oliveyoung\.co\.kr/]
					})
				})
			</script>

<form name="ssologinfrm" action="https://www.oliveyoung.co.kr/store/login/ssoLogin.do" method="post">
<input  type="hidden"  id="cjssoq" name="cjssoq" />
</form>
<script>
	var ssoCheck = "N";
	var cjssoq = "null";
	//alert('ssocheck:'+ssoCheck);
	//세션 정보가 없을경우 
	if( !_isLogin || ssoCheck !='N'){
		//SSO 쿠키가 있고 정상적으로 토큰을 밥급받았을 경우
		if((typeof _cjssoEncData) != "undefined" && _cjssoEncData !=""){
			//ajax를 사용해서 _cjssoEncData 를 처리하여 사용하셔도 무방합니다.
			//alert("111 SSO쿠키를 조사해보니 있어서 확인하러 갑니다11."+_cjssoEncData);
			if(_cjssoEncData != cjssoq){
				document.getElementById("cjssoq").value = _cjssoEncData ; 
				document.ssologinfrm.submit();
			}
		}else{
			//alert("222세션도 없고 쿠키도 없어서 해당 페이지로 갑니다.")
		}
	}
</script>




		<!-- 메인 카테고리 목록 -->
        
        
        
        
        
        

		<%-- <div class="main_cate_wrap">
			<ul class="main_cate_list">
				
					
						
							
								
									
									<li class="type1">
										<a href="#" class="main_menu">기초화장품</a>
								
								
									<div class="lnb_ban_box 10000010001" data-ref-dispCatNo-lnb_ban_box="10000010001">
										<a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000175917" onclick='javascript: gtm.goods.callGoodsGtmInfo("A000000175917", "", "ee-productClick", "공통_카테고리네비게이터추천상품", "1"); main.main.bindRecommendWeblog(1);' data-attr="공통^카테고리네비게이터추천상품^[2022 어워즈] 토리든 다이브인 세럼 70ml 대용량 기획 (+수딩크림 50ml 본품증정)" data-impression="A000000175917^공통_카테고리네비게이터추천상품^1">
											<div class="ban_info">
												<p class="ban_name">MD's Pick</p>
												<div class="tit_group">
													<p class="tit_m">토리든💙</p>
													<p class="tit_s">속수분케어세럼</p>
													<p class="tit_s">70ml대용량기획</p>
												</div>
												<div class="price_group">
													
													
													
														
														
															<p class="price_s">26,000<em>원</em></p>
															<p class="price_m">16,950<em>원</em></p>
														
													
												</div>
											</div>
											<div class="ban_thum">
												
													
													
														<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/10/0000/0017/A00000017591714koe743.jpg?l=ko" alt="" >
													
												
											</div>
										</a>
									</div>
								
								
								
								
							
							
						
					
				
					
						
							
								
								
									<div class="lnb_ban_box 10000010009" data-ref-dispCatNo-lnb_ban_box="10000010009">
										<a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000174914" onclick='javascript: gtm.goods.callGoodsGtmInfo("A000000174914", "", "ee-productClick", "공통_카테고리네비게이터추천상품", "1"); main.main.bindRecommendWeblog(2);' data-attr="공통^카테고리네비게이터추천상품^[2022어워즈] 메디힐 티트리 에센셜 마스크 기획 (10매+2매)" data-impression="A000000174914^공통_카테고리네비게이터추천상품^1">
											<div class="ban_info">
												<p class="ban_name">MD's Pick</p>
												<div class="tit_group">
													<p class="tit_m">메디힐💚</p>
													<p class="tit_s">티트리 마스크</p>
													<p class="tit_s">#시트팩1위🏆</p>
												</div>
												<div class="price_group">
													
													
													
														
														
															<p class="price_s">20,000<em>원</em></p>
															<p class="price_m">9,900<em>원</em></p>
														
													
												</div>
											</div>
											<div class="ban_thum">
												
													
													
														<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/10/0000/0017/A00000017491416koe743.jpg?l=ko" alt="" >
													
												
											</div>
										</a>
									</div>
								
								
								
								
							
							
						
					
				
					
						
							
								
								
									<div class="lnb_ban_box 10000010010" data-ref-dispCatNo-lnb_ban_box="10000010010">
										<a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000175544" onclick='javascript: gtm.goods.callGoodsGtmInfo("A000000175544", "", "ee-productClick", "공통_카테고리네비게이터추천상품", "1"); main.main.bindRecommendWeblog(3);' data-attr="공통^카테고리네비게이터추천상품^[2022 어워즈] 마녀공장 퓨어 클렌징 오일 300mlX2 더블기획" data-impression="A000000175544^공통_카테고리네비게이터추천상품^1">
											<div class="ban_info">
												<p class="ban_name">MD's Pick</p>
												<div class="tit_group">
													<p class="tit_m">마녀공장🏆</p>
													<p class="tit_s">국민 클렌징템</p>
													<p class="tit_s">어워즈 한정기획</p>
												</div>
												<div class="price_group">
													
													
													
														
														
															<p class="price_s">49,000<em>원</em></p>
															<p class="price_m">29,900<em>원</em></p>
														
													
												</div>
											</div>
											<div class="ban_thum">
												
													
													
														<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/10/0000/0017/A00000017554402koe743.jpg?l=ko" alt="" >
													
												
											</div>
										</a>
									</div>
								
								
								
								
							
							
						
					
				
					
						
							
								
								
									<div class="lnb_ban_box 10000010011" data-ref-dispCatNo-lnb_ban_box="10000010011">
										<a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000163730" onclick='javascript: gtm.goods.callGoodsGtmInfo("A000000163730", "", "ee-productClick", "공통_카테고리네비게이터추천상품", "1"); main.main.bindRecommendWeblog(4);' data-attr="공통^카테고리네비게이터추천상품^[올영단독/디렉터파이개발] 에뛰드 순정 디렉터 수분 선크림 1+1기획(50ml+50ml)" data-impression="A000000163730^공통_카테고리네비게이터추천상품^1">
											<div class="ban_info">
												<p class="ban_name">MD's Pick</p>
												<div class="tit_group">
													<p class="tit_m">에뛰드 순정 디렉터</p>
													<p class="tit_s">수분-핏 선크림💦</p>
													<p class="tit_s">올영 단독 1+1</p>
												</div>
												<div class="price_group">
													
													
													
														
														
															<p class="price_s">25,000<em>원</em></p>
															<p class="price_m">24,500<em>원</em></p>
														
													
												</div>
											</div>
											<div class="ban_thum">
												
													
													
														<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/10/0000/0016/A00000016373055koe743.jpg?l=ko" alt="" >
													
												
											</div>
										</a>
									</div>
								
								
								
								
							
							
						
					
				
					
						
							
							
								
									<ul class="sub_cate_list">
										
										
										
											<li><a href="javascript:common.link.moveCategoryShop('10000010001');" data-ref-dispCatNo="10000010001" class="sub_menu"><span>스킨케어</span></a></li>
										
											<li><a href="javascript:common.link.moveCategoryShop('10000010009');" data-ref-dispCatNo="10000010009" class="sub_menu"><span>마스크팩</span></a></li>
										
											<li><a href="javascript:common.link.moveCategoryShop('10000010010');" data-ref-dispCatNo="10000010010" class="sub_menu"><span>클렌징</span></a></li>
										
											<li><a href="javascript:common.link.moveCategoryShop('10000010011');" data-ref-dispCatNo="10000010011" class="sub_menu"><span>선케어</span></a></li>
										
									</ul>
								</li>
									
									
								
								
								<li class="type2">
									<a href="javascript:common.link.moveCategoryShop('10000010008');" data-ref-dispCatNo="10000010008" class="main_menu">더모 코스메틱</a>
									
										<div class="lnb_ban_box">
											<a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000174991" onclick='javascript: gtm.goods.callGoodsGtmInfo("A000000174991", "", "ee-productClick", "공통_카테고리네비게이터추천상품", "1"); main.main.bindRecommendWeblog(5);' data-attr="공통^카테고리네비게이터추천상품^[2022어워즈]에스트라 아토베리어365 크림 80ml 기획(+시카세럼10ml+패드6매)" data-impression="A000000174991^공통_카테고리네비게이터추천상품^1">
												<div class="ban_info">
													<p class="ban_name">MD's Pick</p>
													<div class="tit_group">
														<p class="tit_m">🚨한정수량🚨</p>
														<p class="tit_s">에스트라 캡슐보습크림</p>
														<p class="tit_s">어워즈 기획 GET!</p>
													</div>
													<div class="price_group">
														
														
														
															
															
																<p class="price_s">31,000<em>원</em></p>
																<p class="price_m">23,560<em>원</em></p>
															
														
													</div>
												</div>
												<div class="ban_thum">
													
														
														
															<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/10/0000/0017/A00000017499103koe743.jpg?l=ko" alt="" >
														
													
												</div>
											</a>
										</div>
									
								</li>
								
							
						
					
				
					
						
							
								
									
									<li class="type1">
										<a href="#" class="main_menu">메이크업 · 네일</a>
								
								
									<div class="lnb_ban_box 10000010002" data-ref-dispCatNo-lnb_ban_box="10000010002">
										<a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000171835" onclick='javascript: gtm.goods.callGoodsGtmInfo("A000000171835", "", "ee-productClick", "공통_카테고리네비게이터추천상품", "1"); main.main.bindRecommendWeblog(6);' data-attr="공통^카테고리네비게이터추천상품^[어워즈기획]클리오 킬커버 더뉴 파운웨어 쿠션 기획(본품+리필+와인잔2P+마커펜)" data-impression="A000000171835^공통_카테고리네비게이터추천상품^1">
											<div class="ban_info">
												<p class="ban_name">MD's Pick</p>
												<div class="tit_group">
													<p class="tit_m">클리오💘</p>
													<p class="tit_s">올영 1등쿠션</p>
													<p class="tit_s">와인잔+마커펜 증정🍷</p>
												</div>
												<div class="price_group">
													
													
													
														
														
															<p class="price_s">34,000<em>원</em></p>
															<p class="price_m">23,800<em>원</em></p>
														
													
												</div>
											</div>
											<div class="ban_thum">
												
													
													
														<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/10/0000/0017/A00000017183527koe743.jpg?l=ko" alt="" >
													
												
											</div>
										</a>
									</div>
								
								
								
								
							
							
						
					
				
					
						
							
								
								
									<div class="lnb_ban_box 10000010012" data-ref-dispCatNo-lnb_ban_box="10000010012">
										<a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000159510" onclick='javascript: gtm.goods.callGoodsGtmInfo("A000000159510", "", "ee-productClick", "공통_카테고리네비게이터추천상품", "1"); main.main.bindRecommendWeblog(7);' data-attr="공통^카테고리네비게이터추천상품^[NEW] 롬앤 무드 페블 네일 27종" data-impression="A000000159510^공통_카테고리네비게이터추천상품^1">
											<div class="ban_info">
												<p class="ban_name">MD's Pick</p>
												<div class="tit_group">
													<p class="tit_m">롬앤💗</p>
													<p class="tit_s">톤온톤누드컬러</p>
													<p class="tit_s">무드페블네일💅</p>
												</div>
												<div class="price_group">
													
													
													
														
														
															<p class="price_s">8,000<em>원</em></p>
															<p class="price_m">6,080<em>원</em></p>
														
													
												</div>
											</div>
											<div class="ban_thum">
												
													
													
														<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/10/0000/0015/A00000015951004koe743.jpg?l=ko" alt="" >
													
												
											</div>
										</a>
									</div>
								
								
								
								
							
							
						
					
				
					
						
							
							
								
									<ul class="sub_cate_list">
										
										
										
											<li><a href="javascript:common.link.moveCategoryShop('10000010002');" data-ref-dispCatNo="10000010002" class="sub_menu"><span>메이크업</span></a></li>
										
											<li><a href="javascript:common.link.moveCategoryShop('10000010012');" data-ref-dispCatNo="10000010012" class="sub_menu"><span>네일</span></a></li>
										
									</ul>
								</li>
									
									
								
								
								<li class="type2">
									<a href="javascript:common.link.moveCategoryShop('10000010003');" data-ref-dispCatNo="10000010003" class="main_menu">바디케어</a>
									
										<div class="lnb_ban_box">
											<a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000175527" onclick='javascript: gtm.goods.callGoodsGtmInfo("A000000175527", "", "ee-productClick", "공통_카테고리네비게이터추천상품", "1"); main.main.bindRecommendWeblog(8);' data-attr="공통^카테고리네비게이터추천상품^[2022 어워즈] 홀리 PICK 아로마티카 바디오일 더블괄사/리츄얼 기획 (우드&유리 괄사 증정)" data-impression="A000000175527^공통_카테고리네비게이터추천상품^1">
												<div class="ban_info">
													<p class="ban_name">MD's Pick</p>
													<div class="tit_group">
														<p class="tit_m">아로마티카🎁</p>
														<p class="tit_s">어워즈 수상기념</p>
														<p class="tit_s">더블괄사 출시</p>
													</div>
													<div class="price_group">
														
														
														
															
															
																<p class="price_s">44,000<em>원</em></p>
																<p class="price_m">30,500<em>원</em></p>
															
														
													</div>
												</div>
												<div class="ban_thum">
													
														
														
															<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/10/0000/0017/A00000017552707koe743.jpg?l=ko" alt="" >
														
													
												</div>
											</a>
										</div>
									
								</li>
								
							
						
					
				
					
						
							
							
								
								
								<li class="type2">
									<a href="javascript:common.link.moveCategoryShop('10000010004');" data-ref-dispCatNo="10000010004" class="main_menu">헤어케어</a>
									
										<div class="lnb_ban_box">
											<a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000175787" onclick='javascript: gtm.goods.callGoodsGtmInfo("A000000175787", "", "ee-productClick", "공통_카테고리네비게이터추천상품", "1"); main.main.bindRecommendWeblog(9);' data-attr="공통^카테고리네비게이터추천상품^[2022어워즈] 헤어케어 1위 어노브 대용량 딥데미지 트리트먼트 EX 1&1 한정기획(320ml*2+오일2ml)" data-impression="A000000175787^공통_카테고리네비게이터추천상품^1">
												<div class="ban_info">
													<p class="ban_name">MD's Pick</p>
													<div class="tit_group">
														<p class="tit_m">어노브💖</p>
														<p class="tit_s">320ml+320ml기획에</p>
														<p class="tit_s">오일 에센스까지🎁</p>
													</div>
													<div class="price_group">
														
														
														
															
															
																<p class="price_s">42,000<em>원</em></p>
																<p class="price_m">24,900<em>원</em></p>
															
														
													</div>
												</div>
												<div class="ban_thum">
													
														
														
															<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/10/0000/0017/A00000017578734koe743.jpg?l=ko" alt="" >
														
													
												</div>
											</a>
										</div>
									
								</li>
								
							
						
					
				
					
						
							
							
								
								
								<li class="type2">
									<a href="javascript:common.link.moveCategoryShop('10000010005');" data-ref-dispCatNo="10000010005" class="main_menu">향수/디퓨저</a>
									
										<div class="lnb_ban_box">
											<a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000176182" onclick='javascript: gtm.goods.callGoodsGtmInfo("A000000176182", "", "ee-productClick", "공통_카테고리네비게이터추천상품", "1"); main.main.bindRecommendWeblog(10);' data-attr="공통^카테고리네비게이터추천상품^[2022 어워즈] 클린 웜코튼 60ml EDP 올리브영 단독 한정판 기획세트(랜덤 롤러볼 5ml*3종 추가증정)" data-impression="A000000176182^공통_카테고리네비게이터추천상품^1">
												<div class="ban_info">
													<p class="ban_name">MD's Pick</p>
													<div class="tit_group">
														<p class="tit_m">💙클린💙</p>
														<p class="tit_s">어워즈 4년 연속 1위</p>
														<p class="tit_s">올리브영 단독 기획</p>
													</div>
													<div class="price_group">
														
														
														
															
															
																<p class="price_s">93,000<em>원</em></p>
																<p class="price_m">65,100<em>원</em></p>
															
														
													</div>
												</div>
												<div class="ban_thum">
													
														
														
															<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/10/0000/0017/A00000017618207koe743.jpg?l=ko" alt="" >
														
													
												</div>
											</a>
										</div>
									
								</li>
								
							
						
					
				
					
						
							
							
								
								
								<li class="type2">
									<a href="javascript:common.link.moveCategoryShop('10000010006');" data-ref-dispCatNo="10000010006" class="main_menu">미용소품</a>
									
										<div class="lnb_ban_box">
											<a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000175408" onclick='javascript: gtm.goods.callGoodsGtmInfo("A000000175408", "", "ee-productClick", "공통_카테고리네비게이터추천상품", "1"); main.main.bindRecommendWeblog(11);' data-attr="공통^카테고리네비게이터추천상품^[어워즈 한정] 피카소 메이크업 스파츌라 어워즈 한정 기획(+스펀지6P&파우치 증정)" data-impression="A000000175408^공통_카테고리네비게이터추천상품^1">
												<div class="ban_info">
													<p class="ban_name">MD's Pick</p>
													<div class="tit_group">
														<p class="tit_m">피카소✨</p>
														<p class="tit_s">화제의대란템</p>
														<p class="tit_s">어워즈한정기획📌</p>
													</div>
													<div class="price_group">
														
														
														
															
															
																<p class="price_s">19,000<em>원</em></p>
																<p class="price_m">14,900<em>원</em></p>
															
														
													</div>
												</div>
												<div class="ban_thum">
													
														
														
															<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/10/0000/0017/A00000017540806koe743.jpg?l=ko" alt="" >
														
													
												</div>
											</a>
										</div>
									
								</li>
								
							
						
					
				
					
						
							
							
								
								
								<li class="type2">
									<a href="javascript:common.link.moveCategoryShop('10000010007');" data-ref-dispCatNo="10000010007" class="main_menu">남성</a>
									
										<div class="lnb_ban_box">
											<a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000175804" onclick='javascript: gtm.goods.callGoodsGtmInfo("A000000175804", "", "ee-productClick", "공통_카테고리네비게이터추천상품", "1"); main.main.bindRecommendWeblog(12);' data-attr="공통^카테고리네비게이터추천상품^질레트 프로쉴드 옐로우 면도기 세트 어워즈 한정기획(2022)" data-impression="A000000175804^공통_카테고리네비게이터추천상품^1">
												<div class="ban_info">
													<p class="ban_name">MD's Pick</p>
													<div class="tit_group">
														<p class="tit_m">질레트</p>
														<p class="tit_s">어워즈 한정기획✨</p>
														<p class="tit_s">손흥민PICK 면도기!</p>
													</div>
													<div class="price_group">
														
														
														
															
															
																<p class="price_s">33,200<em>원</em></p>
																<p class="price_m">25,700<em>원</em></p>
															
														
													</div>
												</div>
												<div class="ban_thum">
													
														
														
															<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/10/0000/0017/A00000017580403koe743.jpg?l=ko" alt="" >
														
													
												</div>
											</a>
										</div>
									
								</li>
								
							
						
					
				
					
						
							
							
								
								
								<li class="type2">
									<a href="javascript:common.link.moveCategoryShop('10000020003');" data-ref-dispCatNo="10000020003" class="main_menu">구강/건강용품</a>
									
										<div class="lnb_ban_box">
											<a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000175557" onclick='javascript: gtm.goods.callGoodsGtmInfo("A000000162376", "", "ee-productClick", "공통_카테고리네비게이터추천상품", "1"); main.main.bindRecommendWeblog(13);' data-attr="공통^카테고리네비게이터추천상품^[2022어워즈]센시안 릴렉스 6종 택1 (어워즈기획/베이지/블랙/더블기획)(의료기기)" data-impression="A000000162376^공통_카테고리네비게이터추천상품^1">
												<div class="ban_info">
													<p class="ban_name">MD's Pick</p>
													<div class="tit_group">
														<p class="tit_m">센시안🍃</p>
														<p class="tit_s">다리붓기 순삭</p>
														<p class="tit_s">압박스타킹 GET!</p>
													</div>
													<div class="price_group">
														
														
														
															
															
																<p class="price_s">21,900<em>원</em></p>
																<p class="price_m">18,900<em>원</em></p>
															
														
													</div>
												</div>
												<div class="ban_thum">
													
														
														
															<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/10/0000/0016/A00000016237618koe743.jpg?l=ko" alt="" >
														
													
												</div>
											</a>
										</div>
									
								</li>
								
							
						
					
				
					
						
							
							
								
								
								<li class="type2">
									<a href="javascript:common.link.moveCategoryShop('10000020004');" data-ref-dispCatNo="10000020004" class="main_menu">여성/위생용품</a>
									
										<div class="lnb_ban_box">
											<a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000175458" onclick='javascript: gtm.goods.callGoodsGtmInfo("A000000175458", "", "ee-productClick", "공통_카테고리네비게이터추천상품", "1"); main.main.bindRecommendWeblog(14);' data-attr="공통^카테고리네비게이터추천상품^[2022 어워즈] 바솔 이너밸런싱 포밍워시 150ml (리필150ml*2+공병150ml) " data-impression="A000000175458^공통_카테고리네비게이터추천상품^1">
												<div class="ban_info">
													<p class="ban_name">MD's Pick</p>
													<div class="tit_group">
														<p class="tit_m">바솔🌿 </p>
														<p class="tit_s">올리브영 단독</p>
														<p class="tit_s">어워즈 기획 💖</p>
													</div>
													<div class="price_group">
														
														
														
															
															
																<p class="price_s">24,000<em>원</em></p>
																<p class="price_m">19,200<em>원</em></p>
															
														
													</div>
												</div>
												<div class="ban_thum">
													
														
														
															<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/10/0000/0017/A00000017545806koe743.jpg?l=ko" alt="" >
														
													
												</div>
											</a>
										</div>
									
								</li>
								
							
						
					
				
					
						
							
							
								
								
								<li class="type2">
									<a href="javascript:common.link.moveCategoryShop('10000020001');" data-ref-dispCatNo="10000020001" class="main_menu">건강식품</a>
									
										<div class="lnb_ban_box">
											<a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000175617&amp;dispCatNo=1000002000100150006&amp;trackingCd=Result_1" onclick='javascript: gtm.goods.callGoodsGtmInfo("A000000175617", "", "ee-productClick", "공통_카테고리네비게이터추천상품", "1"); main.main.bindRecommendWeblog(15);' data-attr="공통^카테고리네비게이터추천상품^[어워즈한정]오쏘몰 이뮨 멀티비타민&미네랄 14+1입 추가증정(위클리 플래너 증정)" data-impression="A000000175617^공통_카테고리네비게이터추천상품^1">
												<div class="ban_info">
													<p class="ban_name">MD's Pick</p>
													<div class="tit_group">
														<p class="tit_m">오쏘몰✨</p>
														<p class="tit_s">14입+1입</p>
														<p class="tit_s">어워즈 한정기획!</p>
													</div>
													<div class="price_group">
														
														
														
															
															
																<p class="price_s">75,000<em>원</em></p>
																<p class="price_m">61,500<em>원</em></p>
															
														
													</div>
												</div>
												<div class="ban_thum">
													
														
														
															<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/10/0000/0017/A00000017561702koe743.jpg?l=ko" alt="" >
														
													
												</div>
											</a>
										</div>
									
								</li>
								
							
						
					
				
					
						
							
							
								
								
								<li class="type2">
									<a href="javascript:common.link.moveCategoryShop('10000020002');" data-ref-dispCatNo="10000020002" class="main_menu">푸드</a>
									
										<div class="lnb_ban_box">
											<a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000115097" onclick='javascript: gtm.goods.callGoodsGtmInfo("A000000115097", "", "ee-productClick", "공통_카테고리네비게이터추천상품", "1"); main.main.bindRecommendWeblog(16);' data-attr="공통^카테고리네비게이터추천상품^테일러 푸룬 농축 딥워터 180ml" data-impression="A000000115097^공통_카테고리네비게이터추천상품^1">
												<div class="ban_info">
													<p class="ban_name">MD's Pick</p>
													<div class="tit_group">
														<p class="tit_m">푸룬 딥워터</p>
														<p class="tit_s">시원하게 빠르다!</p>
														<p class="tit_s">12월만 40% SALE</p>
													</div>
													<div class="price_group">
														
														
														
															
															
																<p class="price_s">4,500<em>원</em></p>
																<p class="price_m">2,700<em>원</em></p>
															
														
													</div>
												</div>
												<div class="ban_thum">
													
														
														
															<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/10/0000/0011/A00000011509704koe743.jpg?l=ko" alt="" >
														
													
												</div>
											</a>
										</div>
									
								</li>
								
							
						
					
				
					
						
							
							
								
								
								<li class="type2">
									<a href="javascript:common.link.moveCategoryShop('10000030005');" data-ref-dispCatNo="10000030005" class="main_menu">라이프/홈</a>
									
								</li>
								
							
						
					
				
					
						
							
							
								
								
								<li class="type2">
									<a href="javascript:common.link.moveCategoryShop('10000030003');" data-ref-dispCatNo="10000030003" class="main_menu">반려동물</a>
									
								</li>
								
							
						
					
				

				
				

				
					
					
						<li class="lst"><a href="javascript:common.link.commonMoveUrl('amusement/intro.do')" class="main_menu"><span class="icon_awards">AWARDS</span></a></li>
					
				
			</ul>


		</div>
        <!-- //[3553186] 온라인몰 전시 카테고리 개편 일괄 작업 요청의 건 -->
		<!-- 메인 카테고리 목록 -->

</div> --%>
<!-- Gnb -->

 <div id="Container">
	
	<div id="Contents">
		
		
		
			
				
				<div class="main_full_banner">
				<div class="banner_wrap slick_slider" id="mainFullSlider">
				
					
						<div>
							
							
							<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000102240119&amp;trackingCd=Home_Planshop1_1_PROD" class="banner_link" data-attr="홈^메인롤링배너^12월 올영픽_노도연^1"  data-trk="/">
								<p class="banner_desc">
									
									
									
									
									
									
									
									
									
									
									<span class="tit" style="color: #fff;">올영 P!CK
</span>
									<strong style="color: #fff;">올리브영이
<br/>P!CK한
<br/>이 달의 브랜드</strong>
									<span style="color: #fff;">어워즈 수상상품 최대 40%</span>
								</p>
								<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/1/7314143738967947759.jpg" alt="12월 올영픽_노도연">
							</a>
						</div>
					
					
				
					
						<div>
							
							
							<a href="https://www.oliveyoung.co.kr/store/amusement/festa.do?festaTab=myAwards&amp;trackingCd=Home_Planshop1_2_PROD" class="banner_link" data-attr="홈^메인롤링배너^어워즈&페스타 개인화 영역_임예원^2"  data-trk="/">
								<p class="banner_desc">
									
									
									
									
									
									
									
									
									
									
									<span class="tit" >어워즈&페스타
</span>
									<strong >올영과 함께한 <br/>연말결산
<br/>나만의어워즈
</strong>
									<span >쿠폰 100%당첨혜택도 챙기세요!</span>
								</p>
								<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/1/83696479536803680.jpg" alt="어워즈&페스타 개인화 영역_임예원">
							</a>
						</div>
					
					
				
					
						<div>
							
							
							<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000101780285&amp;trackingCd=Home_Planshop1_3_PROD" class="banner_link" data-attr="홈^메인롤링배너^124-2302_황하영^3"  data-trk="/">
								<p class="banner_desc">
									
									
									
									
									
									
									
									
									
									
									<span class="tit" >그라펜&줄라이미</span>
									<strong >또다른 나를 <br/>깨우는 <br/>향기</strong>
									<span >겨울 맞춤 퍼퓸 최대 18%할인</span>
								</p>
								<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/1/6102272332491576584.jpg" alt="124-2302_황하영">
							</a>
						</div>
					
					
				
					
						<div>
							
							
							<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000102390148&amp;trackingCd=Home_Planshop1_4_PROD" class="banner_link" data-attr="홈^메인롤링배너^124-1001_권세희^4"  data-trk="/">
								<p class="banner_desc">
									
									
									
									
									
									
									
									
									
									
									<span class="tit" >클리오</span>
									<strong >메쉬를 입어<br/>더 촘촘히<br/>빛나요</strong>
									<span >매쉬글로우 선런칭 기념 33%할인</span>
								</p>
								<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/1/1570821513159820486.jpg" alt="124-1001_권세희">
							</a>
						</div>
					
					
				
					
						<div>
							
							
							<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000102370058&amp;trackingCd=Home_Planshop1_5_PROD" class="banner_link" data-attr="홈^메인롤링배너^124-0201_신현지^5"  data-trk="/">
								<p class="banner_desc">
									
									
									
									
									
									
									
									
									
									
									<span class="tit" >아누아</span>
									<strong >어성초의<br/>진정효과로<br/>지워봐요</strong>
									<span >어성초 클렌징/기초 최대 39%할인</span>
								</p>
								<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/1/3265718050018782226.jpg" alt="124-0201_신현지">
							</a>
						</div>
					
					
				
					
						<div>
							
							
							<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000102160158&amp;trackingCd=Home_Planshop1_6_PROD" class="banner_link" data-attr="홈^메인롤링배너^124-4101_도고운^6"  data-trk="/">
								<p class="banner_desc">
									
									
									
									
									
									
									
									
									
									
									<span class="tit" >좋은느낌</span>
									<strong >여린 피부가<br/>직접 닿아도<br/>안심해요</strong>
									<span >무표백 생리대 최대 60%할인</span>
								</p>
								<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/1/607927090278401965.jpg" alt="124-4101_도고운">
							</a>
						</div>
					
					
				
					
						<div>
							
							
							<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000102360105&amp;trackingCd=Home_Planshop1_7_PROD" class="banner_link" data-attr="홈^메인롤링배너^123-0104_반지원^7"  data-trk="/">
								<p class="banner_desc">
									
									
									
									
									
									
									
									
									
									
									<span class="tit" >닥터자르트</span>
									<strong >10주년 기념<br/>세라마이딘을<br/>두배 늘렸어요</strong>
									<span >세라마이딘 라인 최대 30%할인</span>
								</p>
								<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/1/529336881539817697.jpg" alt="123-0104_반지원">
							</a>
						</div>
					
					
				
					
						<div>
							
							
							<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000101780276&amp;trackingCd=Home_Planshop1_8_PROD" class="banner_link" data-attr="홈^메인롤링배너^124-2303_황하영^8"  data-trk="/">
								<p class="banner_desc">
									
									
									
									
									
									
									
									
									
									
									<span class="tit" style="color: #fff;">로이비
</span>
									<strong style="color: #fff;">2022년을
<br/>추억하는
<br/>6가지 향기
</strong>
									<span style="color: #fff;">최대 40%할인, 쿠폰</span>
								</p>
								<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/1/5098565860621581414.jpg" alt="124-2303_황하영">
							</a>
						</div>
					
					
				
					
						<div>
							
							
							<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000101880240&amp;trackingCd=Home_Planshop1_9_PROD" class="banner_link" data-attr="홈^메인롤링배너^124-3102_이주영^9"  data-trk="/">
								<p class="banner_desc">
									
									
									
									
									
									
									
									
									
									
									<span class="tit" >비브리브
</span>
									<strong >하나만 먹어도
<br/>속이
<br/>든든해요
</strong>
									<span >최대 55%할인</span>
								</p>
								<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/1/3987427345233318483.jpg" alt="124-3102_이주영">
							</a>
						</div>
					
					
				
					
						<div>
							
							
							<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000102130173&amp;trackingCd=Home_Planshop1_10_PROD" class="banner_link" data-attr="홈^메인롤링배너^124-4001_정유빈^10"  data-trk="/">
								<p class="banner_desc">
									
									
									
									
									
									
									
									
									
									
									<span class="tit" style="color: #fff;">헤어 기프트
</span>
									<strong style="color: #fff;">소중한 사람에게<br/>부드러움을
<br/>선물해요
</strong>
									<span style="color: #fff;">최대 56%할인</span>
								</p>
								<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/1/2066424763119791108.jpg" alt="124-4001_정유빈">
							</a>
						</div>
					
					
				
					
						<div>
							
							
							<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000101430427&amp;trackingCd=Home_Planshop1_11_PROD" class="banner_link" data-attr="홈^메인롤링배너^124-2101_유선경^11"  data-trk="/">
								<p class="banner_desc">
									
									
									
									
									
									
									
									
									
									
									<span class="tit" >빌리프
</span>
									<strong >산뜻한 겨울보습<br/>올영에서
<br/>준비해요
</strong>
									<span >최대 19%할인, 쿠폰</span>
								</p>
								<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/1/4322222157455033847.jpg" alt="124-2101_유선경">
							</a>
						</div>
					
					
				
					
						<div>
							
							
							<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000102390150&amp;trackingCd=Home_Planshop1_12_PROD" class="banner_link" data-attr="홈^메인롤링배너^124-1003_권세희^12"  data-trk="/">
								<p class="banner_desc">
									
									
									
									
									
									
									
									
									
									
									<span class="tit" style="color: #fff;">코스노리
</span>
									<strong style="color: #fff;">슥-바르고
<br/>아이돌 속눈썹
<br/>완성해요
</strong>
									<span style="color: #fff;">최대 38%할인</span>
								</p>
								<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/1/9188954749109337921.jpg" alt="124-1003_권세희">
							</a>
						</div>
					
					
				
					
						<div>
							
							
							<a href="https://www.oliveyoung.co.kr/store/event/getEventDetail.do?evtNo=00000000011654&amp;trackingCd=Home_Planshop1_13_PROD" class="banner_link" data-attr="홈^메인롤링배너^올영라이브 12/28일 방송_여슬기^13"  data-trk="/">
								<p class="banner_desc">
									
									
									
									
									
									
									
									
									
									
									<span class="tit" >바디코</span>
									<strong >인생 언더웨어<br/>최대 57%<br/>라이브 특가</strong>
									<span >바디코 구매하고 호캉스 가자</span>
								</p>
								<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/1/2923732503315514124.jpg" alt="올영라이브 12/28일 방송_여슬기">
							</a>
						</div>
					
					
				
			
			</div>
			</div> 
			
		

		
        
        
        
            
                
                    
                
                    
                
            
        
        
			
            
            
            
                 <div class="main_mid_banner split">
                    
                    	
						<a href="https://www.oliveyoung.co.kr/store/counsel/getNoticeDetail.do?ntcSeq=38824&amp;trackingCd=Home_LB" class="home_banner_top_split" data-ref-bannerId="home_banner_top_1" data-attr="홈^new상단띠배너^배송 사과문^1" data-trk="/">
							<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/image.oliveyoung.co.kr/image.oliveyoung.co.kr/uploads/images/display/90000010001/138/5221822295448964604.jpg" alt="배송 사과문" />
						</a>
                    
                    	
						<a href="https://www.oliveyoung.co.kr/store/counsel/getNoticeDetail.do?ntcSeq=37441&amp;trackingCd=Home_LB" class="home_banner_top_split" data-ref-bannerId="home_banner_top_3" data-attr="홈^new상단띠배너^포인트 적립률 변경 안내^2" data-trk="/">
							<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/138/4985527570554449043.jpg" alt="포인트 적립률 변경 안내" />
						</a>
                    
                </div> 
            
            
        

		<input type="hidden" id="chkNo" name="chkNo" value="1">
		<!-- 큐레이션 S 옴니채널 개선으로 마케팅 수신동의 / 로그인버튼 삭제 -->
		
			
				<div class="curation_wrap">
					<div class="loading_box main">
						<span class="icon"><img src="${pageContext.request.contextPath }/resources/image/comm/pc_loading.gif" alt="로딩중"></span>
						<p class="txt">고객님을 위한 상품 추천중이에요</p>
					</div>
					<div class="curation_area two" style="display: none;">
						<div class="inner">
							<div class="curation_slide type03" id="recobell_area1"></div>
						</div>
						<div class="inner">
							<div class="curation_slide type03" id="recobell_area2"></div>
						</div>
					</div>
				</div>
			
		
		<!-- 큐레이션 E -->
		
		
		
		

		
		
		
		
		
		
		
		
		
		
		
		
			
				
					
						
					
					
				
			
		
			
				
					
						
					
					
				
			
		
			
				
					
					
						
					
				
			
		
			
				
					
					
						
					
				
			
		
			
				
					
					
						
					
				
			
		
			
				
					
					
						
					
				
			
		
			
				
					
					
						
					
				
			
		
			
				
					
					
						
					
				
			
		
			
				
					
					
						
					
				
			
		
			
				
					
					
						
					
				
			
		
			
				
					
					
						
					
				
			
		
				
		
		<!-- 추천 기획전 -->
		<div class="main_plan_banner">
			<h3 class="main_sub_tit"><strong>Weekly Special</strong></h3>
			<div class="recomm_plan">
				<ul class="recomm_plan_list">
				
				
					
						
						
							
								
								
									
								
								<li>
									<a href="javascript:common.link.movePlanShop('500000101880241', 'Home_Planshop2_PROD');" data-ref-dispCatNo="" data-attr="홈^WeeklySpecial기획전^일반식품 오설록" data-trk="/">
										<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/categoryBanner/4642941999856599010.jpg" alt="일반식품 오설록">
										<div class="text_wrap">
											<dl style="color:#000000;">
												<dt>22년 땡큐&굿바이행사
</dt>
												<dt>오설록 찐혜택
</dt>
												<dd>#최대 45% #추가증정</dd>
											</dl>
										</div>
									</a>
								</li>
								
								
							
						
					
				
					
						
						
							
								
								
									
								
								<li>
									<a href="javascript:common.link.movePlanShop('500000102380067', 'Home_Planshop2_PROD');" data-ref-dispCatNo="" data-attr="홈^WeeklySpecial기획전^마스크팩_인기기획전_유상 아비브" data-trk="/">
										<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/categoryBanner/4948722534103383239.jpg" alt="마스크팩_인기기획전_유상 아비브">
										<div class="text_wrap">
											<dl style="color:#000000;">
												<dt>아비브 어성초로 
</dt>
												<dt>진정한 진정케어
</dt>
												<dd>#어워즈 단독기획</dd>
											</dl>
										</div>
									</a>
								</li>
								
								
							
						
					
				
					
				
					
				
					
				
					
				
					
				
					
				
					
				
					
				
					
				
				</ul>
			</div>
		</div>
		<!-- //추천 기획전 -->
		

		
		
		<div class="main_plan_banner ty02">
			
			
			
			<h3 class="main_sub_tit"><strong>인기 행사만 모았어요!</strong></h3>
			<div class="banner_wrap">
				<div class="slick_slider" id="mainPlanSlider">
					
					
					
						
						
						
					
						
						
						
					
						
						
						
							<div class="slider_unit ">
								
								
								
									
										
										
											
										
										
										<div class="plan_top">
											<div class="plan_banner" style="background-image:url('${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/categoryBanner/5985355406561784979.jpg');">
												<a href="javascript:common.link.movePlanShop('500000102360103', 'Home_Planshop3_PROD');" data-ref-dispCatNo="500000102360103" data-tracking-cd="Home_Planshop3_PROD" data-attr="홈^인기행사기획전상세^피부야천천히^1"  data-trk="/"  data-attr-imp-goodsno="A000000175617">
													<p>
														<strong class="tit" style="color:#000000;">모든 피부 고민,
</strong>
														<strong class="tit" style="color:#000000;">근본부터 탄탄하게
</strong>
														<span class="desc" style="color:#000000;">올리브영 슬로에이징</span>
													</p>
												</a>
											</div>
										</div>
										
										
										
									
								
								
								<ul class="cate_prd_list">
									
									
									
									
										
											<li>
												
												<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000176346&amp;dispCatNo=90000010001&amp;trackingCd=Home_Planshop3&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Planshop3" class="prd_thumb goodsList" data-ref-goodsNo="A000000176346" data-attr="홈^인기행사만 모았어요^시모먼트 브이 리프팅 롤러 크림 150ml^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000176346^홈_인기행사만 모았어요^1"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017634603koe743.jpg?l=ko" alt="시모먼트 브이 리프팅 롤러 크림 150ml" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Planshop3" class="goodsList" data-ref-goodsNo="A000000176346" data-attr="홈^인기행사만 모았어요^시모먼트 브이 리프팅 롤러 크림 150ml^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">시모먼트</span><p class="tx_name">시모먼트 브이 리프팅 롤러 크림 150ml</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000176346">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">35,900</span>원 </span><span class="tx_cur"><span class="tx_num">28,500</span>원 </span></p><p class="prd_flag"><span class="icon_flag coupon">쿠폰</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:96.0%">10점만점에 5.5점</span></span>(23)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000176346" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

												
											</li>
										
									
										
											<li>
												
												<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000175032&amp;dispCatNo=90000010001&amp;trackingCd=Home_Planshop3&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Planshop3" class="prd_thumb goodsList" data-ref-goodsNo="A000000175032" data-attr="홈^인기행사만 모았어요^[2022어워즈]리쥬란힐러 턴오버 앰플 듀얼 이펙트 30ml(+1ml*7ea증정) 기획^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000175032^홈_인기행사만 모았어요^2"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017503212koe743.jpg?l=ko" alt="[2022어워즈]리쥬란힐러 턴오버 앰플 듀얼 이펙트 30ml(+1ml*7ea증정) 기획" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Planshop3" class="goodsList" data-ref-goodsNo="A000000175032" data-attr="홈^인기행사만 모았어요^[2022어워즈]리쥬란힐러 턴오버 앰플 듀얼 이펙트 30ml(+1ml*7ea증정) 기획^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">리쥬란</span><p class="tx_name">[2022어워즈]리쥬란힐러 턴오버 앰플 듀얼 이펙트 30ml(+1ml*7ea증정) 기획</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000175032">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">59,000</span>원 </span><span class="tx_cur"><span class="tx_num">38,300</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:94.0%">10점만점에 5.5점</span></span>(772)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000175032" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

												
											</li>
										
									
										
									
										
									
										
									
										
									
								</ul>
								
							</div>
						
					
						
						
							
						
						
							<div class="slider_unit  right">
								
								
								
									
										
										
										
										<div class="plan_top">
											<div class="plan_banner" style="background-image:url('${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/categoryBanner/2335000353939603308.jpg');">
												<a href="javascript:common.link.movePlanShop('500000102380069', 'Home_Planshop3_PROD');" data-ref-dispCatNo="500000102380069" data-tracking-cd="Home_Planshop3_PROD" data-attr="홈^인기행사기획전상세^신상품MVP^2"  data-trk="/"  data-attr-imp-goodsno="A000000175617">
													<p>
														<strong class="tit" style="color:#ffffff;">22년도를 빛낸
</strong>
														<strong class="tit" style="color:#ffffff;">마스크팩 신상
</strong>
														<span class="desc" style="color:#ffffff;">#7일 추가할인</span>
													</p>
												</a>
											</div>
										</div>
										
										
										
									
								
								
								<ul class="cate_prd_list">
									
									
									
									
										
											<li>
												
												<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000170811&amp;dispCatNo=90000010001&amp;trackingCd=Home_Planshop3&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Planshop3" class="prd_thumb goodsList" data-ref-goodsNo="A000000170811" data-attr="홈^인기행사만 모았어요^[모공탄력]메디앤서 포어 콜라겐 마스크 5매^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000170811^홈_인기행사만 모았어요^1"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017081105koe743.jpg?l=ko" alt="[모공탄력]메디앤서 포어 콜라겐 마스크 5매" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Planshop3" class="goodsList" data-ref-goodsNo="A000000170811" data-attr="홈^인기행사만 모았어요^[모공탄력]메디앤서 포어 콜라겐 마스크 5매^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">메디앤서</span><p class="tx_name">[모공탄력]메디앤서 포어 콜라겐 마스크 5매</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000170811">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">30,000</span>원 </span><span class="tx_cur"><span class="tx_num">16,500</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag coupon">쿠폰</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:94.0%">10점만점에 5.5점</span></span>(434)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000170811" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

												
											</li>
										
									
										
											<li>
												
												<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000171820&amp;dispCatNo=90000010001&amp;trackingCd=Home_Planshop3&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Planshop3" class="prd_thumb goodsList" data-ref-goodsNo="A000000171820" data-attr="홈^인기행사만 모았어요^일소 네추럴 마일드 클리어 노우즈 팩 5매입^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000171820^홈_인기행사만 모았어요^2"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017182024koe743.jpg?l=ko" alt="일소 네추럴 마일드 클리어 노우즈 팩 5매입" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Planshop3" class="goodsList" data-ref-goodsNo="A000000171820" data-attr="홈^인기행사만 모았어요^일소 네추럴 마일드 클리어 노우즈 팩 5매입^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">일소</span><p class="tx_name">일소 네추럴 마일드 클리어 노우즈 팩 5매입</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000171820">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">12,900</span>원 </span><span class="tx_cur"><span class="tx_num">11,900</span>원 </span></p><p class="prd_flag"><span class="icon_flag coupon">쿠폰</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:94.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000171820" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

												
											</li>
										
									
										
									
										
									
								</ul>
								
							</div>
						
					
						
						
						
							<div class="slider_unit ">
								
								
								
									
										
										
											
										
										
										<div class="plan_top">
											<div class="plan_banner" style="background-image:url('${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/categoryBanner/6405343237949984877.jpg');">
												<a href="javascript:common.link.movePlanShop('500000102390151', 'Home_Planshop3_PROD');" data-ref-dispCatNo="500000102390151" data-tracking-cd="Home_Planshop3_PROD" data-attr="홈^인기행사기획전상세^비건웨어^3"  data-trk="/"  data-attr-imp-goodsno="A000000175617">
													<p>
														<strong class="tit" style="color:#000000;">내 피부같은 자연스러움
</strong>
														<strong class="tit" style="color:#000000;">헬시 글로우 쿠션
</strong>
														<span class="desc" style="color:#000000;">#어워즈 한정기획 #거울증정</span>
													</p>
												</a>
											</div>
										</div>
										
										
										
									
								
								
								<ul class="cate_prd_list">
									
									
									
									
										
											<li>
												
												<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000170328&amp;dispCatNo=90000010001&amp;trackingCd=Home_Planshop3&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Planshop3" class="prd_thumb goodsList" data-ref-goodsNo="A000000170328" data-attr="홈^인기행사만 모았어요^[어워즈기획]클리오 비건웨어 헬시글로우 쿠션 기획세트(리필+손거울 증정기획)^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="004" data-trk="null" data-impression="A000000170328^홈_인기행사만 모았어요^1"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017032838koe743.jpg?l=ko" alt="[어워즈기획]클리오 비건웨어 헬시글로우 쿠션 기획세트(리필+손거울 증정기획)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Planshop3" class="goodsList" data-ref-goodsNo="A000000170328" data-attr="홈^인기행사만 모았어요^[어워즈기획]클리오 비건웨어 헬시글로우 쿠션 기획세트(리필+손거울 증정기획)^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="004" data-trk="null"><span class="tx_brand">비건웨어</span><p class="tx_name">[어워즈기획]클리오 비건웨어 헬시글로우 쿠션 기획세트(리필+손거울 증정기획)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000170328">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">45,000</span>원 </span><span class="tx_cur"><span class="tx_num">29,300</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:88.0%">10점만점에 5.5점</span></span>(523)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000170328" data-ref-dispCatNo="90000010001" data-ref-itemNo="004">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

												
											</li>
										
									
										
											<li>
												
												<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000163908&amp;dispCatNo=90000010001&amp;trackingCd=Home_Planshop3&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Planshop3" class="prd_thumb goodsList" data-ref-goodsNo="A000000163908" data-attr="홈^인기행사만 모았어요^[NEW] 클리오 비건웨어 UV 세팅 프라이머^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000163908^홈_인기행사만 모았어요^2"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0016/A00000016390805koe743.jpg?l=ko" alt="[NEW] 클리오 비건웨어 UV 세팅 프라이머" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Planshop3" class="goodsList" data-ref-goodsNo="A000000163908" data-attr="홈^인기행사만 모았어요^[NEW] 클리오 비건웨어 UV 세팅 프라이머^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">비건웨어</span><p class="tx_name">[NEW] 클리오 비건웨어 UV 세팅 프라이머</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000163908">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">32,000</span>원 </span><span class="tx_cur"><span class="tx_num">19,760</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag coupon">쿠폰</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:92.0%">10점만점에 5.5점</span></span>(448)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000163908" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

												
											</li>
										
									
										
									
								</ul>
								
							</div>
						
					
						
						
							
						
						
							<div class="slider_unit  right">
								
								
								
									
										
										
											
										
										
										<div class="plan_top">
											<div class="plan_banner" style="background-image:url('${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/categoryBanner/8926052491855439024.jpg');">
												<a href="javascript:common.link.movePlanShop('500000102150121', 'Home_Planshop3_PROD');" data-ref-dispCatNo="500000102150121" data-tracking-cd="Home_Planshop3_PROD" data-attr="홈^인기행사기획전상세^더툴랩^4"  data-trk="/"  data-attr-imp-goodsno="A000000175617">
													<p>
														<strong class="tit" style="color:#000000;">연말 무드를 더해 줄 
</strong>
														<strong class="tit" style="color:#000000;">메이크업 툴 모음 
</strong>
														<span class="desc" style="color:#000000;">#더툴랩</span>
													</p>
												</a>
											</div>
										</div>
										
										
										
									
								
								
								<ul class="cate_prd_list">
									
									
									
									
										
											<li>
												
												<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000107181&amp;dispCatNo=90000010001&amp;trackingCd=Home_Planshop3&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Planshop3" class="prd_thumb goodsList" data-ref-goodsNo="A000000107181" data-attr="홈^인기행사만 모았어요^더툴랩 101 멀티태스커 파운데이션 베이스 메이크업 브러쉬 3종 택1^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="003" data-trk="null" data-impression="A000000107181^홈_인기행사만 모았어요^1"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0010/A00000010718118koe743.jpg?l=ko" alt="더툴랩 101 멀티태스커 파운데이션 베이스 메이크업 브러쉬 3종 택1" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Planshop3" class="goodsList" data-ref-goodsNo="A000000107181" data-attr="홈^인기행사만 모았어요^더툴랩 101 멀티태스커 파운데이션 베이스 메이크업 브러쉬 3종 택1^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="003" data-trk="null"><span class="tx_brand">더툴랩</span><p class="tx_name">더툴랩 101 멀티태스커 파운데이션 베이스 메이크업 브러쉬 3종 택1</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000107181">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">25,000</span>원 ~</span><span class="tx_cur"><span class="tx_num">22,500</span>원 ~</span></p><p class="prd_flag"><span class="icon_flag coupon">쿠폰</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:94.0%">10점만점에 5.5점</span></span>(122)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000107181" data-ref-dispCatNo="90000010001" data-ref-itemNo="003">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

												
											</li>
										
									
										
											<li>
												
												<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000159240&amp;dispCatNo=90000010001&amp;trackingCd=Home_Planshop3&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Planshop3" class="prd_thumb goodsList" data-ref-goodsNo="A000000159240" data-attr="홈^인기행사만 모았어요^[단독기획] 더툴랩 슈퍼 소프트 NBR 메이크업 스펀지 3종 택1^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000159240^홈_인기행사만 모았어요^2"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0015/A00000015924020koe743.jpg?l=ko" alt="[단독기획] 더툴랩 슈퍼 소프트 NBR 메이크업 스펀지 3종 택1" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Planshop3" class="goodsList" data-ref-goodsNo="A000000159240" data-attr="홈^인기행사만 모았어요^[단독기획] 더툴랩 슈퍼 소프트 NBR 메이크업 스펀지 3종 택1^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">더툴랩</span><p class="tx_name">[단독기획] 더툴랩 슈퍼 소프트 NBR 메이크업 스펀지 3종 택1</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000159240">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">7,000</span>원 </span><span class="tx_cur"><span class="tx_num">6,300</span>원 </span></p><p class="prd_flag"><span class="icon_flag coupon">쿠폰</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:80.0%">10점만점에 5.5점</span></span>(14)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000159240" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

												
											</li>
										
									
										
									
										
									
										
									
										
									
										
									
								</ul>
								
							</div>
						
					
						
						
						
							<div class="slider_unit ">
								
								
								
									
										
										
											
										
										
										<div class="plan_top">
											<div class="plan_banner" style="background-image:url('${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.krth }/resources/image/image.oliveyoung.co.kr/uploads/images/categoryBanner/7083690539376997516.jpg');">
												<a href="javascript:common.link.movePlanShop('500000102140203', 'Home_Planshop3_PROD');" data-ref-dispCatNo="500000102140203" data-tracking-cd="Home_Planshop3_PROD" data-attr="홈^인기행사기획전상세^굿바이 바디각질^5"  data-trk="/"  data-attr-imp-goodsno="A000000175617">
													<p>
														<strong class="tit" style="color:#000000;">MD가 제안하는
</strong>
														<strong class="tit" style="color:#000000;">매끈바디 관리루틴
</strong>
														<span class="desc" style="color:#000000;">#굿바이바디각질</span>
													</p>
												</a>
											</div>
										</div>
										
										
										
									
								
								
								<ul class="cate_prd_list">
									
									
									
									
										
											<li>
												
												<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000107604&amp;dispCatNo=90000010001&amp;trackingCd=Home_Planshop3&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Planshop3" class="prd_thumb goodsList" data-ref-goodsNo="A000000107604" data-attr="홈^인기행사만 모았어요^[올영단독] 닥터자르트 세라마이딘 바디오일 250ml^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000107604^홈_인기행사만 모았어요^1"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0010/A00000010760402koe743.jpg?l=ko" alt="[올영단독] 닥터자르트 세라마이딘 바디오일 250ml" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Planshop3" class="goodsList" data-ref-goodsNo="A000000107604" data-attr="홈^인기행사만 모았어요^[올영단독] 닥터자르트 세라마이딘 바디오일 250ml^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">닥터자르트</span><p class="tx_name">[올영단독] 닥터자르트 세라마이딘 바디오일 250ml</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000107604">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">25,000</span>원 </span><span class="tx_cur"><span class="tx_num">16,900</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag coupon">쿠폰</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:94.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000107604" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

												
											</li>
										
									
										
											<li>
												
												<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000148549&amp;dispCatNo=90000010001&amp;trackingCd=Home_Planshop3&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Planshop3" class="prd_thumb goodsList" data-ref-goodsNo="A000000148549" data-attr="홈^인기행사만 모았어요^[5년연속 1위 바디스크럽] 트리헛 시어 슈가 스크럽 510g 9종 택1^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000148549^홈_인기행사만 모았어요^2"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0014/A00000014854940koe743.jpg?l=ko" alt="[5년연속 1위 바디스크럽] 트리헛 시어 슈가 스크럽 510g 9종 택1" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Planshop3" class="goodsList" data-ref-goodsNo="A000000148549" data-attr="홈^인기행사만 모았어요^[5년연속 1위 바디스크럽] 트리헛 시어 슈가 스크럽 510g 9종 택1^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">트리헛</span><p class="tx_name">[5년연속 1위 바디스크럽] 트리헛 시어 슈가 스크럽 510g 9종 택1</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000148549">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">22,500</span>원 ~</span><span class="tx_cur"><span class="tx_num">17,100</span>원 ~</span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag coupon">쿠폰</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:96.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000148549" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

												
											</li>
										
									
										
									
										
									
								</ul>
								
							</div>
						
					
						
						
							
						
						
							<div class="slider_unit  right">
								
								
								
									
										
										
											
										
										
										<div class="plan_top">
											<div class="plan_banner" style="background-image:url('${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/categoryBanner/8468435535256789022.jpg');">
												<a href="javascript:common.link.movePlanShop('500000101780284', 'Home_Planshop3_PROD');" data-ref-dispCatNo="500000101780284" data-tracking-cd="Home_Planshop3_PROD" data-attr="홈^인기행사기획전상세^연말선물은향수^6"  data-trk="/"  data-attr-imp-goodsno="A000000175617">
													<p>
														<strong class="tit" style="color:#000000;">GOOD BUY 2022
</strong>
														<strong class="tit" style="color:#000000;">향기로운 끌로에&CK
</strong>
														<span class="desc" style="color:#000000;">#추가증정 #단독기획</span>
													</p>
												</a>
											</div>
										</div>
										
										
										
									
								
								
								<ul class="cate_prd_list">
									
									
									
									
										
											<li>
												
												<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000176663&amp;dispCatNo=90000010001&amp;trackingCd=Home_Planshop3&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Planshop3" class="prd_thumb goodsList" data-ref-goodsNo="A000000176663" data-attr="홈^인기행사만 모았어요^[12월 올영픽] 끌로에 EDP 50ml 기획(본품+파우치 추가증정)^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000176663^홈_인기행사만 모았어요^1"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017666302koe743.jpg?l=ko" alt="[12월 올영픽] 끌로에 EDP 50ml 기획(본품+파우치 추가증정)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Planshop3" class="goodsList" data-ref-goodsNo="A000000176663" data-attr="홈^인기행사만 모았어요^[12월 올영픽] 끌로에 EDP 50ml 기획(본품+파우치 추가증정)^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">끌로에</span><p class="tx_name">[12월 올영픽] 끌로에 EDP 50ml 기획(본품+파우치 추가증정)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000176663">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">150,000</span>원 </span><span class="tx_cur"><span class="tx_num">118,000</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag coupon">쿠폰</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:96.0%">10점만점에 5.5점</span></span>(243)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000176663" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

												
											</li>
										
									
										
											<li>
												
												<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000176664&amp;dispCatNo=90000010001&amp;trackingCd=Home_Planshop3&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Planshop3" class="prd_thumb goodsList" data-ref-goodsNo="A000000176664" data-attr="홈^인기행사만 모았어요^[12월 올영픽] CK 캘빈클라인 One EDT 100ml 기획(샤워젤 100ml+미니어처 15ml 기획)^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000176664^홈_인기행사만 모았어요^2"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017666401koe743.jpg?l=ko" alt="[12월 올영픽] CK 캘빈클라인 One EDT 100ml 기획(샤워젤 100ml+미니어처 15ml 기획)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Planshop3" class="goodsList" data-ref-goodsNo="A000000176664" data-attr="홈^인기행사만 모았어요^[12월 올영픽] CK 캘빈클라인 One EDT 100ml 기획(샤워젤 100ml+미니어처 15ml 기획)^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">캘빈클라인</span><p class="tx_name">[12월 올영픽] CK 캘빈클라인 One EDT 100ml 기획(샤워젤 100ml+미니어처 15ml 기획)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000176664">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">85,000</span>원 </span><span class="tx_cur"><span class="tx_num">63,700</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:96.0%">10점만점에 5.5점</span></span>(623)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000176664" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

												
											</li>
										
									
										
									
										
									
										
									
										
									
								</ul>
								
							</div>
						
					
						
						
						
							<div class="slider_unit ">
								
								
								
									
										
										
										
										<div class="plan_top">
											<div class="plan_banner" style="background-image:url('${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/categoryBanner/8122541907646698747.jpg');">
												<a href="javascript:common.link.movePlanShop('500000102610030', 'Home_Planshop3_PROD');" data-ref-dispCatNo="500000102610030" data-tracking-cd="Home_Planshop3_PROD" data-attr="홈^인기행사기획전상세^연말GIFT^7"  data-trk="/"  data-attr-imp-goodsno="A000000175617">
													<p>
														<strong class="tit" style="color:#ffffff;">새롭게 출발해요
</strong>
														<strong class="tit" style="color:#ffffff;">사랑을 담아, 2023
</strong>
														<span class="desc" style="color:#ffffff;">라이프&홈 BEST</span>
													</p>
												</a>
											</div>
										</div>
										
										
										
									
								
								
								<ul class="cate_prd_list">
									
									
									
									
										
											<li>
												
												<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000146003&amp;dispCatNo=90000010001&amp;trackingCd=Home_Planshop3&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Planshop3" class="prd_thumb goodsList" data-ref-goodsNo="A000000146003" data-attr="홈^인기행사만 모았어요^순백수 편백 스프레이 시리즈 5종 택1^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="013" data-trk="null" data-impression="A000000146003^홈_인기행사만 모았어요^1"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0014/A00000014600303koe743.jpg?l=ko" alt="순백수 편백 스프레이 시리즈 5종 택1" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Planshop3" class="goodsList" data-ref-goodsNo="A000000146003" data-attr="홈^인기행사만 모았어요^순백수 편백 스프레이 시리즈 5종 택1^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="013" data-trk="null"><span class="tx_brand">순백수</span><p class="tx_name">순백수 편백 스프레이 시리즈 5종 택1</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000146003">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">18,900</span>원 ~</span><span class="tx_cur"><span class="tx_num">10,900</span>원 ~</span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag coupon">쿠폰</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:94.0%">10점만점에 5.5점</span></span>(736)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000146003" data-ref-dispCatNo="90000010001" data-ref-itemNo="013">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

												
											</li>
										
									
										
											<li>
												
												<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=B000000178474&amp;dispCatNo=90000010001&amp;trackingCd=Home_Planshop3&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Planshop3" class="prd_thumb goodsList" data-ref-goodsNo="B000000178474" data-attr="홈^인기행사만 모았어요^마켓올슨 런드리세트(세탁세제 485ml+섬유유연제 485ml) + 쇼핑백^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="B000000178474^홈_인기행사만 모았어요^2"><span class="thumb_flag new">신상</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/B00000017847401koe743.jpg?l=ko" alt="마켓올슨 런드리세트(세탁세제 485ml+섬유유연제 485ml) + 쇼핑백" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Planshop3" class="goodsList" data-ref-goodsNo="B000000178474" data-attr="홈^인기행사만 모았어요^마켓올슨 런드리세트(세탁세제 485ml+섬유유연제 485ml) + 쇼핑백^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">마켓올슨</span><p class="tx_name">마켓올슨 런드리세트(세탁세제 485ml+섬유유연제 485ml) + 쇼핑백</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="B000000178474">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">36,000</span>원 </span><span class="tx_cur"><span class="tx_num">32,400</span>원 </span></p><p class="prd_flag"><span class="icon_flag coupon">쿠폰</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:%">10점만점에 5.5점</span></span></p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="B000000178474" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

												
											</li>
										
									
										
									
										
									
										
									
								</ul>
								
							</div>
						
					
						
						
							
						
						
							<div class="slider_unit  right">
								
								
								
									
										
										
											
										
										
										<div class="plan_top">
											<div class="plan_banner" style="background-image:url('${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/categoryBanner/2495662060808262042.jpg');">
												<a href="javascript:common.link.movePlanShop('500000101510217', 'Home_Planshop3_PROD');" data-ref-dispCatNo="500000101510217" data-tracking-cd="Home_Planshop3_PROD" data-attr="홈^인기행사기획전상세^겨울엔온열용품^8"  data-trk="/"  data-attr-imp-goodsno="A000000175617">
													<p>
														<strong class="tit" style="color:#000000;">연말엔 온열용품!
</strong>
														<strong class="tit" style="color:#000000;">최대 ~32% 할인
</strong>
														<span class="desc" style="color:#000000;">#핫팩 #아이마스크</span>
													</p>
												</a>
											</div>
										</div>
										
										
										
									
								
								
								<ul class="cate_prd_list">
									
									
									
									
										
											<li>
												
												<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000161566&amp;dispCatNo=90000010001&amp;trackingCd=Home_Planshop3&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Planshop3" class="prd_thumb goodsList" data-ref-goodsNo="A000000161566" data-attr="홈^인기행사만 모았어요^스팀베이스 데일리 아이마스크 15매입 3종 (3가지향 택1)^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000161566^홈_인기행사만 모았어요^1"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0016/A00000016156604koe743.jpg?l=ko" alt="스팀베이스 데일리 아이마스크 15매입 3종 (3가지향 택1)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Planshop3" class="goodsList" data-ref-goodsNo="A000000161566" data-attr="홈^인기행사만 모았어요^스팀베이스 데일리 아이마스크 15매입 3종 (3가지향 택1)^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">스팀베이스</span><p class="tx_name">스팀베이스 데일리 아이마스크 15매입 3종 (3가지향 택1)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000161566">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">17,900</span>원 ~</span><span class="tx_cur"><span class="tx_num">15,300</span>원 ~</span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag coupon">쿠폰</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:92.0%">10점만점에 5.5점</span></span>(145)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000161566" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

												
											</li>
										
									
										
											<li>
												
												<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=B000000166327&amp;dispCatNo=90000010001&amp;trackingCd=Home_Planshop3&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Planshop3" class="prd_thumb goodsList" data-ref-goodsNo="B000000166327" data-attr="홈^인기행사만 모았어요^[업체배송]휴플러스 코드제로 눈 마사지기 CORDZERO-EL1 (온)^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="B000000166327^홈_인기행사만 모았어요^2"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0016/B00000016632701koe743.jpg?l=ko" alt="[업체배송]휴플러스 코드제로 눈 마사지기 CORDZERO-EL1 (온)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Planshop3" class="goodsList" data-ref-goodsNo="B000000166327" data-attr="홈^인기행사만 모았어요^[업체배송]휴플러스 코드제로 눈 마사지기 CORDZERO-EL1 (온)^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">휴플러스</span><p class="tx_name">[업체배송]휴플러스 코드제로 눈 마사지기 CORDZERO-EL1 (온)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="B000000166327">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">49,900</span>원 </span><span class="tx_cur"><span class="tx_num">39,900</span>원 </span></p><p class="prd_flag"><span class="icon_flag coupon">쿠폰</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:96.0%">10점만점에 5.5점</span></span>(5)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="B000000166327" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

												
											</li>
										
									
										
									
										
									
								</ul>
								
							</div>
						
					
						
						
						
					
					
				</div>
			</div>
			<div class="banner_paging"></div>
			<span class="slick-prev prev" id="plan_prev">prev</span>
			<span class="slick-next next" id="plan_next">next</span>
		</div>
		
		

		
		
		
		

		<!-- 메인 꾸밈영역 -->
		<div class="main_design_area">
			<div class="left_area"></div>
			<div class="right_area"></div>
		</div>
		<!--// 메인 꾸밈영역 -->

		<!-- catchKeyword -->
		
		
			

			
				

				
					
						
						
							
							
							
							

							<div class="catch_keyword_wrap">
								<h3 class="main_sub_tit"><strong>Catch Keyword</strong></h3>
								<div class="catch_keyword_slide">
									<ul class="slide_list slick_slider" id="catch_keyword" style="display: none;">
										
											
											<li>
												<ul class="keyword_banner">
											
													<li class="keyword_items">
														<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000102250054&amp;trackingCd=Home_Catchkeyword"
														   data-attr="홈^catchkeyword^캐치 탄력" data-trk="/">
															<div class="keyword_thumb">
																<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/340/9178477056191998596.jpg" alt="캐치 탄력" />
															</div>
															<div class="keyword_title"><strong>연말 검색량 50% 상승, 탄력
</strong></div>
															<div class="keyword_sub_title">힘 없이 축 처진 피부, 속부터 꽉 채워볼까요</div>
														</a>
													</li>
											
										
											
													<li class="keyword_items">
														<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000102250053&amp;trackingCd=Home_Catchkeyword"
														   data-attr="홈^catchkeyword^캐치 입욕제" data-trk="/">
															<div class="keyword_thumb">
																<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/340/2340362392685530245.jpg" alt="캐치 입욕제" />
															</div>
															<div class="keyword_title"><strong>매일 1,000번씩 검색되는 입욕제
</strong></div>
															<div class="keyword_sub_title">추운 마음도 사르르 녹이는 입욕제 소개해요</div>
														</a>
													</li>
											
												</ul>
											</li>
											
										
											
											<li>
												<ul class="keyword_banner">
											
													<li class="keyword_items">
														<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000102250007&amp;trackingCd=Home_Catchkeyword"
														   data-attr="홈^catchkeyword^캐치 핫팩" data-trk="/">
															<div class="keyword_thumb">
																<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/340/6434119825186844008.jpg" alt="캐치 핫팩" />
															</div>
															<div class="keyword_title"><strong>겨울철 인기 검색어 '핫팩'
</strong></div>
															<div class="keyword_sub_title">캠핑용 핫팩부터 온열기기까지 다 모았어요</div>
														</a>
													</li>
											
										
											
													<li class="keyword_items">
														<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000102250045&amp;trackingCd=Home_Catchkeyword"
														   data-attr="홈^catchkeyword^캐치 입냄새" data-trk="/">
															<div class="keyword_thumb">
																<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/340/6316547511827164108.jpg" alt="캐치 입냄새" />
															</div>
															<div class="keyword_title"><strong>매일 1,500번씩 검색되는 입냄새
</strong></div>
															<div class="keyword_sub_title">마스크 속 텁텁한 구취, 상쾌하게 물리쳐요</div>
														</a>
													</li>
											
												</ul>
											</li>
											
										
											
											<li>
												<ul class="keyword_banner">
											
													<li class="keyword_items">
														<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000102250047&amp;trackingCd=Home_Catchkeyword"
														   data-attr="홈^catchkeyword^캐치 가려움" data-trk="/">
															<div class="keyword_thumb">
																<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/340/7871912913729016227.jpg" alt="캐치 가려움" />
															</div>
															<div class="keyword_title"><strong>12월 4주 급상승 검색어, 가려움
</strong></div>
															<div class="keyword_sub_title">자꾸 긁지마세요. 보습과 장벽을 먼저 케어해요.</div>
														</a>
													</li>
											
										
											
													<li class="keyword_items">
														<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000102250048&amp;trackingCd=Home_Catchkeyword"
														   data-attr="홈^catchkeyword^캐치 뒷꿈치" data-trk="/">
															<div class="keyword_thumb">
																<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/340/8480117712264329238.jpg" alt="캐치 뒷꿈치" />
															</div>
															<div class="keyword_title"><strong>검색량 2배 증가, 뒷꿈치
</strong></div>
															<div class="keyword_sub_title">폭신한 이불 속 까끌거리는 뒷꿈치가 느껴질 때</div>
														</a>
													</li>
											
												</ul>
											</li>
											
										
											
											<li>
												<ul class="keyword_banner">
											
													<li class="keyword_items">
														<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000102250050&amp;trackingCd=Home_Catchkeyword"
														   data-attr="홈^catchkeyword^캐치 머스크" data-trk="/">
															<div class="keyword_thumb">
																<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/340/2285274117427962363.jpg" alt="캐치 머스크" />
															</div>
															<div class="keyword_title"><strong>연말 급상승 검색어, 머스크
</strong></div>
															<div class="keyword_sub_title">새로 산 코트에 잘 어울리는 향기를 찾고 있다면</div>
														</a>
													</li>
											
										
											
													<li class="keyword_items">
														<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000102250044&amp;trackingCd=Home_Catchkeyword"
														   data-attr="홈^catchkeyword^캐치 머릿결" data-trk="/">
															<div class="keyword_thumb">
																<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/340/8802080824482896502.jpg" alt="캐치 머릿결" />
															</div>
															<div class="keyword_title"><strong>하루 3,000번 검색되는 머릿결
</strong></div>
															<div class="keyword_sub_title">부스스한 머릿결도 물미역 만드는 꿀템 소개해요</div>
														</a>
													</li>
											
												</ul>
											</li>
											
										
											
											<li>
												<ul class="keyword_banner">
											
													<li class="keyword_items">
														<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000102250046&amp;trackingCd=Home_Catchkeyword"
														   data-attr="홈^catchkeyword^캐치 수부지" data-trk="/">
															<div class="keyword_thumb">
																<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/340/7837358497072274537.jpg" alt="캐치 수부지" />
															</div>
															<div class="keyword_title"><strong>환절기 인기 검색어, 수부지
</strong></div>
															<div class="keyword_sub_title">수부지 살리는 구원템 다 모아봤어요</div>
														</a>
													</li>
											
										
											
													<li class="keyword_items">
														<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000102250052&amp;trackingCd=Home_Catchkeyword"
														   data-attr="홈^catchkeyword^캐치 오일" data-trk="/">
															<div class="keyword_thumb">
																<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/340/4413399877340296109.jpg" alt="캐치 오일" />
															</div>
															<div class="keyword_title"><strong>겨울철 검색 TOP 100, 오일
</strong></div>
															<div class="keyword_sub_title">발라도 발라도 건조할 때는 오일 보습막이 답!</div>
														</a>
													</li>
											
												</ul>
											</li>
											
										
									</ul>
								</div>

								
								<div class="btn_box">
									<button type="button" class="btn" id="btn_catch_keyword" data-attr="홈^catchkeyword_더보기^더보기" data-trk="/">
										다른 키워드 더보기
										<em class="num" data-attr="홈^catchkeyword_더보기^더보기" data-trk="/">
											<span class="current" data-attr="홈^catchkeyword_더보기^더보기" data-trk="/"
												  data-current-page="1" data-total-page="5">1</span>5
										</em>
									</button>
								</div>
								
							</div>
						
					
				
			
		
		<!--// catchKeyword -->

		
		
		
		
		

		
			
				<div class="main_onlyone_wrap">
					<h3 class="main_sub_tit">오직 올리브영에서만</h3>
					<div class="banner_wrap slick_slider" id="OnlyoneSlider">
						
							
								<div>
									
									
									<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000101730145&amp;trackingCd=Home_Onlyone" class="onlyone_box" data-attr="홈^온리원관오직올리브영에서만^웨이크메이크x컬러그램_황동화^1" data-trk="/">
										<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/6/1518724697511382005.jpg" alt="웨이크메이크x컬러그램_황동화" />
										
										<div class="txt" style="color:#000000">
											
											
											
											
												<strong class="title">컬러그램</strong>
												
													<strong class="title">웨이크메이크</strong>
												
												<span class="desc">반짝이는 연말메이크업</span>
											
										</div>
									</a>
								</div>
							
							
						
							
								<div>
									
									
									<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000101890065&amp;trackingCd=Home_Onlyone" class="onlyone_box" data-attr="홈^온리원관오직올리브영에서만^라운드어라운드_박성은^2" data-trk="/">
										<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/6/1331239465379758361.jpg" alt="라운드어라운드_박성은" />
										
										<div class="txt" style="color:#FFFFFF">
											
											
											
											
												<strong class="title">마음까지 촉촉한
</strong>
												
													<strong class="title">바디 보습 기프트</strong>
												
												<span class="desc">선물로 찜! 최대 50% OFF</span>
											
										</div>
									</a>
								</div>
							
							
						
							
								<div>
									
									
									<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000101880238&amp;trackingCd=Home_Onlyone" class="onlyone_box" data-attr="홈^온리원관오직올리브영에서만^123-3105_최지현^3" data-trk="/">
										<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/6/5981745503257191616.jpg" alt="123-3105_최지현" />
										
										<div class="txt" style="color:#FFFFFF">
											
											
											
											
												<strong class="title">MERRY</strong>
												
													<strong class="title">DELIGHT</strong>
												
												<span class="desc">MAX40% 특가</span>
											
										</div>
									</a>
								</div>
							
							
						
							
								<div>
									
									
									<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000101740067&amp;trackingCd=Home_Onlyone" class="onlyone_box" data-attr="홈^온리원관오직올리브영에서만^필리밀리_유지나^4" data-trk="/">
										<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/6/6764652632243002936.jpg" alt="필리밀리_유지나" />
										
										<div class="txt" style="color:#000000">
											
											
											
											
												<strong class="title">필리밀리
</strong>
												
													<strong class="title">대용량 특가대전!</strong>
												
												<span class="desc">연말에는 사야한다!</span>
											
										</div>
									</a>
								</div>
							
							
						
							
								<div>
									
									
									<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000101700096&amp;trackingCd=Home_Onlyone" class="onlyone_box" data-attr="홈^온리원관오직올리브영에서만^PB연합_임용성^5" data-trk="/">
										<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/6/3813874780963327964.jpg" alt="PB연합_임용성" />
										
										<div class="txt" style="color:#FFFFFF">
											
											
											
											
												<strong class="title">굿 BUY 스킨케어
</strong>
												
													<strong class="title">고민별 BEST템
</strong>
												
												<span class="desc">최대 40% 할인!</span>
											
										</div>
									</a>
								</div>
							
							
						
							
								<div>
									
									
									<a href="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000101710081&amp;trackingCd=Home_Onlyone" class="onlyone_box" data-attr="홈^온리원관오직올리브영에서만^브링그린_윤영선^6" data-trk="/">
										<img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000010001/6/5762204326916732457.jpg" alt="브링그린_윤영선" />
										
										<div class="txt" style="color:#000000">
											
											
											
											
												<strong class="title">피부 고민별
</strong>
												
													<strong class="title">맞춤 마스크팩!
</strong>
												
												<span class="desc">할인 혜택까지!</span>
											
										</div>
									</a>
								</div>
							
							
								
							
						
					</div>
				</div>
				
			
		

		
		
		
		
		

		
		<h3 class="main_sub_tit"><strong>이 상품 어때요?</strong></h3>
		<div class="main_recomm_wrap" id="mainReComSlider">

			
				
			
			
			
				
					
						<div>
						<ul class="cate_prd_list no_line">
					
					<li class="flag">
						
						<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000170878&amp;dispCatNo=90000010001&amp;trackingCd=Home_Recommand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Recommand" class="prd_thumb goodsList" data-ref-goodsNo="A000000170878" data-attr="홈^이상품어때요^[12월 올영픽][미노이PICK/미노이QR카드] 줄라이미 페르소나 퍼퓸 50ml 단품/기획 6종 택1^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="002" data-trk="null" data-impression="A000000170878^홈_이상품어때요^1"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017087813koe743.jpg?l=ko" alt="[12월 올영픽][미노이PICK/미노이QR카드] 줄라이미 페르소나 퍼퓸 50ml 단품/기획 6종 택1" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Recommand" class="goodsList" data-ref-goodsNo="A000000170878" data-attr="홈^이상품어때요^[12월 올영픽][미노이PICK/미노이QR카드] 줄라이미 페르소나 퍼퓸 50ml 단품/기획 6종 택1^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="002" data-trk="null"><span class="tx_brand">줄라이미</span><p class="tx_name">[12월 올영픽][미노이PICK/미노이QR카드] 줄라이미 페르소나 퍼퓸 50ml 단품/기획 6종 택1</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000170878">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">49,000</span>원 ~</span><span class="tx_cur"><span class="tx_num">39,900</span>원 ~</span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag coupon">쿠폰</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:98.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000170878" data-ref-dispCatNo="90000010001" data-ref-itemNo="002">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

					</li>
					
					
					
					
				
			
				
					
					<li class="flag">
						
						<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000176990&amp;dispCatNo=90000010001&amp;trackingCd=Home_Recommand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Recommand" class="prd_thumb goodsList" data-ref-goodsNo="A000000176990" data-attr="홈^이상품어때요^[빈지노PICK][NEW] 그라펜 타투 퍼퓸 레몬 50ml^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000176990^홈_이상품어때요^2"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017699001koe743.jpg?l=ko" alt="[빈지노PICK][NEW] 그라펜 타투 퍼퓸 레몬 50ml" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Recommand" class="goodsList" data-ref-goodsNo="A000000176990" data-attr="홈^이상품어때요^[빈지노PICK][NEW] 그라펜 타투 퍼퓸 레몬 50ml^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">그라펜</span><p class="tx_name">[빈지노PICK][NEW] 그라펜 타투 퍼퓸 레몬 50ml</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000176990">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">39,000</span>원 </span><span class="tx_cur"><span class="tx_num">35,100</span>원 </span></p><p class="prd_flag"><span class="icon_flag coupon">쿠폰</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:100.0%">10점만점에 5.5점</span></span>(1)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000176990" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

					</li>
					
					
					
					
				
			
				
					
					<li class="flag">
						
						<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000176293&amp;dispCatNo=90000010001&amp;trackingCd=Home_Recommand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Recommand" class="prd_thumb goodsList" data-ref-goodsNo="A000000176293" data-attr="홈^이상품어때요^[2022 어워즈] 가히 멀티밤 리필형 기획세트 (본품 9g+리필 9g)^3" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000176293^홈_이상품어때요^3"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017629306koe743.jpg?l=ko" alt="[2022 어워즈] 가히 멀티밤 리필형 기획세트 (본품 9g+리필 9g)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Recommand" class="goodsList" data-ref-goodsNo="A000000176293" data-attr="홈^이상품어때요^[2022 어워즈] 가히 멀티밤 리필형 기획세트 (본품 9g+리필 9g)^3" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">가히</span><p class="tx_name">[2022 어워즈] 가히 멀티밤 리필형 기획세트 (본품 9g+리필 9g)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000176293">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">74,000</span>원 </span><span class="tx_cur"><span class="tx_num">49,000</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:96.0%">10점만점에 5.5점</span></span>(259)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000176293" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

					</li>
					
					
					
					
				
			
				
					
					<li class="flag">
						
						<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000174024&amp;dispCatNo=90000010001&amp;trackingCd=Home_Recommand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Recommand" class="prd_thumb goodsList" data-ref-goodsNo="A000000174024" data-attr="홈^이상품어때요^[이선빈PICK/OY단독] 메디온 밸런스젤 150ml 기획세트(+5ml*10ea)^4" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000174024^홈_이상품어때요^4"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017402402koe743.jpg?l=ko" alt="[이선빈PICK/OY단독] 메디온 밸런스젤 150ml 기획세트(+5ml*10ea)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Recommand" class="goodsList" data-ref-goodsNo="A000000174024" data-attr="홈^이상품어때요^[이선빈PICK/OY단독] 메디온 밸런스젤 150ml 기획세트(+5ml*10ea)^4" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">메디온</span><p class="tx_name">[이선빈PICK/OY단독] 메디온 밸런스젤 150ml 기획세트(+5ml*10ea)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000174024">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">28,900</span>원 ~</span><span class="tx_cur"><span class="tx_num">20,900</span>원 ~</span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:96.0%">10점만점에 5.5점</span></span>(48)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000174024" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

					</li>
					
					
						</ul>
						</div>
					
					
					
				
			
				
					
						<div>
						<ul class="cate_prd_list no_line">
					
					<li class="flag">
						
						<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000175617&amp;dispCatNo=90000010001&amp;trackingCd=Home_Recommand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Recommand" class="prd_thumb goodsList" data-ref-goodsNo="A000000175617" data-attr="홈^이상품어때요^[어워즈한정]오쏘몰 이뮨 멀티비타민&미네랄 14+1입 추가증정(위클리 플래너 증정)^5" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000175617^홈_이상품어때요^5"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017561702koe743.jpg?l=ko" alt="[어워즈한정]오쏘몰 이뮨 멀티비타민&미네랄 14+1입 추가증정(위클리 플래너 증정)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Recommand" class="goodsList" data-ref-goodsNo="A000000175617" data-attr="홈^이상품어때요^[어워즈한정]오쏘몰 이뮨 멀티비타민&미네랄 14+1입 추가증정(위클리 플래너 증정)^5" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">오쏘몰</span><p class="tx_name">[어워즈한정]오쏘몰 이뮨 멀티비타민&미네랄 14+1입 추가증정(위클리 플래너 증정)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000175617">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">75,000</span>원 </span><span class="tx_cur"><span class="tx_num">61,500</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:96.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000175617" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

					</li>
					
					
					
					
				
			
				
					
					<li class="flag">
						
						<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000176012&amp;dispCatNo=90000010001&amp;trackingCd=Home_Recommand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Recommand" class="prd_thumb goodsList" data-ref-goodsNo="A000000176012" data-attr="홈^이상품어때요^[2022 어워즈] 토모토모 PICK 타입넘버 N.91 핸드크림 40ml^6" data-ref-dispCatNo="90000010001" data-ref-itemNo="002" data-trk="null" data-impression="A000000176012^홈_이상품어때요^6"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017601209koe743.jpg?l=ko" alt="[2022 어워즈] 토모토모 PICK 타입넘버 N.91 핸드크림 40ml" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Recommand" class="goodsList" data-ref-goodsNo="A000000176012" data-attr="홈^이상품어때요^[2022 어워즈] 토모토모 PICK 타입넘버 N.91 핸드크림 40ml^6" data-ref-dispCatNo="90000010001" data-ref-itemNo="002" data-trk="null"><span class="tx_brand">타입넘버</span><p class="tx_name">[2022 어워즈] 토모토모 PICK 타입넘버 N.91 핸드크림 40ml</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000176012">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">12,000</span>원 </span><span class="tx_cur"><span class="tx_num">9,300</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:94.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000176012" data-ref-dispCatNo="90000010001" data-ref-itemNo="002">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

					</li>
					
					
					
					
				
			
				
					
					<li class="flag">
						
						<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000171427&amp;dispCatNo=90000010001&amp;trackingCd=Home_Recommand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Recommand" class="prd_thumb goodsList" data-ref-goodsNo="A000000171427" data-attr="홈^이상품어때요^[재찬 Pick] 메디힐 마데카소사이드 흔적 패드 더블 기획 (100매+100매 리필)^7" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000171427^홈_이상품어때요^7"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017142720koe743.jpg?l=ko" alt="[재찬 Pick] 메디힐 마데카소사이드 흔적 패드 더블 기획 (100매+100매 리필)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Recommand" class="goodsList" data-ref-goodsNo="A000000171427" data-attr="홈^이상품어때요^[재찬 Pick] 메디힐 마데카소사이드 흔적 패드 더블 기획 (100매+100매 리필)^7" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">메디힐</span><p class="tx_name">[재찬 Pick] 메디힐 마데카소사이드 흔적 패드 더블 기획 (100매+100매 리필)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000171427">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">39,900</span>원 </span><span class="tx_cur"><span class="tx_num">27,900</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:92.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000171427" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

					</li>
					
					
					
					
				
			
				
					
					<li class="flag">
						
						<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000144547&amp;dispCatNo=90000010001&amp;trackingCd=Home_Recommand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Recommand" class="prd_thumb goodsList" data-ref-goodsNo="A000000144547" data-attr="홈^이상품어때요^리무브 스킨브라 4종 (스킨브라/ 플레인/ 브라이트/ 플레인 브라이트) ^8" data-ref-dispCatNo="90000010001" data-ref-itemNo="003" data-trk="null" data-impression="A000000144547^홈_이상품어때요^8"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0014/A00000014454709koe743.jpg?l=ko" alt="리무브 스킨브라 4종 (스킨브라/ 플레인/ 브라이트/ 플레인 브라이트) " onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Recommand" class="goodsList" data-ref-goodsNo="A000000144547" data-attr="홈^이상품어때요^리무브 스킨브라 4종 (스킨브라/ 플레인/ 브라이트/ 플레인 브라이트) ^8" data-ref-dispCatNo="90000010001" data-ref-itemNo="003" data-trk="null"><span class="tx_brand">리무브</span><p class="tx_name">리무브 스킨브라 4종 (스킨브라/ 플레인/ 브라이트/ 플레인 브라이트)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000144547">찜하기</button><p class="prd_price"><span class="tx_cur"><span class="tx_num">18,000</span>원 ~</span></p><p class="prd_flag"><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:94.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000144547" data-ref-dispCatNo="90000010001" data-ref-itemNo="003">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

					</li>
					
					
						</ul>
						</div>
					
					
					
				
			
				
					
						<div>
						<ul class="cate_prd_list no_line">
					
					<li class="flag">
						
						<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=B000000176040&amp;dispCatNo=90000010001&amp;trackingCd=Home_Recommand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Recommand" class="prd_thumb goodsList" data-ref-goodsNo="B000000176040" data-attr="홈^이상품어때요^(NEW) 빌리엔젤 딸기 크레이프 케이크^9" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="B000000176040^홈_이상품어때요^9"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/B00000017604004koe743.jpg?l=ko" alt="(NEW) 빌리엔젤 딸기 크레이프 케이크" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Recommand" class="goodsList" data-ref-goodsNo="B000000176040" data-attr="홈^이상품어때요^(NEW) 빌리엔젤 딸기 크레이프 케이크^9" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">빌리엔젤</span><p class="tx_name">(NEW) 빌리엔젤 딸기 크레이프 케이크</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="B000000176040">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">45,000</span>원 </span><span class="tx_cur"><span class="tx_num">36,000</span>원 </span></p><p class="prd_flag"><span class="icon_flag coupon">쿠폰</span><span class="icon_flag free">무배</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:96.0%">10점만점에 5.5점</span></span>(13)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="B000000176040" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

					</li>
					
					
					
					
				
			
				
					
					<li class="flag">
						
						<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000175960&amp;dispCatNo=90000010001&amp;trackingCd=Home_Recommand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Recommand" class="prd_thumb goodsList" data-ref-goodsNo="A000000175960" data-attr="홈^이상품어때요^[1+1 기획] MAC 립스틱 1+1 기획 2종^10" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000175960^홈_이상품어때요^10"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017596001koe743.jpg?l=ko" alt="[1+1 기획] MAC 립스틱 1+1 기획 2종" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Recommand" class="goodsList" data-ref-goodsNo="A000000175960" data-attr="홈^이상품어때요^[1+1 기획] MAC 립스틱 1+1 기획 2종^10" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">맥</span><p class="tx_name">[1+1 기획] MAC 립스틱 1+1 기획 2종</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000175960">찜하기</button><p class="prd_price"><span class="tx_cur"><span class="tx_num">36,000</span>원 </span></p><p class="prd_flag"><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:94.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000175960" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

					</li>
					
					
					
					
				
			
				
					
					<li class="flag">
						
						<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=B000000167981&amp;dispCatNo=90000010001&amp;trackingCd=Home_Recommand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Recommand" class="prd_thumb goodsList" data-ref-goodsNo="B000000167981" data-attr="홈^이상품어때요^셀렉스 프로핏 웨이프로틴 드링크 330ml 12입 (아메리카노/초콜릿/복숭아 택1)^11" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="B000000167981^홈_이상품어때요^11"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0016/B00000016798117koe743.jpg?l=ko" alt="셀렉스 프로핏 웨이프로틴 드링크 330ml 12입 (아메리카노/초콜릿/복숭아 택1)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Recommand" class="goodsList" data-ref-goodsNo="B000000167981" data-attr="홈^이상품어때요^셀렉스 프로핏 웨이프로틴 드링크 330ml 12입 (아메리카노/초콜릿/복숭아 택1)^11" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">셀렉스</span><p class="tx_name">셀렉스 프로핏 웨이프로틴 드링크 330ml 12입 (아메리카노/초콜릿/복숭아 택1)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="B000000167981">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">29,900</span>원 ~</span><span class="tx_cur"><span class="tx_num">23,900</span>원 ~</span></p><p class="prd_flag"><span class="icon_flag coupon">쿠폰</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:96.0%">10점만점에 5.5점</span></span>(304)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="B000000167981" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

					</li>
					
					
					
					
				
			
				
					
					<li class="flag">
						
						<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000175408&amp;dispCatNo=90000010001&amp;trackingCd=Home_Recommand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Recommand" class="prd_thumb goodsList" data-ref-goodsNo="A000000175408" data-attr="홈^이상품어때요^[어워즈 한정] 피카소 메이크업 스파츌라 어워즈 한정 기획(+스펀지6P&파우치 증정)^12" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000175408^홈_이상품어때요^12"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017540806koe743.jpg?l=ko" alt="[어워즈 한정] 피카소 메이크업 스파츌라 어워즈 한정 기획(+스펀지6P&파우치 증정)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Recommand" class="goodsList" data-ref-goodsNo="A000000175408" data-attr="홈^이상품어때요^[어워즈 한정] 피카소 메이크업 스파츌라 어워즈 한정 기획(+스펀지6P&파우치 증정)^12" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">피카소</span><p class="tx_name">[어워즈 한정] 피카소 메이크업 스파츌라 어워즈 한정 기획(+스펀지6P&파우치 증정)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000175408">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">19,000</span>원 </span><span class="tx_cur"><span class="tx_num">14,900</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:96.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000175408" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

					</li>
					
					
						</ul>
						</div>
					
					
					
				
			
				
			
				
			
				
			
				
			
		
	</div>
		
	

	
	
	
	
	

	

	
	
	
	
		<div class="mainHLifeWrap">
			<h3 class="main_sub_tit"><strong>Healthy Life</strong></h3>
			<div class="hLifeSlide">
				
					
						<div class="slideItem">
							<a href="javascript:common.wlog('home_healthy_banner' + (0 + 1));common.link.movePlanShop('500000101920070', 'Home_Healthy')"
							   data-attr="홈^헬시라이프^재즈피아니스트의 공연 라이프" data-trk="/">
								<p class="img"><span><img data-src="https://image.oliveyoung.co.kr/uploads/images/display/90000010001/289/552393567625954185.jpg" alt="12-3 재즈피아니스트"></span></p>
								<p class="txt" style="">
									<strong class="title">재즈피아니스트의 공연 라이프</strong>
									<span>생동감과 선율을 선물하는  <br>재즈라이프 소개합니다</span>
								</p>
							</a>
						</div>
					
						<div class="slideItem">
							<a href="javascript:common.wlog('home_healthy_banner' + (1 + 1));common.link.movePlanShop('500000101920069', 'Home_Healthy')"
							   data-attr="홈^헬시라이프^플라잉요가 강사 힐링 라이프" data-trk="/">
								<p class="img"><span><img data-src="https://image.oliveyoung.co.kr/uploads/images/display/90000010001/289/5895555103311082654.jpg" alt="12-2 플라잉요가"></span></p>
								<p class="txt" style="">
									<strong class="title">플라잉요가 강사 힐링 라이프</strong>
									<span>달방출연 1호 남자 플라잉 <br>요가강사 라이프를 소개합니다</span>
								</p>
							</a>
						</div>
					
						<div class="slideItem">
							<a href="javascript:common.wlog('home_healthy_banner' + (2 + 1));common.link.movePlanShop('500000101920068', 'Home_Healthy')"
							   data-attr="홈^헬시라이프^훌라댄서의 바디보습 비법" data-trk="/">
								<p class="img"><span><img data-src="https://image.oliveyoung.co.kr/uploads/images/display/90000010001/289/6031458031874006712.jpg" alt="12-1 훌라댄서"></span></p>
								<p class="txt" style="">
									<strong class="title">훌라댄서의 바디보습 비법</strong>
									<span>현실판 모아나 하야티의   <br>알로하 라이프 소개합니다</span>
								</p>
							</a>
						</div>
					
						<div class="slideItem">
							<a href="javascript:common.wlog('home_healthy_banner' + (3 + 1));common.link.movePlanShop('500000101920067', 'Home_Healthy')"
							   data-attr="홈^헬시라이프^파티시에 추천 디저트 레시피" data-trk="/">
								<p class="img"><span><img data-src="https://image.oliveyoung.co.kr/uploads/images/display/90000010001/289/8533337769178734294.jpg" alt="11-4 파티시에"></span></p>
								<p class="txt" style="">
									<strong class="title">파티시에 추천 디저트 레시피</strong>
									<span>10년째 디저트를 만드는  <br>파티시에 라이프를 소개합니다</span>
								</p>
							</a>
						</div>
					
						<div class="slideItem">
							<a href="javascript:common.wlog('home_healthy_banner' + (4 + 1));common.link.movePlanShop('500000101920066', 'Home_Healthy')"
							   data-attr="홈^헬시라이프^유튜버 조원더의 리추얼라이프" data-trk="/">
								<p class="img"><span><img data-src="https://image.oliveyoung.co.kr/uploads/images/display/90000010001/289/7299512897204960320.jpg" alt="11-3 조원더"></span></p>
								<p class="txt" style="">
									<strong class="title">유튜버 조원더의 리추얼라이프</strong>
									<span>건강한 습관을 공유하는   <br>조원더의 겨울루틴 소개합니다</span>
								</p>
							</a>
						</div>
					
				
			</div>
		</div>
		
	


	
	
	
	
	

	
		<h3 class="main_sub_tit"><strong>주목해야 할 브랜드</strong></h3>
		<div class="main_brand_wrap">
			<div class="brand_wrapper">
				<div class="inner_unit">
					
					
					
					
					
					
					
						
						
						
						<div>
							
							
							<ul class="comm3sTabs sixSet" id="tabList">
								
									

									
									
									
										
											<li class="brnd-slide" data-ref-brndNo="A001728"><a href="javascript:;" data-attr="홈^주목브랜드^아비브^1">아비브</a></li>
										
										
											
										
									
								
									

									
									
									
										
											<li class="brnd-slide" data-ref-brndNo="A000486"><a href="javascript:;" data-attr="홈^주목브랜드^눅스^2">눅스</a></li>
										
										
											
										
									
								
									

									
									
									
										
											<li class="brnd-slide" data-ref-brndNo="A003288"><a href="javascript:;" data-attr="홈^주목브랜드^피카소^3">피카소</a></li>
										
										
											
										
									
								
									

									
									
									
										
											<li class="brnd-slide" data-ref-brndNo="A004933"><a href="javascript:;" data-attr="홈^주목브랜드^마른파이브^4">마른파이브</a></li>
										
										
											
										
									
								
									

									
									
									
										
											<li class="brnd-slide" data-ref-brndNo="A003917"><a href="javascript:;" data-attr="홈^주목브랜드^비브리브^5">비브리브</a></li>
										
										
											
										
									
								
									

									
									
									
										
											<li class="brnd-slide" data-ref-brndNo="A003041"><a href="javascript:;" data-attr="홈^주목브랜드^라보에이치^6">라보에이치</a></li>
										
										
											
										
									
								
							</ul>
							
								

								
								
								
								
								
									
										
										
										
										<div class="main_brand_tab main_brand brndList show" data-ref-brndNo="A001728">

									
									
										
									
								

								
								
									
									<ul class="cate_prd_list">
										
										
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000175186&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000175186" data-attr="홈^주목브랜드^[2022어워즈] 아비브 약산성 pH 시트 마스크 어성초 핏 기획 (4매+2매)^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000175186^홈_주목브랜드^1"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017518601koe743.jpg?l=ko" alt="[2022어워즈] 아비브 약산성 pH 시트 마스크 어성초 핏 기획 (4매+2매)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000175186" data-attr="홈^주목브랜드^[2022어워즈] 아비브 약산성 pH 시트 마스크 어성초 핏 기획 (4매+2매)^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">아비브</span><p class="tx_name">[2022어워즈] 아비브 약산성 pH 시트 마스크 어성초 핏 기획 (4매+2매)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000175186">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">16,000</span>원 </span><span class="tx_cur"><span class="tx_num">9,600</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:96.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000175186" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000170041&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000170041" data-attr="홈^주목브랜드^[2022어워즈] 아비브 어성초 스팟 패드 카밍터치 기획 (80매+80매)^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000170041^홈_주목브랜드^2"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017004108koe743.jpg?l=ko" alt="[2022어워즈] 아비브 어성초 스팟 패드 카밍터치 기획 (80매+80매)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000170041" data-attr="홈^주목브랜드^[2022어워즈] 아비브 어성초 스팟 패드 카밍터치 기획 (80매+80매)^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">아비브</span><p class="tx_name">[2022어워즈] 아비브 어성초 스팟 패드 카밍터치 기획 (80매+80매)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000170041">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">40,000</span>원 </span><span class="tx_cur"><span class="tx_num">24,000</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:94.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000170041" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000107897&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000107897" data-attr="홈^주목브랜드^아비브 껌딱지 시트 마스크 어성초 스티커 10매입^3" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000107897^홈_주목브랜드^3"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0010/A00000010789705koe743.jpg?l=ko" alt="아비브 껌딱지 시트 마스크 어성초 스티커 10매입" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000107897" data-attr="홈^주목브랜드^아비브 껌딱지 시트 마스크 어성초 스티커 10매입^3" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">아비브</span><p class="tx_name">아비브 껌딱지 시트 마스크 어성초 스티커 10매입</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000107897">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">40,000</span>원 </span><span class="tx_cur"><span class="tx_num">20,000</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:94.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000107897" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000115490&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000115490" data-attr="홈^주목브랜드^아비브 약산성 pH 시트 마스크 아쿠아 핏 10P^4" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000115490^홈_주목브랜드^4"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0011/A00000011549002koe743.jpg?l=ko" alt="아비브 약산성 pH 시트 마스크 아쿠아 핏 10P" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000115490" data-attr="홈^주목브랜드^아비브 약산성 pH 시트 마스크 아쿠아 핏 10P^4" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">아비브</span><p class="tx_name">아비브 약산성 pH 시트 마스크 아쿠아 핏 10P</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000115490">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">40,000</span>원 </span><span class="tx_cur"><span class="tx_num">24,000</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:94.0%">10점만점에 5.5점</span></span>(486)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000115490" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
										
											
										
											
									</ul>
									
									<div class="brand_more"><a href="javascript:common.link.moveBrandShop('A001728', 'Home_Brand_Banner');"><span>아비브</span> 브랜드 상품 전체보기</a></div>
									</div>
									
								
							
								

								
								
								
								
								
									
										
										
										
										<div class="main_brand_tab main_brand brndList show" data-ref-brndNo="A000486">

									
									
										
									
								

								
								
									
									<ul class="cate_prd_list">
										
										
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000168794&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000168794" data-attr="홈^주목브랜드^눅스 베스트셀러 기프트세트(드라이오일 30ml + 레브드미엘 핸드 앤 네일크림 30ml)^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000168794^홈_주목브랜드^1"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0016/A00000016879405koe743.jpg?l=ko" alt="눅스 베스트셀러 기프트세트(드라이오일 30ml + 레브드미엘 핸드 앤 네일크림 30ml)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000168794" data-attr="홈^주목브랜드^눅스 베스트셀러 기프트세트(드라이오일 30ml + 레브드미엘 핸드 앤 네일크림 30ml)^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">눅스</span><p class="tx_name">눅스 베스트셀러 기프트세트(드라이오일 30ml + 레브드미엘 핸드 앤 네일크림 30ml)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000168794">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">32,000</span>원 </span><span class="tx_cur"><span class="tx_num">28,800</span>원 </span></p><p class="prd_flag"><span class="icon_flag coupon">쿠폰</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:96.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000168794" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000168790&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000168790" data-attr="홈^주목브랜드^눅스 베스트셀러 기프트세트(드라이오일 30ml + 레브드미엘 스틱레브르4g)^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000168790^홈_주목브랜드^2"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0016/A00000016879009koe743.jpg?l=ko" alt="눅스 베스트셀러 기프트세트(드라이오일 30ml + 레브드미엘 스틱레브르4g)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000168790" data-attr="홈^주목브랜드^눅스 베스트셀러 기프트세트(드라이오일 30ml + 레브드미엘 스틱레브르4g)^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">눅스</span><p class="tx_name">눅스 베스트셀러 기프트세트(드라이오일 30ml + 레브드미엘 스틱레브르4g)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000168790">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">32,000</span>원 </span><span class="tx_cur"><span class="tx_num">28,800</span>원 </span></p><p class="prd_flag"><span class="icon_flag coupon">쿠폰</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:96.0%">10점만점에 5.5점</span></span>(436)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000168790" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000176342&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000176342" data-attr="홈^주목브랜드^눅스 레브드미엘 바디스크럽 기획(+드라이오일 10ml+우드스쿱 증정)^3" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000176342^홈_주목브랜드^3"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017634202koe743.jpg?l=ko" alt="눅스 레브드미엘 바디스크럽 기획(+드라이오일 10ml+우드스쿱 증정)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000176342" data-attr="홈^주목브랜드^눅스 레브드미엘 바디스크럽 기획(+드라이오일 10ml+우드스쿱 증정)^3" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">눅스</span><p class="tx_name">눅스 레브드미엘 바디스크럽 기획(+드라이오일 10ml+우드스쿱 증정)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000176342">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">39,000</span>원 </span><span class="tx_cur"><span class="tx_num">34,000</span>원 </span></p><p class="prd_flag"><span class="icon_flag coupon">쿠폰</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:%">10점만점에 5.5점</span></span></p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000176342" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000176341&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000176341" data-attr="홈^주목브랜드^눅스 쁘띠 홀리데이 기프트 세트 (베리로즈립밤15g+플로럴 샤워젤 30ml+플로럴 오일 10ml)^4" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000176341^홈_주목브랜드^4"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017634102koe743.jpg?l=ko" alt="눅스 쁘띠 홀리데이 기프트 세트 (베리로즈립밤15g+플로럴 샤워젤 30ml+플로럴 오일 10ml)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000176341" data-attr="홈^주목브랜드^눅스 쁘띠 홀리데이 기프트 세트 (베리로즈립밤15g+플로럴 샤워젤 30ml+플로럴 오일 10ml)^4" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">눅스</span><p class="tx_name">눅스 쁘띠 홀리데이 기프트 세트 (베리로즈립밤15g+플로럴 샤워젤 30ml+플로럴 오일 10ml)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000176341">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">29,000</span>원 </span><span class="tx_cur"><span class="tx_num">22,000</span>원 </span></p><p class="prd_flag"><span class="icon_flag coupon">쿠폰</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:100.0%">10점만점에 5.5점</span></span>(3)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000176341" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
										
											
										
											
										
											
									</ul>
									
									<div class="brand_more"><a href="javascript:common.link.moveBrandShop('A000486', 'Home_Brand_Banner');"><span>눅스</span> 브랜드 상품 전체보기</a></div>
									</div>
									
								
							
								

								
								
								
								
								
									
										
										
										
										<div class="main_brand_tab main_brand brndList show" data-ref-brndNo="A003288">

									
									
										
									
								

								
								
									
									<ul class="cate_prd_list">
										
										
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000175408&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000175408" data-attr="홈^주목브랜드^[어워즈 한정] 피카소 메이크업 스파츌라 어워즈 한정 기획(+스펀지6P&파우치 증정)^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000175408^홈_주목브랜드^1"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017540806koe743.jpg?l=ko" alt="[어워즈 한정] 피카소 메이크업 스파츌라 어워즈 한정 기획(+스펀지6P&파우치 증정)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000175408" data-attr="홈^주목브랜드^[어워즈 한정] 피카소 메이크업 스파츌라 어워즈 한정 기획(+스펀지6P&파우치 증정)^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">피카소</span><p class="tx_name">[어워즈 한정] 피카소 메이크업 스파츌라 어워즈 한정 기획(+스펀지6P&파우치 증정)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000175408">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">19,000</span>원 </span><span class="tx_cur"><span class="tx_num">14,900</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:96.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000175408" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000162845&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000162845" data-attr="홈^주목브랜드^피카소 속눈썹 빗^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000162845^홈_주목브랜드^2"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0016/A00000016284502koe743.jpg?l=ko" alt="피카소 속눈썹 빗" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000162845" data-attr="홈^주목브랜드^피카소 속눈썹 빗^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">피카소</span><p class="tx_name">피카소 속눈썹 빗</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000162845">찜하기</button><p class="prd_price"><span class="tx_cur"><span class="tx_num">6,000</span>원 </span></p><p class="prd_flag"><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:92.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000162845" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000175289&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000175289" data-attr="홈^주목브랜드^피카소 라텍스 스퀘어 스펀지 대용량 20P (케이스포함)^3" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000175289^홈_주목브랜드^3"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017528901koe743.jpg?l=ko" alt="피카소 라텍스 스퀘어 스펀지 대용량 20P (케이스포함)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000175289" data-attr="홈^주목브랜드^피카소 라텍스 스퀘어 스펀지 대용량 20P (케이스포함)^3" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">피카소</span><p class="tx_name">피카소 라텍스 스퀘어 스펀지 대용량 20P (케이스포함)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000175289">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">28,000</span>원 </span><span class="tx_cur"><span class="tx_num">22,400</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:94.0%">10점만점에 5.5점</span></span>(34)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000175289" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000171447&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000171447" data-attr="홈^주목브랜드^피카소 아이미 가닥 속눈썹 V형 (5종 중 택1)^4" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000171447^홈_주목브랜드^4"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017144707koe743.jpg?l=ko" alt="피카소 아이미 가닥 속눈썹 V형 (5종 중 택1)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000171447" data-attr="홈^주목브랜드^피카소 아이미 가닥 속눈썹 V형 (5종 중 택1)^4" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">피카소</span><p class="tx_name">피카소 아이미 가닥 속눈썹 V형 (5종 중 택1)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000171447">찜하기</button><p class="prd_price"><span class="tx_cur"><span class="tx_num">6,900</span>원 </span></p><p class="prd_flag"><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:92.0%">10점만점에 5.5점</span></span>(180)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000171447" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
									</ul>
									
									<div class="brand_more"><a href="javascript:common.link.moveBrandShop('A003288', 'Home_Brand_Banner');"><span>피카소</span> 브랜드 상품 전체보기</a></div>
									</div>
									
								
							
								

								
								
								
								
								
									
										
										
										
										<div class="main_brand_tab main_brand brndList show" data-ref-brndNo="A004933">

									
									
										
									
								

								
								
									
									<ul class="cate_prd_list">
										
										
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000174548&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000174548" data-attr="홈^주목브랜드^[겨울용] 마른파이브 넉넉스타킹(150D) / 삭스타킹(200D) (단품/기획 택1)^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="004" data-trk="null" data-impression="A000000174548^홈_주목브랜드^1"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017454832koe743.jpg?l=ko" alt="[겨울용] 마른파이브 넉넉스타킹(150D) / 삭스타킹(200D) (단품/기획 택1)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000174548" data-attr="홈^주목브랜드^[겨울용] 마른파이브 넉넉스타킹(150D) / 삭스타킹(200D) (단품/기획 택1)^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="004" data-trk="null"><span class="tx_brand">마른파이브</span><p class="tx_name">[겨울용] 마른파이브 넉넉스타킹(150D) / 삭스타킹(200D) (단품/기획 택1)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000174548">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">15,900</span>원 ~</span><span class="tx_cur"><span class="tx_num">14,300</span>원 ~</span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:94.0%">10점만점에 5.5점</span></span>(265)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000174548" data-ref-dispCatNo="90000010001" data-ref-itemNo="004">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=B000000175517&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="B000000175517" data-attr="홈^주목브랜드^[김재우PICK]마른파이브 오리지널/엑스트라웜 히트터치 상하의 세트 15종 1택^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="010" data-trk="null" data-impression="B000000175517^홈_주목브랜드^2"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/B00000017551710koe743.jpg?l=ko" alt="[김재우PICK]마른파이브 오리지널/엑스트라웜 히트터치 상하의 세트 15종 1택" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="B000000175517" data-attr="홈^주목브랜드^[김재우PICK]마른파이브 오리지널/엑스트라웜 히트터치 상하의 세트 15종 1택^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="010" data-trk="null"><span class="tx_brand">마른파이브</span><p class="tx_name">[김재우PICK]마른파이브 오리지널/엑스트라웜 히트터치 상하의 세트 15종 1택</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="B000000175517">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">20,900</span>원 ~</span><span class="tx_cur"><span class="tx_num">19,900</span>원 ~</span></p><p class="prd_flag"><span class="icon_flag coupon">쿠폰</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:94.0%">10점만점에 5.5점</span></span>(15)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="B000000175517" data-ref-dispCatNo="90000010001" data-ref-itemNo="010">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=B000000175601&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="B000000175601" data-attr="홈^주목브랜드^마른파이브 넉넉 온깅스 기모 스타킹&기모레깅스 택1^3" data-ref-dispCatNo="90000010001" data-ref-itemNo="002" data-trk="null" data-impression="B000000175601^홈_주목브랜드^3"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/B00000017560132koe743.jpg?l=ko" alt="마른파이브 넉넉 온깅스 기모 스타킹&기모레깅스 택1" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="B000000175601" data-attr="홈^주목브랜드^마른파이브 넉넉 온깅스 기모 스타킹&기모레깅스 택1^3" data-ref-dispCatNo="90000010001" data-ref-itemNo="002" data-trk="null"><span class="tx_brand">마른파이브</span><p class="tx_name">마른파이브 넉넉 온깅스 기모 스타킹&기모레깅스 택1</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="B000000175601">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">13,900</span>원 </span><span class="tx_cur"><span class="tx_num">12,900</span>원 </span></p><p class="prd_flag"><span class="icon_flag coupon">쿠폰</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:92.0%">10점만점에 5.5점</span></span>(14)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="B000000175601" data-ref-dispCatNo="90000010001" data-ref-itemNo="002">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=B000000173681&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="B000000173681" data-attr="홈^주목브랜드^마른파이브 오가닉 심리스 쉬어브라 2.0 3종 택1^4" data-ref-dispCatNo="90000010001" data-ref-itemNo="015" data-trk="null" data-impression="B000000173681^홈_주목브랜드^4"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/B00000017368116koe743.jpg?l=ko" alt="마른파이브 오가닉 심리스 쉬어브라 2.0 3종 택1" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="B000000173681" data-attr="홈^주목브랜드^마른파이브 오가닉 심리스 쉬어브라 2.0 3종 택1^4" data-ref-dispCatNo="90000010001" data-ref-itemNo="015" data-trk="null"><span class="tx_brand">마른파이브</span><p class="tx_name">마른파이브 오가닉 심리스 쉬어브라 2.0 3종 택1</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="B000000173681">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">29,900</span>원 </span><span class="tx_cur"><span class="tx_num">27,900</span>원 </span></p><p class="prd_flag"><span class="icon_flag coupon">쿠폰</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:98.0%">10점만점에 5.5점</span></span>(58)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="B000000173681" data-ref-dispCatNo="90000010001" data-ref-itemNo="015">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
										
											
										
											
									</ul>
									
									<div class="brand_more"><a href="javascript:common.link.moveBrandShop('A004933', 'Home_Brand_Banner');"><span>마른파이브</span> 브랜드 상품 전체보기</a></div>
									</div>
									
								
							
								

								
								
								
								
								
									
										
										
										
										<div class="main_brand_tab main_brand brndList show" data-ref-brndNo="A003917">

									
									
										
									
								

								
								
									
									<ul class="cate_prd_list">
										
										
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000175694&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000175694" data-attr="홈^주목브랜드^비브리브 꼬박꼬밥 어워즈 기획^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000175694^홈_주목브랜드^1"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017569402koe743.jpg?l=ko" alt="비브리브 꼬박꼬밥 어워즈 기획" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000175694" data-attr="홈^주목브랜드^비브리브 꼬박꼬밥 어워즈 기획^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">비브리브</span><p class="tx_name">비브리브 꼬박꼬밥 어워즈 기획</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000175694">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">18,000</span>원 </span><span class="tx_cur"><span class="tx_num">16,000</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:98.0%">10점만점에 5.5점</span></span>(79)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000175694" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=B000000171112&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="B000000171112" data-attr="홈^주목브랜드^(고구마맛출시)비브리브 꼬박꼬밥 대용량 600g 5가지 맛 중 택 1^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="B000000171112^홈_주목브랜드^2"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/B00000017111204koe743.jpg?l=ko" alt="(고구마맛출시)비브리브 꼬박꼬밥 대용량 600g 5가지 맛 중 택 1" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="B000000171112" data-attr="홈^주목브랜드^(고구마맛출시)비브리브 꼬박꼬밥 대용량 600g 5가지 맛 중 택 1^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">비브리브</span><p class="tx_name">(고구마맛출시)비브리브 꼬박꼬밥 대용량 600g 5가지 맛 중 택 1</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="B000000171112">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">58,000</span>원 </span><span class="tx_cur"><span class="tx_num">37,700</span>원 </span></p><p class="prd_flag"><span class="icon_flag coupon">쿠폰</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:98.0%">10점만점에 5.5점</span></span>(221)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="B000000171112" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=B000000168109&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="B000000168109" data-attr="홈^주목브랜드^(올리브영단독)비브리브 꼬박꼬밥 스타터패키지 1박스^3" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="B000000168109^홈_주목브랜드^3"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0016/B00000016810903koe743.jpg?l=ko" alt="(올리브영단독)비브리브 꼬박꼬밥 스타터패키지 1박스" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="B000000168109" data-attr="홈^주목브랜드^(올리브영단독)비브리브 꼬박꼬밥 스타터패키지 1박스^3" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">비브리브</span><p class="tx_name">(올리브영단독)비브리브 꼬박꼬밥 스타터패키지 1박스</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="B000000168109">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">35,000</span>원 </span><span class="tx_cur"><span class="tx_num">21,000</span>원 </span></p><p class="prd_flag"><span class="icon_flag coupon">쿠폰</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:94.0%">10점만점에 5.5점</span></span>(267)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="B000000168109" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=B000000172398&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="B000000172398" data-attr="홈^주목브랜드^(올리브영단독) 비브리브 꼬박꼬밥 대용량 600g+보틀 기획 5가지 맛 중 택1^4" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="B000000172398^홈_주목브랜드^4"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/B00000017239805koe743.jpg?l=ko" alt="(올리브영단독) 비브리브 꼬박꼬밥 대용량 600g+보틀 기획 5가지 맛 중 택1" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="B000000172398" data-attr="홈^주목브랜드^(올리브영단독) 비브리브 꼬박꼬밥 대용량 600g+보틀 기획 5가지 맛 중 택1^4" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">비브리브</span><p class="tx_name">(올리브영단독) 비브리브 꼬박꼬밥 대용량 600g+보틀 기획 5가지 맛 중 택1</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="B000000172398">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">65,000</span>원 </span><span class="tx_cur"><span class="tx_num">42,250</span>원 </span></p><p class="prd_flag"><span class="icon_flag coupon">쿠폰</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:98.0%">10점만점에 5.5점</span></span>(22)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="B000000172398" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
										
											
									</ul>
									
									<div class="brand_more"><a href="javascript:common.link.moveBrandShop('A003917', 'Home_Brand_Banner');"><span>비브리브</span> 브랜드 상품 전체보기</a></div>
									</div>
									
								
							
								

								
								
								
								
								
									
										
										
										
										<div class="main_brand_tab main_brand brndList show" data-ref-brndNo="A003041">

									
									
										
									
								

								
								
									
									<ul class="cate_prd_list">
										
										
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000175784&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000175784" data-attr="홈^주목브랜드^[2022어워즈] 샴푸1위 라보에이치 탈모증상완화 샴푸 한정기획(750ml+112ml*2) 및 택1^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000175784^홈_주목브랜드^1"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017578405koe743.jpg?l=ko" alt="[2022어워즈] 샴푸1위 라보에이치 탈모증상완화 샴푸 한정기획(750ml+112ml*2) 및 택1" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000175784" data-attr="홈^주목브랜드^[2022어워즈] 샴푸1위 라보에이치 탈모증상완화 샴푸 한정기획(750ml+112ml*2) 및 택1^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">라보에이치</span><p class="tx_name">[2022어워즈] 샴푸1위 라보에이치 탈모증상완화 샴푸 한정기획(750ml+112ml*2) 및 택1</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000175784">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">36,000</span>원 ~</span><span class="tx_cur"><span class="tx_num">26,900</span>원 ~</span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:96.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000175784" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000152475&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000152475" data-attr="홈^주목브랜드^라보에이치 탈모증상완화 샴푸 두피강화 (333ml+50ml)^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000152475^홈_주목브랜드^2"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0015/A00000015247509koe743.jpg?l=ko" alt="라보에이치 탈모증상완화 샴푸 두피강화 (333ml+50ml)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000152475" data-attr="홈^주목브랜드^라보에이치 탈모증상완화 샴푸 두피강화 (333ml+50ml)^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">라보에이치</span><p class="tx_name">라보에이치 탈모증상완화 샴푸 두피강화 (333ml+50ml)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000152475">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">19,800</span>원 </span><span class="tx_cur"><span class="tx_num">14,900</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:94.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000152475" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000170445&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000170445" data-attr="홈^주목브랜드^[한정기획] 라보에이치 탈모케어 스칼프 캡슐트리트먼트 2입 기획^3" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000170445^홈_주목브랜드^3"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017044511koe743.jpg?l=ko" alt="[한정기획] 라보에이치 탈모케어 스칼프 캡슐트리트먼트 2입 기획" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000170445" data-attr="홈^주목브랜드^[한정기획] 라보에이치 탈모케어 스칼프 캡슐트리트먼트 2입 기획^3" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">라보에이치</span><p class="tx_name">[한정기획] 라보에이치 탈모케어 스칼프 캡슐트리트먼트 2입 기획</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000170445">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">32,000</span>원 </span><span class="tx_cur"><span class="tx_num">15,800</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:94.0%">10점만점에 5.5점</span></span>(660)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000170445" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000161794&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000161794" data-attr="홈^주목브랜드^[대용량]라보에이치 탈모증상완화 샴푸[두피강화/두피쿨링] 750ml 중 택1^4" data-ref-dispCatNo="90000010001" data-ref-itemNo="002" data-trk="null" data-impression="A000000161794^홈_주목브랜드^4"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0016/A00000016179404koe743.jpg?l=ko" alt="[대용량]라보에이치 탈모증상완화 샴푸[두피강화/두피쿨링] 750ml 중 택1" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000161794" data-attr="홈^주목브랜드^[대용량]라보에이치 탈모증상완화 샴푸[두피강화/두피쿨링] 750ml 중 택1^4" data-ref-dispCatNo="90000010001" data-ref-itemNo="002" data-trk="null"><span class="tx_brand">라보에이치</span><p class="tx_name">[대용량]라보에이치 탈모증상완화 샴푸[두피강화/두피쿨링] 750ml 중 택1</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000161794">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">36,000</span>원 ~</span><span class="tx_cur"><span class="tx_num">25,900</span>원 ~</span></p><p class="prd_flag"><span class="icon_flag coupon">쿠폰</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:96.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000161794" data-ref-dispCatNo="90000010001" data-ref-itemNo="002">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
									</ul>
									
									<div class="brand_more"><a href="javascript:common.link.moveBrandShop('A003041', 'Home_Brand_Banner');"><span>라보에이치</span> 브랜드 상품 전체보기</a></div>
									</div>
									
								
							
						</div>
					
						
						
						
						<div>
							
							
								
							
							<ul class="comm3sTabs sixSet" id="tabList2">
								
									

									
									
									
										
											<li class="brnd-slide" data-ref-brndNo="A000731"><a href="javascript:;" data-attr="홈^주목브랜드^아임오^7">아임오</a></li>
										
										
											
										
									
								
									

									
									
									
										
											<li class="brnd-slide" data-ref-brndNo="A000754"><a href="javascript:;" data-attr="홈^주목브랜드^아로마티카^8">아로마티카</a></li>
										
										
											
										
									
								
									

									
									
									
										
											<li class="brnd-slide" data-ref-brndNo="A001681"><a href="javascript:;" data-attr="홈^주목브랜드^코스노리^9">코스노리</a></li>
										
										
											
										
									
								
									

									
									
									
										
											<li class="brnd-slide" data-ref-brndNo="A003660"><a href="javascript:;" data-attr="홈^주목브랜드^어뮤즈^10">어뮤즈</a></li>
										
										
											
										
									
								
									

									
									
									
										
											<li class="brnd-slide" data-ref-brndNo="A001924"><a href="javascript:;" data-attr="홈^주목브랜드^마녀공장^11">마녀공장</a></li>
										
										
											
										
									
								
									

									
									
									
										
											<li class="brnd-slide" data-ref-brndNo="A000426"><a href="javascript:;" data-attr="홈^주목브랜드^닥터자르트^12">닥터자르트</a></li>
										
										
											
										
									
								
							</ul>
							
								

								
								
								
								
								
									
										
										
										
										<div class="main_brand_tab2 main_brand brndList show" data-ref-brndNo="A000731">

									
									
										
									
								

								
								
									
									<ul class="cate_prd_list">
										
										
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000175664&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000175664" data-attr="홈^주목브랜드^아임오 그린앤 비건생리대 중형 26P^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000175664^홈_주목브랜드^1"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017566402koe743.jpg?l=ko" alt="아임오 그린앤 비건생리대 중형 26P" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000175664" data-attr="홈^주목브랜드^아임오 그린앤 비건생리대 중형 26P^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">아임오</span><p class="tx_name">아임오 그린앤 비건생리대 중형 26P</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000175664">찜하기</button><p class="prd_price"><span class="tx_cur"><span class="tx_num">11,800</span>원 </span></p><p class="prd_flag"><span class="icon_flag plus">1+1</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:100.0%">10점만점에 5.5점</span></span>(91)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000175664" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000175663&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000175663" data-attr="홈^주목브랜드^아임오 그린앤 비건생리대 대형 24P^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000175663^홈_주목브랜드^2"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017566302koe743.jpg?l=ko" alt="아임오 그린앤 비건생리대 대형 24P" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000175663" data-attr="홈^주목브랜드^아임오 그린앤 비건생리대 대형 24P^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">아임오</span><p class="tx_name">아임오 그린앤 비건생리대 대형 24P</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000175663">찜하기</button><p class="prd_price"><span class="tx_cur"><span class="tx_num">11,800</span>원 </span></p><p class="prd_flag"><span class="icon_flag plus">1+1</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:90.0%">10점만점에 5.5점</span></span>(4)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000175663" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000137005&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000137005" data-attr="홈^주목브랜드^아임오 뉴 중형 14P 6개입 기획 (총 84P)^3" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000137005^홈_주목브랜드^3"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0013/A00000013700506koe743.jpg?l=ko" alt="아임오 뉴 중형 14P 6개입 기획 (총 84P)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000137005" data-attr="홈^주목브랜드^아임오 뉴 중형 14P 6개입 기획 (총 84P)^3" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">아임오</span><p class="tx_name">아임오 뉴 중형 14P 6개입 기획 (총 84P)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000137005">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">42,600</span>원 </span><span class="tx_cur"><span class="tx_num">26,400</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:96.0%">10점만점에 5.5점</span></span>(843)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000137005" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000140943&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000140943" data-attr="홈^주목브랜드^아임오 뉴 팬티라이너 6개입 기획 (20PX6)^4" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000140943^홈_주목브랜드^4"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0014/A00000014094304koe743.jpg?l=ko" alt="아임오 뉴 팬티라이너 6개입 기획 (20PX6)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000140943" data-attr="홈^주목브랜드^아임오 뉴 팬티라이너 6개입 기획 (20PX6)^4" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">아임오</span><p class="tx_name">아임오 뉴 팬티라이너 6개입 기획 (20PX6)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000140943">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">24,600</span>원 </span><span class="tx_cur"><span class="tx_num">14,900</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:96.0%">10점만점에 5.5점</span></span>(459)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000140943" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
										
											
									</ul>
									
									<div class="brand_more"><a href="javascript:common.link.moveBrandShop('A000731', 'Home_Brand_Banner');"><span>아임오</span> 브랜드 상품 전체보기</a></div>
									</div>
									
								
							
								

								
								
								
								
								
									
										
										
										
										<div class="main_brand_tab2 main_brand brndList show" data-ref-brndNo="A000754">

									
									
										
									
								

								
								
									
									<ul class="cate_prd_list">
										
										
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000170417&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000170417" data-attr="홈^주목브랜드^아로마티카 바디오일 100ml 4종 중 택1 (서큘레이팅, 서렌, 임브레이스, 어웨이크닝)^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000170417^홈_주목브랜드^1"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017041708koe743.jpg?l=ko" alt="아로마티카 바디오일 100ml 4종 중 택1 (서큘레이팅, 서렌, 임브레이스, 어웨이크닝)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000170417" data-attr="홈^주목브랜드^아로마티카 바디오일 100ml 4종 중 택1 (서큘레이팅, 서렌, 임브레이스, 어웨이크닝)^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">아로마티카</span><p class="tx_name">아로마티카 바디오일 100ml 4종 중 택1 (서큘레이팅, 서렌, 임브레이스, 어웨이크닝)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000170417">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">25,000</span>원 ~</span><span class="tx_cur"><span class="tx_num">20,000</span>원 ~</span></p><p class="prd_flag"><span class="icon_flag sale">세일</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:92.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000170417" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000175527&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000175527" data-attr="홈^주목브랜드^[2022 어워즈] 홀리 PICK 아로마티카 바디오일 더블괄사/리츄얼 기획 (우드&유리 괄사 증정)^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000175527^홈_주목브랜드^2"><span class="newOyflag today"><em>오특</em></span><span class="newOyflag time" style="display:none;"><div class="main-today"><div class="timer ready"><span class="nums h"><span class="num" data-timer-val="0">0</span><span class="num" data-timer-val="0">0</span></span><span class="nums m"><span class="num" data-timer-val="0">0</span><span class="num" data-timer-val="0">0</span></span></div></div></span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017552707koe743.jpg?l=ko" alt="[2022 어워즈] 홀리 PICK 아로마티카 바디오일 더블괄사/리츄얼 기획 (우드&유리 괄사 증정)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000175527" data-attr="홈^주목브랜드^[2022 어워즈] 홀리 PICK 아로마티카 바디오일 더블괄사/리츄얼 기획 (우드&유리 괄사 증정)^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">아로마티카</span><p class="tx_name">[2022 어워즈] 홀리 PICK 아로마티카 바디오일 더블괄사/리츄얼 기획 (우드&유리 괄사 증정)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000175527">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">44,000</span>원 ~</span><span class="tx_cur"><span class="tx_num">30,500</span>원 ~</span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag coupon">쿠폰</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:94.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000175527" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000162015&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000162015" data-attr="홈^주목브랜드^아로마티카 임브레이스 바디워시 네롤리&패츌리 300ml (단품/리필/기획)^3" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000162015^홈_주목브랜드^3"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0016/A00000016201508koe743.jpg?l=ko" alt="아로마티카 임브레이스 바디워시 네롤리&패츌리 300ml (단품/리필/기획)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000162015" data-attr="홈^주목브랜드^아로마티카 임브레이스 바디워시 네롤리&패츌리 300ml (단품/리필/기획)^3" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">아로마티카</span><p class="tx_name">아로마티카 임브레이스 바디워시 네롤리&패츌리 300ml (단품/리필/기획)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000162015">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">28,000</span>원 ~</span><span class="tx_cur"><span class="tx_num">20,700</span>원 ~</span></p><p class="prd_flag"><span class="icon_flag sale">세일</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:94.0%">10점만점에 5.5점</span></span>(369)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000162015" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000170548&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000170548" data-attr="홈^주목브랜드^아로마티카 리츄얼 바디미스트 100ml 3종 중 택1 (서렌, 임브레이스, 바이탈라이징)^4" data-ref-dispCatNo="90000010001" data-ref-itemNo="003" data-trk="null" data-impression="A000000170548^홈_주목브랜드^4"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017054801koe743.jpg?l=ko" alt="아로마티카 리츄얼 바디미스트 100ml 3종 중 택1 (서렌, 임브레이스, 바이탈라이징)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000170548" data-attr="홈^주목브랜드^아로마티카 리츄얼 바디미스트 100ml 3종 중 택1 (서렌, 임브레이스, 바이탈라이징)^4" data-ref-dispCatNo="90000010001" data-ref-itemNo="003" data-trk="null"><span class="tx_brand">아로마티카</span><p class="tx_name">아로마티카 리츄얼 바디미스트 100ml 3종 중 택1 (서렌, 임브레이스, 바이탈라이징)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000170548">찜하기</button><p class="prd_price"><span class="tx_cur"><span class="tx_num">36,000</span>원 </span></p><p class="prd_flag"><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:92.0%">10점만점에 5.5점</span></span>(227)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000170548" data-ref-dispCatNo="90000010001" data-ref-itemNo="003">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
										
											
										
											
										
											
									</ul>
									
									<div class="brand_more"><a href="javascript:common.link.moveBrandShop('A000754', 'Home_Brand_Banner');"><span>아로마티카</span> 브랜드 상품 전체보기</a></div>
									</div>
									
								
							
								

								
								
								
								
								
									
										
										
										
										<div class="main_brand_tab2 main_brand brndList show" data-ref-brndNo="A001681">

									
									
										
									
								

								
								
									
									<ul class="cate_prd_list">
										
										
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000175068&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000175068" data-attr="홈^주목브랜드^[2022어워즈] 코스노리 아이래쉬 세럼 속눈썹영양제 기획세트 (+손톱영양제 7ml 증정)^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000175068^홈_주목브랜드^1"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017506832koe743.jpg?l=ko" alt="[2022어워즈] 코스노리 아이래쉬 세럼 속눈썹영양제 기획세트 (+손톱영양제 7ml 증정)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000175068" data-attr="홈^주목브랜드^[2022어워즈] 코스노리 아이래쉬 세럼 속눈썹영양제 기획세트 (+손톱영양제 7ml 증정)^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">코스노리</span><p class="tx_name">[2022어워즈] 코스노리 아이래쉬 세럼 속눈썹영양제 기획세트 (+손톱영양제 7ml 증정)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000175068">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">16,000</span>원 </span><span class="tx_cur"><span class="tx_num">13,600</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:94.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000175068" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000175072&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000175072" data-attr="홈^주목브랜드^[프리따 Pick] 코스노리 화이트닝 드레스 톤업크림 기획세트 (+판테놀 쿠션 미니 증정)^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000175072^홈_주목브랜드^2"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017507207koe743.jpg?l=ko" alt="[프리따 Pick] 코스노리 화이트닝 드레스 톤업크림 기획세트 (+판테놀 쿠션 미니 증정)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000175072" data-attr="홈^주목브랜드^[프리따 Pick] 코스노리 화이트닝 드레스 톤업크림 기획세트 (+판테놀 쿠션 미니 증정)^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">코스노리</span><p class="tx_name">[프리따 Pick] 코스노리 화이트닝 드레스 톤업크림 기획세트 (+판테놀 쿠션 미니 증정)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000175072">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">20,000</span>원 </span><span class="tx_cur"><span class="tx_num">16,000</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:90.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000175072" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000163865&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000163865" data-attr="홈^주목브랜드^코스노리 유어 스킨 드레스 비건 톤업 베이스 (5ml*2 증정기획)^3" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000163865^홈_주목브랜드^3"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0016/A00000016386516koe743.jpg?l=ko" alt="코스노리 유어 스킨 드레스 비건 톤업 베이스 (5ml*2 증정기획)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000163865" data-attr="홈^주목브랜드^코스노리 유어 스킨 드레스 비건 톤업 베이스 (5ml*2 증정기획)^3" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">코스노리</span><p class="tx_name">코스노리 유어 스킨 드레스 비건 톤업 베이스 (5ml*2 증정기획)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000163865">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">26,000</span>원 </span><span class="tx_cur"><span class="tx_num">19,500</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:92.0%">10점만점에 5.5점</span></span>(216)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000163865" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000130967&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000130967" data-attr="홈^주목브랜드^[NEW] 코스노리 퍼펙트 세팅 워터프루프 마스카라 3종 택1^4" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000130967^홈_주목브랜드^4"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0013/A00000013096725koe743.jpg?l=ko" alt="[NEW] 코스노리 퍼펙트 세팅 워터프루프 마스카라 3종 택1" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000130967" data-attr="홈^주목브랜드^[NEW] 코스노리 퍼펙트 세팅 워터프루프 마스카라 3종 택1^4" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">코스노리</span><p class="tx_name">[NEW] 코스노리 퍼펙트 세팅 워터프루프 마스카라 3종 택1</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000130967">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">16,000</span>원 ~</span><span class="tx_cur"><span class="tx_num">9,900</span>원 ~</span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:92.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000130967" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
										
											
									</ul>
									
									<div class="brand_more"><a href="javascript:common.link.moveBrandShop('A001681', 'Home_Brand_Banner');"><span>코스노리</span> 브랜드 상품 전체보기</a></div>
									</div>
									
								
							
								

								
								
								
								
								
									
										
										
										
										<div class="main_brand_tab2 main_brand brndList show" data-ref-brndNo="A003660">

									
									
										
									
								

								
								
									
									<ul class="cate_prd_list">
										
										
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000161728&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000161728" data-attr="홈^주목브랜드^[어워즈 단독기획] 어뮤즈 듀 젤리 비건 쿠션 기획세트(본품+파우치+리필)^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="007" data-trk="null" data-impression="A000000161728^홈_주목브랜드^1"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0016/A00000016172842koe743.jpg?l=ko" alt="[어워즈 단독기획] 어뮤즈 듀 젤리 비건 쿠션 기획세트(본품+파우치+리필)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000161728" data-attr="홈^주목브랜드^[어워즈 단독기획] 어뮤즈 듀 젤리 비건 쿠션 기획세트(본품+파우치+리필)^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="007" data-trk="null"><span class="tx_brand">어뮤즈</span><p class="tx_name">[어워즈 단독기획] 어뮤즈 듀 젤리 비건 쿠션 기획세트(본품+파우치+리필)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000161728">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">34,000</span>원 </span><span class="tx_cur"><span class="tx_num">30,600</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:92.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000161728" data-ref-dispCatNo="90000010001" data-ref-itemNo="007">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000158321&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000158321" data-attr="홈^주목브랜드^[슬기 Pick] 어뮤즈 스킨 튠 비건 커버 쿠션^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000158321^홈_주목브랜드^2"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0015/A00000015832113koe743.jpg?l=ko" alt="[슬기 Pick] 어뮤즈 스킨 튠 비건 커버 쿠션" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000158321" data-attr="홈^주목브랜드^[슬기 Pick] 어뮤즈 스킨 튠 비건 커버 쿠션^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">어뮤즈</span><p class="tx_name">[슬기 Pick] 어뮤즈 스킨 튠 비건 커버 쿠션</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000158321">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">34,000</span>원 </span><span class="tx_cur"><span class="tx_num">30,600</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:92.0%">10점만점에 5.5점</span></span>(763)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000158321" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000166977&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000166977" data-attr="홈^주목브랜드^[한정수량/올영단독] 어뮤즈 메타 픽싱 비건 쿠션 리필 기획세트 (본품+리필)^3" data-ref-dispCatNo="90000010001" data-ref-itemNo="004" data-trk="null" data-impression="A000000166977^홈_주목브랜드^3"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0016/A00000016697738koe743.jpg?l=ko" alt="[한정수량/올영단독] 어뮤즈 메타 픽싱 비건 쿠션 리필 기획세트 (본품+리필)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000166977" data-attr="홈^주목브랜드^[한정수량/올영단독] 어뮤즈 메타 픽싱 비건 쿠션 리필 기획세트 (본품+리필)^3" data-ref-dispCatNo="90000010001" data-ref-itemNo="004" data-trk="null"><span class="tx_brand">어뮤즈</span><p class="tx_name">[한정수량/올영단독] 어뮤즈 메타 픽싱 비건 쿠션 리필 기획세트 (본품+리필)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000166977">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">34,000</span>원 </span><span class="tx_cur"><span class="tx_num">30,600</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:92.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000166977" data-ref-dispCatNo="90000010001" data-ref-itemNo="004">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000174026&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000174026" data-attr="홈^주목브랜드^[NEW] 어뮤즈 비건 페이스 올 팔레트^4" data-ref-dispCatNo="90000010001" data-ref-itemNo="002" data-trk="null" data-impression="A000000174026^홈_주목브랜드^4"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017402602koe743.jpg?l=ko" alt="[NEW] 어뮤즈 비건 페이스 올 팔레트" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000174026" data-attr="홈^주목브랜드^[NEW] 어뮤즈 비건 페이스 올 팔레트^4" data-ref-dispCatNo="90000010001" data-ref-itemNo="002" data-trk="null"><span class="tx_brand">어뮤즈</span><p class="tx_name">[NEW] 어뮤즈 비건 페이스 올 팔레트</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000174026">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">32,000</span>원 </span><span class="tx_cur"><span class="tx_num">27,200</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:98.0%">10점만점에 5.5점</span></span>(539)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000174026" data-ref-dispCatNo="90000010001" data-ref-itemNo="002">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
										
											
										
											
									</ul>
									
									<div class="brand_more"><a href="javascript:common.link.moveBrandShop('A003660', 'Home_Brand_Banner');"><span>어뮤즈</span> 브랜드 상품 전체보기</a></div>
									</div>
									
								
							
								

								
								
								
								
								
									
										
										
										
										<div class="main_brand_tab2 main_brand brndList show" data-ref-brndNo="A001924">

									
									
										
									
								

								
								
									
									<ul class="cate_prd_list">
										
										
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000175544&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000175544" data-attr="홈^주목브랜드^[2022 어워즈] 마녀공장 퓨어 클렌징 오일 300mlX2 더블기획^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000175544^홈_주목브랜드^1"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017554402koe743.jpg?l=ko" alt="[2022 어워즈] 마녀공장 퓨어 클렌징 오일 300mlX2 더블기획" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000175544" data-attr="홈^주목브랜드^[2022 어워즈] 마녀공장 퓨어 클렌징 오일 300mlX2 더블기획^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">마녀공장</span><p class="tx_name">[2022 어워즈] 마녀공장 퓨어 클렌징 오일 300mlX2 더블기획</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000175544">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">49,000</span>원 </span><span class="tx_cur"><span class="tx_num">29,900</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:96.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000175544" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000158579&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000158579" data-attr="홈^주목브랜드^[단독기획] 마녀공장 퓨어 클렌징 오일 200ml+퓨어폼 20ml^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000158579^홈_주목브랜드^2"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0015/A00000015857911koe743.jpg?l=ko" alt="[단독기획] 마녀공장 퓨어 클렌징 오일 200ml+퓨어폼 20ml" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000158579" data-attr="홈^주목브랜드^[단독기획] 마녀공장 퓨어 클렌징 오일 200ml+퓨어폼 20ml^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">마녀공장</span><p class="tx_name">[단독기획] 마녀공장 퓨어 클렌징 오일 200ml+퓨어폼 20ml</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000158579">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">19,900</span>원 </span><span class="tx_cur"><span class="tx_num">15,000</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:96.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000158579" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000149988&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000149988" data-attr="홈^주목브랜드^[증량] 마녀공장 퓨어&딥 클렌징 폼 1+1 기획 (120ml+120ml)^3" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000149988^홈_주목브랜드^3"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0014/A00000014998811koe743.jpg?l=ko" alt="[증량] 마녀공장 퓨어&딥 클렌징 폼 1+1 기획 (120ml+120ml)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000149988" data-attr="홈^주목브랜드^[증량] 마녀공장 퓨어&딥 클렌징 폼 1+1 기획 (120ml+120ml)^3" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">마녀공장</span><p class="tx_name">[증량] 마녀공장 퓨어&딥 클렌징 폼 1+1 기획 (120ml+120ml)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000149988">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">12,000</span>원 </span><span class="tx_cur"><span class="tx_num">11,000</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:96.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000149988" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000162370&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000162370" data-attr="홈^주목브랜드^[증량] 마녀공장 갈락토미 필링젤 더블 기획 (120ml+120ml)^4" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000162370^홈_주목브랜드^4"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0016/A00000016237004koe743.jpg?l=ko" alt="[증량] 마녀공장 갈락토미 필링젤 더블 기획 (120ml+120ml)" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000162370" data-attr="홈^주목브랜드^[증량] 마녀공장 갈락토미 필링젤 더블 기획 (120ml+120ml)^4" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">마녀공장</span><p class="tx_name">[증량] 마녀공장 갈락토미 필링젤 더블 기획 (120ml+120ml)</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000162370">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">35,000</span>원 </span><span class="tx_cur"><span class="tx_num">17,500</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:96.0%">10점만점에 5.5점</span></span>(438)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000162370" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
										
											
										
											
									</ul>
									
									<div class="brand_more"><a href="javascript:common.link.moveBrandShop('A001924', 'Home_Brand_Banner');"><span>마녀공장</span> 브랜드 상품 전체보기</a></div>
									</div>
									
								
							
								

								
								
								
								
								
									
										
										
										
										<div class="main_brand_tab2 main_brand brndList show" data-ref-brndNo="A000426">

									
									
										
									
								

								
								
									
									<ul class="cate_prd_list">
										
										
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000175198&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000175198" data-attr="홈^주목브랜드^[NEW]닥터자르트 세라마이딘 스킨 베리어 모이스처라이징 크림 50ml^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000175198^홈_주목브랜드^1"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017519809koe743.jpg?l=ko" alt="[NEW]닥터자르트 세라마이딘 스킨 베리어 모이스처라이징 크림 50ml" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000175198" data-attr="홈^주목브랜드^[NEW]닥터자르트 세라마이딘 스킨 베리어 모이스처라이징 크림 50ml^1" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">닥터자르트</span><p class="tx_name">[NEW]닥터자르트 세라마이딘 스킨 베리어 모이스처라이징 크림 50ml</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000175198">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">42,000</span>원 </span><span class="tx_cur"><span class="tx_num">31,500</span>원 </span></p><p class="prd_flag"><span class="icon_flag coupon">쿠폰</span><span class="icon_flag gift">증정</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:94.0%">10점만점에 5.5점</span></span>(144)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000175198" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000175354&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000175354" data-attr="홈^주목브랜드^[NEW]닥터자르트 세라마이딘 스킨 베리어 세럼 토너 150ml^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000175354^홈_주목브랜드^2"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017535402koe743.jpg?l=ko" alt="[NEW]닥터자르트 세라마이딘 스킨 베리어 세럼 토너 150ml" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000175354" data-attr="홈^주목브랜드^[NEW]닥터자르트 세라마이딘 스킨 베리어 세럼 토너 150ml^2" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">닥터자르트</span><p class="tx_name">[NEW]닥터자르트 세라마이딘 스킨 베리어 세럼 토너 150ml</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000175354">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">37,000</span>원 </span><span class="tx_cur"><span class="tx_num">27,750</span>원 </span></p><p class="prd_flag"><span class="icon_flag coupon">쿠폰</span><span class="icon_flag gift">증정</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:96.0%">10점만점에 5.5점</span></span>(100)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000175354" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000160080&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000160080" data-attr="홈^주목브랜드^닥터자르트 세라마이딘 엑토인-인퓨즈드 크림 50ml^3" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000160080^홈_주목브랜드^3"><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0016/A00000016008004koe743.jpg?l=ko" alt="닥터자르트 세라마이딘 엑토인-인퓨즈드 크림 50ml" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000160080" data-attr="홈^주목브랜드^닥터자르트 세라마이딘 엑토인-인퓨즈드 크림 50ml^3" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">닥터자르트</span><p class="tx_name">닥터자르트 세라마이딘 엑토인-인퓨즈드 크림 50ml</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000160080">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">68,000</span>원 </span><span class="tx_cur"><span class="tx_num">47,100</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag coupon">쿠폰</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:94.0%">10점만점에 5.5점</span></span>(181)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000160080" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
												<li class="flag">
													
														<div class="prd_info "><a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000173587&amp;dispCatNo=90000010001&amp;trackingCd=Home_Brand&amp;curation&amp;egcode&amp;rccode&amp;egrankcode" name="Home_Brand" class="prd_thumb goodsList" data-ref-goodsNo="A000000173587" data-attr="홈^주목브랜드^[한정수량1+1]닥터자르트 시카페어 그린 리페어 세럼 30ml 1+1 기획^4" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null" data-impression="A000000173587^홈_주목브랜드^4"><span class="thumb_flag best">베스트</span><img src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0017/A00000017358707koe743.jpg?l=ko" alt="[한정수량1+1]닥터자르트 시카페어 그린 리페어 세럼 30ml 1+1 기획" onerror="common.errorImg(this);"></a><div class="prd_name"><a href="javascript:;" name="Home_Brand" class="goodsList" data-ref-goodsNo="A000000173587" data-attr="홈^주목브랜드^[한정수량1+1]닥터자르트 시카페어 그린 리페어 세럼 30ml 1+1 기획^4" data-ref-dispCatNo="90000010001" data-ref-itemNo="001" data-trk="null"><span class="tx_brand">닥터자르트</span><p class="tx_name">[한정수량1+1]닥터자르트 시카페어 그린 리페어 세럼 30ml 1+1 기획</p></a></div><button class="btn_zzim jeem" data-ref-goodsNo="A000000173587">찜하기</button><p class="prd_price"><span class="tx_org"><span class="tx_num">47,000</span>원 </span><span class="tx_cur"><span class="tx_num">42,300</span>원 </span></p><p class="prd_flag"><span class="icon_flag sale">세일</span><span class="icon_flag delivery">오늘드림</span></p><p class="prd_point_area tx_num"><span class="review_point"><span class="point" style="width:96.0%">10점만점에 5.5점</span></span>(999+)</p><p class="prd_btn_area"><button class="cartBtn" data-ref-goodsNo="A000000173587" data-ref-dispCatNo="90000010001" data-ref-itemNo="001">장바구니</button><button class="btn_new_pop goodsList">새창보기</button></p></div>

													
												</li>
											
										
											
										
											
										
											
									</ul>
									
									<div class="brand_more"><a href="javascript:common.link.moveBrandShop('A000426', 'Home_Brand_Banner');"><span>닥터자르트</span> 브랜드 상품 전체보기</a></div>
									</div>
									
								
							
						</div>
					
				</div>
			</div>
			<div class="brand_paging">
				
					
						<a href="javascript:;" class="on">1</a>
					
					
				
					
					
						<a href="javascript:;">2</a>
					
				
			</div>
		</div>
		
	
	
	
		<div class="viewRk" style="display:none;">
			<h3 class="main_sub_tit"><strong>실시간 <span class="mBold">View</span> 랭킹</strong></h3>
			<div class="viewRk_topBox">
			<a href="javascript:;" class="refreshBtn"><span class="refreshTxt" onclick="javascript:common.wlog('home_realtime_update')">업데이트</span></a>
				<ul class="viewRk_tab">
					<li class="act"><button>1</button></li>
					<li><button>2</button></li>
				</ul>
			</div>
			<div class="liveRankArea" id="liveRankArea">
			
			</div>
		</div>
		

<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/common/jquery.tmpl.min.js"></script>
<script id="rankViewTmpl" type="text/x-jquery-tmpl">
	<div class="viewRk_depth1 curation_basket clearfix">
		<ul class="viewRk_list viewRk_single">
			{{each(i) rankList}}
			<li style="display:none;">
				<div class="viewRk_inner">									
					<div class="thum" data-ref-goodsNo="${goodsNo}" data-ref-itemNo="${mastLgcGoodsNo}" data-egcode="${egcode}" data-egrank="${egrank}" data-dsCode="home_realtime_product_${i+1}">
                        {{if todaySpecialYn == 'Y'}}
                                <span class="newOyflag today"><em>오특</em></span>
                                <span class="newOyflag time" style="display:none;">
                                    <div class="main-today">
                                        <div class="timer ready">
                                            <span class="nums h">
                                                <span class="num" data-timer-val="0">0</span>
                                                <span class="num" data-timer-val="0">0</span>
                                            </span>
                                            <span class="nums m">
                                                <span class="num" data-timer-val="0">0</span>
                                                <span class="num" data-timer-val="0">0</span>
                                            </span>
                                        </div>
                                    </div>
                               </span>
                        {{/if}}
						<a href="javascript:;" data-attr="홈^실시간VIEW랭킹^${goodsNm }^${i+1}" data-ref-goodsno="${goodsNo}" onclick="javascript: gtm.goods.callGoodsGtmInfo('${goodsNo}', '', 'ee-productClick', '홈_실시간VIEW랭킹', '${i+1}');" data-impression="${goodsNo}^홈_실시간VIEW랭킹^${i+1}">
							<img src="https://image.oliveyoung.co.kr/uploads/images/goods/550/${imgPathNm}" alt="${goodsNm}" onerror="common.errorImg(this);">
						</a>
						<div class="my">
							<button type="button" class="myCart cartBtnRecoBell">
								<span>장바구니</span>
							</button>
							<button type="button" class="mySee btn_zzim">
								<span>찜하기전</span>
							</button>
						</div>
					</div>
					<div class="info">
						<a href="javascript:;" class="a_detail" data-ref-goodsNo="${goodsNo}" data-ref-itemNo="${mastLgcGoodsNo}" data-egcode="${egcode}" data-egrank="${egrank}" data-dsCode="home_realtime_product_${i+1}" data-attr="홈^실시간VIEW랭킹^${goodsNm }^${i+1}">
							<div class="viewArea">
								<span><span class="viewNum">${viewcnt}</span>명이 보고있어요</span>
							</div>
							<dl>
								<dt>
									<p class="tx_brand">${onlBrndNm}</p>
									<p class="tx_name">${goodsNm}</p>
								</dt>
								<dd class="price">
								{{if rateYn == "Y" && dcRate > 0 }}
									<del>${saleAreaPrc}<span>원</span></del>
								{{/if}}
									<strong><span>${dispPrc}</span>원</strong>${priceSuffix}</dd>
								<dd class="icon">
								{{if promFlagYn != null && promFlagYn == "Y"}}
									{{if promKndCd == "P203"}}
									<span class="icon_flag present">GIFT</span>
									{{else}}
									<span class="icon_flag present">${assocPromtStdCnt}+1</span>
									{{/if}}
								{{/if}}
								{{if dsCntFlagYn == "Y" }}
									<span class="icon_flag sale">세일</span>
								{{/if}}
								{{if cpnFlagYn == "Y" }}
									<span class="icon_flag coupon">쿠폰</span>
								{{/if}}
								{{if prstFlagYn == "Y" }}
									<span class="icon_flag gift">증정</span>
								{{/if}}
								{{if freeDlvFlagYn == "Y" }}
									<span class="icon_flag free">무배</span>
								{{/if}}
								{{if quickFlagYn == "Y" }}
									<span class="icon_flag delivery">오늘드림</span>
								{{/if}}
								</dd>
							</dl>
						</a>
					</div>
				</div>
			</li>
			{{/each}}
		</ul>
		<ul class="viewRk_list viewRk_nav">
		{{each(i) rankList}}
			<li class="li_rank_txt ${display}" style="display:none;"><a href="javascript:;"><span class="rkNum">${i+1}</span><span class="rkTxt">${goodsNm}</span></a></li>
		{{/each}}
		</ul>
	</div>
</script>
<script type="text/javascript">
    $(document).ready(function(){
        gtm.goods.initProductImpression();
    });
</script>
	
	
		<script src="${pageContext.request.contextPath }/resources/js/store/store_drawdbaa.js?dumm=20221223001" charset="utf-8"></script>
		<div class="newOpenStoreType2" style="display:none;">
		</div>
	
	
	<!-- 공지사항/고객센터 안내 -->
	<div class="main_customer_box">
		<div class="notice_area">
			<h4>공지사항</h4>
			
				
					
						<p class="notice_cont"><a href="https://www.oliveyoung.co.kr/store/counsel/getNoticeDetail.do?ntcSeq=38824">온라인몰 배송지연에 진심으로 사과드립니다.</a></p>
					
				
			
			
			
			
			
			<a href="https://www.oliveyoung.co.kr/store/counsel/getNoticeList.do" class="more_view" title="공지사항 더보기">더보기</a>
		</div>
		<div class="customer_area">
			<h4>고객센터 <br />이용안내</h4>
			<div class="tel_info">
				<ul>
					<li>
						<strong>온라인몰 고객센터</strong>
						<img src="${pageContext.request.contextPath }/resources/image/main/img_online_tel.png" alt="1522-0882" />
					</li>
					<li>
						<strong>매장 고객센터</strong>
						<img src="${pageContext.request.contextPath }/resources/image/main/img_offline_tel.png" alt="1577-4887" />
					</li>
				</ul>
			</div>
			<div class="online_info">
				<p class="time_info">고객센터 운영시간 [평일 09:00 - 18:00]</p>
				<p>주말 및 공휴일은 1:1문의하기를 이용해주세요.<br />업무가 시작되면 바로 처리해드립니다.</p>
				<button class="btnInquiry" onclick="javascript:common.link.moveQnaList();"><span></span>1:1문의하기</button>
				<button class="btnFaqTop" onclick="javascript:common.faq.getFaqList('99');"><span></span>자주하는 질문</button>
			</div>
		</div>
		
		
		<div class="app_down_link"><img src="${pageContext.request.contextPath }/resources/image/main/img_mobile_app.png" alt="올리브영 모바일 웹-앱을 설치하고 다양한 혜택을 누리세요!" /></div>
		
		
	</div>
	<!--// 공지사항/고객센터 안내 -->
</div>

</div>

<!-- 큐레이션 동의 S -->

<div class="layer_pop_wrap w832" id="curation_agreed" style="margin-left: -416px; top: 517px;" tabindex="0">
	<div class="layer_cont2">
		<h2 class="layer_title2">개인정보 수집 및 활용 동의(선택)</h2>
		<div class="mk_box">
			<p class="top_txt">마케팅 활용을 위한 개인정보 수집 및 활용 동의에 동의하시면 상품 추천 서비스를 받으실 수 있습니다.</p>
			<div class="picBox">
				<div class="scrbar">
					<div class="pic_inner">
						<h3 class="tit">개인정보 수집 및 활용 동의</h3>
						<p class="txt">이벤트, 쿠폰 및 혜택 등에 대한 정보를 받으시려면 개인정보 수집 및 활용에 대한 동의를 선택하셔야 합니다. </p>
						<table class="tbl_agree">
							<caption>마케팅 활용 동의</caption>
							<colgroup><col style="width:15%"><col style="width:55%"><col style="width:30%"></colgroup>
							<thead>
							<tr>
								<th scope="col">구분</th>
								<th scope="col">수집 항목</th>
								<th scope="col">보유기간</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td>선택 항목</td>
								<td>[ 마케팅 활용 동의 시 ]<br>고객 맞춤 상품/서비스 제공(상품/서비스/채널이용 내역), 신규 서비스 개발 및 마케팅 활용, 정기간행물 발송을 위한 성명, 생년월일, 성별, 배송주소, 이메일주소, 휴대전화번호</td>
								<td>회원 탈퇴 후 30일까지 또는 해당<br>서비스 동의 철회시까지</td>
							</tr>
							</tbody>
						</table>
						<div class="picSbox">
							<p class="stit">[개인정보 수집 · 이용목적]</p>
							<p class="stxt">마케팅 활용 및 신규 서비스 개발(마케팅 활동 선택 동의 항목)</p>
							<ol class="mgT5 list">
								<li>- 회원에 대한 맞춤형 서비스, 각종 편의서비스 및 혜택 제공</li>
								<li>- 사은/판촉 행사 등 각종 이벤트 행사 관련 정보 안내</li>
								<li>- 마케팅 및 서비스이용에 대한 분석작업(개별 및 집단 통계분석) 및 신규서비스 개발</li>
								<li>- 제휴행사 및 서비스 홍보를 위한 마케팅 활용 및 제반 마케팅 활동</li>
								<li>- 당사, 관계사 제공 상품 및 서비스 안내, 이벤트정보 및 참여기회 제공(SMS, 전자우편, DM , SNS 등), 앱설치 URL 전송 등</li>
								<li>- 정기간행물의 발송</li>
								<br>
								<li>( * 마케팅 활용에 동의하지 않을 수 있지만, 미동의 시 해당 혜택을 받으실 수 없습니다.)</li>
							</ol>
						</div>
					</div>
				</div>
			</div>
			<p class="btm_txt">동의하지 않으실 수 있으나, 개인정보 맞춤 관련 서비스 이용이 제한될 수 있습니다. [마이페이지&gt;회원정보수정]에서 확인 및 동의 변경 가능</p>
		</div>
		<div class="layer_btn_area">
			<button class="btnMedium fullGreen w100" onclick="javascript:main.main.mktRcvSend();">동의</button>
		</div>
		<button class="layer_close type2" onclick="javascript:main.main.agreedClose();">창 닫기</button>
	</div>
</div>
<!-- //큐레이션 동의 E -->




<input type="hidden" id="mktAgrYn" name="mktAgrYn" value="">
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/main/gnbCommondbaa.js?dumm=20221223001" ></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/main/maindbaa.js?dumm=20221223001" ></script>
<script type="text/javascript">
	$(document).ready(function() {
		common.gnb.todaySpecial.setTodaySpecialFlag('.newOyflag');

		$('.main_cate_list .main_menu').each(function(i){
			var _item = $(this);
			var _txt = _item.text();
			_item.attr('data-attr','공통^메인롤링^'+_txt);
			_item.attr('data-trk', "https://www.oliveyoung.co.kr/");

			$(this).parent().find('.sub_menu').each(function(i){
				var _item2 = $(this);
				var _txt2 = _item2.text();
				_item2.attr('data-attr','공통^메인롤링^'+_txt+'_'+ _txt2);
				_item2.attr('data-trk', "https://www.oliveyoung.co.kr/");
			});
		});

		// 레코벨 사용 여부 셋팅
		main.main.recoBellUseYn = "Y";
		// 레코벨 show 여부 셋팅
		main.main.recoBellViewYn = "Y";
		// 실시간 VIEW랭킹 별도로 show 여부 추가
		main.main.rankRecoBellViewYn = "Y";

		main.main.init();

		var isGtmClickEventForSpecialThemaShopPC = false;
		var intViewportHeightForSpecialThemaShopPC = $(window).innerHeight();
		var curationAreaForSpecialThemaShopPC = $(".main_special_wrap");

		window.dataLayer = window.dataLayer || [];

		window.addEventListener('scroll', function() {
			if(curationAreaForSpecialThemaShopPC.offset()){
				var some1ForSpecialThemaShopPC = curationAreaForSpecialThemaShopPC.offset().top;							// 아래에 걸린 경우
				var some2ForSpecialThemaShopPC = some1ForSpecialThemaShopPC + curationAreaForSpecialThemaShopPC.height() - intViewportHeightForSpecialThemaShopPC;	// 위에 걸린 경우

				if (some1ForSpecialThemaShopPC > 0 && some2ForSpecialThemaShopPC > 0 && $(window).scrollTop() <= some1ForSpecialThemaShopPC && $(window).scrollTop() >= some2ForSpecialThemaShopPC && isGtmClickEventForSpecialThemaShopPC === false) {

					$('.main_special_wrap .spaciality_box .speciality_list .flowslider li').each(function(){
						window.dataLayer.push(
								{
									'event' : 'click-event',
									'data-attr' : '홈^스페셜테마샵^' + $(this).find('a span img').attr('alt') +'_노출'
								}
						);
						isGtmClickEventForSpecialThemaShopPC = true;
					});
				}
			}
		});

		// catchKeyword slide
		if ($('#catch_keyword')) {
			$('#catch_keyword').slick({
				arrows: false,
				fade: true,
				infinite: true,
				speed: 100,
				slidesToShow: 1,
				slidesToScroll: 1,
				draggable: false
			});
			$('#catch_keyword').show();
		}

		if ($('#btn_catch_keyword')) {

			$('#btn_catch_keyword').on('click', function () {
				var $this = $(this).find('.current');
				var totalPage = Number($this.data('total-page'));
				var currentPage = Number($this.data('current-page'));
				var targetPage = (currentPage < totalPage) ? currentPage + 1 : 1;

				$('#catch_keyword').slick('slickNext');

				$this.data('current-page', targetPage);
				$this.html(targetPage);
			});
		}

	});
	console.log("sResult : ");
</script>


<!-- RecoBell Script Start -->

<!-- RecoBell Script End -->







	<div class="laytoast" id="brandOff" style="display: none;">
		<div class="inner">
			<p class="txt_recom txt_01">브랜드<br><em>좋아요</em></p>
		</div>
	</div>
	<div class="laytoast on" id="brandOn" style="display: none;">
		<div class="inner">
			<p class="txt_recom txt_01">브랜드<br><em>좋아요</em></p>
		</div>
	</div>
	<!-- 브랜드 찜 확인 레이어 -->
	<div class="layerAlim brand zzimOn" style="display:none;"><!-- zzimOn / zzimOff -->
	 <span class="icon"></span>
	 <p>브랜드<strong>좋아요</strong></p>
	</div>

	<div class="layerAlim brand zzimOff" style="display:none;"><!-- zzimOn / zzimOff -->
	 <span class="icon"></span>
	 <p>브랜드<strong>좋아요</strong></p>
	</div>
	<!-- 브랜드 찜 확인 레이어 -->
	
	<!-- 찜 확인 레이어 -->
	<div class="layerAlim zzimOn wishPrd" style="display:none;">
		<span class="icon"></span>
		<p class="one"><strong>좋아요</strong></p>
	</div>
	<!--// 찜 확인 레이어 -->
	
	<!-- 찜 취소 레이어 -->
	<div class="layerAlim zzimOff wishPrd" style="display:none;">
		<span class="icon"></span>
		<p class="one"><strong>좋아요</strong></p>
	</div>
	<!--// 찜 취소 레이어 -->

	<!-- 2017-02-23 수정 : TOP 바로가기 버튼 추가 -->
	<div id="directTop">
		<button><span></span>TOP</button>
	</div>
	<!--/ㅁ 2017-02-23 수정 : TOP 바로가기 버튼 추가 -->
	
	<!-- #Footer -->
	<div id="Footer" class="m2105">
		<div class="oneConts">
			<div class="conts">
				<ul class="list-menu">
					<li><a class="brandstory" href="https://www.oliveyoung.co.kr/store/company/brandStory.do">회사소개</a></li>
					<li><a class="recruit" href="https://www.oliveyoung.co.kr/store/company/recruit.do">채용안내</a></li>
					<li><a class="prvsuser" href="https://www.oliveyoung.co.kr/store/prvsuser/getPrvsuser.do">가맹점 개설문의</a></li>
					<li><a class="cjoyp" href="https://oypartner.cj.net/CJOYP/prvsuser/index/index.fo" target="_blank">상품입점 및 제휴문의</a></li>
<!-- 					<li><a class="cyberAudit" href="javascript:common.link.openCyberAudit();">사이버 감사실</a></li> -->
					<li><a class="cyberAudit" href="javascript:common.cyber.oyLayerOpen('cyberAuditPop',this);">사이버 감사실</a></li>
					<li><a class="faqList" href="javascript:common.faq.getFaqList('99');">고객센터</a></li>
				</ul>
				<div class="sel_family_group">
					<a href="#" class="sel_option" title="상세내용 보기">CJ그룹 계열사 바로가기</a>
					<div class="sel_option_list hide">
						<dl>
							<dt>CJ그룹</dt>
							<dd><a href="http://www.cj.net/" target="_blank" title="CJ 주식회사 새창으로 열기">CJ주식회사</a></dd>
						</dl>
						<dl>
							
							<dt>식품 & 식품서비스</dt>
							<dd><a href="https://www.cj.co.kr/kr/index" target="_blank" title="CJ제일제당 (식품) 새창으로 열기">CJ제일제당</a></dd>
							<dd><a href="https://www.cjfoodville.co.kr/main.asp" target="_blank" title="CJ푸드빌 새창으로 열기">CJ푸드빌</a></dd>
							<dd><a href="http://www.cjfreshway.com/index.jsp" target="_blank" title="CJ프레시웨이 새창으로 열기">CJ프레시웨이</a></dd>
							
						</dl>
						<dl>
							<dt>생명공학</dt>
							<dd><a href="https://www.cj.co.kr/kr/about/business/bio" target="_blank" title="CJ제일제당 (바이오) 새창으로 열기">CJ제일제당 BIO사업부문</a></dd>
							<dd><a href="https://www.cj.co.kr/kr/about/business/bio" target="_blank" title="CJ Feed&Care 새창으로 열기">CJ Feed&Care</a></dd>
							
							
						</dl>
						<dl>
							<dt>물류 & 신유통</dt>
							<dd><a href="https://www.cjlogistics.com/ko/main" target="_blank" title="CJ대한통운 새창으로 열기">CJ대한통운</a></dd>
							<dd><a href="http://www.cjenc.co.kr/kr/Default.asp" target="_blank" title="CJ대한통운 (건설) 새창으로 열기">CJ대한통운 건설부문</a></dd>
							<dd><a href="https://www.oliveyoung.co.kr/store/company/brandStory.do" target="_blank" title="CJ올리브영 새창으로 열기">CJ올리브영</a></dd>
							<dd><a href="https://www.cjolivenetworks.co.kr:449/" target="_blank" title="CJ올리브네트웍스 (IT사업) 새창으로 열기">CJ올리브네트웍스</a></dd>
							<dd><a href="https://www.cjoshopping.com:9002/index.asp" target="_blank" title="CJ ENM (오쇼핑) 새창으로 열기">CJ ENM 커머스부문</a></dd>
							
						</dl>
						<dl>
							<dt>엔터테인먼트 & 미디어</dt>
							<dd><a href="https://www.cjem.net:433/main/?locale=ko" target="_blank" title="CJ ENM (E&M)새창으로 열기">CJ ENM 엔터테인먼트부문</a></dd>
							<dd><a href="http://corp.cgv.co.kr/" target="_blank" title="CJ CGV 새창으로 열기">CJ CGV</a></dd>

						</dl>
					</div>
				</div>
			</div>
		</div>
		<div class="twoConts">
			<div class="conts">
				<ul class="list-area">
					<li>
						
						
                        <p class="logo s_yearend">
							<a href="javascript:common.link.moveMainHome();">
								
									
										<img src="${pageContext.request.contextPath }/resources/image/footer/foot_logo_yearend.png" alt="OLIVEYOUNG">
									
									
								
							</a>
						</p>
						<h2>씨제이올리브영 주식회사</h2>
						<p>대표이사 : 구창근 | 사업자등록번호 : 809-81-01574</p>
						<p>주소 : (04323) 서울특별시 용산구 한강대로 372, 24층 <br>(동자동, KDB타워)</p>
						<p>호스팅사업자 : CJ 올리브네트웍스</p>
						<p>통신판매업신고번호 : 2019-서울용산-1428</p>
                        <p><a href="mailto:oliveweb@cj.net" class="email_addr">이메일 : oliveweb@cj.net</a></p>
						<p><a class="link" href="javascript:common.link.openFtcBizInfo();" title="새창 열림">사업자 정보확인 &gt;</a></p>
					</li>
					<li>
						<ul class="list-link">
							<li><a href="javascript:common.link.moveTermsPage();">이용약관</a><a href="javascript:common.link.moveLegalPage();">법적고지</a></li>
							<li><a href="javascript:common.link.movePrivacyPage();">개인정보처리방침</a></li>
							<li><a href="javascript:common.link.moveYouthProtectionPage();">청소년보호방침</a></li>
							<li><a href="javascript:common.link.moveMultimediaPage();">영상정보처리기기 운영/관리 방침</a></li>
							<li><a href="javascript:common.link.moveDenyEmailPage();">이메일무단수집거부</a></li>
						</ul>
					</li>
					<li>
						<h2>하나은행 구매안전 서비스</h2>
						<p>
							올리브영은 현금 결제한 금액에 대해<br>
							하나은행과 채무지급보증 계약을체결<br>
							하여 안전한 거래를 보장하고 있습니다<br>
							<a class="link" href="javascript:common.link.openEscrowPopup('https://static.oliveyoung.co.kr/pc-static-root/html/etc/escrowPopup.html','agree',665,925);" title="새창 열림">서비스 가입사실 확인&gt;</a>
						</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="fourConts">
			<div class="conts">
				<ol>
					<li class="isms">정보보호 관리체계 ISMS 인증획득
						<span class="bar">인증범위 : 온라인 쇼핑몰 운영(CJ올리브영)</span>
						<span class="bar">유효기간 : 2020.12.02 - 2023.12.01</span>
					</li>
					<li class="ncsi">2017~2021 국가고객만족도(NCSI) 헬스앤뷰티전문점 업계 최초 5년 연속 1위​</li>
				</ol>
			</div>
		</div>
		<div class="threeConts">
			<div class="conts"> 
				<p class="copyright">Copyright ⓒ CJ OliveYoung. All Rights Reserved.</p>
				<div class="sns">
					<h2>OLIVE YOUNG SNS</h2>
					<a class="facebook" href="https://www.facebook.com/OLIVEYOUNG" title="페이지 이동" target="_blank"><img src="${pageContext.request.contextPath }/resources/image/footer/iconf_facebook.png" alt="페이스북"></a>
					<a class="insta" href="https://www.instagram.com/oliveyoung_official/" title="페이지 이동" target="_blank"><img src="${pageContext.request.contextPath }/resources/image/footer/iconf_instagram.png" alt="인스타그램"></a>
					<a class="youtube" href="https://www.youtube.com/user/cjoliveyoung/" title="페이지 이동" target="_blank"><img src="${pageContext.request.contextPath }/resources/image/footer/iconf_youtube.png" alt="유튜브"></a>
					<a class="kakao" href="javascript:common.link.openKakao();" title="페이지 이동" ><img src="${pageContext.request.contextPath }/resources/image/footer/iconf_kakaotalk.png" alt="카카오톡"></a>
				</div>
			</div>
		</div>
	</div>
	<!-- //#Footer -->
</div>





<script type="text/javascript">
var _isLoginPage =false;
if(_isLoginPage){
	if (history.state == null) {
	    history.replaceState({status:"check"}, null, null);
	    history.pushState({status:"checkPage"}, null, null);
	}
	
	// 백키
	$(window).bind("popstate", function() {
	    if (history.state != null && history.state.status == "check") {
			//로그인페이지 통한 진입 메인페이지 이동       
			location.href = _baseUrl + "main/main.do";
	    }
	});
}
$('.sel_family_group').find('.sel_option').on({
	'click' : function(e){
		e.preventDefault();
		$(this).parent().find('.sel_option_list').toggleClass('hide');
		if($(this).parent().find('.sel_option_list').hasClass('hide')){
			$(this).attr('title','상세내용 보기')
		}else{
			$(this).attr('title','상세내용 닫기')
		}
	}
});


var _gaUaKey = "UA-92021806-1";
var _wlDomain = "www.oliveyoung.co.kr";

// [3533553] (GA) GA/GTM 기본 셋팅 및 데이터레이어 태깅
var _cartNormalCnt = "";
var _cartQuickCnt = "";

//복사/선택 방지 소스
$(window).load(function() {
	
	console.log('log 종료 처리');
	//기본 상단 GNB & 슬라이드 바 처리
	common.gnb.init();

	//LazyLoad 실행
	common.setLazyLoad();

	//공통 둥둥이 배너 실행
	$('.main_moving_banner').length && common.bann.init();
 
	var parser = new UserAgentUtil(navigator.userAgent);
	// alert(parser.getBrowser().name + " : " + parser.getBrowser().version);
 	if (parser.getBrowser().name.indexOf("msie") >= 0 && (parser.getBrowser().version.startWith("8") || parser.getBrowser().version.startWith("7"))) {
		$(".infoUpgr").show();
	}
 
// $.fn.disableSelection = function() {
//     document.documentElement.style.webkitUserSelect='none';
//
//     return this
//              .attr('unselectable', 'on')
//              .css({'-moz-user-select':'-moz-none',
//                  '-moz-user-select':'none',
//                  '-o-user-select':'none',
//                  '-khtml-user-select':'none',
//                  '-webkit-user-select':'none',
//                  '-ms-user-select':'none',
//                  'user-select':'none',
//                  '-webkit-touch-select':'none'})
//              .bind('selectstart', false)
//              .bind('mousedown', false);
// };
//
// $.fn.enableSelection = function() {
//     document.documentElement.style.webkitUserSelect='none';
//
//     return this
//              .removeAttr('unselectable')
//              .unbind('selectstart', true)
//              .unbind('mousedown');
// };

});


</script>

<script src="${pageContext.request.contextPath }/resources/js/common/common.weblogdbaa.js?dumm=20221223001" charset="utf-8"></script>

<!-- [3533553] (GA) GA/GTM 기본 셋팅 및 데이터레이어 태깅 - dataLayer -->
<script>
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({
		'dimension3': 'pc', 																										// cd3 : 채널유형 [앱:app, 모바일웹:mw, PC웹:pc]
		'dimension18': (sessionStorage.getItem("checkLoginStatus") ? 'y' : 'n'),													// cd18 : 로그인 여부 [로그인:y, 비로그인:n]
		'dimension24': (_cartQuickCnt ? _cartQuickCnt : 0),																		// cd24 : 장바구니 내 상품수 (오늘드림) [* 없을경우:0]
		'dimension25': (_cartNormalCnt ? _cartNormalCnt : 0),																		// cd25 : 장바구니 내 상품수 (일반배송) [* 없을경우:0]
		'dimension121': (sessionStorage.getItem("gtmPreviousTitle") ? sessionStorage.getItem("gtmPreviousTitle") : undefined)		// cd121 : 이전 페이지명 (title) [* 없을경우 undefined]
	});

	// 이전 페이지 title 저장 to sessionStorage
	sessionStorage.setItem("gtmPreviousTitle", document.title);

	// GTM Product Impression 공통 적용
	$(document).ready(function() {
		gtm.goods.initProductImpression();
	});
</script>




<!-- Google Tag Manager -->
<!-- [3561762] (GA) GTM 컨테이너 분리 -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'../../../www.googletagmanager.com/gtm5445.html?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PJLS5M7');</script>
<!-- 기존 GA 스크립트 -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'../../../www.googletagmanager.com/gtm5445.html?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NF4R92W');</script>
<!-- End Google Tag Manager -->

<!-- Global site tag (gtag.js) - Google Ads -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-416582525"></script>
<script>
	function gtag(){window.dataLayer.push(arguments);}

	gtag('js', new Date());
	gtag('config', 'AW-416582525');
</script>
<!-- End of Global site tag (gtag.js) - Google Ads -->
	
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NF4R92W"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->




<div class="layer_pop_wrap" id="layer_pop_wrap" style="z-index:999">
</div>

<div class="popup-contents" id="pop_cont" style="top:50%;width:650px;margin:-258px 0 0 -325px; display:none; z-index:999">
</div>
<div class="layer_pop_wrap w490" id="basketOption" style="z-index:999">
</div>
<div class="layer_pop_wrap w488" id="layerWrap488" style="z-index:999">
</div>
<div class="layer_pop_wrap w680" id="layerWrap680" style="z-index:999">
</div>
<div class="layer_pop_wrap w850" id="layerWrap850" style="z-index:999">
</div>
<div class="layer_pop_wrap w920" id="layerWrap920" style="z-index:999">
</div>
<div class="layer_pop_wrap w850" id="offlineStock" style="z-index:999">
</div>

<div class="layer_pop_wrap w850" id="todayDelivery" style="z-index:999">
</div>

<div class="layer_pop_wrap w850" id="todayRegDelivery" style="z-index:991">
</div>

<div class="layer_pop_wrap experience-popup" id="lay_experience_info">
</div>

<div class="layer_pop_wrap" id="zipcodeQuick" style="z-index:999">
</div>

<div class="layer_pop_wrap w750 tdLayer" id="deliveryTracking">
</div>

<!-- 201912 PC 매장 상세 팝업 -->
<div class="layer_pop_wrap w850" id="store_viewPop_renew" style="z-index:100;width:560px;max-height:1000px;margin-left:-280px;">
</div>

<!-- 201912 PC 매장 취급 현황 팝업 -->
<div class="layer_pop_wrap" id="store_handlePop" style="z-index:999;left:50%;top:0;margin-left:-320px">
</div>

<!-- 202003 PC 반품 가능 매장 찾기 팝업 -->
<div class="layer_pop_wrap" id="returnStorePop" style="z-index:999">
</div>


<div class="popup-contents" id="eventPop" style="z-index:999;top:50%;width:500px;margin:-337px 0 0 -250px;">
</div>


<div class="layer_pop_wrap w480" id="newJoinEvt" style="z-index:999;">
</div>

<input type="hidden" id="popPushMsgRcvYn" name="popPushMsgRcvYn" value=""/>
<div class="oyLayerWrap" id="pushMsgRcvAgrPop">
</div>

<div class="layer_pop_wrap w534" id="layerWrap534" style="z-index:999">
</div>

<div class="layer_pop_wrap" id="crtPopWrap" style="display: none;top:50%;width:849px;">
	<script src="${pageContext.request.contextPath }/resources/js/store/jquery.mCustomScrollbar.concat.min.js"></script>
	<link rel="stylesheet" href="${pageContext.request.contextPath }/resources/css/jquery.mCustomScrollbar.css" />	
	<div class="layer_cont4 w900">
		
	</div>
</div>

<div class="layer_pop_wrap" id="advPopWrap" style="display:none; top:50%;width:850px;">
	<div class="layer_cont4 advPop w850">
	
	</div>
</div>

<div class="oyLayerWrap" id="cyberAuditPop">
</div>

<div id="tempHtml" class="contEditor" style="display:none">
	
</div>


<div class="layer_pop_wrap w560" id="layerWrap560" style="z-index:999">
</div>




		
					<!-- 모달 bootstrap -->
					<script
						src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
						integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
						crossorigin="anonymous">
						
					</script>

					<!-- 다음 주소 Api -->
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<!-- 유효성 확인 자바스크립트 -->
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/registForm_valid_check.js"></script>	
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<!-- 회원가입 눈 아이콘 누르면 비밀번호 보여주는 스크립트 -->				
<script type="text/javascript">
	$(document).ready(function(){
	    $('.show_password i').on('click',function(){
	        $('input[type="password"]').toggleClass('active');
	        if($('input[type="password"]').hasClass('active')){
	            $(this).attr('class',"fa fa-eye-slash fa-lg")
	            .prev('input').attr('type',"text");
	        }else{
	            $(this).attr('class',"fa fa-eye fa-lg")
	            .prev('input').attr('type','password');
	        }
	    });
	});
</script>

<!-- 회원가입 date 오늘 이후로 선택 안 되도록  -->
<script type="text/javascript">
	var now_utc = Date.now()
	var timeOff = new Date().getTimezoneOffset() * 60000;
	var today = new Date(now_utc - timeOff).toISOString().split("T")[0];
	document.getElementById("birthday").setAttribute("max",today);
</script>
						
<script type="text/javascript">
_id = document.querySelector("#memberId");
_pw = document.querySelector("#pw");
_re_pw = document.querySelector("#re_pw");
_memberName = document.querySelector("#memberName");
_email = document.querySelector("#email");
_phone = document.querySelector("#phone");
_birthday = document.querySelector("#birthday");
_sample6_postcode = document.querySelector("#sample6_postcode");
_sample6_address = document.querySelector("#sample6_address");
_sample6_detailAddress = document.querySelector("#sample6_detailAddress");
_sample6_extraAddress = document.querySelector("#sample6_extraAddress");

$('#registModal').on('show.bs.modal', function (e) {
	_id.value = "";
	_pw.value = "";
	_re_pw.value = "";
	_memberName.value = "";
	_email.value = "";
	_phone.value = "";
	_birthday.value = "";
	_sample6_postcode.value = "";
	_sample6_address.value = "";
	_sample6_detailAddress.value = "";
	_sample6_extraAddress.value = "";
	_id.readOnly = false;
});
</script>
</body>
</html>