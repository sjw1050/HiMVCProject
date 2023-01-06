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

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<meta http-equiv="Content-Script-Type" content="text/javascript">
<meta http-equiv="Content-Style-Type" content="text/css">
<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
<meta name="format-detection" content="telephone=no">
<meta property="og:type" content="website" />

<!-- 올리브영 css 시작 -->
<link rel="stylesheet"
	href="${pageContext.request.contextPath }/resources/css/styledbaa.css" />
<script>
	//var _path = "${pageContext.request.contextPath }";
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
					href="${pageContext.request.contextPath }/cs/faq/faqview"
					data-attr='고객센터'>고객센터</a></li>
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
			<!-- 검색 오리지날 -->
				<!-- <input type="hidden" name="chkButton" id="chkButton" value="" /> <input
					type="text" id="query" name="" value="" class="inp_placeholder"
					data-placeholder="쿤달 아쿠아올인원 런칭!"
					data-ref-linkUrl="https://www.oliveyoung.co.kr/store/planshop/getPlanShopDetail.do?dispCatNo=500000102190141"
					onKeypress="javascript:pressCheck_WEB_MainSearch((event),this);"
					onkeydown="javascript:downCheck_WEB_MainSearch((event));" />

				<button id="searchSubmit">검색</button> -->
			<!-- 검색 오리지날 -->
			
			
			
			
			<!-- 검색 예리미 변경 -->
				<input type="hidden" name="chkButton" id="chkButton" value="" /> 
				<input
					type="text" id="query" name="" value="" class="inp_placeholder"
					data-placeholder="꺄아아아악 예리미"
					data-ref-linkUrl="/search/mainSearch"
					onKeypress="javascript:pressCheck_WEB_MainSearch((event),this);"
					onkeydown="javascript:downCheck_WEB_MainSearch((event));" />

				<button id="searchSubmit" >검색</button>
			<!-- 검색 예리미 변경 -->
			
			
			
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
				<!-- <li id="todayDeliveryContainer" class="delivery"></li> -->
				<!-- // 오늘드림 플래그 개인화 노출 2차 POC 추가 -->
				<li class="recent"><a href="javascript:;" class="mymenu_layer"
					title="최근 본 상품 자세히보기 열기/닫기">최근 본 상품</a>
					<div class="recent_prd_box" style="min-height: 510px;">
						<p class="recent_tit">
							전체 <span>0</span>개
						<div class="no_data" style="display: none;">최근 본 상품이 없습니다.</div>
					</div></li>
				<c:if test="${empty info }">
				<li class="store "><a href="#" class="mymenu_layer"
					title="관심 매장소식 자세히보기 열기/닫기">관심 매장소식</a>
					<div class="alim_box">			
						<p class="store_desc">
							<span>로그인</span>하시면 자주가는 매장을 <br />관심 매장으로 설정 할 수 있습니다.
						</p>
						<a class="mymenu_btn" data-bs-toggle="modal"
						data-bs-target="#loginModal" data-attr='공통^헤더^로그인'>로그인</a>
						<!-- <button class="mymenu_btn"
							onClick="javascript:common.link.moveLoginPage();">로그인</button> -->			
					</div></li>
					</c:if>
				
			</ul>
		</div>
		<div class="header_design_area"></div>
	</div>

	<!-- <div class="main_moving_banner" style="display: none;">
		<a
			href="https://www.oliveyoung.co.kr/store/storeEvent/getCultureTicketEventDetail.do?evtNo=00000000011227"
			data-attr="홈^우측원형플로팅배너^컬쳐이벤트_디즈니_김채원"><img
			src="${pageContext.request.contextPath }/resources/image/image.oliveyoung.co.kr/uploads/images/display/90000040003/39/263147772111492742.png"
			alt="컬쳐이벤트_디즈니_김채원"
			data-ref-compareKey="90000040003/39/263147772111492742.html" /></a>
		<button type="button" class="moving_banner_close">배너 하루동안 보지
			않기</button>
		2017-02-06 코드수정
	</div> -->

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
	
	<%-- <script src="${pageContext.request.contextPath }/resources/js/search/beta.fixdbaa.js?dumm=20221223001" charset="utf-8"></script>
	<script src="${pageContext.request.contextPath }/resources/js/search/beta2.fixdbaa.js?dumm=20221223001" charset="utf-8"></script>  --%>
	<script src="${pageContext.request.contextPath }/resources/js/search/searchdbaa_yerim.js" charset="utf-8"></script> 
	<%-- <script src="${pageContext.request.contextPath }/resources/js/search/searchdbaa.js?dumm=20221223001" charset="utf-8"></script> --%>
 <%-- 	<script src="${pageContext.request.contextPath }/resources/js/search/arkdbaa.js?dumm=20221223001" charset="utf-8"></script> --%>
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
</body>
</html>