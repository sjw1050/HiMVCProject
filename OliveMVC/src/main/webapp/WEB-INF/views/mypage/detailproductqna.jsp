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
<div>
		<p>
			문의 제목 : <input type="text" name="productQuestionTitle" id="questionTitle"
				value="${qna.productQuestionTitle }" readonly />
		</p>
		<div>
			문의 내용 :
			<textarea name="productQuestion" cols="30" rows="10"
				id="productQuestion" readonly>${qna.productQuestion }</textarea>
		</div>
		<p>문의 상품 : ${qna.product.productName }</p>
		<p>문의 날짜 : ${qna.productQuestionDate }</p>
		<p>문의자 : ${qna.member.memberName }</p>
</div>
<button type="button" onclick="questModifyform();" id="questmodiform">문의 수정하기</button>
<button style="display: none" type="button" onclick="questModify();" id="questmodi">수정한 내용 전송하기</button>

<c:if test="${not empty qna.productQuestionAnswer }">
<div>
	<p>답변 내용:</p>
				<textarea name="productQuestionAnswer" cols="30" rows="3"
					id="productQuestionAnswer" readonly>${qna.productQuestionAnswer }</textarea>
</div>
</c:if>
<c:if test="${empty qna.productQuestionAnswer }">
<c:if test="${not empty sellerInfo }">
<button type="button" onclick="addanswerForm()" id="answeraddformbtn">답변 작성하기</button>
<textarea style="display: none" name="productQuestionAnswer" id="productQuestionAnswer" ></textarea><br />
<button style="display: none" type="button" onclick="return answerAdd()" id="answeraddbtn">답변 전송하기</button>
</c:if>
<div>
	<p>현재 등록된 답변이 없습니다.</p>
</div>
</c:if>

<script>
let answeraddformbtn = document.querySelector("#answeraddformbtn");
let answeraddbtn = document.querySelector("#answeraddbtn");
let productQuestionAnswer = document.querySelector("#productQuestionAnswer");
let questmodiform = document.querySelector("#questmodiform");
let questmodi = document.querySelector("#questmodi");
let memberNum = "${qna.member.memberNum}";
let productQuestion = document.querySelector("#productQuestion");

function addanswerForm() {	
	//console.log(answeraddformbtn, answeraddbtn, productQuestionAnswer, questmodi);
	
	answeraddformbtn.style.display = "none";
	questmodiform.style.display = "none";
	answeraddbtn.style.display = "block";
	productQuestionAnswer.style.display = "block"; 
	
}

function answerAdd() {
	answeraddformbtn.style.display = "block";
	questmodiform.style.display = "block";
	let string = "productQuestionAnswer="+productQuestionAnswer.value+"&productQnaId="+"${qna.productQnaId}";
	$.ajax({
        url: "/mypage/answerinsert?",
        type: "post",
        data: string,
        success: function (result) {
        	console.log(result);
            if (result === "success") {
                alert("답변 작성에 성공하였습니다.");
                document.location.reload();
            }else{
            	alert("답변 작성에 실패하였습니다.");
            	return false;
            }
        }
    });
	
}

function questModifyform() {
	if(("${info.memberNum}") != memberNum || ("${sellerInfo}") != ""){
		alert("작성한 회원만 게시글 수정이 가능합니다.");
		return false;
	}
	if(("${qna.productQuestionAnswer}") != ""){
		alert("답변이 있는 게시글은 수정이 불가합니다.");
		return false;
	}
	questmodiform.style.display = "none";
	questmodi.style.display = "block";
	productQuestion.readOnly = false;
}

function questModify() {
	questmodiform.style.display = "block";
	questmodi.style.display = "none";
	let string = "productQuestion="+productQuestion.value+"&productQnaId="+"${qna.productQnaId}";
	$.ajax({
        url: "/mypage/modifyproductqna?",
        type: "post",
        data: string,
        success: function (result) {
        	console.log(result);
            if (result === "success") {
                alert("문의 수정 에 성공하였습니다.");
                document.location.reload();
            }else{
            	alert("문의 수정에 실패하였습니다.");
            	return false;
            }
        }
    });
}
</script>
</body>
</html>