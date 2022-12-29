//netthru
setTimeout(function(){
    (function() {
        var nl = document.createElement('script'); nl.type = 'text/javascript';
    //  nl.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + oliveyoungshop.com/js/wlo.js';
        nl.src = _jsUrl + '/common/weblog/wl6.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(nl, s);
        var done = false;
        nl.onload = nl.onreadystatechange = function() {
            if ( !done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") ) {
                done = true;
                _n_sid = _wlDomain;
//                _n_sid = "oliveyoung.co.kr"; // 분석대상 사이트 도메인명을 입력하세요
//              _n_sid 값 별로 로그파일이 별도로 생성이 됩니다.

                _n_uid_cookie = "wl_id"; // 사이트 내에서 사용하시는 회원ID 쿠키명을 입력하시면 됩니다.
                // 생성예정일 경우 2.회원쿠키 항목을 참조하여 생성한 값을 넣어주시면 됩니다.
                // 회원제 사이트가 아니라면 무시하셔도 됩니다. 
                n_logging();
                nl.onload = nl.onreadystatechange = null;
            }
        }
    })();
},500);


//ga
setTimeout(function(){
    if (_gaUaKey != "" && _gaUaKey != null && _gaUaKey != "null") {
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
            ga('create', _gaUaKey, 'auto');
            ga('send', 'pageview');
    }
},500);

setTimeout(function(){
	try {
		var src = (('https:'==document.location.protocol)?'https':'http')+'://logger.ai.oliveyoung.co.kr/js/logger.min.js';
	    var scriptLen = $("script").filter("[src='"+src+"']").length;
	    
	    if(scriptLen == 0) {
	    	(function(s,x){s=document.createElement('script');s.type='text/javascript';
		    s.async=true;s.defer=true;s.src=(('https:'==document.location.protocol)?'https':'http')+
		    '://logger.ai.oliveyoung.co.kr/js/logger.min.js';
		    x=document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);})();
	    }
	    
	    window._eglqueue = window._eglqueue || [];
	    _eglqueue.push(['setVar', 'cuid', recoCuid]);
	    _eglqueue.push(['setVar', 'userId', hashedRecoSsoMbrNo]); // optional
	    _eglqueue.push(['setVar','url']); // optional if url is neeeded.
	    _eglqueue.push(['track', 'pageview']);
	} catch(e) {
		console.log(e);
	} 
}, 500);
