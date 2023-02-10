<%-- <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>주문 목록</title>
<script
	src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>
<jsp:include page="../header.jsp"></jsp:include>
<div id="Contents">
<div class="title_box">
			<h1>주문/결제</h1>
			<ul class="step_list">
				<li><span class="step_num tx_num">1</span> 장바구니</li>
				<li class="on"><span class="hide">현재단계</span><span class="step_num tx_num">2</span> 주문/결제</li><!-- 현재단계 li에 클래스 on과 <span class="hide">현재단계</span> 넣어주세요 -->
				<li class="last"><span class="step_num tx_num">3 </span> 주문완료</li>
			</ul>
		</div>
		<div class="title_wrap">
				<h2 class="sub-title2">배송지정보</h2>
				<button type="button" style="color: black;" onclick="showPopUp()">신규 배송지 추가하기</button>
				
				<p class="sub_area" id="pickupHide6"></p>
			</div>
			<form action="${pageContext.request.contextPath }/order/productOrder"
		method="post" onsubmit="return formchk()" id="orderform">
			<table class="tbl_inp_form important" id="dlvpInfo">
			<caption></caption>
				<colgroup>
					<col style="width:170px">
					<col style="width:*">
				</colgroup>
				<tbody>
				<tr>
					<th>기존 배송지 선택</th>
					<td>
					<div><!-- 인풋 나누기  -->
		<c:forEach items="${orderAddress }" var="orderAddress">
			<span> <input type="checkbox" class="addchk"/>수령인: ${orderAddress.receiver}
			<input type="text" name="receiver" value="${orderAddress.receiver}" readOnly disabled/>
				연락처: <input type="text" name="addressNumber"value="${orderAddress.member.phone }" readOnly disabled />  
				주소: <input type="text" name="addressInfo" value="${orderAddress.addressInfo }" readOnly disabled /> 
				<input type="text" name="addressDetail" value="${orderAddress.addressDetail }" readOnly disabled /> 
				<input type="text" name="addressDetail2" value="${orderAddress.addressDetail2 }" readOnly disabled /><br>
				<input type="hidden" name ="addressId" value="${orderAddress.addressId }" readOnly disabled />
			</span>
			<br />
		</c:forEach>
	</div>
					</td>
				</tr>
				</tbody>
				</table>
		<div>
			<h2>배송 상품</h2>
			<table>
			<c:set var = "total" value = "0" />
			<c:if test="${! empty oneOrder }">
				<tr>
					<th>상품정보</th>
					<th>판매가</th>
					<th>수량</th>
					<th>최종 금액</th>
				</tr>
				<tr>
					<td><span>${oneOrder.product.brand.brandName }</span>
						<p>${oneOrder.product.productInfo}${oneOrder.product.productName }</p></td>
					<td>${oneOrder.product.productPrice }</td>
					<td>${oneOrder.orderCount }</td>
					 <td>${oneOrder.product.productPrice * oneOrder.orderCount}</td>
					 <c:set var="total" value="${oneOrder.product.productPrice * oneOrder.orderCount}"/>
				</tr>
			</c:if>
				<c:forEach items="${viewCartList }" var="viewCartList">
					<tr>
						<th>상품정보</th>
						<th>판매가</th>
						<th>수량</th>
						<th>최종 금액</th>
					</tr>
					<tr>
						<td><span>${viewCartList.brandName }</span>
							<p>${viewCartList.productInfo}${viewCartList.productName }</p></td>
						<td>${viewCartList.productPrice }</td>
						<td>${viewCartList.totalProductCount }</td>
						 <td>${viewCartList.productPrice * viewCartList.totalProductCount}</td>
						 <c:set var= "total" value="${total + viewCartList.productPrice * viewCartList.totalProductCount}"/>
					</tr>
				</c:forEach>
			</table>
			<p>총 결제 금액 : ${total } <input type="hidden" name="totalPrice" value="${total }" /></p>
		</div>
		<div>
			<p>
				<input type="submit" value="구매하기"/>
			<p>
		</div>
	</form>
</div>
</body>
<script>

function formchk() {
	let formdata = document.getElementById("orderform");
	console.log(formdata);
	return false;
}

function showPopUp() {
	
	//창 크기 지정
	var width = 500;
	var height = 500;
	
	//pc화면기준 가운데 정렬
	var left = (window.screen.width / 2);
	var top = (window.screen.height / 4);
	
    	//윈도우 속성 지정
	var windowStatus = 'width='+width+', height='+height+', left='+left+', top='+top+', scrollbars=yes, status=no, resizable=yes, titlebar=no';
	
    	//연결하고싶은url
    	const url = "${pageContext.request.contextPath }"+"/mypage/insertaddrform";

	//등록된 url 및 window 속성 기준으로 팝업창을 연다.
	window.open(url, "hello popup", windowStatus);
}

$(document).ready(function() {
	$(".addchk").on('click', function() {
		if ( $(this).prop('checked') ) {
			$('.addchk').prop('checked',false);
			$(this).prop('checked',true);
			if($(this).prop('checked')){
				$('input[type="checkbox"]').siblings("input").attr("disabled", true);
				$(this).siblings("input").attr("disabled", false);
			}else{
				$(this).siblings("input").attr("disabled", true);
			}			
		}
	});
});
	/* let receiver = document.getElementById("receiver");
	let addressNumber = document.getElementById("addressNumber")
	let addressinfo = document.getElementById("addressinfo");
	let addressdetail = document.getElementById("addressdetail");
	let addressdetail2 = document.getElementById("addressdetail2"); */

	/* 전화번호 자동 하이픈 (-)*/
	let phone = document.getElementById("phone");
	function oninputPhone(target) {
		target.value = target.value.replace(/[^0-9]/g, '').replace(
				/(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g,
				"$1-$2-$3");
	}
</script>
</html> --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>주문 목록</title>
<script
	src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<jsp:include page="../header.jsp"></jsp:include>
<body>
<div id="Contents">
<div class="title_box">
			<h1>주문/결제</h1>
			<ul class="step_list">
				<li><span class="step_num tx_num">1</span> 장바구니</li>
				<li class="on"><span class="hide">현재단계</span><span class="step_num tx_num">2</span> 주문/결제</li><!-- 현재단계 li에 클래스 on과 <span class="hide">현재단계</span> 넣어주세요 -->
				<li class="last"><span class="step_num tx_num">3 </span> 주문완료</li>
			</ul>
		</div>
		<div class="title_wrap">
				<h2 class="sub-title2">배송지정보</h2>
				<button type="button" style="color: black;" onclick="showPopUp()">신규 배송지 추가하기</button>
				
				<p class="sub_area" id="pickupHide6"></p>
			</div>
	<form action="${pageContext.request.contextPath }/order/productOrder"
		method="post" onsubmit="return addchk()" id="orderform">
	<div>
	<table class="tbl_inp_form important" id="dlvpInfo">
			<caption></caption>
				<colgroup>
					<col style="width:170px">
					<col style="width:*">
				</colgroup>
				<tbody>
				<tr>
					<th>기존 배송지 선택</th>
					<td>
	<!-- 인풋 나누기  -->
		<c:forEach items="${orderAddress }" var="orderAddress">
			<span> <input type="checkbox" id="address"/>
			수령인:<input type="text" name="receiver" value="${orderAddress.receiver}" readOnly disabled/>
				우편변호: <input type="text" name="addressNumber"value="${orderAddress.addressNumber }" readOnly disabled />  
				주소: <input type="text" name="addressInfo" value="${orderAddress.addressInfo }" readOnly disabled /> 
				<input type="text" name="addressDetail" value="${orderAddress.addressDetail }" readOnly disabled /> 
				<input type="text" name="addressDetail2" value="${orderAddress.addressDetail2 }" readOnly disabled /><br>
				<input type="hidden" name ="addressId" value="${orderAddress.addressId }" readOnly disabled />
			</span>
			</c:forEach>
			</td>
				</tr>
				</tbody>
				</table>
	</div>
		<div>
			<h2>배송 상품</h2>
			<table>
			<c:set var = "total" value = "0" />
			<c:if test="${! empty oneOrder }">
				<tr>
					<th>상품정보</th>
					<th>판매가</th>
					<th>수량</th>
					<th>최종 금액</th>
				</tr>
				<tr>
					<td><span>${oneOrder.product.brand.brandName }</span>
						<p>${oneOrder.product.productInfo}${oneOrder.product.productName }</p></td>
					<td>${oneOrder.product.productPrice }</td>
					<td>${oneOrder.orderCount }</td>
					 <td>${oneOrder.product.productPrice * oneOrder.orderCount}</td>
					 <c:set var="total" value="${oneOrder.product.productPrice * oneOrder.orderCount}"/>
				</tr>
			</c:if>
				<c:forEach items="${viewCartList }" var="viewCartList">
					<tr>
						<th>상품정보</th>
						<th>판매가</th>
						<th>수량</th>
						<th>최종 금액</th>
					</tr>
					<tr>
						<td><span>${viewCartList.brandName }</span>
							<p>${viewCartList.productInfo}${viewCartList.productName }</p></td>
						<td>${viewCartList.productPrice }</td>
						<td>${viewCartList.totalProductCount }</td>
						 <td>${viewCartList.productPrice * viewCartList.totalProductCount}</td>
						 <c:set var= "total" value="${total + viewCartList.productPrice * viewCartList.totalProductCount}"/>
					</tr>
				</c:forEach>
			</table>
			<p>총 결제 금액 : ${total } <input type="hidden" name="totalPrice" value="${total }" /></p>
		</div>
		<div>
			<p>
				<input type="submit" value="구매하기" />
			<p>
		</div>
	</form>
</div>
</div>
</body>
<script>

function addchk() {
	let formdata = document.getElementById("orderform");
	console.log(formdata);
	//return false;
}

function showPopUp() {
	
	//창 크기 지정
	var width = 500;
	var height = 500;
	
	//pc화면기준 가운데 정렬
	var left = (window.screen.width / 2);
	var top = (window.screen.height / 4);
	
    	//윈도우 속성 지정
	var windowStatus = 'width='+width+', height='+height+', left='+left+', top='+top+', scrollbars=yes, status=no, resizable=yes, titlebar=no';
	
    	//연결하고싶은url
    	const url = "${pageContext.request.contextPath }"+"/mypage/insertaddrform";

	//등록된 url 및 window 속성 기준으로 팝업창을 연다.
	window.open(url, "hello popup", windowStatus);
}


$(document).ready(function() {
	$("input:checkbox").on('click', function() {
		if ( $(this).prop('checked') ) {
			$('input[type="checkbox"]').prop('checked',false);
			$(this).prop('checked',true);
			if($(this).prop('checked')){
				$('input[type="checkbox"]').siblings("input").attr("disabled", true);
				$(this).siblings("input").attr("disabled", false);
			}else{
				$(this).siblings("input").attr("disabled", true);
			}			
		}
	});
});
	/* let receiver = document.getElementById("receiver");
	let addressNumber = document.getElementById("addressNumber")
	let addressinfo = document.getElementById("addressinfo");
	let addressdetail = document.getElementById("addressdetail");
	let addressdetail2 = document.getElementById("addressdetail2"); */
	/* 전화번호 자동 하이픈 (-)*/
	let phone = document.getElementById("phone");
	function oninputPhone(target) {
		target.value = target.value.replace(/[^0-9]/g, '').replace(
				/(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g,
				"$1-$2-$3");
	}
	 function addressSearch() {
		new daum.Postcode({
			oncomplete : function(data) {
				// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
				// 각 주소의 노출 규칙에 따라 주소를 조합한다.
				// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
				var addr = ''; // 주소 변수
				var extraAddr = ''; // 참고항목 변수
				//사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
				if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
					addr = data.roadAddress;
				} else { // 사용자가 지번 주소를 선택했을 경우(J)
					addr = data.jibunAddress;
				}
				// 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
				if (data.userSelectedType === 'R') {
					// 법정동명이 있을 경우 추가한다. (법정리는 제외)
					// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
					if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
						extraAddr += data.bname;
					}
					// 건물명이 있고, 공동주택일 경우 추가한다.
					if (data.buildingName !== '' && data.apartment === 'Y') {
						extraAddr += (extraAddr !== '' ? ', '
								+ data.buildingName : data.buildingName);
					}
					// 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
					if (extraAddr !== '') {
						extraAddr = ' (' + extraAddr + ')';
					}
					// 조합된 참고항목을 해당 필드에 넣는다.
					document.getElementById("addressDetail").value = extraAddr;
				} else {
					document.getElementById("addressDetail").value = '';
				}
				// 우편번호와 주소 정보를 해당 필드에 넣는다.
				document.getElementById('addressNumber').value = data.zonecode;
				document.getElementById("addressInfo").value = addr;
				// 커서를 상세주소 필드로 이동한다.
				document.getElementById("addressDetail2").focus();
			}
		}).open();
	} 
</script>
</html>
