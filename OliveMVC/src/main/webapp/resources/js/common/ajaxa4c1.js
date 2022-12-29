$.ajaxSetup({
	statusCode:{
		404 : function(){
			alert('No Such Page Error: Check the request URL');
		},
		400 : function(xhr){
			alert('Bad Request: Invalid Input Data.');
			console.log(xhr);
		}
	}
});

$.namespace("common.Ajax");
common.Ajax = {

	getAjaxObj : function(_method, _url, _data){
		return $.ajax({
	       	 type 	: _method
	       	,url 	: _url
	       	,data 	: _data
	    });
	},

	sendRequest : function(_method, _url, _data, _callback, _async){
		var that = this;
		$.ajax({
       	 type 	: _method
       	,url 	: _url
       	,data 	: _data
        ,async  : _async
       	,success: function(response){
       	    
       		that.proceed(response, _callback);
       	 }
       	,error	: function (jqXHR,error, errorThrown){
       		that.error(jqXHR,error, errorThrown);
       	 }
       	,beforeSend : function (){
       		that.before();
       	 }
       	,complete : function (){
       		that.after();
       	 }
       });
	},

	sendJSONRequest : function(_method, _url, _data, _callback, _async){
	    var that = this;
	    _async = _async && true;
	    
		$.ajax({
	       	 type 	: _method
	       	,url 	: _url
	       	,data 	: _data
	       	,async  : _async
	       	,dataType : "json"
	       	,success: function(response){
	       	    
	       		that.proceed(response, _callback);
	       	 }
	       	,error	: function (jqXHR,error, errorThrown){
	       		that.error(jqXHR,error, errorThrown);
	       	 }
	       });
	},

	/**
	 * 순차적으로 여러 개의 ajax 요청을 전송할 때 사용한다.
	 * ajax 객체를 생성하기 위해 commerce.admin.common.Ajax.getAjaxObj 메소드를 사용할 수도 있다.
	 * 사용 방법은 다음과 같다.
	 *
	 *  //1. 순차적으로 동작할 ajax 호출을 작성하고 배열에 입력한다.
	 *  var ajax1 = $.ajax(_baseUrl + "/board/listJSON.do");
     *	var ajax2 = $.ajax(_baseUrl + "/board/listJSON.do");
     *	var requests = [ajax1, ajax2];
     *
     *  //2. 구현된 callback 메소드를 각각 순서대로 배열에 입력한다.
     *	var callbacks = [commerce.mobile.BoardList._callback_getBoardList, commerce.mobile.BoardList._callback_getBoardList];
     *
     *  //3. commerce.admin.common.Ajax.sendMultipleRequest를 호출한다.
     *	commerce.admin.common.Ajax.sendMultipleRequest(requests, callbacks);
	 *
	 * @param _requests
	 * @param _callbacks
	 */
	sendMultipleRequest : function(_requests, _callbacks){
		var that = this;
		$.when.apply(undefined, _requests).done(function(){
			for(var i = 0 ; i < arguments.length ; i ++){
				that.proceed(arguments[i][0], _callbacks[i]);
			}
		});
	},

	/**
	 * JSONP 요청을 전송하는 메소드
	 *
	 * @param _method
	 * @param _url
	 * @param _data
	 * @param _callback
	 */
	sendJsonpRequest : function(_method, _url, _data, _callback){
		var that = this;
		$.ajax({
	       	 type 	: _method
	       	,url 	: _url
	       	,data 	: _data
	       	,dataType : "jsonp"
	       	,success: function(response){that.proceed(response, _callback, true);}
	       	,error	: function (jqXHR,error, errorThrown){that.error(jqXHR,error, errorThrown);}
	       });
	},

	proceed : function(response, _callback, isJSONP){
		var that = this;
		var jsonObject;
		try{
			if(isJSONP || typeof response === 'object'){
				jsonObject = response;
			}else{
			    jsonObject = $.parseJSON(response);
			}
			
			if(jsonObject.succeeded === false){
				// errorCode remove
				jsonObject.message = jsonObject.message.replace(/\(([^)]+)\)/gi, '')
			    alert(jsonObject.message);
                return;
			}
//			//   JSONResponseEntity 가 아닐 경우 
//            if ( jsonObject == "100" ){
//                window.location.href = _baseUrl + "loginForm.do";
//                
//                return;
//            }
//            
//            //   JSONResponseEntity 일 경우  
//	    	var message = jsonObject.message;
//	    	if(message != undefined && message != null && message != '' && message != 'null'){
//
//	    	    //    로그인이 필요한 서비스에 로그인이 되어 있지 않다면 로그인 페이지로 이동
//	            if ( message == "100" ){
//	                window.location.href = _baseUrl + "loginForm.do";
//	                
//	                return;
//	            }else{
//	                alert(message);    
//	            }
//			}

	    	if(_callback != null && _callback != '' && _callback != undefined) {
	    		_callback(jsonObject);
	        }

		}catch(e){
	    	if(_callback != null && _callback != '' && _callback != undefined) {
	    		_callback(response);
	        }
		}
    	
    	
//		ajax 통신시 전체 데이터에 대해 xss 처리는 side effect가 발생할 수 있으므로 원본 그대로 callback return 처리함. 
//		xss 가 필요한 경우에는 해당 ajax callback 처리 시 구문내에서 xss 처리하도록 함.
//		if(response.message){
//		    alert(that.decodeXss(response.message));
//		}
//		
//		_callback(that.decodeXss(JSON.stringify(response)));

	},

	error: function(xhr, status, error) {
       if(xhr && xhr.responseText){
        	try{
        		var response = $.parseJSON(xhr.responseText);
        		alert(response.message);
        	}catch(error){
        	    console.log(xhr.statusText);
        	}
       }else{
//           alert("알수없는 오류가 발생하였습니다.");
       }
       console.log(error);
    },

	before : function(){
	    $("#ajax_indicator").show().fadeIn('fast');
	},

	after : function(){
	    $("#ajax_indicator").fadeOut();
	},

	getJSON : function(text){
		try{
			if(!text) {
				return false;
			}
			var obj = eval(text);

			// 에러가 발생했다면 "error"라는 key 이름으로 object에 value가 입력되어 있다고 가정한다.
			if(obj.error) {
				alert("비동기 통신에 문제가 생겼습니다. ["+obj.error+"]");

				return;
			}

			if(typeof obj == "object") return obj;
		}
		catch(e){ return false; }
	},

	decodeXss : function (str){
		if(typeof str === 'string' && str != ""){
			if (!isNaN(str)) {
				return str;
			}
			if (str.length < 5) {
				return str;
			}
			var tmp = str;
			tmp = tmp.replaceAll("&#x27;", "'");
			tmp = tmp.replaceAll("&amp;", "&");
			tmp = tmp.replaceAll("&quot;", "\"");
			tmp = tmp.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
			tmp = tmp.replaceAll("&#40;", "(").replaceAll("&#41;", ")");
			tmp = tmp.replaceAll("&#x2F;", "/");
			return tmp;
		}
		else if (typeof str === "object" && str != null) {
			var obj = str;
			if (obj instanceof Array) {
				for (var i=0, len = obj.length; i < len; i++) {
					obj[i] = this.decodeXss(obj[i]);
				}
			} else if(obj instanceof Object) {
				for (var attr in obj) {
					if (obj.hasOwnProperty(attr)) {
						obj[attr] = this.decodeXss(obj[attr]);
					}
				}
			}
			return obj;
		}
		return str;
	}
};