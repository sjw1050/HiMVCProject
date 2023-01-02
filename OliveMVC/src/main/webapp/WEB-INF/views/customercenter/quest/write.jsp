<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath }/resources/css/styledbaa.css?dumm=20221223001" />
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/common/publish/jquery-1.9.1.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/common/publish/prefixfree.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/common/publish/slick.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/common/publish/commondbaa.js?dumm=20221223001"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/netfunnel/netfunneldbaa.js?dumm=20221223001"
	charset="UTF-8"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/netfunnel/pc_skindbaa.js?dumm=20221223001"
	charset="UTF-8"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/common/common.utils.js"
	charset="UTF-8"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/todaydelivery/todaydelivery.js"
	charset="UTF-8"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resources/js/common/publish/jquery.mCustomScrollbar.concat.min.js"></script>
</head>
<jsp:include page="../../header.jsp"></jsp:include>
<body>
	<div id="Contents" class="m2105">
		<div class="sub_title_area customer">
			<h1>
				고객센터 <span>무엇을 도와드릴까요?</span>
			</h1>
			<button type="button" class="btn_inquiry" id="regForm1on1" onclick="javascript:location.href='${pageContext.request.contextPath }/cs/quest/write';">1<em>:</em>1 문의하기</button>
		</div>
		
		<ul class="comm1sTabs threeSet customer">
			<li id="tabFaq"><a
				href="${pageContext.request.contextPath }/cs/faq/faqview" title="선택됨">FAQ</a></li>
			<li id="tab1on1" class="on"><a href="${pageContext.request.contextPath }/cs/quest/view">1:1문의</a></li>
			<li id="tabNotice"><a
				href="https://www.oliveyoung.co.kr/store/counsel/getNoticeList.do">공지사항</a></li>
		</ul>
		<form id="cnslRegForm" method="POST" enctype="multipart/form-data">
		<table class="board-write-1s mgT40">
			<caption>문의유형, FAQ, 내용, 답변등록 알림(선택)으로 이루어진 1:1 문의 등록 표</caption>
			<colgroup>
				<col style="width:25%;">
				<col style="width:75%;">
			</colgroup>
			<tbody>

					<!-- <tr id="cnslGoodsSelect" style="display: none;">
						<th scope="col"><label for="goodsInquiry">문의상품</label></th>
						<td>
							<div class="over" style="width:98%;">
								<div class="input-delete" style="width:84%;">
								
								
									<input type="text" id="goodsInquiry" title="문의상품을 선택해 주세요. (필수)" placeholder="문의상품을 선택해 주세요. (필수)" readonly="readonly">
									
									<button type="button" class="ButtonDelete" onclick="javascript:counsel.reg.goodsDel();">삭제</button>
								</div>
								<input type="button" class="ButtonSubmit" onclick="javascript:counsel.reg.openCnslGoodsList('open');return false;" value="문의상품 선택">
								<input type="hidden" id="cnslSeq" value="">
								<input type="hidden" id="goodsYn" value="N">
								<input type="hidden" id="ordNo" name="ordNo" value="">
								<input type="hidden" id="goodsNo" name="goodsNo" value="">
								<input type="hidden" name="goodsSeq" value="">
							</div>
						</td>
					</tr> -->
					<tr>
						<th><label for="inputTitle">제목</label></th>
						<td>
							<input type="text" name="questionTitle" id="inputTitle" />
						</td>
					</tr>
					<tr class="textarea">
						<th scope="col"><label for="InputTextarea">내용</label></th>
						<td>
							<textarea id="InputTextarea" name="questionContent" cols="5" rows="1" placeholder="문의내용을 입력해주세요.(2000자 이내)" style="width:98%;height:280px;"></textarea>
							<label for="inputFile">
								<button type="button" id="btnFile" class="file">첨부파일</button>
							</label>
							<input type="file" id="inputFile" name="file" class="btnFileAdd" value="첨부파일" title="첨부파일 선택" style="display:none;">
							<input type="hidden" name="fileName" id="cnslFileName" value="">
							<span id="fileName" class="file" style="display: none;"><span></span><button type="button" id="btnFileDelete" class="ButtonDelete">삭제</button></span>
							<span class="txt">5MB 이하의 이미지 파일 (JPG, PNG, GIF) 1개를 첨부하실 수 있습니다.</span>
						</td>
					</tr>
					<tr class="notice">
						<th scope="col">답변등록 알림(선택)</th>
						<td>
							<ul>
								<li>
									<input type="checkbox" id="NoticeSms" value="Y" name="smsRcvYn" class="chkSmall" checked="checked"><label for="NoticeSms">SMS</label>
									<select title="통신사를 선택하세요" id="rgnNoSelect" class="sms" name="cellSctNo" style="width:122px;" selected="selected">
										<option selected="selected">010</option>
										<option>011</option>
										<option>016</option>
										<option>017</option>
										<option>018</option>
										<option>019</option>
										<option>0130</option>
										<option>0303</option>
										<option>0502</option>
										<option>0504</option>
										<option>0505</option>
										<option>0506</option>
									</select>
									<input type="hidden" id="cellSctNo" value="010">
									<span class="des">-</span>
									<input type="tel" class="sms" name="cellTxnoNo" value="5551" title="휴대폰 가운데 4자리를 입력하세요" maxlength="4" placeholder="0000" style="width:122px;">
									<span class="des">-</span>
									<input type="tel" class="sms" name="cellEndNo" value="0176" title="휴대폰 마지막 4자리를 입력하세요" maxlength="4" placeholder="0000" style="width:122px;">
								</li>
								<li>
									<input type="checkbox" id="NoticeEmail" name="emailRcvYn" value="Y" class="chkSmall"><label for="NoticeEmail">E-mail</label>
									<input type="text" title="아이디를 입력하세요" class="email" name="emailAddr1" placeholder="아이디를 입력하세요" style="width:152px;ime-mode:disabled;" disabled="disabled">
									<span class="des">@</span>
									<input type="text" class="email" name="emailAddr2" title="직접 입력 하세요" placeholder="직접 입력 하세요" style="width:140px;ime-mode:disabled;" disabled="disabled">
									<input type="hidden" name="emailAddr" value="cv998@naver.com">
									<select title="도메인 주소를 선택하세요." class="email" style="width:122px;" id="emailAddrSelect" disabled="disabled" selected="selected">
										<option value="-1" selected="selected">직접입력</option>
										<option value="hanmail.net">hanmail.net</option>
										<option value="naver.com">naver.com</option>
										<option value="nate.com">nate.com</option>
										<option value="hotmail.com">hotmail.com</option>
										<option value="yahoo.co.kr">yahoo.co.kr</option>
										<option value="paran.com">paran.com</option>
										<option value="empal.com">empal.com</option>
										<option value="gmail.com">gmail.com</option>
										<option value="dreamwiz.com">dreamwiz.com</option>
										<option value="korea.com">korea.com</option>
										<option value="lycos.co.kr">lycos.co.kr</option>
										<option value="hanafos.com">hanafos.com</option>
										<option value="daum.net">daum.net</option>
										<option value="chol.com">chol.com</option>
										<option value="feechal.com">feechal.com</option>
									</select>
								</li>
							</ul>
						</td>
					</tr>
			</tbody>
		</table>
		</form>
		
			<div class="area1sButton pdT30">
			<a href="javascript:;" id="cnslSubmit" class="btnGreen">등록</a>
			<a href="javascript:;" id="cnslCancel" class="btnGray">취소</a>
			</div>		
		</div>

<script>
if(navigator.appName=="Microsoft Internet Explorer"){
    // 파일첨부 IOS 및 모바일웹에서 사용
        $("#inputFile").bind("onChange", function(){
            if(!common.isEmpty($(".btnFileAdd").val())){
                if(confirm("기존 첨부파일이 있습니다.\n삭제하시겠습니까?")){
                    $(".btnFileAdd").val("");
                    $("#fileName").hide();
                }
            }
        });
    }else{
        $("label[for='inputFile']").click(function(){
            if(!common.isEmpty($(".btnFileAdd").val())){
                if(confirm("기존 첨부파일이 있습니다.\n삭제하시겠습니까?")){
                    $(".btnFileAdd").val("");
                    $("#fileName").hide();
                    $(".btnFileAdd").click();
                }
            }else{
                $(".btnFileAdd").click();
            }
        });
    }

    // 파일첨부시 파일명 노출
    $(".btnFileAdd").change(function() {
        
        var fileNm = "";
        var fileSize = "";
        var agent = navigator.userAgent.toLowerCase();
        
        if(navigator.appName=="Microsoft Internet Explorer" || (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)){ 
            fileNm =  $(".btnFileAdd")[0].value.substring($(".btnFileAdd")[0].value.lastIndexOf("\\")+1);
            image = new Image();
            //image.dynsrc = fileNm;
            // image.src = "file://"+fileNm;
            image.src = document.domain + "/" + fileNm; //익스플로러에서는 도메인 명이 다르면 script 접근이 차단되어 현재 도메인과 동일한 도메인으로 맞춰주어야 한다.
            //$(".textarea td").append("<img src='"+image.src+"' alt='' id='loadable' style='display:none;'/>");
           // document.getElementById("img").innerHTML = "<img src='"+image.src+"' alt='' id='loadable' style='display:none;'/>";
            fileSize = image.fileSize;
        }else{
            fileNm = $(".btnFileAdd")[0].files[0].name;
            fileSize = $(".btnFileAdd")[0].files[0].size;
        }
        //var file = $(".btnFileAdd")[0].files[0];
        var fileExt = /.(bmp|jpg|jpeg|gif|png)$/i;


        //5 * 1024 * 1024
        if (fileSize > 5242880) {
            $(".btnFileAdd").val("");
            alert("5MB미만의 이미지 파일만 첨부할 수 있습니다.");
            return;
        };
        
        if ( !common.isEmpty(fileNm) && !fileExt.test(fileNm)) {
            $(".btnFileAdd").val("");
            alert("등록할 수 없는 파일 형식입니다.");
            return;
        };

        if (!common.isEmpty($(".btnFileAdd").val())) {
            $("#fileName").show();
            //$("#fileName").before(file.name);
            //$("#btnFileDelete").before(file.name);
            $("#fileName span").text(fileNm);
            $("#btnFileDelete").show();
        } else {
            $("#btnFileDelete").hide();
            $("#fileName").hide();
        }

    });

    // 파일삭제
    $("#btnFileDelete").click(function() {
        if (confirm("첨부파일을 삭제하시겠습니까?")) {
            $(".btnFileAdd").val("");
            $("#fileName").hide();
        }
    });

    // 1:1문의 등록
    $("#cnslSubmit").click(function() {        
            $("#cnslSubmit").off();
            var form = $("#cnslRegForm")[0];
            console.log(form);
            form.action = "${pageContext.request.contextPath }/cs/quest/write";
            form.submit();
    });
    
    //1:1문의 등록 취소
    $("#cnslCancel").click(function() {
        var cnslLrgCate = $("#cnslLrgCate").val();
        var cnslMidCate = $("#cnslMidCate").val();
        var inqContLeng = $("[name='inqCont']").val().length;
        var InqContVal = $.trim($("[name='inqCont']").val());
        var fileCk =  $(".btnFileAdd").val();
        //문의유형, 내용, 첨부파일이 있는 경우 confirm창 뜸
        if (cnslLrgCate != "" || cnslMidCate != "" ||inqContLeng > 0 || InqContVal != ""||fileCk !=""){
            if(confirm("입력하신 내용이 저장되지 않습니다. 취소하시겠습니까?")){
                window.location.href= "${pageContext.request.contextPath }/cs/quest/view";
                return false;
            }
        }else{
            window.location.href= "${pageContext.request.contextPath }/cs/quest/view";
            return false;
        }
        
    });
</script>

</body>
</html>