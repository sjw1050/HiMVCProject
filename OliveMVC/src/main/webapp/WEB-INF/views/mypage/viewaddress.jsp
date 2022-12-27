<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<p><a href="${pageContext.request.contextPath }/mypage/main">돌아가기</a></p>
<h1>배송지 정보 조회</h1> 
<div>
<c:forEach var="address" items="${address }" varStatus="status">
	<p><span>배송지 번호 :</span>${status.count }</p>
	<p><span>배송지 주소 :</span>${address.address }</p>
	<p><span>수령자 :</span>${address.receiver }</p>
	<p><span>연락처 :</span>${address.phone }</p>
	<p><span>주문자 : </span>${address.member.memberName }</p>
	
    <hr />
    <form action="">
   <table style="display: none" id="address" >
   <tr>
		<th>수령자:</th>
		<td><input type="text" name="receiver" value="${address.receiver }"/></td>
	</tr>
	<tr>
		<th>연락처:</th>
		<td><input type="text" name="phone" value="${address.phone }"/></td>
	</tr>
	<tr>
			<th>주소:</th>
			<td><input type="text" name="address" id="sample6_postcode" placeholder="우편번호"> 
			<input type="button" onclick="sample6_execDaumPostcode()" value="우편번호 찾기"><br>
			<input type="text" name="address" id="sample6_address" placeholder="주소" value="${address.address }"><br>
			<input type="text" name="address" id="sample6_extraAddress" placeholder="참고항목"></td>
			<input type="text" name="address" id="sample6_detailAddress" placeholder="상세주소"> 
	</tr>	
    </table>
   </form>
    <button type="button" onclick="modiAddress()">수정하기</button>    
   </c:forEach>
   <button type="button" onclick="addAddress()">새로운 배송지 추가하기</button>   
</div>

<script
		src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
	<!-- 다음 우편번호 api -->
	<script>
	
	function modiAddress() {
		document.getElementById("address").style.display = "block";
	}
		
		function sample6_execDaumPostcode() {
			new daum.Postcode(
					{
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
								if (data.bname !== ''
										&& /[동|로|가]$/g.test(data.bname)) {
									extraAddr += data.bname;
								}
								// 건물명이 있고, 공동주택일 경우 추가한다.
								if (data.buildingName !== ''
										&& data.apartment === 'Y') {
									extraAddr += (extraAddr !== '' ? ', '
											+ data.buildingName
											: data.buildingName);
								}
								// 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
								if (extraAddr !== '') {
									extraAddr = ' (' + extraAddr + ')';
								}
								// 조합된 참고항목을 해당 필드에 넣는다.
								document.getElementById("sample6_extraAddress").value = extraAddr;

							} else {
								document.getElementById("sample6_extraAddress").value = '';
							}

							// 우편번호와 주소 정보를 해당 필드에 넣는다.
							document.getElementById('sample6_postcode').value = data.zonecode;
							document.getElementById("sample6_address").value = addr;
							// 커서를 상세주소 필드로 이동한다.
							document.getElementById("sample6_detailAddress")
									.focus();
						}
					}).open();
		}
	</script>
</body>
</html>