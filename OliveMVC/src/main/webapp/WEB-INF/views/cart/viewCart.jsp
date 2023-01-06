<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script type="text/javascript">
//장바구니에서 바로 삭제 
	$(function() {
		$("#deleteCart").submit(function(event) {
			
			if(result){
				alert("삭제 되었습니다!");
				return true;
			}
		});
	});
//장바구니에서 수량 변경
	$(function() {
		$("#modifyQuan").submit(function(event) {
			alert("수량이 변경 되었습니다!");
			return true;
		});
	});
	
//체크박스 전체 선택,해제 하기
	$(document).on('click','#checkAll',function(){
	    if($('#checkAll').is(':checked')){
	       $('.check').prop('checked',true);
	    }else{
	       $('.check').prop('checked',false);
	    }
	});
	$(document).on('click','.check',function(){
	    if($('input[class=check]:checked').length==$('.check').length){
	        $('#checkAll').prop('checked',true);
	    }else{
	       $('#checkAll').prop('checked',false);
	    }
	});
	
</script>

<title>장바구니</title>
</head>
<body>
	<jsp:include page="../header.jsp" />

	<div id="Contents">

		<!-- title_box -->
		<div class="title_box">
			<h1>${info.name }님의장바구니</h1>
			<ul class="step_list">
				<li class="on"><span class="hide">현재단계</span><span
					class="step_num tx_num">1</span> 장바구니</li>
				<!-- 현재단계 li에 클래스 on과 <span class="hide">현재단계</span> 넣어주세요 -->
				<li><span class="step_num tx_num">2</span> 주문/결제</li>
				<li class="last"><span class="step_num tx_num">3 </span> 주문완료</li>
			</ul>
		</div>

		<div class="membership_box  iconGrade5">
			<p class="tx_grade_info">
				<strong>${info.name }</strong>님의 멤버십 레벨은 <span class="grade">${info.level }</span>입니다
			</p>
			<ul class="membership_info_list">
				<li><a
					href="https://www.oliveyoung.co.kr/store/main/getMembership.do"
					class="grade_benefit"><span>등급혜택</span></a></li>
				<li><a
					href="https://www.oliveyoung.co.kr/store/mypage/getCJOnePointInfo.do"><strong><span
							class="tx_num">CJ ONE</span> 포인트</strong> <span class="own_point">
							<span class="tx_num">0</span>P
					</span></a></li>
				<li><a
					href="https://www.oliveyoung.co.kr/store/mypage/getCouponList.do"><strong>할인쿠폰</strong>
						<span class="own_point"><span class="tx_num">0</span>개</span></a></li>
				<li><a
					href="https://www.oliveyoung.co.kr/store/mypage/getDepositList.do"><strong>예치금</strong>
						<span class="own_point"><span class="tx_num">0</span>원</span></a></li>
			</ul>
		</div>
		<!-- 일반배송, 당일배송 탭 -->
		<ul class="comm5sTabs" id="ulDelivGb">
			<li quickyn="N" class="on" style="width: 100%"><button
					type="button" data-attr="장바구니^Tab^일반 배송" title="선택됨">일반 배송</button></li>
			<!-- <li quickyn="Y"><button type="button" data-attr="장바구니^Tab^오늘 드림">오늘드림&amp;픽업
					(0)</button></li> -->
		</ul>
		<h2 class="sub-title2">올리브영 배송상품</h2>
		<table class="tbl_prd_list tableFix">
			<caption>상품정보, 판매가, 수량, 구매가, 배송정보, 선택으로 이루어진 올리브영 배송상품 장바구니
				목록 표</caption>
			<colgroup>
				<col style="width: 40px">
				<col style="width: *">
				<col style="width: 110px">
				<col style="width: 100px">
				<col style="width: 110px">
				<col style="width: 120px">
				<!-- 2017-01-13 수정 -->
				<col style="width: 150px">
			</colgroup>
			<c:if test="${empty viewCartList }">
				<p>
					<strong>장바구니에 든 상품이 없어요</strong>
				</p>
			</c:if>
			<c:if test="${!empty viewCartList }">
				<thead style="text-align: center">
					<tr>
						<th scope="col"><input type="checkbox" id="checkAll" /></th>
						<th scope="col">상품정보</th>
						<th scope="col">판매가</th>
						<th scope="col">수량</th>
						<th scope="col">구매가</th>
						<th scope="col">배송정보</th>
						<th scope="col">선택</th>
					</tr>
				</thead>

				<c:set var="sum" value="0" />
				<c:forEach items="${viewCartList }" var="list" varStatus="status">
					<tbody>
						<tr>
							<td colspan="7">
								<div class="tbl_cont_area">
									<div class="tbl_cell w40">
										<input type="checkbox" class="check"name="check" value="${list.cartId }" />
										<input name="cartId" type="hidden" value="${list.cartId }" />
									</div>
									<div class="tbl_cell w390">
										<div class="prd_info " style="padding-left: 65px">
											<span class="tx_sale_info"> </span>
											<!-- 브랜드명 및 할인정보 -->
											<span id="brandNm">${list.brandName } </span>
											<p id="goodsNm">${list.productInfo}<br> <strong>${list.productName }</strong>
											</p>
											<p class="prd_opt"></p>
											<p class="prd_flag">
												<span class="icon_flag sale">세일</span>
											</p>
										</div>
									</div>
									<div class="tbl_cell w110">

										<span class="cur_price"><span class="tx_num"> <fmt:formatNumber
													value="${list.productPrice }" pattern="#,###" />
										</span>원</span>

									</div>
									<div class="tbl_cell w100">
										<div class="prd_cnt">
											<form
												action="${pageContext.request.contextPath }/cart/modifyQuantity"
												method="post" id="modifyQuan">
												<input name="cartId" type="hidden" id="cartId"
													value="${list.cartId }" /> <input name="totalProductCount"
													min="1" max="100" type="number"
													value="${list.totalProductCount }" /> <input type="submit"
													class="btnSmall wGreen" value="수량변경" />
											</form>
										</div>
									</div>
									<div class="tbl_cell w110">
										<span class="pur_price"><span class="tx_num"> <fmt:formatNumber
													value="${list.productPrice * list.totalProductCount }"
													pattern="#,###" /></span>원</span>
									</div>
									<div class="tbl_cell w120  delay">
										<p class="prd_delivery">
											<strong id="deliStrongText">무료배송<span class="ex">도서·산간
													제외</span></strong>
										</p>

									</div>
									<div class="tbl_cell w150">
										<div class="btn_group">
											<!-- <button id="466079130|A000000131260|001" type="button"
										class="btnSmall wGreen" name="btn_buy"
										data-attr="장바구니^장바구니바로구매^바로구매">
										<span data-attr="장바구니^장바구니바로구매^바로구매">바로구매</span>
									</button> -->
											<!-- 3440969_PM작업시 오늘드림 레이어 팝업 노출 요청 건 - obj인계 불가능에 따른 고유 ID 선언(즉시 구매 시, find로 찾기 위함) -->

											<form id="deleteCart"
												action="${pageContext.request.contextPath }/cart/deleteCart"
												method="post">
												<input name="deleteCartId" type="hidden"
													value="${list.cartId }" /> <input type="submit"
													class="btnSmall wGray delete" value="삭제"
													style="padding: 0px; text-align: center;" />
											</form>

											<!-- <button type="button" class="btnSmall wGray delete"
										name="btnDelete" data-attr="장바구니^장바구니상품삭제^삭제">
										<span data-attr="장바구니^장바구니상품삭제^삭제"></span>
									</button> -->
										</div>
									</div>

								</div>
							</td>
						</tr>
						<c:set var="sum"
							value="${sum + (list.productPrice * list.totalProductCount)}" />
				</c:forEach>
			</tbody>

		</table>

		<!--// 올리브영 배송상품 -->
		<!-- 올리브영 배송상품 결제금액 -->
		<div class="basket_price_info">
			<div class="btn_area">
				<button type="button" class="btnSmall wGray type2" id="partDelBtn1"
					name="partDelBtn" onclick="deleteOrder()">
					<span>선택상품 삭제</span>
				</button>
			</div>
		</div>
		</c:if>
		<div class="total_price_info">
			<div class="sum_price">


				<span class="tx_text">배송비는 싸비스^^</span> 총 결제예상금액 <span
					class="span_quickDeliCharge" style="display: none;">최소</span><span
					class="tx_price"><span class="tx_num"><fmt:formatNumber
							value="${sum }" pattern="#,###" /></span>원</span>
			</div>
		</div>

		<div class="order_btn_area order_cart">
			<button type="button" class="btnOrangeW" name="partOrderBtn"
				onclick="addOrder()">선택 주문</button>
			<button type="button" class="btnOrange" onclick="addAllOrder()">전체 주문</button>
		</div>
		<!-- 2018-07-09 문구추가 -->
		<div class="cart_comment">
			<p>장바구니 상품은 90일동안, 판매종료 된 상품은 10일동안 보관됩니다.</p>
		</div>



		<jsp:include page="../footer.jsp" />
	</div>

	<%-- <h1>${info.name }님의장바구니</h1>
 <c:if test="${!empty viewCartList }">
	<table>
		<tr>
			<th>구매 여부</th>
			<th>제품 이름</th>
			<th>제품 가격</th>
			<th>제품 수량</th>
			<th>제품 총액</th>
		</tr>		
			<c:forEach items="${viewCartList }" var="list" varStatus="status">
				<tr>
					<td><input type="checkbox"id="" value="${list.cartId }"/>
					<input name="cartId" type="hidden" value="${list.cartId }" />
					</td>
					<td>${list.productName }</td>
					<td>${list.productPrice }</td>
					<td>
					<form action="${pageContext.request.contextPath }/cart/modifyQuantity" method = "post">
					<input name="cartId" type="hidden" id="cartId" value="${list.cartId }" />
					<input name="totalProductCount" min="1" type="number"  value="${list.totalProductCount }" />
					<input type="submit"  value ="수량변경" />
					</form>
					<td>${list.productPrice * list.totalProductCount }</td>
					<td>
						<form action="${pageContext.request.contextPath }/cart/deleteCart" method="post">
						<input name="deleteCartId" type="hidden" value="${list.cartId }" />
						<input type="submit" value="삭제"  />
						</form>
					</td>
				</tr>
			</c:forEach>
	</table>
	<button type="button" onclick="addOrder()">선택한 제품 구매하기</button>
	</c:if>	
			<c:if test="${empty viewCartList }">
			<p>장바구니에 든 상품이 없어요</p>
		</c:if> --%>
</body>
<script>
	$(document).ready(function() {
		$("input:checkbox").on('click', function() {
			if ($(this).prop('checked')) {
				var cart = $(this).siblings("input").val();
				console.log(cart);

			}
		});
	});

	function addOrder() {
		if ($("input:checkbox[name='check']").is(":checked") == false) {
			alert("적어도 하나의 상품을 선택해주세요!");
		} else {
			if (confirm("선택한 상품을 주문 하시겠습니까?")) {

				var cartId = [];
				$('input[name="check"]:checked').each(function() {
					var cart = $(this).val();
					cartId.push(cart);
				});
				console.log(cartId);

				var form = document.createElement("form");
				form.setAttribute("charset", "UTF-8");
				form.setAttribute("method", "Post"); //Post 방식
				form
						.setAttribute("action",
								"${pageContext.request.contextPath }/order/viewMyOrder");

				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "cartId");
				hiddenField.setAttribute("value", cartId);
				form.appendChild(hiddenField);

				document.body.appendChild(form);
				console.log(form);
				form.submit();

			} else {

				alert("왜?");
			}

		}

	}
	
	function addAllOrder() {
		
		if (confirm("전체 상품을 주문 하시겠습니까?")) {

			var cartId = [];
            
			$('input[name="check"]').each(function() {
				var cart = $(this).val();
				cartId.push(cart);
			});
			console.log(cartId);

			var form = document.createElement("form");
			form.setAttribute("charset", "UTF-8");
			form.setAttribute("method", "Post"); //Post 방식
			form
					.setAttribute("action",
							"${pageContext.request.contextPath }/order/viewMyOrder");

			var hiddenField = document.createElement("input");
			hiddenField.setAttribute("type", "hidden");
			hiddenField.setAttribute("name", "cartId");
			hiddenField.setAttribute("value", cartId);
			form.appendChild(hiddenField);

			document.body.appendChild(form);
			console.log(form);
			form.submit();

		} else {

			alert("왜?");
		}

	}
	
	function deleteOrder() {

		if ($("input:checkbox[name='check']").is(":checked") == false) {
			alert("적어도 하나의 상품을 선택해주세요!");
		} else {

			if (confirm("선택한 상품을 삭제 하시겠습니까?")) {

				var cartId = [];
				$('input[name="check"]:checked').each(function() {
					var cart = $(this).val();
					cartId.push(cart);
				});
				/* console.log(cartId); */

				var form = document.createElement("form");
				form.setAttribute("charset", "UTF-8");
				form.setAttribute("method", "Post"); //Post 방식
				form
						.setAttribute("action",
								"${pageContext.request.contextPath }/order/deleteOrder");

				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "cartId");
				hiddenField.setAttribute("value", cartId);
				form.appendChild(hiddenField);

				document.body.appendChild(form);
				console.log(form);
				form.submit();
			} else {
				alert("감사합니다.");
			}

		}
	}

	/* var cartId = [];
	$('input[type="checkbox"]:checked').each(function() {
		var cart = $(this).val();
		cartId.push(cart);
	});
	console.log(cartId); */
/* 
	var form = $('<form></form>')
	form.attr('action', '${pageContext.request.contextPath }/order/viewMyOrder');
	form.attr('method', 'post');
	form.appendTo('body');
	form.append('<input name="cartId" type="hidden" value="cartId" />'); */ 
</script>
</html>