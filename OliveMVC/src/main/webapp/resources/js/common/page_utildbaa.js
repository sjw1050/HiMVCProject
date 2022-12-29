
var PagingCaller = {
		
		option : null,
		curPageIdx : 1,
//		flag : true, //스크롤 더보기시 연속 호출 방지
		/**
		 * 페이징 초기화
		 * 
		 * [option] 
		 * callback : 스크롤 시 페이징 호출 callback 함수
		 * subBottomScroll : 하향 스크롤 시 callback 호출을 먼저 할 수 있도록 최하단으로 부터 호출 높이 설정
		 * totalPageCnt : 전체 페이지 수, 셋팅하지 않을 시 연속키 방식으로 동작, pageCaller destroy는 페이지 처리부에서 함께 처리하도록 함.
		 * startPageIdx : 시작 페이지 번호 셋팅. 기본값 1
		 * initCall : true / false, 시작 시 callback 함수 호출 여부
		 * 
		 * PagingCaller.init({
		 * 	 caller : function(){ blar~~},
		 *   subBottomScroll : 200
		 * });
		 * 
		 * @param option
		 */
		init : function(option) {
			PagingCaller.option = null;
			PagingCaller.option = option;
			if (PagingCaller.option.subBottomScroll == undefined || PagingCaller.option.subBottomScroll == null || PagingCaller.option.subBottomScroll=="") {
				PagingCaller.option.subBottomScroll = 0;
			}
			if (PagingCaller.option.startPageIdx == undefined || PagingCaller.option.startPageIdx == null || PagingCaller.option.startPageIdx=="") {
				PagingCaller.option.startPageIdx = 0;
			}
			PagingCaller.curPageIdx = PagingCaller.option.startPageIdx;
			
			if (typeof PagingCaller.option.flag == undefined || PagingCaller.option.flag == null || PagingCaller.option.flag=="") {
				PagingCaller.option.flag = true;
			}
			$(document).bind("scroll touchmove", PagingCaller.setScroll);
			
			if (PagingCaller.option.initCall) {
				PagingCaller.option.callback();
				PagingCaller.curPageIdx+=1;
			}
			
			PagingCaller.option.subBottomScroll = 1400;
		},
		
		/**
		 * 콜백 실행, initCall 옵션을 false로 설정한 경우 1페이지 정보 조회시 강제 호출등에 사용할 수 있다.
		 */
		executeCallback : function() {
			PagingCaller.option.callback();
			PagingCaller.curPageIdx+=1;
		},

		/**
		 * 현재 페이지 번호 조회
		 */
		getCurPageIdx : function() {
			return PagingCaller.curPageIdx;
		},
		
		/**
		 * 다음 페이지 번호 조회
		 */
		getNextPageIdx : function() {
			return PagingCaller.curPageIdx + 1;
		},
		
		/**
		 * 스크롤 bind
		 */
		setScroll : function() {
			if ($(document).scrollTop() == 0) {
				
			} else {
				var currentTop = $(document).scrollTop();
				var documentHeight = $(document).height();
				if (documentHeight - screen.height - currentTop < PagingCaller.option.subBottomScroll) {
					
					// total page가 없을 경우 연속키 방식으로 간주함.
					if(PagingCaller.option.totalPageCnt == undefined 
							|| PagingCaller.curPageIdx < PagingCaller.option.totalPageCnt) {
						
						if (PagingCaller.option.callback != undefined 
								&& PagingCaller.option.callback != null 
								&& typeof PagingCaller.option.callback  == "function") {
							
							if(PagingCaller.option.flag != null || typeof PagingCaller.option.flag != "undefined"){
								
								if(PagingCaller.option.flag){
									
									PagingCaller.option.flag = false;
									
									setTimeout(function() {
										PagingCaller.option.flag = true;
									},1000);
								    PagingCaller.option.callback();
                                    PagingCaller.curPageIdx+=1;
                                    $(window).resize();
									
								}
							}
						}
					}else{
						PagingCaller.destroy();
					}
				}
			}
		},
		
		/**
		 * 페이징
		 */
		endCallback : function() {
		    PagingCaller.option.flag = true;
		},
		
		/**
		 * 페이징 완료 시 스크롤 이벤트 해제
		 * 
		 * PagingCaller.destroy();
		 */
		destroy : function() {
			$(document).unbind("scroll touchmove", PagingCaller.setScroll);
		},
		
};
