let startTime;

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        actionToPerform = request.msg.toLowerCase() + "Action";
        if (window[actionToPerform] instanceof Function) {
            response = window[actionToPerform](request, sender, sendResponse);
        }
    });

function startAction(request, sender, sendResponse) {
    startTime = request.time;
    return true;
}

function endAction(request, sender, sendResponse) {
    if (startTime != 0) {
        let totalTime = request.time - startTime;
        sendResponse({ totalTime: totalTime });
        startTime = 0; // elapse time
    }
    else return true;
}
