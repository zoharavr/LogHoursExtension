let startTime;

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.msg == "START") {
            startTime = request.time;
            return true;
        }
        else if (request.msg == "END") {
            if (startTime != 0) {
                let totalTime = request.time - startTime;
                sendResponse({ totalTime: totalTime });
                startTime = 0; // elapse time
            }
            else return true;
        }
    });