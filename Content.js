chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        clickOnElement('opsbar-operations_more');
        clickOnElement('log-work');

        var promise = checkForDialogOpen();
        promise.then(logHoursInInputElement(request.totalTime))
    });

function logHoursInInputElement(totalWorkTime) {
    let el = document.getElementById('log-work-time-logged');
    let timeInHors = totalWorkTime / 60;
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
