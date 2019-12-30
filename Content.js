chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("from a content script:" + request.totalTime);
        let optionsButton = document.getElementById('opsbar-operations_more');
        optionsButton.click();
        let logWork = document.getElementById('log-work');
        logWork.click();
        console.log('opened');
        let el = document.getElementById('log-work-time-logged');
        el.onload = function(){   let timeInHors = request.totalTime / 60;
            el.setAttribute("value", timeInHors)};
    });

      
