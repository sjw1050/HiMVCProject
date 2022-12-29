$.namespace("mypage.reviewerLounge");
mypage.reviewerLounge = {
	topReviewerPageIdx : 1,
	topReviewerPageGbn : '',
	init : function() {
		mypage.reviewerLounge.setPageIndexForHistoryBack();

		if(mypage.reviewerLounge.topReviewerPageIdx != 1){
			mypage.reviewerLounge.getTopReviewerListPaging();
		}else{
			mypage.reviewerLounge.getTopReviewerList();
		}

		$(".pageing").find('a').click(function(){
            var pageIdx = $(this).data('pageNo');
            if(typeof pageIdx == 'undefined' || pageIdx == '') return;
            mypage.reviewerLounge.topReviewerPageIdx = $(this).data('pageNo');
            mypage.reviewerLounge.getTopReviewerListPaging();
        });
		$('#todaysList ul li').bind('click',function(){
			var classname = $(this).attr('class');
			common.wlog(classname);
		});
		
		//## 리뷰고도화 2차 ## 오늘의 도움리뷰 제거
//		$('.reviewer-area .reviewer_list li').each(function(){
//			$(this).bind('click',function(){
//				var index = $(this).index()+1;
//				var page_idx = mypage.reviewerLounge.topReviewerPageIdx;
//				common.wlog('lounge_reviewer_'+(index*page_idx));
//			})
//		});
		$('.banner_reviewer').bind('click',function(){
			common.wlog('lounge_oy_banner');
		})
	},
	/**
	 * 뒤로가기 했을때 이전 페이지 넘버를 기억하기 위한 기능
	 * sessionStorage에 값이 있으면 전역변수에 저장 후 sessionStorage clear
	 */
	setPageIndexForHistoryBack : function (){
		var topReviewPage = sessionStorage.getItem("topReviewPageIdx");
		if (topReviewPage) {
			sessionStorage.removeItem("topReviewPageIdx");
			mypage.reviewerLounge.topReviewerPageIdx = topReviewPage;
		}
	},
	getTopReviewerList : function(){
		var url = _baseUrl + "mypage/getTopReviewerListAjax.do";
        var param = {
            pageIdx : mypage.reviewerLounge.topReviewerPageIdx,
        }
        common.Ajax.sendRequest("POST",url,param, mypage.reviewerLounge.getTopReviewerListSuccessCallback,false);
	},
	getTopReviewerListSuccessCallback : function(data){
		$('#topReviewerList').after(data);

		$(".pageing").find('a').click(function(){
            var pageIdx = $(this).data('pageNo');
            if(typeof pageIdx == 'undefined' || pageIdx == '') return;
            mypage.reviewerLounge.topReviewerPageIdx = $(this).data('pageNo');
            mypage.reviewerLounge.getTopReviewerListPaging();
        });
	},
	getTopReviewerListPaging : function(){
		var url = _baseUrl + "mypage/getTopReviewerListJSON.do";
        var param = {
            pageIdx : mypage.reviewerLounge.topReviewerPageIdx,
        }
        common.Ajax.sendRequest("POST",url,param, mypage.reviewerLounge.getTopReviewerListPagingSuccessCallback,false);
	},
	getTopReviewerListPagingSuccessCallback : function(res){
		if($.trim(res.topReviewerList).length == 0){
            return;
		}else{
			if(mypage.reviewerLounge.topReviewerPageIdx > 0){
				$(".reviewer_list li").remove();
				$('.pageing').remove();
			}
			for(var i  in res.topReviewerList){
			    if(res.topReviewerList[i].gdas != null && res.topReviewerList[i].gdas != 'null'){
			        if(res.topReviewerList[i].gdas.gdasCont != '' && res.topReviewerList[i].gdas.gdasCont != null){
//                  var tmpCont = $.trim(unescape(res.gdasList[i].gdasCont).replace(/(<([^>]+)>)/ig,""));
			            var tmpCont = unescape(res.topReviewerList[i].gdas.gdasCont);

						// 아래 태그를 제거하기 위함.
						tmpCont = tmpCont.replaceAll(/&lt;/gi, "<");
						tmpCont = tmpCont.replaceAll(/&gt;/gi, ">");

						tmpCont = tmpCont.replace(/<img(.*?)>/gi,"");   //이미지 태그 제거
			            tmpCont = tmpCont.replaceAll("\r\n","<br/>");
			            tmpCont = tmpCont.replaceAll("<br/>|<br>|<p>|</p>","");
			            tmpCont = tmpCont.replaceAll(" ","&nbsp;");
			            tmpCont = tmpCont.replace(/(<h1 style(.*?)>|<h1>|<h1\/>|<\/h1>|<h2 style(.*?)>|<h2>|<h2\/>|<\/h2>|<h3 style(.*?)>|<h3>|<h3\/>|<\/h3>)/g, '');   //h1,h2, h3 태그 제거
			            tmpCont = tmpCont.replace(/(<span style(.*?)>|<span>|<\/span>|<strong style(.*?)>|<strong>|<\/strong>)/g, '');   //strong, span태그 제거
			            tmpCont = tmpCont.replace(/(<em style(.*?)>|<em>|<\/em>|<u style(.*?)>|<u>|<\/u>|<s style(.*?)>|<s>|<\/s>)/g, '');   //em, u, s태그 제거
			            res.topReviewerList[i].gdas.gdasCont = tmpCont;
			        }
			    }
				
				var rnkType = '';
				if(res.topReviewerList[i].rnkVrType == '10'){
					rnkType = 'up';
				}else if(res.topReviewerList[i].rnkVrType == '20'){
					rnkType = 'dw';
				}else if(res.topReviewerList[i].rnkVrType == '30'){
					rnkType = '';
				}else if(res.topReviewerList[i].rnkVrType == '40'){
					rnkType = 'new';
				}else{
					rnkType = '';
				}
				res.topReviewerList[i].rnkVrTypeCss= rnkType;
				
				var gdascnt = 0;
                if(res.topReviewerList[i].gdasCount > 0){
                	gdascnt =numberWithCommas(res.topReviewerList[i].gdasCount); 
                }
                res.topReviewerList[i].gdasCount = gdascnt;
                
                var recommcnt = 0;
                if(res.topReviewerList[i].dispRecommCnt != 0){
                	if(res.topReviewerList[i].dispRecommCnt > 0){
                		recommcnt =numberWithCommas(res.topReviewerList[i].dispRecommCnt);
                	}
                }
                res.topReviewerList[i].dispRecommCnt = recommcnt;
            }
			
			if(mypage.reviewerLounge.topReviewerPageIdx > 0){
				mypage.reviewerLounge.getTopReviewerList();
				$("#topReviewerListTemplate").tmpl(res.topReviewerList).appendTo("#topReviewerList");
			}
			
			$('.reviewer-area .reviewer_list li').each(function(){
				$(this).bind('click',function(){
					var index = $(this).index()+1;
					var page_idx = mypage.reviewerLounge.topReviewerPageIdx;
					common.wlog('lounge_reviewer_'+(index*page_idx));
				})
			});
		}
	},
	getTopReviewerPop : function(pageNm,pageGbn){
		var param = {
			pageNm : pageNm,
            pageGbn : pageGbn
        }

		common.Ajax.sendRequest("POST",_baseUrl + "mypage/getReviewerPop.do",param, mypage.reviewerLounge.getTopReviewerPopSuccessCallback);

		if(pageNm == "getBestReviewInfoPop"){
			$('#layer_pop_wrap').addClass('z9').addClass('w488');
			$("#layer_pop_wrap").addClass('trans2');
		} else {
			//탑리뷰어 소개 팝업 버튼 노출 여부 구분값
			mypage.reviewerLounge.topReviewerPageGbn = param.pageGbn;

			$('#layer_pop_wrap').addClass('reviewer-introdce-popup');
		}
	},
	getTopReviewerPopSuccessCallback : function(data){
		$("#layer_pop_wrap").html(data);
        setLayerHeight('layer_pop_wrap');
        if($('.dimm').length > 1){
            $('.dimm:nth(1)').remove();
        }
	},
	getOyExpierenceGroupPopup : function(pageNm){
		this.getPopupPageWithHtml({
			pageNm : pageNm,
			popupId: 'lay_experience_info'
		});
	},
	getTopReviewerBigPop : function(pageNm){
		this.getPopupPageWithHtml({
			pageNm : pageNm,
			popupId: 'layerWrap850'
		});
	},
	getPopupPageWithHtml: function (parameters) {
		var popupId = parameters.popupId;
		delete parameters.popupId;
		common.Ajax.sendRequest("POST", _baseUrl + "mypage/getReviewerPop.do", parameters, function (html) {
			var targetDomId = '#' + popupId;
			$(targetDomId).html(html);
			$(targetDomId).addClass('trans1');
			setLayerHeight(popupId);
			if($('.dimm').length > 1){
				$('.dimm:nth(1)').remove();
			}
		});
	},
	goReviewAll : function(reviewerMbrNo){
		sessionStorage.setItem("topReviewPageIdx", mypage.reviewerLounge.topReviewerPageIdx);	// history back을 위한 pageIdx 기억
		location.href = _baseUrl+"mypage/getReviewerProfile.do?key="+reviewerMbrNo;
	},
	goReviewDetail : function(gdasSeq){
		sessionStorage.setItem("topReviewPageIdx", mypage.reviewerLounge.topReviewerPageIdx);	// history back을 위한 pageIdx 기억
        var param = {
            gdasSeq : gdasSeq,
        }
        common.Ajax.sendRequest("POST",_baseUrl + "mypage/getReviewerGdasDetail.do",param, mypage.reviewerLounge.goReviewDetailSuccessCallback);
    },
	goReviewDetailSuccessCallback : function(data){
		$("#layerWrap920").html(data);
        setLayerHeight('layerWrap920');
        if($('.dimm').length > 1){
            $('.dimm:nth(1)').remove();
        }	
	}
}

function setLayerHeight(id){
    fnLayerSet(id, "open");
    var layer_h = ($("#"+id+" .popup-contents").height()/2);
    $("#"+id).css('margin-top', -layer_h);       
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}