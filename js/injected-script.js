//------------------- Fuck react 警告 ------------------//

/**
 * react傻逼，有些警告也用console.error 输出，控制台一片红，看着都烦！FUCK！
 */
;(function(){
    if (console._rawError) return;
    console._rawError = console.error;
    console.error = function(...args) {
        if (/^Warning: /.test(args[0])) {
            console.warn(...args);
        } else {
            console._rawError(...args);
        }
    };
})();


//------------------- 屏蔽某些JS ------------------//
// 重写fetch
;(function() {
    const backlist = [
        'https://arms-retcode.aliyuncs.com/r.png',
        '//retcode.taobao.com/r.png',
    ];
    // 覆盖原生的 fetch 方法
    const tempFetchName = '__rawFetch__' + Date.now();
    if (!window[tempFetchName]) {
        window[tempFetchName] = window.fetch;
        window.fetch = function(url, options) {
            if (backlist.some(item => url.indexOf(item) === 0)) {
                // 拦截命中黑名单的URL，注意，即使不调用也必须返回一个promise
                return new Promise(resolve => resolve());
            } else {
                return window[tempFetchName](url, options);
            }
        };
    }

    // 覆盖 xhr 原生的 open 方法
    const tempXhrOpenName = '__rawOpen__' + Date.now();
    if (window.XMLHttpRequest) {
        var prototype = window.XMLHttpRequest.prototype;
        // 某些第三方库比较暴力导致 prototype.open 丢失，所以这里需要特殊判断一下
        if (!prototype[tempXhrOpenName] && prototype.open) {
            prototype[tempXhrOpenName] = prototype.open;
            prototype.open = function(method, url, async, user, password) {
                if (backlist.some(item => url.indexOf(item) === 0)) {
                    // do nothing
                } else {
                    prototype[tempXhrOpenName].call(this, method, url, async, user, password);
                }
            };
        }
    }
})();
