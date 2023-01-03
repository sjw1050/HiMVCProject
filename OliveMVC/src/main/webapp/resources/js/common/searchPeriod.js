$.fn.addOption = function(v,t,s){
    var option = '<option value="'+v+'" ';
    if(s) option += 'selected="selected"';
    option += '>'+t+'</option>';
    
    $(this).append(option);
};

$.fn.clearOption = function(){
    $(this).children().remove();
};

var SearchPeriod = (function($){
    var defaultMonth = -1;
    var today = {
            year  : new Date().format("yyyy")
           ,month : new Date().format("MM")
           ,day   : new Date().format("dd")
    };
    
    var select = {
            start : {
                year : $('#cal-start-year')
               ,month: $('#cal-start-month')
               ,day  : $('#cal-start-day')
            }
           ,end   : {
                year : $('#cal-end-year')
               ,month: $('#cal-end-month')
               ,day  : $('#cal-end-day')
           }
    };
    
    var DateCalculator = function(term){
        var date  = new Date(selectedDate.end.year+'/'+selectedDate.end.month+'/'+selectedDate.end.day)
           ,month = term || 0;
        
        date.setMonth(date.getMonth() + month);
        
        this.getYear = function() {
            var yyyy = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getFullYear();
            return yyyy.toString();
        };
        
        this.getMonth = function() {
            var mm = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getMonth() + 1;
            return (mm.lpad(2,'0')).toString();
        };
        
        this.getDay = function() {
            var dd = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getDate();
            return (dd.lpad(2,'0')).toString(); 
        };
    };
    
    var selectedDate = {
            start : {year : '', month: '', day  : ''}
           ,end   : {year : '', month: '', day  : ''}
    };
    
    var setDateInit = function(){
        if(START_DATE && END_DATE){
            var startDate = START_DATE.split('-');
            
            selectedDate.start.year  = startDate[0];
            selectedDate.start.month = startDate[1];
            selectedDate.start.day   = startDate[2];
            
            var endDate = END_DATE.split('-');
            
            selectedDate.end.year  = endDate[0];
            selectedDate.end.month = endDate[1];
            selectedDate.end.day   = endDate[2];
        }else{
            selectedDate.end = {
                    year  : today.year
                   ,month : today.month
                   ,day   : today.day
            };
            if(ollyoungYn =='Y'){
            	var date = new DateCalculator(-12);
            }else{
            	var date = new DateCalculator(defaultMonth);	
            }
            
            
            selectedDate.start = {
                    year  : date.getYear()
                   ,month : date.getMonth()
                   ,day   : date.getDay()
            };
        }
    };
    
    var init = function(){
        bindingEvent();
        
        setDateInit();
        
        makeSelectBox();
    };
    
    var bindingEvent = function(){
        $('#cal-start-day, #cal-end-day').change(function(){
            tabOff();
            
            setSelectedDate();
        });
        
        $('#cal-start-year, #cal-start-month, #cal-end-year, #cal-end-month').change(function(){
            var section = $(this).attr('id').replace(/(cal|year|month|day|-)/gi, '');
            
            tabOff();
            
            setDay(section, true);
            
            setSelectedDate();
        });
    };
    
    var setSearchMonth = function(obj){
        
        if(!$(obj).data('month')) return;
        
        tabOff();
        
        $('.select-month').find('li').filter(function(){
            return Number($(this).children('button').data('month')) == Number($(obj).data('month'))
        }).addClass('on');
    };
    
    var getSearchMonth = function(){
        return $('.select-month').find('li').filter(function(){
            return $(this).hasClass('on')
        }).children('button').data('month');
    };
    
    var getPeriodParam = function(obj){
        
        setSearchMonth(obj);
        
        setSelectedDate(obj);
        
        if(!validator()) return;
        
        var startDate = selectedDate.start.year.toString() + '-' 
                      + selectedDate.start.month.toString() + '-' 
                      + selectedDate.start.day.toString();
        
        var endDate   = selectedDate.end.year.toString() + '-' 
                      + selectedDate.end.month.toString() + '-' 
                      + selectedDate.end.day.toString();
           
        return {
            searchMonth : getSearchMonth()
           ,startDate   : startDate 
           ,endDate     : endDate
        }
    };
    
    var setSelectedDate = function(obj){
        if(arguments.length > 0 && typeof $(obj).data('month') != 'undefined' && Number($(obj).data('month')) != 0){
            var date = new DateCalculator(Number($(obj).data('month')));
            
            selectedDate.start = {
                    year  : date.getYear()
                   ,month : date.getMonth()
                   ,day   : date.getDay()
            };
        }else{
            selectedDate.start = {
                    year  : select.start.year.val()
                   ,month : select.start.month.val()
                   ,day   : select.start.day.val()
            };
        }   
        
        selectedDate.end = {
                year  : select.end.year.val()
               ,month : select.end.month.val()
               ,day   : select.end.day.val()
        }
    };
    
    var getDaysInMonth = function(year, month) {
        return 32 - new Date(year, month-1, 32).getDate();
    };
    
    var setDay = function(section, isInit){
        var days = getDaysInMonth(select[section].year.val(), select[section].month.val());
        
        select[section].day.clearOption();
        
        for(var i=0; i<days; i++){
            var day = i + 1;
            var isSelect = false;
            
            if(isInit){
                if(i == 0) isSelect = true;
            }else{
                if(day == Number(selectedDate[section].day)) isSelect = true;
            }
            
            select[section].day.addOption(day.lpad(2,'0'),day,isSelect);
        };
    };
    
    var makeSelectBox = function(){
        
        for(var property in selectedDate){
            drawSelectBox(property);
        }
    };
    
    var drawSelectBox = function(section){
        
        select[section].year.children().filter(function(){
            return $(this).val() == selectedDate[section].year 
        }).attr('selected','selected');
        
        select[section].month.children().filter(function(){
            return $(this).val() == selectedDate[section].month 
        }).attr('selected','selected');
        
        setDay(section, false);
    };
    
    var validator = function(){
        var startDate = Number(selectedDate.start.year.toString() + selectedDate.start.month.toString() + selectedDate.start.day.toString())
           ,endDate   = Number(select.end.year.val().toString() + select.end.month.val().toString() + select.end.day.val().toString())
           ,date      = new DateCalculator(-12)
           ,maxDate   = Number(date.getYear().toString() + date.getMonth().toString() + date.getDay().toString());  

        // 2019.11.20 오프라인리뷰관련추가
        var date12 = Number(date.getYear() + date.getMonth() + date.getDay());
        if("20" == $("#_selectOrderTypeZone .select-type li.on button").data("order_type") ) {
        	if( startDate < date12 ) {
                alert('매장 구매 이력은 최대 1년 내역만 조회가 가능합니다.');
                return false;
            };
        }
        
        if((endDate - startDate) > (endDate - maxDate)){
            alert('검색기간은 최대 1년 입니다.');
            return false;
        };
            
        if(startDate > endDate){
            alert('검색종료일이 검색시작일 이전입니다.');
            return false;
        };
        
        if(startDate > Number(today.year.toString() + today.month.toString() + today.day.toString())){
            alert('검색시작일을 오늘 이전으로 선택하세요.');
            
            $('#cal-start-year').val(today.year);
            $('#cal-start-month').val(today.month);
            $('#cal-start-day').val(today.day);
            
            tabOff();
            
            setSelectedDate();
            
            return false;
        }

        if(endDate > Number(today.year.toString() + today.month.toString() + today.day.toString())){
            alert('검색종료일을 오늘 이전으로 선택하세요.');
            
            $('#cal-end-year').val(today.year);
            $('#cal-end-month').val(today.month);
            $('#cal-end-day').val(today.day);
            
            tabOff();
            
            setSelectedDate();
            
            return false;
        }

        return true;
    };
    
    var tabOff = function(){
        $('.select-month').find('li').filter(function(){
            return $(this).hasClass('on')
        }).removeClass('on');
    };
    
	return {
	    init    : init
	   ,getDate : getPeriodParam
	   /* 2019.10.24 오프라인리뷰 관련 추가*/
	   ,getOrderType : function(obj){
				   if($(obj).parents("ul").hasClass("select-type")){
					   $("#_selectOrderTypeZone .select-type li").each(function(idx){
			   				$(this).removeClass("on");
			   			}) ;
			   			if($(obj).parents("ul").hasClass("select-type")){
			   				$(obj).parent("li").addClass("on");
			   			}
		  			}
				   return { searchOrderType : $("#_selectOrderTypeZone .select-type li.on button").data("order_type") };
			   }
	};
})(jQuery);