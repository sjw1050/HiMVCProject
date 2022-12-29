function checkform() {
	var id = document.registForm.memberId;
	var pw = document.registForm.pw;
	var re_pw = document.registForm.re_pw;
	var memberName = document.registForm.memberName;
	var phone = document.registForm.phone;
	var f = document.registForm.f;
	var m = document.registForm.m;

/*이미 사용중인 아이디인지도 체크하기*/
	
/*아이디가 공란일 경우*/
	if (id.value == "") {
		alert("아이디를 입력해주세요");
		id.focus();
		return false;
	};
		
/*비밀번호가 공란일 경우*/	
	if (pw.value == "") {
		alert("비밀번호를 입력해주세요");
		pw.focus();
		return false;
	};
	
/*비밀번호 영문자+숫자+특수조합(8~25자리 입력) 정규식*/
	  var pwdCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

	  if (!pwdCheck.test(pw.value)) {
	    alert("비밀번호는 영문자+숫자+특수문자 조합으로 8~25자리 사용해야 합니다.");
	    pw.focus();
	    return false;
	  };	
	  
/*비밀번호 재확인 불일치*/
	  if (re_pw.value !== pw.value) {
		    alert("비밀번호가 일치하지 않습니다..");
		    re_pw.focus();
		    return false;
		  };
		  
/*이름이 공란일 경우*/
	  if (memberName.value == "") {
			 alert("이름을 입력하세요.");
			 memberName.focus();
			 return false;
		  };
	
/*성별 체크 안 했을 경우*/
	  if (!f.checked && !m.checked) { 
			  alert("성별을 선택해 주세요.");
			  f.focus();
			  return false;
	   	};	
	   	
/*전화번호 란에는 숫자만 입력 가능 */
	    var reg = /^[0-9]+/g;

	    if (!reg.test(phone.value)) {
	      alert("전화번호는 숫자만 입력할 수 있습니다.");
	      phone.focus();
	      return false;
	    };
	    
/*이메일 공란일 때*/
	    if (email.value == "") {
	        alert("이메일 주소를 입력하세요.");
	        email.focus();
	        return false;
	      };
	
	 // 만약 값이 다 넘어왔다면 전송해줘라
	 document.registForm.submit();

}

/*이메일 옵션 선택후 주소 자동 완성*/
/*function change_email() {
  var email_add = document.main.email_add;
  var email_sel = document.main.email_sel;

  //지금 골라진 옵션의 순서와 값 구하기
  var idx = email_sel.options.selectedIndex;
  var val = email_sel.options[idx].value;

  email_add.value = val;
}*/