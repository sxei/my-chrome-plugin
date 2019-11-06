//------------------- 向页面注入injected-script ------------------//
;(function() {
	
	function injectCustomJs(jsPath) {
		var temp = document.createElement('script');
		temp.setAttribute('type', 'text/javascript');
		temp.src = window.chrome.extension.getURL(jsPath);
		temp.onload = function() {
			// 放在页面不好看，执行完后移除掉
			this.parentNode.removeChild(this);
		};
		document.head.appendChild(temp);
	}
	var interval = setInterval(function() {
		if (document && document.head) {
			clearInterval(interval);
			injectCustomJs('js/injected-script.js');
		}
	}, 20);
})();

