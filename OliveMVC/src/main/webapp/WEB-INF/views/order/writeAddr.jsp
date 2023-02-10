<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath }/resources/css/styledbaa.css" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
</head>
<body>
<input style="display: none" type="hidden" name="member.memberNum" id="memberid" value="${info.memberNum }" />
<table>
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
			<td><input type="text" name="addressNumber" id="addressNumber" placeholder="우편번호"> 
			<input type="button" onclick="addressSearch()" value="우편번호 찾기"><br>
			<input type="text" name="addressinfo" id="addressinfo" placeholder="주소"><br>
			<input type="text" name="addressdetail" id="addressdetail" placeholder="주소지  정보"><br />
			<input type="text" name="addressdetail2" id="addressdetail2" placeholder="상세주소"> </td>
	</tr>	
    </table>
    <button style="color: #999;" type="button" id="addAddress" onclick="adressinsert()">주소 추가하기</button>  
</body>
<script> 

function adressinsert() {
	if(document.getElementById("addressNumber").value.trim() === "" || document.getElementById("addressinfo").value.trim() === "" || document.getElementById("addressdetail2").value.trim() === "" || document.getElementById("receiver").value.trim() === "" || document.getElementById("phone").value.trim() === "" ){
		alert("정확한 값을 입력해주세요 빈 칸은 입력할 수 없습니다.");
		return false;
	}
	let msg = '유효하지 않는 전화번호입니다.';

	if (!/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/.test(document.getElementById("phone").value.replace(/ /g, ''))) {
		alert(msg);
	    return false;
	}	
	
	let member = document.getElementById("memberid");
	console.log(member);
	form = document.createElement("form");
    form.setAttribute("charset", "UTF-8");
    form.setAttribute("method", "Post");  //Post 방식
    //form.setAttribute("action", "${pageContext.request.contextPath }/mypage/insertaddress"); //요청 보낼 주소
    
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
    //form.submit();
    let data = new FormData(form);
    
    $.ajax({
        url: "${pageContext.request.contextPath }/mypage/insertaddress",
        type: "post",
        data: data,
        processData : false,
        contentType: false,
        success: function (result) {
        	console.log(result);
        	if(result === "close"){
        		window.close();
        		opener.parent.location.reload();
        	}
        	
        },
        error: function (e){
        	console.log("ERROR" , e)
        }
    });
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
</html>