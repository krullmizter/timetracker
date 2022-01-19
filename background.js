// Run each function based on the data.action string gathered frm the clicked btns on the popup
function popupMsgReceived(data) {
    switch(data.action) {
        case 'start':
            handleStart();
            break;
        case 'stop':
            handleStop();
            break;
        case 'reset':
            handleReset();
            break;
    }
}

/* Function to send back data to the popup.js script
function notifyPopupPage(req, sender, sendRes) {
    sendRes({
        response: "Response from background script"
    });
}*/

//browser.runtime.onMessage.addListener(notifyPopupPage);
browser.runtime.onMessage.addListener(popupMsgReceived);

// Set the initial clock values
let hr  = 0;
let min = 0;
let sec = 0;

/*
 * The functions used in the earlier switch statement - 
 * that handles the timer, Thanks Wesley Branton https://mzl.la/3IjjbON
*/
function handleStart() {
    //timerStartedAt();
    browser.alarms.onAlarm.addListener(timerStartedAt);
    browser.alarms.create('timerStartedAt', {
        periodInMinutes: 1
    });
}

function handleStop() {
    browser.alarms.clearAll();
}

function handleReset() {
    browser.alarms.clearAll();
    hr  = 0;
    min = 0;
    sec = 0;
    timer.innerHTML = '00:00:00';
    displayDate.innerHTML = ''
}

// Here we get the current time, that is used to display when the timer was started
function timerStartedAt() {
    const date = new Date();

    const hr  = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");

    displayDate.innerHTML = 'Timer started ' + hr + ':' + min;
}

/* 
 *  startTimer() handles the running timer logic
 *  We begin with parsing the clock string values to integers
 *  The logic later handles the sec, min and hours like a digital clock
*/
function startTimer() {
    hr  = parseInt(hr);
    min = parseInt(min);
    sec = parseInt(sec);

    sec++;

    if (sec == 60) {
        min += 1;
        sec = 0;
    } else if (min == 60) {
        hr += 1;
        min = 0;
        sec = 0;
    }

    if (sec < 10) {
        sec = '0' + sec;
    } 
    
    if (min < 10) {
        min = '0' + min;
    } 
    
    if (hr < 10) {
        hr = '0' + hr;
    }

    timer.innerHTML = hr + ':' + min + ':' + sec;
}
