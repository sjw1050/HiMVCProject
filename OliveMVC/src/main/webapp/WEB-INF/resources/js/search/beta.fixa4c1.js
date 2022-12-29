if (typeof(beta) == "undefined") {
	_beta = beta = {};
}

if (typeof(_beta.fix) == "undefined") {
	_beta.fix = {};
} else {
	alert("keyfix is already set!");
}

if(typeof(window.beta.instances) == "undefined") {
	window.beta.instances = new Array();
}

_beta.fix = function(targetId) {
	// This fix is only for mozilla browsers
	if(jQuery.browser.mozilla == false) {
		return false;
	}
	
	var thisClass = this;
	this.keyEventCheck = null;
	this.db = null;
	this.targetId = targetId;
	window.beta.instances[this.targetId] = this;
	
	var focusFunc = function() {
	    if (thisClass.keyEventCheck != undefined && !thisClass.keyEventCheck()) {
			thisClass.watchInput();
		}
	};
	
	var blurFunc = function() {
		if(thisClass.keyEventCheck) {
			window.clearInterval(thisClass.keyEventCheck);
			thisClass.keyEventCheck = null;
		}
	};
	
	$("#" + this.targetId).bind("focus", focusFunc);
	$("#" + this.targetId).bind("blur", blurFunc);
};

_beta.fix.prototype.watchInput = function() {
	if (this.db != $("#" + this.targetId).val()) {
		// Trigger event
		$("#" + this.targetId).trigger("keyup");
	}
	this.db = $("#" + this.targetId).val();
	
	if (this.keyEventCheck) {
		window.clearInterval(this.keyEventCheck);
	}
	this.keyEventCheck = window.setInterval("window.beta.instances['" + this.targetId + "'].watchInput()", 100);
};