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
	<input style="display: none" type="hidden" name="addressId" id="addressID${status.index }" value="${address.addressId }" />
	<input style="display: none" type="hidden" name="member.memberNum" id="memberid" value="${address.member.memberNum }" />
	<p><span>배송지 번호 :</span>${status.count }</p>
	<p><span>배송지 주소 :</span>&#91;${address.addressNumber}&#93;${address.addressInfo } ${address.addressDetail } ${address.addressDetail2 }</p>
	<p><span>수령자 :</span>${address.receiver }</p>
	<p><span>연락처 :</span>${address.phone }</p>
	<p><span>주문자 : </span>${address.member.memberName }</p>
	<form name="addressform">
	<table style="display: none" id="addresstable${status.index }" >
   <tr>
		<th>수령자:</th>
		<td><input type="text" name="receiver" id="receiver${status.index }" value="${address.receiver }" placeholder="수령자를 입력해주세요"/></td>
	</tr>
	<tr>
		<th>연락처:</th>
		<td><input type="text" name="phone" id="phone${status.index }" value="${address.phone }" placeholder="연락처를 입력해주세요"/></td>
	</tr>
	<tr>
			<th>주소:</th>
			<td><input type="text" name="addressNumber" id="addressNumber${status.index }" placeholder="우편번호" value="${address.addressNumber }"> 
			<input type="button" onclick="addressSearch(${status.index })" value="우편번호 찾기"><br>
			<input type="text" name="addressinfo" id="addressinfo${status.index }" placeholder="주소" value="${address.addressInfo }"><br>
			<input type="text" name="addressdetail" id="addressdetail${status.index }" placeholder="주소지  정보" value="${address.addressDetail }"><br />
			<input type="text" name="addressdetail2" id="addressdetail2${status.index }" placeholder="상세주소" value="${address.addressDetail2 }"> </td>
	</tr>	
    </table>
	<button type="button" id="modiAddressAction${status.index }" onclick="modiAddressAction(${status.index })">수정하기</button>    
    <button style="display: none" type="button" id="modiAddress${status.index }" onclick="modiAddress(${status.index})">수정한 내용 전송하기</button>    
    <button style="display: none" type="button" id="cancelmodiAddress${status.index }" onclick="cancelmodiAddress(${status.index })">수정 취소하기</button>    
    <button type="button" id="deleteAddress${status.index }" onclick="deleteAddress(${status.index })">주소지 삭제하기</button> 
    <hr />
   </form>
   </c:forEach>
   
   <table style="display: none" id="addresstable${status.index }" >
   <tr>
		<th>수령자:</th>
		<td><input type="text" name="receiver" id="receiver" placeholder="수령자를 입력해주세요"/></td>
	</tr>
	<tr>
		<th>연락처:</th>
		<td><input type="text" name="phone" id="phone" placeholder="연락처를 입력해주세요"/></td>
	</tr>
	<tr>
			<th>주소:</th>
			<td><input type="text" name="addressNumber" id="addressNumber" placeholder="우편번호" "> 
			<input type="button" onclick="addressSearch()" value="우편번호 찾기"><br>
			<input type="text" name="addressinfo" id="addressinfo" placeholder="주소" "><br>
			<input type="text" name="addressdetail" id="addressdetail" placeholder="주소지  정보" "><br />
			<input type="text" name="addressdetail2" id="addressdetail2" placeholder="상세주소" "> </td>
	</tr>	
    </table>
   
   <button type="button" id="addAddressAction" onclick="addAddressAction()">새로운 배송지 추가하기</button>   
   <button style="display: none" type="button" id="addAddress" onclick="addAddress()">내용 전송하기</button>   
   <button style="display: none" type="button" id="canceladdAddress" onclick="canceladdAddress()">추가 취소하기</button>   
   
   
   
</div>

<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
	<!-- 다음 우편번호 api -->
	<script>	
	
	function modiAddressAction(index) {
		document.getElementById("addresstable"+index).style.display = "block";
		document.getElementById("modiAddress"+index).style.display = "block";
		document.getElementById("cancelmodiAddress"+index).style.display = "block";
		document.getElementById("modiAddressAction"+index).style.display = "none";
		document.getElementById("deleteAddress"+index).style.display = "none";
		document.getElementById("addAddressAction").style.display = "none";
		
	}
	
	function modiAddress(index) {
		let addressId = document.getElementById("addressID"+index).value;
		//console.log(addressId);
		
		let form = document.createElement("form");
	    form.setAttribute("charset", "UTF-8");
	    form.setAttribute("method", "Post");  //Post 방식
	    form.setAttribute("action", "${pageContext.request.contextPath }/mypage/updateaddress"); //요청 보낼 주소
	    
	    let hiddenField = document.createElement("input");
	    hiddenField.setAttribute("type", "hidden");
	    hiddenField.setAttribute("name", "addressNumber");
	    hiddenField.setAttribute("value", document.getElementById("addressNumber"+index).value);
	    form.appendChild(hiddenField);
	    
	    hiddenField = document.createElement("input");
	    hiddenField.setAttribute("type", "hidden");
	    hiddenField.setAttribute("name", "addressId");
	    hiddenField.setAttribute("value", addressId);
	    form.appendChild(hiddenField);

	    hiddenField = document.createElement("input");
	    hiddenField.setAttribute("type", "hidden");
	    hiddenField.setAttribute("name", "addressInfo");
	    hiddenField.setAttribute("value", document.getElementById("addressinfo"+index).value);
	    form.appendChild(hiddenField);
	    
	    hiddenField = document.createElement("input");
	    hiddenField.setAttribute("type", "hidden");
	    hiddenField.setAttribute("name", "addressDetail");
	    hiddenField.setAttribute("value", document.getElementById("addressdetail"+index).value);
	    form.appendChild(hiddenField);
	    
	    hiddenField = document.createElement("input");
	    hiddenField.setAttribute("type", "hidden");
	    hiddenField.setAttribute("name", "addressDetail2");
	    hiddenField.setAttribute("value", document.getElementById("addressdetail2"+index).value);
	    form.appendChild(hiddenField);
	    
	    hiddenField = document.createElement("input");
	    hiddenField.setAttribute("type", "hidden");
	    hiddenField.setAttribute("name", "receiver");
	    hiddenField.setAttribute("value", document.getElementById("receiver"+index).value);
	    form.appendChild(hiddenField);
	    
	    hiddenField = document.createElement("input");
	    hiddenField.setAttribute("type", "hidden");
	    hiddenField.setAttribute("name", "phone");
	    hiddenField.setAttribute("value", document.getElementById("phone"+index).value);
	    form.appendChild(hiddenField);
	    
	    console.log(form);
	    document.body.appendChild(form);
	    form.submit();
		
		
	}
	
	function cancelmodiAddress(index) {
		document.getElementById("addresstable"+index).style.display = "none";
		document.getElementById("modiAddress"+index).style.display = "none";
		document.getElementById("cancelmodiAddress"+index).style.display = "none";
		document.getElementById("modiAddressAction"+index).style.display = "block";
		document.getElementById("deleteAddress"+index).style.display = "block";
		document.getElementById("addAddressAction").style.display = "block";
	}
	
	function addAddressAction() {
		document.getElementById("addresstable").style.display = "block";
		document.getElementById("addAddress").style.display = "block";
		document.getElementById("canceladdAddress").style.display = "block";
		document.getElementById("addAddressAction").style.display = "none";
		
	}
	
	function addAddress() {	
		let member = document.getElementById("memberid");
		console.log(member);
		form = document.createElement("form");
	    form.setAttribute("charset", "UTF-8");
	    form.setAttribute("method", "Post");  //Post 방식
	    form.setAttribute("action", "${pageContext.request.contextPath }/mypage/insertaddress"); //요청 보낼 주소
	    
	    hiddenField = document.createElement("input");
	    hiddenField.setAttribute("type", "hidden");
	    hiddenField.setAttribute("name", "addressNumber");
	    hiddenField.setAttribute("value", document.getElementById("addressNumber").value);
	    form.appendChild(hiddenField);

	    hiddenField = document.createElement("input");
	    hiddenField.setAttribute("type", "hidden");
	    hiddenField.setAttribute("name", "addressInfo");
	    hiddenField.setAttribute("value", document.getElementById("addressinfo").value);
	    form.appendChild(hiddenField);
	    
	    hiddenField = document.createElement("input");
	    hiddenField.setAttribute("type", "hidden");
	    hiddenField.setAttribute("name", "addressDetail");
	    hiddenField.setAttribute("value", document.getElementById("addressdetail").value);
	    form.appendChild(hiddenField);
	    
	    hiddenField = document.createElement("input");
	    hiddenField.setAttribute("type", "hidden");
	    hiddenField.setAttribute("name", "addressDetail2");
	    hiddenField.setAttribute("value", document.getElementById("addressdetail2").value);
	    form.appendChild(hiddenField);
	    
	    hiddenField = document.createElement("input");
	    hiddenField.setAttribute("type", "hidden");
	    hiddenField.setAttribute("name", "receiver");
	    hiddenField.setAttribute("value", document.getElementById("receiver").value);
	    form.appendChild(hiddenField);
	    
	    hiddenField = document.createElement("input");
	    hiddenField.setAttribute("type", "hidden");
	    hiddenField.setAttribute("name", "phone");
	    hiddenField.setAttribute("value", document.getElementById("phone").value);
	    form.appendChild(hiddenField);  
	    form.appendChild(member);
	    
	    console.log(form);
	    document.body.appendChild(form);
	    form.submit();
	    
	    
	}
	
	function canceladdAddress() {
		document.getElementById("addresstable").style.display = "none";
		document.getElementById("addAddress").style.display = "none";
		document.getElementById("canceladdAddress").style.display = "none";
		document.getElementById("addAddressAction").style.display = "block";
	}
	
	function deleteAddress(index) {
		addressId = document.getElementById("addressID"+index).value
		if(confirm("삭제하시겠습니까? 삭제된 주소지는 복구할  수 없습니다.")){
			location.href="/mypage/deleteaddress?addressId="+addressId;
		}
		
	}
		
		function addressSearch(index) {
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
								document.getElementById("addressdetail"+index).value = extraAddr;

							} else {
								document.getElementById("addressdetail"+index).value = '';
							}

							// 우편번호와 주소 정보를 해당 필드에 넣는다.
							document.getElementById('addressNumber'+index).value = data.zonecode;
							document.getElementById("addressinfo"+index).value = addr;
							// 커서를 상세주소 필드로 이동한다.
							document.getElementById("addressdetail2"+index).focus();
						}
					}).open();
		}
		function addressSearch() {
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
								document.getElementById("addressdetail").value = extraAddr;

							} else {
								document.getElementById("addressdetail").value = '';
							}

							// 우편번호와 주소 정보를 해당 필드에 넣는다.
							document.getElementById('addressNumber').value = data.zonecode;
							document.getElementById("addressinfo").value = addr;
							// 커서를 상세주소 필드로 이동한다.
							document.getElementById("addressdetail2").focus();
						}
					}).open();
		}
	</script>
</body>
</html>