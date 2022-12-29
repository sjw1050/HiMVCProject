$.namespace("gtm.goods");
gtm.goods = {
    reqUrl : _baseUrl + "goods/getGoodsGtmInfoAjaxNew.do",
    reqParam : undefined,
    _gtmEventType : undefined,
    _gtmList : undefined,
    _gtmData : undefined,
    initProductImpression : function () {
        // [2022.03 올영 세일 이후 오픈 예정] target 영역의 goodsNo 전체 gtm data 가져오기
        // gtm.goods.getGoodsGtmInfo($('[data-impression]'));

        $('[data-impression]').each(function(){
            var $element = $(this);
            if($element.attr("data-impression-visibility") == undefined && ($element.attr("data-impression") != undefined && $element.attr("data-impression") != 'null' && $element.attr("data-impression") != null)){
                $element.attr("data-impression-visibility", 1);
                $element.on( 'visibility', function() {
                    var timer = setInterval( function() {
                        if($element.is(':visible')){
                            var scrollTop = $(window).scrollTop();
                            var scrollTopViewportHeight = $(window).scrollTop() + $(window).innerHeight();
                            var objTop = $element.offset().top;
                            var objBottom = objTop + $element.height();
                            if((objTop > scrollTop && objTop < scrollTopViewportHeight) || (objBottom > scrollTop && objBottom < scrollTopViewportHeight)) {
                                if ($element.attr("tabIndex") == undefined || $element.attr("tabIndex") == '0') {
                                    if ($element.parent().attr("aria-hidden") == undefined || $element.parent().attr("aria-hidden") == "false") {
                                        var dataAttrImpression = $element.attr("data-impression");
                                        var dataAttrImpressionArr = dataAttrImpression.split("^");
                                        // 전자상거래 이벤트 ( ee- prouctImpression ) 미사용 중으로 주석처리 - 향후 개선버전으로 재오픈 예정 (유저그로스팀 협의 완료)
                                        // gtm.goods.callGoodsGtmInfo(dataAttrImpressionArr[0], "", "ee-productImpression", dataAttrImpressionArr[1], dataAttrImpressionArr[2]);

                                        // [2022.03 올영 세일 이후 오픈 예정]
                                        // gtm.goods._gtmList = dataAttrImpressionArr[1];
                                        // gtm.goods._gtmEventType = "ee-productImpression";
                                        //
                                        // if (gtm.goods._gtmData != null)
                                        //     gtm.goods.addDataLayer(gtm.goods._gtmData[dataAttrImpressionArr[0]], dataAttrImpressionArr[2]);

                                        clearInterval(timer);
                                    }
                                }
                            }
                        }
                    }, 300 );
                }).trigger('visibility');
            }
        });
    },
    getGoodsGtmInfo:function(target) {
        var goodsNoList = [];

        if (target != null && target.length > 0) {
            target.each(function () {
                var data_yn = $(this).attr("data_load_yn") || "N";
                var $selector = $(this).attr("data-impression").split("^");

                if (data_yn == "N") {
                    $(this).attr("data_load_yn", "Y");
                    goodsNoList.push($selector[0]);
                }

            });
        }

        if (goodsNoList == null || goodsNoList.length == 0) {
            return false;
        }

        var goodsNoArrStr = goodsNoList.join(',');
        gtm.goods.reqParam = {
            "goodsNoArrStr" : goodsNoArrStr
        };

        common.Ajax.sendRequest("GET", gtm.goods.reqUrl, gtm.goods.reqParam, gtm.goods.callbackGoodsGtmData, false);
    },
    callbackGoodsGtmData : function(res) {
        if (res != null) {
            if (gtm.goods._gtmData != undefined) {
                for (var key in res) {
                    gtm.goods._gtmData[key] = res[key];
                }
            } else {
                gtm.goods._gtmData = res ;
            }
        }
    },
    addDataLayer : function(res, position) {
        if (res != undefined) {
            window.dataLayer = window.dataLayer || [];

            var productArr = new Array();
            if (gtm.goods._gtmEventType == 'ee-productImpression') {
                productArr.push({
                    'id': res.lgcGoodsNo,
                    'name': res.goodsNm,
                    //'price':Number(res.supPrc),
                    'price': Number(res.salePrc),
                    'brand': res.onlBrndNm,
                    'category': (res.stdCatNm ? res.stdCatNm.replaceAll("/", "_").replaceAll(">", "/") : undefined),
                    'list': gtm.goods._gtmList,
                    'position': position,
                    'dimension43': res.goodsNo,
                    'dimension44': res.goodsNm,
                    // 'dimension58':gtm.goods.getBenefitInfo(res),
                    'dimension60': Number(res.dcRate)
                });

                window.dataLayer.push({
                    'event':'ee-productImpression',
                    'dimension75':undefined, // 게이트 코드
                    'dimension76':undefined, // 트래킹 코드
                    'ecommerce': {
                        'currencyCode': 'KRW',
                        'impressions': productArr
                    }
                });
            }
        }
    },
    callGoodsGtmInfo : function(goodsNoArr, itemNoArr, gtmEventType, gtmList, positionArr, giftCardYn) {
        giftCardYn = giftCardYn || "N";

        if (goodsNoArr == null || gtmEventType == null || goodsNoArr.length == 0) {
            return false;
        }

        // 상품코드 단품일 경우 string to array
        if (typeof goodsNoArr == 'string' || goodsNoArr instanceof String) {
            var tmpGoodsNoArr = goodsNoArr;
            goodsNoArr = new Array();
            goodsNoArr.push(tmpGoodsNoArr);
        }

        var goodsNoArrStr = goodsNoArr.join(',');

        if (itemNoArr == null || itemNoArr == "") {
            itemNoArr = new Array();
            for (var i=0;i<goodsNoArr.length;i++) {
                itemNoArr.push("001");
            }
        }
        var itemNoArrStr = itemNoArr.join(',');

        if ((typeof positionArr != 'object') && !(positionArr instanceof Array)) {
            if (positionArr == null || positionArr == "" || positionArr == "0") {
                positionArr = new Array();
                for (var i=0;i<goodsNoArr.length;i++) {
                    positionArr.push(i+1);
                }
            } else {
                var tmpPositionArr = positionArr;
                positionArr = new Array();
                positionArr.push(tmpPositionArr);
            }
        }
        var positionArrStr = positionArr.join(',');

        gtm.goods.reqParam = {
            "goodsNoArrStr" : goodsNoArrStr,
            "itemNoArrStr" : itemNoArrStr,
            "positionArrStr" : positionArrStr,
            "giftCardYn" : giftCardYn
        };

        gtm.goods._gtmEventType = gtmEventType;
        gtm.goods._gtmList = gtmList;

        common.Ajax.sendRequest("GET", gtm.goods.reqUrl, gtm.goods.reqParam, gtm.goods._callbackGoodsGtmInfo,false);
    },
    getBenefitInfo : function(param) {
        if (param != null) {
            var benefitInfoArr = new Array();
            if (param.assocPromtStdCnt > 0 ) {
                if (param.promKndCd == "P203") {
                    benefitInfoArr.push("GIFT");
                } else {
                    benefitInfoArr.push(param.assocPromtStdCnt+"+1");
                }
            }

            if (param.dsCntYn == "Y") {
                benefitInfoArr.push("세일");
            }

            if (param.cpnYn == "Y") {
                benefitInfoArr.push("쿠폰");
            }

            if (param.prstYn == "Y") {
                benefitInfoArr.push("증정");
            }

            if (param.freeDlvYn == "Y") {
                benefitInfoArr.push("무배");
            }

            return benefitInfoArr.join("/");
        }

        return undefined;
    },
    _callbackGoodsGtmInfo : function(res) {
        if (res != null) {
            window.dataLayer = window.dataLayer || [];

            var urlParams = common.cart.urlParams();
            var gateCd = "";
            var trackingCd = "";
            if (gtm.goods._gtmEventType == 'ee-productView') {
                if (urlParams.gateCd != undefined) {
                    gateCd = urlParams.gateCd;
                } else {
                    gateCd = common.cart.trackingInfo.getGateCd();
                }
                if (urlParams.trackingCd != undefined) {
                    trackingCd = urlParams.trackingCd;
                } else {
                    trackingCd = common.cart.trackingInfo.getTrackingCd();
                }
            }

            var productArr = new Array();
            if (gtm.goods._gtmEventType == 'ee-productImpression') {
                productArr.push({
                    'id':res.lgcGoodsNo,
                    'name':res.goodsNm,
                    //'price':Number(res.supPrc),
                    'price':Number(res.salePrc),
                    'brand':res.onlBrndNm,
                    'category':(res.stdCatNm ? res.stdCatNm.replaceAll("/", "_").replaceAll(">", "/") : undefined),
                    'list':gtm.goods._gtmList,
                    'position':res.position,
                    'dimension43':res.goodsNo,
                    'dimension44':res.goodsNm,
                    'dimension58':gtm.goods.getBenefitInfo(res),
                    'dimension60':Number(res.dcRate)
                });

                window.dataLayer.push({
                    'event':'ee-productImpression',
                    'dimension75':(gateCd ? gateCd : undefined), // 게이트 코드
                    'dimension76':(trackingCd ? trackingCd : undefined), // 트래킹 코드
                    'ecommerce': {
                        'currencyCode': 'KRW',
                        'impressions': productArr
                    }
                });
            }else if (gtm.goods._gtmEventType == 'ee-productClick') {
                for (var i=0;i<res.length;i++) {
                    productArr.push({
                        'id':res[i].lgcGoodsNo,
                        'name':res[i].goodsNm,
                        //'price':Number(res[i].supPrc),
                        'price':Number(res[i].salePrc),
                        'brand':res[i].onlBrndNm,
                        'category':(res[i].stdCatNm ? res[i].stdCatNm.replaceAll("/", "_").replaceAll(">", "/") : undefined),
                        'list':gtm.goods._gtmList,
                        'position':res[i].position,
                        'dimension43':res[i].goodsNo,
                        'dimension44':res[i].goodsNm,
                        'dimension58':gtm.goods.getBenefitInfo(res[i]),
                        'dimension60':Number(res[i].dcRate)
                    });
                }

                window.dataLayer.push({
                    'event':'ee-productClick',
                    'dimension41':res[0].lgcGoodsNo,
                    'dimension42':res[0].goodsNm,
                    'dimension50':res[0].onlBrndNm,
                    'dimension75':(gateCd ? gateCd : undefined), // 게이트 코드
                    'dimension76':(trackingCd ? trackingCd : undefined), // 트래킹 코드
                    'ecommerce': {
                        'currencyCode': 'KRW',
                        'click': {
                            'actionField': {
                                'list': gtm.goods._gtmList
                            },
                            'products': productArr
                        }
                    }
                });
            }else if (gtm.goods._gtmEventType == 'ee-productView') {
                for (var i=0;i<res.length;i++) {
                    productArr.push({
                        'id':res[i].lgcGoodsNo, // 상품 식별 고유 ID
                        'name':res[i].goodsNm, // 상품명
                        //'price':Number(res[i].supPrc),
                        'price':Number(res[i].salePrc),
                        'brand':res[i].onlBrndNm, // 브랜드
                        'category':(res[i].stdCatNm ? res[i].stdCatNm.replaceAll("/", "_").replaceAll(">", "/") : undefined), // 상품카테고리
                        'dimension43':res[i].goodsNo, // 온라인 상품코드
                        'dimension44':res[i].goodsNm, // 온라인 상품명
                        'dimension46':(res[i].soldOutYn == 'Y' ? '일시 품절' : res[i].prgsStatNm), // 판매상태
                        'dimension47':res[i].dermoYn, // 더모 여부
                        'dimension48':res[i].premBrndYn, // 프리미엄 여부
                        'dimension49':(res[i].tradeShpCd != undefined ? (res[i].tradeShpCd == '1' ? 'N' : 'Y') : undefined), // 위수탁 구분
                        'dimension51':(res[i].malInfSctCd == '2' ? 'Y' : 'N'), // 남성상품 여부
                        'dimension52':(res[i].malInfSctCd == '3' ? 'Y' : 'N'), // 유아상품 여부
                        'dimension53':res[i].onlYn, // 온라인전용상품 여부
                        'dimension54':(res[i].onlyoneSctNm || undefined), // ONLYONE상품 구분
                        'dimension55':res[i].quickYn, // 오늘드림상품 여부
                        'dimension56':((Number(res[i].oneLineGdasTotCnt)+Number(res[i].prmumGdasTotCnt)) || 0), // 고객 리뷰수
                        'dimension57':(res[i].dispCatNm ? res[i].dispCatNm.replaceAll("/", "_").replaceAll(">", "/") : undefined), // 전시 카테고리
                        'dimension58':gtm.goods.getBenefitInfo(res[i]), // 적용 혜택
                        'dimension60':Number(res[i].dcRate) // 상품 할인율
                    });
                }

                window.dataLayer.push({
                    'event':'ee-productView',
                    'dimension41':res[0].lgcGoodsNo,
                    'dimension42':res[0].goodsNm,
                    'dimension50':res[0].onlBrndNm,
                    'dimension75':(gateCd ? gateCd : undefined), // 게이트 코드
                    'dimension76':(trackingCd ? trackingCd : undefined), // 트래킹 코드
                    'ecommerce': {
                        'currencyCode': 'KRW',
                        'detail': {
                            'products': productArr
                        }
                    }
                });
            }
        }
    }
};

$.namespace('gtm.event');
gtm.event = {
  /**
   * GA 이벤트 트리거링
   * @param {string} txt GA 이벤트 트리거에 사용할 data-attr 값
   * @param {string} eventType 이벤트 타입. 생략하면 'click-event'
   */
  trigger: function(txt, eventType) {
    (function waitGALoaded() {
      if (typeof dataLayer === 'undefined') {
        setTimeout(waitGALoaded, 500);
        return;
      }
      dataLayer.push({
        'event': !eventType ? 'click-event' : eventType + '-event', 
        'data-attr': txt,
        'data-trk': gtm.event.getAdditionalParameter()
      });
    })();
  },
  /**
   * 트래킹/게이트 코드가 있으면 게이트코드/트래킹코드 형태로 반환
   * 게이트 코드만 있을 시 → gate_code/
   * 트래킹 코드만 있을 시 → /tracking_code
   * @returns {string} gate_code/tracking_code 혹은 gate_code/ 혹은 /tracking_code 혹은 ''
   */
  getAdditionalParameter: function() {
    var gateCd = common.cart.urlParams().gateCd;
    var trackingCd = common.cart.urlParams().trackingCd;
    if (!trackingCd && !gateCd) {
      return;
    }
    var str = '';
    var seperator = '/';
    if (gateCd && !trackingCd) {
      str = gateCd + seperator;
    } else if (!gateCd && trackingCd) {
      str = seperator + trackingCd;
    } else {
      str = gateCd + seperator + trackingCd;
    }
    return str;
  }
};