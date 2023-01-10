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

console.log(password);
console.log(passwordchk);
console.log(newpassword);
console.log(newconfirmpassword);
console.log(submit);
console.log(memberId);
console.log(memberName);
console.log(email);
console.log(addressNumber);
console.log(addressinfo);
console.log(addressdetail);
console.log(addressdetail2);

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