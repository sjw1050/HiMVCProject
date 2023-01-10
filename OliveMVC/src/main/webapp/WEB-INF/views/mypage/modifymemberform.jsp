<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>
<jsp:include page="./mypage_header.jsp"></jsp:include>
<div class="mypage-conts">
 <p>${member.memberName }님의 정보 수정</p>

<form action="${pageContext.request.contextPath }/mypage/modifymember" method="post" onsubmit="return check();">
<table>
							<tr>
								<th>아이디:</th>
								<td><input type="text" name="memberId" id="memberId" value="${member.memberId }" /></td>
							</tr>
							<tr>
								<th>비밀번호:</th>
								<td><button style="color: #999;" type="button" onclick="passwordmodiform();" id="pwmodi">비밀번호 변경하기</button>
								<input style="display: none" type="hidden" name="pw" value="${member.pw }"/>
								<input style="display: none" type="hidden" name="memberNum" value="${member.memberNum }"/>
								<input style="display: none" type="password" name="password" id="password" placeholder="기존 비밀번호를 입력해주세요"/>
								<input style="display: none" type="password" name="newpassword" id="newpassword" placeholder="변경 할 비밀번호를 입력해주세요"/>
								<input style="display: none" type="password" name="newpw" id="newconfirmpassword" placeholder="변경 할 비밀번호를 한번 더 입력해주세요"/>
								<button style="display: none; color: #999;" type="button" onclick="return passwordcheck()" id="pwchk">비밀번호 확인</button>
								<button style="display: none; color: #999;" type="button" onclick="cancelpasswordmodi()" id="cancelmodi">변경 취소하기</button>
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
								<td><button style="color: #999;" id="submitbtn" type="submit">전송하기</button></td>
							</tr>
						</table>
</form>
</div>
</div>
</div>
<jsp:include page="../footer.jsp"></jsp:include>
<script type="text/javascript">
let password = "${member.pw}";
let passwordchk = document.getElementById("password");
let newpassword = document.getElementById("newpassword");
let newconfirmpassword = document.getElementById("newconfirmpassword");
let submitbtn = document.getElementById("submitbtn")
let memberId = document.getElementById("memberId");
let memberName = document.getElementById("memberName");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let addressNumber = document.getElementById("addressNumber");
let addressinfo = document.getElementById("addressinfo");	
let addressdetail = document.getElementById("addressdetail");
let addressdetail2 = document.getElementById("addressdetail2");

function passwordmodiform() {
	document.getElementById("password").style.display="block";
	document.getElementById("newpassword").style.display="block";
	document.getElementById("newconfirmpassword").style.display="block";
	document.getElementById("pwchk").style.display="block";
	document.getElementById("cancelmodi").style.display="block";
	document.getElementById("pwmodi").style.display="none";
	submitbtn.style.display = "none";
}
function cancelpasswordmodi() {
	document.getElementById("password").style.display="none";
	document.getElementById("newpassword").style.display="none";
	document.getElementById("newconfirmpassword").style.display="none";
	document.getElementById("pwchk").style.display="none";
	document.getElementById("cancelmodi").style.display="none";
	document.getElementById("pwmodi").style.display="block";
	password = "${member.pw}";
	passwordchk.value = "";
	newpassword.value = "";
	newconfirmpassword.value = "";
	submitbtn.style.display = "block";
}

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
	console.log(passwordchk);
	if(password.trim() === "" || passwordchk.value.trim() === "" || newpassword.value.trim() === "" || newconfirmpassword.value.trim() === ""){
		alert("정확한 값을 입력해주세요 빈 칸은 입력할 수 없습니다.");
		return false;
	}else{
		if(newpassword.value !== newconfirmpassword.value){
			alert("변경할 비밀번호가 일치하지 않습니다.");
			newpassword.value = "";
			newconfirmpassword.value = "";
			return false;
		}
		// if(password !== passwordchk.value || newpassword.value !== newconfirmpassword.value){
			//alert("입력한 비밀번호가 일치하지 않습니다.");
			//passwordchk.value = "";
			//newpassword.value = "";
	//@@ -103,7 +109,22 @@ function passwordcheck() {
		//}else{
			//alert("비밀번호 확인에 성공하였습니다. 변경 할 정보 입력 후 변경하기를 눌러주세요");
			//submit.style.display = "block";
		//}
		console.log(passwordchk.value);
		let string = "pw="+passwordchk.value + "&newpw=" + newpassword.value;
		$.ajax({
	        url: "${pageContext.request.contextPath}/mypage/pwCheck?" +string,
	        type: "get",
	        success: function (result) {
	        	console.log(result);
	            if (result === "success") {
	            	alert("비밀번호 확인에 성공하였습니다. 변경 할 정보 입력 후 변경하기를 눌러주세요 변경하기를 누르지 않을 경우 비밀번호는 변경되지 않습니다.");
	    			submit.style.display = "block";
	            }else if (result === "fail"){
	            	alert("입력한 비밀번호가 일치하지 않습니다 다시 확인 후 입력해주세요");
	            	passwordchk.value = "";
	            	return false;
	            } else if (result === "same"){
	            	alert("기존 비밀번호와 새로 입력한 비밀번호가 동일합니다. 다른 비밀번호로 입력해주세요");
	            	passwordchk.value = "";
	            	newpassword.value = "";
	            	newconfirmpassword.value = "";
	            	return false;;
	            }
	        }
	    });
		}
	}
	
</script>
</body>
</html>