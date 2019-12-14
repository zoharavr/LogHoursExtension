var data = {
    totalTime: 0
};
document.addEventListener('DOMContentLoaded', function () {
    setUp();
}, false);

function setUp() {
    document.getElementById("start").addEventListener('click', onClickStart);
    document.getElementById("stop").addEventListener('click', onClickStop);
}

function onClickStart() {
    let start = new Date().getTime();
    console.log('clicked start');
    chrome.runtime.sendMessage({ msg: 'START', time: start });
}

function onClickStop() {
    let end = new Date().getTime();
    chrome.runtime.sendMessage({ msg: 'END', time: end }, function (response) {
        showTotalTime(response);
    });
}

function showTotalTime(response) {
    let element = document.createElement('div');
    element.innerHTML = response.totalTime / 1000 + ' SECONDS';
    document.body.appendChild(element);
    data.totalTime = response.totalTime;
    sendtoContent();

}

function sendtoContent() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function (response) {
            console.log(response.farewell);
        });
    });
}

