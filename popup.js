let data = {
    totalTime: 0
};
addListeners();
function addListeners() {
    document.getElementById("startBtn").addEventListener('click', onClickStart);
    document.getElementById("stopBtn").addEventListener('click', onClickStop);
}

function onClickStart() {
    let start = new Date().getTime();
    chrome.runtime.sendMessage({ msg: 'START', time: start });
}

function onClickStop() {
    let end = new Date().getTime();
    chrome.runtime.sendMessage({ msg: 'END', time: end }, function (response) {
        showTotalTimeInPopUp(response);
    });
}

function showTotalTimeInPopUp(response) {
    let element = addNewElementToHTML('div');
    element.innerHTML = response.totalTime / 60000 + ' MINUTES';
    data.totalTime = response.totalTime / 6000;
    sendtoContent();
}

function addNewElementToHTML(elementType) {
    let element = document.createElement(elementType);
    document.body.appendChild(element);
    return element;
}

function sendtoContent() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, data);
    });
}

