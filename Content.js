let data = {
    totalTime: 0
};
const MAX_TIME = 1000

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        data.totalTime = request.totalTime;
        getElementIfExist('opsbar-operations_more').then(clickElement);
        getElementIfExist('log-work').then(clickElement);
        handleHoursLogging();
    });

function clickElement(element) {
    if(element.hasOwnProperty("actualElement"))
        element.actualElement.click();
    else element.click();
}
function handleHoursLogging() {
    let promise = getElementIfExist('log-work-time-logged');
    promise.then(function (element) {
        let timeInHours = data.totalTime / 60;
        setElementValue(element.actualElement, timeInHours);
    });
}

function setElementValue(el, valueToSet) {
    el.setAttribute("value", valueToSet);
}

function getElementIfExist(id) {
    let timeout = 0;
    return new Promise(function (resolve, reject) {
        (function waitForElement() {
            if (document.getElementById(id)) {
                return resolve({ actualElement: document.getElementById(id) });
            }
            else timeout += 30;
            if (timeout >= MAX_TIME) {
                return reject(Error('Element not found'));
            }
            setTimeout(waitForElement, 30);
        })();
    });
}
