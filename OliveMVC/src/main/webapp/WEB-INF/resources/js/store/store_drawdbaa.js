$.namespace('store.storeDraw');

store.storeDraw = {
		strNm : "",
        init : function() {
        	this.event();
        },
        event : function() {
        	//class는 storeDetailOpenPop가 되도록 selector는 파라미터화 하기 보다는 고정으로 하는 것이 나을듯
        	$('.a_strDetail').unbind("click").click(function(event) {
        		event.preventDefault();
        		
        		var strNo = $(this).data("strno");
        		var obj = {
        			strNo	: strNo,
        			recommYn : "Y"
        		};
        		
        		var strNm = $(this).data("strnm");
        		store.storeDraw.strNm = strNm;
        		
        		store.storeDraw._storeDetailFunc(obj);
        	});
			$('.img_strDetail').unbind("click").click(function(event) {
				event.preventDefault();

				var strNo = $(this).data("strno");
				var obj = {
					strNo	: strNo,
					recommYn : "Y"
				};

				var strNm = $(this).data("strnm");
				store.storeDraw.strNm = strNm;

				store.storeDraw._storeDetailFunc(obj);
			});
        },
        //매장 팝업 호출 파라미터에 의한 요청
        _storeDetailFunc : function(obj) {
            var goUrl	 = _baseUrl + 'store/getStoreDetailAjax.do';
        		
            common.Ajax.sendRequest(
            	'POST',
            	goUrl,
            	obj,
            	this._openViewStorePopup
            );
        },
        //ajax 성공시 실행 callback
        _openViewStorePopup : function(res) {
            var cDiv = $(res.trim());
            $("#store_viewPop_renew").html(cDiv);
            curation.popOpen("store_viewPop_renew");
            $(".mCustomScrollbar", $("#store_viewPop_renew")).mCustomScrollbar({scrollInertia:200});
        },
        setStarEvent : function(obj) {
        	var activeFlag = obj.hasClass('on');
        	var activeFavorFlag = obj.hasClass('checked');
        	var strNo = obj.attr("data_strno");
        	if (activeFlag || activeFavorFlag){
        		store.storeDraw.delFavorStoreAjax(strNo, obj);
        	} else {
        		store.storeDraw.regFavorStoreAjax(strNo, obj);
        	}
        },
        delFavorStoreAjax : function(strNo, obj) {
            var data = {
            	strNo : strNo	
            };
            
            var favorCountObj = $(".str_"+strNo+"_favorCnt").eq(0);
            
            common.Ajax.sendJSONRequest("POST", _baseUrl + "store/delFavorStoreJson.do", data, function(strData) {
            	if(strData.ret == "0"){
            		var cnt = parseInt(replaceAll(favorCountObj.text(), ',', ''))-1;
            		
            		$(".str_"+strNo+"_favorCnt").text(cnt);
            		$(".star_"+strNo).removeClass("on");
            		$(".star_"+strNo).removeClass("checked");
            	} else {
            		common.loginChk();
            	}
            });
        },
        regFavorStoreAjax : function(strNo, obj) {
        	if(!common.loginChk()) {
        		return;
        	}
        	
        	var data = {
            	strNo : strNo	
            };
            
            common.Ajax.sendJSONRequest("POST", _baseUrl + "store/regFavorStoreJson.do", data, function(strData) {
            	if(strData.ret == "10") {
            		var favorCountObj = $(".str_"+strNo+"_favorCnt").eq(0);
            		
            		var cnt = parseInt(replaceAll(favorCountObj.text(), ',', ''))+1;
            		$(".str_"+strNo+"_favorCnt").text(cnt);
            		$(".star_"+strNo).removeClass("active").addClass("on");
            		$(".star_"+strNo).removeClass("active").addClass("checked");
            		
            		common.push.pushMsgAgrPopupOpen(); // 관심매장 등록 성공 시 앱푸시수신동의팝업 노출
            		
            	} else if(strData.ret == "40") {
            		 store.common.dimClickCnt++;
                     
                     $("#linkUrl").prop('href', "javascript:common.link.commonMoveUrl('"+strData.linkUrl+"');");
                     $("#layerPop").html($("#storeEvtLayer").html());
                     $("#layerPop").removeClass('popInner');
            	} else if(strData.ret == "-1") {
            		common.loginChk();
            	} else {
            		alert(strData.message);
            	}
            });
        }
};

$.namespace("store.recommPop")
store.recommPop = {
	init : function() {
		// 취급카테고리 리스트 동적생성
        if(storeTcDtlList.length > 0) {
            var $divInnerList = $(".store_pdList .inner");
            
            for (var i = 0; i < storeTcDtlList.length; i++) {
                var $spanResult = $("<span>").addClass("tag").text(storeTcDtlList[i]);
                
                $divInnerList.append($spanResult);
            }
        }
        
        // 제공서비스 리스트 동적생성
        if(storePsDtlList.length > 0) {
            
            var $ulResult = $(".store_sv");
            
            for(var i = 0; i < storePsDtlList.length; i++) {
                var $liResult = $("<li>");
                
                var $dlResult = $("<dl>").addClass("ico_rss_"+storePsDtlList[i].dtlCd);
                
                var $dtResult = $("<dt>").text(storePsDtlList[i].mrkNm);
                $dlResult.append($dtResult);
                if(storePsDtlList[i].cdDesc != "" && storePsDtlList[i].cdDesc != null) {
                    var $ddResult = $("<dd>").html(storePsDtlList[i].cdDesc);
                    $dlResult.append($ddResult);
                }
                
                $liResult.append($dlResult);
                $ulResult.append($liResult);
            }
        }
        
        var recommYn = $("#recommYn").val(); // 매장추천 팝업 여부
        if(recommYn == "Y") {
            var isNearAvail = true;
            // 브라우저 위치기능 사용할 것인지 알럿 창 띄움
            localStorage.setItem("askLoc","Y");
            // 브라우저 위치기능 사용여부
            localStorage.setItem("useLoc", "Y");
            var useLoc = localStorage.getItem("useLoc") == 'Y' ? true : false;
            
            if(useLoc){//위치정보 허용
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(store.recommPop.onSuccessGeolocation, store.recommPop.onErrorGeolocation, {timeout: 10000});
                }
            }
            
            store.recommPop.addTabEvent();
        }
	},
	onSuccessGeolocation : function(position) {
		var lat = "37.4900806";
	    var lng = "127.0193972";    
	    
	    if (position != '' && position.coords.latitude > 0 && position.coords.longitude > 0) {
	        lat = position.coords.latitude;// 위도
	        lng = position.coords.longitude;// 경도
	    }
	    
	    var data = {
	    	usrLat : lat,
	    	usrLng : lng,
	    	strNo : $("#strNo").val()
	    };
	    
	    common.Ajax.sendRequest("POST", _baseUrl + "store/getStoreDistInfoAjax.do", data, function(data) {
	    	if(data.data != null && data.data != undefined) {
	    		$(".store_nearWay").text(data.data + "km").show();
	    	}
	    });
    },
	onErrorGeolocation : function(error) {
		localStorage.setItem("useLoc", "N");
	},
	addTabEvent : function() {
	    $(".strTab").unbind("click").click(function(event) {
	    	event.preventDefault();
	    	
	    	$(".store_handleTab").find("li").removeClass("on");
	    	$(this).parents("li:eq(0)").addClass("on");
	    	
	    	var id = $(this).attr("id");
	    	if(id == "info") {
	    		$("#strPrdInfo").hide();
	    		$("#strInfo").show();
	    	} else {
	    		$("#strInfo").hide();
	    		$("#strPrdInfo").show();
	    		
	    		if($("#strPrdLoad").val() != "Y") {
	    			$("#bottm_closeBtn").hide(); // 상품 리스트 불러온 뒤 다시 버튼 show
	    			
	    			var url = _baseUrl + "store/getStoreDetailPrdInfoAjax.do"
	    			common.Ajax.sendJSONRequest("POST", url, {}, function(res) {
	    				var recoAges = res.data.recoAges;
	    				var genSctCd = res.data.genSctCd;
	    				var catList = res.data.catList;
	    				
	    				$("#selAge option").filter("[value='"+recoAges+"']").attr("selected", true);
	    				$("#selGen option").filter("[value='"+genSctCd+"']").attr("selected", true);

						$("#selCate").append("<option value='ALL'>"+'전체'+"</option>");

	    				var catLen = catList == undefined ? 0 : catList.length;
	    				for(var i=0; i<catLen; i++) {
	    					if(catList[i].lvl == 1) {
	    						$("#selCate").append("<option value='"+catList[i].dispCatNo+"'>"+catList[i].catNm+"</option>");
	    					}
	    				}
	    				
	    				$("#strPrdLoad").val("Y");
	    				
	    				store.recommPop.getStoreBestProdList();
	    			}, false);
	    		}
	    	}
	    });
	    
	    $("#selAge, #selGen, #selCate").unbind("change").change(function() {
	    	$("#storeBestProdArea").empty();
	    	store.recommPop.getStoreBestProdList();
	    });
	},
	getStoreBestProdList : function() {
		var strNo = $("#strNo").val();
		var recoAges = $("#selAge").val();
		var genSctCd = $("#selGen").val();
		var category = $("#selCate").val();
		
		var key = strNo + "|" + recoAges + "|" + genSctCd + "|" + category;
		
		var param = {
			key : key
		};
		
		curation.callCuration("x", param, function(data) {
			var result = data.results;
			
			if(data != undefined && data != null && result != undefined && result != null && result.length > 0) {
				var requestParam = curation.rts.setCurationParam(result);
				
				if(requestParam != undefined) {
					var url = _baseUrl + "curation/getCurationStoreBestProdListAjax.do"
					common.Ajax.sendRequest("POST", url, requestParam, function(res) {
						$("#storeBestProdArea").html(res);

						$('#storeBestProdArea .slide_list .box .a_detail').each(function(idx){
							$(this).attr('data-attr', "홈^매장큐레이션팝업_베스트상품^" + $(this).find('.prd_name').text());
							$(this).attr('idx' , idx + 1);
						});
						
						$("#bottm_closeBtn").show(); // 상품 리스트 불러온 뒤 다시 버튼 show
						//찜 처리 초기화
						common.wish.init();
						
						var rccode = common.isLogin() ? "pc_store_01_a" : "pc_store_02_c";
						curation.prodDetailScript({viewArea : "store_recomm_pop", rccode: rccode, parentArea : "#storeBestProdArea", popupYn : "Y", trackingCd : "Store_Recommend_Best" });
						gtm.goods.initProductImpression();
					});
				}
			} else {
				$("#storeBestProdArea").html('<div class="no_strPrd"><dl class="no_list"><dt>설정하신 조건에 해당하는<br/>베스트 상품이 없어요</dt></dl></div>');
			}
		});
	},
    storeMapInit : function(x, y){
        if(!common.isEmpty(x) && !common.isEmpty(y)){
            var mapContainer = document.getElementById('store_map') // 지도 영역
            var mapOption = {
                    center: new daum.maps.LatLng(x, y), // 지도 중심좌표(위도,경도)
                    level: 3 // 지도 확대 레벨
                };
            var map = new daum.maps.Map(mapContainer, mapOption); // 지도 생성
            var markerImage = new daum.maps.MarkerImage(_imgUrl + 'store/point_way.png' , new daum.maps.Size(24, 35)); // 마커 이미지 생성
            var markerPosition = new daum.maps.LatLng(x, y); // 마커 위치
            var marker = new daum.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: markerPosition, // 마커를 표시할 위치
                image : markerImage // 마커 이미지
            });
            marker.setMap(map); // 마커 표시
        }
    }
};