/**
 * <pre>
 * script 특수 문자 치환
 * ", ', \n, \r
 * </pre>
 * @param str 문자열
 * @return 변환된 문자열
 */
function toValidStr(str){
	re1 = /\'/gi;
	re2 = /\"/gi;
	re3 = /\n/gi;
	re4 = /\r/gi;
	str = str.replace(re1, "\'");
	str = str.replace(re2, "\"");
	str = str.replace(re3, "");
	str = str.replace(re4, "");

	return str;
}

/**
 * 앞뒤 빈공간 삭제
 * @param str stirng
 * @return string
 */
if (typeof "$".trim != "function") {
	String.prototype.trim = function() {
		return this.replace(/(^\s*)|(\s*$)/g,'');
	};
}
if (typeof "$".trimLeft != "function") {
	String.prototype.trimLeft = function() {
		return this.replace(/(^\s*)/,'');
	};
}
if (typeof "$".trimRight != "function") {
	String.prototype.trimRight = function() {
		return this.replace(/(\s*$)/,'');
	};
}

String.prototype.padLeft = function(cnt, pad) {
	cnt = (cnt && typeof cnt == "number") ? cnt : 0;
	pad = (pad && typeof pad == "string") ? pad : " ";

	var ret = this;
	if (this.length < cnt) {
		for (var i = this.length; i < cnt; i++) {
			ret = pad + ret;
		}
	}
	return ret;
};

String.prototype.padRight = function(cnt, pad) {
	cnt = (cnt && typeof cnt == "number") ? cnt : 0;
	pad = (pad && typeof pad == "string") ? pad : " ";

	var ret = this;
	if (this.length < cnt) {
		for (var i = this.length; i < cnt; i++) {
			ret = ret + pad;
		}
	}
	return ret;
};


function trim(str) {
	if(typeof(str) == "undefined") return "";
	return str.replace(/(^\s*)|(\s*$)/gi, "");
}




/**
 * 스트링 변환
 * @param originStr 변환 대상 스트링
 * @param from 바꿀 대상 스트링
 * 바꿀 대상 스트링 중에 정규식 표현 문자 『  . 또는 / 또는 (  또는 )   』
 * 가 들어 있을 경우 \\ (역슬래시 두개) 를 앞에 붙여서 표현한다.
 * 예) var str = "12.34"; 에서 . 을 "" 로 replace 할 경우  replaceStr(str, "\\.","");
 * @param to 목적 스트링
 * @return string
 */
function replaceStr(originStr, from, to) {
	if(typeof(originStr) == "undefined") return "";
    if(typeof(originStr) != "string") originStr = String(originStr);
    return originStr.replaceAll(from, to);
}

/**
 * 스트링 변환
 * var str = "abc"; a 를 f 로 바꿀때   str.replaceAll("a","f")  형태로 사용한다.
 * 바꿀 대상 스트링 중에 정규식 표현 문자 『  . 또는 / 또는 (  또는 )   』
 * 가 들어 있을 경우 \\ (역슬래시 두개) 를 앞에 붙여서 표현한다.
 * 예) var str = "12.34"; 에서 . 을 "" 로 replace 할 경우  replaceStr(str, "\\.","");
 * @param from 바꿀 대상 스트링
 * @param to 목적 스트링
 * @return string
 */
String.prototype.replaceAll = function(from, to) {
    return this.replace(new RegExp(from, "g"), to);
};


/**
 * 문자열을 특정 구분자로 나눈 다음 n번째 문자열을 반환한다.
 * @param tokenValue 나눌 문자열
 * @param delimiter 구분자
 * @param number 리턴할 n번째 문자열
 * @return string
 */
function getSplitValue(tokenValue, delimiter, number){
    returnValue = '';
    var tokens = tokenValue.split(delimiter);
    for(i=0;i<tokens.length;i++){
        if(i==eval(number)){
            returnValue = tokens[i];
            break;
        }
    }
    return returnValue;
}

/**
 * <pre>
 * 문자열이 주어진 범위 밖에 있는지 검사한다
 *
 * 최대길이 보다 크거나, 최소길이보다 작으면 에러메세지를 보여주고,
 * true를 리턴한다.
 * </pre>
 * @param field form.element
 * @param min int 최소길이
 * @param max int 최대길이
 * @param error_msg string 에러 Message
 * @return boolean
 */
function isOutOfRange(field, min, max, error_msg){
	var len = getByteLength(field);
	if( len < min || len > max)
	{
		alert(error_msg);
		field.focus();
		field.select();
		return true;
	}
	return false;
}

/**
 * <pre>
 * 정확한 길이가  아닌지 검사
 * 정확한 길이면 false, 정확한 길이가 아닌면 true
 * </pre>
 * @param field 길이를 검사할 element form.element
 * @param len 비교할 길이
 * @param error_msg 에러 Message
 * @return boolean
 */
function isNotExactLength(field, len, error_msg) {
	if(strLength(field) != len) {
		alert(error_msg);
		field.focus();
		field.select();
		return true;
	}
	return false;
}

/**
 * JAVA 에서의 LastOfIndex 와 같은 역할
 */
function getLastOfIndex(str, searchStr) {
    myRexp = new RegExp(searchStr);
    myRexp.exec(str) ;
    return myRexp.lastIndex;
}

/**
 * 원본 문자열을 지정된 포맷으로 변환
 *
 * Usage :  신용카드 => fn_getFormattedString("4444555566668888', "xxxx-****-****-xxxx");
 *                    result : 4444-****-****-8888
 *          주민등록번호 => fn_getFormattedString("8810101034231", "xxxxxx-x******");
 *                        result : 881010-1******
 *
 * @param  : srcStr     원본 문자열
 * @param  : convFormat 지정 포맷 문자열
 * @return : String     변환된 문자열
 * @author : 선수림
 */
function fn_getFormattedString(srcStr, convFormat) {
	var result = "";

	if (!checkValid(srcStr, false)) {
		return srcStr;
	}

	var formatChar;
	var alphaNumericChar = /[a-zA-Z0-9]/;

	for (var i = 0; i < convFormat.length; i++) {
		formatChar = convFormat.substr(i, 1);

		if (alphaNumericChar.test(formatChar)) {
			if (srcStr.length == 0) {
				result += " ";
			} else {
				result += srcStr.substr(0, 1);
				srcStr  = srcStr.substr(1);
			}

		} else {
			result += formatChar;
			if (formatChar == '*') srcStr  = srcStr.substr(1);
		}
	}

	return result;
}

/**
 * 숫자값을 가우스 EMEdit 포멧에 맞게 리턴
 *
 * Usage :  fn_convertToEMEditStr(8.33, "00.000");
 *          > result : 08330
 *			fn_convertToEMEditStr(18.123777, "00.000");
 *          > result : 18124 (반올림)
 *			fn_convertToEMEditStr(1111118.123777, "00.000");
 *          > result : 1111118.123777 (에러)
 * @author : 이지연
 */
function fn_decimalToEMEditStr(srcNumber, editFormat) {
	try{
		dotIdx = editFormat.indexOf('.');
		if(dotIdx < 0){
		 	decimalCnt = 0 ;
		 	totLength = editFormat.length;
		}else{
			decimalCnt = editFormat.length-dotIdx-1;
			totLength = editFormat.length-1;
		}
		x = Math.pow(10,decimalCnt);
		retStr = srcNumber * x;
		retStr = Math.round(retStr);
		if(retStr>=Math.pow(10,totLength))	return srcNumber;
		for(i=0; totLength > (''+retStr).length; i++)
			retStr = '0'+retStr;

		return retStr;
	}catch(err){
		return srcNumber;
	}
}

/**
 * 문자를 PAD함
 *
 * Usage :  PadFormat('L','1','0',5);
 *          > result : '00001'
 *			PadFormat('R','1','0',5);
 *          > result : '10000'
 */
function PadFormat(RL_gb, obj, padstr, tpadcnt)
{
	var return_str = obj;
	if(RL_gb=='L'){
		for(i=0;i< tpadcnt;i++){
			return_str=padstr+return_str;
		}
	}else{
		for(i=0;i< tpadcnt;i++){
			return_str=return_str+padstr;
		}
	}
	return return_str;
}

/**
 * chk메소드
 * 인자값 : (정규식, 검증대상 객체, 검증 실패시 보여 줄 메시지)
 * 검증대상 객체는 반드시 input type = text 만 넣어주세요!
 */
function chk(regex, obj, msg){
	if(obj == null || obj == undefined || obj == ""){
		return false;
	}
	if(regex.test(obj.value)) return true;
	else{
		alert(msg);
		obj.focus();
		return false;
	}
}

// textarea 글자 바이트수 제한
function updateChar_kko(obj, length_limit)
{
   var length = calculate_msglen_kko(obj.value);
   if (length > length_limit) {
       alert("최대 " + length_limit + "byte이므로 초과된 글자수는 자동으로 삭제됩니다.");
       obj.value = obj.value.replace(/\r\n$/, "");
       obj.value = assert_msglen_kko(obj.value, length_limit);
   }
}
//textarea 글자 바이트수 제한
function updateChar_kko2(obj, length_limit)
{
   var length = obj.value.length;
   document.getElementById("order_memo_contents_length").innerHTML = length;
   if (length > length_limit) {
       alert("최대 " + length_limit + "자 이므로 초과된 글자수는 자동으로 삭제됩니다.");
       obj.value = obj.value.replace(/\r\n$/, "");
       obj.value = assert_msglen_kko2(obj.value, length_limit);
       document.getElementById("order_memo_contents_length").innerHTML = obj.value.length;
   }
}
// textarea에 입력된 바이트수 계산
function calculate_msglen_kko(message)
{
   var nbytes = 0;

   for (i=0; i<message.length; i++) {
       var ch = message.charAt(i);
       if(escape(ch).length > 4) {
           nbytes += 2;
       } else if (ch == '\n') {
           if (message.charAt(i-1) != '\r') {
               nbytes += 1;
           }
       } else if (ch == '<' || ch == '>') {
           nbytes += 4;
       } else {
           nbytes += 1;
       }
   }

   return nbytes;
}
// 초과 글자수 삭제
function assert_msglen_kko(message, maximum)
{
   var inc = 0;
   var nbytes = 0;
   var msg = "";
   var msglen = message.length;

   for (i=0; i<msglen; i++) {
       var ch = message.charAt(i);
       if (escape(ch).length > 4) {
           inc = 2;
       } else if (ch == '\n') {
           if (message.charAt(i-1) != '\r') {
               inc = 1;
           }
       } else if (ch == '<' || ch == '>') {
           inc = 4;
       } else {
           inc = 1;
       }
       if ((nbytes + inc) > maximum) {
           break;
       }
       nbytes += inc;
       msg += ch;
   }
   return msg;
}
//초과 글자수 삭제
function assert_msglen_kko2(message, maximum)
{
	var msg = "";
	var msglen = message.length;

	for (i=0; i<msglen; i++) {
		var ch = message.charAt(i);
		if (i >= maximum) {
			break;
		}
		msg += ch;
	}
	return msg;
}


/**
 * StringBuilder object
 */
var StringBuilder = function()
{
	this.buffer = [];
};
StringBuilder.prototype = {
	append : function(str) {
		this.buffer[this.buffer.length] = str;
		return this;
	},
	toString : function(s) {
		return this.buffer.join(s ? s : "");
	}
};

/**
 * timestamp to string
 * - 인자로들어오는 timestamp는 int형 (yyyy-MM-dd)
 */
function timestampToString(timeValue){
	var date = new Date(timeValue);
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var retVal = year + "-"
				+ (month < 10 ? "0" + month : month) + "-"
				+ (day < 10 ? "0" + day : day) + " ";
	return retVal;
}

/**
 * 전화번호 검사
 * @param str stirng
 * @return string
 */
String.prototype.isPhone = function() {
	var arg = argument[0] ? argument[0] : "";
	return eval("(/(02|0[3-9]{1}[0-9]{1})"+arg+"[1-9]{1}[0-9]{2,3}"+arg+"[0-9]{4}$/).test(this)");
};

/**
 * 핸드폰번호 검사
 * @param str stirng
 * @return string
 */
String.prototype.isMobile = function() {

	var arg = argument[0] ? argument[0] : "";
	return eval("(/(01[016789])"+arg+"[1-9]{1}[0-9]{2,3}"+arg+"[0-9]{4}$/).test(this)");
};

/**
 * 전화번호로 변환
 * @param str stirng
 * @return string
 */
String.prototype.toPhone = function() {
	var arg = argument[0] ? argument[0] : "-";
	if(this.isPhone("")) {
		if (this.length == 10) {
			return this.subStr(0, 2) +arg+ this.subStr(2, 4) +arg+ this.subStr(6, 4);
		}
		else {
			return this.subStr(0, 3) +arg+ this.subStr(3, 4) +arg+ this.subStr(7, 4);
		}
	}
};

/**
 * 핸드폰번호 변환
 * @param str stirng
 * @return string
 */
String.prototype.toMobile = function() {
	var arg = argument[0] ? argument[0] : "";
	if(this.isMobile("")) {
		return this.subStr(0, 3) +arg+ this.subStr(3, 4) +arg+ this.subStr(7, 4);
	}
};


function uuidGenerator() {
    var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
};

/**
 * 배열에 담긴 값에 중복으로 입력된 값이 있는지 확인
 * @since 2016/04/01
 * @author bhchoi
 * @param pArr	배열
 * @returns {Boolean}	true(중복)/false(중복아님)
 */
function fn_duplicationDataCheck(pArr) {
	var arr = new Array();
	var index = 0;
	for (i = 0;i < pArr.length;i++) {
		if(index == 0) {
			arr[index] = pArr[i];
			index++;
		} else {
			var is = false;
			for (j = 0;j < arr.length;j++) {
				if(pArr[i] == arr[j]) {
					is = true;
					break;
				}
			}
			if(is){
			} else {
				arr[index] = pArr[i];
			}
		}
	}
	return is;
}

/**
 * Form에 Disabled되어 있는 컨트롤을 활성화하고 시리얼라이즈 한 이후 다시 비활성화
 * @param userForm
 * @returns param
 */
function fn_disabledSerialize(userForm){
	var myform = $(userForm);
	var disabled = myform.find(':input:disabled').removeAttr('disabled');
	var param = myform.serialize();
	disabled.attr('disabled','disabled');
	return param;
}

/**
 * 팝업에서 선택된 배열 값을 확인하여 값이 존재하지 않으면 false 리턴
 * @since 2016/04/29
 * @author bhchoi
 * @param data
 * @returns {Boolean}
 */
function fn_isArrayValueCheck(data){
	var iEmpty = false;
	$.each(data, function(key, value) {
		if(value === null || value === undefined || value === ""){
			iEmpty = true;
		}
	});
	return iEmpty;
};

function existsXssString(str){
    var regExp = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]/gi;

    if(typeof str == 'undefined') return false;
    
    if(regExp.test(str)){
        return true;
    }else{
        return false;
    }
};

function replaceStrXssAll(str){
    if(typeof str == 'undefined') return '';
    
    return str.replace(/[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]/gi, '');
};

function isStrSpecialChar(str){
	if(typeof str == 'undefined') return true;
	var strPattern = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9_()]/;
	return strPattern.test(str);
};

function replaceStrSpecialChar(str){
	if(typeof str == 'undefined') return '';

	return str.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9_()]/gi, '');
};

function replaceStrAddress(str){  
    if(typeof str == 'undefined') return '';
    
    return str.replace(/[<>'"|;]/gi, '');
};