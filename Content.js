let data = {
    totalTime: 0
};

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        data.totalTime = request.totalTime;
        handleHoursLogging();
    });

function handleHoursLogging() {
    clickOnElement('opsbar-operations_more');
    clickOnElement('log-work');
    var promise = checkForDialogOpen();
    logHoursInInputElement.bind(promise);
    promise.then(logHoursInInputElement);
}

function logHoursInInputElement() {
    let el = document.getElementById('log-work-time-logged');
    let timeInHors = data.totalTime / 60;
    el.setAttribute("value", timeInHors);
}

function clickOnElement(elementId) {
    let clickable = document.getElementById(elementId);
    clickable.click();
}

function checkForDialogOpen() {
    return new Promise(function (resolve, reject) {
        (function waitForInputElement() {
            if (document.getElementById('log-work-time-logged')) {
                return resolve();
            }
            setTimeout(waitForInputElement, 30);
        })();
    });
}
