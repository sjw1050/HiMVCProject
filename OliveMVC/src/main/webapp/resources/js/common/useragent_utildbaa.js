(function(window, undefined) {

	'use strict';

	var regExps = {
		ptnMobileInfo : /(iphone os|ipad;|android|windows phone|blackberry)\s([\w\._-]+)/g,
		ptnPcOs : /(windows|linux|macintosh|mac)(\s)?((nt|arm)?(\s)?([\s\w\._-]+)?)?/g,
		ptnBrowserType : /(msie|trident|chrome|safari|firefox)/g,
		ptnBrowserMsieVer : /(msie\s([\w\._-]+;))|(trident\/([\d._-]+);)/g,
		ptnBrowserWebkitVer : /(chrome|version)\/([\w\._-]+)\s(mobile(\/[\w]+)?\s)?(safari)\/([\w\._-]+)/g,
		ptnBrowserFirefoxVer : /(rv:)([\w\._-]+)\)\s(gecko)\/([\w\._-]+)\s(firefox)\/([\w\._-]+)/g,
		ptnEngineInfo : /(webkit|trident|presto|netfront|gecko)\/([\w._-]+)/g
	};
	
	//////////////
	// Constants
	/////////////
	var UserAgentUtil = function(uastring, extensions) {
		if (!(this instanceof UserAgentUtil)) {
			return new UserAgentUtil(uastring, extensions).getResult();
		}
		
		// user agent setting
		var ua = uastring.toLowerCase()
			|| ((window && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent.toLowerCase() : undefined);
		
		/**
		 * getting user agent 
		 */
		this.getUa = function() {
			return ua;
		};
		
		/**
		 * setting user agent
		 */
		this.setUa = function(uastring) {
			ua = uastring.toLowerCase();
		};
		
		/**
		 * getting browser name and version 
		 */
		this.getBrowser = function() {
			var result = {
					name : null,
					version : null
			};
			
			var parseResult;
			//wellknown 브라우저일 경우
			if ((parseResult = regExps.ptnBrowserType.exec(this.getUa())) != null) {
				if ("msie" == parseResult[1] || "trident" == parseResult[1]) {
					var match = regExps.ptnBrowserMsieVer.exec(this.getUa());
					
					if (match[1] != null) {
						result.name = match[1];
						result.version = match[2].replaceAll("_", ".");
					} else if (match[4] != null && match[4].startWith("7.")){
						//msie가 없고 trident만 있으며, trident 엔진 버전이 7.x인 경우 익스플로러 11로 간주함.
						result.name = "msie";
						result.version = "11";
					}
					
					regExps.ptnBrowserMsieVer.lastIndex = 0;
				} else if ("firefox" == parseResult[1]) {
					var match = regExps.ptnBrowserFirefoxVer.exec(this.getUa());
					if (match != null) {
						result.name = match[5];
						result.version = match[6].replaceAll("_", ".");

						regExps.ptnBrowserFirefoxVer.lastIndex = 0;
					}
				} else {
					var match = regExps.ptnBrowserWebkitVer.exec(this.getUa());
					if (match != null) {
						if ("chrome" == match[1]) {
							result.name = match[1];
						} else {
							if (match[3] != null && match[4] == null) {
								result.name = match[3] + " " + match[5];
							} else {
								result.name = match[5];
							}
						}
						result.version = match[2].replaceAll("_", ".");
						regExps.ptnBrowserWebkitVer.lastIndex = 0;
					}
				}
				
				regExps.ptnBrowserType.lastIndex = 0;
			}
			
			return result;
		};
		
		/**
		 * getting browser enging name and version
		 */
		this.getEngine = function() {
			var result = {
					name : null,
					version : null
			};
			
			var parseResult;
			if ((parseResult = regExps.ptnBrowserType.exec(this.getUa())) != null && parseResult[1] == "firefox") {
				var match = regExps.ptnBrowserFirefoxVer.exec(this.getUa());
				if (match != null) {
					this.setEngineName = match[3];
					this.setEngineVer = match[2].replaceAll("_", ".");

					regExps.ptnBrowserFirefoxVer.lastIndex = 0;
				}
			} else {
				var match = regExps.ptnEngineInfo.exec(this.getUa());
				if (match != null) {
					result.name = match[1];
					result.version = match[2].replaceAll("_", ".");
				}
				regExps.ptnEngineInfo.lastIndex = 0;
			}
			regExps.ptnBrowserType.lastIndex = 0;

			return result;
		};
		
		this.getOS = function() {
			var result = {
					name : null,
					version : null
			};
			
			var parseResult;
			//모바일일 경우
			if ((parseResult = regExps.ptnMobileInfo.exec(this.getUa())) != null) {
				result.name = parseResult[1];
				result.version = parseResult[2].replaceAll("_", "."); 
				//A JavaScript RegExp object is stateful.
				//When the regex is global, if you call a method the same regex object, it will start from the index past the end of the last match.
				//When no more matches are found, the index is reset to 0 automatically
				regExps.ptnMobileInfo.lastIndex = 0;
			} else {
				//pc 버전 처리
				parseResult = regExps.ptnPcOs.exec(this.getUa());
				
				if (parseResult != null) {
					result.name = parseResult[1];
					result.version = parseResult[3].replaceAll("_", "."); 
					//A JavaScript RegExp object is stateful.
					//When the regex is global, if you call a method the same regex object, it will start from the index past the end of the last match.
					//When no more matches are found, the index is reset to 0 automatically
					regExps.ptnPcOs.lastIndex = 0;
				}
			}
			return result;
		}
		
		/**
		 * getting browser application name and version
		 */
		this.getApplication = function() {
			var result = {
					name : null,
					version : null
			};
			
			var tmpSplitArr = this.getUa().split(/[()]/g);
			
			//어플리케이션 정보 Mozilla/5.0
			if (tmpSplitArr.length > 0) {
				var tmpArr = tmpSplitArr[0].trim().split("/");
				result.name = tmpArr[0];
				if (tmpArr.length > 1) {
					result.version = tmpArr[1];
				}
			}
			return result;
		}
		
		/**
		 * getting boolean value of mobile browser
		 */
		this.isMobile = function() {
			var parseResult;
			//모바일일 경우
			if ((parseResult = regExps.ptnMobileInfo.exec(this.getUa())) != null) {
				regExps.ptnMobileInfo.lastInfex = 0
				return true;
			}
			
			return false;
		}
		
		/**
		 * getting all information of browser
		 */
		this.getResult = function() {
			return {
				ua : this.getUa(),
				browser : this.getBrowser(),
				engine : this.getEngine(),
				os : this.getOS(),
				application : this.getApplication(),
				mobile : this.isMobile()
			};
		};
	};
	
	
	///////////
	// Export
	//////////

	// check js environment
	if (typeof (exports) !== "undefined") {
		// nodejs env
		if (typeof module !== "undefined" && module.exports) {
			exports = module.exports = UserAgentUtil;
		}
		exports.UAParser = UAParser;
	} else {
		// requirejs env (optional)
		if (typeof (define) === "function" && define.amd) {
			define(function() {
				return UserAgentUtil;
			});
		} else {
			// browser env
			window.UserAgentUtil = UserAgentUtil;
		}
	}


})(typeof window === 'object' ? window : this);
