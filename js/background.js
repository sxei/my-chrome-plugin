// web请求监听，最后一个参数表示阻塞式，需单独声明权限：webRequestBlocking
chrome.webRequest.onBeforeRequest.addListener(details => {
    // 强制忽略所有spm参数！
    if (xei.getParam('spm', null, details.url)) {
        return {redirectUrl: xei.delParam('spm', details.url)};
    }
    console.log('onBeforeRequest', details);
    // if (details.url.indexOf('https://retcode.taobao.com/r.png') === 0) {
    //     return {cancel: true};
    // }
}, {urls: ['<all_urls>']}, ['blocking', 'extraHeaders', 'requestBody']);

chrome.webRequest.onBeforeSendHeaders.addListener(details => {
    console.log('onBeforeSendHeaders', details);
}, {urls: ['<all_urls>']}, ['blocking', 'extraHeaders', 'requestHeaders']);

chrome.webRequest.onResponseStarted.addListener(details => {
    console.log('onResponseStarted', details);
}, {urls: ['<all_urls>']}, ['extraHeaders', 'responseHeaders']);

chrome.webRequest.onCompleted.addListener(details => {
    console.log('onCompleted', details);
}, {urls: ['<all_urls>']}, ['extraHeaders', 'responseHeaders']);


//------------------- 搜索建议开始 ------------------//

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
	console.log('inputChanged: ' + text);
	if(!text) return;
    suggest([
        {content: '好记么搜索 ' + text, description: '好记么搜索 ' + text},
        {content: '百度搜索 ' + text, description: '百度搜索 ' + text},
        {content: '谷歌搜索 ' + text, description: '谷歌搜索 ' + text},
    ]);
});

// 当用户接收关键字建议时触发
chrome.omnibox.onInputEntered.addListener((text) => {
	console.log('inputEntered: ' + text);
	if (!text) return;
	var href = '';
	if (text.startsWith('百度搜索')) href = 'https://www.baidu.com/s?ie=UTF-8&wd=' + text.replace('百度搜索 ', '');
	else if(text.startsWith('谷歌搜索')) href = 'https://www.google.com.tw/search?q=' + text.replace('谷歌搜索 ', '');
    else href = 'http://blog.haoji.me/search?kw=' + text;
    window.chrome.tabs.create({url: href});
});

