<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>
회원 탈퇴<br />
<input type="password" name="password" id="password" placeholder="비밀번호를 입력해주세요"/><br />
<input type="password" name="confirmpassword" id="confirmpassword" placeholder="비밀번호를 한번 더 입력해주세요"/><br />
<button type="button" onclick="return passwordcheck()">회원 탈퇴하기</button>
</body>

<script>
function passwordcheck() {
	let memberNum = "${member.memberNum}"
	let password = document.getElementById("password");
	let confirmpassword = document.getElementById("confirmpassword");
	
	if(password.value.trim() === "" || confirmpassword.value.trim() === ""){
		alert("비밀번호를 입력해주세요 빈 칸은 입력할 수 없습니다.");
		return false;
	}
		if(password.value === confirmpassword.value){
			$.ajax({
		        url: "${pageContext.request.contextPath}/mypage/pwCheck?pw="+password.value,
		        type: "get",
		        success: function (result) {
		        	console.log(result);
		            if (result === "success") {
		            	$.ajax({
		    		        url: "${pageContext.request.contextPath}/mypage/withdrawal?memberNum="+memberNum,
		    		        type: "get",
		    		        success: function (result) {
		    		        	console.log(result);
		    		            if (result === "success") {
		    		                alert("회원탈퇴가 정삭적으로 처리되었습니다.");
		    		                window.close();
		    		                opener.location.href = "${pageContext.request.contextPath}/main";
		    		            }
		    		        }
		    		    });
		            }else{
		            	alert("입력한 비밀번호가 일치하지 않습니다 다시 확인 후 입력해주세요");
		            	password.value = "";
		            	confirmpassword.value = "";
		            }
		        }
		    });			
		}else{
			alert("입력한 비밀번호가 일치하지 않습니다 다시 확인 후 입력해주세요");
			password.value = "";
        	confirmpassword.value = "";
        	password.focus();
			return false;
		}
	
}
</script>
</html>