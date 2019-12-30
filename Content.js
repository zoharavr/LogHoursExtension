chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("from a content script:" + request.totalTime);
        let optionsButton = document.getElementById('opsbar-operations_more');
        optionsButton.click();
        let logWork = document.getElementById('log-work');
        logWork.click();
        
        console.log('opened');
        var promise = ensureFooIsSet();
        promise.then(function(){
            let el = document.getElementById('log-work-time-logged');
        	let timeInHors = request.totalTime / 60;
            el.setAttribute("value", timeInHors);
        })
      
    });

    function ensureFooIsSet() {
        return new Promise(function (resolve, reject) {
            (function waitForFoo(){
                if (document.getElementById('log-work-time-logged')) {
                    console.log('success')
                    return resolve();}
                setTimeout(waitForFoo, 30);
            })();
        });
    }
      
