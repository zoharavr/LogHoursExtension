chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("from a content script:" + request.totalTime);
        let els = document.getElementsByName('email');
        els.forEach(el => {
            el.setAttribute("placeholder", request.totalTime)
            el.setAttribute("value", request.totalTime)
        });
    });