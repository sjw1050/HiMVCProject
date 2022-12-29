<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
</head>
<body>
${member }
 <p>${member.memberName }님의 정보 수정</p>

<form action="${pageContext.request.contextPath }/mypage/modifymember" method="post" onsubmit="return check()">
<table>
							<tr>
								<th>아이디:</th>
								<td><input type="text" name="memberId" id="memberId" value="${member.memberId }" /></td>
							</tr>
							<tr>
								<th>비밀번호:</th>
								<td><button type="button" onclick="passwordmodiform()" id="pwmodi">비밀번호 변경하기</button>
								<input style="display: none" type="hidden" name="pw" value="${member.pw }"/>
								<input style="display: none" type="hidden" name="memberNum" value="${member.memberNum }"/>
								<input style="display: none" type="password" name="password" id="password" placeholder="기존 비밀번호를 입력해주세요"/>
								<input style="display: none" type="password" name="newpassword" id="newpassword" placeholder="변경 할 비밀번호를 입력해주세요"/>
								<input style="display: none" type="password" name="newpw" id="newconfirmpassword" placeholder="변경 할 비밀번호를 한번 더 입력해주세요"/>
								<button style="display: none" type="button" onclick="return passwordcheck()" id="pwchk">비밀번호 확인</button>
								<button style="display: none" type="button" onclick="cancelpasswordmodi()" id="cancelmodi">변경 취소하기</button>
								</td> 
							</tr>
							<tr>
								<th>이름:</th>
								<td><input type="text" name="memberName" id="memberName" value="${member.memberName }" readonly/></td>
							</tr>
							<tr>
								<th>이메일:</th>
								<td><input type="text" name="email" id="email" value="${member.email }"/></td>
							</tr>
			 		 		<tr>
								<th>전화번호:</th>
								<td><input type="text" name="phone" id="phone" value="${member.phone }"/></td>
							</tr>
							<tr>
								<th>주소:</th>
								<td><input type="text" name="addressNumber" id="addressNumber" placeholder="우편번호" value="${member.addressNumber }"> 
								<input type="button" onclick="addressSearch()" value="우편번호 찾기"><br>
								<input type="text" name="addressInfo" id="addressinfo" placeholder="주소" value="${member.addressInfo }"><br>
								<input type="text" name="addressDetail" id="addressdetail" placeholder="주소지  정보" value="${member.addressDetail }"><br />
								<input type="text" name="addressDetail2" id="addressdetail2" placeholder="상세주소" value="${member.addressDetail2 }"> </td>
							</tr>
							<tr>
								<td><button id="submit" type="submit">전송하기</button></td>
							</tr>
						</table>
</form>
<script>

let password = "${member.pw}";
let passwordchk = document.getElementById("password");
let newpassword = document.getElementById("newpassword");
let newconfirmpassword = document.getElementById("newconfirmpassword");
let submit = document.getElementById("submit")
let memberId = document.getElementById("memberId");
let memberName = document.getElementById("memberName");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let addressNumber = document.getElementById("addressNumber");
let addressinfo = document.getElementById("addressinfo");	
let addressdetail = document.getElementById("addressdetail");
let addressdetail2 = document.getElementById("addressdetail2");



function check() {
	if(memberId.value.trim() === "" || memberName.value.trim() === "" || email.value.trim() === "" || phone.value.trim() === "" || 
	   addressNumber.value.trim() === "" || addressinfo.value.trim() === "" || addressdetail.value.trim() === "" || addressdetail2.value.trim() === ""){
		alert("정확한 값을 입력해주세요 빈 칸은 입력할 수 없습니다.");
		return false;
	}
	
	let msg = '유효하지 않는 전화번호입니다.';
    
    if (!/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/.test(phone.value.replace(/ /g, ''))) {
    	alert(msg);
        return false;
    }
	
}

function passwordcheck() {
	if(password.trim() === "" || passwordchk.value.trim() === "" || newpassword.value.trim() === "" || newconfirmpassword.value.trim() === ""){
		alert("정확한 값을 입력해주세요 빈 칸은 입력할 수 없습니다.");
		return false;
	}else{
		if(password !== passwordchk.value || newpassword.value !== newconfirmpassword.value){
			alert("입력한 비밀번호가 일치하지 않습니다.");
			passwordchk.value = "";
			newpassword.value = "";
			newconfirmpassword.value = "";
			return false;
		}else{
			alert("비밀번호 확인에 성공하였습니다. 변경 할 정보 입력 후 변경하기를 눌러주세요");
			submit.style.display = "block";
		}
	}
	
	
}

function passwordmodiform() {
	document.getElementById("password").style.display="block";
	document.getElementById("newpassword").style.display="block";
	document.getElementById("newconfirmpassword").style.display="block";
	document.getElementById("pwchk").style.display="block";
	document.getElementById("cancelmodi").style.display="block";
	document.getElementById("pwmodi").style.display="none";
	submit.style.display = "none";
}

function cancelpasswordmodi() {
	document.getElementById("password").style.display="none";
	document.getElementById("newpassword").style.display="none";
	document.getElementById("newconfirmpassword").style.display="none";
	document.getElementById("pwchk").style.display="none";
	document.getElementById("cancelmodi").style.display="none";
	document.getElementById("pwmodi").style.display="block";
	submit.style.display = "block";
	password = "${member.pw}";
	passwordchk.value = "";
	newpassword.value = "";
	newconfirmpassword.value = "";
	
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