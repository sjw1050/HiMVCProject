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
<body>
	<h1>주문/결제</h1>
	<form action="${pageContext.request.contextPath }/order/productOrder"
		method="post">
	<div><!-- 인풋 나누기  -->
		<c:forEach items="${orderAddress }" var="orderAddress">
			<span> <input type="checkbox" id="address"/>
			수령인:<input type="text" name="receiver" value="${orderAddress.receiver}" disabled/>
				우편변호: <input type="text" name="addressNumber"value="${orderAddress.addressNumber }" disabled />  
				주소: <input type="text" name="addressInfo" value="${orderAddress.addressInfo }" disabled /> 
				<input type="text" name="addressDetail" value="${orderAddress.addressDetail }" disabled /> 
				<input type="text" name="addressDetail2" value="${orderAddress.addressDetail2 }" disabled /><br>
				<input type="hidden" name ="addressId" value="${orderAddress.addressId }" disabled />
			</span>
		</c:forEach>
	</div>
		<div>
			<table>
				<tr>
					<th>수령인</th>
					<td><input type="text" name="receiver" id="receiver" />
					</td>
				</tr>
				<tr>
					<th>연락처</th>
					<td><input type="text" class="form-control"
						oninput="oninputPhone(this)" maxlength="14" name="phone" 
						id="phone"></td>
				</tr>
				<tr>
					<th>우편번호</th>
					<td><input type="text" placeholder="우편변호" name="addressNumber" 
						id="addressNumber" /> <input type="button"
						onclick="addressSearch()" value="우편번호 찾기"><br></td>
				</tr>
				<tr>
					<th>주소</th>
					<td><input type="text" placeholder="배송주소" name="addressInfo"
						id="addressInfo" /> <input type="text" placeholder="상세주소1"
						name="addressDetail" id="addressDetail" /> <input type="text"
						placeholder="상세주소2" name="addressDetail2" id="addressDetail2"  />
						</td>
				</tr>
			</table>
		</div>
		<div>
			<h2>배송 상품</h2>
			<table>
			<c:set var = "total" value = "0" />
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

</body>
<script>

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