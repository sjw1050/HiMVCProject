$.namespace("main.todayspecial");
main.todayspecial = {
    _ajax : common.Ajax,

    init : function(){
        var thisClazz = this;
        thisClazz.initRefreshDisplayProducts();
        thisClazz.initComingSoonEvents();

        localStorage.removeItem('pageindex');
        common.setLazyLoad();
        common.wish.init();
        thisClazz.bindEvent();
        thisClazz.handleSortingTab();
        thisClazz.todaySpecialTimer();

        setTimeout(function() {
            thisClazz.bindGoodsGtmInfo('.spTodayWrap .prod-list li');
            thisClazz.bindGoodsGtmInfo('.ts_item_area .prod-list li');
        }, 100);

        var startIdx = 0;
        var pageIndex = localStorage.getItem('pageindex');
        if(!pageIndex) startIdx = pageIndex

        var sort = localStorage.getItem("prdSort") || 'rank';

        document.getElementById('todaySpecial-sorting').querySelector(sort === 'rank' ? '#sorting-rank' : '#sorting-rate').classList.add('on');
        thisClazz.requestBasicTodaySpecialGoodsList(startIdx, null, sort);
    },

    eventLoopUtil: {
        defaultOptions: {
            timeInterval: 1000,
            executeEventCondition: function () { return false; }
        },
        currentIntervalKey: 0,
        timeIntervalCount: 0,
        instance: {
            const: {
                /**
                 * @requiredFields: 'eventName', 'timeInterval', 'executeEventCondition', 'eventTrigger'
                 * @excludeFields: 'clearTrigger'
                 */
                EVENT_OBJECT_KEYS: ['eventName', 'timeInterval', 'executeEventCondition', 'eventTrigger'], //'clearTrigger'
                status: {
                    READY: 'READY',
                    START: 'START',
                    STARTED: 'STARTED',
                    STOP: 'STOP'
                }
            },
            _status: 'READY',
            start: function () {
                if (this._status === this.const.status.STARTED) return;
                this._status = this.const.status.START;
                main.todayspecial.eventLoopUtil._loop();
                this._status = this.const.status.STARTED;
            },
            stop: function () {
                clearInterval(this.currentIntervalKey);
            },
        },
        trigger: {
            objects: [],
            remove: function (eventName) {
                var foundIndex = -1;
                for (var i = 0; i < this.objects.length; i++) {
                    var object = this.objects[i];
                    if (object.eventName === eventName) {
                        foundIndex = i;
                        break;
                    }
                }
                if (foundIndex >= 0) {
                    this.objects.splice(foundIndex, 1);
                }
            }
        },
        _hasEvent: function (eventObject) {
            var eventName = eventObject.eventName;
            if (!eventName) console.log('Could not resolve eventName');
            return this._findTriggeredByEventName(eventName).length > 0
        },
        _validEvent: function (eventObject) {
            var eventObjectKeys = this.instance.const.EVENT_OBJECT_KEYS;
            var keys = Object.keys(eventObject);
            if (keys.length <= 0) return false;
            return eventObjectKeys.filter(function (defaultObjectKey) {
                return keys.indexOf(defaultObjectKey) > -1;
            }).length >= eventObjectKeys.length;
        },
        _findTriggeredByEventName: function (eventName) {
            return this.trigger.objects.filter(function (legacyEvent) {
                return legacyEvent.eventName === eventName;
            });
        },
        _loop: function () {
            function isRunTimeForInterval(timeIntervalCount, timeInterval) {
                return ((timeIntervalCount * 1000) % timeInterval) === 0;
            }

            var timeIntervalCount = this.timeIntervalCount,
                trigger = this.trigger,
                triggers = trigger.objects,
                timerDefaultOptions = this.defaultOptions;

            function setTimeLimit() {
                if (timeIntervalCount >= 60) {
                    timeIntervalCount = 0;
                }
            }

            this.currentIntervalKey = setInterval(function () {
                for (var i = 0; i < triggers.length; i++) {
                    var event = triggers[i];
                    var eventName = event.eventName;
                    var eventTrigger = event.eventTrigger;
                    var timeInterval = event.timeInterval
                        || timerDefaultOptions.timeInterval;
                    var clearTrigger = event.clearTrigger;
                    var executeEventCondition = event.executeEventCondition
                        || timerDefaultOptions.executeEventCondition;
                    var doRunTrigger = isRunTimeForInterval(timeIntervalCount, timeInterval);
                    if (doRunTrigger && executeEventCondition && executeEventCondition()) {
                        eventTrigger();
                    }
                    if (clearTrigger && clearTrigger()) {
                        trigger.remove(eventName);
                    }
                    setTimeLimit();
                }
                timeIntervalCount++;
            }, this.defaultOptions.timeInterval);
        },
        /**
         * 이벤트 옵션 오브젝트
         * @Parameter {
         *    eventName(:required): [String],
         *    timeInterval(:required): [Number],
         *    executeEventCondition(:required): [Function] @return true/false [실행 조건 작성]
         *    eventTrigger(:required): [Function], [이벤트 작성]
         *    clearTrigger: [Function] @return true/false, [이벤트 종료 조건 작성]
         * }
         */
        setEventTrigger: function (eventObject) {
            if (!this._validEvent(eventObject)) {
                console.log('이벤트 객체가 잘 못 되었습니다. eventObject 형식을 확인해 주세요.');
                console.log('setEventTrigger:Parameter -> {\n' +
                    '  eventName: [String],\n' +
                    '  timeInterval: [Number],\n' +
                    '  executeEventCondition: [Function] @return true/false\n' +
                    '  eventTrigger: [Function],\n' +
                    '  clearTrigger: [Function],\n' +
                    '}');
                return;
            }

            var replaceObject = eventObject.isReplaceObject && eventObject;
            if (replaceObject) {
                this.trigger.remove(eventObject.eventName);
            }

            if (this._hasEvent(eventObject)) {
                return;
            }

            this.trigger.objects.push(eventObject);
            this.instance.start();
        },
    },

    requestBasicTodaySpecialGoodsList: function (startIdx, dispCatNo, sort) {
        //연속키 방식
        PagingCaller.init({
            callback: function () {
                //코드 완료 후 스토어 정보 조회
                var param = {
                    pageIdx: PagingCaller.getNextPageIdx(),
                    fltCondition: "02",
                    fltDispCatNo: !dispCatNo ? "" : dispCatNo,
                    prdSort: !sort ? "rank" : sort
                }

                var currentDate = main.todayspecial.currentDateForRefresh();
                common.Ajax.sendRequest(
                    "GET",
                    _baseUrl + 'main/getHotdealPagingListAjax.do?date=' + currentDate,
                    param,
                    main.todayspecial.getBasicTodaySpecialCallback,
                    false
                );

                $('#todaySpecial-container').attr('data-sort', param.prdSort);
                localStorage.setItem('pageindex', param.pageIdx);
            },
            startPageIdx: startIdx,
            subBottomScroll: 700,
            //초기화 시 최초 목록 call 여부
            initCall: startIdx <= 0
        });
    },

    getBasicTodaySpecialCallback : function(res) {
        if (res.trim() == '' || PagingCaller.getCurPageIdx() > 7) {
            //응답 결과가 없을 경우 마지막 목록임- 스크롤 이벤트 제거
            PagingCaller.destroy();
            localStorage.setItem('pageindex',PagingCaller.getCurPageIdx()-1);

        }  else {
            //응답 결과가 있는 경우 append 처리 후 lazyload 처리
            $("#todaySpecial-container").append(res);

            common.wish.init();
            main.todayspecial.bindEvent();

            setTimeout(function() {
                main.todayspecial.bindGoodsGtmInfo('.spTodayWrap .prod-list li');
                main.todayspecial.bindGoodsGtmInfo('.ts_item_area .prod-list li');
            }, 100);
        }

        if (PagingCaller.getNextPageIdx() >= 7) {
            PagingCaller.destroy();
            localStorage.setItem('pageindex',PagingCaller.getCurPageIdx()-1);
        }
    },

    handleSortingTab : function() {
        document.getElementById('todaySpecial-sorting').addEventListener('click', function (event) {
            var target = event.target;

            var sort = target.getAttribute('data-ref-sort') || target.parentNode.getAttribute('data-ref-sort');
            localStorage.setItem("prdSort",sort);

            if(sort == 'rank' || sort == null) {
                $('#sorting-rank').addClass('on')
                $('#sorting-rate').removeClass();
                common.wlog('today_special_rank');
            } else {
                $('#sorting-rank').removeClass()
                $('#sorting-rate').addClass('on');
                common.wlog('today_special_sale');
            }

            $("#todaySpecial-container").empty();
            PagingCaller.destroy();

            var startIdx = 0;
            main.todayspecial.requestBasicTodaySpecialGoodsList(startIdx, null, sort);
        })
    },

    bindEvent : function(){

        setTimeout(function() {
            //링크 처리
            common.bindGoodsListLink();

            /* 상품이미지 클릭 이벤트 - 상품상세로 이동 */
            $(".prod-list li .thumb").click(function(){
                $(this).siblings(".prod-info").children(".txt").click();
            });

        }, 100);

        //웹로그 바인딩
        var fltDispCatNo = $("#fltDispCatNo").val();

        if( common.isEmpty(fltDispCatNo)){
            setTimeout(function() {
                //웹로그 바인딩
                main.todayspecial.bindWebLog();
            },700);
        }
    },

    bindWebLog : function (){
        $(".spTodayWrap li").each(function(i) {
            var _item = $(this).find('.goodsList');

            _item.bind("click", function() {
                common.wlog("todayspecial_dailySpecailGoods_" + (i + 1));
            });
        });

        $(".ts_item_area li").each(function(i) {
            var _item = $(this).find('.goodsList');

            _item.bind("click", function() {
                common.wlog("todayspecial_dailyGoods_" + (i + 1));
            });
        });
    },

    setSliderAnimaition : function () {
        $('.comingSoonBan .sliderCenter').bxSlider({
            auto: true,
            pager: false,
            minSlides: 3,
            maxSlides: 5,
            slideWidth: 326,
            slideMargin: 20,
            moveSlides: 3,
            autoHover: true,
            responsive: true
        });
    },

    bindGoodsGtmInfo : function(filterSelectorStr){
        var classNm = filterSelectorStr == undefined ? "" : filterSelectorStr + " ";
        $(classNm + ".goodsList").unbind("click");
        $(classNm + ".goodsList").on("click", function(e) {
            var _data_goodsno = $(this).attr("data-ref-goodsNo");
            var _gtmListFromDataAttr = String($(this).attr("data-attr"));
            var _gtmList = _gtmListFromDataAttr.split("^");

            if(_gtmList.length > 3) {
                var _gtm = _gtmList[0] + "_" + _gtmList[1];
                var _index = _gtmList[3];
                gtm.goods.callGoodsGtmInfo(_data_goodsno, null, 'ee-productClick', _gtm, _index);
            }

        });
    },

    initComingSoonEvents: function () {
        var OPEN_HOUR = 21,
            CLOSE_HOUR = 24,
            currentHour, isOpened, isHide;

        this.eventLoopUtil.setEventTrigger({
            eventName: 'ComingSoonShowHide',
            timeInterval: 1000,
            isReplaceObject: true,
            executeEventCondition: function () {
                currentHour = new Date().getHours();
                if (currentHour === 0) currentHour = 24;
                return true;
            },
            eventTrigger: function () {
                if (!isOpened && currentHour >= OPEN_HOUR && currentHour < CLOSE_HOUR) {
                    isOpened = true;
                    isHide = false;
                    $('.comingSoonBan').show();
                    main.todayspecial.setSliderAnimaition();
                } else if (!isHide && (currentHour >= CLOSE_HOUR || currentHour < OPEN_HOUR)) {
                    isOpened = false;
                    isHide = true;
                    $('.comingSoonBan').hide();
                }
            },
            clearTrigger: function () {
                return currentHour === CLOSE_HOUR;
            }
        });
    },

    _refreshDate: common.formatDate(new Date(), 'yyyyMMdd'),
    setRefreshDate: function (date) {
        this._refreshDate = date;
    },
    currentDateForRefresh: function () {
        var refreshDate = main.todayspecial._refreshDate,
            currentDate = common.formatDate(new Date(), 'yyyyMMdd');
        if (refreshDate !== currentDate) {
            this.setRefreshDate(currentDate);
            return currentDate;
        }
        return refreshDate;
    },

    initRefreshDisplayProducts: function () {
        var REFRESH_HOURS = 24,
            isNotRunTime = new Date().getHours() === 0,
            currentHour, isRefreshed, isRefreshFinished;

        if (isNotRunTime) return;

        this.eventLoopUtil.setEventTrigger({
            eventName: 'TodaySpecialListShowHide',
            timeInterval: 1000,
            executeEventCondition: function () {
                currentHour = new Date().getHours();
                if (currentHour === 0) currentHour = 24;
                return true;
            },
            eventTrigger: function () {
                if (!isRefreshed && currentHour === REFRESH_HOURS) {
                    isRefreshed = true;
                    main.todayspecial.requestTodaySpecialData();
                }
            },
            clearTrigger: function () {
                var isClearTime = currentHour === REFRESH_HOURS;
                if (isClearTime && isRefreshed) {
                    isRefreshFinished = true;
                }
                // return isClearTime && isRefreshFinished;
                return false;
            }
        });
    },

    requestTodaySpecialData: function () {
        var currentDate = main.todayspecial.currentDateForRefresh();
        common.Ajax.sendRequest(
            'GET',
            _baseUrl + 'main/getHotdealList.do?date=' + currentDate,
            { isDataRefresh: true },
            main.todayspecial.setTodaySpecialDataCallback
        );
    },

    setTodaySpecialDataCallback : function(res) {
        $('#Container').html(res);
        main.todayspecial.init();
    },

    todaySpecialTimer : function() {
        common.gnb.todaySpecial.commonTimer();
        main.todayspecial.setTimerAndComingSoon();
        setInterval(main.todayspecial.setTimerAndComingSoon, 1000);
    },

    setTimerAndComingSoon : function() {
        var TIMER_CLOSE_HOURS = 18;
        var nowHours = new Date().getHours();
        if(nowHours >= TIMER_CLOSE_HOURS) {
            $('.main-today').css('display') === 'none' && $('.main-today').show();
            // show 상태만 timer tag set
            $('.main-today').css('display') === 'block' && main.todayspecial.setTodaySpecialGoodsViewTimer();
        } else {
            $('.main-today').css('display') === 'block' && $('.main-today').hide();
        }
    },

    setTodaySpecialGoodsViewTimer : function() {
        common.gnb.todaySpecial.setTodaySpecialTimer($('.main-today').find(".nums.h"), commonTimer.hours);
        common.gnb.todaySpecial.setTodaySpecialTimer($('.main-today').find(".nums.m"), commonTimer.minutes);
        common.gnb.todaySpecial.setTodaySpecialTimer($('.main-today').find(".nums.s"), commonTimer.seconds);
    }


};
